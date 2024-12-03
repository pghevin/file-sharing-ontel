import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../user-redux/action";

const Login = () => {
  // Breakpoints for responsiveness
  const isMobileSmall = useMediaQuery("(max-width: 479px)");
  const isMobileLarge = useMediaQuery(
    "(min-width: 480px) and (max-width: 767px)"
  );
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");

  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login logic
    if (credentials.username && credentials.password) {
      const user = {
        email: credentials.username,
        password: credentials.password,
      };
      dispatch(userLoginAction(user));
    } else {
      alert("Please enter your credentials");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        backgroundImage: `url('https://thumbs.dreamstime.com/b/small-portable-pink-air-cooler-perfect-cooling-down-hot-summer-days-stylish-efficient-making-ideal-337858915.jpg?w=1400')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: isMobileSmall || isMobileLarge ? 2 : 4,
      }}
    >
      {/* Dull Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark semi-transparent overlay
        }}
      />

      <Paper
        elevation={4}
        sx={{
          padding: isMobileSmall ? 2 : 4,
          width: isMobileSmall
            ? "90%"
            : isMobileLarge
            ? "80%"
            : isTablet
            ? "60%"
            : "400px",
          textAlign: "center",
          borderRadius: 2,
          zIndex: 1, // Ensures the form stays above the overlay
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: isMobileSmall ? "150px" : "200px",
            margin: "0 auto",
            marginBottom: isMobileSmall ? 8 : 16,
          }}
        />
        <Typography variant={isMobileSmall ? "h6" : "h5"} gutterBottom>
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
          sx={{ fontSize: isMobileSmall ? "0.9rem" : "1rem" }}
        >
          Please log in to your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                padding: 1,
                fontSize: "16px",
                backgroundColor: "#d0242c",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#b01e25",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
