<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptPenawaranRate extends server_report_basic
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
        // $tgl=$tmp[1];
        
        $sql="select  a.no_shop,a.tanggal,e.nama as manajer,a.jab2,f.nama as officer, a.jab1
        from inv_shop_m a
        inner join karyawan e on a.nikttd2=e.nik
        inner join karyawan f on a.nikttd1=f.nik
        $this->filter 
        ";
        // echo $sql;
                
        $rs = $dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        while ($row = $rs->FetchNextObject($toupper=false))
		{
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' >
                <style>
                    td{
                        border:1px solid black;
                        padding:0px 4px;
                    }
                    .ttd{
                        border:0;
                        padding:0px 4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='14' style='font-size:14px; text-align: center;'>PENAWARAN RATE DEPOSITO & DOC</th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='text-align: center;' colspan='14'><span'>PENEMPATAN TANGGAL </span>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,0,4).substr($row->tanggal,5,2))."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align:center' rowspan='2'>No</td>
                        <td style='text-align:center' rowspan='2'>Nama Bank</td>
                        <td style='text-align:center' colspan='4'>Rate DOC</td>
                        <td style='text-align:center' colspan='2'>Berjangka</td>
                        <td style='text-align:center' rowspan='2'>Maks. Penempatan Deposito</td>
                        <td style='text-align:center' colspan='3'>Deposito Eksiting</td>
                        <td style='text-align:center' rowspan='2'>Sisa Plafon</td>
                        <td style='text-align:center' rowspan='2'>Ket</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center' rowspan=''>1-4 hari</td>
                        <td style='border-top: medium none; text-align:center' rowspan=''>5-12 hari</td>
                        <td style='border-top: medium none; text-align:center' rowspan=''>13-20 hari</td>
                        <td style='border-top: medium none; text-align:center' rowspan=''>14-28 hari</td>
                        <td style='border-top: medium none; text-align:center' colspan=''>1 bulan</td>
                        <td style='border-top: medium none; text-align:center' colspan=''>3 bulan</td>
                        <td style='border-top: medium none; text-align:center' colspan=''>DOC</td>
                        <td style='border-top: medium none; text-align:center' colspan=''>Berjangka</td>
                        <td style='border-top: medium none; text-align:center' colspan=''>Jumlah</td>
                    </tr>
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>1</td>
                        <td style=' border-top: medium none;text-align:center'>2</td>
                        <td style=' border-top: medium none;text-align:center'>3</td>
                        <td style=' border-top: medium none;text-align:center'>4</td>
                        <td style=' border-top: medium none;text-align:center'>5</td>
                        <td style=' border-top: medium none;text-align:center'>6</td>
                        <td style=' border-top: medium none;text-align:center'>7</td>
                        <td style=' border-top: medium none;text-align:center'>8</td>
                        <td style=' border-top: medium none;text-align:center'>9</td>
                        <td style=' border-top: medium none;text-align:center'>10</td>
                        <td style=' border-top: medium none;text-align:center'>11</td>
                        <td style=' border-top: medium none;text-align:center'>12</td>
                        <td style=' border-top: medium none;text-align:center'>13</td>
                        <td style=' border-top: medium none;text-align:center'>14</td>
                </tr>
                ";
                $sql = "select b.nama as bank,a.h1,a.h2,a.h3,a.h4,a.b1,a.b3,
                a.maks,
                a.doc_eks,a.depo_eks,a.doc_eks+a.depo_eks as tot_eks, a.maks-(a.doc_eks+a.depo_eks) as sisa, a.keterangan,
                c.tanggal,e.nama as manajer,c.jab2,f.nama as officer, c.jab3
                from inv_shop_just a 
                inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
                inner join inv_shop_m c on a.no_shop=c.no_shop
                inner join karyawan e on c.nikttd2=e.nik
                inner join karyawan f on c.nikttd1=f.nik
                where a.no_shop ='$row->no_shop' ";

                $rs1=$dbLib->execute($sql);
                $no=1;$doc_eks=0;$depo_eks=0;$tot_eks=0;$h1=0;$h2=0;$h3=0;$h4=0;$b1=0;$b3=0;$maks=0;$sisa=0;
                while($row1=$rs1->FetchNextObject($toupper=false)){
                    $doc_eks+=$row1->doc_eks;
                    $depo_eks+=$row1->depo_eks;
                    $tot_eks+=$row1->tot_eks;
                    echo "
                <tr>
                    <td style=' border-top: medium none;text-align:center'>$no</td>
                    <td style=' border-top: medium none;text-align:left'>$row1->bank</td>";
                    if($row1->h1 == 0){
                        $h1 = "";
                    }else{
                        $h1 = number_format($row1->h1,2,",",".")."%";
                    }
                    if($row1->h2 == 0){
                        $h2 = "";
                    }else{
                        $h2 = number_format($row1->h2,2,",",".")."%";
                    }
                    if($row1->h3 == 0){
                        $h3 = "";
                    }else{
                        $h3 = number_format($row1->h3,2,",",".")."%";
                    }
                    if($row1->h4 == 0){
                        $h4 = "";
                    }else{
                        $h4 = number_format($row1->h4,2,",",".")."%";
                    }
                    if($row1->b1 == 0){
                        $b1 = "";
                    }else{
                        $b1 = number_format($row1->b1,2,",",".")."%";
                    }
                    if($row1->b3 == 0){
                        $b3 = "";
                    }else{
                        $b3 = number_format($row1->b3,2,",",".")."%";
                    }
                    echo"
                    <td style=' border-top: medium none;text-align:center'>".$h1."</td>
                    <td style=' border-top: medium none;text-align:center'>".$h2."</td>
                    <td style=' border-top: medium none;text-align:center'>".$h3."</td>
                    <td style=' border-top: medium none;text-align:center'>".$h4."</td>
                    <td style=' border-top: medium none;text-align:center'>".$b1."</td>
                    <td style=' border-top: medium none;text-align:center'>".$b3."</td>";
                    if($row1->maks == '999999999999'){
                        echo"
                        <td style=' border-top: medium none;text-align:center'>Tidak Terbatas</td>";
                    }else{
                        echo"
                        <td style=' border-top: medium none;text-align:center'>".number_format($row1->maks,0,",",".")."</td>";
                    }
                    echo"
                    <td style=' border-top: medium none;text-align:right'>".number_format($row1->doc_eks,0,",",".")."</td>
                    <td style=' border-top: medium none;text-align:right'>".number_format($row1->depo_eks,0,",",".")."</td>
                    <td style=' border-top: medium none;text-align:right'>".number_format($row1->tot_eks,0,",",".")."</td>";
                    if($row1->sisa == '999999999999'){
                        echo"
                        <td style=' border-top: medium none;text-align:center'>Tidak Terbatas</td>";
                    }else{
                        echo"
                        <td style=' border-top: medium none;text-align:center'>".number_format($row1->sisa,0,",",".")."</td>";
                    }
                    echo"
                    <td style=' border-top: medium none;text-align:left'>$row1->keterangan</td>
                </tr>
                    ";
                    $no++;
                }
                    echo"
                  <tr>
                    <td>&nbsp;</td>
                    <td style='text-align: center; font-weight: bold;'>Jumlah Total</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style='text-align: right; font-weight: bold;'>".number_format($tot_eks,0,",",".")."</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>";
                  $sql= "select min(a.h1) as minh1,min(a.h2) as minh2,min(a.h3) as minh3,min(a.h4) as minh4,min(a.b1) as minb1,min(a.b3) as minb3
                  from inv_shop_just a 
                  inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
                  inner join inv_shop_m c on a.no_shop=c.no_shop
                  inner join karyawan e on c.nikttd2=e.nik
                  inner join karyawan f on c.nikttd1=f.nik
                  where a.no_shop ='$row->no_shop' and (a.h1 <> 0 and a.h2 <> 0 and a.h3 <> 0 and a.h4 <> 0 and a.b1 <> 0 and a.b3 <> 0)";
                  $rsmin = $dbLib->execute($sql);
                  $rowmin = $rsmin->FetchNextObject($toupper=false);
                  echo"
                  <tr>
                    <td>&nbsp;</td>
                    <td style='text-align: right;'>Rate Minimal</td>
                    <td style='text-align: center;'>".number_format($rowmin->minh1,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmin->minh2,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmin->minh3,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmin->minh4,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmin->minb1,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmin->minb3,2,",",".")."%</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>";
                  $sql= "select max(a.h1) as maxh1,max(a.h2) as maxh2,max(a.h3) as maxh3,max(a.h4) as maxh4,max(a.b1) as maxb1,max(a.b3) as maxb3
                  from inv_shop_just a 
                  inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
                  inner join inv_shop_m c on a.no_shop=c.no_shop
                  inner join karyawan e on c.nikttd2=e.nik
                  inner join karyawan f on c.nikttd1=f.nik
                  where a.no_shop ='$row->no_shop' and (a.h1 <> 0 and a.h2 <> 0 and a.h3 <> 0 and a.h4 <> 0 and a.b1 <> 0 and a.b3 <> 0)";
                  $rsmax = $dbLib->execute($sql);
                  $rowmax = $rsmax->FetchNextObject($toupper=false);
                  echo"
                  <tr>
                    <td>&nbsp;</td>
                    <td style='text-align: right;'>Rate Maximal</td>
                    <td style='text-align: center;'>".number_format($rowmax->maxh1,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmax->maxh2,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmax->maxh3,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmax->maxh4,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmax->maxb1,2,",",".")."%</td>
                    <td style='text-align: center;'>".number_format($rowmax->maxb3,2,",",".")."%</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan='14' class='ttd' style='height:40px'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan='5' class='ttd' style='text-align:center;font-weight:bold'>Mengetahui/Menyetujui</td>
                    <td colspan='5' class='ttd'>&nbsp;</td>
                    <td colspan='5' class='ttd' style='text-align:center;font-weight:bold'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,0,4).substr($row->tanggal,5,2))."</td>
                  </tr>
                  <tr>
                    <td colspan='5' class='ttd' style='text-align:center;font-weight:bold;height:80px'>&nbsp;</td>
                    <td colspan='5' class='ttd' style='text-align:center;font-weight:bold;height:80px'>&nbsp;</td>
                    <td colspan='5' class='ttd' style='text-align:center;font-weight:bold;height:80px'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan='5' class='ttd' style='text-align:center;'><u>$row->manajer</u></td>
                    <td colspan='5' class='ttd'>&nbsp;</td>
                    <td colspan='5' class='ttd' style='text-align:center;'><u>$row->officer</u></td>
                  </tr>
                  <tr>
                    <td colspan='5' class='ttd' style='text-align:center;'>$row->jab2</td>
                    <td colspan='5' class='ttd'>&nbsp;</td>
                    <td colspan='5' class='ttd' style='text-align:center;'>$row->jab1</td>
                  </tr>
                </tbody>
            </table>
            <br>";
       
        echo "</div>";
        }
		return "";
		
	}
	
}
?>
