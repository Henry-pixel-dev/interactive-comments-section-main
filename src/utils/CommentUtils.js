export const increaseScore = (comment) => {
  return { ...comment, score: comment.score + 1 }
}

export const decreaseScore = (comment) => {
  if (comment.score <= 0) return comment
  return { ...comment, score: comment.score - 1 }
}