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
		$('.days').css('color','white');
			
	});
	
	$('.buttonPreviousMonth').click(function(e){
		
		e.preventDefault();

		date.setMonth(date.getMonth()-1);
		generateMonthView(date.getMonth(), date.getFullYear());
		$('.days').css('color','white');
			
	});
	  
	
});

function generateMonthView(month, year){
	
	var dummy_date = new Date(year, month, 1, 0, 0, 0, 0);
	var first_day_of_week = dummy_date.getDay();
	
	$('.monthHeader').text(getMonthFromNum(dummy_date.getMonth()) + " " + dummy_date.getFullYear());
	
	for(i=0;i<=41;i++){
		
		var table_id = "#day_".concat(i);
		
		$(table_id).text("");
		number++;
	}
	
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

function toggleYearView(year) {
    
    var t = document.getElementById('table');
    var nmm =  document.getElementById('nextMonth');
	var pmm =  document.getElementById('prevMonth'); 
	var moo = document.getElementById('month_table');
    
   	t.style.display = "block";
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
    		
	mo.style.display = 'block';
	pm.style.display = 'inline';
	nm.style.display = 'inline';
	y.style.display = "none";
	      
    return;
}

function getEvents(month,day){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    	}
  };
  xhttp.open("GET", "getEvents.php?month="+month+"&day="+day, true);
  xhttp.send();
}