/* robust script.js for NOVEXA */
(function(){
  'use strict';

  // Safe selector helper
  const $ = (q) => document.querySelector(q);
  const $$ = (q) => Array.from(document.querySelectorAll(q));

  // THEME — load saved theme
  const saved = localStorage.getItem('novexa-theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);

  // Theme toggle button (optional)
  const themeBtn = $('#theme-toggle');
  if(themeBtn){
    themeBtn.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') || 'neon';
      const next = current === 'light' ? 'neon' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('novexa-theme', next);
    });
  }

  // IntersectionObserver for section theme switching
  const sections = document.querySelectorAll('[data-theme]');
  if(sections.length){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const theme = e.target.getAttribute('data-theme') || 'neon';
          document.documentElement.setAttribute('data-theme', theme);
          // logo swap
          const logo = $('#novexa-logo');
          if(logo){
            if(theme === 'light' || theme === 'desert') logo.classList.add('use-black'), logo.classList.remove('use-white');
            else logo.classList.add('use-white'), logo.classList.remove('use-black');
          }
        }
      });
    }, {threshold: 0.45});
    sections.forEach(s=>obs.observe(s));
  }

  // Modal & package buttons
  const openButtons = $$('.select-btn');
  const openModal = function(pkg){
    const modal = $('#novexa-modal');
    if(!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
    const goal = modal.querySelector('input[name="goal"]');
    if(goal && pkg) goal.value = pkg;
  };
  openButtons.forEach(b=> b.addEventListener('click', e=> { e.preventDefault(); openModal(b.dataset.pkg); }));

  const openTop = $('#openModalTop');
  if(openTop) openTop.addEventListener('click', ()=> openModal());

  const closeBtn = $('#novexa-close');
  if(closeBtn) closeBtn.addEventListener('click', ()=>{
    const modal = $('#novexa-modal');
    if(modal) { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
  });

  // Form handling (mailto fallback)
  const intake = $('#novexa-intake');
  if(intake){
    intake.addEventListener('submit', function(e){
      e.preventDefault();
      const fm = new FormData(this);
      const body = encodeURIComponent(
        `Brand/Project: ${fm.get('brand')}\nMain goal: ${fm.get('goal')}\nWebsite: ${fm.get('website')}\nContact: ${fm.get('contact')}`
      );
      const mail = `mailto:novexa.designs@gmail.com?subject=NOVEXA%20Intake&body=${body}`;
      window.location.href = mail;
    });
  }

  // Smooth scroll for internal links
  const scrollBtn = $('#scrollToPackages');
  if(scrollBtn){
    scrollBtn.addEventListener('click', ()=> {
      const el = document.getElementById('packages');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }

  // Button press animation safe
  $$('.btn').forEach(btn=>{
    btn.addEventListener('pointerdown', ()=> btn.style.transform='scale(.98)');
    btn.addEventListener('pointerup', ()=> btn.style.transform='scale(1)');
    btn.addEventListener('pointerleave', ()=> btn.style.transform='scale(1)');
  });

  // Lazy-load images native: ensure images use loading="lazy" in HTML

})(); // end script
