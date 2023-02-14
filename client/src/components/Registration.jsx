import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
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
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Registration = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [severity, setseverity] = useState("success");
  const [message, setmessage] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phoneno, setPhoneno] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [Gender, setGender] = useState("female");
  const [isNameErorr, setisNameErorr] = useState(false);
  const [isEmailErorr, setisEmailErorr] = useState(false);
  const [isPhonenoErorr, setisPhonenoErorr] = useState(false);
  const [isPasswordErorr, setisPasswordErorr] = useState(false);
  const [isConfirmPasswordErorr, setisConfirmPasswordErorr] = useState(false);
  const [isGenderErorr, setisGenderErorr] = useState(false);
  const HandleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    if (value.length < 1) {
      setisNameErorr(true);
      return false;
    }
    setisNameErorr(false);
    return true;
  };
  const HandleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (EmailValidator.validate(value) === false) {
      setisEmailErorr(true);
      return false;
    }
    setisEmailErorr(false);
    return true;
  };
  const HandlePhonenoChange = (e) => {
    const { value } = e.target;
    setPhoneno(value);
    console.log(validator.isMobilePhone(value, "en-IN"));
    if (validator.isMobilePhone(value, "en-IN") === false) {
      setisPhonenoErorr(true);
      return false;
    }
    setisPhonenoErorr(false);
    return true;
  };
  const HandleGenderChange = (e) => {
    const { value } = e.target;
    setGender(value);
    return true;
  };
  const handleClose = () => {
    setopen(false);
  };
  const HandlePasswordChange = (e) => {
    const { value } = e.target;
    setisConfirmPasswordErorr(false);
    setPassword(value);
    if (value.length < 8) {
      setisPasswordErorr(true);
      return false;
    }
    setisPasswordErorr(false);
    return true;
  };
  const HandleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setisConfirmPasswordErorr(false);
    setConfirmPassword(value);
  };
  const HandleSignin = async () => {
    setloading(true);
    if (Name.length < 1) {
      setisNameErorr(true);
      setloading(false);
      return false;
    }
    if (EmailValidator.validate(Email) === false) {
      setisEmailErorr(true);
      setloading(false);

      return false;
    }
    if (validator.isMobilePhone(Phoneno, "en-IN") === false) {
      setisPhonenoErorr(true);
      setloading(false);

      return false;
    }
    if (Password.length < 8) {
      setisPasswordErorr(true);
      setloading(false);

      return false;
    }
    if (Gender.length < 1) {
      setisGenderErorr(true);
      setloading(false);

      return false;
    }
    if (Password !== ConfirmPassword) {
      setisConfirmPasswordErorr(true);
      setloading(false);

      return false;
    }
    const response = await fetch("/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name, Phoneno, Email, Gender, Password }),
    });
    const data = await response.json();
    if (data.success === true) {
      setmessage("Account Created Successfully");
      setseverity("success");
      setopen(true);
      setName("");
      setEmail("");
      setPhoneno("");
      setPassword("");
      setConfirmPassword("");
      setloading(false);

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
                PIETECH REGISTRATION
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              error={isNameErorr}
              value={Name}
              onChange={HandleNameChange}
              label="Enter Your Name"
              fullWidth
              helperText={isNameErorr ? "Please Enter Your Name" : null}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              error={isEmailErorr}
              value={Email}
              onChange={HandleEmailChange}
              label="Enter Your Email"
              fullWidth
              helperText={isEmailErorr ? "Please Enter A Valid Email" : null}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              error={isPhonenoErorr}
              value={Phoneno}
              onChange={HandlePhonenoChange}
              label="Enter Your Phone Number"
              fullWidth
              helperText={isPhonenoErorr ? "Please Enter A Phone Number" : null}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              value={Password}
              type={showPassword ? "text" : "password"}
              error={isPasswordErorr}
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
              helperText={
                isPasswordErorr
                  ? "Please Enter A Password Of Length Atleast 8 Characters"
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              error={isConfirmPasswordErorr}
              value={ConfirmPassword}
              onChange={HandleConfirmPasswordChange}
              label="Confirm Password"
              fullWidth
              helperText={
                isConfirmPasswordErorr ? "Password Do Not Match" : null
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label=""
                      onClick={() =>
                        setshowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} pl={2} display="flex" justifyContent={"center"}>
            {/* <Item>xs=6 md=8</Item> */}
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                value={Gender}
                onChange={HandleGenderChange}
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
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
            onClick={HandleSignin}
          >
            {loading ? "...SIgning in" : "Register"}
          </Button>
          <Typography variant="h6" mt={2} color="initial">
            Have an account? <Link to={"/"}>Log In</Link>
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

export default Registration;
