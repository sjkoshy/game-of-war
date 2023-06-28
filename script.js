class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}


class Deck {
  constructor() {
    this.cards = []
    this.createDeck()
  }

  createDeck() {
    const suits = ["Heart", "Spade", "Club", "Diamond"]
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let card = new Card(suits[i], ranks[j], j + 2)
        this.cards.push(card)
      }
    }

    this.shuffle()
  }

  shuffle() {
    let cards = this.cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }
}

class Game {
  constructor() {
    this.playerOne = []
    this.playerTwo = []
    this.pile = []
    this.init()
  }

  init() {
    // Create a new Deck instance from the Deck class
    let { cards } = new Deck()


    // Split the deck in half, give each half to the respective players
    this.playerOne.push(...cards.splice(0, 26))
    this.playerTwo.push(...cards)
  }

  playGame() {
    // Take a card from each player's hand and store to a variable
    while (this.playerOne.length > 0 && this.playerTwo.length > 0) {

      let playerOneCard = this.playerOne.pop()
      let playerTwoCard = this.playerTwo.pop()

      if (playerOneCard.score === playerTwoCard.score) {
        this.pile.push(playerOneCard, playerTwoCard)
        this.war()

      } else if (playerOneCard.score > playerTwoCard.score) {
        this.playerOne.unshift(playerTwoCard, playerOneCard, ...this.pile.splice(0))
        console.log("Player 1 wins the round", playerOneCard, playerTwoCard)

      } else {
        this.playerTwo.unshift(playerOneCard, playerTwoCard, ...this.pile.splice(0))
        console.log("Player 2 wins the round", playerOneCard, playerTwoCard)
      }
    }

    if (this.playerOne.length > 0) {
      console.log(`Player 1 is the winner! Player 1 has ${this.playerOne.length} cards.`)
    } else {
      console.log(`Player 2 is the winner! Player 2 has ${this.playerTwo.length} cards.`)
    }
  }

  war() {
    console.log("War!")
    if (this.playerOne.length < 4 || this.playerTwo.length < 4) {
      if (this.playerOne.length < 4) {
        this.playerTwo.push(...this.playerOne.splice(0), ...this.pile.splice(0))
      } else {
        this.playerOne.push(...this.playerTwo.splice(0), ...this.pile.splice(0))
      }
    } else {
      let playerOneWarPile = this.playerOne.splice(-3, 3)
      let playerTwoWarPile = this.playerTwo.splice(-3, 3)
      this.pile.push(...playerOneWarPile, ...playerTwoWarPile)
    }
  }
}

const game = new Game()
game.playGame()
