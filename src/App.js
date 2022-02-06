import { useState } from 'react';
//importing css file
import './App.css';
//importing a react router dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//importing a components
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
// importing firebase configaration
import { signOut } from 'firebase/auth';
import { auth } from './firebase-configarations';

function App() {
  // declaring a states
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  // this function is for signing out a user
  const signUserOut = () => {
    signOut(auth).then(() => {
      // clearing local storage
      localStorage.clear();
      setIsAuth(false);
      //redirecting to login page
      window.location.pathname = '/login';
    });
  };

  return (
    <Router>
      <nav>
        <Link to='/'> Blogs </Link>
        {!isAuth ? (
          <Link to='/login'> Login </Link>
        ) : (
          <>
            <Link to='/blog'> Create Blog </Link>
            <button className='btn' onClick={signUserOut}>
              {' '}
              Log Out
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<Blog isAuth={isAuth} />} />
        <Route path='/blog' element={<CreateBlog isAuth={isAuth} />} />

        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
