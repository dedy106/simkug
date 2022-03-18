<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRdClosing extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
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
		$nik_user=$tmp[2];
		$sql="exec sp_rdharga_lap '$periode','$nik_user'";
		
		$rs = $dbLib->execute($sql);	
		
		
		$sql="select a.kode_rd,b.nama,a.tgl1, a.tgl2, a.tgl3, a.tgl4, a.tgl5, a.tgl6, a.tgl7, a.tgl8, a.tgl9, a.tgl10, 
			   a.tgl11, a.tgl12, a.tgl13, a.tgl14, a.tgl15, a.tgl16, a.tgl17, a.tgl18, a.tgl19, a.tgl20, 
			   a.tgl21, a.tgl22, tgl23, a.tgl24, a.tgl25, a.tgl26, a.tgl27, a.tgl28, a.tgl29, a.tgl30, a.tgl31
		from inv_rdharga_lap a
		inner join inv_rd b on a.kode_rd=b.kode_rd
		where a.nik_user='$nik_user'
		order by a.nu";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laparan closing reksadana",$this->lokasi,"Periode $periode");
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' width='30'>No</td>
    <td align='center' class='header_laporan' width='60'>Kode  </td>
    <td align='center' class='header_laporan' width='200'>Nama Reksadana</td>
	<td width='90' align='center' class='header_laporan'>Tgl 1</td>
    <td width='90' align='center' class='header_laporan'>Tgl 2</td>
	<td width='90' align='center' class='header_laporan'>Tgl 3</td>
	<td width='90' align='center' class='header_laporan'>Tgl 4</td>
	<td width='90' align='center' class='header_laporan'>Tgl 5</td>
	<td width='90' align='center' class='header_laporan'>Tgl 6</td>
	<td width='90' align='center' class='header_laporan'>Tgl 7</td>
	<td width='90' align='center' class='header_laporan'>Tgl 8</td>
	<td width='90' align='center' class='header_laporan'>Tgl 9</td>
	<td width='90' align='center' class='header_laporan'>Tgl 10</td>
	<td width='90' align='center' class='header_laporan'>Tgl 11</td>
	<td width='90' align='center' class='header_laporan'>Tgl 12</td>
	<td width='90' align='center' class='header_laporan'>Tgl 13</td>
	<td width='90' align='center' class='header_laporan'>Tgl 14</td>
	<td width='90' align='center' class='header_laporan'>Tgl 15</td>
	<td width='90' align='center' class='header_laporan'>Tgl 16</td>
	<td width='90' align='center' class='header_laporan'>Tgl 17</td>
	<td width='90' align='center' class='header_laporan'>Tgl 18</td>
	<td width='90' align='center' class='header_laporan'>Tgl 19</td>
	<td width='90' align='center' class='header_laporan'>Tgl 20</td>
	<td width='90' align='center' class='header_laporan'>Tgl 21</td>
    <td width='90' align='center' class='header_laporan'>Tgl 22</td>
	<td width='90' align='center' class='header_laporan'>Tgl 23</td>
	<td width='90' align='center' class='header_laporan'>Tgl 24</td>
	<td width='90' align='center' class='header_laporan'>Tgl 25</td>
	<td width='90' align='center' class='header_laporan'>Tgl 26</td>
	<td width='90' align='center' class='header_laporan'>Tgl 27</td>
	<td width='90' align='center' class='header_laporan'>Tgl 28</td>
	<td width='90' align='center' class='header_laporan'>Tgl 29</td>
	<td width='90' align='center' class='header_laporan'>Tgl 30</td>
	<td width='90' align='center' class='header_laporan'>Tgl 31</td>
    </tr>
  
 ";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_rd</td>
	 <td class='isi_laporan'>$row->nama</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl1,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl2,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl3,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl4,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl5,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl6,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl7,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl8,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl9,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl12,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->tgl3,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl14,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl15,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl16,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl17,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl18,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl19,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl20,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl21,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl22,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl23,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl24,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl25,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl26,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl27,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl28,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl29,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl30,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tgl31,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
