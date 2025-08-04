import '../styles/ContentBox.css'

export const ContentBox = ({ title, content }) => {
  return (
    <div className="content__box">
        <h1> {title}</h1>
        <span className='box'><p>{content}</p></span>
    </div>
  )
}

export default ContentBox