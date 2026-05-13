import React from 'react'

const ReplyLayout = ({children}) => {
  return (
    <div className='md:border-l md:border-grey-500 mt-10 md:ml-10 md:pl-10 flex flex-col items-center space-y-8'>
        {children}
    </div>
  )
}

export default ReplyLayout