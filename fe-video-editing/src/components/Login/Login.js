
import * as React from 'react';
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
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.scss'
import userApi from '../../api/userApi';
import { useState } from 'react';
import Cookies from "js-cookie";
import { Alert, Snackbar } from '@mui/material';


  
const theme = createTheme();

function Login() {
  let navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


  React.useEffect(()=>{
      const fetchUser = async () =>{
        const userList = await userApi.getAll();
        console.log(userList);
      }

      fetchUser();
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const login = async () => {
      try {
        const body = {
          username,
          password,
        };
        var response = await userApi.authenticate(body); 
        setLoading(false);
        Cookies.set("Token", response.token);
        localStorage.setItem("username", response.username);
        navigate("/");
        
      } catch (error) {
        setLoading(false);
        setErr(true);
        console.log(err)
        
        setMessage(error.response.data.message);
        console.log(error.response.data.message);
      }
    };
    login();
  };

  
    return (
      
      <ThemeProvider theme={theme}>
        
        <Container component="main" maxWidth="xs">
            <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={err}
            autoHideDuration={5000}
        
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>

          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              padding:4,
              width:500,
              height: 500,
              border:1
            }}
          >
             <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <Typography component="h1" variant="h5" mt={5} align='center'>
              Video Management
            </Typography>
            <Box component="form" onSubmit={handleSubmit}   noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                label="Username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid item xs>
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"/>
                </Grid>
                <Grid item mt={1}>
                  <Link href="#" variant="">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                 disabled={loading}
              >
                Login
              </Button>
            <Typography align="center">
                Don't have an account?
                <Link href='/Signup' variant='' ml={1}>
                    Register
                </Link>
            </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
export default Login;