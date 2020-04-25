window.addEventListener('load', () => {
	let long;
    let lat;
    
    let now  = new Date();
    var hour = now.getHours()
    // var hour = 11

	let tempDescription = document.querySelector('.temp-description');
	let tempDegree = document.querySelector('.temp-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let locationZone = document.querySelector('.location-zone');
    let degreeSection = document.querySelector('.temp-degree');
    let degreeSpan = document.querySelector('span');
    let azanSobh = document.querySelector('.sobh')
    let azanMaghreb = document.querySelector('.maghreb');
    

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
					console.log(data.location.localtime);
					console.log();
					const { temp_c, condition, temp_f } = data.current;
					let icon = condition.text;
                    tempDegree.textContent = temp_c;
					tempDescription.textContent = icon;
					locationTimezone.textContent = data.location.region.split(',')[1];
                    locationZone.textContent = data.location.name;
                    azanSobh.textContent = data.forecast.forecastday[0].astro.sunrise;
                    azanMaghreb.textContent = data.forecast.forecastday[0].astro.sunset;

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
		const skycons = new Skycons({'color': 'royalblue'});
        // const currentIcon = icon.split(' ').join('_').toUpperCase();
        // let currentIcon = icon.replace(/\s/g, '_').toUpperCase();
        if (hour<= 6 || hour >= 19) {
            currentIcon = "CLEAR_NIGHT"
            console.log(hour);
            
        } else {
            currentIcon = "CLEAR_DAY"
        }
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
// 

