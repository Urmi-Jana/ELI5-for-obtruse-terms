//add event listeners

//check for key

const checkKey = () => {

    //use promise to make sure that callback is resolved before returning

    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['openai-key'], (result) => {
            resolve(result['openai-key']);
        })
    })
}

const encode = (val) => {
    return btoa(val)
}
//when key is to be saved
const saveKey = () => {
    const input = document.getElementById('key_input');

    if (input){
        const {value} = input;
    
        //key encoding
        const encodedValue = encode(value);

        //saving to google storage
        chrome.storage.local.set({ 'openai-key': encodedValue }, () => {
            document.getElementById('key_needed').style.display = 'none';
            document.getElementById('key_entered').style.display = 'block';
        });
    }
}

const changeKey = () => {
    document.getElementById('key_needed').style.display = 'block';
    document.getElementById('key_entered').style.display = 'none';

}

//for saving the key button
document.getElementById("save_key_button").addEventListener('click', saveKey);

//for the change key button
document.getElementById("change_key_button").addEventListener('click', changeKey);


//then clause for promis = always runs when ext is opened
checkKey().then((response) => {
    if (response) {
      document.getElementById('key_needed').style.display = 'none';
      //document.getElementById('key_entered').style.display = 'block';
    }
  });