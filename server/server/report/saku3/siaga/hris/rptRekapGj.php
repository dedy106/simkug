<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptRekapGj extends server_report_basic
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
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select  c.no_gaji,a.nik,a.nama,a.kode_lokasi,a.kode_so,b.nama as so,c.gdas,c.tpos,c.tsus,c.rem,c.lmbr,c.rapll,
		sum(c.gdas+c.tpos+c.tsus+c.rem+c.lmbr+c.rapll) as pdpt,c.ik,c.pot,c.pa,sum(c.ik+c.pot+c.pa) as ptg   
		from gr_karyawan a
		inner join gr_so b on a.kode_so=b.kode_so and a.kode_lokasi=b.kode_lokasi
		left join gr_gaji_load c on a.nik=c.nik and a.kode_lokasi=b.kode_lokasi
		$this->filter
		group by a.nik,a.nama,a.kode_lokasi,a.kode_so,b.nama,c.gdas,c.tpos,c.tsus,c.rem,c.lmbr,c.rapll,c.ik,c.pot,c.pa,c.no_gaji ";
		echo $sql;

		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap gaji",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='100' align='center' class='header_laporan'>NIK</td>
		<td width='150' align='center' class='header_laporan'>NAMA</td>
		<td width='80' align='center' class='header_laporan'>JABATAN</td>
		<td width='50' align='center' class='header_laporan'>GADAS</td>
		<td width='80' align='center' class='header_laporan'>KONJUNGTUR</td>
	    <td width='100' align='center' class='header_laporan'>TUNJANGAN JABATAN</td>
		<td width='80' align='center' class='header_laporan'>REMUNERASI</td>
		<td width='80' align='center' class='header_laporan'>TUNJANGAN KHUSUS</td>
		<td width='80' align='center' class='header_laporan'>LEMBUR</td>
	    <td width='100' align='center' class='header_laporan'>RAPEL</td>
		<td width='80' align='center' class='header_laporan'>TOTAL PENDAPATAN</td>
		<td width='80' align='center' class='header_laporan'>IURAN KOPERASI</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN KOPERASI</td>
		<td width='80' align='center' class='header_laporan'>POTONGAN ASURANSI</td>
	    <td width='100' align='center' class='header_laporan'>TOTAL POTONGAN</td>
		<td width='80' align='center' class='header_laporan'>TOTAL TRANSFER</td>

   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->pdpt + $row->ptg;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->nik</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->so</td>
			<td class='isi_laporan'>".number_format($row->gdas,0,",",".")."</td>
			<td class='isi_laporan'></td>
			<td class='isi_laporan'>".number_format($row->tpos,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->rem,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->tsus,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->lmbr,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->rapll,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->pdpt,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->ik,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->pot,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->pa,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($row->ptg,0,",",".")."</td>
			<td class='isi_laporan'>".number_format($total,0,",",".")."</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
