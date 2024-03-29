import { Button, Input, Stack, TextField, Typography } from "@mui/material";

export default function Header() {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        People
      </Typography>
      <Stack spacing={2} direction={"row"} justifyContent={"flex-end"}>
        {/* <TextField
          label="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
        /> */}
      </Stack>
    </div>
  );
}
