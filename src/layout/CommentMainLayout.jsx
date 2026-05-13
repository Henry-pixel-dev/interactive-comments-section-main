import React from 'react'
import { Outlet } from 'react-router-dom';


const MainLayout = ({children}) => {
  return (
    <main className='pl-6 mt-12 flex flex-col items-center space-y-8 max-w-5xl'>
        {children}
    </main>
  )
}

export default MainLayout