<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProyekKartuBdd extends server_report_basic
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
		$sql="select a.kode_proyek,a.kode_lokasi,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_or,a.nama,a.kode_jenis,d.nama as nama_jenis,a.no_pks,
a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.nilai,a.nilai_or,
datediff(month,a.tgl_mulai,a.tgl_selesai)+1 as bulan
from tu_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join tu_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.kode_proyek";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("Kartu BDD",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
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
                    <td class='header_laporan' width='100'>No SPK  </td>
                    <td class='header_laporan' >:&nbsp;$row->no_pks </td>
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
                    <td class='header_laporan' >:&nbsp;$row->tgl_mulai - $row->tgl_selesai ( $row->bulan Bulan )</td>
                  </tr>
				 
                  <tr>
                    <td class='header_laporan'>Mitra </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_cust - $row->nama_cust</td>
                  </tr>
                  
				  
				  <tr>
                    <td class='header_laporan'>Nilai Proyek</td>
                    <td class='header_laporan'>:&nbsp;".number_format($row->nilai,0,',','.')."</td>
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
	  <td width='100' class='header_laporan' align='center'>No Dokumen</td>
	<td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td width='90' class='header_laporan' align='center'>Debet</td>
	<td width='90' class='header_laporan' align='center'>Kredit</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
	
  </tr>";
			$sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.tanggal,a.modul,b.no_kas as no_dokumen,
	   case when a.dc='D' then a.nilai else 0 end as debet, case when a.dc='C' then a.nilai else 0 end as kredit 
from tu_prbdd_d a
inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.modul='AJUBDD' and a.kode_proyek='$row->kode_proyek'
order by a.tanggal

 ";
		
			$rs1 = $dbLib->execute($sql);
			
			$debet=0; $kredit=0; $saldo=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$debet+=$row1->debet;	
				$kredit+=$row1->kredit;
				$saldo+=$row1->debet-$row1->kredit;	
				echo "<tr><td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row1->no_bukti','$row->kode_lokasi','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
 <td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".$row1->no_dokumen."</td>
	<td  class='isi_laporan'>".$row1->keterangan."</td>
    <td class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	</tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='4'  class='isi_laporan' align='right'>Total&nbsp;</td>
   <td  class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
   </tr></table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
