$( document ).ready(function() { //initiated when the page is first loaded
	
	var date = new Date();
	var day_of_month = date.getDate();
	var modal = document.getElementById('dayModal');
	
	generateMonthView(date.getMonth(), date.getFullYear());
	
	$('.days').click(function(e){
		
		e.preventDefault();

		$('.days').css('color','white');
		$(this).css('color', 'black');

		modal.style.display = "block";
		
		var day = parseInt($(this).text());
		var month = date.getMonth();
		var year = date.getFullYear();
		
		setBrowserDate(day,month,year);
		
		
	});
	  
	$('.close').click(function(e){
		
		e.preventDefault();

		modal.style.display = "none";
			
	});
	  
	$('#button_year').click(function(e){
        
		e.preventDefault();
		
		window.location.href = "YearView.html";
			
			
    });
	
	$('.buttonNextMonth').click(function(e){
		
		e.preventDefault();

		date.setMonth(date.getMonth()+1);
		generateMonthView(date.getMonth(), date.getFullYear());
			
	});
	
	$('.buttonPreviousMonth').click(function(e){
		
		e.preventDefault();

		date.setMonth(date.getMonth()-1);
		generateMonthView(date.getMonth(), date.getFullYear());
			
	});
	  
	
});

function generateMonthView(month, year){
	
	var dummy_date = new Date(year, month, 1, 0, 0, 0, 0);
	var first_day_of_week = dummy_date.getDay();
	
	$('.monthHeader').text(getMonthFromNum(dummy_date.getMonth()) + " " + dummy_date.getFullYear());
	
	for(i=0;i<=41;i++){
		
		var table_id = "#day_".concat(i);
		
		$(table_id).text("");
		$(table_id).css('color','white');
		number++;
	}
	
	var number = 1;
	last_index = first_day_of_week + getDaysFromMonthNum(dummy_date.getMonth());
	var table_id = "";
	
	for(i=first_day_of_week;i< last_index; i++){
		
		table_id = "#day_".concat(i);
		
		$(table_id).text(number);
		number++;
	} 
	
	if (last_index < 36) {
		
		$('#week_5').hide();
	}
	else {
		$('#week_5').show();
	}
	
	previous_month = dummy_date.getMonth()-1;
	if(previous_month < 0){previous_month = 11;}
	number = getDaysFromMonthNum(previous_month);
	
	
	for(i=first_day_of_week-1;i>=0;i--) {
		
		table_id = "#day_".concat(i);
		$(table_id).text(number);
		$(table_id).css('color','#C8C8C8');
		number--;
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

function getNumFromMonth(month){
	
	return ['January','February','March','April','May','June','July','August','September','October','November','December'].indexOf(month);
}

function toggleYearView(year) {
    
    var t = document.getElementById('table');
    var nmm =  document.getElementById('nextMonth');
	var pmm =  document.getElementById('prevMonth'); 
	var moo = document.getElementById('month_table');
    
   	t.style.display = "block";
	moo.style.display = 'none'
	pmm.style.display = 'none'
	nmm.style.display = 'none'
	
	return;
}

function toggleMonthView(month) {
    
    var mo = document.getElementById('month_table');
    var nm =  document.getElementById('nextMonth');
	var pm =  document.getElementById('prevMonth');
	var y = document.getElementById('table');
    		
	mo.style.display = 'block';
	pm.style.display = 'inline'
	nm.style.display = 'inline'
	y.style.display = "none";
	      
    return;
}

//Information on browser storage was found here: http://www.w3schools.com/html/html5_webstorage.asp
function setBrowserDate(day,month,year){
	
	if (typeof(Storage) !== "undefined") {
		
		localStorage.setItem("day", day.toString());
		localStorage.setItem("month", month.toString());
		localStorage.setItem("year", year.toString());
	} 
	else {
		
		//if no browser storage do something
	}
}
function getBrowserDate(day,month,year){
	
	
	if (typeof(Storage) !== "undefined") {

		var day = localStorage.getItem("day", day);
		var month = localStorage.getItem("month", month);
		var year = localStorage.getItem("year", year);
		
		var date = new Date(year, month, day, 0, 0, 0, 0);
		
		return date;
	} 
	else {

		//if no browser storage do something
	}
}