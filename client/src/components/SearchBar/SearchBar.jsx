import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName, loading } from "../../redux/actions";

const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const onChange = (e)=> {
    setName(e.target.value);
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      setName('');
      document.getElementById('fTemps').value = '';
      document.getElementById('fExisting').value = '';
      dispatch(loading());
      await dispatch(getDogsByName(name));
      dispatch(loading());
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