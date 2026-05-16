import React from 'react'
import { useState, useEffect, useRef } from 'react'
import CommentMainLayout from '../layout/CommentMainLayout'
import ReplyLayout from '../layout/ReplyLayout'
import CommentCard from '../components/CommentCard'
import InputComment from '../components/InputComent'


const CommentPage = () => {
const [comments, setComments] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
const textareaRef = useRef(null)
const [activeReplyId, setActiveReplyId] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      const [commentsRes, userRes] = await Promise.all([
        fetch('/api/comments'),
        fetch('/api/currentUser')
      ]);

      const commentsData = await commentsRes.json();
      const userData = await userRes.json();

      setComments(commentsData);
      setCurrentUser(userData);
      console.log(commentsData)
      console.log(userData)
    
    } catch (error) {
      console.log('Error fetching data', error);
    }
  }
  fetchData();
}, []);

const addComment = async (newComment) => {
  if (activeReplyId === null) {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    });
    const savedComment = await res.json();
    setComments([...comments, savedComment])

  } else {
    // step 1 - GET the comment
    const res = await fetch(`/api/comments/${activeReplyId}`)
    const existingComment = await res.json()

    // step 2 - push new reply into replies array
    const updatedComment = {
      ...existingComment,
      replies: [...existingComment.replies, newComment]
    }

    // step 3 - PUT the updated comment back
    const putRes = await fetch(`/api/comments/${activeReplyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedComment)
    })
    const savedComment = await putRes.json()

    // step 4 - update state
    setComments(comments.map(c => c.id === activeReplyId ? savedComment : c))
    setActiveReplyId(null)
  }
}

  

  const handleReplyClick = (id) => {
    textareaRef.current.focus()
    setActiveReplyId(id)
    console.log(id)
    // also store the id of the comment being replied to
  }
  


  const handleUpdateScore = async (updatedComment) => {
    const res = await fetch(`/api/comments/${updatedComment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedComment)
    })
    const saved = await res.json()
    setComments(comments.map(c => c.id === saved.id ? saved : c))
  }

  const handleReplyScoreUpdate = async (updatedReply, parentId) => {
    // Step 1 - GET the parent comment
    const res = await fetch(`/api/comments/${parentId}`)
    const parentComment = await res.json()

    // Step 2 - find the reply and update its score
    const updatedReplies = parentComment.replies.map(r => 
      r.id === updatedReply.id ? updatedReply : r
    )

    // Step 3 - build the updated parent
    const updatedParent = { ...parentComment, replies: updatedReplies }

    // Step 4 - PUT it back
    const putRes = await fetch(`/api/comments/${parentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedParent)
    })
    const saved = await putRes.json()

    // Step 5 - update state
    setComments(comments.map(c => c.id === parentId ? saved : c))
  }

  return (
    <CommentMainLayout>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} onReplyClick={handleReplyClick} updateScore={handleUpdateScore}/>
          {comment.replies.length > 0 && (
            <ReplyLayout>
              {comment.replies.map((reply) => (
                <CommentCard key={reply.id} comment={reply}     updateScore={handleReplyScoreUpdate}
                parentId={comment.id}/>
              ))}
            </ReplyLayout>
          )}
        </div>
      ))}
      {currentUser && <InputComment user={currentUser} addCommentSubmit={addComment} textareaRef={textareaRef} activeReplyId={activeReplyId}/>}
    </CommentMainLayout>
  )
  
}

export default CommentPage