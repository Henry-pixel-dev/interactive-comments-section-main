import React from 'react'
import { Outlet } from 'react-router-dom';


const MainLayout = ({children}) => {
  return (
    <main className='flex flex-col items-center'>
      <div className='pl-6 mt-12 flex flex-col items-center space-y-8 max-w-6xl'>
          {children}
      </div>
    </main>
  )
}

export default MainLayout