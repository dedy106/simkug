<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_barang_rptPesan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		
		$sql="select 1";
		
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
		$sql="select a.no_pesan,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp,
		e.nama as nama_lokasi,a.lok_proses,a.maksud,a.aspek,a.kode_proyek,c.nama as nama_proyek
		from log_pesan_m a 
	 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
		inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi
		inner join lokasi e on a.lok_proses=e.kode_lokasi 
$this->filter
order by a.no_pesan";
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("justifikasi kebutuhan",$this->lokasi," ");

		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
			echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td>
			<table border='0' cellspacing='2' cellpadding='1'>
			  
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				 
				  <tr>
					<td width='100' class='header_laporan'>No Bukti </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_pesan</td>
					</tr>
				  <tr>
					<td width='100' class='header_laporan'>Tanggal </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->tanggal</td>
					</tr>
				  <tr>
					<td width='100' class='header_laporan'>PP </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->nama_pp</td>
					</tr>

					<tr>
					<td class='header_laporan'>No Dokumen</td>
					<td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
					</tr>
				 
					<tr>
					<td class='header_laporan'>Nama Proyek </td>
					<td class='header_laporan'>:&nbsp;$row->kode_proyek -&nbsp; $row->nama_proyek</td>
					</tr>	
					
					<tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:&nbsp;$row->keterangan</td>
					</tr>
					<tr>
					
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='15' align='center' class='header_laporan'>No</td>
				<td width='200' align='center' class='header_laporan'>Item Barang</td>
					<td width='100' align='center' class='header_laporan'>Merk</td>
					<td width='100' align='center' class='header_laporan'>Tipe</td>
					<td width='200' align='center' class='header_laporan'>Catatan</td>
					<td width='90' align='center' class='header_laporan'>Nilai</td>
					<td width='90' align='center' class='header_laporan'>Jumlah</td>
					<td width='90' align='center' class='header_laporan'>Total</td>
							</tr>";
				$sql1="select a.item,a.merk,a.tipe,a.catatan,a.nilai,a.jumlah,a.harga,a.nilai*a.jumlah as total 
				from log_pesan_d a
				where a.no_pesan='$row->no_pesan' ";

				$rs1 = $dbLib->execute($sql1);
				$j=1;$jumlah=0; $nilai=0; $total=0; 
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$jumlah+=$row1->jumlah;
					$nilai+=$row1->nilai;
					$total+=$row1->total;
					echo "<tr>
			<td align='center' class='isi_laporan'>$j</td>
			<td  class='isi_laporan'>$row1->item</td>
			<td class='isi_laporan'>$row1->merk</td>
		<td class='isi_laporan'>$row1->tipe</td>
			<td  class='isi_laporan'>$row1->catatan</td>
			<td  class='isi_laporan'>$row1->jumlah</td>
			<td  class='isi_laporan'>$row1->nilai</td>
			<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
		</tr>";		
					$j=$j+1;
				}
				echo "
  
</table></td>
	</tr>
	<tr>
	<td height='40'>&nbsp;</td>
</tr>
  
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
