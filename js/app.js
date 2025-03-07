let selectedNavigationElement = document.getElementById('about-button');

const navigationButtonClicked = (event) => {
  const eventTarget = event.currentTarget;

  if (!eventTarget.classList.contains('selected')) {
    eventTarget.classList.add('selected');
    selectedNavigationElement.classList.remove('selected');

    selectedNavigationElement = eventTarget;
  }

  document.getElementById(`${eventTarget.id.split('-')[0]}`).scrollIntoView({ behavior: 'smooth' });
}

const unmountTooltip = (tooltip) => {
  tooltip.classList.add('fade-out');

  setTimeout(() => {
    tooltip.remove();
  }, 200);
}

const createCopiedTooltip = () => {
  const copiedTooltip = document.createElement('div');
  copiedTooltip.classList.add('copied-tooltip', 'body-regular');
  copiedTooltip.textContent = 'Link copied!';
  return copiedTooltip;
}

document.getElementById('about-button').onclick = navigationButtonClicked;
document.getElementById('education-button').onclick = navigationButtonClicked;
document.getElementById('projects-button').onclick = navigationButtonClicked;

const sectionTitleButtonClicked = (event) => {
  const eventTarget = event.currentTarget;
  const sectionTitle = eventTarget.id.split('-')[0];

  // Create and attach the "Copied" tooltip to the title that is being clicked and unmount it after 2s.
  const copiedTooltip = createCopiedTooltip();
  eventTarget.appendChild(copiedTooltip);

  setTimeout(() => {
    unmountTooltip(copiedTooltip);
  }, 2000);

  navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${sectionTitle}`)
    .catch(err => {
      console.error('Failed to copy:', err);
    });
}

document.getElementById('about-section-title').onclick = sectionTitleButtonClicked;
document.getElementById('education-section-title').onclick = sectionTitleButtonClicked;
document.getElementById('projects-section-title').onclick = sectionTitleButtonClicked;

window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
