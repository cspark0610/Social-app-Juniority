import React, { useState } from 'react';
import useStyles from './formJobsStyle.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { db } from "../../../firebase/firebase.js";
import firebase from "firebase";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const FormJobs = () => {

    const classes = useStyles();
    const initialState ={position:'', salary:'', availability:'', skills:'',location:'', description:''}
    const [job, setJob] = useState(initialState);
  


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            await db.collection('jobs').add({
                position:job.position,
                availability:job.availability,
                salary:job.salary,
                skills:job.skills,
                location:job.location,
                description:job.description,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            clear();
            toast.success('Job offer created successfully!',{autoClose:2000})  
             
        } catch (error) {
            console.error(error);
        }
    };

    const clear=()=>{
        setJob(initialState)
    }
    return (
        <>
        <Paper className={classes.paper}>
            
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
            <ToastContainer />
                <Typography variant='h6'><b>Post your job offer</b></Typography> 
                          
                <TextField name='position' variant='outlined' label='Position' placeholder='Position'fullWidth value={job.position} onChange={(e)=>setJob({...job, position: e.target.value})} />
                <TextField name='salary' variant='outlined' label='Salary' placeholder='Salary'fullWidth value={job.salary} onChange={(e)=>setJob({...job, salary: e.target.value})} />
                <TextField name='availability' variant='outlined' label='Availability' placeholder='Availability'fullWidth value={job.availability} onChange={(e)=>setJob({...job, availability: e.target.value})}/>
                <TextField name='skills' variant='outlined' label='Skills' placeholder='Skills (Space Separeted)'fullWidth value={job.skills} onChange={(e)=>setJob({...job, skills: e.target.value})} />
                <TextField name='location' variant='outlined' label='Location' placeholder='Location'fullWidth value={job.location} onChange={(e)=>setJob({...job, location: e.target.value})}/>
                <TextField name='description' variant='outlined' label='Description' placeholder='Description' multiline fullWidth value={job.description} onChange={(e)=>setJob({...job, description: e.target.value})}/>
            
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth >Submit</Button>    
                <Button className={classes.buttonClear} variant='contained' color='secondary' size='small'fullWidth onClick={clear}>Clear</Button>   
            </form>    
        </Paper>
        </>
    );
}

export default FormJobs;
