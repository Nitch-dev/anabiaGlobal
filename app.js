// Active Core State
const jobDb = [
    { id: 1, title: 'Traila Driver ', country: 'Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, Bahrain', type: 'Full-Time', site: 'On Site', desc: '' },
    { id: 1, title: 'Ltv Driver ', country: 'Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, Bahrain', type: 'Full-Time', site: 'On Site', desc: '' },
    { id: 1, title: 'Bus Driver ', country: 'Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, Bahrain', type: 'Full-Time', site: 'On Site', desc: '' },
    { id: 1, title: 'Malysia Hotel Work ', country: 'Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, Bahrain', type: 'Full-Time', site: 'On Site', desc: '' },
    { id: 1, title: 'Crane Operators  ', country: 'Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, Bahrain', type: 'Full-Time', site: 'On Site', desc: '' },
    { id: 1, title: 'Civil Work ', country: 'Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, Bahrain', type: 'Full-Time', site: 'On Site', desc: '' },
    
];

document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Particle Background System ---
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connection webs
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();


    // --- Single Page Routing Logic ---
    const navTriggers = document.querySelectorAll('.spa-trigger');
    const views = document.querySelectorAll('.spa-view');
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');

    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');
            
            // Switch active view container
            views.forEach(view => view.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            // Switch Nav Link State styling
            navTriggers.forEach(t => t.classList.remove('active'));
            document.querySelectorAll(`[data-target="${targetId}"]`).forEach(el => el.classList.add('active'));

            // Collapse Mobile Navigation Panel
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            }

            // Return browser window position to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Mobile Hamburger Actions
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
    }


    // --- Accordion Controls (Policies Sub-sections) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            const isOpen = content.style.display === 'block';
            
            document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
            document.querySelectorAll('.accordion-header i').forEach(i => i.className = 'fa-solid fa-chevron-down');

            if (!isOpen) {
                content.style.display = 'block';
                icon.className = 'fa-solid fa-chevron-up';
            }
        });
    });


    // --- Jobs Listing Renderer and Search Engine ---
    const searchInput = document.getElementById('jobSearch');
    const countryFilter = document.getElementById('countryFilter');
    const jobsContainer = document.getElementById('jobsContainer');

    function renderJobs(filteredList) {
        jobsContainer.innerHTML = '';
        if (filteredList.length === 0) {
            jobsContainer.innerHTML = `<div class="job-card" style="justify-content: center;"><p style="color: var(--text-muted)">No active openings matching these filters.</p></div>`;
            return;
        }

        filteredList.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card glow-card';
            card.innerHTML = `
                <div class="job-details">
                    <h3>${job.title}</h3>
                    <div class="job-meta">
                        <span><i class="fa-solid fa-location-dot"></i> ${job.country}</span>
                        <span><i class="fa-solid fa-briefcase"></i> ${job.type}</span>
                        <span><i class="fa-solid fa-user-check"></i> ${job.site}</span>
                    </div>
                    <p style="margin-top: 12px; color: var(--text-muted); font-size: 0.95rem;">${job.desc}</p>
                </div>
                <button class="btn btn-primary apply-now-btn" data-job="${job.title}">Apply</button>
            `;
            jobsContainer.appendChild(card);
        });

        // Application Click Routing
        document.querySelectorAll('.apply-now-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const jobTitle = btn.getAttribute('data-job');
                
                views.forEach(v => v.classList.remove('active'));
                document.getElementById('contact-view').classList.add('active');
                
                document.getElementById('formType').value = 'Candidate';
                document.getElementById('formMessage').value = `I am submitting an application request to the active vacancy list for: ${jobTitle}.`;
                document.getElementById('fileUploadGroup').style.display = 'block';
                
                window.scrollTo({ top: 300, behavior: 'smooth' });
            });
        });
    }

    const handleFilters = () => {
        const query = searchInput.value.toLowerCase();
        const country = countryFilter.value;

        const results = jobDb.filter(job => {
            const matchesQuery = job.title.toLowerCase().includes(query) || job.desc.toLowerCase().includes(query);
            const matchesCountry = country === 'all' || job.country === country;
            return matchesQuery && matchesCountry;
        });
        renderJobs(results);
    };

    if (searchInput && countryFilter) {
        searchInput.addEventListener('input', handleFilters);
        countryFilter.addEventListener('change', handleFilters);
    }

    renderJobs(jobDb);


    // --- Form Dynamic Fields & Submissions ---
    const formType = document.getElementById('formType');
    const fileUploadGroup = document.getElementById('fileUploadGroup');

    if (formType) {
        formType.addEventListener('change', () => {
            fileUploadGroup.style.display = formType.value === 'Candidate' ? 'block' : 'none';
        });
    }

    // Dynamic Regional Map Panel updates
    const branchItems = document.querySelectorAll('.branch-item');
    const mapAddressText = document.getElementById('mapAddressText');

    branchItems.forEach(item => {
        item.addEventListener('click', () => {
            branchItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const address = item.querySelector('p').innerText;
            const branchName = item.querySelector('h4').innerText;
            mapAddressText.innerHTML = `<strong>Selected Regional Office: ${branchName}</strong><br>${address}`;
        });
    });

    // Submissions Handler mockup
const contactFormMain = document.getElementById('contactFormMain');
    if (contactFormMain) {
        contactFormMain.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract the form details manually from the DOM
            const name = document.getElementById('formName').value;
            const type = document.getElementById('formType').value;
            const rawMessage = document.getElementById('formMessage').value;

            // Target administrative mailbox
            const recipientEmail = "info@anabiaglobal.co"; 
            const emailSubject = `New ${type} Submission from ${name}`;

            // Build a structured, professional plain-text message layout
            const emailBody = `Dear Selection Desk,

A new application/inquiry form has been submitted from the web portal.

==================================================
SUBMISSION DETAILS:
==================================================
Name: ${name}
Profile Type: ${type}
Message/Vacancy details:
${rawMessage}
==================================================

Please process this profile and contact the candidate directly.

Best regards,
Anabia Global Portal Automated Dispatch Desk`;

            // Format strings cleanly for a URL string (escapes spaces, line breaks, etc.)
            const encodedSubject = encodeURIComponent(emailSubject);
            const encodedBody = encodeURIComponent(emailBody);

            // Construct standard mailto link layout
            const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;

            // Open the client's local system mail app instantly
            window.location.href = mailtoUrl;

            // Optional: Reset form fields locally
            contactFormMain.reset();
            if (fileUploadGroup) fileUploadGroup.style.display = 'none';
        });
    }
});


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}