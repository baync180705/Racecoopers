const form = document.getElementById("form");
let username;

form.addEventListener('submit', (action)=>{
    action.preventDefault();
    const userName = document.getElementById("user").value
    console.log(userName);
    localStorage.setItem("username",userName);
    username = localStorage.getItem("username");
    console.log(username);
    setTimeout(()=>{
        alert("Insturction:\nPress the key 'w' for moving up\nPress the key 's' for moving down\nYou can also use the buttons on the right end !");
        window.location.href="Racecooper.html";
    })
    ,0})  