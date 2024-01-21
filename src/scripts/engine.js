//gerenciamento de variaveis globais
//views alteram visuais e values outras informações
const state = {//criar varial receber objeto
    view:{//elementos para alterar na visulaizaçao
        squares:document.querySelectorAll(".square"),//caprtura qualquer quadradinho
        enemy:document.querySelector(".enemy"),//capaturar um enimigo
        timeLeft:document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        lifes:document.querySelector("#lifes"),
    }, 
    values:{
        idTime:null,
       
   
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        currentTime:10,
        life:3,
    },
    actions:{
        idTime:setInterval(randomSquare,1000),
        countDownTimerId:setInterval(countDown,1000),
    }
};
//sortear square
function randomSquare(){
    //tira todas classe enemis
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}
//fazer movimento do personagem sozinho deuma variavel temporaria
/*function moveEnemy(){
    //a cada intervalo troca o inimigo
    state.values.idTime = setInterval(randomSquare,state.values.gameVelocity);
}*/
//para acessar state.view.variavel
function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id===state.values.hitPosition){
                
                state.values.result++;
                //mudar o resultado na visualização
                state.view.score.textContent =state.values.result;
                //nao deixar que o usuario clique ate a posicao iniciar
                state.values.hitPosition = null;
                playSound("hit");
                
            }
        })
    });
}
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime<=0){
        
        state.values.life--;
        state.view.lifes.textContent ="X"+ state.values.life;
        alert("Game Over! O Seu resultado foi: "+state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.idTime);
        state.values.currentTime = 10;
        state.view.timeLeft.textContent = state.values.currentTime;
        if(state.values.life===0){
        alert("teste");
        
       
    }else{
        
        state.values.idTime = setInterval(randomSquare,state.values.gameVelocity);
        state.values.countDownTimerId = setInterval(countDown,1000);
        setInterval(state.actions.countDownTimerId);
    }
    }
}
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}
//função inicial
function init(){
   // moveEnemy();
    addListenerHitBox();
    
}
init();