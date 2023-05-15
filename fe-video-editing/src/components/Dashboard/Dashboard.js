import * as React from 'react';
import "./Dashboard.scss";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Grid,Container,Menu,MenuItem, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import MostView from '../MostView/MostView';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';



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
const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 4,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

function Dashboard()
{
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
                <Grid container padding={3} ml={4}>
                    <Grid item xs fontSize={35}>
                        Dashboard
                    </Grid>
                </Grid>
                <Grid padding={1} ml={8} mt={1}>
                  <Button
                        boxShadow
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<UnfoldMoreIcon />}>
                    Sort By
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                        Most View
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        Most Like
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        Most Dislike
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        Most Relevant
                    </MenuItem>
                  </StyledMenu>
                </Grid>
                <Typography align='center' variant="h4" component="h2">Most View</Typography>
                <Box className="View-Dashboard">
                    <Stack spacing={5}>
                        <MostView/>
                        <MostView/>
                        <MostView/>
                    </Stack>
                </Box>
               <Grid container direction="row" justifyContent="space-around">
                <Button 
                    marginRight='20px' 
                    variant="contained"
                    disableElevation
                    endIcon={<DownloadForOfflineIcon />}>
                    Download
                </Button>
               </Grid>
        </ThemeProvider>
    );
}
export default Dashboard;