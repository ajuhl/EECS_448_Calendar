$( document ).ready(function() { //initiated when the page is first loaded
	
	 $('.days').click(function(e){
        e.preventDefault();
		
		$('.days').css('color','white');
		$(this).css('color', 'black');
			
			
      });
	
});