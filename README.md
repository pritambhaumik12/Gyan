# GyanSetu - Educational Platform
**Bridging the Gap Between You and Your Goals**

A comprehensive single-page application for educational resource management built with HTML/CSS/JavaScript frontend and Google Apps Script backend.

## 🚀 Features Overview

### 👥 User Features (Registered Members)

#### 🔐 Secure Onboarding & Access
- **User Registration**: Simple signup with name, email, and password
- **Account Login**: Secure authentication system
- **Password Recovery**: "Forgot Password" functionality
- **Session Management**: Persistent login sessions

#### 🏠 Personalized Dashboard
- **Custom Welcome**: Personalized homepage with user name
- **Recently Viewed**: Automatic tracking of last accessed books
- **Platform Announcements**: Important updates from admin
- **Quick Statistics**: Overview of platform metrics

#### 🔍 Advanced Knowledge Discovery
- **Smart Search**: Powerful search by title, author, or description
- **Multi-Level Filtering**: Filter by Class, Subject, Type, and Genre
- **Real-time Results**: Instant search and filter updates
- **Category Management**: Dynamic category loading

#### 📚 Personal Study Tools
- **Bookmarking**: Save books to personal reading list
- **Private Notes**: Add personal notes to any book
- **Recently Viewed**: Track reading history
- **Download Tracking**: Monitor download activity

#### 🤖 Intelligent Recommendations
- **Automated Suggestions**: Books recommended based on viewing history
- **Subject-based Recommendations**: Similar books from same class/subject
- **Popular Content**: Trending books and subjects

#### 📥 Unrestricted Content Access
- **Instant Downloads**: Free PDF downloads for all registered users
- **Download Analytics**: Track download counts and statistics
- **PDF Management**: Secure URL-based file handling

#### 🔗 Community & Sharing
- **Share Books**: Easy link sharing with copy-to-clipboard
- **Social Integration**: Native sharing API support
- **Book Details**: Comprehensive book information display

#### 🎨 Enhanced User Experience
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Professional UI transitions
- **Profile Management**: Update name and password

### 👑 Admin Features (Platform Owner)

#### 🎛️ Command Center Dashboard
- **Secure Admin Login**: Separate authentication (`admin@gyansetu.com` / `admin123`)
- **Analytics Overview**: Key metrics and statistics
- **Recent Activity**: Real-time platform activity monitoring
- **Quick Actions**: Fast access to common tasks

#### 📊 Full Content & User Oversight
- **Book Management (CRUD)**: Complete book lifecycle management
  - Add new books with all metadata
  - Edit existing book information
  - Delete books and clean up related data
  - Toggle book visibility with toggle switches
- **User Management**: Complete user administration
  - View all registered users
  - Reset user passwords
  - Activate/deactivate accounts
  - View user statistics and activity
- **Category Management**: Add and edit filter categories

#### 📈 Strategic Insights & Analytics
- **Trend Analysis**: Identify trending books and subjects
- **Search Insights**: Monitor search terms and zero-result queries
- **Engagement Metrics**: Track user behavior and platform usage
- **Download Statistics**: Comprehensive download analytics

#### 📢 Platform Communication
- **Site-wide Announcements**: Create and manage announcements
- **Priority System**: Set announcement importance levels
- **Content Management**: Rich text announcement creation

#### 🔧 System Health & Maintenance
- **Error Logging**: Automatic error tracking and logging
- **Activity Monitoring**: Complete user action tracking
- **Database Management**: Automatic sheet creation and management
- **System Settings**: Platform configuration options

## 🛠️ Technical Architecture

### Frontend (index.html)
- **Single Page Application**: No page reloads, smooth transitions
- **Vanilla JavaScript**: No dependencies, lightweight
- **CSS Custom Properties**: Theme support and easy customization
- **Responsive Design**: Mobile-first approach
- **Font Awesome Icons**: Professional iconography
- **Local Storage**: Session persistence and user preferences

### Backend (Code.gs)
- **Google Apps Script**: Serverless backend solution
- **Automatic Sheet Creation**: Self-initializing database
- **RESTful API**: Standardized request/response format
- **Comprehensive Logging**: Activity tracking and analytics
- **Data Validation**: Server-side input validation
- **Error Handling**: Robust error management

### Database Structure (Google Sheets)
1. **Users**: User accounts and authentication
2. **Books**: Complete book catalog with metadata
3. **Downloads**: Download tracking and analytics
4. **Bookmarks**: User bookmark management
5. **Notes**: Personal user notes storage
6. **Announcements**: Platform announcements
7. **Categories**: Dynamic category management
8. **Analytics**: User activity and behavior tracking
9. **Settings**: Platform configuration

## 🚀 Quick Deployment Guide

### Step 1: Setup Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project named "GyanSetu Backend"
3. Replace the default code with the contents of `Code.gs`
4. Save the project

### Step 2: Deploy as Web App
1. Click **Deploy** → **New Deployment**
2. Choose type: **Web app**
3. Set execute as: **Me**
4. Set access: **Anyone** (or **Anyone with Google account** for more security)
5. Click **Deploy** and authorize permissions
6. Copy the **Web app URL**

### Step 3: Initialize Database
1. Visit your web app URL with parameter: `?action=init`
2. Example: `https://script.google.com/macros/s/.../exec?action=init`
3. This will create all necessary Google Sheets automatically
4. Note the **Spreadsheet ID** from the response

### Step 4: Configure Frontend
1. Open `index.html` in your preferred code editor
2. Find the `// In real implementation, these would be actual API calls` comment
3. Replace the mock API calls with actual calls to your Apps Script URL
4. Update the `CONFIG.SPREADSHEET_ID` in Code.gs if needed

### Step 5: Host Frontend
Choose one of these hosting options:

#### Option A: GitHub Pages (Recommended)
1. Create a new GitHub repository
2. Upload `index.html`
3. Go to Settings → Pages
4. Select source branch
5. Your site will be available at `https://username.github.io/repository-name`

#### Option B: Google Drive
1. Upload `index.html` to Google Drive
2. Right-click → Get shareable link
3. Change permissions to "Anyone with the link"
4. Access via the provided URL

#### Option C: Local Development
1. Open `index.html` in any modern web browser
2. For API calls to work, you may need to serve via HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

## 🔧 Configuration

### Admin Access
- **Email**: `admin@gyansetu.com`
- **Password**: `admin123`
- Change these in the `CONFIG` object in `Code.gs`

### Default Categories
The system comes pre-configured with:
- **Classes**: 1-12
- **Subjects**: Mathematics, Science, English, Hindi, Social Science, Computer Science, Physics, Chemistry, Biology
- **Types**: Textbook, Reference Book, Question Bank, Study Guide, Previous Year Papers, Sample Papers
- **Genres**: Academic, Competitive Exam, General Knowledge, Literature, Technical, Research

### Sample Data
The system includes 5 sample books covering different subjects and classes to demonstrate functionality.

## 📱 Usage Instructions

### For Students/Users
1. **Register**: Create account with name, email, password
2. **Login**: Access your personalized dashboard
3. **Browse**: Use search and filters to find books
4. **Bookmark**: Save interesting books for later
5. **Download**: Free PDF access for all books
6. **Notes**: Add personal study notes
7. **Share**: Share books with friends

### For Administrators
1. **Login**: Use admin credentials
2. **Manage Books**: Add, edit, delete, or hide books
3. **Manage Users**: View users, reset passwords, manage status
4. **Monitor**: Check analytics and recent activity
5. **Communicate**: Create announcements for users
6. **Maintain**: Monitor system health and performance

## 🎨 Customization

### Themes
The platform supports light and dark themes. Users can toggle between them using the theme button in the header.

### Colors
Modify CSS custom properties in `:root` to change the color scheme:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
  /* ... */
}
```

### Branding
- Change the platform name in the header
- Update the tagline in the welcome section
- Modify the logo icon (currently using Font Awesome graduation cap)

## 📊 Analytics & Monitoring

### User Analytics
- Registration trends
- Login patterns
- Download statistics
- Search behavior
- Popular content

### Admin Insights
- Most downloaded books
- Popular subjects/classes
- User engagement metrics
- Search analytics
- Zero-result searches

## 🔒 Security Features

### Authentication
- Secure password storage (Note: implement hashing in production)
- Session management
- Admin-only areas
- Input validation

### Data Protection
- User data segregation
- Private notes and bookmarks
- Download tracking
- Activity logging

## 🚨 Production Considerations

### Security Enhancements
1. **Password Hashing**: Implement proper password hashing
2. **Rate Limiting**: Add API rate limiting
3. **Input Sanitization**: Enhanced server-side validation
4. **HTTPS**: Ensure all connections are encrypted

### Performance Optimization
1. **Caching**: Implement result caching
2. **Pagination**: Add pagination for large datasets
3. **Image Optimization**: Optimize book covers
4. **CDN**: Use CDN for static assets

### Scalability
1. **Database Migration**: Consider migrating to proper database for large scale
2. **File Storage**: Use dedicated file storage service
3. **Load Balancing**: Implement load balancing for high traffic
4. **Monitoring**: Add comprehensive monitoring and alerting

## 🆘 Troubleshooting

### Common Issues

#### 1. "Script authorization required"
- Re-authorize the Google Apps Script
- Check deployment permissions

#### 2. "No data loading"
- Verify the web app URL is correct
- Check if initialization was completed
- Ensure sheets were created properly

#### 3. "Theme not switching"
- Clear browser cache
- Check if localStorage is enabled

#### 4. "Downloads not working"
- Verify PDF URLs are accessible
- Check user permissions
- Ensure proper book visibility settings

### Debug Mode
Add `?debug=true` to your URL to enable debug logging in the browser console.

## 📞 Support

For technical support or feature requests:
1. Check this README for common solutions
2. Review the code comments for implementation details
3. Test with the provided sample data
4. Verify all deployment steps were completed

## 📄 License

This project is provided as-is for educational purposes. Feel free to modify and distribute according to your needs.

---

**GyanSetu** - Bridging the Gap Between You and Your Goals 🎓
