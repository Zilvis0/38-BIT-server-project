class dog{
    constructor(name){
        this.name = name,
        this.boneCount = 0; 
        this.sound = "au";
    }
    balsas(){
        let capitalLetter = this.sound[0].toUpperCase()
        let restOfWord = this.sound.slice(1)
        console.log(`${this.name}: ${capitalLetter+restOfWord} ${this.sound}!`)   
    }
    bone(_boneParam){
        console.log(this.name,":","🦴 ".repeat(++this.boneCount), "!")
    }
    changeVoice(_sound){
        this.sound = _sound;
    }
};

class cat{
    constructor(_name){
        this.name =_name;
        this.mouseCount = 0; 
    }
    sayHi(){
        return `${this.name}: Labas!`
    }
    sayBye(_placehold = "Drauge"){
        return `${this.name}: Iki ${_placehold}!`
    }
    newMouse(){
        console.log(this.name,":","🐭 ".repeat(++this.mouseCount), "!")
    }
}
const Rainis = new cat("Rainis");

console.log(Rainis);
console.log(Rainis.sayHi());
console.log(Rainis.sayBye("Petrai"));
Rainis.newMouse();
Rainis.newMouse();
Rainis.newMouse();
Rainis.newMouse();

const Rex = new dog("Rex")
const Spike = new dog("Spike")
const Brisius = new dog("Brisius")

// Rex.balsas()
// Spike.balsas()
// Brisius.balsas()

// Rex.bone()
// Rex.bone()
// Rex.bone()
// Rex.bone()
// Spike.bone()
// Brisius.bone()

// Rex.changeVoice("bark")
// Rex.balsas()

// Rex.changeVoice("woof")
// Rex.balsas()