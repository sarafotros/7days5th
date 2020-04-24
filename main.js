window.addEventListener('load', () => {
	let long;
	let lat;
	let tempDescription = document.querySelector('.temp-description');
	let tempDegree = document.querySelector('.temp-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let locationZone = document.querySelector('.location-zone');
    let degreeSection = document.querySelector('.temp-degree');
    let degreeSpan = document.querySelector('span');
    let azanSobh = document.querySelector('.sobh')
  

	const APIkey = '1b8542c358264e639e6140721202404';
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=1b8542c358264e639e6140721202404&q=${lat},${long}`;
			const apiForcast = `${proxy}http://api.weatherapi.com/v1/forecast.json?key=1b8542c358264e639e6140721202404&days=8&q=${lat},${long}`;
			fetch(apiForcast)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					console.log(data.forecast.forecastday[0].astro.sunrise);
					const { temp_c, condition, temp_f } = data.current;
					let icon = condition.text;
                    tempDegree.textContent = temp_c;
					tempDescription.textContent = icon;
					locationTimezone.textContent = data.location.region.split(',')[1];
                    locationZone.textContent = data.location.name;
                    azanSobh.textContent = data.forecast.forecastday[0].astro.sunrise;
                    setIcon(icon, document.querySelector('.icon'));
                    
                    degreeSection.addEventListener('click', () => {   
                        if (degreeSpan.textContent === 'C') {
                            degreeSpan.textContent = 'F';
                            tempDegree.textContent = temp_f;
                        } else {
                            degreeSpan.textContent = 'C';
                            tempDegree.textContent = temp_c;
                        }
                    })
				});
		});
	} else {
		h3.textContent = 'The browser needs to access to your location';
	}

	function setIcon(icon, iconId) {
		const skycons = new Skycons({'color': 'black'});
        // const currentIcon = icon.split(' ').join('_').toUpperCase();
        let currentIcon = icon.replace(/\s/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconId, Skycons[currentIcon]);
	}
});

// {location: {…}, current: {…}}
// current:
// cloud: 0
// condition:
// code: 1000
// icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
// text: "Sunny"
// __proto__: Object
// feelslike_c: 23.5
// feelslike_f: 74.4
// gust_kph: 8.6
// gust_mph: 5.4
// humidity: 33
// is_day: 1
// last_updated: "2020-04-24 16:30"
// last_updated_epoch: 1587742212
// precip_in: 0
// precip_mm: 0
// pressure_in: 30.4
// pressure_mb: 1014
// temp_c: 22
// temp_f: 71.6
// uv: 6
// vis_km: 10
// vis_miles: 6
// wind_degree: 90
// wind_dir: "E"
// wind_kph: 6.8
// wind_mph: 4.3
// __proto__: Object
// location:
// country: "United Kingdom"
// lat: 51.55
// localtime: "2020-04-24 16:40"
// localtime_epoch: 1587742824
// lon: 0.06
// name: "Manor Park"
// region: "Newham, Greater London"
// tz_id: "Europe/London"
// __proto__: Object
// __proto__: Object
