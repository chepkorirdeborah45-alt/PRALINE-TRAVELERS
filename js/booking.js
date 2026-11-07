
/* =========================================
   PRALINE TRAVELERS
   BOOKING PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    // =====================================
    // 1. SELECT HTML ELEMENTS
    // =====================================

    const bookingForm = document.getElementById("bookingForm");

    const fullName = document.getElementById("fullName");

    const phoneNumber = document.getElementById("phoneNumber");

    const serviceType = document.getElementById("serviceType");


    // Travel elements

    const travelFields = document.getElementById("travelFields");

    const departure = document.getElementById("departure");

    const destination = document.getElementById("destination");

    const travelDate = document.getElementById("travelDate");

    const passengers = document.getElementById("passengers");

    const passengerGroup = document.getElementById("passengerGroup");


    // Parcel elements

    const parcelFields = document.getElementById("parcelFields");

    const recipientName = document.getElementById("recipientName");

    const recipientPhone = document.getElementById("recipientPhone");

    const parcelPickup = document.getElementById("parcelPickup");

    const parcelDestination = document.getElementById("parcelDestination");

    const parcelDescription = document.getElementById("parcelDescription");

    const parcelDate = document.getElementById("parcelDate");


    // Fare and feedback elements

    const fareSummary = document.getElementById("fareSummary");

    const fareAmount = document.getElementById("fareAmount");

    const fareNote = document.getElementById("fareNote");

    const bookingFeedback = document.getElementById("bookingFeedback");


    // Additional information

    const message = document.getElementById("message");



    // =====================================
    // 2. SET MINIMUM DATES
    // =====================================

    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    travelDate.min = localToday;

    parcelDate.min = localToday;



    // =====================================
    // 3. DEFINE TRAVEL ROUTES
    // =====================================

    const routes = {

        Nairobi: [
            "Bomet",
            "Kaplong",
            "Litein",
            "Chebole"
        ],

        Bomet: [
            "Nairobi"
        ]

    };



    // =====================================
    // 4. UPDATE TRAVEL DESTINATIONS
    // =====================================

    departure.addEventListener("change", function () {

        const selectedDeparture = departure.value;

        destination.innerHTML =
            '<option value="">Select destination</option>';

        if (routes[selectedDeparture]) {

            routes[selectedDeparture].forEach(function (place) {

                const option = document.createElement("option");

                option.value = place;

                option.textContent = place;

                destination.appendChild(option);

            });

        }

    });



    // =====================================
    // 5. CALCULATE SHUTTLE FARE
    // =====================================

    const farePerPassenger = 1300;

    function calculateFare() {

        const selectedService = serviceType.value;

        const numberOfPassengers = Number(passengers.value);


        // Shuttle fare

        if (selectedService === "shuttle") {

            const totalFare =
                farePerPassenger * numberOfPassengers;

            fareAmount.textContent =
                "KSh " + totalFare.toLocaleString("en-KE");

            fareNote.textContent =
                "KSh 1,300 per passenger.";

            return;

        }


        // Private charter

        if (selectedService === "charter") {

            fareAmount.textContent = "Request a Quote";

            fareNote.textContent =
                "Contact our team for full-vehicle charter pricing.";

            return;

        }


        // Parcel delivery

        if (selectedService === "parcel") {

            fareAmount.textContent = "Request a Quote";

            fareNote.textContent =
                "Delivery charges depend on parcel details and destination.";

            return;

        }


        // No service selected

        fareAmount.textContent = "Select a Service";

        fareNote.textContent =
            "Choose a service to see the estimated fare.";

    }



    // =====================================
    // 6. CONTROL SERVICE SECTIONS
    // =====================================

    function updateServiceFields() {

        const selectedService = serviceType.value;


        // Hide all sections initially

        travelFields.hidden = true;

        parcelFields.hidden = true;

        passengerGroup.style.display = "block";


        // Reset required fields

        departure.required = false;

        destination.required = false;

        travelDate.required = false;

        passengers.required = false;

        recipientName.required = false;

        recipientPhone.required = false;

        parcelPickup.required = false;

        parcelDestination.required = false;

        parcelDescription.required = false;

        parcelDate.required = false;


        // Shuttle service

        if (selectedService === "shuttle") {

            travelFields.hidden = false;

            departure.required = true;

            destination.required = true;

            travelDate.required = true;

            passengers.required = true;

        }


        // Private charter

        else if (selectedService === "charter") {

            travelFields.hidden = false;

            departure.required = true;

            destination.required = true;

            travelDate.required = true;

            passengerGroup.style.display = "none";

        }


        // Courier and parcel delivery

        else if (selectedService === "parcel") {

            parcelFields.hidden = false;

            recipientName.required = true;

            recipientPhone.required = true;

            parcelPickup.required = true;

            parcelDestination.required = true;

            parcelDescription.required = true;

            parcelDate.required = true;

        }


        calculateFare();

    }


    serviceType.addEventListener("change", function () {

        updateServiceFields();

    });



    // =====================================
    // 7. PASSENGER COUNT CHANGE
    // =====================================

    passengers.addEventListener("change", function () {

        calculateFare();

    });



    // =====================================
    // 8. FORM SUBMISSION
    // =====================================

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();


        bookingFeedback.className = "";

        bookingFeedback.style.display = "none";


        // Get common customer information

        const customerName = fullName.value.trim();

        const customerPhone = phoneNumber.value.trim();

        const selectedService = serviceType.value;


        // Validate customer information

        if (!customerName || !customerPhone) {

            showFeedback(
                "Please enter your name and phone number.",
                "error"
            );

            return;

        }


        // =================================
        // SHUTTLE AND CHARTER VALIDATION
        // =================================

        if (
            selectedService === "shuttle" ||
            selectedService === "charter"
        ) {

            const selectedDeparture = departure.value;

            const selectedDestination = destination.value;

            const selectedDate = travelDate.value;


            if (!selectedDeparture || !selectedDestination) {

                showFeedback(
                    "Please select your departure and destination.",
                    "error"
                );

                return;

            }


            if (selectedDeparture === selectedDestination) {

                showFeedback(
                    "Departure and destination cannot be the same.",
                    "error"
                );

                return;

            }


            if (!selectedDate || selectedDate < localToday) {

                showFeedback(
                    "Please select a valid travel date.",
                    "error"
                );

                return;

            }


            // Calculate shuttle fare

            let fareMessage;

            if (selectedService === "shuttle") {

                const totalFare =
                    farePerPassenger * Number(passengers.value);

                fareMessage =
                    "KSh " + totalFare.toLocaleString("en-KE");

            } else {

                fareMessage = "Quote required";

            }


            showFeedback(
                "Thank you, " + customerName +
                "! Your travel request has been prepared. " +
                "Journey: " + selectedDeparture +
                " to " + selectedDestination +
                ". Travel date: " + selectedDate +
                ". Estimated fare: " + fareMessage +
                ". Our team will contact you on " +
                customerPhone + " to confirm availability.",
                "success"
            );

        }



        // =================================
        // PARCEL DELIVERY VALIDATION
        // =================================

        else if (selectedService === "parcel") {

            const receiver = recipientName.value.trim();

            const receiverPhone = recipientPhone.value.trim();

            const pickup = parcelPickup.value;

            const delivery = parcelDestination.value;

            const description = parcelDescription.value.trim();

            const deliveryDate = parcelDate.value;


            if (
                !receiver ||
                !receiverPhone ||
                !pickup ||
                !delivery ||
                !description ||
                !deliveryDate
            ) {

                showFeedback(
                    "Please complete all required parcel information.",
                    "error"
                );

                return;

            }


            if (pickup === delivery) {

                showFeedback(
                    "Pickup and delivery locations cannot be the same.",
                    "error"
                );

                return;

            }


            if (deliveryDate < localToday) {

                showFeedback(
                    "Please select a valid delivery date.",
                    "error"
                );

                return;

            }


            showFeedback(
                "Thank you, " + customerName +
                "! Your parcel delivery request has been prepared. " +
                "Parcel recipient: " + receiver +
                ". Pickup: " + pickup +
                ". Delivery: " + delivery +
                ". Our team will contact you on " +
                customerPhone + " with delivery details and pricing.",
                "success"
            );

        }


        // =================================
        // FRONTEND DEMONSTRATION NOTICE
        // =================================

        // Requests are currently displayed in the browser only.
        // They are not yet saved to the database or sent to staff.

    });



    // =====================================
    // 9. DISPLAY FORM FEEDBACK
    // =====================================

    function showFeedback(messageText, type) {

        bookingFeedback.textContent = messageText;

        bookingFeedback.className = type;

        bookingFeedback.style.display = "block";

        bookingFeedback.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }



    // =====================================
    // 10. INITIAL PAGE STATE
    // =====================================

    updateServiceFields();

});
