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

  
  // we are going to remove this function and replace it with not textarea focus but on click it will set the activeReplyId and then we will use that id as a bollean to import an input area under the replyLayout and then on submitting we will get and use the logic we are using before 
  const handleReplyClick = (id) => {
    // textareaRef.current.focus()
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

  const handleDeleteClick = (id) => {
    // we are going to make a delete request to the server and then update the state by filtering out the deleted comment
  }

  const handleEditClick = (id) => {
    // we are going to make a put request to the server with the updated comment and then update the state by mapping through the comments and replacing the old comment with the updated one
  }


 console.log('currentUser:', currentUser) 
  return (
    
    <CommentMainLayout>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} onReplyClick={handleReplyClick} updateScore={handleUpdateScore} isReply={false} currentUser={currentUser} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
          {activeReplyId === comment.id && <InputComment user={currentUser} addCommentSubmit={addComment} textareaRef={textareaRef} activeReplyId={activeReplyId} />}
          {comment.replies.length > 0 && (
            <ReplyLayout>
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <CommentCard key={reply.id} comment={reply} updateScore={handleReplyScoreUpdate} parentId={comment.id} isReply={true} currentUser={currentUser} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
                  {activeReplyId === reply.id && <InputComment user={currentUser} addCommentSubmit={addComment} textareaRef={textareaRef} activeReplyId={activeReplyId}/>}
                </div>
              ))}
            </ReplyLayout>
          )}
        </div>
      ))}
      {currentUser && <InputComment user={currentUser} addCommentSubmit={addComment} textareaRef={textareaRef} activeReplyId={activeReplyId}/>}
      {/* we are going to remove the textareaRef  also with the activeReplyId */}
    </CommentMainLayout>
  )
  
}

export default CommentPage