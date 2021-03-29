import React from 'react';

import InputMessage from '../post/InputMessage';
import Navbar from '../navbar/Navbar';
import Widget from '../sidebarDer/Widget';
import UserProfile from '../sidebarIzq/UserProfile';
import Jobs from '../sidebarIzq/Jobs';
//import Box  from '@material-ui/core/Box';
import { Grid } from '@material-ui/core'
import { useFirebaseApp } from "reactfire";
import { useHistory } from 'react-router';

const Home = () => {
    const firebase = useFirebaseApp();
    const user = firebase.auth().currentUser;
    const history = useHistory();

    const logOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut();
    }

    return (
    <>
        {!user ? history.push('/login') : (
        <>
        <Navbar/>
        
        <Grid container display ='flex' align="center" spacing={3}>
            
            <Grid item md={3}>
                <UserProfile/>
                <Jobs />
            </Grid>  
            
            
            <Grid item md={6} >
                <InputMessage/>
                
            </Grid>            
            <Grid item md={3}>
                <Widget/>
            </Grid>               
        </Grid>
        
        <button onClick={(e) => logOut(e)}>LOG OUT</button>
        </>
        )}
    </>
    );
};

export default Home;