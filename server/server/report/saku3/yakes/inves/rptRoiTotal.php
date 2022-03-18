<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRoiTotal extends server_report_basic
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

        $sql = "select convert(varchar,tanggal,103) as tgl, 0 as cash_in, beban as cash_out, nab, nilai_jg, roi_ytd,(roi_hari-1)*100 as roi_hari 
        from inv_roi_total 
        $this->filter
        order by tanggal		
        
        ";
        $rs=$dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='700'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                        font-size:12px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN ROI TOTAL YAKES TELKOM </th>
                    </tr>
                   
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style=''>
                    <tr style=''>
                        <td style='text-align:center;font-weight:bold' width='5' >No</td>
                        <td style='text-align:center;font-weight:bold' width='80' >Tanggal</td>
                        <td style='text-align:center;font-weight:bold' width='100' >Cash In</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Cash Out</td>
                        <td style='text-align:center;font-weight:bold' width='100'>NAB</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Kas MI</td>
                        <td style='text-align:center;font-weight:bold' width='100'>ROI s.d Hari ini</td>
                        <td style='text-align:center;font-weight:bold' width='100'>ROI Harian</td>
                    </tr>
                    ";
                    $no=1;
                    $rs1 = $dbLib->execute($sql);
                    while ($row1 = $rs1->FetchNextObject($toupper=false))
		            {
                        
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;text-align:left'>$row1->tgl</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->cash_in,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->cash_out,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nab,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nilai_jg,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->roi_ytd,4,",",".")."%</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->roi_hari,4,",",".")."%</td>
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
