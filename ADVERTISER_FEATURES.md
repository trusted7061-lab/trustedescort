# Advertiser Features Documentation

## Overview
This document describes the advertiser profile management features implemented for the Trusted Escort website.

## Features Implemented

### 1. User Registration & Authentication
- **Registration**: Advertisers can create an account via the `/advertiser-signup` page
  - Multi-step form collecting business details
  - Email, password, and business information
  - Account validation and error handling

- **Sign In**: Advertisers sign in at `/signin`
  - Email and password authentication
  - Redirects to advertiser dashboard after successful login
  - Error messages for invalid credentials

### 2. Advertiser Dashboard (`/advertiser-dashboard`)
The dashboard is accessible only to logged-in advertisers. It includes:

#### Profile Creation Form
- **Basic Information**:
  - Name
  - Age (18-60)
  - Location (city selection)
  - Height
  - Ethnicity
  - Eye color
  - Hair color
  - Availability status

- **Image Uploads** (Up to 3 images):
  - First image becomes the main profile picture
  - Images stored as base64 in localStorage
  - Image validation (file type and size < 5MB)
  - Preview functionality

- **Description**:
  - Minimum 50 character description
  - Character counter

- **Languages**: Multi-select from available languages

- **Services Offered**: Multi-select from predefined services like:
  - Dinner & Wine
  - Travel Companion
  - Events
  - Corporate Events
  - And more...

- **Rates**:
  - Hourly rate (required)
  - Half-day, full-day, and overnight rates (optional, auto-calculated if not provided)

### 3. Profile Display

#### Homepage Integration
- New advertiser profiles appear in the "Featured Escorts" section
- Up to 3 most recent advertiser profiles are displayed
- Combined with existing default profiles

#### Escorts Listing Page (`/escorts`)
- Advertiser profiles are integrated with the main escorts listing
- **Location-based filtering**: When users search by city, advertiser profiles from that city are displayed
- Age range filtering works for both advertiser and default profiles

#### Profile Detail Page (`/companion/:id`)
- Advertiser profiles can be viewed in detail just like default profiles
- Displays all information including:
  - Gallery images with navigation
  - Complete profile details
  - Services offered
  - Languages spoken
  - Rates

### 4. Data Storage
- **localStorage Implementation**: All data is currently stored in browser localStorage
- **Data Structure**:
  ```javascript
  {
    advertiserProfiles: [/* array of profile objects */],
    advertiserUsers: [/* array of user accounts */],
    currentUser: {/* logged-in user info */}
  }
  ```

### 5. Profile Management
- Advertisers can **update** their existing profile
- Profile data is auto-populated when editing
- Success messages shown after create/update operations

## Technical Implementation

### New Files Created
1. **`src/services/profileService.js`**: Core service for profile and user management
   - `registerUser()`: Register new advertiser
   - `loginUser()`: Authenticate advertiser
   - `logoutUser()`: Sign out
   - `createProfile()`: Create/update profile
   - `getAllProfiles()`: Get all profiles
   - `getProfilesByLocation()`: Filter by location
   - `imageToBase64()`: Convert images to base64

2. **`src/pages/AdvertiserDashboard.jsx`**: Complete dashboard with profile form

### Modified Files
1. **`src/pages/AdvertiserSignup.jsx`**: 
   - Integrated with profileService for registration
   - Redirects to sign-in after successful signup

2. **`src/pages/SignIn.jsx`**: 
   - Integrated with profileService for authentication
   - Redirects to dashboard after successful login

3. **`src/pages/Home.jsx`**: 
   - Loads advertiser profiles dynamically
   - Displays in featured section

4. **`src/pages/Companions.jsx`**: 
   - Combines advertiser profiles with default escorts
   - Location filtering works for both types

5. **`src/pages/CompanionProfile.jsx`**: 
   - Can display advertiser profiles
   - Handles both numeric and string IDs

6. **`src/App.jsx`**: 
   - Added route for `/advertiser-dashboard`

## Usage Flow

### For Advertisers:
1. Go to `/advertiser-signup` and create an account
2. Sign in at `/signin`
3. You'll be redirected to `/advertiser-dashboard`
4. Fill out the profile form with your details
5. Upload up to 3 images
6. Submit the form

### For Users:
1. Visit the homepage
2. Use the city search to find escorts in a specific location
3. Browse the escorts listing page
4. Advertiser profiles appear alongside default profiles
5. Click on any profile to view full details

## Future Enhancements (Backend Required)

When you implement a backend server, you can:
1. Move from localStorage to a real database (MongoDB, PostgreSQL, etc.)
2. Implement proper authentication with JWT tokens
3. Add image upload to cloud storage (AWS S3, Cloudinary, etc.)
4. Add email verification
5. Implement password reset functionality
6. Add admin panel for profile approval
7. Add profile statistics and analytics
8. Enable real-time booking system

## Testing the Features

### Test Registration:
```javascript
// Example test data
{
  businessName: "Test Escort Agency",
  email: "test@example.com",
  phone: "+91 9876543210",
  password: "test123"
}
```

### Test Profile Creation:
```javascript
{
  name: "Test Companion",
  age: 25,
  location: "Mumbai",
  description: "This is a test description that is more than 50 characters long to meet the requirement.",
  height: "5'6\"",
  languages: ["English", "Hindi"],
  services: ["Dinner & Wine", "Events"],
  hourlyRate: "5000"
}
```

## Notes
- Profile IDs for advertiser profiles are timestamps (unique)
- Default profiles have numeric IDs (1-164)
- Image size limit is 5MB per image
- All advertiser profiles are automatically marked as verified
- Initial rating for new profiles is 4.5/5.0
