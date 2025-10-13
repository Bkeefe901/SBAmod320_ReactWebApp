useEffect(() => {
  if (dealerTurn && !dealerBust && dealerCount < 17) {
    const timeout = setTimeout(() => {
      const cards = [...dealerData];
      const newCard = cards.splice(0, 1);
      setDealerData(cards);
      setDealerHand(prev => [...prev, ...newCard]);
    }, 1500);
    return () => clearTimeout(timeout);
  }
}, [dealerTurn, dealerBust, dealerCount, dealerData]);