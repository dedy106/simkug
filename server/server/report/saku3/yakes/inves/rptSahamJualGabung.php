<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptSahamJualGabung extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$sql="select a.kode_lokasi,a.no_shmjual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola,a.jab1,a.nik_ttd1,c.nama as nama_ttd1,e.nama,e.pic,e.up,e.nama_rek,e.no_rek,e.bank, a.jab2,a.nik_ttd2,d.nama as nama_ttd2,e.alamat,a.kode_setl,f.nama as jenis_setl,a.kode_bank,g.nama as nama_bank,g.nama_rek as nama_rek_bank,g.alamat as alamat_bank,g.no_rek as no_rek_bank
		from inv_shmjual_m a
		inner join inv_kelola b on a.kode_kelola=b.kode_kelola
		left join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi
		left join karyawan d on a.nik_ttd2=d.nik and a.kode_lokasi=d.kode_lokasi
		left join inv_kustodi e on a.kode_kustodi=e.kode_kustodi
        left join inv_jenis_setl f on a.kode_setl =f.kode_setl
        left join inv_bank g on a.kode_bank=g.kode_bank
		$this->filter order by a.no_shmjual";
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
        $AddOnLib=new server_util_AddOnLib();	
	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<div class='row'>
					<div class='col-md-12'><h3>PENJUALAN SAHAM BURSA</h3></div>
				  </div>
                  <table border=0 id='table-header'>
                  <tr>
                      <td width='150px'>TANGGAL TRANSAKSI</td>
                      <td width='10px'>:</td>
                      <td width='100px'>&nbsp;$row->tanggal</td>
                  </tr>
                  <tr>
                      <td>TANGGAL SETTLEMENT</td>
                      <td>:</td>
                      <td>&nbsp;$row->tgl_set</td>
                  </tr>
                 </table>
				  <div class='row'>
				  <div class='col-md-12 text-right' style='font-size:11px;padding-right:30px'>$row->no_shmjual/$row->nama_kelola</div>
				  </div>
				  <table class='table table-hover' id='table-header2'>
					<thead>
					  <tr>
						<th>No</th>
						<th>Nama Saham</th>
						<th>Jumlah Saham</th>
						<th>Harga Per Saham (Rp)</th>
						<th>Jumlah Harga + Biaya Transaksi (Rp)</th>
						<th>Jumlah Pembayaran - Biaya Transaksi (Rp)</th>
						<th>Broker</th>
					  </tr>
					</thead>
					<tbody>";
					 $sql1="select a.kode_saham,a.kode_broker,b.nama as nama_saham,d.nama as nama_broker,d.nama as nama_saham,
                        a.komisi,a.vat,a.levi,a.pph,a.h_oleh,a.h_jual,a.jumlah,a.n_jual,a.n_jual+a.komisi+a.vat+a.levi as jual,
                        a.n_jual-a.komisi+a.vat+a.levi as bayar
                    from inv_shmjual_d a
                    inner join inv_saham b on a.kode_saham=b.kode_saham
                    inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola
                    inner join inv_broker d on a.kode_broker=d.kode_broker
                    where a.no_shmjual='$row->no_shmjual' 
                    order by a.kode_saham ";
					
					$rs1 = $dbLib->execute($sql1);
					$i=0;
					$jml_saham=0;$h_jual=0;$komisi=0;$pph=0;$levi=0;$jumlah=0;$gainlos=0;
					while ($row1 = $rs1->FetchNextObject($toupper=false))
					{
						$jumlah+=$row1->jumlah;
						$h_jual+=$row1->h_jual;
						$jual+=$row1->jual;
						$bayar+=$row1->bayar;
						
						$i=$i+1;
						
					  echo "<tr>
						<td>$i</td>
						<td>$row1->kode_saham ($row1->nama_saham)</td>
						<td align='right'>".number_format($row1->jumlah,0,",",".")."</td>
						<td align='right'>".number_format($row1->h_jual,2,",",".")."</td>
						<td align='right'>".number_format($row1->jual,0,",",".")."</td>
						<td align='right'>".number_format($row1->bayar,0,",",".")."</td>
						<td>$row1->nama_broker</td>
					  </tr>";
					}
					echo "</tbody>
				  </table>
                  ";
                  
            echo "
                  <DIV style='page-break-after:always'></DIV>
                  <div align='center' >
                    <style>
                    .tdborder{
                        border: 1px solid black;
                        padding:3px;
                    }
                    .tdpad{
                        padding: 3px;
                    }
                    </style>
                <table  border='0' cellspacing='0' cellpadding='0' class='kotak' id='table-header3'>
                    <td colspan='10' style='padding:5px'>
                    <table width='622' border='0' cellspacing='2' cellpadding='1' style='border-collapse: collapse;' id='table-data2'>
                    <tr>
                        <td colspan='8' class='tdpad' style='font-weight:bold;font-size:20px;text-align:right'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td width='110' colspan='3' class='tdpad'>&nbsp;</td>
                        <td width='496' colspan='5' class='tdpad'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td width='110' colspan='3' class='tdpad'>&nbsp;</td>
                        <td width='496' colspan='5' class='tdpad'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan='3' class='tdpad'>&nbsp;</td>
                        <td width='496' colspan='5' class='tdpad'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td width='110' colspan='2' class='tdpad'>Nomor</td>
                        <td width='496' colspan='5' class='tdpad'>:&nbsp; /KU000/YAKES-30/2019</td>
                    </tr>
                    <tr>
                        <td colspan='7' class='tdpad'>Bandung, ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</td>
                    </tr>
                    <tr>
                        <td colspan='7' class='tdpad'>Kepada Yth, </td>
                    </tr>
                    <tr>
                        <td colspan='7' class='tdpad'><b>$row->pic $row->up</b></td>
                    </tr>
                    <tr>
                        <td  colspan='7' class='tdpad'>$row->alamat
                        </td>
                    </tr>
                    <tr>
                        <td colspan='7' class='tdpad'>
                        <b>Perihal : Penyerahan Saham</b>				
                        </td>
                    </tr>
                    <tr>
                        <td colspan='7' class='tdpad' style='font-size: 3px;'>
                        &nbsp;			
                        </td>
                    </tr>
                    <tr>
                        <td colspan='7' class='tdpad'>
                        Dengan hormat, 		
                        </td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='7' style='font-size: 3px;'>
                        &nbsp;			
                        </td>
                    </tr>
                    <tr>
                        <td colspan='7' class='tdpad' style='text-align: justify;'>
                        Sehubungan penjualan saham milik Yayasan Kesehatan Pegawai TELKOM (YAKES-TELKOM), dengan ini kami instruksikan agar $row->pic melaksanakan penyerahan/ pelepasan saham dari Rekening Efek  Nomor : 104291, atas nama YAKES TELKOM, pada $row->pic, dengan kondisi dan ketentuan sebagai berikut :			
                        </td>
                    </tr>
                    <tr>
                        <td class='tdpad'>1.</td>
                        <td class='tdpad' colspan='3'>Tipe <i>Settlement</i></td>
                        <td class='tdpad' colspan='3'>:&nbsp;<b>$row->jenis_setl</b></td>
                    </tr>
                    <tr>
                        <td class='tdpad'>2.</td>
                        <td class='tdpad' colspan='3'>Tanggal Transaksi</td>
                        <td class='tdpad' colspan='3'>:&nbsp;<b>".substr($row->tanggal,0,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</b></td>
                    </tr>
                    <tr>
                        <td class='tdpad'>3.</td>
                        <td class='tdpad' colspan='3'>Tanggal <i>Settlement</i></td>
                        <td class='tdpad' colspan='3'>:&nbsp;<b>".substr($row->tgl_set,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_set,6,4).substr($row->tgl_set,3,2))."</b></td>
                    </tr>
                    <tr>
                        <td class='tdpad'>4.</td>
                        <td class='tdpad' colspan='6'>Rincian Saham dan Nominal Pembayaran :</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <th class='tdborder'>Nama Saham</th>
                        <th class='tdborder'>Scriptless (Saham)</th>
                        <th class='tdborder'>Nominal Hasil Penjualan(Rp)</th>
                        <th class='tdborder'>PPh Ps 23 Komisi Broker(Rp)</th>
                        <th class='tdborder'>Nominal Hasil Penjualan + PPh Ps 23 Komisi Broker (Rp)
                        </th>
                        <th class='tdborder'>Broker</th>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <th class='tdborder'></i>a</i></th>
                        <th class='tdborder'></i>b</i></th>
                        <th class='tdborder'></i>c</i></th>
                        <th class='tdborder'></i>d</i></th>
                        <th class='tdborder'></i>e=(c+d)</i></th>
                        <th class='tdborder'></i>f</i></th>
                    </tr>";
                    $sql2 = "select a.kode_saham,a.kode_broker,d.nama as nama_broker,a.jumlah,
                    a.n_jual-a.komisi-a.vat-a.levi as jual,a.pph,c.nama as nama_saham,
                    a.n_jual-a.komisi-a.vat-a.levi+a.pph as bayar
                    from inv_shmjual_d a
                    inner join inv_broker d on a.kode_broker=d.kode_broker
                    left join inv_saham c on a.kode_saham=c.kode_saham
                    where a.no_shmjual='$row->no_shmjual' 
                    ";
                    $rs2= $dbLib->execute($sql2);
                    $jual=0;$pph=0;$bayar=0;
                    while($row2=$rs2->FetchNextObject($toupper=false)){
                        $jual+=$row2->jual;
                        $pph+=$row2->pph;
                        $bayar+=$row2->bayar;
                    echo"
                    <tr>
                        <td>&nbsp;</td>
                        <td class='tdborder'>$row2->kode_saham ($row2->nama_saham)			
                        </td>
                        <td class='tdborder' style='text-align:right'>".number_format($row2->jumlah,0,",",".")."</td>
                        <td class='tdborder' style='text-align:right'>".number_format($row2->jual,0,",",".")."</td>
                        <td class='tdborder' style='text-align:right'>".number_format($row2->pph,0,",",".")."</td>
                        <td class='tdborder' style='text-align:right'>".number_format($row2->bayar,0,",",".")."</td>
                        <td class='tdborder'>$row2->nama_broker</td>
                    </tr>";
                    }
                    echo"
                    <tr>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdborder' colspan='4'><b><i>Nominal Hasil Penjualan + PPh Ps 23 Komisi Broker(Rp)</i></b></td>
                        <td class='tdborder' style='text-align:right'><b><i>".number_format($bayar,0,",",".")."</i></b></td>
                        <td class='tdborder'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='7'>Dana hasil settlement penjualan saham termasuk PPh Ps 23 Komisi Broker (butir 4 kolom e) secara $row->kode_setl di atas agar ditransfer ke rekening  giro YAKES-TELKOM sebagai berikut :
                        </td>
                    </tr>
                    <tr>
                        <td class='tdpad'>~</td>
                        <td class='tdpad' colspan='3'>Nama Bank</td>
                        <td class='tdpad' colspan='3'>:&nbsp;$row->nama_bank </td>
                    </tr>
                    <tr>
                        <td class='tdpad'>~</td>
                        <td class='tdpad' colspan='3'>Alamat Bank</td>
                        <td class='tdpad' colspan='3'>:&nbsp;$row->alamat_bank </td>
                    </tr>
                    <tr>
                        <td class='tdpad'>~</td>
                        <td class='tdpad' colspan='3'>Nomor dan Nama Rekening</td>
                        <td class='tdpad' colspan='3'>:&nbsp;$row->no_rek_bank atas nama $row->nama_rek_bank
                        </td>
                    </tr>
                    <tr >
                        <td class='tdpad' colspan='7' style='text-align: justify;'>Demikian disampaikan dan mohon setelah selesai transaksi diinformasikan kepada kami pada kesempatan pertama. Atas perhatian dan kerja sama Saudara, kami ucapkan terima kasih.</td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='7' style='font-size: 2px;'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='7'>Hormat kami,</td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='2'><b>YAKES-TELKOM</b></td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='3' height='80px'>&nbsp;</td>
                        <td class='tdpad' height='80px'>&nbsp;</td>
                        <td class='tdpad' height='80px'>&nbsp;</td>
                        <td class='tdpad' height='80px'>&nbsp;</td>
                        <td class='tdpad' height='80px'>&nbsp;</td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='3'><b><u>$row->nama_ttd1</u></b></td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad' colspan='2'>&nbsp;<b><u>$row->nama_ttd2</u></b></td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='3'><b>$row->jab1</b></td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad'>&nbsp;</td>
                        <td class='tdpad' colspan='2'>&nbsp;<b>$row->jab2</b></td>
                    </tr>
                    <tr>
                        <td class='tdpad' colspan='7' style='font-size: 0px;'>&nbsp;</td>
                    </tr>
                    
                    <tr>
                        <td class='tdpad' colspan='7'>Tembusan : Sdr. Kabid Keuangan YAKES-TELKOM</td>
                    </tr>
                    </table>
                    </td>
                </tr>
              </table><br>
              </div>";

              $sql2="select a.kode_saham,b.nama,c.no_shmjual,c.kode_kelola
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
              where a.no_shmjual='$row->no_shmjual' 
              ";
      
              $rs2 = $dbLib->execute($sql2);
              while($row2=$rs2->FetchNextObject($toupper=false)){
                  $data[] = (array)$row2;
              }
              
              $retData = array();
              foreach ($data as $rowx => $columns) {
                  foreach ($columns as $row2 => $column2) {
                      $retData[$row2][$rowx] = $column2;
                      if($row2 == "kode_saham" OR $row2 == "nama"){
                          ${"tr$row2"} .= "<td style='font-weight:bold' width='100px'>".$retData[$row2][$rowx]."</td>";
                      }else if($row2 == "broker"){
                          ${"tr$row2"} .= "<td  width='100px'>".$retData[$row2][$rowx]."</td>";
                      }else if($row2 == "tanggal" OR $row2 == "tgl_set"){
                          ${"tr$row2"} .= "<td  width='100px'>".substr($retData[$row2][$rowx],8,2)." ".$AddOnLib->ubah_periode(substr($retData[$row2][$rowx],0,4).substr($retData[$row2][$row],5,2))."</td>";
                          ${"tot$row2"} = substr($retData[$row2][$row],8,2)." ".$AddOnLib->ubah_periode(substr($retData[$row2][$rowx],0,4).substr($retData[$row2][$rowx],5,2));
                      }else if($row2 == "p_gainlos" OR $row2=="p_glbuku" OR $row2=="p_gltrans"){
                          ${"tot$row2"} += $retData[$row2][$rowx];
                          ${"tr$row2"} .= "<td  width='100px'>".number_format($retData[$row2][$rowx],2,",",".")."%</td>";
                      }else{
                          if($retData[$row2][$rowx] < 0){
                              $color= "color:red;border: 1px solid black;";
                          }else{
                              $color="color:black;border: 1px solid black;";
                          }
                          ${"tot$row2"} += $retData[$row2][$rowx];
                          ${"tr$row2"} .= "<td  width='100px' style='$color'>".number_format($retData[$row2][$rowx],2,",",".")."</td>";
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
      
              
              echo"<DIV style='page-break-after:always'></DIV>";
              echo"
                <div align='center'>";
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
                    </style>
                    <table  border='0' cellspacing='0' cellpadding='0' class='kotak' id='table-header4'>
                    <tr>
                        <td style='font-size:14px;font-weight:bold'>REALISASI HASIL PENJUALAN SAHAM</td>
                        <td style='font-size:11px;text-align:right'></td>
                    </tr>
                    <tr>
                        <td colspan='11' style='padding:5px;font-size: 10.5px;'>
                            <table border='1' style='border-collapse:collapse;' min-width='800px' cellspacing='2' cellpadding='1' class='min-font' >
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
          echo"</div>";
              
			
        }
        
       
		return "";
	}
	
}
?>
