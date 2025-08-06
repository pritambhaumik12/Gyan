function initSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const neededSheets = [
    'Users', 'Books', 'Categories', 'Notes', 'Bookmarks', 'Announcements', 'Feedback', 'ErrorLogs', 'AnalyticsViews', 'SearchLogs'
  ];
  neededSheets.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      // Initialize headers based on sheet type
      switch (name) {
        case 'Users':
          sheet.appendRow(['ID', 'Email', 'PasswordHash', 'Name', 'IsAdmin', 'Active', 'CreatedAt']);
          break;
        case 'Books':
          sheet.appendRow(['ID', 'Title', 'Author', 'Class', 'Subject', 'Type', 'Genre', 'URL', 'Visible', 'CreatedAt']);
          break;
        case 'Categories':
          sheet.appendRow(['ID', 'Type', 'Value']);
          break;
        case 'Notes':
          sheet.appendRow(['ID', 'UserID', 'BookID', 'Content', 'CreatedAt']);
          break;
        case 'Bookmarks':
          sheet.appendRow(['ID', 'UserID', 'BookID', 'CreatedAt']);
          break;
        case 'Announcements':
          sheet.appendRow(['ID', 'Title', 'Content', 'CreatedAt']);
          break;
        case 'Feedback':
          sheet.appendRow(['ID', 'UserID', 'Message', 'Status', 'CreatedAt']);
          break;
        case 'ErrorLogs':
          sheet.appendRow(['ID', 'UserID', 'Location', 'Message', 'Timestamp']);
          break;
        case 'AnalyticsViews':
          sheet.appendRow(['ID', 'UserID', 'BookID', 'Timestamp']);
          break;
        case 'SearchLogs':
          sheet.appendRow(['ID', 'UserID', 'Query', 'ResultsCount', 'Timestamp']);
          break;
      }
    }
  });
}

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error('Sheet '+name+' not found.');
  return sheet;
}

function newId_() {
  return Utilities.getUuid();
}

function doGet(e) {
  // Initialize sheets on first load
  initSheets();
  const template = HtmlService.createTemplateFromFile('Index');
  template.route = e.parameter.v || 'home';
  return template.evaluate()
    .setTitle('GyanSetu')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}