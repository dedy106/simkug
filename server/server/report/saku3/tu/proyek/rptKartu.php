<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$sql="select 1 ";
		
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.kode_proyek,a.nilai_or,a.nama,a.kode_jenis,d.nama as nama_jenis,
a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.nilai,a.nilai_or
from tu_proyek a
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join tu_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.kode_proyek";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("Kartu Proyek",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='11' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Proyek  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_proyek </td>
                  </tr>
				   <tr>
                    <td class='header_laporan'>Nama Proyek </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
				  <tr>
                    <td class='header_laporan'>Jenis</td>
                    <td class='header_laporan'>:&nbsp;$row->nama_jenis</td>
                  </tr>
				    <tr>
                    <td class='header_laporan' width='100'>Jangka Waktu  </td>
                    <td class='header_laporan' >:&nbsp;$row->tgl_mulai - $row->tgl_selesai </td>
                  </tr>
                  
				  
				  <tr>
                    <td class='header_laporan'>Nilai OR</td>
                    <td class='header_laporan'>:&nbsp;".number_format($row->nilai_or,0,',','.')."</td>
                  </tr>
                </table></td>
     </tr>
 

  <tr bgcolor='#CCCCCC'>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
	 <td width='60' class='header_laporan' align='center'>Tanggal</td>
	  <td width='50' class='header_laporan' align='center'>Modul</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
	<td width='90' class='header_laporan' align='center'>BDD</td>
	<td width='90' class='header_laporan' align='center'>Beban</td>
	<td width='90' class='header_laporan' align='center'>BYMHD</td>
	<td width='90' class='header_laporan' align='center'>join Cost</td>
  </tr>";
			$sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.tanggal,a.modul,
			case a.modul when 'AJUBDD' then a.nilai else 0 end as bdd,
			case when a.modul in ('INIBDD')  then a.nilai else 0 end as beban,
			case a.modul when 'REVBMHD' then a.nilai else 0 end as bymhd,
			case a.modul when 'JCOSTINI' then a.nilai else 0 end as join2
from (
select a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,a.nilai,b.tanggal,a.modul
from tu_prbdd_d a
inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.modul='AJUBDD' and a.kode_proyek='$row->kode_proyek'
union all
select a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,case when a.dc='D' then a.nilai else a.nilai end as nilai,b.tanggal,a.modul
from tu_prbdd_d a
inner join tu_prbeban_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.modul in ('INIBDD') and a.kode_proyek='$row->kode_proyek'
union all	 
select a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,a.nilai,b.tanggal,a.modul
from tu_prbdd_d a
inner join tu_prbeban_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.dc='C' and a.modul='REVBMHD' and a.kode_proyek='$row->kode_proyek'
union all	 
select a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,a.nilai,b.tanggal,b.modul
from tu_prbdd_d a
inner join tu_prbeban_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.dc='C' and a.modul='AJUBDD' and a.kode_proyek='$row->kode_proyek'
	)a 
order by a.tanggal asc

 ";
			
			$rs1 = $dbLib->execute($sql);
			
			$piutang=0; $rekon=0; $pdpt=0; 
			$beban=0; $bymhd=0; $bdd=0; $join2=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$beban+=$row1->beban;
				$bymhd+=$row1->bymhd;
				$bdd+=$row1->bdd;
				$join2+=$row1->join2;
				echo "<tr><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row1->no_bukti','$row->kode_lokasi','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
 <td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".$row1->modul."</td>
    <td  class='isi_laporan'>".$row1->keterangan."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->bdd,0,',','.')."</td>	 
	<td class='isi_laporan' align='right'>".number_format($row1->beban,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->bymhd,0,',','.')."</td>
    
    <td class='isi_laporan' align='right'>".number_format($row1->join2,0,',','.')."</td>	 
	</tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='4'  class='isi_laporan' align='right'>Total&nbsp;</td>
    <td  class='isi_laporan' align='right'>".number_format($bdd,0,',','.')."</td>
   <td  class='isi_laporan' align='right'>".number_format($beban,0,',','.')."</td>
   <td  class='isi_laporan' align='right'>".number_format($bymhd,0,',','.')."</td>
  
   <td  class='isi_laporan' align='right'>".number_format($join2,0,',','.')."</td>
   </tr></table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
