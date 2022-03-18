<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptReimburse extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(*)
from gr_kes_m a
inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
 $this->filter ";
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
		$sql="select a.kode_lokasi,a.nik_buat,b.nama,a.no_kes,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,date_format(a.tgl_kuitansi,'%d/%m/%Y') as tgl_kuitansi,
		date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,date_format(a.tgl_transfer,'%d/%m/%Y') as tgl_transfer,datediff (day,a.tgl_terima,a.tgl_transfer) as lama
from gr_kes_m a
inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
 $this->filter order by a.no_kes ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan reimburse dan bantuan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='7' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Reimburse </td>
        <td class='header_laporan'>:&nbsp;$row->no_kes</td>
        </tr>
	    <tr>
          <td class='header_laporan'>Tanggal</td>
          <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Pembuat</td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat - $row->nama</td>
      </tr>
	  <tr>
	    <td class='header_laporan'>Tanggal Kuitansi </td>
	    <td class='header_laporan'>:&nbsp;$row->tgl_kuitansi</td>
	    </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	  <tr>
	    <td class='header_laporan'>Tanggal Terima </td>
	    <td class='header_laporan'>:&nbsp;$row->tgl_terima</td>
	    </tr>
	  <tr>
	    <td class='header_laporan'>Tanggal Transfer</td>
	    <td class='header_laporan'>:&nbsp;$row->tgl_transfer</td>
	    </tr>
	  <tr>
	    <td class='header_laporan'>Lama Proses </td>
	    <td class='header_laporan'>: $row->lama </td>
	    </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='50' align='center' class='header_laporan'>Jenis</td>
	<td width='300' align='center' class='header_laporan'>Keterangan</td>
	<td width='100' align='center' class='header_laporan'>Nilai Pemakaian</td>
    
  </tr>
";
		
	  $sql1="select a.kode_jenis,b.nama as nama_jenis,a.nilai,a.saldo 
from gr_kes_d a
inner join gr_kes_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi
where a.no_kes='$row->no_kes' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_kes ";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='left' class='isi_laporan'>$row1->kode_jenis</td>
	<td align='left' class='isi_laporan'>$row1->nama_jenis</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai)."</td>
     
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
