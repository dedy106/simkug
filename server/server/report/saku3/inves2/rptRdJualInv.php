<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptRdJualInv extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_rdjual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_rdkelola,b.nama as nama_kelola
from inv_rdjual_m a
inner join inv_rdkelola b on a.kode_rdkelola=b.kode_rdkelola
$this->filter order by a.no_rdjual";
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div class='container'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<div class='row'>
					<div class='col-md-12'><h3>PENJUALAN REKSADANA</h3></div>
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
					<div class='col-md-10'>: $row->no_rdjual</div>
				  </div>
				  <div class='row'>
					<div class='col-md-2'>PENGELOLA</div>
					<div class='col-md-10'>: $row->nama_kelola</div>
				  </div>
				  <table class='table table-hover'>
					<thead>
					  <tr>
						<th>No</th>
						<th>Nama Reksadana</th>
						<th>Jumlah Reksadana</th>
						<th>Harga Per Reksadana (Rp)</th>
						<th>Jumlah Harga + Biaya Transaksi (Rp)</th>
						<th>Jumlah Pembayaran - Biaya Transaksi (Rp)</th>
						<th>Broker</th>
					  </tr>
					</thead>
					<tbody>";
					 $sql1="select a.komisi,a.vat,a.levi,a.pph,a.h_oleh,a.h_jual,a.jumlah,a.n_jual,c.jumlah as jml_saham,
				   a.kode_rd,a.kode_rdkelola,b.nama as nama_rd,d.nama as nama_kelola,a.gainlos,
				   a.n_jual+(a.komisi+a.vat+a.levi) as jual,a.n_jual-(a.komisi+a.vat+a.levi) as bayar
			from inv_rdjual_d a
			inner join inv_rd b on a.kode_rd=b.kode_rd
			inner join inv_rd_d c on a.kode_rd=c.kode_rd 
			inner join inv_rdkelola d on a.kode_rdkelola=d.kode_rdkelola
			where a.no_rdjual='$row->no_rdjual' 
			order by a.kode_rd ";
					
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
						<td>$row1->nama_rd</td>
						<td align='right'>".number_format($row1->jumlah,0,",",".")."</td>
						<td align='right'>".number_format($row1->h_jual,2,",",".")."</td>
						<td align='right'>".number_format($row1->jual,0,",",".")."</td>
						<td align='right'>".number_format($row1->bayar,0,",",".")."</td>
						<td>$row1->nama_kelola</td>
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
