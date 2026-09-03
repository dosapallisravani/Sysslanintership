/* =========================
   EVENTORA
   EVENT DATA
========================= */

const events = [

    {
        name: "NEON",
        subtitle: "NIGHTS",
        type: "EDM LIVE EXPERIENCE",
        date: "18 SEP 2026",
        time: "7:00 PM",
        venue: "HYDERABAD",
        price: 799,
        image: "images/neon-dj.png"
    },

    {
        name: "MOON",
        subtitle: "TUNES",
        type: "ACOUSTIC MUSIC NIGHT",
        date: "25 SEP 2026",
        time: "6:30 PM",
        venue: "VISAKHAPATNAM",
        price: 599,
        image: "images/moon-guitarist.png"
    },

    {
        name: "HAPPY",
        subtitle: "BEATS",
        type: "LIVE POP CONCERT",
        date: "02 OCT 2026",
        time: "7:30 PM",
        venue: "VIJAYAWADA",
        price: 699,
        image: "images/happy-singer.png"
    },

    {
        name: "BEAT",
        subtitle: "WORLD",
        type: "HIP-HOP LIVE SHOW",
        date: "10 OCT 2026",
        time: "8:00 PM",
        venue: "HYDERABAD",
        price: 899,
        image: "images/beat-rapper.png"
    },

    {
        name: "CITY",
        subtitle: "BEATS",
        type: "URBAN MUSIC FEST",
        date: "18 OCT 2026",
        time: "7:00 PM",
        venue: "BENGALURU",
        price: 749,
        image: "images/city-dj.png"
    },

    {
        name: "SOUND",
        subtitle: "FEST",
        type: "ULTIMATE MUSIC FESTIVAL",
        date: "31 OCT 2026",
        time: "6:00 PM",
        venue: "HYDERABAD",
        price: 999,
        image: "images/sound-fest.png"
    }

];


/* =========================
   ELEMENTS
========================= */

let currentIndex = 0;
let isAnimating = false;

const centerImage =
    document.getElementById("centerImage");

const leftImage =
    document.getElementById("leftImage");

const rightImage =
    document.getElementById("rightImage");

const eventName =
    document.getElementById("eventName");

const eventType =
    document.getElementById("eventType");

const eventDate =
    document.getElementById("eventDate");

const eventTime =
    document.getElementById("eventTime");

const eventVenue =
    document.getElementById("eventVenue");

const eventPrice =
    document.getElementById("eventPrice");

const indicators =
    document.getElementById("indicators");

const selectedEvent =
    document.getElementById("selectedEvent");

const ticketCount =
    document.getElementById("ticketCount");

const totalPrice =
    document.getElementById("totalPrice");

const bookingForm =
    document.getElementById("bookingForm");


/* =========================
   CREATE INDICATORS
========================= */

function createIndicators() {

    indicators.innerHTML = "";

    events.forEach((event, index) => {

        const dot = document.createElement("span");

        if (index === currentIndex) {
            dot.classList.add("active");
        }

        indicators.appendChild(dot);

    });

}


/* =========================
   LOAD EVENT OPTIONS
========================= */

function loadEventOptions() {

    events.forEach((event, index) => {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            `${event.name} ${event.subtitle}`;

        selectedEvent.appendChild(option);

    });

}


/* =========================
   UPDATE EVENT
========================= */

function updateEvent() {

    const current =
        events[currentIndex];

    const previousIndex =
        (currentIndex - 1 + events.length)
        % events.length;

    const nextIndex =
        (currentIndex + 1)
        % events.length;


    /* CENTER */

    centerImage.src = current.image;

    centerImage.onerror = function () {

        centerImage.style.display = "none";

    };


    /* LEFT */

    leftImage.src =
        events[previousIndex].image;

    leftImage.onerror = function () {

        leftImage.style.display = "none";

    };


    /* RIGHT */

    rightImage.src =
        events[nextIndex].image;

    rightImage.onerror = function () {

        rightImage.style.display = "none";

    };


    /* TEXT */

    eventName.innerHTML =
        `${current.name}<br>
        <span>${current.subtitle}</span>`;

    eventType.textContent =
        current.type;

    eventDate.textContent =
        current.date;

    eventTime.textContent =
        current.time;

    eventVenue.textContent =
        current.venue;

    eventPrice.textContent =
        `₹${current.price}`;


    /* INDICATORS */

    const dots =
        indicators.querySelectorAll("span");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });


    /* BOOKING EVENT */

    selectedEvent.value =
        currentIndex;

}


/* =========================
   NEXT EVENT
========================= */

function nextEvent() {

    if (isAnimating) return;

    isAnimating = true;

    currentIndex =
        (currentIndex + 1)
        % events.length;

    updateEvent();

    setTimeout(() => {

        isAnimating = false;

    }, 700);

}


/* =========================
   PREVIOUS EVENT
========================= */

function previousEvent() {

    if (isAnimating) return;

    isAnimating = true;

    currentIndex =
        (currentIndex - 1 + events.length)
        % events.length;

    updateEvent();

    setTimeout(() => {

        isAnimating = false;

    }, 700);

}


/* =========================
   ARROW BUTTONS
========================= */

document
    .getElementById("nextBtn")
    .addEventListener(
        "click",
        nextEvent
    );

document
    .getElementById("previousBtn")
    .addEventListener(
        "click",
        previousEvent
    );


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {
            nextEvent();
        }

        if (event.key === "ArrowLeft") {
            previousEvent();
        }

    }
);


/* =========================
   SWIPE
========================= */

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);

document.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;

        const distance =
            touchEndX - touchStartX;

        if (Math.abs(distance) < 50) {
            return;
        }

        if (distance < 0) {
            nextEvent();
        } else {
            previousEvent();
        }

    }
);


/* =========================
   TICKET PRICE
========================= */

function calculateTotal() {

    const eventIndex =
        selectedEvent.value;

    const count =
        Number(ticketCount.value);

    if (
        eventIndex === "" ||
        !count
    ) {

        totalPrice.textContent =
            "₹0";

        return;

    }

    const price =
        events[eventIndex].price;

    const total =
        price * count;

    totalPrice.textContent =
        `₹${total}`;

}


/* =========================
   EVENT / TICKET CHANGE
========================= */

selectedEvent.addEventListener(
    "change",
    calculateTotal
);

ticketCount.addEventListener(
    "change",
    calculateTotal
);


/* =========================
   FORM VALIDATION
========================= */

bookingForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("fullName")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const phone =
            document
                .getElementById("phone")
                .value
                .trim();

        const eventValue =
            selectedEvent.value;

        const tickets =
            ticketCount.value;

        const payment =
            document
                .getElementById("payment")
                .value;


        /* ERROR ELEMENTS */

        const nameError =
            document.getElementById("nameError");

        const emailError =
            document.getElementById("emailError");

        const phoneError =
            document.getElementById("phoneError");

        const eventError =
            document.getElementById("eventError");

        const ticketError =
            document.getElementById("ticketError");

        const paymentError =
            document.getElementById("paymentError");

        const message =
            document.getElementById(
                "bookingMessage"
            );


        /* CLEAR */

        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        eventError.textContent = "";
        ticketError.textContent = "";
        paymentError.textContent = "";

        message.textContent = "";

        let valid = true;


        /* NAME */

        if (name.length < 3) {

            nameError.textContent =
                "Please enter your full name.";

            valid = false;

        }


        /* EMAIL */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Enter a valid email address.";

            valid = false;

        }


        /* PHONE */

        if (!/^[0-9]{10}$/.test(phone)) {

            phoneError.textContent =
                "Enter a valid 10-digit number.";

            valid = false;

        }


        /* EVENT */

        if (eventValue === "") {

            eventError.textContent =
                "Please select an event.";

            valid = false;

        }


        /* TICKETS */

        if (tickets === "") {

            ticketError.textContent =
                "Please select ticket quantity.";

            valid = false;

        }


        /* PAYMENT */

        if (payment === "") {

            paymentError.textContent =
                "Please select payment method.";

            valid = false;

        }


        /* SUCCESS */

        if (valid) {

            const selected =
                events[eventValue];

            const ticketNumber =
                Number(tickets);

            const total =
                selected.price *
                ticketNumber;


            message.className =
                "success-message";

            message.innerHTML =
                `🎉 Booking confirmed!<br>
                ${selected.name} ${selected.subtitle}
                • ${ticketNumber} ticket(s)
                • ₹${total}`;


            bookingForm.reset();

            totalPrice.textContent =
                "₹0";

            selectedEvent.value =
                currentIndex;

        }

    }
);


/* =========================
   INITIAL LOAD
========================= */

loadEventOptions();

createIndicators();

updateEvent();
