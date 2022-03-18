<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptHistorisRd extends server_report_basic
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
        
        $sql="select tanggal,jumlah,h_oleh,h_buku,h_wajar
        ,jumlah*h_oleh as n_oleh
        ,jumlah*h_buku as n_buku
        ,jumlah*h_wajar as n_wajar
        ,komisi,bylain,pph,gainlos,deviden
        
        from inv_rd_kkp $this->filter
        order by tanggal ";
        // echo $sql;

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse; width: 1083px;' cellspacing='2' cellpadding='1'>
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;

                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px'>HISTORIS DAN KKP REKSADANA YAKES-TELKOM</th>
                    </tr>
                    <tr >
                        <th style='font-size:14px' colspan='14'></th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px'>Periode</th>
                        <th style='' colspan='13'>".$periode."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style=''>
                        <td style='text-align:center' rowspan='2'>No</td>
                        <td style='text-align:center' rowspan='2'>Tanggal</td>
                        <td style='text-align:center' rowspan='2'>Jumlah Reksadana (Lbr)</td>
                        <td style='text-align:center' colspan='2'>Harga Perolehan</td>
                        <td style='text-align:center' colspan='2'>Nilai Buku</td>
                        <td style='text-align:center' colspan='2'>Nilai Wajar</td>
                        <td style='text-align:center' rowspan='2'>Komisi</td>
                        <td style='text-align:center' rowspan='2'>Biaya Lain</td>
                        <td style='text-align:center' rowspan='2'>PPH</td>
                        <td style='text-align:center' rowspan='2'>Gain Loss</td>
                        <td style='text-align:center' rowspan='2'>Deviden</td>
                    </tr>
                        <tr style=''>
                        <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Reksadana (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Reksadana (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; width: 52px;text-align:center' >Harga per Lembar Reksadana (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                    </tr>
                    ";
                            
                    $rs = $dbLib->execute($sql);
                    $no=1;
                    $noleh= 0;$nbuku=0;$nwajar=0;$komisi=0;$bylain=0;$pph=0;$gain=0;$deviden=0;
                    while ($row = $rs->FetchNextObject($toupper=false))
		            {
                        $noleh+=+$row->n_oleh;
                        $nbuku+=+$row->n_buku;
                        $nwajar+=+$row->n_wajar;
                        $komisi+=+$row->komisi;
                        $bylain+=+$row->bylain;
                        $pph+=+$row->pph;
                        $gain+=+$row->gainlos;
                        $deviden+=+$row->deviden;
            
                        echo "<tr>
                            <td style='border-top: medium none;text-align:center'>$no</td>
                            <td style='border-top: medium none;text-align:center'>$row->tanggal</td>
                            <td style='border-top: medium none;text-align:right'>".number_format($row->jumlah,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->h_oleh,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->n_oleh,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->h_buku,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->n_buku,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->h_wajar,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->n_wajar,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->komisi,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->bylain,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->pph,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->gainlos,2,",",".")."</td>
                            <td style='border-top: medium none; text-align:right'>".number_format($row->deviden,2,",",".")."</td>
                        </tr>";
                        $no++;

                    }
                    // echo"
                    // <tr style='height: 18.0pt;'>
                    //     <td style='' colspan='3'>TOTAL</td>
                    //     <td style='' >&nbsp;</td>
                    //     <td style='text-align:right' >".number_format($noleh,2,",",".")."</td>
                    //     <td style='' >&nbsp;</td>
                    //     <td style='text-align:right'>".number_format($nbuku,2,",",".")."</td>
                    //     <td style=''>&nbsp;</td>
                    //     <td style='text-align:right' >".number_format($nwajar,2,",",".")."</td>
                    //     <td style='text-align:right' >".number_format($komisi,2,",",".")."</td>
                    //     <td style='text-align:right' >".number_format($bylain,2,",",".")."</td>
                    //     <td style='text-align:right' >".number_format($pph,2,",",".")."</td>
                    //     <td style='text-align:right' >".number_format($gain,2,",",".")."</td>
                    //     <td style='text-align:right' >".number_format($deviden,2,",",".")."</td>
                    // </tr>";
                    echo"
                </tbody>
            </table>
            <br>";
       
        echo "</div>";
		return "";
		
	}
	
}
?>
