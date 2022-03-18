<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_fa_rptFaLokasi extends server_report_basic
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
		$nama_cab=$tmp[1];
		$sql = "select a.kode_lok,a.nama,
       isnull(b.so_awal,0) as so_awal,isnull(c.debet,0) as debet,isnull(d.kredit,0) as kredit,
       isnull(b.so_awal,0)+isnull(c.debet,0)-isnull(d.kredit,0) as so_akhir,
	   isnull(e.ap,0) as ap_awal,isnull(f.ap,0) as ap_mutasi,isnull(e.ap,0)+isnull(f.ap,0) as ap_akhir
from fa_lokasi a
left join (select b.kode_lokfa,a.kode_lokasi,sum(a.nilai) as so_awal
           from gl_fa_asset a
		   inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
           
           group by b.kode_lokfa,a.kode_lokasi
          )b on a.kode_lok=b.kode_lokfa and a.kode_lokasi=b.kode_lokasi
left join (select b.kode_lokfa,a.kode_lokasi,sum(a.nilai) as debet
           from gl_fa_asset a
		   inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   
           group by b.kode_lokfa,a.kode_lokasi
          ) c on a.kode_lok=c.kode_lokfa and a.kode_lokasi=c.kode_lokasi
left join (select c.kode_lokfa,a.kode_lokasi,sum(b.nilai) as kredit
		   from gl_fa_asset a
		   inner join fawoapp_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fa_asset c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi
		   
		   group by c.kode_lokfa,a.kode_lokasi
		   )d on a.kode_lok=d.kode_lokfa and a.kode_lokasi=d.kode_lokasi 
left join (select c.kode_lokfa,a.kode_lokasi,sum(case when b.dc='D' then b.nilai else -b.nilai end) as ap
           from gl_fa_asset a
		   inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fa_asset c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi
         
           group by c.kode_lokfa,a.kode_lokasi
          ) e on a.kode_lok=e.kode_lokfa and a.kode_lokasi=e.kode_lokasi  
left join (select c.kode_lokfa,a.kode_lokasi,sum(case when b.dc='D' then b.nilai else -b.nilai end) as ap
           from gl_fa_asset a
		   inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
		   inner join fa_asset c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi
          
           group by c.kode_lokfa,a.kode_lokasi
          ) f on a.kode_lok=f.kode_lokfa and a.kode_lokasi=f.kode_lokasi 
		  $this->filter
order by a.kode_lok ";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data lokasi asset",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
   <td align='center' class='header_laporan' width='50'>Kode</td>
   <td align='center' class='header_laporan' width='250'>Nama Lokasi </td>
   <td  align='center' class='header_laporan' width='100'>Nilai Perolehan </td>
   <td align='center' class='header_laporan' width='100'>Akumulasi Penyusutan </td>
   <td align='center' class='header_laporan' width='100'>Nilai Buku </td>
	 </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
		<td class='isi_laporan' align='center'>$row->kode_lok</td>
		<td class='isi_laporan' align='center'>$row->nama</td>
	  <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->ap_akhir,0,",",".")."</td>
		  <td class='isi_laporan' align='right'>".number_format($row->so_akhir-$row->ap_akhir,0,",",".")."</td>
</tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
