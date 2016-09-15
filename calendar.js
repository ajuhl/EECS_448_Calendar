$( document ).ready(function() { //initiated when the page is first loaded
	
	var date = new Date();
	var day_of_month = date.getDate();
	var modal = document.getElementById('dayModal');
	
	generateMonthView(date.getMonth(), date.getFullYear());
	
	var month_view = [];
	
	$('.days').click(function(e){
		
		e.preventDefault();
		
		var found_string = $(this).attr('id');
		var selected_index = parseInt( found_string.slice("day_".length , found_string.length) );
		var selected_number = parseInt($(this).text());
		
		if (Math.abs(selected_index - selected_number) < 7) {
			
			generateMonthView(date.getMonth(), date.getFullYear());
		
			$(this).css('color', 'black');

			modal.style.display = "block";
			
			var day = parseInt($(this).text());
			var month = date.getMonth();
			var year = date.getFullYear();
			
			setBrowserDate(day,month,year);
			getEvents(month,day);
			//fill the values for creating a new event on this day
			document.getElementById("event_input").value="";
			document.getElementById("month_input").value = month;
			document.getElementById("day_input").value = day;
		}
		
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
	
	month_view = populateMonthArray(month, year)
	var table_id = "";
	var print_white = false;
	
	for(var i = 0; i < month_view.length; i++ ){
		
		table_id = "#day_".concat(i);
		$(table_id).text(month_view[i]);
		
		if(month_view[i] == 1){
			
			print_white = !print_white;
		}
		
		
		if(print_white){
			$(table_id).css('color','white');
		}
		else {
			$(table_id).css('color','#C8C8C8');
		}
		
	}
	
	if( month_view.length <= 35){
		
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

function toggleYearView(a, b, c, d, e, f, g, h, i, j) {
    
    
    var nmm =  document.getElementById('nextMonth');
	var pmm =  document.getElementById('prevMonth'); 
	var moo = document.getElementById('month_table');
	var au =  document.getElementById('august');
	var sep =  document.getElementById('september');
	var oc =  document.getElementById('october');
	var no =  document.getElementById('november');
	var de =  document.getElementById('december');
	var ja =  document.getElementById('january');
	var fe =  document.getElementById('february');
	var mar =  document.getElementById('march');
	var ap =  document.getElementById('april');
	var ma =  document.getElementById('may');
    		
    

	moo.style.display = 'none';
	pmm.style.display = 'none';
	nmm.style.display = 'none';
	au.style.display = 'table';
	sep.style.display = 'table';
	oc.style.display = 'table';
	no.style.display = 'table';
	de.style.display = 'table';
	ja.style.display = 'table';
	fe.style.display = 'table';
	mar.style.display = 'table';
	ap.style.display = 'table';
	ma.style.display = 'table';
	
	return;
}

function toggleMonthView(month) {
    
    var mo = document.getElementById('month_table');
    var nm =  document.getElementById('nextMonth');
	var pm =  document.getElementById('prevMonth');
	var aug =  document.getElementById('august');
	var sep =  document.getElementById('september');
	var oct =  document.getElementById('october');
	var nov =  document.getElementById('november');
	var dec =  document.getElementById('december');
	var jan =  document.getElementById('january');
	var feb =  document.getElementById('february');
	var mar =  document.getElementById('march');
	var apr =  document.getElementById('april');
	var may =  document.getElementById('may');
    		
	mo.style.display = 'table';
	pm.style.display = 'inline';
	nm.style.display = 'inline';
	aug.style.display = 'none';
	sep.style.display = 'none';
	oct.style.display = 'none';
	nov.style.display = 'none';
	dec.style.display = 'none';
	jan.style.display = 'none';
	feb.style.display = 'none';
	mar.style.display = 'none';
	apr.style.display = 'none';
	may.style.display = 'none';
	
	      
    return;
}

//Information on browser storage was found here: http://www.w3schools.com/html/html5_webstorage.asp
function setBrowserDate(day,month,year){
	
	if (typeof(Storage) !== "undefined") {
		
		localStorage.setItem("day", day);
		localStorage.setItem("month", month);
		localStorage.setItem("year", year);
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
  xmlhttp.send();
}

function postEvent(month,day,event){
	var xmlhttp = new XMLHttpRequest();
	// xmlhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
 //     document.getElementById("demo").innerHTML = this.responseText;
 //    	}
 // 	 };
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
		num++;
	} 
	
	num = getDaysFromMonthNum(dummy_date.getMonth()-1);
	for(var i=first_day_of_week-1; i>=0 ;i--) {
		
		array.unshift(num);
		num--;
	}
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
	return array;
}

function LoadMonth(id, month,year) {
	
	var d = new Date(year, month, 0);  // Set to the first day of the month (month is internally stored as 0-11)

	var daysInMonth = GetDaysInMonth(d);  // Get the number of days in the month
	var mon = d.getMonth();
	var htmlContent = "";
	
	// Define table

    htmlContent += "<table width = '25%' height='25%' align='center' id='table' style='display:none'>";
	
	// Display Month, Year

	htmlContent += "<th class='yearView' colspan='7' >" + GetMonthName(d) + " " + year + "</th>";
	
	// Build Header
	
	htmlContent += "<tr>";
	htmlContent += "<td class = 'yearViewWeekday'>Sun</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Mon</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Tue</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Wed</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Thu</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Fri</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Sat</td>";
	htmlContent += "</tr>";
		
	// Build Detail

	htmlContent += "<tr class='yearViewweek'>";
	
	d.setDate(1);
	
	for (var i = 0; i < d.getDay(); i++) {  // Starting day of the week for the 1st of the month - Sunday = 0 ... Saturday = 6
		htmlContent += "<td class='yearViewdays'></td>";
	}
	
	// Load actual days of the month

	while(d.getMonth() == mon) {
		htmlContent += "<td class='yearViewdays'>" + d.getDate() + "</td>";

		if (d.getDay() % 7 == 6) {
			htmlContent += "</tr><tr class='yearViewweek'>";
		};
 
		d.setDate(d.getDate()+1);
	};
	
	if (d.getDay() != 0) {
		for (var i = d.getDay(); i < 14; i++) {
			htmlContent += "<td class='yearViewdays'></td>";
			
			if (d.getDay() % 7 == 6) {
				htmlContent += "</tr class='yearViewweek'><tr>";
			};
 
			d.setDate(d.getDate()+1);	
		};
	};
	
	htmlContent += "</tr>";
	
	htmlContent += "</table>";
	
	document.getElementById(id).innerHTML = htmlContent;
}

function GetDaysInMonth(d) {
	if (d.getFullYear() % 4 == 0) {
		var daysInMonth = [31,29,31,30,31,30,31,31,30,31,31,31];
	} else {
		var daysInMonth = [31,28,31,30,31,30,31,31,30,31,31,31];
	};
	
	return daysInMonth[d.getMonth()];
}

function GetMonthName(d){
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return monthNames[d.getMonth()];
}
