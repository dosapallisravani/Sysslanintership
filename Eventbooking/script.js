/* =========================================
   EVENTORA EVENTS
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
   VARIABLES
========================================= */

let currentIndex = 0;
let changing = false;

let startX = 0;
let endX = 0;


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

const dots =
    document.getElementById("dots");

const centerStage =
    document.querySelector(".center-stage");



/* =========================================
   BACKGROUND
========================================= */

function updateBackground(image) {

    hero.style.setProperty(
        "--bg",
        `url("${image}")`
    );

}



/* =========================================
   UPDATE EVENT
========================================= */

function updateEvent() {

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


    /* Background */

    updateBackground(
        current.bg
    );


    /* Center performer */

    centerImage.src =
        current.person;


    /* Left performer */

    leftImage.src =
        previous.person;


    /* Right performer */

    rightImage.src =
        next.person;


    /* Event information */

    eventName.innerHTML =
        `${current.name}<br><span>${current.sub}</span>`;

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


    /* Dots */

    document
        .querySelectorAll(".dots button")
        .forEach((button, index) => {

            button.classList.toggle(
                "active",
                index === currentIndex
            );

        });

}



/* =========================================
   3D SLIDE ANIMATION
========================================= */

function animateSlide(direction) {

    if (!centerStage) return;


    centerStage.classList.remove(
        "slide-next",
        "slide-prev"
    );


    /* Restart animation */

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
   CHANGE EVENT
========================================= */

function changeEvent(direction) {

    if (changing) return;


    changing = true;


    currentIndex =
        (
            currentIndex +
            direction +
            events.length
        ) % events.length;


    updateEvent();

    animateSlide(direction);


    setTimeout(() => {

        changing = false;

    }, 700);

}



/* =========================================
   NEXT BUTTON
========================================= */

const nextBtn =
    document.getElementById("nextBtn");


if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            changeEvent(1);

        }
    );

}



/* =========================================
   PREVIOUS BUTTON
========================================= */

const prevBtn =
    document.getElementById("prevBtn");


if (prevBtn) {

    prevBtn.addEventListener(
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

    if (!dots) return;


    dots.innerHTML = "";


    events.forEach(
        (event, index) => {

            const button =
                document.createElement("button");


            button.setAttribute(
                "aria-label",
                `Open ${event.name} ${event.sub}`
            );


            button.addEventListener(
                "click",
                () => {

                    if (changing) return;

                    if (index === currentIndex)
                        return;


                    const oldIndex =
                        currentIndex;


                    const direction =
                        index > oldIndex
                        ? 1
                        : -1;


                    currentIndex =
                        index;


                    updateEvent();

                    animateSlide(
                        direction
                    );


                    changing = true;


                    setTimeout(() => {

                        changing = false;

                    }, 700);

                }
            );


            dots.appendChild(
                button
            );

        }
    );

}



/* =========================================
   KEYBOARD
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


        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);



/* =========================================
   SWIPE
========================================= */

if (hero) {

    hero.addEventListener(
        "touchstart",
        (event) => {

            startX =
                event.touches[0].clientX;

        },
        {
            passive:true
        }
    );


    hero.addEventListener(
        "touchend",
        (event) => {

            endX =
                event.changedTouches[0].clientX;


            const distance =
                endX - startX;


            if (distance < -50) {

                changeEvent(1);

            }

            else if (distance > 50) {

                changeEvent(-1);

            }

        },
        {
            passive:true
        }
    );

}



/* =========================================
   MODAL
========================================= */

function createModal() {

    if (
        document.getElementById(
            "eventoraModal"
        )
    ) return;


    const modal =
        document.createElement("div");


    modal.id =
        "eventoraModal";


    modal.className =
        "modal";


    modal.innerHTML = `

        <div class="modal-box">

            <button
                class="close-modal"
                onclick="closeModal()"
            >
                ×
            </button>

            <h2 id="modalTitle">
                BOOK <span>TICKETS</span>
            </h2>

            <form id="eventForm">

                <label>
                    FULL NAME

                    <input
                        type="text"
                        id="userName"
                        placeholder="Enter your name"
                        required
                    >
                </label>


                <label>
                    EMAIL

                    <input
                        type="email"
                        id="userEmail"
                        placeholder="Enter your email"
                        required
                    >
                </label>


                <label>
                    EVENT

                    <select
                        id="selectedEvent"
                    >
                    </select>
                </label>


                <label>
                    TICKETS

                    <input
                        type="number"
                        id="ticketCount"
                        min="1"
                        max="10"
                        value="1"
                        required
                    >
                </label>


                <button
                    type="submit"
                    class="primary-btn"
                >
                    CONFIRM BOOKING
                    <span>→</span>
                </button>

            </form>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    /* Fill events */

    const select =
        document.getElementById(
            "selectedEvent"
        );


    events.forEach(
        (event, index) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                index;


            option.textContent =
                `${event.name} ${event.sub} — ₹${event.price}`;


            select.appendChild(
                option
            );

        }
    );


    select.value =
        currentIndex;


    /* Booking submit */

    document
        .getElementById("eventForm")
        .addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "userName"
                    ).value;


                const selected =
                    events[
                        Number(
                            document.getElementById(
                                "selectedEvent"
                            ).value
                        )
                    ];


                const count =
                    Number(
                        document.getElementById(
                            "ticketCount"
                        ).value
                    );


                const total =
                    selected.price * count;


                alert(
                    `Booking successful! 🎉\n\n` +
                    `Name: ${name}\n` +
                    `Event: ${selected.name} ${selected.sub}\n` +
                    `Tickets: ${count}\n` +
                    `Total: ₹${total}`
                );


                closeModal();

            }
        );


    /* Close by outside click */

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}



/* =========================================
   OPEN BOOKING
========================================= */

function openBooking() {

    createModal();


    const modal =
        document.getElementById(
            "eventoraModal"
        );


    const title =
        document.getElementById(
            "modalTitle"
        );


    title.innerHTML =
        `BOOK <span>TICKETS</span>`;


    document.getElementById(
        "selectedEvent"
    ).value =
        currentIndex;


    modal.classList.add(
        "show"
    );

}



/* =========================================
   OPEN SIGN IN
========================================= */

function openSignIn() {

    createModal();


    const modal =
        document.getElementById(
            "eventoraModal"
        );


    const box =
        modal.querySelector(
            ".modal-box"
        );


    box.innerHTML = `

        <button
            class="close-modal"
            onclick="closeModal()"
        >
            ×
        </button>


        <h2>
            SIGN <span>IN</span>
        </h2>


        <form id="loginForm">

            <label>
                EMAIL

                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                >
            </label>


            <label>
                PASSWORD

                <input
                    type="password"
                    placeholder="Enter your password"
                    required
                >
            </label>


            <button
                type="submit"
                class="primary-btn"
            >
                SIGN IN
                <span>→</span>
            </button>

        </form>

    `;


    modal.classList.add(
        "show"
    );


    document
        .getElementById("loginForm")
        .addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                alert(
                    "Sign in demo successful! 🎉"
                );


                closeModal();

            }
        );

}



/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    const modal =
        document.getElementById(
            "eventoraModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}



/* =========================================
   FIX SIGN IN 404
========================================= */

const signInButton =
    document.querySelector(
        ".signin-btn"
    );


if (signInButton) {

    signInButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            openSignIn();

        }
    );

}



/* =========================================
   FIX BOOK TICKETS 404
========================================= */

const bookButton =
    document.querySelector(
        ".primary-btn"
    );


if (bookButton) {

    bookButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            openBooking();

        }
    );

}



/* =========================================
   INITIAL LOAD
========================================= */

createDots();

updateEvent();
