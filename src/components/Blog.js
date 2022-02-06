import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-configuration';
import logo from '../logo.jpeg';
import { MdDeleteForever } from 'react-icons/md';

function Blog({ isAuth }) {
  // declaring states
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, 'Blogs');
  // getting a blogs from a database
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);
  // deleting data in firebase database
  const deletePost = async (id) => {
    const postDoc = doc(db, 'Blogs', id);
    // console.log(postDoc);
    await deleteDoc(postDoc);
  };
  return (
    <div className='homePage'>
      {postLists.map((post) => {
        return (
          <div key={post.id} className='blog'>
            <img className='blog-logo' src={logo} alt='Blog-logo' />
            <div className='blogHeader'>
              <div className='title'>
                <h1> {post.title}</h1>
              </div>
              <div className='delete-blog'>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                )}
              </div>
            </div>
            <div className='button-container'>
              <h3>Author:{post.author.name}</h3>
            </div>
            <p>Date of posted:{post.date}</p>
            <div className='blogTextContainer'>
              {' '}
              Content of blog:
              <br />
              {post.blogText}{' '}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;
