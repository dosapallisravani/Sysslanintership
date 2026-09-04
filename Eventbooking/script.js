/* =========================================
   EVENT DATA
========================================= */

const events = [

    {
        name: "NEON",
        subtitle: "NIGHTS",
        type: "EDM LIVE EXPERIENCE",
        date: "18 SEP 2026",
        time: "7:00 PM",
        venue: "HYDERABAD",
        price: 799,
        image: "images/neon-dj.png",
        bg1: "#21004d",
        bg2: "#05000d",
        glow: "#9b30ff"
    },

    {
        name: "MOON",
        subtitle: "TUNES",
        type: "ACOUSTIC MUSIC NIGHT",
        date: "25 SEP 2026",
        time: "6:30 PM",
        venue: "VISAKHAPATNAM",
        price: 599,
        image: "images/moon-guitarist.png",
        bg1: "#06264d",
        bg2: "#020711",
        glow: "#3188ff"
    },

    {
        name: "HAPPY",
        subtitle: "BEATS",
        type: "LIVE POP CONCERT",
        date: "02 OCT 2026",
        time: "7:30 PM",
        venue: "VIJAYAWADA",
        price: 699,
        image: "images/happy-singer.png",
        bg1: "#5a123f",
        bg2: "#12030c",
        glow: "#ff4fa3"
    },

    {
        name: "BEAT",
        subtitle: "WORLD",
        type: "HIP-HOP LIVE SHOW",
        date: "10 OCT 2026",
        time: "8:00 PM",
        venue: "HYDERABAD",
        price: 899,
        image: "images/beat-rapper.png",
        bg1: "#480909",
        bg2: "#090202",
        glow: "#ff3434"
    },

    {
        name: "CITY",
        subtitle: "BEATS",
        type: "URBAN MUSIC FEST",
        date: "18 OCT 2026",
        time: "7:00 PM",
        venue: "BENGALURU",
        price: 749,
        image: "images/city-dj.png",
        bg1: "#4b2105",
        bg2: "#0c0501",
        glow: "#ff8a32"
    },

    {
        name: "SOUND",
        subtitle: "FEST",
        type: "ULTIMATE MUSIC FESTIVAL",
        date: "31 OCT 2026",
        time: "6:00 PM",
        venue: "HYDERABAD",
        price: 999,
        image: "images/sound-fest.png",
        bg1: "#034a55",
        bg2: "#011316",
        glow: "#16d9ee"
    }

];


/* =========================================
   VARIABLES
========================================= */

let currentIndex = 0;

let isAnimating = false;

let touchStartX = 0;


/* =========================================
   ELEMENTS
========================================= */

const hero =
    document.getElementById("hero");

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

const glow =
    document.querySelector(".background-glow");


/* =========================================
   CREATE INDICATORS
========================================= */

function createIndicators() {

    if (!indicators) return;

    indicators.innerHTML = "";

    events.forEach((event, index) => {

        const dot =
            document.createElement("span");

        if (index === currentIndex) {

            dot.classList.add("active");

        }

        indicators.appendChild(dot);

    });
}


/* =========================================
   UPDATE BACKGROUND
========================================= */

function updateBackground(event) {

    hero.style.background = `
        radial-gradient(
            circle at 50% 42%,
            ${event.bg1} 0%,
            ${event.bg2} 55%,
            #020202 100%
        )
    `;

    if (glow) {

        glow.style.background =
            event.glow;

    }

}


/* =========================================
   UPDATE EVENT
========================================= */

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

    centerImage.src =
        current.image;


    /* LEFT */

    leftImage.src =
        events[previousIndex].image;


    /* RIGHT */

    rightImage.src =
        events[nextIndex].image;


    /* DETAILS */

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


    /* BACKGROUND */

    updateBackground(current);


    /* INDICATOR */

    if (indicators) {

        const dots =
            indicators.querySelectorAll("span");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }

}


/* =========================================
   3D NEXT ANIMATION
========================================= */

function nextEvent() {

    if (isAnimating) return;

    isAnimating = true;

    const performer =
        document.querySelector(".performer");

    const left =
        document.querySelector(".left-event");

    const right =
        document.querySelector(".right-event");


    /* CENTER MOVES OUT */

    performer.style.transform = `
        translate(-50%, -50%)
        translateZ(650px)
        rotateY(-35deg)
        scale(1.15)
    `;

    performer.style.opacity = "0";


    /* SIDE MOVEMENT */

    right.style.transform = `
        translate(60%, -50%)
        translateZ(150px)
        rotateY(0deg)
        scale(.9)
    `;

    right.style.opacity = "1";

    left.style.opacity = "0";


    setTimeout(() => {

        currentIndex =
            (currentIndex + 1)
            % events.length;

        updateEvent();


        /* RESET */

        performer.style.transition = "none";

        performer.style.transform = `
            translate(-50%, -50%)
            translateZ(-350px)
            rotateY(35deg)
            scale(.45)
        `;

        performer.style.opacity = "0";


        right.style.transition = "none";

        right.style.transform = `
            translate(135%, -50%)
            translateZ(-180px)
            rotateY(-48deg)
            scale(.62)
        `;


        /* FORCE REFLOW */

        void performer.offsetWidth;


        performer.style.transition =
            "transform .8s cubic-bezier(.22,.61,.36,1), opacity .45s ease";

        right.style.transition =
            "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";


        setTimeout(() => {

            performer.style.transform = `
                translate(-50%, -50%)
                translateZ(260px)
                rotateY(0deg)
                scale(1)
            `;

            performer.style.opacity = "1";

            left.style.opacity = ".55";

            isAnimating = false;

        }, 50);


    }, 420);

}


/* =========================================
   3D PREVIOUS ANIMATION
========================================= */

function previousEvent() {

    if (isAnimating) return;

    isAnimating = true;

    const performer =
        document.querySelector(".performer");

    const left =
        document.querySelector(".left-event");

    const right =
        document.querySelector(".right-event");


    /* CENTER MOVES OUT */

    performer.style.transform = `
        translate(-50%, -50%)
        translateZ(650px)
        rotateY(35deg)
        scale(1.15)
    `;

    performer.style.opacity = "0";


    /* LEFT MOVEMENT */

    left.style.transform = `
        translate(-60%, -50%)
        translateZ(150px)
        rotateY(0deg)
        scale(.9)
    `;

    left.style.opacity = "1";

    right.style.opacity = "0";


    setTimeout(() => {

        currentIndex =
            (currentIndex - 1 + events.length)
            % events.length;

        updateEvent();


        /* RESET */

        performer.style.transition = "none";

        performer.style.transform = `
            translate(-50%, -50%)
            translateZ(-350px)
            rotateY(-35deg)
            scale(.45)
        `;

        performer.style.opacity = "0";


        left.style.transition = "none";

        left.style.transform = `
            translate(-135%, -50%)
            translateZ(-180px)
            rotateY(48deg)
            scale(.62)
        `;


        void performer.offsetWidth;


        performer.style.transition =
            "transform .8s cubic-bezier(.22,.61,.36,1), opacity .45s ease";

        left.style.transition =
            "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s ease";


        setTimeout(() => {

            performer.style.transform = `
                translate(-50%, -50%)
                translateZ(260px)
                rotateY(0deg)
                scale(1)
            `;

            performer.style.opacity = "1";

            right.style.opacity = ".55";

            isAnimating = false;

        }, 50);


    }, 420);

}


/* =========================================
   ARROWS
========================================= */

const nextButton =
    document.getElementById("nextBtn");

const previousButton =
    document.getElementById("previousBtn");


if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextEvent
    );

}


if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousEvent
    );

}


/* =========================================
   KEYBOARD
========================================= */

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


/* =========================================
   SWIPE
========================================= */

document.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    function(event) {

        const touchEndX =
            event.changedTouches[0].screenX;

        const distance =
            touchEndX - touchStartX;

        if (Math.abs(distance) < 50) return;


        if (distance < 0) {

            nextEvent();

        } else {

            previousEvent();

        }

    },
    { passive: true }
);


/* =========================================
   BOOKING
========================================= */

const selectedEvent =
    document.getElementById("selectedEvent");

const ticketCount =
    document.getElementById("ticketCount");

const totalPrice =
    document.getElementById("totalPrice");

const bookingForm =
    document.getElementById("bookingForm");


/* EVENT OPTIONS */

function loadEventOptions() {

    if (!selectedEvent) return;

    selectedEvent.innerHTML =
        `<option value="">Choose an event</option>`;

    events.forEach((event, index) => {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            `${event.name} ${event.subtitle}`;

        selectedEvent.appendChild(option);

    });

}


/* TOTAL */

function calculateTotal() {

    if (!selectedEvent || !ticketCount) {
        return;
    }

    const eventIndex =
        selectedEvent.value;

    const count =
        Number(ticketCount.value);


    if (
        eventIndex === "" ||
        !count
    ) {

        if (totalPrice) {
            totalPrice.textContent = "₹0";
        }

        return;

    }


    const price =
        events[eventIndex].price;

    const total =
        price * count;


    if (totalPrice) {

        totalPrice.textContent =
            `₹${total}`;

    }

}


if (selectedEvent) {

    selectedEvent.addEventListener(
        "change",
        calculateTotal
    );

}


if (ticketCount) {

    ticketCount.addEventListener(
        "change",
        calculateTotal
    );

}


/* =========================================
   BOOKING FORM
========================================= */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                .getElementById("fullName")
                .value.trim();

            const email =
                document
                .getElementById("email")
                .value.trim();

            const phone =
                document
                .getElementById("phone")
                .value.trim();

            const eventValue =
                selectedEvent.value;

            const tickets =
                ticketCount.value;

            const payment =
                document
                .getElementById("payment")
                .value;


            let valid = true;


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
                document.getElementById("bookingMessage");


            nameError.textContent = "";
            emailError.textContent = "";
            phoneError.textContent = "";
            eventError.textContent = "";
            ticketError.textContent = "";
            paymentError.textContent = "";

            message.textContent = "";


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


                message.innerHTML = `
                    🎉 Booking confirmed!<br>
                    ${selected.name}
                    ${selected.subtitle}
                    • ${ticketNumber} ticket(s)
                    • ₹${total}
                `;


                bookingForm.reset();


                totalPrice.textContent =
                    "₹0";

            }

        }
    );

}


/* =========================================
   INITIAL LOAD
========================================= */

loadEventOptions();

createIndicators();

updateEvent();
