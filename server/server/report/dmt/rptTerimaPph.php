<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_dmt_rptTerimaPph extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_bukti)
from dmt_arpph_m a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ";
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
		$sql="select a.no_bukti, a.no_dokumen, a.no_bg, a.kode_akun,b.nama as nama_akun, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan,a.nilai
from dmt_arpph_m a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$i = 1;
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan penerimaan pph",$this->lokasi,$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		
			echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='11' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_bukti</td>
        </tr>
	  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	  <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Akun  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun - $row->nama_akun</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Nilai </td>
        <td class='header_laporan'>:&nbsp;".number_format($row->nilai,0,",",".")."</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Jenis</td>
    <td width='60' align='center' class='header_laporan'>Kode Akun</td>
	<td width='150' align='center' class='header_laporan'>Nama Akun Id</td>
	<td width='150' align='center' class='header_laporan'>Keterangan</td>
	<td width='90' align='center' class='header_laporan'>Debet</td>
	<td width='90' align='center' class='header_laporan'>Kredit</td>
   
  </tr>";
	$sql1="select a.jenis, a.kode_akun, b.nama as nama_akun,a.keterangan, 
       case when a.dc='D' then a.nilai else 0 end as debet,
	   case when a.dc='C' then a.nilai else 0 end as kredit 
from  dmt_kaspiutang_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_selesai='$row->no_bukti'";
	
	$rs1 = $dbLib->execute($sql1);
	$j=1;
	$debet=0;$kredit=0;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		$debet=$debet+$row1->debet;
		$kredit=$kredit+$row1->kredit;
		echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='left' class='isi_laporan'>$row1->jenis</td>
    <td align='left' class='isi_laporan'>$row1->kode_akun</td>
	<td align='left' class='isi_laporan'>$row1->nama_akun</td>
	<td align='left' class='isi_laporan'>$row1->keterangan</td>
	<td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
  </tr>";
		$j=$j+1;
	}
	
  echo " <tr>
    <td colspan='5' align='right' class='header_laporan'>Total&nbsp;</td>
    <td align='right' class='isi_laporan'>".number_format($debet,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($kredit,0,",",".")."</td>
  </tr></table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
		
		return "";
	}
	
}
?>
  
