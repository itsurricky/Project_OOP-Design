import * as React from 'react';
import "./Addvideo.scss";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
  } from "@mui/material";
import { useRef } from "react";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { FileUploader } from "react-drag-drop-files";
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";    
const TypeFileUploadMatrix = [["MP4"]];


  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

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


function Addvideo(props)
{
    const {
      type,
      setType,
      open,
      handleClose,
      handleUploadClick,
      eventName,
      setEventName,
      handleFileChange,
        
      } = props;
      const descriptionElementRef = useRef(null);
   return(
    <ThemeProvider theme={theme}>
               <Dialog open={open} scroll="paper">
                    <DialogTitle
                        sx={{
                        backgroundColor: "#221E3D",
                        fontSize: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        }}
                        id="scroll-dialog-title"
                    >
                        <Typography  variant="h5" component="h5" style={{color:"white"}}>Upload Gallery</Typography>
                        <IconButton  onClick={handleClose} style={{color:"white"}}>
                            <CancelOutlinedIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        >
                        <Grid container spacing={2} width="450px">
                            <Grid item xs={12}>
                            <InputLabel>Category</InputLabel>
                            <Select
                               value={type}
                               label="Type"
                               fullWidth
                               variant="standard"
                               onChange={(e) => setType(e.target.value)}
                               
                            >
                                <MenuItem value={0}>Kinh tế</MenuItem>
                                <MenuItem value={1}>Thể thao</MenuItem>
                            </Select>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                value={eventName}
                                label="Name"
                                variant="standard"
                                onChange={(e) => setEventName(e.target.value)}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <FileUploader
                                handleChange={handleFileChange}
                                name="file"
                                types={TypeFileUploadMatrix[type]}
                            />
                            </Grid>
                            <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            >
                            <Button variant="contained"  onClick={handleUploadClick}>
                                Upload
                            </Button>
                            </Grid>
                        </Grid>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
    </ThemeProvider>
    );
}
export default Addvideo;