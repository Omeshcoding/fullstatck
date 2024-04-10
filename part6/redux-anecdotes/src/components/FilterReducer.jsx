import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  // const handleChange = (event) => {
  //   event.preventDefault();
  //   console.log(event.target.value);
  //   //input-field value is in variable event.target.value
  // };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={(e) => dispatch(filterChange(e.target.value))} />
    </div>
  );
};

export default Filter;
