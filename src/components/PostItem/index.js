const PostItem = props => {
  const {postDetails} = props
  const {userId, id, title, body} = postDetails
  return (
    <li className="list-container">
      <div>
        <div>
          <p>userId:{userId}</p>
          <p>Id:{id}</p>
        </div>
        <p>Title:{title}</p>
        <p>Body:{body}</p>
      </div>
    </li>
  )
}
export default PostItem
