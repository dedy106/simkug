<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $kode_fs="FS1";

    $tmp=explode("|",$_GET['param']);
    $periode=$tmp[0];
    $kode_pp=$tmp[1];
    $box=$tmp[2];
    $jenis=$tmp[3];
    $kunci=$tmp[4];
    $nama=$tmp[5];
    $param=$tmp[6];
    $key=$tmp[7];
    $key2=$tmp[8];
    $key3=$tmp[9];

    $judul="Jurnal Umum";

    $back1="";
    $backto="$fmain?hal=app/dash/dashYptDet4.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$param|$key|$key2";
  
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";

	echo "<div class='panel' style='$padding'>
                <div class='panel-body'>
                    $back1
                    <div class='col-md-12' style='padding-left: 0px;padding-top: 0px;'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Jurnal</h3>
                        </div>
                        <div class='box-body'>";
              
                            $sql="select distinct a.no_bukti,a.tanggal,convert(varchar,tanggal,103) as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
                            from gldt_h a
                            inner join lokasi b on a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$key3'
                            union
                            select distinct a.no_bukti,a.tanggal,convert(varchar,tanggal,103) as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
                            from gldt a
                            inner join lokasi b on a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$key3'
                            order by a.no_bukti ";


                            $rs=execute($sql);
                            $row = $rs->FetchNextObject($toupper=false);
                            echo"
                            <div class='row invoice-info' style=''>
                                <div class='col-sm-2 invoice-col'>
                                <address style='margin-bottom: 5px;'>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    $row->no_bukti
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        Tanggal
                                        </strong>
                                        <br>
                                        ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." 
                                    </address>
                                </div>
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>";
                                
                                    $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,b.nama as nama_akun,a.kode_drk,
                                    case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from gldt a
                                    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$row->no_bukti' 
                                    union all
									select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,b.nama as nama_akun,a.kode_drk,
                                    case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from gldt_h a
                                    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$row->no_bukti'
                                    order by a.dc desc";
                                    // echo $sql;

                                    $rs1 = execute($sql);
                                    $i=1;
                                    $tot_debet=0;
                                    $tot_kredit=0;
                                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                                    {
                                        $debet=number_format($row1->debet,0,',','.');
                                        $kredit=number_format($row1->kredit,0,',','.');
                                        $tot_debet=$tot_debet+$row1->debet;
                                        $tot_kredit=$tot_kredit+$row1->kredit;
                                        echo"
                                        <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                            <div class='box-comment'>
                                                <div class='comment-text' style='margin-left: 5px;'>
                                                    <span class='username'>
                                                        $row1->kode_akun - $row1->nama_akun
                                                        <span class='text-muted pull-right' style='font-size:14px'>$row1->dc</span>
                                                    </span><!-- /.username -->
                                                    <span class='username'>
                                                            Kode PP : $row1->kode_pp | Kode DRK :  $row1->kode_drk
                                                            <span class='text-muted pull-right' style='font-size:14px'></span>
                                                        </span><!-- /.username -->
                                                     ";
                                                    if ($row1->dc == 'D') {
                                                        echo"
                                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row1->debet,0,",",".")."</b></span>";
                                                    }else{
                                                        echo"
                                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row1->kredit,0,",",".")."</b></span>";
                                                    }
                                                    echo"
                                                    $row1->keterangan
                                                </div>
                                            </div>
                                        </div>
                                        ";
                                            $i=$i+1;
                                    }
                                    echo"
                            </div>
                            <!-- /.row -->"; 
                        echo"
                        </div>
                    </div>";               
        echo"   </div>
            </div>";
      
?>
