const express=require('express')
const DB=require('./db')
const cors = require("cors");

const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use(cors());


const server = app.listen(4000,()=>{
    console.log("App started on PORT 4000");
})

DB();

const authRouter = require('./Routes/authRoute');
const tabRouter = require('./Routes/tabRoutes');

app.use('/api/auth', authRouter);
app.use('/api/tab', tabRouter)