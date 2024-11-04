const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const path = require('path');
const userModel = require('../Model/user.model')
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const jwtKey = process.env.JWT_KEY;

async function loginUser(req, res) {
    const { email, password } = req.body;
   
    const user = await userModel.findOne({ email: email }).exec();
   
     
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const id = user['_id']
                const token = jwt.sign({ payload: id }, jwtKey);
                res.cookie('user', token, { httpOnly: true});
              
                res.status(201).json({
                    success: true,
                    meassage: "Login successfully",
                    data: user,
                    token: token
                })
            }
            else {
                res.json({
                    success: false,
                     meassage: "Invalid Password" });
            }
        }
        else {
            res.json({
                success: false,
                meassage: "Invalid username" });
        }
    }


async function register(req, res) {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Please enter all the fields"
        });
    }
    try {
        const body = req.body;
        const user = await userModel.create(body);

        res.status(201).json({
            success: true,
            message: "Registered Successfully",
            data: user
        });
    } catch (error) {
        res.json({
            message: ""+error
        })
    }

}

module.exports = { loginUser , register };