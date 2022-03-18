<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptRekap extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_agg,c.nama ,
	   sum(a.nilai*a.lama_bayar) as total,
	   sum(ISNULL(d.tagihan,0)) as tagihan,sum(ISNULL(e.bayar,0)) as bayar,
	   sum((a.nilai*a.lama_bayar)-ISNULL(e.bayar,0)) as saldo,
	   sum(ISNULL(jum_bayar,0)) as jum_bayar
from kre_ttb2_m a
inner join kre_agg c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as bayar,COUNT(no_ttb) as jum_bayar
		   from kre_ttb2_sch
		   where no_bill<>'-' and no_kas<>'-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,a.no_agg,c.nama
order by a.no_agg";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekapitulasi pinjaman",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Kordinator</td>
	 <td width='90'align='center' class='header_laporan'>Nilai Pinjaman</td>
	 <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_agg','$row->kode_lokasi');\">$row->nama</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.nik_colec,c.nama as nama_colec,
	   sum(a.nilai*a.lama_bayar) as total,
	   sum(ISNULL(d.tagihan,0)) as tagihan,sum(ISNULL(e.bayar,0)) as bayar,
	   sum((a.nilai*a.lama_bayar)-ISNULL(e.bayar,0)) as saldo,
	   sum(ISNULL(jum_bayar,0)) as jum_bayar
from kre_ttb2_m a
inner join karyawan c on a.nik_colec=c.nik and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as bayar,COUNT(no_ttb) as jum_bayar
		   from kre_ttb2_sch
		   where no_bill<>'-' and no_kas<>'-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,a.nik_colec,c.nama
order by a.nik_colec";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Collector</td>
	 <td width='90'align='center' class='header_laporan'>Nilai Pinjaman</td>
	 <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nik_colec','$row->kode_lokasi');\">$row->nama_colec</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.nik_book,c.nama,
	   sum(a.nilai*a.lama_bayar) as total,
	   sum(ISNULL(d.tagihan,0)) as tagihan,sum(ISNULL(e.bayar,0)) as bayar,
	   sum((a.nilai*a.lama_bayar)-ISNULL(e.bayar,0)) as saldo,
	   sum(ISNULL(jum_bayar,0)) as jum_bayar
from kre_ttb2_m a
inner join karyawan c on a.nik_book=c.nik and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as bayar,COUNT(no_ttb) as jum_bayar
		   from kre_ttb2_sch
		   where no_bill<>'-' and no_kas<>'-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,a.nik_book,c.nama
order by a.nik_book";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Demo Booker</td>
	 <td width='90'align='center' class='header_laporan'>Nilai Pinjaman</td>
	 <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nik_book','$row->kode_lokasi');\">$row->nama</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.nik_promo,c.nama,
	   sum(a.nilai*a.lama_bayar) as total,
	   sum(ISNULL(d.tagihan,0)) as tagihan,sum(ISNULL(e.bayar,0)) as bayar,
	   sum((a.nilai*a.lama_bayar)-ISNULL(e.bayar,0)) as saldo,
	   sum(ISNULL(jum_bayar,0)) as jum_bayar
from kre_ttb2_m a
inner join karyawan c on a.nik_promo=c.nik and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as bayar,COUNT(no_ttb) as jum_bayar
		   from kre_ttb2_sch
		   where no_bill<>'-' and no_kas<>'-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,a.nik_promo,c.nama
order by a.nik_promo";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Promotor</td>
	 <td width='90'align='center' class='header_laporan'>Nilai Pinjaman</td>
	 <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nik_promo','$row->kode_lokasi');\">$row->nama</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.nik_ss,c.nama,
	   sum(a.nilai*a.lama_bayar) as total,
	   sum(ISNULL(d.tagihan,0)) as tagihan,sum(ISNULL(e.bayar,0)) as bayar,
	   sum((a.nilai*a.lama_bayar)-ISNULL(e.bayar,0)) as saldo,
	   sum(ISNULL(jum_bayar,0)) as jum_bayar
from kre_ttb2_m a
inner join karyawan c on a.nik_ss=c.nik and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as bayar,COUNT(no_ttb) as jum_bayar
		   from kre_ttb2_sch
		   where no_bill<>'-' and no_kas<>'-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,a.nik_ss,c.nama
order by a.nik_ss";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Sales Supervisor</td>
	 <td width='90'align='center' class='header_laporan'>Nilai Pinjaman</td>
	 <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nik_promo','$row->kode_lokasi');\">$row->nama</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.nik_survey,c.nama,
	   sum(a.nilai*a.lama_bayar) as total,
	   sum(ISNULL(d.tagihan,0)) as tagihan,sum(ISNULL(e.bayar,0)) as bayar,
	   sum((a.nilai*a.lama_bayar)-ISNULL(e.bayar,0)) as saldo,
	   sum(ISNULL(jum_bayar,0)) as jum_bayar
from kre_ttb2_m a
inner join karyawan c on a.nik_survey=c.nik and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as bayar,COUNT(no_ttb) as jum_bayar
		   from kre_ttb2_sch
		   where no_bill<>'-' and no_kas<>'-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,a.nik_survey,c.nama
order by a.nik_survey";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Surveyor</td>
	 <td width='90'align='center' class='header_laporan'>Nilai Pinjaman</td>
	 <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldo('$row->nik_survey','$row->kode_lokasi');\">$row->nama</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		$sql="select a.kode_lokasi,a.kode_pp,c.nama,
	   sum(a.nilai*a.lama_bayar) as total,
	   sum(ISNULL(d.tagihan,0)) as tagihan,sum(ISNULL(e.bayar,0)) as bayar,
	   sum((a.nilai*a.lama_bayar)-ISNULL(e.bayar,0)) as saldo,
	   sum(ISNULL(jum_bayar,0)) as jum_bayar
from kre_ttb2_m a
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as bayar,COUNT(no_ttb) as jum_bayar
		   from kre_ttb2_sch
		   where no_bill<>'-' and no_kas<>'-'
		   group by no_ttb,kode_lokasi
		  )e on a.no_ttb=e.no_ttb and a.kode_lokasi=e.kode_lokasi
$this->filter
group by a.kode_lokasi,a.kode_pp,c.nama
order by a.kode_pp";
		
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Area Bisnis</td>
	 <td width='90'align='center' class='header_laporan'>Nilai Pinjaman</td>
	 <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldo('$row->kode_pp','$row->kode_lokasi');\">$row->nama</a>";
		echo "</td>
	
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
