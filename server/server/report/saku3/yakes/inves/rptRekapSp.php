<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRekapSp extends server_report_basic
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
        
        $sql = "select nama from inv_plan where kode_plan='$kode_plan' ";
        $rsp = $dbLib->execute($sql);
        $nama_plan = $rsp->fields[0];
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
                        <th  colspan='14' style='font-size:14px'>DAFTAR PENEMPATAN DANA ".strtoupper($nama_plan)." YAKES-TELKOM</th>
                    </tr>
                    <tr >
                        <th style='font-size:14px' colspan='14'>INSTRUMEN INVESTASI : PENYERTAAN SAHAM</th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px'>Per</th>
                        <th style='' colspan='13'>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size: 13px;'>
                    <tr style=''>
                        <td style='text-align:center' rowspan='3'>No</td>
                        <td style='text-align:center' rowspan='3'>Nama Anak Perusahaan</td>
                        <td style='text-align:center' colspan='3'>Saham Perusahaan</td>
                        <td style='text-align:center' colspan='9'>Nilai Investasi Yakes Telkom</td>
                        <td style='text-align:center' colspan='2'>SPI</td>
                    </tr>
                        <tr style=''>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Jumlah Saham Perusahaan</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Harga Per Saham (Rp)</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Nominal Saham (Rp)</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Jumlah Saham</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>% Penyertaan</td>
                        <td style='border-top: medium none; text-align:center' colspan='2'>Harga Perolehan</td>
                        <td style='border-top: medium none; text-align:center' colspan='2'>Nilai Buku</td>
                        <td style='border-top: medium none; text-align:center' colspan='3'>Nilai Wajar</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Harga Perolehan (%)</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Nilai Buku (%)</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center' >Harga Per Saham (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Harga Per Saham (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Harga Per Saham (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' >Komposisi (%)</td>
                    </tr>
                    <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                    </tr>";
                    $no=1;
                    $sql="select a.kode_mitra,a.nama
                    ,isnull(b.jumlah,0)/(a.persen/100) as jum_total
                    ,isnull(b.h_oleh,0) as h_oleh
                    ,isnull(b.jumlah,0)/(a.persen/100) * isnull(b.h_oleh,0) as total
                    ,isnull(b.jumlah,0) as jum_milik
                    ,isnull(a.persen,0) as persen_milik
                    ,isnull(b.h_oleh,0) as h_oleh2
                    ,isnull(b.jumlah,0) * isnull(b.h_oleh,0) as n_oleh
                    ,isnull(b.h_buku,0) as h_buku
                    ,round(isnull(b.jumlah,0) * isnull(b.h_buku,0),0) as n_buku
                    ,isnull(b.h_wajar,0) as h_wajar
                    ,round(isnull(b.jumlah,0) * isnull(b.h_wajar,0),0) as n_wajar
                    
                    ,round(isnull(b.jumlah,0) * isnull(b.h_wajar,0),0) / (sum(round(isnull(b.jumlah,0) * isnull(b.h_wajar,0),0)) over ()) * 100 as komposisi
                    
                    
                    ,round((isnull(b.jumlah,0) * isnull(b.h_wajar,0)) - (isnull(b.jumlah,0) * isnull(b.h_oleh,0)),0) as spi_oleh
                    ,round((isnull(b.jumlah,0) * isnull(b.h_wajar,0)) - (isnull(b.jumlah,0) * isnull(b.h_buku,0)),0) as spi_buku
                    
                    from inv_mitra a
                    left join inv_sp_kkp b on a.kode_mitra=b.kode_mitra 
                    $this->filter and b.tanggal='".$tmp[1]."' ";
                            
                    $rs = $dbLib->execute($sql);
                    $jum_total= 0;$h_oleh=0;$total=0;$jum_milik=0;$persen_milik=0;$h_oleh2=0;$n_oleh=0;$h_buku=0;$n_buku=0;$h_wajar=0;$n_wajar=0;$komposisi=0;$spi_oleh=0;$spi_buku=0;
                    while ($row = $rs->FetchNextObject($toupper=false))
		            {
                        $jum_total+=+$row->jum_total;
                        $h_oleh+=+$row->h_oleh;
                        $total+=+$row->total;
                        $jum_milik+=+$row->jum_milik;
                        $persen_milik+=+$row->persen_milik;
                        $h_oleh2+=+$row->h_oleh2;
                        $n_oleh+=+$row->n_oleh;
                        $h_buku+=+$row->h_buku;
                        $n_buku+=+$row->n_buku;
                        $h_wajar+=+$row->h_wajar;
                        $n_wajar+=+$row->n_wajar;
                        $komposisi+=+$row->komposisi;
                        $spi_oleh+=+$row->spi_oleh;
                        $spi_buku+=+$row->spi_buku;
            
                        echo" <tr style=''>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style='border-top: medium none;'>$row->nama</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->jum_total,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_oleh,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->total,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->jum_milik,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->persen_milik,2,",",".")."%</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_oleh2,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->n_oleh,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_buku,0,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row->n_buku,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->h_wajar,0,",",".")."</td>
                        <td style='border-top: medium none;text-align:right'>".number_format($row->n_wajar,0,",",".")."</td>
                        <td style='border-top: medium none; text-align:right'>".number_format($row->komposisi,2,",",".")."%</td>";
                        if($row->spi_oleh < 0){
                            $color = "color:red";
                        }else{
                            $color = "";
                        }

                        if($row->spi_buku < 0){
                            $color2 = "color:red";
                        }else{
                            $color2= "";
                        }
                        echo"
                        <td style='border-top: medium none; text-align:right;$color'>".number_format($row->spi_oleh,0,",",".")."</td>";
                        echo"
                        <td style='border-top: medium none; text-align:right;$color2'>".number_format($row->spi_buku,0,",",".")."</td>";
                        echo"
                    </tr>";
                    $no++;

                    }
                    echo"
                    <tr style=''>
                        <td style='' colspan='2'>Grand Total Saham Penyertaan</td>
                        <td style='text-align:right' >".number_format($jum_total,0,",",".")."</td>
                        <td style='text-align:right'>&nbsp;</td>
                        <td style='text-align:right' >".number_format($total,0,",",".")."</td>
                        <td style='text-align:right' >".number_format($jum_milik,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($n_oleh,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($n_buku,0,",",".")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >".number_format($n_wajar,0,",",".")."</td>
                        <td style='text-align:right' >".number_format($komposisi,2,",",".")."%</td>";
                        if($spi_oleh < 0){
                            $color = "color:red";
                        }else{
                            $color = "";
                        }
                        if($spi_buku < 0){
                            $color2 = "color:red";
                        }else{
                            $color2 = "";
                        }
                        echo"
                        <td style='text-align:right;$color' >".number_format($spi_oleh,0,",",".")."</td>
                        <td style='text-align:right;$color2' >".number_format($spi_buku,0,",",".")."</td>
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
