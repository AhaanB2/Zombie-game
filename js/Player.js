class Player {
  constructor(){
    this.index = null;
    //this.distance = 0;
    this.name = null;
    this.rank = null;
    this.X = 0
    this.Y = 0
    this.score = 0
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      //distance:this.distance
      Xpos:this.X,
      Ypos:this.Y,
      score:this.score
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
   /*getcarsatend(){
    var caeref = database.ref('carsatend');
    caeref.on("value",(data)=>{
      this.rank = data.val();
    })
  }
  static updatecae(rank){
    database.ref('/').update({
      carsatend: rank
    });
  }
*/


}


