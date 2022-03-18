<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptRekapPiu extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$tmp=explode("/",$this->filter);
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.kode_pp,a.kode_lokasi
		,sum(isnull(b.n1,0)-isnull(d.n1,0)) as saw_n1,sum(isnull(b.n2,0)-isnull(d.n2,0)) as saw_n2,sum(isnull(b.n3,0)-isnull(d.n3,0)) as saw_n3,
		sum(isnull(b.total,0)-isnull(d.total,0)) as saw_total
	   ,sum(isnull(c.n1,0)) as debet_n1,sum(isnull(c.n2,0)) as debet_n2,sum(isnull(c.n3,0)) as debet_n3,sum(isnull(c.total,0) )as debet_total
	   ,sum(isnull(e.n1,0) ) as kredit_n1,sum(isnull(e.n2,0)) as kredit_n2,sum(isnull(e.n3,0)) as kredit_n3,sum(isnull(e.total,0)) as kredit_total
,sum(isnull(f.n1,0) ) as kredit_n11,sum(isnull(f.n2,0)) as kredit_n22,sum(isnull(f.n3,0)) as kredit_n33,sum(isnull(f.total,0)) as kredit_total1
	   ,sum(isnull(b.n1,0)-isnull(d.n1,0)+isnull(c.n1,0)-isnull(e.n1,0)) as sak_n1
	   ,sum(isnull(b.n2,0)-isnull(d.n2,0)+isnull(c.n2,0)-isnull(e.n2,0)) as sak_n2
	   ,sum(isnull(b.n3,0)-isnull(d.n3,0)+isnull(c.n3,0)-isnull(e.n3,0)) as sak_n3
	   ,sum(isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0)) as sak_total
from sis_siswa a 
left join (select y.kode_pp,y.kode_lokasi,  
					sum(case when x.kode_param in ('SPP') then x.nilai else 0 end) as n1, 
				   sum(case when x.kode_param  in ('OSIS','ASUR','DSP','MOS','KOP','JOB') then x.nilai else 0 end) as n2, 
				   sum(case when x.kode_param in ('LAIN','LAIN2') then x.nilai else 0 end) as n3,
				   sum(x.nilai) as total		
			from sis_bill_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
					
			group by y.kode_pp,y.kode_lokasi 			
			)b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join (select y.kode_pp,y.kode_lokasi,  
				sum(case when x.kode_param in ('SPP') then x.nilai else 0 end) as n1, 
				   sum(case when x.kode_param  in ('OSIS','ASUR','DSP','MOS','KOP','JOB') then x.nilai else 0 end) as n2, 
				   sum(case when x.kode_param in ('LAIN','LAIN2') then x.nilai else 0 end) as n3,
				   sum(x.nilai) as total		
			from sis_bill_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
						
			group by y.kode_pp,y.kode_lokasi 			
			)c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select y.kode_pp,y.kode_lokasi,  
				  sum(case when x.kode_param in ('SPP') then x.nilai else 0 end) as n1, 
				   sum(case when x.kode_param  in ('OSIS','ASUR','DSP','MOS','KOP','JOB') then x.nilai else 0 end) as n2, 
				   sum(case when x.kode_param in ('LAIN','LAIN2') then x.nilai else 0 end) as n3,
				   sum((case when x.dc='D' then x.nilai else -x.nilai end)) as total
			from sis_rekon_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
					
			group by y.kode_pp,y.kode_lokasi 			
			)d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
left join (select y.kode_pp,y.kode_lokasi, 
			    sum(case when x.kode_param in ('SPP') then x.nilai else 0 end) as n1, 
				   sum(case when x.kode_param  in ('OSIS','ASUR','DSP','MOS','KOP','JOB') then x.nilai else 0 end) as n2, 
				   sum(case when x.kode_param in ('LAIN','LAIN2') then x.nilai else 0 end) as n3,
				   sum((case when x.dc='D' then x.nilai else -x.nilai end)) as total
			from sis_rekon_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode')			
			group by y.kode_pp,y.kode_lokasi 			
			)e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi

left join (select y.kode_pp,y.kode_lokasi, 
			    sum(case when x.kode_param in ('SPP') then x.nilai else 0 end) as n1, 
				   sum(case when x.kode_param  in ('OSIS','ASUR','DSP','MOS','KOP','JOB') then x.nilai else 0 end) as n2, 
				   sum(case when x.kode_param in ('LAIN','LAIN2') then x.nilai else 0 end) as n3,
				   sum((case when x.dc='D' then x.nilai else -x.nilai end)) as total
			from sis_rekon_d x 			
			inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode')
					
			group by y.kode_pp,y.kode_lokasi 			
			)f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi
			GROUP BY a.kode_pp,a.kode_lokasi								
				$this->filter ";

				echo $sql;

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rekap piutang",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Kode PP</td>
    <td width='100' align='center' class='header_laporan'>Nama PP</td>	
	<td width='60' align='center' class='header_laporan' colspan='4'>Saldo Awal</td>
	<td width='100' align='center' class='header_laporan' colspan='4'>Tagihan</td>
    <td width='200' align='center' class='header_laporan' colspan='4'>Pembayaran Bulan Berjalan</td>
	<td width='200' align='center' class='header_laporan' colspan='4'>Pembayaran Bulan Sebelumnya</td>
	<td width='80' align='center' class='header_laporan' colspan='4'>Saldo Akhir</td>
   </tr>";
   echo
	 "<tr>
    <td class='header_laporan' align='center' colspan='6'></td>
    <td width='80' align='center' class='header_laporan'>DPP</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>DPP</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>DPP</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>DPP</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>DPP</td>
	<td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
    </tr>";	 
		$saw_n1=0;$saw_n2=0;$saw_n3=0;$saw_total=0;
		$sak_n1=0;$sak_n2=0;$sak_n3=0;$sak_total=0;
		$debet_n1=0;$debet_n2=0;$debet_n3=0;$debet_total=0;
		$kredit_n1=0;$kredit_n2=0;$kredit_n3=0;$kredit_total=0;
		$kredit_n11=0;$kredit_n22=0;$kredit_n33=0;$kredit_total1=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saw_n1+=$row->saw_n1; $saw_n2+=$row->saw_n2; $saw_n3+=$row->saw_n3; $saw_total+=$row->saw_total;
			$debet_n1+=$row->debet_n1; $debet_n2+=$row->debet_n2; $debet_n2+=$row->debet_n2; $debet_total+=$row->debet_total;
			$kredit_n1+=$row->kredit_n1; $kredit_n2+=$row->kredit_n2; $kredit_n3+=$row->kredit_n3; $kredit_total+=$row->kredit_total;
			$kredit_n11+=$row->kredit_n11; $kredit_n22+=$row->kredit_n22; $kredit_n33+=$row->kredit_n33; $kredit_total1+=$row->kredit_total1;
			$sak_n1+=$row->sak_n1; $sak_n2+=$row->sak_n2; $sak_n3+=$row->sak_n3; $sak_total+=$row->sak_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_kelas</td>
    <td class='isi_laporan'>$row->nama</td>

    <td class='isi_laporan' align='right'>".number_format($row->saw_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n11,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n22,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n33,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_total1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_total,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='3'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($saw_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saw_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saw_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saw_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n11,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n22,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_n33,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit_total1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
