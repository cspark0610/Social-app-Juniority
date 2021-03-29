import { makeStyles } from '@material-ui/core/styles';


export default makeStyles({
    body :{
        height:'100%',
        display:'flex',
        flexDirection:'column',
    },
    top:{
        overflow:'hidden',
        borderRadius:10
    },
    heading:{
        width:'100%',
        height:30,
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'20px 15px',
    }
})