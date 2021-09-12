/**
 * Small example repository to show that the type of the onAuthStateChanged is wrong. This
 * example was based on https://designcode.io/react-hooks-handbook-firebase-auth.
 */

import React, { useState, useEffect } from "react";
import { Button, Box, Grid, Typography, TextField } from "@mui/material";
import { auth, googleAuthProvider, facebookAuthProvider } from "firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import useInput from "hooks/useInput";

function App() {
  const email = useInput("");
  const email2 = useInput("");
  const password = useInput("");
  const password2 = useInput("");

  /**
   * Handles google login.
   */
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles facebook login.
   */
  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles email Sign Up.
   */
  const emailSignUp = async (event: any) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      console.log("user", user);
      alert(`Welcome ${email.value} you signed up!`);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error);
        alert(error.message);
      }
    }
  };

  /**
   * Handles email login.
   */
  const emailLogin = async (event: any) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      console.log("user", user);
      alert(`Welcome ${email.value} you are now logged in!`);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error);
        alert(error.message);
      }
    }
  };

  /**
   * Setup authentication state change callback.
   */
  // NOTE: Below you will find the code in which a `Property 'accesstoken' does not exist on type 'User` is thrown if you uncomment the line that uses the accesstoken
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user !== null) {
        console.log("logged in");
        console.log(user);
        // console.log(user.accesstoken); // NOTE: Uncomment to see Typescript error although accesstoken exists
      } else {
        console.log(user);
        console.log("not logged in");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid container spacing={2} flexDirection="column" alignItems="center">
        {/* Social Providers */}
        <Grid item>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h3" color="initial">
                SocialProviders
              </Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <Button variant="contained" onClick={handleGoogleLogin}>
                    Login with google
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleFacebookLogin}>
                    Login with facebook
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Email SignUp */}
        <Grid item>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h3" color="initial">
                Email Signup
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={emailSignUp}>
                <Grid
                  container
                  flexDirection="column"
                  spacing={2}
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...email}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      {...password}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" type="submit">
                      SignUp
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
        {/* Email login */}
        <Grid item>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h3" color="initial">
                Email Login
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={emailLogin}>
                <Grid
                  container
                  flexDirection="column"
                  spacing={2}
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...email2}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      {...password2}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" type="submit">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
