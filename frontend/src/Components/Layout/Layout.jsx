import React from 'react';
import Sidebar from '../Sidebar/sidebar';  // Import your Sidebar component
import { Box } from '@mui/material';

const Layout = ({ children, onLogout }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar onLogout={onLogout} />

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 3,
                    backgroundColor: '#fafafa',  // Optional: for better layout look
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
