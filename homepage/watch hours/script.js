
// Initialize or get user data from localStorage
const user = JSON.parse(localStorage.getItem("user")) || {
  username: "Demo",
  password: "admin123",
  role: "AdminUser",
  age: 25,
  upiID: "demo@ybl",
  profileImage: "https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg" // Added default profile image
};

document.addEventListener("DOMContentLoaded", () => {
  // Update username in the profile dropdown
  const usernameElement = document.getElementById('username');
  const profileImage = document.querySelector('.profile img');
  
  if (usernameElement) {
    usernameElement.innerHTML = `${user.username} <br><span>${user.role}</span>`;
  }
  
  // Update profile image
  if (profileImage && user.profileImage) {
    profileImage.src = user.profileImage;
  }

  // Rest of your existing code...
  initializeCharts('30');
  
  // Time period filter change
  const timePeriodSelect = document.getElementById('time-period');
  const customRangeContainer = document.getElementById('custom-range-container');
  
  timePeriodSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
      customRangeContainer.style.display = 'flex';
      customRangeContainer.style.alignItems = 'center';
      customRangeContainer.style.gap = '0.5rem';
    } else {
      customRangeContainer.style.display = 'none';
      initializeCharts(this.value);
      showToast(`Showing data for last ${this.value === '365' ? 'year' : `${this.value} days`}`, 'success');
    }
  });

  // Apply custom date range
  document.getElementById('apply-custom-range').addEventListener('click', function() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    if (!startDate || !endDate) {
      showToast('Please select both start and end dates', 'error');
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      showToast('Start date must be before end date', 'error');
      return;
    }
    
    initializeCharts('custom');
    showToast(`Showing data from ${formatDate(startDate)} to ${formatDate(endDate)}`, 'success');
  });

  // More Options Button Logic - Fixed to properly toggle dropdown
  const moreOptionsBtn = document.getElementById('more-options-btn');
  const dropdown = document.getElementById('more-options-dropdown');

  if (moreOptionsBtn && dropdown) {
    moreOptionsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== moreOptionsBtn) {
        dropdown.classList.remove('show');
      }
    });
  }

  // Prevent dropdown from closing when clicking inside it
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // View User Button Handlers
  const viewUserButtons = document.querySelectorAll('.view-user-btn');
  const userModal = document.getElementById('userModal');
  const userModalContent = document.getElementById('userModalContent');
  
  viewUserButtons.forEach(button => {
    button.addEventListener('click', function() {
      const userId = this.getAttribute('data-user-id');
      loadUserDetails(userId);
      userModal.style.display = 'flex';
    });
  });

  // Email User Button Handlers
  const emailUserButtons = document.querySelectorAll('.email-user-btn');
  const emailModal = document.getElementById('emailModal');
  
  emailUserButtons.forEach(button => {
    button.addEventListener('click', function() {
      const userId = this.getAttribute('data-user-id');
      document.getElementById('emailSubject').value = `Your CineSphere Activity (User #${userId})`;
      emailModal.style.display = 'flex';
    });
  });

  // Close Modal Handlers
  const closeModalButtons = document.querySelectorAll('.close-modal');
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      userModal.style.display = 'none';
      emailModal.style.display = 'none';
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === userModal) {
      userModal.style.display = 'none';
    }
    if (event.target === emailModal) {
      emailModal.style.display = 'none';
    }
  });

  // Send Email Button Handler
  document.getElementById('sendEmailBtn').addEventListener('click', function() {
    const subject = document.getElementById('emailSubject').value;
    const message = document.getElementById('emailMessage').value;
    
    if (!subject || !message) {
      showToast('Please fill in both subject and message', 'error');
      return;
    }
    
    console.log('Email to be sent:', { subject, message });
    emailModal.style.display = 'none';
    showToast('Email sent successfully', 'success');
  });

  // Export Button Handler
  document.getElementById('export-btn').addEventListener('click', function() {
    showToast('Exporting user data as CSV...', 'success');
  });

  // Filter Button Handler
  document.getElementById('filter-btn').addEventListener('click', function() {
    showToast('Filter options would appear here', 'info');
  });

  // Notification Bell Functionality
  const notificationBell = document.getElementById('notificationBell');
  const notificationDropdown = document.getElementById('notificationDropdown');
  
  // Toggle notification dropdown
  notificationBell.addEventListener('click', function(e) {
    e.stopPropagation();
    notificationDropdown.classList.toggle('show');
    
    // Close profile menu if open
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu.classList.contains('active')) {
      profileMenu.classList.remove('active');
    }
  });
  
  // Mark notifications as read
  document.querySelector('.mark-all-read').addEventListener('click', function() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
      item.classList.remove('unread');
    });
    document.querySelector('.notification-badge').textContent = '0';
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    notificationDropdown.classList.remove('show');
  });
  
  // Prevent dropdown from closing when clicking inside
  notificationDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

// Profile menu toggle
function menuToggle() {
  const profileMenu = document.querySelector('.profile-menu');
  profileMenu.classList.toggle('active');
  
  // Close notification dropdown if open
  const notificationDropdown = document.getElementById('notificationDropdown');
  notificationDropdown.classList.remove('show');
}

// Load user details for modal
function loadUserDetails(userId) {
  const userData = {
    '1001': {
      name: 'John Smith',
      email: 'john.smith@example.com',
      joinDate: '2023-01-15',
      totalWatchHours: 24.5,
      totalSessions: 18,
      favoriteGenre: 'Action',
      lastActive: '2 hours ago',
      status: 'Active'
    },
    '1002': {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      joinDate: '2022-11-22',
      totalWatchHours: 42.3,
      totalSessions: 27,
      favoriteGenre: 'Drama',
      lastActive: '1 day ago',
      status: 'Active'
    },
    '1003': {
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      joinDate: '2023-03-10',
      totalWatchHours: 8.7,
      totalSessions: 5,
      favoriteGenre: 'Comedy',
      lastActive: '3 days ago',
      status: 'Inactive'
    },
    '1004': {
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      joinDate: '2023-02-05',
      totalWatchHours: 36.2,
      totalSessions: 22,
      favoriteGenre: 'Sci-Fi',
      lastActive: '5 hours ago',
      status: 'Active'
    },
    '1005': {
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      joinDate: '2022-12-18',
      totalWatchHours: 15.9,
      totalSessions: 11,
      favoriteGenre: 'Documentary',
      lastActive: '1 week ago',
      status: 'Inactive'
    }
  };

  const user = userData[userId];
  if (!user) return;

  const userModalContent = document.getElementById('userModalContent');
  userModalContent.innerHTML = `
    <div class="user-details-grid">
      <div class="detail-item">
        <span class="detail-label">Name:</span>
        <span class="detail-value">${user.name}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Email:</span>
        <span class="detail-value">${user.email}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Member Since:</span>
        <span class="detail-value">${formatDate(user.joinDate)}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Total Watch Hours:</span>
        <span class="detail-value">${user.totalWatchHours} hours</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Total Sessions:</span>
        <span class="detail-value">${user.totalSessions}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Favorite Genre:</span>
        <span class="detail-value">${user.favoriteGenre}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Last Active:</span>
        <span class="detail-value">${user.lastActive}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Status:</span>
        <span class="detail-value badge ${user.status === 'Active' ? 'badge-success' : 'badge-primary'}">${user.status}</span>
      </div>
    </div>
    <style>
      .user-details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .detail-item {
        display: flex;
        flex-direction: column;
      }
      .detail-label {
        font-weight: 500;
        color: var(--text-light);
        font-size: 0.9rem;
      }
      .detail-value {
        font-size: 1rem;
        margin-top: 0.3rem;
      }
      @media (max-width: 600px) {
        .user-details-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}

// Format date to readable string
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Action functions
function generateReport() {
  showToast('Generating PDF report...', 'success');
}

function exportData() {
  showToast('Exporting data as CSV...', 'success');
}

function sendEmail() {
  showToast('Email summary sent to your inbox', 'success');
}

function refreshData() {
  const currentPeriod = document.getElementById('time-period').value;
  initializeCharts(currentPeriod);
  showToast('Data refreshed successfully', 'success');
}

function openSettings() {
  showToast('Opening analytics settings...', 'info');
}

// Toast notification function
function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Copy link functionality
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Link copied to clipboard!', 'success');
  }).catch(err => {
    console.error('Failed to copy: ', err);
    showToast('Failed to copy link', 'error');
  });
}

// Initialize charts with data
function initializeCharts(period = '30') {
  const data = chartData[period];
  
  // Gender Chart (Pie)
  const genderCtx = document.getElementById('genderChart').getContext('2d');
  if (genderChart) genderChart.destroy();
  genderChart = new Chart(genderCtx, {
    type: 'doughnut',
    data: {
      labels: ['Male', 'Female', 'Other', 'Prefer not to say'],
      datasets: [{
        data: data.gender,
        backgroundColor: [
          '#457b9d',
          '#e63946',
          '#a8dadc',
          '#f1faee'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        },
        datalabels: {
          formatter: (value) => {
            return `${value}%`;
          },
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      },
      cutout: '65%',
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });

  // Age Group Chart (Bar)
  const ageGroupCtx = document.getElementById('ageGroupChart').getContext('2d');
  if (ageGroupChart) ageGroupChart.destroy();
  ageGroupChart = new Chart(ageGroupCtx, {
    type: 'bar',
    data: {
      labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'],
      datasets: [{
        label: 'Watch Hours (thousands)',
        data: data.ageGroup,
        backgroundColor: [
          'rgba(69, 123, 157, 0.7)',
          'rgba(230, 57, 70, 0.7)',
          'rgba(69, 123, 157, 0.7)',
          'rgba(230, 57, 70, 0.7)',
          'rgba(69, 123, 157, 0.7)',
          'rgba(230, 57, 70, 0.7)'
        ],
        borderColor: [
          '#457b9d',
          '#e63946',
          '#457b9d',
          '#e63946',
          '#457b9d',
          '#e63946'
        ],
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw}k hours`;
            }
          }
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: (value) => {
            return `${value}k`;
          },
          color: '#2b2d42'
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return `${value}k`;
            }
          }
        }
      }
    }
  });

  // Daily Watch Hours Chart (Line)
  const dailyCtx = document.getElementById('dailyChart').getContext('2d');
  if (dailyChart) dailyChart.destroy();
  dailyChart = new Chart(dailyCtx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Watch Hours',
        data: data.daily,
        backgroundColor: 'rgba(230, 57, 70, 0.1)',
        borderColor: '#e63946',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#e63946',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw} hours`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  });

  // Geographic Distribution Chart (Polar Area)
  const geoCtx = document.getElementById('geoChart').getContext('2d');
  if (geoChart) geoChart.destroy();
  geoChart = new Chart(geoCtx, {
    type: 'polarArea',
    data: {
      labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
      datasets: [{
        data: data.geo,
        backgroundColor: [
          'rgba(69, 123, 157, 0.7)',
          'rgba(230, 57, 70, 0.7)',
          'rgba(42, 157, 143, 0.7)',
          'rgba(233, 196, 106, 0.7)',
          'rgba(231, 111, 81, 0.7)',
          'rgba(168, 218, 220, 0.7)'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        r: {
          pointLabels: {
            display: false
          },
          ticks: {
            display: false
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true
      }
    }
  });

  // Update stats cards
  updateStatsCards(data.stats);
}

// Update stats cards with new data
function updateStatsCards(stats) {
  document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = stats.totalHours;
  document.querySelector('.stat-card:nth-child(2) .stat-value').innerHTML = `${stats.avgTime} <small>hrs/user</small>`;
  document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = stats.activeUsers;
  document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = stats.engagement;
}

// Sample data for different time periods
const chartData = {
  '7': {
    gender: [55, 40, 4, 1],
    ageGroup: [7, 22, 38, 15, 8, 4],
    daily: [800, 1200, 1100, 1300, 1500, 2000, 1800],
    geo: [40, 22, 18, 10, 7, 3],
    stats: {
      totalHours: '8,742',
      avgTime: '2.5',
      activeUsers: '3,892',
      engagement: '72%'
    }
  },
  '30': {
    gender: [58, 38, 3, 1],
    ageGroup: [8, 25, 42, 18, 10, 5],
    daily: [1200, 1900, 1700, 2100, 2300, 2800, 2500],
    geo: [45, 25, 15, 8, 5, 2],
    stats: {
      totalHours: '12,458',
      avgTime: '2.8',
      activeUsers: '4,892',
      engagement: '78%'
    }
  },
  '90': {
    gender: [57, 39, 3, 1],
    ageGroup: [9, 28, 45, 20, 12, 6],
    daily: [1500, 2200, 2000, 2400, 2600, 3200, 2900],
    geo: [48, 28, 18, 10, 7, 3],
    stats: {
      totalHours: '38,742',
      avgTime: '3.1',
      activeUsers: '6,892',
      engagement: '82%'
    }
  },
  '365': {
    gender: [56, 40, 3, 1],
    ageGroup: [10, 30, 50, 25, 15, 10],
    daily: [2000, 2800, 2600, 3000, 3200, 3800, 3500],
    geo: [50, 30, 20, 12, 8, 5],
    stats: {
      totalHours: '152,458',
      avgTime: '3.5',
      activeUsers: '8,892',
      engagement: '85%'
    }
  },
  'custom': {
    gender: [54, 42, 3, 1],
    ageGroup: [7, 24, 40, 20, 12, 7],
    daily: [1000, 1800, 1600, 2000, 2200, 2700, 2400],
    geo: [42, 28, 17, 9, 6, 3],
    stats: {
      totalHours: '10,842',
      avgTime: '2.6',
      activeUsers: '4,192',
      engagement: '76%'
    }
  }
};

// Global chart variables
let genderChart, ageGroupChart, dailyChart, geoChart;

function generateReport() {
    try {
        // Show loading state
        const pdfButton = document.querySelector('#more-options-dropdown button:first-child');
        pdfButton.classList.add('generating-pdf');
        pdfButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        
        // Small delay to show the loading state
        setTimeout(() => {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) {
                throw new Error('PDF library not loaded');
            }
            
            const doc = new jsPDF();
            
            // [Previous PDF generation code here...]
            
            // Save the PDF
            doc.save(`CineSphere_Report_${user.username}_${new Date().toISOString().slice(0,10)}.pdf`);
            
            // Reset button state
            pdfButton.classList.remove('generating-pdf');
            pdfButton.innerHTML = '<i class="fas fa-file-pdf"></i> Generate PDF Report';
            
            showToast('PDF report generated successfully!', 'success');
        }, 500);
        
    } catch (error) {
        console.error('PDF generation failed:', error);
        showToast('Failed to generate PDF: ' + error.message, 'error');
        
        // Reset button state on error
        const pdfButton = document.querySelector('#more-options-dropdown button:first-child');
        if (pdfButton) {
            pdfButton.classList.remove('generating-pdf');
            pdfButton.innerHTML = '<i class="fas fa-file-pdf"></i> Generate PDF Report';
        }
    }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) {
    console.error('Toast container not found');
    return;
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Add icon based on type
  let icon = '';
  switch(type) {
    case 'success': icon = '<i class="fas fa-check-circle"></i>'; break;
    case 'error': icon = '<i class="fas fa-exclamation-circle"></i>'; break;
    case 'warning': icon = '<i class="fas fa-exclamation-triangle"></i>'; break;
    default: icon = '<i class="fas fa-info-circle"></i>';
  }
  
  toast.innerHTML = `${icon}${message}`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Remove toast after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}


// Export Button Handler - Updated with proper toast
document.getElementById('export-btn').addEventListener('click', function() {
  try {
    const exportButton = this;
    const originalHtml = exportButton.innerHTML;
    
    // Show loading state
    exportButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    exportButton.disabled = true;
    
    // Simulate export process (replace with actual export logic)
    setTimeout(() => {
      // Create CSV content
      const rows = [
        ['User ID', 'Name', 'Watch Hours', 'Sessions', 'Last Active', 'Status'],
        ['#USR-1001', 'John Smith', '24.5', '18', '2 hours ago', 'Active'],
        ['#USR-1002', 'Sarah Johnson', '42.3', '27', '1 day ago', 'Active'],
        ['#USR-1003', 'Michael Brown', '8.7', '5', '3 days ago', 'Inactive'],
        ['#USR-1004', 'Emily Davis', '36.2', '22', '5 hours ago', 'Active'],
        ['#USR-1005', 'Robert Wilson', '15.9', '11', '1 week ago', 'Inactive']
      ];
      
      let csvContent = rows.map(e => e.join(",")).join("\n");
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `CineSphere_Users_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset button state
      exportButton.innerHTML = originalHtml;
      exportButton.disabled = false;
      
      showToast('Data exported successfully!', 'success');
    }, 1000);
  } catch (error) {
    console.error('Export failed:', error);
    showToast('Failed to export data: ' + error.message, 'error');
    
    // Reset button state on error
    const exportButton = document.getElementById('export-btn');
    if (exportButton) {
      exportButton.innerHTML = '<i class="fas fa-download"></i> Export';
      exportButton.disabled = false;
    }
  }
});

// PDF Export Button Handler - Updated with proper toast
function generateReport() {
  try {
    const pdfButton = document.getElementById('pdf-report-btn');
    const originalHtml = pdfButton.innerHTML;
    
    // Show loading state
    pdfButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    pdfButton.disabled = true;
    showToast('Preparing PDF report...', 'info');
    
    // Create PDF (using jsPDF)
    setTimeout(() => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add content to PDF
      doc.text('CineSphere Analytics Report', 10, 10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 20);
      doc.text('User Watch Hour Data', 10, 30);
      
      // Add a simple table
      const headers = [['User ID', 'Name', 'Watch Hours']];
      const data = [
        ['#USR-1001', 'John Smith', '24.5'],
        ['#USR-1002', 'Sarah Johnson', '42.3'],
        ['#USR-1003', 'Michael Brown', '8.7'],
        ['#USR-1004', 'Emily Davis', '36.2'],
        ['#USR-1005', 'Robert Wilson', '15.9']
      ];
      
      doc.autoTable({
        head: headers,
        body: data,
        startY: 40
      });
      
      // Save the PDF
      doc.save(`CineSphere_Report_${new Date().toISOString().slice(0,10)}.pdf`);
      
      // Reset button state
      pdfButton.innerHTML = originalHtml;
      pdfButton.disabled = false;
      
      showToast('PDF report generated successfully!', 'success');
    }, 1500);
  } catch (error) {
    console.error('PDF generation failed:', error);
    showToast('Failed to generate PDF: ' + error.message, 'error');
    
    // Reset button state on error
    const pdfButton = document.getElementById('pdf-report-btn');
    if (pdfButton) {
      pdfButton.innerHTML = '<i class="fas fa-file-pdf"></i> Generate PDF Report';
      pdfButton.disabled = false;
    }
  }
}
