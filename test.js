let x = {
    "a": 1,
    "b":2,
    "c":3
}

let dd = {
    "a": 4,
    "b":5,
    "c":6
}

for (const v in x){
    dd[v] = x[v]
}
console.log(dd);
