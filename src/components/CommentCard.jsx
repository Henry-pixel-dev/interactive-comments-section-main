import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState } from 'react'
import CommentCardLayout from '../layout/CommentCardLayout'
import plusIcon from '../assets/icon-plus.svg'
import minusIcon from '../assets/icon-minus.svg'
import replyIcon from '../assets/icon-reply.svg'
import {increaseScore, decreaseScore} from '../utils/CommentUtils'


const CommentCard = ({comment, onReplyClick, updateScore, parentId, isReply}) => {
  dayjs.extend(relativeTime)

  const width = isReply  ? 'w-5xl' : 'w-4xl';
  const cardWidth = isReply ? 'w-4xl' : 'w-3xl'


  



  return (
      <CommentCardLayout width={width}>
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
              <p className={`${cardWidth} text-grey-500 `}>
                {isReply ? '' : (
                  <span className='text-purple-600 font-bold'>@{comment.replyingTo} </span>
                )}
                {comment.content}
              </p>
            </div>
            <div className=' md:col-start-1 '>
              <div className='flex flex-row space-x-3 items-center md:flex-col md:space-x-0 md:space-y-3'>
                <button className='cursor-pointer' onClick={() => updateScore(increaseScore(comment), parentId)}>
                  <img src={plusIcon} alt="" />
                </button>
                <p className='text-purple-600 font-bold'>
                  {comment.score}
                </p>
                <button className='cursor-pointer' onClick={() => updateScore(decreaseScore(comment), parentId)}>
                  <img src={minusIcon} alt="minus" />
                </button>
              </div>
            </div>
            <div className=' md:col-start-3 md:row-start-1'>
              <button className='flex space-x-3 text-purple-600 items-center justify-end md:justify-start'
              onClick={() => onReplyClick(comment.id)}
              >
                  <img src={replyIcon} alt="" className='w-3 h-3' />
                  <p className='font-bold'>
                    Reply
                  </p>
              </button>
            </div>
        </CommentCardLayout>
  )
}

export default CommentCard