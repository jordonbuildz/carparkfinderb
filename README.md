CarParkFinder

CarParkFinder is a React Native mobile app built with Expo that helps users locate, view, and manage car parks near them. Users can search for car parks, view detailed information via map markers, add new locations, and save favourites.

Features

📍 Interactive Map using react-native-maps

🔍 Real-time Search with Auto-Suggestions

📑 Favourites functionality via AsyncStorage

📌 Tap markers for car park details

➕ Add new car parks manually

👋 Welcome modal introducing app features

Tech Stack

React Native

Expo Router

TypeScript

AsyncStorage (for storing favourites)

React Native Maps

Getting Started

Clone the repo:

git clone https://github.com/YOUR_USERNAME/CarParkFinder.git
cd CarParkFinder

Install dependencies:

npm install

Start the development server:

npx expo start

Open the app in Expo Go on your mobile device, or use an emulator.

Folder Structure

app/ - All screens including the home screen (index.tsx), add-carpark, favourites, and dynamic carpark routes.

constants/carpark.ts - Contains mock carpark data.

firebaseConfig.ts - (if used) Firebase integration.

Customisation

Modify mock car parks in constants/carpark.ts

Update UI styles in index.tsx via the StyleSheet


