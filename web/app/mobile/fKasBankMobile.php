<?php
	$kode_lokasi=$_SESSION['lokasi'];
    //$periode=$_SESSION['periode'];
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
				<a onClick='history.back();' style='text-decoration: none;'>
				<i class='fa fa-angle-left' aria-hidden='true' style='font-size: 3rem; color: #000000;'></i>
				<p style='font-size: 1.5rem; padding-left: 1rem; margin-left: 1.2rem; margin-top:-2.5rem; color: #000000;'>
				Cash and Bank</p>
				</a>
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
<div class="row" style="margin-top: 60px;">
	<div class="col-md-12 col-sm-12 col-xs-12">
		<p id="kasbank" style="text-align: right; padding-right: 1rem; font-size: 2.5rem; font-weight: bold;"></p>
		<div class="row">
			<div class="col-sm-12 col-md-12 col-xs-12">
				<table class="table" id="tabel-kas-bank">
			<tbody>
				
			</tbody>
		</table>
			</div>
		</div>
	</div>
</div>
<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script type="text/javascript">
	function sepNum(x){
    if (typeof x === 'undefined' || !x) { 
        return 0;
    }else{
        if(x < 0){
            var x = parseFloat(x).toFixed(2);
        }
        
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,"$1.");
        return parts.join(",");
    }
    }
function sepNum2(x){
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

function toJuta2(x) {
    var nil = x / 1000000;
    return sepNum2(nil) + " JT";
}

function loadService(index,method,url,param=null) {
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'kode_lokasi':'<?=$kode_lokasi?>', 'periode':'<?= $periode ?>'},
        success: function(response){
            if(response.status){
                switch(index){
                    case "kasbank":
                        $('#kasbank').text(toJuta2(response.kas));
                    break;
                    case "kas":
                    	var html = "";
                    	for(var a=0;a<response.kasbank.length;a++){
                    		var baris = response.kasbank[a];
                    		html += "<tr id='data'>"+
									"<td style='padding-left: 1rem; padding-right: 15rem;'><p>"+baris.nama+"</p></td>"+
									"<td style='text-align: right; padding-right: 3rem;'><p>"+numeral(baris.so_akhir).format('0,0');+"</p></td>"+
								   "</tr>";
                    	}
                    	$('#tabel-kas-bank').append(html);
                    break
                }
            }
        }
    });
}

function initDash() {
    loadService('kasbank','GET','<?=$root_ser?>/generalDash.php?fx=getKas');
    loadService('kas','GET','<?=$root_ser?>/generalDash.php?fx=getKasBank');
}
initDash();
$('[data-toggle="tooltip"]').tooltip(); 
</script>