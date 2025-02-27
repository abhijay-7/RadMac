import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
const app = express();
const port = 8080


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const songFilePath = path.join("assets/genre/songs.json")
let songList = [];
try{
    const songdata = fs.readFileSync(songFilePath, 'utf-8');
     songList = JSON.parse(songdata)
     console.log("ok")

}catch(error){
    console.log("eror in getting data")

}

function updateVote(checkval,id) {
    // Find the song by id
    const song = songList.find(item => item.id === id);

    // If the song is found, increment its vote
    if (song) {
        if(!checkval)
        song.votes++;
    else song.votes--;
    } else {
        console.log("Song not found");
    }
    songList.sort((a, b) => b.vote - a.vote);
}


app.get("/", (req , res)=>{
    res.json(songList);
})

app.get("/api/list", (req , res)=>{
    res.json(songList);
})

app.post("/api/list/top",(req , res)=>{
    console.log("post ok")
    let toUpdateId = req.body.id
    let checkval = req.body.check;
updateVote(checkval ,toUpdateId);
console.log(songList);
res.json(songList);
})

app.get("/api", (req , res)=>{
    res.send("Hii");
})

// app.post ('/api/' , (req , res)=>{
//     const name = req.body.name;
//     res.send(`Hello bhai ${name}`)
    
// })


app.listen(port , ()=>{
    console.log(`http://localhost:${port}`)
})