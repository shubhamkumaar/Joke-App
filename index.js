import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express()
const port = 3000

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",async(req,res)=>{
    try{
        const category = "Any"
        const request = await axios.get("https://v2.jokeapi.dev/joke/"+category)
        const result =request.data
        res.render("index.ejs",{data:result})}
    catch(error){
        res.status(error.message)
    }
})

app.post("/",async(req,res)=>{
    const category = req.body.category
        const language = req.body.language
        const type = req.body.type
    try{
        
        const request = await axios.get(`https://v2.jokeapi.dev/joke/${category}?lang=${language}&type=${type}`)
        const result =request.data
        res.render("index.ejs",{data:result})}
    catch(error){
        res.status(error.message)
    }
})
app.listen(port,()=>{
    console.log(`server started on ${port}`);
})