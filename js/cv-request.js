// CV Request Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const requestCvBtn = document.getElementById('request-cv-btn');
    const cvModal = document.getElementById('cv-modal');
    const closeModal = document.querySelector('.close-modal');
    const cvRequestForm = document.getElementById('cv-request-form');
    
    // Email address to send the CV request to
    const cvEmail = "mario.chacon@icmat.es"; // Reemplazar con el email correcto
    
    // Open modal when button is clicked
    if (requestCvBtn) {
        requestCvBtn.addEventListener('click', function() {
            cvModal.classList.add('active');
        });
    }
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            cvModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === cvModal) {
            cvModal.classList.remove('active');
        }
    });
    
    // Handle form submission
    if (cvRequestForm) {
        cvRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Construct email subject and body
            const subject = `CV Request from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || "No message provided."}`;
            
            // Open default email client
            window.location.href = `mailto:${cvEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Close modal after sending
            setTimeout(function() {
                cvModal.classList.remove('active');
                cvRequestForm.reset();
            }, 1000);
        });
    }
}); 