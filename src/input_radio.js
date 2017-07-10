import React from 'react';

export default class InputRadio extends React.Component {

  render() {
    const {shipping_speed, days} = this.props;

    return (
      <li>
        <label htmlFor={days + '_day'}>
          <input
            id={days + '_day'}
            type="radio"
            name="shipping_speed"
            value={days}
            checked={shipping_speed === parseFloat(days)}
            onChange={ (event) => this.props.updateResults(event, 'speed') }
          />
          {days} day
        </label>
      </li>
    )
  }
}