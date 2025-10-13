import { useEffect } from "react";
import { cardValue } from "../utilities/helperFunctions";


export default function Count({ handState, setBust, setCount, kind, setWinner }) {
    let count = 0;
    let aceCount = 0;

    handState.forEach((card) => {
        if (card.value === 'ACE') aceCount++;
        count += cardValue(card.value);
    });

    if (count > 21 && aceCount > 0) {
        // downgrade ACEs from 11 to 1
        while (count > 21 && aceCount > 0) {
            count -= 10;
            aceCount--;
        }
    }

    // updates count state and handles busts to set winner
    useEffect(() => {
        if (count > 21) {
            setBust(true);
            if (kind == 'player') {
                setWinner('Dealer');
            } else setWinner('You');
        }
        setCount(count);
    }, [count]);



    return <h3>Count: {count > 21 ? "BUSTED!" : count}</h3>;
}

