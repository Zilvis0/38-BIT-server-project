class Pet {
    constructor(_name, _color, ){
        this.name = _name;
        this.color = _color;
    }

    introduce(){
        return `Hi. my name is ${this.name} and my color is ${this.color}`;
    }
}

class Dog extends Pet {

}

class Cat extends Pet {

}

const gyvunas = new Pet("Rezus", "Raudona");
console.log(gyvunas);
console.log(gyvunas.introduce());

const rex = new Dog("Rex", "black")
const sniegius = new Cat("Sniegius", "white")

console.log(rex);
console.log(sniegius);