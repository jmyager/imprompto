// General Variables
var radius = "";
var catID = "";

// Google Map Variables
var venue;
var map;
var myLatLng;
var venueLat;
var venueLong;
var marker;

// -------- Input Category Variables -----------

//all food is random
var random = "4d4b7105d754a06374d81259";

//any ethnic  
var ethnic = ["503288ae91d4c4b30a586d67", "4bf58dd8d48988d1c8941735", "4bf58dd8d48988d142941735", "4bf58dd8d48988d169941735", "52e81612bcbc57f1066b7a01", "52e81612bcbc57f1066b7a02", "4bf58dd8d48988d17a941735", "4bf58dd8d48988d144941735", "52e81612bcbc57f1066b79f2", "52f2ae52bcbc57f1066b8b81", "5744ccdfe4b0c0459246b4d0", "4bf58dd8d48988d109941735", "4bf58dd8d48988d10b941735", "4bf58dd8d48988d10c941735", "4bf58dd8d48988d10d941735", "4bf58dd8d48988d10e941735", "52e81612bcbc57f1066b79ff", "52e81612bcbc57f1066b79fe", "52e81612bcbc57f1066b79fa", "4bf58dd8d48988d10f941735", "52e81612bcbc57f1066b7a06", "4bf58dd8d48988d110941735", "52e81612bcbc57f1066b79fd", "5283c7b4e4b094cb91ec88d7", "4bf58dd8d48988d1be941735", "4bf58dd8d48988d1c0941735", "4bf58dd8d48988d1c1941735", "4bf58dd8d48988d115941735", "52e81612bcbc57f1066b79f9", "52e81612bcbc57f1066b79f8", "52e81612bcbc57f1066b7a04", "4def73e84765ae376e57713a", "5293a7563cf9994f4e043a44", "4bf58dd8d48988d1ce941735", "4bf58dd8d48988d150941735", "4f04af1f2fb6e1c99f3db0bb", "52e928d0bcbc57f1066b7e96"];

//american, BBQ, burgers, cafeteria etc... anything that sounded american. 
var american = ["4bf58dd8d48988d14e941735", "4bf58dd8d48988d1df931735", "4bf58dd8d48988d16c941735", "4bf58dd8d48988d128941735", "52e81612bcbc57f1066b7a00", "4bf58dd8d48988d146941735", "4bf58dd8d48988d147941735", "4edd64a0c7ddd24ca188df1a", "52e81612bcbc57f1066b7a09", "4d4ae6fc7a7b7dea34424761", "4bf58dd8d48988d16f941735", "4bf58dd8d48988d1bf941735", "4bf58dd8d48988d1cc941735"];

//breakfast is bagel shop, bakery, breakfast spot, cafe, donut and juice bar category
var breakfast = ["4bf58dd8d48988d179941735", "4bf58dd8d48988d16a941735", "4bf58dd8d48988d143941735", "4bf58dd8d48988d16d941735", "4bf58dd8d48988d148941735", "4bf58dd8d48988d112941735", "4bf58dd8d48988d1dc931735"];

//cafe/coffee/tea shop category
var coffee = ["4bf58dd8d48988d1e0931735", "52e81612bcbc57f1066b7a0c", "4bf58dd8d48988d16d941735"];

//dessert and snack category 
var dessert = ["4bf58dd8d48988d1d0941735", "4bf58dd8d48988d1c7941735"];

//fast food category 
var fastfood = ["4bf58dd8d48988d16e941735", "4bf58dd8d48988d120951735", "56aa371be4b08b9a8d57350b", "57558b36e4b065ecebd306dd", "4bf58dd8d48988d14c941735"];

//food truck 
var foodtruck = "4bf58dd8d48988d1cb941735";

//any restaurant
var restaurant = "4bf58dd8d48988d1c4941735";

//pizza
var pizza = "4bf58dd8d48988d1ca941735";

//vegetarian/vegan
var veg = "4bf58dd8d48988d1d3941735";

var venueLat;
var venueLong;
var venue;
var map;
var myLatLng;

// Define function to initialize Google Map
function initMap() {
    myLatLng = { lat: -25.363, lng: 131.044 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
    });
}

// Define function to center map and drop marker
function newLocation(newLat, newLng) {
    map.setCenter({
        lat: newLat,
        lng: newLng
    });
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: myLatLng,
        map: map,
        title: venue
    });
}


// On page load
$(document).ready(function () {
    // Hide results pages
    $("#main").hide();
    $("#results").hide();
    //Drop Down menu
    $('.right.menu.open').on("click", function (e) {
        e.preventDefault();
        $('.ui.vertical.menu').toggle();
    });

    $('.ui.dropdown').dropdown();
    //Smooth scrolling
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });


    function GetZipLocation() {
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById("zip-input").value;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                lat = results[0].geometry.location.lat();
                console.log("the lat is: " + lat);
                long = results[0].geometry.location.lng();
                console.log("the long is: " + long);
            } else {
            }
            getFoursquare();
            console.log("the latitude is: " + lat);
            console.log("the longitude is: " + long);
        });
    };


    //grab user data        
    $(document).on("click", "#search", function () {
        var zip = $("#zip-input").val();
        if (zip === "") {
            geoFindMe();
        }
        else {
            GetZipLocation();
        }
        var categories = $('#dropdown1 .selected').data('value');
        radius = $('#dropdown2 .selected').data('value')
        catID = window[categories];
    });


    // -------- Main App Javascript ---------------------------------

    // Define variables
    var lat = "";
    var long = "";
    var client_id = 'YX5I20UKAX5YF2SNJPAZR4UF5PCJRXOVHA1LISKDAPOBY1Z0';
    var client_secret = 'IB4QV2JZNIQ5VFMMZWOUOD5BCJIUEOTGL2AD0G5GD4HYIDUP';


    // Define function to make Foursquare AJAX call
    function getFoursquare() {
        var url =
            "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&client_secret=" + client_secret + "&ll=" + lat + "%2C%20" + long + "&categoryId=" + catID + "&radius=" + radius + "&v=20180323";
        // Ajax Call
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                console.log(j);
                // Pull a random Number to choose random venue
                var j = Math.floor((Math.random() * 10) + 1);
                var venues = data.response.venues;
                // Check to see if menu url is available before displaying
                if (venues.hasOwnProperty('menu')){
                    var menu = "<a href=${venues[j].menu.url} target='_blank'>View Menu</a>";
                    }
                else {
                    menu = "<p>No menu available</p>";
                }
                // Empty the results container
                $(".results-name").empty();
                // Input our new venue properties into the results container
                $(".results-name").html(
                    `
                    <section id="random">
                    <h1>${venues[j].name}</h1>
                    <hr />
                    <p>${venues[j].location.address}</p>
                    <p>${venues[j].location.city}, ${venues[j].location.postalCode}</p>
                    <p>${venues[j].contact.formattedPhone}</p>
                    ${menu}
                    </section>
                    
                    `
                )
                // Clear any markers currently in the Google Map
                function clearMarkers() {
                    setMapOnAll(null);
                }
                // Pull lat/lng from new venue and plug it into
                venueLat = (venues[j].location.lat);
                venueLong = (venues[j].location.lng);
                myLatLng = { lat: venueLat, lng: venueLong };
                venue = venues[j].name;
                // Run function to drop marker
                newLocation(venueLat, venueLong);
            }
        });
    };


    // Ask user for location
    const geoFindMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, geoOptions);
        } else {
            console.log("Geolocation services are not supported by your web browser.");
        }
    }

    // If able to get location, find current position
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const altitude = position.coords.altitude;
        const accuracy = position.coords.accuracy;
        lat = position.coords.latitude;
        long = position.coords.longitude;


        // Run the Foursquare API call
        getFoursquare();
    }

    // If not able to get location, alert user of the issu
    const error = (error) => {
        alert(`Unable to retrieve your location due to ${error.code}: ${error.message}`);
    }

    // Settings for location finding
    const geoOptions = {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 50000
    };

    // When "get started" is clicked, show the main input content
    $("#firstbutton").on("click", function () {
        $("#main").show();
    });

    // When "search" is clicked, show the results content
    $("#search").on("click", function () {
        $("#results").show();
    })

    // Easter Egg: when escape is clicked, rolling ensues
    var egg = new Egg();
    egg
    .addCode("esc", function() {
        jQuery('#egggif').fadeIn(500, function() {
        window.setTimeout(function() { jQuery('#egggif').hide(); }, 5000);
        }, "escape");
    })
    .addHook(function(){
        window.open("https://www.youtube.com/embed/DLzxrzFCyOs?rel=0&autoplay=1","_self")        
    })
    .listen();

});







