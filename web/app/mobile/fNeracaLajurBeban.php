<?php
$path = "http://".$_SERVER["SERVER_NAME"]."/";	
$icon_back = $path."image/icon_back.png";
$icon_close = $path."image/icon_close.png";
$kode_lokasi=$_SESSION['lokasi'];
$periode=$_SESSION['periode'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_fs=$_SESSION['kode_fs'];
$res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
$periode = $res->fields[0];
?>
<div class="row">
	<div class="col-md-12">
<div class="panel">
	<div class="panel-heading">
		<div class="pull-right navigasi" style="margin-right: -1rem; margin-top: ; padding-bottom: 1rem;">
		<span id="back_btn" style='cursor:pointer'><img src="<?=$icon_back?>" width="25px"></span>
		<span id="close_btn"style='cursor:pointer'><img src="<?=$icon_close?>" width="25px"></span>
		</div>
		<h3 class="text-left" style="font-weight: bold">Laporan Neraca Lajur (Beban)</h3>
		<h5 class="text-right" style="margin-top: -2.8rem;">Lokasi : 32 &nbsp;&nbsp;<?php echo $periode; ?></h5>
	</div>
	<hr/>
	<div class="panel-body">
		<center><h4 style="font-weight: bold; margin-top: -2rem;">Nama Perusahaan</h4></center>
		<center><h4 style="font-weight: bold; color: #000000;">Neraca Lajur Beban</h4></center>
		<center><h6 style="font-weight: bold; color: #000000;">Periode <?php echo $periode; ?></h6></center>

		<table class="table table-bordered" id="tableNrcSaldo">
			<thead style="color: #ffffff; background-color: #247ed5;">
				<tr>
					<th rowspan="2" style="text-align: center; vertical-align:middle;width:5%">No</th>
					<th rowspan="2" style="text-align: center; vertical-align:middle;width:10%">Kode Akun</th>
					<th rowspan="2" style="text-align: center; vertical-align:middle;width:25%">Nama Akun</th>
					<th colspan="2" style="text-align: center; vertical-align:middle;width:20%">Saldo Awal</th>
					<th colspan="2" style="text-align: center; vertical-align:middle;width:20%">Mutasi</th>
					<th colspan="2" style="text-align: center; vertical-align:middle;width:20%">Saldo Akhir</th>
				</tr>
				<tr>
					<th style="text-align: center;width:10% ">Debet</th>
					<th style="text-align: center;width:10% ">Kredit</th>
					<th style="text-align: center;width:10% ">Debet</th>
					<th style="text-align: center;width:10% ">Kredit</th>
					<th style="text-align: center;width:10% ">Debet</th>
					<th style="text-align: center;width:10% ">Kredit</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>
</div>
</div>
<script>
$('.navigasi').on('click','#close_btn',function(){
	// alert("test");
	window.history.go(-1); return false;
});
$('.navigasi').on('click','#back_btn',function(){
	// alert("test");
	window.history.go(-1); return false;
});

function sepNumPas(x){
    var num = parseInt(x);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}

function loadService(index,method,url,param=null){
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>','param':param},
        success:function(result){    
            if(result.status){
                switch(index){
                    case "getNeracaSaldo" :
						var html="";
						var no=1;
						var so_awal_debet=0;
						var so_awal_kredit=0;
						var debet=0;
						var kredit=0;
						var so_akhir_debet=0;
						var so_akhir_kredit=0;
                        for(var i=0;i<result.daftar.length;i++){
							var line=result.daftar[i];
							so_awal_debet=so_awal_debet+parseInt(line.so_awal_debet);
                            so_awal_kredit=so_awal_kredit+parseInt(line.so_awal_kredit);
							debet=debet+parseInt(line.debet);
							kredit=kredit+parseInt(line.kredit);
							so_akhir_debet=so_akhir_debet + parseInt(line.so_akhir_debet);
							so_akhir_kredit=so_akhir_kredit + parseInt(line.so_akhir_kredit);
							html += `<tr>
								<td style="text-align: center;">`+no+`</td>
								<td style="text-align: center;">`+line.kode_akun+`</td>
								<td style="text-align: left;">`+line.nama+`</td>
								<td style="text-align: right;">`+sepNumPas(line.so_awal_debet)+`</td>
								<td style="text-align: right;">`+sepNumPas(line.so_awal_kredit)+`</td>
								<td style="text-align: right;">`+sepNumPas(line.debet)+`</td>
								<td style="text-align: right;">`+sepNumPas(line.kredit)+`</td>
								<td style="text-align: right;">`+sepNumPas(line.so_akhir_debet)+`</td>
								<td style="text-align: right;">`+sepNumPas(line.so_akhir_kredit)+`</td>	
							</tr>`;
							no++;
						}
						html +=`<tr>
							<td style="text-align: right; font-weight: bold;" colspan="3">Total</td>
							<td style="text-align: right; font-weight: bold">`+sepNumPas(so_awal_debet)+`</td>
							<td style="text-align: right; font-weight: bold">`+sepNumPas(so_awal_kredit)+`</td>
							<td style="text-align: right; font-weight: bold">`+sepNumPas(debet)+`</td>
							<td style="text-align: right; font-weight: bold">`+sepNumPas(kredit)+`</td>
							<td style="text-align: right; font-weight: bold">`+sepNumPas(so_akhir_debet)+`</td>
							<td style="text-align: right; font-weight: bold">`+sepNumPas(so_akhir_kredit)+`</td>
						</tr>`;
                        $('#tableNrcSaldo tbody').append(html);
                    break;
                }
            }
        }
    });
}

function initDash(){
    loadService('getNeracaSaldo','GET','<?=$root_ser?>/generalDash.php?fx=getNeracaSaldo','Beban');
}

initDash();

</script>