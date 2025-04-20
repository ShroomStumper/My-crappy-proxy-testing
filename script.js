const urlForm = document.getElementById('url-form');
const urlInput = document.getElementById('url-input');
const proxyIframe = document.getElementById('proxy-iframe');
const panicButton = document.getElementById('panic-button');
const iconSelect = document.getElementById('icon-select');
const invisibleButton = document.getElementById('invisible-button');
const encryptToggle = document.getElementById('encrypt-toggle');
const proxySelect = document.getElementById('proxy-select');
const rotateUAButton = document.getElementById('rotate-ua');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

let encryptionEnabled = false;
let originalTitle = document.title;
let originalIcon = document.querySelector('link[rel="icon"]');

// Function to update the iframe source
function loadUrl(url) {
    let targetUrl = url;
    if (encryptionEnabled) {
        // Implement encryption here (client-side or server-side)
        // For simplicity, we'll just encode the URL for now
        targetUrl = btoa(url);
    }
    proxyIframe.src = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
}

// Initial load
loadUrl(urlInput.value);

// URL form submission
urlForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loadUrl(urlInput.value);
});

// Tab navigation
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Panic button
panicButton.addEventListener('click', () => {
    document.title = "Important Document";
    if (originalIcon) {
        originalIcon.remove();
    }
    const newIcon = document.createElement('link');
    newIcon.rel = 'icon';
    newIcon.href = 'document_icon.png'; // Replace with a real icon
    newIcon.type = 'image/png';
    document.head.appendChild(newIcon);
});

// Icon select
iconSelect.addEventListener('change', () => {
    if (originalIcon) {
        originalIcon.remove();
    }
    const newIcon = document.createElement('link');
    newIcon.rel = 'icon';
    newIcon.type = 'image/png';
    if (iconSelect.value === 'document') {
        newIcon.href = 'document_icon.png'; // Replace with a real icon
        document.title = "Important Document";
    } else if (iconSelect.value === 'work') {
        newIcon.href = 'work_icon.png'; // Replace with a real icon
        document.title = "Work Files";
    } else {
        newIcon.href = 'icon.png'; // Original icon
        document.title = originalTitle;
        document.head.appendChild(originalIcon);
    }
    document.head.appendChild(newIcon);
});

// Invisible button (experimental)
invisibleButton.addEventListener('click', () => {
    document.visibilityState = 'hidden';
    document.style.display = 'none';
});

// Encryption toggle
encryptToggle.addEventListener('click', () => {
    encryptionEnabled = !encryptionEnabled;
    encryptToggle.textContent = encryptionEnabled ? 'Disable Encryption' : 'Enable Encryption';
    loadUrl(urlInput.value);
});

// Proxy select
proxySelect.addEventListener('change', () => {
    // Implement proxy switching logic here (requires backend changes)
    console.log('Selected proxy:', proxySelect.value);
});

// User-Agent rotation
rotateUAButton.addEventListener('click', () => {
    // Implement User-Agent rotation (requires backend changes)
    console.log('Rotating User-Agent');
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
