import React, { useEffect } from 'react';

import InputMessage from '../post/InputMessage';
import Navbar from '../navbar/Navbar';
import Widget from '../sidebarDer/Widget';
import UserProfile from '../sidebarIzq/UserProfile';
import Jobs from '../sidebarIzq/Jobs';

import { Grid } from '@material-ui/core'
import { useFirebaseApp } from "reactfire";
import { useHistory } from 'react-router';
import { db } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../store/currentUser';

const Home = () => {
    const firebase = useFirebaseApp();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);

    const logOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        dispatch(setCurrentUser(false));
    }

    /* useEffect(() => {
        if(currentUser) {
            db.collection('user').where("id", "==", currentUser.id).get()
            .then(doc => doc.forEach(data => {
                sessionStorage.setItem('currentUser', JSON.stringify(data.data()))
            }))
        }
    }, []) */

    return (
        <>
        {console.log('USER', currentUser)}
        {!currentUser ? history.push('/login') : (
        <>
        <Navbar/>
        <Grid container display ='flex' align="center">
            <Grid item md={2} >
                <UserProfile/>
                <Jobs />
            </Grid>    
            
            <Grid item md={8} >
                <InputMessage/>
                
            </Grid>            
            <Grid item md={2}>
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