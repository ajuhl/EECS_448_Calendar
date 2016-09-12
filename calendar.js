$( document ).ready(function() { //initiated when the page is first loaded
	
	var date = new Date();
	var day_of_month = date.getDate();
	
	generateMonthView(date.getMonth(), date.getFullYear());
	
	 $('.days').click(function(e){
        e.preventDefault();
		
		$('.days').css('color','white');
		$(this).css('color', 'black');
			
			
      });
	  
	  $('#button_year').click(function(e){
        e.preventDefault();
		
		window.location.href = "YearView.html";
			
			
      });
	  
	
});

function generateMonthView(month, year){
	
	var dummy_date = new Date(year, month, 1, 0, 0, 0, 0);
	var first_day_of_week = dummy_date.getDay();
	
	$('.monthHeader').text(getMonthFromNum(dummy_date.getMonth()));
	
	var number = 1;
	for(i=first_day_of_week;i< (first_day_of_week + getDaysFromMonthNum(dummy_date.getMonth())); i++){
		
		var table_id = "#day_".concat(i);
		
		$(table_id).text(number);
		number++;
	} 

}

function getDayFromNum(num){
	
	return ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday'][num];
}

function getMonthFromNum(num){
	
	return ['January','February','March','April','May','June','July','August','September','October','November','December'][num];
}

function getDaysFromMonthNum(num){
	
	return [31,28,31,30,31,30,31,31,30,31,30,31][num];
}