<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_fa_rptFaJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_fasusut) 
from fasusut_j a  
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $filter $modul
order by a.periode,a.no_fasusut,a.dc desc  ";
		
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select a.no_fasusut as no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.keterangan, 
case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from fasusut_j a  
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $filter $modul
order by a.periode,a.no_fasusut,a.dc desc ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN JURNAL ",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'><div align='center'>No</div></td>
    <td width='80' class='header_laporan'><div align='center'>No Bukti</div></td>
	<td width='80' class='header_laporan'><div align='center'>No Dokumen</div></td>
    <td width='50' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='50' height='25' class='header_laporan'><div align='center'>Akun</div></td>
    <td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='60' class='header_laporan'><div align='center'>PP</div></td>
	<td width='60' class='header_laporan'><div align='center'>DRK</div></td>
    <td width='200' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_bukti; 
			if ($tmp!=$row->no_bukti)
			{
				$tmp=$row->no_bukti;
				$first = true;
				
				if ($i>1)
				{
					$debet=0;$kredit=0;$i=1;
					echo "<tr>
    <td height='25' colspan='9' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
				}
				
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$ndebet=number_format($debet,0,',','.');
			$nkredit=number_format($kredit,0,',','.');
			
			echo "<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
	<td valign='middle' class='isi_laporan'>$row->no_dokumen</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tanggal</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->nama))."</td>
    <td valign='middle' class='isi_laporan' align='center'>$row->kode_pp</td>
	<td valign='middle' class='isi_laporan'>$row->kode_drk</td>
	  <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->keterangan))."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->kredit,0,',','.')."</div></td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,0,',','.');
		$nkredit=number_format($kredit,0,',','.');
		echo "<tr>
    <td height='25' colspan='9' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
