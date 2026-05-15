import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentCardLayout from '../layout/CommentCardLayout'
import plusIcon from '../assets/icon-plus.svg'
import minusIcon from '../assets/icon-minus.svg'
import replyIcon from '../assets/icon-reply.svg'


const CommentCard = ({comment}) => {
  dayjs.extend(relativeTime)


  return (
      <CommentCardLayout>
            <div className=' col-start-1 col-span-2 md:col-start-2 md:row-start-1 md:row-span-2 flex flex-col space-y-4  '>
              <div className='flex flex-row space-x-3 items-center'>
                <img src={comment.user.image.png} alt={comment.user.username} className='w-10 h-10'/>
                
                <h2 className='text-grey-800 font-bold text-lg'>
                  {comment.user.username}
                </h2>
                <p className='text-grey-500'>
                  {dayjs(comment.createdAt).fromNow()}
                </p>
              </div>
              <p className=' text-grey-500'>
                {comment.content}
              </p>
            </div>
            <div className=' md:col-start-1 '>
              <div className='flex flex-row space-x-3 items-center md:flex-col md:space-x-0 md:space-y-3'>
                <img src={plusIcon} alt="" />
                <p className='text-purple-600 font-bold'>
                  {comment.score}
                </p>
                <img src={minusIcon} alt="" />
              </div>
            </div>
            <div className=' md:col-start-3 md:row-start-1'>
              <div className='flex space-x-3 text-purple-600 items-center justify-end md:justify-start'>
                  <img src={replyIcon} alt="" className='w-3 h-3' />
                  <p className='font-bold'>
                    Reply
                  </p>
              </div>
            </div>
        </CommentCardLayout>
  )
}

export default CommentCard