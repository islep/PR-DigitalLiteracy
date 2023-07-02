import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Typography,
  Link,
  Container
} from "@mui/material";
import { Colors } from "../constants/Colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { sendPasswordReset, auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useNavigate,
  useSearchParams,
  createSearchParams
} from "react-router-dom";

import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      if (searchParams.get("fromPath")) {
        navigate(searchParams.get("fromPath"));
      } else {
        navigate("/");
      }
    }
  }, [user, loading, navigate, searchParams]);

  const onSubmit = () => {
    console.log("email is ", email);
    if (email !== "") {
      sendPasswordReset(email);
      navigate("/login");
    } else {
      alert("Email cannot be empty");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "5rem" }}>
        <Box
          sx={{
            backgroundColor: Colors.backgroundColor,
            height: "89%",
            margin: "auto",
            width: "50%",
            borderRadius: "1rem",
            padding: "1rem",
            boxShadow: 2,
            position: "relative"
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 8
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: Colors.primaryColor }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Forgot Password
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: Colors.primaryColor }}
                      onClick={onSubmit}
                    >
                      Get Reset Link
                    </Button>

                    <Grid container sx={{ marginTop: "1rem" }}>
                      <Grid item xs>
                        <Link
                          href="/login"
                          variant="body2"
                          sx={{ color: Colors.primaryColor }}
                        >
                          Login in to account
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          variant="body2"
                          sx={{ color: Colors.primaryColor, cursor: "pointer" }}
                          onClick={() => {
                            navigate({
                              pathname: "/signup",
                              search: createSearchParams({
                                fromPath: searchParams.get("fromPath")
                              }).toString()
                            });
                          }}
                        >
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
