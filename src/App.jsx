import React from 'react'

const App = () => {
  return (
   <main className='p-6 flex flex-col items-center space-y-8'>
      <section className='grid grid-cols-2 grid-rows-2 md:grid-cols-3'>
          <div className='col-start-1 col-span-2 md:col-start-2 md:row-start-1 md:row-span-2'>A</div>
          <div className='md:col-start-1'>B</div>
          <div className='md:col-start-3 md:row-start-1'>C</div>
      </section>
   </main>
  )
}

export default App