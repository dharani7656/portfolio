document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent page reload
  
    const status = document.getElementById('status');
    status.textContent = 'Sending...';
  
    const formData = new FormData(this);
  
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          user_id: import.meta.env.VITE_EMAILJS_USER_ID,
          template_params: {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
          },
        }),
      });
  
      status.textContent = '✅ Message sent successfully!';
      this.reset(); // Clear the form
  
    } catch (error) {
      console.error('Error sending email:', error);
      status.textContent = '❌ Error sending message. Please try again.';
    }
  });
  