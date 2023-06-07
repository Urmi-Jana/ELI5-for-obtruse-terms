//add event listeners

const encode = (val) => {
    return btoa(val)
}
//when key is to be saved
const saveKey = () => {
    const input = document.getElementById('key_input');

    if (input){
        const {value} = input;
    

        //key encoding
        const encodedVal = encode(value);

        //saving to google storage
        chrome.storage.local.set({ 'openai-key': encodedValue }, () => {
            document.getElementById('key_needed').style.display = 'none';
            document.getElementById('key_entered').style.display = 'block';
        });
    }
}


const changeKey = () => {
    document.getElementById('key_needed').style.display = 'none';
    document.getElementById('key_entered').style.display = 'block';

}

//for saving the key button
document.getElementById("save_key_button").addEventListener('click', saveKey);

//for the change key button
document.getElementById("change_key_button").addEventListener('click', changeKey);


