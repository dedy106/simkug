<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptSchSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$kode_lokasi=$tmp[1];
		
		$sql="select a.no_kartu,b.keterangan,d.nama as nama_pp,e.nama as nama_vdr,c.rev,b.nilai as nilai_kartu,a.kode_lokasi,
			sum(case when a.no_bill <> '-' then a.nilai else 0 end) as bymhd 
			from gr_kartu_sch a
			 inner join gr_kartu_m b on a.no_kartu=b.no_kartu and a.kode_lokasi=b.kode_lokasi 
			 left join  (
							select a.no_kartu,sum(a.nilai) as rev
							from gr_kartu_rev a
							group by a.no_kartu
							) c on a.no_kartu=c.no_kartu
			inner join pp d on b.kode_pp=d.kode_pp and b.kode_lokasi=d.kode_lokasi				
			inner join vendor e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi						
		
$this->filter 
GROUP BY  a.no_kartu,b.keterangan,d.nama,e.nama,a.kode_lokasi,b.nilai,c.rev
order by a.no_kartu";



		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo schedule",$this->lokasi," ");
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Kartu</td>
     <td width='100'  align='center' class='header_laporan'>Keterangan</td>
     <td width='100'  align='center' class='header_laporan'>Nama PP/Unit</td>
     <td width='100'  align='center' class='header_laporan'>Nama Vendor</td>
	 <td width='100'  align='center' class='header_laporan'>Nilai</td>
	 <td width='100'  align='center' class='header_laporan'>Akru BMHD</td>
     <td width='100'  align='center' class='header_laporan'>Realisasi BMHD</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo BMHD</td>
     
     </tr>  ";
		$saldo_awal=0;$rekon=0;$kasres=0;$rekon_tak=0;$saldo_akhir=0;$hutang=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$saldo=$row->bymhd - $row->rev;
			$saldo_akhir+=$saldo;
			$saldo1+=$row->nilai_kartu ;
			$saldo2+=$row->bymhd;
			$saldo3+=$row->rev;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row->no_kartu</td>
		<td class='isi_laporan'>$row->keterangan</td>
		<td class='isi_laporan'>$row->nama_pp</td>
		<td class='isi_laporan'>$row->nama_vdr</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_kartu,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bymhd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rev,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo_akhir,0,",",".")."</td>

     </tr>
	 ";
		
		echo "</table>";
		echo "</td>
  </tr>
 
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
