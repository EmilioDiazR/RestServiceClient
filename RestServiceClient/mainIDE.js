const http = require("node:http");
let data =[
    {type: "Task", id: "1", day: "28", month: "1", year: "2022", list: "Clean, Do exercises", title: "Rutine", responsible: "Emilio", description: "Sleep early"},
    {type: "Task", id: "2", day: "29", month: "1", year: "2022", list: "Do homework, Finish commisions", title: "work", responsible: "Emilio", description: "Dont forget the homework"},
    {type: "Task", id: "3", day: "30", month: "1", year: "2022", list: "Match voleiball, go to supermarket", title: "Match", responsible: "Emilio", description: "Buy food to the month"},
] ;

let headers= {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 3002000,
    "Access-Control-Allow-Headers" : "*"
}

const server = http.createServer((req, res)=>{
    console.log("Request arrived");
    if(req.method==="OPTIONS"){
        res.writeHead(204,headers);
        res.end();
    }
    else if(req.url == "/Notes" && req.method=="GET"){
        res.writeHead(200, "ok",{
            ...headers,
            "Content-Type": "appilcation/json"
        })
        res.end(JSON.stringify(data));
    }else if (req.url.match(/\Notes\/([0-9]+)/) && req.method=="GET"){
        let urlparts = req.url.split("/");
        console.log(urlparts);
        id = urlparts[2];
        let notes = data.find((notes)=>notes.id==id); 
        res.writeHead(200,"Ok",{
            ...headers,
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify(notes));
    }
    else if(req.url== "/Notes" && req.method =="POST"){
        let notes = "";
        req.on("data", (byte)=>{
            notes += byte.toString();
        })
        req.on("end",()=>{
            console.log(notes);
            notes = JSON.parse(notes);
        if(data.find((element)=>element.id==notes.id)){
            res.writeHead(400, "Not OK",{
                ...headers,
                "Content-Type": "application/json"
            })
            res.end(JSON.stringify({message: "Could not create"}));
        }else{
            data.push(notes);
            res.writeHead(200, "Ok",{
                ...headers,
                "Content-Type": "application/json"
            })
            res.end(JSON.stringify(notes));
            }
        });
    }
    else {
        res.end(JSON.stringify({message:"Hello World"}));
    }
});
server.listen(9000, ()=>{
    console.log("Listen on port 9000");
});

