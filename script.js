// ========================================
// TEAM SHIVAA — COMPLETE JAVASCRIPT
// ========================================

// ===== AUDIO CLICK =====
function playClick() {
    try {
        const audio = new Audio('https://dr-fast-upload.pages.dev/public/987a7193e947.aac');
        audio.play().catch(() => {});
    } catch (e) {
        console.log('Audio error:', e);
    }
}

// ========================================
// LOADER
// ========================================

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hide');
    }
    checkLoginStatus();
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('show');
            }
        });
    }
});

// ========================================
// BACK TO TOP
// ========================================

const topBtn = document.getElementById('back-top');
if (topBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });
    
    topBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// ANIMATED COUNTERS
// ========================================

const counters = document.querySelectorAll('.stat-number');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                let count = 0;
                const duration = 2000;
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;
                
                const interval = setInterval(function() {
                    count += increment;
                    if (count >= target) {
                        el.innerText = target;
                        clearInterval(interval);
                    } else {
                        el.innerText = Math.floor(count);
                    }
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(c) {
        counterObserver.observe(c);
    });
}

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let valid = true;
        const name = document.getElementById('cname');
        const email = document.getElementById('cemail');
        const nameErr = document.getElementById('nameError');
        const emailErr = document.getElementById('emailError');
        const successMsg = document.getElementById('formSuccess');
        
        if (nameErr) nameErr.innerText = '';
        if (emailErr) emailErr.innerText = '';
        if (successMsg) successMsg.classList.remove('show');
        
        if (name && name.value.trim().length < 2) {
            if (nameErr) nameErr.innerText = 'Name is required (minimum 2 characters).';
            valid = false;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email.value.trim())) {
            if (emailErr) emailErr.innerText = 'Please enter a valid email address.';
            valid = false;
        }
        
        if (valid) {
            if (successMsg) {
                successMsg.classList.add('show');
                successMsg.innerText = '✓ Message sent successfully!';
            }
            this.reset();
            
            setTimeout(function() {
                if (successMsg) successMsg.classList.remove('show');
            }, 4000);
        }
    });
}

// ========================================
// NEWSLETTER FORM
// ========================================

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input && input.value.trim()) {
            alert('🎉 Thank you for subscribing!');
            this.reset();
        }
    });
}

// ========================================
// RIPPLE EFFECT
// ========================================

document.querySelectorAll('.ripple').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = 'position: absolute; left: ' + x + 'px; top: ' + y + 'px; width: 20px; height: 20px; border-radius: 50%; background: rgba(255,255,255,0.3); transform: scale(0); animation: rippleAnim 0.6s linear; pointer-events: none;';
        this.appendChild(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });
});

// ========================================
// SCROLL REVEAL
// ========================================

const revealElements = document.querySelectorAll('.glass-card, .testimonial-card, .pricing-card, .faq-item, .team-card, .partner-logo');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });
    
    revealElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        revealObserver.observe(el);
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('show');
            }
        }
    });
});

// ========================================
// ✅ LOGIN / LOGOUT SYSTEM (COMPLETE)
// ========================================

// ===== CHECK LOGIN STATUS =====
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    const userPhoto = localStorage.getItem('userPhoto');
    
    console.log('🔍 Login Status:', isLoggedIn, userEmail);
    
    const userNameDisplay = document.getElementById('userNameDisplay');
    const navProfile = document.getElementById('navProfilePhoto');
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const mobileUserInfo = document.getElementById('mobileUserInfo');
    const mobileProfilePhoto = document.getElementById('mobileProfilePhoto');
    const mobileUserName = document.getElementById('mobileUserName');
    
    if (isLoggedIn && userEmail) {
        // ✅ LOGGED IN
        const userName = userEmail.split('@')[0];
        const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);
        
        console.log('✅ Logged in as:', displayName);
        
        if (userNameDisplay) {
            userNameDisplay.textContent = displayName;
            userNameDisplay.style.display = 'inline-block';
        }
        
        if (navProfile) {
            navProfile.src = userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=8B5CF6&color=fff&size=100`;
            navProfile.style.display = 'inline-block';
        }
        
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'inline-block';
        
        if (mobileUserInfo) {
            mobileUserInfo.style.display = 'block';
            if (mobileProfilePhoto) {
                mobileProfilePhoto.src = userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=8B5CF6&color=fff&size=80`;
            }
            if (mobileUserName) {
                mobileUserName.textContent = displayName;
            }
        }
        
        if (getStartedBtn) getStartedBtn.style.display = 'none';
        
    } else {
        // ❌ NOT LOGGED IN
        console.log('❌ Not logged in');
        
        if (getStartedBtn) getStartedBtn.style.display = 'inline-flex';
        if (userNameDisplay) userNameDisplay.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'none';
        if (mobileUserInfo) mobileUserInfo.style.display = 'none';
        if (navProfile) navProfile.style.display = 'none';
    }
}

// ===== TOGGLE LOGOUT BUTTON =====
function toggleLogout() {
    const btn = document.getElementById('logoutBtn');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    console.log('🔍 Toggle logout, isLoggedIn:', isLoggedIn);
    
    if (isLoggedIn) {
        if (btn) {
            if (btn.style.display === 'none' || btn.style.display === '') {
                btn.style.display = 'inline-block';
                console.log('✅ Logout button shown');
            } else {
                btn.style.display = 'none';
                console.log('❌ Logout button hidden');
            }
        }
    } else {
        if (btn) {
            btn.style.display = 'none';
            console.log('❌ Not logged in, logout hidden');
        }
    }
}

// ===== LOGOUT FUNCTION =====
function logoutUser() {
    console.log('🔴 Logging out...');
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhoto');
    
    console.log('✅ Logout successful!');
    console.log('📦 LocalStorage:', localStorage);
    
    window.location.href = 'login.html';
}

// ========================================
// CONSOLE LOG
// ========================================

console.log('✅ TEAM SHIVAA script loaded successfully!');