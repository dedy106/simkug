<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $cust=$nik;

    $tmp=explode("/",$_GET['param']);
    $box=$tmp[0];
    $kunci=$tmp[1];
    $kunci2=$tmp[2];
    $polis=$tmp[3];
    // echo "Hello";

    // echo "box=".$box."<br>kunci=".$kunci."<br>kunci2".$kunci2;

    $filter="";
	if($cust != "" ){
		$filter.= " and b.kode_cust='$cust' ";
	}
    if($polis != ""){
		$filter.= " and b.no_polis='$polis' ";
    }
    if($cust == "" AND $polis == ""){
		$filter="";
    }
    
    if($box=="det"){
        $back="fMain.php?hal=app/sju/dashSju.php&param=$polis";
    }else{
        $back="fMain.php?hal=app/sju/dashSju2.php&param=$polis";
    }

		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading' style='padding-left:0px'>
					<a href='$back' class='small-box-footer btn btn-default btn-sm' > Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "det" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Data Klaim</h3>               
                        </div>
                        <div class='box-body'>
                        <div class='table-responsive sai-container-overflow'>
                            <table class='display' width='100%' id='table-klaim2'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No</th>
                                    <th style='text-align:center;'>No Klaim</th>
                                    <th style='text-align:center;'>No Berkas</th>
                                    <th style='text-align:center;'>Tgl Lapor</th>
                                    <th style='text-align:center;'>DOL</th>
                                    <th style='text-align:center;'>Policy No</th>
                                    <th style='text-align:center;'>Tertanggung</th>
                                    <th style='text-align:center;'>Lokasi</th>
									 <th style='text-align:center;'>Obyek Of Loss</th>
                                    <th style='text-align:center;'>Penyebab Kerugian</th>
									
                                    <th style='text-align:center;'>Curr</th>
                                    <th style='text-align:center;'>Nilai Klaim</th>
                                    <th style='text-align:center;'>Nilai Klaim yg Dibayar</th>
                                    <th style='text-align:center;'>Tanggal Settled</th>
                                    <th style='text-align:center;'>Settled Claim</th>
                                    <th style='text-align:center;'>Tanggal Adjusment</th>
                                    <th style='text-align:center;'Nilai Adjusment</th>
                                    <th style='text-align:center;'>Aging Klaim (DOL)</th>
                                    <th style='text-align:center;'>Aging Klaim (Tanggal Lapor)</th>
                                    <th style='text-align:center;'>Status Klaim</th>
                                    <th style='text-align:center;'>Remark</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
                                f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
                                DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl,
								i.nama as nama_sebab,j.nama as nama_obl,k.nama as nama_progress
                                from sju_klaim a
                                inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
                                left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
                                left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								inner join sju_sebab i on a.sebab=i.kode_sebab and a.kode_lokasi=i.kode_lokasi
								inner join sju_obl j on a.kode_obl=j.kode_obl and a.kode_lokasi=j.kode_lokasi
								left join sju_klaim_progres k on a.progress=k.kode_prog and a.kode_lokasi=k.kode_lokasi
                                where a.kode_lokasi='11' and a.progress='$kunci' and a.status in ('$kunci2') $filter
                                order by a.no_klaim
                                 ";
                                
                                // echo $sql;
								
                                $rs2 = execute($sql);                              
                                
                                $nilai=0;$nilai_nego=0;$tagihan=0;
                                $i=1;
                                while ($row = $rs2->FetchNextObject($toupper=false))
                                {
                                    $nilai+=$row->nilai;
                                    $nilai_nego+=$row->nilai_nego;
                                    $nilai_final+=$row->nilai_final;
                                echo "<tr >
                                    <td  align='center'>$i</td>
                                    <td >$row->no_klaim</td>
                                    <td >$row->no_berkas</td>
                                    <td >$row->tanggal</td>
                                    <td >$row->tanggal</td>
                                    <td >$row->no_polis</td>
                                    <td >$row->nama_cust</td>
                                    <td >$row->lokasi</td>
									 <td >$row->nama_obl</td>
                                    <td >$row->nama_sebab</td>
									
                                    <td >$row->kode_curr</td>
                                    <td  align='right'>".number_format($row->nilai,0,',','.')."</td>
                                    <td  align='right'>".number_format($row->nilai_nego,0,',','.')."</td>
                                    <td >$row->tgl_bayar</td>
                                    <td >$row->catatan</td>
                                    <td >&nbsp;</td> 
                                    <td  align='right'>".number_format($row->nilai_final,0,',','.')."</td>
                                    <td >$row->aging_dol</td>
                                    <td >$row->aging_cl</td>
                                    <td >$row->nama_progress</td>
                                    <td >$row->catatan</td> 
                                 </tr>";
                                    $i=$i+1;
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "det2" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Data Klaim</h3>               
                        </div>
                        <div class='box-body'>
                        <div class='table-responsive sai-container-overflow'>
                            <table class='display' width='100%' id='table-klaim2'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No</th>
                                    <th style='text-align:center;'>No Klaim</th>
                                    <th style='text-align:center;'>No Berkas</th>
                                    <th style='text-align:center;'>Tgl Lapor</th>
                                    <th style='text-align:center;'>DOL</th>
                                    <th style='text-align:center;'>Policy No</th>
                                    <th style='text-align:center;'>Tertanggung</th>
                                    <th style='text-align:center;'>Lokasi</th>
									 <th style='text-align:center;'>Obyek Of Loss</th>
                                    <th style='text-align:center;'>Penyebab Kerugian</th>
									
                                    <th style='text-align:center;'>Curr</th>
                                    <th style='text-align:center;'>Nilai Klaim</th>
                                    <th style='text-align:center;'>Nilai Klaim yg Dibayar</th>
                                    <th style='text-align:center;'>Tanggal Settled</th>
                                    <th style='text-align:center;'>Settled Claim</th>
                                    <th style='text-align:center;'>Tanggal Adjusment</th>
                                    <th style='text-align:center;'Nilai Adjusment</th>
                                    <th style='text-align:center;'>Aging Klaim (DOL)</th>
                                    <th style='text-align:center;'>Aging Klaim (Tanggal Lapor)</th>
                                    <th style='text-align:center;'>Status Klaim</th>
                                    <th style='text-align:center;'>Remark</th>
                                </tr>
                                </thead>
                                <tbody>";

                                if($kunci2 == "non" ){
                                    $where= "and a.progress = '$kunci' ";
                                }else{
                                    $where= "and a.status = '$kunci2' ";
                                }

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
                                f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
                                DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl,
								i.nama as nama_sebab,j.nama as nama_obl,k.nama as nama_progress
                                from sju_klaim a
                                inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
                                left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
                                left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								inner join sju_sebab i on a.sebab=i.kode_sebab and a.kode_lokasi=i.kode_lokasi
								inner join sju_obl j on a.kode_obl=j.kode_obl and a.kode_lokasi=j.kode_lokasi
								left join sju_klaim_progres k on a.progress=k.kode_prog and a.kode_lokasi=k.kode_lokasi
                                where a.kode_lokasi='11' $where $filter
                                order by a.no_klaim
                                 ";
                                
                                // echo $sql;
								
                                $rs2 = execute($sql);                              
                                
                                $nilai=0;$nilai_nego=0;$tagihan=0;
                                $i=1;
                                while ($row = $rs2->FetchNextObject($toupper=false))
                                {
                                    $nilai+=$row->nilai;
                                    $nilai_nego+=$row->nilai_nego;
                                    $nilai_final+=$row->nilai_final;
                                echo "<tr >
                                    <td  align='center'>$i</td>
                                    <td >$row->no_klaim</td>
                                    <td >$row->no_berkas</td>
                                    <td >$row->tanggal</td>
                                    <td >$row->tanggal</td>
                                    <td >$row->no_polis</td>
                                    <td >$row->nama_cust</td>
                                    <td >$row->lokasi</td>
									 <td >$row->nama_obl</td>
                                    <td >$row->nama_sebab</td>
									
                                    <td >$row->kode_curr</td>
                                    <td  align='right'>".number_format($row->nilai,0,',','.')."</td>
                                    <td  align='right'>".number_format($row->nilai_nego,0,',','.')."</td>
                                    <td >$row->tgl_bayar</td>
                                    <td >$row->catatan</td>
                                    <td >&nbsp;</td> 
                                    <td  align='right'>".number_format($row->nilai_final,0,',','.')."</td>
                                    <td >$row->aging_dol</td>
                                    <td >$row->aging_cl</td>
                                    <td >$row->nama_progress</td>
                                    <td >$row->catatan</td> 
                                 </tr>";
                                    $i=$i+1;
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                    }
                  
                    echo"
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"
            ";
        echo"</div>
            </div>
        </div>";

		echo "<script type='text/javascript'>
			
            // var table = $('#table-klaim').DataTable({
			// 	// 'fixedHeader': true,
			// 	'scrollY': '300px',
			// 	// 'scrollX': '0px',
			// 	'scrollCollapse': true,
			// 	'order': [[ 0, 'asc' ]]
			// 	});
            // table.columns.adjust().draw();

            $('#table-klaim2').DataTable();
    
            $('#table-klaim2').addClass('table table-bordered table-striped table-hover');
            
                
			</script>
		";
?>
