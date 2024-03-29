import React, {useEffect} from "react";
import {Pagination, PaginationItem} from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import useStyles from './styles';
import { Link } from "react-router-dom";

const Paginate = ({page}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { numOfPages } = useSelector((state) => state.posts);
    useEffect(() => {
      if(page) {
        // Disappointment you are.......
        dispatch(getPosts(page));
      }
    }, [dispatch, page]);
    

    return (
        <Pagination 
            classes={{ul:classes.ul}}
            count={numOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="secondary"
            renderItem={(item)=>(
                <PaginationItem 
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`} 
                />
            )}
        />
    )
}; 

export default Paginate;

