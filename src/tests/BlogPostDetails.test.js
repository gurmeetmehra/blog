import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import BlogPostDetails from '../components/BlogPostDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Mock axios
jest.mock('axios');

const post = {
    title: 'Test Post 1',
    content: 'Full content of Test Post 1',
    urlToImage: 'http://example.com/image1.jpg',
};

test('renders BlogPostDetails with post data', async () => {
    axios.get.mockResolvedValueOnce({ data: { articles: [post] } });

    render(
        <Router>
            <Routes>
                <Route path="/post/:id" element={<BlogPostDetails />} />
            </Routes>
        </Router>
    );

    // Mock URL parameter
    window.history.pushState({}, 'Test Post Details', '/post/unique-id');

    // Wait for post details to be displayed
    await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByText('Full content of Test Post 1')).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(screen.getByAltText('Test Post 1')).toHaveAttribute('src', 'http://example.com/image1.jpg');
    });
});
