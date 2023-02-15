import React, { Component } from "react";
import Card from "./Card"
import axios from "axios";
import './Deck.css'
class Deck extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            cards: [],
            deckId: '',
            remaining: 52,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    async componentDidMount() {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        this.setState({
            deckId: response.data.deck_id
        })
    }
    async handleClick() {
        const deckUrl = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`;
        const response = await axios.get(deckUrl);
        if (response.data.success === true) {
            this.setState({
                cards: [...this.state.cards, response.data.cards[0]],
                remaining: response.data.remaining,
            });
        } 

    }
    render() { 
        const { remaining } = this.state;
        const cards = this.state.cards.map((card) =>
                    <Card
                        key={card.code}
                        img={card.image}
                        alt={`${card.value} of ${card.suit}`}
                    />)
        return (
            <div>
                {remaining === 0 ? <h1>No Cards Remaining</h1> : <h1 className="Deck-Header">Cards remaining: {remaining}</h1> }
                <button className="Deck-btn" onClick={remaining === 0 ? null : this.handleClick}>Draw Card</button>
                <div className="Deck-cardarea">{cards}</div>
            </div>
        )
    }
}
export default Deck;