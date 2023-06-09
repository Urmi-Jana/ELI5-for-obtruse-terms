//highlight text in pdf, right click, generate info


const generateCompletionAction = async (info) => {
    try{
        const {selectedText} = info;
        const basePrompt = `
            Act as a teacher and explain this term in extremely simple terms. Use examples and real-world use cases to support the answer.

            Term: 
        `;
    }catch(error){
        console.log(error);
    }
}

//when ext is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'context-run',
        title: 'ELI5',
        contexts: ['selection'],
      });
})


// Add listener for opening up context menu when clicked
chrome.contextMenus.onClicked.addListener(generateCompletionAction);