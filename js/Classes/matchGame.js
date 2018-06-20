class matchGame {
    constructor(gameDiv) {
        this.gameDiv = document.getElementById(gameDiv)
        this.top = document.createElement('header')
        this.gameDiv.appendChild(this.top);
        this.msgBox = document.createElement('div')
        this.msgBox.innerHTML = "<h1>Welcome!</h1>"
        this.top.appendChild(this.msgBox)
        this.tempPair = [0,1];
        this.tries = 0;
        this.matches = 0;
        this.diff = 0
        this.minutes = 0;
        this.totSec = 0
        this.minutes = 0
        this.seconds = 0;
        this.score = 0;
        this.average = this.tries / this.matches
       

        // create the difficulty selection menu
        this.gridSelect = document.createElement('select')
        this.top.appendChild(this.gridSelect);
        let difficulty = ['novice','easy','medium','hard']
        for (let i = 0; i < difficulty.length; i++) {
            let opt = document.createElement('option');
            opt.value = difficulty[i];
            opt.text = difficulty[i];
            this.gridSelect.appendChild(opt)
        }
        this.goBtn = document.createElement('button')
        this.goBtn.innerHTML = "START!"
        this.goBtn.addEventListener('click', this.startGame.bind(this));
        this.top.appendChild(this.goBtn)
        

        //create game div area
        this.gDiv = document.createElement('div');
        this.gDiv.id = 'gDiv'
        this.gDiv.innerHTML = "<h3>Please select a Difficulty...</h3>"
        this.gameDiv.appendChild(this.gDiv)
        this.tileset = ['anchor.jpg','apple.jpg','barn.jpg','baseball.jpg','basketball-player-dunking.jpg','basketball-player.jpg','boxer.jpg','car.jpg','cat.jpg','cowboy-boot.jpg','duck.jpg','eagle.jpg','fish.jpg','golden-anchor.jpg','grapes.jpg','horse.jpg','house.jpg','jumping-horse.jpg','jumping.jpg','key.jpg','keys.jpg','lion.jpg','monster-truck.jpg','motorcycle.jpg','pocket-watch.jpg','scissors.jpg','seahorse.jpg','shark.jpg','shoe.jpg','stopwatch.jpg','wagon-wheel.jpg','wheel.jpg']
 
        
    } // ~.constructor

startGame() {
    this.gDiv.innerHTML = ""
    this.randTile = this.tileset.sort((a, b) => {
        return 0.5 - Math.random() // built-in random function of .sort()
    });
    this.gameSet = new Array()
    if (this.gridSelect.value == 'novice') {
        this.diff = 12
        
    } else if (this.gridSelect.value == 'easy') {
        this.diff = 18
    } else if (this.gridSelect.value == 'medium'){
        this.diff = 24
    } else {
        this.diff = 30
    }
    for (let i = 0; i < this.diff; i++) {  // or slice to diff plus ...
        for (let p = 0; p < 2; p++) {
            this.gameSet.push(this.randTile[i]);    
        }
       
    }
    this.gameSet.sort((a, b) => {
        return 0.5 - Math.random() // built-in random function of .sort()
    });
    for (let x = 0; x < this.gameSet.length; x++) {
        let newDiv = document.createElement('div');
        newDiv.id = 'div'+x;
        newDiv.src = this.gameSet[x]
        newDiv.addEventListener('click', this.clickDiv.bind(this))
        let img = document.createElement('img')
        img.src = "images/" + this.gameSet[x];
        img.id= x;
        newDiv.appendChild(img);
        newDiv.className = 'tiles'
        this.gDiv.appendChild(newDiv);
    }
this.seconds = 5
const countDown = setInterval(() => {
    if (this.seconds == -1) {
        this.msgBox.innerHTML = "<h1>Begin!</h1>"
        clearInterval(countDown)
    } else {
    this.msgBox.innerHTML = "<h1>Starting Game in . . . " + this.seconds + " seconds!</h1>"
    this.seconds--
    }

}, 1000)
    //timed flip over all
    setTimeout(this.flipAll.bind(this), 6000)
    setTimeout(this.scoreIt.bind(this), 6000)
    

} // ~.startGame()
clickDiv() {
    //flip card and add to temp array if not yet flipped
    //if temp array.length = 2 run compare
   if (this.tempPair[0] !== event.target.id && this.tempPair[1] !== event.target.id && this.tempPair.length < 2){
   this.tempPair.push(this.showCard())
   this.tries++
       alert(event.target.src)

    
    //alert(this.tempPair[0])
    if (this.tempPair.length == 2) {
        if (document.getElementById('div' + this.tempPair[0]).src == document.getElementById('div' + this.tempPair[1]).src){
           //alert("Congrats")
           this.tempPair = []
           this.matches++
           if(this.matches == this.diff){
               this.win()
           }
       } else {
           //alert("try again!")
           //debugger
           setTimeout(this.flipCard.bind(this),500)
       }
    }
}

} // ~.clickDiv
showCard() {

    let idx = event.target.id
    let thisDiv = document.getElementById('div' + idx)
    document.getElementById(idx).src = "images/" + thisDiv.src;
    return event.target.img
}// ~.showCard

flipCard() {
    for (let j = 0; j < this.tempPair.length; j++) {
        document.getElementById(this.tempPair[j]).src = "images/white-box.jpg";
    }
    this.tempPair = []
}// ~.flipCard

flipAll() {
        for (let j = 0; j < this.gameSet.length; j++) {
        document.getElementById(j).src = "images/white-box.jpg";
    }
    this.tempPair = [];
}// ~.flipAll

scoreIt() {
    this.totSec = 0
    const countGame = setInterval(() => {
        // timer / matches / score
        this.totSec++
        this.score = Math.ceil(this.average * ((this.diff) ** 2) * this.matches * 1000 / this.totSec)
            this.msgBox.innerHTML = this.score
    }, 1000)

}// ~.scoreIt
win() {
alert("You Win!")
//this.score = Math.ceil(this.average * ((this.gameArr.length/2)**2)*this.matches * 1000 / this.totSec)
}// ~.win

}  // ~.class