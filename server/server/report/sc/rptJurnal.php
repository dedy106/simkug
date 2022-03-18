<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_sc_rptJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_jurnal) 
				from sc_jurnal_j a
inner join masakun b on a.kode_akun=b.kode_akun
left join sc_cc c on a.kode_cc=c.kode_cc 
inner join sc_jurnal_m d on a.no_jurnal=d.no_jurnal	 ";
		
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
		
		$sql="select a.no_jurnal,a.kode_akun,a.jenis,a.kode_cc,b.nama as nama_akun,c.nama as nama_cc,date_format(d.tanggal,'%d/%m/%Y') as tanggal,d.keterangan,
       case a.dc when 'D' then a.nilai else 0 end as debet,case a.dc when 'C' then a.nilai else 0 end as kredit 
from sc_jurnal_j a
inner join masakun b on a.kode_akun=b.kode_akun
left join sc_cc c on a.kode_cc=c.kode_cc 
inner join sc_jurnal_m d on a.no_jurnal=d.no_jurnal
order by a.no_jurnal,a.dc desc ";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN JURNAL ",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'><div align='center'>No</div></td>
    <td width='70' class='header_laporan'><div align='center'>No Bukti</div></td>
	<td width='50' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='50' height='25' class='header_laporan'><div align='center'>Akun</div></td>
    <td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
   <td width='30' class='header_laporan'><div align='center'>Jenis</div></td>
    <td width='250' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_jurnal; 
			if ($tmp!=$row->no_jurnal)
			{
				$tmp=$row->no_jurnal;
				$first = true;
				
				if ($i>1)
				{
					$debet=0;$kredit=0;$i=1;
					echo "<tr>
    <td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
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
    <td valign='middle' class='isi_laporan'>$row->no_jurnal</td>
	<td height='20' valign='middle' class='isi_laporan'>$row->tanggal</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->nama_akun))."</td>
    <td valign='middle' class='isi_laporan' align='center'>$row->jenis</td>
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
    <td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
