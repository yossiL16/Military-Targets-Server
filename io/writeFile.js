import {promises as fs} from 'fs'

const location = '../data/target.json'

export async function writeToFile(data){
    try {
    await fs.writeToFile(location,JSON.stringify(data))
    console.log("The save was successful.");
    
    } catch (err) {
        console.error("ERROR", err);
    }
}