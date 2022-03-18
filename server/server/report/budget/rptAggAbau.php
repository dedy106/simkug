<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;

class server_report_budget_rptAggAbau extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_abau) as jum
from agg_abau_m a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter";
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
		$nama_ver=$tmp[0];
		$kode_akun=$tmp[2];
		$kode_rka=$tmp[3];
		$kode_bidang=$tmp[4];
		$ver=$tmp[1];
		$sql="select a.no_abau,a.kode_lokasi,a.tanggal,a.keterangan,a.kode_pp,a.tahun,b.nama as nama_pp,case when a.jenis='L' then 'LAMA' else 'BARU' end as jenis
from agg_abau_m a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_abau";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan pengajuan biaya  variabel",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='1200'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='18' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_abau</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Bisnis Unit </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	<tr>
        <td class='header_laporan'>Versi Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$nama_ver</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>Kode Var </td>
    <td width='40' align='center' class='header_laporan'>No PK </td>
    <td width='200' align='center' class='header_laporan'>Nama PK  </td>
    <td width='50' align='center' class='header_laporan'>Kode DRK </td>
    <td width='200' align='center' class='header_laporan'>Nama DRK </td>
    <td width='50' align='center' class='header_laporan'>Kode RKA </td>
    <td width='200' align='center' class='header_laporan'>Nama RKA </td>
    <td width='40' align='center' class='header_laporan'>Kode PP </td>
    <td width='200' align='center' class='header_laporan'>Nama PP </td>
    <td width='50' align='center' class='header_laporan'>Kode Akun </td>
    <td width='200' align='center' class='header_laporan'>Nama Akun </td>
    <td width='40' align='center' class='header_laporan'>Periode</td>
	<td width='40' align='center' class='header_laporan'>Program</td>
	<td width='70' align='center' class='header_laporan'>Tarif</td>
    <td width='40' align='center' class='header_laporan'>Jumlah</td>
    <td width='40' align='center' class='header_laporan'>Volume</td>  
    <td width='80' align='center' class='header_laporan'>Total </td>
  </tr>
";
		
	  $sql1="select a.kode_var,a.kode_pk,a.kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,a.periode,a.jumlah,a.volume,a.tarif,(a.jumlah*a.volume*a.tarif) as total,
       b.nama as nama_pk,c.nama as nama_drk,d.nama as nama_rka,e.nama as nama_pp,f.nama as nama_akun,case when a.jenis_agg='B' then 'BARU' else 'LAMA' end as jenis_agg
from agg_abau_d a
inner join agg_pk b on a.kode_pk=b.kode_pk 
inner join agg_drk c on a.kode_drk=c.kode_drk 
inner join agg_rka d on a.kode_rka=d.kode_rka 
inner join agg_pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
inner join agg_masakun f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi
where a.no_abau='$row->no_abau' and a.kode_lokasi='$row->kode_lokasi' and a.progress='$ver' $kode_akun $kode_rka $kode_bidang
order by a.kode_var,a.periode ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		$tot=0;
		$vol=0;
		$jum=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$jumlah=number_format($row1->jumlah,4,",",".");
			$volume=number_format($row1->volume,4,",",".");
			$tarif=number_format($row1->tarif,0,",",".");
			$total=number_format($row1->total,0,",",".");
			$tot=$tot+$row1->total;
			$vol=$vol+$row1->volume;
			$jum=$jum+$row1->jumlah;
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td align='left' class='isi_laporan'>$row1->kode_var</td>
    <td align='left' class='isi_laporan'>$row1->kode_pk</td>
    <td align='left' class='isi_laporan'>$row1->nama_pk</td>
    <td align='left' class='isi_laporan'>$row1->kode_drk</td>
    <td align='left' class='isi_laporan'>$row1->nama_drk</td>
    <td align='left' class='isi_laporan'>$row1->kode_rka</td>
    <td align='left' class='isi_laporan'>$row1->nama_rka</td>
    <td align='left' class='isi_laporan'>$row1->kode_pp</td>
    <td align='left' class='isi_laporan'>$row1->nama_pp</td>
    <td align='left' class='isi_laporan'>$row1->kode_akun</td>
    <td align='left' class='isi_laporan'>$row1->nama_akun</td>
    <td align='left' class='isi_laporan'>$row1->periode</td>
	 <td align='left' class='isi_laporan'>".strtoupper($row1->jenis_agg)."</td>
	<td align='right' class='isi_laporan'>$tarif</td>
    <td align='right' class='isi_laporan'>$jumlah</td>
    <td align='right' class='isi_laporan'>$volume</td>
    <td align='right' class='isi_laporan'>$total </td>
  </tr>";
		$j=$j+1;
		}
		$jum=number_format($jum,0,",",".");
		$vol=number_format($vol,0,",",".");
		$tot=number_format($tot,0,",",".");
	  echo " <tr bgcolor='#CCCCCC'>
    <td colspan='17' align='right' class='header_laporan'>Total&nbsp;</td>
     <td align='right' class='header_laporan'>$tot</td>
  </tr> </table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
