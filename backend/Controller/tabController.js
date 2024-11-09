const tabModel = require('../Model/tab.model');
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


module.exports = { updateTabId };