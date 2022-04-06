import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Card from "./Card"

class Cards extends Component{
  constructor(props) {
  super(props);
    this.state = {  
      deck_id : null,
      pioche : [],
      error :"",
      disabled : false,
      remain : ""
  }
  }

  componentDidMount = async() => {
    const deckId = await axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    this.setState({ deck_id : deckId.data.deck_id });
  }
  
  getCard = async() => {
    const myCard = await axios
    .get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
    var myPioche = this.state.pioche; 
    myPioche.push(myCard.data.cards[0]);
      this.setState({pioche : myPioche , remain : myCard.data.remaining} )
    if (myCard.data.remaining == 0) {
      this.setState({error : "You don't have any more card", disabled : true })
    }
  }
  
  render() {
    return (
      <div>
        <div id="container">
          <h1>THE CARD DISPENSER</h1>
          <button onClick={this.getCard} disabled={this.state.disabled} > Get a card</button>
          {
          this.state.pioche.map((card) => (
          <Card key= {card.code} card = {card} />
          ))
          }
          <h2>remaining cards : {this.state.remain}</h2>
          <h3>{this.state.error}</h3>
        </div>
      </div>
    );
  }
}

export default Cards;
