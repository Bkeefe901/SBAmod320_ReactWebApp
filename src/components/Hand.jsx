import Count from "../components/Count";
import Card from "./Card";

export default function Hand({ handState, kind, dealerTurn, setBust, setCount, setWinner }) {


    function CardBack() {
        if (!dealerTurn) {
            return <img style={{ height: '315px' }} src="../../images/CardBack.png" alt="Down Card" />
        }
    }

    const player = handState.map((card) => {
        return <Card key={card.code} card={card} />
    })

    return kind == 'player' ?
        (
            <>
                <Count handState={handState} setBust={setBust} setCount={setCount} kind={kind} setWinner={setWinner} />
                <div>
                    {player}
                </div>
            </>
        ) :
        (
            <>
                <Count handState={handState} setBust={setBust} setCount={setCount} kind={kind} setWinner={setWinner} />
                <div>
                    <CardBack />
                    {player}
                </div>
            </>
        )
}