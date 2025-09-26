function Addcard(card_sum) {
    let card = Math.floor(Math.random()*11)+1;
    return card_sum + card;
}

let Dealer = 0;
let Player = 0;

while (Dealer<=17) {
    Dealer = Addcard(Dealer);
    Player = Addcard(Player);
}

console.log(`Dealer: ${Dealer}`);
console.log(`Player: ${Player}`);

    if (Dealer === Player) {
        if(Dealer>=21) {
            console.log("both lose");
        }
        console.log("무승부");
    } else {
        if (Dealer > 21) {
            if(Player > 21) {
                console.log("both lose");
            } else {
                console.log("You win");
            }
        } else{
            if (Player > 21) {
                console.log("You lose");
            } else {
                Dealer = 21-Dealer;
                Player = 21-Player;

                if(Player > Dealer) {
                    console.log("You lose");
                } else {
                    console.log("You win");
                }
            }
        }
    }


/*
if(sum>21) {
    console.log('You lost');
}
console.log(`You have ${sum} points`);
let bankSum = cardOneBank + cardTwoBank + cardThreeBank + cardFourBank;

if(bankSum>21 || (sum<=21 && sum>bankSum)) {
    console.log('You win');
} else {
    console.log('Bank wins');
}*/