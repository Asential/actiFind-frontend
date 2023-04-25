import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  searchButton: {
    color: 'white',
    backgroundColor: "#379237",
    '&:hover': {
      backgroundColor: "#EC7272",
   },
  },

  purple: {
    backgroundColor: "#EC7272",
  },
  mainGreen:{
    backgroundColor: "#82CD47"
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