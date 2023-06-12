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
