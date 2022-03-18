<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptDiscre extends server_report_basic
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

        $sql = "select nama from inv_kelola where kode_kelola ='$kode_kelola' ";
        $res = $dbLib->execute($sql);
        $nama_kelola = $res->fields[0];

        $sql = "select convert(varchar,a.tanggal,103) as tanggal,substring(convert(varchar,a.tanggal,103),7,4) as tahun,substring(convert(varchar,a.tanggal,103),4,2) as bulan,a.basis as hari,a.nab,a.depo,a.kas,a.nwajar
        ,a.treal as tot_mifee
        from inv_discre_his a 
        $this->filter
        order by a.tanggal ";

        $rs=$dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
       
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1000'>
                <style>
                    td{
                        border:1px solid black;
                        padding:2px;
                        font-size:12px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN DISCRE YAKES TELKOM </th>
                    </tr>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>$nama_kelola</th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px;text-align:left'>Periode</th>
                        <th style='font-size:14px;text-align:left' colspan='13'>&nbsp;".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:12px !important'>
                    <tr style=''>
                        <td style='text-align:center' width='5' >No</td>
                        <td style='text-align:center' width='60' >Date</td>
                        <td style='text-align:center' width='60' >Year</td>
                        <td style='text-align:center' width='60' >Month</td>
                        <td style='text-align:center' width='60' >Jumlah Hari</td>
                        <td style='text-align:center' width='100'>NAV</td>
                        <td style='text-align:center' width='100'>Deposito</td>
                        <td style='text-align:center' width='100'>KAS</td>
                        <td style='text-align:center' width='100'>Saham (Nilai Wajar)</td>
                        <td style='text-align:center' width='100'>Total Fund Mgt Fee</td>
                    </tr>
                    ";
                    $nab=0;$depo=0;$kas=0;$nwajar=0;$tot_mifee=0;$no=1;
                    while ($row = $rs->FetchNextObject($toupper=false))
                    {
                            $nab+=$row->nab;
                            $depo+=$row->depo;
                            $kas+=$row->kas;
                            $nwajar+=$row->nwajar;
                            $tot_mifee+=$row->tot_mifee;
                            echo" <tr style=''>
                            <td style=' border-top: medium none;'>$no</td>
                            <td style='border-top: medium none;text-align:left'>$row->tanggal</td>
                            <td style='border-top: medium none;text-align:left'>$row->tahun</td>
                            <td style='border-top: medium none;text-align:left'>$row->bulan</td>
                            <td style='border-top: medium none;text-align:left'>$row->hari</td>
                            <td style='border-top: medium none;text-align:right'>". ($row->nab != 0 ? number_format($row->nab,0,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->depo != 0 ? number_format($row->depo,0,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->kas != 0 ? number_format($row->kas,0,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->nwajar != 0 ? number_format($row->nwajar,0,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->tot_mifee != 0 ? number_format($row->tot_mifee,0,",",".") : 0)."</td>
                        </tr>";
                        $no++;

                    }
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-weight:bold' colspan='9'>TOTAL</td>
                            <td style='text-align:right' >".($tot_mifee != 0 ? number_format($tot_mifee,0,",",".") : 0)."</td>
                        </tr>";
                    echo"
                </tbody>
            </table>
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
        // }
		return "";
		
	}
	
}
?>
