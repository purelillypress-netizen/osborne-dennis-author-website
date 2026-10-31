(() => {
  function enhanceShop() {
    document.querySelectorAll('a[href="/admin"]').forEach(link => link.remove());

    const contactForm = document.querySelector('.connect-section form:not([data-contact-ready])');
    if (contactForm) {
      const form = document.createElement('form');
      form.dataset.contactReady = 'true';
      form.name = 'author-contact'; form.method = 'POST'; form.action = '/';
      form.innerHTML = `<input type="hidden" name="form-name" value="author-contact">
        <p hidden><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <label for="contact-email">Your email address</label>
        <input id="contact-email" type="email" name="email" autocomplete="email" placeholder="you@example.com" maxlength="254" required>
        <label for="contact-message">How can Osborne help?</label>
        <textarea id="contact-message" name="message" rows="5" maxlength="10000" placeholder="Your question, book order, school, church, or event." required></textarea>
        <button type="submit">Send message</button>
        <small role="status" aria-live="polite">Send your message here without opening an email app.</small>`;
      form.addEventListener('submit', async event => {
        event.preventDefault(); if (!form.reportValidity()) return;
        const message = form.elements.message; message.value = message.value.trim();
        if (!message.value) { message.setCustomValidity('Please enter a message.'); message.reportValidity(); message.addEventListener('input', () => message.setCustomValidity(''), {once:true}); return; }
        const button = form.querySelector('button'); const note = form.querySelector('small');
        button.disabled = true; button.textContent = 'Sending…'; note.textContent = 'Sending your message…';
        try {
          const response = await fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(new FormData(form)).toString()});
          if (!response.ok) throw new Error('Submission failed');
          form.reset(); note.textContent = 'Thank you! Your message has been received.';
        } catch { note.textContent = 'Your message could not be submitted. Please try again, or email 321stopbullying@gmail.com.'; }
        finally {button.disabled=false; button.textContent='Send message';}
      });
      contactForm.replaceWith(form);
    }
    const printCard = [...document.querySelectorAll('#shop .merch-card')].find(card => card.textContent.includes('Christopher vs. the Bully'));
    if(printCard && !printCard.dataset.formatClarified){printCard.dataset.formatClarified='true';printCard.querySelector('small').textContent='Paperback — Coming Soon';}
    const heavenPrint = [...document.querySelectorAll('#shop .merch-card')].find(card => card.textContent.includes('Christopher’s Visit to Heaven'));
    if(heavenPrint && !heavenPrint.querySelector('[data-paperback-price]')) {
      const price=document.createElement('p');price.dataset.paperbackPrice='true';price.innerHTML='<strong>$18.99</strong><br><small>Paperback · Barnes &amp; Noble price</small>';
      const link=heavenPrint.querySelector('a');if(link)heavenPrint.insertBefore(price,link);else heavenPrint.append(price);
    }
    const bookCopy = document.querySelector('.carousel-copy');
    if(bookCopy?.querySelector('h3')?.textContent.includes('Bully')) {
      const fmt=bookCopy.querySelector('.book-format');if(fmt && fmt.textContent!=='Paperback — Coming Soon')fmt.textContent='Paperback — Coming Soon';
      const note=[...bookCopy.children].find(el=>el.tagName==='P' && !el.classList.contains('book-format'));
      const copy='A story that helps children speak life, show love, and stand against bullying. Paperback edition coming soon.';
      if(note && note.textContent!==copy)note.textContent=copy;
    }
    const shopIntro=document.querySelector('#shop .section-heading > p:last-child');
    const intro='Order Christopher’s Visit to Heaven in paperback for $18.99 from Barnes & Noble. Christopher vs. the Bully paperback is coming soon.';
    if(shopIntro && shopIntro.textContent!==intro)shopIntro.textContent=intro;
    document.querySelectorAll('.carousel-shelf button span, .about-copy em').forEach(el=>{if(el.textContent.includes('Bully')&&el.textContent.includes('Coming Soon')){const label='Christopher vs. the Bully (paperback coming soon)';if(el.textContent!==label)el.textContent=label;};});
    const speaker = document.querySelector(".mission-number img");
    if (speaker && !speaker.dataset.smileUpdated) {
      speaker.src = "/community-speaker.jpg";
      speaker.alt = "Osborne E. Dennis Jr. smiling slightly while recording a 321 Stop Bullying message";
      speaker.dataset.smileUpdated = "true";
    }

    const donation = document.querySelector(".donate-card > div");
    if (donation && !donation.dataset.messageExpanded) {
      const title = donation.querySelector("strong");
      const message = donation.querySelector("span");
      if (title) title.textContent = "Help a child stand taller.";
      if (message) message.textContent = "Your support helps provide backpacks, school supplies, and fun wear that children can enjoy with pride. Every gift supports Osborne’s effort to nurture a new culture of love, kindness, generosity, and goodwill among kids—equipping them for school while encouraging them to speak life, show love, and stand together.";
      donation.dataset.messageExpanded = "true";
    }

    const featuredBooks = document.querySelector(".portrait-caption strong");
    if (featuredBooks && !featuredBooks.dataset.titlesStacked) {
      featuredBooks.innerHTML = `<span>Christopher’s Visit to Heaven</span><span>Christopher vs. the Bully — paperback coming soon</span>`;
      featuredBooks.dataset.titlesStacked = "true";
    }

    const gallery = document.querySelector(".community-grid");
    if (gallery && !document.querySelector(".community-osborne-outdoors")) {
      const photo = document.createElement("figure");
      photo.className = "community-photo community-osborne-outdoors";
      photo.innerHTML = `<img class="portrait-top" src="/community-osborne-outdoors.png" alt="Osborne E. Dennis Jr. standing outdoors"><figcaption>Osborne E. Dennis, Jr.—author, minister, and advocate for children.</figcaption>`;
      gallery.append(photo);
    }

    if (gallery && !document.querySelector(".community-logo")) {
      const logo = document.createElement("figure");
      logo.className = "community-logo";
      logo.setAttribute("aria-label", "Speak Life 321: words, actions, brighter days");
      logo.innerHTML = `<img src="/speak-life-321-logo.png" alt="Speak Life 321 logo: speak life, show love, and stand together against bullying">`;
      const outdoors = gallery.querySelector(".community-osborne-outdoors");
      gallery.insertBefore(logo, outdoors);
    }

    if (gallery && !document.querySelector(".community-blue-suit")) {
      const portrait = document.createElement("figure");
      portrait.className = "community-photo community-blue-suit";
      portrait.innerHTML = `<img src="/osborne-blue-suit-book.png" alt="Osborne E. Dennis Jr. outdoors in a blue suit holding Christopher’s Visit to Heaven"><figcaption>Sharing stories of faith, hope, and courage with children and families.</figcaption>`;
      const logo = gallery.querySelector(".community-logo");
      gallery.insertBefore(portrait, logo);
    }
  }

  const observer = new MutationObserver(enhanceShop);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", enhanceShop);
  setTimeout(enhanceShop, 0);
})();
