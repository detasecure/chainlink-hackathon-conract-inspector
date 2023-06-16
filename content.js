chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'getFlowCode') {
      console.log('dummy in content.js');
      // triggerCopyAndReadClipboard();
      triggerFlowScoring()
    }
    else if (request.action === 'updateRiskScore') {
      displayResultInModal(request.color, request.score, request.summary)
    }
  }
);

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


function triggerFlowScoring() {

  // // Create the hidden input element
  // const inputElement = document.createElement('input');
  // inputElement.type = 'hidden';
  // inputElement.id = 'result_ace_blah';
  // // Append the input element to the document body
  // document.body.appendChild(inputElement);        

  // Create a <script> element
  const script = document.createElement('script');
  // Set the source attribute to the URL of your JavaScript file
  script.src = chrome.runtime.getURL('ace-interaction.js');
  // Append the <script> element to the document body
  document.body.appendChild(script);

}

function triggerCopyAndReadClipboard() {
    // Find the "Copy" button using XPath and simulate a click event
    let xpath = "//button[contains(text(), 'Copy')]";
    let copyButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (copyButton) {
        copyButton.click();
    }

    // Read from the clipboard
    navigator.clipboard.readText()
        .then(text => {
            console.log('Pasted content: ', text);
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}






// Listen for messages from the background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'getEditorValue') {
//     // Find the ACE editor by its ID


//     // // Listen for the custom event raised in content.js
//     // document.addEventListener('resultUpdated', (event) => {
//     //   const resultValue = event.detail;
//     //   console.log('Result value updated:', resultValue);
//     //   sendResponse({ value: editorValue }); 
//     // });




//     // const editor = ace.edit("ace-editor-contract-code");
//     // if (editor) {
//     //   // Get the value of the ACE editor
//     //   const editorValue = editor.getValue();
//     //   sendResponse({ value: editorValue });
//     // } else {
//     //   sendResponse({ value: null });
//     // }
//   }
// });