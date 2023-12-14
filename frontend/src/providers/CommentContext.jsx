// CommentContext.jsx

import React, { createContext, useState, useContext } from 'react';

const CommentContext = createContext();

const PostCommentsProvider = ({ children }) => {
  const [postComments, setPostComments] = useState([]);

  const addComment = (comment) => {
    setPostComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <CommentContext.Provider value={{ postComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

const usePostComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('usePostComments debe usarse dentro de un PostCommentsProvider');
  }
  return context;
};

export { PostCommentsProvider, usePostComments };
