import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';

import moment from 'moment';

import { Typography, Paper, CircularProgress, Divider, Grid } from '@material-ui/core/';
import useStyles from './styles';

import CommentSection from './CommentSection';


const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();


  useEffect(() => {
    dispatch(getPost(id));
  }, [id])


  // Using tags of the current post to get similar posts.
  useEffect(() => {
    if(post){
      dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}));
    }
  }, [post])

  if(!post) return null;

  if(isLoading) {return ( 
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="6em"/>
    </Paper>
  );
  }

  const  recommendedPosts = posts.filter(({ _id}) => _id !== post._id);
  const openPost = (_id) => history.push(`/posts/${_id}`);

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
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>



      {recommendedPosts.length !== 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>Similar Activites:</Typography>
          <Divider />
          {/* <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}> */}
          <Grid className={classes.recommendedPosts} container alignItems="stretch" spacing={4}>
            {recommendedPosts.map(({title, description, name, likes, selectedFile, _id}) => ( 
              <Grid style={{marginBottom:'3rem', marginTop:'2rem'}} item xs={12} sm={12} md={6} lg={3}>
              <div className={classes.cardContent} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography className={classes.cardDescription} gutterBottom variant='subtitle2'>{description}</Typography>
                <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                <img className={classes.cardMedia} src={selectedFile} width='150px' alt=''/> 
              </div>
            </Grid>
            ))}
          </Grid>
          {/* </Grid> */}
        </div>
      )}
      </Paper>
  )
}

export default PostDetails;