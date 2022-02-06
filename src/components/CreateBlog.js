import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-configuration';

function CreateBlog({ isAuth }) {
  // declaring states
  const [title, setTitle] = useState('');
  const [blogText, setBlogText] = useState('');
  //here i have used date as string because wasn't working with datepicker
  const [date, setDate] = useState('');

  // assigning blogs collection to ref
  const BlogsCollectionRef = collection(db, 'Blogs');

  // sending created blog details to database
  const createBlog = async () => {
    await addDoc(BlogsCollectionRef, {
      title,
      blogText,
      date,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    window.location = '/';
  };
  // checking if user not logged in then redirected to login page
  useEffect(() => {
    if (!isAuth) {
      window.location = '/login';
    }
  }, []);

  return (
    <div className='createBlogPage'>
      <div className='cpContainer'>
        <h1>Create A BLog</h1>
        <div className='inputGp'>
          <label> Title:</label>
          <input
            placeholder='Title of a blog'
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className='inputGp'>
          <label> Description:</label>
          <textarea
            placeholder='Content of a blog'
            onChange={(event) => {
              setBlogText(event.target.value);
            }}
          />
        </div>
        <div className='inputGp'>
          <label> Date of Post:</label>
          <input
            placeholder='Date of posted only number'
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </div>
        <button onClick={createBlog}> Create blog</button>
      </div>
    </div>
  );
}

export default CreateBlog;
