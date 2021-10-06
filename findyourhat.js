const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
      this.field=field;
      this.pathPosition={ y:0,
                        x:0 };
  }
  print(){
    this.field.forEach(row => {
        console.log(row.join(""));
    });
  }

  static generateField(height,width,holePercent){
    let field = new Array(0);

    for(let i=0;i<height;i++){
        field.push(Array(width).fill(fieldCharacter));
    }

    field[0][0]=pathCharacter;
    field[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hat;

    for(let row=0;row<field.length;row++){
        for(let col=0;col<field[row].length;col++){
            let holeChance = Math.floor(Math.random()*100);
            if(holePercent>holeChance&&field[row][col]!=hat&&field[row][col]!=pathCharacter){
                field[row][col]=hole;
            }
        }
    }
    return field;
  }
  moveUp(){
      this.pathPosition.y--;
  }

  moveDown(){
    this.pathPosition.y++;
  }

  moveLeft(){
    this.pathPosition.x--;
  }
  moveRight(){
    this.pathPosition.x++;
  }
}
let userInput;

let testfield = new Field (Field.generateField(8,10,20));
playGame(testfield);

function playGame(gameBoard){

    let gameRunning=true;

    while(gameRunning){

        gameBoard.print();
        userInput= prompt("Please select a move, W for up, S for down, A for left and D for right or simply input CTRL+C to exit: ");
        userInput.toLowerCase();
        switch(userInput){
            case 'w':
                gameBoard.moveUp();
                break;
            case 's':
                gameBoard.moveDown();
                break;
            case 'a':
                gameBoard.moveLeft();
                break;
            case 'd':
                gameBoard.moveRight();
                break;
            default:
                console.log("invalid Input, please enter WASD for inputs");
                break;
        }

        if(gameBoard.pathPosition.y<0||gameBoard.pathPosition.x<0){
            console.log("You've gone off the board, falling to your death.");
            gameRunning=false;
        }else if(gameBoard.field[gameBoard.pathPosition.y][gameBoard.pathPosition.x]==hole){
            console.log("You've gone into a hole, falling to your death.");
            gameRunning=false;
        }else if(gameBoard.field[gameBoard.pathPosition.y][gameBoard.pathPosition.x]==hat){
            console.log("You've won! the hat is yours! Congratulations!");
            gameRunning=false;
        }else{
            gameBoard.field[gameBoard.pathPosition.y][gameBoard.pathPosition.x]=pathCharacter;
        }
        
    }
    
  }

