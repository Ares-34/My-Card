# Admin Panel Documentation

## Enabling/Disabling Admin Panel

The admin panel can be enabled or disabled via the configuration file `/js/config.js`.

**To enable the admin panel:**
```javascript
const ADMIN_ENABLED = true;
```

**To disable the admin panel:**
```javascript
const ADMIN_ENABLED = false;
```

When disabled:
- Direct access to `/admin.html` will redirect to the main site
- The keyboard shortcut (Ctrl+Shift+A) will not work
- A console message will be logged when attempting to access

## Access

### Method 1: Direct URL
Navigate to `/admin.html` in your browser.

### Method 2: Keyboard Shortcut
Press `Ctrl+Shift+A` while on the main site to quickly access the admin panel.

## Login

**Default Password**: `admin123`

⚠️ **Security Note**: This is a client-side only implementation suitable for personal portfolio sites. The password is visible in the source code. For production applications with sensitive data, implement proper server-side authentication.

## Features

### 1. Profile Settings
- **Title**: Change the main title displayed on your site
- **Description**: Update the subtitle/description text

### 2. Visual Effects
- **Default Effect**: Choose from:
  - Particles (floating dots)
  - Rain (rain drops animation)
  - Snow (snowflakes)
  - None (no background effects)
- **Background Video**: Toggle the background video on/off

### 3. Social Links
Update all your social media links:
- Discord
- Instagram
- GitHub
- Twitter

### 4. Music Playlist
Reorder your music tracks using the up/down arrows. The order will be reflected in the music player on the main site.

### 5. Quick Stats
View statistics about your site:
- Number of music tracks
- Available visual effects
- Number of social links

## How Settings Are Saved

All settings are saved in your browser's `localStorage`. This means:
- ✅ Settings persist across browser sessions
- ✅ No server or database needed
- ⚠️ Settings are browser-specific (won't sync across devices)
- ⚠️ Clearing browser data will reset all settings

## Changing the Password

To change the admin password, edit the `ADMIN_PASSWORD` constant in `/js/admin.js`:

```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

## Troubleshooting

**Issue**: Settings not applying to main site
- **Solution**: Clear your browser cache and reload the page

**Issue**: Forgot password
- **Solution**: Clear localStorage or check the password in `/js/admin.js`

**Issue**: Keyboard shortcut not working
- **Solution**: Make sure you're on the main site (not the admin panel) and press Ctrl+Shift+A

## Technical Details

- **Storage**: Browser localStorage
- **Authentication**: Client-side password check
- **Framework**: Vanilla JavaScript (no dependencies)
- **Styling**: Custom CSS with dark theme matching main site
