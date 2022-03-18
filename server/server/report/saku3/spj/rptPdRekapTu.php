<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptPdRekapTu extends server_report_basic
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
		
		$sql="select a.kode_pp,g.nama as pp,b.nama as nama_spj,a.nik_spj,a.kode_pp,a.kode_lokasi,case when a.jenis_pd='DN' then upper('DALAM NEGRI') else upper('LUAR NEGRI') end as jenispd,
		b.nik, b.nama, sum(isnull(c.total1,0)) as total1, sum(isnull(e.total2,0)) as total2, sum(isnull(f.total3,0)) as total3
		from tu_pdaju_m a 
		inner join karyawan b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi
		inner join tu_pdapp_m d on a.no_app=d.no_app and a.kode_lokasi=d.kode_lokasi
		left join 
		(select no_spj, sum(total) as total1
		from tu_pdaju_d 
		where kode_param = ('11') and kode_lokasi='$lokasi'
		group by no_spj
		union ALL
		select no_spj, sum(total) as total1
		from tu_pdaju_d 
		where kode_param = ('12') and kode_lokasi='$lokasi' 
		group by no_spj ) c on a.no_spj=c.no_spj 

		left join 
		(select a.no_spj, sum(a.total) as total2
		from tu_pdaju_d a
		inner join tu_pd_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi 
		where c.jenis = ('2') and a.kode_lokasi='$lokasi'
		group by a.no_spj) e on a.no_spj=e.no_spj 

		left join 
		(select a.no_spj, sum(a.total) as total3
		from tu_pdaju_d a
		inner join tu_pd_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi 
		where c.jenis = ('3') and a.kode_lokasi='11'
		group by a.no_spj) f on a.no_spj=e.no_spj
		$this->filter 
		GROUP BY b.nama,a.nik_spj,a.kode_pp,a.kode_lokasi,a.jenis_pd,
		b.nik, b.nama,a.kode_pp,g.nama ";
echo $sql;		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap perjalanan dinas per karyawan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>NIK</td>
	 <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='200'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='80'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='80'  align='center' class='header_laporan'>Transportasi</td>
	 <td width='80'  align='center' class='header_laporan'>Lain-Lain</td>
	 <td width='150'  align='center' class='header_laporan'>Dalam Negri / Luar Negri</td>
	 <td width='100'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$total=0; $total1=0; $total2=0; $total3=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->total1+$row->total2+$row->total3;
			$total1+=$row->total1;
			$total2+=$row->total2;
			$total3+=$row->total3;
			$tottal+=$total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->nik_spj</td>
	 <td class='isi_laporan' >$row->nama_spj</td>
	  <td class='isi_laporan' align='center'>$row->kode_pp</td>
	 <td class='isi_laporan' >$row->pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total3,0,",",".")."</td>
	 <td class='isi_laporan' >$row->jenispd</td>
	 <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($total1,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($total3,0,",",".")."</td>
		<td class='isi_laporan' > </td>
		 <td class='isi_laporan' align='right'>".number_format($tottal,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
