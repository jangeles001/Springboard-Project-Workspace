import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

const PostsExcerpt = ({ post }) => {
  return (
    <article>
        <h3>{post.title}</h3>
        <h4 className="postCredit">{<PostAuthor userId={post.userId} />} <TimeAgo timestamp={post.date} /></h4>
        <p>{post.body.substring(0,100)}</p>
        <ReactionButtons post={post}/>
    </article>
  )
}

export default PostsExcerpt