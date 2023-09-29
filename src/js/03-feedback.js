import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// функція для збереження форми у LS
function saveFormStateToLS() {
    const formState = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}

// функція для відновлення стану форми з LS
function restoreFormStateFromLS() {
    const savedState = localStorage.getItem('feedback-form-state');
    if (savedState) {
        const formState = JSON.parse(savedState);
        emailInput.value = formState.email;
        messageInput.value = formState.message;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    restoreFormStateFromLS();
});

// відстежити подію input на формі throttle
form.addEventListener('input', throttle(function () {
    saveFormStateToLS();
}, 500));

// відстежити подію submit на формі та preventdefault
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // очистити LS та поля форми
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';

    // значення полів
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    console.log(formData);
});
