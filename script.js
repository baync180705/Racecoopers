//Declaring and Initializing variables

    const play = document.getElementById("play");
    const pause = document.getElementById("pause");
    const road = document.getElementById("road");
    const city = document.getElementById("city");
    const car = document.getElementById('car');
    const wheel = document.getElementsByClassName("wheel");
    const backgroundAnimation = document.getElementsByClassName("animate-background");
    const upKey = document.getElementById("upKey");
    const downKey = document.getElementById("downKey");
    const usrdisplay = document.getElementById("display");
    const PB = document.getElementById("PB");
    const score = document.getElementById("Score");
    var alpha = 0;
    var best = 0;
    var carStatus = false;
    let move=18;
    var interval;
    const username = localStorage.getItem("username");
    const enemyCar = [
        document.getElementById("car1"),
        document.getElementById("car2"),
        document.getElementById("car3"),
        document.getElementById("car5"),
        document.getElementById("car7"),
    ]

// Throwing Welocome User ! on the game screen

    usrdisplay.innerHTML = `Welcome, ${username} !`;

//Checking the current status of the obstacle cars (whether in rest or motion)

    for(property of enemyCar){
        if(property.style.animation!="none"){
            carStatus=true;
        }   
        else {
            carStatus = false;
        }
    }

//Making the play button functional to start the game
    play.addEventListener('click',()=>{
        if(!road.classList.contains('animate-background')&& !city.classList.contains('animate-background' && !carStatus)){
        road.classList.add("animate-background");
        city.classList.add("animate-background");

        enemyCar[0].style.animation = "car1 linear 6s infinite";
        enemyCar[1].style.animation = "car2 linear 4.92s infinite";
        enemyCar[2].style.animation = "car3 linear 6s infinite";
        enemyCar[3].style.animation = "car5 linear 8s infinite";
        enemyCar[4].style.animation = "car7 linear 7.2s infinite";
        
        interval = setInterval(()=>{
            alpha += 10;
            score.innerHTML = `Score : ${alpha}` ;
        },100);
        }
        score.style.animation = "none";
        v=60;
    })

//Pauing the game once an accident are detected. Basically here pause is an invisible button which gets clicked automatically upon an accident.
    pause.addEventListener('click',()=>{
        road.classList.remove("animate-background");
        city.classList.remove("animate-background");
        enemyCar.forEach((elements)=>{
            elements.style.animation = "none";
        })
        car.style.bottom = "18%";
        clearInterval(interval);
        best = (alpha>best)?alpha:best;
        localStorage.setItem("PB",best);
        alpha = 0;
        score.style.animation = "blink linear 0.7s 8";
        PB.innerHTML = `PB : ${localStorage.getItem("PB")}`;
        move = 18;
    })

//Moving the car on pressing the selected keys or using the onscreen buttons
    upKey.addEventListener('click', carUp);
    downKey.addEventListener('click', carDown);


    function carUp() {
        move += 3; 
        car.style.bottom = `${move}%`;

    }

    function carDown() {
        move -= 3; 
        car.style.bottom = `${move}%`;
        }

    document.addEventListener('keypress',function moveCar(value){
        switch (value.key){
            case "w":
                move += 3; 
                car.style.bottom = `${move}%`;
                break;
            case "s":
                move -= 3; 
                car.style.bottom = `${move}%`;
                break;
        }
    })

//Increasing the animation speed of the background and the road
    let v = 60
    function speedIncrease(){
        v-=7;
        backgroundAnimation[0].style.animationDuration = `${v}s`;
    }
    setInterval(speedIncrease,2000);



//Detecting the accidents every 0.1 second
    setInterval( ()=>{

        //Step 1: Storing the values of top, bottom, left and right position of every car

        let car1_left = enemyCar[0].getBoundingClientRect().left;
        let car1_right = enemyCar[0].getBoundingClientRect().right;
        let car1_top = enemyCar[0].getBoundingClientRect().top;
        let car1_bottom = enemyCar[0].getBoundingClientRect().bottom;

        let car2_left = enemyCar[1].getBoundingClientRect().left;
        let car2_right = enemyCar[1].getBoundingClientRect().right;
        let car2_top = enemyCar[1].getBoundingClientRect().top;
        let car2_bottom = enemyCar[1].getBoundingClientRect().bottom;

        let car3_left = enemyCar[2].getBoundingClientRect().left;
        let car3_right = enemyCar[2].getBoundingClientRect().right;
        let car3_top = enemyCar[2].getBoundingClientRect().top;
        let car3_bottom = enemyCar[2].getBoundingClientRect().bottom;

        let car4_left = enemyCar[3].getBoundingClientRect().left;
        let car4_right = enemyCar[3].getBoundingClientRect().right;
        let car4_top = enemyCar[3].getBoundingClientRect().left;
        let car4_bottom = enemyCar[3].getBoundingClientRect().bottom;

        let car5_left = enemyCar[4].getBoundingClientRect().left;
        let car5_right = enemyCar[4].getBoundingClientRect().right;
        let car5_top = enemyCar[4].getBoundingClientRect().top;
        let car5_bottom = enemyCar[4].getBoundingClientRect().bottom;

        let car_left = car.getBoundingClientRect().left;
        let car_right = car.getBoundingClientRect().right;
        let car_top = car.getBoundingClientRect().top;
        let car_bottom = car.getBoundingClientRect().bottom

        //Step 2: Checking all possible overlaps of 2 cars or the user's car with the ends of the road. In case of an accident, the invisible pause button is clicked

        if((car_top<=car1_bottom&&car_bottom>=car1_bottom)&&(car_right>=car1_left&&car_left<=car1_left)||(car_bottom>=car1_top&&car_top<=car1_top)&&(car_right>=car1_left&&car_left<car1_left)||(car_top<=car1_bottom&&car_bottom>car1_bottom)&&(car_left<=car1_left&&car_right>=car1_right)||(car_bottom>=car1_top&&car_top<=car1_top)&&(car_left<=car1_left&&car_right>=car1_right)){
            alert(`GAME OVER!`);
            pause.click();
        }
        if((car_top<=car2_bottom&&car_bottom>=car2_bottom)&&(car_right>=car2_left&&car_left<=car2_left)||(car_bottom>=car2_top&&car_top<=car2_top)&&(car_right>=car2_left&&car_left<car2_left)||(car_top<=car2_bottom&&car_bottom>car2_bottom)&&(car_left<=car2_left&&car_right>=car2_right)||(car_bottom>=car2_top&&car_top<=car1_top)&&(car_left<=car2_left&&car_right>=car2_right)){
            alert(`GAME OVER!`);
            pause.click();
        }
        if((car_top<=car3_bottom&&car_bottom>=car3_bottom)&&(car_right>=car3_left&&car_left<=car3_left)||(car_bottom>=car3_top&&car_top<=car3_top)&&(car_right>=car3_left&&car_left<car3_left)||(car_top<=car3_bottom&&car_bottom>car3_bottom)&&(car_left<=car3_left&&car_right>=car3_right)||(car_bottom>=car3_top&&car_top<=car3_top)&&(car_left<=car3_left&&car_right>=car3_right)){
            alert(`GAME OVER!`);
            pause.click();
        }
        if((car_top<=car4_bottom&&car_bottom>=car4_bottom)&&(car_right>=car4_left&&car_left<=car4_left)||(car_bottom>=car4_top&&car_top<=car4_top)&&(car_right>=car4_left&&car_left<car4_left)||(car_top<=car4_bottom&&car_bottom>car4_bottom)&&(car_left<=car4_left&&car_right>=car4_right)||(car_bottom>=car4_top&&car_top<=car4_top)&&(car_left<=car4_left&&car_right>=car4_right)){
            alert(`GAME OVER!`);
            pause.click();
        }
        if((car_top<=car5_bottom&&car_bottom>=car5_bottom)&&(car_right>=car5_left&&car_left<=car5_left)||(car_bottom>=car5_top&&car_top<=car5_top)&&(car_right>=car5_left&&car_left<car5_left)||(car_top<=car5_bottom&&car_bottom>car5_bottom)&&(car_left<=car5_left&&car_right>=car5_right)||(car_bottom>=car5_top&&car_top<=car5_top)&&(car_left<=car5_left&&car_right>=car5_right)){
            alert(`GAME OVER!`);
            pause.click();
        }
        if(car_top<road.getBoundingClientRect().top || car_bottom>road.getBoundingClientRect().bottom){
            alert(`GAME OVER!`);
            pause.click();
        }
    },100
    )