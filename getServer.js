import express from 'express'
import {readFromFile} from './io/readFile.js'
import {writeToFile} from './io/writeFile.js'
import {printInfo, addToRes} from './Middleware.js'


const app = express();
const port = 3000;
app.use(express.json())
app.use(printInfo)
app.use(addToRes)


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
        
        const {region, status, priority} = req.query;

        let result = []

        for (let t of data.targets) {
            
            if (t.region === region || t.status === status || t.priority === priority) {
                result.push(t)
            }
           
        }
         res.json(result)

    } catch (err) {
        console.error("ERROR", err);
        
    }

})



app.post('/targets', async (req,res) => {
    try {
    if (!req.headers['content-type']) {
        res.status(404).json({msg: "ERROR not Content-Type in headers"})
    } else {
        const newTarget = req.body;
        
        if (Object.keys(newTarget).length === 6) {
            let data = await readFromFile()
            
            data.targets.push(newTarget)
            
            writeToFile(data)
            res.json({msg:'The addition was successful.'})
        } else{
            res.json({err: "Missing fields in the body"})
        }
    }
    } catch (err) {
        console.error(err);
    }
})


app.put('/targets/:id', async (req,res) => {
    console.log("start");
    
    const change = req.body
    const id = req.params.id;
    try {
    let data = await readFromFile()
    
    data.targets.forEach((i)=> {
        if(i.id === id) {
            for (const f in change) {
                i[f] = change[f]
            }
        }
    })
    writeToFile(data)
    res.json({msg:"The update was successful"})
} catch (err) {
    console.error(err);   
}
})



app.delete('/targets/:id', async (req,res) => {
    const id = req.params.id
    try {
        let data = await readFromFile();
        for (const targ in data.targets) {
            
            if (data.targets[targ].id === id) {
                data.targets.splice(targ, 1)
            }
        }
        res.json({msg:"The deletion was successful."})
        writeToFile(data)
    } catch (err) {
        res.json({err: err})
    }
})












app.listen(port, ()=>{
    console.log("server run.. ; http://localhost:3000");
})