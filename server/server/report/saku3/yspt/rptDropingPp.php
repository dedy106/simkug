<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yspt_rptDropingPp extends server_report_basic
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
		
		$sql="select a.kode_pp,a.kode_lokasi,b.nama,ISNULL(c.nilai,0) as agg,ISNULL(d.nilai,0) as minta,
	   ISNULL(e.nilai,0) as app,ISNULL(f.nilai,0) as kas,ISNULL(c.nilai,0)-ISNULL(f.nilai,0) as sisa
from (select a.kode_pp,a.kode_lokasi
	  from anggaran_d a
	  where a.kode_lokasi='$lokasi' 
	  group by a.kode_pp,a.kode_lokasi
	  )a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,SUM(nilai) as nilai
		   from anggaran_d a
		   where a.kode_lokasi='$lokasi' and a.periode='$periode' 
		   group by a.kode_pp,a.kode_lokasi
		   )c on a.kode_pp=c.kode_pp and a.kode_lokasi=b.kode_lokasi 
left join (select a.kode_pp,a.kode_lokasi,SUM(b.nilai_usul) as nilai
		   from ys_minta_m a
		   inner join ys_minta_d b on a.no_minta=b.no_minta and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$lokasi' and a.periode='$periode' 
		   group by a.kode_pp,a.kode_lokasi
		   )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
left join (select a.kode_pp,a.kode_lokasi,SUM(b.nilai_usul) as nilai
		   from ys_minta_m a
		   inner join ys_minta_d b on a.no_minta=b.no_minta and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$lokasi' and a.periode='$periode' and a.no_app<>'-' 
		   group by a.kode_pp,a.kode_lokasi
		   )e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi 
left join (select a.kode_pp,a.kode_lokasi,SUM(b.nilai_usul) as nilai
		   from ys_minta_m a
		   inner join ys_minta_d b on a.no_minta=b.no_minta and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$lokasi' and a.periode='$periode' and a.no_kas<>'-' 
		   group by a.kode_pp,a.kode_lokasi
		   )f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi 	   		   
where a.kode_lokasi='$lokasi'
order by a.kode_pp ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo droping",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='200'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='100'  align='center' class='header_laporan'>Anggaran</td>
	 <td width='100'  align='center' class='header_laporan'>Pengajuan</td>
	 <td width='100'  align='center' class='header_laporan'>Approval</td>
	 <td width='100'  align='center' class='header_laporan'>Droping</td>
	 <td width='100'  align='center' class='header_laporan'>Sisa</td>
	 <td width='60'  align='center' class='header_laporan'>% Penyerapan</td>
     </tr>  ";
		$agg=0; $minta=0; $app=0; $kas=0; $sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$agg+=$row->agg;
			$minta+=$row->minta;
			$app+=$row->app;
			$kas+=$row->kas;
			$sisa+=$row->sisa;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->kode_pp</td>
	 <td class='isi_laporan' >$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->agg,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->minta,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->app,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->kas,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->sisa,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($agg,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($minta,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($app,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($kas,0,",",".")."</td>
		  <td class='isi_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
