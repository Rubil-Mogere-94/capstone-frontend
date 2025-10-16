# Klymates - Climate-Smart Travel App

Welcome to Klymates, your ultimate guide to climate-smart travel! This application helps you discover destinations with ideal weather conditions based on your preferences, offering a clean, intuitive, and visually appealing user experience.

## Features

- **Intuitive Search:** Easily find destinations by location, dates, and number of guests.
- **Netflix-Style Dashboard:** Explore popular and recommended destinations presented in engaging, horizontally scrollable content rows.
- **Detailed Destination Cards:** Each destination card provides key climate information at a glance.
- **Responsive Design:** Enjoy a seamless experience across various devices, from desktops to mobile phones.
- **Creative Sidebar:** A collapsible sidebar for navigation, user profile, and theme toggling.
- **Modern UI:** Built with Material-UI for a clean, consistent, and harmonious design.
- **Smooth Animations:** Enhanced user experience with `framer-motion` for fluid transitions.
- **Red-Themed Interface:** A vibrant red color scheme for a distinctive look.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Material-UI (MUI):** A comprehensive React UI framework for faster and easier web development.
- **Framer Motion:** A production-ready motion library for React.
- **Vite:** A fast build tool that provides an extremely fast development experience.
- **ESLint:** For maintaining code quality and consistency.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have Node.js (version 18 or higher) and npm installed.

- [Node.js](https://nodejs.org/)

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd tourism-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

To start the development server and view the application in your browser:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173/`.

## Project Structure

```
tourism-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ContentRow.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchResults.jsx
│   │   └── Sidebar.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── ... (other configuration files)
```

## Future Enhancements

-   **Routing:** Implement `react-router-dom` for dedicated detail pages for each destination.
-   **Backend Integration:** Connect to a real API for dynamic destination data and user authentication.
-   **Advanced Search Filters:** Add more sophisticated filtering options for climate, activities, etc.
-   **User Accounts:** Implement full user authentication, favoriting, and personalized recommendations.
-   **Theming:** Expand the dark mode functionality and allow users to customize themes.
-   **Accessibility:** Further improve accessibility features.

---

Made with ❤️ by rubil94