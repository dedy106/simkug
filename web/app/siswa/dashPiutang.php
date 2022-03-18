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
                        <a href='printPreview.php?hal=app/siswa/dashPiutang.php&print=1' target='_blank' class='btn btn-primary pull-right'>
                            <i class='fa fa-print'></i> Print
                        </a>
                    </div>
                </div>
            </div>
        </div>";
}
?>


<div id='dash_page_piutang'><!-- title row -->
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
                                    
                                    $sql="select isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
                                    from sis_siswa a 
                                    inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
                                    inner join sis_jur g on f.kode_jur=g.kode_jur and f.kode_lokasi=g.kode_lokasi and f.kode_pp=g.kode_pp
                                    left join (select y.nis,y.kode_lokasi,  
                                                        sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                                                       sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                                                       sum(case when x.kode_param not in ('DSP','SPP','SPP_TK','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                                                       sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                                from sis_bill_d x 			
                                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
                                                group by y.nis,y.kode_lokasi 			
                                                )b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
                                    left join (select y.nis,y.kode_lokasi,  
                                                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                                                       sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                                                       sum(case when x.kode_param not in ('DSP','SPP','SPP_TK','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                                                       sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                                from sis_bill_d x 			
                                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                                                group by y.nis,y.kode_lokasi 			
                                                )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi
                                    left join (select y.nis,y.kode_lokasi,  
                                                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                                                       sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                                                       sum(case when x.kode_param not in ('DSP','SPP','SPP_TK','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                                                       sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                                                from sis_rekon_d x 	
                                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')	and x.kode_pp='$kode_pp'		
                                                group by y.nis,y.kode_lokasi 			
                                                )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi
                                    left join (select y.nis,y.kode_lokasi, 
                                                  sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                                                       sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                                                       sum(case when x.kode_param not in ('DSP','SPP','SPP_TK','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                                                       sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                                                from sis_rekon_d x 			
                                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode') and x.kode_pp='$kode_pp'			
                                                group by y.nis,y.kode_lokasi 			
                                                )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
                                                where a.nis='$nik'";

                                    // echo $sql;
                                    $saldo= dbResultArray($sql);
                                    $sak_akhir=$saldo[0]["sak_total"];

                                    $sql="select case when sum(debet-kredit) < 0 then 0 else sum(debet-kredit) end as so_akhir
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
                            <b style="font-size:large;"><u>KARTU SISWA</u></b><br>
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
                                        Saldo Piutang<br>
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
                                    <?php echo number_format($sak_akhir,0,",","."); ?><br>
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
                                        <th style="background-color:#cc0000 !important; color:white !important;">Parameter</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Keterangan</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Tagihan</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Pembayaran</th>
                                        <th style="background-color:#cc0000 !important; color:white !important;">Saldo</th>
                                    </tr>
                                </thead>
                                <tbody id='tgh-tbody'>
                                <?php

                                // $sql2="select a.no_bill as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'BILL' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param from (select x.kode_lokasi,x.no_bill,x.kode_param,sum(x.nilai) as tagihan,0 as bayar from sis_bill_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp where y.flag_aktif=1 and x.kode_lokasi = '$kode_lokasi' and x.nis='$nik' and x.kode_pp='$kode_pp' and x.nilai<>0 group by x.kode_lokasi,x.no_bill,x.nis,x.kode_param )a inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi union all select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'PDD' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param from (select x.kode_lokasi,x.no_rekon,x.kode_param,0 as tagihan,sum(nilai) as bayar from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp where y.flag_aktif=1 and x.kode_lokasi = '$kode_lokasi' and x.nis='$nik' and x.kode_pp='$kode_pp' and x.nilai<>0 group by x.kode_lokasi,x.no_rekon,x.nis,x.kode_param )a inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi union all select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'KB' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param from (select x.kode_lokasi,x.no_rekon,x.kode_param,0 as tagihan,sum(nilai) as bayar from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp where y.flag_aktif=1 and x.kode_lokasi = '$kode_lokasi' and x.nis='$nik' and x.kode_pp='$kode_pp' and x.nilai<>0 group by x.kode_lokasi,x.no_rekon,x.nis,x.kode_param )a inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi order by tanggal,modul";
                                $sql2="select a.no_bill as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,
                                b.keterangan,'BILL' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
                                 from (select x.kode_lokasi,x.no_bill,x.kode_param,sum(x.nilai) as tagihan,0 as bayar from sis_bill_d x 
                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                 where x.kode_lokasi = '$kode_lokasi' and x.nis='$nik' and x.kode_pp='$kode_pp' and x.nilai<>0 
                                group by x.kode_lokasi,x.no_bill,x.nis,x.kode_param )a 
                                inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
                                union all select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
                                convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'PDD' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
                                 from (select x.kode_lokasi,x.no_rekon,x.kode_param,
                                case when x.modul in ('BTLREKON') then x.nilai else 0 end as tagihan,case when x.modul <>'BTLREKON' then x.nilai else 0 end as bayar
                                 from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                                where x.kode_lokasi = '$kode_lokasi' and x.nis='$nik' and x.kode_pp='$kode_pp' and x.nilai<>0
                                 )a 
                                inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi 
                                union all 
                                select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
                                convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'KB' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param 
                                from (select x.kode_lokasi,x.no_rekon,x.kode_param,
                                case when x.modul in ('BTLREKON') then x.nilai else 0 end as tagihan,case when x.modul <>'BTLREKON' then x.nilai else 0 end as bayar
                                 from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                                where x.kode_lokasi = '$kode_lokasi' and x.nis='$nik' and x.kode_pp='$kode_pp' and x.nilai<>0 
                                )a
                                 inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi 
                                order by tanggal,modul";

                                $tgh_tabel = "";
                                $total_tgh= 0;
                                $total_pmb = 0;
                                $total_saldo = 0;
                                $total_jml = 0;
                                $rs1=execute($sql2);
                                $i=1;
                                while($row1 = $rs1->FetchNextObject($toupper=false)){
                               
                                    $total_tgh += +$row1->tagihan;
                                    $total_pmb += +$row1->bayar;
                                    $total_saldo += +$row1->tagihan - $row1->bayar;
                                    
                                    echo "<tr>
                                            <td>$i</td>
                                            <td>$row1->tgl</td>
                                            <td>$row1->no_bukti</td>
                                            <td>$row1->kode_param</td>
                                            <td>$row1->keterangan</td>
                                            <td>".number_format($row1->tagihan,0,",",".")."</td>
                                            <td>".number_format($row1->bayar,0,",",".")."</td>
                                            <td>".number_format($total_saldo,0,",",".")."</td>
                                        </tr>";
                                    $i++;
                                }
                                echo   "<tr>
                                            <td style='text-align:right;' colspan='5'><strong>Total</strong></td>
                                            <td>".number_format($total_tgh,0,",",".")."</td>
                                            <td>".number_format($total_pmb,0,",",".")."</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style='text-align:right;' colspan='7'><strong>Saldo</strong></td>
                                            <td>".number_format($total_saldo,0,",",".")."</td>
                                        </tr>";
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