const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const addressval = address.value;

    messageOne.textContent = "Loading .....";
    messageTwo.textContent = '';
    const url = '/weather?address='+encodeURIComponent(addressval);
    fetch(url).then((response) => {
        response.json().then(( data ) => {
            if(data.error) {
                messageTwo.textContent = data.error;
            } else {
                messageOne.textContent = data.location + ' ' + data.forecast;
            }
        })
    });
});