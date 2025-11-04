// GreenRoots Enhanced JavaScript with Super Animations and Interactive Tree Map
// =====================================================================

// Global variables
let map,
  treeMarkers = [],
  currentLocation = null;
let typewriterIndex = 0;
let treeData = [];
let animationFrame;

// Quotes for typewriter animation
const quotes = [
  "Every tree planted is a promise to future generations",
  "Be the change you wish to see in the world",
  "The earth does not belong to us; we belong to the earth",
  "In every walk with nature, one receives far more than they seek",
];

// // Sample tree data for Mumbai
// const sampleTreeData = [
//   {
//     id: 1,
//     lat: 19.076,
//     lng: 72.8777,
//     species: "Mango",
//     planter: "Arjun Sharma",
//     date: "2024-10-15",
//     native: true,
//     type: "mature",
//   },
//   {
//     id: 2,
//     lat: 19.0596,
//     lng: 72.8295,
//     species: "Neem",
//     planter: "Priya Patel",
//     date: "2024-10-20",
//     native: true,
//     type: "new",
//   },
//   {
//     id: 3,
//     lat: 19.1176,
//     lng: 72.906,
//     species: "Banyan",
//     planter: "Mumbai Green Club",
//     date: "2024-09-30",
//     native: true,
//     type: "mature",
//   },
//   {
//     id: 4,
//     lat: 19.033,
//     lng: 72.8697,
//     species: "Gulmohar",
//     planter: "Ravi Kumar",
//     date: "2024-10-25",
//     native: false,
//     type: "new",
//   },
//   {
//     id: 5,
//     lat: 19.0825,
//     lng: 72.8428,
//     species: "Coconut",
//     planter: "Coastal Care Team",
//     date: "2024-10-10",
//     native: false,
//     type: "mature",
//   },
//   {
//     id: 6,
//     lat: 19.0544,
//     lng: 72.8326,
//     species: "Neem",
//     planter: "Sneha Joshi",
//     date: "2024-10-28",
//     native: true,
//     type: "new",
//   },
//   {
//     id: 7,
//     lat: 19.1197,
//     lng: 72.8464,
//     species: "Mango",
//     planter: "Green Warriors",
//     date: "2024-09-15",
//     native: true,
//     type: "mature",
//   },
//   {
//     id: 8,
//     lat: 19.0176,
//     lng: 72.8562,
//     species: "Banyan",
//     planter: "Nature Lovers",
//     date: "2024-10-01",
//     native: true,
//     type: "mature",
//   },
// ];

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Initialize Application
function initializeApp() {
  console.log("🌱 GreenRoots Application Initializing...");

  // Initialize all components
  initializeLoadingScreen();
  initializeScrollAnimations();
  initializeTypewriter();
  initializeCounters();
  initializeThemeToggle();
  initializeNavigation();
  initializeMap();
  initializeEventListeners();
  initializeParallaxEffects();
  initializeMagneticButtons();
  initializeFloatingElements();
  initializeProgressBars();

  console.log("✅ GreenRoots Application Initialized Successfully!");
}

// =====================================================================
// LOADING SCREEN & INITIAL ANIMATIONS
// =====================================================================

function initializeLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");

  // Enhanced loading animation sequence
  setTimeout(() => {
    // Add growing animation to tree
    const treeAnimation = document.querySelector(".tree-animation");
    if (treeAnimation) {
      treeAnimation.style.transform = "scale(1.2)";
      treeAnimation.style.transition = "transform 0.5s ease";
    }

    // Simulate realistic loading progress
    const progressBar = document.querySelector(".loading-progress");
    if (progressBar) {
      progressBar.style.width = "100%";
    }

    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      initializeEntryAnimations();
    }, 2500);
  }, 1500);
}

function initializeEntryAnimations() {
  // Staggered entry animations for main elements
  const elementsToAnimate = [
    { selector: ".hero-content", delay: 300 },
    { selector: ".hero-visual", delay: 600 },
    { selector: ".stats-section", delay: 900 },
    { selector: ".navbar", delay: 100 },
  ];

  elementsToAnimate.forEach(({ selector, delay }) => {
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    }, delay);
  });
}

// =====================================================================
// TYPEWRITER ANIMATION
// =====================================================================

function initializeTypewriter() {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  let currentQuoteIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function type() {
    const currentQuote = quotes[currentQuoteIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentQuote.substring(
        0,
        currentCharIndex - 1
      );
      currentCharIndex--;
    } else {
      typewriterElement.textContent = currentQuote.substring(
        0,
        currentCharIndex + 1
      );
      currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100; // Faster when deleting

    if (!isDeleting && currentCharIndex === currentQuote.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      typeSpeed = 500; // Pause before next quote
    }

    setTimeout(type, typeSpeed);
  }

  // Start typewriter animation
  setTimeout(type, 1000);
}

// =====================================================================
// ANIMATED COUNTERS
// =====================================================================

function initializeCounters() {
  const counterElements = document.querySelectorAll(".stat-number");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "-50px",
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        animateCounter(entry.target);
        entry.target.dataset.counted = "true";
      }
    });
  }, observerOptions);

  counterElements.forEach((element) => {
    counterObserver.observe(element);
  });
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);

  // Animate progress bar too
  const progressBar = element.parentNode.querySelector(".stat-bar");
  if (progressBar) {
    const width = progressBar.dataset.width;
    setTimeout(() => {
      progressBar.style.width = width;
    }, 500);
  }
}

// =====================================================================
// THEME TOGGLE
// =====================================================================

function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
    }

    // Add rotation animation
    themeToggle.style.transform = "rotate(360deg)";
    setTimeout(() => {
      themeToggle.style.transform = "rotate(0deg)";
    }, 300);
  });
}

// =====================================================================
// NAVIGATION & SMOOTH SCROLLING
// =====================================================================

function initializeNavigation() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Add active class animation
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // Scroll-based navigation highlighting
  window.addEventListener("scroll", throttle(updateActiveNavigation, 100));
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      document
        .querySelectorAll(".nav-link")
        .forEach((link) => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
}

// =====================================================================
// INTERACTIVE MAP INITIALIZATION
// =====================================================================

function initializeMap() {
  // Initialize Leaflet map centered on Mumbai
  map = L.map("mumbai-map").setView([19.076, 72.8777], 11);

  // Add beautiful tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map);

  // Custom icons for different tree types
  const treeIcons = {
    new: L.divIcon({
      className: "custom-tree-marker new-tree-marker",
      html: '<i class="fas fa-seedling"></i>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    }),
    mature: L.divIcon({
      className: "custom-tree-marker mature-tree-marker",
      html: '<i class="fas fa-tree"></i>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    }),
    native: L.divIcon({
      className: "custom-tree-marker native-tree-marker",
      html: '<i class="fas fa-leaf"></i>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    }),
  };

  // Add custom CSS for markers
  const markerStyles = `
        .custom-tree-marker {
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            border: 3px solid;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        .custom-tree-marker:hover {
            transform: scale(1.2);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .new-tree-marker {
            border-color: #4caf50;
            color: #4caf50;
        }
        .mature-tree-marker {
            border-color: #228B22;
            color: #228B22;
        }
        .native-tree-marker {
            border-color: #f9b233;
            color: #f9b233;
        }
    `;

  // Add styles to document
  const styleSheet = document.createElement("style");
  styleSheet.textContent = markerStyles;
  document.head.appendChild(styleSheet);

  // Load and display tree data
  treeData = [...sampleTreeData];
  displayTreeMarkers();

  // Map controls
  initializeMapControls();

  // Map click event for adding new trees
  map.on("click", onMapClick);

  // Update map statistics
  updateMapStats();
}

function displayTreeMarkers(filter = "all") {
  // Clear existing markers
  treeMarkers.forEach((marker) => map.removeLayer(marker));
  treeMarkers = [];

  // Filter trees based on selection
  let filteredTrees = treeData;

  switch (filter) {
    case "recent":
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filteredTrees = treeData.filter(
        (tree) => new Date(tree.date) >= thirtyDaysAgo
      );
      break;
    case "native":
      filteredTrees = treeData.filter((tree) => tree.native);
      break;
  }

  // Add markers for filtered trees
  filteredTrees.forEach((tree) => {
    const markerType = tree.native ? "native" : tree.type;
    const icon =
      markerType === "native"
        ? L.divIcon({
            className: "custom-tree-marker native-tree-marker",
            html: '<i class="fas fa-leaf"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          })
        : tree.type === "new"
        ? L.divIcon({
            className: "custom-tree-marker new-tree-marker",
            html: '<i class="fas fa-seedling"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          })
        : L.divIcon({
            className: "custom-tree-marker mature-tree-marker",
            html: '<i class="fas fa-tree"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });

    const marker = L.marker([tree.lat, tree.lng], { icon })
      .addTo(map)
      .bindPopup(createTreePopup(tree));

    // Add pulsing animation for new trees
    if (tree.type === "new") {
      marker.on("add", function () {
        setTimeout(() => {
          const markerElement = marker.getElement();
          if (markerElement) {
            markerElement.style.animation = "pulse 2s infinite";
          }
        }, 100);
      });
    }

    treeMarkers.push(marker);
  });

  // Add pulse animation CSS
  if (!document.querySelector("#pulse-animation")) {
    const pulseStyle = document.createElement("style");
    pulseStyle.id = "pulse-animation";
    pulseStyle.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
    document.head.appendChild(pulseStyle);
  }
}

function createTreePopup(tree) {
  const plantedDate = new Date(tree.date).toLocaleDateString("en-IN");
  const daysAgo = Math.floor(
    (new Date() - new Date(tree.date)) / (1000 * 60 * 60 * 24)
  );

  return `
        <div class="tree-popup">
            <div class="popup-header">
                <h3>${tree.species}</h3>
                <span class="tree-badge ${
                  tree.native ? "native" : "regular"
                }">${tree.native ? "Native" : "Regular"}</span>
            </div>
            <div class="popup-content">
                <p><i class="fas fa-user"></i> <strong>Planted by:</strong> ${
                  tree.planter
                }</p>
                <p><i class="fas fa-calendar"></i> <strong>Date:</strong> ${plantedDate}</p>
                <p><i class="fas fa-clock"></i> <strong>Age:</strong> ${daysAgo} days old</p>
                <p><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${tree.lat.toFixed(
                  4
                )}, ${tree.lng.toFixed(4)}</p>
            </div>
            <div class="popup-actions">
                <button onclick="viewTreeDetails(${tree.id})" class="popup-btn">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <button onclick="shareTree(${tree.id})" class="popup-btn">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
    `;
}

// Add popup styles
const popupStyles = `
    .tree-popup {
        min-width: 250px;
        font-family: inherit;
    }
    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
    }
    .popup-header h3 {
        margin: 0;
        color: #228B22;
        font-size: 1.1em;
    }
    .tree-badge {
        font-size: 0.8em;
        padding: 2px 8px;
        border-radius: 12px;
        font-weight: bold;
    }
    .tree-badge.native {
        background: #f9b233;
        color: white;
    }
    .tree-badge.regular {
        background: #4caf50;
        color: white;
    }
    .popup-content p {
        margin: 5px 0;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .popup-content i {
        color: #228B22;
        width: 12px;
    }
    .popup-actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
        padding-top: 8px;
        border-top: 1px solid #eee;
    }
    .popup-btn {
        flex: 1;
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        background: #228B22;
        color: white;
        font-size: 0.8em;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }
    .popup-btn:hover {
        background: #1c6e1c;
        transform: translateY(-1px);
    }
`;

// Add popup styles to document
const popupStyleSheet = document.createElement("style");
popupStyleSheet.textContent = popupStyles;
document.head.appendChild(popupStyleSheet);

function initializeMapControls() {
  const controlButtons = document.querySelectorAll(".control-btn");

  controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      controlButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      // Get filter type and update markers
      const filter = button.dataset.filter;
      displayTreeMarkers(filter);

      // Update statistics
      updateMapStats(filter);

      // Add click animation
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 100);
    });
  });
}

function updateMapStats(filter = "all") {
  let filteredTrees = treeData;

  switch (filter) {
    case "recent":
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filteredTrees = treeData.filter(
        (tree) => new Date(tree.date) >= thirtyDaysAgo
      );
      break;
    case "native":
      filteredTrees = treeData.filter((tree) => tree.native);
      break;
  }

  const totalTrees = filteredTrees.length;
  const activeAreas = new Set(
    filteredTrees.map(
      (tree) => `${Math.floor(tree.lat * 10)}_${Math.floor(tree.lng * 10)}`
    )
  ).size;

  // Animate count changes
  const totalTreesElement = document.getElementById("totalTrees");
  const activeAreasElement = document.getElementById("activeAreas");

  animateNumber(totalTreesElement, totalTrees);
  animateNumber(activeAreasElement, activeAreas);
}

function animateNumber(element, targetValue) {
  const startValue = parseInt(element.textContent) || 0;
  const duration = 500;
  const step = (targetValue - startValue) / (duration / 16);
  let currentValue = startValue;

  const timer = setInterval(() => {
    currentValue += step;
    if (
      (step > 0 && currentValue >= targetValue) ||
      (step < 0 && currentValue <= targetValue)
    ) {
      currentValue = targetValue;
      clearInterval(timer);
    }
    element.textContent = Math.round(currentValue);
  }, 16);
}

function onMapClick(e) {
  currentLocation = e.latlng;

  // Update coordinates in the form
  document.getElementById("latitude").value = e.latlng.lat.toFixed(6);
  document.getElementById("longitude").value = e.latlng.lng.toFixed(6);

  // Show modal
  openModal("addTreeModal");

  // Add a temporary marker
  if (window.tempMarker) {
    map.removeLayer(window.tempMarker);
  }

  window.tempMarker = L.marker([e.latlng.lat, e.latlng.lng], {
    icon: L.divIcon({
      className: "temp-tree-marker",
      html: '<i class="fas fa-plus"></i>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    }),
  }).addTo(map);

  // Style for temporary marker
  if (!document.querySelector("#temp-marker-style")) {
    const tempStyle = document.createElement("style");
    tempStyle.id = "temp-marker-style";
    tempStyle.textContent = `
            .temp-tree-marker {
                background: #ff9800;
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
                box-shadow: 0 2px 10px rgba(255, 152, 0, 0.5);
                animation: bounce 1s infinite;
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
    document.head.appendChild(tempStyle);
  }
}

fetch("http://localhost:8080/api/tree/locations")
  .then(res => res.json())
  .then(data => {
      data.forEach(loc => {
          L.marker([loc.latitude, loc.longitude]).addTo(map)
            .bindPopup(
                `<b>Tree:</b> ${loc.treeName}<br>
                 <b>Location:</b> ${loc.locationName}<br>
                 <b>Planted By:</b> ${loc.plantedByEmail}<br>
                 <b>Date:</b> ${loc.datePlanted}`
            );
      });
  });

loadTreeMarkers();


// =====================================================================
// MODAL FUNCTIONALITY
// =====================================================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus trap
    const focusableElements = modal.querySelectorAll(
      "input, select, textarea, button"
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";

    // Remove temporary marker
    if (window.tempMarker) {
      map.removeLayer(window.tempMarker);
      window.tempMarker = null;
    }
  }
}

// =====================================================================
// FORM HANDLING
// =====================================================================

function initializeEventListeners() {
  // Add tree form submission
  const addTreeForm = document.getElementById("addTreeForm");
  if (addTreeForm) {
    addTreeForm.addEventListener("submit", handleAddTree);
  }

  // =====================================================================
// EVENT REGISTRATION HANDLER
// =====================================================================

// function openEventRegistration(eventId) {
//   const eventDetails = {
//     'mumbai-monsoon': {
//       title: 'Mumbai Monsoon Plantation',
//       date: 'November 15, 2024',
//       location: 'Sanjay Gandhi National Park',
//       banner: 'Join us for a massive plantation drive in Mumbai\'s green lung!'
//     },
//     'corporate-green': {
//       title: 'Corporate Green Initiative',
//       date: 'November 22, 2024',
//       location: 'BKC Business District',
//       banner: 'Corporate teams unite for urban forest creation!'
//     }
//   };
  
//   const event = eventDetails[eventId];
  
//   if (event) {
//     document.getElementById('eventTitle').textContent = event.title;
//     document.getElementById('eventId').value = eventId;
//     document.getElementById('eventInfoBanner').innerHTML = `
//       <div style="background: var(--gradient-primary); color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
//         <h4 style="margin: 0 0 10px 0;">${event.title}</h4>
//         <p style="margin: 5px 0;"><i class="fas fa-calendar"></i> ${event.date}</p>
//         <p style="margin: 5px 0;"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
//         <p style="margin: 10px 0 0 0; font-style: italic;">${event.banner}</p>
//       </div>
//     `;
//   }
  
//   openModal('eventRegistrationModal');
// }

function handleEventRegistration(e) {
  e.preventDefault();
  
  const formData = {
    eventId: document.getElementById('eventId').value,
    name: document.getElementById('eventName').value,
    email: document.getElementById('eventEmail').value,
    phone: document.getElementById('eventPhone').value,
    age: document.getElementById('eventAge').value,
    participants: document.getElementById('eventParticipants').value,
    tshirt: document.getElementById('eventTshirt').value,
    source: document.getElementById('eventSource').value,
    message: document.getElementById('eventMessage').value,
    termsAccepted: document.getElementById('eventTerms').checked
  };
  
  if (!formData.termsAccepted) {
    showNotification('⚠️ Please accept the terms and conditions', 'warning');
    return;
  }
  
  showLoadingState(e.target);
  
  setTimeout(() => {
    console.log('Event Registration:', formData);
    showNotification(`🎉 Congratulations ${formData.name}! You're registered for the event. Check your email for details.`, 'success');
    e.target.reset();
    hideLoadingState(e.target);
    closeModal('eventRegistrationModal');
    triggerCelebration();
  }, 2000);
}

  // Event registration form submission
  const eventRegistrationForm = document.getElementById(
    "eventRegistrationForm"
  );
  if (eventRegistrationForm) {
    eventRegistrationForm.addEventListener("submit", handleEventRegistration);
  }
  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmission);
  }

  // Individual planting form submission
  const individualPlantForm = document.getElementById("individualPlantForm");
  if (individualPlantForm) {
    individualPlantForm.addEventListener("submit", handleIndividualPlanting);
  }

  // Community drive form submission
  const communityDriveForm = document.getElementById("communityDriveForm");
  if (communityDriveForm) {
    communityDriveForm.addEventListener("submit", handleCommunityDrive);

    // Add dynamic field visibility based on action selection
    const communityAction = document.getElementById("communityAction");
    if (communityAction) {
      communityAction.addEventListener("change", handleCommunityActionChange);
    }
  }

  // Corporate partnership form submission
  const corporatePartnershipForm = document.getElementById(
    "corporatePartnershipForm"
  );
  if (corporatePartnershipForm) {
    corporatePartnershipForm.addEventListener(
      "submit",
      handleCorporatePartnership
    );
  }

  // Floating Action Button
  const fab = document.getElementById("plantTreeFab");
  if (fab) {
    fab.addEventListener("click", () => {
      scrollToSection("plant-tree");
    });
  }

  
  // Scroll to top button
  const scrollToTop = document.getElementById("scrollToTop");
  if (scrollToTop) {
    scrollToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Scroll visibility for scroll-to-top button
  window.addEventListener("scroll", () => {
    if (scrollToTop) {
      if (window.scrollY > 300) {
        scrollToTop.classList.add("visible");
      } else {
        scrollToTop.classList.remove("visible");
      }
    }
  });

  // Modal close on background click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Escape key to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.active");
      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });
}
function handleAddTree(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const treeData = {
    id: Date.now(),
    species:
      formData.get("treeSpecies") ||
      document.getElementById("treeSpecies").value,
    planter:
      formData.get("planterName") ||
      document.getElementById("planterName").value,
    locationDesc:
      formData.get("locationDesc") ||
      document.getElementById("locationDesc").value,
    lat: parseFloat(document.getElementById("latitude").value),
    lng: parseFloat(document.getElementById("longitude").value),
    date: new Date().toISOString().split("T")[0],
    native: ["Mango", "Neem", "Banyan"].includes(
      document.getElementById("treeSpecies").value
    ),
    type: "new",
  };

  // Validate data
  if (
    !treeData.species ||
    !treeData.planter ||
    !treeData.lat ||
    !treeData.lng
  ) {
    showNotification("Please fill all required fields", "error");
    return;
  }

  // Add to global tree data
  window.treeData = window.treeData || [];
  window.treeData.push(treeData);
  treeData.push(treeData);

  // Remove temporary marker
  if (window.tempMarker) {
    map.removeLayer(window.tempMarker);
    window.tempMarker = null;
  }

  // Add new marker to map
  displayTreeMarkers();
  updateMapStats();

  // Show success message
  showNotification(
    `🌱 ${treeData.species} tree added successfully by ${treeData.planter}!`,
    "success"
  );

  // Close modal and reset form
  closeModal("addTreeModal");
  e.target.reset();

  // Animate to new tree location
  map.setView([treeData.lat, treeData.lng], 15, { animate: true });
}

function handleContactSubmission(e) {
  e.preventDefault();

  showLoadingState(e.target);

  setTimeout(() => {
    showNotification(
      "📧 Thank you for your message! We'll get back to you soon.",
      "success"
    );
    e.target.reset();
    hideLoadingState(e.target);
  }, 1500);
}
// =====================================================================
// PLANT A TREE FORM HANDLERS
// =====================================================================

function handleIndividualPlanting(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("individualName").value,
    phone: document.getElementById("individualPhone").value,
    species: document.getElementById("individualSpecies").value,
    location: document.getElementById("individualLocation").value,
    specificLocation: document.getElementById("individualSpecificLocation")
      .value,
    date: document.getElementById("individualDate").value,
    notes: document.getElementById("individualNotes").value,
  };

  // Validate required fields
  if (
    !formData.name ||
    !formData.phone ||
    !formData.species ||
    !formData.location ||
    !formData.date
  ) {
    showNotification("⚠️ Please fill all required fields", "warning");
    return;
  }

  showLoadingState(e.target);

  setTimeout(() => {
    console.log("Individual Planting Request:", formData);
    showNotification(
      `🌱 Thank you ${formData.name}! Your tree planting request has been submitted. We'll contact you soon to confirm the details.`,
      "success"
    );
    e.target.reset();
    hideLoadingState(e.target);
    closeModal("individualPlantModal");
    triggerCelebration();
  }, 2000);
}

function handleCommunityActionChange(e) {
  const action = e.target.value;
  const groupSizeGroup = document.getElementById("communityGroupSizeGroup");
  const dateGroup = document.getElementById("communityDateGroup");

  if (action === "organize") {
    groupSizeGroup.style.display = "block";
    dateGroup.style.display = "block";
    document.getElementById("communityGroupSize").required = true;
    document.getElementById("communityDate").required = true;
  } else {
    groupSizeGroup.style.display = "none";
    dateGroup.style.display = "none";
    document.getElementById("communityGroupSize").required = false;
    document.getElementById("communityDate").required = false;
  }
}

function handleCommunityDrive(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("communityName").value,
    email: document.getElementById("communityEmail").value,
    phone: document.getElementById("communityPhone").value,
    organization: document.getElementById("communityOrg").value,
    action: document.getElementById("communityAction").value,
    location: document.getElementById("communityLocation").value,
    groupSize: document.getElementById("communityGroupSize").value,
    date: document.getElementById("communityDate").value,
    message: document.getElementById("communityMessage").value,
  };

  // Validate required fields
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.action ||
    !formData.location
  ) {
    showNotification("⚠️ Please fill all required fields", "warning");
    return;
  }

  showLoadingState(e.target);

  setTimeout(() => {
    console.log("Community Drive Request:", formData);

    const actionText = formData.action === "join" ? "joining" : "organizing";
    showNotification(
      `🤝 Thank you ${formData.name}! Your request for ${actionText} a community drive has been received. We'll be in touch shortly!`,
      "success"
    );

    e.target.reset();
    hideLoadingState(e.target);
    closeModal("communityDriveModal");
    triggerCelebration();
  }, 2000);
}

function handleCorporatePartnership(e) {
  e.preventDefault();

  const formData = {
    companyName: document.getElementById("corporateName").value,
    contactPerson: document.getElementById("corporateContact").value,
    email: document.getElementById("corporateEmail").value,
    phone: document.getElementById("corporatePhone").value,
    companySize: document.getElementById("corporateSize").value,
    interest: document.getElementById("corporateInterest").value,
    treeCount: document.getElementById("corporateTreeCount").value,
    timeline: document.getElementById("corporateTimeline").value,
    details: document.getElementById("corporateDetails").value,
  };

  // Validate required fields
  if (
    !formData.companyName ||
    !formData.contactPerson ||
    !formData.email ||
    !formData.phone ||
    !formData.companySize ||
    !formData.interest ||
    !formData.treeCount ||
    !formData.timeline
  ) {
    showNotification("⚠️ Please fill all required fields", "warning");
    return;
  }

  // Validate minimum tree count
  if (parseInt(formData.treeCount) < 50) {
    showNotification(
      "⚠️ Minimum tree count for corporate partnerships is 50 trees",
      "warning"
    );
    return;
  }

  showLoadingState(e.target);

  setTimeout(() => {
    console.log("Corporate Partnership Request:", formData);
    showNotification(
      `🏢 Thank you for your interest, ${formData.companyName}! Our partnership team will contact ${formData.contactPerson} within 24-48 hours to discuss your ${formData.treeCount}-tree initiative.`,
      "success"
    );

    e.target.reset();
    hideLoadingState(e.target);
    closeModal("corporatePartnershipModal");
    triggerCelebration();
  }, 2000);
}
// =====================================================================
// NOTIFICATION SYSTEM
// =====================================================================

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add notification styles if not present
  if (!document.querySelector("#notification-styles")) {
    const notificationStyles = document.createElement("style");
    notificationStyles.id = "notification-styles";
    notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                min-width: 300px;
                max-width: 500px;
                padding: 0;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 10001;
                animation: slideInRight 0.3s ease-out;
                overflow: hidden;
            }
            .notification-success { background: #4caf50; color: white; }
            .notification-error { background: #f44336; color: white; }
            .notification-info { background: #2196f3; color: white; }
            .notification-warning { background: #ff9800; color: white; }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
            }
            
            .notification-message {
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 4px;
                margin-left: 12px;
                border-radius: 4px;
                transition: background 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(255,255,255,0.2);
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
    document.head.appendChild(notificationStyles);
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideInRight 0.3s ease-in reverse";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// =====================================================================
// LOADING STATES
// =====================================================================

function showLoadingState(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processing...';
  }
}

function hideLoadingState(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
    // Restore original button text based on form type
    if (form.id === "addTreeForm") {
      submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Tree';
    }  else {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  }
}

// =====================================================================
// SCROLL ANIMATIONS & PARALLAX
// =====================================================================

function initializeScrollAnimations() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }

  // Custom scroll animations
  window.addEventListener(
    "scroll",
    throttle(() => {
      updateParallaxElements();
      updateScrollProgress();
    }, 16)
  );
}

function initializeParallaxEffects() {
  const parallaxElements = document.querySelectorAll(
    ".hero-visual, .floating-leaf"
  );

  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach((element) => {
        if (element.classList.contains("hero-visual")) {
          element.style.transform = `translateY(${rate * 0.3}px)`;
        } else if (element.classList.contains("floating-leaf")) {
          const leafRate = rate * (0.1 + Math.random() * 0.2);
          element.style.transform = `translateY(${leafRate}px)`;
        }
      });
    }, 16)
  );
}

function updateParallaxElements() {
  const scrolled = window.pageYOffset;

  // Animate floating leaves based on scroll
  document.querySelectorAll(".floating-leaf").forEach((leaf, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    leaf.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
  });

  // Header blur effect
  const header = document.querySelector(".header");
  if (header) {
    const blur = Math.min(scrolled / 100, 10);
    header.style.backdropFilter = `blur(${blur}px)`;
  }
}

function updateScrollProgress() {
  const scrolled = window.pageYOffset;
  const maxHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrolled / maxHeight) * 100;

  // Update a progress bar if it exists
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// =====================================================================
// MAGNETIC BUTTONS & INTERACTIVE EFFECTS
// =====================================================================

function initializeMagneticButtons() {
  const magneticElements = document.querySelectorAll(".btn, .fab, .nav-link");

  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * 0.1;
      const moveY = y * 0.1;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0, 0)";
    });
  });
}

function initializeFloatingElements() {
  // Enhanced floating animation for particles
  const particles = document.querySelectorAll(".particle");

  particles.forEach((particle, index) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 2;

    particle.style.animationDelay = `${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;

    // Add random movement
    setInterval(() => {
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;
      particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000 + Math.random() * 2000);
  });
}

function initializeProgressBars() {
  const progressBars = document.querySelectorAll(".stat-bar");

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const width = entry.target.dataset.width;
          setTimeout(() => {
            entry.target.style.width = width;
            entry.target.dataset.animated = "true";
          }, 500);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
}

// =====================================================================
// CELEBRATION EFFECTS
// =====================================================================

function triggerCelebration() {
  // Create confetti effect
  const colors = ["#228B22", "#4caf50", "#f9b233", "#00bcd4"];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    createConfetti(colors[Math.floor(Math.random() * colors.length)]);
  }

  // Play success sound (if available)
  playSuccessSound();
}

function createConfetti(color) {
  const confetti = document.createElement("div");
  confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 10000;
        pointer-events: none;
        border-radius: 50%;
    `;

  document.body.appendChild(confetti);

  // Animate confetti falling
  const animation = confetti.animate(
    [
      { transform: "translateY(0) rotate(0deg)", opacity: 1 },
      { transform: `translateY(100vh) rotate(720deg)`, opacity: 0 },
    ],
    {
      duration: 3000 + Math.random() * 2000,
      easing: "cubic-bezier(0.5, 0, 0.5, 1)",
    }
  );

  animation.onfinish = () => confetti.remove();
}

function playSuccessSound() {
  // Create audio context for success sound
  if (
    typeof AudioContext !== "undefined" ||
    typeof webkitAudioContext !== "undefined"
  ) {
    const audioContext = new (AudioContext || webkitAudioContext)();

    // Simple success tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }
}

// =====================================================================
// UTILITY FUNCTIONS
// =====================================================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector(".header").offsetHeight;
    const targetPosition = section.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// =====================================================================
// MAP INTERACTION FUNCTIONS
// =====================================================================

function viewTreeDetails(treeId) {
  const tree = treeData.find((t) => t.id === treeId);
  if (!tree) return;

  const detailsHtml = `
        <div class="tree-details-popup">
            <h2>🌳 ${tree.species} Tree Details</h2>
            <div class="details-grid">
                <div class="detail-item">
                    <label>Species:</label>
                    <span>${tree.species} ${
    tree.native ? "(Native)" : ""
  }</span>
                </div>
                <div class="detail-item">
                    <label>Planted by:</label>
                    <span>${tree.planter}</span>
                </div>
                <div class="detail-item">
                    <label>Planted on:</label>
                    <span>${new Date(tree.date).toLocaleDateString(
                      "en-IN"
                    )}</span>
                </div>
                <div class="detail-item">
                    <label>Age:</label>
                    <span>${Math.floor(
                      (new Date() - new Date(tree.date)) / (1000 * 60 * 60 * 24)
                    )} days</span>
                </div>
                <div class="detail-item">
                    <label>Coordinates:</label>
                    <span>${tree.lat.toFixed(6)}, ${tree.lng.toFixed(6)}</span>
                </div>
                <div class="detail-item">
                    <label>CO₂ Absorbed:</label>
                    <span>~${(
                      Math.floor(
                        (new Date() - new Date(tree.date)) /
                          (1000 * 60 * 60 * 24)
                      ) * 0.06
                    ).toFixed(1)} kg</span>
                </div>
            </div>
            <div class="detail-actions">
                <button onclick="closeTreeDetails()" class="btn btn-secondary">Close</button>
                <button onclick="shareTree(${treeId})" class="btn btn-primary">Share Tree</button>
            </div>
        </div>
    `;

  // Create modal-like overlay
  const overlay = document.createElement("div");
  overlay.id = "tree-details-overlay";
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

  overlay.innerHTML = detailsHtml;
  document.body.appendChild(overlay);

  /* Add styles for details popup
    if (!document.querySelector('#tree-details-styles')) {
        const detailStyles = document.createElement('style');
        detailStyles.id = 'tree-details-styles';
        detailStyles.textContent = `
            .tree-details-popup {
                background: white;
                border-radius: 16px;
                padding: 24px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            .tree-details-popup h2 {
                color: #228B22;
                margin-bottom: 20px;
                text-align: center;
            }
            .details-grid {
                display: grid;
                gap: 12px;
                margin-bottom: 20px;
            }
            .detail-item {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
            }
            .detail-item label {
                font-weight: 600;
                color: #333;
            }
            .detail-item span {
                color: #666;
            }
            .detail-actions {
                display: flex;
                gap: 12px;
                justify-content: center;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(detailStyles);
    }
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeTreeDetails();
        }
    });
    */
}

function closeTreeDetails() {
  const overlay = document.getElementById("tree-details-overlay");
  if (overlay) {
    overlay.style.animation = "fadeIn 0.3s ease reverse";
    setTimeout(() => overlay.remove(), 300);
  }
}

function shareTree(treeId) {
  const tree = treeData.find((t) => t.id === treeId);
  if (!tree) return;

  const shareText = `🌱 Check out this ${tree.species} tree planted by ${
    tree.planter
  } in Mumbai! 
🗓️ Planted: ${new Date(tree.date).toLocaleDateString("en-IN")}
📍 Location: ${tree.lat.toFixed(4)}, ${tree.lng.toFixed(4)}
🌍 #GreenMumbai #TreePlantation #GreenRoots`;

  if (navigator.share) {
    navigator
      .share({
        title: `${tree.species} Tree - GreenRoots`,
        text: shareText,
        url: window.location.href + `?tree=${treeId}`,
      })
      .catch(console.error);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        showNotification("🔗 Tree details copied to clipboard!", "success");
      })
      .catch(() => {
        // Further fallback: show share modal
        showShareModal(shareText);
      });
  }
}

function showShareModal(text) {
  const modal = document.createElement("div");
  modal.innerHTML = `
        <div class="share-modal">
            <h3>Share Tree</h3>
            <textarea readonly>${text}</textarea>
            <div class="share-buttons">
                <button onclick="copyToClipboard('${text.replace(
                  /'/g,
                  "\\'"
                )}')">Copy Text</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
            </div>
        </div>
    `;
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
  document.body.appendChild(modal);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification("📋 Copied to clipboard!", "success");
  });
}

// =====================================================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================================================

function initializeAccessibility() {
  // Skip link for keyboard navigation
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #228B22;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content landmark
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.id = "main-content";
    heroSection.setAttribute("tabindex", "-1");
  }
}

// =====================================================================
// PERFORMANCE MONITORING
// =====================================================================

function initializePerformanceMonitoring() {
  // Monitor loading performance
  window.addEventListener("load", () => {
    if ("performance" in window) {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`🚀 Page loaded in ${loadTime}ms`);

      // Report if loading is slow
      if (loadTime > 3000) {
        console.warn("⚠️ Slow page load detected. Consider optimization.");
      }
    }
  });

  // Monitor scroll performance
  let scrollCount = 0;
  const scrollMonitor = throttle(() => {
    scrollCount++;
    if (scrollCount % 100 === 0) {
      console.log(`📊 Scroll events handled: ${scrollCount}`);
    }
  }, 100);

  window.addEventListener("scroll", scrollMonitor);
}

// =====================================================================
// INITIALIZE ACCESSIBILITY AND PERFORMANCE
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initializeAccessibility();
    initializePerformanceMonitoring();
  }, 1000);
});

// =====================================================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// =====================================================================

// Make functions globally available
window.GreenRoots = {
  openModal,
  closeModal,
  scrollToSection,
  viewTreeDetails,
  shareTree,
  showNotification,
  triggerCelebration,
};

// =====================================================================
// EVENT REGISTRATION FUNCTIONALITY
// =====================================================================
// EVENT REGISTRATION FUNCTIONALITY

    function openEventRegistration(eventId) {

        const eventDetails = {
            'mumbai-monsoon': {
                title: 'Mumbai Monsoon Plantation',
                date: 'November 15, 2024',
                location: 'Sanjay Gandhi National Park',
                banner: 'Join us for a massive plantation drive in Mumbai\'s green lung!'
            },
            'corporate-green': {
                title: 'Corporate Green Initiative',
                date: 'November 22, 2024',
                location: 'BKC Business District',
                banner: 'Corporate teams unite for urban forest creation!'
            }
        };

        const event = eventDetails[eventId];

        if (!event) {
            alert("Invalid event selected!");
            return;
        }

        // const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            alert("⚠️ Please login first to register!");
            return;
        }

        const data = {
            // name: userName,
            email: userEmail,
            eventName: event.title
        };

        fetch("http://localhost:8080/api/events/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(msg => {
            alert(`✅ Registered for ${event.title} successfully!`);
        })
        .catch(err => {
            console.error(err);
            alert("❌ Something went wrong while registering!");
        });

    }

window.openEventRegistration = openEventRegistration;

// Add event registration form handler to initialization
const eventRegistrationForm = document.getElementById("eventRegistrationForm");
if (eventRegistrationForm) {
  eventRegistrationForm.addEventListener("submit", handleEventRegistration);
}

function handleEventRegistration(e) {
  e.preventDefault();

  const formData = {
    eventId: document.getElementById("eventId").value,
    name: document.getElementById("eventName").value,
    email: document.getElementById("eventEmail").value,
    phone: document.getElementById("eventPhone").value,
    age: document.getElementById("eventAge").value,
    participants: document.getElementById("eventParticipants").value,
    tshirt: document.getElementById("eventTshirt").value,
    source: document.getElementById("eventSource").value,
    message: document.getElementById("eventMessage").value,
    termsAccepted: document.getElementById("eventTerms").checked,
  };

  const event = eventDetails[formData.eventId];

  if (!formData.termsAccepted) {
    showNotification("⚠️ Please accept the terms and conditions", "warning");
    return;
  }

  showLoadingState(e.target);

  setTimeout(() => {
    console.log("Event Registration:", formData);
    showNotification(
      `🎉 Success! ${formData.name}, you're registered for ${event.title}! Check your email for confirmation and event details.`,
      "success"
    );

    e.target.reset();
    hideLoadingState(e.target);
    closeModal("eventRegistrationModal");
    triggerCelebration();
  }, 2000);
}



console.log("🌱 GreenRoots Enhanced JavaScript Loaded Successfully!");
function plantTree() {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return alert("Please login first!");

    const data = {
        fullName: document.getElementById("individualName").value.trim(),
        contactNumber: document.getElementById("individualContact").value.trim(),
        treeSpecies: document.getElementById("individualSpecies").value,
        preferredLocation: document.getElementById("individualPreferredLocation").value,
        specificLocation: document.getElementById("individualSpecificLocation").value.trim(),
        datePlanted: document.getElementById("individualDate").value,
        notes: document.getElementById("individualNotes").value.trim(),
        email: userEmail
    };

    if (!data.fullName) return alert("Enter your name");
    if (!data.contactNumber) return alert("Enter contact number");
    if (!data.treeSpecies) return alert("Select tree species");
    if (!data.preferredLocation) return alert("Select preferred location");
    if (!data.datePlanted) return alert("Select date");

    fetch("http://localhost:8080/api/tree/plant", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        alert("✅ Tree request submitted successfully!");
        document.getElementById("individualPlantForm").reset();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Failed to submit request");
    });
}
// // Community Plantation Form Submission
// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("communityForm");

//     if (form) {
//         form.addEventListener("submit", function(e) {
//             e.preventDefault();

//             const data = {
//                 name: document.getElementById("commName").value,
//                 email: document.getElementById("commEmail").value,
//                 phone: document.getElementById("commPhone").value,
//                 organization: document.getElementById("commOrg").value,
//                 preferredArea: document.getElementById("commArea").value,
//                 participationType: document.getElementById("commIwanto").value,
//                 message: document.getElementById("commMsg").value
//             };

//             fetch("http://localhost:8080/api/community/submit", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(data)
//             })
//             .then(res => res.text())
//             .then(msg => {
//                 alert(msg);
//                 form.reset();
//             })
//             .catch(err => console.log("Error:", err));
//         });
//     }
// });
// ✅ Community Plantation Drive Form Submit
function submitCommunityForm() {
    const data = {
        name: document.getElementById("commName").value,
        email: document.getElementById("commEmail").value,
        phone: document.getElementById("commPhone").value,
        organization: document.getElementById("commOrg").value,
        preferredArea: document.getElementById("commArea").value,
        participationType: document.getElementById("commIwanto").value,
        message: document.getElementById("commMsg").value
    };

    fetch("http://localhost:8080/api/community/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        document.getElementById("communityForm").reset();
        closeModal('communityDriveModal');
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong. Try again.");
    });
}
// // CONTACT FORM SUBMIT
// document.getElementById("contactForm").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const data = {
//         name: document.getElementById("contactName").value,
//         email: document.getElementById("contactEmail").value,
//         subject: document.getElementById("contactSubject").value,
//         message: document.getElementById("contactMessage").value
//     };

//     fetch("http://localhost:8080/api/contact/send", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     })
//     .then(res => res.text())
//     .then(msg => {
//         alert(msg);
//         document.getElementById("contactForm").reset();
//     })
//     .catch(err => {
//         console.error(err);
//         alert("❌ Error sending message!");
//     });
// });

function submitContactForm() {
    const data = {
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        subject: document.getElementById("contactSubject").value,
        message: document.getElementById("contactMessage").value
    };

    fetch("http://localhost:8080/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        alert("✅ " + msg);
        document.getElementById("contactForm").reset();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Error sending message!");
    });
}


// document.getElementById("corporateForm").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const data = {
//         companyName: document.getElementById("corpCompanyName").value,
//         contactPerson: document.getElementById("corpContactPerson").value,
//         email: document.getElementById("corpEmail").value,
//         phone: document.getElementById("corpPhone").value,
//         companySize: document.getElementById("corpCompanySize").value,
//         partnershipInterest: document.getElementById("corpInterest").value,
//         expectedTrees: document.getElementById("corpExpectedTrees").value,
//         timeline: document.getElementById("corpTimeline").value,
//         message: document.getElementById("corpMessage").value
//     };

//     fetch("http://localhost:8080/api/corporate/request", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     })
//     .then(res => res.text())
//     .then(msg => {
//         alert(msg);
//         document.getElementById("corporateForm").reset();
//     })
//     .catch(err => {
//         console.error(err);
//         alert("❌ Error submitting request!");
//     });
// });

function submitCorporateForm() {

    const data = {
        companyName: document.getElementById("corpCompanyName").value,
        contactPerson: document.getElementById("corpContactPerson").value,
        email: document.getElementById("corpEmail").value,
        phone: document.getElementById("corpPhone").value,
        companySize: document.getElementById("corpCompanySize").value,
        partnershipInterest: document.getElementById("corpInterest").value,
        expectedTrees: document.getElementById("corpExpectedTrees").value,
        timeline: document.getElementById("corpTimeline").value,
        message: document.getElementById("corpMessage").value
    };

    fetch("http://localhost:8080/api/corporate/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        document.getElementById("corporateForm").reset();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Error submitting partnership request!");
    });
}
