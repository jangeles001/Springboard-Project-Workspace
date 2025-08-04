import '../../styles/ship.css'

export const Ship = ({ id, image, name, capacity, onImageClick }) => {
    
    const imageSource = (image && image.trim()) || '/rocket-b.svg';

  return (
    <div className="ship">
        <img src={imageSource} onClick={() => onImageClick(id)} />
        <p>{name}</p>
        <p>{capacity}</p>
    </div>
  )
}
