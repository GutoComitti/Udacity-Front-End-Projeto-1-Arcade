//Implementar as classes Player e Enemy usando OO JS
class Character {
    constructor(x,y,sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    };
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
class Enemy extends Character {

    //Cria o inimigo de acordo com o método construtor => (x,y,sprite)
    constructor(){

    //Define a posição x como -101 para que o jogo comece com os inimigos entrando na tela
    //Define a posição y como qualquer uma das 3 linhas onde os inimigos passam
    //Define sprite como a figura definida como padrão
    super(-101,Math.floor(Math.random()*3)*83+83-20,'images/enemy-bug.png');

    //Define a velocidade do inimigo, entre 100 e 300 pixels por segundo
    this.speed = 100+(Math.random()*200);
}
    
};

// Função que atualiza a posição do inimigo 
Enemy.prototype.update = function(dt, player) {
    //atualiza o valor de x do inimigo, que é igual ao x atual mais velocidade vezes o tempo.
    this.x += this.speed*dt;
    //Com uma distância de (<61) do enemy abaixo do player já tem colisão
    //Com uma distância de (<77) do player abaixo do enemy já tem colisão
    //Com uma distância de 79 (<80) do enemy à direita do player já tem colisão
    //Com uma distância de 79 (<80) do enemy à esquerda do player já tem colisão
if (this.y < player.y+61 && this.y + 77 > player.y && this.x + 80 > player.x && this.x < player.x + 80){
    //Caso haja colisão, o jogador perde o jogo
    window.loseGame();
}

    if (this.x >=505){
        //Assim que chega ao final da tela, instancia um novo inimigo
        instantiateEnemy();
        //Assim que chega ao final da tela, apaga o inimigo atual, checando se o inimigo atual está no array de inimigos).
        let ind = allEnemies.indexOf(this);
        if (ind >-1){
            allEnemies.splice(ind,1);
        }
    }
};
class Player extends Character {

//Chamar a função construtora, definindo os 3 parâmetros iniciais:
//Definir posição x do jogador, pode ser desenhado em qualquer uma das 5 colunas
//Definir posição y do jogador. Começa em uma das 2 colunas de baixo, tirando 20 pixels para caber bem nos quadrados
//Define a imagem do personagem player
    constructor(){
        super(Math.floor(Math.random()*5)*101,((Math.floor(Math.random()*2)+4)*83)-20,'images/char-boy.png');
    }
};

//*update() (can be similar to the one for the Enemy)
//Player.prototype.update = function(){
//Como o handleInput já faz o update do jogador, e a movimentação do mesmo é feita
//somente com o input, não foi necessário utilizar esta função!
//PS.: Deixando como comentário no código apenas para documentar essa decisão.
//};

//Função para fazer o processamento do input do usuário (movimentação)
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



//Variáveis criadas fora da função pois a função será rodada a cada vez que o jogo acabar,
//e as variáveis serão reutilizadas, sendo apenas re-definidas nas funções de instanciação
var allEnemies;
var player;

//Criando função separada para o inimigo, para rodar tanto quando o jogo começar (instantiateAll)
//quanto quando um inimigo atingir o limite da tela.
instantiateEnemy = function(){
    allEnemies.push(new Enemy());
};
instantiateAll = function(){
    //allEnemies definido como um array vazio para caso seja o recomeço do jogo
    allEnemies = [];
    //Definindo player como um novo player => tanto no primeiro jogo quanto nos outros
	player = new Player();
	//Criar 3 instancias do inimigo
	for(let i = 0; i<3;i++){
        instantiateEnemy();
	};
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