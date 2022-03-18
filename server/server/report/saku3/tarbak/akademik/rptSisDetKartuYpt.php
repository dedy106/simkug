<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptSisDetKartuYpt extends server_report_basic
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
        $modul=$tmp[0];
        $filter2=$tmp[1];

        
        
        if($modul == "BILL"){
            $sql="select a.no_rekon, a.no_bill, a.kode_param, a.nilai as nilai_rekon, 0 as nilai_pdd from sis_rekon_d a 
            $this->filter
            ";
        }else{
            $sql="select a.no_rekon, a.no_bill, a.kode_param, a.nilai as nilai_rekon, 0 as nilai_pdd from sis_rekon_d a 
            $this->filter
            union
            select a.no_bukti as no_rekon, '-' as no_bill, '-' as kode_param, 0 as nilai_rekon, a.nilai as nilai_pdd from sis_cd_d a 
            $filter2 ";
        }	

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Detail Kartu Piutang",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Bukti</td>
    <td width='80' align='center' class='header_laporan'>No Tagihan</td>
    <td width='100' align='center' class='header_laporan'>Nilai Rekon</td>
    <td width='100' align='center' class='header_laporan'>Nilai PDD</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
            $nilai_rekon+=$row->nilai_rekon;
            $nilai_pdd+=$row->nilai_pdd;

			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_rekon</td>
            <td class='isi_laporan'>$row->no_bill</td>
            <td align='right' class='isi_laporan'>".number_format($row->nilai_rekon,0,",",".")."</td>
            <td align='right' class='isi_laporan'>".number_format($row->nilai_pdd,0,",",".")."</td>
            </tr>";	 
			$i=$i+1;
        }
        
        echo "<tr>
            <td class='isi_laporan' align='center' colspan='3'>Total</td>
            <td align='right' class='isi_laporan'>".number_format($nilai_rekon,0,",",".")."</td>
            <td align='right' class='isi_laporan'>".number_format($nilai_pdd,0,",",".")."</td>
            </tr>";	 
        echo "<tr>
            <td class='isi_laporan' align='center' colspan='4'>Total Pembayaran</td>
            <td align='right' class='isi_laporan'>".number_format($nilai_rekon+$nilai_pdd,0,",",".")."</td>
            </tr>";	 
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
