import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);


// збереження часу відтворення в локальному сховищі
function saveCurrentTimeToLS(currentTime) {
    localStorage.setItem('videoplayer-current-time', currentTime);
}

// відновлення часу відтворення з локального сховища
function restoreCurrentTimeFromLS() {
    const savedTime = parseFloat(localStorage.getItem('videoplayer-current-time'));
    if (!isNaN(savedTime)) {
        player.setCurrentTime(savedTime);
    }
}

// обробкa події timeupdate з використанням throttle
function handleTimeUpdate(data) {
    const currentTime = data.seconds;
    saveCurrentTimeToLS(currentTime);
}

player.on('timeupdate', throttle(handleTimeUpdate, 1000));

// відновлення часу відтворення при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
    restoreCurrentTimeFromLS();
    player.play(); // початок відтворення відео
});