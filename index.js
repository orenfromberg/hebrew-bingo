const players = {}

const bingo_cards = {}

const create_bingo_card = () => {
    let card = Array(5).fill(0).map(()=>[])
    for (let i = 0; i < 5; i++) {
        // get set of numbers to choose from
        let set = Array(15).fill(1).map((x,idx)=>x+idx+i*15)

        // get random numbers from set
        for (let j = 0; j < 5; j++) {
            let num = Math.floor(Math.random() * set.length);
            r = set.splice(num, 1)
            card[i].push(...r)
        }
    }
    return card;
}


const add_player = (name, players) => {
    if (players[name] == undefined) {
        players[name] = create_bingo_card()
    } else {
        console.log("player already exists")
    }
}

const print_card = (card) => {
    output = "| B | I | N | G | O |\n"
    output += "|---|---|---|---|---|\n";
    for(let row = 0; row < 5; row++) {
        let buf = ""
        for (let col = 0; col < 5; col++) {
            if (col == 2 && row == 2) {
                buf += '|FREE '
            } else {
                buf += `|${card[col][row]} `
            }
        }
        buf += '|\n'
        output += buf;
    }
    console.log(output)
}


let has_bingo = (card, vals) => {
    let result = false;

    // check rows
    for (let row = 0; row < 5; row++) {
        if (row == 2) {
            result |= vals.includes(card[0][row]) && 
            vals.includes(card[1][row]) &&
            vals.includes(card[3][row]) &&
            vals.includes(card[4][row]);    
        } else {
            result |= vals.includes(card[0][row]) && 
            vals.includes(card[1][row]) &&
            vals.includes(card[2][row]) &&
            vals.includes(card[3][row]) &&
            vals.includes(card[4][row]);    
        }
    }

    // check cols
    for (let col = 0; col < 5; col++) {
        if (col == 2) {
            result |= vals.includes(card[col][0]) && 
            vals.includes(card[col][1]) &&
            vals.includes(card[col][3]) &&
            vals.includes(card[col][4]);    
        } else {
            result |= vals.includes(card[col][0]) && 
            vals.includes(card[col][1]) &&
            vals.includes(card[col][2]) &&
            vals.includes(card[col][3]) &&
            vals.includes(card[col][4]);    
        }
    }

    // check diagonals
    result |= vals.includes(card[0][0]) &&
    vals.includes(card[1][1]) &&
    vals.includes(card[3][3]) &&
    vals.includes(card[4][4]);

    result |= vals.includes(card[0][4]) &&
    vals.includes(card[1][3]) &&
    vals.includes(card[3][1]) &&
    vals.includes(card[4][0]);

    return result;
}

// c = create_bingo_card();

// print_card(c)

