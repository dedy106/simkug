<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_proyek_rptKbBbProyek extends server_report_basic
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
		$sql = "select 1 ";
		
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
		$sql = "select a.kode_project,a.keterangan,a.kode_cust,b.nama as nama_cust,a.kode_lokasi,a.no_dokumen,
		date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai
from project a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='07' ";
		
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
    <td height='23' colspan='9' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Proyek  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_project - $row->keterangan</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Customer </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_cust - $row->nama_cust</td>
                  </tr>
                   <tr>
                    <td class='header_laporan'>No Dokumen </td>
                    <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
                  </tr>
				   <tr>
                    <td class='header_laporan'>Tanggal </td>
                    <td class='header_laporan'>:&nbsp;$row->tgl_mulai - $row->tgl_selesai</td>
                  </tr>
                </table></td>
     </tr>
 

  <tr bgcolor='#CCCCCC'>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='100' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Nilai</td>
 
  </tr>";
			$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai 
from (select a.kode_lokasi,a.no_kas as no_bukti,a.no_dokumen,a.tanggal,a.nilai,a.keterangan 
	  from kas_m a 
	  where a.kode_lokasi='$row->kode_lokasi' and a.ref1='$row->kode_project'  	
	  union all
	  select a.kode_lokasi,a.no_ptg as no_bukti,a.no_dokumen,a.tanggal,a.nilai,a.keterangan 
	  from ptg_m a 
	  where a.kode_lokasi='$row->kode_lokasi' and a.no_link='$row->kode_project' 
	  )a  ";
			
			$rs1 = $dbLib->execute($sql);
			
			$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row1->nilai;	
				echo "<tr><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='4' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
 
 </tr></table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
