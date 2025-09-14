// js/common.js - shared helpers
(function(){
  // avatar loader: try assets/photo.jpg then placeholder
  const avatar = document.querySelector('.avatar');
  if(avatar){
    const candidates = ['assets/photo.jpg','assets/photo.png','photo.jpg','photo.png'];
    let set=false;
    candidates.forEach(c=>{
      const img = new Image();
      img.onload = ()=>{ if(!set){ avatar.src = c; set=true; } };
      img.onerror = ()=>{};
      img.src = c;
    });
  }

  // dark mode toggle
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  function setDark(d){
    if(d){
      document.body.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  }
  // init
  const saved = localStorage.getItem('theme');
  setDark(saved === 'dark');

  if(toggle){
    toggle.addEventListener('click', ()=>{
      const isDark = document.body.classList.toggle('dark');
      setDark(isDark);
    });
  }

  // contact form handler (mailto)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = contactForm.querySelector('[name=name]').value || 'No name';
      const email = contactForm.querySelector('[name=email]').value || 'no-email';
      const message = contactForm.querySelector('[name=message]').value || '';
      const subject = encodeURIComponent('Website message from ' + name);
      const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:jainrahul52@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
