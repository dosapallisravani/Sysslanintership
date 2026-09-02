const events = [
    {
        name: "NEON NIGHTS",
        type: "EDM LIVE EXPERIENCE",
        date: "18 SEP 2026",
        time: "7:00 PM",
        venue: "HYDERABAD",
        performer: "🎧"
    },

    {
        name: "MOON TUNES",
        type: "ACOUSTIC NIGHT",
        date: "25 SEP 2026",
        time: "6:30 PM",
        venue: "VIZAG",
        performer: "🎸"
    },

    {
        name: "HAPPY BEATS",
        type: "POP LIVE CONCERT",
        date: "02 OCT 2026",
        time: "7:30 PM",
        venue: "HYDERABAD",
        performer: "🎤"
    },

    {
        name: "BEAT WORLD",
        type: "HIP-HOP FESTIVAL",
        date: "10 OCT 2026",
        time: "8:00 PM",
        venue: "BENGALURU",
        performer: "🧑‍🎤"
    },

    {
        name: "CITY BEATS",
        type: "URBAN MUSIC NIGHT",
        date: "18 OCT 2026",
        time: "7:00 PM",
        venue: "CHENNAI",
        performer: "🎶"
    },

    {
        name: "SOUND FEST",
        type: "MEGA MUSIC FESTIVAL",
        date: "25 OCT 2026",
        time: "6:00 PM",
        venue: "MUMBAI",
        performer: "🎼"
    }
];

let currentIndex = 0;


function nextEvent() {

    currentIndex++;

    if (currentIndex >= events.length) {
        currentIndex = 0;
    }

    updateEvent();
}


function previousEvent() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = events.length - 1;
    }

    updateEvent();
}


function updateEvent() {

    const event = events[currentIndex];

    document.querySelector(".event-info h1").innerHTML =
        event.name.replace(" ", "<br><span>") + "</span>";

    document.querySelector(".event-type").textContent =
        event.type;

    document.querySelector(".performer").textContent =
        event.performer;

    const details =
        document.querySelectorAll(".event-details strong");

    details[0].textContent = event.date;
    details[1].textContent = event.time;
    details[2].textContent = event.venue;


    /* Update indicators */

    const indicators =
        document.querySelectorAll(".slide-indicator span");

    indicators.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });
}
