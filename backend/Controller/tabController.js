const tabModel = require('../Model/tab.model');
const tabUsageModel = require('../Model/tabUsage.model');
const userModel = require('../Model/user.model');

// function to replace tabId with the new tabId that is opened in new window (form a group)
async function updateTabId(req, res){
    try{
        const { tabId, newTabId } = req.body;
        const updatedTab = await tabModel.findOneAndUpdate({ id: tabId }, {
            id: newTabId
        }, {
            new: true
        })
        
        res.status(200).json({
            msg: "tab updated successfully",
            updatedTab: updatedTab
        })
    } catch(error){
        res.status(500).json({
            msg: ""+error
        })
    }
}

async function getAnalysis(req, res) {
    try {
        let tabEntries = req.body.usageData;
        const user = req.user;
        const userId = user._id;

        const entriesWithNullCloseAt = tabEntries.filter(entry => !entry.closedAt);

        entriesWithNullCloseAt.forEach(entry => {
            entry.closedAt = new Date();
        });

        const filteredEntries = tabEntries.filter(entry => !(entry.closedAt === null || entry.url === '' || entry.title==='tabster'));

        let updatedTabs = [];
        for (const entry of filteredEntries) {
            let existingTab = await tabUsageModel.findOne({ url: entry.url });

            const usedTime = (new Date(entry.closedAt) - new Date(entry.openedAt)) / 1000;
            const entryDate = new Date(entry.closedAt).setHours(0, 0, 0, 0);

            if (!existingTab) {
                existingTab = new tabUsageModel({
                    title: entry.title,
                    url: entry.url,
                    favIconUrl: entry.favIconUrl,
                    lastUsed: entry.closedAt,
                    totalUsedTime: usedTime,
                    usage: [{
                        date: entryDate,
                        usedTime: usedTime
                    }],
                    visitCount: 1
                });
            } else {
                if(existingTab.lastUsed === entry.closedAt){
                    existingTab.totalUsedTime = usedTime;

                    const existingUsageEntry = existingTab.usage.find(u => {
                        return new Date(u.date).setHours(0, 0, 0, 0) === entryDate;
                    });

                    if (existingUsageEntry) {
                        existingUsageEntry.usedTime += usedTime;
                    } else {
                        existingTab.usage.push({
                            date: entryDate,
                            usedTime: usedTime
                        });
                    }
                }
                else{
                    existingTab.lastUsed = entry.closedAt; 
                    existingTab.totalUsedTime += usedTime; 
                    existingTab.visitCount += 1; 

                    const existingUsageEntry = existingTab.usage.find(u => {
                        return new Date(u.date).setHours(0, 0, 0, 0) === entryDate;
                    });

                    if (existingUsageEntry) {
                        existingUsageEntry.usedTime += usedTime;
                    } else {
                        existingTab.usage.push({
                            date: entryDate,
                            usedTime: usedTime
                        });
                    }
                }
            }

            await existingTab.save();
            updatedTabs.push(existingTab);
        }

        await userModel.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    tabUsage: {
                        $each: updatedTabs
                    }
                }
            }
        );

        res.status(200).json({
            success: true,
            message: 'Tab usage data updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "" + error
        });
    }
}

async function sendAnalysis(req, res){
    try{
        const userId = req.user._id;
        const user = await userModel.findOne({ _id: userId }).populate('tabUsage');

        res.status(200).json({
            success: true,
            data: user.tabUsage,
            msg: 'data fetched successfully'
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: ""+error
        })
    }
}


module.exports = { updateTabId, getAnalysis, sendAnalysis };