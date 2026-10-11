document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. HERO ANIMATION & NAVBAR SHADOW
    // =========================================
    const heroContent = document.querySelector(".hero-content");
    setTimeout(() => {
        if (heroContent) {
            heroContent.style.transition = "opacity 1s ease, transform 1s ease";
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";
        }
    }, 200);

    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            } else {
                navbar.style.boxShadow = "none";
            }
        }
    });

    // =========================================
    // 2. UNIVERSAL SCROLL ANIMATIONS & COUNTERS
    // =========================================
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                if (entry.target.querySelector('.counter')) {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .scroll-animate, .hero-content');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // =========================================
    // 3. CYCLE SECTION SPLIT BACKGROUND MERGE
    // =========================================
    const cycleSection = document.getElementById('cycle-section');
    const observerOptionsBg = {
        root: null,
        threshold: 0.6
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cycleSection.classList.add('is-visible');
            } else {
                cycleSection.classList.remove('is-visible');
            }
        });
    }, observerOptionsBg);

    if (cycleSection) {
        sectionObserver.observe(cycleSection);
    }

    // =========================================
    // 4. CAROUSEL SCROLL LOGIC (FIXED FOR MOBILE)
    // =========================================
    const track = document.getElementById('carouselTrack');
    // Select both desktop and mobile buttons
    const prevBtns = document.querySelectorAll('#prevBtn, #prevBtnMobile');
    const nextBtns = document.querySelectorAll('#nextBtn, #nextBtnMobile');

    if (track) {
        const getScrollAmount = () => {
            const firstItem = track.querySelector('div');
            return firstItem ? firstItem.offsetWidth + 24 : 320;
        };
        nextBtns.forEach(btn => {
            if (btn) btn.addEventListener('click', () => track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }));
        });
        prevBtns.forEach(btn => {
            if (btn) btn.addEventListener('click', () => track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }));
        });
    }

    // =========================================
    // 5. TESTIMONIAL SLIDER LOGIC
    // =========================================
    const testiTrack = document.getElementById('testiTrack');
    const testiPrev = document.getElementById('testiPrev');
    const testiNext = document.getElementById('testiNext');
    const dots = document.querySelectorAll('#testiDots button');

    if (testiTrack) {
        let currentSlide = 0;
        const totalSlides = testiTrack.children.length;

        const updateSlider = () => {
            testiTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('bg-gray-500');
                    dot.classList.remove('bg-transparent');
                } else {
                    dot.classList.add('bg-transparent');
                    dot.classList.remove('bg-gray-500');
                }
            });
        };

        if (testiNext) testiNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        if (testiPrev) testiPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
    }

    // =========================================
    // 6. MOBILE MENU TOGGLE
    // =========================================
    const openMobileMenu = document.getElementById('openMobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (openMobileMenu && closeMobileMenu && mobileMenuOverlay) {
        openMobileMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });

        const mobileLinks = mobileMenuOverlay.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // =========================================
    // 7. PHONE INPUT INITIALIZATION (INTL-TEL-INPUT)
    // =========================================
    const phoneInputField = document.querySelector("#phone"); // Index/Contact form phone
    let phoneInputObj = null;
    if (phoneInputField) {
        phoneInputObj = window.intlTelInput(phoneInputField, {
            initialCountry: "in",
            preferredCountries: ["in", "us", "gb", "au", "ae"],
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            dropdownContainer: document.body
        });
    }

    const appPhoneField = document.getElementById('appPhone'); // Modal form phone
    let appPhoneObj = null;

    // =========================================
    // 8. APPOINTMENT MODAL LOGIC
    // =========================================
    const desktopBookBtn = document.getElementById('desktopBookBtn');
    const mobileBookBtn = document.getElementById('mobileBookBtn');
    const appointmentModal = document.getElementById('appointmentModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalContent = document.getElementById('modalContent');

    const openModal = () => {
        if (!appointmentModal || !modalContent) return;

        appointmentModal.classList.remove('hidden');
        setTimeout(() => {
            appointmentModal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
        }, 10);

        if (appPhoneField && !appPhoneObj) {
            appPhoneObj = window.intlTelInput(appPhoneField, {
                initialCountry: "in",
                preferredCountries: ["in", "us", "gb", "au", "ae"],
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                dropdownContainer: document.body
            });
        }

        const overlay = document.getElementById('mobileMenuOverlay');
        if (overlay && !overlay.classList.contains('translate-x-full')) {
            overlay.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    };

    const closeModal = () => {
        if (!appointmentModal || !modalContent) return;

        appointmentModal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            appointmentModal.classList.add('hidden');
        }, 300);
    };

    if (desktopBookBtn) desktopBookBtn.addEventListener('click', openModal);
    if (mobileBookBtn) mobileBookBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (appointmentModal) {
        appointmentModal.addEventListener('click', (e) => {
            if (e.target === appointmentModal) closeModal();
        });
    }

    // =====================================================
    // 9. FORM SUBMISSION LOGIC (EMAIL API DISABLED)
    // =====================================================

    /* 
    --- API Fetch code commented out ---
    async function submitFormToAPI(formElement, submitBtn, originalText, loadingText, successMsg) { ... }
    */

    // A) Appointment Modal Form (Email Submit Disabled)
    const appForm = document.getElementById('appointmentForm');
    if (appForm) {
        appForm.onsubmit = function (e) {
            e.preventDefault(); // Page reload hone se rokega
            alert("Email booking is currently disabled. Please use the WhatsApp button to book your appointment.");
        };
    }

    // B) Main Form (Index Page / Contact Us Page Email Submit Disabled)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = function (e) {
            e.preventDefault(); // Page reload hone se rokega
            alert("Email submission is currently disabled. Please use the WhatsApp button to connect with us.");
        };
    }

    // =====================================================
    // 10. WHATSAPP BUTTON LOGIC (THIS STILL WORKS)
    // =====================================================

    // Helper function to get input value safely by ID or Name
    const getVal = (form, id, name) => {
        const el = form.querySelector(`#${id}`) || form.querySelector(`[name="${name}"]`);
        return el ? el.value : '';
    };

    // A) Index/Contact WhatsApp Logic
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (contactForm && whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const fname = getVal(contactForm, 'fname', 'First Name');
            const lname = getVal(contactForm, 'lname', 'Last Name');
            const email = getVal(contactForm, 'email', 'Email');
            const interest = getVal(contactForm, 'interest', 'Interested In');
            const userMsg = getVal(contactForm, 'message', 'Message');

            let fullPhone = "";
            if (phoneInputObj) {
                fullPhone = phoneInputObj.getNumber();
            } else {
                fullPhone = getVal(contactForm, 'phone', 'Phone');
            }

            const whatsappNumber = "918319440047";
            let message = `Namaste Mission Lakshya! 🙏%0A%0AMera naam ${fname} ${lname} hai.`;

            if (interest) message += `%0AMai "${interest}" me interested hu.`;
            if (userMsg) message += `%0A%0AMessage:%0A${userMsg}`;

            message += `%0A%0A*Contact Details:*%0AEmail: ${email}%0APhone: ${fullPhone}`;

            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            contactForm.reset();
        });
    }

    // B) Modal WhatsApp Logic
    const appWhatsappBtn = document.getElementById('appWhatsappBtn');
    if (appForm && appWhatsappBtn) {
        appWhatsappBtn.addEventListener('click', () => {
            if (!appForm.checkValidity()) {
                appForm.reportValidity();
                return;
            }

            const fname = getVal(appForm, 'appFname', 'First Name');
            const lname = getVal(appForm, 'appLname', 'Last Name');
            const email = getVal(appForm, 'appEmail', 'Email');
            const date = getVal(appForm, 'appDate', 'Preferred Date');
            const time = getVal(appForm, 'appTime', 'Preferred Time');
            const service = getVal(appForm, 'appService', 'Service');

            let fullPhone = "";
            if (appPhoneObj) {
                fullPhone = appPhoneObj.getNumber();
            } else {
                fullPhone = getVal(appForm, 'appPhone', 'Phone');
            }

            const whatsappNumber = "918319440047";
            const message = `Namaste Mission Lakshya! 🙏%0A%0AMujhe ek Appointment book karni hai.%0A%0A*Details:*%0AName: ${fname} ${lname}%0AService: ${service}%0ADate: ${date}%0ATime: ${time}%0A%0A*Contact Info:*%0AEmail: ${email}%0APhone: ${fullPhone}`;

            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            appForm.reset();
            closeModal();
        });
    }

    // =========================================
    // 11. ACCORDION LOGIC (TERMS PAGE)
    // =========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const chevron = header.querySelector('.chevron');

            if (body.classList.contains('hidden')) {
                body.classList.remove('hidden');
                body.classList.add('block');
                chevron.classList.add('rotate-180');
            } else {
                body.classList.remove('block');
                body.classList.add('hidden');
                chevron.classList.remove('rotate-180');
            }
        });
    });

});