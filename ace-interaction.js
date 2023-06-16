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


function fetchRiskScoreForFlowContract(sourceCode) {
  console.log("Calling API https://chainlink.getsecured.ai/analyze_flow_cadence_code/")


let apiUrl = `https://chainlink.getsecured.ai/analyze_flow_cadence_code/`;

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ code: sourceCode })
})
  .then(response => response.json())
  .then(data => {
    data =data.results;
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
    console.log(color + ' ' + riskScore + ' ' + data.summary );
    displayResultInModal(color, riskScore, data.summary)
    // chrome.tabs.sendMessage(tabId, { action: 'updateRiskScore' }, {color: color, score: riskScore, summary: data.summary});
  });


function displayResultInModal(color, score, summary) {
        // Create the modal
      let modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.zIndex = 1000;
      modal.style.left = '0';
      modal.style.top = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.overflow = 'auto';
      modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

      // Create the content
      let content = document.createElement('div');
      content.style.backgroundColor = color;
      content.style.margin = '15% auto';
      content.style.padding = '20px';
      content.style.border = '1px solid #888';
      content.style.width = '80%';
      content.style.textAlign = 'center';
      content.style.fontSize = '20px';

      delete summary['Optimization'];
      // Add the risk score to the content
      content.textContent = "Security Risk Score: " + score + " Summary: " + JSON.stringify(summary);

      // Add the content to the modal
      modal.appendChild(content);

      // Add the modal to the body
      document.body.appendChild(modal);

      // Remove the modal when clicked
      modal.onclick = function() {
        document.body.removeChild(modal);
      };
}




  // const analyzeCode = async () => {
  //   const response = await fetch('https://chainlink.getsecured.ai/analyze_flow_cadence_code/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ code })
  //   });

  //   const data = await response.json();
  //   console.log(data)

  //     let riskScore = data.risk_score;
  //     let color;
  //     if (riskScore > 75) {
  //       color = 'red';
  //     } else if (riskScore > 50) {
  //       color = 'orange';
  //     } else if (riskScore > 25) {
  //       color = 'yellow';
  //     } else {
  //       color = 'green';
  //     }
  //     console.log(color + ' ' + riskScore + ' ' + data.result_summary );
  //     chrome.tabs.sendMessage(tabId, { action: 'updateRiskScore' }, {color: color, score: riskScore, summary: data.result_summary});
  // };



  // let apiUrl = `http://3.108.126.225:8080/api/get_risk_score_polygon_mainnet_verified_contract?smart_contract_address=${sourceCode}`;
  // fetch(apiUrl)
  //   .then(response => response.json())
  //   .then(data => {
  //     let riskScore = data.risk_score;
  //     let color;
  //     if (riskScore > 75) {
  //       color = 'red';
  //     } else if (riskScore > 50) {
  //       color = 'orange';
  //     } else if (riskScore > 25) {
  //       color = 'yellow';
  //     } else {
  //       color = 'green';
  //     }
  //     console.log(color + ' ' + riskScore + ' ' + data.result_summary );
  //     chrome.tabs.sendMessage(tabId, { action: 'updateRiskScore' }, {color: color, score: riskScore, summary: data.result_summary});
  //   });
}

function setResultValue(value) {
  // const resultElement = document.getElementById('result_ace_blah');
  // resultElement.value = value;
  // console.log(value);
  fetchRiskScoreForFlowContract(value);

  // Raise a custom event
  // const event = new CustomEvent('resultUpdated', { detail: value });
  // resultElement.dispatchEvent(event);
}

waitForAceEditor();
