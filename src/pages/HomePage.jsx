export default function HomePage(){









    return (
        <div className="HomePage">
            <img style={{width: '96%', border: '2px, solid, white', borderRadius: '5px'}} src="../../public/images/HeroBanner.png" alt="Black Jack Banner" />
            <h1>What Is It?</h1>
            <p>Blackjack Pro is a simple React Web Application. If you want to play a game, navigate to the game page from the navigation bar at the top of the page. As of now, there is no betting real or imaginary money. You can play one hand at a time, trying to beat the dealer. If you want to hit, click the 'hit' button. When you are satisfied with your cards, assuming you havent busted, click the 'stand' button and the dealer will flip there face down card. If they are below 17, they will draw again until they are above 17 (or busted). Whoever hasn't busted or has the higher count wins. If you have the same count it is a draw. In the future I hope more features such as betting imaginary money, splitting, doubling down and keeping track of past games. Enjoy!! </p>
        </div>
    )
}