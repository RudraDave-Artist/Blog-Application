import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.js'
import { Route } from 'react-router-dom'
import { createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import { Home, Login, Signup, AddPost, AllPost, EditPost, Post, MyPost } from "./pages"
import { PersistGate } from 'redux-persist/integration/react'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      } />
      <Route path='/signup' element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      } />
      <Route path='/add-post' element={
        <AuthLayout>
          <AddPost />
        </AuthLayout>
      } />
      <Route path='/edit-post/:slug' element={
        <AuthLayout>
          <EditPost />
        </AuthLayout>
      } />
      <Route path='/all-post' element={
        <AuthLayout>
          <AllPost />
        </AuthLayout>
      } />
      <Route path='/my-post' element={
        <AuthLayout>
          <MyPost />
        </AuthLayout>
      } />
      <Route path='/post/:slug' element={
        <Post />
      } />
    </Route >
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
