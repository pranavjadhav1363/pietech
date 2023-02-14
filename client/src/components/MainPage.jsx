import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import loading from "../assests/loading.gif";
import { Box } from "@mui/system";
const MainPage = () => {
  const navigate = useNavigate();

  const [User, setUser] = useState();
  const FetchDetails = async () => {
    const response = await fetch("/fetchdetails/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (data.success == true) {
      console.log(data.response);
      setUser(data.response);
      console.log(User);
    }
    return true;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
    let getdetails = FetchDetails();
    console.log(getdetails);
  }, []);
  const HandleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    // <div
    //   style={{
    //     position: "absolute",
    //     left: "50%",
    //     top: "50%",
    //     //   -webkit-transform: translate(-50%, -50%);
    //     transform: 'translate("-50%", " -50%")',
    //   }}
    // >
    <>
      {User ? (
        <Box mt={20}>
          <Typography variant="h6" color="whitesmoke">
            Welcome {User.Name} Your Email Id is {User.Email}
          </Typography>
          <Button variant="contained" color="primary" onClick={HandleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <img width={50} height={50} src={loading} alt="" />
      )}
    </>
    // </div>
  );
};

export default MainPage;
