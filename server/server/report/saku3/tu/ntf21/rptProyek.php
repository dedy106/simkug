<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_ntf21_rptProyek extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		
		$tmp="";
		if ($jenis=='Revisi')
		{
			$tmp=" and a.progress='R' ";
		}
		if ($jenis=='Approve')
		{
			$tmp=" and a.progress<>'R' ";
		}
		$sql="select a.kode_proyek,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_or,a.nama,a.kode_jenis,d.nama as nama_jenis,a.no_pks,
a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,
e.no_rab,a.nilai-a.nilai_or as shu,case when a.progress='R' then 'Revisi' else 'Approve' end as prog,
datediff(month,a.tgl_mulai,a.tgl_selesai)+1 as bulan
from prb_proyek a
inner join prb_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join prb_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
left join prb_rabapp_m e on a.kode_proyek=e.kode_proyek and a.kode_lokasi=e.kode_lokasi
$this->filter $tmp
order by a.kode_proyek";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='150'  align='center' class='header_laporan'>Nama PP</td>
     <td width='80'  align='center' class='header_laporan'>Kode Proyek</td>
	  <td width='150'  align='center' class='header_laporan'>No Kontrak</td> 
	 <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='200'  align='center' class='header_laporan'>Customer</td>
	 <td width='100'  align='center' class='header_laporan'>Jenis</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='60'  align='center' class='header_laporan'>Jangka Waktu (Bulan)</td>
	  <td width='100'  align='center' class='header_laporan'>No RAB</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Kontrak</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai RAB</td>
	 <td width='90'  align='center' class='header_laporan'>LABA RUGI</td>
	 <td width='60'  align='center' class='header_laporan'>Status</td>
	  </tr>  ";
		$nilai=0;  $nilai_or=0; $shu=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_or+=$row->nilai_or;
			$shu+=$row->shu;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_pp</td>
	  <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->kode_proyek</td>
	  <td class='isi_laporan'>$row->no_pks</td>
	  <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	  <td class='isi_laporan'>$row->nama_jenis</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan' align='center'>$row->bulan</td>
	 <td class='isi_laporan'>$row->no_rab</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->shu,0,",",".")."</td>
	 <td class='isi_laporan'>".ucfirst($row->prog)."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='12'>Total</td>
		  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($shu,0,",",".")."</td>
	   <td class='isi_laporan' align='center' >&nbsp;</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
