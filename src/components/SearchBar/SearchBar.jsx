import { useState } from "react";
import style from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const submit = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      onSubmit(e.target.value);
      setValue("");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <SearchIcon size={27} className={style.icon} />
      <input
        onKeyUp={submit}
        onChange={handleChange}
        type="text"
        className={style.input}
        placeholder={"Search a tv show you may like"}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
