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

To run the application, you need to start both the backend server and the frontend development server.

### Backend (Flask)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
    *(On Windows, use `venv\Scripts\activate`)*

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure your API keys:**
    -   Open the `backend/.env` file and add your API key from [openrouteservice.org](https://openrouteservice.org).
    ```
    OPENROUTESERVICE_API_KEY='your_openrouteservice_key_here'
    ```

5.  **Start the Flask server:**
    ```bash
    export FLASK_APP=app.py
    flask run --port 5001
    ```
    The backend server will be running at `http://localhost:5001`.

### Frontend (React)

1.  **From the project root directory, install dependencies (if you haven't already):**
    ```bash
    npm install
    ```

2.  **Start the Vite development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`. Open this URL in your browser.

## Project Structure

```
/ (capstone-frontend)
├── backend/
│   ├── app.py
│   ├── destinations.json
│   ├── requirements.txt
│   └── .env
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ... (many existing components for auth, layout, etc.)
│   │   ├── ClimateTravelPage.jsx
│   │   ├── MapView.jsx
│   │   └── SearchForm.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Future Enhancements

-   **Advanced Search Filters:** Add more sophisticated filtering options for climate, activities, etc. on the Climate Travel page.
-   **Expanded Dataset:** Replace the sample `destinations.json` with a larger, real-world dataset of destinations.
-   **Live Climate Data:** Integrate with a live climate data API like Open-Meteo.
-   **User Profile Integration:** Connect the Climate Travel feature with user profiles to save favorite climate searches or destinations.
-   **Theming:** Expand the dark mode functionality and allow users to customize themes.
-   **Accessibility:** Further improve accessibility features.

---

Made with ❤️ by rubil94