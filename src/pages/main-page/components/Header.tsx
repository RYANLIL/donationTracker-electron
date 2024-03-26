import { Button, Input, Stack, TextField, Typography } from "@mui/material";

export default function Header() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        People
      </Typography>
      <Stack spacing={2} direction={"row"} justifyContent={"flex-end"}>
        <TextField label="Search" />
      </Stack>
    </div>
  );
}
