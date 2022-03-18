<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlJurnalTm2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$lokasi=$tmp[3];
		$jenis=$tmp[4];
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
		$sql="select a.no_bukti,a.no_dokumen,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_drk,date_format(a.tgl_input,'%d/%m/%Y') as tgl_input,
		a.kode_akun,a.kode_pp,a.modul,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from (select kode_lokasi,no_bukti,no_dokumen,tanggal,kode_akun,keterangan,dc,kode_pp,nilai,modul,kode_drk,tgl_input
	from gldt $this->filter
	union all
	select kode_lokasi,no_bukti,no_dokumen,tanggal,kode_akun,keterangan,dc,kode_pp,nilai,modul,kode_drk,tgl_input
	from gldt_h $this->filter
	  )a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$lokasi'
 		order by a.no_bukti ";
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
		
		}
		
		$rs = $dbLib->execute($sql);
		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN TRANSAKSI JURNAL",$this->lokasi,$nama_periode);
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='80' class='header_laporan' align='center'>No Bukti</td>
	<td width='80' class='header_laporan' align='center'>No Dokumen</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
	 <td width='60' class='header_laporan' align='center'>Tanggal Input</td>
    <td width='70' height='25' class='header_laporan' align='center'>Akun</td>
    <td width='200' class='header_laporan' align='center'>Nama Akun </td>
    <td width='40' class='header_laporan' align='center'>PP</td>
	<td width='40' class='header_laporan' align='center'>Modul</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Debet</td>
    <td width='80' class='header_laporan' align='center'>Kredit</td>
  </tr>";
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$ndebet=number_format($debet,0,',','.');
			$nkredit=number_format($kredit,0,',','.');
			
			echo "<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
	<td valign='middle' class='isi_laporan'>$row->no_dokumen</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tgl</td>
	 <td height='20' valign='middle' class='isi_laporan'>$row->tgl_input</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".$row->nama."</td>
    <td valign='middle' class='isi_laporan' align='center'>$row->kode_pp</td>
  <td valign='middle' class='isi_laporan' align='center'>$row->modul</td>
    <td valign='middle' class='isi_laporan'>".$row->keterangan."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->kredit,0,',','.')."</div></td>
  </tr>";
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,0,',','.');
		$nkredit=number_format($kredit,0,',','.');
		echo "<tr>
    <td height='25' colspan='10' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
