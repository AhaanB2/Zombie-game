class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    players1 = createSprite(100,200,20,20);
    players1.addImage("player1",playerimg);
    players2 = createSprite(300,200,20,20);
    players2.addImage("player2",playerimg);
    players3 = createSprite(500,200,20,20);
    players3.addImage("player3",playerimg);
    players4 = createSprite(700,200,20,20);
    players4.addImage("player4",playerimg);
    players = [players1, players2, players3, players4];
    players1.scale = 0.3
    players2.scale = 0.3
    players3.scale = 0.3
    players4.scale = 0.3
    
    ivnvisprite = createSprite(windowWidth /2,windowHeight - 400,windowWidth,10)
    ivnvisprite.visible = false
  }

  play(){
    form.hide();
    //player.getcarsatend()
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //background(rgb(198,135,103));
      //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      background("black")

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200,y;
      
      if(frameCount %50 === 0){
        var Zombie = createSprite(random(100,windowWidth - 200),0)
        Zombie.addImage("Zombie",zombieimg)
        Zombie.velocityY = 4
        Zombie.lifetime = 195
        Zombie.scale = 0.2
        Zombiegroup.add(Zombie)
        console.log(Zombie.y)
      }

      if (Zombiegroup.isTouching(ivnvisprite)){
        baselife -= 2
      }
      
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + (index * 200) + allPlayers[plr].Xpos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].Ypos;
        players[index-1].x = x;
        players[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
          //camera.position.x = displayWidth/2;
          //camera.position.y = cars[index-1].y;
          //players [index - 1].collide(ivnvisprite)
          if(touches.length > 0 || keyDown("space") && player.index !== null){
            var gun = createSprite(players[index - 1].x,players[index - 1].y ,20,50)
            gun.addImage(bulletimg)
            gun.velocityY = -12
            //console.log(gun.x)
            Gungroup.add(gun)
            gun.scale = 0.1
            gun.lifetime = displayHeight /12 
            touches = []
          }
          for (var i = 0; i < Zombiegroup.length; i++){
            if (Zombiegroup.get(i).isTouching(Gungroup)){
              Zombiegroup.get(i).destroy()
              Gungroup.destroyEach()
              player.score = player.score + 1 
              player.update()
            }
          }
          textSize(25)
          fill("cyan")
          text("player 1: " + allPlayers.player1.score,50,50)
          text("player 2: " + allPlayers.player2.score,50,80)
          text("player 3: " + allPlayers.player3.score,50,120)
          text("player 4: " + allPlayers.player4.score,50,150)
       
       
        }
        
        
      }
       
    }

    

    if(touches.length > 0 || keyIsDown(UP_ARROW) && player.index !== null){
      player.Y +=10
      player.update();
      touches = []
    }
    if(touches.length > 0 || keyIsDown(DOWN_ARROW) && player.index !== null){
      player.Y -=10
      player.update();
      touches = []
    }
    if(touches.length > 0 || keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.X +=10
      player.update();
      touches = []
    }
    if(touches.length > 0 || keyIsDown(LEFT_ARROW) && player.index !== null){
      player.X -=10
      player.update();
      touches = []
    }
    
  
  
      
    /*if(player.distance > 4350){
      gameState = 2;
     player.rank += 1
     Player.updatecae(player.rank)
     textSize(25);
     text("your rank:"+ player.rank, displayWidth/2 - 50, y - 120)
    }
   */
    drawSprites();
    textSize(25)
    text("Baselife " + baselife,50,20)
  }

  end(){
    console.log("Game Ended");
  }
}
