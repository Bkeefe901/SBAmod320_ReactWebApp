import { useState, useEffect, useReducer } from "react";
import axios from "axios";


export default function GamePage() {
    // array of cards for the user to be dealt from original deck
    const [data, setData] = useState([]);

    // array of cards for dealer to be dealt from original deck
    const [dealerData, setDealerData] = useState([]);

    // Sets the unique code for a deck, from the api, so that on each new card it comes from the same deck
    //const [deck, setDeck] = useState(null);


    // Sets who is receiving the new card
    const [receiver, setReceiver] = useState();

    //const [userCards, setUserCards] = useReducer(cardReducer, initialState);


    let urlStr = `https://deckofcardsapi.com/api/deck/new/draw/?count=24`;
    // need conditional str like:
    // // let urlStr = "https://deckofcardsapi.com/api/${deck ? deck_id : "new"}/new/draw/?count=${cards ? cards : 4}";

    useEffect(() => {
        async function getData() {
            try {


                let res = await axios.get(urlStr);

                let cards = [...res.data.cards];
                let numCards = cards.length;

                let userCards = cards.slice(0, (numCards / 2));
                let dealerCards = cards.slice((numCards / 2), numCards);


                setData(userCards);
                setDealerData(dealerCards);


            } catch (err) {
                console.error(`❌ Error - ${err.message}`);

            }
        }

        getData();

    }, []);




    // need to conditionally add new image for each hit 
    // need logic for dealer to draw or hold after player hits stand
    // need to keep track of score bust bust and 


    let loading = () => {
        return <h1>Loading</h1>
    }

    let loaded = () => {



        return (
            <>
                <h2>Dealer's Cards</h2>
                <Cards state={dealerData} kind='dealer' />
                <br />
                <br />
                <br />
                <h2>Your Cards</h2>
                <Cards state={data} kind='player' />
                <div className="buttonCluster">
                    <button>Hit</button>
                    <button>Stand</button>
                </div>
            </>
        )
    }



    return data.length > 1 ? loaded() : loading();
}



// Components

function Cards({ state, kind }) {

    

    return kind == 'player' ?
        (
            <>
                <h3>Count: {cardValue(state[0].value) + cardValue(state[1].value)}</h3>
                <div>
                    <img src={state[0].image} alt={state[0].code} />
                    <img src={state[1].image} alt={state[1].code} />
                </div>
            </>
        ) :
        (
            <>
                <h3>Visible Count: {cardValue(state[0].value)}</h3>
                <div>
                    <img style={{ height: '315px' }} src="../../public/images/CardBack.png" alt={state[0].code} />
                    <img src={state[0].image} alt={state[0].code} />
                </div>
            </>
        )


}



// Reducer Function





// Helper Functions


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

