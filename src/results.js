import React from 'react';

const Results = (props) => {

    const {
      weight_lbs,
      weight_ozs,
      shipping_speed,
      departure_date,
      arrival_date,
      cost
    } = props.details;

    return (
      <ul id="shipping_information">
        <li><strong>Weight:</strong>
          <ul>
            <li className="weight">{weight_ozs} ounces</li>
            <li className="weight">({weight_lbs} pounds)</li>
          </ul>
        </li>
        <li><strong>Shipping:</strong>
          <ul>
            <li className="weight">Type: {shipping_speed} day</li>
            <li className="weight"><strong>Departing: </strong>{departure_date}</li>
            <li className="weight"><strong>Arriving: </strong>{arrival_date}</li>
          </ul>
        </li>
        <li className="weight"><strong>Cost: </strong>{cost}</li>
      </ul>
    );
};

export default Results;