<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_inv_rptPasang extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_pasang)
from inv_pasang_m a
inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$sql="select a.no_pasang,a.no_dokumen,a.kode_lokasi,convert(varchar,a.tanggal,103) as tanggal,a.nik_config,b.nama as nama_config,
	   a.keterangan,a.kode_cabang,c.nama as nama_cabang,a.kode_cust,d.nama as nama_cust
from inv_pasang_m a
inner join karyawan b on a.nik_config=b.nik and a.kode_lokasi=b.kode_lokasi
inner join inv_cabang c on a.kode_cabang=c.kode_cabang and a.kode_lokasi=c.kode_lokasi
inner join inv_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_pasang";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("pengeluaran barang",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='19' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Pasang </td>
        <td class='header_laporan'>: $row->no_pasang</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>: $row->tanggal</td>
      </tr>
	
	  <tr>
	    <td class='header_laporan'>No Dokumen</td>
	    <td class='header_laporan'>: $row->no_dokumen</td>
	    </tr>
	<tr>
	  <td class='header_laporan'>NIK Config</td>
	  <td class='header_laporan'>: $row->nik_config - $row->nama_config</td>
	  </tr>
	<tr>
	  <td class='header_laporan'>Customer </td>
	  <td class='header_laporan'>: $row->kode_cust - $row->nama_cust</td>
	  </tr>
	<tr>
	  <td class='header_laporan'>Cabang </td>
	  <td class='header_laporan'>: $row->kode_cabang - $row->nama_cabang</td>
	  </tr>
	
	
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Kode Barang </td>
    <td width='200' align='center' class='header_laporan'>Nama Barang </td>
    <td width='100' align='center' class='header_laporan'>CID</td>
	<td width='100' align='center' class='header_laporan'>BW</td>
	<td width='100' align='center' class='header_laporan'>IP LAN</td>
	<td width='100' align='center' class='header_laporan'>IP WAN</td>
	
  </tr>
";
		
	  $sql1="select a.kode_barang,b.nama,a.cid,a.bw,a.iplan,a.ipwan
from inv_pasang_d a
inner join inv_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi
where a.no_pasang='$row->no_pasang' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_barang desc ";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	  <td align='left' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row1->kode_barang','$row1->kode_lokasi');\">$row1->kode_barang</a>";				  
			echo "</td> <td align='left' class='isi_laporan'>$row1->nama</td>
	<td align='left' class='isi_laporan'>$row1->cid</td>
	<td align='left' class='isi_laporan'>$row1->bw </td>
	<td align='left' class='isi_laporan'>$row1->iplan </td>
	<td align='left' class='isi_laporan'>$row1->ipwan </td>
	
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table></td>
  </tr>
 
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
