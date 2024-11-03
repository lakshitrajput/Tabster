const tabModel = require('../Model/tab.model');
const userModel = require('../Model/user.model');

async function postBookmark(req, res){
    try{
        const { userId, tab } = req.body;
        const user = await userModel.findOne({ _id: userId }).populate('tabs');

        if(!user){
            res.status(404).json({
                msg: "user not found"
            })
        }

        let existTab = await user.tabs.find((elm) => elm.id === tab.id);
        if(existTab){
            if(existTab.isBookmarked === true){
                existTab.isBookmarked = false;
            }
            else{
                existTab.isBookmarked = true;
            }
            await existTab.save();
        }
        else{
            newTab = await tabModel.create({
                title: tab.title,
                id: tab.id,
                url: tab.url,
                favIconUrl: tab.favIconUrl,
                isBookmarked: true
            })
            user.tabs.push(newTab._id);
        }

        // save changes to the user
        await user.save();
        res.status(200).json({
            msg: "Tab bookmarked/unbookmarked successfullly",
            user: user,
            tabs: user.tabs
        })
    }
    catch(eror){
        res.status(401).json({
            error: ""+error
        })
    }
}


module.exports = { postBookmark };