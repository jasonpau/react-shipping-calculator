export function calculate_shipping(weight = 0, days = 5) {

  days = parseFloat(days);

  let cost_per_ounce;
  let shipping_cost_multiplier;
  let current_date = new Date();
  let ms = current_date.getTime();
  let single_day_in_ms = 24 * 60 * 60 * 1000;
  let shipping_time_ms = ms;
  let arrival_date;
  let shipping_cost_dollars;
  let weight_in_ounces = parseFloat(weight) * 16; // multiply input weight by 16 to obtain ounces

  // create shipping multiplier depending on selected shipping speed
  if (days === 3) {
    shipping_cost_multiplier = 1.5;
  } else if (days === 2) {
    shipping_cost_multiplier = 2;
  } else {
    shipping_cost_multiplier = 1;
  }

  // determine cost per ounce, based on weight ranges and shipping multiplier
  if (weight_in_ounces < 20) {
    cost_per_ounce = 2 * shipping_cost_multiplier ;
  } else if (weight_in_ounces > 32) {
    cost_per_ounce = 20 * shipping_cost_multiplier;
  } else {
    cost_per_ounce = 10 * shipping_cost_multiplier;
  }

  // determine actual shipping cost of weight * cost per ounce * 0.01 to convert to dollars.
  shipping_cost_dollars = (cost_per_ounce * weight_in_ounces * 0.01).toFixed(2);

  // determine if today is sunday, if so add one day (in MS) to the shipping time total (in MS)
  if (current_date.getDay() === 0) {
    shipping_time_ms += single_day_in_ms;
  }

  // add actual shipping time (e.g. 5, 3, 2) (in MS) to the shipping time total (in MS)
  if (days === 5) {
    shipping_time_ms += 5 * single_day_in_ms;
  } else if (days === 3) {
    shipping_time_ms += 3 * single_day_in_ms;
  } else if (days === 2) {
    shipping_time_ms += 2 * single_day_in_ms;
  } else {
    shipping_time_ms = 30 * single_day_in_ms; // shouldn't ever run, but just in case for lolz
  }

  // figure out new arrival date, and determine if it's sunday as well
  let prelim_date = new Date(shipping_time_ms);
  if (prelim_date.getDay() === 0) {
    shipping_time_ms += single_day_in_ms;
  }

  // create final shipping time in MS, after taking into account two possible sundays and actual shipping time
  arrival_date = new Date(shipping_time_ms);

  // create date in string format of "June 3, 2016"
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let formatted_current_date_string = '' +
    monthNames[current_date.getMonth()] + ' ' +
    current_date.getDate() + ', ' +
    current_date.getFullYear();
  let formatted_arrival_date_string = '' +
    monthNames[arrival_date.getMonth()] + ' ' +
    arrival_date.getDate() + ', ' +
    arrival_date.getFullYear();

  // create object to be returned that includes all values needed to build the display
  return {
    weight_ozs: weight_in_ounces,
    weight_lbs: weight,
    shipping_speed: days,
    departure_date: formatted_current_date_string,
    arrival_date: formatted_arrival_date_string,
    cost: shipping_cost_dollars
  };
}
