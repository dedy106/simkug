<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_saiba_rptEkuitas extends server_report_basic
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

			echo $AddOnLib->judul_laporan("Laporan Perubahan Ekuitas Tingkat Satuan Kerja","Untuk Periode Yang Berakhir Sampai Dengan ".$AddOnLib->ubah_periode($periode),"DALAM RUPIAH");
			$sql2=" and a.periode='$periode' ";
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='5' style='padding:10px'><table  border='0' cellspacing='3' cellpadding='2'>
                    <tr>
                    <td class='header_laporan' width='200'>Kementrian Negara/Lembaga  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Unit Organisasi </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Wilayah/Propinsi </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Satuan/Kerja </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Jenis Kewenangan </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
                  </tr>
				  </table></td>
     </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td width='500' class='header_laporan' align='center'>URAIAN</td>
    <td width='500' class='header_laporan' align='center'>JUMLAH</td>
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
  </tr>";
				$i=$i+1;
			}
			echo "
 </table>
   <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table width='800'  border='0' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='left'>Jakarta, 22 12 2017 : </td>
      </tr>
      <tr>
        <td align='left'>Kepala Kantor</td>
        </tr>  
		<tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
		 <tr>
        <td align='left'>Kepala Kantor</td>
        </tr>
		 <tr>
        <td align='left'>NIP</td>
        </tr>

    </table></td>
  </tr>
 <br>";
			
		}
		echo "</center>";
		return "";
	}
	
}
?>
