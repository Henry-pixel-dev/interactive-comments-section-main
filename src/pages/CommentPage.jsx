import React from 'react'
import { useState, useEffect } from 'react'
import CommentMainLayout from '../layout/CommentMainLayout'
import ReplyLayout from '../layout/ReplyLayout'
import CommentCard from '../components/CommentCard'
import InputComment from '../components/InputComent'


const CommentPage = () => {
const [comments, setComments] = useState([]);
const [currentUser, setCurrentUser] = useState(null);

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
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    });
    const savedComment = await res.json();
    setComments([...comments, savedComment])
  }
  


  return (
    <CommentMainLayout>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} />
          {comment.replies.length > 0 && (
            <ReplyLayout>
              {comment.replies.map((reply) => (
                <CommentCard key={reply.id} comment={reply} />
              ))}
            </ReplyLayout>
          )}
        </div>
      ))}
      {currentUser && <InputComment user={currentUser} addCommentSubmit={addComment}/>}
    </CommentMainLayout>
  )
  
}

export default CommentPage