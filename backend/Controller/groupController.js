const groupModel = require('../Model/group.model');
const tabModel = require('../Model/tab.model');
const userModel = require('../Model/user.model');

async function createGroup(req, res){
    try{
        const { name, color, tab } = req.body;
        const { customAlphabet } = await import('nanoid');
        const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*', 6);
        const groupCode = nanoid();
        const user = req.user;
        const userId = user._id;

        if(name === ""){
            res.status(404).json({
                msg: "Name is not provided"
            })
        }

        let existTab = await tabModel.findOne({ id: tab.id });
        if(!existTab){
                existTab = await tabModel.create({
                title: tab.title,
                id: tab.id,
                url: tab.url,
                favIconUrl: tab.favIconUrl                
            })
        }

        const group = await groupModel.create({
            name: name,
            colour: color,
            tabs: [existTab._id],
            createdBy: userId,
            groupCode: groupCode
        })
        const populatedGroup = await group.populate('tabs');

        await userModel.updateOne(
            { _id: userId },
            { $push: { groups: group._id }}
        );
        
        res.status(201).json({
            success:true,
            msg: "group created successfully",
            group: populatedGroup
        })

    } catch(error){
        console.log(error);
        res.status(400).json({
            msg: ""+error
        })
    }
}

// get function to get all created groups of a user
async function getGroups(req, res){
    try{
        const user = await userModel.findById(req.user._id).populate({
            path: 'groups',
            populate: {
                path: 'tabs',
            }
        });
        const groups = user.groups;

        res.status(200).json({
            success:true,
            msg: "groups fetched successfully",
            groups: groups
        })

    } catch(error){
        res.status(400).json({
            msg: ""+error
        })
    }

}

async function addToGroup(req, res){
    try{
        const { tab, group } = req.body;

        let existTab = await tabModel.findOne({ id: tab.id });
        if(!existTab){
                existTab = await tabModel.create({
                title: tab.title,
                id: tab.id,
                url: tab.url,
                favIconUrl: tab.favIconUrl                
            })
        }

        const gp = await groupModel.findOneAndUpdate(
            { _id: group._id },
            { $addToSet: { tabs: existTab._id } },
            { new: true }  
        );
    

        res.status(200).json({
            success: true,
            msg: "Added to group successfully",
            group: gp
        })

    } catch(error){
        res.status(400).json({
            msg: ""+error
        })
    }
}

async function removeTabFromGroup(req, res){
    try{
        const { tabId, groupId } = req.body;
        await groupModel.findOneAndUpdate({ _id: groupId }, {
            $pull: { tabs: tabId }
        })
        res.status(200).json({
            success:true,
            msg: "tab removed successfully"
        })

    } catch(error){
        res.status(500).json({
            msg: ""+error
        })
    }

}

async function ungroup(req, res){
    try{
        const { groupId } = req.body;
        if(!groupId){
            res.status(404).json({
                success:false,
                msg:"groupId not found"
            })
        }
        const user = req.user;
        await userModel.findOneAndUpdate({ _id:user._id  }, {
            $pull: { groups: groupId }
        });

        const gp = await groupModel.findOne({ _id: groupId });
        if(user !== gp.createdBy){
            res.status(200).json({
                success:true,
                msg: "group can be ungrouped by creator only"
            });
            return;
        }
        await groupModel.deleteOne({ _id: groupId });
        res.status(200).json({
            success:true,
            msg: "group ungrouped successfully"
        });
    } catch(error){
        res.status(500).json({
            msg: ""+error
        })
    }
}

// add group using groupCode
async function addGroup(req, res){
    try{
        const { groupCode } = req.body;
        const user = req.user;
        const userId = user._id;
        const group = await groupModel.findOne({ groupCode: groupCode }).populate('tabs');
        if(!group){
            res.status(404).json({
                success: false,
                msg: "group not found, check group code"
            })
        }

        await userModel.updateOne(
            { _id: userId },
            { $addToSet: { groups: group._id }}
        );
        res.status(200).json({
            success: true,
            msg: "group added successfully",
            group: group
        })

    } catch(error){
        res.status(500).json({
            success: false,
            msg: ""+error
        })
    }
}

module.exports = { createGroup, getGroups, addToGroup, ungroup, removeTabFromGroup, addGroup };