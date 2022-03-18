<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRekapRd extends server_report_basic
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
        $tahun = substr($periode,0,4);
        $filter_periode = " and a.periode between '".$tahun."01' and '$periode' ";
        
        $sql2="select sum(a.nwajar) as totnwajar from (
        select
        a.kode_rd,b.nama,c.nama as nama_sektor
        ,a.jumlah,a.h_oleh, a.jumlah*a.h_oleh as noleh
        ,a.h_buku, a.jumlah*a.h_buku as nbuku
        ,a.h_wajar, a.jumlah*a.h_wajar as nwajar
        
        ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_oleh) as spioleh
        ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_buku) as spibuku
        
        from inv_rd_kkp a
        inner join inv_rd b on a.kode_rd=b.kode_rd
        inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp
        where a.tanggal = '".$tmp[1]."'
        ) a ";
                
        $rs2 = $dbLib->execute($sql2);
        $totnwajar = $rs2->fields[0];

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' >
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px'>DAFTAR PENEMPATAN DANA JAMKESPEN YAKES-TELKOM</th>
                    </tr>
                    <tr >
                        <th style='font-size:14px' colspan='14'>INSTRUMEN INVESTASI : REKSADANA (SWAKELOLA)</th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px'>Per</th>
                        <th style='' colspan='13'>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:13px'>
                    <tr style=''>
                        <td style='text-align:center' rowspan='2'>No</td>
                        <td style='text-align:center' rowspan='2'>Kode Reksadana</td>
                        <td style='text-align:center' rowspan='2'>Kode Kelola</td>
                        <td style='text-align:center' rowspan='2'>Nama Perusahaan</td>
                        <td style='text-align:center' rowspan='2'>Sektor</td>
                        <td style='text-align:center' rowspan='2'>Jumlah Reksadana (Lbr)</td>
                        <td style='text-align:center' colspan='2'>Harga Perolehan</td>
                        <td style='text-align:center' colspan='2'>Nilai Buku</td>
                        <td style='text-align:center' colspan='3'>Nilai Wajar</td>
                        <td style='text-align:center' colspan='2'>SPI</td>
                        <td style='text-align:center' rowspan='2'>Reverse SPI</td>
                        <td style='text-align:center' rowspan='2'>Nilai Buku SPI</td>
                        <td style='text-align:center' rowspan='2'>Nilai Wajar SPI</td>
                    </tr>
                        <tr style=''>
                        <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Reksadana (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Reksadana (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Harga per Lembar Reksadana (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Komposisi</td>
                        <td style='border-top: medium none; text-align:center' >Harga Perolehan (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Nilai Buku (Rp)</td>
                    </tr>
                    <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>1</td>
                        <td style='border-top: medium none;text-align:center'>2</td>
                        <td style='border-top: medium none;text-align:center'>3</td>
                        <td style='border-top: medium none;text-align:center'>4</td>
                        <td style='border-top: medium none;text-align:center'>5</td>
                        <td style='border-top: medium none;text-align:center'>6</td>
                        <td style='border-top: medium none; text-align:center'>7</td>
                        <td style='border-top: medium none;text-align:center'>8=6x7</td>
                        <td style='border-top: medium none; text-align:center'>9</td>
                        <td style='border-top: medium none; text-align:center'>10=6x9</td>
                        <td style='border-top: medium none;text-align:center'>11</td>
                        <td style='border-top: medium none; text-align:center'>12=6x11</td>
                        <td style='border-top: medium none; text-align:center'>13</td>
                        <td style='border-top: medium none; text-align:center'>14=12-8</td>
                        <td style='border-top: medium none; text-align:center'>15=12-10</td>
                        <td style='border-top: medium none; text-align:center'>16</td>
                        <td style='border-top: medium none; text-align:center'>17</td>
                        <td style='border-top: medium none; text-align:center'>18</td>
                    </tr>";
                    $no=1;
                    $sql="select a.kode_rd,a.kode_kelola,b.nama,c.nama as nama_sektor ,a.jumlah,a.h_oleh, a.jumlah*a.h_oleh as noleh ,a.h_buku, a.jumlah*a.h_buku as nbuku ,a.h_wajar, a.jumlah*a.h_wajar as nwajar ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_oleh) as spioleh ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_buku) as spibuku, 

                    isnull(e.jtotal,0) revspi, -- REVERSE SPI
                    (a.jumlah*a.h_buku) + isnull(e.jtotal,0) as nbuku_revspi, -- NILAI BUKU REVERSE SPI
                    (a.jumlah*a.h_buku) + isnull(e.jtotal,0) + ((a.jumlah*a.h_wajar) - (a.jumlah*a.h_buku)) as nwajar_revspi -- NILAI WAJAR REVERSE SPI
                    
                    from inv_rd_kkp a 
                    inner join inv_rd b on a.kode_rd=b.kode_rd 
                    inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp 
                    
                    left join (
                         select b.kode_rdkelola,b.kode_rd,sum((b.h_buku-b.h_oleh)* b.jumlah) as jtotal
                         from inv_rdjual_m a inner join inv_rdjual_d b on a.no_rdjual=b.no_rdjual
                         $filter_periode
                         group by b.kode_rdkelola,b.kode_rd
                         )e on b.kode_rd=e.kode_rd and b.kode_rdkelola=e.kode_rdkelola 
                    where a.tanggal = '".$tmp[1]."'
                    order by a.kode_rd,a.kode_kelola ";
                            
                    $rs = $dbLib->execute($sql);
                    $noleh= 0;$nbuku=0;$nwajar=0;$spioleh=0;$spibuku=0;$nkomisi=0;$revspi=0;$nbuku_revspi=0;$nwajar_revspi=0;
                    while ($row = $rs->FetchNextObject($toupper=false))
		            {
                        $noleh+=+$row->noleh;
                        $nbuku+=+$row->nbuku;
                        $nwajar+=+$row->nwajar;
                        $nspioleh+=+$row->spioleh;
                        $nspibuku+=+$row->spibuku;
                        $revspi+=+$row->revspi;
                        $nbuku_revspi+=+$row->nbuku_revspi;
                        $nwajar_revspi+=+$row->nwajar_revspi;
            
                        $komisi = ($row->nwajar/$totnwajar)*100;
                        $nkomisi +=+$komisi; 
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;text-align:center'>$row->kode_rd</td>
                        <td style='border-top: medium none;text-align:center'>$row->kode_kelola</td>
                        <td style='border-top: medium none;'>$row->nama</td>
                        <td style='border-top: medium none;'>$row->nama_sektor</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->jumlah,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_oleh,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row->noleh,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_buku,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row->nbuku,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row->h_wajar,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->nwajar,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($komisi,2,",",".")."%</td>";
                        if($row->spioleh < 0){
                            $color = "color:red";
                        }else{
                            $color = "";
                        }

                        if($row->spibuku < 0){
                            $color2 = "color:red";
                        }else{
                            $color2= "";
                        }
                        echo"
                        <td style='border-top: medium none; text-align:right;$color'>".number_format($row->spioleh,2,",",".")."</td>";
                        echo"
                        <td style='border-top: medium none; text-align:right;$color2'>".number_format($row->spibuku,2,",",".")."</td>";
                        echo"
                        <td style='border-top: medium none;text-align:right'>".number_format($row->revspi,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->nbuku_revspi,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->nwajar_revspi,2,",",".")."</td>
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='' colspan='5'>TOTAL</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($noleh,2,",",".")."</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right'>".number_format($nbuku,2,",",".")."</td>
                        <td style=''>&nbsp;</td>
                        <td style='text-align:right' >".number_format($nwajar,2,",",".")."</td>
                        <td style='text-align:right' >$nkomisi%</td>";
                        if($nspioleh < 0){
                            $color = "color:red";
                        }else{
                            $color = "";
                        }
                        if($nspibuku < 0){
                            $color2 = "color:red";
                        }else{
                            $color2 = "";
                        }
                        echo"
                        <td style='text-align:right;$color' >".number_format($nspioleh,2,",",".")."</td>
                        <td style='text-align:right;$color2' >".number_format($nspibuku,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($revspi,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($nbuku_revspi,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($nwajar_revspi,2,",",".")."</td>
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
