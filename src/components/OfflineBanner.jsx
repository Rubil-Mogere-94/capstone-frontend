import { useEffect, useState } from "react";
import { Alert, Slide, Snackbar } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [open, setOpen] = useState(!navigator.onLine);

  useEffect(() => {
    // Handlers for going online/offline
    const handleOnline = () => {
      setIsOffline(false);
      setOpen(true);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setOpen(true);
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Auto-hide the banner when back online
  useEffect(() => {
    if (!isOffline) {
      const timer = setTimeout(() => setOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOffline]);

  return (
    <Snackbar
      open={open}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={isOffline ? "warning" : "success"}
        sx={{
          width: "100%",
          fontWeight: 600,
          bgcolor: isOffline ? "#fff3cd" : "#d1e7dd",
          color: isOffline ? "#856404" : "#0f5132",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        {isOffline
          ? "⚠️ You’re offline — showing cached results."
          : "✅ Back online — live updates restored."}
      </Alert>
    </Snackbar>
  );
}
