import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'stretch',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  loadingPaper: {
    display: 'flex', 
    justifyContent: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh', 
    alignItems: 'center',
    '& svg': {
      color: 'darkgreen',
    }
  },
  heading: {
    fontFamily: "system-ui",
    color: 'rgba(84, 180, 53, 1)',
    textDecoration: 'none',
    fontSize: '2.5em',
    fontWeight: 350,
  },
}));