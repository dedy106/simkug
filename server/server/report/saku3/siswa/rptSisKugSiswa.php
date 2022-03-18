<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisKugSiswa extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$nis=$tmp[3];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.nis,a.nama,isnull(b.dsp,0)-isnull(c.dsp,0) as dsp,isnull(b.spp,0)-isnull(c.spp,0) as spp,isnull(b.lain,0)-isnull(c.lain,0) as lain,
	   isnull(b.total,0)-isnull(c.total,0) as tagihan
from sis_siswa a 
left join (select a.nis,a.kode_lokasi,a.kode_pp,  
					sum(case when a.kode_param in ('DSP') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as dsp, 
				   sum(case when a.kode_param in ('SPP') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end)  as spp, 
				   sum(case when a.kode_param not in ('DSP','SPP') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end)  as lain,
				   sum(case when a.dc='D' then a.nilai else -a.nilai end) as total		
			from sis_bill_d a 			
			where a.kode_lokasi = '$kode_lokasi' and a.periode <= '$periode' and a.kode_pp='$kode_pp' and a.nis='$nis'		
			group by a.nis,a.kode_lokasi,a.kode_pp		
			)b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
left join (select a.nis,a.kode_lokasi,a.kode_pp, 
				sum(case when a.kode_param in ('DSP') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as dsp, 
				   sum(case when a.kode_param in ('SPP') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end)  as spp, 
				   sum(case when a.kode_param not in ('DSP','SPP') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end)  as lain,
				   sum(case when a.dc='D' then a.nilai else -a.nilai end) as total				
			from sis_rekon_d a
			where a.kode_lokasi = '$kode_lokasi' and a.periode <='$periode' and a.kode_pp='$kode_pp' and a.nis='$nis'				
			group by a.nis,a.kode_lokasi,a.kode_pp			
			)c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
$this->filter
 ";
		$rs = $dbLib->execute($sql);	
		$row = $rs->FetchNextObject($toupper=false);
		$tagihan=$row->tagihan;
		$dsp=$row->dsp;
		$spp=$row->spp;
		$lain=$row->lain;
		
		$sql="select a.nis,a.nama,isnull(c.nilai,0) as pdd
from sis_siswa a 
left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
		from sis_cd_d a			
		inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
		where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode' and a.kode_pp='$kode_pp' and a.nis='$nis'
		group by a.nis,a.kode_lokasi,a.kode_pp
		)c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nis'";
		$rs = $dbLib->execute($sql);	
		$row = $rs->FetchNextObject($toupper=false);
		$pdd=$row->pdd;
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("keuangan siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='500'>
		  <tr align='center' bgcolor='#CCCCCC'>
			<td width='30'  class='header_laporan'>No</td>
			<td width='300'  class='header_laporan'>Keterangan</td>
			<td width='100'  class='header_laporan'>Nilai</td>
		  </tr>
		  <tr  >
			<td width='30'  class='header_laporan' align='center'>1</td>
			<td width='300'  class='header_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTagihan();\">Tagihan</a></td>
			<td width='100'  class='header_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
		  </tr>
		  <tr  >
			<td width='30'  class='header_laporan' align='center'>1.1</td>
			<td width='300'  class='header_laporan'>DSP</td>
			<td width='100'  class='header_laporan' align='right'>".number_format($dsp,0,",",".")."</td>
		  </tr>
		  <tr  >
			<td width='30'  class='header_laporan' align='center'>1.2</td>
			<td width='300'  class='header_laporan'>SPP</td>
			<td width='100'  class='header_laporan' align='right'>".number_format($spp,0,",",".")."</td>
		  </tr>
		  <tr  >
			<td width='30'  class='header_laporan' align='center'>1.3</td>
			<td width='300'  class='header_laporan'>Lain</td>
			<td width='100'  class='header_laporan' align='right'>".number_format($lain,0,",",".")."</td>
		  </tr>
		   <tr  >
			<td width='30'  class='header_laporan' align='center'>3</td>
			<td width='300'  class='header_laporan'>Deposit (PDD)</td>
			<td width='100'  class='header_laporan' align='right'>".number_format($pdd,0,",",".")."</td>
		  </tr>
		   <tr  >
			<td width='30'  class='header_laporan' align='center'>2</td>
			<td width='300'  class='header_laporan'>Rincian Pembayaran</td>
			<td width='100'  class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
		  </tr>
		  
		  ";
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
