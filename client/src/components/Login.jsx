import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [severity, setseverity] = useState("success");
  const [message, setmessage] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const HandleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const HandlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };
  const handleClose = () => {
    setopen(false);
  };
  const HandleLogin = async () => {
    setloading(true);
    const response = await fetch("/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Password }),
    });
    const data = await response.json();
    if (data.success === true) {
      setEmail("");
      setPassword("");
      localStorage.setItem("token", data.response);
      navigate("/mainpage", { replace: true });
      return true;
    }
    if (data.success === false) {
      setmessage(data.response);
      setseverity("error");
      setopen(true);
      setloading(false);

      return false;
    }
  };
  return (
    <Box mt={4} mb={4}>
      <Paper
        sx={{
          backgroundColor: "whitesmoke",
          maxWidth: 350,
          margin: "0px auto",
          padding: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              flexDirection={"column"}
            >
              <img
                style={{ borderRadius: 50 }}
                width={50}
                height={50}
                src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt=""
              />
              <Typography variant="h6" color="initial">
                PIETECH LOGIN
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              value={Email}
              onChange={HandleEmailChange}
              label="Enter Your Email"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              value={Password}
              type={showPassword ? "text" : "password"}
              onChange={HandlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label=""
                      onClick={() => setshowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Enter Your Password"
              fullWidth
            />
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Button
            disabled={loading}
            variant="contained"
            color="success"
            onClick={HandleLogin}
          >
            {loading ? "...SIgning in" : "Log In"}
          </Button>
          <Typography variant="h6" mt={2} color="initial">
            Don't have an account? <Link to={"/register"}>Sign up</Link>
          </Typography>
        </Box>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        key={"top" + "center"}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
