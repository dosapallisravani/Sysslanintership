/* =================================
   EVENTORA — EVENT DATA
   ================================= */

const events = [
    {
        name: "NEON",
        subtitle: "NIGHTS",
        type: "EDM LIVE EXPERIENCE",
        date: "18 SEP 2026",
        time: "7:00 PM",
        venue: "HYDERABAD",
        price: "₹799",
        image: "images/neon-dj.png"
    },

    {
        name: "MOON",
        subtitle: "TUNES",
        type: "ACOUSTIC MUSIC NIGHT",
        date: "25 SEP 2026",
        time: "6:30 PM",
        venue: "VISAKHAPATNAM",
        price: "₹599",
        image: "images/moon-guitarist.png"
    },

    {
        name: "HAPPY",
        subtitle: "BEATS",
        type: "LIVE POP CONCERT",
        date: "02 OCT 2026",
        time: "7:30 PM",
        venue: "VIJAYAWADA",
        price: "₹699",
        image: "images/happy-singer.png"
    },

    {
        name: "BEAT",
        subtitle: "WORLD",
        type: "HIP-HOP LIVE SHOW",
        date: "10 OCT 2026",
        time: "8:00 PM",
        venue: "HYDERABAD",
        price: "₹899",
        image: "images/beat-rapper.png"
    },

    {
        name: "CITY",
        subtitle: "BEATS",
        type: "URBAN MUSIC FEST",
        date: "18 OCT 2026",
        time: "7:00 PM",
        venue: "BENGALURU",
        price: "₹749",
        image: "images/city-dj.png"
    },

    {
        name: "SOUND",
        subtitle: "FEST",
        type: "ULTIMATE MUSIC FESTIVAL",
        date: "31 OCT 2026",
        time: "6:00 PM",
        venue: "HYDERABAD",
        price: "₹999",
        image: "images/sound-fest.png"
    }
];


/* =================================
   CURRENT SLIDE
   ================================= */

let currentIndex = 0;
let isAnimating = false;


/* =================================
   ELEMENTS
   ================================= */

const hero = document.getElementById("hero");

const centerImage = document.getElementById("centerImage");
const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");

const eventName = document.getElementById("eventName");
const eventType = document.getElementById("eventType");
const eventDate = document.getElementById("eventDate");
const eventTime = document.getElementById("eventTime");
const eventVenue = document.getElementById("eventVenue");
const eventPrice = document.getElementById("eventPrice");

const indicators = document.querySelectorAll(
    ".slide-indicator span"
);


/* =================================
   UPDATE EVENT
   ================================= */

function updateEvent() {

    const current = events[currentIndex];

    const previousIndex =
        (currentIndex - 1 + events.length) % events.length;

    const nextIndex =
        (currentIndex + 1) % events.length;


    /* Center performer */

    centerImage.src = current.image;


    /* Side performers */

    leftImage.src = events[previousIndex].image;
    rightImage.src = events[nextIndex].image;


    /* Event information */

    eventName.innerHTML =
        `${current.name}<br><span>${current.subtitle}</span>`;

    eventType.textContent = current.type;
    eventDate.textContent = current.date;
    eventTime.textContent = current.time;
    eventVenue.textContent = current.venue;
    eventPrice.textContent = current.price;


    /* Indicator */

    indicators.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });
}


/* =================================
   NEXT EVENT
   ================================= */

function nextEvent() {

    if (isAnimating) return;

    isAnimating = true;

    currentIndex =
        (currentIndex + 1) % events.length;

    updateEvent();


    setTimeout(() => {
        isAnimating = false;
    }, 700);
}


/* =================================
   PREVIOUS EVENT
   ================================= */

function previousEvent() {

    if (isAnimating) return;

    isAnimating = true;

    currentIndex =
        (currentIndex - 1 + events.length) %
        events.length;

    updateEvent();


    setTimeout(() => {
        isAnimating = false;
    }, 700);
}


/* =================================
   EXPLORE EVENT
   ================================= */

function exploreEvent() {

    const current = events[currentIndex];

    alert(
        `Welcome to ${current.name} ${current.subtitle}!\n\n` +
        `Date: ${current.date}\n` +
        `Time: ${current.time}\n` +
        `Venue: ${current.venue}\n` +
        `Ticket: ${current.price}`
    );
}


/* =================================
   KEYBOARD CONTROLS
   ================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        nextEvent();
    }

    if (event.key === "ArrowLeft") {
        previousEvent();
    }

});


/* =================================
   TOUCH / SWIPE
   ================================= */

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});


document.addEventListener("touchend", (event) => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    if (swipeDistance < 0) {
        nextEvent();
    } else {
        previousEvent();
    }

}


/* =================================
   INITIAL LOAD
   ================================= */

updateEvent();
