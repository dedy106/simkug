<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptRekapPiuTwPp extends server_report_basic
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
		$jenis=$tmp[3];
		$filterpp = $tmp[4];
        $nama_file="saldo.xls";
        
        // if($kode_pp == ""){
        //     $filterpp = " and x.kode_pp LIKE '%' ";
        // }else{
        //     $filterpp = " and x.kode_pp = '$kode_pp' ";
        // }
		
		// echo $filterpp;

		$tahun=substr($periode,0,4);
		$bulan=substr($periode,4,2);
		$periode_awal=$tahun."01";
		if(strlen($bulan) > 1){
			$bulan = $bulan;
		}else{
			$bulan = "0".$bulan;
		}
		if ($bulan=='01' || $bulan=='02' || $bulan=='03')
		{
			$tw="and substring(x.periode,5,2) between '01' and '03' and substring(x.periode,1,4)='$tahun' ";
			$dw="and substring(z.periode,5,2) between '01' and '03' and substring(z.periode,1,4)='$tahun' ";
			$title = "TW1";
		}
		if ($bulan=='04' || $bulan=='05' || $bulan=='06')
		{
			// $tw="and substring(x.periode,5,2) between '04' and '06' and substring(x.periode,1,4)='$tahun' ";
			// $dw="and substring(z.periode,5,2) between '04' and '06' and substring(z.periode,1,4)='$tahun' ";
			$tw="and substring(x.periode,5,2) between '01' and '06' and substring(x.periode,1,4)='$tahun' ";
			$dw="and substring(z.periode,5,2) between '01' and '06' and substring(z.periode,1,4)='$tahun' ";
			$title = "TW2";
		}
		if ($bulan=='07' || $bulan=='08' || $bulan=='09')
		{
			// $tw="and substring(x.periode,5,2) between '07' and '09' and substring(x.periode,1,4)='$tahun' ";
			// $dw="and substring(z.periode,5,2) between '07' and '09' and substring(z.periode,1,4)='$tahun' ";
			$tw="and substring(x.periode,5,2) between '01' and '09' and substring(x.periode,1,4)='$tahun' ";
			$dw="and substring(z.periode,5,2) between '01' and '09' and substring(z.periode,1,4)='$tahun' ";
			$title = "TW3";
		}
		if ($bulan=='10' || $bulan=='11' || $bulan=='12')
		{
			// $tw="and substring(x.periode,5,2) between '10' and '12' and substring(x.periode,1,4)='$tahun' ";
			// $dw="and substring(z.periode,5,2) between '10' and '12' and substring(z.periode,1,4)='$tahun' ";
			$tw="and substring(x.periode,5,2) between '01' and '12' and substring(x.periode,1,4)='$tahun' ";
			$dw="and substring(z.periode,5,2) between '01' and '12' and substring(z.periode,1,4)='$tahun' ";
			$title = "TW4";
		}
		
		$tw1="";
		$title = "TW";
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		$sql="select a.kode_pp,a.nama,a.kode_lokasi,a.kode_pp
		,isnull(b.n1,0)-isnull(d.n1,0) as saw_n1,isnull(b.n2,0)-isnull(d.n2,0) as saw_n2,isnull(b.n3,0)-isnull(d.n3,0) as saw_n3,isnull(b.total,0)-isnull(d.total,0) as saw_total
	   ,isnull(c.n1,0) as debet_n1,isnull(c.n2,0) as debet_n2,isnull(c.n3,0) as debet_n3,isnull(c.total,0) as debet_total
	   ,isnull(e.n1,0) as kredit_n1,isnull(e.n2,0) as kredit_n2,isnull(e.n3,0) as kredit_n3,isnull(e.total,0) as kredit_total
	   ,isnull(h.n1,0) as kredit_n11,isnull(h.n2,0) as kredit_n22,isnull(h.n3,0) as kredit_n33,isnull(h.total,0) as kredit_total1
	   ,isnull(b.n1,0)-isnull(d.n1,0)+isnull(c.n1,0)-isnull(e.n1,0)-isnull(h.n1,0) as sak_n1
	   ,isnull(b.n2,0)-isnull(d.n2,0)+isnull(c.n2,0)-isnull(e.n2,0)-isnull(h.n2,0) as sak_n2
	   ,isnull(b.n3,0)-isnull(d.n3,0)+isnull(c.n3,0)-isnull(e.n3,0)-isnull(h.n3,0) as sak_n3
	   ,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0)-isnull(h.total,0) as sak_total
from pp a 
left join (select x.kode_pp,x.kode_lokasi,  
					sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
			from sis_bill_d x 			
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode_awal') $filterpp			
			group by x.kode_pp,x.kode_lokasi 			
			)b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join (select x.kode_pp,x.kode_lokasi,  
				sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
			from sis_bill_d x 	
			where(x.kode_lokasi = '$kode_lokasi') $filterpp $tw
			group by x.kode_pp,x.kode_lokasi		
			)c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select x.kode_pp,x.kode_lokasi,  
				sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
			from sis_rekon_d x 	
			where(x.kode_lokasi = '$kode_lokasi') $filterpp and(x.periode < '$periode_awal')
			group by x.kode_pp,x.kode_lokasi	
			)d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
left join (select x.kode_pp,x.kode_lokasi, 
			  sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
			from sis_rekon_d x 			
			inner join sis_bill_m z on x.no_bill=z.no_bill and x.kode_lokasi=z.kode_lokasi
			where(x.kode_lokasi = '$kode_lokasi')  $filterpp $dw	
			group by x.kode_pp,x.kode_lokasi 			
			)e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
left join (select x.kode_pp,x.kode_lokasi, 
			  sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
			from sis_rekon_d x 			
			inner join sis_bill_m z on x.no_bill=z.no_bill and x.kode_lokasi=z.kode_lokasi
			where(x.kode_lokasi = '$kode_lokasi') $filterpp and z.periode < '$periode_awal' $tw
			group by x.kode_pp,x.kode_lokasi 			
			) h on a.kode_pp=h.kode_pp and a.kode_lokasi=h.kode_lokasi 
$this->filter
order by a.kode_pp
 ";

//  echo $sql;
		
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang siswa ver 2 triwulan",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1600' >
  <tr bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan' >No</td>
	<td width='100'  class='header_laporan' >Sekolah</td>
    <td width='200'  class='header_laporan' >Nama</td>
	<td width='60' align='center' class='header_laporan' colspan='4'>Saldo Awal</td>
	<td width='100' align='center' class='header_laporan' colspan='4'>Tagihan $title</td>
    <td width='200' align='center' class='header_laporan' colspan='4'>Pembayaran $title Berjalan</td>
	<td width='200' align='center' class='header_laporan' colspan='4'>Pembayaran Tahun Sebelumnya</td>
	<td width='80' align='center' class='header_laporan' colspan='4'>Saldo Akhir</td>
   </tr>";
   echo
	 "<tr>
    <td class='header_laporan' align='center' colspan='3'></td>
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
            $saw_n1+=$row->saw_n1; 
            $saw_n2+=$row->saw_n2; 
            $saw_n3+=$row->saw_n3; 
            $saw_total+=$row->saw_total;
            $debet_n1+=$row->debet_n1; 
            $debet_n2+=$row->debet_n2; 
            $debet_n3+=$row->debet_n3; 
            $debet_total+=$row->debet_total;
            $kredit_n1+=$row->kredit_n1; 
            $kredit_n2+=$row->kredit_n2; 
            $kredit_n3+=$row->kredit_n3; 
            $kredit_total+=$row->kredit_total;
            $kredit_n11+=$row->kredit_n11; 
            $kredit_n22+=$row->kredit_n22; 
            $kredit_n33+=$row->kredit_n33; 
            $kredit_total1+=$row->kredit_total1;
            $sak_n1+=$row->sak_n1; 
            $sak_n2+=$row->sak_n2; 
            $sak_n3+=$row->sak_n3; 
            $sak_total+=$row->sak_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDet('$row->kode_lokasi','$row->kode_pp','$periode');\">$row->kode_pp</a></td>
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
  
