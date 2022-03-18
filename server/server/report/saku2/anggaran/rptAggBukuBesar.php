<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_anggaran_rptAggBukuBesar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql = $sql = "select count(a.kode_akun)
from agg_gldt a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
group by a.kode_akun,a.kode_lokasi,b.nama,c.nama  ";
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
		
		$sql = "select a.kode_akun,a.kode_lokasi,b.nama as nama_akun,c.nama as nama_lokasi,sum(ifnull(case when dc='D' then nilai else -nilai end,0)) as so_awal
from agg_gldt a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi  
group by a.kode_akun,a.kode_lokasi,b.nama,c.nama 
order by a.kode_akun";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("buku besar",$this->lokasi,"TAHUN ".$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='2' class='header_laporan'>Kode Akun </td>
    <td colspan='6' class='header_laporan'>$row->kode_akun</td>
  </tr>
  <tr >
    <td height='23' colspan='2' class='header_laporan'>Nama Akun </td>
    <td colspan='6' class='header_laporan'>$row->nama_akun</td>
  </tr>
 
  <tr>
    <td height='23' colspan='6' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='50' class='header_laporan' align='center'>Modul</td>
     <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>
  
";
			
			$sql="select a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.modul,a.keterangan,
						 case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				from agg_gldt a
				where a.kode_akun='$row->kode_akun'
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>".$row1->no_bukti."</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
    <td valign='top' class='isi_laporan' align='center'>".$row1->modul."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='4' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
