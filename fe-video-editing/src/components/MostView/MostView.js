import * as React from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid,CardHeader,IconButton,Typography,CardMedia,CardContent,Checkbox } from '@mui/material';
import { FavoriteBorder,Favorite } from '@mui/icons-material';
import Card from '@mui/material/Card';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 50,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));
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



function MostView()
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
                 <Grid container >
                    <Grid item xs={4}>
                            <Card sx={{ width: 250,height:200,backgroundColor: "#3D3476" }}>
                            <CardHeader>
                                <IconButton aria-label="add to favorites">
                                    <Checkbox style={{color:"white"}}  {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                </IconButton>
                            </CardHeader>
                            <CardMedia
                            sx={{width:250,height:120,padding:1,borderRadius:2}}
                            component="img"
                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                            alt="thumnail"/>
                            <CardContent>
                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                            </CardContent>
                            </Card>
                    </Grid>
                    <Grid item xs={8} mt={9}>
                        <Grid container>
                            <Grid item xs={10}>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </Grid>
                            <Grid item xs={2}  padding={1}>
                                <Typography>value</Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                 </Grid>
        </ThemeProvider>
    );
}

export default MostView;