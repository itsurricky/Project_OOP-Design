import * as React from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid,CardHeader,IconButton,Typography,CardMedia,CardContent,Checkbox,Box } from '@mui/material';
import { FavoriteBorder,Favorite } from '@mui/icons-material';
import "./Highlight.scss";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



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

function Highlight()
{
    return(
        <ThemeProvider theme={theme}>
                <Grid container padding={2} ml={4}>
                    <Grid item xs fontSize={35}>
                        Highlight
                    </Grid>
                </Grid>
                <Grid xs>
                    <Typography align='center' variant="h5" component="h5">Choose a video and a picture to make a Highlight video</Typography>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography align='center'  variant="h6" component="h5">Video</Typography>
                        <Box className="Box-Video">
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='center'  variant="h6" component="h5">Image</Typography>
                        <Box className="Box-Image">
                        <Grid container spacing={2}>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Card sx={{ width: 220,height:250,backgroundColor: "#3D3476" }}>
                                            <CardActions disableSpacing="true">
                                                    <Checkbox {...label} size='small' style={{backgroundColor:"white"}}/>
                                            </CardActions>
                                            <CardMedia
                                            sx={{width:220,height:150,padding:1,borderRadius:2}}
                                            component="img"
                                            image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
                                            alt="thumnail"/>
                                            <CardContent>
                                                <Typography align='center' sx={{color:"white"}}>Mytitle.mp4</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                        </Box>      
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center">
                    <Grid  className='Input-Name-Highlight'> 
                            <div class="input-group">
                                <span class="input-group-text">Name</span>
                                <input type="text" class="form-control"/>
                            </div>
                    </Grid>
                    <Button 
                        variant="contained"
                        disableElevation
                        endIcon={<CheckCircleIcon />}>
                        Done
                    </Button>
               </Grid>
        </ThemeProvider>
    );
}
export default Highlight;