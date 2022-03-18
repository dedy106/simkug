<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptMonitoringPiuStatus extends server_report_basic
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
		$tahun=$tmp[1];
		$filter2=$tmp[2];
		$sql="select a.kode_cust,a.nama,isnull(b.n1,0) as n1,isnull(b.n2,0) as n2,isnull(b.n3,0) as n3,isnull(b.n4,0) as n4,isnull(b.n5,0) as n5 
        from cust a
        left join (
            select b.kode_cust, b.kode_lokasi,sum(case b.status when 'BERITA ACARA' then a.nilai+a.nilai_ppn else 0 end) as n1,
            sum(case b.status when 'CLOSING WFM' then a.nilai+a.nilai_ppn else 0 end) as n2,
            sum(case b.status when 'PENERBITAN NPK' then a.nilai+a.nilai_ppn else 0 end) as n3,
            sum(case b.status when 'BDM' then a.nilai+a.nilai_ppn else 0 end) as n4,
            sum(case b.status when 'FINANCE' then a.nilai+a.nilai_ppn else 0 end) as n5
            from piutang_d a
            inner join pr_monitor b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
            $filter2 and b.no_ref='-'
            group by b.kode_cust,b.kode_lokasi
        ) b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
        $this->filter ";
        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Monitoring Status Piutang",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
            <td width='100' rowspan='2'  align='center' class='header_laporan'>Customer</td>
            <td width='450' colspan='5'  align='center' class='header_laporan'>Piutang Tahun ".$tahun."</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='90'  align='center' class='header_laporan'>TTD BAUT & BAST</td>
            <td width='90'  align='center' class='header_laporan'>Closing WFM</td>
            <td width='90'  align='center' class='header_laporan'>Penerbitan NPK</td>
            <td width='90'  align='center' class='header_laporan'>Proses BDM (PRPO)</td>
            <td width='90'  align='center' class='header_laporan'>Proses Finance</td>
        </tr>  ";
		$n1=0;
		$n2=0;
		$n3=0;
		$n4=0;
		$n5=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			
            echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->nama</td>
            <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>";
			$i=$i+1;
		}
		echo "<tr >
        <td class='isi_laporan' align='center' colspan='2'>Total</td>
        <td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($n4,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($n5,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>