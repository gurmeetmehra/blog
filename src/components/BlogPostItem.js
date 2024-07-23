import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import image from "./assets/No_Image.jpg";
import moment from "moment";

const TypographyStyle = styled(Typography)({
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.5em',
    maxHeight: '3em',
    wordWrap: 'break-word',
});


const BlogPostItem = ({ post, id }) => {
    return (
        <Card sx={{ maxWidth: 345, height: 400 }}>
            <CardMedia
                sx={{ width: '100%', height: 200, objectFit: 'contain' }}
                image={post.urlToImage || image}
                title={post.title}
            />
            <CardContent>
                <TypographyStyle variant="h6" component="div">
                    <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.title}
                    </Link>
                </TypographyStyle>
                <TypographyStyle variant="body2" color="text.secondary">
                    {post.description}
                </TypographyStyle>
                <Typography variant="caption" display="block" gutterBottom>
                    {moment(post.publishedAt).format("YYYY-MM-DD")}
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt="auto">
                    <Button
                        variant="text"
                        color="primary"
                        component={Link}
                        to={`/post/${id}`}   >
                        Read more
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BlogPostItem;
