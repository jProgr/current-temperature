function k_converter(kelvin, unit)
{
    if (unit) { return (kelvin - 273.15) | 0; }
    else { return ((kelvin * 9 / 5) - 459.67) | 0; }
    return 0;   
}

function update_degrees()
{
    console.log("Degree updating");
    is_unit_C = !is_unit_C;
    $("#n_degree").html(k_converter(temp, is_unit_C) + "");
    $(".units").html(is_unit_C ? "C" : "F");
}

function icon_setter()
{}

var lat = 0.0;
var lon = 0.0;
var temp, place, country;
var is_unit_C = true;
var api_call = "http://api.openweathermap.org/data/2.5/weather?APPID=2262e65ffc52c8e8bd4f66d21e93b313";

// Gets location and makes API call
if (navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition((position) =>
    {
        lat = position.coords.latitude; lon = position.coords.longitude;
        
        // API call
        api_call += "&lat=" + lat + "&lon=" + lon;
        $.getJSON(api_call, (weather_data) =>
        {
            country = weather_data.sys.country;
            place = weather_data.name;
            temp = weather_data.main.temp;
         
            $(document).ready(() =>
            {
                update_degrees();
                $(".location").html(place + ", " + country);
                // image
            });
        });
    });
}
else { alert("Geolocation not supported"); }

// On button press
$(document).ready(() => { $(".units").on("click", update_degrees); });
