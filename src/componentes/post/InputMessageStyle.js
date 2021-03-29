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
    top:'27%'
}
export const useAvatarStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
}));

export const useInputStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


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