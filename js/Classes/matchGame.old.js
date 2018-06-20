class matchGame {
    constructor(gameDiv) {
        this.gameDiv = document.getElementById(gameDiv)
        this.top = document.createElement('header')
        this.gameDiv.appendChild(this.top);
        this.top.innerHTML = "<h1>Welcome!</h1>"
        this.tempPair = new Array();
       

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
    let diff = 0
    this.gDiv.innerHTML = ""
    this.randTile = this.tileset.sort((a, b) => {
        return 0.5 - Math.random() // built-in random function of .sort()
    });
    this.gameSet = new Array()
    if (this.gridSelect.value == 'novice') {
        diff = 12
        
    } else if (this.gridSelect.value == 'easy') {
        diff = 18
    } else if (this.gridSelect.value == 'medium'){
        diff = 24
    } else {
        diff = 30
    }
    for (let i = 0; i < diff; i++) {
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
        newDiv.flipped = 1;
        newDiv.src = this.gameSet[x]
        newDiv.addEventListener('click', this.clickDiv.bind(this))
        let img = document.createElement('img')
        img.src = "images/" + this.gameSet[x];
        img.id= x;
        newDiv.appendChild(img);
        newDiv.className = 'tiles'
        this.gDiv.appendChild(newDiv);

        
    }
//timed flip over all
setTimeout(this.flipAll.bind(this), 4000)
//this.flipAll()

} // ~.startGame()
clickDiv() {
    //flip card and add to temp array if not yet flipped
    //if temp array.length = 2 run compare
   // debugger
   // const clicked = event.target;
    if (document.getElementById('div' + event.target.id).flipped == 0 && this.tempPair.length < 2) {
   // if (this.tempPair[0] !== event.target.id && this.tempPair[1] !== event.target.id && this.tempPair.length < 2){
   this.tempPair.push(this.showCard())
    
    //alert(this.tempPair[0])
    if (this.tempPair.length == 2) {
        if (document.getElementById('div' + this.tempPair[0]).src == document.getElementById('div' + this.tempPair[1]).src){
           //alert("Congrats")
           this.tempPair = []
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
    thisDiv.flipped = 1;
    document.getElementById(idx).src = "images/" + thisDiv.src;
    return event.target.id
}// ~.showCard

flipCard() {
    for (let j = 0; j < this.tempPair.length; j++) {
        document.getElementById(this.tempPair[j]).src = "images/white-box.jpg";
        document.getElementById('div' + this.tempPair[j]).flipped = 0;
    }
    this.tempPair = []
}// ~.flipCard

flipAll() {
        for (let j = 0; j < this.gameSet.length; j++) {
        let img = document.getElementById(j)
        img.src = "images/white-box.jpg";
        let imgDiv = document.getElementById('div' + j)
        imgDiv.flipped = 0;
        this.tempPair = [];
        
    }
}// ~.flipAll

}  // ~.class