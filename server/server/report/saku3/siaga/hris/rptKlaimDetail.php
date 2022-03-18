<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptKlaimDetail extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$periode=$tmp[1];
		$kode_lokasi=$tmp[0];
		$nik_user=$tmp[2];
		
		$sql="select a.no_klaim,a.nik_buat,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tgl_klaim,a.keterangan,c.nama as asuransi,
date_format(a.tgl_kuitansi,'%d/%m/%Y') as tgl_kuitansi,date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,date_format(a.tgl_ambil,'%d/%m/%Y') as tgl_ambil,
date_format(a.tgl_final,'%d/%m/%Y') as tgl_final,datediff (day,a.tgl_ambil,a.tgl_final)+1 as lama,
isnull(d.nilai,0) as nilai,isnull(a.nilai_final,0) as nilai_final,isnull(d.nilai,0)-isnull(a.nilai_final,0) as selisih 
from gr_klaim_m a 
inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join gr_asur c on a.kode_asur=c.kode_asur and a.kode_lokasi=c.kode_lokasi 
left join (select no_klaim,sum(nilai) as nilai 
		   from gr_klaim_d 
		   group by no_klaim 
	   )d on a.no_klaim=d.no_klaim
$this->filter
order by a.no_klaim ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data detail klaim asuransi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='100' align='center' class='header_laporan'>No Klaim</td>
		<td width='60' align='center' class='header_laporan'>NIK</td>
		<td width='150' align='center' class='header_laporan'>Nama</td>
		<td width='60' align='center' class='header_laporan'>Tgl Input</td>
		<td width='150' align='center' class='header_laporan'>Keterangan</td>
		<td width='150' align='center' class='header_laporan'>Asuransi</td>
		<td width='60' align='center' class='header_laporan'>Tgl Kuitansi</td>
		<td width='60' align='center' class='header_laporan'>Tgl Terima</td>
	    <td width='60' align='center' class='header_laporan'>Tgl Ambil</td>
		<td width='60' align='center' class='header_laporan'>Tgl Pembayaran</td>
		<td width='60' align='center' class='header_laporan'>Lama</td>
		<td width='90' align='center' class='header_laporan'>Nilai Pengajuan</td>
		<td width='90' align='center' class='header_laporan'>Nilai Disetujui</td>
		<td width='90' align='center' class='header_laporan'>Selisih</td>
   </tr>";
		$nilai=0;$nilai_final=0;$selisih=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_final+=$rownilai_finalnilai;
			$selisih+=$row->selisih;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_klaim</td>
			<td class='isi_laporan'>$row->nik_buat</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->tgl_klaim</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->asuransi</td>
			<td class='isi_laporan'>$row->tgl_kuitansi</td>
			<td class='isi_laporan'>$row->tgl_terima</td>
			<td class='isi_laporan'>$row->tgl_ambil</td>
			<td class='isi_laporan'>$row->tgl_final</td>
			<td class='isi_laporan' align='center'>$row->lama</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai)."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_final)."</td>
			<td class='isi_laporan' align='right'>".number_format($row->selisih)."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center' colspan='12'>Total</td>
			<td class='header_laporan' align='right'>".number_format($nilai)."</td>
			<td class='header_laporan' align='right'>".number_format($nilai_final)."</td>
			<td class='header_laporan' align='right'>".number_format($selisih)."</td>
    </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  
