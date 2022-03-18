<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_fa_rptFawoAju extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_wo)
from fawo_m a $this->filter ";
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
		
		
		$sql="select a.no_wo,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan
from fawo_m a $this->filter
order by a.no_wo";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pengajuan write off",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_wo</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	   
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>No FA</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='90' align='center' class='header_laporan'>Nilai Perolehan</td>
	 <td width='90' align='center' class='header_laporan'>Nilai Akumulasi</td>
    <td width='90' align='center' class='header_laporan'>Nilai Buku</td>
  
	
  </tr>";
			$sql1="select a.no_fa,a.nilai,a.nilai_ap,a.nilai_buku,b.nama,date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan
from fawo_d a                     
inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
where a.no_wo='$row->no_wo' ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai_ap=0; $nilai=0; $nilai_buku=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai_ap=$nilai_ap+$row1->nilai_ap;
				$nilai=$nilai+$row1->nilai;
				$nilai_buku=$nilai_buku+$row1->nilai_buku;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->no_fa</td>
    <td class='isi_laporan'>$row1->tgl_perolehan</td>
	<td class='isi_laporan'>$row1->nama</td>
     <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai_ap,0,",",".")."</td>
	  <td align='right' class='isi_laporan'>".number_format($row1->nilai_buku,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='4' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($nilai_ap,0,",",".")."</td>
	<td align='right' class='header_laporan'>".number_format($nilai_buku,0,",",".")."</td>
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
