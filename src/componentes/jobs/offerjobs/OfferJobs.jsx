import React, {useState,useEffect} from 'react';
import { Grid } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { InputIcon } from "../../profile/post/InputIcon.js";
import Button from "@material-ui/core/Button";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import logo from '../../assets/juniority.svg';
import "./offerJobsStyle.css";
import moment from 'moment';
import { db } from "../../../firebase/firebase.js";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';


const OfferJobs = () => {
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  }  
  const [input, setInput] = useState("");
  const [cvUrl , setCvUrl] = useState("")


    const StyledBreadcrumb = withStyles((theme) => ({
        root: {
          backgroundColor: theme.palette.grey[100],
          height: theme.spacing(3),
          color: theme.palette.grey[800],
          fontWeight: theme.typography.fontWeightRegular,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
          },
          '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
          },
        },
      }))(Chip);     
    const [jobsOffers, setJobsOffers] = useState([]);
     
    useEffect(()=>{
        db.collection('jobs').orderBy('timestamp', 'desc')
        .onSnapshot(shot =>{
          setJobsOffers(shot.docs.map(doc =>({
                id: doc.id,
                data: doc.data(),
          })
          ))
        })
    },[]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        db.collection("job-applicants")
        .add({
          aplicantCv : cvUrl,
          aplicantEmail: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      } catch (error) {
        console.error(error) 
      }  
      setInput("");
      setCvUrl("");
      handleClose();
    };
    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref("POST-CVS");
        if (file) {
          const fileRef = storageRef.child(file.name);
          await fileRef.put(file);
          setCvUrl(await fileRef.getDownloadURL());
        }
    };
 
    return (
     
    <>
      {jobsOffers && jobsOffers.map(jobsOffer =>(

           <div className="job__container" style={{backgroundColor:'white'}} key={jobsOffer.id}>
           <Grid container>
             <Grid item md={2}>
                 <img src={logo} className="logo" alt="Logo Juniority" width='60%' height='60%'/>
             </Grid>
             <Grid item md={6} className="text__job__left text__job" >
                 <h2>{jobsOffer.data.position}</h2>
                 <p>Juniority</p>
                 <p><LocationOnIcon className="date__icon"/>{jobsOffer.data.location}</p>
             </Grid>
             <Grid item md={4} className="text__job__right">
               <p><AccessTimeIcon className="date__icon"/>{moment(new Date(jobsOffer.data.timestamp?.toDate().toUTCString())).fromNow()}</p>
             </Grid>
            
           </Grid>
           <hr className="line__profile__widget" />
             <div className='salary_availability'>
                 <p> {jobsOffer.data.salary} </p>
                 <p> {jobsOffer.data.availability}</p>
             </div>
             <div className='description'>
                 <p>{jobsOffer.data.description}</p>
             </div> 
             <div className='skills'>
               <Breadcrumbs aria-label='breadcrumb'>
                  {jobsOffer.data.skills.split(' ') && jobsOffer.data.skills.split(' ').map(skill=>(
                    <StyledBreadcrumb label={skill}/>
                  ))}               
                </Breadcrumbs>
             </div> 
           <hr className="line__profile__widget" />
             <div className='job__buttom'>
                 <InputIcon Icon={FavoriteBorderIcon} title="16" color="red" />
                 <InputIcon Icon={ChatBubbleOutlineOutlinedIcon} title="8" color="black"/>
                 <InputIcon Icon={ShareOutlinedIcon} title="2" color="black" />
             </div>
           <hr className="line__profile__widget" />
             <Button size='large' variant='contained' color='primary' className='button__apply' onClick={ handleClickOpen }>Apply</Button>
             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Apply</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To apply to this job, please enter your email address here and load your CV. 
                    </DialogContentText>
                    <TextField autoFocus margin="dense" id="name" label="Email Address" type="email"fullWidth value={input} onChange={(e) => setInput(e.target.value)}/>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>

                    <input onChange={(e) => onFileChange(e)} accept="file/*" id="icon-button-file" type="file"/>
                      <label htmlFor="icon-button-file" > 
                        <Button onClick={handleSubmit} color="primary" type='submit'> Load your CV </Button>
                      </label>
                   
                  </DialogActions>
              </Dialog>
                
         </div>
      ))}
    </>
    )
}

export default OfferJobs
