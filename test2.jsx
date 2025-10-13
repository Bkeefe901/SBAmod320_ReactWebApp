useEffect(() => {
  // only run if it's dealer's turn, they're not busted, and count < 17
  if (dealerTurn && !dealerBust && dealerCount < 17) {
    const timeout = setTimeout(() => {
      const cards = [...dealerData];
      const nextCard = cards.splice(0, 1);

      setDealerData(cards);
      setDealerHand(prev => [...prev, ...nextCard]);
    }, 1200); // small delay between draws

    return () => clearTimeout(timeout);
  }

  // stop dealer when they reach 17+
  if (dealerTurn && dealerCount >= 17 && !dealerBust) {
    console.log("Dealer stands at:", dealerCount);
    // you can trigger end-of-round logic here if needed
  }
}, [dealerTurn, dealerBust, dealerCount, dealerData]);