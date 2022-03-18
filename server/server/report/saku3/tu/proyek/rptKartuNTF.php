<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptKartuNTF extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		
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
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        $sql1  = "select distinct a.kode_proyek, a.nama, convert(varchar, a.tgl_mulai, 103) tgl_mulai, 
                  convert(varchar, a.tgl_selesai, 103) tgl_selesai  
                  from prb_proyek a 
                  $this->filter";
        $rs1    =  $dbLib->execute($sql1);

        $AddOnLib=new server_util_AddOnLib();
        // echo "$sql1<br/>";
        // echo "$sql2";
            
        echo "<div align='center'>"; 

        while($row1 = $rs1->FetchNextObject($toupper=false)){
        echo "
        <table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='780'>
        <style>
        td{
            border:1px solid black;
            padding:4px;
        }
        </style>
        <thead style='border: solid 1px black;'>
            <tr>
                <th  colspan='6' style='font-size:14px; text-align: center;'>KARTU NTF</th>
            </tr>
            <tr style=''>
                <th style='' colspan='6'>&nbsp;</th>
            </tr>
            <tr>
                <th  colspan='' style='font-size:12px; text-align: left; padding-left: 5px;'>Kode Proyek</th>
                <th  colspan='5' style='font-size:12px; text-align: left;'>: $row1->kode_proyek</th>
            </tr>
            <tr>
                <th  colspan='' style='font-size:12px; text-align: left; padding-left: 5px;'>Nama Proyek</th>
                <th  colspan='5' style='font-size:12px; text-align: left;'>: $row1->nama</th>
            </tr>
            <tr>
                <th  colspan='' style='font-size:12px; text-align: left; padding-left: 5px;'>Tgl Mulai</th>
                <th  colspan='' style='font-size:12px; text-align: left;'>: $row1->tgl_mulai</th>
                <th  colspan='' style='font-size:12px; text-align: right;'>Tgl Selesai</th>
                <th  colspan='3' style='font-size:12px; text-align: left;'>: $row1->tgl_selesai</th>
            </tr>
            <tr style=''>
                <th style='' colspan='6'>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <tr bgcolor='#CCCCCC'>
                <td style='text-align:center' rowspan='' class='header_laporan'>No Bukti</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Tanggal</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Keterangan</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Debet</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Kredit</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Saldo</td>
            </tr>
        ";
            $sql2   = "select b.no_bukti, convert(varchar, b.tanggal, 103) as tanggal, b.keterangan, b.dc, b.nilai 
            from prb_prbeban_d b inner join prb_proyek a on a.kode_lokasi=b.kode_lokasi and a.kode_proyek=b.kode_proyek 
            $this->filter and b.kode_proyek='$row1->kode_proyek'";
            $rs2    =  $dbLib->execute($sql2);
            $saldo  = 0;
            $debet  = 0;
            $kredit = 0;
            while($row2 = $rs2->FetchNextObject($toupper=false)){
                if($row2->dc == 'D'){
                    $saldo = $saldo + $row2->nilai;
                    $debet = $debet + $row2->nilai;
                    echo "
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>$row2->no_bukti</td>
                        <td style=' border-top: medium none;text-align:center'>$row2->tanggal</td>
                        <td style=' border-top: medium none;text-align:left'>$row2->keterangan</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row2->nilai,0,',','.')."</td>
                        <td style=' border-top: medium none;text-align:right'>-</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($saldo,0,',','.')."</td>
                    </tr>
                    ";
                }
                else if($row2->dc == 'C'){
                    $saldo  = $saldo - $row2->nilai;
                    $kredit = $kredit + $row2->nilai;
                    echo "
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>$row2->no_bukti</td>
                        <td style=' border-top: medium none;text-align:center'>$row2->tanggal</td>
                        <td style=' border-top: medium none;text-align:left'>$row2->keterangan</td>
                        <td style=' border-top: medium none;text-align:right'>-</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row2->nilai,0,',','.')."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($saldo,0,',','.')."</td>
                    </tr>
                    ";
                }
            }
            echo "
            <tr>
                <td style='text-align: center; font-weight: bold;' colspan='3'>Total</td>
                <td style='text-align: right; font-weight: bold;' colspan=''>".number_format($debet,0,',','.')."</td>
                <td style='text-align: right; font-weight: bold;' colspan=''>".number_format($kredit,0,',','.')."</td>
                <td style='text-align: right; font-weight: bold;' colspan=''>".number_format($saldo,0,',','.')."</td>
            </tr>
            </tbody>
            </table>";
        }
		echo "</div>";
		return "";
	}
	
}
?>
