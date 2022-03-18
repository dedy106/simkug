<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptKbMasuk extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$kode_lokasi=$tmp[3];
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$pp=$tmp[3];
		$mutasi=$tmp[4];
		$tmp="";
			
		$sql = "select a.kode_akun,a.nama,a.kode_lokasi,c.kode_pp,c.nama as nama_pp
				from masakun a
				inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048'
				cross join pp c 
				$this->filter and a.kode_lokasi=c.kode_lokasi
				order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";

			echo $AddOnLib->judul_laporan("penerimaan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			$sql2=" and a.periode='$periode' ";
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='5' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Kode Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Kode PP </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
                  </tr>
                </table></td>
     </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td width='30' class='header_laporan' align='center'>No</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
	<td width='80' class='header_laporan' align='center'>No Bukti</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Nilai</td>
  </tr>";
			$sql="select a.param3,a.no_bukti,a.no_dokumen,convert(varchar(20),a.tanggal,103) as tgl,a.kode_pp,a.keterangan,
	   a.nilai1 
from trans_m a 
where a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.param3='BM' ";
			
			$rs1 = $dbLib->execute($sql);
			
			$nilai1=0;
			$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai1+=$row1->nilai1;
				echo "<tr>
					<td  class='isi_laporan' align='center'>$i</td>
					<td  class='isi_laporan'>$row1->tgl</td>
					<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->nilai1,0,',','.')."</td>
  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td  colspan='4'  class='header_laporan' align='right'>Jumlah&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai1,0,',','.')."</td>
 </tr>
 </table><br>";
			
		}
		echo "</center>";
		return "";
	}
	
}
?>
