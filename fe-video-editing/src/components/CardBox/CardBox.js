import * as React from 'react';
import { Autocomplete, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FavoriteBorder,Favorite } from '@mui/icons-material';

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


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



function CardBox()
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
                  <Card sx={{ width: 300,height:270,backgroundColor: "#3D3476" }}>
                    <CardActions>
                          <IconButton aria-label="add to favorites">
                            <Checkbox style={{color:"white"}}  {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                          </IconButton>
                          <IconButton aria-label="add to favorites" style={{marginLeft:140}}>
                            <RemoveRedEyeIcon style={{color:"white"}} />
                          </IconButton>
                          <IconButton aria-label="share" style={{color:"white"}}
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                           
                              <BorderColorIcon/>
                                
                          </IconButton>
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
                              <MenuItem onClick={handleClose}>Edit</MenuItem>
                              <MenuItem onClick={handleClose}>Delete</MenuItem>
                              <MenuItem onClick={handleClose}>Share</MenuItem>
                              <MenuItem onClick={handleClose}>Download</MenuItem>
                        </Menu>
                    </CardActions>
                    <CardMedia
                      sx={{width:300,height:140,padding:1,borderRadius:2}}
                       component="img"
                       image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                       alt="thumnail"/>
                    <CardContent sx={{marginLeft:10}}>
                        <Typography sx={{color:"white"}}>Mytitle.mp4</Typography>
                    </CardContent>
                  </Card>
        </ThemeProvider>
    );
}

export default CardBox;