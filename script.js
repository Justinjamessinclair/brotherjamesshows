(() => {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pubhtml';
  const signupForm = document.getElementById('signup-form');
  const postSignup = document.getElementById('post-signup');
  const showSetlistBtn = document.getElementById('show-setlist');
  const setlistContainer = document.getElementById('setlist-container');
  const loadingIndicator = document.getElementById('setlist-loading');
  const concertInfo = document.getElementById('concert-info');
  const setlistEl = document.getElementById('setlist');
  const feedbackForm = document.getElementById('feedback-form');
  const heroSection = document.querySelector('.hero');

  const exampleSongs = [
    { title:'Song One', lyrics:'Lyrics for Song One…' },
    { title:'Song Two', lyrics:'Lyrics for Song Two…' },
    { title:'Song Three', lyrics:'Lyrics for Song Three…' },
    { title:'Song Four', lyrics:'Lyrics for Song Four…' },
    { title:'Song Five', lyrics:'Lyrics for Song Five…' }
  ];

  function toggle(element, show = true) {
    element.classList[show ? 'remove' : 'add']('hidden');
  }

  signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    
    // Validate required fields
    const name = signupForm.querySelector('#name').value.trim();
    const email = signupForm.querySelector('#email').value.trim();
    const zip = signupForm.querySelector('#zip').value.trim();
    
    // Check required fields
    if (!name || !email || !zip) {
      alert('Please fill out all fields');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Validate zip code format (5 digits)
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
      alert('Please enter a valid 5-digit zip code');
      return;
    }
    
    const formData = new FormData(signupForm);
    const payload = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      zip: formData.get('zip').trim()
    };
    
    try {
      signupForm.querySelector('button').disabled = true;
      // TODO: replace URL with your mailing-list API endpoint
      /*
      await fetch('https://api.yoursite.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      */
      toggle(signupForm, false);
      toggle(postSignup, true);
      toggle(heroSection, false);
    } catch (err) {
      alert('Sorry, something went wrong. Please try again.');
      console.error(err);
      signupForm.querySelector('button').disabled = false;
    }
  });

  showSetlistBtn.addEventListener('click', () => {
    setlistContainer.classList.toggle('hidden');
    setlistEl.innerHTML = '';
    exampleSongs.forEach(song => {
      const li = document.createElement('li');
      li.textContent = song.title;

      li.addEventListener('click', () => {
        const next = li.nextElementSibling;
        const isOpen = next && next.classList.contains('lyrics');
        // close any open lyrics + active state
        document.querySelectorAll('.lyrics').forEach(el => el.remove());
        document.querySelectorAll('#setlist li.active').forEach(el => el.classList.remove('active'));

        if (!isOpen) {
          li.classList.add('active');
          const panel = document.createElement('div');
          panel.className = 'lyrics';
          panel.textContent = song.lyrics;
          // clicking on lyrics also closes it
          panel.addEventListener('click', () => {
            panel.remove();
            li.classList.remove('active');
          });
          li.after(panel);
        }
      });

      setlistEl.append(li);
    });
  });

  feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = new FormData(feedbackForm).get('feedback').trim();
    if (!text) return;
    window.location.href = `mailto:justinsinclairsongs@gmail.com?subject=Post-Concert%Thoughts&body=${encodeURIComponent(text)}`;
  });
})();