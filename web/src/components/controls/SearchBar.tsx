import "../../styles/components/SearchBar.scss";

type Props = {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
};

function SearchBar(props: Props) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

export default SearchBar;
