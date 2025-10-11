import { Box, CircularProgress } from "@mui/material";

export const LoadingIndicator = () => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
}