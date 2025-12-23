import {promises as fs} from 'fs'

const location = './data/target.json'

export async function writeToFile(data){
    try {

    await fs.writeFile(location,JSON.stringify(data,null, 2))
    console.log("The save was successful.");
    
    } catch (err) {
        console.error("ERROR", err);
    }
}

fs.writeFile