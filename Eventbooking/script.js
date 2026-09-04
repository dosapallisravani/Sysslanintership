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
        bg: "images/neon-bg.jpg"
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
        bg: "images/moon-bg.jpg"
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
        bg: "images/happy-bg.jpg"
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
        bg: "images/beat-bg.jpg"
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
        bg: "images/city-bg.jpg"
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
        bg: "images/sound-bg.jpg"
    }

];



/* =========================================
   VARIABLES
========================================= */

let currentIndex = 0;

let isChanging = false;

let touchStartX = 0;

let touchEndX = 0;



/* =========================================
   ELEMENTS
========================================= */

const hero = document.getElementById("hero");

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

const dotsContainer =
    document.getElementById("dots");

const centerStage =
    document.querySelector(".center-stage");



/* =========================================
   BACKGROUND
========================================= */

function changeBackground(image) {

    hero.style.setProperty(
        "--bg",
        `url("${image}")`
    );

}



/* =========================================
   UPDATE EVENT INFORMATION
========================================= */

function updateEventInfo(event) {

    eventName.innerHTML =
        `${event.name}<br><span>${event.sub}</span>`;

    eventType.textContent =
        event.type;

    eventDate.textContent =
        event.date;

    eventTime.textContent =
        event.time;

    eventVenue.textContent =
        event.venue;

    eventPrice.textContent =
        `₹${event.price}`;

}



/* =========================================
   UPDATE PERFORMERS
========================================= */

function updatePerformers() {

    const current =
        events[currentIndex];

    const previous =
        events[
            (currentIndex - 1 + events.length)
            % events.length
        ];

    const next =
        events[
            (currentIndex + 1)
            % events.length
        ];


    centerImage.src =
        current.person;

    leftImage.src =
        previous.person;

    rightImage.src =
        next.person;


    centerImage.alt =
        `${current.name} performer`;

    leftImage.alt =
        `${previous.name} performer`;

    rightImage.alt =
        `${next.name} performer`;

}



/* =========================================
   UPDATE DOTS
========================================= */

function updateDots() {

    const dots =
        document.querySelectorAll(
            ".dots button"
        );

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}



/* =========================================
   ANIMATION
========================================= */

function playSlideAnimation(direction) {

    if (!centerStage) return;


    centerStage.classList.remove(
        "slide-next",
        "slide-prev"
    );


    /* Restart CSS animation */

    void centerStage.offsetWidth;


    if (direction > 0) {

        centerStage.classList.add(
            "slide-next"
        );

    } else {

        centerStage.classList.add(
            "slide-prev"
        );

    }

}



/* =========================================
   RENDER EVENT
========================================= */

function renderEvent(direction = 1) {

    const event =
        events[currentIndex];


    /* Background */

    changeBackground(
        event.bg
    );


    /* Performer */

    updatePerformers();


    /* Text */

    updateEventInfo(
        event
    );


    /* Dots */

    updateDots();


    /* 3D animation */

    playSlideAnimation(
        direction
    );

}



/* =========================================
   CHANGE EVENT
========================================= */

function changeEvent(direction) {

    if (isChanging) return;


    isChanging = true;


    /* Change index */

    currentIndex =
        (
            currentIndex +
            direction +
            events.length
        )
        %
        events.length;


    /* Render */

    renderEvent(
        direction
    );


    /* Unlock */

    setTimeout(() => {

        isChanging = false;

    }, 700);

}



/* =========================================
   NEXT / PREVIOUS BUTTONS
========================================= */

const nextButton =
    document.getElementById(
        "nextBtn"
    );

const previousButton =
    document.getElementById(
        "prevBtn"
    );


if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            changeEvent(1);

        }
    );

}


if (previousButton) {

    previousButton.addEventListener(
        "click",
        () => {

            changeEvent(-1);

        }
    );

}



/* =========================================
   CREATE DOTS
========================================= */

function createDots() {

    if (!dotsContainer) return;


    dotsContainer.innerHTML = "";


    events.forEach(
        (event, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.setAttribute(
                "aria-label",
                `Show ${event.name} ${event.sub}`
            );


            button.addEventListener(
                "click",
                () => {

                    if (isChanging) return;


                    const oldIndex =
                        currentIndex;


                    if (index === oldIndex)
                        return;


                    currentIndex =
                        index;


                    const direction =
                        index > oldIndex
                        ? 1
                        : -1;


                    renderEvent(
                        direction
                    );


                    isChanging = true;


                    setTimeout(() => {

                        isChanging = false;

                    }, 700);

                }
            );


            dotsContainer.appendChild(
                button
            );

        }
    );

}



/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowRight"
        ) {

            changeEvent(1);

        }


        if (
            event.key === "ArrowLeft"
        ) {

            changeEvent(-1);

        }

    }
);



/* =========================================
   TOUCH / SWIPE
========================================= */

if (hero) {

    hero.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    hero.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].clientX;


            const distance =
                touchEndX -
                touchStartX;


            /* Swipe left */

            if (distance < -50) {

                changeEvent(1);

            }


            /* Swipe right */

            else if (distance > 50) {

                changeEvent(-1);

            }

        },
        {
            passive: true
        }
    );

}



/* =========================================
   MOUSE WHEEL
========================================= */

let wheelLocked = false;


if (hero) {

    hero.addEventListener(
        "wheel",
        (event) => {

            if (wheelLocked) return;


            if (
                Math.abs(event.deltaY) < 20
            ) return;


            wheelLocked = true;


            if (event.deltaY > 0) {

                changeEvent(1);

            } else {

                changeEvent(-1);

            }


            setTimeout(() => {

                wheelLocked = false;

            }, 800);

        },
        {
            passive: true
        }
    );

}



/* =========================================
   IMAGE ERROR CHECK
========================================= */

function checkImage(imageElement) {

    imageElement.addEventListener(
        "error",
        () => {

            console.warn(
                "Image not found:",
                imageElement.src
            );

        }
    );

}


checkImage(centerImage);

checkImage(leftImage);

checkImage(rightImage);



/* =========================================
   INITIALIZE
========================================= */

createDots();

renderEvent(1);
