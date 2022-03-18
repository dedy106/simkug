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
				<a onClick='history.back();' style='text-decoration: none;'>
				<i class='fa fa-angle-left' aria-hidden='true' style='font-size: 3rem; color: #000000;'></i>
				<p style='font-weight: bold; font-size: 1.5rem; padding-left: 1rem; margin-left: 1.2rem; margin-top:-2.5rem; color: #000000;'>
				CashIn - CashOut</p>
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
	<div class="col-md-12 col-xs-12 col-sm-12">
		<h4 style="padding-left: 1rem;">Arus Kas</h4>
		<select id="periode" name="periode" class="form-control" style="width: 36rem; border-top: none; border-left: none; border-right: none; margin-left: 1rem;">
			
		</select>
	</div>
</div>
<div class="row" style="margin-top: 10px;">
	<div class="col-md-6 col-xs-6 col-sm-6">
		<div class="panel" style="border-radius: 1.5rem; box-shadow: 0.5rem 0.5rem 1rem #eaeaea; margin-left: 1rem;">
		<div class="card">
          <div class="card-body">
          		<center><h3 class="font-weight-light" style="color: #000000; font-size: 1.3rem; padding: 0 2rem 0 2rem;">Kas Masuk</h3></center>
          		<center><h2 id="kasmasuk" class="font-weight-bold" style="margin-top: -1rem; color: #000000;"></h2></center>
          	</div>
         </div>
        </div>
	</div>
	<div class="col-sm-6 col-xs-6 col-md-6">
		<div class="panel" style="border-radius: 1.5rem; box-shadow: 0.5rem 0.5rem 1rem #eaeaea; margin-right: 1rem;">
		<div class="card">
          <div class="card-body">
          		<center><h3 class="font-weight-light" style="color: #000000; font-size: 1.3rem; padding: 0 2rem 0 2rem;">Kas Keluar</h3></center>
          		<center><h2 id="kaskeluar" class="font-weight-bold" style="margin-top: -1rem; color: #000000;"></h2></center>
          	</div>
         </div>
        </div>
	</div>
</div>
<div class="row">
	<p style="padding-left: 2.5rem; font-size: 1.5rem; font-weight: bold;">Operasional</p>
	<p style="padding-left: 2.5rem; font-size: 1.4rem; font-style: italic; margin-top: -1.1rem;">Penambah</p>
	<table style="margin-top: -1.5rem;" class="table" id="operasional-tambah">
		<tbody id="data-operasional-tambah">
			
		</tbody>
	</table>
	<p style="padding-left: 2.5rem; font-size: 1.4rem; font-style: italic; margin-top: -1.1rem;">Pengurang</p>
	<table style="margin-top: -1.5rem;" class="table" id="operasional-kurang">
		<tbody id="data-operasional-kurang">
			
		</tbody>
	</table>
	<p style="padding-left: 2.5rem; font-size: 1.5rem; font-weight: bold;">Investasi</p>
	<p style="padding-left: 2.5rem; font-size: 1.4rem; font-style: italic; margin-top: -1.1rem;">Penambah</p>
	<table style="margin-top: -1.5rem;" class="table" id="investasi-tambah">
		<tbody id="data-investasi-tambah">
			
		</tbody>
	</table>
	<p style="padding-left: 2.5rem; font-size: 1.4rem; font-style: italic; margin-top: -1.1rem;">Pengurang</p>
	<table style="margin-top: -1.5rem;" class="table" id="investasi-kurang">
		<tbody id="data-investasi-kurang">
			
		</tbody>
	</table>
	<p style="padding-left: 2.5rem; font-size: 1.5rem; font-weight: bold;">Pendanaan</p>
	<p style="padding-left: 2.5rem; font-size: 1.4rem; font-style: italic; margin-top: -1.1rem;">Penambah</p>
	<table style="margin-top: -1.5rem;" class="table" id="pendanaan-tambah">
		<tbody id="data-pendanaan-tambah">
			
		</tbody>
	</table>
	<p style="padding-left: 2.5rem; font-size: 1.4rem; font-style: italic; margin-top: -1.1rem;">Pengurang</p>
	<table style="margin-top: -1.5rem;" class="table" id="pendanaan-kurang">
		<tbody id="data-pendanaan-kurang">
			
		</tbody>
	</table>
</div>


	<!--$(document).ready(function(){
		
		$('#periode').on('change', function(){
			var periode = $('#periode').val();
			$.ajax({
				type: 'POST',
				url: 'include_lib.php?hal=server/belajar/FungsiArusKas.php&fx=selectDataArusKas',
				data: {'periode':periode},
				dataType: 'json',
				success: function(response){
					console.log(response);
					$('table#operasional-tambah tr.data-operasional-tambah').remove();
					$('table#operasional-kurang tr.data-operasional-kurang').remove();
					$('table#operasional-tambah tr#operasional-tambah-total').remove();
					$('table#operasional-kurang tr#operasional-kurang-total').remove();
					$('table#investasi-tambah tr.data-investasi-tambah').remove();
					$('table#investasi-kurang tr.data-investasi-kurang').remove();
					$('table#investasi-tambah tr#investasi-tambah-total').remove();
					$('table#investasi-kurang tr#investasi-kurang-total').remove();
					$('table#pendanaan-tambah tr.data-pendanaan-tambah').remove();
					$('table#pendanaan-kurang tr.data-pendanaan-kurang').remove();
					$('table#pendanaan-tambah tr#pendanaan-tambah-total').remove();
					$('table#pendanaan-kurang tr#pendanaan-kurang-total').remove();

					$('#kasmasuk').text(numeral(response.kasmasuk).format('0,0'));
					$('#kaskeluar').text(numeral(response.kaskeluar).format('0,0'));-->

<script type="text/javascript">
$(document).ready(function(){
	$('#periode').on('change', function(){
		var per = $('#periode').val();
		$.ajax({
			type: 'GET',
			url: '<?=$root_ser?>/generalDash.php?fx=getArusKas',
			data: {'kode_lokasi':'<?=$kode_lokasi?>','periode':'<?=$periode?>', 'per':per},
			success: function(response){
				console.log(response);
				if(response.status){
				$('table#operasional-tambah tr.data-operasional-tambah').remove();
				$('table#operasional-kurang tr.data-operasional-kurang').remove();
				$('table#operasional-tambah tr#operasional-tambah-total').remove();
				$('table#operasional-kurang tr#operasional-kurang-total').remove();
				$('table#investasi-tambah tr.data-investasi-tambah').remove();
				$('table#investasi-kurang tr.data-investasi-kurang').remove();
				$('table#investasi-tambah tr#investasi-tambah-total').remove();
				$('table#investasi-kurang tr#investasi-kurang-total').remove();
				$('table#pendanaan-tambah tr.data-pendanaan-tambah').remove();
				$('table#pendanaan-kurang tr.data-pendanaan-kurang').remove();
				$('table#pendanaan-tambah tr#pendanaan-tambah-total').remove();
				$('table#pendanaan-kurang tr#pendanaan-kurang-total').remove();

				$('#kasmasuk').text(toJuta(response.penerimaan));
				$('#kaskeluar').text(toJuta(response.pengeluaran));
				var row_op_t = "";
						 var row_opt_t = "";
					for(var a=0;a<response.opr_penambah.length;a++){
					var opt = response.opr_penambah[a];

					row_op_t += "<tr class='data-operasional-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								opt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem; width: 100px;'>"+
								toJuta(opt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_opt_t += "<tr id='operasional-tambah-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.opr_penambah_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-operasional-tambah').append(row_op_t);
					$('#data-operasional-tambah').append(row_opt_t);

				var row_op_k = "";
				var row_opt_k = "";
				for(var b=0;b<response.opr_pengurang.length;b++){
					var opk = response.opr_pengurang[b];

					row_op_k += "<tr class='data-operasional-kurang'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								opk.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(opk.nilai)+
								"</td>"+
								"</tr>";
				}
					row_opt_k += "<tr id='operasional-kurang-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.opr_pengurang_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-operasional-kurang').append(row_op_k);
					$('#data-operasional-kurang').append(row_opt_k);

				var row_iv_t = "";
				var row_ivt_t = "";
				for(var c=0;c<response.inv_penambah.length;c++){
					var ivt = response.inv_penambah[c];

					row_iv_t += "<tr class='data-investasi-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								ivt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(ivt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_ivt_t += "<tr id='investasi-tambah-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.inv_penambah_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-investasi-tambah').append(row_iv_t);
					$('#data-investasi-tambah').append(row_ivt_t);

				var row_iv_k = "";
				var row_ivk_t = "";
				for(var d=0;d<response.inv_pengurang.length;d++){
					var ivk = response.inv_pegurang[d];

					row_iv_k += "<tr class='data-investasi-kurang'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								ivk.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(ivk.nilai)+
								"</td>"+
								"</tr>";
				}
					row_ivk_t += "<tr id='investasi-kurang-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.inv_pengurang_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-investasi-kurang').append(row_iv_k);
					$('#data-investasi-kurang').append(row_ivk_t);

				var row_pd_t = "";
				var row_pdt_t = "";
				for(var e=0;e<response.pdn_penambah.length;e++){
					var pdt = response.pdn_penambah[e];

					row_pd_t += "<tr class='data-pendanaan-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								pdt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(pdt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_pdt_t += "<tr id='pendanaan-tambah-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.pdn_penambah_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-pendanaan-tambah').append(row_pd_t);
					$('#data-pendanaan-tambah').append(row_pdt_t);

				var row_pd_k = "";
				var row_pdk_t = "";
				for(var f=0;f<response.pdn_pengurang.length;f++){
					var pdk = response.pdn_pengurang[f];

					row_pd_k += "<tr class='data-pendanaan-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								pdt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(pdt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_pdk_t += "<tr id='pendanaan-kurang-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.pdn_pengurang_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-pendanaan-kurang').append(row_pd_k);
					$('#data-pendanaan-kurang').append(row_pdk_t);

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

/*String.prototype.InsertAt=function(CharToInsert,Position){
     return this.slice(0,Position) + CharToInsert + this.slice(Position)
}*/

function loadService(index,method,url,param=null) {
	$.ajax({
		type: method,
		url: url,
		dataType: 'json',
		data: {'kode_lokasi':'<?=$kode_lokasi?>','periode':'<?=$periode?>'},
		success: function(response) {
			if(response.status) {
				switch(index){
					case "kas-masuk":
					$('#kasmasuk').text(toJuta(response.penerimaan));
					break;
					case "kas-keluar":
					$('#kaskeluar').text(toJuta(response.pengeluaran));
					break;
					case "periode":
						var option1 = "<option value=''>Periode (mm/yyyy)</option>";
						var option  = "";
						for(var a=0;a<response.periode_value.length;a++){
							var row1    = response.periode_value[a];
							var bln     = response.bulan[a];
							//var periode = row1.periode.InsertAt('/',4);
							var month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
	
							option += "<option value="+row1.periode+">"+month[bln]+"/"+row1.tahun+"</option>";
						}
						$('#periode').append(option1);
						$('#periode').append(option);
						break;
					case "aruskas":
						 var row_op_t = "";
						 var row_opt_t = "";
					for(var a=0;a<response.opr_penambah.length;a++){
					var opt = response.opr_penambah[a];

					row_op_t += "<tr class='data-operasional-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								opt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem; width: 100px;'>"+
								toJuta(opt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_opt_t += "<tr id='operasional-tambah-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.opr_penambah_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-operasional-tambah').append(row_op_t);
					$('#data-operasional-tambah').append(row_opt_t);

				var row_op_k = "";
				var row_opt_k = "";
				for(var b=0;b<response.opr_pengurang.length;b++){
					var opk = response.opr_pengurang[b];

					row_op_k += "<tr class='data-operasional-kurang'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								opk.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(opk.nilai)+
								"</td>"+
								"</tr>";
				}
					row_opt_k += "<tr id='operasional-kurang-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.opr_pengurang_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-operasional-kurang').append(row_op_k);
					$('#data-operasional-kurang').append(row_opt_k);

				var row_iv_t = "";
				var row_ivt_t = "";
				for(var c=0;c<response.inv_penambah.length;c++){
					var ivt = response.inv_penambah[c];

					row_iv_t += "<tr class='data-investasi-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								ivt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(ivt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_ivt_t += "<tr id='investasi-tambah-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.inv_penambah_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-investasi-tambah').append(row_iv_t);
					$('#data-investasi-tambah').append(row_ivt_t);

				var row_iv_k = "";
				var row_ivk_t = "";
				for(var d=0;d<response.inv_pengurang.length;d++){
					var ivk = response.inv_pegurang[d];

					row_iv_k += "<tr class='data-investasi-kurang'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								ivk.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(ivk.nilai)+
								"</td>"+
								"</tr>";
				}
					row_ivk_t += "<tr id='investasi-kurang-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.inv_pengurang_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-investasi-kurang').append(row_iv_k);
					$('#data-investasi-kurang').append(row_ivk_t);

				var row_pd_t = "";
				var row_pdt_t = "";
				for(var e=0;e<response.pdn_penambah.length;e++){
					var pdt = response.pdn_penambah[e];

					row_pd_t += "<tr class='data-pendanaan-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								pdt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(pdt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_pdt_t += "<tr id='pendanaan-tambah-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.pdn_penambah_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-pendanaan-tambah').append(row_pd_t);
					$('#data-pendanaan-tambah').append(row_pdt_t);

				var row_pd_k = "";
				var row_pdk_t = "";
				for(var f=0;f<response.pdn_pengurang.length;f++){
					var pdk = response.pdn_pengurang[f];

					row_pd_k += "<tr class='data-pendanaan-tambah'>"+
								"<td style='border: none; padding-left: 2rem; width: 2rem;'>"+
								"</td>"+
								"<td style='font-size: 1.5rem; border: none;'>"+
								pdt.nama+
								"</td>"+
								"<td style='border: none; text-align: right; padding-right: 3rem;'>"+
								toJuta(pdt.nilai)+
								"</td>"+
								"</tr>";
				}
					row_pdk_t += "<tr id='pendanaan-kurang-total'>"+
								 "<td style='border: none;'></td>"+
								 "<td style='border: none;'></td>"+
								 "<td style='text-align: right; border-top: 1px solid black; padding-right: 3rem;'>"+
								 toJuta(response.pdn_pengurang_tot)+
								 "</td>"+
								 "</tr>";
					$('#data-pendanaan-kurang').append(row_pd_k);
					$('#data-pendanaan-kurang').append(row_pdk_t);
					break;
				}
			}
		}
	});
}

function initDash() {
	 loadService('periode','GET','<?=$root_ser?>/generalDash.php?fx=getTahun');
	 loadService('aruskas','GET','<?=$root_ser?>/generalDash.php?fx=getArusKas');
	 loadService('kas-masuk','GET','<?=$root_ser?>/generalDash.php?fx=getArusKas');
	 loadService('kas-keluar','GET','<?=$root_ser?>/generalDash.php?fx=getArusKas');
}
initDash();
$('[data-toggle="tooltip"]').tooltip(); 
</script>