// js/student.js

(function () {
    'use strict';

    // Check if user is logged in
    if (!window.localStorage.getItem('idToken')) {
        window.location.href = 'signin.html';
        return;
    }

    document.getElementById('logoutBtn')?.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'signin.html';
    });

    // Placeholder for fetching student results
    console.log('Student dashboard loaded');
})();