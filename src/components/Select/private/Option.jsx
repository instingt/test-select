// @flow

import classnames from 'classnames';
import React, { Component } from 'react';
import type { Option } from '../../../types';

type Props = {
  index: number,
  selected: boolean,
  option: Option,
  isFocused: boolean,
  onFocus: (index: number) => mixed,
  onSelect: (option: Option) => mixed,
  markLength: number
}

export default class Options extends Component<Props> {
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

  markMatched(option: Option) {
    const { markLength } = this.props;
    const { value, label } = option;
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
        { this.markMatched(option) }
      </div>
    );
  }
}
