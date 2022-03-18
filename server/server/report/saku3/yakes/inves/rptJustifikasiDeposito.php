<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptJustifikasiDeposito extends server_report_basic
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
        
        $sql2="select a.no_shop,
        e.nama as kabid,a.jab3,f.nama as manajer,a.jab2,a.catatan,convert(varchar,a.tanggal,103) as tgl2
        from inv_shop_m a
        left join karyawan e on a.nikttd3=e.nik
        left join karyawan f on a.nikttd2=f.nik
        $this->filter";
        // echo $sql2;
                
        $rs = $dbLib->execute($sql2);

		$AddOnLib=new server_util_AddOnLib();	
        // $i=1;
        while ($row = $rs->FetchNextObject($toupper=false))
		{
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
                        <th  colspan='16' style='font-size:14px;'>JUSTIFIKASI PENEMPATAN/PENCAIRAN DEPOSITO JATUH TEMPO</th>
                    </tr>
                    <!--<tr style='height: 12.0pt;'>
                        <th style='' colspan='16'><span>Per </span>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>-->
                    <tr style=''>
                        <th style='' colspan='16'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align:center' rowspan='3'>No</td>
                        <td style='text-align:center' rowspan='3'>Jenis Dana</td>
                        <td style='text-align:center' rowspan='3'>Nama Bank</td>
                        <td style='text-align:center' colspan='2'>Deposito Jatuh Tempo</td>
                        <td style='text-align:center; width: 50px;' rowspan='3'>Rate Tawaran Bank</td>
                        <td style='text-align:center; width: 50px;' rowspan='3'>Maks.Tingkat Rate LPS 1 bln</td>
                        <td style='text-align:center' colspan='8'>Usulan</td>
                        <td style='text-align:center' rowspan='3'>Keterangan</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Tanggal</td>
                        <td style='border-top: medium none; text-align:center' rowspan='2'>Dicairkan (Rp)</td>
                        <td style='border-top: medium none; text-align:center; width: 50px;' rowspan='2'>Tambahan/Ditempatkan Kembali</td>
                        <td style='border-top: medium none; text-align:center' colspan='6'>Dana yang didepositokan di Bank ini</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center'>Jumlah (Rp)</td>
                        <td style='border-top: medium none; text-align:center'>Mulai Tgl</td>
                        <td style='border-top: medium none; text-align:center'>S.d Tgl</td>
                        <td style='border-top: medium none; text-align:center'>Durasi (bulan)</td>
                        <td style='border-top: medium none; text-align:center'>Durasi (Hari)</td>
                        <td style='border-top: medium none; text-align:center'>Rate</td>
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
                        <td style=' border-top: medium none;text-align:center'>16</td>
                    </tr>
                ";
                $catt=array();
                $i=0;
                $sql2="select 
                c.nama as jenis_dana, d.nama as bank,0 as jum,'-' as tgl,b.p_bunga as rate,7 as lps,0 as cair,b.nilai as tambah,b.nilai as usul,
                convert(varchar,b.tgl_mulai,103) as tgl_mulai,convert(varchar,b.tgl_selesai,103) as tgl_selesai,datediff(month,b.tgl_mulai,b.tgl_selesai) as bulan,datediff(day,b.tgl_mulai,b.tgl_selesai) as hari,
                e.nama as kabid,a.jab3,f.nama as manajer,a.jab2,a.catatan,convert(varchar,a.tanggal,103) as tgl2
                from inv_shop_m a
                inner join inv_depo2_m b on a.no_shop=b.no_shop
                inner join inv_plan c on a.kode_plan=c.kode_plan
                inner join inv_bank d on b.bdepo=d.kode_bank
                inner join karyawan e on a.nikttd3=e.nik
                inner join karyawan f on a.nikttd2=f.nik
                where a.no_shop='$row->no_shop' ";

                // echo $sql2;
                $rs1=$dbLib->execute($sql2);
                $cair=0;$tambah=0;$usul=0;$no=1;
                while ($row1 = $rs1->FetchNextObject($toupper=false))
		        {
                    $cair+=$row1->cair;
                    $tambah+=$row1->tambah;
                    $usul+=$row1->usul;
                    echo "
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->jenis_dana</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->bank</td>
                        <td style=' border-top: medium none;text-align:right'>$row1->jum</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->tgl</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->rate%</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->lps%</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->cair,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->tambah,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->usul,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->tgl_mulai</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->tgl_selesai</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->bulan</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->hari</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->rate%</td> 
                        <td style=' border-top: medium none;text-align:center'>&nbsp;</td> 
                    </tr>
                    ";
                    $no++;
                    // array_push($catt,$row1->catatan);
                }

                    echo"
                    <tr>
                        <td>&nbsp;</td>
                        <td style='text-align: center; font-weight: bold;'>Jumlah</td>
                        <td>&nbsp;</td>
                        <td style='text-align: right; font-weight: bold;'>-</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($cair,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($tambah,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'>".number_format($usul,0,",",".")."</td>
                        <td style='text-align: right; font-weight: bold;'></td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
                <tfoot>
                    <style>
                        .ctt{
                            border:none;
                            padding:0;
                        }
                    </style>
                    <tr>
                        <td colspan='16' class='ctt'>Catatan :</td>
                    </tr>
                    <tr>
                        <td colspan='16' class='ctt'>&nbsp;</td>
                    </tr>";
                    // $y=1;
                    // for($x=0;$x<count($catt);$x++){
                    echo"
                    <tr>
                        <td class='ctt'></td>
                        <td class='ctt' colspan='15'>".urldecode($row->catatan)."</td>
                    </tr>";
                    // $y++;
                    // }
                    echo"                   
                    <tr>
                        <td class='ctt' colspan='6' height='20px'>&nbsp;</td>
                        <td class='ctt' colspan='4' height='20px'>&nbsp;</td>
                        <td class='ctt' colspan='6' height='20px'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class='ctt' colspan='6' style='text-align:center'>&nbsp;</td>
                        <td class='ctt' colspan='4' style='text-align:center'>&nbsp;</td>
                        <td class='ctt' colspan='6' style='text-align:center'>Bandung, ".substr($row->tgl2,0,2)." ".$AddOnLib->ubah_bulan(substr($row->tgl2,3,2))." ".substr($row->tgl2,6,4)."</td>
                    </tr>
                    <tr>
                        <td class='ctt' colspan='6' style='text-align:center'>Mengetahui/Menyetujui</td>
                        <td class='ctt' colspan='4' style='text-align:center'>&nbsp;</td>
                        <td class='ctt' colspan='6' style='text-align:center'>Mengusulkan</td>
                    </tr>
                    <tr>
                        <td class='ctt' colspan='6' height='40px'>&nbsp;</td>
                        <td class='ctt' colspan='4' height='40px'>&nbsp;</td>
                        <td class='ctt' colspan='6' height='40px'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class='ctt' colspan='6' style='text-align:center;font-weight:bold'><u>$row->kabid</u></td>
                        <td class='ctt' colspan='4' style='text-align:center;font-weight:bold'>&nbsp;</td>
                        <td class='ctt' colspan='6' style='text-align:center;font-weight:bold'><u>$row->manajer</u></td>
                    </tr>
                    <tr>
                        <td class='ctt' colspan='6' style='text-align:center;'>$row->jab3</td>
                        <td class='ctt' colspan='4' style='text-align:center;font-weight:bold'>&nbsp;</td>
                        <td class='ctt' colspan='6' style='text-align:center;'>$row->jab2</td>
                    </tr>
                </tfoot>
            </table>
            <br>";
       
        echo "</div>";
        }
		return "";
		
	}
	
}
?>
