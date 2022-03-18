<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kantin_rptBast extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
		$sql="select a.no_ba,a.kode_lokasi,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl 
from kt_ba_m a
$this->filter
order by a.no_ba ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("berita acara voucher",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>No Bukti</td>
        <td width='380' class='header_laporan'>: $row->no_ba </td>
      </tr>
     
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tgl </td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>No</td>
        <td width='150' class='header_laporan'>No Voucher </td>
		<td width='60' class='header_laporan'>Tgl Awal</td>
        <td width='60' class='header_laporan'>Tgl Akhir</td>
		<td width='90' class='header_laporan'>Harga</td>
        </tr>";
	  $sql1="select a.no_kupon,date_format(a.tgl_awal,'%d/%m/%Y') as tgl_awal,date_format(a.tgl_akhir,'%d/%m/%Y') as tgl_akhir,a.harga
from kt_kupon_d a 
where a.no_flag='$row->no_ba'
order by a.no_kupon";
	  
	  $rs1 = $dbLib->execute($sql1);
	  $harga=0;
	  $i=1;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$harga+=$row1->harga;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->no_kupon</td>
		<td class='isi_laporan'>$row1->tgl_awal</td>
        <td class='isi_laporan'>$row1->tgl_akhir</td>
        <td align='right' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
        
      </tr>";
			$i+=1;
	  }
	 
      echo "<tr>
        <td colspan='4' align='right' class='isi_laporan'>Total</td>
		<td align='right' class='isi_laporan'>".number_format($harga,0,",",".")."</td>
        </tr>";
       
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
