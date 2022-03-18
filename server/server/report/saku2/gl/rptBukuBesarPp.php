<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptBukuBesarPp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$mutasi=$tmp[5];
		$mut="";
		if ($mutasi=="Tidak")
		{
			$mut=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$sql = "select count(a.kode_akun)
from glma_tmp a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' $mut ";
		
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
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$kode_pp=$tmp[3];
		$nama_pp=$tmp[4];
		$mutasi=$tmp[5];
		$mut="";
		if ($mutasi=="Tidak")
		{
			$mut=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$sql = "select a.kode_akun,a.nama,a.so_awal,a.kode_lokasi,b.nama as nama_lokasi
from glma_tmp a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' $mut
order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);	
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr>
    <td height='23' colspan='8' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                  <tr>
                    <td class='header_laporan' width='100'>Kode PP  </td>
                    <td class='header_laporan' >:&nbsp;$kode_pp</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama PP </td>
                    <td class='header_laporan'>:&nbsp;$nama_pp</td>
                  </tr>
				  <tr>
                    <td class='header_laporan' width='100'>Kode Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  
                </table></td>
     </tr>
 
  <tr>
    <td height='23' colspan='7' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='60' class='header_laporan' align='center'>Kode DRK</td>
    <td width='150' class='header_laporan' align='center'>Nama DRK</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>";
			$sql="select a.kode_lokasi,a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,b.nama as nama_drk,
	   case when a.dc='D' then nilai else 0 end as debet,
	   case when a.dc='C' then nilai else 0 end as kredit 
from (select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from gldt_h a
	  where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun' and a.kode_pp='$kode_pp' $this->filter 
	  union all 
	  select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from gldt a 
	 where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun' and a.kode_pp='$kode_pp' $this->filter
	 )a 
left join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and b.tahun=substring('$periode',1,4)
order by a.tanggal  ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' >".$row1->kode_drk."</td>
    <td valign='top' class='isi_laporan'>".$row1->nama_drk."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='5' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
