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
        bg: "#12002b",
        glow: "#8a2be2"
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
        bg: "#06152e",
        glow: "#287cff"
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
        bg: "#350b25",
        glow: "#ff3f9f"
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
        bg: "#210606",
        glow: "#ff3030"
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
        bg: "#261305",
        glow: "#ff8a2b"
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
        bg: "#032126",
        glow: "#00d9ff"
    }
];

let currentIndex = 0;
let isAnimating = false;

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

const indicators = document.getElementById("indicators");
const glow = document.querySelector(".background-glow");


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


function updateBackground(event) {

    hero.style.background = `
        radial-gradient(
            circle at 50% 45%,
            ${event.bg} 0%,
            #050505 72%
        )
    `;

    glow.style.background = event.glow;

    glow.style.transform =
        "translate(-50%, -50%) scale(1.15)";
}


function updateEvent() {

    const current = events[currentIndex];

    const previousIndex =
        (currentIndex - 1 + events.length) % events.length;

    const nextIndex =
        (currentIndex + 1) % events.length;


    /* IMAGES */

    centerImage.src = current.image;
    leftImage.src = events[previousIndex].image;
    rightImage.src = events[nextIndex].image;


    /* EVENT DETAILS */

    eventName.innerHTML =
        `${current.name}<br><span>${current.subtitle}</span>`;

    eventType.textContent = current.type;
    eventDate.textContent = current.date;
    eventTime.textContent = current.time;
    eventVenue.textContent = current.venue;
    eventPrice.textContent = `₹${current.price}`;


    /* BACKGROUND */

    updateBackground(current);


    /* INDICATORS */

    const dots = indicators.querySelectorAll("span");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });
}


function nextEvent() {

    if (isAnimating) return;

    isAnimating = true;

    const performer = document.querySelector(".performer");

    performer.style.transform =
        "translate(-50%, -50%) translateZ(450px) rotateY(-20deg) scale(1.15)";

    performer.style.opacity = "0";

    setTimeout(() => {

        currentIndex =
            (currentIndex + 1) % events.length;

        updateEvent();

        performer.style.transform =
            "translate(-50%, -50%) translateZ(-200px) rotateY(35deg) scale(.5)";

        setTimeout(() => {

            performer.style.transform =
                "translate(-50%, -50%) translateZ(180px) rotateY(0deg) scale(1)";

            performer.style.opacity = "1";

            isAnimating = false;

        }, 80);

    }, 400);
}


function previousEvent() {

    if (isAnimating) return;

    isAnimating = true;

    const performer = document.querySelector(".performer");

    performer.style.transform =
        "translate(-50%, -50%) translateZ(450px) rotateY(20deg) scale(1.15)";

    performer.style.opacity = "0";

    setTimeout(() => {

        currentIndex =
            (currentIndex - 1 + events.length) % events.length;

        updateEvent();

        performer.style.transform =
            "translate(-50%, -50%) translateZ(-200px) rotateY(-35deg) scale(.5)";

        setTimeout(() => {

            performer.style.transform =
                "translate(-50%, -50%) translateZ(180px) rotateY(0deg) scale(1)";

            performer.style.opacity = "1";

            isAnimating = false;

        }, 80);

    }, 400);
}


/* ARROWS */

document
    .getElementById("nextBtn")
    ?.addEventListener("click", nextEvent);

document
    .getElementById("previousBtn")
    ?.addEventListener("click", previousEvent);


/* KEYBOARD */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        nextEvent();
    }

    if (event.key === "ArrowLeft") {
        previousEvent();
    }

});


/* SWIPE */

let touchStartX = 0;

document.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});

document.addEventListener("touchend", (event) => {

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

});


/* INITIAL */

createIndicators();
updateEvent();
