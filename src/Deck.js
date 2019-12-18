import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: null,
      drawnCards: []
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}new/shuffle/?deck_count=1`);
    this.setState({ deck: deck.data });
  }
  async getCard() {
    //make request using deck id
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}${deck_id}/draw/?count=1`;
      let cardResponse = await axios.get(cardUrl);
      if (!cardResponse.data.success) {
        throw new Error("No card remainint");
      }

      //set state using new card info from api
      let card = cardResponse.data.cards[0];
      this.setState(st => ({
        drawnCards: [
          ...st.drawnCards,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }
  render() {
    const cards = this.state.drawnCards.map(card => (
      <Card key={card.id} name={card.name} image={card.image} />
    ));
    return (
      <div>
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">
          ♦ A little demo made with React ♦
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Get Card!
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
