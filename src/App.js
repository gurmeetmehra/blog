import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';
import { Toaster } from 'sonner';

const App = () => (
  <>
    <Toaster richColors />
    <Router>
      <Routes>
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:id" element={<BlogPostDetails />} />
      </Routes>
    </Router>
  </>
);

export default App;
