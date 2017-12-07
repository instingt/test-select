/* eslint-disable react/no-find-dom-node */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import classnames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import type { Option } from '../../types';
import Options from './private/Option';

type Props = {
  placeholder: string,
  options: Array<Option>,
  onChange: (option: Option) => mixed,
  value: Option,
}

type State = {
  isOpen: boolean,
  searchValue: string,
  value: Option | null,
  focusIndex: number
}

export default class Select extends Component<Props, State> {
  static defaultProps = {
    placeholder: '',
    options: [],
    value: '',
    onChange: () => undefined,
  };

  static id = 0;

  static getNextId = () => {
    Select.id += 1;
    return Select.id;
  };

  state = {
    isOpen: false,
    searchValue: '',
    value: this.props.value,
    focusIndex: 0,
  };

  componentWillReceiveProps(newProps: Props) {
    if (newProps.value !== this.state.value) {
      this.setState({
        value: newProps.value,
      });
    }
  }

  componentDidUpdate(nextProps: Props, nextState: State) {
    if (nextState.focusIndex === this.state.focusIndex) {
      return;
    }

    if (this.state.isOpen && this.needScroll) {
      // prevent scroll by mouse over
      this.needScroll = false;
      const options: Element | Text | null = ReactDOM.findDOMNode(document.querySelector(`#option-${this.state.focusIndex}`));
      const optionsList: Element | Text | null = ReactDOM.findDOMNode(document.querySelector(`#select_options-${this.id}`));

      if (!options || !optionsList) {
        return;
      }

      if (options instanceof HTMLElement && optionsList instanceof HTMLElement) {
        const { scrollTop } = optionsList;
        const scrollBottom = scrollTop + optionsList.offsetHeight;
        const optionTop = options.offsetTop;
        const optionBottom = optionTop + options.offsetHeight;

        if (scrollTop > optionTop || scrollBottom < optionBottom) {
          optionsList.scrollTop = options.offsetTop;
        }
      }
    }
  }

  onInputFocus = () => this.setState({ isOpen: true });
  onInputBlur = () => this.setState({ isOpen: false });
  onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => this.setState({
    searchValue: e.target.value,
    focusIndex: 0,
  });

  getOptions() {
    const { value, searchValue, focusIndex } = this.state;
    const filteredOptions = this.getOptionsData();

    if (filteredOptions.length === 0) {
      return (
        <div className="select_item">
          Не найдено
        </div>
      );
    }

    return filteredOptions.map((option, index) => (
      <Options
        key={ `option-${option.value}` }
        index={ index }
        selected={ option.value === value }
        option={ option }
        isFocused={ focusIndex === index }
        onFocus={ idx => this.setState({ focusIndex: idx }) }
        onSelect={ o => this.handleChange(o) }
        markLength={ searchValue.length }
      />
    ));
  }

  getOptionsData(): Array<Option> {
    return this.props.options
      .filter(option => option
        .label
        .toLowerCase()
        .startsWith(this.state.searchValue.toLowerCase()));
  }

  touch: boolean;
  input: ?HTMLInputElement;
  needScroll: boolean;

  handleChange(value: Option) {
    this.setState({
      value,
      searchValue: '',
      isOpen: false,
    });
    this.props.onChange(value);
  }

  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    let { focusIndex } = this.state;
    const options = this.getOptionsData();
    const optionsLength = options.length;

    if (e.key === 'ArrowDown') {
      focusIndex = focusIndex + 1 < optionsLength ? focusIndex + 1 : 0;
    }

    if (e.key === 'ArrowUp') {
      focusIndex = focusIndex - 1 < 0 ? optionsLength - 1 : focusIndex - 1;
    }

    if (e.key === 'Enter') {
      if (!this.input) {
        return;
      }
      this.input.blur();
      this.handleChange(options[focusIndex]);
      return;
    }

    this.needScroll = true;
    this.setState({
      focusIndex,
    });
  };

  id = Select.getNextId();

  openMobileSelect = (e: Event) => {
    if (this.touch) {
      this.touch = false;
      return;
    }

    e.preventDefault();
    if (!this.input) {
      return;
    }
    this.input.focus();
  };

  renderValue() {
    const { options } = this.props;
    const { value, searchValue } = this.state;
    const className = classnames('select_value', {
      'select_value__invisible': !!searchValue,
    });

    if (!value) {
      return null;
    }

    const finedOption = options.find(option => `${option.value}` === `${value.value}`);

    if (finedOption) {
      return (
        <span className={ className }>
          { finedOption.label }
        </span>
      );
    }

    return null;
  }

  render() {
    const { placeholder, options } = this.props;
    const { searchValue, isOpen, value } = this.state;

    const selectClassName = classnames('select', {
      'select__upper-label': isOpen || value,
      'select__opened': searchValue || isOpen,
    });

    return (
      <div className={ selectClassName }>
        <div className="select_control">
          <label className="select_label" htmlFor={ this.id } title={ placeholder }>{ placeholder }</label>
          <select
            className="select_native"
            id={ this.id }
            onChange={ e => this.handleChange(e.target.value) }
            // eslint-disable-next-line no-return-assign
            onTouchStart={ () => this.touch = true }
            onMouseDown={ this.openMobileSelect }
          >
            {
              options
                .map(option => (
                  <option key={ option.value } value={ option.value }>{ option.label }</option>
                ))
            }
          </select>
          {
            this.renderValue()
          }
          <input
            // eslint-disable-next-line no-return-assign
            ref={ input => this.input = input }
            value={ searchValue }
            type="text"
            onFocus={ this.onInputFocus }
            onBlur={ this.onInputBlur }
            onChange={ this.onInputChange }
            onKeyDown={ this.handleKeyDown }
          />
        </div>
        {
          isOpen ?
            <div
              className="select_options"
              id={ `select_options-${this.id}` }
              role="listbox"
              tabIndex={ -1 }
            >
              { this.getOptions() }
            </div> : null
        }
      </div>
    );
  }
}
