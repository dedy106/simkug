<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>e-saku</title>
</head>
<style>
	span.roojaxscript {font-size:12;font-family:courier}
	font.string {color:#8ad0d3}
	font.javascript {color:#0000ff}
</style>
<body width=950>
	<div style='display:block;font-size:20px;top:10px;left:20;width:900;height:100x;background:#d2e6f7;text-align:center;border:1px solid #999999' align='center'>
		<table width="300pt"><tr><td width="100pt"><img src='../image/jamboologo.png' /></td><td width="200pt" style='font-size:50px;font-family:arial'><span style="font-size:11;text-weight:bold;font-style:italic">Dokumentasi</span></br> roo<font color='#ff9900'>J</font>ax</td></tr></table>
	</div>
	<div style='display:block;width:900;height:auto;border:1px solid #999999;background:#ebf8ff' >
	<p >
		roojaxAPI adalah framework untuk ajax agar memudahkan programmer untuk membangun web secara dinamis dan tanpa harus memikirkan server script. 
		roojaxAPI dibangun menggunakan javascript dan server script menggunakan PHP. Sehigga semua perintah di roojax adalah javascript. 
		Semua server script sudah di-embed di system dan programmer tidak harus memikirkan server script lagi. 
		Seperti perintah untuk mengakses databases dan file. Semua dikontrol dari javascript. contoh,<br><br>
		<span class='roojaxscript' ><font class='javascript' >var</font> data = <font class='javascript' >this</font>.dbLib.getDataProvider("<font class='string' >select kode, nama from pegawai</font>");</span><br><br>
		variable data akan berisi {kode:xxxx, nama:yyyyyyyy}.</br>
		<span class='roojaxscript' ><font class='javascript' >var</font> files = <font class='javascript' >this</font>.fileLib.listDir("<font class='string' >document</font>");</span><br><br>
		variable files akan berisi file dari folder "document".
		
	</p>
	<p>
		Pemrograman dengan menggunakan roojaxAPI lebih mudah daripada membangun web biasa. Apalagi bagi programmer yang biasa menggunakan tools seperti delphi, jBuilder, visual studio, eclipse.
		Karena semua perintah di roojaxAPI dipermudah mirip perintah yang ada di delphi atau eclipse. Contoh perintah untuk membuat objek edit,<br><br>
		<span class='roojaxscript'><font class='javascript' >this</font>.eUID = <font class='javascript' >new</font> portalui_saiLabelEdit(<font class='javascript' >this</font>,{bound:[10,20,400,20],caption:"<font class='string' >User Name</font>"});</span><br>		
		<span class='roojaxscript'><font class='javascript' >this</font>.ePWD = <font class='javascript' >new</font> portalui_saiLabelEdit(<font class='javascript' >this</font>,{bound:[10,20,400,20],caption:"<font class='string' >Password</font>",password:true});</span><br>
		hasil : </br>
		<div width="100%" align='center'><img src='image/cth-edit.png'/></div>
	</p>
	<p>
		roojaxAPI terdiri dari <a href='library.php'>library</a> dan komponen. Komponen sendiri terdiri dari <a href='komponen.php'>visual komponen</a> dan <a href='util.php'>komponen utiliti</a>.<br>
		Contoh form yang dibuat menggunakan roojaxAPI.<br>
		<table cellspacing='5'><tr>
				  <td><a href='image/design.jpg'><img width=150 height=100 src='image/design.jpg'/></a></td>
				  <td><a href='image/graph.jpg'><img width=150 height=100 src='image/graph.jpg'/></a></td>
				  <td><a href='image/listData.jpg'><img width=150 height=100 src='image/listData.jpg'/></a></td>
				  <td><a href='image/main.jpg'><img width=150 height=100 src='image/main.jpg'/></a></td></tr>
		<tr>
				  <td><a href='image/moregraph.jpg'><img width=150 height=100 src='image/moregraph.jpg'/></a></td>
				  <td><a href='image/newapp.jpg'><img width=150 height=100 src='image/newapp.jpg'/></a></td></tr></table>
	</p>
	<p>
		<span style='font-size:10;color:#ff0000'><i>roojaxIDE (IDE /Builder untuk memudahkan pembuatan interface)  masih dalam tahap pembangunan.</i></span>
	</p>
	</div>
	<div style='display:block;width:900;height:20;border:1px solid #999999;background:#d2e6f7;font-size:10;text-align:center' >
	roojax&nbsp;&copy;2009
	</div>
	
</body>

</html>