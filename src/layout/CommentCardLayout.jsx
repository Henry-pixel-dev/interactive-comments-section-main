import React from 'react'

const CommentCardLayout = ({children, width}) => {
  return (
    <section className={`${width} bg-white grid grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] gap-8 p-6 rounded-md `}>
        {children}
    </section>
  )
}

export default CommentCardLayout