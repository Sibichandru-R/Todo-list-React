import './button.scss'
export const Button = (props) => {
  return (
    <button className='button'>
      <img src={props.source} width="30px" alt={props.alt} onClick={props.handleClick} />
    </button>
  );
};
