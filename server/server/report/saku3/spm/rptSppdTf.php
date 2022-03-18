<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptSppdTf extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="if_".$periode.".xls";
		$sql="select b.no_ver,b.no_spj,f.nik as nik_user,a.kota,c.nama_rek,c.no_rek,c.bank,c.nilai,d.nama as nama
		from pd_aju_m a
		inner join pd_spj_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi 
		inner join spm_rek c on b.no_spj=c.no_bukti and b.kode_lokasi=c.kode_lokasi
		inner join pd_aju_nik f on a.no_aju=f.no_aju and a.kode_lokasi=f.kode_lokasi 
		inner join karyawan d on f.nik=d.nik and f.kode_lokasi=d.kode_lokasi
		inner join spm_app_j e on b.no_ver=e.no_app and b.kode_lokasi=e.kode_lokasi 
$this->filter order by b.no_ver ";

		
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar transfer uang SPPD",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   		<tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='90'  align='center' class='header_laporan'>Kota Tujuan SPPD</td>
	 <td width='90'  align='center' class='header_laporan'>Nama Bank</td>
	 <td width='90'  align='center' class='header_laporan'>No. Rekening</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='100'  align='center' class='header_laporan'>Keterangan</td>
	  </tr> ";
		$bruto=0;$npajak=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kota</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->no_rek</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'></td>

	   </tr>";
			$i=$i+1;
		}

		echo"</table>";

		echo "<tr>
                <td><table width='500' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                    <td width='172' align='center'>&nbsp;</td>
                    <td width='293' align='center'>&nbsp;</td>
                    <td width='321'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   
                    Jakarta, </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td align='center'></td>
                    <td align='center'></td>
                </tr>
                <tr>
                    <td height='60'>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td align='center'>Lementina M</td>
                    <td align='center'>Sidarno</td>
                    <td align='center'>Asep Solehudin</td>
                </tr>
                <tr>
                    <td align='center'>Direktur Utama</td>
                    <td align='center'>VP Finance</td>
                    <td align='center'>AVP Kas Bank</td>
                </tr>
                </table></td>
			</tr>";
			
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
