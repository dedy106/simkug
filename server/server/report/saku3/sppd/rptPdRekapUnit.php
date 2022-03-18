<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptPdRekapUnit extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		
		$sql="select a.periode,a.kode_akun,b.kode_unit,e.nama as nama_akun,d.nama as nama_unit, sum(ISNULL(b.nilai_trans,0)) as trans,
		sum(ISNULL(b.nilai_uhar,0)) as uhar,sum(ISNULL(b.nilai_trans,0)+ISNULL(b.nilai_uhar,0)) as total 
		from sp_stugas_m a
		 left join sp_spj_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi 
		 inner join karyawan c on b.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi
		 left join sp_unit d on b.kode_unit=d.kode_unit and a.kode_lokasi=d.kode_lokasi 
		inner join masakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
		$this->filter
		group by a.periode,a.kode_akun,b.kode_unit,e.nama,d.nama 
		order by a.kode_akun";

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap perjalanan dinas per akun",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
     <td width='60'  align='center' class='header_laporan'>Kode Unit</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Unit</td>
	 <td width='80'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='80'  align='center' class='header_laporan'>Transportasi</td>
	 <td width='100'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$trans=0; $uhar=0; $total=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$trans+=$row->trans;
			$uhar+=$row->uhar;
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->kode_akun</td>
	 <td class='isi_laporan' >$row->nama_akun</td>
	  <td class='isi_laporan'>$row->kode_unit</td>
	 <td class='isi_laporan' >$row->nama_unit</td>
	 <td class='isi_laporan' align='right'>".number_format($row->trans,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->uhar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($trans,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($uhar,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
