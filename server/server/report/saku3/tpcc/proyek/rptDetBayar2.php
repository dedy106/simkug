<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptDetBayar2 extends server_report_basic
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
		$sql="select a.no_bukti,convert(varchar,a.tgl_input,103) as tgl,a.periode,a.nilai,a.dc
        from piubayar_d a inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
        $this->filter ";
        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN DETAIL PEMBAYARAN",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='510'>
        <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'>No</td>
            <td width='100' align='center' class='header_laporan'>No Bukti</td>
            <td width='100' align='center' class='header_laporan'>Tanggal</td>
            <td width='80' align='center' class='header_laporan'>Periode</td>
            <td width='100' align='center' class='header_laporan'>Nilai </td>
        </tr>
        
        ";
		$n1=0;
		$n2=0;
		$n3=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $n1+=$row->nilai;
            echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_bukti</td>
            <td class='isi_laporan'>$row->periode</td>
            <td class='isi_laporan'>$row->tgl</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>";
			$i=$i+1;
		}
		echo "<tr >
            <td class='isi_laporan' align='center' colspan='4'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
        </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>