import config from './confg/config';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './appwrite/auth'
import { login, logout } from './store/auth';
import { Header } from './components';
import { Outlet } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = auth.getCurrentUser()
    getUser.then((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      }
      else {
        dispatch(logout())
      }
    })
      .finally(() => { setLoading(false) })
  }, [])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <Outlet />
      </div>
    </div>
  ) : null;
}

export default App
