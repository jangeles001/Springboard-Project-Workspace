import  Counter  from './features/counter/Counter.jsx'
import PostsList from './features/posts/postsList.jsx'
import AddPostForm from './features/posts/AddPostForm.jsx'
import './App.css'

function App() {

  return (
    <>
      <Counter />
      <AddPostForm />
      <PostsList />
    </>
  )
}

export default App
