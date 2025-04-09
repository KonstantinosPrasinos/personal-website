let selectedNavigationElement = document.getElementById('about-button');

const selectNavigationButton = (eventTarget) => {
  if (!eventTarget.classList.contains('selected')) {
    eventTarget.classList.add('selected');
    selectedNavigationElement.classList.remove('selected');

    selectedNavigationElement = eventTarget;
  }
}

const navigationButtonClicked = (event) => {
  const eventTarget = event.currentTarget;

  selectNavigationButton(eventTarget);
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
document.getElementById('contact-button').onclick = navigationButtonClicked;

const sectionTitleButtonClicked = (event) => {
  if (!navigator || !navigator.clipboard) return;
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
document.getElementById('contact-section-title').onclick = sectionTitleButtonClicked;

window.addEventListener('load', () => {
  const hash = window.location.hash;

  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

document.getElementById('taskflow-button').addEventListener('click', function() {
  window.open('https://github.com/KonstantinosPrasinos/taskflow', '_blank');
});

document.getElementById('tabme-button').addEventListener('click', function() {
  window.open('https://tabme.app/');
});

const sections = document.querySelectorAll('section');

const viewportOffset = window.innerHeight / 3;
const buttons = document.querySelectorAll('.navigation-button');

function updateActiveButtonOnScroll() {
  const scrollY = window.scrollY;
  let closestSectionId = null;
  let minDistance = Infinity;
  let newSelectedButton = null;

  if (scrollY < 40 ) { // 40 is top margin
    selectNavigationButton(buttons[0]);
    return;
  }

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const distance = Math.abs(sectionTop - (scrollY + viewportOffset));

    if (distance < minDistance) {
      minDistance = distance;
      closestSectionId = section.id;
    }
  });

  if (closestSectionId) {
    buttons.forEach(button => {
      // Derive the expected section ID from the button's ID
      const expectedSectionId = button.id.replace('-button', '');
      if (expectedSectionId === closestSectionId && button !== selectedNavigationElement) {
        newSelectedButton = button;
      }
    });

    if (newSelectedButton) {
      selectNavigationButton(newSelectedButton);
    }
  } else if (scrollY === 0 && sections.length > 0 && buttons.length > 0) {
    // Special handling for the very top (assuming the first button relates to the first section)
    const firstButtonExpectedSectionId = buttons[0].id.replace('-button', '');
    if (sections[0] && sections[0].id === firstButtonExpectedSectionId && buttons[0] !== selectedNavigationElement) {
      selectNavigationButton(buttons[0]);
    }
  }
}

// Update active button on scroll
window.addEventListener('scroll', updateActiveButtonOnScroll);
