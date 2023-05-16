import React from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

import useStyles from "./styles"

const Posts = ({setCurrentId}) => {
    const {posts, isLoading} = useSelector((state)=> state.posts)
    const classes = useStyles();

    if(!posts.length && !isLoading) return (
            <Paper className={classes.loadingPaper}>
                <h1 className={classes.heading}>No activities found!</h1>  
            </Paper>  
    );

    if(isLoading) {return ( 
            <Paper className={classes.loadingPaper}>
                <CircularProgress size="6em"/>
            </Paper>
      );
    }

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        // xs is for extra small devices
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }

            </Grid>
        )
    );
}

export default Posts;