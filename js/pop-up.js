// pop-up.js (vanilla JS)

document.addEventListener('DOMContentLoaded', function () {
    var popUp = document.querySelector('.pop-up');
    var closeButtons = document.querySelectorAll('.close');
    var popUpButtons = document.querySelectorAll('.pop-up-trigger');
    var body = document.body;

    if (!popUp) return; // nothing to do if popup doesn't exist

    function showHideToggle() {
        popUp.classList.toggle('is-visible');
        body.classList.toggle('no_scroll');
    }

    function hidePopup() {
        popUp.classList.remove('is-visible');
        body.classList.remove('no_scroll');
    }

    // toggle when any trigger is clicked
    popUpButtons.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            showHideToggle();
        });
    });

    // close when any element with .close is clicked
    closeButtons.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            hidePopup();
        });
    });

    // close when clicking the backdrop (the element with class .pop-up itself)
    popUp.addEventListener('click', function (event) {
        // If the exact element clicked is the popUp container (backdrop) or has class "close"
        if (event.target === popUp || event.target.classList.contains('close')) {
            hidePopup();
        }
    });

    // Optional: close when pressing Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            hidePopup();
        }
    });
});