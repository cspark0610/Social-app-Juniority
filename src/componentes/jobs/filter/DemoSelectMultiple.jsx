import React, { Component} from "react";
import Select from "react-select";

const options = [
  { value: "Javascript", label: "Javascript" },
  { value: "React", label: "React" },
  { value: "FireBase", label: "FireBase" },
  { value: "Css", label: "Css" }
];

export default class DemoSelectMultiple extends Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // Option selected: { value: "rojo", label: "rojo" }
    console.log("Option selected:", selectedOption);
  };
  render() {
    return (
      <>
        <Select
          isMulti
          options={options}
          value={this.state.selectedOption}
          onChange={this.handleChange}
          closeMenuOnSelect={false}
          className="select__multiple"
        />
      </>
    );
  }
}