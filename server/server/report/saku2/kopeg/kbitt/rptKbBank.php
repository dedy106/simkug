<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptKbBank extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		$sql = "select count(a.kode_akun)
from glma_tmp a $filter_akun and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		
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
		$filter_akun=$tmp[1];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		$sort=$tmp[5];
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal
from glma_tmp a $filter_akun and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0)
order by a.kode_akun";
		
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
   <tr >
    <td height='23' colspan='11' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
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
    <td height='23' colspan='9' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
   <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='74' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='50' height='23' class='header_laporan' align='center'>Modul</td>
	<td width='60' height='23' class='header_laporan' align='center'>Kode Akun</td>
	<td width='150' height='23' class='header_laporan' align='center'>Nama Akun</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>";
			 $sql="select a.no_bukti,b.periode,b.no_dokumen,b.kode_akun,b.kode_akun,date_format(tanggal,'%d/%m/%Y') as tgl,
			 b.keterangan,isnull(b.debet,0) as debet,isnull(b.kredit,0) as kredit,b.kode_pp,b.kode_drk,b.modul,b.kode_akun,c.nama as nama_akun
from (select a.no_kas as no_bukti,a.kode_lokasi,a.kode_akun
	  from kas_j a
	  where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' $var_periode 
	  group by a.no_kas,a.kode_lokasi,a.kode_akun
	  )a
inner join (select a.no_kas as no_bukti,a.no_dokumen,a.tanggal,a.kode_lokasi,a.keterangan,a.kode_akun,a.periode,a.kode_drk,a.kode_pp,
				   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.modul
		    from kas_j a
		    where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.kode_akun<>'$row->kode_akun'
		   )b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi 
where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$kode_lokasi'
					order by b.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			$first = true;$tmp="";
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$beda = $tmp!=$row1->tgl; 
				if ($tmp!=$row1->tgl)
				{
					$tmp=$row1->tgl;
					$first = true;
					
					if ($i>1)
					{
						$debet=0;$kredit=0;$i=1;
						echo "<tr>
		<td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
		<td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
		<td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
		<td class='header_laporan' class='header_laporan' align='right'>$nsaldo</td>
	  </tr>";
					}
					
				}
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$ndebet=number_format($debet,0,',','.');
				$nkredit=number_format($kredit,0,',','.');
				$nsaldo=number_format($saldo,0,',','.');
				echo "<tr> <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
   <td valign='top' class='isi_laporan'>".$row1->modul."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_akun."</td>
	 <td valign='top' class='isi_laporan'>".$row1->nama_akun."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				$first = true;
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='7' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
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
