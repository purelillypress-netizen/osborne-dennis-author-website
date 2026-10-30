(() => {
  function enhanceShop() {
    document.querySelectorAll('a[href="/admin"]').forEach(link => link.remove());

    const contactForm = document.querySelector(".connect-section form:not([data-email-ready])");
    if (contactForm) {
      const form = contactForm.cloneNode(true);
      form.dataset.emailReady = "true";
      const label = form.querySelector("label");
      const email = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      const note = form.querySelector("small");
      if (label) label.textContent = "Your email address";
      if (email) email.placeholder = "you@example.com";
      if (button) button.textContent = "Email Osborne";
      if (note) note.textContent = "Your message opens in your email app and is sent directly to Osborne.";
      const messageLabel = document.createElement("label");
      messageLabel.htmlFor = "contact-message";
      messageLabel.textContent = "How can Osborne help?";
      const message = document.createElement("textarea");
      message.id = "contact-message";
      message.name = "message";
      message.rows = 5;
      message.placeholder = "Tell Osborne about your question, school, church, or event.";
      message.required = true;
      form.insertBefore(messageLabel, form.querySelector("div"));
      form.insertBefore(message, form.querySelector("div"));
      form.addEventListener("submit", event => {
        event.preventDefault();
        const sender = email?.value.trim() || "Not provided";
        const body = `From: ${sender}\n\n${message.value.trim()}`;
        window.location.href = `mailto:321stopbullying@gmail.com?subject=${encodeURIComponent("Website contact for Osborne")}&body=${encodeURIComponent(body)}`;
      });
      contactForm.replaceWith(form);
    }

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
      featuredBooks.innerHTML = `<span>Christopher’s Visit to Heaven</span><span>Christopher vs. the Bully — Coming Soon</span>`;
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
