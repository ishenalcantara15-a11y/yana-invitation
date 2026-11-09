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

        { name: "Krychel Ira DC. Alcantara", role: "Ninang" },
        { name: "Mike Joseph R. Quizon", role: "Ninong" },
        { name: "Margie C. Del Rosario", role: "Ninang" },
        { name: "Ric Mark SM. Duquilar", role: "Ninong" },
        { name: "Kristelle SM. Marzan", role: "Ninang" },
        { name: "Aldrin S. Feliciano", role: "Ninong" },
        { name: "Andrea E. Libunao", role: "Ninang" },
        { name: "Samantha Rei K. Lomoljo", role: "Ninang" },
        { name: "Mary Grace T. San Pedro", role: "Ninang" },
        { name: "Sabriel Nicole K. Lomoljo", role: "Ninang" },
        { name: "Ishen Alcantara", role: "Ninang" },
        { name: "Irene A. Abundo", role: "Ninang" },
        { name: "Jocelyn S. Yulay", role: "Ninang" },
        { name: "Marjorie DC. Culala", role: "Ninang" },
        { name: "Ailene D. Ligon", role: "Ninang" },
        { name: "Clarisse Anne A. Buenaventura", role: "Ninang" },
        { name: "Lucky D. Lomotos", role: "Ninang" },
        { name: "Shikaina M. Lazaro", role: "Ninang" },
        { name: "Lanie T. Dantis", role: "Ninang" },
        { name: "Angel S. Lim", role: "Ninang" },
        { name: "Emerlinda M. Toledo", role: "Ninang" },
        { name: "Ann Michelle DC. Tomas", role: "Ninang" },
        { name: "Janet G. Tizuela", role: "Ninang" },
        { name: "Analyn S. Mapili", role: "Ninang" },
        { name: "Amalia E. Velayo", role: "Ninang" },
        { name: "Jaylyn L. Carpio", role: "Ninang" },
        { name: "Francis Avan T. Alcantara", role: "Ninong" }

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

// Get uploaded photos from the monthly gallery
function loadQuickSnapPhotos() {
    quickSnapPhotos = Array.from(
        document.querySelectorAll(".gallery-month")
    ).map(card => {
        const img = card.querySelector("img");
        const month = card.querySelector("h3");

        if (!img || img.hidden || !img.getAttribute("src")) {
            return null;
        }

        return {
            src: img.src,
            month: month ? month.textContent.trim() : "Yana's Memory"
        };
    }).filter(photo => photo !== null);
}

// Create progress bars
function createQuickSnapProgress() {
    quickSnapProgress.innerHTML = "";

    quickSnapPhotos.forEach(() => {
        const bar = document.createElement("span");
        const fill = document.createElement("i");

        bar.appendChild(fill);
        quickSnapProgress.appendChild(bar);
    });
}

// Display current photo
function showQuickSnap(index) {
    if (index >= quickSnapPhotos.length) {
        closeQuickSnapModal();
        return;
    }

    if (index < 0) {
        index = 0;
    }

    currentSnap = index;
    quickSnapImage.src = quickSnapPhotos[index].src;
    quickSnapMonth.textContent = quickSnapPhotos[index].month;

    updateQuickSnapProgress();
    startQuickSnapTimer();
}

// Update progress bars
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

// Start automatic slideshow
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

// Pause or resume
function toggleQuickSnapPause() {
    if (!quickSnapPaused) {
        quickSnapElapsed += Date.now() - quickSnapStart;
        clearInterval(quickSnapTimer);
        quickSnapPaused = true;
        pauseQuickSnap.textContent = "▶";
    } else {
        quickSnapStart = Date.now();
        quickSnapPaused = false;
        pauseQuickSnap.textContent = "❚❚";

        quickSnapTimer = setInterval(() => {
            quickSnapElapsed = Date.now() - quickSnapStart;
            updateQuickSnapProgress();

            if (quickSnapElapsed >= quickSnapDuration) {
                showQuickSnap(currentSnap + 1);
            }
        }, 50);
    }
}

// Open slideshow
function openQuickSnapModal() {
    loadQuickSnapPhotos();

    if (quickSnapPhotos.length === 0) {
        alert("No uploaded photos available yet. ♡");
        return;
    }

    createQuickSnapProgress();

    quickSnapModal.classList.add("active");
    document.body.style.overflow = "hidden";

    showQuickSnap(0);
}

// Close slideshow
function closeQuickSnapModal() {
    clearInterval(quickSnapTimer);

    quickSnapModal.classList.remove("active");
    document.body.style.overflow = "";
}

// Navigation buttons
openQuickSnap.addEventListener("click", openQuickSnapModal);
closeQuickSnap.addEventListener("click", closeQuickSnapModal);

nextSnap.addEventListener("click", () => {
    showQuickSnap(currentSnap + 1);
});

previousSnap.addEventListener("click", () => {
    showQuickSnap(currentSnap - 1);
});

pauseQuickSnap.addEventListener("click", toggleQuickSnapPause);

// Keyboard navigation
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
});