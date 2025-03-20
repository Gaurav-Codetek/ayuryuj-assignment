# Project Setup

This README provides basic setup instructions for initializing and starting your project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **npm** (Comes with Node.js)
- **Expo CLI** (Can be installed globally using `npm install -g expo-cli`, if needed)

## Installation

### 1. Install all Dependencies
```sh
npm install
```
#### This command installs all the required dependencies listed in the package.json file. It ensures that all necessary packages are available for your project.

### 2. Check for Dependencies not matching the installed expo version
```sh
npx expo install --check
```
#### This command checks if all required dependencies for Expo are installed and installs any missing ones. It helps in maintaining compatibility with Expo’s ecosystem.

### 3. Run on Expo Go app
```sh
npx expo start
```
#### This command starts the Expo development server, allowing you to run the application on a connected device or emulator. You can scan the QR code using the Expo Go app on your mobile device or use an emulator.

## Additional Tips

- If you encounter permission issues, try running npm install with sudo (on macOS/Linux).
- Use npm audit fix to resolve security vulnerabilities in dependencies.
- If Expo fails to start, try clearing the cache using:
```sh
npx expo start -c
```

## Troubleshooting

#### If you run into any issues, consider:

- Updating Node.js and npm:
```sh
npm install -g npm
```

- Updating Expo CLI:
```sh
npm install -g expo-cli
```

- Checking the Expo documentation: https://docs.expo.dev/