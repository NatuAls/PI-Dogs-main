import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsByName } from "../../redux/actions";

const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const onChange = (e)=> {
    setName(e.target.value);
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setName('');
      dispatch(getDogsByName(name));
    }}>
      <input
        type="text"
        value={name}
        placeholder="Nombre..."
        onChange={onChange}
      />
      <input type="submit" value="Buscar" />
    </form>
  );
}

export default SearchBar;