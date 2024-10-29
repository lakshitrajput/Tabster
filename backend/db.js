const mongoose=require('mongoose')
const dotenv=require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

function DB(){
    try {
        mongoose.connect(process.env.MONGODB_URL)
        .then((conn)=>console.log('Database Connected'))
        .catch((error)=>console.log(error))
    } catch (error) {
        console.log(error);
    }
}

module.exports = DB;