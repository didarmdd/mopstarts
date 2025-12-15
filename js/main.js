document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X (optional, can add CSS for this later)
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Chat Widget Logic
    const chatPopup = document.querySelector('.chat-popup');
    const chatBtn = document.querySelector('.chat-btn');
    const chatClose = document.querySelector('.chat-close');

    if (chatPopup && chatBtn) {
        // Show popup after 2 seconds (Only if NOT on contact page)
        if (!window.location.pathname.includes('/contact/')) {
            setTimeout(() => {
                chatPopup.classList.add('active');
            }, 2000);
        }

        // Toggle popup on button click
        chatBtn.addEventListener('click', () => {
            chatPopup.classList.toggle('active');
        });

        // Close button
        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the toggle
                chatPopup.classList.remove('active');
            });
        }
    }

    // Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;

        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target;
                    // Add '+' if needed
                    if (stat.getAttribute('data-plus') === 'true') {
                        stat.innerText += '+';
                    }
                }
            };
            updateCount();
        });
        hasAnimated = true;
    }

    // Trigger animation when stats section is in view
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
            }
        });
        observer.observe(statsSection);
    }
});

// --- Quote Wizard Logic ---
// Global counter function
window.updateCounter = function (id, change) {
    const input = document.getElementById(id);
    if (!input) return;
    let value = parseInt(input.value);
    value += change;
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    input.value = value;
};

document.addEventListener('DOMContentLoaded', () => {
    const wizard = document.getElementById('quoteWizard');
    if (!wizard) return;

    const steps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.step');
    const progressBar = document.getElementById('progressBar');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitWizardBtn');
    let currentStep = 0;

    // Helper: Hide all inputs in a container so they don't block validation
    function setInputsDisabled(container, disabled) {
        const inputs = container.querySelectorAll('input, select, textarea, button');
        inputs.forEach(el => el.disabled = disabled);
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });

        // Update Progress Bar
        const progress = ((stepIndex + 1) / steps.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Update Indicators
        progressSteps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Buttons
        prevBtn.style.display = stepIndex === 0 ? 'none' : 'inline-block';

        if (stepIndex === steps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }

        // --- DYNAMIC LOGIC HOOKS ---
        // Run logic when entering specific steps
        if (stepIndex === 1) setupStep2();
        if (stepIndex === 2) setupStep3();
        if (stepIndex === 3) setupStep4();
    }

    function getServiceType() {
        const checked = document.querySelector('input[name="service_type"]:checked');
        return checked ? checked.value : 'Residential';
    }

    // Step 2 Logic: Show correct size inputs (Bed/Bath vs SQM)
    function setupStep2() {
        const serviceType = getServiceType();
        const bedEntry = document.getElementById('size-bedrooms');
        const bathEntry = document.getElementById('size-bathrooms');
        const sqmEntry = document.getElementById('size-sqm');

        if (serviceType === 'Commercial') {
            // Show SQM, Hide Bed/Bath
            bedEntry.style.display = 'none';
            setInputsDisabled(bedEntry, true); // disable inputs inside

            bathEntry.style.display = 'none';
            setInputsDisabled(bathEntry, true);

            sqmEntry.style.display = 'block';
            setInputsDisabled(sqmEntry, false);
        } else {
            // Show Bed/Bath, Hide SQM
            bedEntry.style.display = 'block';
            setInputsDisabled(bedEntry, false);

            bathEntry.style.display = 'block';
            setInputsDisabled(bathEntry, false);

            sqmEntry.style.display = 'none';
            setInputsDisabled(sqmEntry, true);
        }
    }

    // Step 3 Logic: Show correct details block
    function setupStep3() {
        const serviceType = getServiceType();

        // Block IDs
        const blocks = {
            'Residential': document.getElementById('details-residential'),
            'Commercial': document.getElementById('details-commercial'),
            'Move In/Out': document.getElementById('details-move'),
            'Deep Clean': document.getElementById('details-deep')
        };

        // Hide all first
        Object.values(blocks).forEach(block => {
            if (block) {
                block.style.display = 'none';
                setInputsDisabled(block, true);
            }
        });

        // Show selected
        const activeBlock = blocks[serviceType];
        if (activeBlock) {
            activeBlock.style.display = 'block';
            setInputsDisabled(activeBlock, false);
        }
    }

    // Step 4 Logic: Customize Frequency
    function setupStep4() {
        const serviceType = getServiceType();
        const freqSelect = document.getElementById('finalFrequency');

        // Clear options
        freqSelect.innerHTML = '';

        let options = [];

        if (serviceType === 'Commercial') {
            options = [
                { val: 'Daily', text: 'Daily' },
                { val: 'Weekly', text: 'Weekly' },
                { val: 'Fortnightly', text: 'Fortnightly' },
                { val: 'Custom', text: 'Custom Schedule' }
            ];
        } else if (serviceType === 'Residential') {
            options = [
                { val: 'Weekly', text: 'Weekly (Save 20%)' },
                { val: 'Fortnightly', text: 'Fortnightly (Save 15%)' },
                { val: 'Monthly', text: 'Monthly (Save 10%)' },
                { val: 'One-off', text: 'One-off Clean' }
            ];
        } else {
            // Move In/Out & Deep Clean usually Just Once
            options = [
                { val: 'One-off', text: 'One-off Clean' },
                { val: 'Weekly', text: 'Weekly onwards' }
            ];
        }

        options.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.val;
            el.text = opt.text;
            freqSelect.appendChild(el);
        });
    }

    function validateStep(stepIndex) {
        console.log("Validating step:", stepIndex);
        const currentStepEl = steps[stepIndex];
        // Only validate enabled inputs
        const requiredInputs = currentStepEl.querySelectorAll('input[required]:not(:disabled), select[required]:not(:disabled), textarea[required]:not(:disabled)');

        let isValid = true;
        requiredInputs.forEach(input => {
            console.log("Checking input:", input.name, "Value:", input.value, "Disabled:", input.disabled);
            if (!input.value) {
                console.log("Validation failed for:", input.name);
                isValid = false;
                input.style.borderColor = 'red';
                // Remove error styling on change
                input.addEventListener('input', () => {
                    input.style.borderColor = '#ddd';
                }, { once: true });
            }
        });
        console.log("Step valid:", isValid);
        return isValid;
    }

    // Unified Next Handler
    function handleNext(e) {
        // Prevent double firing on some devices
        if (e.type === 'touchend') {
            e.preventDefault();
        }

        console.log("Next button triggered via:", e.type);

        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        } else {
            console.log("Validation failed.");
            // Optional: Shake animation or visual cue
            const activeStep = document.querySelector('.wizard-step.active');
            activeStep.classList.add('shake');
            setTimeout(() => activeStep.classList.remove('shake'), 500);

            // Helpful alert for mobile users who might miss the red borders
            // alert("Please select an option to continue."); 
        }
    }

    // Add listeners for both touch and click
    nextBtn.addEventListener('click', handleNext);
    nextBtn.addEventListener('touchend', handleNext);

    prevBtn.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });

    // Form Submission
    wizard.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        const originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        try {
            const formData = new FormData(wizard);
            const response = await fetch(wizard.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                document.querySelector('.wizard-container').innerHTML = `
                    <div class="success-card" style="text-align: center; padding: 3rem 1.5rem;">
                        <div style="
                            width: 80px; 
                            height: 80px; 
                            background: #e8f5e9; 
                            border-radius: 50%; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            margin: 0 auto 1.5rem auto;
                            color: #2e7d32;
                            font-size: 2.5rem;
                            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                        ">
                            ✓
                        </div>
                        <h3 style="margin-bottom: 0.5rem; color: #2c3e50;">Request Received!</h3>
                        <p style="color: #666; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">
                            Thanks <strong>${formData.get('name')}</strong>! We've received your details.<br>
                            Our team will review your request and send you a custom quote shortly.
                        </p>
                        <a href="/" class="btn btn-primary" style="
                            padding: 12px 30px; 
                            border-radius: 50px; 
                            text-decoration: none; 
                            display: inline-block;
                            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
                        ">Return Home</a>
                    </div>
                `;
            } else {
                throw new Error('Failed');
            }
        } catch (error) {
            alert('Something went wrong. Please try again or email us directly.');
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });

    // Initialize
    showStep(0);
});
