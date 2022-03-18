<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptObliTrans extends server_report_basic
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
        
        $sql="select  a.portfolio,a.ticker,a.date,a.quantity,a.price,a.buy_sell,a.ibpa,a.jatuh_tempo
        from 
        (
        select e.tanggal,d.nama as portfolio, b.isin as ticker,convert(varchar,e.tanggal,103) as date,a.nilai as quantity,a.p_price as price,'B' as buy_sell,b.kode_jenis as ibpa,convert(varchar,b.tgl_selesai,103) as jatuh_tempo
        from inv_obli_d a 
        inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis
        inner join inv_obligor c on b.kode_obligor=c.kode_obligor
        inner join inv_rdkelola d on a.kode_rdkelola=d.kode_rdkelola
        inner join inv_oblibeli_m e on a.no_beli=e.no_beli
        $this->filter
        
        union all
        
        select e.tanggal,d.nama as portfolio, b.isin as ticker,convert(varchar,e.tanggal,103) as date,a.n_oleh as quantity,a.p_price as price,'S' as buy_sell,b.kode_jenis as ibpa,convert(varchar,b.tgl_selesai,103) as jatuh_tempo
        from inv_oblijual_d a 
        inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis
        inner join inv_obligor c on b.kode_obligor=c.kode_obligor
        inner join inv_oblijual_m e on a.no_oblijual=e.no_oblijual
        inner join inv_rdkelola d on e.kode_rdkelola=d.kode_rdkelola
        $this->filter
        ) a
        order by a.tanggal ";

        // echo $sql;
                
        $rs = $dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='800' >
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px;text-align:left'>LAPORAN TRANSAKSI OBLIGASI YAKES-TELKOM</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:12px !important'>
                    <tr style=''>
                        <td style='text-align:center' width='10' >No</td>
                        <td style='text-align:center' width='200'>Portofolio</td>
                        <td style='text-align:center' width='90'>Ticker</td>
                        <td style='text-align:center' width='90'>Date</td>
                        <td style='text-align:center' width='100'>Quantity</td>
                        <td style='text-align:center' width='100'>Price %</td>
                        <td style='text-align:center' width='50'>Buy / Sell</td>
                        <td style='text-align:center' width='50'>IBPA</td>
                        <td style='text-align:center' width='90'>Jatuh Tempo</td>
                    </tr>";
                    
                    $rs = $dbLib->execute($sql);
                    $quantity= 0;$no=1; $buy=0;$sell=0;
                    while ($row = $rs->FetchNextObject($toupper=false))
		            {
                        $quantity+=+$row->quantity;
                        if($row->buy_sell == "b"){
                            $buy+=$quantity;
                        }else{
                            $sell+=$quantity;
                        }
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;'>$row->portfolio</td>
                        <td style='border-top: medium none;'>$row->ticker</td>
                        <td style='border-top: medium none;'>$row->date</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->quantity,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->price,2,",",".")."</td>
                        <td style='border-top: medium none;'>".strtoupper($row->buy_sell)."</td>
                        <td style='border-top: medium none;'>$row->ibpa</td>
                        <td style='border-top: medium none;'>$row->jatuh_tempo</td>
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='' colspan='4'>BELI</td>
                        <td style='text-align:right' >".number_format($buy,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                    </tr>
                    <tr style=''>
                        <td style='' colspan='4'>JUAL</td>
                        <td style='text-align:right' >".number_format($sell,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                    </tr>
                    <tr style=''>
                        <td style='' colspan='4'>SALDO</td>
                        <td style='text-align:right' >".number_format($quantity,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <br>";
       
        echo "</div>";
        // }
		return "";
		
	}
	
}
?>
