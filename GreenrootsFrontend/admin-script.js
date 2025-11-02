// Admin Dashboard JavaScript

// Global variables
let currentSection = 'dashboard';
let charts = {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  setupEventListeners();
  initializeCharts();
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 1000);
});

// Initialize Dashboard
function initializeDashboard() {
  // Initialize mini maps for locations
  initializeMiniMaps();
  
  // Set active section
  switchSection('dashboard');
    renderEvents('upcoming');

}


// Setup Event Listeners
function setupEventListeners() {
  // Sidebar navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      switchSection(section);
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      document.getElementById('sidebar').classList.toggle('active');
    });
  }

  // Events tabs
 // Events tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-tab');
    renderEvents(category);
  });
});

  // Notification type change
  const notificationType = document.getElementById('notificationType');
  if (notificationType) {
    notificationType.addEventListener('change', function() {
      updateNotificationPreview();
    });
  }

  // Target audience checkboxes
  document.querySelectorAll('input[type="checkbox"][value="location"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const locationFilter = document.getElementById('locationFilter');
      if (locationFilter) {
        locationFilter.style.display = this.checked ? 'block' : 'none';
      }
    });
  });

  // Schedule delivery radio buttons
  document.querySelectorAll('input[name="schedule"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const scheduleDateTime = document.getElementById('scheduleDateTime');
      if (scheduleDateTime) {
        scheduleDateTime.style.display = this.value === 'later' ? 'block' : 'none';
      }
    });
  });

  // Form submissions
  setupFormSubmissions();
}

// Switch Section
function switchSection(sectionName) {
  // Update navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === sectionName) {
      item.classList.add('active');
    }
  });

  // Update content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(sectionName + '-section');
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update page title
  const titles = {
    'dashboard': 'Dashboard Overview',
    'user-registrations': 'User Registrations',
    'locations': 'Active Locations',
    'events': 'Events Management',
    'notifications': 'Send Notifications',
    'trees': 'Tree Database',
    'analytics': 'Analytics & Reports',
    'settings': 'NGO Settings'
  };
  
  document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';
  currentSection = sectionName;

  // Close mobile menu
  if (window.innerWidth <= 1024) {
    document.getElementById('sidebar').classList.remove('active');
  }
}

// Initialize Charts
function initializeCharts() {
  // Registrations Trend Chart
  const registrationsCtx = document.getElementById('registrationsChart');
  if (registrationsCtx) {
    charts.registrations = new Chart(registrationsCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'New Registrations',
          data: [12, 19, 15, 25, 22, 30, 28],
          borderColor: '#228B22',
          backgroundColor: 'rgba(34, 139, 34, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Locations Distribution Chart
  const locationsCtx = document.getElementById('locationsChart');
  if (locationsCtx) {
    charts.locations = new Chart(locationsCtx, {
      type: 'doughnut',
      data: {
        labels: ['South Mumbai', 'Western Suburbs', 'Central Mumbai', 'Eastern Suburbs', 'Navi Mumbai', 'Thane'],
        datasets: [{
          data: [45, 38, 52, 29, 34, 27],
          backgroundColor: [
            '#228B22',
            '#4CAF50',
            '#66BB6A',
            '#81C784',
            '#A5D6A7',
            '#C8E6C9'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  // Analytics Charts
  const growthCtx = document.getElementById('growthChart');
  if (growthCtx) {
    charts.growth = new Chart(growthCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Registrations',
          data: [65, 78, 90, 81, 95, 110, 125, 140, 135, 127],
          backgroundColor: '#228B22'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  const distributionCtx = document.getElementById('distributionChart');
  if (distributionCtx) {
    charts.distribution = new Chart(distributionCtx, {
      type: 'pie',
      data: {
        labels: ['South Mumbai', 'Western Suburbs', 'Central Mumbai', 'Eastern Suburbs', 'Navi Mumbai', 'Thane'],
        datasets: [{
          data: [234, 187, 298, 156, 203, 142],
          backgroundColor: [
            '#228B22',
            '#4CAF50',
            '#FF9800',
            '#2196F3',
            '#9C27B0',
            '#F44336'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  const participationCtx = document.getElementById('participationChart');
  if (participationCtx) {
    charts.participation = new Chart(participationCtx, {
      type: 'line',
      data: {
        labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'],
        datasets: [{
          label: 'Participation Rate (%)',
          data: [78, 82, 85, 65, 73],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  const plantingCtx = document.getElementById('plantingChart');
  if (plantingCtx) {
    charts.planting = new Chart(plantingCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Trees Planted',
          data: [250, 320, 380, 290, 410, 470, 520, 580, 490, 456],
          backgroundColor: '#4CAF50'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }
}

// Initialize Mini Maps
function initializeMiniMaps() {
  const locations = {
    'south-mumbai': [18.9220, 72.8347],
    'western': [19.0760, 72.8777],
    'central': [19.0176, 72.8561],
    'eastern': [19.1136, 72.8697],
    'navi': [19.0330, 73.0297],
    'thane': [19.2183, 72.9781]
  };

  Object.keys(locations).forEach(key => {
    const mapElement = document.getElementById('map-' + key);
    if (mapElement) {
      const map = L.map('map-' + key, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false
      }).setView(locations[key], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker(locations[key]).addTo(map);
    }
  });
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// User Management Functions
function viewUserDetails(userId) {
  // Dummy data - in real app, fetch from server
  const users = {
    'USR-001': {
      id: '#USR-001',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      location: 'South Mumbai',
      date: 'October 25, 2024',
      status: 'Pending'
    }
  };

  const user = users[userId] || users['USR-001'];

  // Update modal content
  document.getElementById('modalUserId').textContent = user.id;
  document.getElementById('modalUserName').textContent = user.name;
  document.getElementById('modalUserEmail').textContent = user.email;
  document.getElementById('modalUserPhone').textContent = user.phone;
  document.getElementById('modalUserLocation').textContent = user.location;
  document.getElementById('modalUserDate').textContent = user.date;
  
  const statusBadge = document.getElementById('modalUserStatus');
  statusBadge.textContent = user.status;
  statusBadge.className = 'status-badge ' + user.status.toLowerCase();

  openModal('userDetailsModal');
}

function openNotifyModal(userId) {
  document.getElementById('notifyRecipient').value = 'User ' + userId;
  openModal('notifyUserModal');
}

function markAsContacted(userId) {
  // In real app, send to server
  alert('User ' + userId + ' marked as contacted!');
  
  // Update UI
  const row = event.target.closest('tr');
  if (row) {
    const statusBadge = row.querySelector('.status-badge');
    if (statusBadge) {
      statusBadge.textContent = 'Contacted';
      statusBadge.className = 'status-badge contacted';
    }
  }
  
  showNotification('User status updated successfully!', 'success');
}

function viewLocationDetails(locationId) {
  const locationData = {
    'south-mumbai': {
      name: 'South Mumbai',
      status: 'Active',
      users: 45,
      trees: 234,
      events: 3,
      coords: [18.9220, 72.8347]
    },
    'western-suburbs': {
      name: 'Western Suburbs',
      status: 'Active',
      users: 38,
      trees: 187,
      events: 2,
      coords: [19.0760, 72.8777]
    },
    'central-mumbai': {
      name: 'Central Mumbai',
      status: 'Active',
      users: 52,
      trees: 298,
      events: 4,
      coords: [19.0176, 72.8561]
    },
    'eastern-suburbs': {
      name: 'Eastern Suburbs',
      status: 'Active',
      users: 29,
      trees: 156,
      events: 1,
      coords: [19.1136, 72.8697]
    },
    'navi-mumbai': {
      name: 'Navi Mumbai',
      status: 'Active',
      users: 34,
      trees: 203,
      events: 2,
      coords: [19.0330, 73.0297]
    },
    'thane': {
      name: 'Thane',
      status: 'Active',
      users: 27,
      trees: 142,
      events: 1,
      coords: [19.2183, 72.9781]
    }
  };

  const loc = locationData[locationId];
  if (!loc) return;

  document.getElementById('modalLocationName').textContent = loc.name;
  document.getElementById('modalLocationStatus').textContent = loc.status;
  document.getElementById('modalLocationUsers').textContent = loc.users;
  document.getElementById('modalLocationTrees').textContent = loc.trees;
  document.getElementById('modalLocationEvents').textContent = loc.events;

  // Initialize map inside modal
  const mapContainer = document.getElementById('modalLocationMap');
  mapContainer.innerHTML = '';
  const map = L.map(mapContainer, {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false
  }).setView(loc.coords, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker(loc.coords).addTo(map);

  openModal('locationDetailsModal');
}

function notifyLocationUsers(locationId) {
  switchSection('notifications');
  // Pre-fill notification form for this location
  setTimeout(() => {
    document.querySelector('input[type="checkbox"][value="location"]').checked = true;
    document.getElementById('locationFilter').style.display = 'block';
    document.querySelector(`input[type="checkbox"][value="${locationId}"]`).checked = true;
  }, 100);
}

// Event Functions
function viewEvent(eventId) {
  // Dummy event data - replace with real data from backend later
  const events = {
    'EVT-001': {
      id: 'EVT-001',
      name: 'Mangrove Restoration Drive',
      date: 'November 10, 2025',
      time: '9:00 AM - 1:00 PM',
      location: 'Thane Creek',
      volunteers: 120,
      description: 'Join us to restore the mangrove ecosystem by planting and cleaning along the Thane Creek belt.'
    },
    'EVT-002': {
      id: 'EVT-002',
      name: 'Tree Plantation Marathon',
      date: 'November 18, 2025',
      time: '7:30 AM - 11:00 AM',
      location: 'Powai Lake, Mumbai',
      volunteers: 200,
      description: 'A collaborative plantation event aimed at creating green belts around Powai Lake.'
    }
  };

  const event = events[eventId] || Object.values(events)[0];

  // Fill modal fields
  document.getElementById('modalEventName').textContent = event.name;
  document.getElementById('modalEventDate').textContent = event.date;
  document.getElementById('modalEventTime').textContent = event.time;
  document.getElementById('modalEventLocation').textContent = event.location;
  document.getElementById('modalEventVolunteers').textContent = event.volunteers;
  document.getElementById('modalEventDescription').textContent = event.description;

  // Open modal
  openModal('eventDetailsModal');
}

// Render events dynamically based on category
function renderEvents(category = 'upcoming') {
  const eventsData = {
    upcoming: [
      {
        id: 'evt-001',
        name: 'Mumbai Monsoon Plantation Drive',
        date: '2025-11-15',
        time: '8:00 AM - 12:00 PM',
        location: 'Sanjay Gandhi National Park, South Mumbai',
        participants: 45,
        trees: 200
      },
      {
        id: 'evt-002',
        name: 'Corporate Green Initiative',
        date: '2025-11-22',
        time: '9:00 AM - 1:00 PM',
        location: 'BKC Business District, Western Suburbs',
        participants: 28,
        trees: 150
      }
    ],
    past: [
      {
        id: 'evt-101',
        name: 'Thane Creek Clean-Up Drive',
        date: '2025-10-10',
        time: '8:00 AM - 11:00 AM',
        location: 'Thane Creek, Thane',
        participants: 62,
        trees: 300
      },
      {
        id: 'evt-102',
        name: 'Community Garden Day',
        date: '2025-09-22',
        time: '7:00 AM - 10:00 AM',
        location: 'Powai Lake, Central Mumbai',
        participants: 50,
        trees: 180
      }
    ],
    draft: [
      {
        id: 'evt-201',
        name: 'Eco Awareness Workshop',
        date: 'TBD',
        time: 'TBD',
        location: 'To be decided',
        participants: 0,
        trees: 0
      }
    ]
  };

  const container = document.getElementById('eventsList');
  container.innerHTML = '';

  const selectedEvents = eventsData[category] || [];

  selectedEvents.forEach(event => {
    const dateObj = new Date(event.date);
    const day = isNaN(dateObj.getDate()) ? '--' : dateObj.getDate();
    const month = isNaN(dateObj.getMonth()) ? '--' : dateObj.toLocaleString('en-US', { month: 'short' });

    const eventItem = `
      <div class="event-item">
        <div class="event-date-badge">
          <div class="date">${day}</div>
          <div class="month">${month.toUpperCase()}</div>
        </div>
        <div class="event-details">
          <h3>${event.name}</h3>
          <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
          <p class="event-time"><i class="fas fa-clock"></i> ${event.time}</p>
          <div class="event-meta">
            <span class="meta-item"><i class="fas fa-users"></i> ${event.participants} Registered</span>
            <span class="meta-item"><i class="fas fa-tree"></i> Target: ${event.trees} trees</span>
          </div>
        </div>
        <div class="event-actions">
          <button class="btn btn-outline" onclick="viewEvent('${event.id}')">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="btn btn-primary" onclick="notifyEventParticipants('${event.id}')">
            <i class="fas fa-bell"></i> Notify
          </button>
          <button class="btn btn-secondary" onclick="editEvent('${event.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', eventItem);
  });
}


function notifyEventParticipants(eventId) {
  alert('Sending notification to participants of event: ' + eventId);
  switchSection('notifications');
  // Pre-fill notification form
  setTimeout(() => {
    document.querySelector('input[type="checkbox"][value="event"]').checked = true;
  }, 100);
}

function editEvent(eventId) {
  alert('Editing event: ' + eventId);
  // In real app, open edit modal with event data
}

// Notification Functions
function updateNotificationPreview() {
  const subject = document.querySelector('#notifications-section input[placeholder="Enter notification subject"]');
  const message = document.querySelector('#notifications-section textarea');
  
  if (subject && message) {
    document.getElementById('previewSubject').textContent = 
      subject.value || 'Your subject will appear here';
    document.getElementById('previewMessage').textContent = 
      message.value || 'Your message will appear here...';
  }
}

function sendNotification() {
  // Validate form
  const subject = document.querySelector('#notifications-section input[placeholder="Enter notification subject"]');
  const message = document.querySelector('#notifications-section textarea');
  
  if (!subject.value || !message.value) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  // In real app, send to server
  showNotification('Notification sent successfully!', 'success');
  
  // Clear form
  subject.value = '';
  message.value = '';
  updateNotificationPreview();
}

// Form Submissions
function setupFormSubmissions() {
  // Notify User Form
  const notifyUserForm = document.getElementById('notifyUserForm');
  if (notifyUserForm) {
    notifyUserForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Notification sent successfully!', 'success');
      closeModal('notifyUserModal');
      this.reset();
    });
  }

  // Create Event Form
  const createEventForm = document.getElementById('createEventForm');
  if (createEventForm) {
    createEventForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Event created successfully!', 'success');
      closeModal('createEventModal');
      this.reset();
    });
  }

  // Add Location Form
  const addLocationForm = document.getElementById('addLocationForm');
  if (addLocationForm) {
    addLocationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Location added successfully!', 'success');
      closeModal('addLocationModal');
      this.reset();
    });
  }
}

// Utility Functions
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '8px',
    background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
    color: 'white',
    zIndex: '10000',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    animation: 'slideInRight 0.3s ease',
    minWidth: '300px'
  });
  
  // Add to body
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification-content i {
    font-size: 20px;
  }
`;
document.head.appendChild(style);

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // Re-initialize charts on resize
    Object.values(charts).forEach(chart => {
      if (chart) chart.resize();
    });
  }, 250);
});

// Search functionality
const searchBox = document.querySelector('.search-box input');
if (searchBox) {
  searchBox.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (currentSection === 'user-registrations') {
      // Search in registrations table
      const rows = document.querySelectorAll('#registrationsTableBody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    }
  });
}

// Export data functionality
function exportData() {
  showNotification('Exporting data...', 'info');
  
  // In real app, generate and download CSV/Excel file
  setTimeout(() => {
    showNotification('Data exported successfully!', 'success');
  }, 1500);
}

// Logout functionality
document.querySelector('.btn-logout').addEventListener('click', function() {
  if (confirm('Are you sure you want to logout?')) {
    showNotification('Logging out...', 'info');
    setTimeout(() => {
      // In real app, clear session and redirect to login
      window.location.href = 'index.html';
    }, 1000);
  }
});

// Auto-save draft functionality for notifications
let draftTimer;
const messageTextarea = document.querySelector('#notifications-section textarea');
const subjectInput = document.querySelector('#notifications-section input[placeholder="Enter notification subject"]');

if (messageTextarea && subjectInput) {
  [messageTextarea, subjectInput].forEach(element => {
    element.addEventListener('input', function() {
      clearTimeout(draftTimer);
      draftTimer = setTimeout(() => {
        // Auto-save draft
        console.log('Draft saved');
      }, 2000);
      
      // Update preview
      updateNotificationPreview();
    });
  });
}

// Counter animation for stats
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 20);
}

// Animate counters on page load
document.querySelectorAll('.stat-number').forEach(stat => {
  const target = parseInt(stat.getAttribute('data-target') || stat.textContent.replace(/,/g, ''));
  stat.setAttribute('data-target', target);
  animateCounter(stat, target);
});

// Initialize tooltips
document.querySelectorAll('[title]').forEach(element => {
  element.style.position = 'relative';
  element.addEventListener('mouseenter', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = this.getAttribute('title');
    tooltip.style.cssText = `
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      margin-bottom: 5px;
      z-index: 1000;
    `;
    this.appendChild(tooltip);
    this.removeAttribute('title');
  });
  
  element.addEventListener('mouseleave', function() {
    const tooltip = this.querySelector('.tooltip');
    if (tooltip) {
      this.setAttribute('title', tooltip.textContent);
      tooltip.remove();
    }
  });
});

console.log('Admin Dashboard initialized successfully!');