import { useState, useEffect, useReducer } from "react";
import axios from "axios";


export default function GamePage() {
    // array of cards for the player to be dealt from original deck
    const [data, setData] = useState([]);

    // array of cards for dealer to be dealt from original deck
    const [dealerData, setDealerData] = useState([]);

    // arrary of cards currently dealt to player
    const [playerHand, setPlayerHand] = useState(null);

    //array of cards currently dealt to dealer
    const [dealerHand, setDealerHand] = useState(null);


    // Sets who is receiving the new card
    const [receiver, setReceiver] = useState();

    // const [playerCards, dispatch] = useReducer(cardReducer, initialState);


    let urlStr = `https://deckofcardsapi.com/api/deck/new/draw/?count=24`;
    // need conditional str like:
    // // let urlStr = "https://deckofcardsapi.com/api/${deck ? deck_id : "new"}/new/draw/?count=${cards ? cards : 4}";

    useEffect(() => {
        async function getData() {
            try {


                let res = await axios.get(urlStr);

                let cards = [...res.data.cards];
                let numCards = cards.length;

                let userDeck = cards.slice(0, (numCards / 2));
                let dealerDeck = cards.slice((numCards / 2), numCards);


                setData(userDeck);
                // dispatch({type: "initial", payload: { data}});
                setDealerData(dealerDeck);

                let playersCards = userDeck.slice(0,2);
                setPlayerHand(playersCards);

                // console.log(playerHand);

                let dealersCards = dealerDeck.slice(0,1);
                setDealerHand(dealersCards);


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

        console.log("DealerHand: ", dealerHand)

        return (
            <>
                <h2>Dealer's Cards</h2>
                <Hand state={dealerHand} kind='dealer' />
                <br />
                <br />
                <br />
                <h2>Your Cards</h2>
                <Hand state={playerHand} kind='player' />
                <div className="buttonCluster">
                    <button>Hit</button>
                    <button>Stand</button>
                </div>
            </>
        )
    }



    return (playerHand && dealerHand) ? loaded() : loading();
}



// Components ///////////////////////////////////////////



function Hand({ state, kind }) {

    const player = state.map((card) => {
        // console.log(card);
        return <Card card={card} />
    })

    // const dealer = state.map((card) => {
    //     // console.log(card);
    //     <Card card={card} />
    // })



    return kind == 'player' ?
        (
            <>
                <Count state={state}/>
                <div>
                    {player}
                </div>
            </>
        ) :
        (
            <>
                <Count state={state}/>
                <div>
                    <img style={{ height: '315px' }} src="../../public/images/CardBack.png" alt="Down Card" />
                    {/* <img src={state[0].image} alt={state[0].code} /> */}
                    {player}
                </div>
            </>
        )


}
function Count({state}){

    let count = 0

    state.forEach((card)=> {
        console.log(card.value);
        count += cardValue(card.value);
    })

    return <h3>Count: {count}</h3>
}

function Card({card}){
    console.log(card);
    return <img  src={card.image} alt={card.code}/>
}





// Reducer Function //////////////////////////////////
















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

