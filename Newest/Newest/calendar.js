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


function toggleYearView(year) {
    
    var t = document.getElementById('table');
    var nmm =  document.getElementById('nextMonth');
	var pmm =  document.getElementById('prevMonth'); 
	var moo = document.getElementById('a');
    
   
		
		t.style.display = "block";
		
		moo.style.display = 'none'
		pmm.style.display = 'none'
		nmm.style.display = 'none'
	
	
	
      
    return;
}

function toggleMonthView(month) {
    
    var mo = document.getElementById('a');
    var nm =  document.getElementById('nextMonth');
	var pm =  document.getElementById('prevMonth');
	var y = document.getElementById('table');
    
   
		
		mo.style.display = 'block';
		pm.style.display = 'inline'
		nm.style.display = 'inline'
		y.style.display = "none";
	
	
	
      
    return;
}

