chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    let url = new URL(tab.url);
    if (url.hostname === 'polygonscan.com' && url.pathname.startsWith('/address/')) {
      let contractAddress = url.pathname.split('/')[2];
      fetchRiskScorePoly(contractAddress, tabId);
    }
    else if (url.hostname === 'etherscan.io' && url.pathname.startsWith('/address/')) {
      let contractAddress = url.pathname.split('/')[2];
      fetchRiskScoreEther(contractAddress, tabId);
    }
    // else if (url.hostname === 'flowscan.org' && url.pathname.startsWith('/contract/') 
    //   && url.pathname.endsWith('/overview')) {
    //   fetchRiskScoreForFlow(tabId);
    // }
  }
});


// // Listen for the custom event raised in content.js
// chrome.tabs.onUpdated.addEventListener('resultUpdated', (event) => {
//   const resultValue = event.detail;
//   console.log('Result value updated:', resultValue);
// });


function fetchRiskScoreForFlow(tabId) {
  // Send a message to the content script to retrieve the editor value
  chrome.tabs.sendMessage(tabId, { action: 'getFlowCode' }, (response) => {
      console.log('dummy in background.js');
      console.log(response.value);
  });
}




function fetchRiskScorePoly(contractAddress, tabId) {
  let apiUrl = `http://3.108.126.225:8080/api/get_risk_score_polygon_mainnet_verified_contract?smart_contract_address=${contractAddress}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let riskScore = data.risk_score;
      let color = getRiskColor(riskScore);
      chrome.tabs.sendMessage(tabId, {color: color, score: riskScore, summary: data.result_summary});
    });
}

function fetchRiskScoreEther(contractAddress, tabId) {
  let apiUrl = `http://3.108.126.225:8080/api/get_risk_score_ethereum_mainnet_verified_contract?smart_contract_address=${contractAddress}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let riskScore = data.risk_score;
      let color = getRiskColor(riskScore);
      chrome.tabs.sendMessage(tabId, {color: color, score: riskScore, summary: data.result_summary});
    });
}

function getRiskColor(riskScore) {
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
  return color;
}

