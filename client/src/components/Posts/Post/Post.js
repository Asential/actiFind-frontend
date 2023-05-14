import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, colors } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import moment from 'moment'

import useStyles from './styles'
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";
import { green } from "@material-ui/core/colors";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));

    const L = () => {
        return <Typography style={{fill: "green", color: "green"}}>Like</Typography>
    }

    const Ls = () => {
        return <Typography style={{fill: "green", color: "green"}}>Likes</Typography>
    }

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
            ? (
                <><FavoriteIcon style={{fill: "green", color: "green"}} fontSize="small" />&nbsp;{post.likes.length}</>
            ) : (
                <><FavoriteBorderIcon style={{fill: "green", color: "green"}}  fontSize="small" />&nbsp;{post.likes.length}</>
            );
        }

        return <><FavoriteBorderIcon style={{fill: "green", color: "green"}} fontSize="small" />&nbsp;</>;
    };

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={10}>
            <ButtonBase component="span" className={classes.cardAction} onClick={openPost}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === post?.host || user?.result?.sub === post?.host) && ( 
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} ` )}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom component="h2"> {post.title}</Typography>
            <CardContent style={{width: "auto"}} >
                <Typography className={classes.cardDescription} variant="body2" color="textSecondary" component="p"> {post.description}</Typography>
            </CardContent>

            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button disabled={!user?.result} size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?._id === post?.host || user?.result?.sub === post?.host) && ( 
                    <Button style={{color: "green"}}  size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                        <DeleteIcon style={{fill: "green"}} fontSize="small"/>
                        Delete 
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;