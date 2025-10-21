# Capstone Frontend

This is the frontend for the Capstone project, built with React and Vite.

## Deployment on Vercel

This frontend is designed to be deployed on Vercel. Follow these steps:

1.  **Create a new Project on Vercel:**
    *   Connect your GitHub repository containing this frontend code.
    *   Vercel should automatically detect it as a Vite project.
2.  **Environment Variables:**
    *   Set the `VITE_API_BASE_URL` environment variable in the Vercel dashboard to the URL of your deployed backend (on Render).
        *Example:* `VITE_API_BASE_URL=https://your-backend-app.onrender.com`

## Local Development

1.  **Install dependencies:**
    `npm install`
2.  **Run the development server:**
    `npm run dev`

This will start the frontend application, typically on `http://localhost:5173`.

## Connecting to Local Backend

If you are running the backend locally, ensure it is running (e.g., on `http://localhost:5001`). The frontend will automatically connect to `http://localhost:5001` if `VITE_API_BASE_URL` is not explicitly set.
