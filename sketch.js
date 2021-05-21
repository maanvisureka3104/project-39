var dog,happyDog;
var db,foodS,foodStock;
var dogimg,happydogimg;
var foodObj, fedTime,lastFed;
var feed, addFood;

function preload()
{
dogimg=loadImage("Dog.png");
happydogimg=loadImage("happydog.png")
}

function setup() {

  db=firebase.database();
  createCanvas(500, 500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale=0.15;

  foodStock=db.ref("Food")
  foodStock.on("value",readStock)
  textSize(20);

  foodObj=new Food();

  fedTime=db.ref('FeedTime');
  fedTime.on("value", function(data){
   lastFed=data.val();
  })
 
  feed=createButton("Feed the dog")
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87)

  dog.addImage(dogimg);
  drawSprites();
  textSize(15);
  fill("black")
  text("foodStock:" + foodS, 200,200)
  //add styles here
  
  foodObj.display();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happydogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  db.ref('/').update({
    Food:foodObj.getFoodStock(),
  })
}

function addFoods(){
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}
