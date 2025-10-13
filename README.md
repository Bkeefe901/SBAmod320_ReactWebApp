# SBA 320H - React Web Application Project


## General Explanation
This is a react application for playing a game of blackjack against the computer. It has 2 different pages as well as a page-not-found catch all for any other routes. It uses the Deck Of Cards API. It also uses BrowserRouter from react-router-dom as well as the useState and useEffect react hooks. As of now it is a relatively simple version of blackjack. There is no betting and none of the more complex moves such as splitting or doubling down as a result. The player upon loading of the game page has two buttons: 'hit and 'stand'. If they want another card they click the hit button. If they are satisfied, and haven't busted, they click the stand button. The dealer then flips the face down card. They will continue to draw more cards until they have a count greater than 16. If neither player has busted, the winner is whomever has the higher count. You can then click the play again button to play another hand.

## Approach Taken
My approach was to keep the api call simple, even though they offer keeping track of the deck and cards left, I choose to just pick 24 cards from a deck on loading of the page and assigning half to a state that the dealer will draw from and half to a state the player will draw from. The useEffect hook that runs on initial render splits the array fetched from the api and sets the states for both the player and dealer to each half. It then set those states equal to different variables to be spliced. One card is taken for the dealerHand state and two for the playerHand state. Then the spliced arrays are reset with the setter functions for the dealers data (dealerData state, the pool of cards for the dealer to draw from) and the players data (data state, the pool of cards for the player to draw from). 

The Hand component maps over the playersHand and dealerHand to display their cards on the dom. it also passes the hands states, as well as the setBust setter for  the set states, setCount setter for the count states, the kind variable ('player' or 'dealer') and the setWinner setter for the winner state to the count component. 

The Count component maps of the hand states and counts the value for each card. Since the value for face cards and for the ace arent numbers it gets help from the cardValue function in the helpfunctions.jsx file. It also checks if any aces are in the hand and the count is greater than 21, it will reduce the count by 10, since Aces can be 1 or 11. It uses an useEffect hook to setCount state and also to check if a bust occurs to setWinner.

The Card component just takes the data from the cards in the hand to display the png file that acually gets displayed.

On the GamePage the hit button has an onClick event handler that deals one card at a time to the players hand in essentially the same way as the useEffect hook for the initial render. The stand button has an onClick event handler that also deals a new card to the dealers hand ('flipping over the face down card) and also sets the state for dealerTurn to true which in turn disables the hit and stand button and sets off the useEffect hook for handling the dealers sequence. This effect has a dependency array that includes any change in dealerTurn or dealerCount. Inside it checks if: it's the dealers turn, they havent busted and their count is less than 17. If so It will draw another card inside of a setTimeout with a 1.2 second delay. It then clears out the timeOut. It also checks if: it's the dealers turn, the dealer hasn't busted and their count IS over 17, in which case it will compare the dealer and player count states to set the Winner. Setting the dealerHand in the first 'if' statement will inturn change the dealerCount, from the count component, which in turn runs the useEffect hook again.

Finally the gamepage return is conditionally rendered by first checking if the winner state is not null, if it is not than it displays the Winner with the button to 'Play Again' which just reloads the page if clicked. it also displays the hands, count and buttons. If no winner, it just displays the hands, count and buttons. And of course, to keep react from trying to render before getting data it will just return a loading message before the data is fetched and states set.

Note: If on render of the page, (Or after hitting play again button, you show a 10 (or face card) and an Ace you automatically win because you got BlackJack!)


## Different Approach, Problems, Things Missing
I think I definitely could have made this app simpler. I probably could have used useReducer to help mangage state so that I didn't need to create so many individual state hooks. I would also like to add betting in the future and possibly attach it to a database to keep track of bets for different users. 

## Technology and Resources Used
- Axios
- React
- React-Router-DOM
- [Deck or Cards API](https://deckofcardsapi.com/)