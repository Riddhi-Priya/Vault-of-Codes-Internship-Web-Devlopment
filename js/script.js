
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }


    // --- Portfolio Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active class on button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    // --- Form Submission Handling ---
    const emailForm = document.getElementById('email-form');
    const contactForm = document.getElementById('contact-form');
    
    // IMPORTANT: Replace this with your actual Google Apps Script Web App URL
    const googleScriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

    // Handle Email Subscription Form
    if (emailForm) {
        emailForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitButton = emailForm.querySelector('button');
            const statusMessage = document.getElementById('email-form-status');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            statusMessage.textContent = '';

            const formData = new FormData(emailForm);
            formData.append('formType', 'emailSubscription');

            fetch(googleScriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        statusMessage.textContent = 'Thank you for subscribing!';
                        statusMessage.style.color = 'green';
                        emailForm.reset();
                    } else {
                        throw new Error(data.error);
                    }
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    statusMessage.textContent = 'Something went wrong. Please try again.';
                    statusMessage.style.color = 'red';
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribe';
                });
        });
    }

    // Handle Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button');
            const statusMessage = document.getElementById('contact-form-status');

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            statusMessage.textContent = '';
            
            const formData = new FormData(contactForm);
            formData.append('formType', 'contactForm');

            fetch(googleScriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                     if (data.result === 'success') {
                        statusMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                        statusMessage.style.color = 'green';
                        contactForm.reset();
                    } else {
                        throw new Error(data.error);
                    }
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    statusMessage.textContent = 'An error occurred. Please try again later.';
                    statusMessage.style.color = 'red';
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
        });
    }
});
