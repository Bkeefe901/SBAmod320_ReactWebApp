import { useState, useEffect, useReducer } from "react";
import axios from "axios";


export default function GamePage() {
    // array of cards for the player to be dealt from original deck
    const [data, setData] = useState(null);

    // array of cards for dealer to be dealt from original deck
    const [dealerData, setDealerData] = useState(null);

    // arrary of cards currently dealt to player
    const [playerHand, setPlayerHand] = useState(null);

    //array of cards currently dealt to dealer
    const [dealerHand, setDealerHand] = useState(null);

    // state for dealers turn to draw
    const [dealerTurn, setDealerTurn] = useState(false);




    let urlStr = `https://deckofcardsapi.com/api/deck/new/draw/?count=24`;




    useEffect(() => {
        async function getData() {
            try {


                let res = await axios.get(urlStr);

                let cards = [...res.data.cards]; // the array of cards from the deck object we fetched
                let numCards = cards.length;

                let firstHalf = cards.slice(0, (numCards / 2)); // half the cards to pick from for playersHand
                let secondHalf = cards.slice((numCards / 2), numCards); // half the cards to pick from for dealersHand

                let playersCards = firstHalf.splice(0, 2); // array variable set to the first 2 cards from firstHalf while removing them from firstHalf in place.

                let dealersCards = secondHalf.splice(0, 1);

                setData(firstHalf); // setData to that first half of cards
                setDealerData(secondHalf); // setDealer data to the second half of cards
                setPlayerHand(playersCards);
                setDealerHand(dealersCards);

            } catch (err) {
                console.error(`❌ Error - ${err.message}`);
            }
        }
        getData();
    }, []);


    // useEffect(() => {



    // },[dealerTurn])






    let loading = () => {
        return <h1>Loading</h1>
    }

    let loaded = () => {

        // console.log("DealerHand: ", dealerHand)

        return (
            <>
                <h2>Dealer's Cards</h2>
                <Hand state={dealerHand} kind='dealer' dealerTurn={dealerTurn} />
                <br />
                <br />
                <br />
                <h2>Your Cards</h2>
                <Hand state={playerHand} kind='player' />
                <div className="buttonCluster">
                    <button onClick={() => {
                        let cards = data;
                        let playerCards = cards.splice(0, 1);
                        setData(cards);
                        setPlayerHand([...playerHand, ...playerCards])
                    }}>Hit</button>

                    <button onClick={() => {
                        let cards = dealerData;
                        let dealersCards = cards.splice(0, 1);
                        setDealerData(cards);
                        setDealerHand([...dealerHand, ...dealersCards]);
                        setDealerTurn(true);
                    }}>Stand</button>
                </div>
            </>
        )
    }
    return (playerHand && dealerHand) ? loaded() : loading();
}






// Components ///////////////////////////////////////////



function Hand({ state, kind, dealerTurn }) {


    function CardBack() {
        if (!dealerTurn) {
            return <img style={{ height: '315px' }} src="../../images/CardBack.png" alt="Down Card" />
        }
    }

    const player = state.map((card) => {
        // console.log(card);
        return <Card key={card.code} card={card} />
    })

    return kind == 'player' ?
        (
            <>
                <Count state={state} />
                <div>
                    {player}
                </div>
            </>
        ) :
        (
            <>
                <Count state={state} />
                <div>
                    <CardBack />
                    {player}
                </div>
            </>
        )
}




function Count({ state }) {

    let count = 0;
    let aceCount = 0;

    state.forEach((card) => {
        card.value == 'ACE' ? aceCount++ : aceCount = aceCount;
        count += cardValue(card.value);
    })

    if (count > 21 && !aceCount) return <h1>BUSTED!!</h1>
    if (count > 21) count = count - 10;

    return <h3>Count: {count}</h3>
}

function Card({ card }) {
    // console.log(card);
    return <img src={card.image} alt={card.code} />
}






// Helper Functions ///////////////////////////////////////


function cardValue(card) {
    if (card == "ACE") {
        return 11;
    }
    else if (card == 'JACK' || card == 'QUEEN' || card == 'KING') {
        return 10;
    } else {
        return Number(card);
    }

}

