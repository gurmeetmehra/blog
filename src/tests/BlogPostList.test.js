import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import BlogPostList from '../components/BlogPostList';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock axios
jest.mock('axios');

const posts = [
    {
        title: 'Test Post 1',
        description: 'Description for Test Post 1',
        publishedAt: '2024-07-20T00:00:00Z',
        urlToImage: 'http://example.com/image1.jpg',
        url: 'http://example.com/post1',
    },
    // Add more mock posts if needed
];

test('renders BlogPostList and handles pagination', async () => {
    axios.get.mockResolvedValueOnce({ data: { articles: posts } });

    render(
        <Router>
            <BlogPostList />
        </Router>
    );

    // Wait for posts to be displayed
    await waitFor(() => {
        expect(screen.getByText('Blog News')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });

    // Check pagination
    expect(screen.getByRole('navigation')).toBeInTheDocument();
});
