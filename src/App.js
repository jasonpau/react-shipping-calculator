import React, { Component } from 'react';
import './App.css';
import Results from './results';
import InputRadio from './input_radio';
import { calculate_shipping } from './main.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shipping_speed: '5',
      weight_lbs: '',
      weight_ozs: '',
      departure_date: '',
      arrival_date: '',
      cost: '0'
    };
    this.updateResults = this.updateResults.bind(this);
  }

  updateResults(e, type) {
    let current_weight;
    let current_speed;

    if (type === 'weight') {
      current_weight = e.target.value;
      current_speed = this.state.shipping_speed;
    }

    if (type === 'speed') {
      current_weight = this.state.weight_lbs;
      current_speed = e.target.value;
    }

    let {
      weight_ozs,
      weight_lbs,
      shipping_speed,
      departure_date,
      arrival_date,
      cost
    } = calculate_shipping(current_weight, current_speed);

    this.setState({
      shipping_speed: shipping_speed,
      weight_lbs: weight_lbs,
      weight_ozs: weight_ozs,
      departure_date: departure_date,
      arrival_date: arrival_date,
      cost: cost
    });
  }

  render() {

    return (
      <section>
        <h1>Shipping Calculator</h1>
        <form>
          <input
            id="shipping_weight"
            type="text"
            placeholder="Weight of package in pounds"
            value={this.state.weight_lbs}
            onChange={ (event) => this.updateResults(event, 'weight') }
          />

          <ul id="radio_buttons">
            <InputRadio updateResults={this.updateResults} shipping_speed={this.state.shipping_speed} days="5" />
            <InputRadio updateResults={this.updateResults} shipping_speed={this.state.shipping_speed} days="3" />
            <InputRadio updateResults={this.updateResults} shipping_speed={this.state.shipping_speed} days="2" />
          </ul>

          {/*<button type="button" id="submit_button">Calculate</button>*/}
        </form>
        <Results details={this.state}/>
      </section>
    );
  }
}

export default App;
