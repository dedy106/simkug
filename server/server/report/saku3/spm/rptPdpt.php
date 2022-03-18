<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptPdpt extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($periode,0,4);

		$sql="select a.kode_lokasi,a.kode_akun,b.nama as nama_akun,isnull(c.nilai,0) as n1,isnull(d.nilai,0) as n2,isnull(c.nilai,0)+isnull(d.nilai,0) as n3
		from (select kode_akun,kode_lokasi 
			from spm_piutang_j 
			where  dc='C' and jenis='PDPT' and substring(periode,1,4)='$tahun' and kode_lokasi='$kode_lokasi'
			group by kode_akun,kode_lokasi 
			)a
		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		left join (select kode_akun,kode_lokasi ,sum(nilai) as nilai
				   from spm_piutang_j 
				   where substring(periode,1,4)='$tahun' and periode<'$periode' and dc='C' and jenis='PDPT' and kode_lokasi='$kode_lokasi'
				   group by kode_akun,kode_lokasi
				   )c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
		left join (select kode_akun,kode_lokasi ,sum(nilai) as nilai
				   from spm_piutang_j 
				   where periode='$periode' and dc='C' and jenis='PDPT' and kode_lokasi='$kode_lokasi'
				   group by kode_akun,kode_lokasi
				   )d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
		$this->filter
		order by a.kode_akun";
		

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("akun pendapatan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>Akun</td>
	 <td width='300' align='center' class='header_laporan'>Nama Akun</td>
	 <td width='100' align='center' class='header_laporan'>S/d Bulan Lalu</td>
	 <td width='100' align='center' class='header_laporan'>Bulan Ini</td>
	 <td width='100' align='center' class='header_laporan'>S/d Bulan Ini</td>
   </tr>
  ";
		$n1=0;$n2=0;$n3=0;$total1=0;$total2=0;$total3=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total1+=$row->n1;
			$total2+=$row->n2;
			$total3+=$row->n3;


		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAkun('$row->kode_akun','$row->kode_lokasi');\">$row->nama_akun</a>";
	 echo "</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
		     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='3'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($total1,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($total2,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($total3,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
