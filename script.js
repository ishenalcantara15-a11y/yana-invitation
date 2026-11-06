// ==========================================
// YANA PAULINE'S INVITATION WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // GOOGLE SHEETS RSVP
    const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwkSxbXNJEwkM5FOSQl-rlesuG_K9UpifeKPCMg9mx7Bc9sC5o6IXHJLbdB-7WAAgMknA/exec";


    // OPEN INVITATION
    const intro = document.getElementById("intro");
    const openInvite = document.getElementById("openInvite");

    if (intro && openInvite) {
        openInvite.addEventListener("click", function () {
            intro.classList.add("hide");
            document.body.classList.remove("intro-open");
        });
    }


    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

    }


    // COUNTDOWN
    const eventDate = new Date("2026-12-20T11:00:00+08:00").getTime();

    function updateCountdown() {

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");
        const message = document.getElementById("countdownMessage");

        if (!days || !hours || !minutes || !seconds) return;

        const distance = eventDate - Date.now();

        if (distance <= 0) {

            days.textContent = "0";
            hours.textContent = "0";
            minutes.textContent = "0";
            seconds.textContent = "0";

            if (message) {
                message.textContent = "It's celebration time! Happy birthday, Yana! ♡";
            }

            return;
        }

        days.textContent = Math.floor(distance / 86400000);
        hours.textContent = Math.floor((distance % 86400000) / 3600000);
        minutes.textContent = Math.floor((distance % 3600000) / 60000);
        seconds.textContent = Math.floor((distance % 60000) / 1000);

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // RSVP FORM
    const form = document.getElementById("rsvpForm");
    const status = document.getElementById("formStatus");
    const guestCount = document.getElementById("guestCount");

    if (form && status && guestCount) {

        form.querySelectorAll('input[name="attendance"]').forEach(function (radio) {

            radio.addEventListener("change", function () {

                if (radio.value === "No" && radio.checked) {
                    guestCount.value = 0;
                }

                if (radio.value === "Yes" && radio.checked && Number(guestCount.value) === 0) {
                    guestCount.value = 1;
                }

            });

        });

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            const data = Object.fromEntries(new FormData(form).entries());

            data.guestCount = Number(data.guestCount);

            if (data.attendance === "No") {
                data.guestCount = 0;
            }

            if (data.attendance === "Yes" && data.guestCount < 1) {
                status.textContent = "Please enter at least 1 person if you are attending.";
                return;
            }

            const button = document.getElementById("submitRsvp");

            if (button) {
                button.disabled = true;
                button.textContent = "Sending...";
            }

            try {

                await fetch(RSVP_ENDPOINT, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(data)
                });

                status.textContent = "Thank you! Your RSVP has been sent. ♡";

                form.reset();
                guestCount.value = 1;

            } catch (error) {

                console.error(error);

                status.textContent = "Sorry, something went wrong. Please try again.";

            } finally {

                if (button) {
                    button.disabled = false;
                    button.textContent = "Send RSVP ♡";
                }

            }

        });

    }


    // BACK TO TOP
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ==========================================
    // GODPARENTS LIST
    // ==========================================

    const godparentsList = [

        { name: "Juan Dela Cruz", role: "Ninong" },
        { name: "Maria Clara", role: "Ninang" },
        { name: "Arjen Manahan", role: "Ninong" },
        { name: "Aubrey Manahan", role: "Ninang" },
        { name: "Victorino Arellano", role: "Ninong" },
        { name: "Kristine Alcantara", role: "Ninang" },
        { name: "Carlo Bautista", role: "Ninong" },
        { name: "Ishen Alcantara", role: "Ninang" },
        { name: "Daniel David San Gabriel", role: "Ninong" },
        { name: "Camille Torres", role: "Ninang" },
        { name: "Daniel Fernandez", role: "Ninong" },
        { name: "Angela Cruz", role: "Ninang" },
        { name: "Nathan Villanueva", role: "Ninong" },
        { name: "Bianca Castillo", role: "Ninang" },
        { name: "Joshua Ramirez", role: "Ninong" },
        { name: "Patricia Gomez", role: "Ninang" },
        { name: "Adrian Morales", role: "Ninong" },
        { name: "Chloe Rivera", role: "Ninang" },
        { name: "Lorenzo Aquino", role: "Ninong" },
        { name: "Samantha Diaz", role: "Ninang" },
        { name: "Francis Mendoza", role: "Ninong" },
        { name: "Nicole Garcia", role: "Ninang" },
        { name: "Mark Anthony Lopez", role: "Ninong" },
        { name: "Andrea Santos", role: "Ninang" },
        { name: "Christian Flores", role: "Ninong" },
        { name: "Gabriella Reyes", role: "Ninang" },
        { name: "Paolo Fernandez", role: "Ninong" },
        { name: "Francesca Ramos", role: "Ninang" },
        { name: "Enzo Castillo", role: "Ninong" },
        { name: "Danica Bautista", role: "Ninang" },
        { name: "Rafael Torres", role: "Ninong" },
        { name: "Mikaela Villanueva", role: "Ninang" },
        { name: "Stephen Gomez", role: "Ninong" },
        { name: "Beatrice Aquino", role: "Ninang" },
        { name: "Vincent Ramirez", role: "Ninong" },
        { name: "Clarisse Morales", role: "Ninang" },
        { name: "Luis Rivera", role: "Ninong" },
        { name: "Trisha Diaz", role: "Ninang" },
        { name: "Sebastian Cruz", role: "Ninong" },
        { name: "Danielle Lopez", role: "Ninang" }

    ];


    // ==========================================
    // GODPARENTS SEARCH
    // ==========================================

    const godparentSearch = document.getElementById("godparentSearch");
    const godparentResults = document.getElementById("godparentResults");

    if (godparentSearch && godparentResults) {

        godparentSearch.addEventListener("input", function () {

            const searchName = this.value
                .trim()
                .toLowerCase();

            if (searchName === "") {
                godparentResults.innerHTML = "<p>Your little surprise awaits... ♡</p>";
                return;
            }

            const matches = godparentsList.filter(function (person) {
                return person.name.toLowerCase().includes(searchName);
            });

            if (matches.length > 0) {

                godparentResults.innerHTML = matches.map(function (person) {

                    return `
                        <div class="godparent-result">
                            <h3>${person.name}</h3>
                            <span>${person.role} ♡</span>
                            <p>You're one of Yana's special godparents!</p>
                        </div>
                    `;

                }).join("");

            } else {

                godparentResults.innerHTML = `
                    <p>Sorry, we couldn't find your name. ♡</p>
                    <small>Please check your spelling or contact the family.</small>
                `;

            }

        });

    } else {
        console.error("Godparents search elements are missing.");
    }


    console.log("Yana's invitation website loaded successfully! ♡");

    // BACKGROUND MUSIC PLAYER
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

if (backgroundMusic && musicToggle) {
    musicToggle.addEventListener("click", function () {

        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    musicToggle.textContent = "🎵 Pause Music";
                    musicToggle.classList.add("playing");
                })
                .catch(() => {
                    musicToggle.textContent = "🎵 Play Music";
                });

        } else {
            backgroundMusic.pause();
            musicToggle.textContent = "🎵 Play Music";
            musicToggle.classList.remove("playing");
        }

    });

    backgroundMusic.addEventListener("ended", function () {
        musicToggle.textContent = "🎵 Play Music";
        musicToggle.classList.remove("playing");
    });
}
});