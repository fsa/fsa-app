import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingIndicator = ({message}: {message?: string}) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress sx={{m: 1 }} />
      {message && <Typography>{message}</Typography>}
    </Box>
  );
}