import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import CommentPage from './pages/CommentPage'


const App = () => {

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
          <Route index element={<CommentPage />} />
        </Route>
      )
    )

  return (
    <RouterProvider router={router} />
  )
}

export default App