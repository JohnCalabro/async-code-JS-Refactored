let baseURL = "https://deckofcardsapi.com/api/deck"


//Part 1:

let favNum =  24;

//1:

async function getFavNum() {
    let data = await axios.get(`http://numbersapi.com/${favNum}?json`)
    console.log(data)
}



// 2:

let favNums = [4, 24, 81];

async function getFavNums() {
    let data = await axios.get(`http://numbersapi.com/${favNums}?json`)
    console.log(data)
}


//3. 

async function addToPage() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`http://numbersapi.com/${favNum}?json`))
    );
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
  }


//Part 2:

//1:
async function valSuit() {
    let data = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/")
    let trueData = data.data.cards[0]
    console.log(trueData)
    let {suit, value} = trueData
    console.log(`${value} of ${suit}`);
}


//2:

  async function twoCards() {
    let cardOneData = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/");
    let trueOneData = cardOneData.data.cards[0]
    let Id = trueOneData.deck_id;
    let cardTwoData = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/");
    let trueTwoData = cardTwoData.data.cards[0]
    console.log(trueTwoData.value)

    console.log(`${trueOneData.value} of ${trueOneData.suit}`)
    console.log(`${trueTwoData.value} of ${trueTwoData.suit}`)
    
  
    }



  //3: 

  async function setup() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  setup();    // ^^ was confused but now I understand how solution works! Could refactor with axios but time is
  // of the essense.











