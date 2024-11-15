const express=require('express')
const DB=require('./db')
const cors = require("cors");

const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use(cors());

const port = process.env.port || 4000;
const server = app.listen(port,()=>{
    console.log("App started on PORT 4000");
})

DB();

const authRouter = require('./Routes/authRoute');
const tabRouter = require('./Routes/tabRoutes');
const groupRouter = require('./Routes/groupRoutes');

app.use('/api/auth', authRouter);
app.use('/api/tab', tabRouter);
app.use('/api/group', groupRouter);
app.get('/healthcheck', (req, res) => {
    console.log('I am alive!!!');
    res.status(200).send('Backend is alive!!!');
});
