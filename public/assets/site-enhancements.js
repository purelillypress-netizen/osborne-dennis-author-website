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
        } catch { note.textContent = 'Your message could not be submitted. Please try again, or email osbournedennisjrbooks@gmail.com.'; }
        finally {button.disabled=false; button.textContent='Send message';}
      });
      contactForm.replaceWith(form);
    }
    document.querySelectorAll('a[href="mailto:321stopbullying@gmail.com"]').forEach(link => {link.href='mailto:osbournedennisjrbooks@gmail.com';link.textContent='osbournedennisjrbooks@gmail.com';});
    const printCard = [...document.querySelectorAll('#shop .merch-card')].find(card => card.textContent.includes('Christopher vs. the Bully'));
    if(printCard && !printCard.dataset.formatClarified){printCard.dataset.formatClarified='true';printCard.querySelector('small').textContent='Paperback — Coming Soon';}
    const bookCopy = document.querySelector('.carousel-copy');
    if(bookCopy?.querySelector('h3')?.textContent.includes('Bully')) {
      const fmt=bookCopy.querySelector('.book-format');if(fmt && fmt.textContent!=='Paperback — Coming Soon')fmt.textContent='Paperback — Coming Soon';
      const note=[...bookCopy.children].find(el=>el.tagName==='P' && !el.classList.contains('book-format'));
      const copy='A story that helps children speak life, show love, and stand against bullying. EPUB $8.99; print edition coming soon.';
      if(note && note.textContent!==copy)note.textContent=copy;
    }
    const shopIntro=document.querySelector('#shop .section-heading > p:last-child');
    const intro='Explore both Christopher EPUB editions for $8.99 each below. Order the Visit to Heaven paperback from Barnes & Noble; the Bully print edition is coming soon.';
    if(shopIntro && shopIntro.textContent!==intro)shopIntro.textContent=intro;
    document.querySelectorAll('.carousel-shelf button span, .about-copy em').forEach(el=>{if(el.textContent.includes('Bully')&&el.textContent.includes('Coming Soon'))el.textContent='Christopher vs. the Bully (EPUB $8.99; print coming soon)';});
    const shop = document.querySelector('#shop');
    if (shop && !document.querySelector('#ebook-shop')) {
      const ebooks=document.createElement('section'); ebooks.id='ebook-shop'; ebooks.className='section';
      ebooks.innerHTML=`<div class="section-heading"><p class="eyebrow">Digital editions</p><h2>Read Christopher’s stories as EPUBs.</h2><p>Choose your ebook for $8.99. Printed books are sold separately.</p></div>
      <div class="merch-grid ebook-grid">
      <article class="merch-card"><div class="merch-image"><img src="/christophers-visit-cover.png" alt="Christopher’s Visit to Heaven cover"></div><small>EPUB ebook</small><h3>Christopher’s Visit to Heaven</h3><p><strong>$8.99</strong></p><a class="retailer-link" href="#connect" data-ebook-order="Christopher’s Visit to Heaven">Contact to purchase EPUB</a></article>
      <article class="merch-card"><div class="merch-image"><img src="/christopher-vs-bully-cover.png" alt="Christopher vs. the Bully cover"></div><small>EPUB ebook</small><h3>Christopher vs. the Bully</h3><p><strong>$8.99</strong></p><p>Print edition coming soon.</p><a class="retailer-link" href="#connect" data-ebook-order="Christopher vs. the Bully">Contact to purchase EPUB</a></article></div>
      <div class="ebook-instructions"><h3>How to read your ebook</h3><ol><li>Contact Osborne to arrange payment and delivery while online checkout is being connected.</li><li>Download the EPUB file and save a copy on your device.</li><li>Import it into an EPUB-compatible reading app. These illustrated books use fixed layouts, so use a reader that supports fixed-layout EPUBs.</li><li>Once downloaded, the book is yours to keep in your reader.</li></ol><p>Automatic PayPal checkout and 24-hour download links are being connected. No payment is collected by this contact form.</p></div>`;
      shop.after(ebooks);
      ebooks.querySelectorAll('[data-ebook-order]').forEach(link=>link.addEventListener('click',()=>{const field=document.querySelector('#contact-message');if(field){field.value='I would like to purchase the '+link.dataset.ebookOrder+' EPUB for $8.99. Please send payment and download instructions.';field.focus();}}));
    }
    const carousel = document.querySelector('.carousel-copy');
    if(carousel && !carousel.querySelector('[data-ebook-link]')) {const a=document.createElement('a');a.href='#ebook-shop';a.dataset.ebookLink='true';a.className='retailer-link';a.textContent='EPUB editions — $8.99 each';carousel.append(a);}

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
      featuredBooks.innerHTML = `<span>Christopher’s Visit to Heaven</span><span>Christopher vs. the Bully — EPUB $8.99; print coming soon</span>`;
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
