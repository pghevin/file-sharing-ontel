import React from 'react';
import { Box, Typography, Divider, TextField, Grid, Paper } from '@mui/material';

const CompanyInfo = () => {
    // Sample data for company info
    const companyData = {
        name: "Tech Innovations LLC",
        url: "https://www.techinnovations.com",
        location: "1234 Silicon Valley, CA, USA",
        contactName: "John Doe",
        phone: "+1 (123) 456-7890",
        description: "Tech Innovations LLC is a leading provider of cutting-edge technology solutions that aim to revolutionize the tech industry."
    };

    return (
        <Box sx={{ padding: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Company Information
            </Typography>

            <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 } }}>
                <Grid container spacing={3}>
                    {/* Company Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            value={companyData.name}
                            disabled
                        />
                    </Grid>

                    {/* Website URL */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Website"
                            value={companyData.url}
                            disabled
                            InputProps={{
                                href: companyData.url,
                                startAdornment: (
                                    <Typography
                                        component="a"
                                        href={companyData.url}
                                        target="_blank"
                                        sx={{
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                            color: '#1976d2',
                                        }}
                                    >
                                        {companyData.url}
                                    </Typography>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Location */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Location"
                            value={companyData.location}
                            disabled
                        />
                    </Grid>

                    {/* Contact Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Contact Name"
                            value={companyData.contactName}
                            disabled
                        />
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={companyData.phone}
                            disabled
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            value={companyData.description}
                            disabled
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CompanyInfo;
