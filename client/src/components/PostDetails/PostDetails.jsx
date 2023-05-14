import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import moment from 'moment';

import { Typography, Paper, CircularProgress, Divider } from '@material-ui/core/';
import useStyles from './styles';

import { getPost } from '../../actions/posts';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();


  useEffect(() => {
    console.log(id);
    dispatch(getPost(id));
  }, [id])


  if(!post) return null;

  if(isLoading) {return ( 
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="6em"/>
    </Paper>
  );
  }

  console.log(post.description);
    return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="h6">Host: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography style={{whiteSpace: 'pre-line'}} className={classes.description} gutterBottom variant="body1" component="p">{post.description}</Typography>

        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      </Paper>
  )
}

export default PostDetails;