import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { experimentalStyled as styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import './Home.scss';
import Gallery from '../Gallery/Gallery';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Cookies from "js-cookie";




const theme = createTheme({
    palette: {
        primary: {
          light: '#FFFBFB',
          main: '#221E3D',
          dark: '#282828',
          back:'#282828',
          contrastText: '#fff',
        },
    }
});
const CustomExpand = React.forwardRef(({ children, onClick }, ref) => (
    <i
        type="button"
        className="extension ms-4"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
     
    </i>
  ));


function Home()
{
    const myValue = localStorage.getItem("username");
    let navigate = useNavigate();
    const handleLogout = () => {
      Cookies.remove("Token");
      localStorage.removeItem("username");
      navigate("/login");
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
 
    return(
        <ThemeProvider theme={theme}>
        <Container className='home-background'>
          <Grid container mt={5}>
                <Grid item xs={2} sm={4} md={4}>
                   <HomeIcon sx={{ fontSize: 60 }} />
                </Grid>
                 <Grid item xs={6} sm={4} md={4} 
                 sx={{ fontSize: 40}}>
                   Video Management
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                <Grid
                    container
                    marginLeft={5}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">
                       <Avatar sx={{ width: 55, height: 55,bgcolor: deepOrange[500]}}>
                            {myValue}
                        </Avatar>
                        <Grid item  ml={5}>
                            <SettingsIcon sx={{ fontSize: 60 }} 
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            />
                            <Menu
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                            >
                            
                              <MenuItem onClick={handleClose}>Gallery</MenuItem>
                              <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                        </Grid>
                </Grid>
                </Grid>
            </Grid>  
        <Box className="home-container">
                <Gallery/>
                
        </Box>
         
        </Container>
      </ThemeProvider>
    );
}
export default Home;