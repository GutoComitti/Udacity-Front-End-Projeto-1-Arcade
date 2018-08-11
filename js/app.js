//Implementar as classes Player e Enemy usando OO JS
debugger;
Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //In here you should:

    //Load the image by setting this.sprite to the appropriate image in the image folder (already provided)

    this.sprite = 'images/enemy-bug.png';
	//Set the Enemy initial location (you need to implement)

	this.x = -101;

	//Any of the 3 rows where the enemies pass through -> gets from 0 to 2 to multiply by the height of each row,
	//and then add the height of the lower row -> seems like the draw is started at 1/4 of the row's height, which is
	//2 rows up the bottom, and each row has 101 height, so it's initial drawing height should be (101*(1/4 +2))
	this.y = Math.floor(Math.random()*3)*83+83-20;

    //Define a velocidade do inimigo, algo entre 100 e 300 pixels por segundo.
    this.speed = 100+(Math.random()*200);
};

// Enemy.prototype.movement = function(timeAmount, speed){
//     return function(){
//         //Return the time amount in seconds times the speed, to define how much the enemy moved in that time variation
//         return timeAmount*speed;
//     };
// };

// Atualiza a posição do inimigo 
Enemy.prototype.update = function(dt, player) {
    //atualiza o valor de x do inimigo, que é igual ao x atual mais velocidade vezes o tempo.
    this.x += this.speed*dt;
    //Com uma distância de (<61) do enemy abaixo do player já tem colisão
    //Com uma distância de (<77) do player abaixo do enemy já tem colisão
    //Com uma distância de 79 (<80) do enemy à direita do player já tem colisão
    //Com uma distância de 79 (<80) do enemy à esquerda do player já tem colisão
if (this.y < player.y+61 && this.y + 77 > player.y && this.x + 80 > player.x && this.x < player.x + 80){
    window.loseGame();
}

    if (this.x >=505){
        //Assim que chega ao final da tela, instancia um novo inimigo
        instantiateEnemy();
        //Assim que chega ao final da tela, apaga o inimigo atual (com checagem pra ver se o inimigo atual está no array de inimigos).
        let ind = allEnemies.indexOf(this);
        if (ind >-1){
            allEnemies.splice(ind,1);
        }
    }
};

// Desenha o inimigo na tela
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player = function(){

//Define a imagem do personagem player
this.sprite = 'images/char-boy.png';
//Definir posição y do jogador. Começa em uma das 2 colunas de baixo, tirando 20 pixels para caber bem nos quadrados
this.y = ((Math.floor(Math.random()*2)+4)*83)-20;
//Definir posição x do jogador, pode ser desenhado em qualquer uma das 5 colunas
this.x = (Math.floor(Math.random()*5)*101);


};
Player.prototype.update = function(){
//TODO: ver se precisa
//*update() (can be similar to the one for the Enemy)

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input){
    switch(input){
        case 'left':
        //Checar se está na primeira coluna da esquerda, senão andar para a esquerda
            if (this.x>0){
                this.x -= 101;
            }
            break;
        case 'up':
        //Anda para cima e checa se chegou na água, se chegou o jogador venceu o jogo
            this.y -=83;
            if (this.y <=0){
                window.winGame();
            }
            break;
        case 'right':
        //Checar se está na ultima coluna, se não estiver, andar para a direita
            if (this.x<404){
                this.x +=101;
            }
            break;
        case 'down':
        //Checar se está na parte mais baixa da tela, se não estiver, andar para baixo.
            if (this.y<=312){
                this.y +=83;
            break;
            }
    }
};



//Variáveis criadas fora da função pois a função será rodada a cada vez que o jogo acabar, e as variáveis serão
//reutilizadas, apenas re-definidas.
var allEnemies;
var player;

//Criando função separada para o inimigo, para rodar tanto quando o jogo começar (instantiateAll)
//quanto quando um inimigo atingir o limite da tela.
instantiateEnemy = function(){
    allEnemies.push(new Enemy());
};
instantiateAll = function(){
	debugger;
    //allEnemies definido como um array vazio para caso seja o recomeço do jogo (reaproveitando a variável do jogo anterior)
    allEnemies = [];
    //Definindo player como um novo player => tanto no primeiro jogo quanto nos outros, pode ser feito dessa forma
	player = new Player();
	//Criar 3 instancias do inimigo
	for(let i = 0; i<3;i++){
        instantiateEnemy();
	};
// Place the player object in a variable called player
};

//Definido objeto pertencente à window para as funções definidas ser acessadas globalmente.
window.App = {
	instantiateAll: instantiateAll
};





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
