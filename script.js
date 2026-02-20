document.addEventListener('DOMContentLoaded', () => {

    // --- Background Music Control ---
    const music = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    const playIcon = '<i class="icon-play">▶</i>';
    const pauseIcon = '<i class="icon-pause">⏸</i>';

    if (music && musicControl) {
        musicControl.innerHTML = pauseIcon; // Start as if playing
        music.volume = 0.3; // Set volume to 30%

        musicControl.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicControl.innerHTML = pauseIcon;
            } else {
                music.pause();
                musicControl.innerHTML = playIcon;
            }
        });
    }

    // --- Countdown Timer ---
    const countDownDate = new Date("Oct 26, 2024 00:00:00").getTime(); // <-- CHANGE THIS DATE
    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            if (distance < 0) {
                countdownEl.innerHTML = "🎉 The day is here! Happy Birthday, Ritu! 🎉";
                clearInterval(x);
            } else {
                countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s until the big day!`;
            }
        }, 1000);
    }

    // --- Then & Now Slider ---
    const slider = document.querySelector('.comparison-slider');
    if (slider) {
        const beforeImg = slider.querySelector('.slider-before');
        const handle = slider.querySelector('.slider-handle');
        let isSliding = false;

        function updateSliderPosition(x) {
            const sliderRect = slider.getBoundingClientRect();
            let position = ((x - sliderRect.left) / sliderRect.width) * 100;
            position = Math.max(0, Math.min(100, position));
            beforeImg.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        }

        handle.addEventListener('mousedown', () => isSliding = true);
        window.addEventListener('mouseup', () => isSliding = false);
        window.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            updateSliderPosition(e.pageX);
        });
        // Touch events for mobile
        handle.addEventListener('touchstart', () => isSliding = true);
        window.addEventListener('touchend', () => isSliding = false);
        window.addEventListener('touchmove', (e) => {
            if (!isSliding) return;
            updateSliderPosition(e.touches[0].pageX);
        });
    }

    // --- Quiz Logic ---
    const quizData = [
        {
            question: "What is Ritu's favorite food?",
            options: ["Pizza", "Sushi", "Pasta", "Tacos"],
            answer: "Pasta" // <-- Customize answers
        },
        {
            question: "Which place does Ritu want to visit the most?",
            options: ["Paris", "Bali", "New York", "London"],
            answer: "Bali" // <-- Customize answers
        },
        {
            question: "What is Ritu's go-to comfort movie?",
            options: ["The Notebook", "Friends", "Harry Potter", "The Devil Wears Prada"],
            answer: "Friends" // <-- Customize answers
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizNext = document.getElementById('quiz-next');
    const quizResults = document.getElementById('quiz-results');
    const resultText = document.getElementById('result-text');

    if (quizContainer) {
        let currentQuestion = 0;
        let score = 0;

        function loadQuestion() {
            const question = quizData[currentQuestion];
            quizQuestion.innerText = question.question;
            quizOptions.innerHTML = '';
            question.options.forEach(option => {
                const button = document.createElement('button');
                button.innerText = option;
                button.classList.add('quiz-option');
                button.addEventListener('click', selectAnswer);
                quizOptions.appendChild(button);
            });
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.innerText === quizData[currentQuestion].answer;
            if (isCorrect) score++;
            selectedBtn.classList.add('selected');
            document.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);
            quizNext.style.display = 'inline-block';
        }

        function showResult() {
            quizContainer.style.display = 'none';
            quizResults.style.display = 'block';
            let message = "";
            if (score === quizData.length) {
                message = `Perfect score! ${score}/${quizData.length}. You know Ritu inside and out! 🎉`;
            } else if (score > quizData.length / 2) {
                message = `Great job! You got ${score}/${quizData.length}. You're a true friend!`;
            } else {
                message = `You got ${score}/${quizData.length}. But hey, it's the thought that counts! ❤️`;
            }
            resultText.innerText = message;
        }
        
        quizNext.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
                quizNext.style.display = 'none';
            } else {
                showResult();
            }
        });

        loadQuestion();
        quizNext.style.display = 'none';
    }

    // --- Lightbox for Gallery (Enhanced) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    window.openLightbox = function(src, caption) {
        if(lightbox && lightboxImg) {
            lightbox.style.display = 'block';
            lightboxImg.src = src;
            if (lightboxCaption) {
                lightboxCaption.innerText = caption || '';
                lightboxCaption.style.display = caption ? 'block' : 'none';
            }
        }
    };

    window.closeLightbox = function() {
        if(lightbox) {
            lightbox.style.display = 'none';
        }
    };
    
    // --- Surprise Modal ---
    const modal = document.getElementById('surprise-modal');
    const surpriseTrigger = document.getElementById('surprise-trigger');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal && surpriseTrigger) {
        surpriseTrigger.addEventListener('click', () => {
            modal.style.display = 'block';
        });
        if(closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // --- Confetti Function ---
    window.launchConfetti = function() {
        var count = 200;
        var defaults = { origin: { y: 0.7 } };
        
        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }
        fire(0.25, { spread: 26, startVelocity: 55, });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    };

    // --- Smooth Scroll for CTA Button ---
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if(section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

});