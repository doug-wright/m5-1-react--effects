import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import Item from './Item';
import useInterval from '../hooks/use-interval.hook';
import useKeydown from '../hooks/useKeydown';

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, type: 'tick' },
  { id: "grandma", name: "Grandma", cost: 100, value: 10, type: 'tick' },
  { id: "farm", name: "Farm", cost: 1000, value: 80, type: 'tick' },
  { id: 'megacursor', name: 'megaCursor', cost: 5000, value: 10, type: 'click' }
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [cookiesPerClick, setCookiesPerClick] = useState(1);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megacursor: 0
  });

  const useDocumentTitle = (title, fallBackTitle) => {
    useEffect(() => {
      document.title = numCookies + title;
  
      return () => {
        document.title = fallBackTitle;
      }
    }, [numCookies]);
  }

  // const handleKeyDown = (event) => {
  //   if (event.code === 'Space') {
  //     handleCookieClick();
  //   }
  // }

  // Prevent the default action of the spacebar registering a click event
  // on the cookie if it has focus.
  // const handleKeyUp = (event) => {
  //   console.log(event.current.currentTarget);
  //   event.preventDefault();
  // }

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   }
  // }, [handleKeyDown]);

  const handleItemClick = (event) => {
    const item = items.find(item => item.id === event.currentTarget.id);

    switch (item.id) {
      case 'cursor':
        if (numCookies >= item.cost) {
          setNumCookies(numCookies - item.cost);
          setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
        } else {
          window.alert(`You can't afford a ${item.name}`);
        }

        break;
      case 'grandma':
        if (numCookies >= item.cost) {
          setNumCookies(numCookies - item.cost);
          setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
        } else {
          window.alert(`You can't afford a ${item.name}`);
        }
  
        break;
      case 'farm':
        if (numCookies >= item.cost) {
          setNumCookies(numCookies - item.cost);
          setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
        } else {
          window.alert(`You can't afford a ${item.name}`);
        }
  
        break;
      case 'megacursor':
        if (numCookies >= item.cost) {
          setNumCookies(numCookies - item.cost);
          setPurchasedItems({ ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 });
          setCookiesPerClick(cookiesPerClick + item.value);
        } else {
          window.alert(`You can't afford a ${item.name}`);
        }
    
        break;
    }
  }

  const handleCookieClick = () => {
    setNumCookies(numCookies + cookiesPerClick);
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
  
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const calculateCookiesPerTick = (purchasedItems) => {
    let totalValue = 0;

    Object.keys(purchasedItems).forEach(key => {
      const item = items.find(item => item.id === key);
      totalValue += purchasedItems[key] * item.value;
    });

    return totalValue;
  }

  useDocumentTitle(' - Cookie Clicker', 'Cookie Clicker');
  useKeydown('Space', handleCookieClick);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second, <strong>{cookiesPerClick}</strong> cookie(s) per click
        </Indicator>
        <Button onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => <Item
          firstItem={index === 0 ? true : false}
          key={uuidv4()}
          id={item.id}
          name={item.name}
          cost={item.cost}
          value={item.value}
          type={item.type}
          numOwned={purchasedItems[item.id]}
          handleItemClick={handleItemClick} />)}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 450px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
