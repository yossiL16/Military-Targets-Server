export function printInfo(req,res,next) {
    console.log(req.method);
    console.log(req.headersDistinct.host.toString()+req.url)
    console.log( new Date().toISOString());
    next()
}


export function addToRes(req,res,next) {
    res.setHeader('X-Server-Start-Time', new Date().toISOString()) 
    next()
}
