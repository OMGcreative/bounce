// pop-up.js (vanilla JS)

document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var configs = [
        { triggerSelector: '.pop-up-trigger-rider', popupSelector: '.pop-up-rider' },
        { triggerSelector: '.pop-up-trigger-driver', popupSelector: '.pop-up-driver' }
    ];
    var entries = [];

    function anyVisible() {
        return entries.some(function (entry) {
            return entry.popup.classList.contains('is-visible');
        });
    }

    function hideEntry(entry) {
        entry.popup.classList.remove('is-visible');
        if (!anyVisible()) {
            body.classList.remove('no_scroll');
        }
    }

    function showEntry(entry) {
        entries.forEach(function (other) {
            if (other !== entry) {
                other.popup.classList.remove('is-visible');
            }
        });
        entry.popup.classList.add('is-visible');
        body.classList.add('no_scroll');
    }

    configs.forEach(function (config) {
        var popup = document.querySelector(config.popupSelector);
        var triggers = document.querySelectorAll(config.triggerSelector);

        if (!popup || triggers.length === 0) {
            return;
        }

        var entry = { popup: popup };

        entries.push(entry);

        triggers.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                if (popup.classList.contains('is-visible')) {
                    hideEntry(entry);
                } else {
                    showEntry(entry);
                }
            });
        });

        // Keep close behaviour scoped to the active popup instance.
        var closeButtons = popup.querySelectorAll('.close');

        closeButtons.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                hideEntry(entry);
            });
        });

        popup.addEventListener('click', function (event) {
            if (event.target === popup || event.target.classList.contains('close')) {
                hideEntry(entry);
            }
        });
    });

    if (!entries.length) {
        return;
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            entries.forEach(function (entry) {
                hideEntry(entry);
            });
        }
    });
});