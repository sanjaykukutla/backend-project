import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
export const app =express();
//set cors for app and allow only the loac; host 5173
app.use(cors({origin:'http://localhost:5173'}));
//app.use(cors());

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use(express.static('public'));
app.use(cookieParser());


// routes import
import userRouter from '../routes/user.routes.js';

//routes declaration

app.use('/api/v1/users',userRouter);


app.get('/',(req,res)=>{
    res.send('Hello World');
})

//get a list of 5 jokes
app.get('/api/jokes',(req,res)=>{
    // each joke has id,title content in json format
    const jokes =[
        {id:1,title:'Joke 1',content:'This is joke 1'},
        {id:2,title:'Joke 2',content:'This is joke 2'},
        {id:3,title:'Joke 3',content:'This is joke 3'},
        {id:4,title:'Joke 4',content:'This is joke 4'},
        {id:5,title:'Joke 5',content:'This is joke 5'}
    ];
    res.send(jokes);
})

// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
//     //console.log("hi server");
// })
