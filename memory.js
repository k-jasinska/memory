(function(){
"use strict";
const images=[1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];

let cards=document.querySelectorAll(".card");
cards=[...cards];

const startTime=new Date().getTime();
let activeCard="";
const activeCards=[];
const gamePairs=cards.length/2;
let gameResult=0;
let sec=0;
let min=0;


const clickCard=function(){
    activeCard=this;
    if(activeCard==activeCards[0]) return;
    activeCard.classList.remove("hid");
    if(activeCards.length===0)
    {
        activeCards.push(activeCard);
        return;
    }
    else{
        cards.forEach(card=>{card.removeEventListener("click", clickCard)})
        activeCards.push(activeCard);
        setTimeout(() => {
            if(activeCards[0].className===activeCards[1].className){
                activeCards.forEach(card => {card.classList.add("off")})
                gameResult++;
                 cards=cards.filter(card => !card.classList.contains("off"))
                if(gameResult==gamePairs){
                    document.querySelector(".score").style.visibility = "hidden";
                    const endTime=new Date().getTime();
                    const gameTime=(endTime-startTime)/1000;
                    const winner=document.querySelector(".board").innerHTML=`<div style="margin-top:150px;">Wygrałeś!!! Twój wynik to ${gameTime} sekund.</div><br> <div>Chcesz zagrać jeszcze raz?</div><br><button class='btn btn-success' onclick='location.reload()'>TAK</button>`;
                }
            }
            else {
                activeCards.forEach(card=>{card.classList.add("hid")})
            }
            activeCard="";
            activeCards.length=0;
            cards.forEach(card=>{card.addEventListener("click", clickCard)})
        }, 1000);
    }
};

const init=function(){

    setTimeout(function(){
        document.querySelector(".loading").style.visibility = "hidden";
       
    } ,6000)


    cards.forEach((card)=>{
        const position=Math.floor(Math.random()*images.length);
        card.classList.add('c'+images[position]);
        images.splice(position,1);
    })

    setTimeout(function(){
        setInterval(updateClock, 1000);
        cards.forEach((card)=>{
            card.classList.add("hid");
            card.addEventListener("click", clickCard)
        })
    } ,7500)
};

function updateClock(){
    let format="";
    sec++;
    if(sec===60){
        min++;
        sec=0;
    }
    if(sec<10)  format="0"+min+":0"+sec;
    else  format="0"+min+":"+sec;
    const time=document.querySelector(".score").innerHTML=format;
}

init();

//moze wywalic te sciezki 
//dodac modal ktory pyta czy dodac wynik do bazy i pokazac ranking

})();