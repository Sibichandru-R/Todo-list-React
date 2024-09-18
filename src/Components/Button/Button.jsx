import './button.scss'

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const Button = (props) => {
  return (
    <button className='button'>
      <img src={props.source} width="30px" alt={props.alt} onClick={props.handleClick} />
    </button>
  );
};
