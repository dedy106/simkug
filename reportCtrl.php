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
	    <form name="reporter" action="server/simpleServer.php" method="POST" target='target' onsubmit='submitted(event);'>
			<input type="hidden" id="object" name="object" value=""/>			
			<input type="hidden" id="method" name="method" value=""/>			
			<input type="hidden" id="param" name="param" value=""/>			
			<input type="hidden" id="session" name="session" value=""/>			
			<input type="hidden" id="addparam" name="addparam" value=""/>			
		</form>		
	</body>
</html>


