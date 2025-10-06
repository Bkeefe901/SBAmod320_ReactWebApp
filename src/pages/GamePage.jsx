import { useState, useEffect, useReducer } from "react";
import axios from "axios";


export default function GamePage() {
    const [data, setData] = useState(null);
    const [deck, setDeck] = useState(null);
    


    let urlStr = `https://deckofcardsapi.com/api/deck/${deck ? deck : "new"}/draw/?count=3`;
    // need conditional str like:
    // // let urlStr = "https://deckofcardsapi.com/api/${deck ? deck_id : "new"}/new/draw/?count=${cards ? cards : 4}";

    useEffect(() => {
        async function getData() {
            try {


                let res = await axios.get(urlStr);

                //console.log(res.data);
                setData(res.data);
                // need to get the deck id and save it for drawing new cards
                setDeck(res.data.deck_id);
                // console.log(res.data.cards[2].value)
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
                <h3>Visible Count: {cardValue(data.cards[0].value)}</h3>
                <div>
                    <img style={ {height: '315px'}} src="../../public/images/CardBack.png" alt={data.cards[0].code} />
                    <img src={data.cards[0].image} alt={data.cards[0].code} />
                </div>
                <br />
                <br />
                <br />
                <h2>Your Cards</h2>
                <h3>Count: {cardValue(data.cards[1].value) + cardValue(data.cards[2].value)}</h3>
                <div>
                    <img src={data.cards[1].image} alt={data.cards[1].code} />
                    <img src={data.cards[2].image} alt={data.cards[2].code} />
                </div>
                <div className="buttonCluster">
                    <button>Hit</button>
                    <button>Stand</button>
                    <button>Double</button>
                    <button>Split</button>
                </div>
            </>
        )
    }



    return data ? loaded() : loading();
}




// Helper Functions


      function cardValue(card){
        if(card == "ACE"){
            return 11;
        }
        else if(card == 'JACK' || card == 'QUEEN' || card == 'KING'){
            return 10;
        }else{
            return Number(card);
        }
        
    }

    // function softCount(card){

    // }