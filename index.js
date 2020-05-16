const players = {}

const bingo_cards = {}

const heb_nums = [
    "-",
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "י״א",
    "י״ב",
    "י״ג",
    "י״ד",
    "ט״ו",
    "ט״ז",
    "י״ז",
    "י״ח",
    "י״ט",
    "כ",
    "כ״א",
    "כ״ב",
    "כ״ג",
    "כ״ד",
    "כ״ה",
    "כ״ו",
    "כ״ז",
    "כ״ח",
    "כ״ט",
    "ל",
    "ל״א",
    "ל״ב",
    "ל״ג",
    "ל״ד",
    "ל״ה",
    "ל״ו",
    "ל״ז",
    "ל״ח",
    "ל״ט",
    "מ",
    "מ״א",
    "מ״ב",
    "מ״ג",
    "מ״ד",
    "מ״ה",
    "מ״ו",
    "מ״ז",
    "מ״ח",
    "מ״ט",
    "נ",
    "נ״א",
    "נ״ב",
    "נ״ג",
    "נ״ד",
    "נ״ה",
    "נ״ו",
    "נ״ז",
    "נ״ח",
    "נ״ט",
    "ס",
    "ס״א",
    "ס״ב",
    "ס״ג",
    "ס״ד",
    "ס״ה",
    "ס״ו",
    "ס״ז",
    "ס״ח",
    "ס״ט",
    "ע",
    "ע״א",
    "ע״ב",
    "ע״ג",
    "ע״ד",
    "ע״ה"
]

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


let hat = Array(75).fill(0).map((x,i) => x+i+1);
let picked = [];

const init_hat = () => {
    hat = Array(75).fill(0).map((x,i) => x+i+1);
    picked = []
}

const pick_from_hat = () => {
    if (hat.length > 0) {
        let val = hat.splice(Math.floor(Math.random() * hat.length), 1)
        console.log(`You picked ${val[0]}`)
        picked.push(...val)
        console.log(JSON.stringify(picked.sort((a,b)=> a - b)))
    } else {
        console.log("all numbers have been picked!")
    }
}


// c = create_bingo_card();

// print_card(c)

