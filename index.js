//game constants and variables//




let inputDir={x:0,y:0};
let foodSound=new Audio('eat.mp3');
let gameOverSound=new Audio('over.mp3');
let moveSound=new Audio('sound.mp3');
let musicSound=new Audio('music.mp3');
let speed=19;
let score=0;
let  lastPaintTime = 0;
let snakearr=[{x:1,y:18}];
food={x:6,y:8};
//Game functions//

function main(ctime){
   window.requestAnimationFrame(main); 
   console.log(ctime)
   if((ctime-lastPaintTime)/1000 < 1/speed){
    return;
   }
   lastPaintTime=ctime;
   gameengine();

}
//
function isCollide(snake){
   //If you bump into yourself
   for (let i = 1; i < snakearr.length; i++) {
    if(snake[i].x === snake[0].x &&snake[i].y === snake[0].y )
    {
        return true;
    }
}
//if you bump into the wall
    if((snake[0].x>=18||snake[0].x<=0) || snake[0].y>=18||snake[0].y<=0)
    {
        return true;
    }
    return false;
}
function gameengine(){

    //updating the snake array and food
    if(isCollide(snakearr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over .Press any key to play again");
        snakearr=[{x:13,y:15}];
        musicSound.play();
        score=0;

    }
//if you have eaten the food increase the score and regenerate the food
if(snakearr[0].y ===food.y && snakearr[0].x ===food.x)
{foodSound.play();
    score+=1;
    if(score>hiscoreval)
    {hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
        hiscoreBox.innerHTML="HiScore:"+hiscoreval;
    }
    scoreBox.innerHTML="Score:"+score;
    snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y});//adding a body segment to snake after eating food
    let a=2;
    let  b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};//updating food location since snake ate food//generting random number between  and b
}
//moving the snake
for (let i = snakearr.length-2; i >=0; i--){
  
    snakearr[i+1]={...snakearr[i]}//new object 

 
}
snakearr[0].x+=inputDir.x;
snakearr[0].y+=inputDir.y;

    //display the snake and food
    //display the snake
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
       
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
      
        if(index==0)
        {
            snakeElement.classList.add('head') ; 
        }
        else{
            snakeElement.classList.add('snake');    
        }

        board.appendChild(snakeElement);
        

    });
   
    //display the food
   
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
     foodElement.style.gridColumnStart=food.x;
     foodElement.classList.add('food');
       board.appendChild(foodElement);

    }
 //main logic starts here
 

   let hiscore=localStorage.getItem("hiscore") ;  
   if(hiscore==null) 
   {hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))

   }
   else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="HiScore:"+hiscore;
   }
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
inputDir = {x:0, y:1};//Statrt the game
moveSound.play();
musicSound.play();
switch(e.key){
    case"ArrowUp":
    console.log("ArrowUp")
    inputDir.x=0;//either snake moves in up direction or in down direction that is either x is 0 or y is 0
    inputDir.y=-1;//to move up y has to decrease
    break;
    case"ArrowDown":
    console.log("ArrowDown");
    inputDir.x=0;//we can gi ve this variable name has input velocity
    inputDir.y=1;
    break;
    case"ArrowRight":
    console.log("ArrowRight");
    inputDir.x=1;
    inputDir.y=0;
    break;
    case"ArrowLeft":
    console.log("ArrowLeft");
    inputDir.x=-1;
    inputDir.y=0;
    break;
    default:break;

}
});
    