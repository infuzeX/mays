const form = document.querySelector('.contact-us');
//get form data
let elements = "";
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {};
    elements = e.target.elements;
    for (let i = 0; i < elements.length - 1; i++) {
            formData[elements[i].name] = elements[i].value
            elements[i].value = "";
    }
    showStatus('INFO', 'Submitting...')
console.log(formData);
   sendData(formData)
})

//send data to server
const xhr = new XMLHttpRequest();
function sendData(credentials) {
    xhr.open('POST', 'webmail.php');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(credentials))
}
xhr.onload = function () {
    console.log(this.responseText)
    const {success , message} = JSON.parse(this.responseText);
         showStatus(success , message);
    
}
xhr.onabort = function () {
    showStatus('WARNING', 'Error Occured : abort');
}
xhr.onerror = function () {
    showStatus('WARNING', 'Error Occured : error');
}

//show status on form
function showStatus(status, message) {
    const alertBox = document.querySelector('.alert-box');
    const color = {
        'INFO': '#2196F3',
        'WARNING': '#f44336',
        'SUCCESS': '#4CAF50'
    }
    alertBox.innerHTML = ` <div class="alert" style="background-color:${color[status]}">
    <span class="closebtn" onclick="closeNotify()">&times;</span>
    <strong>"${status}!"</strong> ${message}
    </div>`
 }

function closeNotify() {
    document.querySelector('.alert-box').innerHTML = "";
}