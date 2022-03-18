<?php
$kode_lokasi=$_SESSION['lokasi'];
$periode=$_SESSION['periode'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];

$path = "http://".$_SERVER["SERVER_NAME"]."/";	

$logo = $path . "image/yspt2.png";


if(ISSET($_GET['print']) OR ISSET($_GET['download'])){
    echo"";
} else{
    echo "
        <div class='row'>
            <div class='col-xs-12'>
                <div class='box'>
                    <div class='box-body'>
                        <a href='printPreview.php?hal=app/siswa/dashPDD.php&print=1' target='_blank' class='btn btn-primary pull-right'>
                            <i class='fa fa-print'></i> Print
                        </a>
                        <a href='download.php?hal=app/siswa/dashPDD.php&download=1' target='_blank' class='btn btn-primary pull-right'><i class='fa fa-download'></i> Download
                        </a>
                    </div>
                </div>
            </div>
        </div>";
}

?>
<div id='dash_page_pdd'><!-- title row -->
    <div class="row">
        <div class='col-xs-12'>
            <div class='box'>
                <div class='box-body'>
                    <div class="row">
                        <div class="col-xs-12">
                            <h2 class="page-header" style="overflow:hidden;">
                                <img src='<?php echo $logo; ?>' style='height: 80px;float: left;margin-right: 10px;margin-left: 10px; '>
                                <div>
                                <?php
                                    // $sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,f.nama as nama_jur,a.id_bank,a.kode_akt, g.nama as nama_pp,g.alamat,g.alamat2,g.pic,g.bank,g.rek, isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir 
                                    // from sis_siswa a 
                                    // inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
                                    // inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp 
                                    // inner join sis_sekolah g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi 
                                    // left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai 
                                    //             from sis_cd_d a 
                                    //             inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
                                    //             where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.periode<'$periode' and a.nis='$nik' 
                                    //             group by a.nis,a.kode_lokasi,a.kode_pp )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
                                    // left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai 
                                    //             from sis_cd_d a inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
                                    //             where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.kode_pp='$kode_pp' and a.periode='$periode' and a.nis='$nik' 
                                    //             group by a.nis,a.kode_lokasi,a.kode_pp )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp 
                                    // left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai 
                                    //             from sis_cd_d a 
                                    //             inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
                                    //             where a.kode_lokasi='$kode_lokasi' and a.dc='C' and a.kode_pp='$kode_pp' and a.periode='$periode' and a.nis='$nik' 
                                    //             group by a.nis,a.kode_lokasi,a.kode_pp )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp 
                                    // where a.nis='$nik' order by a.nis ";

                                    $sql = "select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,c.nama as nama_jur,a.kode_akt,a.id_bank,x.nama as nama_pp,x.alamat,x.alamat2,a.bank
                                    from sis_siswa a
                                    inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                                    inner join sis_jur c on b.kode_jur=c.kode_jur and 
                                    b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
                                    inner join sis_sekolah x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi
                                    inner join (select a.nis,a.kode_pp,a.kode_lokasi
                                                from sis_cd_d a
                                                where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                                                group by a.nis,a.kode_pp,a.kode_lokasi
                                                )g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
                                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$nik'
                                    order by a.kode_kelas,a.nis";

                                    // echo $nik;

                                    $rs=execute($sql);
                                    $row = $rs->FetchNextObject($toupper=false);
                                    
                                    $sql="select sum(kredit-debet) as so_akhir
                                from (select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                                           a.nilai as debet,0 as kredit,a.dc
                                    from sis_cd_d a
                                    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='D'
                                    union all
                                    select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                                           case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from sis_cd_d a
                                    inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' 
                                    union all
                                    select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                                           0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from sis_cd_d a
                                    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='C'
                                                
                                    )a";

                                    // echo $sql;
                                    $saldo= dbResultArray($sql);
                                    $so_akhir=$saldo[0]["so_akhir"];

                                ?>                               
                                    <b class='tgh-nama-pp'><?php echo $row->nama_pp; ?></b><br>
                                    <small class='tgh-alamat-pp'><?php echo $row->alamat; ?></small><br>
                                    <small class='tgh-alamat2-pp'><?php echo $row->alamat2; ?></small>
                                </div>
                            </h2>
                        </div>
                    <!-- /.col -->
                    </div>
                    <!-- info row -->
                    <div class="row invoice-info sai-container-overflow">
                        <center>
                            <b style="font-size:large;"><u>KARTU PDD SISWA</u></b><br>
                        </center>
                        <div id='tgh-identitas'>
                        <strong style='padding-left:15px;'>Identitas Siswa</strong><br>
                                <div class='col-xs-2 invoice-col'>
                                    <address>
                                        NIS<br>
                                        Bank<br>
                                        ID Bank<br>
                                        Nama<br>
                                        Kelas<br>
                                        Angkatan<br>
                                        Jurusan<br>
                                        Saldo PDD
                                    </address>
                                </div>
                                <div class='col-xs-2 invoice-col'>
                                    <address>
                                        :<br>
                                        :<br>
                                        :<br>
                                        :<br>
                                        :<br>
                                        :<br>
                                        :<br>
                                        :
                                    </address>
                                </div>
                                <div class='col-xs-8 invoice-col'>
                                    <address>
                                    <strong><?php echo $row->nis; ?></strong><br>
                                    <?php echo $row->bank; ?><br>
                                    <?php echo $row->id_bank; ?><br>
                                    <?php echo $row->nama; ?><br>
                                    <?php echo $row->nama_kelas; ?><br>
                                    <?php echo $row->kode_akt; ?><br>
                                    <?php echo $row->nama_jur; ?><br>
                                    <?php echo number_format($so_akhir,0,",","."); ?>
                                    </address>
                                </div>
                        </div>
                    </div>
                    <!-- /.row -->

                    <!-- Table row -->
                    <div class="row">
                        <div class="col-xs-12 table-responsive sai-container-overflow">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th style="background-color:#cc0000 !important; color:white !important;">No</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Tanggal</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">No Bukti</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Keterangan</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Debet</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Kredit</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Saldo</th>
                                    </tr>
                                </thead>
                                <tbody id='tgh-tbody'>
                                <?php
                                $tgh_tabel = "";
                                $total_d= 0;
                                $total_k = 0;
                                $total_saldo = 0;

                                // $sql2 = "select a.no_bukti,a.tgl,a.keterangan,a.modul,a.debet,a.kredit from (select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal, a.nilai as debet,0 as kredit from sis_cd_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi where a.nis='$nik' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.dc='D' union all select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal, 0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit from sis_cd_d a inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi where a.nis='$nik' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.dc='C' union all select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal, 0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit from sis_cd_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi where a.nis='$nik' and a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.dc='C')a order by a.tanggal";

                                $sql2="select a.no_bukti,a.tgl,a.keterangan,a.modul,a.debet,a.kredit,a.dc
                                from (select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                                           a.nilai as debet,0 as kredit,a.dc
                                    from sis_cd_d a
                                    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='D'
                                    union all
                                    select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                                           case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from sis_cd_d a
                                    inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' 
                                    union all
                                    select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                                           0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                                    from sis_cd_d a
                                    inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                                    where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='C'
                                                
                                    )a
                                order by a.tanggal,a.no_bukti ";

                                $rs1=execute($sql2);
                                $i=1;
                                $total_d=0;
                                $total_k=0;
                                $total_saldo=0;
                                $total_saldo2=0;
                                while($row1 = $rs1->FetchNextObject($toupper=false)){
                                    $total_d += +$row1->debet;
                                    $total_k += +$row1->kredit;
                                    $total_saldo += ($row1->debet - $row1->kredit);
                                    
                                    echo "<tr>
                                    <td>$i</td>
                                    <td>$row1->tgl</td>
                                    <td>$row1->no_bukti</td>
                                    <td>$row1->keterangan</td>
                                    <td>".number_format($row1->debet,0,",",".")."</td>
                                    <td>".number_format($row1->kredit,0,",",".")."</td>
                                    <td>".number_format($total_saldo,0,",",".")."</td>
                                    </tr>";
                                    $i++;
                                    $total_saldo2 +=$total_saldo;
                                }

                                echo "<tr>
                                        <td style='text-align:right;' colspan='4'><strong>Total</strong></td>
                                        <td>".number_format($total_d,0,",",".")."</td>
                                        <td>".number_format($total_k,0,",",".")."</td>
                                        <td></td>
                                    </tr>";

                                if($so_akhir > 0){
                                    echo "<tr>
                                        <td style='text-align:right;' colspan='6'><strong>Saldo</strong></td>
                                        <td>".number_format($so_akhir)."</td>
                                        </tr>";
                                }else{
                                   echo "<tr>
                                        <td style='text-align:right;' colspan='6'><strong>Saldo</strong></td>
                                        <td></td>
                                        </tr>";
                                }
                                ?>
                                </tbody>
                            </table>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
            </div>
        </div>
    </div>
</div>