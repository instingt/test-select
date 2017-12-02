import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Options extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    option: PropTypes.instanceOf(Object).isRequired,
    isFocused: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    markLength: PropTypes.number.isRequired,
  };

  onFocus() {
    const { isFocused, index, onFocus } = this.props;
    if (!isFocused) {
      onFocus(index);
    }
  }

  handleMouseEnter = () => {
    this.onFocus();
  };

  handleMouseMove = () => {
    this.onFocus();
  };

  handleChange = () => {
    this.props.onSelect(this.props.option);
  };

  markMatched(label, value) {
    const { markLength } = this.props;
    return [
      <span className="select_item__marked" key={ `${value}-mark` }>{ label.slice(0, markLength) }</span>,
      label.slice(markLength),
    ];
  }

  render() {
    const {
      index,
      selected,
      option,
      isFocused,
    } = this.props;

    const className = classnames('select_item', {
      'select_item__focused': isFocused,
      'select_item__selected': selected,
    });

    return (
      <div
        role="option"
        aria-selected={ selected }
        tabIndex={ index }
        className={ className }
        onMouseDown={ this.handleChange }
        onMouseEnter={ this.handleMouseEnter }
        onMouseMove={ this.handleMouseMove }
        title={ option.label }
        id={ `option-${index}` }
      >
        { this.markMatched(option.label, option.value) }
      </div>
    );
  }
}
