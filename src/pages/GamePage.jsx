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


    // Sets who is receiving the new card
    const [receiver, setReceiver] = useState();

    // const [playerCards, dispatch] = useReducer(cardReducer, initialState);


    let urlStr = `https://deckofcardsapi.com/api/deck/new/draw/?count=24`;
    // need conditional str like:
    // // let urlStr = "https://deckofcardsapi.com/api/${deck ? deck_id : "new"}/new/draw/?count=${cards ? cards : 4}";

    // let userDeck = [];
    // let dealerDeck = [];

    useEffect(() => {
        async function getData() {
            try {


                let res = await axios.get(urlStr);

                let cards = [...res.data.cards]; // the array of cards from the deck object we fetched
                let numCards = cards.length;

                let firstHalf = cards.slice(0, (numCards / 2)); // half the cards to pick from for playersHand
                let secondHalf = cards.slice((numCards / 2), numCards); // half the cards to pick from for dealersHand

                let playersCards = firstHalf.splice(0,2); // array variable set to the first 2 cards from firstHalf while removing them from firstHalf in place.

                let dealersCards = secondHalf.splice(0,1);



                setData(firstHalf); // setData to that first half of cards
                setDealerData(secondHalf); // setDealer data to the second half of cards
                setPlayerHand(playersCards);
                setDealerHand(dealersCards);
                console.log(data);

                        


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

        // console.log("DealerHand: ", dealerHand)

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
                    <button onClick={()=>{
                        let cards = data;
                        let playerCards = cards.splice(0,1);
                        setData(cards);
                        setPlayerHand([...playerHand, ...playerCards])
                    }}>Hit</button>
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
        return <Card key={card.code} card={card} />
    })

   // Will probably need to use if statements for kind and if its the 'dealer' and dealerHand < 2 I return the back of card image with the {player} otherwise just return {player}


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
                    <img style={{ height: '315px' }} src="../../images/CardBack.png" alt="Down Card" />
                    {/* <img src={state[0].image} alt={state[0].code} /> */}
                    {player}
                </div>
            </>
        )


}
function Count({state}){

    let count = 0;
    let aceCount = 0;

    state.forEach((card)=> {
        card.value == 'ACE' ? aceCount++ : aceCount = aceCount;
        count += cardValue(card.value);
    })


    if(count > 21 && !aceCount) return <h1>BUSTED!!</h1>
    if(count > 21) count = count - 10;

    return <h3>Count: {count}</h3>
}

function Card({card}){
    // console.log(card);
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

