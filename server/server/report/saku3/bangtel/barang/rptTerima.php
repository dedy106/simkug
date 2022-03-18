<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_bangtel_barang_rptTerima extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_terima)
from log_terima_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi  $this->filter ";
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
		
		
		$sql="select a.no_terima,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.no_po,a.kode_vendor,b.nama as nama_vendor 
from log_terima_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi $this->filter
order by a.no_terima";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penerimaan barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_terima</td>
        </tr>
	    <tr>
        <td class='header_laporan'>vendor </td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor -&nbsp; $row->nama_vendor</td>
      </tr>
       <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	   <tr>
        <td class='header_laporan'>No PO   </td>
        <td class='header_laporan'>:&nbsp;$row->no_po</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>Kode Barang</td>
    <td width='100' align='center' class='header_laporan'>Nama Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
	 <td width='90' align='center' class='header_laporan'>No Seri</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
  
	
  </tr>";
			$sql1="select a.kode_barang,d.nama,c.merk,c.tipe,c.catatan,a.total as nilai
from brg_trans_d a
inner join log_terima_m b on a.no_bukti=b.no_terima and a.kode_lokasi=b.kode_lokasi
inner join log_spk_d c on c.no_spk=b.no_po and a.kode_lokasi=b.kode_lokasi
inner join brg_barang d on a.kode_barang=d.kode_barang and a.kode_lokasi=d.kode_lokasi
 
order by a.no_bukti ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai_ppn=0; $nilai=0; $total=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai_ppn=$nilai_ppn+$row1->nilai_ppn;
				$nilai=$nilai+$row1->nilai;
				$total=$total+$row1->total;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_barang</td>
    <td class='isi_laporan'>$row1->nama</td>
	<td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
	<td class='isi_laporan'>$row1->catatan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
   
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='6' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
  
  </tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
