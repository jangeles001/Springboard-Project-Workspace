import '../styles/SelectBox.css'

const SelectBox = ({ id, source="/rocket-b.svg", name, population, details, action, actionName, isRowLayout, onImageClick="", isSelected}) => {
  
  const pop = population || 0;
  const realId = id || 0;
  const imageSource = (source && source.trim()) || '/rocket-b.svg';

  return (
    <div className='select__box' >
      <span className={`image__info ${isSelected ? 'selected' : ''}`}>
        <img src={imageSource} onClick={() => onImageClick(realId)}></img>
          {population !== undefined && population !== null && (
            <>
            <p>{name}:</p>
            <p>{pop}</p>
          </>
          )}
      </span>
        
        <div className={`${isRowLayout ? 'select__box--variant2' : 'select__box--details '}`}>
            {isRowLayout
                ? details
                : details?.map(item => <p key={item}>{item}</p>)
                } 
        </div>
        {action && actionName && <button className='destroy' onClick={() => action(id)}>{actionName}</button>}
    </div>
  )
}
export default SelectBox;