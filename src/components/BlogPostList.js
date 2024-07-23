import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Pagination, Typography, Box, CircularProgress } from '@mui/material';
import BlogPostItem from './BlogPostItem';
import axios from 'axios';
import { toast } from 'sonner';

import { v5 as uuidv5 } from 'uuid';

const NAMESPACE = '10aadc3d-cb4e-4ab1-81d3-7f5c7d39366d'; // Create a constant namespace for UUID generation

const BlogPostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 50; // Total number of pages
    const [loading, setLoading] = useState(true);
    const fetchData = useCallback(() => {
        axios.get(`https://newsapi.org/v2/everything?q=technology&page=${currentPage}&pageSize=12&apiKey=1c2a18e3361d43dbbb4439565a6939e7`)
            .then((res) => {
                setPosts(res.data.articles);
                toast.success('Data fetched successfully!', {
                    position: 'top-right',
                    style: {
                        backgroundColor: 'lightgreen',
                        color: 'white',
                    },
                });
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: 'top-right',
                });
                setLoading(false);
            });
    }, [currentPage]);


    useEffect(() => {
        fetchData();
    }, [currentPage, fetchData]);
    if (loading) return (
        <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress size={55} />
        </Box>
    );

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                News Blog
            </Typography>
            <Grid container spacing={2}>
                {posts.map(post => {
                    const uniqueId = uuidv5(`${post.title}-${post.publishedAt}`, NAMESPACE);
                    return (
                        <Grid item key={uniqueId} xs={12} sm={6} md={4} xl={3} lg={3}>
                            <BlogPostItem post={post} id={uniqueId} />
                        </Grid>
                    );
                })}
            </Grid>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                    color="primary"
                />
            </div>
        </Container>
    );
};

export default BlogPostList;
