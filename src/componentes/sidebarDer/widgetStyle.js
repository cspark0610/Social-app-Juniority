import { makeStyles } from '@material-ui/core/styles';


export default makeStyles({
    body :{
        height:'100%',
        display:'flex',
        flexDirection:'column',
        marginTop:'15px'
    },
    top:{
        overflow:'hidden',
        borderRadius:10
    },
    heading:{
        width:'100%',
        height:30,
        display:'flex',
        justifyContent:'row',
        alignItems:'center',
        padding:'20px 15px',
    },
    people:{
        display:'flex',
        justifyContent:'row',
        padding:'8px',
        cursor:'pointer',
    },
    people_left:{
        display:'flex',
        justifyContent:'row',

    },
    people_right:{
        flex:1,
    },
    icon:{
        paddingRight:'5px',
        paddingTop:'5px',
        backgroundColor:'light-gray',
        color:'#ADD8E6',
        borderRadius:'5px'
    },
    chart:{
        display:'flex',
        overflowWrap: "anywhere",
        padding:'8px',
       
    },
})