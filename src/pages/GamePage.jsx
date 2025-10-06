import { useState, useEffect } from "react";
import axios from "axios";


export default function GamePage() {
    const [data, setData] = useState(null);
    const [deck, setDeck] = useState(null);

    let urlStr = `https://deckofcardsapi.com/api/deck/${deck ? deck : "new"}/draw/?count=4`;
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

            } catch (err) {
                console.error(err.message);

            }
        }

        getData();

    }, []);


    // function cardValue(card){
    //     if(card.value == 'A'){
    //         return 11;
    //     }else if(card.value == 'J' || 'Q' || 'K'){
    //         return 10;
    //     }else{
    //         return Number(card);
    //     }
    // }
    
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
                <div>
                    <img src={data.cards[0].image} alt={data.cards[0].code} />
                    <img src={data.cards[1].image} alt={data.cards[1].code} />
                </div>
                <br />
                <br />
                <br />
                <h2>Your Cards</h2>
                <div>
                    <img src={data.cards[2].image} alt={data.cards[2].code} />
                    <img src={data.cards[3].image} alt={data.cards[3].code} />
                </div>
                {/* <h3>Count: {cardValue(data.cards[2].value) + cardValue(data.cards[3].code)}</h3> */}
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