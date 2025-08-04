import '../../styles/ship.css'

export const Ship = ({ id, image, name, capacity, onImageClick, isSelected }) => {
    
    const imageSource = (image && image.trim()) || '/rocket-b.svg';

  return (
    <div className='ship'>
        <img className={`${isSelected ? 'selected' : ''}`} src={imageSource} onClick={() => onImageClick(id)} />
        <p>{name}</p>
        <p>{capacity}</p>
    </div>
  )
}
