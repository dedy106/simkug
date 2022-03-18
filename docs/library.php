<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>e-saku</title>
</head>
<style>
	span.roojaxscript {font-size:12;font-family:courier}
	span.roojaxsyntax {font-size:12;font-family:courier;font-weight:bold;color:#111476}
	font.string {color:#8ad0d3}
	font.numeric {color:#ff0000;}
	font.javascript {color:#0000ff}
	font.comment {color:#569a5c;font-style:italic}
	font.tebal {font-style:italic;font-weight:bold}
	th {font-size:11;background:#aac4ca}	
	table.param{border:1px solif #999999;font-size:11;font-family:arial;border-collapse : collapse;bordercolor : #111111;}
</style>
<body width=950>
	<div style='display:block;font-size:20px;top:10px;left:20;width:900;height:100x;background:#d2e6f7;text-align:center;border:1px solid #999999' align='center'>
		<table width="300pt"><tr><td width="100pt"><img src='../image/jamboologo.png' /></td><td width="200pt" style='font-size:50px;font-family:arial'><span style="font-size:11;text-weight:bold;font-style:italic">Dokumentasi</span></br> roo<font color='#ff9900'>J</font>ax</td></tr></table>
	</div>
	<div style='display:block;width:900;height:auto;border:1px solid #999999;background:#ebf8ff' >	
	<h2>roojax Library</h2>
	<p>
		<ol>
		<li><a href="#periode">Fungsi untuk Periode</a></li>
			<ol>
				<li><a href='#periodeToName'>periodeToName</a></li>
				<li><a href='#nextNPeriode'>nextNPeriode</a></li>
				<li><a href='#getPrevPeriode'>getPrevPeriode</a></li>
				<li><a href='#getNextPeriode'>getNextPeriode</a></li>
				<li><a href='#closePeriode'>closePeriode</a></li>			
			</ol>
		<li><a href="#tanggal">Fungsi untuk Tanggal</a></li>
			<ol>
				<li><a href='#dateAdd'>DateAdd</a></li>
				<li><a href='#dateSub'>DateSub</a></li>
				<li><a href='#getBln'>getBln</a></li>
				<li><a href='#dayToYear'>dayToYear</a></li>
				<li><a href='#DateDiff'>DateDiff</a></li>
				<li><a href='#getDateStr'>getDateStr</a></li>
				<li><a href='#getDateTimeStr'>getDateTimeStr</a></li>
				<li><a href='#idFormat'>idFormat</a></li>
				<li><a href='#lclFormat'>lclFormat</a></li>
				<li><a href='#strToDate'>strToDate</a></li>
				<li><a href='#sqlDateStr'>sqlDateStr</a></li>				
			</ol>
		<li><a href="#nilai">Fungsi untuk Number / Nilai / Currency</a></li>
			<ol>
				<li><a href='#formatNumeric'>formatNumeric</a></li>				
				<li><a href='#format_number'>format_number</a></li>				
				<li><a href='#parseNilai'>parseNilai</a></li>				
				<li><a href='#isNilai'>isNilai</a></li>				
				<li><a href='#RemoveTitik'>RemoveTitik</a></li>				
				<li><a href='#decToFloat'>decToFloat</a></li>				
				<li><a href='#floatToDec'>floatToDec</a></li>				
				<li><a href='#floatToNilai'>floatToNilai</a></li>				
				<li><a href='#nilaiToFloat'>nilaiToFloat</a></li>				
				<li><a href='#nilaiToDec'>nilaiToDec</a></li>				
				<li><a href='#decToNilai'>decToNilai</a></li>				
				<li><a href='#strToNilai'>strToNilai</a></li>				
				<li><a href='#strToFloat'>strToFloat</a></li>								
				<li><a href='#round_decimals'>round_decimals</a></li>												
			</ol>
		<li><a href="#string">Fungsi String</a></li>
			<ol>
			<li><a href='#replaceStrBetween'>replaceStrBetween</a></li>				
			<li><a href='#LTrim'>LTrim</a></li>								
			<li><a href='#RTrim'>RTrim</a></li>								
			<li><a href='#trim'>trim</a></li>								
			</ol>
		<li><a href="#array">Fungsi Array</a></li>
			<ol>
			<li><a href='#deleteByObj'>deleteByObj</a></li>				
			<li><a href='#deleteByIndex'>deleteByIndex</a></li>										
			</ol>
		<li><a href="#system">Fungsi System</a></li>
			<ol>
			<li><a href='#getBasicResourceId'>getBasicResourceId</a></li>				
			<li><a href='#loadJS'>loadJS</a></li>								
			<li><a href='#uses'>uses</a></li>								
			<li><a href='#loadCSS'>loadCSS</a></li>								
			<li><a href='#runArraySQL'>runArraySQL</a></li>								
			<li><a href='#setTipeButton'>setTipeButton</a></li>								
			<li><a href='#XMLHttpRequest'>XMLHttpRequest</a></li>								
			<li><a href='#getURL'>getURL</a></li>								
			<li><a href='#showProgress'>showProgress</a></li>								
			<li><a href='#hideProgress'>hideProgress</a></li>								
			<li><a href='#delay'>delay</a></li>								
			<li><a href='#colorConv'>colorConv</a></li>								
			<li><a href='#colorFade'>colorFade</a></li>								
			<li><a href='#animateColor'>animateColor</a></li>								
			<li><a href='#urlencode'>urlencode</a></li>								
			<li><a href='#upDownHtml'>upDownHtml</a></li>								
			<li><a href='#downloadHtml'>downloadHtml</a></li>								
			<li><a href='#loadXMLDoc'>loadXMLDoc</a></li>								
			<li><a href='#findPos'>findPos</a></li>								
			</ol>
		<li><a href="#payment">Fungsi Payment</a></li>
			<ol>
			<li><a href='#Annuity'>Annuity</a></li>				
			<li><a href='#Annuity2'>Annuity2</a></li>								
			<li><a href='#payment'>payment</a></li>								
			<li><a href='#payment2'>payment2</a></li>								
			<li><a href='#compound'>compound</a></li>
			<li><a href='#calculate'>calculate</a></li>
			</ol>
		<li><a href="#Konstanta">Konstanta</a></li>		
			<ol>				
				<li><a href='#systemAPI'>systemAPI</a></li>
					<ol>
						<li><a href='#systemRect'>systemRect</a></li>
						<li><a href='#hide'>hide</a></li>
						<li><a href='#alert'>alert</a></li>
						<li><a href='#reqClearStatus'>reqClearStatus</a></li>
						<li><a href='#reqStatus'>reqStatus</a></li>
						<li><a href='#browser'>browser</a></li>
						<li><a href='#about'>about</a></li>
						<li><a href='#getFlexApp'>getFlexAppa</a></li>
						<li><a href='#MSIE'>MSIE</a></li>
					</ol>
				<li><a href='#BrowserDetect'>BrowserDetect</a></li>
					<ol>
						<li><a href='#init'>init</a></li>
						<li><a href='#searchString'>searchString</a></li>
						<li><a href='#searchVersion'>searchVersion</a></li>
						<li><a href='#dataBrowser'>dataBrowser</a></li>
						<li><a href='#dataOS'>dataOS</a></li>
					</ol>
				<li><a href='#dayName'>dayName</a></li>
				<li><a href='#dayLocal'>dayLocal</a></li>
				<li><a href='#basicResourceId'>basicResourceId</a></li>
				<li><a href='#buttonStyle'>ButtonStyle</a></li>
					<ol>
					<li><a href='#bsNone'>bsNone</a></li>
					<li><a href='#bsAuto'>bsAuto</a></li>
					<li><a href='#bsEllips'>bsEllips</a></li>
					<li><a href='#bsCheck'>bsCheck</a></li>
					<li><a href='#bsDate'>bsDate</a></li>
					</ol>
				<li><a href='#buttonStyle'>borderStyle</a></li>	
					<ol>
					<li><a href='#bsNormal'>bsNormal</a></li>
					<li><a href='#bsDialog'>bsDialog </a></li>
					<li><a href='#bsHide '>bsHide </a></li>
					<li><a href='#bsSingle'>bsSingle</a></li>
					<li><a href='#bsSizeToolWin'>bsSizeToolWin</a></li>
					</ol>
				<li><a href='#buttonStyle'>formStyle</a></li>
					<ol>
					<li><a href='#fsNormal '>fsNormal </a></li>
					<li><a href='#fsMDIForm'>fsMDIForm</a></li>
					<li><a href='#fsMDIChild'>fsMDIChild</a></li>
					<li><a href='#fsStayOnTop'>fsStayOnTop</a></li>
					</ol>
				<li><a href='#buttonStyle'>tipe Button</a></li>
					<ol>
					<li><a href='#tbAllFalse'>tbAllFalse</a></li>
					<li><a href='#tbSimpan'>tbSimpan</a></li>
					<li><a href='#tbUbahHapus'>tbUbahHapus</a></li>
					<li><a href='#tbHapus'>tbHapus</a></li>
					<li><a href='#tbUbah'>tbUbah</a></li>
					<li><a href='#tbAllTrue'>tbAllTrue</a></li>
					<li><a href='#tbSimpanHapus'>tbSimpanHapus</a></li>
					</ol>					
				<li><a href='#buttonStyle'>view Type</a></li>
					<ol>
					<li><a href='#vtList'>vtList</a></li>
					<li><a href='#vtTail'>vtTail</a></li>
					<li><a href='#vtIcon'>vtIcon</a></li>
					<li><a href='#vtLargeIcon'>vtLargeIcon</a></li>
					</ol>
				<li><a href='#buttonStyle'>Format Kolom</a></li>
					<ol>
					<li><a href='#cfText'>cfText</a></li>
					<li><a href='#cfNumeric'>cfNumeric</a></li>
					<li><a href='#cfNilai'>cfNilai</a></li>
					<li><a href='#cfDate'>cfDate</a></li>
					<li><a href='#cfHurufBesar'>cfHurufBesar</a></li>
					<li><a href='#cfBoolean'>cfBoolean</a></li>
					<li><a href='#cfButton'>cfButton</a></li>
					</ol>
				<li><a href='#buttonStyle'>tipe Text</a></li>
					<ol>
					<li><a href='#ttNormal'>ttNormal</a></li>
					<li><a href='#ttNilai'>ttNilai</a></li>
					<li><a href='#ttAngka'>ttAngka</a></li>
					<li><a href='#ttHurufBesar'>ttHurufBesar</a></li>
					</ol>
				<li><a href='#buttonStyle'>Modal Result</a></li>
					<ol>	
					<li><a href='#mrOk'>mrOk</a></li>
					<li><a href='#mrCancel'>mrCancel</a></li>
					</ol>
				<li><a href='#buttonStyle'>Text Aligment</a></li>
					<ol>			
					<li><a href='#alLeft'>alLeft</a></li>
					<li><a href='#alRight'>alRight</a></li>
					<li><a href='#alCenter'>alCenter</a></li>
					</ol>				
				<li><a href='#dateTimeFormat'>dateTimeFormat</a></li>
				<li><a href='#decimalSeparator'>decimalSeparator</a></li>
				<li><a href='#thousandSeparator'>thousandSeparator</a></li>
				<li><a href='#monthName'>monthName</a></li>
				<li><a href='#ptStartOfPeriod'>ptStartOfPeriod</a></li>
				<li><a href='#ptEndOfPeriod'>ptEndOfPeriod</a></li>
			</ol>
		</ol>
	</p>
	<H2>Deskripsi Library</H2>
	<p>
		<ol>
		<li><a name="periode">Fungsi untuk Periode</a></li>
			Fungsi yang berhubungan dengan periode dalam aplikasi.
			<ol>
				<li><a name='periodeToName'>periodeToName</a></li>
				digunakan untuk mengembalikan periode dalam bentuk text. <br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>periodeToName(periode)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>periode</td><td>string(6)</td><td>periode dengan format yyyymm.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				periode dalam bentuk text. <i>Nama bulan</i> tahun. <br>	
				<font class="tebal">misal </font>: <br>
				<span class='roojaxscript'>var x = "<font class="string">200809</font>";<br>
				var p = periodeToName(x);<br>
				this.ed_text.setText(p);<font class="comment">//September 2008</font></span><br><br>
				<li><a name='nextNPeriode'>nextNPeriode</a></li>
				digunakan untuk mendapatkan beberapa periode ke depan sebanyak N dimulai dari param periode.<br>
				<font class="tebal">syntax</font>:<br><span class='roojaxsyntax'>nextNPeriode(periode,n)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td class='param'>periode</td><td>string(6)</td><td>periode dengan format yyyymm.</td></tr>
				<tr><td class='param'>n</td><td>integer</td><td>jumlah beberapa periode ke depan</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				periode ke depan n kali. <i>yyyymm</i>. <br>	
				<font class="tebal">misal</font>: <br>
				<span class='roojaxscript'>var x = "<font class="string">200809</font>";<br>
				var p = nextNPeriode(x,2);<br>
				this.ed_text.setText(p);<font class="comment">//200811</font></span><br><br>
				<li><a name='getPrevPeriode'>getPrevPeriode</a></li>
				digunakan untuk mendapatkan satu periode sebelum.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>getPrevPeriode(periode)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>periode</td><td>string(6)</td><td>periode dengan format yyyymm.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				periode sebelum periode param. <i>yyyymm</i>. <br>	
				<font class="tebal">misal</font> : <br>
				<span class='roojaxscript'>var x = "<font class="string">200809</font>";<br>
				var p = getPrevPeriode(x);<br>
				this.ed_text.setText(p);<font class="comment">//200808</font></span><br><br>
				<li><a name='getNextPeriode'>getNextPeriode</a></li>
				digunakan untuk mendapatkan satu periode sesudah.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>getNextPeriode(periode)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>periode</td><td>string(6)</td><td>periode dengan format yyyymm.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				periode sesudah periode param. <i>yyyymm</i>. <br>	
				<font class="tebal">misal</font> : <br>
				<span class='roojaxscript'>var x = "<font class="string">200809</font>";<br>
				var p = getNextPeriode(x);<br>
				this.ed_text.setText(p);<font class="comment">//200810</font></span><br><br>
				<li><a name='closePeriode'>closePeriode</a></li>			
				digunakan untuk mendapatkan maksimum periode akhir tahun pembukuan(tutup buku /closing periode).<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>closePeriode(periode,maksPeriode)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>periode</td><td>string(6)</td><td>periode aktif dengan format yyyymm.</td></tr>
				<tr><td>maksPeriode</td><td>string(2)</td><td>jumlah bulan maksimal dalam setahun pembukuan. <i>default 13</i></td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				periode awal tahun pembukuan. Jika masih kurang dari maksimal bulan, hasil dari fungsi ini adalah periode sesudah periode param.<i>yyyymm</i>. <br>	
				<font class="tebal">misal</font> : <br>
				<span class='roojaxscript'>var x = "<font class="string">200812</font>";<br>
				var p = closePeriode(x,13);<br>
				this.ed_text.setText(p);<font class="comment">//200813</font></span><br><br>
			</ol>
		<li><a name="tanggal">Fungsi untuk Tanggal</a></li>
		Fungsi tambahan untuk object Date javascript dan yang berhubungan tanggal.
			<ol>
				<li><a name='dateAdd'>DateAdd</a></li>
				digunakan untuk menambah objek tanggal javascript dengan beberapa detik, atau menit, atau jam, atau hari, atau tahun.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>DateAdd(timeU,byMany,dateObj)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>timeU</td><td>string</td><td>satuan yang mewakili nilai yang akan ditambahkan. timeU terdiri dari ["ms","s","mi","h","d","y"].</td></tr>
				<tr><td>byMany</td><td>integer</td><td>nilai yang akan ditambahkan ke objek tanggal.</td></tr>
				<tr><td>dateObj</td><td>Date</td><td>objek tanggal yang akan ditambah. <i>default 13</i></td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				objek tanggal baru yang sudah bertambah sesuai dengan satuannya. <br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var x = <font class="javascript">new Date()</font>;<font class="comment">//Thu Jul 30 2009 22:29:25 GMT+0700 (Local Standard Time)</font><br>
				d = d.DateAdd("<font class="string">s</font>",10,d);<font class="comment">//Thu Jul 30 2009 22:29:35 GMT+0700 (Local Standard Time)</font></span><br><br>
				<li><a name='dateSub'>DateSub</a></li>
				digunakan untuk mengurangi objek tanggal javascript dengan beberapa detik, atau menit, atau jam, atau hari, atau tahun.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>DateSub(timeU,byMany,dateObj)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>timeU</td><td>string</td><td>satuan yang mewakili nilai yang akan mengurangi objek tanggal. timeU terdiri dari ["ms","s","mi","h","d","y"].</td></tr>
				<tr><td>byMany</td><td>integer</td><td>nilai yang akan mengurangi objek tanggal.</td></tr>
				<tr><td>dateObj</td><td>Date</td><td>objek tanggal yang akan ditambah. <i>default 13</i></td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				objek tanggal baru yang sudah berkurang sesuai dengan satuannya. <br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var x = <font class="javascript">new Date()</font>;<font class="comment">//Thu Jul 30 2009 22:29:25 GMT+0700 (Local Standard Time)</font><br>
				d = d.DateSub("<font class="string">s</font>",10,d);<font class="comment">//Thu Jul 30 2009 22:29:15 GMT+0700 (Local Standard Time)</font></span><br><br>				
				<li><a name='getBln'>getBln</a></li>
				digunakan untuk mendapatkan bulan dari objek tanggal. karena index bulan dijavascript dimulai dari 0.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>getBln()</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				bulan dari objek tanggal. berisi dari 1 s/d 12.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var x = <font class="javascript">new Date()</font>;<font class="comment">//Thu Jul 30 2009 22:29:25 GMT+0700 (Local Standard Time)</font><br>
				d = d.getBln();<font class="comment">//7 </font></span><br><br>								
				<li><a name='dayToYear'>dayToYear</a></li>
				digunakan untuk mengkonversi dari jumlah hari ke tahun dan bulan. Disini mengabaikan tahun kabisat. standar 365 hari, 30 hari dalam sebulan.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>dayToYear(day)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>day</td><td>string</td><td>jumlah hari.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				array yang berisi [tahun, bulan, sisa hari].<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var x = <font class="javascript">dayToYear(365)</font>;<font class="comment">//array [1,0,0];</font></span><br><br>		
				<li><a name='DateDiff'>DateDiff</a></li>
				digunakan untuk mencari selisih dari 2 objek tanggal.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>DateDiff(dateObject)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>dateObject</td><td>Date</td><td>objek tanggal yang akan diselisihkan.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				selisih dalam bentuk milisecond.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var d1 = <font class="javascript">new Date()</font>;<font class="comment"></font></span><br>
				<span class='roojaxscript'>var d2 = <font class="javascript">new Date()</font>;<font class="comment"></font></span><br>
				<span class='roojaxscript'>var selisih= <font class="javascript">d1.DateDiff(d2)</font>;<font class="comment"></font></span><br><br>		
				<li><a name='getDateStr'>getDateStr</a></li>
				digunakan untuk mendapatkan tanggal dalam format yyyy-mm-dd dari objek tanggal dimana format ini sering digunakan untuk insert data tanggal ke table.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>getDateStr()</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				string dalam format yyyy-mm-dd.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var d1 = <font class="javascript">new Date()</font>;<font class="comment">//Thu Jul 30 2009 22:29:25 GMT+0700 (Local Standard Time)</font></span><br>
				<span class='roojaxscript'>var d2 = <font class="javascript">d1.getDateStr()</font>;<font class="comment">2009-07-30</font></span><br><br>			
				
				<li><a name='getDateTimeStr'>getDateTimeStr</a></li>
				digunakan untuk mendapatkan tanggal dalam format yyyy-mm-dd hh:nn:ss dari objek tanggal dimana format ini sering digunakan untuk insert data tanggal ke table.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>getDateTimeStr()</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				string dalam format yyyy-mm-dd.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var d1 = <font class="javascript">new Date()</font>;<font class="comment">//Thu Jul 30 2009 22:29:25 GMT+0700 (Local Standard Time)</font></span><br>
				<span class='roojaxscript'>var d2 = <font class="javascript">d1.getDateTimeStr()</font>;<font class="comment">2009-07-30 22:29:25</font></span><br><br>			
								
				<li><a name='idFormat'>idFormat</a></li>
				digunakan untuk mendapatkan tanggal dalam format dd/mm/yyyy dari string tanggal masukan.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>idFormat(strDate)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>strDate</td><td>string</td><td>string yang berisi tanggal. contoh: 2009-07-20</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				string dalam format dd/mm/yyyy.<br>	
				<font class="tebal">misal</font> : <br>				 				
				<span class='roojaxscript'>var d2 = <font class="javascript">new Date().idFormat("2009-07-27")</font>;<font class="comment">27/07/2009</font></span><br><br>			
				
				<li><a name='lclFormat'>lclFormat</a></li>
				digunakan untuk mendapatkan tanggal dalam format dd/mm/yyyy dari string objek tanggal.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>lclFormat()</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>								
				</table><br>
				<font class="tebal">hasil</font>:<br>
				string dalam format dd/mm/yyyy.<br>	
				<font class="tebal">misal</font> : <br>				 				
				<span class='roojaxscript'>var d2 = <font class="javascript">new Date().lclFormat()</font>;<font class="comment">30/07/2009</font></span><br><br>			
				
				<li><a name='strToDate'>strToDate</a></li>
				digunakan untuk mengkonversi tanggal string ke objek tanggal.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>strToDate(strDate)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>
				<tr><td>strDate</td><td>string</td><td>string tanggal yang akan dikonversi ke objek tanggal.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				Date atau objek tanggal javascript.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var d1 = <font class="javascript">new Date().strToDate("<font class="string">2009-27-31</font>")</font>;</span><br>				
				<li><a name='sqlDateStr'>sqlDateStr</a></li>				
				digunakan untuk mendapatkan tanggal dalam format yyyy-mm-dd dari objek tanggal dimana format ini sering digunakan untuk insert data tanggal ke table.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>sqlDateStr(strDate)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>strDate</td><td>string</td><td>string tanggal yang akan dikonversi ke objek tanggal.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				string dalam format yyyy-mm-dd.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var d1 = <font class="javascript">new Date()</font>;<font class="comment">//Thu Jul 30 2009 22:29:25 GMT+0700 (Local Standard Time)</font></span><br>
				<span class='roojaxscript'>var d2 = <font class="javascript">d1.sqlDateStr("<font class="string">31/07/2009</font>")</font>;<font class="comment">2009-07-31</font></span><br><br>			
			</ol>
		<li><a name="nilai">Fungsi untuk Number / Nilai / Currency</a></li>
			<ol>
				<li><a name='formatNumeric'>formatNumeric</a></li>				
				digunakan untuk mendapatkan format numeric dengan pangjang string tertentu. Biasanya digunakan untuk no bukti dengan panjang numeric tertentu  <br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>formatNumeric(format, idx)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>format</td><td>string</td><td>berisi angka 0 sebanyak panjang format yang ingin dikehendaki.</td></tr>
				<tr><td>idx</td><td>integer</td><td>index yang akan diformat numeric.</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				index integer dengan panjang sesuai format. Jika pangjang idx kurang dari format, maka akan ditambahkan 0 didepan index.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var id = <font class="javascript">formatNumeric("0000000",10)</font>;<font class="comment">// id = "0000010"</font></span><br>				
				<li><a name='format_number'>format_number</a></li>				
				digunakan untuk memformat number dengan decimal format, currency format.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>format_number(value, decLength, decSp, thousSep)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>float</td><td>nilai float yang akan diformat.</td></tr>
				<tr><td>decLength</td><td>integer</td><td>berapa digit dibelakang koma.</td></tr>
				<tr><td>decSep</td><td>string</td><td>separator untuk decimal(",",".").</td></tr>
				<tr><td>thousSep</td><td>string</td><td>separator untuk ribuan(",",".").</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				nilai currency yang telah terformat.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">format_number(1000.345,2,",",".")</font>;<font class="comment">// value= "1.000,35"</font></span><br>				
				<li><a name='parseNilai'>parseNilai</a></li>
				digunakan untuk menghilangkan separator ribuan dan koma diganti dengan titik. Biasanya digunakan untuk insert ke table.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>parseNilai(textCurrency)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>textCurrency</td><td>float</td><td>Currency yang akan dihilangkan separator ribuannya dan koma diganti titik.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				string nilai yang tidak dalam format currency lagi.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">parseNilai("<font class="string">1.000.500,5</font>")</font>;<font class="comment">// value = "1000500.5"</font></span><br>				
				<li><a name='isNilai'>isNilai</a></li>				
				digunakan mengecek apakah value ini adalah nilai dalam format currency.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>isNilai(value)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dicek.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				boolean. jika value adalah format currency maka hasilnya <i>true</i>, lainnya <i>false</i><br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">isNilai("<font class="string">1.000.500,5</font>")</font>;<font class="comment">// value = true</font></span><br>							
				<li><a name='RemoveTitik'>RemoveTitik</a></li>				
				digunakan menghilangkan titik dalam format currency. separator ribuan.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>RemoveTitik(value)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dihilangkan titiknya.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				string nilai tanpa titik. separator ribuan.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">RemoveTitik("<font class="string">1.000.500,5</font>")</font>;<font class="comment">// value = "1000500,5"</font></span><br>											
				<li><a name='decToFloat'>decToFloat</a></li>				
				digunakan mengkonversi decimal dalam tipe string ke tipe float.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>decToFloat(value)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				nilai dengan tipe float.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">decToFloat("<font class="string">1000500,5</font>")</font>;<font class="comment">// value = 1000500.5</font></span><br>															
				<li><a name='floatToDec'>floatToDec</a></li>				
				digunakan mengkonversi dari float ke tipe string decimal.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>floatToDec(value)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				nilai dengan tipe string.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">floatToDec(<font class="numeric">1000500.5</font>)</font>;<font class="comment">// value = "1000500,5"</font></span><br>
				<li><a name='floatToNilai'>floatToNilai</a></li>				
				digunakan mengkonversi dari float ke tipe string currency.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>floatToNilai(valuee,decSep, thousandSep)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>				
				<tr><td>decSep</td><td>string</td><td>separator untuk decimal(",",".").</td></tr>
				<tr><td>thousandSep</td><td>string</td><td>separator untuk ribuan(",",".").</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				nilai currency dengan tipe string.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">floatToNilai(<font class="numeric">1000500.5</font>)</font>;<font class="comment">// value = "1.000.500,5"</font></span><br>				
				<li><a name='nilaiToFloat'>nilaiToFloat</a></li>				
				digunakan mengkonversi dari tipe string currency ke float .<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>nilaiToFloat(value)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				nilai float.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">nilaiToFloat("<font class="string">1.000.500,5</font>")</font>;<font class="comment">// value = 1000500.5</font></span><br>				
				<li><a name='nilaiToDec'>nilaiToDec</a></li>				
				digunakan mengkonversi dari tipe string currency ke string decimal.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>nilaiToDec(value)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				nilai float tanpa currency dalam tipe string.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">nilaiToDec("<font class="string">1.000.500,5</font>")</font>;<font class="comment">// value = "1000500,5"</font></span><br>								
				<li><a name='decToNilai'>decToNilai</a></li>				
				digunakan mengkonversi dari string decimal ke tipe string currency.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>decToNilai(value,decSep, thousandSep)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>				
				<tr><td>decSep</td><td>string</td><td>separator untuk decimal(",",".").</td></tr>
				<tr><td>thousandSep</td><td>string</td><td>separator untuk ribuan(",",".").</td></tr>
				</table><br>
				<font class="tebal">hasil</font>:<br>
				 nilai currency dalam tipe string.<br>	
				<font class="tebal">misal</font> : <br>				 
				<span class='roojaxscript'>var value = <font class="javascript">decToNilai("<font class="string">1000500,5</font>")</font>;<font class="comment">// value = "1.000.500,5"</font></span><br>												
				<li><a name='strToNilai'>strToNilai</a></li>				
				digunakan mengkonversi dari string float ke tipe string currency.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>strToNilai(value,decSep, thousandSep)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>		
				<tr><td>decSep</td><td>string</td><td>separator untuk decimal(",",".").</td></tr>
				<tr><td>thousandSep</td><td>string</td><td>separator untuk ribuan(",",".").</td><				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				 nilai currency dalam tipe string.<br>	
				<font class="tebal">misal</font> : <br>				 				
				<li><a name='strToFloat'>strToFloat</a></li>								
				digunakan mengkonversi dari string currency / decimal ke tipe float.<br>
				<font class="tebal">syntax</font>: <br><span class='roojaxsyntax'>strToFloat(value)</span><br><br>
				<table class='param' border=1 cellspacing=1 width=500><tr><th width=150>Param</th><th width=100>Tipe</th><th width=250>Deskripsi</th></tr>				
				<tr><td>value</td><td>string</td><td>value yang akan dikonversi.</td></tr>				
				</table><br>
				<font class="tebal">hasil</font>:<br>
				 nilai float.<br>	
				<font class="tebal">misal</font> : <br>				 				
				<li><a name='round_decimals'>round_decimals</a></li>												
			</ol>
		<li><a name="string">Fungsi String</a></li>
			<ol>
			<li><a name='replaceStrBetween'>replaceStrBetween</a></li>				
			<li><a name='LTrim'>LTrim</a></li>								
			<li><a name='RTrim'>RTrim</a></li>								
			<li><a name='trim'>trim</a></li>								
			</ol>
		<li><a name="array">Fungsi Array</a></li>
			<ol>
			<li><a name='deleteByObj'>deleteByObj</a></li>				
			<li><a name='deleteByIndex'>deleteByIndex</a></li>										
			</ol>
		<li><a name="system">Fungsi System</a></li>
			<ol>
			<li><a name='getBasicResourceId'>getBasicResourceId</a></li>				
			<li><a name='loadJS'>loadJS</a></li>								
			<li><a name='uses'>uses</a></li>								
			<li><a name='loadCSS'>loadCSS</a></li>								
			<li><a name='runArraySQL'>runArraySQL</a></li>								
			<li><a name='setTipeButton'>setTipeButton</a></li>								
			<li><a name='XMLHttpRequest'>XMLHttpRequest</a></li>								
			<li><a name='getURL'>getURL</a></li>								
			<li><a name='showProgress'>showProgress</a></li>								
			<li><a name='hideProgress'>hideProgress</a></li>								
			<li><a name='delay'>delay</a></li>								
			<li><a name='colorConv'>colorConv</a></li>								
			<li><a name='colorFade'>colorFade</a></li>								
			<li><a name='animateColor'>animateColor</a></li>								
			<li><a name='urlencode'>urlencode</a></li>								
			<li><a name='upDownHtml'>upDownHtml</a></li>								
			<li><a name='downloadHtml'>downloadHtml</a></li>								
			<li><a name='loadXMLDoc'>loadXMLDoc</a></li>								
			<li><a name='findPos'>findPos</a></li>								
			</ol>
		<li><a name="payment">Fungsi Payment</a></li>
			<ol>
			<li><a name='Annuity'>Annuity</a></li>				
			<li><a name='Annuity2'>Annuity2</a></li>								
			<li><a name='payment'>payment</a></li>								
			<li><a name='payment2'>payment2</a></li>								
			<li><a name='compound'>compound</a></li>
			<li><a name='calculate'>calculate</a></li>
			</ol>
		<li><a name="Konstanta">Konstanta</a></li>		
			<ol>				
				<li><a name='systemAPI'>systemAPI</a></li>
					<ol>
						<li><a name='systemRect'>systemRect</a></li>
						<li><a name='hide'>hide</a></li>
						<li><a name='alert'>alert</a></li>
						<li><a name='reqClearStatus'>reqClearStatus</a></li>
						<li><a name='reqStatus'>reqStatus</a></li>
						<li><a name='browser'>browser</a></li>
						<li><a name='about'>about</a></li>
						<li><a name='getFlexApp'>getFlexAppa</a></li>
						<li><a name='MSIE'>MSIE</a></li>
					</ol>
				<li><a name='BrowserDetect'>BrowserDetect</a></li>
					<ol>
						<li><a name='init'>init</a></li>
						<li><a name='searchString'>searchString</a></li>
						<li><a name='searchVersion'>searchVersion</a></li>
						<li><a name='dataBrowser'>dataBrowser</a></li>
						<li><a name='dataOS'>dataOS</a></li>
					</ol>
				<li><a name='dayName'>dayName</a></li>
				<li><a name='dayLocal'>dayLocal</a></li>
				<li><a name='basicResourceId'>basicResourceId</a></li>
				<li><a name='buttonStyle'>ButtonStyle</a></li>
					<ol>
					<li><a name='bsNone'>bsNone</a></li>
					<li><a name='bsAuto'>bsAuto</a></li>
					<li><a name='bsEllips'>bsEllips</a></li>
					<li><a name='bsCheck'>bsCheck</a></li>
					<li><a name='bsDate'>bsDate</a></li>
					</ol>
				<li><a name='buttonStyle'>borderStyle</a></li>	
					<ol>
					<li><a name='bsNormal'>bsNormal</a></li>
					<li><a name='bsDialog'>bsDialog </a></li>
					<li><a name='bsHide '>bsHide </a></li>
					<li><a name='bsSingle'>bsSingle</a></li>
					<li><a name='bsSizeToolWin'>bsSizeToolWin</a></li>
					</ol>
				<li><a name='buttonStyle'>formStyle</a></li>
					<ol>
					<li><a name='fsNormal '>fsNormal </a></li>
					<li><a name='fsMDIForm'>fsMDIForm</a></li>
					<li><a name='fsMDIChild'>fsMDIChild</a></li>
					<li><a name='fsStayOnTop'>fsStayOnTop</a></li>
					</ol>
				<li><a name='buttonStyle'>tipe Button</a></li>
					<ol>
					<li><a name='tbAllFalse'>tbAllFalse</a></li>
					<li><a name='tbSimpan'>tbSimpan</a></li>
					<li><a name='tbUbahHapus'>tbUbahHapus</a></li>
					<li><a name='tbHapus'>tbHapus</a></li>
					<li><a name='tbUbah'>tbUbah</a></li>
					<li><a name='tbAllTrue'>tbAllTrue</a></li>
					<li><a name='tbSimpanHapus'>tbSimpanHapus</a></li>
					</ol>					
				<li><a name='buttonStyle'>view Type</a></li>
					<ol>
					<li><a name='vtList'>vtList</a></li>
					<li><a name='vtTail'>vtTail</a></li>
					<li><a name='vtIcon'>vtIcon</a></li>
					<li><a name='vtLargeIcon'>vtLargeIcon</a></li>
					</ol>
				<li><a name='buttonStyle'>Format Kolom</a></li>
					<ol>
					<li><a name='cfText'>cfText</a></li>
					<li><a name='cfNumeric'>cfNumeric</a></li>
					<li><a name='cfNilai'>cfNilai</a></li>
					<li><a name='cfDate'>cfDate</a></li>
					<li><a name='cfHurufBesar'>cfHurufBesar</a></li>
					<li><a name='cfBoolean'>cfBoolean</a></li>
					<li><a name='cfButton'>cfButton</a></li>
					</ol>
				<li><a name='buttonStyle'>tipe Text</a></li>
					<ol>
					<li><a name='ttNormal'>ttNormal</a></li>
					<li><a name='ttNilai'>ttNilai</a></li>
					<li><a name='ttAngka'>ttAngka</a></li>
					<li><a name='ttHurufBesar'>ttHurufBesar</a></li>
					</ol>
				<li><a name='buttonStyle'>Modal Result</a></li>
					<ol>	
					<li><a name='mrOk'>mrOk</a></li>
					<li><a name='mrCancel'>mrCancel</a></li>
					</ol>
				<li><a name='buttonStyle'>Text Aligment</a></li>
					<ol>			
					<li><a name='alLeft'>alLeft</a></li>
					<li><a name='alRight'>alRight</a></li>
					<li><a name='alCenter'>alCenter</a></li>
					</ol>				
				<li><a name='dateTimeFormat'>dateTimeFormat</a></li>
				<li><a name='decimalSeparator'>decimalSeparator</a></li>
				<li><a name='thousandSeparator'>thousandSeparator</a></li>
				<li><a name='monthName'>monthName</a></li>
				<li><a name='ptStartOfPeriod'>ptStartOfPeriod</a></li>
				<li><a name='ptEndOfPeriod'>ptEndOfPeriod</a></li>
			</ol>
		</ol>
	</p>
	</div>
	<div style='display:block;width:900;height:20;border:1px solid #999999;background:#d2e6f7;font-size:10;text-align:center' >
	roojax&nbsp;&copy;2009
	</div>
	
</body>

</html>