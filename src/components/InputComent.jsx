import React from 'react'


const InputComent = ({ user }) => {
  return (
    <form className='bg-white w-full grid grid-cols-[auto_auto] md:flex md:flex-row md:justify-between md:items-start gap-4 md:space-y-0 md:space-x-4 p-6 rounded-md'>
        <div className='w-full  col-start-1 col-span-2 md:flex-1  md:order-2'>
            <textarea type="text" placeholder='Add a comment' className='p-4 w-full border border-grey-500 rounded-md h-32 resize-none focus:outline focus:outline-grey-500'/>
        </div>
        <div className='order-2 md:order-1'>
            <picture>
                <source srcSet={user.image.webp} type="image/webp" />
                <img src={user.image.png} alt={user.username} className='w-12 h-12 rounded-full' />
            </picture>
        </div>
        <div className='order-3 md:order-3  flex   justify-end'>
            <button className='bg-purple-600 px-4 py-2 rounded-md text-white'>
                Send
             </button>
        </div>
    </form>
  )
}

export default InputComent