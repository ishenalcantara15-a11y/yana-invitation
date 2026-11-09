// ==========================================
// YANA PAULINE'S INVITATION WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GOOGLE SHEETS RSVP
    // ==========================================

    const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwkSxbXNJEwkM5FOSQl-rlesuG_K9UpifeKPCMg9mx7Bc9sC5o6IXHJLbdB-7WAAgMknA/exec";


    // ==========================================
    // OPEN INVITATION
    // ==========================================

    const intro = document.getElementById("intro");
    const openInvite = document.getElementById("openInvite");

    if (intro && openInvite) {
        openInvite.addEventListener("click", function () {
            intro.classList.add("hide");
            document.body.classList.remove("intro-open");
        });
    }


    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================

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


    // ==========================================
    // COUNTDOWN
    // ==========================================

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


    // ==========================================
    // RSVP FORM
    // ==========================================

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


    // ==========================================
    // BACK TO TOP
    // ==========================================

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

    { name: "Ailene D. Ligon", role: "Ninang" },
    { name: "Aldrin S. Feliciano", role: "Ninong" },
    { name: "Amalia E. Velayo", role: "Ninang" },
    { name: "Analyn S. Mapili", role: "Ninang" },
    { name: "Andrea E. Libunao", role: "Ninang" },
    { name: "Angel S. Lim", role: "Ninang" },
    { name: "Ann Michelle DC. Tomas", role: "Ninang" },
    { name: "Clarisse Anne A. Buenaventura", role: "Ninang" },
    { name: "Emerlinda M. Toledo", role: "Ninang" },
    { name: "Francis Avan T. Alcantara", role: "Ninong" },
    { name: "Irene A. Abundo", role: "Ninang" },
    { name: "Ishen Alcantara", role: "Ninang" },
    { name: "Janet G. Tizuela", role: "Ninang" },
    { name: "Jaylyn L. Carpio", role: "Ninang" },
    { name: "Jocelyn S. Yulay", role: "Ninang" },
    { name: "Kristelle SM. Marzan", role: "Ninang" },
    { name: "Krychel Ira DC. Alcantara", role: "Ninang" },
    { name: "Lanie T. Dantis", role: "Ninang" },
    { name: "Lucky D. Lomotos", role: "Ninang" },
    { name: "Margie C. Del Rosario", role: "Ninang" },
    { name: "Marjorie DC. Culala", role: "Ninang" },
    { name: "Marvic P. Delos Reyes", role: "Ninong" },
    { name: "Mary Grace T. San Pedro", role: "Ninang" },
    { name: "Mike Joseph R. Quizon", role: "Ninong" },
    { name: "Ric Mark SM. Duquilar", role: "Ninong" },
    { name: "Sabriel Nicole K. Lomoljo", role: "Ninang" },
    { name: "Samantha Rei K. Lomoljo", role: "Ninang" },
    { name: "Shikaina M. Lazaro", role: "Ninang" }

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
                .toLowerCase()
                .replace(/\s+/g, " ");

            if (searchName === "") {
                godparentResults.innerHTML = "<p>Your little surprise awaits... ♡</p>";
                return;
            }

            const matches = godparentsList.filter(function (person) {

                return person.name
                    .toLowerCase()
                    .includes(searchName);

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


    // ==========================================
    // BACKGROUND MUSIC PLAYER
    // ==========================================

    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (backgroundMusic && musicToggle) {

        musicToggle.addEventListener("click", function () {

            if (backgroundMusic.paused) {

                backgroundMusic.play()
                    .then(function () {
                        musicToggle.textContent = "🎵 Pause Music";
                        musicToggle.classList.add("playing");
                    })
                    .catch(function () {
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

    // ==========================================
    // WEBSITE LOADED
    // ==========================================

    console.log("Yana's invitation website loaded successfully! ♡");

    // ==========================================
// GALLERY PHOTO LIGHTBOX
// ==========================================

const galleryLinks = document.querySelectorAll(".gallery-month a");

const galleryLightbox = document.createElement("div");
galleryLightbox.className = "gallery-lightbox";
galleryLightbox.innerHTML = `
    <button class="gallery-lightbox-close" type="button" aria-label="Close photo">&times;</button>
    <img src="" alt="Yana's memory">
`;

document.body.appendChild(galleryLightbox);

const lightboxImage = galleryLightbox.querySelector("img");
const lightboxClose = galleryLightbox.querySelector(".gallery-lightbox-close");

galleryLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const photo = link.querySelector("img");

        if (!photo || photo.hidden) return;

        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;

        galleryLightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

function closeGalleryLightbox() {
    galleryLightbox.classList.remove("active");
    document.body.style.overflow = "";
    lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeGalleryLightbox);

galleryLightbox.addEventListener("click", function (event) {
    if (event.target === galleryLightbox) {
        closeGalleryLightbox();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeGalleryLightbox();
    }
});

// =====================================
// YANA'S QUICKSNAP SLIDESHOW
// =====================================

const quickSnapModal = document.getElementById("quickSnapModal");
const quickSnapImage = document.getElementById("quickSnapImage");
const quickSnapMonth = document.getElementById("quickSnapMonth");
const quickSnapProgress = document.getElementById("quickSnapProgress");

const openQuickSnap = document.getElementById("openQuickSnap");
const closeQuickSnap = document.getElementById("closeQuickSnap");
const previousSnap = document.getElementById("previousSnap");
const nextSnap = document.getElementById("nextSnap");
const pauseQuickSnap = document.getElementById("pauseQuickSnap");

let quickSnapPhotos = [];
let currentSnap = 0;
let quickSnapTimer = null;
let quickSnapStart = 0;
let quickSnapElapsed = 0;
let quickSnapPaused = false;

const quickSnapDuration = 5000;


// GET PHOTOS FROM THE MONTHLY GALLERY
async function loadQuickSnapPhotos() {

    const memories = [
        { src: "gallery/december2025.jpg", month: "December 2025" },
        { src: "gallery/january2026.jpg", month: "January 2026" },
        { src: "gallery/february2026.jpg", month: "February 2026" },
        { src: "gallery/march2026.jpg", month: "March 2026" },
        { src: "gallery/april2026.jpg", month: "April 2026" },
        { src: "gallery/may2026.jpg", month: "May 2026" },
        { src: "gallery/june2026.jpg", month: "June 2026" },
        { src: "gallery/july2026.jpg", month: "July 2026" },
        { src: "gallery/august2026.jpg", month: "August 2026" },
        { src: "gallery/september2026.jpg", month: "September 2026" },
        { src: "gallery/october2026.jpg", month: "October 2026" },
        { src: "gallery/november2026.jpg", month: "November 2026" },
        { src: "gallery/december2026.jpg", month: "December 2026" }
    ];

    const results = await Promise.all(
        memories.map(memory => {
            return new Promise(resolve => {
                const image = new Image();

                image.onload = () => resolve(memory);
                image.onerror = () => resolve(null);

                image.src = memory.src;
            });
        })
    );

    quickSnapPhotos = results.filter(memory => memory !== null);
}


// CREATE PROGRESS BARS
function createQuickSnapProgress() {

    quickSnapProgress.innerHTML = "";

    quickSnapPhotos.forEach(() => {

        const bar = document.createElement("span");
        const fill = document.createElement("i");

        bar.appendChild(fill);
        quickSnapProgress.appendChild(bar);

    });
}


// UPDATE PROGRESS BARS
function updateQuickSnapProgress() {

    const bars = quickSnapProgress.querySelectorAll("i");

    bars.forEach((bar, index) => {

        if (index < currentSnap) {
            bar.style.width = "100%";
        } else if (index > currentSnap) {
            bar.style.width = "0%";
        } else {
            bar.style.width =
                (quickSnapElapsed / quickSnapDuration * 100) + "%";
        }

    });

}


// SHOW CURRENT PHOTO
function showQuickSnap(index) {

    if (index >= quickSnapPhotos.length) {
        closeQuickSnapModal();
        return;
    }

    if (index < 0) {
        index = 0;
    }

    currentSnap = index;

    quickSnapImage.src = quickSnapPhotos[currentSnap].src;
    quickSnapMonth.textContent = quickSnapPhotos[currentSnap].month;

    startQuickSnapTimer();

}


// START AUTOMATIC SLIDESHOW
function startQuickSnapTimer() {

    clearInterval(quickSnapTimer);

    quickSnapPaused = false;
    quickSnapElapsed = 0;
    quickSnapStart = Date.now();

    pauseQuickSnap.textContent = "❚❚";

    quickSnapTimer = setInterval(() => {

        quickSnapElapsed = Date.now() - quickSnapStart;

        updateQuickSnapProgress();

        if (quickSnapElapsed >= quickSnapDuration) {
            showQuickSnap(currentSnap + 1);
        }

    }, 50);

}


// PAUSE OR RESUME SLIDESHOW
function toggleQuickSnapPause() {

    if (!quickSnapPaused) {

        quickSnapElapsed = Date.now() - quickSnapStart;

        clearInterval(quickSnapTimer);

        quickSnapPaused = true;

        pauseQuickSnap.textContent = "▶";

        updateQuickSnapProgress();

    } else {

        quickSnapStart = Date.now();

        quickSnapPaused = false;

        pauseQuickSnap.textContent = "❚❚";

        quickSnapTimer = setInterval(() => {

            const totalElapsed =
                quickSnapElapsed + (Date.now() - quickSnapStart);

            if (totalElapsed >= quickSnapDuration) {
                showQuickSnap(currentSnap + 1);
                return;
            }

            const previousElapsed = quickSnapElapsed;

            quickSnapElapsed = totalElapsed;

            updateQuickSnapProgress();

            quickSnapElapsed = previousElapsed;

        }, 50);

    }

}


// OPEN SLIDESHOW
async function openQuickSnapModal() {

    quickSnapPhotos = [];

    openQuickSnap.disabled = true;

    await loadQuickSnapPhotos();

    openQuickSnap.disabled = false;

    if (quickSnapPhotos.length === 0) {
        alert("No uploaded photos available yet. ♡");
        return;
    }

    createQuickSnapProgress();

    quickSnapModal.classList.add("active");

    document.body.style.overflow = "hidden";

    showQuickSnap(0);

}


// CLOSE SLIDESHOW
function closeQuickSnapModal() {

    clearInterval(quickSnapTimer);

    quickSnapTimer = null;

    quickSnapModal.classList.remove("active");

    document.body.style.overflow = "";

    quickSnapPaused = false;

    quickSnapElapsed = 0;

}


// BUTTON EVENTS
openQuickSnap.addEventListener("click", openQuickSnapModal);

closeQuickSnap.addEventListener("click", closeQuickSnapModal);

previousSnap.addEventListener("click", () => {
    showQuickSnap(currentSnap - 1);
});

nextSnap.addEventListener("click", () => {
    showQuickSnap(currentSnap + 1);
});

pauseQuickSnap.addEventListener("click", toggleQuickSnapPause);


// KEYBOARD NAVIGATION
document.addEventListener("keydown", event => {

    if (!quickSnapModal.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeQuickSnapModal();
    }

    if (event.key === "ArrowRight") {
        showQuickSnap(currentSnap + 1);
    }

    if (event.key === "ArrowLeft") {
        showQuickSnap(currentSnap - 1);
    }

});

// ==========================================
// 30 CANDLES FOR YANA
// ==========================================

const CANDLE_API_URL = RSVP_ENDPOINT;

const candleGrid = document.getElementById("candlesGrid");
const candleModal = document.getElementById("candleModal");
const closeCandleModal = document.getElementById("closeCandleModal");
const selectedCandleText = document.getElementById("selectedCandleText");
const godparentSelect = document.getElementById("godparentSelect");
const candleMessage = document.getElementById("candleMessage");
const submitCandle = document.getElementById("submitCandle");
const candleStatus = document.getElementById("candleStatus");

let selectedCandleNumber = null;
let claimedCandles = [];


// ==========================================
// GODPARENTS LIST
// ==========================================

const candleGodparents = godparentsList.map(person => person.name);


// ==========================================
// POPULATE GODPARENT DROPDOWN
// ==========================================

if (godparentSelect) {

    candleGodparents.forEach(name => {

        const option = document.createElement("option");

        option.value = name;
        option.textContent = name;

        godparentSelect.appendChild(option);

    });

}


// ==========================================
// LOAD CLAIMED CANDLES
// ==========================================

function loadClaimedCandles() {

    return new Promise((resolve, reject) => {

        const callbackName = "candleCallback_" + Date.now();

        const script = document.createElement("script");

        const timeout = setTimeout(() => {

            delete window[callbackName];
            script.remove();

            reject(new Error("Candle loading timed out."));

        }, 15000);


        window[callbackName] = function(data) {

            clearTimeout(timeout);

            delete window[callbackName];
            script.remove();

            if (!data || data.result !== "success") {

                reject(new Error("Unable to load candle records."));
                return;

            }

            claimedCandles = data.candles || [];

            resolve(claimedCandles);

        };


        script.onerror = function() {

            clearTimeout(timeout);

            delete window[callbackName];
            script.remove();

            reject(new Error("Unable to connect to Google Sheets."));

        };


        script.src =
            CANDLE_API_URL +
            "?action=getCandles&callback=" +
            callbackName;

        document.body.appendChild(script);

    });

}


// ==========================================
// GENERATE 30 CANDLES
// ==========================================

async function generateCandles() {

    if (!candleGrid) return;

    candleGrid.innerHTML = "<p>Loading candles... ♡</p>";

    try {

        await loadClaimedCandles();

        candleGrid.innerHTML = "";

        for (let i = 1; i <= 30; i++) {

            const candle = document.createElement("button");

            candle.type = "button";
            candle.className = "candle-item";

            const claimed = claimedCandles.find(item =>
                Number(item.candleNumber) === i
            );

            if (claimed) {

                candle.classList.add("claimed");

                candle.innerHTML = `
                    <span class="candle-emoji">✨</span>
                    <span class="candle-number">Candle ${i}</span>
                    <small>Claimed</small>
                `;

                candle.disabled = true;

            } else {

                candle.innerHTML = `
                    <span class="candle-emoji">🕯️</span>
                    <span class="candle-number">Candle ${i}</span>
                `;

                candle.addEventListener("click", function() {

                    openCandleModal(i);

                });

            }

            candleGrid.appendChild(candle);

        }

    } catch (error) {

        console.error("Candle loading error:", error);

        candleGrid.innerHTML =
            "<p>Unable to load candles. Please refresh the page. ♡</p>";

    }

}


// ==========================================
// OPEN CANDLE MODAL
// ==========================================

function openCandleModal(number) {

    if (!candleModal) return;

    selectedCandleNumber = number;

    selectedCandleText.textContent = "Candle Number " + number;

    godparentSelect.value = "";
    candleMessage.value = "";
    candleStatus.textContent = "";

    candleModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


// ==========================================
// CLOSE CANDLE MODAL
// ==========================================

function closeCandleWindow() {

    if (!candleModal) return;

    candleModal.classList.remove("active");

    document.body.style.overflow = "";

    selectedCandleNumber = null;

    submitCandle.disabled = false;

    submitCandle.textContent = "Light My Candle ♡";

}


// ==========================================
// MODAL BUTTON EVENTS
// ==========================================

if (closeCandleModal) {

    closeCandleModal.addEventListener("click", closeCandleWindow);

}

if (candleModal) {

    candleModal.addEventListener("click", function(event) {

        if (event.target === candleModal) {

            closeCandleWindow();

        }

    });

}


// ==========================================
// SUBMIT CANDLE MESSAGE
// ==========================================

if (submitCandle) {

    submitCandle.addEventListener("click", async function() {

        const godparentName = godparentSelect.value;
        const message = candleMessage.value.trim();

        if (!selectedCandleNumber) {

            candleStatus.textContent = "Please select a candle first. ♡";
            return;

        }

        if (!godparentName) {

            candleStatus.textContent = "Please select your name. ♡";
            return;

        }

        if (!message) {

            candleStatus.textContent = "Please write a message for Yana. ♡";
            return;

        }

        submitCandle.disabled = true;
        submitCandle.textContent = "Saving your candle...";

        const payload = {

            action: "claimCandle",
            candleNumber: selectedCandleNumber,
            godparentName: godparentName,
            message: message

        };

        try {

            await fetch(CANDLE_API_URL, {

                method: "POST",
                mode: "no-cors",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(payload)

            });


            // CHECK IF THE CANDLE WAS SAVED

            let savedCandle = null;

            for (let attempt = 0; attempt < 8; attempt++) {

                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );

                await loadClaimedCandles();

                savedCandle = claimedCandles.find(item =>

                    Number(item.candleNumber) === selectedCandleNumber &&

                    String(item.godparentName).trim().toLowerCase() ===
                    godparentName.trim().toLowerCase()

                );

                if (savedCandle) break;

            }


            if (savedCandle) {

                candleStatus.textContent =
                    "Your candle is now glowing for Yana! Thank you! ♡";

                await generateCandles();

                setTimeout(function() {

                    closeCandleWindow();

                }, 2000);

            } else {

                candleStatus.textContent =
                    "This candle may already be claimed. Please try again.";

                submitCandle.disabled = false;

                submitCandle.textContent = "Light My Candle ♡";

            }

        } catch (error) {

            console.error("Candle submission error:", error);

            candleStatus.textContent =
                "Unable to verify your submission. Please try again.";

            submitCandle.disabled = false;

            submitCandle.textContent = "Light My Candle ♡";

        }

    });

}


// ==========================================
// INITIALIZE CANDLES
// ==========================================

if (candleGrid && candleModal && godparentSelect) {

    generateCandles();

}


// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeGalleryLightbox();

        if (quickSnapModal && quickSnapModal.classList.contains("active")) {

            closeQuickSnapModal();

        }

        if (candleModal && candleModal.classList.contains("active")) {

            closeCandleWindow();

        }

    }

    if (
        quickSnapModal &&
        quickSnapModal.classList.contains("active")
    ) {

        if (event.key === "ArrowRight") {

            showQuickSnap(currentSnap + 1);

        }

        if (event.key === "ArrowLeft") {

            showQuickSnap(currentSnap - 1);

        }

    }

});


// ==========================================
// WEBSITE LOADED
// ==========================================

console.log("Yana's invitation website loaded successfully! ♡");

});