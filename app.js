/**
 * ==============================================================================
 * DYNAMIC RENDERING & INTERACTION CONTROLLER
 * Powered by PORTFOLIO_DATA in portfolio-data.js
 * ==============================================================================
 */

(function () {
  'use strict';

  // --- Ensure data is loaded ---
  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) {
    console.error("PORTFOLIO_DATA not found. Please ensure portfolio-data.js is loaded first.");
    return;
  }

  // --- Tactile Sound Synthesizer (Zero external dependencies) ---
  let soundEnabled = DATA.themeConfig?.enableTactileSounds ?? true;
  let audioCtx = null;

  function playTactileClick() {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.045);
    } catch (e) {
      // AudioContext unavailable or blocked by browser policy
    }
  }

  // --- Toast Notification Helper ---
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-emerald);">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    playTactileClick();
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Copy to Clipboard Utility ---
  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage || `Copied "${text}" to clipboard!`);
      }).catch(() => fallbackCopy(text, successMessage));
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast(successMessage || `Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast(`Copy failed. Manual value: ${text}`);
    }
    document.body.removeChild(input);
  }

  // --- Theme Management (Light Mode vs Dark Mode) ---
  function initTheme() {
    const savedTheme = localStorage.getItem('mm_portfolio_theme') || DATA.themeConfig?.defaultTheme || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);
  }

  function toggleTheme() {
    playTactileClick();
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mm_portfolio_theme', next);
    updateThemeToggleUI(next);
  }

  function updateThemeToggleUI(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    if (theme === 'dark') {
      btn.setAttribute('title', 'Switch to Light Mode');
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span>Dark Mode</span>
      `;
    } else {
      btn.setAttribute('title', 'Switch to Dark Mode');
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span>Light Mode</span>
      `;
    }
  }

  // --- Sound Toggle Management ---
  function initSoundToggle() {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      btn.classList.toggle('active', soundEnabled);
      btn.setAttribute('title', soundEnabled ? 'Tactile Sound: On' : 'Tactile Sound: Muted');
      if (soundEnabled) {
        playTactileClick();
        showToast('Tactile audio feedback enabled');
      } else {
        showToast('Tactile audio muted');
      }
    });
  }

  // --- Dynamic Hero & Personal Render ---
  function renderHero() {
    // Brand header
    const brandNameEl = document.getElementById('brandName');
    const brandSubEl = document.getElementById('brandSub');
    if (brandNameEl) brandNameEl.textContent = DATA.personal.fullName;
    if (brandSubEl) brandSubEl.textContent = DATA.personal.title;

    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Hero title & bio
    const heroTitle = document.getElementById('heroTitle');
    const heroRole = document.getElementById('heroRole');
    const heroBio = document.getElementById('heroBio');
    const statusPill = document.getElementById('statusPill');

    if (heroTitle) {
      heroTitle.innerHTML = `Hi, I'm <span class="highlight">${DATA.personal.preferredName}</span>.`;
    }
    if (heroRole) {
      heroRole.textContent = DATA.personal.title;
    }
    if (heroBio) {
      heroBio.textContent = DATA.personal.bioShort;
    }
    if (statusPill) {
      statusPill.innerHTML = `
        <span class="status-dot"></span>
        <span>${DATA.personal.badge}</span>
      `;
    }

    // Hero metrics chips
    const heroMetricsStrip = document.getElementById('heroMetricsStrip');
    if (heroMetricsStrip) {
      heroMetricsStrip.innerHTML = `
        <div class="metric-chip">
          <strong>${DATA.personal.yearsExperience}</strong> Experience
        </div>
        <div class="metric-chip">
          <strong>1,000+</strong> RPS Traffic
        </div>
        <div class="metric-chip">
          <strong>80%</strong> Sync Overhead Cut
        </div>
        <div class="metric-chip">
          <strong>${DATA.personal.location}</strong>
        </div>
      `;
    }

    // Social Icon Pills
    const socialPills = document.getElementById('socialPillsRow');
    if (socialPills) {
      socialPills.innerHTML = DATA.socialLinks.map(s => {
        let iconSvg = '';
        if (s.icon === 'github') {
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
        } else if (s.icon === 'linkedin') {
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
        } else if (s.icon === 'mail') {
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
        } else {
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
        }
        return `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="neu-icon-btn" title="${s.name}: ${s.label}">
            ${iconSvg}
          </a>
        `;
      }).join('');
    }
  }

  // --- Clean Profile Card Render ---
  function renderProfileCard() {
    const avatar = document.getElementById('heroAvatarImg');
    const name = document.getElementById('cardFullName');
    const role = document.getElementById('cardRole');
    const comp = document.getElementById('cardCompany');

    if (avatar && DATA.personal?.avatarUrl) avatar.src = DATA.personal.avatarUrl;
    if (name) name.textContent = DATA.personal?.fullName || "Mohit Mehra";
    if (role) role.textContent = DATA.personal?.title || "Software Development Engineer - 2";
    if (comp) comp.textContent = `🏢 ${DATA.personal?.currentCompany || "VFPL Capital"} • ${DATA.personal?.location || "Delhi, India"}`;
  }

  // --- Render Experience Timeline ---
  function renderExperience() {
    const container = document.getElementById('experienceContainer');
    if (!container) return;
    container.innerHTML = (DATA.experience || []).map(exp => `
      <div class="neu-card experience-card">
        <div class="exp-header">
          <div class="exp-role-company">
            <h3 class="exp-role">${exp.role}</h3>
            <div class="exp-company-line">
              <span>${exp.company}</span>
              <span class="exp-location-tag">📍 ${exp.location}</span>
            </div>
          </div>
          <span class="exp-period-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            ${exp.period}
          </span>
        </div>
        <p class="exp-overview">${exp.description}</p>
        <ul class="exp-bullets">
          ${exp.responsibilities.map(r => `
            <li class="exp-bullet-item">
              <span class="bullet-dot"></span>
              <span>${r}</span>
            </li>
          `).join('')}
        </ul>
        <div class="exp-tags-row">
          ${(exp.skillsUsed || []).map(skill => `<span class="neu-tag">${skill}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Render Projects with Category Filtering ---
  let activeProjectFilter = 'all';

  function renderProjects() {
    const filterContainer = document.getElementById('projectsFilterBar');
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const categories = [
      { id: 'all', label: 'All Projects' },
      { id: 'ai', label: 'AI & LLM Tooling' },
      { id: 'fullstack', label: 'Full Stack Apps' },
      { id: 'backend', label: 'Distributed Backend' },
      { id: 'frontend', label: 'Neumorphic UI' }
    ];

    if (filterContainer) {
      filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat.id === activeProjectFilter ? 'active' : ''}" data-filter="${cat.id}">
          ${cat.label}
        </button>
      `).join('');

      filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeProjectFilter = btn.getAttribute('data-filter');
          playTactileClick();
          renderProjects();
        });
      });
    }

    const filtered = (DATA.projects || []).filter(p => {
      if (activeProjectFilter === 'all') return true;
      return p.category === activeProjectFilter;
    });

    grid.innerHTML = filtered.map(p => {
      let iconSvg = '';
      if (p.icon === 'cpu') {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`;
      } else if (p.icon === 'file-text') {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      } else if (p.icon === 'shopping-bag') {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;
      } else if (p.icon === 'film') {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`;
      } else {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`;
      }

      return `
        <div class="neu-card project-card">
          <div class="project-card-header">
            <div class="project-icon-pod">${iconSvg}</div>
            <span class="project-badge">${p.badge}</span>
          </div>

          <div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc" style="margin-top: 10px;">${p.description}</p>
          </div>

          <ul class="project-highlights-list">
            ${(p.highlights || []).map(h => `<li>${h}</li>`).join('')}
          </ul>

          <div class="project-stack">
            ${(p.techStack || []).map(t => `<span class="stack-tag">${t}</span>`).join('')}
          </div>

          <div class="project-footer-links">
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="neu-btn neu-btn-primary project-link-btn">
                <span>Live Demo</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="neu-btn project-link-btn" title="View Source Code">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>Code</span>
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Render Technical Skills Matrix ---
  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;
    grid.innerHTML = (DATA.skillCategories || []).map(cat => `
      <div class="neu-card skill-category-card">
        <div class="category-header">
          <div class="cat-icon-pod">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <h3 class="cat-title">${cat.name}</h3>
        </div>
        <div class="skill-items-list">
          ${cat.skills.map(s => `
            <div class="skill-item">
              <div class="skill-label-row">
                <span>${s.name}</span>
                <span class="skill-pct">${s.level}%</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" style="width: ${s.level}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Render Education & Contact Info ---
  function renderEducationAndContact() {
    // Education Card
    const eduContainer = document.getElementById('educationContainer');
    if (eduContainer) {
      eduContainer.innerHTML = (DATA.education || []).map(edu => `
        <div class="neu-card contact-card" style="margin-bottom: 24px;">
          <div class="category-header">
            <div class="cat-icon-pod">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div>
              <h3 class="cat-title">${edu.degree}</h3>
              <p style="color: var(--text-brand); font-weight: 700; font-size: 0.95rem;">${edu.field}</p>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">
            <span>🏛️ ${edu.institution}</span>
            <span>📅 ${edu.period}</span>
          </div>
          <ul class="project-highlights-list" style="margin-top: 8px;">
            ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    // Direct Contact Methods with Copy Pills
    const contactList = document.getElementById('contactMethodsList');
    if (contactList) {
      contactList.innerHTML = `
        <div class="contact-method-row">
          <div class="contact-method-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <div class="contact-label-val">
              <span class="contact-label-title">Direct Email</span>
              <span class="contact-value-text">${DATA.personal.email}</span>
            </div>
          </div>
          <button class="copy-pill-btn" data-copy="${DATA.personal.email}">Copy</button>
        </div>

        <div class="contact-method-row" style="margin-top: 14px;">
          <div class="contact-method-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <div class="contact-label-val">
              <span class="contact-label-title">Phone / WhatsApp</span>
              <span class="contact-value-text">${DATA.personal.phone}</span>
            </div>
          </div>
          <button class="copy-pill-btn" data-copy="${DATA.personal.phone}">Copy</button>
        </div>

        <div class="contact-method-row" style="margin-top: 14px;">
          <div class="contact-method-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            <div class="contact-label-val">
              <span class="contact-label-title">LinkedIn Profile</span>
              <span class="contact-value-text">mohit-mehra-6ba923227</span>
            </div>
          </div>
          <a href="https://www.linkedin.com/in/mohit-mehra-6ba923227/" target="_blank" rel="noopener noreferrer" class="copy-pill-btn">Open</a>
        </div>
      `;

      // Copy buttons binding
      contactList.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-copy');
          copyTextToClipboard(val, `Copied ${val} to clipboard!`);
        });
      });
    }

    // Contact Form submission handling
    const form = document.getElementById('portfolioContactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        playTactileClick();
        const name = document.getElementById('formName')?.value || 'Friend';
        const email = document.getElementById('formEmail')?.value || '';
        const subject = document.getElementById('formSubject')?.value || 'Inquiry';
        const msg = document.getElementById('formMessage')?.value || '';

        // Form mailto URL
        const mailtoUri = `mailto:${DATA.personal.email}?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${msg}`)}`;
        window.location.href = mailtoUri;
        showToast('Opening default email client with your message...');
        form.reset();
      });
    }
  }

  // --- Render ATS Resume Document in Modal ---
  function renderAtsResumeModal() {
    const docContainer = document.getElementById('resumeDocContainer');
    if (!docContainer) return;

    docContainer.innerHTML = `
      <div class="resume-doc" id="printableResumeDoc">
        <h1>${DATA.personal.fullName}</h1>
        <div class="resume-subtitle">${DATA.personal.title}</div>
        <div class="resume-contact-line">
          ${DATA.personal.location} &nbsp;|&nbsp; 
          <a href="mailto:${DATA.personal.email}">${DATA.personal.email}</a> &nbsp;|&nbsp; 
          <a href="tel:${DATA.personal.phone.replace(/[^0-9+]/g, '')}">${DATA.personal.phone}</a> &nbsp;|&nbsp; 
          <a href="https://www.linkedin.com/in/mohit-mehra-6ba923227/" target="_blank">LinkedIn</a> &nbsp;|&nbsp; 
          <a href="https://github.com/M0hitMehra" target="_blank">GitHub</a>
        </div>

        <h2>Professional Summary</h2>
        <p style="font-size: 0.95rem; line-height: 1.6; color: #374151;">
          ${DATA.personal.bioDetailed}
        </p>

        <h2>Technical Skills</h2>
        <p style="font-size: 0.9rem; line-height: 1.7; color: #374151;">
          <strong>System & API Design:</strong> Low-Level Design (LLD), High-Level Design (HLD), REST API Design, Data Modeling, Microservices, Distributed Systems, Event-Driven Architecture<br/>
          <strong>Back-End & Microservices:</strong> Java, Spring Boot, Node.js, Express.js, Python, FastAPI, Microservices Architecture, Server-Sent Events (SSE)<br/>
          <strong>Databases:</strong> MongoDB, PostgreSQL, SQL, Schema Design, Aggregation Pipelines, Query & Index Optimization, Redis<br/>
          <strong>Messaging & Real-Time:</strong> RabbitMQ, Apache Kafka, Server-Sent Events (SSE)<br/>
          <strong>DevOps & Reliability:</strong> Docker, CI/CD, GitHub Actions, Grafana, Prometheus, Production Troubleshooting<br/>
          <strong>Security:</strong> JWT, OAuth 2.0, Keycloak (SSO), Spring Security, Input Validation<br/>
          <strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, Redux Toolkit<br/>
          <strong>AI Tooling:</strong> Model Context Protocol (MCP) server development, AI-assisted engineering workflows, LangChain, Vector Search
        </p>

        <h2>Professional Experience</h2>
        <div style="margin-bottom: 20px;">
          <h3>Software Development Engineer - 2 (SDE-2)</h3>
          <div class="resume-subline">
            <span>VFPL Capital | Delhi, India</span>
            <span>September 2023 – Present</span>
          </div>
          <ul>
            <li>Design and build scalable, resilient REST APIs and microservices powering customer-facing financial products handling approximately 1,000 requests per second in production, covering authentication, business workflows, and strict validation.</li>
            <li>Architected an asynchronous, event-driven pipeline on RabbitMQ for notifications, PDF generation, and background jobs, cutting synchronous processing overhead by approximately 80% and dramatically improving reliability.</li>
            <li>Designed and built an internal AI tooling platform (Model Context Protocol / MCP server) with a React/TypeScript frontend and Node.js/FastAPI backend, rolling it into VFPL Capital's engineering workflows to enable AI-assisted operations across teams.</li>
            <li>Led a MongoDB performance overhaul (schema redesign, indexing strategy, aggregation pipeline optimization), reducing heavy query execution time from 30 seconds to 10 seconds and common query latency from 100 ms to 20 ms.</li>
            <li>Led investigation and resolution of a critical transaction credit reversion bug, eliminating race conditions and restoring financial consistency after failed unlock operations across the platform.</li>
            <li>Diagnosed and resolved a production authentication outage tied to Keycloak realm configuration, restoring secure access for all users with fortified resilience.</li>
            <li>Implemented secure authentication and authorization (JWT, OAuth 2.0, Keycloak SSO) and robust input validation for services handling sensitive customer and financial data.</li>
            <li>Set up comprehensive monitoring with Grafana and handled incident response to maintain 99.98% production service reliability.</li>
            <li>Containerized microservices with Docker and engineered GitHub Actions CI/CD pipelines for automated testing, building, and zero-downtime deployment.</li>
            <li>Own code quality for the team: run pull request reviews, coordinate task distribution, and mentor junior developers on design, testing, and delivery best practices.</li>
            <li>Drive documentation standards for APIs, architectural decision records (ADRs), and deployment workflows to facilitate long-term maintainability.</li>
          </ul>
        </div>

        <h2>Selected Projects</h2>
        <div style="margin-bottom: 14px;">
          <h3>Model Context Protocol (MCP) Server & AI Chat</h3>
          <div class="resume-subline">
            <span>Tech: Python, FastAPI, LangChain, React.js, TypeScript, SSE, MongoDB, JWT</span>
            <span><a href="https://github.com/M0hitMehra/chat-mcp-fastapi" target="_blank">GitHub</a> | <a href="https://chat-mcp-fastapi.onrender.com/" target="_blank">Live Demo</a></span>
          </div>
          <ul>
            <li>Designed and built a full-stack Model Context Protocol (MCP) server from the ground up, enabling secure, real-time communication between AI LLM tools and client applications.</li>
            <li>Replaced inefficient polling with Server-Sent Events (SSE) for low-latency streaming and high-throughput client-server communication with graceful error recovery.</li>
            <li>Adopted across enterprise engineering workflows for automated developer tasks and real-time database queries.</li>
          </ul>
        </div>

        <div style="margin-bottom: 14px;">
          <h3>RealDocs — Real-Time Collaborative Workspace</h3>
          <div class="resume-subline">
            <span>Tech: Next.js, TypeScript, Supabase, Drizzle ORM, PostgreSQL, shadcn/ui, Tailwind CSS</span>
            <span><a href="https://github.com/M0hitMehra/realdocs" target="_blank">GitHub</a> | <a href="https://realdocs-silk.vercel.app/" target="_blank">Live Demo</a></span>
          </div>
          <ul>
            <li>Architected real-time multi-user document collaboration with live presence, persistent state syncing, and typed data models with Drizzle ORM and Supabase PostgreSQL.</li>
            <li>Crafted responsive, accessible UI components utilizing Tailwind CSS and shadcn/ui with granular workspace security permissions.</li>
          </ul>
        </div>

        <div style="margin-bottom: 14px;">
          <h3>Multi-Store E-Commerce & Admin CMS Platform</h3>
          <div class="resume-subline">
            <span>Tech: Next.js 14, TypeScript, Stripe, Zustand, Headless UI, Tailwind CSS</span>
            <span><a href="https://github.com/M0hitMehra/ecommerceStore-next" target="_blank">GitHub</a> | <a href="https://ecommerce-store-next-six.vercel.app/" target="_blank">Live Demo</a></span>
          </div>
          <ul>
            <li>Engineered multi-tenant admin CMS console managing multiple storefronts, products, categories, and billboards simultaneously.</li>
            <li>Integrated secure Stripe payments with webhook handlers, optimistic order management, and global state sync via Zustand.</li>
          </ul>
        </div>

        <h2>Education</h2>
        <div>
          <h3>Bachelor of Technology (B.Tech) – Computer Science & Engineering</h3>
          <div class="resume-subline">
            <span>Bhagwan Mahaveer Institute of Engineering & Technology</span>
            <span>2019 – 2023</span>
          </div>
          <p style="font-size: 0.9rem; color: #4b5563;">
            Core Coursework: Data Structures, Algorithms, Distributed Systems, Database Management Systems, Computer Networks, Operating Systems.
          </p>
        </div>
      </div>
    `;

    // Modal open / close bindings
    const openBtns = document.querySelectorAll('.open-resume-btn');
    const modalOverlay = document.getElementById('resumeModalOverlay');
    const closeBtn = document.getElementById('closeResumeModalBtn');
    const printBtn = document.getElementById('printResumeBtn');

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        playTactileClick();
        if (modalOverlay) {
          modalOverlay.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (closeBtn && modalOverlay) {
      closeBtn.addEventListener('click', () => {
        playTactileClick();
        modalOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
      });

      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          playTactileClick();
          modalOverlay.classList.remove('open');
          document.body.style.overflow = 'auto';
        }
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        playTactileClick();
        window.print();
      });
    }
  }

  // --- Mobile Navigation Drawer Toggle ---
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        playTactileClick();
        navLinks.classList.toggle('mobile-open');
      });

      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navLinks.classList.remove('mobile-open');
        });
      });
    }
  }

  // --- Main Initialization ---
  function init() {
    initTheme();
    initSoundToggle();
    renderHero();
    renderProfileCard();
    renderExperience();
    renderProjects();
    renderSkills();
    renderEducationAndContact();
    renderAtsResumeModal();
    initMobileNav();

    // Bind theme button
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Attach click sound to all tactile buttons
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.neu-btn, .neu-icon-btn, .pod-toggle-btn, .filter-btn, .copy-pill-btn, .nav-link');
      if (target) {
        playTactileClick();
      }
    });

    console.log("⚡ Mohit Mehra Neumorphic Portfolio Initialized Successfully!");
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
