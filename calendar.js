$( document ).ready(function() { //initiated when the page is first loaded
	
	var date = new Date();
	var day_of_month = date.getDate();
	var modal = document.getElementById('dayModal');
	
	generateMonthView(date.getMonth(), date.getFullYear());
	
	month_view = [];
	
	
	$('.days').click(function(e){
		
		e.preventDefault();

		$('.days').css('color','white');
		$(this).css('color', 'black');

		modal.style.display = "block";
		
		var day = parseInt($(this).text());
		var month = date.getMonth();
		var year = date.getFullYear();
		
		setBrowserDate(day,month,year);
		getEvents(month,day);
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
	
	$('.monthHeader').text(getMonthFromNum(month) + " " + year);
	
	var display_dates = populateMonthArray(month, year)
	var table_id = "";
	var print_white = false;
	
	for(var i = 0; i < display_dates.length; i++ ){
		
		table_id = "#day_".concat(i);
		$(table_id).text(display_dates[i]);
		
		if(display_dates[i] == 1){
			
			print_white = !print_white;
		}
		
		
		if(print_white){
			$(table_id).css('color','white');
		}
		else {
			$(table_id).css('color','#C8C8C8');
		}
		
	}
	
	if( display_dates.length <= 35){
		
		$('#week_5').hide();
	}
	else {
		
		$('#week_5').show();
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
    
   	t.style.display = "table";
	moo.style.display = 'none';
	pmm.style.display = 'none';
	nmm.style.display = 'none';
	
	return;
}

function toggleMonthView(month) {
    
    var mo = document.getElementById('month_table');
    var nm =  document.getElementById('nextMonth');
	var pm =  document.getElementById('prevMonth');
	var y = document.getElementById('table');
    		
	mo.style.display = 'table';
	pm.style.display = 'inline';
	nm.style.display = 'inline';
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
//information for this funciton from http://www.w3schools.com/ajax/default.asp
function getEvents(month,day){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
     document.getElementById("viewEvent").innerHTML = this.responseText;
    	}
  };
  xmlhttp.open("GET", "getEvents.php?month="+month+"&day="+day, true);
  xhttp.send();
}

function postEvent(month,day,event){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    	}
 	 };
 	xmlhttp.open("GET", "postEvent.php?month="+month+"&day="+day+"&event="+event, true);
  	xmlhttp.send();
}

function populateMonthArray(month, year){
	
	var dummy_date = new Date(year, month, 1, 0, 0, 0, 0);
	var first_day_of_week = dummy_date.getDay();
	var last_index = first_day_of_week + getDaysFromMonthNum(month);
	
	var array = [];

	var num = 1;
	for(var i=first_day_of_week;i< last_index; i++){
		
		array.push(num);
		num++
	} 
	
	num = getDaysFromMonthNum(dummy_date.getMonth()-1);
	for(var i=first_day_of_week-1; i>=0 ;i--) {
		
		array.unshift(num);
		num--;
	}
	console.log(array.length);
	num = 1;
	if(array.length >= 36){
		
		for(var i = last_index + 1; i <= 45; i++ ){
			
			array.push(num);
			num++;
		}
	}
	else {
		
		for(var i = last_index + 1; i <= 35; i++){
			
			array.push(num);
			num++;
		}
	}
	
	for(var i = 0; i<array.length;i++){
		
		console.log(array[i]);
	}
	return array;
}