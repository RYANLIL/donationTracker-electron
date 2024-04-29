import { Box, Button, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";

interface ILoadingButton {
  onClick: () => Promise<void>;
}

export default function LoadingButton(props: ILoadingButton) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  async function handleClick() {
    if (!isLoading) {
      setIsSuccessful(false);
      setIsLoading(true);

      await props.onClick();

      setIsSuccessful(true);
      setIsLoading(false);
    }
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleClick}
        fullWidth
        color={isSuccessful ? "success" : "primary"}
      >
        Save
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}
