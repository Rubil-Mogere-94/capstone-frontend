import { Button, Snackbar, Alert } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";

export default function ShareItineraryButton({ itinerary }) {
  const [open, setOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "My Travel Itinerary",
      text: "Check out my travel plan!",
      url: `${window.location.origin}/itinerary/${itinerary.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setOpen(true);
      }
    } catch (err) {
      console.error("Error sharing itinerary:", err);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<ShareIcon />}
        onClick={handleShare}
        sx={{ borderRadius: "20px", fontWeight: "bold" }}
      >
        Share
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
