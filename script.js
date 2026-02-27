const areas = document.querySelectorAll('area');
const infoBox = document.getElementById('infoBox');
const infoImage = document.getElementById('infoImage');
const infoDescription = document.getElementById('infoDescription');
const moreText = document.querySelector('.more-text');
const readMoreBtn = document.querySelector('.read-more-btn');
const infoLink = document.getElementById('infoLink');
const closeBtn = document.getElementById('closeInfoBox'); // The close button is a span

let infoBoxTimeout;

// Ensure the close button exists before adding an event listener
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    infoBox.style.display = 'none';
    clearTimeout(infoBoxTimeout);
  });
} else {
  console.log("Close button not found");
}

areas.forEach(area => {
  area.addEventListener('click', e => {
    e.preventDefault();

    const image = area.dataset.image;
    const description = area.dataset.description;
    const more = area.dataset.moreText;
    const instrument = area.dataset.instrument;
    const link = area.href;

    infoImage.src = image;
    infoDescription.innerHTML = `<strong>${instrument}:</strong> ${description}`;
    moreText.textContent = more;
    infoLink.href = link;

    // Correct position relative to map container
    const mapContainer = document.querySelector('.map-container');
    const mapRect = mapContainer.getBoundingClientRect();

    const clickX = e.clientX - mapRect.left;
    const clickY = e.clientY - mapRect.top;

    infoBox.style.position = 'absolute';
    infoBox.style.top = `${clickY + 10}px`;
    infoBox.style.left = `${clickX + 10}px`;
    infoBox.style.display = 'block';

    clearTimeout(infoBoxTimeout);
    infoBoxTimeout = setTimeout(() => {
      infoBox.style.display = 'none';
    }, 60000); // Hide after 60 sec
  });
});

infoBox.addEventListener('mouseover', () => {
  clearTimeout(infoBoxTimeout);
});

infoBox.addEventListener('mouseout', () => {
  infoBoxTimeout = setTimeout(() => {
    infoBox.style.display = 'none';
  }, 60000);
});

readMoreBtn.addEventListener('click', () => {
  moreText.style.display = moreText.style.display === 'none' ? 'block' : 'none';
  window.location.href = infoLink.href;
});
