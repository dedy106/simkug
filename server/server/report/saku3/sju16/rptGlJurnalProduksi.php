<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlJurnalProduksi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		$nik_user=$tmp[4];
		$lap=$tmp[5];
		
		$nama_file="jurnal.xls";

		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		$sql="select a.no_bukti,a.jenis,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.nik_user,a.no_dokumen,
			a.kode_akun,a.kode_pp,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,
			a.kode_cust,a.kode_vendor,a.no_ref1,c.nama as nama_cust,d.nama as nama_vendor,a.kode_pp,e.nama as nama_pp
		from trans_j a 
		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
		left join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
		left join sju_vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi
		inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
		$this->filter 
		order by a.no_bukti ";

		if ($lap=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
		
		$rs = $dbLib->execute($sql);		
		
		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR JURNAL",$this->lokasi,$nama_periode);
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak' width='1500'>
  <tr bgcolor='#dbeef3'>
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='100' class='header_laporan' align='center'>No Bukti</td>
    <td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='70' height='25' class='header_laporan' align='center'>Akun</td>
    <td width='200' class='header_laporan' align='center'>Nama Akun </td>
	<td width='50' class='header_laporan'>Kode PP</td>
	<td width='150' class='header_laporan'>nama PP</td>
	<td width='40' class='header_laporan'>COB</td>
	<td width='150' class='header_laporan'>Insurer</td>
	<td width='150' class='header_laporan'>Insured</td>
	<td width='250' class='header_laporan' align='center'>Keterangan</td>
	<td width='80' class='header_laporan'>No Register</td>
    <td width='80' class='header_laporan' align='center'>Debet</td>
    <td width='80' class='header_laporan' align='center'>Kredit</td>
	 <td width='80' class='header_laporan' align='center'>User Id</td>
  </tr>";
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_bukti; 
			if ($tmp!=$row->no_bukti)
			{
				$tmp=$row->no_bukti;
				$first = true;
				
				if ($i>1)
				{
					$debet=0;$kredit=0;$i=1;
					echo "<tr>
    <td height='25' colspan='12' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
				}
				
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$ndebet=number_format($debet,2,',','.');
			$nkredit=number_format($kredit,2,',','.');
			
			echo "<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tgl</td>
    <td valign='middle' class='isi_laporan'>".$AddOnLib->fnAkun($row->kode_akun)."</td>
    <td valign='middle' class='isi_laporan'>$row->nama</td>
	<td valign='middle' class='isi_laporan'>$row->kode_pp</td>
	<td valign='middle' class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan'>$row->no_ref1</td>
	<td class='isi_laporan'>$row->nama_vendor</td>
	<td class='isi_laporan'>$row->nama_cust</td>
    <td valign='middle' class='isi_laporan'>$row->keterangan</td>
	<td valign='middle' class='isi_laporan'>$row->no_dokumen</td>
    <td valign='middle' class='isi_laporan' align='right' >".number_format($row->debet,2,',','.')."</td>
    <td valign='middle' class='isi_laporan' align='right' >".number_format($row->kredit,2,',','.')."</td>
	<td valign='middle' class='isi_laporan'>$row->nik_user</td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,2,',','.');
		$nkredit=number_format($kredit,2,',','.');
		echo "<tr>
    <td height='25' colspan='12' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
