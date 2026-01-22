document.addEventListener("DOMContentLoaded", () => {
    const profileDiv = document.getElementById('userProfile');
    
    // Retrieve the saved details from Cognito login
    const email = localStorage.getItem('userEmail') || 'User';
    const dept = localStorage.getItem('userDept') || 'General';
    const role = localStorage.getItem('userRole') || 'Member';

    // Inject into the header
    profileDiv.innerHTML = `
        Signed in as: <strong>${email}</strong> | 
        Dept: <strong>${dept}</strong> | 
        Role: <strong>${role}</strong>
    `;
});

// Logout function to clear the session
window.logout = function() {
    localStorage.clear();
    window.location.href = 'login.html'; // Redirect to your login page
};