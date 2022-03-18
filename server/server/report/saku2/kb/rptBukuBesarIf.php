<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptBukuBesarIf extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$filter2=$tmp[1];
		$filter3=$tmp[2];
		$filter4=$tmp[3];
		$sql = "select count(a.nik) as jum
from yk_if_m a
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi $this->filter ";
		
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
		$nama_form=$tmp[0];
		$filter2=$tmp[1];
		$filter3=$tmp[2];
		$filter4=$tmp[3];
		$periode=$tmp[4];
		$sql = "select a.nik,b.nama,a.nilai,b.kode_pp,c.nama as nama_pp,a.kode_lokasi,a.nilai as so_awal
from yk_if_m a
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi  $this->filter
order by a.nik ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='9' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                  <tr>
                    <td class='header_laporan' width='100'>Kode PP  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_pp</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama PP </td>
                    <td class='header_laporan'>:&nbsp;$row->nama_pp</td>
                  </tr>
				  <tr>
                    <td class='header_laporan' width='100'>NIK  </td>
                    <td class='header_laporan' >:&nbsp;$row->nik</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  
                </table></td>
     </tr>
 
  <tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='60' class='header_laporan' align='center'>Kode Akun</td>
    <td width='60' class='header_laporan' align='center'>Kode PP</td>
	<td width='60' class='header_laporan' align='center'>Kode DRK</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>";
			$sql="select a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,
	   case when a.dc='D' then nilai else 0 end as debet,
	   case when a.dc='C' then nilai else 0 end as kredit 
from (select a.kode_lokasi,a.no_ifptg as no_bukti,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from yk_ifptg_j a 
	  inner join yk_ifptg_m b on a.no_ifptg=b.no_ifptg and a.kode_lokasi=b.kode_lokasi
	  where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) and b.nik_buat='$row->nik' 
	  union all 
	  select a.kode_lokasi,a.no_kas as no_bukti,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from kas_j a  
	  inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
	  inner join yk_ifptg_m c on b.no_kas=c.no_kas and b.kode_lokasi=c.kode_lokasi
	  where a.dc='C' and a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) and c.nik_buat='$row->nik' 
	 )a 
order by a.tanggal  ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->kredit - $row1->debet;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>".$row1->no_bukti."</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' >".$row1->kode_akun."</td>
	<td valign='top' class='isi_laporan' >".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
