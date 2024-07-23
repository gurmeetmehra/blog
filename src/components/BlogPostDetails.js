import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { v5 as uuidv5 } from 'uuid';
import { Button, Container, Box, CircularProgress } from '@mui/material';

const NAMESPACE = '10aadc3d-cb4e-4ab1-81d3-7f5c7d39366d'; // Same namespace as used in BlogPostList

const BlogPostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://newsapi.org/v2/everything?q=technology&apiKey=1c2a18e3361d43dbbb4439565a6939e7')
            .then(response => {
                const foundPost = response.data.articles.find(post => uuidv5(`${post.title}-${post.publishedAt}`, NAMESPACE) === id);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    setError('Post not found');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching post');
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress size={55} />
        </Box>
    );

    if (error) return <p>{error}</p>;

    return (
        <Container>
            {post.urlToImage && (
                <img
                    src={post.urlToImage}
                    alt={post.title}
                    style={{ width: '100vw', height: 200, objectFit: 'contain' }}
                />
            )}
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <Button
                variant='outlined'
                color='primary'
                component={Link}
                to="/"
            >
                Back to Posts
            </Button>
        </Container>
    );
};

export default BlogPostDetails;
