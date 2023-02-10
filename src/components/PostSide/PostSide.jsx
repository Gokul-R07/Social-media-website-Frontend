import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import "./PostSide.css"

const PostSide = ({pageName}) => {
  return (
      <div className="PostSide">
      <PostShare />
      <Posts pageName={pageName} />
    </div>
  )
}

export default PostSide