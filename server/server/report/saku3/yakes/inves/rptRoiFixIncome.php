<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRoiFixIncome extends server_report_basic
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

        $sql = "select distinct b.nama as nama_rd
        from inv_rd_kkp a
		left join inv_rd b on a.kode_rd=b.kode_rd
		$this->filter
        ";

        $res = $dbLib->execute($sql);
        if($res->recordCount() == 1){
            $nama_rd = strtoupper($res->fields[0]);
        }else{
            $nama_rd = "";
        }

        $sql = "select a.tanggal,round(a.jumlah*a.h_wajar,0) as nab
        , round(a.komisi,0) as komisi, round(a.bylain,0) as bylain, round(a.pph,0) as pph, round(a.gainlos,0) as gainlos
        , round(a.deviden,0) as hasil
        , round(a.jual,0) as pelepasan
        , round(a.beli,0) as penempatan
        , a.roi_persen, (a.roi_hitung-1)*100 as roi_hari 
        from inv_rd_kkp a
		left join inv_rd b on a.kode_rd=b.kode_rd
		$this->filter
        order by a.tanggal
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
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN ROI PRODUK REKSADANA $nama_rd YAKES TELKOM </th>
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
                        <td style='text-align:center;font-weight:bold' width='100' >Komisi</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Biaya Lain</td>
                        <td style='text-align:center;font-weight:bold' width='100'>PPH</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Gainloss</td>
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
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->komisi,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->bylain,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->pph,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->gainlos,0,",",".")."</td>
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
