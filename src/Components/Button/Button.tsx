import './button.scss'

type Props = {
  source:string,
  alt:string,
  handleClick:()=>void
}
export const Button = (props:Props) => {
  return (
    <button className='button'>
      <img src={props.source} width="30px" alt={props.alt} onClick={props.handleClick} />
    </button>
  );
};
