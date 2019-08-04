import React from "react";
import "./searchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }
  searchHandler = e => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };
  render() {
    const { className, searchBorder, searchTranslateX } = this.props;
    return (
      <div
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        className={className}
        style={{
          border: searchBorder,
          borderRadius: " 10px",
          paddingBottom: " 0px 5px",
          overflow: " hidden "
        }}
      >
        <div
          className="searchBar"
          style={{
            transform: "translateX(" + searchTranslateX + ")"
          }}
        >
          <svg viewBox="0 0 37 36" fill="none">
            <line
              x1="24.6833"
              y1="22.5301"
              x2="34.627"
              y2="32.4738"
              stroke="#6abad7"
              strokeWidth="5"
            />
            <circle
              cx="18.6066"
              cy="18"
              r="10"
              transform="rotate(-45 18.6066 18)"
              stroke="#6abad7"
              strokeWidth="5"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            name="search"
            value={this.state.searchValue}
            onChange={this.searchHandler}
          />
          <span>Advanced</span>
        </div>
      </div>
    );
  }
}
export default SearchBar;
