import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '400px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    maxWidth: '50%',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh',
  },

  cardDescription: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    whiteSpace: "pre-wrap",
    textOverflow: 'ellipsis',
    
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      // marginLeft: 0,
    },

  },
  cardContent: {
    display: 'flex',
    
    outline: '2px solid #6b716b',
    padding: '20px',
    borderRadius: '20px',
    objectFit: 'cover',

    margin: '20px', 
    cursor: 'pointer',
    flexDirection: 'column',  // inner items will be added vertically
    flexGrow: 1,              // all the available vertical space will be occupied by it
    justifyContent: 'flex-start',

    height: '50%',
    width: '20%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

  },

  cardMedia: {
    marginTop: 'auto',
    width: '100%',
    // [theme.breakpoints.down('sm')]: {
    //   maxWidth: '100%',
    // },
  },

  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    minWidth: '50%',
  },

}));