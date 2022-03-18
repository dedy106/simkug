<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptBeritaAcara extends server_report_basic
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
        $tahun=substr($periode,0,4);
        $bln=substr($periode,4,2);
        switch($bln){
            case "01":
            case "02":
            case "03":
            $tw = "I";
            break;
            case "04":
            case "05":
            case "06":
            $tw = "II";
            break;
            case "07":
            case "08":
            case "09":
            $tw = "III";
            break;
            case "10":
            case "11":
            case "12":
            $tw = "IV";
            break;

        }
        
        $sql="select a.no_rekon,convert(varchar,a.tanggal,105) as tanggal,a.kode_lokasi,a.keterangan,a.kode_bank,a.periode,convert(varchar,tgl_awal,103) as tgl_awal,convert(varchar,tgl_akhir,103) as tgl_akhir,a.nik_ttd1,a.jab1,a.tgl_input,a.nik_user,b.nama as nama_bank,c.nama as manager,datename(dw,tanggal) as nama_hari 
        from inv_deporekon_m a
        left join inv_bank b on a.kode_bank=b.kode_bank
        left join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi 
        $this->filter
        ";
        // echo $sql;
                
        $rs = $dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        while ($row = $rs->FetchNextObject($toupper=false))
		{
        echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='800' >
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
                        <th  colspan='10' style='font-size:14px; text-align: center;'>BERITA ACARA</th>
                    </tr>
                    <tr>
                        <th  colspan='10' style='font-size:14px; text-align: center;'>REKONSILIASI BUNGA & NOMINAL DEPOSITO/DOC</th>
                    </tr>
                    <tr>
                        <th  colspan='10' style='font-size:14px; text-align: center;'>ANTARA YAKES TELKOM DENGAN $row->nama_bank</th>
                    </tr>
                    <tr>
                        <th  colspan='10' style='font-size:14px; text-align: center;'>POSISI TRIWULAN $tw TAHUN $tahun</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='10'>&nbsp;</th>
                    </tr>
                    <tr style=''>
                        <td style='text-align:justify;border:none' colspan='10'>Pada hari ini ".$AddOnLib->ubahNamaHari($row->nama_hari).", tanggal ".$AddOnLib->terbilang_hari(substr($row->tanggal,0,2)).", bulan ".$AddOnLib->ubah_bulan(substr($row->tanggal,3,2)).", tahun ".$AddOnLib->terbilang(substr($row->tanggal,6,4),"").", ($row->tanggal) telah dilaksanakan rekonsiliasi nominal dan bunga deposito/DOC antara YAKES Telkom dengan $row->nama_bank Posisi Triwulan $tw Tahun $tahun dengan hasil sebagai berikut :</td>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='10'>&nbsp;</th>
                    </tr>
                    <tr style='text-align:justify'>
                        <th style='' colspan='10'>OUT STANDING PERIODE JUNI $tahun</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='10'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align:center' rowspan='2'>No</td>
                        <td style='text-align:center' rowspan='2'>Nominal</td>
                        <td style='text-align:center' colspan='2'>Periode Deposito</td>
                        <td style='text-align:center' rowspan='2'>Jml Hari</td>
                        <td style='text-align:center' rowspan='2'>Rate</td>
                        <td style='text-align:center' rowspan='2'>Nota Konfirmasi</td>
                        <td style='text-align:center' rowspan='2'>Piutang Bunga</td>
                        <td style='text-align:center;border:none' rowspan='2'>&nbsp;</td>
                        <td style='text-align:center;border:none' rowspan='2'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center' rowspan=''>Mulai</td>
                        <td style='border-top: medium none; text-align:center' rowspan=''>Jatuh Tempo</td>
                    </tr>
                ";
                $sql = "
                select b.nilai,convert(varchar,b.tgl_mulai,103) as tgl_mulai,convert(varchar,b.tgl_selesai,103) as tgl_selesai,
                datediff(day,b.tgl_mulai,b.tgl_selesai) as jumhari,b.p_bunga,c.noins,a.n_yakes,a.n_bank,a.selisih,a.jenis
                From inv_deporekon_d a 
                inner join inv_depo2_m b on a.no_depo=b.no_depo 
                inner join inv_shop_m c on b.no_shop=c.no_shop
                where a.no_rekon ='$row->no_rekon' and a.jenis='PIUTANG'
                order by a.jenis desc,b.tgl_mulai";

                $rs2=$dbLib->execute($sql);
                $no=1;$nom=0;$n_piu=0;
                while($row2=$rs2->FetchNextObject($toupper=false)){
                    $nom+=$row2->nilai;
                    $n_piu+=$row2->n_yakes;
                    echo "
                <tr>
                    <td style=' border-top: medium none;text-align:center'>$no</td>
                    <td style=' border-top: medium none;text-align:right'>".number_format($row2->nilai,0,",",".")."</td>
                    <td style=' border-top: medium none;text-align:center'>$row2->tgl_mulai</td>
                    <td style=' border-top: medium none;text-align:center'>$row2->tgl_selesai</td>
                    <td style=' border-top: medium none;text-align:center'>$row2->jumhari</td>
                    <td style=' border-top: medium none;text-align:center'>$row2->p_bunga%</td>
                    <td style=' border-top: medium none;text-align:center'>$row2->noins</td>
                    <td style=' border-top: medium none;text-align:right'>".number_format($row2->n_yakes,2,",",".")."</td>
                </tr>";
                    $no++;
                }
                    echo"
                  <tr>
                    <td>&nbsp;</td>
                    <td style='text-align:right; font-weight: bold;'>".number_format($nom,0,",",".")."</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style='text-align:right'>".number_format($n_piu,2,",",".")."</td>
                  </tr>

                  <tr style=''>
                    <th style='' colspan='10'>&nbsp;</th>
                  </tr>
                  <tr style=''>
                    <th style='' colspan='10'>PEMBAYARAN BUNGA SELAMA TRIWULAN $tw TAHUN $tahun</th>
                  </tr>
                  <tr style=''>
                    <th style='' colspan='10'>&nbsp;</th>
                  </tr>
                  <tr>
                        <td style='text-align:center' rowspan='2'>No</td>
                        <td style='text-align:center' rowspan='2'>Nominal</td>
                        <td style='text-align:center' colspan='2'>Periode Deposito</td>
                        <td style='text-align:center' rowspan='2'>Jml Hari</td>
                        <td style='text-align:center' rowspan='2'>Rate</td>
                        <td style='text-align:center' rowspan='2'>Nota Konfirmasi</td>
                        <td style='text-align:center;' colspan='2'>Bunga Neto</td>
                        <td style='text-align:center;' rowspan='2'>Selisih</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center' rowspan=''>Mulai</td>
                        <td style='border-top: medium none; text-align:center' rowspan=''>Jatuh Tempo</td>
                        <td style='border-top: medium none; text-align:center' rowspan=''>YAKES TELKOM</td>
                        <td style='border-top: medium none; text-align:center' rowspan=''>MANDIRI</td>
                    </tr>";
                    $sql = "
                    select b.nilai,convert(varchar,b.tgl_mulai,103) as tgl_mulai,convert(varchar,b.tgl_selesai,103) as tgl_selesai,
                    datediff(day,b.tgl_mulai,b.tgl_selesai) as jumhari,b.p_bunga,c.noins,a.n_yakes,a.n_bank,a.selisih,a.jenis
                    From inv_deporekon_d a 
                    inner join inv_depo2_m b on a.no_depo=b.no_depo 
                    inner join inv_shop_m c on b.no_shop=c.no_shop
                    where a.no_rekon ='$row->no_rekon' and a.jenis='BAST'
                    order by a.jenis desc,b.tgl_mulai";

                    $rs1=$dbLib->execute($sql);
                    $no=1;$nom=0;$n_yakes=0;$n_bank=0;
                    while($row1=$rs1->FetchNextObject($toupper=false)){
                        $nom+=$row1->nilai;
                        $n_yakes+=$row1->n_yakes;
                        $n_bank+=$row1->n_bank;
                    echo"
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>$no</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->nilai,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->tgl_mulai</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->tgl_selesai</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->jumhari</td>
                        <td style=' border-top: medium none;text-align:center'>".number_format($row1->p_bunga,2,",",".")."%</td>
                        <td style=' border-top: medium none;text-align:center'>$row1->noins</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->n_yakes,2,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->n_bank,2,",",".")."</td>
                        
                        <td style=' border-top: medium none;text-align:right'>".number_format($row1->selisih,0,",",".")."</td>
                    </tr>";
                    $no++;
                    }
                    echo"
                    <tr>
                        <td style=' border-top: medium none;text-align:center'></td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($nom,0,",",".")."</td>
                        <td style=' border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style=' border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style=' border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style=' border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style=' border-top: medium none;text-align:center'>&nbsp;</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($n_yakes,2,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>".number_format($n_bank,2,",",".")."</td>
                        <td style=' border-top: medium none;text-align:right'>&nbsp;</td>
                    </tr>
                  <tr>
                    <td colspan='10' class='ttd' style='height:20px'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan='10' class='ttd' style='text-align:justify'>Demikian Berita Acara ini dibuat sebagai bahan acua manajemen, dan apabila terdapat selisih akan ditindaklanjuti oleh masing-masing pihak serta akan dituangkan dalam rekonsiliasi berikutnya. </td>
                  </tr>
                  <tr>
                    <td colspan='10' class='ttd' style='height:40px'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan='4' class='ttd' style='text-align:center;font-weight:bold'>YAKES TELKOM</td>
                    <td colspan='2' class='ttd'>&nbsp;</td>
                    <td colspan='4' class='ttd' style='text-align:center;font-weight:bold'>$row->nama_bank</td>
                  </tr>
                  <tr>
                    <td colspan='4' class='ttd' style='text-align:center;font-weight:bold;height:80px'>&nbsp;</td>
                    <td colspan='2' class='ttd' style='text-align:center;font-weight:bold;height:80px'>&nbsp;</td>
                    <td colspan='4' class='ttd' style='text-align:center;font-weight:bold;height:80px'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan='4' class='ttd' style='text-align:center;font-weight:bold'><u>$row->manager</u></td>
                    <td colspan='2' class='ttd'>&nbsp;</td>
                    <td colspan='4' class='ttd' style='text-align:center;'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan='4' class='ttd' style='text-align:center;font-weight:bold'>$row->jab1</td>
                    <td colspan='2' class='ttd'>&nbsp;</td>
                    <td colspan='4' class='ttd' style='text-align:center;'>&nbsp;</td>
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
