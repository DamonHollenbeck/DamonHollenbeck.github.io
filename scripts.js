/*
Damon Hollenbeck
Yahtzee Project
Push enter for all text boxes
*/
console.log("scripts.js loaded!");
var turn_rolls = 0;
var yahtzee = false;
var turn = 0;
var oldName = false;
var user ={
  total_rolls: 0,
  turn_rolls: 0,
  dice:[0,0,0,0,0],
  name:"name",
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  five: 0,
  six: 0,
  threeOfaKind: 0,
  fourOfaKind: 0,
  fullHouse: 0,
  smallStraight: 0,
  lgStraight: 0,
  chance: 0,
  yahtzee: 0,
  yahtzeeBonus: 0
}
localStorage.setItem(user.name, JSON.stringify(user));
var dValue = [];
var dice_tags = [
  '<img src="images/one.svg" height="40" width="40">',
  '<img src="images/two.svg" height="40" width="40">',
  '<img src="images/three.svg" height="40" width="40">',
  '<img src="images/four.svg" height="40" width="40">',
  '<img src="images/five.svg" height="40" width="40">',
  '<img src="images/six.svg" height="40" width="40">',
]

var nameValidation = document.getElementById("validName");
nameValidation.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    var badName = false;
    var check = ["!","@","#","$","%","^","*","(",")","-","+","?"];
    var value = this.value;
    check.forEach(function(element){
      console.log(value.includes(element));
      if(value.includes(element)){
        badName = true;
      }
    });
    if(badName == true){
      document.getElementById("welcome").innerHTML = "Warning! Invalid Name Entered";
    }
    else if(this.value==""){
      document.getElementById("welcome").innerHTML = "Welcome, Stranger";
      this.disabled = true;
    }
    else if(this.value){
    user.name = this.value;
    this.disabled = true;
    document.getElementById("welcome").innerHTML = "Welcome, "+this.value;
    console.log(user.name);
  }
}
});
function sumUpper(){
  sum = 0;
  for(var i = 1; i < 7; i++){

  if(parseInt(document.getElementById("category_"+i).innerHTML)){
    sum += parseInt(document.getElementById("category_"+i).innerHTML);
  }
  }
  document.getElementById("totalU1").innerHTML = sum;
  if(parseInt(document.getElementById("totalU1").innerHTML)>=63){
    document.getElementById("bonus").innerHTML = 35;
  }
  if(parseInt(document.getElementById("bonus").innerHTML) == 35){
    document.getElementById("totalU2").innerHTML = sum + 35;
  }
  if(parseInt(document.getElementById("bonus").innerHTML) != 35){
    document.getElementById("totalU2").innerHTML = sum;
  }
  console.log(turn);
}
function sumLower(){
  sum = 0;
  if(parseInt(document.getElementById("threekind").innerHTML)){
    sum += parseInt(document.getElementById("threekind").innerHTML);
  }
  if(parseInt(document.getElementById("fourkind").innerHTML)){
    sum += parseInt(document.getElementById("fourkind").innerHTML);
  }
  if(parseInt(document.getElementById("fullH").innerHTML)){
    sum += parseInt(document.getElementById("fullH").innerHTML);
  }
  if(parseInt(document.getElementById("smStraight").innerHTML)){
    sum += parseInt(document.getElementById("smStraight").innerHTML);
  }
  if(parseInt(document.getElementById("lgStraight").innerHTML)){
    sum += parseInt(document.getElementById("lgStraight").innerHTML);
  }
  if(parseInt(document.getElementById("y").innerHTML)){
    sum += parseInt(document.getElementById("y").innerHTML);
  }
  if(parseInt(document.getElementById("chanceSpot").innerHTML)){
    sum += parseInt(document.getElementById("chanceSpot").innerHTML);
  }
  if(parseInt(document.getElementById("YB").innerHTML)){
    sum += parseInt(document.getElementById("YB").innerHTML);
  }
  document.getElementById("totalL").innerHTML = sum;
  if(parseInt(document.getElementById("totalU2").innerHTML)){
  document.getElementById("totalU3").innerHTML = parseInt(document.getElementById("totalU2").innerHTML)
  }
  //console.log(document.getElementById("totalU2"));
  if(parseInt(document.getElementById("totalU3").innerHTML)){
  document.getElementById("grandTotal").innerHTML = sum + parseInt(document.getElementById("totalU2").innerHTML);
}
console.log(turn);
}
///////ROll BUTTON////////////
var roll_button = document.getElementById("RollButton");
var die_0 = document.getElementById("die_0");
var die_1 = document.getElementById("die_1");
var die_2 = document.getElementById("die_2");
var die_3 = document.getElementById("die_3");
var die_4 = document.getElementById("die_4");
roll_button.addEventListener('click', function(){
  document.getElementById("error").className = "invisible";
  console.log("roll_button clicked!");
  var temp = [];
  if(turn_rolls < 3 && turn < 12){
  for(var i=0; i<5; i++){
    if(document.getElementById("die_"+i).getAttribute("class")=="notClicked"){
    var diceValue=Math.floor(6*Math.random());
    temp.push(diceValue+1);
    document.getElementById("die_"+i).innerHTML=dice_tags[diceValue];
      }
    else if(document.getElementById("die_"+i).getAttribute("class")=="yesClicked"){
      temp.push(dice_tags.indexOf(document.getElementById("die_"+i).innerHTML)+1);

    }
  }
dValue = temp;
turn_rolls++;
}

});
//////////////////SAVE////////////////////
var save = document.getElementById("save")
save.addEventListener('click', function(){
  user.dice = dValue;
  user.turn_rolls = turn_rolls;
  user.total_rolls = turn;
  user.one = parseInt(document.getElementById("category_1").innerHTML);
  user.two = parseInt(document.getElementById("category_2").innerHTML);
  user.three = parseInt(document.getElementById("category_3").innerHTML);
  user.four = parseInt(document.getElementById("category_4").innerHTML);
  user.five = parseInt(document.getElementById("category_5").innerHTML);
  user.six = parseInt(document.getElementById("category_6").innerHTML);
  user.threeOfaKind = parseInt(document.getElementById("threekind").innerHTML);
  user.fourOfaKind = parseInt(document.getElementById("fourkind").innerHTML);
  user.fullHouse = parseInt(document.getElementById("fullH").innerHTML);
  user.smallStraight = parseInt(document.getElementById("smStraight").innerHTML);
  user.largeStraight = parseInt(document.getElementById("lgStraight").innerHTML);
  user.chance = parseInt(document.getElementById("chanceSpot").innerHTML);
  user.yahtzee = parseInt(document.getElementById("y").innerHTML);
  user.yahtzeeBonus = parseInt(document.getElementById("YB").innerHTML);
  console.log(user.dice);
  localStorage.setItem(user.name, JSON.stringify(user));
});
/////////////////////LOAD///////////////////
var load = document.getElementById("load")
load.addEventListener('click', function(){
  console.log(oldName);
  if(JSON.parse(localStorage.getItem(user.name))){
    oldName = true;
  }
   if(oldName){
   var import1;
   import1 = JSON.parse(localStorage.getItem(user.name));
   if(import1.turn_rolls == 0){
     for(var i = 0; i < 5; i++){
     document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
     document.getElementById("die_"+i).setAttribute("class","notClicked")
    }
   }
   else if(import1.turn_rolls != 0){
     dValue = import1.dice;
     for(var i = 0; i < 5; i++){
     document.getElementById("die_"+i).innerHTML=dice_tags[import1.dice[i]-1];
      }
   console.log(dValue);
   }
   if(import1.one){
     document.getElementById("category_1").innerHTML = import1.one;
     document.getElementById("1_category").className = "yesClicked";
   }
   if(import1.two){
     document.getElementById("category_2").innerHTML = import1.two;
     document.getElementById("2_category").className = "yesClicked";
   }
   if(import1.three){
     document.getElementById("category_3").innerHTML = import1.three;
     document.getElementById("3_category").className = "yesClicked";
   }
   if(import1.four){
     document.getElementById("category_4").innerHTML = import1.four;
     document.getElementById("4_category").className = "yesClicked";
   }
   if(import1.five){
     document.getElementById("category_5").innerHTML = import1.five;
     document.getElementById("5_category").className = "yesClicked";
   }
   if(import1.six){
     document.getElementById("category_6").innerHTML = import1.six;
     document.getElementById("6_category").className = "yesClicked";
   }
   if(import1.threeOfaKind){
     document.getElementById("threekind").innerHTML = import1.threeOfaKind;
     document.getElementById("catThree").className = "yesClicked";
   }
   if(import1.fourOfaKind){
     document.getElementById("fourkind").innerHTML = import1.fourOfaKind;
     document.getElementById("catFour").className = "yesClicked";
   }
   if(import1.fullHouse){
     document.getElementById("fullH").innerHTML = import1.fullHouse;
     document.getElementById("catFull").className = "yesClicked";
   }
   if(import1.smallStraight){
     document.getElementById("smStraight").innerHTML = import1.smallStraight;
     document.getElementById("catSmall").className = "yesClicked";
   }
   if(import1.largeStraight){
     document.getElementById("lgStraight").innerHTML = import1.largeStraight;
     document.getElementById("catStraight").className = "yesClicked";
   }
   if(import1.chance){
     document.getElementById("chanceSpot").innerHTML = import1.chance;
     document.getElementtById("catChance").className = "yesClicked";
   }
   if(import1.yahtzee){
     document.getElementById("y").innerHTML = import1.yahtzee;
     document.getElementById("catY").className = "yesClicked";
   }
   if(import1.yahtzeeBonus){
     document.getElementById("YB").innerHTML = import1.yahtzeeBonus;
     document.getElementById("catYB").className = "yesClicked";
   }
   turn_rolls = import1.turn_rolls;
   turn = import1.total_rolls;
   sumUpper();
   sumLower();
 }
});
//////////////UPPER VALIDATION/////////////
for(i = 1; i < 7; i++){
var sum = 0;
var upper = document.getElementById(i);
upper.addEventListener('keyup', function(event){
  if (event.keyCode==13){
  console.log("aces listener works");
  sum = 0;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = parseInt(this.value);
  console.log(dValue);
  dValue.forEach(function(a){
    if(category_score == a){
      console.log(a);
      sum++;
    }
  });
  console.log(sum);
  console.log(value);
if(value == sum*category_score || value == 0){
    document.getElementById("error").className = "invisible";
    document.getElementById(category_score+"_category").className = "yesClicked";
    document.getElementById("category_"+category_score).innerHTML = value;
    sumUpper();
    sumLower();
    sum = 0;
    for(var i = 0; i < 5; i++){
    document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
    document.getElementById("die_"+i).setAttribute("class","notClicked")
    turn_rolls = 0;
  }
  turn++;
  }
  else{
    document.getElementById("error").className = "visible";
    document.getElementById(category_score+"_category").className = "notClicked";
    sum = 0;
  }
}
});
}
/////////////////THREE OF A KIND//////////////////
var threeKind = document.getElementById("3ofaKind");
threeKind.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    dValue.sort();
    var threeofakind = false;
    var sum = 0;

    for(i = 0; i < 5; i++){
      sum += dValue[i];
    }

    for(var i = 0; i < 3; i++){
      if(dValue[i]==dValue[i+1] && dValue[i] == dValue[i+2]){
        threeofakind = true;
      }
    }
    if(parseInt(this.value)==sum|| parseInt(this.value) == 0 && threeofakind == true){
      document.getElementById("error").className = "invisible";
      document.getElementById("catThree").className = "yesClicked";
      document.getElementById("threekind").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catThree").className = "notClicked";
    }
  }
});
///////////////FOUR OF A KIND////////////////
var fourKind = document.getElementById("4ofaKind");
fourKind.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    dValue.sort();
    var fourofakind = false;
    var sum = 0;

    for(i = 0; i < 5; i++){
      sum += dValue[i];
    }

    for(var i = 0; i < 2; i++){
      if(dValue[i]==dValue[i+1] && dValue[i] == dValue[i+2] && dValue[i] == dValue[i+3]){
        fourofakind = true;
      }
    }
    if(parseInt(this.value)==sum|| parseInt(this.value) == 0 && fourofakind == true){
      document.getElementById("error").className = "invisible";
      document.getElementById("catFour").className = "yesClicked";
      document.getElementById("fourkind").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catFour").className = "notClicked";
    }
  }
});
//////////////////FULL HOUSE///////////////////
var fullHouse = document.getElementById("FullHouse");
fullHouse.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    dValue.sort();
    var isFullHouse = false;
    if(dValue[0]==dValue[1] && dValue[1] != dValue[2] && dValue[2] == dValue[3] && dValue[3] == dValue[4]){
      isFullHouse = true;
    }
    dValue.reverse();
    if(dValue[0]==dValue[1] && dValue[1] != dValue[2] && dValue[2] == dValue[3] && dValue[3] == dValue[4]){
      isFullHouse = true;
    }
    if(dValue[0]==dValue[1] && dValue[1] == dValue[2] && dValue[2] == dValue[3] && dValue[3] == dValue[4]){
      isFullHouse = true;
    }
    if((parseInt(this.value)==25 && isFullHouse) || parseInt(this.value) == 0){
      document.getElementById("error").className = "invisible";
      document.getElementById("catFull").className = "yesClicked";
      document.getElementById("fullH").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catFull").className = "notClicked";
    }
  }
});
////////////////LARGE STRAIGHT///////////////////////
var lgStraight = document.getElementById("large");
lgStraight.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    dValue.sort();
    console.log(dValue);
    var a = [1,2,3,4,5];
    var b = [2,3,4,5,6];
    if((parseInt(this.value)==40 && dValue.join() == a.join() || dValue.join() == b.join())|| parseInt(this.value) == 0){
      document.getElementById("error").className = "invisible";
      document.getElementById("catLarge").className = "yesClicked";
      document.getElementById("lgStraight").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catLarge").className = "notClicked";
    }
  }
});
///////////////////SMALL STRAIGHT/////////////////
var smStraight = document.getElementById("small");
smStraight.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    dValue.sort();

    if((parseInt(this.value)==30 && ((dValue.includes(1) && dValue.includes(2) && dValue.includes(3) && dValue.includes(4)) || (dValue.includes(2) && dValue.includes(3) && dValue.includes(4) && dValue.includes(5)) || (dValue.includes(3) && dValue.includes(4) && dValue.includes(5) && dValue.includes(6))))|| parseInt(this.value) == 0){
      document.getElementById("error").className = "invisible";
      document.getElementById("catSmall").className = "yesClicked";
      document.getElementById("smStraight").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catSmall").className = "notClicked";
    }
  }
});
/////////////////////CHANCE//////////////////////
var chance = document.getElementById("chance");
chance.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    var sum = 0;

    for(i = 0; i < 5; i++){
      sum += dValue[i];
    }
    console.log(sum);
    if(parseInt(this.value)==sum || parseInt(this.value) == 0){
      document.getElementById("error").className = "invisible";
      document.getElementById("catChance").className = "yesClicked";
      document.getElementById("chanceSpot").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catChance").className = "notClicked";
    }
  }
});
/////////////////////YAHTZEE///////////////////////
var yahtzee2 = document.getElementById("yahtzee");
yahtzee2.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    for(var i = 0; i < 1; i++){
      if(dValue[i] == dValue[i+1] && dValue[i] == dValue[i+2] && dValue[i] == dValue[i+3] && dValue[i] == dValue[i+4]){
        yahtzee = true;
      }
    }
    if((parseInt(this.value)==50 && yahtzee == true && yahtzeeB == true|| parseInt(this.value) == 0)){
      document.getElementById("error").className = "invisible";
      document.getElementById("catY").className = "yesClicked";
      document.getElementById("y").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catY").className = "notClicked";
    }
  }
});
////////////////////YATHZEE BONUS (DOESN'T WORK)/////////////////////
var yahtzeeBonus = document.getElementById("yBonus");
yahtzeeBonus.addEventListener('keyup', function(event){
  if (event.keyCode==13){
    var yahzteeB = false;
    for(var i = 0; i < 1; i++){
      if(dValue[i] == dValue[i+1] && dValue[i] == dValue[i+2] && dValue[i] == dValue[i+3] && dValue[i] == dValue[i+4]){
        yahzteeB = true;
      }
    }
    if((parseInt(this.value)==100 || parseInt(this.value) == 0)&& yahtzee == true){
      document.getElementById("error").className = "invisible";
      document.getElementById("catYB").className = "yesClicked";
      document.getElementById("YB").innerHTML = parseInt(this.value);
      sumLower();
      for(var i = 0; i < 5; i++){
      document.getElementById("die_"+i).innerHTML= '<img src="images/asheet.png" height="60" width="50">'
      document.getElementById("die_"+i).setAttribute("class","notClicked")
      turn_rolls = 0;
    }
    turn++;
    }
    else{
      document.getElementById("error").className = "visible";
      document.getElementById("catYB").className = "notClicked";
    }
  }
});
///////////////////RESERVE DICE//////////////////////
for(var i=0; i<5; i++){
  var clickDice = document.getElementById("die_"+i)
  clickDice.addEventListener('click', function(){
    if(this.getAttribute("class")== "notClicked"){
      console.log(this);
      this.setAttribute("class", "yesClicked");
    }

    else if(this.getAttribute("class")=="yesClicked")
      this.setAttribute("class","notClicked");
  });
}
//////////////////NEW GAME/////////////////////
var newGame = document.getElementById("newGame")
newGame.addEventListener('click', function(){
  window.location.reload();
});
