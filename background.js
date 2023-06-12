chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    let url = new URL(tab.url);
    if (url.hostname === 'polygonscan.com' && url.pathname.startsWith('/address/')) {
      let contractAddress = url.pathname.split('/')[2];
      fetchRiskScore(contractAddress, tabId);
    }
  }
});

function fetchRiskScore(contractAddress, tabId) {
  let apiUrl = `http://3.108.126.225:8080/api/get_risk_score_polygon_mainnet_verified_contract?smart_contract_address=${contractAddress}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let riskScore = data.risk_score;
      let color;
      if (riskScore > 75) {
        color = 'red';
      } else if (riskScore > 50) {
        color = 'orange';
      } else if (riskScore > 25) {
        color = 'yellow';
      } else {
        color = 'green';
      }
      chrome.tabs.sendMessage(tabId, {color: color, score: riskScore});
    });
}
