<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSaldoSiswaAgingPP extends server_report_basic
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
		$filtersis=$tmp[4];
		$nama_file="aging.xls";
		// echo $filterpp;
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql = "select a.kode_pp,b.kode_akt,a.kode_lokasi,a.nama,
		b.n4,b.dsp1,b.dsp2,b.dsp3,b.dsp4,b.spp1,b.spp2,b.spp3,b.spp4,b.lain1,b.lain2,b.lain3,b.lain4,b.dsp1+b.dsp2+b.spp1+b.spp2+b.lain1+b.lain2 as non, b.dsp3+b.dsp4+b.spp3+b.spp4+b.lain3+b.lain4 as sisih
from pp a
left join (select a.kode_pp,a.kode_lokasi,a.kode_akt,sum(a.n4) as n4,
	   sum(case when a.umur<=6 then a.n1 else 0 end) as dsp1,
	   sum(case when a.umur between 7 and 12 then a.n1 else 0 end) as dsp2,
	   sum(case when a.umur between 13 and 24 then a.n1 else 0 end) as dsp3,
	   sum(case when a.umur>24 then a.n1 else 0 end) as dsp4,
	   sum(case when a.umur<=6 then a.n2 else 0 end) as spp1,
	   sum(case when a.umur between 7 and 12 then a.n2 else 0 end) as spp2,
	   sum(case when a.umur between 13 and 24 then a.n2 else 0 end) as spp3,
	   sum(case when a.umur>24 then a.n2 else 0 end) as spp4,
	   sum(case when a.umur<=6 then a.n3 else 0 end) as lain1,
	   sum(case when a.umur between 7 and 12 then a.n3 else 0 end) as lain2,
	   sum(case when a.umur between 13 and 24 then a.n3 else 0 end) as lain3,
	   sum(case when a.umur>24 then a.n3 else 0 end) as lain4
	   from (select a.no_bill,a.kode_akt,a.kode_lokasi,a.periode,a.kode_pp,
			   datediff(month,convert(datetime, a.periode+'01'),convert(datetime, '$periode'+'01')) as umur,
			   isnull(a.n1,0)-isnull(b.n1,0) as n1,isnull(a.n2,0)-isnull(b.n2,0) as n2,
			   isnull(a.n3,0)-isnull(b.n3,0) as n3,isnull(a.n4,0)-isnull(b.n4,0) as n4
			from (select x.no_bill,y.kode_akt,x.kode_lokasi,x.periode,x.kode_pp,
					sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
					sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
					sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
					sum(case when x.dc='D' then x.nilai else -x.nilai end) as n4	
				from sis_bill_d x 
				inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp	
				where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') $filtersis
				group by x.no_bill,y.kode_akt,x.kode_lokasi,x.periode,x.kode_pp	
			)a
		left join (select x.no_bill,y.kode_akt,x.kode_lokasi,x.kode_pp,
					sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
					sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
					sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
					sum(case when x.dc='D' then x.nilai else -x.nilai end) as n4	
				from sis_rekon_d x 	
				inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
				where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') $filtersis
				group by x.no_bill,y.kode_akt,x.kode_lokasi,x.kode_pp
		)b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp and a.kode_akt=b.kode_akt
			where a.kode_lokasi = '$kode_lokasi' 
	)a
	group by a.kode_lokasi,a.kode_akt,a.kode_pp
)b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp

$this->filter and b.n4<>0 
order by a.kode_pp";
		
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
		echo $AddOnLib->judul_laporan("lpaoran aging piutang siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
	<td width='60' rowspan='2' class='header_laporan'>Kode PP</td>
	<td width='200' rowspan='2' class='header_laporan'>Nama</td>
	<td width='100' rowspan='2' class='header_laporan'>Angkatan</td>
	<td width='100' rowspan='2' class='header_laporan'>Piutang</td>
    <td colspan='4' class='header_laporan'>DSP</td>
    <td colspan='4' class='header_laporan'>SPP</td>
    <td colspan='4' class='header_laporan'>LAIN</td>
    <td colspan='4' class='header_laporan'>Penyisihan</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>0-6 Bln</td>
    <td width='80' align='center' class='header_laporan'>7-12 Bln</td>
    <td width='80' align='center' class='header_laporan'>13-24 Bln</td>
    <td width='80' align='center' class='header_laporan'>>24</td>
     <td width='80' align='center' class='header_laporan'>0-6 Bln</td>
    <td width='80' align='center' class='header_laporan'>7-12 Bln</td>
    <td width='80' align='center' class='header_laporan'>13-24 Bln</td>
    <td width='80' align='center' class='header_laporan'>>24</td>
	 <td width='80' align='center' class='header_laporan'>0-6 Bln</td>
    <td width='80' align='center' class='header_laporan'>7-12 Bln</td>
    <td width='80' align='center' class='header_laporan'>13-24 Bln</td>
    <td width='80' align='center' class='header_laporan'>>24</td>
    <td width='80' align='center' class='header_laporan'>NON</td>
    <td width='80' align='center' class='header_laporan'>Penyisihan</td>
  </tr>";
		$dsp1=0;$dsp2=0;$dsp3=0;$dsp4=0;
		$spp1=0;$spp2=0;$spp3=0;$spp4=0;
		$lain1=0;$lain2=0;$lain3=0;$lain4=0;
		$n4=0;$non=0;$sisih=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$dsp1+=$row->dsp1;$dsp2+=$row->dsp2; $dsp3+=$row->dsp3; $dsp4+=$row->dsp4;
			$spp1+=$row->spp1; $spp2+=$row->spp2; $spp3+=$row->spp3; $spp4+=$row->spp4;
			$lain1+=$row->lain1; $lain2+=$row->lain2; $lain3+=$row->lain3; $lain4+=$row->lain4;
			$n4+=$row->n4;
			$non+=$row->non;
			$sisih+=$row->sisih;

			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->kode_pp','$row->kode_lokasi','$row->kode_akt');\">$row->kode_akt</a>";
			echo
			"</td>
            <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->dsp1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->dsp2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->dsp3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->dsp4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->spp1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->spp2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->spp3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->spp4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->lain1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->lain2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->lain3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->lain4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->non,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->sisih,0,",",".")."</td>
        </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='header_laporan' align='center' colspan='4'>Total</td>
    <td class='header_laporan' align='right'>".number_format($n4,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($dsp1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($dsp2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($dsp3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($dsp4,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($spp1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($spp2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($spp3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($spp4,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($lain1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($lain2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($lain3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($lain4,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($non,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sisih,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
