<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptBukuBesarFakultas extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$nik_user=$tmp[1];
		$kode_lokasi=$tmp[2];
		$filter_akun=$tmp[3];
		$sql="exec sp_glma_pp_dw_tmp '$kode_lokasi','$periode','$nik_user'";
		$rs = $dbLib->execute($sql);
		$sql = "select count(a.kode_akun) from (select a.kode_akun 
from glma_pp_tmp a
inner join pp_fakultas b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and b.kode_lokasi=c.kode_lokasi
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
$this->filter and a.nik_user='$nik_user' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) 
group by a.kode_akun,d.nama,c.kode_fakultas,c.nama)a ";
		
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
		$nik_user=$tmp[1];
		$kode_lokasi=$tmp[2];
		$sql="exec sp_glma_pp_dw_tmp '$kode_lokasi','$periode','$nik_user'";
	
		$rs = $dbLib->execute($sql);	
		$sql = "select a.kode_akun,d.nama,c.kode_fakultas,c.nama as nama_fakultas,sum(so_awal) as so_awal
from glma_pp_tmp a
inner join pp_fakultas b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and b.kode_lokasi=c.kode_lokasi
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
$this->filter and a.nik_user='$nik_user' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) 
group by a.kode_akun,d.nama,c.kode_fakultas,c.nama ";
		
		
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
                    <td class='header_laporan' width='100'>Kode Fakultas  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_fakultas</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Fakultas </td>
                    <td class='header_laporan'>:&nbsp;$row->nama_fakultas</td>
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
    <td width='60' class='header_laporan' align='center'>Kode PP</td>
    <td width='60' class='header_laporan' align='center'>Kode DRK</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>";
			$sql="select a.kode_lokasi,a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,
	   case when a.dc='D' then nilai else 0 end as debet,
	   case when a.dc='C' then nilai else 0 end as kredit 
from (select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from gldt_h a
	  where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode='$periode'
	  union all 
	  select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from gldt a 
	 where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode='$periode'
	 )a 
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
