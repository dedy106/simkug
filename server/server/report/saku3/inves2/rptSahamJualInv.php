<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptSahamJualInv extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$sql="select a.kode_lokasi,a.no_shmjual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola
from inv_shmjual_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
$this->filter order by a.no_shmjual";
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div class='container'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<div class='row'>
					<div class='col-md-12'><h3>PENJUALAN SAHAM BURSA</h3></div>
				  </div>
				  <div class='row'>
					<div class='col-md-2'>TANGGAL TRANSAKSI</div>
					<div class='col-md-10'>: $row->tanggal</div>
				  </div>
				  <div class='row'>
					<div class='col-md-2'>TANGGAL SETTLEMENT</div>
					<div class='col-md-10'>: $row->tgl_set</div>
				  </div>
				  <div class='row'>
					<div class='col-md-2'>NOMOR</div>
					<div class='col-md-10'>: $row->no_shmjual</div>
				  </div>
				  <div class='row'>
					<div class='col-md-2'>PENGELOLA</div>
					<div class='col-md-10'>: $row->nama_kelola</div>
				  </div>
				  <table class='table table-hover'>
					<thead>
					  <tr>
						<th>No</th>
						<th>Nama Saham</th>
						<th>Jumlah Saham</th>
						<th>Harga Per Saham (Rp)</th>
						<th>Jumlah Harga + Biaya Transaksi (Rp)</th>
						<th>Jumlah Pembayaran - Biaya Transaksi (Rp)</th>
						<th>Broker</th>
					  </tr>
					</thead>
					<tbody>";
					 $sql1="select a.kode_saham,a.kode_broker,b.nama as nama_saham,d.nama as nama_broker,d.nama as nama_saham,
				  a.komisi,a.vat,a.levi,a.pph,a.h_oleh,a.h_jual,a.jumlah,a.n_jual,a.n_jual+a.komisi+a.vat+a.levi as jual,
				  a.n_jual-a.komisi+a.vat+a.levi as bayar
			from inv_shmjual_d a
			inner join inv_saham b on a.kode_saham=b.kode_saham
			inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola and a.kode_plan=c.kode_plan
			inner join inv_broker d on a.kode_broker=d.kode_broker
			where a.no_shmjual='$row->no_shmjual' 
			order by a.kode_saham ";
					
					$rs1 = $dbLib->execute($sql1);
					$i=1;
					$jml_saham=0;$h_jual=0;$komisi=0;$pph=0;$levi=0;$jumlah=0;$gainlos=0;
					while ($row1 = $rs1->FetchNextObject($toupper=false))
					{
						$jumlah+=$row1->jumlah;
						$h_jual+=$row1->h_jual;
						$jual+=$row1->jual;
						$bayar+=$row1->bayar;
					  echo "<tr>
						<td>$i</td>
						<td>$row1->kode_saham ($row1->nama_saham)</td>
						<td align='right'>".number_format($row1->jumlah,0,",",".")."</td>
						<td align='right'>".number_format($row1->h_jual,2,",",".")."</td>
						<td align='right'>".number_format($row1->jual,0,",",".")."</td>
						<td align='right'>".number_format($row1->bayar,0,",",".")."</td>
						<td>$row1->nama_broker</td>
					  </tr>";
					}
					echo "</tbody>
				  </table>
				  ";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
