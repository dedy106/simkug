<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRoiSimpleKelas extends server_report_basic
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
        $periode=$tmp[0];
        $kode_kelola=$tmp[1];

        $sql = "select * 
        from inv_roikelas_simple
        $this->filter  
        order by kelas,periode
        ";
        $rs=$dbLib->execute($sql);
        // echo $sql;

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1165'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                        font-size:12px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN ROI SIMPLE DIETZ PER KELAS YAKES TELKOM </th>
                    </tr>
                   
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style=''>
                    <tr style=''>
                        <td style='text-align:center;font-weight:bold' width='5' >No</td>
                        <td style='text-align:center;font-weight:bold' width='80' >Periode</td>
                        <td style='text-align:center;font-weight:bold' width='80' >Kelas</td>
                        <td style='text-align:center;font-weight:bold' width='100' >NAB</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Pendapatan</td>
                        <td style='text-align:center;font-weight:bold' width='100'>SPI</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Beban</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Cash In</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Cash Out</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Rata Rata Investasi</td>
                        <td style='text-align:center;font-weight:bold' width='100'>ROI Bulan</td>
                        <td style='text-align:center;font-weight:bold' width='100'></td>
                        <td style='text-align:center;font-weight:bold' width='100'>ROI Total</td>
                    </tr>
                    ";
                    $no=1;
                    $rs1 = $dbLib->execute($sql);
                    while ($row1 = $rs1->FetchNextObject($toupper=false))
		            {
                        
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;text-align:left'>$row1->periode</td>
                        <td style='border-top: medium none;text-align:left'>$row1->kelas</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nab,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->pdpt,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->spi,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->beban,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->kas_masuk,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->kas_keluar,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->rata,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format(($row1->roi_bulan*100),4,",",".")."%</td>
                        <td style='border-top: medium none;text-align:right'>".number_format(($row1->roi_rumus*100),4,",",".")."%</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->roi_total,4,",",".")."%</td>
                    </tr>";
                    $no++;

                    }
                 
                    echo"
                </tbody>
            </table>";
            echo"
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
        // }

		return "";
		
	}
	
}
?>
