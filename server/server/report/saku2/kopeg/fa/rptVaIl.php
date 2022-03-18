<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_fa_rptVaIl extends server_report_basic
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
		$periode=$tmp[0];
		
		
		$sql="select a.kode_lokasi,a.kode_prodi,a.kode_klp,b.nama as nama_lokasi,c.nama as nama_klp,d.nama as nama_prodi
from (select a.kode_lokasi,a.kode_prodi,b.kode_klp
	from va_fa_asset a
	inner join va_gedung b on a.kode_gedung=b.kode_gedung and a.kode_lokasi=b.kode_lokasi
	group by a.kode_lokasi,a.kode_prodi,b.kode_klp
	 )a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
inner join va_klp c on a.kode_klp=c.kode_klp and a.kode_lokasi=c.kode_lokasi
inner join va_prodi d on a.kode_prodi=d.kode_prodi and a.kode_lokasi=d.kode_lokasi";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("invetarisasi lapangan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>Lembaga </td>
        <td class='header_laporan'>:&nbsp;$row->nama_lokasi</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Unit Kerja </td>
        <td class='header_laporan'>:&nbsp;$row->nama_prodi</td>
        </tr>
	   
      <tr>
        <td class='header_laporan'>Kelompok Lokasi   </td>
        <td class='header_laporan'>:&nbsp;$row->nama_klp</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='200' align='center' class='header_laporan'>Lokasi</td>
	<td width='200' align='center' class='header_laporan'>Nama Barang </td>
    <td width='50' align='center' class='header_laporan'>Jumlah Barang </td>
    <td width='30' align='center' class='header_laporan'>No Urut </td>
    <td width='120' align='center' class='header_laporan'>No Label</td>
	 <td width='80' align='center' class='header_laporan'>Status</td>
  
  </tr>
";
			$sql1="
select a.kode_gedung,a.kode_jenis,b.nama as nama_gedung,c.nama as nama_jenis,a.barcode,a.kode_kondisi,d.nama as nama_kondisi,isnull(e.jumlah,0) as jumlah
from va_fa_asset a
inner join va_gedung b on a.kode_gedung=b.kode_gedung and a.kode_lokasi=b.kode_lokasi
inner join va_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi
inner join va_kondisi d on a.kode_kondisi=d.kode_kondisi and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_lokasi,a.kode_gedung,a.kode_jenis,count(a.no_bukti) as jumlah
		from va_fa_asset a
		group by a.kode_lokasi,a.kode_gedung,a.kode_jenis
		  )e on a.kode_lokasi=e.kode_lokasi and a.kode_gedung=e.kode_gedung and a.kode_jenis=e.kode_jenis
where a.kode_lokasi='$row->kode_lokasi' and a.kode_prodi='$row->kode_prodi' and b.kode_klp='$row->kode_klp' 
order by a.barcode";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai_ap=0; $nilai=0; $nilai_buku=0; 
			$tmp="";$first = true;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$beda = $tmp!=$row1->kode_jenis; 
				if ($tmp!=$row1->kode_jenis)
				{
					$tmp=$row1->kode_jenis;
					$first = true;
				}
				$nilai_ap=$nilai_ap+$row1->nilai_ap;
				$nilai=$nilai+$row1->nilai;
				$nilai_buku=$nilai_buku+$row1->nilai_buku;
				echo "<tr>
    <td  class='isi_laporan'>".($beda && $first? $row1->nama_gedung:"")."</td>
    <td  class='isi_laporan'>".($beda && $first? $row1->nama_jenis:"")."</td>
    <td align='center' class='isi_laporan'>".($beda && $first? $row1->jumlah:"")."</td>
	<td align='center' class='isi_laporan'>$j</td>
	<td class='isi_laporan'>$row1->barcode</td>
	<td class='isi_laporan'>$row1->nama_kondisi</td>
  
  </tr>";		
				$j=$j+1;
				$first = true;
			}
			echo "<br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
