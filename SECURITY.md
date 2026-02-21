# Security Best Practices

This document outlines the security measures implemented in the Bring the Menu application.

## Authentication Security

### Password Requirements
- Minimum 8 characters
- Must contain uppercase letters
- Must contain lowercase letters
- Must contain numbers
- Maximum 128 characters

### Input Validation
- All user inputs are validated and sanitized before processing
- Email addresses are validated using RFC-compliant regex
- Restaurant names are sanitized to prevent XSS attacks
- All string inputs are trimmed and sanitized

### Error Handling
- Error messages don't expose sensitive information
- Generic error messages in production
- Detailed errors only in development mode
- Security events are logged for monitoring

## Firebase Security Rules

### Firestore Rules
Ensure your Firestore security rules are properly configured:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only accessible by the user themselves
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Restaurants collection
    match /restaurants/{restaurantId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Menus collection
    match /menus/{menuId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/restaurants/$(resource.data.restaurantId)).data.userId == request.auth.uid;
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/restaurants/$(resource.data.restaurantId)).data.userId == request.auth.uid;
      allow create: if true; // Allow customers to create orders
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/restaurants/$(resource.data.restaurantId)).data.userId == request.auth.uid;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /menus/{restaurantId}/{allPaths=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
        firestore.get(/databases/(default)/documents/restaurants/$(restaurantId)).data.userId == request.auth.uid;
    }
  }
}
```

## Environment Variables

- Never commit `.env.local` to version control
- Use environment variables for all sensitive configuration
- Firebase config values are public (security enforced via rules)
- Never expose Firebase Admin SDK credentials in client code

## Input Sanitization

All user inputs are sanitized using the following methods:
- String sanitization removes HTML tags and event handlers
- Email validation ensures proper format
- Restaurant name validation prevents XSS
- Numeric inputs are validated and sanitized

## Rate Limiting

Consider implementing rate limiting for:
- Login attempts: 5 attempts per 15 minutes
- Signup attempts: 3 attempts per hour
- Password reset requests: 3 per hour

## Security Monitoring

Security events are logged for:
- Failed authentication attempts
- Restaurant creation failures
- User record creation failures
- Login tracking failures

## Best Practices

1. **Never trust client-side validation alone** - Always validate on the server
2. **Use Firebase Security Rules** - Enforce access control at the database level
3. **Sanitize all inputs** - Prevent XSS and injection attacks
4. **Use HTTPS** - Always use secure connections in production
5. **Keep dependencies updated** - Regularly update npm packages
6. **Monitor security events** - Set up alerts for suspicious activity
7. **Use strong passwords** - Enforce password complexity requirements
8. **Implement session management** - Use Firebase Auth's built-in session management

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly by contacting the development team.
