import express from 'express'
import {readFromFile} from './io/readFile.js'
const app = express();
const port = 3000;
app.use(express.json())




app.get('/health', (req,res) => {
    res.json({
        "status": "ok",
        "serverTime": new Date().toISOString()
        }
    )
})


app.get("/briefing", (req,res) => {
    try {
    const check = req.headers["client-unit"];
    console.log(req.headers);
    
    if (check === "Golani") {
        res.json({
  "unit": "Golani",
  "message": "briefing delivered"
})
    }
    else {
        res.status(400).json({msg:"not found"})
    }
} catch (err) {
console.error("ERROR", err);
}
})


app.get('/targets/:id', async (req, res) => {
    try {

        const data = await readFromFile()
        
        const id = req.params.id
        const found = data.targets.find((u) => u.id === id)
        if (found) {
            res.json(found)
        } else {
            res.status(404).json("not found")
        }
    } catch (err) {
        console.error("ERROR", err);
    }
})


app.get('/targets', async (req,res) => {
    try {
        const data = await readFromFile();
        const {region, status, minPriority} = req.query;

    } catch (err) {
        console.error("ERROR", err);
        
    }

})














app.listen(port, ()=>{
    console.log("server run.. ; http://localhost:3000");
})