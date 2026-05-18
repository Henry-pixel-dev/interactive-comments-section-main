import React from 'react'
import deleteIcon from '../assets/icon-delete.svg'
import editIcon from '../assets/icon-edit.svg'

const ButtonComponent = ({handleEditClick, handleDeleteClick}) => {
  return (
    <div className='flex flex-row items-center space-x-3'>
      <button className='flex flex-row space-x-2 items-center cursor-pointer'
      onClick={() => handleDeleteClick()}>
        <img src={deleteIcon} alt="Delete" className='w-4 h-4' />
        <span className=' text-pink-400 hover:text-pink-200'>Delete</span>
      </button>
      <button className='flex flex-row space-x-2 items-center cursor-pointer'
      onClick={() => handleEditClick()}>
        <img src={editIcon} alt="Edit" className='w-4 h-4' />
        <span className='text-purple-600 hover:text-purple-200'>Edit</span>
      </button>
    </div>
  )
}

export default ButtonComponent