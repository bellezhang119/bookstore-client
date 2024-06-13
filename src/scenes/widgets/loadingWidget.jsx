import React from 'react';
import { Box, CircularProgress, Backdrop } from '@mui/material';

const LoadingWidget = ({ open }) => (
  <Backdrop open={open} style={{ zIndex: 1200 }}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      position="fixed"
      top="0"
      left="0"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <CircularProgress />
    </Box>
  </Backdrop>
);

export default LoadingWidget;