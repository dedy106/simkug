<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSaldoPp extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.kode_lokasi,a.kode_pp,a.tahun,
	   isnull(b.n1,0) as nd1,isnull(b.n2,0) as nd2,isnull(b.n3,0) as nd3,isnull(b.total,0) as nd4,
	   isnull(c.n1,0) as nk1,isnull(c.n2,0) as nk2,isnull(c.n3,0) as nk3,isnull(c.total,0) as nk4
from (select kode_lokasi,kode_pp,substring(periode,1,4) as tahun
	from sis_bill_d 
	where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'
	group by kode_lokasi,kode_pp,substring(periode,1,4)
	)a
left join (select x.kode_pp,x.kode_lokasi,substring(x.periode,1,4) as tahun, 
				   sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP','SPP_TK','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
			from sis_bill_d x 			
			where x.kode_lokasi = '$kode_lokasi' and x.kode_pp='$kode_pp'			
			group by x.kode_pp,x.kode_lokasi,substring(x.periode,1,4) 
		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
left join (select x.kode_pp,x.kode_lokasi,substring(x.periode,1,4) as tahun, 
				   sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
				   sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
				   sum(case when x.kode_param not in ('DSP','SPP','SPP_TK','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
				   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
			from sis_rekon_d x 			
			where x.kode_lokasi = '$kode_lokasi' and x.kode_pp='$kode_pp'			
			group by x.kode_pp,x.kode_lokasi,substring(x.periode,1,4) 
		   )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
order by a.kode_pp,a.tahun";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar rekap tagihan",$this->lokasi."<br>".$nama_pp,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='50' rowspan='2' class='header_laporan'>Tahun </td>
    <td width='80' rowspan='2' class='header_laporan'>Kode PP</td>
    <td colspan='4' class='header_laporan'>Piutang </td>
    <td colspan='4' class='header_laporan'>Pembayaran</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>DPP</td>
    <td width='90' align='center' class='header_laporan'>SPP</td>
    <td width='90' align='center' class='header_laporan'>Lainnya</td>
    <td width='100' align='center' class='header_laporan'>Total</td>
     <td width='90' align='center' class='header_laporan'>DPP</td>
    <td width='90' align='center' class='header_laporan'>SPP</td>
    <td width='90' align='center' class='header_laporan'>Lainnya</td>
    <td width='100' align='center' class='header_laporan'>Total</td>
  </tr>";
			$nd1=0;$nd2=0;$nd3=0;$nd4=0;
			$nk1=0;$nk2=0;$nk3=0;$nk4=0;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$nd1+=$row->nd1;
				$nd2+=$row->nd2;
				$nd3+=$row->nd3;
				$nd4+=$row->nd4;
				$nk1+=$row->nk1;
				$nk2+=$row->nk2;
				$nk3+=$row->nk3;
				$nk4+=$row->nk4;
				echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row->tahun</td>
				<td class='isi_laporan'>$row->kode_pp</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd1,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd2,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd3,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd4,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nk1,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nk2,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nk3,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nk4,0,",",".")."</td>
				</tr>";	 
				$i=$i+1;
			}
			echo "<tr>
				<td class='header_laporan' align='center' colspan='3'>Total</td>
				<td class='header_laporan' align='right'>".number_format($nd1,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($nd2,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($nd3,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($nd4,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($nk1,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($nk2,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($nk3,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($nk4,0,",",".")."</td>
				</tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
