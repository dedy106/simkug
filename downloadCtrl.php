<html>
	<head>
		<style>			
		</style>
    	<script>        		 
    		 function bodyOnLoad(e){
				 window.parent.hideStatus();
			 }   
			 function submitted(e){
				 window.parent.hideStatus();
			 }   
    	</script>
    </head>
	<body  style="" bgcolor='#ff9900' leftmargin="0" rightmargin="0" topmargin="0" bottommargin="0">
		<iframe id='target' name='target' style='width:1;left:1;height:1;' onload='bodyOnLoad(event)'></iframe>
	    <form name="downloader" action="server/serverApp.php" method="POST" target='target' onsubmit='submitted(event)'>
			<input type="hidden" id="request" name="request" value=""/>		
			<input type="hidden" id="status" name="status" value="file"/>					
		</form>		
	</body>
</html>


