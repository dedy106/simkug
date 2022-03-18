<?php 
	$kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
    $periode = $res->fields[0];

    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    $tmp=explode("/",$_GET['param']);

    $kode_fs="FS1";

	 if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header' style='border: none;'>
		<div class='box' style='border-top: none; border-bottom: none;'>
			<div class='box-header' style='border: none;'>
				<div style='display: inline-block; background-color: #FFFFFF; width: 100%;'>
				<img src='/web/img/logo.png' alt='logo' style='vertical-align: middle; max-width: 3rem; max-height: 3rem; margin-left: 0;'>
				<div style='vertical-align: middle; display: inline-block; background-color: #FFFFFF;'>
					<span style='font-weight: bold; font-size: 1.2rem;'>Nama Perusahaan</span>
					<span style='color: #A1A1A1; font-size: 1rem; padding-left: 13rem;'>Periode (".date('m').date('Y').")</span>
				</div>
				</div>
			</div>
			</header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
	}
	echo $header;
?>
<div class="row" style='border:none;margin-top: 50px;'>
	<div class="col-md-12 col-sm-12 col-xs-12">
	<h4 style="font-weight: bold; padding-left: 1rem;">Beban</h4>
	<select id="periode" name="periode" class="form-control" style=" margin-left: 1rem; width: 32rem; border-top: none; border-left: none; border-right: none;">
	
	</select>
	<h6 style="padding-left: 1rem; font-weight: bold;">Target Tahunan</h6>
	<div id="progress-tahunan" class="progress" style="width: 32rem; margin-left: 1rem;"></div>

	 <p id="target-tahunan" style="text-align: right; font-size: 1rem; padding-right: 3rem; margin-top: -1.5rem;"></p>
	 <h6 style="padding-left: 1rem; font-weight: bold; margin-top: -1rem;">Target Bulanan</h6>

	<div id="progress-bulanan" class="progress" style="width: 32rem; margin-left: 1rem;"></div>

	 <p id="banding" style="text-align: right; font-size: 1rem; padding-right: 3rem; margin-top: -1.5rem;"></p>
	 <h5 style="font-weight: bold; padding-left: 1rem; color: #808080;">Rincian</h5>		
	</div>
</div>
 <div class="row">
 	<div class="col-sm-12 col-md-12 col-xs-12">
 	<table style="padding-left: 1rem;" id="tabel-beban">
 		<tbody id="beban-row">
 			
 		</tbody>
 	</table>
 	</div>
 </div>
<script type="text/javascript">
$(document).ready(function(){
	$('#periode').on('change', function(){
		var per = $('#periode').val();
		var jenis = 'Beban';
		$.ajax({
			type: 'GET',
			url: '<?=$root_ser?>/generalDash.php?fx=getDataPer',
			dataType: 'json',
			data: {'kode_lokasi':'<?=$kode_lokasi?>','username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>','per':per,'jenis':jenis},
			success: function(response){
				console.log(response);
				if(response.status){
					$('div#progress-bar-bulanan').remove();
					var prg = "";
					prg += "<div id='progress-bar-bulanan' class='progress-bar' role='progressbar' style='width: "+response.bar_bln_per+"%; background-color: #2296FC;' aria-valuenow='"+response.persen_bln_per+"' aria-valuemin='0' aria-valuemax='100'>"+response.persen_bln_per+"%"+"</div>";
					$('#progress-bulanan').append(prg);
					$('#banding').text(toJuta(response.real_bln_per)+"/"+toJuta(response.angg_bln_per));
					$('table#tabel-beban tr.data-beban').remove();
					var html = "";
					for(var i=0;i<response.data_per.length;i++){
					var baris = response.data_per[i];
					if(baris.nilai != 0 || baris.so_akhir != 0){
							if(baris.nilai != 0){
								var persen = (baris.so_akhir/baris.nilai)*100;
							} else{
								var persen = 100;
							}
					html += "<tr class='data-beban'>"+
						    "<td style='padding-left: 1rem; padding-right: 1rem; width: 256px;'>"+
						    "<h5 style='font-weight: bold;''>"
						 	+baris.nama+
						    "</h5>"+
						 	"<p style='margin-top: -1rem; font-size: 1rem; color: #808080'>"
						 	+toJuta(baris.nilai)+"-"+sepNum(persen)+"%"+
						 	"</p>"+
						    "</td>"+
						 	"<td style='width: 90px;''>"+
						 	"<h5 style='text-align: right; font-weight: bold; margin-top: -0.5rem;'>"
						 	+toJuta(baris.so_akhir)+
						 	"</h5>"+
						 	"</td>"+
						 	"</tr>";
						 }
					}
				$('#tabel-beban').append(html);
			 }
			}
		})
	})
})


function sepNum(x){
    var num = parseFloat(x).toFixed(2);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
    }

function sepNumPas(x){
    var num = parseInt(x);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}

function toJuta(x) {
    var nil = x / 1000000;
    return sepNum(nil) + " JT";
}

String.prototype.InsertAt=function(CharToInsert,Position){
     return this.slice(0,Position) + CharToInsert + this.slice(Position)
}

function loadService(index,method,url,param=null) {
	var jenis = 'Beban';
	$.ajax({
		type: method,
		url: url,
		dataType: 'json',
		data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>','jenis':jenis},
		success: function(response) {
			if(response.status) {
				switch(index){
					case "bulanan":
					var progress_bulanan = "";
					progress_bulanan += "<div id='progress-bar-bulanan' class='progress-bar' role='progressbar' style='width: "+response.bar_bulanan+"%; background-color: #2296FC;' aria-valuenow='"+response.persen_bulanan+"' aria-valuemin='0' aria-valuemax='100'>"+response.persen_bulanan+"%"+"</div>";
					$('#progress-bulanan').append(progress_bulanan);
					$('#banding').text(toJuta(response.realisasi_bulanan)+"/"+toJuta(response.anggaran_bulanan));
					break;
					case "tahunan":
					var progress_tahunan = "";
					progress_tahunan += "<div class='progress-bar' role='progressbar' style='width: "+response.bar_tahunan+"%; background-color: #2BD13D;' aria-valuenow='"+response.persen_tahunan+"' aria-valuemin='0' aria-valuemax='100'>"+response.persen_tahunan+"%"+"</div>";
					$('#progress-tahunan').append(progress_tahunan);
					$('#target-tahunan').text(toJuta(response.realisasi_tahunan)+"/"+toJuta(response.anggaran_tahunan));
					break;
					case "periode":
						var option1 = "<option value=''>Periode (mm/yyyy)</option>";
						var option  = "";
						for(var a=0;a<response.periode_value.length;a++){
							var row1    = response.periode_value[a];
							var periode = row1.periode.InsertAt('/',4);

							option += "<option value="+row1.periode+">"+periode+"</option>";
						}
						$('#periode').append(option1);
						$('#periode').append(option);
						break;
					case "data":
						$('table#tabel-beban tr.data-beban').remove();
						var row2 = "";
						for(var b=0;b<response.data.length;b++){
							var baris = response.data[b];
							if(baris.nilai != 0 || baris.so_akhir != 0){
							if(baris.nilai != 0){
								var persen = (baris.so_akhir/baris.nilai)*100;
							} else{
								var persen = 100;
							}
							row2 += "<tr class='data-beban'>"+
						 		    "<td style='padding-left: 1rem; padding-right: 1rem; width: 256px;'>"+
						 		    "<h5 style='font-weight: bold;''>"
						 		    +baris.nama+
						 		    "</h5>"+
						 		    "<p style='margin-top: -1rem; font-size: 1rem; color: #808080'>"
						 		    +toJuta(baris.nilai)+"-"+sepNum(persen)+"%"+
						 		    "</p>"+
						 		    "</td>"+
						 		    "<td style='width: 90px;''>"+
						 		    "<h5 style='text-align: right; font-weight: bold; margin-top: -0.5rem;'>"
						 		    +toJuta(baris.so_akhir)+
						 		    "</h5>"+
						 		    "</td>"+
						 		    "</tr>";
						}
					}
					$('#tabel-beban').append(row2);
					break;
				}
			}
		}
	});
}

function initDash() {
	 loadService('periode','GET','<?=$root_ser?>/generalDash.php?fx=getTahun');
	 loadService('data','GET','<?=$root_ser?>/generalDash.php?fx=getData');
	 loadService('tahunan','GET','<?=$root_ser?>/generalDash.php?fx=getRealisasiTahunanBen');
	 loadService('bulanan','GET','<?=$root_ser?>/generalDash.php?fx=getRealisasiBulananBen');
	 
}
initDash();
$('[data-toggle="tooltip"]').tooltip(); 
</script>