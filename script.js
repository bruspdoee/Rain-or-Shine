if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		var corsUrl = "https://cors-anywhere.herokuapp.com/"
		var apiKey = "16ed8c861f9ac550f753a3fd507835a8";
		var api = "https://api.darksky.net/forecast/";
		var url = corsUrl + api + apiKey + "/" + lat + "," + long  + "?daily";

		//make farenheit temperature default temperature upon page load

		var tempFahrenheit = true;

		//array to calculate each unit once and flip whenever user pleases
		var temperature = {
			fahrenheit: [],
			celsius:[]
		};

		function inputData(array){
			//assigns either F or C to temperature unit

			var tempUnit = tempFahrenheit ? "&deg;F" : "&deg;C";

			return $.each(array,function(index, value) {
				$('.temp' + index).html(value + tempUnit);
			});
		}

		$('.convertTemp').click(function() {
			tempFahrenheit =!tempFahrenheit;

			if (tempFahrenheit) {
				inputData(temperature.fahrenheit);
			} else {
				inputData(temperature.celsius);
			}
		});


		$.getJSON(url, function(json) {
			//shows the following weather info

			var fahrenheitTemp;
			var celsiusTemp;
			var tempData;
			var icon;
			var forecast;
			var day;
			var date;

			//loop through the array for the different days

			for (i = 0; i < json.daily.data.length; i++) {
				fahrenheitTemp = Math.round(json.daily.data[i].apparentTemperatureMax);
				celsiusTemp = Math.round((fahrenheitTemp - 32)/1.8);

				temperature.celsius.push(celsiusTemp);
				temperature.fahrenheit.push(fahrenheitTemp);

				//display appropriate icon upon load on page

				icon = json.daily.data[i].icon;
				$('.icon' + i).html("<i class='wi wi-forecast-io-" + icon + "'></i>");

				//display abrieved data and display on page

				forecast = json.daily.data[i].summary;
				$('.forecast' + i).html(forecast);

				//display day and date on page

				day = moment().add(i, "day").format("ddd");
				$('.day' + i).html(day);


				date = moment().add(i, "day").format("Do");
				$('.date' + i).html(date);
			} 

			//display temperature data on page
			inputData(temperature.fahrenheit);
	});

		//To get user's location using google maps API

		var googleMapsAPIKey = "AIzaSyCH2BPbBsLP25LfNlqo3C_Hp_QswPc1fsY";

		var googleMapsUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

		var userAddress = googleMapsUrl + lat + "," + long + "&key=" + googleMapsAPIKey;

		/*var searchUrl = */
		var location;

		$.getJSON(userAddress, function(json) {
			for (i = 0; i <json.results.length; i++) {
				location = json.results[1].formatted_address;
				$('.location').html(location);
			}
		});


		//display current time, date, month , year

		var dateTimeString = moment().format("LT");
		$('.time').html(dateTimeString);

		var date = moment().format("Do");
		$('.date').html(date);

		var month = moment().format("MMMM");
		$('.month').html(month);

		var year = moment().format("YYYY");
		$('.year').html(year);

	});
}

var queryURL = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/rest/events/search?app_key=zc9tCd5xHQ68P7wJ&where=40.7128,-74.0060&within=25&t=Today";

$.ajax({
	url: queryURL,
	method: "GET"
  }).then(function(response) {
	// console.log(response);
	
	var eventResult = $(response).find("event");
	// console.log(eventResult);

	for (var i = 0; i < eventResult.length; i++) {
		console.log(eventResult[i]);
		// console.log(eventResult[i].children[36].firstElementChild.innerHTML);
		console.log(i); 

		var display = $("#display"); 
		var eventDiv = document.createElement("div"); 
		var eventTitle = document.createElement("h1"); 
		var eventImage = document.createElement("img");
		var eventLocation = document.createElement("p"); 
		var eventTime = document.createElement("p"); 
		var eventLink = document.createElement("a");
		eventLink.href = eventResult[i].children[1].innerHTML;
		eventLink.target = "_blank"; 

		eventTitle.innerHTML = eventResult[i].children[0].innerHTML
		eventLink.innerHTML = eventResult[i].children[1].innerHTML
		eventLocation.innerHTML = eventResult[i].children[12].innerHTML
		eventTime.innerHTML = eventResult[i].children[3].innerHTML

		if(eventResult[i].children[36].firstElementChild){
			eventImage.src = eventResult[i].children[36].firstElementChild.innerHTML
		}
		else{
			eventImage.src = "https://pbs.twimg.com/media/DsVJ-3EU8AASNtg?format=jpg&name=medium"; 
		}

		eventImage.className = "eventImageThumb";

		display.append(eventDiv);
		display.append(eventTitle); 
		display.append(eventImage);
		display.append(eventLink); 
		display.append(eventLocation);
		display.append(eventTime); 

	}

	
});

