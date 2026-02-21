# Firebase CLI Setup Guide

## Problem
You encountered a permission error when trying to install `firebase-tools` globally because npm is trying to install to `/usr/local/lib/node_modules`, which requires root permissions.

## Solutions

### Option 1: Use npx (Recommended - No Installation Needed)
You can use Firebase CLI without installing it globally by using `npx`:

```bash
# Run any Firebase command
npx firebase-tools login
npx firebase-tools init
npx firebase-tools deploy
```

Or use the npm script I've added:
```bash
npm run firebase login
npm run firebase init
npm run firebase deploy
```

### Option 2: Fix Global Installation (If You Need It)

#### Step 1: Create a directory for global npm packages
```bash
mkdir -p ~/.npm-global
```

#### Step 2: Configure npm to use this directory
```bash
npm config set prefix '~/.npm-global'
```

#### Step 3: Add to your PATH
Add this line to your `~/.zshrc` file:
```bash
export PATH=~/.npm-global/bin:$PATH
```

Then reload your shell:
```bash
source ~/.zshrc
```

#### Step 4: Install firebase-tools globally
```bash
npm install -g firebase-tools
```

### Option 3: Use sudo (Not Recommended)
If you really need to install globally and don't want to change npm config:
```bash
sudo npm install -g firebase-tools
```

**Note:** Using `sudo` with npm is not recommended for security reasons.

## Verify Installation
After setup, verify Firebase CLI is working:
```bash
firebase --version
# or with npx:
npx firebase-tools --version
```

## Common Firebase CLI Commands
- `firebase login` - Authenticate with Firebase
- `firebase init` - Initialize Firebase in your project
- `firebase deploy` - Deploy to Firebase
- `firebase serve` - Run local emulator
- `firebase functions:serve` - Run Functions emulator locally
