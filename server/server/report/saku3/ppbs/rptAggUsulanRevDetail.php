<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptAggUsulanRevDetail extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$tahun=$tmp[0];
		
		$sql="select a.no_rev,a.kode_lokasi,a.kode_pp,b.nama as nama_pp,a.tahun,a.keterangan
from agg_rev_m a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
$this->filter
order by a.kode_pp,a.no_rev";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("usulan pendapatan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='16' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td class='header_laporan' width='100'>No Bukti</td>
        <td width='500' class='header_laporan'>:&nbsp;$row->no_rev</td>
        </tr>
		
      <tr>
        <td class='header_laporan' width='137'>PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
        </tr>
	    
        <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='header_laporan'>No</td>
		<td width='60' align='center' class='header_laporan'>Kode Angkatan</td>
		<td width='150' align='center' class='header_laporan'>Nama Angkatan</td>
        <td width='60' align='center' class='header_laporan'>Kode Parameter</td>
        <td width='150' align='center' class='header_laporan'>Nama Parameter</td>
        <td width='80' align='center' class='header_laporan'>Kode Akun</td>
        <td width='150' align='center' class='header_laporan'>Nama Akun</td>
        <td width='100' align='center' class='header_laporan'>Kode DRK</td>
        <td width='200' align='center' class='header_laporan'>Nama DRK</td>
        <td width='60' align='center' class='header_laporan'>Jumlah</td>
        <td width='90' align='center' class='header_laporan'>Tarif</td>
        <td width='100' align='center' class='header_laporan'>Total</td>
      </tr>";
		$sql="select a.kode_angkat,a.kode_pp,a.kode_param,a.kode_akun,a.kode_drk,a.jumlah,a.tarif,a.total,
	   b.nama as nama_angkat,c.nama as nama_param,d.nama as nama_akun,e.nama as nama_drk
from agg_rev_d a 
inner join agg_angkat b on a.kode_angkat=b.kode_angkat and a.kode_lokasi=b.kode_lokasi
inner join agg_param_klp c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
inner join agg_drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and a.tahun=e.tahun
where a.no_rev='$row->no_rev' and a.kode_lokasi='$row->kode_lokasi' and a.jumlah<>0
order by a.kode_angkat ";
		
		$rs1 = $dbLib->execute($sql);
		$i=1;
		$jumlah=0; $tarif=0; $total=0; 
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$jumlah+=$row1->jumlah;
			$tarif+=$row1->tarif;
			$total+=$row1->total;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row1->kode_angkat</td>
        <td class='isi_laporan'>$row1->nama_angkat</td>
		<td class='isi_laporan'>$row1->kode_param</td>
        <td class='isi_laporan'>$row1->nama_param</td>
		<td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
		<td class='isi_laporan'>$row1->kode_drk</td>
        <td class='isi_laporan'>$row1->nama_drk</td>
       <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->tarif,0,",",".")."</td>
		 <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
		 echo "<tr>
        <td class='header_laporan' align='right' colspan='9'>TOTAL</td>
       <td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
        <td align='right' class='header_laporan'>&nbsp;</td>
		<td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>
  </tr>
  
  ";		
			
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
