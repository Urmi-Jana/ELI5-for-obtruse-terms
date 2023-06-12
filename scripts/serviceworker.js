//highlight text in pdf, right click, generate info

//to get and decode key
const getKey = () => {
    return new Promise ((resolve, reject) => {
        chrome.storage.local.get(['openai-key'], (result) => {
            if (result['openai-key']){
                const key = (atob(result['openai-key']));
                resolve(key)
            };
        })
    })
}

//generate output
const generate = async (prompt) => {
    const key = await getKey(); //get key from storage
    const url = 'https://api.openai.com/v1/completions';

    const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`,
            },
            body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 1250,
            temperature: 0.7,
        }),
    })
    console.log(response);

    const output = await response.json();
    return output.choices.pop();
    
}

//after clicking
const generateCompletionAction = async (info) => {
    try{
        const { selectionText } = info;
        console.log(info);
        const basePrompt = `
            Act as a teacher and explain this term in extremely simple terms. Use examples and real-world use cases to support the answer.

            Term: 
        `;

        const completePrompt = await generate (`${basePrompt}${selectionText}`);
        console.log(completePrompt.text);
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