document.getElementById("button1").onclick = getinfo;
let button1;
document.getElementById("button2").onclick = postinfo;
let button2;

let url = new URL("http://localhost:9000/Notes");
fetch(url).then(response=>response.json()).then(data=>{
    console.log(data);
    insertInContainer(data);
})

function insertInContainer(array){
    let container = document.getElementById("container");
    array.forEach(element => {
        let listEntry = document.createElement("li");
        listEntry.textContent = element.type+" | "+element.id+" | "+element.day+" | "+element.month+" | "+element.year+" | "+element.list+" | "+element.tittle+" | "+element.responsible+" | "+element.description;
        container.appendChild(listEntry);
    });
}

function getinfo(event){
    event.preventDefault();
    let campo1 = document.getElementById("campo1");
    let url = ("http://localhost:9000/Notes/" + campo1.value);
    fetch(url).then(response=>response.json()).then(data=>{
        console.log(data);
        insertInContainerOne(data); 
    }) 
}

function insertInContainerOne(array){
    let container2 = document.getElementById("container2");
    let listEntry = document.createElement("li");
    listEntry.textContent = array.type+" | "+array.id+" | "+array.day+" | "+array.month+" | "+array.year+" | "+array.list+" | "+array.tittle+" | "+array.responsible+" | "+array.description;
    container2.appendChild(listEntry);
}

function postinfo (){
    fetch (url,{
        method: "POST",
        headers: {
            'Accept-Content': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type : document.getElementById("posttype").value,
            id : document.getElementById("postid").value,
            day : document.getElementById("postday").value,
            month : document.getElementById("postmonth").value,
            year : document.getElementById("postyear").value,
            list : document.getElementById("postlist").value,
            title : document.getElementById("posttitle").value,
            responsible : document.getElementById("postresponsible").value,
            description : document.getElementById("postdescription").value
        })

    })
}