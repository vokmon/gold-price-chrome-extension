/*global chrome*/
import { useEffect, useRef, useState } from 'react';
import './App.css';
import GoldPrice from './components/GoldPrice';

const oneMinute = 1000 * 60;
const minutes = 1;
const interval = oneMinute * minutes;

const url = 'https://apicheckprice.huasengheng.com/api/values/getprice/';

function App() {
  const initFetch = useRef(false);
  const [price, setPrice] = useState([]);

  const fetchGoldPrice = async () => {
    const response = await fetch(url);
    const data = await response.json();

    // eslint-disable-next-line no-undef
    if (chrome && chrome.action) {
      if (data) {
        const hsh = data?.find((p) => p.GoldType.toUpperCase() === 'HSH')
        chrome.action.setBadgeText({ text: hsh.Sell.replace(',', '') })
        chrome.action.setBadgeBackgroundColor(
          {color: [0, 0, 0, 0]},  // Green
          () => { /* ... */ },
        );
      }
    }
    setPrice(data);
  };

  useEffect(() => {
    if (initFetch.current === false) {
      initFetch.current = true;
      fetchGoldPrice();
    }
    const timeInterval = setInterval(() => {
      fetchGoldPrice();
    }, interval);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="app">
      <GoldPrice price={price} bottomText={`ดึงข้อมูลใหม่ทุก ${minutes} นาที`}/>
    </div>
  );
}

export default App;
