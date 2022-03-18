<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_proyek_rptProyekKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$sql="select count(a.no_proyek)
from pr_proyek_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter ";
		
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
		$sql="select a.no_proyek,a.kode_lokasi,a.no_dokumen,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_ppn,a.persen_or,a.nilai_or,a.keterangan,a.uraian,a.jenis,
a.kode_pp,c.nama as nama_pp ,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.nilai+a.nilai_ppn as total
from pr_proyek_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_proyek";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
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
    <td height='23' colspan='9' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Proyek  </td>
                    <td class='header_laporan' >:&nbsp;$row->no_proyek </td>
                  </tr>
				  <tr>
                    <td class='header_laporan' width='100'>No SPK  </td>
                    <td class='header_laporan' >:&nbsp;$row->no_dokumen </td>
                  </tr>
				   <tr>
                    <td class='header_laporan'>Nama Proyek </td>
                    <td class='header_laporan'>:&nbsp;$row->keterangan</td>
                  </tr>
				  <tr>
                    <td class='header_laporan'>Jenis</td>
                    <td class='header_laporan'>:&nbsp;$row->jenis</td>
                  </tr>
				    <tr>
                    <td class='header_laporan' width='100'>Jangka Waktu  </td>
                    <td class='header_laporan' >:&nbsp;$row->tgl_mulai - $row->tgl_selesai </td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Mitra </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_cust - $row->nama_cust</td>
                  </tr>
                  
				   <tr>
                    <td class='header_laporan'>Uraian</td>
                    <td class='header_laporan'>:&nbsp;$row->uraian</td>
                  </tr>
				  <tr>
                    <td class='header_laporan'>Nilai Proyek</td>
                    <td class='header_laporan'>:&nbsp;".number_format($row->total,0,',','.')."</td>
                  </tr>
                </table></td>
     </tr>
 

  <tr bgcolor='#CCCCCC'>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='100' height='23' class='header_laporan' align='center'>No Dokumen</td>
	 <td width='60' class='header_laporan' align='center'>Tanggal</td>
	  <td width='50' class='header_laporan' align='center'>Modul</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
	<td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
  </tr>";
			$sql="select a.no_bukti,a.tgl,a.keterangan,a.debet,a.kredit,a.tanggal,a.no_dokumen,a.modul
from (select a.no_aju as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai as debet,0 as kredit,a.modul,a.tanggal,b.no_kas as no_dokumen
from pr_beban_d a
inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.modul='BEBAN' and a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_aju as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai as debet,0 as kredit,a.modul,a.tanggal,b.no_kas as no_dokumen
from pr_beban_d a
inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.modul='BMHD' and a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_piutang as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai as debet,0 as kredit,'AR' as modul,a.tanggal,'-' as no_dokumen
from pr_piutang_m a
where a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_piutang as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,0 as debet,a.nilai as kredit,'PDPT' as modul,a.tanggal,'-' as no_dokumen
from pr_piutang_m a
where a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_bukti as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan,a.nilai as debet,0 as kredit,a.modul,b.tanggal,'-' as no_dokumen
from pr_piubayar_d a
inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_aju as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai as debet,0 as kredit,a.modul,a.tanggal,b.no_kas as no_dokumen
from pr_beban_d a
inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.modul='PANJAR' and a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_aju as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,0 as debet,abs(a.nilai) as kredit,a.modul,a.tanggal,b.no_kas as no_dokumen
from pr_beban_d a
inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.modul='PANJARREV' and a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_aju as no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai as debet,0 as kredit,a.modul,a.tanggal,b.no_kas as no_dokumen
from pr_beban_d a
inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.modul='PJPTG' and a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi' and b.no_kas='-'
union all
select a.no_aju as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan,a.nilai as debet,0 as kredit,b.modul,b.tanggal,b.no_kas as no_dokumen
from pr_joincost_d a
inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_aju as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan,a.nilai as debet,0 as kredit,'JU' as modul,b.tanggal,b.no_dokumen as no_dokumen
from pr_joincost_d a
inner join ju_m b on a.no_aju=b.no_ju and a.kode_lokasi=b.kode_lokasi
where a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_aju as no_bukti,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan,a.nilai as debet,0 as kredit,'KB' as modul,b.tanggal,b.no_dokumen as no_dokumen
from pr_joincost_d a
inner join kas_m b on a.no_aju=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.no_proyek='$row->no_proyek' and a.kode_lokasi='$row->kode_lokasi'
)a 
order by a.tanggal

 ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0; $kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$debet+=$row1->debet;	
				$kredit+=$row1->kredit;
				echo "<tr><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row1->no_bukti','$row->kode_lokasi','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row1->no_dokumen','$row->kode_lokasi','$periode');\">$row1->no_dokumen</a>";
				echo "</td>
				
	    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".$row1->modul."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='5' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
 </tr></table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
