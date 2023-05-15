
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormatColorText, Style } from '@mui/icons-material';
import { useState,useEffect } from 'react';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';
import userApi from '../../api/userApi';


function isAllPresent(str) {
  // Regex to check if a string
  // contains uppercase, lowercase
  // special character & numeric value
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );

  // If the string is empty
  // then print No
  if (!str || str.length < 8) {
    //không đử độ dài
    return true;
  }

  // Print Yes If the string matches
  // with the Regex
  if (pattern.test(str)) {
    //thỏa điều kiện
    return false;
  } else {
    //không thỏa đk
    return true;
  }
}
  
const theme = createTheme({
    palette: {
        primary: {
          light: '#FFFBFB',
          main: '#221E3D',
          dark: '#002884',
          contrastText: '#fff',
        },
    }
});

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[900]),
    backgroundColor: purple[900],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

function SignUp() {
    const [err, setErr] = useState(false);
    const [suc, setSuc] = useState(false);
    const [time, setTime] = useState(3);
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errPassword, setErrPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState();
    const [errConfirmPassword, setConfirmErrPassword] = useState(false);

    const [errForm, setErrForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setErr(false);
    };
    const handleSucClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setErr(false);
    };
    useEffect(() => {
      if (errPassword || errConfirmPassword) {
        setErrForm(true);
      } else {
        setErrForm(false);
      }
    }, [errPassword, errConfirmPassword]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!errForm) {
        setLoading(true);
        const body = {
          username,
          email,
          password,
        };
        const signUp = async () => {
          try {
            await userApi.register(body);
            setTimeout(() => {
              setLoading(false);
              setSuc(true);
              setTimeout(() => {
                setTime(2);
                setTimeout(() => {
                  setTime(1);
                  setTimeout(() => {
                    navigate("/login");
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          } catch (error) {
            setLoading(false);
            setErr(true);
            setMessage(error.response.data.message);
          }
        };
        signUp();
      } else {
        setErr(true);
        setMessage("Please meet the conditions");
      }
    };


    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">


        <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={suc}
        autoHideDuration={5000}
        onClose={handleClose}
          >
            <Alert
              onClose={handleSucClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Sign up succeed! Go to Login after {time}s
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={err}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>

          <CssBaseline />
          <Box
            sx={{
                backgroundColor: 'primary.main',
              marginTop: 10,
              marginBottom:10,
              padding:4,
              width:500,
              height: 650,
              border:1,
              color:'primary.light'
            }}
          >
             <Typography component="h1" variant="h4" color={"white"}>
              Sign up
            </Typography>
            <Typography component="h1" variant="h5" mt={5} align='center' color={"white"}>
              Video Management
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} color={"white"}>
                <TextField
                    inputProps={{style:{color:"black",background:"white"}}}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    variant="filled"
                    autoFocus
                />
              <TextField 
                inputProps={{style:{color:"black",background:"white"}}}
                margin="normal"
                variant="filled"
                required
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                label="Username"
                autoFocus
              />
              <TextField
                 inputProps={{style:{color:"black",background:"white"}}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrPassword(isAllPresent(e.target.value));
                  if (confirmPassword !== undefined) setConfirmErrPassword(true);
                }}
                error={errPassword}
                helperText={
                  errPassword
                    ? "Password must contain at least one numeric character, uppercase letter, lowercase character and special character"
                    : ""
                }
                variant="filled"
                autoComplete="current-password"
              />
              <TextField
                 inputProps={{style:{color:"black",background:"white"}}}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                error={errConfirmPassword}
                helperText={errConfirmPassword ? "Two passwords don't match" : ""}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmErrPassword(password !== e.target.value);
                }}
                variant="filled"
                autoComplete="current-password"
              />
               <ColorButton 
                disabled={loading}
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 5, mb: 4 }}>
                    Register
               </ColorButton>
            <Typography align="center">
                Already have an Account?
                <Link href='#' color={"primary.light"} ml={1}>
                    Login
                </Link>
            </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
export default SignUp;