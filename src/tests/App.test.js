import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import axios from 'axios';

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
];

test('renders BlogPostList and navigates to BlogPostDetails', async () => {
    axios.get.mockResolvedValueOnce({ data: { articles: posts } });

    render(
        <Router>
            <App />
        </Router>
    );

    // Wait for BlogPostList to be displayed
    await waitFor(() => {
        expect(screen.getByText('Blog News')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });

    // await waitFor(() => {
    //     expect(screen.getByText('Blog News')).toBeInTheDocument();
    //     expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    // });

    // Navigate to BlogPostDetails
    const readMoreLink = screen.getByText('Read more');
    readMoreLink.click();

    // Verify BlogPostDetails rendering
    await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });
});
