<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_belajar_rptPbyr extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_bayar) as jum from dev_bayar_m a $this->filter ";
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
		$sql="select a.no_bayar,a.kode_lokasi,convert(varchar,a.tanggal,103) as tanggal,a.nim,a.keterangan,d.nama,a.periode
			from dev_bayar_m a
			inner join dev_siswa d on a.nim = d.nim
			$this->filter
			order by a.no_bayar";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		
		$AddOnLib=new server_util_AddOnLib();

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellspacing='2' cellpadding='1' width='500'>
			  <tr>
				<td align='center' class='header_laporan'>LAPORAN PEMBAYARAN </td>
			  </tr>
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td width='120' class='header_laporan'>NIM </td>
					<td width='380' class='header_laporan'>:&nbsp;$row->nim - $row->nama</td>
				  </tr>
				  <tr>
					<td width='120' class='header_laporan'>No Pembayaran </td>
					<td width='380' class='header_laporan'>:&nbsp;$row->no_bayar</td>
				  </tr>
				  <tr>
					<td class='header_laporan'>Tanggal</td>
					<td class='header_laporan'>:&nbsp;$row->tanggal</td>
				  </tr>
				  <tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:&nbsp;$row->keterangan</td>
				  </tr>
				</table></td>
			  </tr>
			  <tr>
				<td ><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='30' class='header_laporan'><div align='center'>No</div></td>
				<td width='70' class='header_laporan'><div align='center'>No Tagihan</div></td>
				<td width='300' class='header_laporan'><div align='center'>Keterangan Tagihan</div></td>
				<td width='100' class='header_laporan'><div align='center'>Nilai Bayar</div></td>
			  </tr>";
	  $sql1="select a.no_tagihan,b.keterangan,a.nilai  
			from dev_bayar_d a
			inner join dev_tagihan_m b on a.no_tagihan=b.no_tagihan and a.kode_lokasi=b.kode_lokasi
			where a.no_bayar='$row->no_bayar' and a.kode_lokasi='$row->kode_lokasi'
			order by a.no_bayar ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$total =0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row1->nilai,0,',','.');
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->no_tagihan</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='right'>$nilai</td>
			  </tr>";
				$i=$i+1;
				$total+=+$row1->nilai;
		}
		$total=number_format($total,0,',','.');
	  echo "<tr>
			<td colspan='3' class='header_laporan' align='right'>Total</td>
			<td class='isi_laporan' align='right'>$total</td>
  			</tr>
		</table></td>
  		</tr>
	 </table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
