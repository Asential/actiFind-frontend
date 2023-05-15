import React, {useState, useRef} from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles  from "./styles";
import { commentPost } from "../../actions/posts"

// Destructuring is getting the data that is sent as a prop to the component.
const CommentSection = ({post}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [comments, setComments ] = useState(post?.comments);
  const [comment, setComment ] = useState('');

  const commentsRefs = useRef();

  const handleClick = async () => {
    const newComment = `${user?.result?.name}: ${comment}`;
    const updatedComments = await dispatch(commentPost(newComment, post._id));
    setComments(updatedComments);
    setComment('');

    commentsRefs.current.scrollIntoView( {behavior: 'smooth'});

  };
  console.log(comments);

  return (
      <div>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>

            {comments?.map((comment, i) => (
                <Typography key={i} gutterBottom variant="subtitle1">
                  <strong>{comment.split(': ')[0]}</strong>
                  {comment.split(':')[1]}
                  </Typography>
            ))}
            <div ref={commentsRefs}/>
          </div>
          {user?.result?.name && (
            <div style={{width:'50%'}}>
              {/* <Typography gutterBottom variant="h6">Write a comment</Typography> */}
              <TextField multiline fullWidth minRows={4} variant="outlined" label='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)}
                />
              <Button fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick} style={{marginTop: '10px'}}>
                Comment
              </Button>
            </div>
          )}
        </div>
      </div>
  );
};

export default CommentSection;