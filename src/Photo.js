import React from "react";
import Fab from '@material-ui/core/Fab'
import CloudDownload from '@material-ui/icons/CloudDownload'
import Close from '@material-ui/icons/Close'

import { BrowserRouter as Router, Link} from 'react-router-dom'
import Metadata from "./components/Metadata";
import { theme } from "./styles/theme";
import { withStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar } from "@material-ui/core";
// import classes from "*.module.css";

const styles = {
  Fab:{
  backgroundColor: 'rgba(0,0,0,0.2)',
  '&:hover': {
        backgroundColor: `${theme.palette.secondary.main}`
      },
  }
};

const Photo = ({ index, onClick, photo, margin, direction, top, left, classes }) => {
  // console.log(photo)
  const imgWithClick = { cursor: "pointer" };

  const imgStyle = { margin: margin};
  if (direction === "column") {
    imgStyle.position = "absolute";
    // imgStyle.border = "solid";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    onClick(event, { photo, index })
  };

  const handleDrag = (e) => {
    e.stopPropagation();
    // debugger;
    e.target.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
    e.target.style.border = `solid ${theme.palette.secondary.main}`;
  }

  const handleDrop = (e) => {
    // debugger;
    e.stopPropagation();
    e.target.style.border = "none";
    // debugger;
    // e.target.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";

  }

  const handleUp = (e) => {
    // debugger;
    e.stopPropagation();
    e.target.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
  }

  const handleHover = (e) => {
    e.stopPropagation();
    e.target.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
  }
  
  const hideMeta = (e) => {
    // debugger;
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentElement.parentElement.parentElement.parentElement.parentElement);
    e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.remove();
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    // debugger;
    // e.target.parentElement.parentElement.parentElement.parentElement.siblingElement.remove();
    // e.target.style.display = 'none';
  }

  return (    
    <div onMouseDown={handleDrag} onMouseLeave={handleDrop} style={{transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'}}>
      
      <Grid container direction="row">
        <Grid item >
        <div style={{position: 'relative'}}>
        <img
          style={onClick ? { ...imgStyle, ...imgWithClick} : {...imgStyle, boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'}}
          {...photo}
          alt="img"
          onMouseOver={handleHover}
          onMouseOut={handleUp}
        />
       
            <Fab aria-label="Hide" size="small" onMouseDown={e => e.stopPropagation()} onClick={hideMeta}
            className={classes.Fab} style={{float: 'left', position: 'absolute', zIndex: '1000', display: 'inline-flex', left: '0px' }}
            >
              <Close style={{color: '#ffffff'}}/>
            </Fab>
          <Fab aria-label="Download" href={photo.metadata.download} rel="noopener noreferrer" target="_blank" size="small" style={{float: 'left', position: 'absolute', zIndex: '1000', display: 'inline-flex', right: '0px'}} onMouseDown={e => e.stopPropagation()}
            className={classes.Fab}
            >
              <CloudDownload style={{color: '#ffffff'}}/>
            </Fab>
            </div>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item>
          <div style={{position: 'relative', top: '-31px', margin: '0px', paddingLeft:'5px'}} onMouseDown={e => e.stopPropagation()}>
              <a style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'left'}} href={photo.metadata.profile} target="_blank" rel="noopener noreferrer" >{photo.metadata.photographer} - </a>
  
              <a href={photo.metadata.link} target="_blank" rel="noopener noreferrer" style={{fontSize: '10px', textDecoration: 'none', color: 'rgb(0, 0, 0, 0.5)', backgroundColor: 'rgb(255, 255, 255, 0.3)', float: 'right'}}>- {photo.metadata.brand}</a>
            </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default withStyles(styles)(Photo);