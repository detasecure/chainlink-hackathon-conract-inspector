chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
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
    content.style.backgroundColor = request.color;
    content.style.margin = '15% auto';
    content.style.padding = '20px';
    content.style.border = '1px solid #888';
    content.style.width = '80%';
    content.style.textAlign = 'center';
    content.style.fontSize = '20px';

    // Add the risk score to the content
    content.textContent = "Security Risk Score: " + request.score + " Summary: " + JSON.stringify(request.summary);

    // Add the content to the modal
    modal.appendChild(content);

    // Add the modal to the body
    document.body.appendChild(modal);

    // Remove the modal when clicked
    modal.onclick = function() {
      document.body.removeChild(modal);
    };
  }
);

// // Create the hidden input element
// const inputElement = document.createElement('input');
// inputElement.type = 'hidden';
// inputElement.id = 'result_ace_blah';
// // Append the input element to the document body
// document.body.appendChild(inputElement);        




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

//     // Create a <script> element
//     const script = document.createElement('script');
//     // Set the source attribute to the URL of your JavaScript file
//     script.src = chrome.runtime.getURL('ace-interaction.js');
//     // Append the <script> element to the document body
//     document.body.appendChild(script);



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