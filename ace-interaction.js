function waitForAceEditor() {
  const targetNode = document.getElementById('ace-editor-contract-code');

  // If the targetNode is already available, initialize the ACE editor
  if (targetNode) {
    const aceEditor = ace.edit(targetNode);
    const value = aceEditor.getValue();
    setResultValue(value);
    return;
  }

  // Otherwise, wait for the targetNode to become available
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if the targetNode is now available
        if (mutation.addedNodes[0].id === 'ace-editor-contract-code') {
          observer.disconnect(); // Stop observing changes
          const aceEditor = ace.edit(mutation.addedNodes[0]);
          const value = aceEditor.getValue();
          setResultValue(value);
          return;
        }
      }
    }
  });

  // Start observing changes in the DOM
  observer.observe(document.body, { childList: true, subtree: true });
}


function fetchRiskScore(tabId) {
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
      chrome.tabs.sendMessage(tabId, { action: 'displayScanResults' }, {color: color, score: riskScore, summary: data.result_summary});
    });
}

function setResultValue(value) {
  const resultElement = document.getElementById('result_ace_blah');
  resultElement.value = value;
  console.log(value)

  // Raise a custom event
  // const event = new CustomEvent('resultUpdated', { detail: value });
  // resultElement.dispatchEvent(event);
}

waitForAceEditor();
