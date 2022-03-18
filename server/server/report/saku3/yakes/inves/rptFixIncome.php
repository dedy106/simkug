<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptFixIncome extends server_report_basic
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
        
        $sql="select 
        a.kode_rdkelola,c.nama as nama_rd,a.kode_jenis,b.isin,b.nama, b.kode_rating, b.persen as rate_kupon,b.tgl_selesai as matur_date,
        a.status,
        sum(a.nilai) as nominal,sum(isnull(x.n_jual,0)) as terjual, sum(a.nilai - isnull(x.n_jual,0)) as sisa
        
       from inv_obli_d a 
       inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis
       inner join inv_rdkelola c on a.kode_rdkelola=c.kode_rdkelola
       inner join inv_obli_rating d on b.kode_rating=d.kode_rating
       
       left join ( 
       
       select no_beli,sum(n_oleh) as n_jual
       from inv_oblijual_d 
       group by no_beli
       
       ) x on a.no_beli=x.no_beli
       
       $this->filter
       group by  a.kode_rdkelola,c.nama,a.kode_jenis,b.isin,b.nama,b.kode_rating, b.persen,b.tgl_selesai,a.status
       order by a.kode_rdkelola,a.kode_jenis ";
                
        $rs = $dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1320' >
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px;text-align:left'>LAPORAN FIX INCOME YAKES-TELKOM</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style=''>
                        <td style='text-align:center' width='10' >No</td>
                        <td style='text-align:center' width='90'>Kode Kelola</td>
                        <td style='text-align:center' width='150'>Nama Kelola</td>
                        <td style='text-align:center' width='90'>Kode Jenis</td>
                        <td style='text-align:center' width='90'>ISIN</td>
                        <td style='text-align:center' width='250'>Nama Jenis</td>
                        <td style='text-align:center' width='90'>Kode Rating</td>
                        <td style='text-align:center' width='50'>Rate Kupon</td>
                        <td style='text-align:center' width='90'>Matur Date</td>
                        <td style='text-align:center' width='50'>Status</td>
                        <td style='text-align:center' width='90'>Nominal</td>
                        <td style='text-align:center' width='90'>Terjual</td>
                        <td style='text-align:center' width='90'>Sisa</td>
                    </tr>";
                    
                    $rs = $dbLib->execute($sql);
                    $nominal= 0;$terjual=0;$sisa=0;$no=1;
                    while ($row = $rs->FetchNextObject($toupper=false))
		            {
                        $nominal+=+$row->nominal;
                        $terjual+=+$row->terjual;
                        $sisa+=+$row->sisa;
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;text-align:center'>$row->kode_rdkelola</td>
                        <td style='border-top: medium none;'>$row->nama_rd</td>
                        <td style='border-top: medium none;'>$row->kode_jenis</td>
                        <td style='border-top: medium none;'>$row->isin</td>
                        <td style='border-top: medium none;'>$row->nama</td>
                        <td style='border-top: medium none;'>$row->kode_rating</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->rate_kupon,2,",",".")."</td>
                        <td style='border-top: medium none;'>$row->matur_date</td>
                        <td style='border-top: medium none;'>$row->status</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->nominal,0,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row->terjual,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->sisa,0,",",".")."</td>
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='' colspan='10'>TOTAL</td>
                        <td style='text-align:right' >".number_format($nominal,0,",",".")."</td>
                        <td style='text-align:right;' >".number_format($terjual,0,",",".")."</td>
                        <td style='text-align:right;' >".number_format($sisa,0,",",".")."</td>
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
