import React from 'react';

import Post from '../post/Post';
import InputMessage from '../post/InputMessage';
import Navbar from '../navbar/Navbar';
import Widget from '../sidebarDer/Widget';
import UserProfile from '../sidebarIzq/UserProfile';
import Jobs from '../sidebarIzq/Jobs';
import Login from '../login/Login';
import Register from '../register/Register';
import { Grid } from '@material-ui/core'

const Home = () => {
    return (
        <>
        <Navbar/>
        <Grid container display ='flex' align="center">
            <Grid item md={2} >
                <UserProfile/>
                <Jobs />
            </Grid>    
            
            <Grid item md={8} >
                <InputMessage/>
                <Post/>
            </Grid>            
            <Grid item md={2}>
                <Widget/>
            </Grid>               
        </Grid>
        </>
    );
};

export default Home;