<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRekapJualGab extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		error_log($sql);
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
        // $kode_lokasi=$tmp[0];
        // $nik=$tmp[1];
		// $no_app=$tmp[2];
		
		$sql="select a.kode_saham,b.nama,c.no_shmjual,c.kode_kelola
        ,a.jum_seb,round(a.h_oleh,2) as h_oleh, (a.jum_seb * a.h_oleh) as tot_oleh_seb
        ,round(a.h_buku,2) as h_buku,(a.jum_seb * a.h_buku) as tot_buku_seb
        ,c.tanggal,c.tgl_set, d.nama as broker
        ,a.jumlah,round(a.n_jual/a.jumlah,2) as h_jual,a.n_jual,a.komisi,a.vat,a.levi,a.komisi+a.vat+a.levi as biaya
        ,a.n_jual - (a.komisi+a.vat+a.levi) as hasil_net, a.pph
        ,a.n_jual - (a.komisi+a.vat+a.levi) + a.pph as total
        
        ,a.gainlos - (a.komisi+a.vat+a.levi) as gainlos
        ,round((a.gainlos - (a.komisi+a.vat+a.levi)) / (a.jumlah*a.h_oleh) * 100,4) as p_gainlos
        
        ,(a.n_jual - (a.komisi+a.vat+a.levi)) - (a.jumlah * a.h_buku) as gl_buku
        ,round(((a.n_jual - (a.komisi+a.vat+a.levi)) - (a.jumlah * a.h_buku)) / (a.jumlah * a.h_buku) * 100,4) as p_glbuku
        
        
        ,round( (a.n_jual - (a.komisi+a.vat+a.levi)) - ( (a.jumlah * a.h_oleh) + ((a.jumlah * a.h_oleh) * 0.2/100) )  ,2) as gl_trans
        ,  round(((a.n_jual - (a.komisi+a.vat+a.levi)) - ( (a.jumlah * a.h_oleh) + ((a.jumlah * a.h_oleh) * 0.2/100) )) / ( (a.jumlah * a.h_oleh) + ((a.jumlah * a.h_oleh) * 0.2/100) ) * 100,4) as p_gltrans
        
        ,isnull(a.jum_seb,0) - a.jumlah as jum_akhir
        ,round(a.h_oleh,2) as h_oleh
        ,round((isnull(a.jum_seb,0) - a.jumlah) * a.h_oleh,2) as nilai_oleh
        
        ,round(a.h_buku,2) as h_buku
        ,round((isnull(a.jum_seb,0) - a.jumlah) * a.h_buku,2) as nilai_buku
        
        
        from inv_shmjual_d a 
        inner join inv_saham b on a.kode_saham=b.kode_saham
        inner join inv_shmjual_m c on a.no_shmjual=c.no_shmjual
        inner join inv_broker d on a.kode_broker=d.kode_broker
        $this->filter
        ";
		
        $rs = $dbLib->execute($sql);
        while($row=$rs->FetchNextObject($toupper=false)){
            $data[] = (array)$row;
        }

        
		// $jum=$rs->recordcount();
        $AddOnLib=new server_util_AddOnLib();
        
        $retData = array();
        foreach ($data as $row => $columns) {
            foreach ($columns as $row2 => $column2) {
                $retData[$row2][$row] = $column2;
                if($row2 == "kode_saham" OR $row2 == "nama"){
                    ${"tr$row2"} .= "<td style='font-weight:bold' width='100px'>".$retData[$row2][$row]."</td>";
                }else if($row2 == "broker"){
                    ${"tr$row2"} .= "<td  width='100px'>".$retData[$row2][$row]."</td>";
                }else if($row2 == "tanggal" OR $row2 == "tgl_set"){
                    ${"tr$row2"} .= "<td  width='100px'>".substr($retData[$row2][$row],8,2)." ".$AddOnLib->ubah_periode(substr($retData[$row2][$row],0,4).substr($retData[$row2][$row],5,2))."</td>";
                    ${"tot$row2"} = substr($retData[$row2][$row],8,2)." ".$AddOnLib->ubah_periode(substr($retData[$row2][$row],0,4).substr($retData[$row2][$row],5,2));
                }else if($row2 == "p_gainlos" OR $row2=="p_glbuku" OR $row2=="p_gltrans"){
                    ${"tot$row2"} += $retData[$row2][$row];
                    ${"tr$row2"} .= "<td  width='100px'>".number_format($retData[$row2][$row],2,",",".")."%</td>";
                }else{
                    if($retData[$row2][$row] < 0){
                        $color= "color:red;border: 1px solid black;";
                    }else{
                        $color="color:black;border: 1px solid black;";
                    }
                    ${"tot$row2"} += $retData[$row2][$row];
                    ${"tr$row2"} .= "<td  width='100px' style='$color'>".number_format($retData[$row2][$row],2,",",".")."</td>";
                }
            }
        }

        $trkode_saham = "";
        $t3=0;$t4=0;
        for($i=0;$i<count($retData["kode_saham"]);$i++){
            $trkode_saham .= "<td style='font-weight:bold'  width='100px'>".$retData["kode_saham"][$i]."(".$retData["nama"][$i].") </td>" ;
            ${"t1".$retData["kode_saham"][$i]} = ($retData["jumlah"][$i]*$retData["h_oleh"][$i])*(0.2/100);
            ${"t2".$retData["kode_saham"][$i]} = ($retData["jumlah"][$i]*$retData["h_oleh"][$i]) + ${"t1".$retData["kode_saham"][$i]};
            $t3+=${"t1".$retData["kode_saham"][$i]};
            $t4+=${"t2".$retData["kode_saham"][$i]};
            $trtotal1 .= "<td class='nborder' style='font-weight:bold'>".number_format(${"t1".$retData["kode_saham"][$i]},2,",",".")." </td>";
            $trtotal2 .= "<td class='nborder' style='font-weight:bold'>".number_format(${"t2".$retData["kode_saham"][$i]},2,",",".")." </td>";
        }
        
        $i = 1;
        $colspan= count($data)+1;

        $toth_oleh = $tottot_oleh_seb/$totjum_seb;//total harga perolehan
        $toth_buku = $tottot_buku_seb/$totjum_seb;//total harga buku
        
        $totp_gainlos = $totgainlos / ($totjumlah * $toth_oleh); //total persen gl h_oleh
        $totp_glbuku = $totgl_buku / ($totjumlah * $toth_buku);// total persen gl h_buku

        $totp_gltrans= $totgl_trans/$t4;


		echo "<body>"; 
        echo "
        <style type='text/css' media='print'>
            @page { size: A4 landscape;}

           
        </style>
        <div align='center'>";
		// while ($row = $rs->FetchNextObject($toupper=false))
		// {
			echo "
			<style>
			td{
                padding: 3px;
			}
            .txtbold{
                font-weight:bold;
            }
            .txtboldit{
                font-weight:bold;
                font-style: italic;
                
            }
            .nborder{
                border:none;
            }

            #table-data>th,td{
                font-size:10px !important;
            }
			</style>
            <table  border='0' cellspacing='0' cellpadding='0' class='kotak'>
            <tr>
                <td style='font-size:14px;font-weight:bold'>REALISASI HASIL PENJUALAN SAHAM</td>
                <td style='font-size:11px;text-align:right'></td>
            </tr>
			<tr>
				<td colspan='11' style='padding:5px'>
                    <table border='1' style='border-collapse:collapse;' min-width='800px' cellspacing='2' cellpadding='1' id='table-data'>
                    <tbody>
                        <tr>
                            <td width='20'>1.</td>
                            <td colspan='4' min-width='300px' width='300px' class='txtbold'>Nama Saham</td>
                            $trkode_saham
                            <td  style='font-style: italic;' class='txtbold'>Total</td>
                           
                        </tr>
                        <tr >
                            <td >2.</td>
                            <td colspan='4'>Jumlah Saham yang dimiliki sebelum penjualan ini (lembar)</td>
                            $trjum_seb
                            <td style='font-style: italic;'>".number_format($totjum_seb,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >3.</td>
                            <td  colspan='4'>Harga Perolehan :</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>a.</td>
                            <td  colspan='3' style='border-left: 0px;'>Rata-rata Harga Perolehan Per Saham</td>
                            $trh_oleh
                            ";
                           
                            echo"
                            <td style='font-style: italic;'>".number_format($toth_oleh,2,",",".")."</td>
                        </tr>
                        <tr style='height: 16.5pt;'>
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>b.</td>
                            <td  colspan='3'  style='border-left: 0px;' class='txtbold'>Total Harga Perolehan</td>
                            $trtot_oleh_seb
                            
                            <td style='font-style: italic;'>".number_format($tottot_oleh_seb,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >4.</td>
                            <td colspan='4'>Nilai Buku</td>
                            <td  colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>a.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Rata-rata Nilai Buku Per Saham</td>
                            $trh_buku";                            
                            echo"
                            <td style='font-style: italic;'>".number_format($toth_buku,2,",",".")."</td>
                        </tr>
                        <tr style='height: 16.5pt;'>
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>b.</td>
                            <td  class='txtbold' colspan='3' style='border-left: 0px;'>Total Nilai Buku</td>
                            $trtot_buku_seb
                            <td style='font-style: italic;'>".number_format($tottot_buku_seb,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >5.</td>
                            <td  colspan='4'>Realiasi Penjualan Saham :</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td class='txtbold' style='border-right: 0px;'>a.</td>
                            <td class='txtbold' colspan='3'  style='border-left: 0px;'>Tanggal Transaksi</td>
                            $trtanggal
                            <td style='font-style: italic;'>$tottanggal</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td class='txtbold' style='border-right: 0px;'>b.</td>
                            <td class='txtbold' colspan='3'  style='border-left: 0px;'>Tanggal Settlement</td>
                            $trtgl_set
                            
                            <td style='font-style: italic;'>$tottgl_set</td>
                        </tr>
                        <tr>
                            <td >&nbsp;</td>
                            <td class='txtbold' style='border-right: 0px;'>c.</td>
                            <td colspan='3' width='239'  style='border-left: 0px;' class='txtbold'>Broker</td>
                            $trbroker
                            <td style='font-style: italic;'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td class='txtbold' style='border-right: 0px;'>d.</td>
                            <td class='txtbold' colspan='3'  style='border-left: 0px;'>Jumlah Saham yang Dijual (Lembar Saham)</td>
                            $trjumlah
                            <td style='font-style: italic;'>".number_format($totjumlah,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>e.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Harga Per Saham</td>
                            $trh_jual
                            <td style='font-style: italic;'>".number_format($toth_jual,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>f.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Hasil Penjualan sebelum Komisi Broker, VAT, dan Selling Tax</td>
                            $trn_jual
                            <td style='font-style: italic;'>".number_format($totn_jual,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>g.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Komisis Broker</td>
                            $trkomisi
                            <td style='font-style: italic;'>".number_format($totkomisi,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>h.</td>
                            <td colspan='3'  style='border-left: 0px;'>VAT</td>
                            $trvat
                            <td style='font-style: italic;'>".number_format($totvat,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>i.</td>
                            <td  colspan='3'  style='border-left: 0px;'>JSX Levy &amp; KPEI</td>
                            $trlevi
                            <td style='font-style: italic;'>".number_format($totlevi,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>j.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Selling Tax</td>
                            <td colspan='$colspan'>0</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>k.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Jumlah Komisi Broker, VAT, dan Selling Tax</td>
                            $trbiaya
                            <td style='font-style: italic;'>".number_format($totbiaya,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td class='txtbold' style='border-right: 0px;'>l.</td>
                            <td class='txtbold' style='border-left: 0px;' colspan='3'>Hasil Penjualan (Net)</td>
                            $trhasil_net
                            <td style='font-style: italic;'>".number_format($tothasil_net,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;' class='txtbold'>m.</td>
                            <td class='txtbold'  style='border-left: 0px;' colspan='3'>PPh Pasal 23 atas Komisi Broker</td>
                            $trpph
                            <td style='font-style: italic;'>".number_format($totpph,2,",",".")."</td>
                        </tr>
                        <tr style='height: 16.5pt;'>
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;' class='txtbold'>n.</td>
                            <td class='txtbold'  style='border-left: 0px;' colspan='3'>Hasil Penjualan Net + PPh Pasal 23 atas Komisi Broker</td>
                            $trtotal
                            <td style='font-style: italic;'>".number_format($tottotal,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >6.</td>
                            <td  colspan='4'>Gain (Loss) Penjualan Saham (Net) :</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>a.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Dari Harga Perolehan</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' class='txtbold'>1)</td>
                            <td class='txtbold'  style='border-left: 0px;' colspan='2'>Jumlah Gain (Loss) seluruh saham yang dijual</td>
                            $trgainlos
                            <td style='font-style: italic;'>".number_format($totgainlos,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' >2)</td>
                            <td  colspan='2'  style='border-left: 0px;'>&nbsp;% Gain (Loss)</td>
                            $trp_gainlos";
                            echo"
                            <td style='font-style: italic;'>".number_format($totp_gainlos,2,",",".")."%</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>b.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Dari Nilai Buku</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' class='txtbold'>1)</td>
                            <td class='txtbold'  style='border-left: 0px;' colspan='2'>Jumlah Gain (Loss) seluruh saham yang dijual</td>
                            $trgl_buku
                            <td style='font-style: italic;'>".number_format($totgl_buku,2,",",".")."</td>
                        </tr>
                        <tr style='height: 11.25pt;'>
                            <td style='height: 11.25pt; border-top: none;'>&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' >2)</td>
                            <td  colspan='2'  style='border-left: 0px;'>&nbsp;% Gain (Loss)</td>
                            $trp_glbuku";
                            echo"
                            <td style='font-style: italic;'>".number_format($totp_glbuku,2,",",".")."%</td>
                        </tr>
                        <tr style='height: 12.75pt;'>
                            <td style='height: 12.75pt; border-top: none;'>&nbsp;</td>
                            <td style='border-right: 0px;'>c.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Gain Loss dari Harga Perolehan + Transaction Cost</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr style='height: 11.25pt;'>
                            <td style='height: 11.25pt; border-top: none;'>&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' class='txtbold'>1)</td>
                            <td class='txtbold'  style='border-left: 0px;' colspan='2'>Jumlah Gain (Loss) seluruh saham yang dijual</td>
                            $trgl_trans
                            <td style='font-style: italic;'>".number_format($totgl_trans,2,",",".")."</td>
                        </tr>
                        <tr style='height: 12.75pt;'>
                            <td style='height: 12.75pt; border-top: none;'>&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' >2)</td>
                            <td  colspan='2'  style='border-left: 0px;'>&nbsp;% Gain (Loss)</td>
                            $trp_gltrans
                            <td style='font-style: italic;'>".number_format($totp_gltrans,2,",",".")."%</td>
                        </tr>
                        <tr >
                            <td >7.</td>
                            <td  colspan='4'>Sisa Saham yang dimiliki setelah Penjualan ini :</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;' class='txtbold'>a.</td>
                            <td class='txtbold'  style='border-left: 0px;' colspan='3'>Jumlah Saham (lembar Saham)</td>
                            $trjum_akhir
                            <td style='font-style: italic;'>".number_format($totjum_akhir,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;' >b.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Berdasarkan Harga Perolehan Saham :</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px'>1)</td>
                            <td  colspan='2'  style='border-left: 0px;'>&nbsp;Harga Rata-rata Per Saham</td>
                            $trh_oleh
                            <td style='font-style: italic;'>".number_format($toth_oleh,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' class='txtbold'>2)</td>
                            <td  class='txtbold'  style='border-left: 0px;' colspan='2'>&nbsp;Saldo Total Harga Perolehan</td>
                            $trnilai_oleh
                            <td style='font-style: italic;'>".number_format($totnilai_oleh,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;' >c.</td>
                            <td  colspan='3'  style='border-left: 0px;'>Berdasarkan Nilai Buku Saham :</td>
                            <td colspan='$colspan'>&nbsp;</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;'>&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' >1)</td>
                            <td  colspan='2'  style='border-left: 0px;'>&nbsp;Harga Rata-rata Per Saham</td>
                            $trh_buku
                            <td style='font-style: italic;'>".number_format($toth_buku,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td >&nbsp;</td>
                            <td style='border-right: 0px;' >&nbsp;</td>
                            <td style='border-right: 0px;border-left:0px' class='txtbold'>2)</td>
                            <td class='txtbold'  style='border-left: 0px;' colspan='2'>&nbsp;Saldo Total Nilai Buku</td>
                            $trnilai_buku
                            <td style='font-style: italic;'>".number_format($totnilai_buku,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td width='20' class='nborder'>&nbsp;</td>
                            <td colspan='4' width='300px' class='txtbold nborder'>&nbsp;</td>
                            $trtotal1
                            <td class='nborder' style='font-style: italic;'>".number_format($t3,2,",",".")."</td>
                        </tr>
                        <tr >
                            <td width='20' class='nborder'>&nbsp;</td>
                            <td colspan='4' width='300px' class='txtbold nborder'>&nbsp;</td>
                            $trtotal2
                            <td class='nborder' style='font-style: italic;'>".number_format($t4,2,",",".")."</td>
                        </tr>
                    </tbody>
                </table>
				</td>
			</tr>
  			</table><br>";
			
			$i=$i+1;
		// }
		echo"</div></body>";
		
		return "";
	}
	
}
?>
