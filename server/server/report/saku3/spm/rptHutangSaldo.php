<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptHutangSaldo extends server_report_basic
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
		
		$sql="select DISTINCT f.kode_vendor,f.pajak,a.kode_proyek,e.nilai,d.keterangan,d.tanggal,a.kode_proyek,b.bdd,c.beban,b.bdd-isnull(c.beban,0) as saldo_bdd,
		sum(b.bdd-isnull(c.beban,0)-e.nilai) as total 
				from spm_proyek a 
				inner join (
				select a.no_bukti,c.kode_proyek,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as bdd 
				from spm_proyek_bdd a  
						inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi 
						inner join spm_proyek_jenis d on c.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi 
				group by a.no_bukti,c.kode_proyek		
				) b on a.kode_proyek = b.kode_proyek 
				left join ( 
				select no_reklas,kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as beban 
				from spm_proyek_reklas_d  
				group by no_reklas,kode_proyek 
				) c  on a.kode_proyek=c.kode_proyek
				inner join spm_proyek_reklas_m d on c.no_reklas=d.no_reklas and a.kode_lokasi=d.kode_lokasi 
		inner join spm_proyek_reklas_j e on c.no_reklas=e.no_reklas
		inner join yk_pb_d f on b.no_bukti=f.no_pb
		GROUP BY f.pajak,f.kode_vendor,d.keterangan,d.tanggal,a.kode_proyek,e.nilai,b.bdd,c.beban
$this->filter order by a.kode_proyek";
		echo $sql;
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='120'  align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Vendor</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Saldo BDD</td>
	 <td width='90'  align='center' class='header_laporan'>PPH</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Penyelesaian</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Akhir</td>
     </tr>  ";
		$saldo_awal=0;$tot=0;$kasres=0;$rekon_tak=0;$saldo_akhir=0;$hutang=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$saldo_awal+=$row->saldo_bdd;
			$tot+=$row->total;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row->no_reklas</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->kode_vendor</td>
	 <td class='isi_laporan'>$row->keterangan</td>
     <td class='isi_laporan' align='right'>".number_format($row->saldo_bdd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pajak,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($saldo_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tot,0,",",".")."</td>
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
