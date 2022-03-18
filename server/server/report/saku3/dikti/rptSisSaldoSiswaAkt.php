<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dikti_rptSisSaldoSiswaAkt extends server_report_basic
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
		$nama_file="angkatan.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.kode_lokasi,a.kode_akt,a.nama
		,isnull(b.n1,0)-isnull(d.n1,0) as saw_n1,isnull(b.n2,0)-isnull(d.n2,0) as saw_n2,isnull(b.n3,0)-isnull(d.n3,0) as saw_n3,isnull(b.total,0)-isnull(d.total,0) as saw_total
	   ,isnull(c.n1,0) as debet_n1,isnull(c.n2,0) as debet_n2,isnull(c.n3,0) as debet_n3,isnull(c.total,0) as debet_total
	   ,isnull(e.n1,0) as kredit_n1,isnull(e.n2,0) as kredit_n2,isnull(e.n3,0) as kredit_n3,isnull(e.total,0) as kredit_total
	   ,isnull(b.n1,0)-isnull(d.n1,0)+isnull(c.n1,0)-isnull(e.n1,0) as sak_n1
	   ,isnull(b.n2,0)-isnull(d.n2,0)+isnull(c.n2,0)-isnull(e.n2,0) as sak_n2
	   ,isnull(b.n3,0)-isnull(d.n3,0)+isnull(c.n3,0)-isnull(e.n3,0) as sak_n3
	   ,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
from dikti_angkat a 
left join (select y.kode_akt,y.kode_lokasi, 
					sum(case when x.kode_param in ('BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('BPP','UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
			from dikti_bill_d x 			
			inner join dikti_mhs y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 		
			group by y.kode_akt,y.kode_lokasi 			
			)b on a.kode_akt=b.kode_akt and a.kode_lokasi=b.kode_lokasi 
left join (select y.kode_akt,y.kode_lokasi, 
				sum(case when x.kode_param in ('BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('BPP','UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
			from dikti_bill_d x 			
			inner join dikti_mhs y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') 			
			group by y.kode_akt,y.kode_lokasi			
			)c on a.kode_akt=c.kode_akt and a.kode_lokasi=c.kode_lokasi
left join (select y.kode_akt,y.kode_lokasi,
				sum(case when x.kode_param in ('BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('BPP','UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
			from dikti_bill_rekon x 	
			inner join dikti_mhs y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')		
			group by y.kode_akt,y.kode_lokasi	
			)d on a.kode_akt=d.kode_akt and a.kode_lokasi=d.kode_lokasi 
left join (select y.kode_akt,y.kode_lokasi,
			  sum(case when x.kode_param in ('BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('BPP','UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
			from dikti_bill_rekon x 			
			inner join dikti_mhs y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
			where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode')		
			group by y.kode_akt,y.kode_lokasi		
			)e on a.kode_akt=e.kode_akt and a.kode_lokasi=e.kode_lokasi 
$this->filter
order by a.kode_akt
 ";
	
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
		echo $AddOnLib->judul_laporan("saldo piutang per angkatan",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='80' rowspan='2' class='header_laporan'>Angkatan</td>
	<td width='60' rowspan='2' class='header_laporan'>Kode PP</td>
    <td colspan='4' class='header_laporan'>Saldo Awal </td>
    <td colspan='4' class='header_laporan'>Tagihan</td>
    <td colspan='4' class='header_laporan'>Pembayaran</td>
    <td colspan='4' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
     <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
     <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
     <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
		$saw_n1=0;$saw_n2=0;$saw_n3=0;$saw_total=0;
		$sak_n1=0;$sak_n2=0;$sak_n3=0;$sak_total=0;
		$debet_n1=0;$debet_n2=0;$debet_n3=0;$debet_total=0;
		$kredit_n1=0;$kredit_n2=0;$kredit_n3=0;$kredit_total=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saw_n1+=$row->saw_n1;$saw_n2+=$row->saw_n2; $saw_n3+=$row->saw_n3; $saw_total+=$row->saw_total;
			$debet_n1+=$row->debet_n1; $debet_n2+=$row->debet_n2; $debet_n3+=$row->debet_n3; $debet_total+=$row->debet_total;
			$kredit_n1+=$row->kredit_n1; $kredit_n2+=$row->kredit_n2; $kredit_n3+=$row->kredit_n3; $kredit_total+=$row->kredit_total;
			$sak_n1+=$row->sak_n1; $sak_n2+=$row->sak_n2; $sak_n3+=$row->sak_n3; $sak_total+=$row->sak_total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akt','$row->kode_lokasi','$kode_pp');\">$row->kode_akt</a>";
			echo "</td>
	<td class='isi_laporan'>$row->kode_pp</td>
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
  
