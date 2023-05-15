import * as React from 'react';
import Button from '@mui/material/Button';
import './Gallery.scss';
import Grid from '@mui/material/Grid';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ReactPlayer from "react-player";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { experimentalStyled as styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles';
import { Paper,Typography} from '@mui/material';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { useEffect,useState } from 'react';
import { Image,Popconfirm } from "antd";
import axios from 'axios';
import Addvideo from '../AddVideo/Addvideo';
import videoEditingApi from '../../api/videoEditingApi';
import EditVideo from '../EditVideo/EditVideo';

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
    borderRadius: 6,
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



function Gallery()
{


  const [viewMode, setViewMode] = useState(-1);
  const [typeAdd, setTypeAdd] = useState(0);
  const [openBackdropEdit, setOpenBackdropEdit] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [event, setEvent] = useState();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  
  const [typeAddEdit, setTypeAddEdit] = useState(0);
  const [eventNameEdit, setEventNameEdit] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSort = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = useState(false);

  
  const[id,setId] = useState()

  const [noti, setNoti] = useState(false);
  const [message, setMessage] = useState();
  const [typeNoti, setTypeNoti] = useState();

  const [gallery, setGallery] = useState([]);
  const [galleryOne, setGalleryOne] = useState([]);
  console.log(gallery);


 

  const onPopoverClick = (value) => {
    if (value === -1) {
      setViewMode(value);
    }
    if (value === 0) {
      setViewMode(value);
    }
    if (value === 1) {
      setViewMode(value);
    }
  };
  const videoUrl = 'https://store.cads.live/projects/645ca43a0ca7eb6268de320d/raw/video';
  
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileChangeEdit = (file) => {
    setFile(file);

    if (typeAdd === 0) {
      var img = document.createElement("img");
      img.onload = function () {
        setHeight(this.height);
        setWidth(this.width);
      };
      img.src = URL.createObjectURL(file);
    } else {
      setHeight(0);
      setWidth(0);
    }
  };

  const handleFileChange = (file) => {
    setFile(file);

    if (typeAdd === 0) {
      var img = document.createElement("img");
      img.onload = function () {
        setHeight(this.height);
        setWidth(this.width);
      };
      img.src = URL.createObjectURL(file);
    } else {
      setHeight(0);
      setWidth(0);
    }
  };

  const handleUploadClick = () => {
    if (!file || !event || event === "") {
      setNoti(true);
      setMessage("Please chose File or enter Name!!");
      setTypeNoti("error");
      return;
    }
    console.log("upload", file, typeAdd, event);

    const formData1 = new FormData();
    formData1.append("eventName", event);
    formData1.append("file", file);
    formData1.append("type", typeAdd);
    formData1.append("width", width);
    formData1.append("height", height);
    const SaveToGallery = async () => {
      try {
        const upload = await axios.post('http://localhost:8080/api/Video/SaveToGallery',formData1)
        setOpen(false);
        setOpenBackdrop(false);
        setNoti(true);
        setMessage("Upload Succeed");
        setTypeNoti("success");
        getGallery();
      } catch (error) {
        setNoti(true);
        setMessage(error.response.data.description);
        setTypeNoti("error");
        setOpenBackdrop(false);
      }
    };
    setOpenBackdrop(true);
    SaveToGallery();
  };



  const handleUpdateClick = () => {
    const formData2 = new FormData();

    console.log(eventNameEdit,typeAddEdit);
    
    const data = {
      event: eventNameEdit,
      type: typeAddEdit
    }


    formData2.append("event", eventNameEdit);
    formData2.append("type", typeAddEdit);
   

    const updateGallery = async () => {
      try {
        const update = await axios.put(`http://localhost:8080/api/Video/updateGallery/${galleryOne.id}`, data)
        setOpenEdit(false);
        setOpenBackdropEdit(false);
        setNoti(true);
        setMessage("Upload Succeed");
        setTypeNoti("success");
        getGallery();
      } catch (error) {
        setNoti(true);
        setMessage(error.response.data.description);
        setTypeNoti("error");
        setOpenBackdrop(false);
      }
    };
    setOpenBackdropEdit(true);
    updateGallery();
  };
 

  const onDelete = (id) => {
    const deleteGallery = async () => {
      try {
        await videoEditingApi.deleteGallery(id);
        getGallery();
        setNoti(true);
        setMessage("Delete Succeed");
        setTypeNoti("success");
      } catch (error) {
        setNoti(true);
        setMessage(error.response.data.description);
        setTypeNoti("error");
      }
    };
    deleteGallery();
  };

  const onGetGallery = (id) => {
    const getGalleryById = async () => {
      axios.get(`http://localhost:8080/api/Video/getGalleryById/${id}`)
      .then(response => {
        const { result } = response.data;
        setGalleryOne(result);
        console.log(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    };
    getGalleryById();
  };



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setAnchorEl(null);
    setOpenEdit(false);
  };



    
    const getGallery = async () => {
      try {
        var response = await videoEditingApi.getGallery(viewMode);
        setGallery(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getGallery();
    }, [viewMode]);

    
  

 
    return(
        <ThemeProvider theme={theme}>
                <Grid container padding={3} ml={4}>
                    <Grid item xs fontSize={35}>
                        My Assets
                    </Grid>
                    <Grid item width={400} height={70} color={"white"}>
                    
                    </Grid>
                </Grid>
                <Grid container ml={8} spacing={2}>
                        <Grid item  md={4}>
                        <Button
                          id="demo-customized-button"
                          aria-controls={open ? 'demo-customized-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          disableElevation
                          onClick={handleClick}
                          endIcon={<UnfoldMoreIcon />}
                        >
                          Sort By
                        </Button>
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                          }}
                          anchorEl={anchorEl}
                          open={openSort}
                          onClose={handleClose}
                        >
                           <MenuItem onClick={() => onPopoverClick(-1)} disableRipple>
                            <LabelImportantIcon/>
                            All
                          </MenuItem>
                          <MenuItem onClick={() => onPopoverClick(0)} disableRipple>
                            <LabelImportantIcon/>
                            Kinh tế
                          </MenuItem>
                          <MenuItem onClick={() => onPopoverClick(1)} disableRipple>
                            <FileCopyIcon />
                            Thể thao
                          </MenuItem>
                        </StyledMenu>

                        </Grid>

                        <Grid item  md={8}>
                          <Stack direction="row" justifyContent="space-evenly"
                                    alignItems="center" spacing={2}>
                              <Button variant="contained"   onClick={() => setOpen(true)} startIcon={<NoteAddIcon />}>
                                Add New Video
                              </Button>
                              <Addvideo
                                  type={typeAdd}
                                  setType={setTypeAdd}
                                  open={open}
                                  handleClose={handleClose}
                                  handleUploadClick={handleUploadClick}
                                  eventName={event}
                                  setEventName={setEvent}
                                  handleFileChange={handleFileChange}
                            />
                          </Stack>
                        </Grid>
                </Grid>
                <Grid padding={1} ml={8} mt={4}>
                 
                </Grid>
                <Box component="main"  sx={{height:450, width:1200,overflow: 'auto'}} mt={2} ml={5} padding={3} container>
                  <Grid container spacing={10}>
                          {gallery.length > 0 && gallery.map(gal =>(
                            <Grid item>
                               <Paper
                                  elevation={3}
                                  sx={{ width: 300,height:300,backgroundColor: "#3D3476" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      float:"right",
                                      justifyContent: "",
                                    }}
                                  >
                                  
                                  
                                    <Stack mr={3} mt={1} direction="row" justifyContent="space-around"
                                    alignItems="center" spacing={4}>
                                    <Popconfirm
                                      title="Sure to delete?"
                                      onConfirm={() => onDelete(gal.id)}
                                    >
                                       <Button variant="contained">
                                        <DeleteIcon/>
                                        </Button>
                                        
                                    </Popconfirm>
                                    <Popconfirm
                                      title="Sure to edit?"
                                      onConfirm={()=>setOpenEdit(true)}
                                    >
                                       <Button variant="contained" onClick={() => onGetGallery(gal.id)}>
                                        <BorderColorIcon/>
                                        </Button>
                                       
                                          
                                          <EditVideo
                                            
                                          open = {openEdit}
                                          handleClose={handleCloseEdit}
                                          typeAddEdit={typeAddEdit}
                                          id = {galleryOne.id}
                                          setTypeAddEdit={setTypeAddEdit}
                                          eventNameEdit={eventNameEdit}
                                          setEventNameEdit={setEventNameEdit}
                                          handleFileChange={handleFileChangeEdit}
                                          handleUpdateClick={handleUpdateClick}
                                         
                                            />
                                      
                                        
                                    </Popconfirm>
                                    <Popconfirm
                                      title="Sure to download?"
                                      onConfirm 
                                      
                                    >
                                       <Button variant="contained">
                                        <DownloadForOfflineIcon/>
                                        </Button>
                                        
                                    </Popconfirm>
                                



                                    </Stack>
                                   
                                  </div>
                                  <ReactPlayer
                                    
                                    url={gal.file_name}
                                    controls
                                    height="75%"
                                    width="100%"
                                      />
                                    <Typography align='center' mt={6} style={{color:"white"}}>{gal.event}</Typography>
                                </Paper>
                                
                            </Grid>
                          ))}
                  </Grid>
        
                </Box>
        </ThemeProvider>
    );
}

export default Gallery;