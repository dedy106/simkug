<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRoiKelas extends server_report_basic
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

        $sql = "select tanggal,round(nab,0) as nab, round(nilai_jg,0) as nilai_jg
        , round(mi_fee,0) as mi_fee, round(b_trans,0) as b_trans, round(kustodi,0) as kustodi, round(jasa_ahli,0) as jasa_ahli
        , round(deviden,0) as hasil
        , round(jual,0) as pelepasan
        , round(beli,0) as penempatan
        , roi_persen,(roi_hitung-1)*100 as roi_hari 
        from inv_roi_beban 
        $this->filter
        order by modul,tanggal
        ";
        $rs=$dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='985'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                        font-size:12px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN ROI KELAS YAKES TELKOM </th>
                    </tr>
                   
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style=''>
                    <tr style=''>
                        <td style='text-align:center;font-weight:bold' width='5' >No</td>
                        <td style='text-align:center;font-weight:bold' width='80' >Tanggal</td>
                        <td style='text-align:center;font-weight:bold' width='100' >NAB</td>
                        <td style='text-align:center;font-weight:bold' width='100' >Kas MI</td>
                        <td style='text-align:center;font-weight:bold' width='100' >Beban MI</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Beban Transaksi</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Beban Kustodi</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Beban Jasa Ahli</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Hasil</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Pelepasan</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Penempatan</td>
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
                        <td style='border-top: medium none;text-align:left'>$row1->tanggal</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nab,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nilai_jg,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->mi_fee,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->b_trans,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->kustodi,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->jasa_ahli,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->hasil,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->pelepasan,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->penempatan,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->roi_persen,4,",",".")."%</td>
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
