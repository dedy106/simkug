<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRekapRdBund extends server_report_basic
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
        $kode_plan=$tmp[2];
        $tahun = substr($periode,0,4);
        $filter_periode = " and a.periode between '".$tahun."01' and '$periode' ";

        $sql2="select sum(a.nwajar) as totnwajar from (
            select 
            a.kode_rd,b.nama,c.nama as nama_sektor
            ,sum(a.jumlah) as jumlah,sum(a.jumlah*a.h_oleh) as noleh,sum(a.jumlah*a.h_oleh)/sum(a.jumlah) as h_oleh
            ,sum(a.jumlah*a.h_buku) as nbuku,sum(a.jumlah*a.h_buku)/sum(a.jumlah) as h_buku
            ,sum(a.jumlah*a.h_wajar) as nwajar, sum(a.jumlah*a.h_wajar)/sum(a.jumlah) as h_wajar
            
            ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_oleh) as spioleh
            ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_buku) as spibuku
            
            from inv_rd_kkp a
            inner join inv_rd b on a.kode_rd=b.kode_rd 
            inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp
            $this->filter and a.tanggal = '".$tmp[1]."' 
            group by a.kode_rd,b.nama,c.nama
        ) a ";

        // echo $sql2."<br>";
                
        $rs2 = $dbLib->execute($sql2);
        $totnwajar = $rs2->fields[0];

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;

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
                        <td style='text-align:center' rowspan='2'>Jenis Reksadana</td>
                        <td style='text-align:center' rowspan='2'>Nama Perusahaan</td>
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
                        <td style='border-top: medium none; text-align:center'>5</td>
                        <td style='border-top: medium none;text-align:center'>6=4x5</td>
                        <td style='border-top: medium none; text-align:center'>7</td>
                        <td style='border-top: medium none; text-align:center'>8=4x7</td>
                        <td style='border-top: medium none;text-align:center'>9</td>
                        <td style='border-top: medium none; text-align:center'>10=4x9</td>
                        <td style='border-top: medium none; text-align:center'>11</td>
                        <td style='border-top: medium none; text-align:center'>12=10-6</td>
                        <td style='border-top: medium none; text-align:center'>13=10-8</td>
                        <td style='border-top: medium none; text-align:center'>14</td>
                        <td style='border-top: medium none; text-align:center'>15</td>
                        <td style='border-top: medium none; text-align:center'>16</td>
                    </tr>";
            $sql = "select a.kode_plan,a.nama 
            from inv_plan a
            $this->filter
            ";
            $rs0 = $dbLib->execute($sql);
            $gnoleh= 0;$gnbuku=0;$gnwajar=0;$gspioleh=0;$gspibuku=0;$gnkomisi=0;$gnspioleh=0;$gnspibuku=0;$gnrevspi=0;$gnnbuku_revspi=0;$gnnwajar_revspi=0;
            while ($row0 = $rs0->FetchNextObject($toupper=false))
            {

                echo "<tr>
                    <td colspan='17' style='font-weight:bold'>$row0->nama</td>
                    </tr>";
                if($row0->kode_plan == "1"){
                    $filterplan = " where a.status_dana ='DAKES' ";
                }else if($row0->kode_plan == "2"){
                    $filterplan = " where a.status_dana ='DAKEM' ";
                }
                
                $sql = "select a.kode_rdklp,a.nama 
                        from inv_rdklp a 
                        $filterplan
                        order by a.kode_rdklp asc ";
                $rsk = $dbLib->execute($sql);
                $tnoleh= 0;$tnbuku=0;$tnwajar=0;$tspioleh=0;$tspibuku=0;$tnkomisi=0;$tnspioleh=0;$tnspibuku=0;$tnrevspi=0;$tnnbuku_revspi=0;$tnnwajar_revspi=0;
                while ($row = $rsk->FetchNextObject($toupper=false))
                {
                    echo "<tr>
                    <td colspan='17' style='font-weight:bold'>$row->nama</td>
                    </tr>";
                    $no=1;

                    $sql="select 
                    a.kode_rd,b.nama,c.nama as nama_sektor
                    ,sum(a.jumlah) as jumlah,sum(a.jumlah*a.h_oleh) as noleh,sum(a.jumlah*a.h_oleh)/sum(a.jumlah) as h_oleh
                    ,sum(a.jumlah*a.h_buku) as nbuku,sum(a.jumlah*a.h_buku)/sum(a.jumlah) as h_buku
                    ,sum(a.jumlah*a.h_wajar) as nwajar, sum(a.jumlah*a.h_wajar)/sum(a.jumlah) as h_wajar
                    
                    ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_oleh) as spioleh
                    ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_buku) as spibuku, 

                    sum(isnull(e.jtotal,0)) revspi, -- REVERSE SPI
                    sum(a.jumlah*a.h_buku) + sum(isnull(e.jtotal,0)) as nbuku_revspi, -- NILAI BUKU REVERSE SPI
                    sum(a.jumlah*a.h_buku) + sum(isnull(e.jtotal,0)) + (sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_buku)) as nwajar_revspi -- NILAI WAJAR REVERSE SPI
                    from inv_rd_kkp a
                    inner join inv_rd b on a.kode_rd=b.kode_rd
                    inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp
                    left join (
                        select b.kode_rdkelola,b.kode_rd,sum((b.h_buku-b.h_oleh)* b.jumlah) as jtotal
                        from inv_rdjual_m a inner join inv_rdjual_d b on a.no_rdjual=b.no_rdjual
                        $filter_periode
                        group by b.kode_rdkelola,b.kode_rd
                        )e on b.kode_rd=e.kode_rd and b.kode_rdkelola=e.kode_rdkelola 
                    $this->filter and a.tanggal = '".$tmp[1]."' and b.kode_rdklp = '".$row->kode_rdklp."' 
                    and abs ( (jumlah * h_wajar)+(jumlah * h_oleh) ) > 1
                    group by a.kode_rd,b.nama,c.nama
                    order by a.kode_rd ";
                    
                // echo $sql."<br>";
                            
                    $rs = $dbLib->execute($sql);
                    $noleh= 0;$nbuku=0;$nwajar=0;$spioleh=0;$spibuku=0;$nkomisi=0;$nspioleh=0;$nspibuku=0;$revspi=0;$nbuku_revspi=0;$nwajar_revspi=0;
                    while ($row1 = $rs->FetchNextObject($toupper=false))
		            {
                        $noleh+=+$row1->noleh;
                        $nbuku+=+$row1->nbuku;
                        $nwajar+=+$row1->nwajar;
                        $nspioleh+=+$row1->spioleh;
                        $nspibuku+=+$row1->spibuku;
                        $revspi+=+$row1->revspi;
                        $nbuku_revspi+=+$row1->nbuku_revspi;
                        $nwajar_revspi+=+$row1->nwajar_revspi;
            
                        $komisi = ($row1->nwajar/$totnwajar)*100;
                        $nkomisi +=+$komisi; 

                        
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;'>$row1->nama_sektor</td>
                        <td style='border-top: medium none;'>$row1->nama</td>";
                        echo "
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->jumlah,2,",",".")."</td>";
                        echo"
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->h_oleh,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row1->noleh,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->h_buku,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row1->nbuku,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row1->h_wajar,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nwajar,2,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($komisi,2,",",".")."%</td>";
                        if($row1->spioleh < 0){
                            $color = "color:red";
                        }else{
                            $color = "";
                        }

                        if($row1->spibuku < 0){
                            $color2 = "color:red";
                        }else{
                            $color2= "";
                        }
                        echo"
                        <td style='border-top: medium none; text-align:right;$color'>".number_format($row1->spioleh,2,",",".")."</td>";
                        echo"
                        <td style='border-top: medium none; text-align:right;$color2'>".number_format($row1->spibuku,2,",",".")."</td>";
                        echo"
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->revspi,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nbuku_revspi,2,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row1->nwajar_revspi,2,",",".")."</td>
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='font-weight:bold' colspan='3'>$row->nama Total</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($noleh,2,",",".")."</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right'>".number_format($nbuku,2,",",".")."</td>
                        <td style=''>&nbsp;</td>
                        <td style='text-align:right' >".number_format($nwajar,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($nkomisi,2,",",".")."%</td>";
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
                    </tr>";
                    //total semua
                    $tnoleh+=+$noleh;
                    $tnbuku+=+$nbuku;
                    $tnwajar+=+$nwajar;
                    $tnspioleh+=+$nspioleh;
                    $tnspibuku+=+$nspibuku;
                    $tnrevspi+=+$revspi;
                    $tnnbuku_revspi+=+$nbuku_revspi;
                    $tnnwajar_revspi+=+$nwajar_revspi;
        
                    $tnkomisi +=+$nkomisi; 
                }
                echo"
                    <tr style=''>
                        <td style='font-weight:bold' colspan='3'>Total</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($tnoleh,2,",",".")."</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right'>".number_format($tnbuku,2,",",".")."</td>
                        <td style=''>&nbsp;</td>
                        <td style='text-align:right' >".number_format($tnwajar,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($tnkomisi,2,",",".")."%</td>";
                        if($tnspioleh < 0){
                            $color = "color:red";
                        }else{
                            $color = "";
                        }
                        if($tnspibuku < 0){
                            $color2 = "color:red";
                        }else{
                            $color2 = "";
                        }
                        echo"
                        <td style='text-align:right;$color' >".number_format($tnspioleh,2,",",".")."</td>
                        <td style='text-align:right;$color2' >".number_format($tnspibuku,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($tnrevspi,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($tnnbuku_revspi,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($tnnwajar_revspi,2,",",".")."</td>
                    </tr>";
                    $gnoleh+=+$tnoleh;
                    $gnbuku+=+$tnbuku;
                    $gnwajar+=+$tnwajar;
                    $gnspioleh+=+$tnspioleh;
                    $gnspibuku+=+$tnspibuku;
                    $gnrevspi+=+$tnrevspi;
                    $gnnbuku_revspi+=+$tnnbuku_revspi;
                    $gnnwajar_revspi+=+$tnnwajar_revspi;
        
                    $gnkomisi +=+$tnkomisi; 
            }
                echo"
                    <tr style=''>
                        <td style='font-weight:bold' colspan='3'>Grand Total</td>
                        <td style='' >&nbsp;</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($gnoleh,2,",",".")."</td>
                        <td style='' >&nbsp;</td>
                        <td style='text-align:right'>".number_format($gnbuku,2,",",".")."</td>
                        <td style=''>&nbsp;</td>
                        <td style='text-align:right' >".number_format($gnwajar,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($gnkomisi,2,",",".")."%</td>";
                        if($gnspioleh < 0){
                            $color = "color:red";
                        }else{
                            $color = "";
                        }
                        if($gnspibuku < 0){
                            $color2 = "color:red";
                        }else{
                            $color2 = "";
                        }
                        echo"
                        <td style='text-align:right;$color' >".number_format($gnspioleh,2,",",".")."</td>
                        <td style='text-align:right;$color2' >".number_format($gnspibuku,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($tnrevspi,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($tnnbuku_revspi,2,",",".")."</td>
                        <td style='text-align:right' >".number_format($tnnwajar_revspi,2,",",".")."</td>
                    </tr>";
                echo"
                </tbody>
            </table>
            <br>";
       
        echo "</div>";
  
		return "";
		
	}
	
}
?>
