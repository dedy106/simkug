<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRekapSahamBund extends server_report_basic
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
        $tampil0 = $tmp[2];
        $tahun = substr($periode,0,4);

        $filter_periode = " and b.periode between '".$tahun."01' and '$periode' ";
        $filter_periode2 = " and a.periode between '".$tahun."01' and '$periode' ";

        if($tampil0 == "Tidak"){
            $fil_mutasi = " and (a.jumlah <> 0 ) ";
            $fil_mutasi2 = " having (sum(a.jumlah) <> 0 ) ";
        }else{
            $fil_mutasi = "";
            $fil_mutasi2 = "";
        }

        $sqlp = "select distinct a.kode_kelola,a.kode_plan,b.nama as nama_kelola,c.nama as nama_plan 
        from inv_saham_kkp a
        left join inv_kelola b on a.kode_kelola=b.kode_kelola
        left join inv_plan c on a.kode_plan=c.kode_plan
        $this->filter  and a.tanggal <= '".$tmp[1]."' 
        order by a.kode_kelola desc ";

        $rsp=$dbLib->execute($sqlp);
        while ($row = $rsp->FetchNextObject($toupper=false))
            {

        $sql2="select sum(a.nwajar) as totnwajar from (
            select
            a.kode_saham,b.nama,c.nama as nama_sektor
            ,a.jumlah,a.h_oleh, a.jumlah*a.h_oleh as noleh
            ,a.h_buku, a.jumlah*a.h_buku as nbuku
            ,a.h_wajar, a.jumlah*a.h_wajar as nwajar
            
            ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_oleh) as spioleh
            ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_buku) as spibuku
            
            from inv_saham_kkp a
            inner join inv_saham b on a.kode_saham=b.kode_saham
            inner join inv_sahamklp c on b.kode_sahamklp=c.kode_sahamklp
            where a.kode_kelola='$row->kode_kelola' and a.kode_plan='$row->kode_plan' and a.tanggal = '".$tmp[1]."'
            ) a ";
                    
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
                            <th  colspan='14' style='font-size:14px'>DAFTAR PENEMPATAN DANA ".strtoupper($row->nama_plan)." YAKES-TELKOM</th>
                        </tr>
                        <tr >
                            <th style='font-size:14px' colspan='14'>INSTRUMEN INVESTASI : SAHAM BURSA ($row->nama_kelola)</th>
                        </tr>
                        <tr style='height: 12.0pt;'>
                            <th style='font-size:14px'>Per</th>
                            <th style='' colspan='13'>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                        </tr>
                        <tr style=''>
                            <th style='' colspan='14'>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style=''>
                            <td style='text-align:center' rowspan='2'>No</td>
                            <td style='text-align:center' rowspan='2'>Kode Saham</td>
                            <td style='text-align:center' rowspan='2'>Kode Kelola</td>
                            <td style='text-align:center' rowspan='2'>Nama Perusahaan</td>
                            <td style='text-align:center' rowspan='2'>Sektor</td>
                            <td style='text-align:center' rowspan='2'>Jumlah Saham (Lbr)</td>
                            <td style='text-align:center' colspan='2'>Harga Perolehan</td>
                            <td style='text-align:center' colspan='2'>Nilai Buku</td>
                            <td style='text-align:center' colspan='3'>Nilai Wajar</td>
                            <td style='text-align:center' colspan='2'>SPI</td>
                            <td style='text-align:center' rowspan='2'>Reverse SPI</td>
                            <td style='text-align:center' rowspan='2'>Nilai Buku SPI</td>
                            <td style='text-align:center' rowspan='2'>Nilai Wajar SPI</td>
                        </tr>
                            <tr style=''>
                            <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Saham (Rp)</td>
                            <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                            <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Saham (Rp)</td>
                            <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                            <td style='border-top: medium none; text-align:center' >Harga per Lembar Saham (Rp)</td>
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
                        // $sql="select 
                        // a.kode_saham,a.kode_kelola,b.nama,c.nama as nama_sektor
                        // ,a.jumlah,a.h_oleh, a.jumlah*a.h_oleh as noleh
                        // ,a.h_buku, a.jumlah*a.h_buku as nbuku
                        // ,a.h_wajar, a.jumlah*a.h_wajar as nwajar
                        
                        // ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_oleh) as spioleh
                        // ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_buku) as spibuku
                        
                        // from inv_saham_kkp a
                        // inner join inv_saham b on a.kode_saham=b.kode_saham
                        // inner join inv_sahamklp c on b.kode_sahamklp=c.kode_sahamklp
                        // where a.kode_kelola='$row->kode_kelola' and a.kode_plan='$row->kode_plan' and a.tanggal = '".$tmp[1]."'  $fil_mutasi
                        // order by a.kode_saham,a.kode_kelola ";
                        $sql = "select a.kode_saham,a.kode_kelola,b.nama,c.nama as nama_sektor ,a.jumlah,a.h_oleh, a.jumlah*a.h_oleh as noleh ,a.h_buku, a.jumlah*a.h_buku as nbuku ,a.h_wajar, a.jumlah*a.h_wajar as nwajar ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_oleh) as spioleh ,(a.jumlah*a.h_wajar) - (a.jumlah*a.h_buku) as spibuku,

                        isnull(e.jtotal,0)+isnull(h.htotal,0) revspi, -- REVERSE SPI
                        (a.jumlah*a.h_buku) + isnull(e.jtotal,0)+isnull(h.htotal,0) as nbuku_revspi, -- NILAI BUKU REVERSE SPI
                        (a.jumlah*a.h_buku) + isnull(e.jtotal,0)+isnull(h.htotal,0) + ((a.jumlah*a.h_wajar) - (a.jumlah*a.h_buku)) as nwajar_revspi -- NILAI WAJAR REVERSE SPI
                        
                        from inv_saham_kkp a 
                        inner join inv_saham b on a.kode_saham=b.kode_saham 
                        inner join inv_sahamklp c on b.kode_sahamklp=c.kode_sahamklp 
                        
                        left join (select a.kode_kelola,a.kode_saham, sum((a.h_buku-a.h_oleh)* a.jumlah) as jtotal
                                    from inv_shmjual_d a inner join inv_shmjual_m b on a.no_shmjual=b.no_shmjual 
                                    where b.modul <> 'JPINDAH' and a.kode_kelola = '$row->kode_kelola' $filter_periode
                                    group by a.kode_kelola,a.kode_saham,b.kode_plan
                                   ) e on a.kode_saham=e.kode_saham and a.kode_kelola=e.kode_kelola 
                        
                        left join (	
                                    select b.kode_kelola,b.kode_saham,sum(b.nilai) as htotal
                                    from inv_shm_hmetd b
                                    where b.kode_kelola = '$row->kode_kelola' $filter_periode			
                                    group by b.kode_kelola,b.kode_saham,b.kode_plan
                                    ) h on a.kode_saham=h.kode_saham and a.kode_kelola=h.kode_kelola  
                        where a.kode_kelola='$row->kode_kelola' and a.kode_plan='$row->kode_plan' and a.tanggal = '".$tmp[1]."'  $fil_mutasi
                        order by a.kode_saham,a.kode_kelola";
                        
                        // echo $sql."<br>";
                                
                        $rs = $dbLib->execute($sql);
                        $noleh= 0;$nbuku=0;$nwajar=0;$spioleh=0;$spibuku=0;$nkomisi=0;$nspioleh=0;$nspibuku=0;$jumlah=0;$revspi=0;$nbuku_revspi=0;$nwajar_revspi=0;
                        while ($row = $rs->FetchNextObject($toupper=false))
                        {
                            $noleh+=+$row->noleh;
                            $nbuku+=+$row->nbuku;
                            $nwajar+=+$row->nwajar;
                            $nspioleh+=+$row->spioleh;
                            $nspibuku+=+$row->spibuku;
                            $jumlah+=+$row->jumlah;
                            $revspi+=+$row->revspi;
                            $nbuku_revspi+=+$row->nbuku_revspi;
                            $nwajar_revspi+=+$row->nwajar_revspi;
                            
                
                            $komisi = ($row->nwajar/$totnwajar)*100;
                            $nkomisi +=+$komisi; 
                            echo" <tr style=''>
                            <td style=' border-top: medium none;text-align:center'>$no</td>
                            <td style='border-top: medium none;text-align:center'>$row->kode_saham</td>
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
                            <td style='' >".number_format($jumlah,2,",",".")."</td>
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
            echo"<DIV style='page-break-after:always'></DIV>";
        }
        
        
        $sql2="select sum(a.nwajar) as totnwajar from (
            select 
            a.kode_saham,b.nama,c.nama as nama_sektor
            ,sum(a.jumlah) as jumlah,sum(a.jumlah*a.h_oleh) as noleh,sum(a.jumlah*a.h_oleh)/sum(a.jumlah) as h_oleh
            ,sum(a.jumlah*a.h_buku) as nbuku,sum(a.jumlah*a.h_buku)/sum(a.jumlah) as h_buku
            ,sum(a.jumlah*a.h_wajar) as nwajar, sum(a.jumlah*a.h_wajar)/sum(a.jumlah) as h_wajar
            
            ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_oleh) as spioleh
            ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_buku) as spibuku
            
            from inv_saham_kkp a
            inner join inv_saham b on a.kode_saham=b.kode_saham
            inner join inv_sahamklp c on b.kode_sahamklp=c.kode_sahamklp
            $this->filter and a.tanggal = '".$tmp[1]."'
            group by a.kode_saham,b.nama,c.nama
        ) a ";

        // echo $sql2."<br>";
                
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
                        <th style='font-size:14px' colspan='14'>INSTRUMEN INVESTASI : SAHAM BURSA (GABUNGAN)</th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px'>Per</th>
                        <th style='' colspan='13'>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style=''>
                        <td style='text-align:center' rowspan='2'>No</td>
                        <td style='text-align:center' rowspan='2'>Kode Saham</td>
                        <td style='text-align:center' rowspan='2'>Nama Perusahaan</td>
                        <td style='text-align:center' rowspan='2'>Sektor</td>
                        <td style='text-align:center' rowspan='2'>Jumlah Saham (Lbr)</td>
                        <td style='text-align:center' colspan='2'>Harga Perolehan</td>
                        <td style='text-align:center' colspan='2'>Nilai Buku</td>
                        <td style='text-align:center' colspan='3'>Nilai Wajar</td>
                        <td style='text-align:center' colspan='2'>SPI</td>
                        <td style='text-align:center' rowspan='2'>Reverse SPI</td>
                        <td style='text-align:center' rowspan='2'>Nilai Buku SPI</td>
                        <td style='text-align:center' rowspan='2'>Nilai Wajar SPI</td>
                    </tr>
                        <tr style=''>
                        <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Saham (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Harga Rata-Rata Per Saham (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Harga per Lembar Saham (Rp)</td>
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
                        <td style='border-top: medium none; text-align:center'>6</td>
                        <td style='border-top: medium none;text-align:center'>7=5x6</td>
                        <td style='border-top: medium none; text-align:center'>8</td>
                        <td style='border-top: medium none; text-align:center'>9=5x8</td>
                        <td style='border-top: medium none;text-align:center'>10</td>
                        <td style='border-top: medium none; text-align:center'>11=5x10</td>
                        <td style='border-top: medium none; text-align:center'>12</td>
                        <td style='border-top: medium none; text-align:center'>13=11-7</td>
                        <td style='border-top: medium none; text-align:center'>14=11-9</td>
                        <td style='border-top: medium none; text-align:center'>15</td>
                        <td style='border-top: medium none; text-align:center'>16</td>
                        <td style='border-top: medium none; text-align:center'>17</td>
                    </tr>";
                    $no=1;
                    $sql="select 
                    a.kode_saham,b.nama,c.nama as nama_sektor
                    ,sum(a.jumlah) as jumlah,sum(a.jumlah*a.h_oleh) as noleh,sum(a.jumlah*a.h_oleh)/sum(a.jumlah) as h_oleh
                    ,sum(a.jumlah*a.h_buku) as nbuku,sum(a.jumlah*a.h_buku)/sum(a.jumlah) as h_buku
                    ,sum(a.jumlah*a.h_wajar) as nwajar, sum(a.jumlah*a.h_wajar)/sum(a.jumlah) as h_wajar
                    
                    ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_oleh) as spioleh
                    ,sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_buku) as spibuku,
                    sum(isnull(e.jtotal,0))+sum(isnull(h.htotal,0)) revspi, -- REVERSE SPI
                    sum(a.jumlah*a.h_buku) + sum(isnull(e.jtotal,0)+isnull(h.htotal,0)) as nbuku_revspi, -- NILAI BUKU REVERSE SPI
                    sum(a.jumlah*a.h_buku) + sum(isnull(e.jtotal,0)+isnull(h.htotal,0)) + (sum(a.jumlah*a.h_wajar) - sum(a.jumlah*a.h_buku)) as nwajar_revspi -- NILAI WAJAR REVERSE SPI
                    from inv_saham_kkp a
                    inner join inv_saham b on a.kode_saham=b.kode_saham
                    inner join inv_sahamklp c on b.kode_sahamklp=c.kode_sahamklp

                    left join (select a.kode_kelola,a.kode_saham, sum((a.h_buku-a.h_oleh)* a.jumlah) as jtotal
                    from inv_shmjual_d a inner join inv_shmjual_m b on a.no_shmjual=b.no_shmjual 
                    $this->filter and b.modul <> 'JPINDAH' $filter_periode
                    group by a.kode_kelola,a.kode_saham,b.kode_plan
                    ) e on a.kode_saham=e.kode_saham and a.kode_kelola=e.kode_kelola 

                    left join (	
                        select a.kode_kelola,a.kode_saham,sum(a.nilai) as htotal
                        from inv_shm_hmetd a
                        where a.kode_kelola = 'YKT' $filter_periode2
                        group by a.kode_kelola,a.kode_saham,a.kode_plan
                        ) h on a.kode_saham=h.kode_saham and a.kode_kelola=h.kode_kelola  
                    $this->filter and a.tanggal = '".$tmp[1]."'  
                    group by a.kode_saham,b.nama,c.nama
                    $fil_mutasi2
                    order by a.kode_saham ";
                    
                    // echo $sql."<br>";
                            
                    $rs = $dbLib->execute($sql);
                    $noleh= 0;$nbuku=0;$nwajar=0;$spioleh=0;$spibuku=0;$nkomisi=0;$nspioleh=0;$nspibuku=0;$jumlah=0;$revspi=0;$nbuku_revspi=0;$nwajar_revspi=0;
                    while ($row = $rs->FetchNextObject($toupper=false))
		            {
                        $noleh+=+$row->noleh;
                        $nbuku+=+$row->nbuku;
                        $nwajar+=+$row->nwajar;
                        $nspioleh+=+$row->spioleh;
                        $nspibuku+=+$row->spibuku;
                        $jumlah+=+$row->jumlah;
                        $revspi+=+$row->revspi;
                        $nbuku_revspi+=+$row->nbuku_revspi;
                        $nwajar_revspi+=+$row->nwajar_revspi;
            
                        $komisi = ($row->nwajar/$totnwajar)*100;
                        $nkomisi +=+$komisi; 
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;text-align:center'>$row->kode_saham</td>
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
                        <td style='' colspan='4'>TOTAL</td>
                        <td style='' >".number_format($jumlah,2,",",".")."</td>
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
