import React, { useState, useEffect } from "react";
import { Grid, Grow, Container, Paper,  TextField, AppBar, Button } from '@material-ui/core'
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination/Pagination";
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null); 
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const classes = useStyles();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const handleKeyPress = (e) => {
        // Enter key pressed
        if (e.keyCode === 13) {
          searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
      };

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField 
                    name="search" 
                    variant="outlined" 
                    label="Search Activities" 
                    onKeyDown={handleKeyPress} 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} fullWidth/>
                <ChipInput
                    style={{ margin: '10px 0' }}
                    value={tags}
                    onAdd={handleAddChip}
                    onDelete={handleDeleteChip}
                    label="Search by tags..."
                    variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={6}>
                        <Pagination />
                    </Paper>                        
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
        </Container>
    </Grow>
  );
};

export default Home;