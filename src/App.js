import React from 'react';
import { HashRouter , Routes, Route,  } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';
import { Toaster } from 'sonner';

const App = () => (
  <>
    <Toaster richColors />
    <HashRouter basename="/blog">
      <Routes>
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:id" element={<BlogPostDetails />} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
