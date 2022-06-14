/*global chrome*/

const periodInMinutes = 1;
const url = 'https://apicheckprice.huasengheng.com/api/values/getprice/';

const fetchGoldPrice = async () => {
  const response = await fetch(url);
  const data = await response.json();

  // eslint-disable-next-line no-undef
  if (chrome && chrome.action) {
    if (data) {
      const hsh = data?.find((p) => p.GoldType.toUpperCase() === 'HSH')
      chrome.action.setBadgeText({ text: hsh.Sell.replace(',', '') })
    }
  }
};

chrome.alarms.create(
  'get-gole-price',
  { periodInMinutes }
);

chrome.alarms.onAlarm.addListener((alarm) => {
  fetchGoldPrice();
});

fetchGoldPrice();