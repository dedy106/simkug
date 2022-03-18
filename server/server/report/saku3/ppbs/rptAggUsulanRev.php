<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptAggUsulanRev extends server_report_basic
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
		<td width='60' align='center' class='header_laporan'>Kode</td>
        <td width='200' align='center' class='header_laporan'>Nama</td>
        <td width='90' align='center' class='header_laporan'>BPP Paket Genap Mala</td>
        <td width='90' align='center' class='header_laporan'>BPP Non Paket Genap Mala</td>
        <td width='90' align='center' class='header_laporan'>Rata-Rata SKS Non Paket</td>
        <td width='90' align='center' class='header_laporan'>BPP Paket Ganjil Mala</td>
        <td width='90' align='center' class='header_laporan'>BPP Non Paket Ganjil Mala</td>
        <td width='90' align='center' class='header_laporan'>Rata-Rata SKS Ganjil Mala</td>
        <td width='90' align='center' class='header_laporan'>Maba Jalur Non USM</td>
        <td width='90' align='center' class='header_laporan'>Maba Jalur USM</td>
        <td width='90' align='center' class='header_laporan'>Total</td>
      </tr>";
		$sql="select a.no_rev, a.kode_lokasi, a.kode_angkat, b.nama as nama_angkat, a.n1, a.n2, a.n3, a.n4, a.n5, a.n6, a.n7, a.n8,a.n1+a.n2+a.n3+a.n4+a.n5+a.n6+a.n7+a.n8 as n9  
		from agg_rev_load a
		inner join agg_angkat b on a.kode_angkat=b.kode_angkat and a.kode_lokasi=b.kode_lokasi
		where a.no_rev = '$row->no_rev' and a.kode_lokasi='$row->kode_lokasi' ";
		
		$rs1 = $dbLib->execute($sql);
		$i=1;
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; 
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$n1+=$row1->n1;
			$n2+=$row1->n2;
			$n3+=$row1->n3;
			$n4+=$row1->n4;
			$n5+=$row1->n5;
			$n6+=$row1->n6;
			$n7+=$row1->n7;
			$n8+=$row1->n8;
			$n9+=$row1->n9;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row1->kode_angkat</td>
        <td class='isi_laporan'>$row1->nama_angkat</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n1,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n2,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n3,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n4,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n5,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n6,0,",",".")."</td>
       <td align='right' class='isi_laporan'>".number_format($row1->n7,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n8,0,",",".")."</td>
		 <td align='right' class='isi_laporan'>".number_format($row1->n9,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
		 echo "<tr>
        <td class='header_laporan' align='right' colspan='3'>TOTAL</td>
        <td align='right' class='header_laporan'>".number_format($n1,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n2,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n3,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n4,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n5,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n6,0,",",".")."</td>
       <td align='right' class='header_laporan'>".number_format($n7,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n8,0,",",".")."</td>
		<td align='right' class='header_laporan'>".number_format($n9,0,",",".")."</td>
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
  
