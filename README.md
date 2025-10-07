# SBA 320H - React Web Application Project


// Ideas:
1. Rick and Morty Universe
    -Pages:
        a. Characters
        b. Locations
        c. Episodes
2. Black Jack Card Game
    -Pages:
        a. HomePage/Instructions
        b. Game page
        c. 404 page
3. War Card Game
    - Pages:
        a. HomePage/Instructions
        b. Game page
        c. 404 page






## How it works:
- On render it shows:
    - the dealer with one card (one card face down)
    - Me with 2 cards
    - 2 buttons under my cards:
        - Hit
        - Stand
    - Count: for dealer and for my cards
- If I show blackjack:
    - Some effect (ie. screen changes color and "You win") with button: "Next Hand"
- If I push Hit button:
    - New card added to my hand and count changes
        -If I go over 21:
            - Some effect (ie. screen changes color and "You Bust") with button: "Next Hand"
        -If I go over 21 with Ace in hand it drops score by 10
        -If I hit 21
            -Same case as if I hit stand button...
-If I hit stand button
    -dealers face-down card disappears and New card gets displayed
        -If new Dealer count is >17, Whoever has higher score wins: 
            - Some effect (ie. screen changes color and "You win/lose/draw") with button: "Next Hand"
        -If over 17 and Ace in hand drop score by 10. If over 21 after dropping:
            - Some effect (ie. screen changes color and "Dealer busts, You win") with button: "Next Hand"


## Ideas:
- Maybe should useEffect on render to grab 52 cards from api and save to state 'data' . Then another state variable to point where in 'data' array we are in dealing.


## Breakdown of logic

### Feature:
"- On render it shows:
    - the dealer with one card (one card face down)
    - Me with 2 cards
    - 2 buttons under my cards:
        - Hit
        - Stand
    - Count: for dealer and for my cards

### logic: 
    Already complete, change api call to save a full deck. create state (ie. 'dealt') to save spot in deck., Or  that can add objects  from data array to newArray and setDealt(newArray); 


### Feature:
- If I show blackjack:
    - Some effect (ie. screen changes color and "You win") with button: "Next Hand"

### Logic:
- Map first 3 from data on page. If the second and third are a 10 and an ace: "You Win" and "Next Hand"
const cardsDealt = dealt.map((card) => {<SomeComponent>/})


### Feature
- If I push Hit button:
    - New card added to my hand and count changes

### Logic
- With useReducer:
    onClick of hit button: "onClick={() => dispatch({ type: "hit", payload: data })}"
    => goes to dispatch and uses the data array to add a new card to the reducer state. (also I think I need to add keys to the objects in the data array: dealt: true/false, dealtTo: user/dealer)

