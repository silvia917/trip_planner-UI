var deleteButton = '<button class="btn btn-xs btn-danger remove btn-circle ">x</button>'

var stuff = '<div class="panel-body itinerary"><div class="Hotels"><h4>My Hotel</h4><ul class="list-group"><div class="itinerary-item"> </div></ul></div><div class="Restaurants"><h4>My Restaurants</h4><ul class="list-group"><div class="itinerary-item"></div></ul></div><div class="Activities"><h4>My Activities</h4><ul class="list-group"><div class="itinerary-item"></div></ul></div></div>'

$(document).ready(function(){
	var markers = {};
	var days = {};
	
	$(".choices").on('click','button',function(){
	
       var choice = $(this).prev().val();
       var  finder = $(this).prev().prev().text();

       var lengthChecker = $("." + finder+" ul span");

       function getLoc(name, arr){
       	return arr.filter(function(i){
			  return i.name === choice;
			})[0].place[0].location;
       }

       if(finder == "Hotels" && !lengthChecker.length){
   	     $("." + finder+" ul  ").append("<span class='title'>"+choice+"</span>").append(deleteButton);

   	     
   	     var location = getLoc(finder, all_hotels);   	    
   	     var myLatlng = new google.maps.LatLng(location[0],location[1]);

		var marker = drawLocation(location, {
      	   icon: '/images/lodging_0star.png'
      	 });
         map.setCenter(myLatlng);
         markers[choice] = marker;
       }


       else if(finder =="Restaurants" && lengthChecker.length <3 && !markers[choice]){
       		console.log("choice", choice);
       		console.log("markers[choice]", markers[choice])
	        $("." + finder+" ul").append("<span class='title'>"+choice+"</span>").append(deleteButton+'<br/>');

	        var location = getLoc(finder, all_restaurants);   	    
	   	    var myLatlng = new google.maps.LatLng(location[0],location[1]);

			var marker = drawLocation(location, {
	          icon: '/images/restaurant.png'
	      	 });
	         map.setCenter(myLatlng);
	         markers[choice] = marker;
	         console.log("on add", markers);


       }
       else if(finder =="Activities" && !markers[choice]){
        $("." + finder+" ul").append("<span class='title'>"+choice+"</span>").append(deleteButton+'</br>');


        var location = getLoc(finder, all_activities);   	    
   	    var myLatlng = new google.maps.LatLng(location[0],location[1]);

		var marker = drawLocation(location, {
          icon: '/images/star-3.png'
      	 });
         map.setCenter(myLatlng);
         markers[choice] = marker;
        }
	});

	$(".itinerary").on("click", "button", function(){
		// console.log("IS THIS GETTING CALLED??")
		// console.log($(this).prev().text());
		var choice = $(this).prev().text();
		console.log("delete choice", choice);
		console.log("on delete", markers);

		markers[choice].setMap(null);
		delete markers[choice];

		$(this).prev().remove();
		$(this).next().remove();
		// $(this).parent().remove("br");
		$(this).remove();
	})

	$("#day-adder").on("click", function(){
		// console.log($(this).parent().clone());
		var buttonString = '<button class="btn btn-circle day-btn">'
		var sibLength = $(this).siblings().length+1;
		$(this).before(buttonString+sibLength+"</button>");
	})

	$(".day-buttons").on("click", "button", function(){
		var newStuff = stuff;
		if (this.id !== "day-adder"){
			var old = $("#day-title span").text();
			days[old] = $(".itinerary").clone();

			var newDay = "Day "+$(this).text();
			$('#day-title span').text(newDay);

			if (days[newDay]) {
				newStuff = days[newDay];
			}

			$('.cloner').html(newStuff)

			$('.current-day').removeClass('current-day');
			$(this).addClass('current-day')

			console.log($('.title'));


			// store current text as key in days with value clone()
			// update day title
			// get stuff from days with that title and put into DOM <--- hardest part

		}
	})

})

// when you click another day
// store a .clone()-d version of the current day in an overall object
// load from new day stuff


// Remove a day
// Switch days
