import bodyParser from 'body-parser'
import express from 'express'

const app = express();
const port = 8080


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req , res)=>{
    res.send("HEllo bhai , welcoms to first page of radmac")
})

app.post ('/get' , (req , res)=>{
    const name = req.body.name;
    res.send(`Hello bhai ${name}`)
    
})


app.listen(port , ()=>{
    console.log(`http://localhost:${port}`)
})