<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptDiscre2 extends server_report_basic
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

        $sql = "select a.no_bukti,a.kode_kelola,a.nilai from inv_discre_m a $this->filter ";
        // echo $sql;
        $res2 = $dbLib->execute($sql);
        $no_akru = $res2->fields[0];
        $kustodi = $res2->fields[2];

        $sql = "select dateadd(day,1,tanggal) as tgl,nab,t1,t2,t3,t4,t1+t2+t3+t4 as subtot, 0.1 * (t1+t2+t3+t4) as ppn, (t1+t2+t3+t4) + ((t1+t2+t3+t4) * 0.1) as total
        from inv_discre_his where no_akru = '$no_akru' and kode_Kelola = '$kode_kelola' order by tanggal ";
        // echo $sql;
        $rs=$dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
       
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='925'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
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
                        <td style='text-align:center' width='5' rowspan='4' >No</td>
                        <td style='text-align:center' width='100' rowspan='4'>Date</td>
                        <td style='text-align:center' width='120' rowspan='4'>NAV (T-1)</td>
                        <td style='text-align:center' width='100'>Tier 1</td>
                        <td style='text-align:center' width='100'>Tier 2</td>
                        <td style='text-align:center' width='100'>Tier 3</td>
                        <td style='text-align:center' width='100'>Tier 4</td>
                        <td style='text-align:center' width='100' rowspan='4'>Total Funt Mgt Fee</td>
                        <td style='text-align:center' width='100' rowspan='3'>VAT of Funt Mgt Fee</td>
                        <td style='text-align:center' width='100' rowspan='4'>Total Funt Mgt Fee (+ VAT)</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='100'>( <= IDR 25 Bio)</td>
                        <td style='text-align:center' width='100'>( <= IDR 50 Bio)</td>
                        <td style='text-align:center' width='100'>( <= IDR 75 Bio)</td>
                        <td style='text-align:center' width='100' rowspan='2'> >= 150 Bio</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='100'>25.000.000.000</td>
                        <td style='text-align:center' width='100'>50.000.000.000</td>
                        <td style='text-align:center' width='100'>75.000.000.000</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='100'>0,750%</td>
                        <td style='text-align:center' width='100'>0,650%</td>
                        <td style='text-align:center' width='100'>0,550%</td>
                        <td style='text-align:center' width='100'>0,350%</td>
                        <td style='text-align:center' width='100'>10%</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='5'></td>
                        <td style='text-align:center' width='100'>1</td>
                        <td style='text-align:center' width='120'>4</td>
                        <td style='text-align:center' width='100'>5</td>
                        <td style='text-align:center' width='100'>6</td>
                        <td style='text-align:center' width='100'>7</td>
                        <td style='text-align:center' width='100'>8 = (4-(5+6+7))</td>
                        <td style='text-align:center' width='100'>9</td>
                        <td style='text-align:center' width='100'>10</td>
                        <td style='text-align:center' width='100'>11 =(9+10)</td>
                    </tr>
                    ";
                    $nab=0;$t1=0;$t2=0;$t3=0;$t4=0;$subtot=0;$ppn=0;$total=0;$no=1;
                    while ($row = $rs->FetchNextObject($toupper=false))
                    {
                            $nab+=$row->nab;
                            $t1+=$row->t1;
                            $t2+=$row->t2;
                            $t3+=$row->t3;
                            $t4+=$row->t4;
                            $subtot+=$row->subtot;
                            $ppn+=$row->ppn;
                            $total+=$row->total;
                            echo" <tr style=''>
                            <td style=' border-top: medium none;text-align:center'>$no</td>
                            <td style='border-top: medium none;text-align:left'>$row->tgl</td>
                            <td style='border-top: medium none;text-align:right'>". ($row->nab != 0 ? number_format($row->nab,3,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->t1 != 0 ? number_format($row->t1,3,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->t2 != 0 ? number_format($row->t2,3,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->t3 != 0 ? number_format($row->t3,3,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->t4 != 0 ? number_format($row->t4,3,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->subtot != 0 ? number_format($row->subtot,3,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->ppn != 0 ? number_format($row->ppn,3,",",".") : 0)."</td>
                            <td style='border-top: medium none;text-align:right'>".($row->total != 0 ? number_format($row->total,3,",",".") : 0)."</td>
                        </tr>";
                        $no++;

                    }
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold;text-align:center'>Management Fee</td>
                            <td style='font-weight:bold;text-align:center'>Ppn 10% dari MI Fee</td>
                            <td style='font-weight:bold;text-align:center'>Sub Total</td>
                            <td style='font-weight:bold;text-align:center'>PPh Ps 23 2% dari MI Fee</td>
                            <td style='font-weight:bold;text-align:center'>Total dibayarkan ke MI</td>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'></td>
                        </tr>";
                        $ppnMI = floatval($subtot)*0.1;
                        $subMI = $ppnMI + $subtot;
                        $pph =  floatval($subtot)*0.02;
                        $totMI =  $subMI-$pph;
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'>Yakes Telkom</td>
                            <td style='text-align:right' >".($subtot != 0 ? number_format($subtot,3,",",".") : 0)."</td>
                            <td style='text-align:right' >".number_format($ppnMI,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($subMI,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($pph,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($totMI,3,",",".")."</td>
                            <td style='text-align:right' ></td>
                            <td style='text-align:right' ></td>
                        </tr>";
                        $ppnKus = floatval($kustodi)*0.1;
                        $subKus = $ppnKus + $kustodi;
                        $pphKus =  floatval($kustodi)*0.02;
                        $totKus =  $subKus-$pphKus;
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'>KUSTODI</td>
                            <td style='text-align:right' >".($kustodi != 0 ? number_format($kustodi,3,",",".") : 0)."</td>
                            <td style='text-align:right' >".number_format($ppnKus,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($subKus,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($pphKus,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($totKus,3,",",".")."</td>
                            <td style='text-align:right' ></td>
                            <td style='text-align:right' ></td>
                        </tr>";
                        $sMI = floatval($kustodi) - floatval($subtot);
                        $sPpn = $ppnKus - $ppnMI;
                        $sSub = $subKus - $subMI;
                        $sPph = $pphKus -  $pph;
                        $sTot = $totKus - $totMI;
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'></td>
                            <td style='font-weight:bold'></td>
                            <td style='text-align:right' >".($sMI != 0 ? number_format($sMI,3,",",".") : 0)."</td>
                            <td style='text-align:right' >".number_format($sPpn,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($sSub,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($sPph,3,",",".")."</td>
                            <td style='text-align:right' >".number_format($sTot,3,",",".")."</td>
                            <td style='text-align:right' ></td>
                            <td style='text-align:right' ></td>
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
