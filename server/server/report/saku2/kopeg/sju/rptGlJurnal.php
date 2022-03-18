<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlJurnal extends server_report_basic
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
		
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		$sql="select a.no_bukti,a.jenis,a.no_dokumen,c.nama,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.nik_user,
			a.kode_akun,a.kode_pp,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit
		from gldt_tmp a 
		inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
		$this->filter 
		order by a.no_bukti ";
		$rs = $dbLib->execute($sql);		
		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR JURNAL",$this->lokasi,$nama_periode);
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#dbeef3'>
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='100' class='header_laporan' align='center'>No Bukti</td>
    <td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='70' height='25' class='header_laporan' align='center'>Akun</td>
    <td width='200' class='header_laporan' align='center'>Nama Akun </td>
	<td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>No Register</td>
	
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
    <td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
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
    <td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
