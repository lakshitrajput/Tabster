const groupModel = require('../Model/group.model');
const tabModel = require('../Model/tab.model');
const userModel = require('../Model/user.model');

async function createGroup(req, res){
    try{
        const { name, color, tab } = req.body;
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
            tabs: [existTab._id]
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


module.exports = { createGroup, getGroups };