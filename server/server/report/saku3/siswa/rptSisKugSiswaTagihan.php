<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisKugSiswaTagihan extends server_report_basic
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
		
		$sql="select kode_ta from sis_ta where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and flag_aktif='1' ";
		$rs = $dbLib->execute($sql);	
		$row = $rs->FetchNextObject($toupper=false);
		$kode_ta=$row->kode_ta;
		echo $sql;
		$sql="select a.periode,substring(a.periode,5,2) as bulan,
	   isnull(a.tagihan,0) as tagihan,isnull(b.bayar,0) as bayar,
	   isnull(a.tagihan,0)-isnull(b.bayar,0) as saldo,
	   case when isnull(a.tagihan,0)-isnull(b.bayar,0)=0 then 'Lunas' else 'Tunggakan' end as jenis
from (select x.periode,x.kode_lokasi,x.kode_pp,
   			      sum(case when x.dc='D' then x.nilai else -x.nilai end) as tagihan		
			from sis_bill_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
			where(x.kode_lokasi = '$kode_lokasi')and(x.kode_ta='$kode_ta') and x.kode_pp='$kode_pp' and x.nis='$nis'		
			group by x.periode,x.kode_lokasi,x.kode_pp
	  )a
left join (select x.periode,x.kode_lokasi,x.kode_pp,
                  sum(case when x.dc='D' then x.nilai else -x.nilai end) as bayar		
			from sis_rekon_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
			inner join sis_bill_d z on x.no_bill=z.no_bill and x.kode_lokasi=z.kode_lokasi and x.kode_pp=z.kode_pp and x.nis=z.nis
			where(x.kode_lokasi = '$kode_lokasi')and(z.kode_ta='$kode_ta') and x.kode_pp='$kode_pp' and x.nis='$nis'		
			group by x.periode,x.kode_lokasi,x.kode_pp
		   )b on a.periode=b.periode and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
order by a.periode";
		echo $sql;
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='500'>
		  <tr align='center' bgcolor='#CCCCCC'>
			<td width='60'  class='header_laporan'>Periode</td>
			<td width='100'  class='header_laporan'>Tagihan</td>
			<td width='100'  class='header_laporan'>Pembayaran</td>
			<td width='100'  class='header_laporan'>Saldo</td>
		  </tr>
		 
		  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
			<td class='isi_laporan'>$row->periode</td>
			<td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
			</tr>";
	
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
