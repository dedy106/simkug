<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggAbau extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_abau)
from agg_abau_m a
inner join bidang b on a.kode_bidang=b.kode_bidang  $this->filter ";
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$tahun=$tmp[2];
		$bidang=$tmp[3];
		
		$sql="select a.no_abau,a.tahun,a.kode_bidang,a.nilai,b.nama as nama_bidang
from agg_abau_m a
inner join bidang b on a.kode_bidang=b.kode_bidang  $this->filter
order by a.no_abau";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("biaya administrasi dan umum",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_abau</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Bidang </td>
        <td class='header_laporan'>:&nbsp;$row->kode_bidang -&nbsp; $row->nama_bidang</td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>Kode Var</td>
    <td width='150' align='center' class='header_laporan'>Nama Var</td>
    <td width='60' align='center' class='header_laporan'>Kode Akun</td>
    <td width='150' align='center' class='header_laporan'>Nama Akun</td>
	 <td width='60' align='center' class='header_laporan'>Kode PP</td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
    <td width='60' align='center' class='header_laporan'>Kode DRK </td>
    <td width='150' align='center' class='header_laporan'>Nama DRK</td>
    <td width='150' align='center' class='header_laporan'>Kegiatan </td>
	<td width='50' align='center' class='header_laporan'>Status</td>
    <td width='50' align='center' class='header_laporan'>Periode</td>
    <td width='40' align='center' class='header_laporan'>Jumlah</td>
    <td width='40' align='center' class='header_laporan'>Volume</td>
	<td width='80' align='center' class='header_laporan'>Tarif</td>
   	<td width='90' align='center' class='header_laporan'>Total</td>
	
  </tr>";
			$sql1="select  a.kode_var,b.nama as nama_var, a.kode_akun,d.nama as nama_akun,a.kode_drk,c.nama as nama_drk,
        a.kegiatan,  a.tarif, a.jumlah, a.volume, a.bulan,a.periode, a.total,a.status,a.kode_pp,e.nama as nama_pp
from agg_abau_d a 
inner join agg_var b on a.kode_var=b.kode_var and a.tahun=b.tahun
inner join agg_drk c on a.kode_drk=c.kode_drk and a.tahun=c.tahun
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
where a.no_abau='$row->no_abau' ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $tarif=0; $total=0;$volume=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$tarif=$tarif+$row1->tarif;
				$volume=$volume+$row1->volume;
				$total=$total+$row1->total;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_var</td>
    <td class='isi_laporan'>$row1->nama_var</td>
	<td class='isi_laporan'>$row1->kode_akun</td>
    <td  class='isi_laporan'>$row1->nama_akun</td>
	<td class='isi_laporan'>$row1->kode_pp</td>
    <td  class='isi_laporan'>$row1->nama_pp</td>
    <td  class='isi_laporan'>$row1->kode_drk</td>
    <td class='isi_laporan'>$row1->nama_drk</td>
    <td class='isi_laporan'>$row1->kegiatan</td>
    <td  align='center' class='isi_laporan'>$row1->status</td>
    <td align='center' class='isi_laporan'>$row1->periode</td>
   <td align='center' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->volume,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tarif,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='10' align='center'  class='header_laporan'>Total</td>
	<td align='center' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
    <td align='center' class='header_laporan'>".number_format($volume,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($tarif,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
