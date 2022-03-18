<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRdPph extends server_report_basic
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

        $sql = "select 'S' as status,c.nama as nama_broker,a.kode_rd,d.nama as nama_rd,a.jumlah,a.n_jual/a.jumlah as h_jual,a.n_jual, a.komisi,a.vat,a.levi,a.pph
        from inv_rdjual_d a 
        inner join inv_rdjual_m b on a.no_rdjual=b.no_rdjual 
        inner join inv_broker c on a.kode_broker=c.kode_broker
        inner join inv_rd d on a.kode_rd=d.kode_rd 
        $this->filter 
        
        union 
        
        select 'B' as status,c.nama as nama_broker,a.kode_rd,d.nama as nama_rd,a.jumlah,a.n_beli/a.jumlah as h_beli,a.n_beli, a.komisi,a.vat,a.levi,a.pph
        from inv_rdbeli_d a 
        inner join inv_rdbeli_m b on a.no_rdbeli=b.no_rdbeli
        inner join inv_broker c on a.kode_broker=c.kode_broker
        inner join inv_rd d on a.kode_rd=d.kode_rd 
        $this->filter 
        
        order by nama_broker,status
        
        
        ";
        $rs=$dbLib->execute($sql);

        // echo $sql;

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1000'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                        font-size:12px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN PPH BROKER YAKES TELKOM </th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px;text-align:left'>Periode</th>
                        <th style='font-size:14px;text-align:left' colspan='13'>&nbsp;".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style=''>
                    <tr style=''>
                        <td style='text-align:center;font-weight:bold' width='5' >No</td>
                        <td style='text-align:center;font-weight:bold' width='250' >Nama Broker</td>
                        <td style='text-align:center;font-weight:bold' width='80' >Reksadana</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Quantity</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Price/Share</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Gross Amount</td>
                        <td style='text-align:center;font-weight:bold' width='100'>Commission</td>
                        <td style='text-align:center;font-weight:bold' width='100' >VAT</td>
                        <td style='text-align:center;font-weight:bold' width='100' >Levi+KPEI</td>
                        <td style='text-align:center;font-weight:bold' width='100' >PPh</td>
                        <td style='text-align:center;font-weight:bold' width='50' >Status</td>
                    </tr>
                    ";
                    $no=1;
                    $rs1 = $dbLib->execute($sql);
                    $jumlah=0;$n_jual=0;$komisi=0;$vat=0;$levi=0;$pph=0;
                    while ($row1 = $rs1->FetchNextObject($toupper=false))
		            {
                        $jumlah+=$row1->jumlah;
                        $n_jual+=$row1->n_jual;
                        $komisi+=$row1->komisi;
                        $vat+=$row1->vat;
                        $levi+=$row1->levi;
                        $pph+=$row1->pph;
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;text-align:left'>$row1->nama_broker</td>
                        <td style='border-top: medium none;text-align:left'>$row1->kode_rd - $row1->nama_rd</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->jumlah,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->h_jual,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->n_jual,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->komisi,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->vat,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->levi,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->pph,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:center'>".strtoupper($row1->status)."</td>
                    </tr>";
                    $no++;

                    }
                    echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center' colspan='3'>Total</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($jumlah,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($n_jual,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($komisi,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($vat,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($levi,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($pph,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                    </tr>";
                    echo"
                </tbody>
            </table>";
            $sql = "
            select x.nama_broker,sum(x.komisi) as komisi, sum(x.pph) as pph
            from 
            (
            select c.nama as nama_broker,a.komisi,a.pph
            from inv_rdjual_d a 
            inner join inv_rdjual_m b on a.no_rdjual=b.no_rdjual 
            inner join inv_broker c on a.kode_broker=c.kode_broker
            $this->filter
            
            union all
            
            select c.nama as nama_broker,a.komisi,a.pph
            from inv_rdbeli_d a 
            inner join inv_rdbeli_m b on a.no_rdbeli=b.no_rdbeli
            inner join inv_broker c on a.kode_broker=c.kode_broker
            $this->filter
            ) x
            group by x.nama_broker";
            echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1000'>
            <style>
                td{
                    border:1px solid black;
                    padding:4px;
                    font-size:12px !important
                }
            </style>
            <tbody style=''>
                <tr style=''>
                    <td style='text-align:center;font-weight:bold' width='5' >No</td>
                    <td style='text-align:center;font-weight:bold' width='250' >Nama Broker</td>
                    <td style='text-align:center;font-weight:bold' width='100' >Komisi Broker</td>
                    <td style='text-align:center;font-weight:bold' width='90' >PPh</td>
                    <td style='text-align:center;font-weight:bold;border:none' width='600' >&nbsp;</td>
                </tr>
                ";
                $no=1;
                $rs1 = $dbLib->execute($sql);
                $komisi2=0;$pph2=0;
                while ($row1 = $rs1->FetchNextObject($toupper=false))
                {
                    $komisi2+=$row1->komisi;
                    $pph2+=$row1->pph;
                    
                    echo" <tr style=''>
                    <td style=' border-top: medium none;text-align:center'>$no</td>
                    <td style='border-top: medium none;text-align:left'>$row1->nama_broker</td>
                    <td style='border-top: medium none;text-align:right'>".number_format($row1->komisi,0,",",".")."</td>
                    <td style='border-top: medium none;text-align:right'>".number_format($row1->pph,0,",",".")."</td>
                    
                    <td style='text-align:center;font-weight:bold;border:none' width='600' >&nbsp;</td>
                </tr>";
                $no++;

                }
                echo" <tr style=''>
                    <td style=' border-top: medium none;text-align:center' colspan='2'>Total</td>
                    <td style='border-top: medium none;text-align:right'>".number_format($komisi2,0,",",".")."</td>
                    <td style='border-top: medium none;text-align:right'>".number_format($pph2,0,",",".")."</td>
                    <td style='text-align:center;font-weight:bold;border:none' width='600' >&nbsp;</td>
                </tr>";
             
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
