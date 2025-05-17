// Helper function to calculate age from date of birth
function calculateAge(birthDate) {
  if (!birthDate) return null;
  
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  
  return age;
}

// Load user data from localStorage or create default user
const user = JSON.parse(localStorage.getItem('user')) || {
  username: 'Demo',
  password: 'admin123',
  email: 'demo@example.com',
  phone: '+1 (123) 456-7890',
  dateOfBirth: '',
  role: 'Admin',
  age: null,
  upiID: 'demo@ybl',
  bio: '',
  language: 'English',
  profileImage: 'https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg',
  gender: '',
  movieGenre: '',
  moviePassion: 3,
};

// Calculate initial age if dateOfBirth exists
if (user.dateOfBirth) {
  user.age = calculateAge(user.dateOfBirth);
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize toasts
  $('#successToast').toast({ delay: 3000, autohide: true });
  $('#errorToast').toast({ delay: 3000, autohide: true });
  $('#successToast').toast('hide');
  $('#errorToast').toast('hide');

  // Get DOM elements
  const usernameInput = document.getElementById('username');
  const bioTextarea = document.getElementById('bio');
  const languageSelect = document.getElementById('language');
  const profileImg = document.getElementById('profileImg');
  const fileInput = document.getElementById('profilePic');
  const resetBtn = document.getElementById('rs');
  const saveBtn = document.getElementById('s1');
  const cancelBtn = document.getElementById('c1');
  const currentEmail = document.getElementById('currentEmail');
  const currentPhone = document.getElementById('currentPhone');
  const dateInput = document.getElementById('dateInput');
  const genderSelect = document.getElementById('gender');
  const movieGenreSelect = document.getElementById('movieGenre');
  const moviePassionInput = document.getElementById('moviePassion');
  const passionLevel = document.getElementById('passionLevel');

  // Set max date to today for date picker
  dateInput.max = new Date().toISOString().split('T')[0];

  // Pre-fill form fields with user data
  usernameInput.value = user.username;
  bioTextarea.value = user.bio;
  languageSelect.value = user.language;
  currentEmail.textContent = user.email;
  currentPhone.textContent = user.phone;
  dateInput.value = user.dateOfBirth;
  genderSelect.value = user.gender;
  movieGenreSelect.value = user.movieGenre;
  moviePassionInput.value = user.moviePassion;
  passionLevel.textContent = '★'.repeat(user.moviePassion) + '☆'.repeat(5-user.moviePassion);

  // Set profile image
  profileImg.src = user.profileImage || 'https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg';

  // Track changes
  let changesMade = false;

  // Field change handlers with specific messages
  function handleFieldChange(fieldName, newValue, oldValue, successMessage) {
    if (newValue !== oldValue) {
      user[fieldName] = newValue;
      localStorage.setItem('user', JSON.stringify(user));
      showSuccessMessage(successMessage);
      changesMade = true;
      return true;
    }
    return false;
  }

 // Date of birth change handler
dateInput.addEventListener('change', function() {
  const selectedDate = new Date(this.value);
  const today = new Date();
  
  if (selectedDate > today) {
    showErrorMessage('Date of birth cannot be in the future');
    this.value = user.dateOfBirth || '';
    return;
  }
  
  const newDate = this.value;
  if (handleFieldChange('dateOfBirth', newDate, user.dateOfBirth, 'Date of birth updated successfully!')) {
    const newAge = calculateAge(newDate);
    if (newAge !== user.age) {
      user.age = newAge;
      localStorage.setItem('user', JSON.stringify(user));
      // Show age in the toast message
      showSuccessMessage(`Date of birth updated successfully! You are now ${newAge} years old.`);
    }
  }
});

  // Gender select handler
  genderSelect.addEventListener('change', function() {
    handleFieldChange('gender', this.value, user.gender, 'Gender updated successfully!');
  });

  // Language select handler
  languageSelect.addEventListener('change', function() {
    handleFieldChange('language', this.value, user.language, 'Language preference updated successfully!');
  });

  // Movie genre select handler
  movieGenreSelect.addEventListener('change', function() {
    handleFieldChange('movieGenre', this.value, user.movieGenre, 'Favorite movie genre updated successfully!');
  });

  // Movie passion rating handler
  moviePassionInput.addEventListener('input', function() {
    if (handleFieldChange('moviePassion', this.value, user.moviePassion, 'Movie passion rating updated successfully!')) {
      passionLevel.textContent = '★'.repeat(this.value) + '☆'.repeat(5-this.value);
    }
  });

  // Bio textarea handler
  bioTextarea.addEventListener('change', function() {
    handleFieldChange('bio', this.value, user.bio, 'Bio updated successfully!');
  });

  // Username input handler
  usernameInput.addEventListener('change', function() {
    const newUsername = this.value.trim();
    
    if (!newUsername) {
      showErrorMessage('Username cannot be empty');
      this.value = user.username;
      return;
    }
    
    if (newUsername.length < 3) {
      showErrorMessage('Username must be at least 3 characters');
      this.value = user.username;
      return;
    }

    handleFieldChange('username', newUsername, user.username, 'Username updated successfully!');
  });

  // File upload handler
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 800 * 1024;
    
    if (!file) return;
    
    if (!validTypes.includes(file.type)) {
      showErrorMessage('Only JPG, PNG, or GIF images are allowed');
      this.value = '';
      return;
    }
    
    if (file.size > maxSize) {
      showErrorMessage('Image must be smaller than 800KB');
      this.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
      if (handleFieldChange('profileImage', event.target.result, user.profileImage, 'Profile image uploaded successfully!')) {
        profileImg.src = event.target.result;
      }
    };
    reader.onerror = function() {
      showErrorMessage('Error reading image file');
      this.value = '';
    };
    reader.readAsDataURL(file);
  });

  // Reset button handler
  resetBtn.addEventListener('click', function() {
    const defaultImage = './images/Rowan Atkinson.jpeg';
    if (handleFieldChange('profileImage', '', user.profileImage, 'Profile image reset to default')) {
      profileImg.src = defaultImage;
      fileInput.value = '';
    }
  });

  // Save button handler (now primarily for validation)
  saveBtn.addEventListener('click', function() {
    if (!changesMade) {
      showSuccessMessage('No changes to save');
      return;
    }
    showSuccessMessage('All changes saved successfully!');
    changesMade = false;
  });

  // Cancel button handler
  cancelBtn.addEventListener('click', function() {
    if (changesMade) {
      usernameInput.value = user.username;
      bioTextarea.value = user.bio;
      languageSelect.value = user.language;
      dateInput.value = user.dateOfBirth;
      genderSelect.value = user.gender;
      movieGenreSelect.value = user.movieGenre;
      moviePassionInput.value = user.moviePassion;
      passionLevel.textContent = '★'.repeat(user.moviePassion) + '☆'.repeat(5-user.moviePassion);
      profileImg.src = user.profileImage || 'https://i.pinimg.com/736x/65/74/9e/65749e1d2b9201b7a299b4370b3d01ca.jpg';
      fileInput.value = '';
      showSuccessMessage('Changes discarded');
      changesMade = false;
    }
  });

  // Toast functions
  window.showSuccessMessage = function(message) {
    $('#successToastMessage').text(message);
    $('#successToast').toast('show');
  };
  
  window.showErrorMessage = function(message) {
    $('#errorToastMessage').text(message);
    $('#errorToast').toast('show');
  };

  // Close toasts when clicking the close button
  $('.toast .close').on('click', function() {
    $(this).closest('.toast').toast('hide');
  });

  // Modal functions
  window.openModal = function(modalId) {
    document.getElementById(modalId).style.display = 'block';
  };

  window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Clear any messages when closing
    const messageElement = document.getElementById(modalId.replace('Modal', 'Message'));
    if (messageElement) messageElement.textContent = '';
  };

  // Close modals when clicking outside
  window.onclick = function(event) {
    if (event.target.className === 'modal-custom') {
      event.target.style.display = 'none';
    }
  };

  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const input = this.closest('.input-group').querySelector('input');
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // Password strength indicator
  const newPasswordInput = document.getElementById('newPassword');
  if (newPasswordInput) {
    newPasswordInput.addEventListener('input', function() {
      const strength = checkPasswordStrength(this.value);
      const strengthElement = document.getElementById('passwordStrength');
      
      if (strengthElement) {
        strengthElement.textContent = strength.message;
        strengthElement.style.color = strength.color;
      }
    });
  }

  // Handle password save
  window.handlePasswordSave = function(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageElement = document.getElementById('passwordMessage');
    
    // Validate current password
    if (currentPassword !== user.password) {
      messageElement.textContent = 'Current password is incorrect';
      messageElement.style.color = 'red';
      return false;
    }
    
    // Validate new password
    if (newPassword.length < 8) {
      messageElement.textContent = 'Password must be at least 8 characters';
      messageElement.style.color = 'red';
      return false;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      messageElement.textContent = 'Passwords do not match';
      messageElement.style.color = 'red';
      return false;
    }
    
    // Save new password
    user.password = newPassword;
    localStorage.setItem('user', JSON.stringify(user));
    
    // Show success message
    messageElement.textContent = 'Password changed successfully!';
    messageElement.style.color = 'green';
    
    // Clear fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    // Close modal after delay
    setTimeout(() => {
      closeModal('passwordModal');
    }, 1500);
    
    return false;
  };

  // Handle email save
  window.handleSave = function(event, inputId, messageId) {
    event.preventDefault();
    
    const inputElement = document.getElementById(inputId);
    const messageElement = document.getElementById(messageId);
    const newValue = inputElement.value.trim();
    
    // Basic validation
    if (!newValue) {
      messageElement.textContent = 'Field cannot be empty';
      messageElement.style.color = 'red';
      return false;
    }
    
    // Special validation for email
    if (inputId === 'emailInput') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newValue)) {
        messageElement.textContent = 'Please enter a valid email address';
        messageElement.style.color = 'red';
        return false;
      }
    }
    
    // Special validation for phone
    if (inputId === 'phoneInput') {
      if (newValue.length < 10) {
        messageElement.textContent = 'Phone number must be at least 10 digits';
        messageElement.style.color = 'red';
        return false;
      }
    }
    
    // Update the value
    if (inputId === 'emailInput') {
      user.email = newValue;
      currentEmail.textContent = newValue;
    } else if (inputId === 'phoneInput') {
      user.phone = newValue;
      currentPhone.textContent = newValue;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    
    // Show success message
    messageElement.textContent = 'Changes saved successfully!';
    messageElement.style.color = 'green';
    
    // Clear field and close modal after delay
    setTimeout(() => {
      inputElement.value = '';
      closeModal(inputId.replace('Input', 'Modal'));
    }, 1500);
    
    return false;
  };

  // Password strength checker
  function checkPasswordStrength(password) {
    if (!password) return { message: '', color: '' };
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;
    
    let strength = 0;
    if (length >= 8) strength++;
    if (length >= 12) strength++;
    if (hasLower && hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;
    
    if (strength <= 2) return { message: 'Weak password', color: 'red' };
    if (strength <= 3) return { message: 'Moderate password', color: 'orange' };
    return { message: 'Strong password', color: 'green' };
  }
});

// Star rating system
document.getElementById('moviePassion').addEventListener('input', function() {
  const stars = '★'.repeat(this.value) + '☆'.repeat(5-this.value);
  document.getElementById('passionLevel').textContent = stars;
});