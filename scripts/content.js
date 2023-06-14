//for controlling the UI by listening the messages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'inject') {
      const { content } = request;
  
      console.log(content);
  
      sendResponse({ status: 'success' });
    }
  });