import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    fontFamily: "system-ui",
    color: 'rgba(84, 180, 53, 1)',
    textDecoration: 'none',
    fontSize: '2.5em',
    fontWeight: 350,
  },
  icon: {
    fontSize: 35,
    marginLeft: '10px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]:{
        fontSize: 30,
    },
    [theme.breakpoints.down('xs')]:{
        fontSize: 25,
    },
    color: "green"
    
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',

    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 20,
    },
  },
  logoutContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    color: 'green',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: "#EC7272",
    '&:hover': {
      backgroundColor: "#379237",
   },
  },
  mainGreen:{
    backgroundColor: "#379237",
    color: "white",
    '&:hover': {
      backgroundColor: "#EC7272",
   },
  },
  secGreen:{
    backgroundColor: "#54B435"
  },
  terGreen:{
    backgroundColor: "#379237"
  },
  quatGreen:{
    backgroundColor: "#F0FF42"
  }

}));