import React from 'react';
import {Form} from 'react-bootstrap';
import './index.css';

class InputForSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }

    this.filterSearch = this.filterSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  filterSearch(value) {
    const lines = document.querySelectorAll("#addressListGroup > a");

    for (let a of lines) {

      let absenceIndicator = true;
      let pCollection = a.children;

      for (let p of pCollection) {
        if (p.textContent.toLowerCase().indexOf(value.toLowerCase()) === -1) {
          continue;
        } else {
          absenceIndicator = false;
          break;
        }
      }

      if (absenceIndicator) {
        a.setAttribute("hidden", true);
      } else {
        a.removeAttribute("hidden");
      }
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.filterSearch(this.state.value);
    }
  }

  render() {
    const {
      value,
    } = this.state;

    return (
      <Form
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
          };
          this.filterSearch(e.target.value);
        }}
      >
        <Form.Control
          type="text"
          placeholder="фильтр"
          value={value}
          onChange={this.handleChange}
        />
      </Form>
    )
  }
}

export default InputForSearch;
