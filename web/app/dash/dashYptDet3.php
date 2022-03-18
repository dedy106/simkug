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

    switch($param){
        case "NrcL" :
        $judul = "Neraca Lajur";
        break;
        case "RRA" :
        $judul = "Detail Pengajuan RRA";
        break;
        case "PB" :
        $judul = "Detail Pengajuan PB";
        break;
        case "SPB" :
        $judul = "Detail SPB";
        break;
        case "KAS" :
        $judul = "Detail Pembayaran";
        break;
        case "VER" :
        $judul = "Detail Verifikasi";
        break;
        case "FIAT" :
        $judul = "Detail Fiat";
        break;
        case "GAR" :
        $judul = "Detail Anggaran";
        break;
        case "SPJ" :
        $judul = "Detail SPJ";
        break;
    }

   
    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $mobile=true;
        $back1="";
        $backto="$fmain?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama";
      
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    
    }else{
        $mobile=false;
        $back1="<div class='panel-heading' style='padding-left: 0px;padding-top: 0px;padding-bottom:0px'>
        <a href='#' class='small-box-footer btn btn-default btn-sm' style='margin-left:10px;margin-top:10px' onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet2.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama'\"> Back <i class='fa fa-arrow-circle-left'></i></a>
        </div>";
    }

    $path = "http://".$_SERVER["SERVER_NAME"]."/";		

    echo "
	<div class='panel' style='$padding'>
        <div class='panel-body'>
        $back1 ";
        echo"<div class='row'>
                <div class='col-md-12 '>";
                switch($param){
                case "NrcL" :
                    echo"
                    <div class='box-header with-border' id='batas_print'>
                        <i class='fa fa-balance-scale'></i>
                        <h3 class='box-title'>Neraca Lajur</h3>
                    </div>
                    <div class='box-body'>";
                    
                    $sql="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik' ";
                    $rs = execute($sql);
                    
                    $sql="select a.kode_akun,c.nama as nama_akun,a.so_awal,a.debet,a.kredit,case when c.jenis='Pendapatan' or modul = 'P' then -a.so_akhir else a.so_akhir end as so_akhir
                    from exs_glma a
                    inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                    where a.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_akun='$key' and a.periode='$periode' ";
                    
                    $rs2 = execute($sql);  
                    while ($row2 = $rs2->FetchNextObject($toupper=false)){
                        
                        $color="color:black";
                        
                        echo"
                        <a style='cursor:pointer;color:blue'   onclick=\"window.location.href='fMainMobile.php?hal=app/dash/dashYptDet4.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$param|$key|$row2->kode_akun';\">
                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                <div class='box-comment'>
                                    <div class='comment-text' style='margin-left: 0px;'>
                                        <span class='username'>
                                        $row2->kode_akun - $row2->nama_akun
                                        <span class='text-muted pull-right' style='font-size:14px'><i class='fa fa-angle-right'></i></span>
                                        </span><!-- /.username -->
                                        <span class='username'>
                                        Saldo Akhir
                                        <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row2->so_akhir,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                    </div>
                                </div>
                            </div>
                        </a>";
                        
                    }
                    echo"
                    </div>";
                break;
                case "RRA" :
                    echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail RRA</h3>
                        </div>
                        <div class='box-body'>";
                        
                        $sql = "select a.periode,convert(varchar,a.tanggal,103) as tgl,a.no_pdrk,a.kode_lokasi,a.keterangan,a.nik_buat,b.nama as nama_buat,
                        a.nik_app1,c.nama as nama_setuju,substring(a.periode,1,4) as tahun,d.kota,a.tanggal,b.email
                        from rra_pdrk_m a
                        inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
                        inner join karyawan c on a.nik_app1=c.nik and a.kode_lokasi=c.kode_lokasi
                        inner join lokasi d on a.kode_lokasi=d.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_pdrk='$key' and a.kode_pp='$kode_pp' and a.periode='$periode' order by a.no_pdrk  ";

                        // echo $sql;

                        $rs2 = execute($sql);
                        $row = $rs2->FetchNextObject(false);
                        if($mobile == false ){
                        echo"
                            <div class='row invoice-info'>
                                <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Periode
                                    </strong><br>
                                    <strong>
                                    Tanggal
                                    </strong><br>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    Keterangan
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        $row->periode
                                        </strong><br>
                                        <strong>
                                        ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                        </strong><br>
                                        <strong>
                                        $row->no_pdrk
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                <table class='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th width='30' >NO</th>
                                        <th width='100' >KODE AKUN </th>
                                        <th width='200' >NAMA AKUN </th>
                                        <th width='60' >PERIODE</th>
                                        <th width='100' >DEBET</th>
                                        <th width='100' >KREDIT</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    $sql1="select a.kode_akun,a.periode,a.dc,a.nilai,
                                    b.nama as nama_akun,
                                    case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
                             from rra_pdrk_d a
                             inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                             where a.no_pdrk='$row->no_pdrk' and a.kode_lokasi='$row->kode_lokasi'
                             order by a.dc desc ";
                                     
                                    $rs1 = execute($sql1);
                                    $i=1;
                                    $tot_debet=0;
                                    $tot_kredit=0;
                                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                                    {
                                        $debet=number_format($row1->debet,0,',','.');
                                        $kredit=number_format($row1->kredit,0,',','.');
                                        $tot_debet=$tot_debet+$row1->debet;
                                        $tot_kredit=$tot_kredit+$row1->kredit;
                                    echo "<tr>
                                            <td>$i</td>
                                            <td >$row1->kode_akun</td>
                                            <td >$row1->nama_akun</td>
                                            <td >$row1->periode</td>
                                            <td align='right'>$debet</td>
                                            <td align='right'>$kredit</td>
                                        </tr>";
                                            $i=$i+1;
                                    }
                                    $tot_debet1=number_format($tot_debet,0,',','.');
                                    $tot_kredit1=number_format($tot_debet,0,',','.');
                                    echo "<tr>
                                            <td colspan='4'  align='right'><b>Total</b></td>
                                            <td  align='right'><b>$tot_debet1</b></td>
                                            <td  align='right'><b>$tot_kredit1</b></td>
                                        </tr>";

                                    echo"
                                    </tbody>
                                </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <div class='row'>
                               
                            </div>
                            <!-- /.row -->";
                    }else{
                        echo"
                            <div class='row invoice-info' style=''>
                                <div class='col-sm-12 invoice-col'>
                                <address>
                                    <strong>Periode : </strong>
                                    $row->periode 
                                </address>
                                </div>
                                <!-- 1 -->
                                <div class='col-sm-12 invoice-col'>
                                <address >
                                    <strong>
                                    Tanggal : 
                                    </strong>
                                    ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        No Bukti :
                                        </strong>
                                        $row->no_pdrk
                                    </address>
                                </div>
                                <!-- 2 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Keterangan : 
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom : 20px'>
                                        <strong>
                                        Detail :
                                        </strong>
                                    </address>
                                </div>
                                
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>";
                            $sql1="select a.kode_akun,a.periode,a.dc,a.nilai,
                                    b.nama as nama_akun,a.dc,
                                    case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
                             from rra_pdrk_d a
                             inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                             where a.no_pdrk='$row->no_pdrk' and a.kode_lokasi='$row->kode_lokasi'
                             order by a.dc desc ";
                                     
                                    $rs1 = execute($sql1);
                                    $i=1;
                                    $tot_debet=0;
                                    $tot_kredit=0;
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                            {
                                
                                echo"
                                <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                    <div class='box-comment'>
                                        <div class='comment-text' style='margin-left: 5px;'>
                                            <span class='username'>
                                                    $row1->kode_akun 
                                                <span class='text-muted pull-right' style='font-size:14px'>$row1->dc</span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    $row1->nama_akun ";
                                                    if($row1->dc == "D"){
                                                        $nilai=$row1->debet;
                                                    }else{
                                                        $nilai=$row1->kredit;
                                                    }
                                                echo"
                                                <span class='text-muted pull-right' style='font-size:14px'>".number_format($nilai,0,",",".")."</span>
                                            </span><!-- /.username -->
                                        </div>
                                    </div>
                                </div>
                                ";
                            }
                    }
                break;
                case "PB" :

                $tahun=substr($periode,0,4);

                $sql="select a.no_aju,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
                                a.kode_drk,e.nama as nama_drk,h.logo,h.alamat,
                                a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
                        from it_aju_m a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                        left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
                        left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
                        left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
                        left join lokasi h on a.kode_lokasi=h.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_aju='$key' order by a.no_aju";
                                
                $rs = execute($sql);

                if($mobile == false) {
                    echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail</h3>
                        </div>
                        <div class='box-body'>";
                        
                        $i=1;
                        echo "<div align='center'>"; 
                        $nilai=0;$nilai_ppn=0;$tagihan=0;
                        $row = $rs->FetchNextObject($toupper=false);
                        $logo=$path."image/".$row->logo;
                        $alamat=$row->alamat;
                        $nilai=$nilai+$row->nilai;
                                echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
                        <tr>
                            <td align='center'><img src='$logo' width='200' height='72'></td>
                        </tr>
                        <tr>
                            <td align='center' class='isi_laporan'>$alamat</td>
                        </tr>
                        <tr>
                            <td><hr /></td>
                        </tr>
                        <tr>
                            <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN BEBAN</td>
                        </tr>
                        
                        <tr>
                            <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
                        <tr>
                            <td><table width='100%'  border='0'>
                            <tr>
                                <td width='200'>No Pertanggungan</td>
                                <td width='600' class='judul_bukti'>: $row->no_aju </td>
                            </tr>
                            <tr>
                                <td>Tanggal</td>
                                <td>: $row->tgl </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td width='200'>PP</td>
                                <td width='600'>: $row->kode_pp - $row->nama_pp </td>
                            </tr>
                            <tr>
                                <td>MTA</td>
                                <td>: $row->kode_akun - $row->nama_akun </td>
                            </tr>
                            <tr>
                                <td>DRK</td>
                                <td>: $row->kode_drk - $row->nama_drk </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Keterangan</td>
                                <td>: $row->keterangan </td>
                            </tr>
                            <tr>
                                <td>Nilai</td>
                                <td>: ".number_format($row->nilai,0,",",".")." </td>
                            </tr>
                            <tr>
                                <td>Terbilang</td>
                                <td>: ".terbilang($row->nilai)." </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            
                            </table></td>
                        </tr>
                        <tr>
                            <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr>
                                <td width='200' align='center' class='header_laporan'>Nama Rekening</td>
                                <td width='150' align='center' class='header_laporan'>No Rekening</td>
                                <td width='150' align='center' class='header_laporan'>Bank</td>
                                <td width='80' align='center' class='header_laporan'>Bruto</td>
                                <td width='80' align='center' class='header_laporan'>Pajak</td>
                                <td width='80' align='center' class='header_laporan'>Netto</td>
                            </tr>";
                            $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as nilai,isnull(pajak,0) as pajak,nilai as netto 
                        from it_aju_rek
                        where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi' 
                        order by no_rek";
                            $rs1 = execute($sql);
                            $nilai=0; $pajak=0; $netto=0;
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                                    $nilai+=$row1->nilai;
                                    $pajak+=$row1->pajak;
                                    $netto+=$row1->netto;
                            echo "<tr>
                                <td class='isi_laporan'>$row1->nama_rek</td>
                                <td class='isi_laporan'>$row1->no_rek</td>
                                <td class='isi_laporan'>$row1->bank</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
                            </tr>";
                                }
                                echo "<tr>
                                <td class='header_laporan' colspan='3' align='right'>Total</td>
                            
                                <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
                                <td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
                                <td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
                            </tr>";
                            echo "</table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr
                        <tr>
                            <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
                            <tr align='center'>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                            </tr>
                            <tr align='center'>
                                <td width='200'>Mengetahui/Menyetujui :</td>
                                <td width='200'>Fiat Bayar </td>
                                <td width='200'>Verifikasi</td>
                                <td width='200'>&nbsp;</td>
                            </tr>
                            <tr align='center'>
                                <td >Ka .PP</td>
                                <td >&nbsp;</td>
                                <td >&nbsp;</td>
                                <td >Dibuat Oleh,</td>
                            </tr>
                            
                            <tr align='center' valign='bottom'>
                                <td height='70' class='garis_bawah'>$row->nama_app</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td class='garis_bawah'>$row->nama_user </td>
                            </tr>
                            <tr align='center' valign='bottom'>
                                <td>NIP : $row->nik_app</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>NIP : $row->nik_user</td>
                            </tr>
                            </table></td>
                        </tr>
                        
                        
                        </table></td>
                        </tr>
                        </table><br>
                                    <DIV style='page-break-after:always'></DIV>";
                                    $i=$i+1;                                
                                echo "</table><br>";
                                echo "</div>";
                }else{
                            $nilai=0;$nilai_ppn=0;$tagihan=0;
                            $row = $rs->FetchNextObject($toupper=false);
                            $logo=$path."image/".$row->logo;
                            $alamat=$row->alamat;
                            $nilai=$nilai+$row->nilai;
                            $alt=explode(",",$alamat);
                            echo"
                            <div class='row invoice-info' style=''>
                                <div class='col-sm-12 invoice-col'>
                                <address style='margin-bottom: 20px;'>
                                    <strong>FORMULIR PERTANGGUNGAN BEBAN</strong>
                                </address>
                                </div>
                                <!-- 1 -->
                                <div class='col-sm-12 invoice-col'>
                                <address style='margin-bottom: 5px;'>
                                    <strong>
                                    No Pertanggungan
                                    </strong>
                                    <br>
                                    $row->no_aju
                                </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom: 20px;'>
                                        <strong>
                                        Tanggal
                                        </strong>
                                        <br>
                                        ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." 
                                    </address>
                                </div>
                                <!-- 2 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        PP
                                        </strong>
                                        <br>
                                        $row->kode_pp - $row->nama_pp
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address>
                                        <strong>
                                        MTA
                                        </strong>
                                        <br>
                                        $row->kode_akun - $row->nama_akun
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom: 20px;'>
                                        <strong>
                                        DRK
                                        </strong>
                                        <br>
                                        $row->kode_drk - $row->nama_drk
                                    </address>
                                </div>
                                <!-- 3 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address>
                                        <strong>
                                        Keterangan
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address>
                                        <strong>
                                        Nilai
                                        </strong>
                                        <br>
                                        ".number_format($row->nilai,0,",",".")."
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom: 20px;'>
                                        <strong>
                                        Terbilang
                                        </strong>
                                        <br>
                                        ".terbilang($row->nilai)."
                                    </address>
                                </div>
                                <!-- 4 -->
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>";
                        
                            $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as nilai,isnull(pajak,0) as pajak,nilai as netto 
                            from it_aju_rek
                            where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi' 
                            order by no_rek";
                            $rs1 = execute($sql);
                            $nilai=0; $pajak=0; $netto=0;

                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                            {
                                $nilai+=$row1->nilai;
                                $pajak+=$row1->pajak;
                                $netto+=$row1->netto;
                                echo"
                                <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                    <div class='box-comment'>
                                        <div class='comment-text' style='margin-left: 5px;'>
                                            <span class='username'>
                                                    $row1->no_rek
                                                <span class='text-muted pull-right' style='font-size:14px'>Bruto : ".number_format($row1->nilai,0,",",".")."</span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    Nama : $row1->nama_rek
                                                    <span class='text-muted pull-right' style='font-size:14px'>Pajak : ".number_format($row1->pajak,0,",",".")."</span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    Bank : $row1->bank
                                                    <span class='text-muted pull-right' style='font-size:14px'>Netto : ".number_format($row1->netto,0,",",".")."</span>
                                            </span><!-- /.username -->
                                             
                                        </div>
                                    </div>
                                </div>
                                ";
                                    $i=$i+1;
                            }
                            echo"
                            </div>
                            <!-- /.row -->"; 
                }
                
                        break;
                        case "SPB" :
                        $sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,a.nama,a.alamat,
                            a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_ver,d.nama as nama_ver,a.nik_fiat,e.nama as nama_fiat,
                            convert(varchar,a.tanggal,103) as tgl,f.logo,f.alamat,f.nama as nama_lokasi
                        from it_spb_m a
                        inner join lokasi f on a.kode_lokasi=f.kode_lokasi
                        left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
                        left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
                        left join karyawan d on a.nik_ver=d.nik and a.kode_lokasi=d.kode_lokasi
                        left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.no_spb='$key' ";
                        $rs=execute($sql);
                        	
                        $i=1;
                        $logo=$path."image/tu.jpg";

                        if($mobile == false) {

                        echo "<div align='center'>"; 
                        //echo judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".ubah_periode($periode));
                        echo "<div align='center'>"; 
                        $row = $rs->FetchNextObject($toupper=false);
                        $logo=$path."image/".$row->logo;
                        $alamat=$row->alamat;
                        $nama_lokasi=strtoupper($row->nama_lokasi);
                                echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                        <tr>
                            <td align='center'><img src='$logo' width='251' height='100'></td>
                        </tr>
                        <tr>
                            <td align='center'>$alamat</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align='center' class='istyle17'>SURAT PERINTAH BAYAR (SPB) </td>
                        </tr>
                        <tr>
                            <td align='center' class='istyle17'>NO SPB : $row->no_spb</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>BENDAHARAWAN DIMOHON UNTUK MEMBAYARKAN UANG SEBESAR : </td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td width='257' class='isi_bukti'>RP : ".number_format($row->nilai,0,",",".")." </td>
                                <td width='533' class='isi_bukti'>: ".terbilang($row->nilai)." </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td  height='20' class='isi_bukti'>KEPADA : </td>
                                <td> &nbsp; </td>
                            </tr>
                            <tr>
                                <td  height='20' class='isi_bukti'>NAMA</td>
                                <td class='isi_bukti'>: $row->nama </td>
                            </tr>
                            <tr>
                                <td  height='20' class='isi_bukti'>ALAMAT</td>
                                <td class='isi_bukti'>: $row->alamat </td>
                            </tr>
                            <tr>
                                <td  height='20' class='isi_bukti'>UNTUK PEMBAYARAN KEGIATAN</td>
                                <td class='isi_bukti'>: $row->keterangan  </td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>DENGAN RINCIAN SBB : </td>
                        </tr>
                        <tr>
                            <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr bgcolor='#CCCCCC'>
                                <td width='30' align='center' class='isi_bukti'>NO</td>
                                <td width='80' align='center' class='isi_bukti'>TANGGAL</td>
                                <td width='100' align='center' class='isi_bukti'>NO AGENDA </td>
                                <td width='250' align='center' class='isi_bukti'>URAIAN</td>
                                <td width='100' align='center' class='isi_bukti'>BRUTO</td>
                                <td width='100' align='center' class='isi_bukti'>PAJAK</td>
                                <td width='100' align='center' class='isi_bukti'>NETTO</td>
                            </tr>";
                                $sql="select a.no_aju,a.tanggal,a.keterangan,convert(varchar,a.tanggal,103) as tgl,
                                isnull(b.nilai,0)+isnull(b.nilai2,0) as nilai,isnull(b.npajak,0) as npajak,isnull(b.nilai,0)+isnull(b.nilai2,0)-isnull(b.npajak,0)  as netto
                        from it_aju_m a 
                        left join (select a.no_aju,a.kode_lokasi,
                            sum(case when a.kode_akun in ('1132103','2121101','2121102','4960001','2121103','2121107') and a.dc='C' then a.nilai else 0 end) as npajak, 
                            sum(case when a.kode_akun not in ('1132103','2121101','2121102','4960001','2121103','2121107')  then a.nilai else 0 end) as nilai,
                            sum(case when a.kode_akun in ('1132103','2121101','2121102','4960001','2121103','2121107') and a.dc='D' then a.nilai else 0 end) as nilai2
                        from it_aju_d a
                        inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                        where b.no_spb='$row->no_spb' and b.kode_lokasi='$row->kode_lokasi'
                        group by a.no_aju,a.kode_lokasi
                                )b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                        where a.no_spb='$row->no_spb' and a.kode_lokasi='$row->kode_lokasi'
                        order by a.no_aju ";
                            
                                $rs1 = execute($sql);
                                $i=1;
                                $nilai=0;$npajak=0;$netto=0;
                                while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {	
                                    $nilai+=$row1->nilai;
                                    $npajak+=$row1->npajak;
                                    $netto+=$row1->netto;
                            echo "<tr>
                                <td class='isi_bukti' align='center'>$i</td>
                                <td class='isi_bukti'>$row1->tgl</td>
                                <td class='isi_bukti'>$row1->no_aju</td>
                                
                                <td class='isi_bukti'>$row1->keterangan</td>
                                <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                                <td class='isi_bukti' align='right'>".number_format($row1->npajak,0,",",".")."</td>
                                <td class='isi_bukti' align='right'>".number_format($row1->netto,0,",",".")."</td>
                            </tr>";
                                    $i=$i+1;
                                }
                            echo "<tr>
                                <td colspan='4' align='center' class='isi_bukti'>TOTAL</td>
                                <td class='isi_bukti' align='right'>".number_format($nilai,0,",",".")."</td>
                                <td class='isi_bukti' align='right'>".number_format($npajak,0,",",".")."</td>
                                <td class='isi_bukti' align='right'>".number_format($netto,0,",",".")."</td>
                            </tr>
                            
                            </table></td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr align='center'>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                        </tr>
                            <tr>
                            <td>&nbsp;</td>
                                <td width='200' align='center' class='isi_bukti'>BENDAHARA</td>
                                <td width='250' align='center' class='isi_bukti'>FIATUR</td>
                                <td width='200' align='center' class='isi_bukti'>YANG MEMBUAT </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td align='center' class='isi_bukti'>REKTOR / WAREK / KABIDKUG </td>
                                <td align='center' class='isi_bukti'>&nbsp;</td>
                            </tr>
                            <tr>
                                <td height='60'>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>

                            </tr>
                            <tr>
                            <td>&nbsp;</td>
                                <td class='isi_bukti' align='center'><u>$row->nama_bdh</u></td>
                                <td class='isi_bukti' align='center'><u>$row->nama_fiat</u></td>
                                <td class='isi_bukti' align='center'><u>$row->nama_user</u></td>
                            </tr>
                            <tr>
                            <td>&nbsp;</td>
                                <td class='isi_bukti' align='center'>NIP : $row->nik_bdh</td>
                                <td class='isi_bukti' align='center'>NIP : $row->nik_fiat</td>
                                <td class='isi_bukti' align='center'>NIP : $row->nik_user</td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td class='isi_laporan'>MODUL : KUG=06 </td>
                                <td colspan='2' class='isi_laporan'></td>
                                </tr>
                            <tr>
                                <td width='250' class='isi_laporan'>Lembar 1. Bendaharawan </td>
                                <td width='250' class='isi_laporan'>Lembar 2. Akuntansi </td>
                                <td width='250' class='isi_laporan'>Lembar 3. PP </td>
                            </tr>
                            </table></td>
                        </tr>
                        </table>";
                        echo "</div>";
                        }else{
                            $row = $rs->FetchNextObject($toupper=false);
                            $logo=$path."image/".$row->logo;
                            $alamat=$row->alamat;
                            $nama_lokasi=strtoupper($row->nama_lokasi);                        
                            echo"
                            <div class='row invoice-info' style=''>
                                <div class='col-sm-12 invoice-col'>
                                <address>
                                    <strong>SURAT PERINTAH BAYAR (SPB)</strong>
                                </address>
                                </div>
                                <!-- 1 -->
                                <div class='col-sm-12 invoice-col'>
                                <address style='margin-bottom: 20px;'>
                                    <strong>
                                    No SPB : $row->no_spb
                                    </strong>
                                </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom: 20px;'>
                                        <strong>
                                        BENDAHARAWAN DIMOHON UNTUK MEMBAYARKAN UANG SEBESAR 
                                        </strong>
                                    </address>
                                </div>
                                <!-- 2 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        RP : ".number_format($row->nilai,0,",",".")."
                                        </strong>
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address>
                                        <strong>
                                        ".terbilang($row->nilai)."
                                        </strong>
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address'>
                                        <strong>
                                        KEPADA :
                                        </strong>
                                        <br>
                                        $row->nama
                                    </address>
                                </div>
                                <!-- 3 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address>
                                        $row->alamat
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom: 20px;'>
                                        <strong>
                                        Untuk Pembayaran Kegiatan
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                <address style='margin-bottom: 20px;'>
                                   
                                    Dengan rincian sbb:
                                    
                                </address>
                                </div>
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>";
                        
                            $sql="select a.no_aju,a.tanggal,a.keterangan,convert(varchar,a.tanggal,103) as tgl,
                                isnull(b.nilai,0)+isnull(b.nilai2,0) as nilai,isnull(b.npajak,0) as npajak,isnull(b.nilai,0)+isnull(b.nilai2,0)-isnull(b.npajak,0)  as netto
                        from it_aju_m a 
                        left join (select a.no_aju,a.kode_lokasi,
                            sum(case when a.kode_akun in ('1132103','2121101','2121102','4960001','2121103','2121107') and a.dc='C' then a.nilai else 0 end) as npajak, 
                            sum(case when a.kode_akun not in ('1132103','2121101','2121102','4960001','2121103','2121107')  then a.nilai else 0 end) as nilai,
                            sum(case when a.kode_akun in ('1132103','2121101','2121102','4960001','2121103','2121107') and a.dc='D' then a.nilai else 0 end) as nilai2
                        from it_aju_d a
                        inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                        where b.no_spb='$row->no_spb' and b.kode_lokasi='$row->kode_lokasi'
                        group by a.no_aju,a.kode_lokasi
                                )b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                        where a.no_spb='$row->no_spb' and a.kode_lokasi='$row->kode_lokasi'
                        order by a.no_aju ";
                            
                                $rs1 = execute($sql);
                                $i=1;
                                $nilai=0;$pajak=0;$netto=0;

                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                            {
                                $nilai+=$row1->nilai;
                                $pajak+=$row1->npajak;
                                $netto+=$row1->netto;
                                echo"
                                <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                    <div class='box-comment'>
                                        <div class='comment-text' style='margin-left: 5px;'>
                                            <span class='username'>
                                                    $row1->tgl
                                                <span class='text-muted pull-right' style='font-size:14px'>Bruto : ".number_format($row1->nilai,0,",",".")."</span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    No Agenda : $row1->no_aju
                                                    <span class='text-muted pull-right' style='font-size:14px'>Pajak : ".number_format($row1->npajak,0,",",".")."</span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    $row1->keterangan
                                                    <span class='text-muted pull-right' style='font-size:14px'>Netto : ".number_format($row1->netto,0,",",".")."</span>
                                            </span><!-- /.username -->
                                             
                                        </div>
                                    </div>
                                </div>
                                ";
                                    $i=$i+1;
                            }
                            echo"
                            </div>
                            <!-- /.row -->"; 

                        }
                        break;
                        case "KAS" :
                        $sql="select a.no_kas,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,convert(varchar,a.tanggal,103) as tanggal1,a.keterangan,a.kode_lokasi,d.nama as nama_lokasi,
                            a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app,c.nama as nama_setuju,c.jabatan as jabatan_setuju,d.kota,a.nilai,d.logo,d.alamat
                        from kas_m a
                        inner join lokasi d on a.kode_lokasi=d.kode_lokasi
                        left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
                        left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.no_kas='$key' ";
                                
                                $rs = execute($sql);
                                	
                                $i=1;	
                                $logo = $path . "image/tu.jpg";
                        if($mobile == false){

                                echo "<div align='center'>";
                                while ($row = $rs->FetchNextObject($toupper=false))
                                {
                                    $logo=$path."image/".$row->logo;
                                    $alamat=$row->alamat;
                                    if (substr($row->no_kas,4,1)=="K")
                                    {
                                        $judul="BUKTI PENGELUARAN KAS / BANK";
                                        $format="KK / BK";
                                    }
                                    if (substr($row->no_kas,4,1)=="M")
                                    {
                                        $judul="BUKTI PENERIMAAN KAS / BANK";
                                        $format="KM / BM";
                                    }
                                echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                        <tr>
                            <td align='center'><img src='$logo' width='200' height='72'></td>
                        </tr>
                        <tr>
                            <td align='center' class='isi_laporan'>$alamat</td>
                        </tr>
                        <tr>
                            <td><hr /></td>
                        </tr>
                        <tr>
                            <td height='30' align='center' valign='middle' class='judul_bukti'>$judul</td>
                        </tr>

                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td width='178' class='istyle15' height='20'>$format</td>
                                <td width='612' class='istyle15'>: $row->no_kas</td>
                            </tr>
                            <tr>
                                <td width='178' class='istyle15' height='20'>Sudah Terima dari </td>
                                <td width='612' class='istyle15'>: $row->nama_lokasi </td>
                            </tr>
                            <tr>
                                <td class='istyle15' height='20'>Jumlah Tunai / Cek </td>
                                <td class='istyle15'>: ".number_format($row->nilai,0,",",".")."</td>
                            </tr>
                            <tr>
                                <td class='istyle15' height='20'>Terbilang</td>
                                <td class='istyle15'>: ".terbilang($row->nilai)." </td>
                            </tr>
                            <tr>
                                <td class='istyle15' height='20' valign='top'>Untuk Pembayaran </td>
                                <td class='istyle15'>: $row->keterangan </td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='900' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td width='471'>&nbsp;</td>
                                <td width='319'>$row->kota, ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>Yang Menerima </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td height='60'>&nbsp;</td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr><td height='70'>&nbsp;</td></tr>
                        <tr>
                            <td><table border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td width='100' class='istyle15' height='20'>No Bukti </td>
                                <td width='496' class='istyle15'>:&nbsp;$row->no_kas</td>
                            </tr>
                            <tr>
                                <td width='100' class='istyle15' height='20'>No Dokumen </td>
                                <td width='496' class='istyle15'>:&nbsp;$row->no_dokumen</td>
                            </tr>
                            <tr>
                                <td class='istyle15' height='20'>Periode</td>
                                <td class='istyle15'>:&nbsp;$row->periode</td>
                            </tr>
                            <tr>
                                <td class='istyle15' height='20'>Tanggal</td>
                                <td class='istyle15'>:&nbsp;$row->tanggal1</td>
                            </tr>
                            <tr>
                                <td class='istyle15' height='20' valign='top'>Keterangan </td>
                                <td class='istyle15'>:&nbsp;$row->keterangan</td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
                                        <tr bgcolor='#CCCCCC'>
                                        <td width='30' class='header_laporan' height='25' align='center'>No</td>
                                        
                                        <td width='60' class='header_laporan' align='center'>Akun</td>
                                        <td width='200' class='header_laporan' align='center'>Nama Akun </td>
                                        <td width='80' class='header_laporan' height='25' align='center'>No Dokumen</td>
                                        <td width='250' class='header_laporan' align='center'>Keterangan </td>
                                        <td width='40' class='header_laporan' align='center'>PP </td>
                                        <td width='60' class='header_laporan' align='center'>DRK </td>
                                        <td width='150' class='header_laporan' align='center'>Nama DRK </td>
                                        <td width='90' class='header_laporan' align='center'>Debet</td>
                                        <td width='90' class='header_laporan' align='center'>Kredit</td>
                                    </tr>";
                            $sql1="select a.kode_akun,a.no_dokumen,b.nama,a.keterangan,a.kode_pp,a.kode_drk,a.kode_cf,
                            isnull(c.nama,'-') as nama_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
                                    from kas_j a
                                    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun=substring('$row->periode',1,4)
                                    where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
                                    order by a.no_dokumen,a.no_urut ";
                                //error_log($sql1);
                                $rs1 = execute($sql1);
                                $i=1;
                                $tot_debet=0;
                                $tot_kredit=0;
                                while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                                    $debet=number_format($row1->debet,0,',','.');
                                    $kredit=number_format($row1->kredit,0,',','.');
                                    $tot_debet=$tot_debet+$row1->debet;
                                    $tot_kredit=$tot_kredit+$row1->kredit;
                                    echo "<tr>
                                        <td class='isi_laporan' align='center'>$i</td>
                                        <td class='isi_laporan'>$row1->kode_akun</td>
                                        <td class='isi_laporan'>$row1->nama</td>
                                        <td class='isi_laporan'>$row1->no_dokumen</td>
                                        <td class='isi_laporan'>$row1->keterangan</td>
                                        <td class='isi_laporan' align='center'>$row1->kode_pp</td>
                                        <td class='isi_laporan'>$row1->kode_drk</td>
                                        <td class='isi_laporan'>$row1->nama_drk</td>
                                        <td class='isi_laporan' align='right'>$debet</td>
                                        <td class='isi_laporan' align='right'>$kredit</td>
                                    </tr>";
                                        $i=$i+1;
                                }
                                $tot_debet1=number_format($tot_debet,0,',','.');
                                $tot_kredit1=number_format($tot_debet,0,',','.');
                            echo "<tr>
                        
                            <td colspan='8' class='istyle15' align='right'>Total &nbsp;</td>
                            <td class='istyle15' align='right'>$tot_debet1</td>
                            <td class='istyle15' align='right'>$tot_kredit1</td>
                        </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td align='right'><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr>
                                <td width='150' class='istyle15'>&nbsp;DIKERJAKAN</td>
                                <td width='159' class='istyle15'>&nbsp;</td>
                                <td width='133' class='istyle15'>&nbsp;DIREKAM</td>
                                <td width='140' class='istyle15'>&nbsp;DIPERIKSA</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td class='istyle15'>&nbsp;TGL</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td class='istyle15'>&nbsp;PARAF</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            </table></td>
                        </tr>
                        </table>";
                                    $i=$i+1;
                                }
                                echo "</div>";
                        }else{
                            $row = $rs->FetchNextObject($toupper=false);
                            $logo=$path."image/".$row->logo;
                            $alamat=$row->alamat;
                            if (substr($row->no_kas,4,1)=="K")
                            {
                                $judul="BUKTI PENGELUARAN KAS / BANK";
                                $format="KK / BK";
                            }
                            if (substr($row->no_kas,4,1)=="M")
                            {
                                $judul="BUKTI PENERIMAAN KAS / BANK";
                                $format="KM / BM";
                            }
                            echo"
                            <div class='row invoice-info' style=''>
                                <div class='col-sm-12 invoice-col'>
                                <address>
                                    <strong>$judul</strong>
                                </address>
                                </div>
                                <!-- 1 -->
                                <div class='col-sm-12 invoice-col'>
                                <address >
                                    <strong>
                                    KK / BK : $row->no_kas
                                    </strong>
                                </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Sudah diterima dari :
                                        </strong>
                                        <br>
                                        $row->nama
                                    </address>
                                </div>
                                <!-- 2 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Jumlah Tunai / Cek : 
                                        </strong>
                                        <br>
                                        ".number_format($row->nilai,0,",",".")."
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address>
                                        <strong>
                                        Terbilang :
                                        </strong>
                                        <br>
                                        ".terbilang($row->nilai)."
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom: 50px;'>
                                        <strong>
                                        Untuk Pembayaran
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                <address >
                                    <strong>
                                    No Bukti : $row->no_kas
                                    </strong>
                                </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        No Dokumen : $row->no_dokumen
                                        </strong>
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Periode : $row->periode
                                        </strong>
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Tgl : $row->tanggal1
                                        </strong>
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Untuk Pembayaran : 
                                        </strong><br>
                                        $row->keterangan
                                    </address>
                                </div>
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>";
                        
                            $sql1="select a.kode_akun,a.dc,a.no_dokumen,b.nama,a.keterangan,a.kode_pp,a.kode_drk,a.kode_cf,
                            isnull(c.nama,'-') as nama_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
                                    from kas_j a
                                    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun=substring('$row->periode',1,4)
                                    where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
                                    order by a.no_dokumen,a.no_urut ";
                                //error_log($sql1);
                                $rs1 = execute($sql1);
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
                                                    $row1->kode_akun - $row1->nama
                                                <span class='text-muted pull-right' style='font-size:14px'>$row1->dc</span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    Kode PP : $row1->kode_pp | Kode DRK : $row1->kode_drk
                                                    <span class='text-muted pull-right' style='font-size:14px'></span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    No Dokumen  : $row1->no_dokumen 
                                                    <span class='text-muted pull-right' style='font-size:14px'></span>
                                            </span><!-- /.username -->
                                            <span class='username'>
                                                    $row1->keterangan ";
                                                    if($row1->dc == "D"){
                                                        $nilai=$row1->debet;
                                                    }else{
                                                        $nilai=$row1->$kredit;
                                                    }
                                                    echo"
                                                    <span class='text-muted pull-right' style='font-size:14px'>".number_format($nilai,0,",",".")."</span>
                                            </span><!-- /.username -->
                                             
                                        </div>
                                    </div>
                                </div>
                                ";
                                    $i=$i+1;
                            }
                            echo"
                            </div>
                            <!-- /.row -->"; 


                        }
                        break;
                        case "GAR" :
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail</h3>
                        </div>
                        <div class='box-body'>";
                        $tahun=substr($periode,0,4);
                        $sql=" select a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,
                                isnull(e.agg_tw1,0) as agg_tw1,isnull(e.agg_tw2,0) as agg_tw2,isnull(e.agg_tw3,0) as agg_tw3,isnull(e.agg_tw4,0) as agg_tw4,isnull(e.total,0) as total
                        from (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
                                from anggaran_d x
                                inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi where x.kode_lokasi='$kode_lokasi' and x.kode_akun='$key' and x.kode_pp='$kode_pp'
                                group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk) a
                        inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                        inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
                        inner join drk d on a.kode_drk=d.kode_drk and d.tahun='$tahun' and a.kode_lokasi=d.kode_lokasi
                        left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
                                            , sum(case when substring(x.periode,5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw1
                                            , sum(case when substring(x.periode,5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw2
                                            , sum(case when substring(x.periode,5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw3
                                            , sum(case when substring(x.periode,5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw4
                                            , sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
                                    from anggaran_d x
                                    inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi where x.kode_lokasi='$kode_lokasi' and x.kode_akun='$key' and x.kode_pp='$kode_pp'
                                    group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk) e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi
                        order by a.kode_akun,a.kode_pp,a.kode_drk ";
                                
                              
                                $rs=execute($sql);	
                                $i = $start+1;
                            
                                
                                echo "<div align='center'>"; 
                                echo "<table class='table table-bordered table-striped' >
                                <thead>
                        <tr bgcolor='#CCCCCC'>
                        <td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
                        <td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
                        <td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
                        <td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
                        <td width='135' class='header_laporan'><div align='center'>Nama PP</div></td>
                            <td width='70'  class='header_laporan'><div align='center'>Kode DRK</div></td>
                            <td width='190' class='header_laporan'><div align='center'>Nama DRK </div></td>
                            <td width='90' class='header_laporan'><div align='center'>Triwulan I  </div></td>
                            <td width='90' class='header_laporan'><div align='center'>Triwulan II  </div></td>
                            <td width='90' class='header_laporan'><div align='center'>Triwulan III</div></td>
                            <td width='90' class='header_laporan'><div align='center'>Triwulan IV </div></td>
                            <td width='100' class='header_laporan'><div align='center'>Total</div></td>
                        </tr>
                        </thead>
                        <tbody>";
                                $i=$start+1;
                                $tw1=0;$tw2=0;$tw3=0;$tw4=0;$total=0;
                                while ($row = $rs->FetchNextObject($toupper=false))
                                {
                                    $tw1=$tw1+$row->agg_tw1;
                                    $tw2=$tw2+$row->agg_tw2;
                                    $tw3=$tw3+$row->agg_tw3;
                                    $tw4=$tw4+$row->agg_tw4;
                                    $total=$total+$row->total;
                                    echo "<tr>
                        <td height='23'  class='isi_laporan' align='center'>$i</td>
                        <td class='isi_laporan'>$row->kode_akun</td>
                        <td class='isi_laporan'>$row->nama_akun</td>
                        <td class='isi_laporan'>$row->kode_pp</td>
                        <td class='isi_laporan'>$row->nama_pp</td>
                        <td  class='isi_laporan'>$row->kode_drk</td>
                        <td class='isi_laporan'>$row->nama_drk</td>
                        <td class='isi_laporan' align='right'>".number_format($row->agg_tw1,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->agg_tw2,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->agg_tw3,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->agg_tw4,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
                        </tr>";
                                    
                                    $i=$i+1;
                                }
                                echo "<tr>
                            <td height='23' colspan='7' align='right'  class='isi_laporan'>Total&nbsp;</td>
                            <td class='isi_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
                            <td class='isi_laporan' align='right'>".number_format($tw2,0,',','.')."</td>
                            <td class='isi_laporan' align='right'>".number_format($tw3,0,',','.')."</td>
                            <td class='isi_laporan' align='right'>".number_format($tw4,0,',','.')."</td>
                            <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
                        </tr>";
                                echo "</tbody></table></div>";
                        break;
                        case "VER" :
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail</h3>
                        </div>
                        <div class='box-body'>";

                        $sql = "select a.periode,a.no_ver,a.kode_lokasi,b.keterangan,substring(a.periode,1,4) as tahun,d.kota,a.tanggal
                        from ver_m a
                        inner join lokasi d on a.kode_lokasi=d.kode_lokasi
						inner join it_aju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_ver='$key' and b.kode_pp='$kode_pp' and a.periode='$periode' order by a.no_ver ";

                        // echo $sql;

                        $rs2 = execute($sql);
                        $row = $rs2->FetchNextObject(false);

                        if($mobile == false){
                            
                        echo"
                            <div class='row invoice-info'>
                                <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Periode
                                    </strong><br>
                                    <strong>
                                    Tanggal
                                    </strong><br>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    Keterangan
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        $row->periode
                                        </strong><br>
                                        <strong>
                                        ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                        </strong><br>
                                        <strong>
                                        $row->no_ver
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                <table class='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th width='30' >NO</th>
                                        <th width='100' >STATUS</th>
                                        <th width='200' >NO BUKTI</th>
                                        <th width='60' >MODUL</th>
                                        <th width='100' >CATATAN</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    $sql1="select case a.status when '1' then 'APPROVE' else 'RETURN' end as status,a.no_bukti,a.modul,a.catatan
                                    from ver_d a
                                    where a.no_ver='$row->no_ver' and a.kode_lokasi='$row->kode_lokasi'
                                    ";
                                     
                                    $rs1 = execute($sql1);
                                    $i=1;
                                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                                    {
                                        
                                    echo "<tr>
                                            <td>$i</td>
                                            <td >$row1->status</td>
                                            <td >$row1->no_bukti</td>
                                            <td >$row1->modul</td>
                                            <td >$row1->catatan</td>
                                        </tr>";
                                            $i=$i+1;
                                    }
                                
                                    echo"
                                    </tbody>
                                </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <div class='row'>
                               
                            </div>
                            <!-- /.row -->";
                        }else{
                            echo"
                            <div class='row invoice-info' style=''>
                                <div class='col-sm-12 invoice-col'>
                                <address>
                                    <strong>Periode : </strong>
                                    $row->periode 
                                </address>
                                </div>
                                <!-- 1 -->
                                <div class='col-sm-12 invoice-col'>
                                <address >
                                    <strong>
                                    Tanggal : 
                                    </strong>
                                    ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        No Bukti :
                                        </strong>
                                        $row->no_ver
                                    </address>
                                </div>
                                <!-- 2 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Keterangan : 
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom : 20px'>
                                        <strong>
                                        Detail :
                                        </strong>
                                    </address>
                                </div>
                                
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>";
                            $sql1="select case a.status when '1' then 'APPROVE' else 'RETURN' end as status,a.no_bukti,a.modul,a.catatan
                            from ver_d a
                            where a.no_ver='$row->no_ver' and a.kode_lokasi='$row->kode_lokasi'
                            ";
                             
                            $rs1 = execute($sql1);
                            $i=1;
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                            {
                                
                                echo"
                                <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                    <div class='box-comment'>
                                        <div class='comment-text' style='margin-left: 5px;'>
                                            <span class='username'>
                                                    $row1->no_bukti - $row1->status
                                                <span class='text-muted pull-right' style='font-size:14px'>$row1->modul</span>
                                            </span><!-- /.username -->
                                            catatan : $row1->catatan
                                        </div>
                                    </div>
                                </div>
                                ";
                            }
                        }
                        break;
                        case "FIAT" :
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail</h3>
                        </div>
                        <div class='box-body'>";
                        
                        

                        $sql = "select a.periode,a.no_fiat,a.kode_lokasi,b.keterangan,substring(a.periode,1,4) as tahun,d.kota,a.tanggal
                        from fiat_m a
                        inner join lokasi d on a.kode_lokasi=d.kode_lokasi
						inner join it_aju_m b on a.no_fiat=b.no_fiat and a.kode_lokasi=b.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_fiat='$key' and b.kode_pp='$kode_pp' and a.periode='$periode'";

                        // echo $sql;

                        $rs2 = execute($sql);
                        $row = $rs2->FetchNextObject(false);
                        if($mobile == false){
                        echo"
                            <div class='row invoice-info'>
                                <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Periode
                                    </strong><br>
                                    <strong>
                                    Tanggal
                                    </strong><br>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    Keterangan
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        $row->periode
                                        </strong><br>
                                        <strong>
                                        ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                        </strong><br>
                                        <strong>
                                        $row->no_fiat
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                <table class='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th width='30' >NO</th>
                                        <th width='100' >STATUS</th>
                                        <th width='200' >NO BUKTI</th>
                                        <th width='60' >MODUL</th>
                                        <th width='100' >CATATAN</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    $sql1="select case a.status when '2' then 'APPROVE' else 'RETURN' end as status,a.no_bukti,a.modul,a.catatan
                                    from fiat_d a
                                    where a.no_fiat='$row->no_fiat' and a.kode_lokasi='$row->kode_lokasi'
                                    ";
                                     
                                    $rs1 = execute($sql1);
                                    $i=1;
                                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                                    {
                                        
                                    echo "<tr>
                                            <td>$i</td>
                                            <td >$row1->status</td>
                                            <td >$row1->no_bukti</td>
                                            <td >$row1->modul</td>
                                            <td >$row1->catatan</td>
                                        </tr>";
                                            $i=$i+1;
                                    }
                                
                                    echo"
                                    </tbody>
                                </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <div class='row'>
                               
                            </div>
                            <!-- /.row -->";
                        
                        }else{
                            echo"
                            <div class='row invoice-info' style=''>
                                <div class='col-sm-12 invoice-col'>
                                <address>
                                    <strong>Periode : </strong>
                                    $row->periode 
                                </address>
                                </div>
                                <!-- 1 -->
                                <div class='col-sm-12 invoice-col'>
                                <address >
                                    <strong>
                                    Tanggal : 
                                    </strong>
                                    ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        No Bukti :
                                        </strong>
                                        $row->no_fiat
                                    </address>
                                </div>
                                <!-- 2 -->
                                <div class='col-sm-12 invoice-col'>
                                    <address >
                                        <strong>
                                        Keterangan : 
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <div class='col-sm-12 invoice-col'>
                                    <address style='margin-bottom : 20px'>
                                        <strong>
                                        Detail :
                                        </strong>
                                    </address>
                                </div>
                                
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>";
                            $sql1="select case a.status when '2' then 'APPROVE' else 'RETURN' end as status,a.no_bukti,a.modul,a.catatan
                            from fiat_d a
                            where a.no_fiat='$row->no_fiat' and a.kode_lokasi='$row->kode_lokasi'
                            ";
                            
                            $rs1 = execute($sql1);
                            $i=1;
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                            {
                                
                                echo"
                                <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                    <div class='box-comment'>
                                        <div class='comment-text' style='margin-left: 5px;'>
                                            <span class='username'>
                                                    $row1->no_bukti - $row1->status
                                                <span class='text-muted pull-right' style='font-size:14px'>$row1->modul</span>
                                            </span><!-- /.username -->
                                            catatan : $row1->catatan
                                        </div>
                                    </div>
                                </div>
                                ";
                            }
                        }
                        break;
                        case "SPJ" :
                        $sql="select a.no_spj,a.kode_lokasi,a.nik_spj,a.kode_pp,a.nik_buat,b.nama as nama_pp,a.keterangan,
                        convert(varchar,a.tanggal,103) as tgl,c.jabatan,c.nama as nama_spj,d.nama as nama_buat,a.tanggal,
                        ISNULL(e.total,0) as total
                        from tu_pdaju_m a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        inner join karyawan c on a.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi
                        inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
                        left join (select a.no_spj,a.kode_lokasi,sum(a.total) as total 
                                   from tu_pdaju_d a
                                   where a.kode_lokasi='$kode_lokasi'
                                   group by a.no_spj,a.kode_lokasi
                                   )e on a.no_spj=e.no_spj and a.kode_lokasi=e.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_spj='$key'
                        order by a.no_spj
                        ";
                                
                                $rs = execute($sql);
                                	
                                $i=1;
                                echo "<div align='center'>"; 
                                $logo="image/tu.jpg";
                                $nilai=0;$nilai_ppn=0;$tagihan=0;
                                while ($row = $rs->FetchNextObject($toupper=false))
                                {
                                    $nilai=$nilai+$row->nilai;
                                echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                          <tr>
                            <td align='center'><img src='$logo' width='200' height='72'></td>
                          </tr>
                          <tr>
                            <td align='center' class='judul_bukti'>DAFTAR ONGKOS PERJALANAN DINAS (DOP)</td>
                          </tr>
                          <tr>
                            <td align='center'>Nomor DOP : </td>
                          </tr>
                          <tr>
                            <td align='center'>Nomor Sistem : $row->no_spj </td>
                          </tr>
                          <tr>
                            <td align='center'>Tanggal : $row->tgl </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>Harap dibayarkan uang sebesar : Rp. ".number_format($row->total,0,",",".")."</td>
                          </tr>
                          <tr>
                            <td>".terbilang($row->total)."</td>
                          </tr>
                          <tr>
                            <td>Kepada : </td>
                          </tr>
                          <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                              <tr>
                                <td width='25'>&nbsp;</td>
                                <td width='23'>1</td>
                                <td width='167'>Nama / NIP </td>
                                <td width='567'>: $row->nama_spj / $row->nik_spj </td>
                              </tr>
                              <tr>
                                <td>&nbsp;</td>
                                <td>2</td>
                                <td>Jabatan / Tingkat </td>
                                <td>: $row->jabatan </td>
                              </tr>
                              <tr>
                                <td>&nbsp;</td>
                                <td>3</td>
                                <td colspan='2'>Untuk biaya Perjalanan Dinas dengan Rincian sebagai berikut </td>
                                </tr>
                        
                            </table></td>
                          </tr>
                          <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                              <tr>
                                <td width='27'>&nbsp;</td>
                                <td width='23'>A</td>
                                <td width='201'>Uang Harian </td>
                                <td width='29'>&nbsp;</td>
                                <td width='26'>&nbsp;</td>
                                <td width='101'>&nbsp;</td>
                                <td width='363'>&nbsp;</td>
                              </tr>";
                               $sql="select a.kode_param,a.kode_lokasi,b.nama,a.jumlah,a.nilai,a.total
                        from tu_pdaju_d a
                        inner join tu_pd_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
                        where  a.no_spj='$row->no_spj' and a.kode_lokasi='$row->kode_lokasi' and b.jenis='1'
                        order by a.kode_param ";
                              $rs1 = execute($sql);
                              $j=1;
                              while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                              echo "<tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>$j. $row1->nama </td>
                                <td align='center'>: $row1->jumlah </td>
                                <td>X </td>
                                <td>".number_format($row1->nilai,0,",",".")."</td>
                                <td>".number_format($row1->total,0,",",".")."</td>
                              </tr>";
                                    $j=$j+1;
                                }
                              echo "<tr>
                                <td>&nbsp;</td>
                                <td width='23'>B</td>
                                <td width='201'>Transportasi</td>
                                <td width='29'>&nbsp;</td>
                                <td width='26'>&nbsp;</td>
                                <td width='101'>&nbsp;</td>
                                <td width='363'>&nbsp;</td>
                              </tr>";
                                $sql="select a.kode_param,a.kode_lokasi,b.nama,a.jumlah,a.nilai,a.total
                        from tu_pdaju_d a
                        inner join tu_pd_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
                        where a.no_spj='$row->no_spj' and a.kode_lokasi='$row->kode_lokasi' and b.jenis='2'
                        order by a.kode_param ";
                              $rs1 = execute($sql);
                              $j=1;
                              while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                              echo "<tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>$j. $row1->nama </td>
                                <td align='center'>: $row1->jumlah </td>
                                <td>X </td>
                                <td>".number_format($row1->nilai,0,",",".")."</td>
                                <td>".number_format($row1->total,0,",",".")."</td>
                              </tr>";
                                    $j=$j+1;
                                }
                            
                              echo "<tr>
                                <td>&nbsp;</td>
                                <td width='23'>A</td>
                                <td width='201'>Lain-Lain</td>
                                <td width='29'>&nbsp;</td>
                                <td width='26'>&nbsp;</td>
                                <td width='101'>&nbsp;</td>
                                <td width='363'>&nbsp;</td>
                              </tr>";
                             $sql="select a.kode_param,a.kode_lokasi,b.nama,a.jumlah,a.nilai,a.total
                        from tu_pdaju_d a
                        inner join tu_pd_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
                        where  a.no_spj='$row->no_spj' and a.kode_lokasi='$row->kode_lokasi' and b.jenis='3'
                        order by a.kode_param ";
                              $rs1 = execute($sql);
                              $j=1;
                              while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                              echo "<tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>$j. $row1->nama </td>
                                <td align='center'>: $row1->jumlah </td>
                                <td>X </td>
                                <td>".number_format($row1->nilai,0,",",".")."</td>
                                <td>".number_format($row1->total,0,",",".")."</td>
                              </tr>";
                                    $j=$j+1;
                                }
                            echo "</table></td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>".terbilang($row->total)."</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>Bandung , ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
                          </tr>
                          <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                              <tr>
                                <td width='217' align='center'>Pembuat Rincian </td>
                                <td width='248' align='center'>Fiatur</td>
                                <td width='321'>Telah terima uang sebesar : </td>
                              </tr>
                              <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>Rp. ".number_format($row->total,0,",",".")."</td>
                              </tr>
                              <tr>
                                <td height='60'>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                              </tr>
                              <tr>
                                <td align='center'>$row->nama_buat</td>
                                <td align='center'>&nbsp;</td>
                                <td>$row->nama_spj</td>
                              </tr>
                            </table></td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                        </table>
                        <DIV style='page-break-after:always'></DIV>";
                                
                                    $i=$i+1;
                                }
                                
                                echo "</table><br>";
                                echo "</div>";
                        break;
                        case "APD" :
                        $sql="select a.no_app,a.kode_lokasi,a.nik_buat,a.nik_app,b.nama as nama_app,c.nama as nama_buat,a.keterangan,
                        convert(varchar,a.tanggal,103) as tgl,c.jabatan as jab_buat,b.jabatan as jab_app,a.tanggal,
                        a.jenis,a.lama,a.kota,a.sarana,a.catatan,a.no_aju
                        from tu_pdapp_m a
                        inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi
                        inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_app='$key'
                        order by a.no_app
                        ";
                                
                                $rs = execute($sql);
                                	
                                $i=1;
                                echo "<div align='center'>"; 
                                $logo="image/tu.jpg";
                                $nilai=0;$nilai_ppn=0;$tagihan=0;
                                while ($row = $rs->FetchNextObject($toupper=false))
                                {
                                    $nilai=$nilai+$row->nilai;
                                echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                        <tr>
                            <td align='center'><img src='$logo' width='200' height='72'></td>
                        </tr>
                        <tr>
                            <td align='center' class='judul_bukti'>SURAT PERMOHONAN MELAKSANAKAN PERJALANAN DINAS (SPMD)</td>
                        </tr>
                        <tr>
                            <td align='center'>Nomor : $row->no_app </td>
                        </tr>
                        <tr>
                            <td align='center'>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Dengan ini kami mohon persetujuannya bagi pegawai yang namanya tersebut di bawah ini untuk diberika</td>
                        </tr>
                        <tr>
                            <td>Surat Perintah Perjalanan Dinas (SPPD) sebagai berikut :</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr>
                                <td width='24' align='center' class='header_laporan'>NO</td>
                                <td width='200' align='center' class='header_laporan'>NAMA/ NIP</td>
                                <td width='121' align='center' class='header_laporan'>TINGKAT/ JABATAN</td>
                                <td width='180' align='center' class='header_laporan'>LOKASI KERJA</td>
                                <td width='120' align='center' class='header_laporan'>Paraf Atasan Langsung Khusus Bagi Pegawai dari Lokasi Kerja Lain</td>
                                <td width='127' align='center' class='header_laporan'>KETERANGAN (Tarif SPPD) </td>
                            </tr>";
                            $sql="select a.no_spj,a.kode_lokasi,a.nik_spj,a.kode_pp,a.nik_buat,b.nama as nama_pp,a.keterangan,
                        convert(varchar,a.tanggal,103) as tgl,c.jabatan,c.nama as nama_spj,d.nama as nama_buat,ISNULL(e.total,0) as total
                        from tu_pdaju_m a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        inner join karyawan c on a.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi
                        inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
                        left join (select a.no_spj,a.kode_lokasi,sum(a.total) as total 
                                from tu_pdaju_d a
                                where a.kode_lokasi='11'
                                group by a.no_spj,a.kode_lokasi
                                )e on a.no_spj=e.no_spj and a.kode_lokasi=e.kode_lokasi
                        where a.kode_lokasi='$row->kode_lokasi' and a.no_app='$row->no_app'
                        order by a.no_spj ";

                            $rs1 = execute($sql);
                            $j=1; $total=0;
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                                    $total+=$row1->total;
                            echo "<tr>
                                <td class='isi_laporan' align='center'>$j</td>
                                <td class='isi_laporan'>$row1->nik_spj / $row1->nama_spj</td>
                                <td class='isi_laporan'>$row1->jabatan</td>
                                <td class='isi_laporan'>$row1->kode_pp / $row1->nama_pp</td>
                                <td class='isi_laporan'>&nbsp;</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->total,0,",",".")."</td>
                            </tr>";
                                    $j=$j+1;
                                }
                            echo "</table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td width='269'>Maksud Perjalanan Dinas</td>
                                <td width='521'>: $row->keterangan </td>
                            </tr>
                            <tr>
                                <td>Jenis Perjalanan Dinas</td>
                                <td>: $row->jenis </td>
                            </tr>
                            <tr>
                                <td>Lama Perjalanan Dinas</td>
                                <td>: $row->lama </td>
                            </tr>
                            <tr>
                                <td>Kota Tujuan</td>
                                <td>: $row->kota </td>
                            </tr>
                            <tr>
                                <td>Sarana Transportasi</td>
                                <td>: $row->sarana </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Catatan</td>
                                <td>: $row->catatan </td>
                            </tr>
                            <tr>
                                <td>Saldo Akhir  Beban Bang Lembaga</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Biaya yang diperlukan</td>
                                <td>: ".number_format($total,0,",",".")."</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td>Demikian permohonan kami dan atas persetujuannya diucapkan terimakasih.</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td width='172' align='center'>&nbsp;</td>
                                <td width='293' align='center'>Menyetujui/ Mengetahui</td>
                                <td width='321'>Bandung, ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td align='center'>a.n Rektor</td>
                                <td align='center'>Pemohon</td>
                            </tr>
                            <tr>
                                <td height='60'>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td align='center'>$row->nama_app</td>
                                <td align='center'>$row->nama_buat</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td align='center'>$row->jab_app</td>
                                <td align='center'>$row->jab_buat</td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        </table>";
                            echo "</table><br>";
                                    $i=$i+1;
                                    
                            echo "<DIV style='page-break-after:always'></DIV>";
                                
                                $sql="select a.no_aju,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
                                a.kode_drk,e.nama as nama_drk,
                                a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
                        from it_aju_m a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                        left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
                        left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
                        left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
                        where a.no_aju='$row->no_aju' 
                        order by a.no_aju";
                                
                                $rs = execute($sql);
                                $i=1;
                                $logo="image/tu.jpg";
                                $nilai=0;$nilai_ppn=0;$tagihan=0;
                                while ($row = $rs->FetchNextObject($toupper=false))
                                {
                                    $nilai=$nilai+$row->nilai;
                                echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
                        <tr>
                            <td align='center'><img src='$logo' width='200' height='72'></td>
                        </tr>
                        <tr>
                            <td align='center' class='isi_laporan'>Jl. Telekomunikasi Terusan Buah Batu, Bandung 40257 Indonesia, Telp: 62-22-756 4108; Fax: 62-22 7565 930</td>
                        </tr>
                        <tr>
                            <td><hr /></td>
                        </tr>
                        <tr>
                            <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN SPPD</td>
                        </tr>
                        
                        <tr>
                            <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
                        <tr>
                            <td><table width='100%'  border='0'>
                            <tr>
                                <td width='200'>No Pertanggungan</td>
                                <td width='600' class='judul_bukti'>$row->no_aju </td>
                            </tr>
                            <tr>
                                <td>Tanggal</td>
                                <td>: $row->tgl </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td width='200'>PP</td>
                                <td width='600'>: $row->kode_pp - $row->nama_pp </td>
                            </tr>
                            <tr>
                                <td>MTA</td>
                                <td>: $row->kode_akun - $row->nama_akun </td>
                            </tr>
                            <tr>
                                <td>DRK</td>
                                <td>: $row->kode_drk - $row->nama_drk </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Keterangan</td>
                                <td>: $row->keterangan </td>
                            </tr>
                            <tr>
                                <td>Nilai</td>
                                <td>: ".number_format($row->nilai,0,",",".")." </td>
                            </tr>
                            <tr>
                                <td>Terbilang</td>
                                <td>: ".terbilang($row->nilai)." </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            
                            </table></td>
                        </tr>
                        <tr>
                            <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr>
                                <td width='200' align='center' class='header_laporan'>Nama Rekening</td>
                                <td width='150' align='center' class='header_laporan'>No Rekening</td>
                                <td width='150' align='center' class='header_laporan'>Bank</td>
                                <td width='80' align='center' class='header_laporan'>Bruto</td>
                                <td width='80' align='center' class='header_laporan'>Pajak</td>
                                <td width='80' align='center' class='header_laporan'>Netto</td>
                            </tr>";
                            $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as nilai,isnull(pajak,0) as pajak,nilai as netto 
                        from it_aju_rek
                        where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi' 
                        order by no_rek";
                            $rs1 = execute($sql);
                            $nilai=0; $pajak=0; $netto=0;
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                                    $nilai+=$row1->nilai;
                                    $pajak+=$row1->pajak;
                                    $netto+=$row1->netto;
                            echo "<tr>
                                <td class='isi_laporan'>$row1->nama_rek</td>
                                <td class='isi_laporan'>$row1->no_rek</td>
                                <td class='isi_laporan'>$row1->bank</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
                            </tr>";
                                }
                                echo "<tr>
                                <td class='header_laporan' colspan='3' align='right'>Total</td>
                            
                                <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
                                <td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
                                <td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
                            </tr>";
                            echo "</table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr
                        <tr>
                            <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
                            <tr align='center'>
                                <td>&nbsp;</td>
                                <td colspan='2'>&nbsp;</td>
                                <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                            </tr>
                            <tr align='center'>
                                <td width='200'>Mengetahui/Menyetujui :</td>
                                <td width='200'>&nbsp;Fiatur</td>
                                <td width='200'>&nbsp;Verifikasi</td>
                                <td width='200'>&nbsp;</td>
                            </tr>
                            <tr align='center'>
                                <td >Ka .PP</td>
                                <td colspan='2' >&nbsp;</td>
                                <td >Dibuat Oleh,</td>
                            </tr>
                            
                            <tr align='center' valign='bottom'>
                                <td height='70' class='garis_bawah'>$row->nama_app</td>
                                <td>&nbsp;Nurlaela</td>
                                <td>&nbsp;Tiene Yaniwati</td>
                                <td class='garis_bawah'>$row->nama_user </td>
                            </tr>
                            <tr align='center' valign='bottom'>
                                <td>NIP : $row->nik_app</td>
                                <td colspan='2'>&nbsp;</td>
                                <td>NIP : $row->nik_user</td>
                            </tr>
                            </table></td>
                        </tr>
                        
                        
                        </table></td>
                        </tr>
                        </table><br>
                                    <DIV style='page-break-after:always'></DIV>";
                                    $i=$i+1;
                                }
                                
                                echo "</table><br>";
                                echo "<div style='page-break-after:always;'>";
                                $sql="select a.no_aju,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
                                a.kode_drk,e.nama as nama_drk,
                                a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
                        from it_aju_m a
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                        inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                        left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
                        left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
                        left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
                        where a.no_aju='$no_aju' and a.kode_lokasi='$kode_lokasi'
                        order by a.no_aju";
                                
                                $rs2 = execute($sql);
                                
                                $i=1;
                            
                                $logo="image/tu.jpg";
                                $nilai=0;$nilai_ppn=0;$tagihan=0;
                                while ($row2 = $rs2->FetchNextObject($toupper=false))
                                {
                                    $nilai=$nilai+$row2->nilai;
                                echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
                        <tr>
                            <td align='center'><img src='$logo' width='200' height='72'></td>
                        </tr>
                        <tr>
                            <td align='center' class='isi_laporan'>Jl. Telekomunikasi Terusan Buah Batu, Bandung 40257 Indonesia, Telp: 62-22-756 4108; Fax: 62-22 7565 930</td>
                        </tr>
                        <tr>
                            <td><hr /></td>
                        </tr>
                        <tr>
                            <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN BEBAN</td>
                        </tr>
                        
                        <tr>
                            <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
                        <tr>
                            <td><table width='100%'  border='0'>
                            <tr>
                                <td width='200'>No Pertanggungan</td>
                                <td width='600' class='judul_bukti'>$row2->no_aju </td>
                            </tr>
                            <tr>
                                <td>Tanggal</td>
                                <td>: $row2->tgl </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td width='200'>PP</td>
                                <td width='600'>: $row->kode_pp - $row->nama_pp </td>
                            </tr>
                            <tr>
                                <td>MTA</td>
                                <td>: $row->kode_akun - $row->nama_akun </td>
                            </tr>
                            <tr>
                                <td>DRK</td>
                                <td>: $row->kode_drk - $row->nama_drk </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>Keterangan</td>
                                <td>: $row->keterangan </td>
                            </tr>
                            <tr>
                                <td>Nilai</td>
                                <td>: ".number_format($row2->nilai,0,",",".")." </td>
                            </tr>
                            <tr>
                                <td>Terbilang</td>
                                <td>: ".terbilang($row2->nilai)." </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            
                            </table></td>
                        </tr>
                        <tr>
                            <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr>
                                <td width='200' align='center' class='header_laporan'>Nama Rekening</td>
                                <td width='150' align='center' class='header_laporan'>No Rekening</td>
                                <td width='150' align='center' class='header_laporan'>Bank</td>
                                <td width='80' align='center' class='header_laporan'>Bruto</td>
                                <td width='80' align='center' class='header_laporan'>Pajak</td>
                                <td width='80' align='center' class='header_laporan'>Netto</td>
                            </tr>";
                            $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as nilai,isnull(pajak,0) as pajak,nilai as netto 
                        from it_aju_rek
                        where no_aju='$row->no_aju' and kode_lokasi='$row->kode_lokasi' 
                        order by no_rek";
                            $rs1 = execute($sql);
                            $nilai=0; $pajak=0; $netto=0;
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                                    $nilai+=$row1->nilai;
                                    $pajak+=$row1->pajak;
                                    $netto+=$row1->netto;
                            echo "<tr>
                                <td class='isi_laporan'>$row1->nama_rek</td>
                                <td class='isi_laporan'>$row1->no_rek</td>
                                <td class='isi_laporan'>$row1->bank</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
                            </tr>";
                                }
                                echo "<tr>
                                <td class='header_laporan' colspan='3' align='right'>Total</td>
                            
                                <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
                                <td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
                                <td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
                            </tr>";
                            echo "</table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr
                        <tr>
                            <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
                            <tr align='center'>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td align='center'>Bandung, ".substr($row2->tanggal,8,2)." ".ubah_periode(substr(str_replace("-","",$row2->tanggal),0,6))."</td>
                            </tr>
                            <tr align='center'>
                                <td width='200'>Mengetahui/Menyetujui :</td>
                                <td width='400'>&nbsp;</td>
                                <td width='200'>&nbsp;</td>
                            </tr>
                            <tr align='center'>
                                <td >Ka .PP</td>
                                <td >&nbsp;</td>
                                <td >Dibuat Oleh,</td>
                            </tr>
                            
                            <tr align='center' valign='bottom'>
                                <td height='70' class='garis_bawah'>$row->nama_app</td>
                                <td>&nbsp;</td>
                                <td class='garis_bawah'>$row->nama_user </td>
                            </tr>
                            <tr align='center' valign='bottom'>
                                <td>NIP : $row->nik_app</td>
                                <td>&nbsp;</td>
                                <td>NIP : $row->nik_user</td>
                            </tr>
                            </table></td>
                        </tr>
                        
                        
                        </table></td>
                        </tr>
                        </table><br>
                                    <DIV style='page-break-after:always'></DIV>";
                                    $i=$i+1;
                                }
                                
                                echo "</table><br>";
                            
                            }
                                
                                
                                
                                
                                
                                echo "</div>";
                        break;
            }
            echo"</div>
            </div>";                
echo"   </div>
    </div>";
        
        echo"
        <script type='text/javascript'>

        </script>
        ";
        
	
?>
