import { makeStyles } from '@material-ui/core/styles';

export const inputStyle ={
    border: 'none',
    flex: '1',
    marginLeft: '10px',
    outlineWidth: '0',
    fontWeight: '600'
}
export const createIconStyle={
    marginLeft:'10px', 
    position:'relative', 
    top:'20%'
}


export default makeStyles({
    container:{
        display:'flex',
        width:'100%',
        backgroundColor:'white',
        padding:'10px',
        paddingBottom:'20px',
        paddingRadius:'10px',
        marginBottom:'20px',
       
    },
    container_input:{
        border:'1px solid lightgray',
        borderRadius:'20px',
        display:'flex',
        color :'gray',
        padding:'10px',
        width:'100%',
        minHeight:'50px',
        paddingLeft:'15px',
       
    },
    optionsIcons:{
        display:'flex',
        justifyContent:'space-between'
    }
    
})