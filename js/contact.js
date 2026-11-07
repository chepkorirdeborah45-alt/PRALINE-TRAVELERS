
/* =========================================
   PRALINE TRAVELERS
   WHATSAPP CONTACT FORM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Select the contact form
    const contactForm = document.getElementById("contactForm");

    // 2. Select the feedback paragraph
    const contactFeedback = document.getElementById("contactFeedback");

    // 3. Check whether the form exists
    if (!contactForm) return;


    // 4. Listen for form submission
    contactForm.addEventListener("submit", function (event) {

        // Stop the browser from refreshing the page
        event.preventDefault();


        // 5. Get customer information
        const fullName = document.getElementById("fullName").value.trim();

        const phoneNumber = document.getElementById("phoneNumber").value.trim();

        const emailAddress = document.getElementById("emailAddress").value.trim();

        const enquiryType = document.getElementById("enquiryType").value;

        const message = document.getElementById("contactMessage").value.trim();


        // 6. Praline Travelers WhatsApp number
        const whatsappNumber = "254764774570";


        // 7. Build the WhatsApp message
        const whatsappMessage = `
Hello Praline Travelers!

NEW WEBSITE ENQUIRY

Full Name: ${fullName}

Phone Number: ${phoneNumber}

Email Address: ${emailAddress || "Not provided"}

Enquiry Type: ${enquiryType}

Customer Message:
${message}
        `;


        // 8. Encode the message for a URL
        const encodedMessage = encodeURIComponent(whatsappMessage);


        // 9. Create WhatsApp URL
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


        // 10. Open WhatsApp
        const whatsappWindow = window.open(
            whatsappURL,
            "_blank"
        );


        // 11. Display feedback
        if (whatsappWindow) {

            contactFeedback.textContent =
                "WhatsApp opened. Please press Send to submit your enquiry.";

            contactForm.reset();

        } else {

            contactFeedback.textContent =
                "WhatsApp could not open. Please allow pop-ups and try again.";

        }

    });

});
