<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptKbJurnal extends server_report_basic
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
		$nik_user=$tmp[3];
		$kode_lokasi=$tmp[4];
		$jenis_lap=$tmp[5];
		$nama_file="jurnal_".$periode.".xls";
		
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		$sql="exec sp_bukti_kas '$kode_lokasi','$periode','$periode','$nik_user'";
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
			$sql="exec sp_bukti_kas '$kode_lokasi','$periode','$periode2','$nik_user'";
			$nama_file="jurnal_".$periode."_sd_".$periode2.".xls";
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		
		
		$rs = $dbLib->execute($sql);
		
		$sql="select a.no_bukti,a.no_dokumen,a.tanggal,a.kode_pp,a.kode_drk,a.kode_akun,a.keterangan,a.nama_akun,a.debet,a.kredit,date_format(a.tanggal,'%d/%m/%Y') as tgl
from (select b.no_bukti,b.no_dokumen,b.tanggal,b.dc,b.kode_pp,b.kode_drk,b.kode_akun,b.keterangan,b.nilai,c.nama as nama_akun,b.no_urut,
	   case when b.dc='D' then b.nilai else 0 end as debet,case when b.dc='C' then b.nilai else 0 end as kredit
from bukti_kas a
inner join gldt b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi'
union 
select b.no_bukti,b.no_dokumen,b.tanggal,b.dc,b.kode_pp,b.kode_drk,b.kode_akun,b.keterangan,b.nilai,c.nama as nama_akun,b.no_urut,
	   case when b.dc='D' then b.nilai else 0 end as debet,case when b.dc='C' then b.nilai else 0 end as kredit
from bukti_kas a
inner join gldt_h b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi'
	)a
order by a.no_bukti,a.no_urut ";
	
		$rs = $dbLib->execute($sql);
		
		$i=1;
		if ($jenis_lap=="Excell")
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
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN TRANSAKSI KASBANK",$this->lokasi,$nama_periode);
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='80' class='header_laporan' align='center'>No Bukti</td>
	<td width='80' class='header_laporan' align='center'>No Dokumen</td>
    <td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='70' height='25' class='header_laporan' align='center'>Akun</td>
    <td width='200' class='header_laporan' align='center'>Nama Akun </td>
    <td width='40' class='header_laporan' align='center'>PP</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Debet</td>
    <td width='80' class='header_laporan' align='center'>Kredit</td>
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
    <td height='25' colspan='8' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
				}
				
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$ndebet=number_format($debet,0,',','.');
			$nkredit=number_format($kredit,0,',','.');
			
			echo "<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
	<td valign='middle' class='isi_laporan'>$row->no_dokumen</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tgl</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".$row->nama_akun."</td>
    <td valign='middle' class='isi_laporan' align='center'>$row->kode_pp</td>
    <td valign='middle' class='isi_laporan'>".$row->keterangan."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->kredit,0,',','.')."</div></td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,0,',','.');
		$nkredit=number_format($kredit,0,',','.');
		echo "<tr>
    <td height='25' colspan='8' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
