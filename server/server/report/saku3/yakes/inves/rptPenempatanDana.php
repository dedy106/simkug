<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptPenempatanDana extends server_report_basic
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
        $sql="select * from inv_shop_m a
        $this->filter ";
        // echo $sql;
                
        $rs = $dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        //$i=1;
        while ($row = $rs->FetchNextObject($toupper=false))
		{
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' >
                <style>
                    td{
                        border:1px solid black;
                        padding:0px 4px
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='15' style='font-size:14px;'>KOMPOSISI PENEMPATAN DANA JAMKESPEN DAN DANA SANTUNAN KEMATIAN</th>
                    </tr>
                    <tr>
                        <th colspan='15' style='font-size:14px;'>PADA DEPOSITO</th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='' colspan='15'><span style='font-size: 14px;'>Per </span>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='16'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align:center' rowspan=''>No</td>
                        <td style='text-align:center' rowspan=''>Nama Bank</td>
                        <td style='text-align:center' rowspan=''>Kategori Bank</td>
                        <td style='text-align:center' colspan='3'>Nominal Deposito Eksiting (Rp)</td>
                        <td style='text-align:center' rowspan=''>&nbsp;</td>
                        <td style='text-align:center' colspan='8'>Perkiraan Mutasi Deposito Tgl ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode($periode)." (Pagi)</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>DOC</td>
                        <td style='border-top: medium none; text-align:center'>Berjangka</td>
                        <td style='border-top: medium none; text-align:center'>Jumlah</td>
                        <td style='border-top: medium none; text-align:center'>Komposisi</td>
                        <td style='border-top: medium none; text-align:center' colspan='2'>Nominal Jatuh Tempo (Rp)</td>
                        <td style='border-top: medium none; text-align:center' colspan='2'>Rencana Pencairan (Rp)</td>
                        <td style='border-top: medium none; text-align:center' colspan='2'>Perpanjangan (Rp)</td>
                        <td style='border-top: medium none; text-align:center' colspan='2'>Rencana Penempatan Baru (Rp)</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>&nbsp;</td>
                        <td style='border-top: medium none; text-align:center'>DOC</td>
                        <td style='border-top: medium none; text-align:center'>Berjangka</td>
                        <td style='border-top: medium none; text-align:center'>DOC</td>
                        <td style='border-top: medium none; text-align:center'>Berjangka</td>
                        <td style='border-top: medium none; text-align:center'>DOC</td>
                        <td style='border-top: medium none; text-align:center'>Berjangka</td>
                        <td style='border-top: medium none; text-align:center'>DOC</td>
                        <td style='border-top: medium none; text-align:center'>Berjangka</td>
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
                        <td style=' border-top: medium none;text-align:center'>15</td>
                    </tr>
                ";
                    $sql = "select b.nama as bank,b.jenis,a.doc_eks,depo_eks,a.doc_eks+depo_eks as jum_eks,

                    ( (a.doc_eks+depo_eks) / (sum(a.doc_eks+depo_eks) over ()) * 100) as komposisi
                    
                    ,a.doc_jth,a.depo_jth
                    ,a.doc_cair,a.depo_cair
                    ,a.doc_pjg,a.depo_pjg
                    ,a.doc_baru,a.depo_baru
                    
                    from 
                    inv_shop_just a inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
                    where a.no_shop = '$row->no_shop'
                    order by b.nu ";
                    $rs1=$dbLib->execute($sql);
                    $no=1;$doc_eks=0;$depo_eks=0;$jum_eks=0;$komposisi=0;$doc_jth=0;$depo_jth=0;$doc_cair=0;$depo_cair=0;$doc_pjg=0;$depo_pjg=0;$doc_baru=0;$depo_baru=0;
                    while($row1=$rs1->FetchNextObject($toupper=false)){
                        $doc_eks+=$row1->doc_eks;
                        $depo_eks+=$row1->depo_eks;
                        $jum_eks+=$row1->jum_eks;
                        $komposisi+=$row1->komposisi;
                        $doc_jth+=$row1->doc_jth;
                        $depo_jth+=$row1->depo_jth;
                        $doc_cair+=$row1->doc_cair;
                        $depo_cair+=$row1->depo_cair;
                        $doc_pjg+=$row1->doc_pjg;
                        $depo_pjg+=$row1->depo_pjg;
                        $doc_baru+=$row1->doc_baru;
                        $depo_baru+=$row1->depo_baru;
                    echo "
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style=' border-top: medium none;text-align:left'>$row1->bank</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->jenis</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->doc_eks,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->depo_eks,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->jum_eks,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:center'>".number_format($row1->komposisi,2,",",".")."%</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->doc_jth,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->depo_jth,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->doc_cair,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->depo_cair,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->doc_pjg,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->depo_pjg,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->doc_baru,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->depo_baru,0,",",".")."</td>
                    </tr>
                    ";
                    $no++;
                    }
                    echo"
                   <tr>
                        <td>&nbsp;</td>
                        <td style='text-align: right; font-weight: bold;'>Total</td>
                        <td>&nbsp;</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($doc_eks,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($depo_eks,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($jum_eks,0,",",".")."</td>
                        <td style='text-align: center; font-weight: bold;'>".number_format($komposisi,2,",",".")."%</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($doc_jth,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($depo_jth,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($doc_cair,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($depo_cair,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($doc_pjg,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($depo_pjg,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($doc_baru,0,",",".")."</td> 
                        <td style='text-align: right; font-weight: bold;'>".number_format($depo_baru,0,",",".")."</td>
                   </tr>
                   <tr>
                        <td colspan='15' style='border:none'>&nbsp;</td>
                   </tr>
                   <tr>
                        <td colspan='7' style='border:none;padding:0;'>
                        <table style='border-collapse: collapse;margin:0' cellspacing='2' cellpadding='1' >
                                    <style>
                                    td{
                                    border:1px solid black;
                                    padding:0px 4px
                                    }
                                </style>
                                <tbody>
                                <tr>
                                    <td style='text-align:center' rowspan=''>No</td>
                                    <td style='text-align:center' rowspan=''>Nama Bank</td>
                                    <td style='text-align:center' rowspan=''>Kategori Bank</td>
                                    <td style='text-align:center; width: 150px;' rowspan=''>Rencana Nominal Deposito Setelah Mutasi (Rp)</td>
                                    <td style='text-align:center' rowspan=''>&nbsp;</td>
                                    <td style='text-align:center' rowspan=''>&nbsp;</td>
                                    <td style='text-align:center' rowspan=''>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style='text-align:center' rowspan=''>&nbsp;</td>
                                    <td style='text-align:center' rowspan=''>&nbsp;</td>
                                    <td style='text-align:center' rowspan=''>&nbsp;</td>
                                    <td style='text-align:center' rowspan=''>DOC</td>
                                    <td style='text-align:center' rowspan=''>Berjangka</td>
                                    <td style='text-align:center' rowspan=''>Jumlah</td>
                                    <td style='text-align:center' rowspan=''>Komposisi</td>
                                </tr>
                                <tr>
                                    <td style='text-align:center' rowspan=''>1</td>
                                    <td style='text-align:center' rowspan=''>2</td>
                                    <td style='text-align:center' rowspan=''>3</td>
                                    <td style='text-align:center' rowspan=''>4</td>
                                    <td style='text-align:center' rowspan=''>5</td>
                                    <td style='text-align:center' rowspan=''>6</td>
                                    <td style='text-align:center' rowspan=''>7</td>
                                </tr>";
                                // $sql="select b.nama as bank,b.jenis,
                                // a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru as doc,
                                // depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru as depo,
                                // (a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru) as jum,
                                
                                // ( ((a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru)) / 
                                // (sum((a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru)) over ()) * 100) as komposisi
                                
                                
                                // from 
                                // inv_shop_just a inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
                                // where a.no_shop = '$row->no_shop'
                                // order by b.nu";
                                $sql = "select b.nama as bank,b.jenis,
                                a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru as doc,
                                depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru as depo,
                                (a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru) as jum,
                                
                                ( ((a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru)) / 
                                (sum((a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru)) over ()) * 100) as komposisi
                                
                                
                                from 
                                inv_shop_just a inner join (
                                
                                select kode_bankklp, nama, jenis, nu 
                                from  inv_bankklp 
                                where flag_aktif='1' 
                                union 
                                select kode_kelola, nama, 'DISCRETIONARY', 5 as nu 
                                from  inv_kelola
                                where flag_aktif='1'
                                union 
                                select kode_rd, nama, 'MONEY MARKET', 6 as nu 
                                from  inv_rd
                                where flag_aktif='1'
                                
                                ) b on a.kode_bankklp=b.kode_bankklp 
                                where a.no_shop = '$row->no_shop' 
                                order by b.nu ";
                                $rs2=$dbLib->execute($sql);
                                $no2=1;$doc=0;$depo=0;$jum=0;$komposisi=0;
                                while($row2=$rs2->FetchNextObject($toupper=false)){
                                    $doc+=$row2->doc;
                                    $depo+=$row2->depo;
                                    $jum+=$row2->jum;
                                    $komposisi+=$row2->komposisi;
                                echo"
                                <tr>
                                    <td style=' border-top: medium none;text-align:center'>$no2</td>
                                    <td style=' border-top: medium none;text-align:left'>$row2->bank</td>
                                    <td style=' border-top: medium none;text-align:center'>".strtoupper($row2->jenis)."</td>
                                    <td style=' border-top: medium none;text-align:right'>".number_format($row2->doc,0,",",".")."</td>
                                    <td style=' border-top: medium none;text-align:right'>".number_format($row2->depo,0,",",".")."</td>
                                    <td style=' border-top: medium none;text-align:right'>".number_format($row2->jum,0,",",".")."</td>
                                    <td style=' border-top: medium none;text-align:center'>".number_format($row2->komposisi,2,",",".")."%</td>
                                </tr>";
                                $no2++;
                                }
                                echo"
                                <tr>
                                    <td>&nbsp;</td>
                                    <td style='text-align: right; font-weight: bold;'>Total</td>
                                    <td>&nbsp;</td>
                                    <td style='text-align: right; font-weight: bold;'>".number_format($doc,0,",",".")."</td>
                                    <td style='text-align: right; font-weight: bold;'>".number_format($depo,0,",",".")."</td>
                                    <td style='text-align: right; font-weight: bold;'>".number_format($jum,0,",",".")."</td>
                                    <td style='text-align: center; font-weight: bold;'>".number_format($komposisi,2,",",".")."%</td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        <td colspan='8' style='border:none;padding:0;vertical-align:top'>
                            <table style='border-collapse: collapse;margin-left:40px' cellspacing='2' cellpadding='1' >
                                <style>
                                    td{
                                        border:1px solid black;
                                        padding:0px 4px
                                    }
                                    .ttd{
                                        border:0;
                                        padding:0px 4px;
                                    }
                                </style>
                                <thead>
                                    <tr>
                                        <th  colspan='3' style='font-size:14px; text-align: left;'>KOMPOSISI BERDASARKAN KATEGORI BANK</th>
                                    </tr>
                                    <tr style=''>
                                        <th style='' colspan='16'>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style='text-align:center;width:30%' rowspan='2' colspan='2' >Kategori Bank</td>
                                        <td style='text-align:center;width:30%' colspan='2'>Komposisi</td>
                                    </tr>
                                    <tr>
                                        <td style='border-top: medium none; text-align:center'>Awal (sblm mutasi)</td>
                                        <td style='border-top: medium none; text-align:center'>Awal (stlh mutasi)</td>
                                    </tr> ";
                                    $sql="select distinct a.jenis,a.nu,isnull(b.komp_sebelum,0) as komposisi_seb,isnull(b.komp_setelah,0) as komposisi_set
                                    from (
                                    
                                    select kode_bankklp,jenis,nu from inv_bankklp where flag_aktif ='1'
                                    union
                                    select kode_kelola,'DISCRETIONARY',5 as nu from inv_kelola where flag_aktif ='1'
                                    union
                                    select kode_rd,'MONEY MARKET',6 as nu from inv_rd where flag_aktif ='1'
                                    
                                    ) a
                                    
                                    left join (
                                            
                                            select b.jenis,
                                           sum((a.doc_eks) + (depo_eks)) as sebelum,
                                           sum((a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru)) as setelah,
                                           ( (sum((a.doc_eks) + (depo_eks))) / (sum(sum((a.doc_eks) + (depo_eks))) over ()) * 100) as komp_sebelum,
                                           
                                           ( (sum((a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru))) / 		(sum(sum((a.doc_eks-a.doc_cair+a.doc_pjg+a.doc_baru) + (depo_eks-a.depo_cair+a.depo_pjg+a.depo_baru))) over ()) * 		100) as komp_setelah
                                           
                                           from 
                                           inv_shop_just a inner join (
                                           
                                            select kode_bankklp,jenis
                                            from  inv_bankklp 
                                            where flag_aktif='1' 
                                            union 
                                            select kode_kelola,'DISCRETIONARY'
                                            from  inv_kelola
                                            where flag_aktif='1'
                                            union 
                                            select kode_rd,'MONEY MARKET'
                                            from  inv_rd
                                            where flag_aktif='1'
                                           
                                           ) b on a.kode_bankklp=b.kode_bankklp
                                           
                                           where a.no_shop = '$row->no_shop'
                                           group by b.jenis
                                           
                                           ) b on a.jenis=b.jenis
                                    order by a.nu";
                                    $rs3=$dbLib->execute($sql);
                                    // echo $rs3->recordcount();
                                    $no3=1;$kom1=0;$kom2=0;
                                    while($row3=$rs3->FetchNextObject($toupper=false)){
                                        $kom1+=$row3->komposisi_seb;
                                        $kom2+=$row3->komposisi_set;
                                        echo" 
                                        <tr>
                                            <td style=' border-top: medium none;text-align:left' colspan='2' >".strtoupper($row3->jenis)."</td>
                                            <td style=' border-top: medium none;text-align:right'>".number_format($row3->komposisi_seb,2,",",".")."%</td>
                                            <td style=' border-top: medium none;text-align:right'>".number_format($row3->komposisi_set,2,",",".")."%</td>
                                        </tr>";

                                    }
                                    echo"
                                    <tr>
                                        <td style='text-align: right; font-weight: bold;' colspan='2' >Total</td>
                                        <td style='text-align: center; font-weight: bold;'>".number_format($kom1,2,",",".")."%</td>
                                        <td style='text-align: center; font-weight: bold;'>".number_format($kom2,2,",",".")."%</td>
                                    </tr>
                                    <tr>
                                        <td style='text-align: right; font-weight: bold;height:30px' class='ttd' colspan='2' >&nbsp;</td>
                                        <td style='text-align: center; font-weight: bold;height:30px' class='ttd' colspan='2' >&nbsp;</td>
                                    </tr>";
                                    $sql="select a.tanggal,e.nama as manajer,a.jab2,f.nama as officer, a.jab1
                                    from inv_shop_m a
                                    inner join karyawan e on a.nikttd2=e.nik
                                    inner join karyawan f on a.nikttd1=f.nik
                                    
                                    where a.no_shop ='$row->no_shop'";
                                    $rs4=$dbLib->execute($sql);
                                    $row4=$rs4->FetchNextObject($toupper=false);
                                    echo"
                                    <tr>
                                        <td style='text-align: center; font-weight: bold;' colspan='2' class='ttd' >Mengetahui/Menyetujui</td>
                                        <td style='text-align: center; font-weight: bold;' colspan='2' class='ttd' >Mengusulkan</td>
                                    </tr>
                                    <tr>
                                        <td style='text-align: center; height:50px' class='ttd' colspan='2' >&nbsp;</td>
                                        <td style='text-align: center; height:50px' class='ttd' colspan='2' >&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style='text-align: center; ' colspan='2' class='ttd' ><u>$row4->manajer</u></td>
                                        <td style='text-align: center; ' colspan='2' class='ttd' ><u>$row4->officer</u></td>
                                    </tr>
                                    <tr>
                                    <td style='text-align: center; ' colspan='2' class='ttd'>$row4->jab2</td>
                                    <td style='text-align: center; ' colspan='2' class='ttd'>$row4->jab1</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                   <tr>
                </tbody>
            </table>
            <br>";
        echo "</div>";
        }
		return "";
		
	}
	
}
?>
