import {promises as fs} from 'fs'

const location = './data/target.json'

export async function readFromFile() {
    try {
         const data = await fs.readFile(location);
         const jsonData = JSON.parse(data)
         return jsonData
    } catch (err) {
        console.error('ERROR', err);  
    }
}