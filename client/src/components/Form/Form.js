import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost} from "../../actions/posts";
import { useHistory } from "react-router-dom";
const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({title: '',description: '',tags: '',selectedFile: '',}) 
    
    // Fetching the post with the given ID
    const post = useSelector((state)=> currentId ? state.posts.posts.find((post) => post._id === currentId) : null);
    
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))    
        }
        else{
            dispatch(createPost({...postData, name: user?.result?.name}, history));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({title: '',description: '',tags: '',selectedFile: ''})
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">Sign in to host an activity!</Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? `Edit Activity: "${post.title}"` :"Host an Activity!"}</Typography>
                {/*'...' is used to spread the post data and make it persists instead of overwriting everytime.*/}  
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField multiline name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase  type="file"multiple = {false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}/></div>
                
                {/* <Button variant="contained" component="label"> Upload File<input type="file" hidden/></Button> */}

                <Button className={classes.buttonSubmit} variant="contained" type="submiit" fullWidth>Submit</Button>
                <Button variant="contained" color="success" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    );
}

export default Form;