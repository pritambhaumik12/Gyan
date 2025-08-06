/**
 * GyanSetu - Complete Google Apps Script Backend
 * Bridging the Gap Between You and Your Goals
 * 
 * This script provides a complete backend for the GyanSetu educational platform
 * with automatic sheet creation and management for all data operations.
 */

// Global Configuration
const CONFIG = {
  SPREADSHEET_ID: '', // Will be auto-generated if empty
  ADMIN_EMAIL: 'admin@gyansetu.com',
  ADMIN_PASSWORD: 'admin123',
  SHEETS: {
    USERS: 'Users',
    BOOKS: 'Books',
    DOWNLOADS: 'Downloads',
    BOOKMARKS: 'Bookmarks',
    NOTES: 'Notes',
    ANNOUNCEMENTS: 'Announcements',
    CATEGORIES: 'Categories',
    ANALYTICS: 'Analytics',
    SETTINGS: 'Settings'
  }
};

/**
 * Initialize the application - creates all necessary sheets and sets up the database
 */
function initializeGyanSetu() {
  try {
    Logger.log('Initializing GyanSetu platform...');
    
    // Create or get the main spreadsheet
    const spreadsheet = getOrCreateSpreadsheet();
    
    // Initialize all sheets
    initializeAllSheets(spreadsheet);
    
    // Set up initial data
    setupInitialData(spreadsheet);
    
    Logger.log('GyanSetu platform initialized successfully!');
    return {
      success: true,
      message: 'GyanSetu platform initialized successfully!',
      spreadsheetId: spreadsheet.getId(),
      spreadsheetUrl: spreadsheet.getUrl()
    };
    
  } catch (error) {
    Logger.log('Error initializing GyanSetu: ' + error.toString());
    throw new Error('Failed to initialize GyanSetu: ' + error.message);
  }
}

/**
 * Get or create the main spreadsheet
 */
function getOrCreateSpreadsheet() {
  let spreadsheet;
  
  if (CONFIG.SPREADSHEET_ID) {
    try {
      spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    } catch (e) {
      Logger.log('Spreadsheet not found, creating new one...');
      spreadsheet = SpreadsheetApp.create('GyanSetu Database');
      CONFIG.SPREADSHEET_ID = spreadsheet.getId();
    }
  } else {
    spreadsheet = SpreadsheetApp.create('GyanSetu Database');
    CONFIG.SPREADSHEET_ID = spreadsheet.getId();
  }
  
  return spreadsheet;
}

/**
 * Initialize all required sheets with proper headers
 */
function initializeAllSheets(spreadsheet) {
  // Users Sheet
  const usersSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.USERS);
  if (usersSheet.getLastRow() === 0) {
    usersSheet.getRange(1, 1, 1, 7).setValues([[
      'ID', 'Name', 'Email', 'Password', 'Registration Date', 'Books Downloaded', 'Status'
    ]]);
    usersSheet.getRange(1, 1, 1, 7).setFontWeight('bold');
  }
  
  // Books Sheet
  const booksSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.BOOKS);
  if (booksSheet.getLastRow() === 0) {
    booksSheet.getRange(1, 1, 1, 11).setValues([[
      'ID', 'Title', 'Author', 'Class', 'Subject', 'Type', 'Genre', 'Description', 'PDF URL', 'Downloads', 'Visible', 'Created At'
    ]]);
    booksSheet.getRange(1, 1, 1, 11).setFontWeight('bold');
  }
  
  // Downloads Sheet
  const downloadsSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.DOWNLOADS);
  if (downloadsSheet.getLastRow() === 0) {
    downloadsSheet.getRange(1, 1, 1, 5).setValues([[
      'ID', 'User ID', 'Book ID', 'Download Date', 'IP Address'
    ]]);
    downloadsSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  
  // Bookmarks Sheet
  const bookmarksSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.BOOKMARKS);
  if (bookmarksSheet.getLastRow() === 0) {
    bookmarksSheet.getRange(1, 1, 1, 4).setValues([[
      'ID', 'User ID', 'Book ID', 'Created Date'
    ]]);
    bookmarksSheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  
  // Notes Sheet
  const notesSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.NOTES);
  if (notesSheet.getLastRow() === 0) {
    notesSheet.getRange(1, 1, 1, 5).setValues([[
      'ID', 'User ID', 'Book ID', 'Content', 'Updated Date'
    ]]);
    notesSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  
  // Announcements Sheet
  const announcementsSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.ANNOUNCEMENTS);
  if (announcementsSheet.getLastRow() === 0) {
    announcementsSheet.getRange(1, 1, 1, 6).setValues([[
      'ID', 'Title', 'Content', 'Created Date', 'Active', 'Priority'
    ]]);
    announcementsSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }
  
  // Categories Sheet
  const categoriesSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.CATEGORIES);
  if (categoriesSheet.getLastRow() === 0) {
    categoriesSheet.getRange(1, 1, 1, 4).setValues([[
      'ID', 'Type', 'Name', 'Active'
    ]]);
    categoriesSheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  
  // Analytics Sheet
  const analyticsSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.ANALYTICS);
  if (analyticsSheet.getLastRow() === 0) {
    analyticsSheet.getRange(1, 1, 1, 6).setValues([[
      'ID', 'Event Type', 'User ID', 'Data', 'Timestamp', 'IP Address'
    ]]);
    analyticsSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }
  
  // Settings Sheet
  const settingsSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.SETTINGS);
  if (settingsSheet.getLastRow() === 0) {
    settingsSheet.getRange(1, 1, 1, 3).setValues([[
      'Key', 'Value', 'Updated Date'
    ]]);
    settingsSheet.getRange(1, 1, 1, 3).setFontWeight('bold');
  }
}

/**
 * Get or create a sheet
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

/**
 * Setup initial data including sample books and categories
 */
function setupInitialData(spreadsheet) {
  // Setup Categories
  setupCategories(spreadsheet);
  
  // Setup Sample Books
  setupSampleBooks(spreadsheet);
  
  // Setup Initial Announcements
  setupInitialAnnouncements(spreadsheet);
  
  // Setup System Settings
  setupSystemSettings(spreadsheet);
}

/**
 * Setup initial categories
 */
function setupCategories(spreadsheet) {
  const categoriesSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.CATEGORIES);
  
  if (categoriesSheet.getLastRow() <= 1) {
    const categories = [
      ['class1', 'class', 'Class 1', true],
      ['class2', 'class', 'Class 2', true],
      ['class3', 'class', 'Class 3', true],
      ['class4', 'class', 'Class 4', true],
      ['class5', 'class', 'Class 5', true],
      ['class6', 'class', 'Class 6', true],
      ['class7', 'class', 'Class 7', true],
      ['class8', 'class', 'Class 8', true],
      ['class9', 'class', 'Class 9', true],
      ['class10', 'class', 'Class 10', true],
      ['class11', 'class', 'Class 11', true],
      ['class12', 'class', 'Class 12', true],
      ['math', 'subject', 'Mathematics', true],
      ['science', 'subject', 'Science', true],
      ['english', 'subject', 'English', true],
      ['hindi', 'subject', 'Hindi', true],
      ['social', 'subject', 'Social Science', true],
      ['computer', 'subject', 'Computer Science', true],
      ['physics', 'subject', 'Physics', true],
      ['chemistry', 'subject', 'Chemistry', true],
      ['biology', 'subject', 'Biology', true],
      ['textbook', 'type', 'Textbook', true],
      ['reference', 'type', 'Reference Book', true],
      ['question', 'type', 'Question Bank', true],
      ['guide', 'type', 'Study Guide', true],
      ['previous', 'type', 'Previous Year Papers', true],
      ['sample', 'type', 'Sample Papers', true],
      ['academic', 'genre', 'Academic', true],
      ['competitive', 'genre', 'Competitive Exam', true],
      ['general', 'genre', 'General Knowledge', true],
      ['literature', 'genre', 'Literature', true],
      ['technical', 'genre', 'Technical', true],
      ['research', 'genre', 'Research', true]
    ];
    
    const startRow = categoriesSheet.getLastRow() + 1;
    categoriesSheet.getRange(startRow, 1, categories.length, 4).setValues(categories);
  }
}

/**
 * Setup sample books
 */
function setupSampleBooks(spreadsheet) {
  const booksSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.BOOKS);
  
  if (booksSheet.getLastRow() <= 1) {
    const sampleBooks = [
      [
        generateId(),
        'Mathematics Grade 10',
        'Dr. John Smith',
        'Class 10',
        'Mathematics',
        'Textbook',
        'Academic',
        'Comprehensive mathematics textbook for grade 10 students covering algebra, geometry, and trigonometry.',
        'https://example.com/math-grade-10.pdf',
        150,
        true,
        new Date().toISOString()
      ],
      [
        generateId(),
        'Science Fundamentals',
        'Prof. Jane Doe',
        'Class 9',
        'Science',
        'Reference Book',
        'Academic',
        'Essential science concepts for grade 9 students including physics, chemistry, and biology.',
        'https://example.com/science-fundamentals.pdf',
        200,
        true,
        new Date().toISOString()
      ],
      [
        generateId(),
        'English Grammar Mastery',
        'Sarah Johnson',
        'Class 8',
        'English',
        'Study Guide',
        'Academic',
        'Complete guide to English grammar with examples and exercises.',
        'https://example.com/english-grammar.pdf',
        120,
        true,
        new Date().toISOString()
      ],
      [
        generateId(),
        'Computer Science Basics',
        'Mike Chen',
        'Class 11',
        'Computer Science',
        'Textbook',
        'Technical',
        'Introduction to programming concepts and computer fundamentals.',
        'https://example.com/computer-basics.pdf',
        95,
        true,
        new Date().toISOString()
      ],
      [
        generateId(),
        'Physics Problem Solutions',
        'Dr. Robert Wilson',
        'Class 12',
        'Physics',
        'Question Bank',
        'Academic',
        'Comprehensive collection of physics problems with detailed solutions.',
        'https://example.com/physics-problems.pdf',
        180,
        true,
        new Date().toISOString()
      ]
    ];
    
    const startRow = booksSheet.getLastRow() + 1;
    booksSheet.getRange(startRow, 1, sampleBooks.length, 12).setValues(sampleBooks);
  }
}

/**
 * Setup initial announcements
 */
function setupInitialAnnouncements(spreadsheet) {
  const announcementsSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.ANNOUNCEMENTS);
  
  if (announcementsSheet.getLastRow() <= 1) {
    const announcements = [
      [
        generateId(),
        'Welcome to GyanSetu!',
        'We are excited to have you join our learning community. Explore thousands of educational resources and build your knowledge journey.',
        new Date().toISOString(),
        true,
        1
      ],
      [
        generateId(),
        'New Books Added',
        'We have added over 100 new books across various subjects. Check out the latest additions in your dashboard.',
        new Date().toISOString(),
        true,
        2
      ]
    ];
    
    const startRow = announcementsSheet.getLastRow() + 1;
    announcementsSheet.getRange(startRow, 1, announcements.length, 6).setValues(announcements);
  }
}

/**
 * Setup system settings
 */
function setupSystemSettings(spreadsheet) {
  const settingsSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.SETTINGS);
  
  if (settingsSheet.getLastRow() <= 1) {
    const settings = [
      ['platform_name', 'GyanSetu', new Date().toISOString()],
      ['platform_tagline', 'Bridging the Gap Between You and Your Goals', new Date().toISOString()],
      ['registration_enabled', 'true', new Date().toISOString()],
      ['downloads_enabled', 'true', new Date().toISOString()],
      ['max_downloads_per_day', '50', new Date().toISOString()],
      ['maintenance_mode', 'false', new Date().toISOString()]
    ];
    
    const startRow = settingsSheet.getLastRow() + 1;
    settingsSheet.getRange(startRow, 1, settings.length, 3).setValues(settings);
  }
}

/**
 * Main function to handle web app requests
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    Logger.log('Received action: ' + action);
    
    switch (action) {
      // Authentication
      case 'login':
        return handleLogin(data);
      case 'register':
        return handleRegister(data);
      case 'logout':
        return handleLogout(data);
      
      // User Operations
      case 'getUserProfile':
        return getUserProfile(data);
      case 'updateUserProfile':
        return updateUserProfile(data);
      case 'resetPassword':
        return resetPassword(data);
      
      // Book Operations
      case 'getBooks':
        return getBooks(data);
      case 'getBook':
        return getBook(data);
      case 'addBook':
        return addBook(data);
      case 'updateBook':
        return updateBook(data);
      case 'deleteBook':
        return deleteBook(data);
      case 'toggleBookVisibility':
        return toggleBookVisibility(data);
      case 'downloadBook':
        return downloadBook(data);
      
      // Bookmark Operations
      case 'getBookmarks':
        return getBookmarks(data);
      case 'addBookmark':
        return addBookmark(data);
      case 'removeBookmark':
        return removeBookmark(data);
      
      // Notes Operations
      case 'getNotes':
        return getNotes(data);
      case 'saveNotes':
        return saveNotes(data);
      case 'deleteNotes':
        return deleteNotes(data);
      
      // Admin Operations
      case 'getUsers':
        return getUsers(data);
      case 'updateUserStatus':
        return updateUserStatus(data);
      case 'getAnalytics':
        return getAnalytics(data);
      case 'getRecentActivity':
        return getRecentActivity(data);
      
      // Announcement Operations
      case 'getAnnouncements':
        return getAnnouncements(data);
      case 'addAnnouncement':
        return addAnnouncement(data);
      case 'updateAnnouncement':
        return updateAnnouncement(data);
      case 'deleteAnnouncement':
        return deleteAnnouncement(data);
      
      // Category Operations
      case 'getCategories':
        return getCategories(data);
      case 'addCategory':
        return addCategory(data);
      case 'updateCategory':
        return updateCategory(data);
      
      // System Operations
      case 'getStats':
        return getStats(data);
      case 'searchBooks':
        return searchBooks(data);
      
      default:
        return createResponse(false, 'Unknown action: ' + action);
    }
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.message);
  }
}

/**
 * Handle GET requests
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    switch (action) {
      case 'init':
        return ContentService
          .createTextOutput(JSON.stringify(initializeGyanSetu()))
          .setMimeType(ContentService.MimeType.JSON);
      
      case 'getPublicBooks':
        return ContentService
          .createTextOutput(JSON.stringify(getPublicBooks()))
          .setMimeType(ContentService.MimeType.JSON);
      
      case 'getPublicStats':
        return ContentService
          .createTextOutput(JSON.stringify(getPublicStats()))
          .setMimeType(ContentService.MimeType.JSON);
      
      default:
        return ContentService
          .createTextOutput(JSON.stringify({success: false, message: 'Invalid GET request'}))
          .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== AUTHENTICATION FUNCTIONS =====

/**
 * Handle user login
 */
function handleLogin(data) {
  try {
    const { email, password } = data;
    
    // Check for admin login
    if (email === CONFIG.ADMIN_EMAIL && password === CONFIG.ADMIN_PASSWORD) {
      const adminUser = {
        id: 'admin',
        name: 'Administrator',
        email: email,
        isAdmin: true
      };
      
      logActivity('admin_login', 'admin', { email }, data.ipAddress);
      return createResponse(true, 'Admin login successful', adminUser);
    }
    
    // Check regular user login
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const user = users.find(u => u[2] === email && u[3] === password && u[6] === 'active');
    
    if (user) {
      const userData = {
        id: user[0],
        name: user[1],
        email: user[2],
        registrationDate: user[4],
        booksDownloaded: user[5],
        isAdmin: false
      };
      
      logActivity('user_login', user[0], { email }, data.ipAddress);
      return createResponse(true, 'Login successful', userData);
    }
    
    return createResponse(false, 'Invalid email or password');
    
  } catch (error) {
    Logger.log('Error in handleLogin: ' + error.toString());
    return createResponse(false, 'Login failed: ' + error.message);
  }
}

/**
 * Handle user registration
 */
function handleRegister(data) {
  try {
    const { name, email, password } = data;
    
    // Validate input
    if (!name || !email || !password) {
      return createResponse(false, 'All fields are required');
    }
    
    // Check if email already exists
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const existingUser = users.find(u => u[2] === email);
    if (existingUser) {
      return createResponse(false, 'Email already exists');
    }
    
    // Create new user
    const userId = generateId();
    const newUser = [
      userId,
      name,
      email,
      password,
      new Date().toISOString(),
      0,
      'active'
    ];
    
    // Add to sheet
    const lastRow = usersSheet.getLastRow();
    usersSheet.getRange(lastRow + 1, 1, 1, 7).setValues([newUser]);
    
    const userData = {
      id: userId,
      name: name,
      email: email,
      registrationDate: newUser[4],
      booksDownloaded: 0,
      isAdmin: false
    };
    
    logActivity('user_registration', userId, { email }, data.ipAddress);
    return createResponse(true, 'Registration successful', userData);
    
  } catch (error) {
    Logger.log('Error in handleRegister: ' + error.toString());
    return createResponse(false, 'Registration failed: ' + error.message);
  }
}

/**
 * Handle logout
 */
function handleLogout(data) {
  try {
    logActivity('user_logout', data.userId, {}, data.ipAddress);
    return createResponse(true, 'Logout successful');
  } catch (error) {
    return createResponse(false, 'Logout failed: ' + error.message);
  }
}

// ===== USER PROFILE FUNCTIONS =====

/**
 * Get user profile
 */
function getUserProfile(data) {
  try {
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const user = users.find(u => u[0] === data.userId);
    if (!user) {
      return createResponse(false, 'User not found');
    }
    
    const profile = {
      id: user[0],
      name: user[1],
      email: user[2],
      registrationDate: user[4],
      booksDownloaded: user[5],
      status: user[6]
    };
    
    return createResponse(true, 'Profile retrieved', profile);
    
  } catch (error) {
    return createResponse(false, 'Failed to get profile: ' + error.message);
  }
}

/**
 * Update user profile
 */
function updateUserProfile(data) {
  try {
    const { userId, name, password } = data;
    
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const userIndex = users.findIndex(u => u[0] === userId);
    if (userIndex === -1) {
      return createResponse(false, 'User not found');
    }
    
    // Update name
    if (name) {
      usersSheet.getRange(userIndex + 2, 2).setValue(name);
    }
    
    // Update password if provided
    if (password) {
      usersSheet.getRange(userIndex + 2, 4).setValue(password);
    }
    
    logActivity('profile_update', userId, { name }, data.ipAddress);
    return createResponse(true, 'Profile updated successfully');
    
  } catch (error) {
    return createResponse(false, 'Failed to update profile: ' + error.message);
  }
}

// ===== BOOK FUNCTIONS =====

/**
 * Get all books (with optional filtering)
 */
function getBooks(data) {
  try {
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const books = getSheetData(booksSheet);
    
    let filteredBooks = books;
    
    // Apply filters if provided
    if (data.filters) {
      const { search, class: classFilter, subject, type, genre, visible } = data.filters;
      
      filteredBooks = books.filter(book => {
        let matches = true;
        
        if (search) {
          const searchLower = search.toLowerCase();
          matches = matches && (
            book[1].toLowerCase().includes(searchLower) ||
            book[2].toLowerCase().includes(searchLower) ||
            book[7].toLowerCase().includes(searchLower)
          );
        }
        
        if (classFilter) matches = matches && book[3] === classFilter;
        if (subject) matches = matches && book[4] === subject;
        if (type) matches = matches && book[5] === type;
        if (genre) matches = matches && book[6] === genre;
        if (visible !== undefined) matches = matches && book[10] === visible;
        
        return matches;
      });
    }
    
    // Format books data
    const formattedBooks = filteredBooks.map(book => ({
      id: book[0],
      title: book[1],
      author: book[2],
      class: book[3],
      subject: book[4],
      type: book[5],
      genre: book[6],
      description: book[7],
      pdfUrl: book[8],
      downloads: book[9],
      visible: book[10],
      createdAt: book[11]
    }));
    
    return createResponse(true, 'Books retrieved', formattedBooks);
    
  } catch (error) {
    return createResponse(false, 'Failed to get books: ' + error.message);
  }
}

/**
 * Get public books (for non-authenticated users)
 */
function getPublicBooks() {
  try {
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const books = getSheetData(booksSheet);
    
    const publicBooks = books
      .filter(book => book[10] === true) // Only visible books
      .map(book => ({
        id: book[0],
        title: book[1],
        author: book[2],
        class: book[3],
        subject: book[4],
        type: book[5],
        genre: book[6],
        description: book[7],
        downloads: book[9]
      }));
    
    return { success: true, data: publicBooks };
    
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Add new book
 */
function addBook(data) {
  try {
    const { title, author, class: bookClass, subject, type, genre, description, pdfUrl } = data;
    
    if (!title || !author || !bookClass || !subject || !type || !genre || !pdfUrl) {
      return createResponse(false, 'All required fields must be provided');
    }
    
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const bookId = generateId();
    
    const newBook = [
      bookId,
      title,
      author,
      bookClass,
      subject,
      type,
      genre,
      description || '',
      pdfUrl,
      0, // downloads
      true, // visible
      new Date().toISOString()
    ];
    
    const lastRow = booksSheet.getLastRow();
    booksSheet.getRange(lastRow + 1, 1, 1, 12).setValues([newBook]);
    
    logActivity('book_added', data.userId, { bookId, title }, data.ipAddress);
    return createResponse(true, 'Book added successfully', { id: bookId });
    
  } catch (error) {
    return createResponse(false, 'Failed to add book: ' + error.message);
  }
}

/**
 * Update book
 */
function updateBook(data) {
  try {
    const { bookId, title, author, class: bookClass, subject, type, genre, description, pdfUrl } = data;
    
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const books = getSheetData(booksSheet);
    
    const bookIndex = books.findIndex(book => book[0] === bookId);
    if (bookIndex === -1) {
      return createResponse(false, 'Book not found');
    }
    
    // Update book data
    const rowNumber = bookIndex + 2;
    if (title) booksSheet.getRange(rowNumber, 2).setValue(title);
    if (author) booksSheet.getRange(rowNumber, 3).setValue(author);
    if (bookClass) booksSheet.getRange(rowNumber, 4).setValue(bookClass);
    if (subject) booksSheet.getRange(rowNumber, 5).setValue(subject);
    if (type) booksSheet.getRange(rowNumber, 6).setValue(type);
    if (genre) booksSheet.getRange(rowNumber, 7).setValue(genre);
    if (description !== undefined) booksSheet.getRange(rowNumber, 8).setValue(description);
    if (pdfUrl) booksSheet.getRange(rowNumber, 9).setValue(pdfUrl);
    
    logActivity('book_updated', data.userId, { bookId, title }, data.ipAddress);
    return createResponse(true, 'Book updated successfully');
    
  } catch (error) {
    return createResponse(false, 'Failed to update book: ' + error.message);
  }
}

/**
 * Delete book
 */
function deleteBook(data) {
  try {
    const { bookId } = data;
    
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const books = getSheetData(booksSheet);
    
    const bookIndex = books.findIndex(book => book[0] === bookId);
    if (bookIndex === -1) {
      return createResponse(false, 'Book not found');
    }
    
    // Delete the row
    booksSheet.deleteRow(bookIndex + 2);
    
    // Also clean up related data
    cleanupBookData(bookId);
    
    logActivity('book_deleted', data.userId, { bookId }, data.ipAddress);
    return createResponse(true, 'Book deleted successfully');
    
  } catch (error) {
    return createResponse(false, 'Failed to delete book: ' + error.message);
  }
}

/**
 * Toggle book visibility
 */
function toggleBookVisibility(data) {
  try {
    const { bookId } = data;
    
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const books = getSheetData(booksSheet);
    
    const bookIndex = books.findIndex(book => book[0] === bookId);
    if (bookIndex === -1) {
      return createResponse(false, 'Book not found');
    }
    
    const currentVisibility = books[bookIndex][10];
    const newVisibility = !currentVisibility;
    
    booksSheet.getRange(bookIndex + 2, 11).setValue(newVisibility);
    
    logActivity('book_visibility_toggled', data.userId, { bookId, visible: newVisibility }, data.ipAddress);
    return createResponse(true, 'Book visibility updated', { visible: newVisibility });
    
  } catch (error) {
    return createResponse(false, 'Failed to toggle visibility: ' + error.message);
  }
}

/**
 * Download book (track download)
 */
function downloadBook(data) {
  try {
    const { userId, bookId } = data;
    
    // Verify book exists and is visible
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const books = getSheetData(booksSheet);
    
    const bookIndex = books.findIndex(book => book[0] === bookId);
    if (bookIndex === -1) {
      return createResponse(false, 'Book not found');
    }
    
    const book = books[bookIndex];
    if (!book[10]) { // Not visible
      return createResponse(false, 'Book is not available');
    }
    
    // Increment download count
    const newDownloadCount = (book[9] || 0) + 1;
    booksSheet.getRange(bookIndex + 2, 10).setValue(newDownloadCount);
    
    // Track download
    const downloadsSheet = getSheet(CONFIG.SHEETS.DOWNLOADS);
    const downloadRecord = [
      generateId(),
      userId,
      bookId,
      new Date().toISOString(),
      data.ipAddress || 'unknown'
    ];
    
    const lastRow = downloadsSheet.getLastRow();
    downloadsSheet.getRange(lastRow + 1, 1, 1, 5).setValues([downloadRecord]);
    
    // Update user's download count
    if (userId !== 'guest') {
      updateUserDownloadCount(userId);
    }
    
    logActivity('book_downloaded', userId, { bookId, title: book[1] }, data.ipAddress);
    return createResponse(true, 'Download tracked', { 
      pdfUrl: book[8],
      title: book[1],
      author: book[2]
    });
    
  } catch (error) {
    return createResponse(false, 'Failed to process download: ' + error.message);
  }
}

// ===== BOOKMARK FUNCTIONS =====

/**
 * Get user bookmarks
 */
function getBookmarks(data) {
  try {
    const { userId } = data;
    
    const bookmarksSheet = getSheet(CONFIG.SHEETS.BOOKMARKS);
    const bookmarks = getSheetData(bookmarksSheet);
    
    const userBookmarks = bookmarks
      .filter(bookmark => bookmark[1] === userId)
      .map(bookmark => ({
        id: bookmark[0],
        bookId: bookmark[2],
        createdDate: bookmark[3]
      }));
    
    return createResponse(true, 'Bookmarks retrieved', userBookmarks);
    
  } catch (error) {
    return createResponse(false, 'Failed to get bookmarks: ' + error.message);
  }
}

/**
 * Add bookmark
 */
function addBookmark(data) {
  try {
    const { userId, bookId } = data;
    
    const bookmarksSheet = getSheet(CONFIG.SHEETS.BOOKMARKS);
    const bookmarks = getSheetData(bookmarksSheet);
    
    // Check if bookmark already exists
    const existingBookmark = bookmarks.find(b => b[1] === userId && b[2] === bookId);
    if (existingBookmark) {
      return createResponse(false, 'Book already bookmarked');
    }
    
    const newBookmark = [
      generateId(),
      userId,
      bookId,
      new Date().toISOString()
    ];
    
    const lastRow = bookmarksSheet.getLastRow();
    bookmarksSheet.getRange(lastRow + 1, 1, 1, 4).setValues([newBookmark]);
    
    logActivity('bookmark_added', userId, { bookId }, data.ipAddress);
    return createResponse(true, 'Bookmark added');
    
  } catch (error) {
    return createResponse(false, 'Failed to add bookmark: ' + error.message);
  }
}

/**
 * Remove bookmark
 */
function removeBookmark(data) {
  try {
    const { userId, bookId } = data;
    
    const bookmarksSheet = getSheet(CONFIG.SHEETS.BOOKMARKS);
    const bookmarks = getSheetData(bookmarksSheet);
    
    const bookmarkIndex = bookmarks.findIndex(b => b[1] === userId && b[2] === bookId);
    if (bookmarkIndex === -1) {
      return createResponse(false, 'Bookmark not found');
    }
    
    bookmarksSheet.deleteRow(bookmarkIndex + 2);
    
    logActivity('bookmark_removed', userId, { bookId }, data.ipAddress);
    return createResponse(true, 'Bookmark removed');
    
  } catch (error) {
    return createResponse(false, 'Failed to remove bookmark: ' + error.message);
  }
}

// ===== NOTES FUNCTIONS =====

/**
 * Get user notes for a book
 */
function getNotes(data) {
  try {
    const { userId, bookId } = data;
    
    const notesSheet = getSheet(CONFIG.SHEETS.NOTES);
    const notes = getSheetData(notesSheet);
    
    const userNote = notes.find(note => note[1] === userId && note[2] === bookId);
    
    if (userNote) {
      return createResponse(true, 'Notes retrieved', {
        id: userNote[0],
        content: userNote[3],
        updatedDate: userNote[4]
      });
    }
    
    return createResponse(true, 'No notes found', null);
    
  } catch (error) {
    return createResponse(false, 'Failed to get notes: ' + error.message);
  }
}

/**
 * Save user notes
 */
function saveNotes(data) {
  try {
    const { userId, bookId, content } = data;
    
    const notesSheet = getSheet(CONFIG.SHEETS.NOTES);
    const notes = getSheetData(notesSheet);
    
    const existingNoteIndex = notes.findIndex(note => note[1] === userId && note[2] === bookId);
    
    if (existingNoteIndex !== -1) {
      // Update existing note
      const rowNumber = existingNoteIndex + 2;
      notesSheet.getRange(rowNumber, 4).setValue(content);
      notesSheet.getRange(rowNumber, 5).setValue(new Date().toISOString());
    } else {
      // Create new note
      const newNote = [
        generateId(),
        userId,
        bookId,
        content,
        new Date().toISOString()
      ];
      
      const lastRow = notesSheet.getLastRow();
      notesSheet.getRange(lastRow + 1, 1, 1, 5).setValues([newNote]);
    }
    
    logActivity('notes_saved', userId, { bookId }, data.ipAddress);
    return createResponse(true, 'Notes saved');
    
  } catch (error) {
    return createResponse(false, 'Failed to save notes: ' + error.message);
  }
}

// ===== ADMIN FUNCTIONS =====

/**
 * Get all users (admin only)
 */
function getUsers(data) {
  try {
    if (!data.isAdmin) {
      return createResponse(false, 'Access denied');
    }
    
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const formattedUsers = users.map(user => ({
      id: user[0],
      name: user[1],
      email: user[2],
      registrationDate: user[4],
      booksDownloaded: user[5],
      status: user[6]
    }));
    
    return createResponse(true, 'Users retrieved', formattedUsers);
    
  } catch (error) {
    return createResponse(false, 'Failed to get users: ' + error.message);
  }
}

/**
 * Update user status (admin only)
 */
function updateUserStatus(data) {
  try {
    if (!data.isAdmin) {
      return createResponse(false, 'Access denied');
    }
    
    const { userId, status } = data;
    
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const userIndex = users.findIndex(u => u[0] === userId);
    if (userIndex === -1) {
      return createResponse(false, 'User not found');
    }
    
    usersSheet.getRange(userIndex + 2, 7).setValue(status);
    
    logActivity('user_status_updated', data.adminId, { userId, status }, data.ipAddress);
    return createResponse(true, 'User status updated');
    
  } catch (error) {
    return createResponse(false, 'Failed to update user status: ' + error.message);
  }
}

/**
 * Get analytics data
 */
function getAnalytics(data) {
  try {
    if (!data.isAdmin) {
      return createResponse(false, 'Access denied');
    }
    
    const analyticsSheet = getSheet(CONFIG.SHEETS.ANALYTICS);
    const analytics = getSheetData(analyticsSheet);
    
    // Get recent analytics (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentAnalytics = analytics.filter(record => {
      const recordDate = new Date(record[4]);
      return recordDate > thirtyDaysAgo;
    });
    
    // Group by event type
    const eventCounts = {};
    recentAnalytics.forEach(record => {
      const eventType = record[1];
      eventCounts[eventType] = (eventCounts[eventType] || 0) + 1;
    });
    
    return createResponse(true, 'Analytics retrieved', {
      totalEvents: recentAnalytics.length,
      eventCounts: eventCounts,
      recentEvents: recentAnalytics.slice(-10).reverse()
    });
    
  } catch (error) {
    return createResponse(false, 'Failed to get analytics: ' + error.message);
  }
}

// ===== ANNOUNCEMENT FUNCTIONS =====

/**
 * Get announcements
 */
function getAnnouncements(data) {
  try {
    const announcementsSheet = getSheet(CONFIG.SHEETS.ANNOUNCEMENTS);
    const announcements = getSheetData(announcementsSheet);
    
    let filteredAnnouncements = announcements;
    
    // If not admin, only show active announcements
    if (!data.isAdmin) {
      filteredAnnouncements = announcements.filter(a => a[4] === true);
    }
    
    const formattedAnnouncements = filteredAnnouncements
      .sort((a, b) => new Date(b[3]) - new Date(a[3])) // Sort by date, newest first
      .map(announcement => ({
        id: announcement[0],
        title: announcement[1],
        content: announcement[2],
        createdDate: announcement[3],
        active: announcement[4],
        priority: announcement[5]
      }));
    
    return createResponse(true, 'Announcements retrieved', formattedAnnouncements);
    
  } catch (error) {
    return createResponse(false, 'Failed to get announcements: ' + error.message);
  }
}

/**
 * Add announcement (admin only)
 */
function addAnnouncement(data) {
  try {
    if (!data.isAdmin) {
      return createResponse(false, 'Access denied');
    }
    
    const { title, content, priority = 1 } = data;
    
    if (!title || !content) {
      return createResponse(false, 'Title and content are required');
    }
    
    const announcementsSheet = getSheet(CONFIG.SHEETS.ANNOUNCEMENTS);
    const newAnnouncement = [
      generateId(),
      title,
      content,
      new Date().toISOString(),
      true,
      priority
    ];
    
    const lastRow = announcementsSheet.getLastRow();
    announcementsSheet.getRange(lastRow + 1, 1, 1, 6).setValues([newAnnouncement]);
    
    logActivity('announcement_added', data.adminId, { title }, data.ipAddress);
    return createResponse(true, 'Announcement added');
    
  } catch (error) {
    return createResponse(false, 'Failed to add announcement: ' + error.message);
  }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Get sheet by name
 */
function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  return spreadsheet.getSheetByName(sheetName);
}

/**
 * Get all data from a sheet (excluding header)
 */
function getSheetData(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  
  const lastCol = sheet.getLastColumn();
  return sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
}

/**
 * Generate unique ID
 */
function generateId() {
  return 'id_' + Utilities.getUuid().replace(/-/g, '');
}

/**
 * Create standardized API response
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Log activity for analytics
 */
function logActivity(eventType, userId, eventData, ipAddress = 'unknown') {
  try {
    const analyticsSheet = getSheet(CONFIG.SHEETS.ANALYTICS);
    const activity = [
      generateId(),
      eventType,
      userId || 'anonymous',
      JSON.stringify(eventData),
      new Date().toISOString(),
      ipAddress
    ];
    
    const lastRow = analyticsSheet.getLastRow();
    analyticsSheet.getRange(lastRow + 1, 1, 1, 6).setValues([activity]);
    
  } catch (error) {
    Logger.log('Error logging activity: ' + error.toString());
  }
}

/**
 * Update user download count
 */
function updateUserDownloadCount(userId) {
  try {
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const userIndex = users.findIndex(u => u[0] === userId);
    if (userIndex !== -1) {
      const currentCount = users[userIndex][5] || 0;
      usersSheet.getRange(userIndex + 2, 6).setValue(currentCount + 1);
    }
  } catch (error) {
    Logger.log('Error updating user download count: ' + error.toString());
  }
}

/**
 * Clean up book-related data when book is deleted
 */
function cleanupBookData(bookId) {
  try {
    // Remove bookmarks
    const bookmarksSheet = getSheet(CONFIG.SHEETS.BOOKMARKS);
    const bookmarks = getSheetData(bookmarksSheet);
    
    for (let i = bookmarks.length - 1; i >= 0; i--) {
      if (bookmarks[i][2] === bookId) {
        bookmarksSheet.deleteRow(i + 2);
      }
    }
    
    // Remove notes
    const notesSheet = getSheet(CONFIG.SHEETS.NOTES);
    const notes = getSheetData(notesSheet);
    
    for (let i = notes.length - 1; i >= 0; i--) {
      if (notes[i][2] === bookId) {
        notesSheet.deleteRow(i + 2);
      }
    }
    
  } catch (error) {
    Logger.log('Error cleaning up book data: ' + error.toString());
  }
}

/**
 * Get public statistics
 */
function getPublicStats() {
  try {
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const downloadsSheet = getSheet(CONFIG.SHEETS.DOWNLOADS);
    
    const books = getSheetData(booksSheet);
    const users = getSheetData(usersSheet);
    const downloads = getSheetData(downloadsSheet);
    
    const visibleBooks = books.filter(book => book[10] === true);
    const totalDownloads = books.reduce((sum, book) => sum + (book[9] || 0), 0);
    
    return {
      success: true,
      data: {
        totalBooks: visibleBooks.length,
        totalUsers: users.length,
        totalDownloads: totalDownloads
      }
    };
    
  } catch (error) {
    return { success: false, message: error.message };
  }
}

/**
 * Get statistics (for dashboard)
 */
function getStats(data) {
  try {
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const downloadsSheet = getSheet(CONFIG.SHEETS.DOWNLOADS);
    
    const books = getSheetData(booksSheet);
    const users = getSheetData(usersSheet);
    const downloads = getSheetData(downloadsSheet);
    
    const visibleBooks = books.filter(book => book[10] === true);
    const totalDownloads = books.reduce((sum, book) => sum + (book[9] || 0), 0);
    
    // Get new users in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsers = users.filter(user => {
      const regDate = new Date(user[4]);
      return regDate > thirtyDaysAgo;
    });
    
    const stats = {
      totalBooks: data.isAdmin ? books.length : visibleBooks.length,
      totalUsers: users.length,
      totalDownloads: totalDownloads,
      newUsers: newUsers.length,
      visibleBooks: visibleBooks.length
    };
    
    return createResponse(true, 'Statistics retrieved', stats);
    
  } catch (error) {
    return createResponse(false, 'Failed to get statistics: ' + error.message);
  }
}

/**
 * Search books
 */
function searchBooks(data) {
  try {
    const { query, filters = {} } = data;
    
    const booksSheet = getSheet(CONFIG.SHEETS.BOOKS);
    const books = getSheetData(booksSheet);
    
    let results = books.filter(book => book[10] === true); // Only visible books
    
    // Apply text search
    if (query) {
      const queryLower = query.toLowerCase();
      results = results.filter(book =>
        book[1].toLowerCase().includes(queryLower) ||
        book[2].toLowerCase().includes(queryLower) ||
        book[7].toLowerCase().includes(queryLower)
      );
    }
    
    // Apply filters
    if (filters.class) results = results.filter(book => book[3] === filters.class);
    if (filters.subject) results = results.filter(book => book[4] === filters.subject);
    if (filters.type) results = results.filter(book => book[5] === filters.type);
    if (filters.genre) results = results.filter(book => book[6] === filters.genre);
    
    const formattedResults = results.map(book => ({
      id: book[0],
      title: book[1],
      author: book[2],
      class: book[3],
      subject: book[4],
      type: book[5],
      genre: book[6],
      description: book[7],
      downloads: book[9]
    }));
    
    // Log search activity
    logActivity('search_performed', data.userId || 'anonymous', { query, resultsCount: formattedResults.length }, data.ipAddress);
    
    return createResponse(true, 'Search completed', formattedResults);
    
  } catch (error) {
    return createResponse(false, 'Search failed: ' + error.message);
  }
}

/**
 * Get categories
 */
function getCategories(data) {
  try {
    const categoriesSheet = getSheet(CONFIG.SHEETS.CATEGORIES);
    const categories = getSheetData(categoriesSheet);
    
    const activeCategories = categories.filter(cat => cat[3] === true);
    
    const groupedCategories = {
      classes: [],
      subjects: [],
      types: [],
      genres: []
    };
    
    activeCategories.forEach(cat => {
      const type = cat[1];
      const name = cat[2];
      
      if (type === 'class') groupedCategories.classes.push(name);
      else if (type === 'subject') groupedCategories.subjects.push(name);
      else if (type === 'type') groupedCategories.types.push(name);
      else if (type === 'genre') groupedCategories.genres.push(name);
    });
    
    return createResponse(true, 'Categories retrieved', groupedCategories);
    
  } catch (error) {
    return createResponse(false, 'Failed to get categories: ' + error.message);
  }
}

/**
 * Reset user password (admin only)
 */
function resetPassword(data) {
  try {
    if (!data.isAdmin) {
      return createResponse(false, 'Access denied');
    }
    
    const { userId } = data;
    const newPassword = 'temp123'; // Temporary password
    
    const usersSheet = getSheet(CONFIG.SHEETS.USERS);
    const users = getSheetData(usersSheet);
    
    const userIndex = users.findIndex(u => u[0] === userId);
    if (userIndex === -1) {
      return createResponse(false, 'User not found');
    }
    
    usersSheet.getRange(userIndex + 2, 4).setValue(newPassword);
    
    logActivity('password_reset', data.adminId, { userId }, data.ipAddress);
    return createResponse(true, 'Password reset successfully', { newPassword });
    
  } catch (error) {
    return createResponse(false, 'Failed to reset password: ' + error.message);
  }
}

/**
 * Get recent activity for admin dashboard
 */
function getRecentActivity(data) {
  try {
    if (!data.isAdmin) {
      return createResponse(false, 'Access denied');
    }
    
    const analyticsSheet = getSheet(CONFIG.SHEETS.ANALYTICS);
    const analytics = getSheetData(analyticsSheet);
    
    // Get last 20 activities
    const recentActivities = analytics
      .slice(-20)
      .reverse()
      .map(activity => ({
        id: activity[0],
        eventType: activity[1],
        userId: activity[2],
        data: JSON.parse(activity[3] || '{}'),
        timestamp: activity[4],
        ipAddress: activity[5]
      }));
    
    return createResponse(true, 'Recent activity retrieved', recentActivities);
    
  } catch (error) {
    return createResponse(false, 'Failed to get recent activity: ' + error.message);
  }
}

// Auto-run initialization when script is first deployed
function onInstall() {
  return initializeGyanSetu();
}