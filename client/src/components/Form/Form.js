import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost} from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({host: '',title: '',description: '',tags: '',selectedFile: '',}) 
    
    // Fetching the post with the given ID
    const post = useSelector((state)=> currentId ? state.posts.find((post) => post._id === currentId) : null);
    
    const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, postData))    
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({host: '',title: '',description: '',tags: '',selectedFile: ''})
    }

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? "Edit Your Activity" :"Host an Activity!"}</Typography>
                
                {/*'...' is used to spread the post data and make it persists instead of overwriting everytime.*/}  
                <TextField name="host" variant="outlined" label="Host" fullWidth value={postData.host} onChange={(e) => setPostData({ ...postData, host: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file"multiple = {false}onDone={({base64}) => setPostData({...postData, selectedFile:base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submiit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    );
}

export default Form;