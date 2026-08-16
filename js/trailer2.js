/* =========================================================
   PEWJAY OFFICIAL
   TRAILER.JS
   MP4 AUTOPLAY + COUNTDOWN + SLIDE ANIMATION
   ========================================================= */


/* =========================================================
   VIDEO
   ========================================================= */

const trailerVideo =
    document.getElementById(
        "trailer-video"
    );


if (trailerVideo) {

    trailerVideo.autoplay = true;

    trailerVideo.loop = true;

    trailerVideo.muted = true;

    trailerVideo.playsInline = true;


    trailerVideo.play().catch(() => {

        console.log(
            "Autoplay waiting for browser permission."
        );

    });

}


/* =========================================================
   ENABLE AUDIO AFTER USER INTERACTION
   ========================================================= */

function enableTrailerAudio() {

    if (!trailerVideo) {
        return;
    }


    trailerVideo.muted = false;

    trailerVideo.volume = 1;


    trailerVideo.play().catch(() => {

        console.log(
            "Audio playback requires interaction."
        );

    });

}


document.addEventListener(
    "click",
    enableTrailerAudio,
    {
        once: true
    }
);


document.addEventListener(
    "touchstart",
    enableTrailerAudio,
    {
        once: true
    }
);


document.addEventListener(
    "keydown",
    enableTrailerAudio,
    {
        once: true
    }
);


/* =========================================================
   RELEASE DATE
   ========================================================= */

/*
   The Bluey Movie
   August 6. 2027
*/

const theaterReleaseDate =
    new Date(
        "2027-08-06T12:00:00+08:00"
    );


/* =========================================================
   SOUTHWOODS CINEMAS
   ========================================================= */

const southwoodsReleaseDate =
    new Date(
        "2027-08-14T00:00:00+08:00" 
    );


/* =========================================================
   FORMAT NUMBER
   ========================================================= */

function formatNumber(number) {

    return String(number)
        .padStart(2, "0");

}


/* =========================================================
   ANIMATE NUMBER
   ========================================================= */

function animateCountdownNumber(
    element,
    value
) {

    if (!element) {
        return;
    }


    const newValue =
        formatNumber(value);


    /*
     * Don't animate if the number
     * hasn't changed.
     */

    if (
        element.textContent ===
        newValue
    ) {

        return;

    }


    /*
     * Remove previous animation.
     */

    element.classList.remove(
        "slide-down"
    );


    /*
     * Force browser reflow.
     *
     * This allows the same CSS
     * animation to restart.
     */

    void element.offsetWidth;


    /*
     * Update number.
     */

    element.textContent =
        newValue;


    /*
     * Start slide-down animation.
     */

    element.classList.add(
        "slide-down"
    );

}


/* =========================================================
   UPDATE COUNTDOWN
   ========================================================= */

function updateCountdown(
    targetDate,
    prefix
) {

    const days =
        document.getElementById(
            `${prefix}-days`
        );


    const hours =
        document.getElementById(
            `${prefix}-hours`
        );


    const minutes =
        document.getElementById(
            `${prefix}-minutes`
        );


    const seconds =
        document.getElementById(
            `${prefix}-seconds`
        );


    /*
     * Stop if HTML elements
     * don't exist.
     */

    if (
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) {

        return;

    }


    const now =
        new Date();


    let difference =
        targetDate.getTime()
        -
        now.getTime();


    /* =====================================================
       RELEASED
       ===================================================== */

    if (
        difference <= 0
    ) {

        animateCountdownNumber(
            days,
            0
        );


        animateCountdownNumber(
            hours,
            0
        );


        animateCountdownNumber(
            minutes,
            0
        );


        animateCountdownNumber(
            seconds,
            0
        );


        return;

    }


    /* =====================================================
       TOTAL SECONDS
       ===================================================== */

    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    /* =====================================================
       DAYS
       ===================================================== */

    const totalDays =
        Math.floor(
            totalSeconds /
            86400
        );


    /* =====================================================
       HOURS
       ===================================================== */

    const totalHours =
        Math.floor(
            (
                totalSeconds %
                86400
            ) / 3600
        );


    /* =====================================================
       MINUTES
       ===================================================== */

    const totalMinutes =
        Math.floor(
            (
                totalSeconds %
                3600
            ) / 60
        );


    /* =====================================================
       SECONDS
       ===================================================== */

    const totalSecondsLeft =
        totalSeconds % 60;


    /* =====================================================
       UPDATE WITH ANIMATION
       ===================================================== */

    animateCountdownNumber(
        days,
        totalDays
    );


    animateCountdownNumber(
        hours,
        totalHours
    );


    animateCountdownNumber(
        minutes,
        totalMinutes
    );


    animateCountdownNumber(
        seconds,
        totalSecondsLeft
    );

}


/* =========================================================
   UPDATE BOTH COUNTDOWNS
   ========================================================= */

function updateTrailerCountdowns() {

    updateCountdown(
        theaterReleaseDate,
        "theater"
    );


    updateCountdown(
        southwoodsReleaseDate,
        "cinema"
    );

}


/* =========================================================
   INITIAL COUNTDOWN
   ========================================================= */

updateTrailerCountdowns();


/* =========================================================
   UPDATE EVERY SECOND
   ========================================================= */

setInterval(
    updateTrailerCountdowns,
    1000
);


/* =========================================================
   VIDEO READY
   ========================================================= */

if (trailerVideo) {

    trailerVideo.addEventListener(
        "canplay",
        () => {

            trailerVideo
                .play()
                .catch(() => {

                    console.log(
                        "Autoplay blocked."
                    );

                });

        }
    );

}


/* =========================================================
   VIDEO ERROR
   ========================================================= */

if (trailerVideo) {

    trailerVideo.addEventListener(
        "error",
        () => {

            console.error(
                "Trailer MP4 could not be loaded."
            );

        }
    );

}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    reducedMotion.matches &&
    trailerVideo
) {

    trailerVideo.pause();

}