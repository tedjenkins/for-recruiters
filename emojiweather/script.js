/**
 * @description Form submit event handling starting point.
 * @param {Event} e Form submit event.
 */
export const handleSubmit = e => {
  e.preventDefault();

  // Fetch data
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/forecast',
    data: {
      q: $('#city-input').val(),
      units: 'metric',
      APPID: '2ee8b797967566459f0a37dcd5db6a86'
    },
    type: 'GET',
    dataType: 'json'
  })
    .done(handleSubmitSuccess)
    .fail(handleSubmitError)
    .always(handleSubmitAlways);
};

/**
 * @description Handle the successful retrieval of data from the OpenWeather external API.
 * @param {object} json JSON data.
 */
export const handleSubmitSuccess = json => {
  // Clear input field
  $('#city-input').val('');

  // Set up main display
  $.each(json.list, (index, entry) => {
    const box = $('<div class="weather-box"></div>');

    // Date
    const dtEl = $(
      `<div class="weather-box-date">${moment(entry.dt_txt, 'ddd, hA')}</div>`
    );
    box.append(dtEl);

    // Emoji icon
    const icEl = $('<div class="weather-box-icon"><insert emoji here></div>');
    box.append(icEl);

    // Temperature
    const tempEl = $(
      `<div class="weather-box-temp">${entry.main.temp.toFixed()}°C</div>`
    );
    box.append(tempEl);

    // Cloudiness
    const cldEl = $(
      `<div class="weather-box-cloudiness">${entry.clouds.all}% cloudy</div>`
    );
    box.append(cldEl);

    // Wind
    const wndEl = $(
      `<div class="weather-box-wind">Wind: ${entry.wind.speed.toFixed()}mph, ${entry.wind.deg.toFixed()}°</div>`
    );
    box.append(wndEl);

    $('#site-weather-display').append(box);
  });
};

/**
 * @description Handle any failure in retrieving data from the OpenWeather external API.
 * @param {XMLHttpRequest} xhr XMLHTTPRequest object.
 * @param {string} status Status code of error.
 * @param {string} err Error message.
 */
export const handleSubmitError = (xhr, status, err) => {
  $('#site-weather-display').text(`Error in fetching weather data: "${err}"`);
};

/**
 * @description The logic which 'always' runs AFTER the form submit event is triggered.
 */
export const handleSubmitAlways = () => {
  // Refocus on input field
  $('#city-input').focus();

  // Make main display visible
  $('#site-weather-display').removeClass('hide');
};

// Initialise application
$(document).ready(function() {
  $(document).foundation();

  $('form').on('submit', handleSubmit);
});
