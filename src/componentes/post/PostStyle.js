import { makeStyles } from '@material-ui/core/styles';

export const avatarStyle ={
    width:'100px',
    height:'100px',
}


export default makeStyles({
    post:{
        padding:'10px',
        marginBottom: '10px',
        borderRadius: '10px'
    },
    header:{
        display:'flex',
        justifyContent:'space-between',
        marginBotton:'10px'
    },
    info:{
        marginLeft: '50px',
             
    },
    message:{
        textAlign: 'justify',
        textJustify: 'inter-word',
    },
    body:{
        overflowWrap:'anywhere',
    },
    buttons:{
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom:'15px'

    },   

})

