/* =========================================
   EVENTORA - EVENT DATA
========================================= */

const events = [
    {
        name: "NEON",
        sub: "NIGHTS",
        type: "EDM LIVE EXPERIENCE",
        date: "18 SEP 2026",
        time: "7:00 PM",
        venue: "HYDERABAD",
        price: 799,
        person: "images/neon-dj.png",
        bg: "images/backgrounds/neon-nights.jpg"
    },

    {
        name: "MOON",
        sub: "TUNES",
        type: "ACOUSTIC MUSIC NIGHT",
        date: "25 SEP 2026",
        time: "6:30 PM",
        venue: "VISAKHAPATNAM",
        price: 599,
        person: "images/moon-guitarist.png",
        bg: "images/backgrounds/moon-tunes.jpg"
    },

    {
        name: "HAPPY",
        sub: "BEATS",
        type: "LIVE POP CONCERT",
        date: "02 OCT 2026",
        time: "7:30 PM",
        venue: "VIJAYAWADA",
        price: 699,
        person: "images/happy-singer.png",
        bg: "images/backgrounds/happy-beats.jpg"
    },

    {
        name: "BEAT",
        sub: "WORLD",
        type: "HIP-HOP LIVE SHOW",
        date: "10 OCT 2026",
        time: "8:00 PM",
        venue: "HYDERABAD",
        price: 899,
        person: "images/beat-rapper.png",
        bg: "images/backgrounds/beat-world.jpg"
    },

    {
        name: "CITY",
        sub: "BEATS",
        type: "URBAN MUSIC FEST",
        date: "18 OCT 2026",
        time: "7:00 PM",
        venue: "BENGALURU",
        price: 749,
        person: "images/city-dj.png",
        bg: "images/backgrounds/city-beats.jpg"
    },

    {
        name: "SOUND",
        sub: "FEST",
        type: "ULTIMATE MUSIC FESTIVAL",
        date: "31 OCT 2026",
        time: "6:00 PM",
        venue: "GOA",
        price: 999,
        person: "images/sound-fest.png",
        bg: "images/backgrounds/sound-fest.jpg"
    }
];


/* =========================================
   CAROUSEL ELEMENTS
========================================= */

const hero = document.querySelector(".hero");
const centerImage = document.querySelector(".performer-3d img");

const sideLeftImage = document.querySelector(".side-left img");
const sideRightImage = document.querySelector(".side-right img");

const eventName = document.querySelector(".event-content h1");
const eventType = document.querySelector(".event-type");

const detailItems = document.querySelectorAll(".details strong");

const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

const dotsContainer = document.querySelector(".dots");


/* =========================================
   CURRENT SLIDE
========================================= */

let currentIndex = 0;
let isMoving = false;


/* =========================================
   CREATE DOTS
========================================= */

if (dotsContainer) {

    events.forEach((event, index) => {

        const dot = document.createElement("button");

        dot.type = "button";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            if (isMoving || index === currentIndex) return;

            const oldIndex = currentIndex;

            currentIndex = index;

            updateCarousel(
                currentIndex > oldIndex ? "next" : "prev"
            );
        });

        dotsContainer.appendChild(dot);
    });
}


/* =========================================
   UPDATE CAROUSEL
========================================= */

function updateCarousel(direction = "next") {

    if (!events[currentIndex]) return;

    const event = events[currentIndex];

    isMoving = true;


    /* CENTER PERFORMER */

    if (centerImage) {

        centerImage.style.opacity = "0";

        setTimeout(() => {

            centerImage.src = event.person;

            centerImage.style.opacity = "1";

        }, 180);
    }


    /* LEFT PERFORMER */

    const leftIndex =
        (currentIndex - 1 + events.length) % events.length;

    if (sideLeftImage) {
        sideLeftImage.src = events[leftIndex].person;
    }


    /* RIGHT PERFORMER */

    const rightIndex =
        (currentIndex + 1) % events.length;

    if (sideRightImage) {
        sideRightImage.src = events[rightIndex].person;
    }


    /* EVENT TITLE */

    if (eventName) {

        eventName.style.opacity = "0";

        eventName.style.transform = "translateY(15px)";

        setTimeout(() => {

            eventName.innerHTML =
                `${event.name}<span>${event.sub}</span>`;

            eventName.style.opacity = "1";

            eventName.style.transform =
                "translateY(0)";

        }, 200);
    }


    /* EVENT TYPE */

    if (eventType) {

        eventType.style.opacity = "0";

        setTimeout(() => {

            eventType.textContent = event.type;

            eventType.style.opacity = "1";

        }, 220);
    }


    /* EVENT DETAILS */

    if (detailItems.length >= 4) {

        detailItems[0].textContent = event.date;
        detailItems[1].textContent = event.time;
        detailItems[2].textContent = event.venue;
        detailItems[3].textContent = `₹${event.price}`;
    }


    /* BACKGROUND */

    changeBackground(event.bg);


    /* DOTS */

    const dots =
        dotsContainer?.querySelectorAll("button");

    if (dots) {

        dots.forEach(dot =>
            dot.classList.remove("active")
        );

        if (dots[currentIndex]) {
            dots[currentIndex].classList.add("active");
        }
    }


    /* 3D SLIDE ANIMATION */

    const stage =
        document.querySelector(".center-stage");

    if (stage) {

        stage.classList.remove(
            "slide-next",
            "slide-prev"
        );

        void stage.offsetWidth;

        stage.classList.add(
            direction === "next"
                ? "slide-next"
                : "slide-prev"
        );
    }


    setTimeout(() => {

        isMoving = false;

    }, 700);
}


/* =========================================
   BACKGROUND CHANGE
========================================= */

function changeBackground(url) {

    if (!hero) return;

    hero.style.setProperty(
        "--bg",
        `url("${url}")`
    );

    const background =
        document.querySelector(".hero-bg");

    if (background) {

        background.style.opacity = "0.35";

        background.style.transform =
            "scale(1.1)";

        setTimeout(() => {

            background.style.opacity = "1";

            background.style.transform =
                "scale(1.06)";

        }, 150);
    }
}


/* =========================================
   NEXT EVENT
========================================= */

function nextEvent() {

    if (isMoving) return;

    currentIndex =
        (currentIndex + 1) % events.length;

    updateCarousel("next");
}


/* =========================================
   PREVIOUS EVENT
========================================= */

function previousEvent() {

    if (isMoving) return;

    currentIndex =
        (currentIndex - 1 + events.length)
        % events.length;

    updateCarousel("prev");
}


/* =========================================
   ARROW EVENTS
========================================= */

if (rightArrow) {
    rightArrow.addEventListener(
        "click",
        nextEvent
    );
}

if (leftArrow) {
    leftArrow.addEventListener(
        "click",
        previousEvent
    );
}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    (e) => {

        if (e.key === "ArrowRight") {
            nextEvent();
        }

        if (e.key === "ArrowLeft") {
            previousEvent();
        }
    }
);


/* =========================================
   MOBILE SWIPE
========================================= */

let touchStartX = 0;
let touchEndX = 0;

if (hero) {

    hero.addEventListener(
        "touchstart",
        (e) => {

            touchStartX =
                e.changedTouches[0].screenX;
        },
        { passive: true }
    );


    hero.addEventListener(
        "touchend",
        (e) => {

            touchEndX =
                e.changedTouches[0].screenX;

            handleSwipe();
        },
        { passive: true }
    );
}


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {
        return;
    }


    if (difference > 0) {
        nextEvent();
    } else {
        previousEvent();
    }
}

/* =========================================
   LEVEL 2 - REAL TICKET BOOKING
========================================= */

const bookingForm = document.getElementById("bookingForm");
const bookingEvent = document.getElementById("bookingEvent");
const bookingTickets = document.getElementById("bookingTickets");

const totalAmount = document.getElementById("totalAmount");
const previewEvent = document.getElementById("previewEvent");
const previewPrice = document.getElementById("previewPrice");
const previewMessage = document.getElementById("previewMessage");


/* =========================================
   CALCULATE TOTAL
========================================= */

function updateBookingTotal() {

    if (!bookingEvent || !bookingTickets) return;

    const selectedOption =
        bookingEvent.options[bookingEvent.selectedIndex];

    const price =
        Number(selectedOption.dataset.price) || 0;

    let tickets =
        Number(bookingTickets.value) || 1;

    if (tickets < 1) {
        tickets = 1;
        bookingTickets.value = 1;
    }

    if (tickets > 10) {
        tickets = 10;
        bookingTickets.value = 10;
    }

    const total = price * tickets;


    /* TOTAL */

    if (totalAmount) {
        totalAmount.textContent =
            `₹${total.toLocaleString("en-IN")}`;
    }


    /* PREVIEW */

    if (bookingEvent.value) {

        if (previewEvent) {
            previewEvent.textContent =
                bookingEvent.value.toUpperCase();
        }

        if (previewPrice) {
            previewPrice.textContent =
                `₹${price.toLocaleString("en-IN")}`;
        }

        if (previewMessage) {
            previewMessage.textContent =
                `${tickets} ticket${tickets > 1 ? "s" : ""} selected • Total ₹${total.toLocaleString("en-IN")}`;
        }

    } else {

        if (previewEvent) {
            previewEvent.textContent =
                "SELECT AN EVENT";
        }

        if (previewPrice) {
            previewPrice.textContent = "₹0";
        }

        if (previewMessage) {
            previewMessage.textContent =
                "Your selected event details will appear here.";
        }
    }
}


/* =========================================
   EVENT CHANGE
========================================= */

if (bookingEvent) {

    bookingEvent.addEventListener(
        "change",
        updateBookingTotal
    );
}


/* =========================================
   TICKET COUNT CHANGE
========================================= */

if (bookingTickets) {

    bookingTickets.addEventListener(
        "input",
        updateBookingTotal
    );
}


/* =========================================
   BOOKING SUBMIT
========================================= */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const name =
                document
                    .getElementById("bookingName")
                    ?.value.trim();

            const email =
                document
                    .getElementById("bookingEmail")
                    ?.value.trim();

            const event =
                bookingEvent?.value;

            const tickets =
                Number(bookingTickets?.value);


            /* VALIDATION */

            if (!name || !email || !event || !tickets) {

                alert(
                    "Please fill all booking details."
                );

                return;
            }


            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            /* PRICE */

            const selectedOption =
                bookingEvent.options[
                    bookingEvent.selectedIndex
                ];

            const price =
                Number(selectedOption.dataset.price);

            const total =
                price * tickets;


            /* SUCCESS */

            alert(
                "🎉 Booking Confirmed!\n\n" +
                `Name: ${name}\n` +
                `Event: ${event}\n` +
                `Tickets: ${tickets}\n` +
                `Total Amount: ₹${total.toLocaleString("en-IN")}\n\n` +
                "Thank you for booking with EVENTORA!"
            );


            /* RESET */

            bookingForm.reset();

            updateBookingTotal();
        }
    );
}


/* =========================================
   INITIAL BOOKING STATE
========================================= */

updateBookingTotal();


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            alert(
                "Thank you for contacting EVENTORA! ✨\n" +
                "We will get back to you soon."
            );

            contactForm.reset();
        }
    );
}


/* =========================================
   SIGN IN FORM
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const email =
                document.getElementById("loginEmail")?.value.trim();

            const password =
                document.getElementById("loginPassword")?.value;


            if (!email || !password) {

                alert(
                    "Please enter email and password."
                );

                return;
            }


            alert(
                "Sign in successful! 🎉"
            );


            loginForm.reset();
        }
    );
}

/* =========================================
   EVENTS - SHOW ONLY WHEN CLICKED
========================================= */

const eventsNav =
    document.querySelector('.nav-links a[href="#events"]');

const eventsSection =
    document.getElementById("events");

if (eventsNav && eventsSection) {

    eventsNav.addEventListener("click", function(e) {

        e.preventDefault();

        // Show Events section
        eventsSection.classList.add("show-events");

        // Scroll to Events
        setTimeout(() => {

            eventsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 50);
    });
}


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {
                currentSection =
                    section.getAttribute("id");
            }
        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    }
);


/* =========================================
   INITIAL LOAD
========================================= */

updateCarousel("next");
