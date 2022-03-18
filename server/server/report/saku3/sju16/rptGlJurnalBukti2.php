<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlJurnalBukti extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$periode2=$tmp[3];
		$dokumen=$tmp[5];
				
		
		$AddOnLib=new server_util_AddOnLib();
		$sql="select a.no_bukti,a.tanggal,convert(varchar(20),a.tanggal,103) as tgl,a.periode,a.kode_lokasi
			from trans_m a 
			$this->filter 
			order by a.no_bukti ";
	
		$rs = $dbLib->execute($sql);
		echo "<div class='container'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$judul="BUKTI PEMBUKUAN MEMORIAL";
			if (substr($row->no_bukti,0,2)=="BT") { $judul="BUKTI PEMBUKUAN BANK TERIMA";}
			if (substr($row->no_bukti,0,2)=="BK") { $judul="BUKTI PEMBUKUAN BANK KELUAR";}
			if (substr($row->no_bukti,0,2)=="KT") { $judul="BUKTI PEMBUKUAN KAS TERIMA";}
			if (substr($row->no_bukti,0,2)=="KK") { $judul="BUKTI PEMBUKUAN KAS KELUAR";}
		
			echo "<div class='row'>
					<div class='col-md-9'><h4>PT Sarana Janesia Utama</h4></div>
					<div class='col-md-3'>
						<table class='table table-bordered '>
						<thead >
						  <tr>
							<th class='text-center'>KUG-PS-0205.1</th>
						  </tr>
						  <tr>
							<th class='text-center'>$row->no_bukti</th>
						  </tr>
						  <tr>
							<th class='text-center'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</th>
						  </tr>
						</thead>
						</table>
					</div>
				</div>";
			echo "<table class='table  table-hover'>
				<thead>
				  <tr>
					<th>No</th>
					<th>No Akun</th>
					<th>Nama Akun</th>
					<th>Keterangan</th>
					<th>No Register</th>
					<th>Debet</th>
					<th>Kredit</th>
					
				  </tr>
				</thead>
				<tbody>
				  
				";
			
			$tot_debet1=number_format($tot_debet,2,',','.');
			$tot_kredit1=number_format($tot_kredit,2,',','.');
			echo "<tr>
					<td colspan='5' class='text-right'>Total</td>
					<td class='text-right'>$tot_debet1</td>
					<td class='text-right'>$tot_kredit1</td>
				  </tr>";
			echo "</tbody>
			</table>
			<div class='row'>
				<div class='col-md-2 text-center'>Dibuat Oleh :</div>
				<div class='col-md-2 text-center'>Diperiksa Oleh :</div>
				<div class='col-md-2 text-center'>Diinput Oleh : </div>
			</div>
			<div class='row'>
				<div class='col-md-2 text-center'>Paraf & Tanggal </div>
				<div class='col-md-2 text-center'>Paraf & Tanggal </div>
				<div class='col-md-2 text-center'>Paraf & Tanggal  </div>
			</div>
			<div class='form-group'>
				&nbsp;
			</div>
			<div class='form-group'>
				&nbsp;
			</div>
			<div class='row' >
				<div class='col-md-4'><h6>Lembar ke 1 untuk Bag. Keuangan / Akuntansi </h6></div>
				<div class='col-md-4'><h6>Lembar ke 2 untuk Penerima </h6></div>
			</div>
			";
		}
		echo "</div>";
		return "";
	}
	
}
?>
