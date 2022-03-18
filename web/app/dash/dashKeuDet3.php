<?php 

    $tmp=explode("|",$_GET['param']);
    $kode_lokasi=$tmp[0];
    $periode=$tmp[1];
    $nik=$tmp[2];
    $kode_pp=$tmp[3];
    $jenis=$tmp[4];
    $kunci=$tmp[5];
    $nama=$tmp[6];
    $param=$tmp[7];
    $key=$tmp[8];
    $key2=$tmp[9]; 

		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading' style='padding-left: 0px;padding-top: 0px;'>
                        <a href='#' class='small-box-footer btn btn-default btn-sm' onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet2.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key';\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>
                    <div class='col-md-12' style='padding-left: 0px;padding-top: 0px;'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-book'></i>
                            <h3 class='box-title'>Buku Besar</h3>
                        </div>
                        <div class='box-body'>";
                        echo"<div class='row invoice-info'>";

                            if($tmp[10] == "semua"){
                                $sql="select a.kode_lokasi,a.kode_akun,b.nama,a.so_awal,a.periode,case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit from exs_glma a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi  where a.kode_lokasi='$kode_lokasi' and a.periode='".substr($periode,0,4)."01' and a.kode_akun='$key2' order by a.kode_akun";
                                $per= substr($periode,0,4)."01 s.d ".$periode;
                            }else{
                                $sql=" select a.kode_lokasi,a.kode_akun,b.nama,a.so_awal,a.periode,case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit 
                                from exs_glma a
                                inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_akun='$key2' 
                                order by a.kode_akun";
                                $per=$periode;
                            }

                                // echo $sql;

                                $rs=execute($sql);
                                $row = $rs->FetchNextObject($toupper=false);
                                echo"
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Kode Akun
                                            </strong>
                                            <br>
                                            $row->kode_akun
                                        </address>
                                    </div>
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Nama Akun
                                            </strong>
                                            <br>
                                            $row->nama
                                        </address>
                                    </div>
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Periode
                                            </strong>
                                            <br>
                                            $per
                                        </address>
                                    </div>
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Saldo Awal 
                                            </strong>
                                            <br>
                                            ".number_format($row->so_awal,0,',','.')."
                                        </address>
                                    </div>
                                    <div class='col-sm-12 invoice-col' style='padding-top:10px'>
                                    <a class='btn btn-primary btn-sm' id='btnTampil' onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet3.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$key2|semua';\">Tampil Semua</a>
                                    </div>
                                </div>
                            </div> 
                            <div class='row'>";
                                   
                                        if($tmp[10] == "semua"){
                                            $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen,a.tanggal,a.dc
                                            from gldt a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode='$periode' 
                                            union all 
                                            select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                                    case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen,a.tanggal,a.dc
                                            from gldt_h a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode between '".substr($periode,0,4)."01' and '$periode'
                                            order by a.tanggal,a.no_bukti,a.dc ";
                                            
                                        }else{
                                            $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen,a.dc
                                            from gldt a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode ='$periode'
                                            order by a.tanggal,a.no_bukti,a.dc";
                                        }

                                        
                                            // echo $sql;

                                        $rs1 = execute($sql);

                                        $saldo=$row->so_awal;
                                        $debet=0;
                                        $kredit=0;

                                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                                        {
                                            $saldo=$saldo + $row1->debet - $row1->kredit;	
                                            $debet=$debet+$row1->debet;
                                            $kredit=$kredit+$row1->kredit;	

                                            echo"
                                            <a style='cursor:pointer;color:blue' onclick=\"window.location.href='fMain.php?hal=app/dash/dashKeuDet4.php&param=$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|$param|$key|$key2|$row1->no_bukti';\">
                                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 13px;'>
                                                        <span class='username'>
                                                            $row1->no_bukti - $row1->tgl
                                                            <span class='text-muted pull-right' style='font-size:14px'>$row1->dc</span>
                                                        </span><!-- /.username -->
                                                        $row1->keterangan ";
                                                        if ($row1->dc == 'D') {
                                                            echo"
                                                            <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row1->debet,0,",",".")."</b></span>";
                                                        }else{
                                                            echo"
                                                            <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row1->kredit,0,",",".")."</b></span>";
                                                        }
                                                        echo"
                                                    </div>
                                                </div>
                                            </div>
                                            </a>";                                                
                                        }
                            echo"</div>
                            </div>";    
                    echo"</div>
                    </div>";                
        echo"   </div>
            </div>";
        
        echo"
        <script type='text/javascript'>
       
        </script>
        ";