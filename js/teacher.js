// js/teacher.js

(function () {
    'use strict';

    if (!window.localStorage.getItem('idToken')) {
        window.location.href = 'signin.html';
        return;
    }

    document.getElementById('logoutBtn')?.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'signin.html';
    });

    console.log('Teacher dashboard loaded');
})();