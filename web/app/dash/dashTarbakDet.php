<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $sts_user=$_SESSION['userStatus'];

    $tmp=explode("|",$_GET['param']);
    $periode=$tmp[0];
    $kode_pp=$tmp[1];
    $box=$tmp[2];

    if($sts_user == "A"){
        $filter="";
    }else{
        $filter=" and nik='$nik' ";
    }

	echo "<div class='panel'>
			<div class='panel-body'>
				<div class='panel-heading' style='padding-left:0px'>
					<a href='fMain.php?hal=app/dash/dashTarbak.php' class='small-box-footer btn btn-default btn-sm' > Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "box0" :
                        if($sts_user == "A"){
                                echo"
                            <div class='box-header with-border'>
                                <h3 class='box-title'>Data Profile</h3>               
                            </div>
                            <div class='box-body'>
                            <div class='table-responsive '>
                                <table class='display' width='100%' id='table-klaim2'>
                                    <thead>
                                    <tr>
                                        <th style='text-align:center;width:5%'>No</th>
                                        <th style='text-align:center;width:15%'>NIK</th>
                                        <th style='text-align:center;width:25'>Status SDM</th>
                                        <th style='text-align:center;width:25%'>Status Jabatan</th>
                                        <th style='text-align:center;width:30%'>Lokasi Kerja</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    $sql = "select a.nik,a.nama,a.kode_sdm,c.nama as nama_sdm, a.kode_jab,b.nama as nama_jab,d.nama as nama_loker from hr_karyawan a
                                    left join hr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi
                                    left join hr_sdm c on a.kode_sdm=c.kode_sdm and a.kode_lokasi=c.kode_lokasi
                                    left join hr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi'
                                    ";
                                    
                                    // echo $sql;
                                    
                                    $rs2 = execute($sql);               
                                    $i=1;
                                    while ($row = $rs2->FetchNextObject($toupper=false))
                                    {
                                echo "<tr>
                                        <td  align='center'>$i</td>
                                        <td><a style='cursor:pointer;color:blue' href='#' onclick=\"window.location.href='fMain.php?hal=app/dash/dashTarbakDet2.php&param=$periode|$kode_pp|$box|$row->nik';\" >$row->nik</a></td>
                                        <td >$row->nama_sdm</td>
                                        <td >$row->nama_jab</td>
                                        <td >$row->nama_loker</td>
                                    </tr>";
                                        $i=$i+1;
                                    }

                                    echo
                                    "</tbody>
                                </table>
                                </div>
                            </div>";
                        }else{
                        $sql="select a.nik, a.kode_lokasi, a.nama, a.alamat, a.no_telp, a.email, a.kode_pp, a.npwp, a.bank, a.cabang, a.no_rek, a.nama_rek, a.grade, 
                        a.kota, a.kode_pos, a.no_hp, a.flag_aktif, a.foto,g.nama as nama_agama,h.nama as nama_unit,i.nama as nama_profesi,kode_pajak
                        ,b.nama as nama_pp,c.nama as nama_gol,d.nama as nama_jab,e.nama as nama_sdm,f.nama as nama_loker,
                        a.tempat, convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.tahun_masuk,
                        a.npwp, a.bank, a.cabang, a.no_rek, a.nama_rek,
                        case when a.jk='L' then 'Laki-Laki' else 'Perempuan' end as jk,
                        a.no_sk,convert(varchar,a.tgl_sk,103) as tgl_sk,a.gelar_depan,a.gelar_belakang,
                        convert(varchar,a.tgl_nikah,103) as tgl_nikah,a.gol_darah,a.no_kk,a.kelurahan,a.kecamatan,a.ibu_kandung,
                        a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir ,
                        case when a.status_nikah='0' then 'Tidak' else 'Ya' end as status_nikah
                        from hr_karyawan a 
                        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  
                        inner join hr_gol c on a.kode_gol=c.kode_gol and a.kode_lokasi=c.kode_lokasi 
                        inner join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi 
                        inner join hr_sdm e on a.kode_sdm=e.kode_sdm and a.kode_lokasi=e.kode_lokasi 
                        inner join hr_loker f on a.kode_loker=f.kode_loker and a.kode_lokasi=f.kode_lokasi 
                        inner join hr_agama g on a.kode_agama=g.kode_agama and a.kode_lokasi=g.kode_lokasi
                        inner join hr_unit h on a.kode_unit=h.kode_unit and a.kode_lokasi=h.kode_lokasi
                        inner join hr_profesi i on a.kode_profesi=i.kode_profesi and a.kode_lokasi=i.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.nik='$nik'
                        order by a.nik ";
                        
                        $rs = execute($sql);
                        $i = 1;
                        echo "<div align='center'>"; 
                        
                        $row = $rs->FetchNextObject($toupper=false);
                        
                        $path = "http://".$_SERVER["SERVER_NAME"]."/";				
                        $pathfoto = $path . "server/media/".$row->foto;
                            echo "<table class='table table-bordered' >
                            <tr>
                              <td><table class='table'>
                                <tr>
                                  <td align='center' style='font-size:14px;border-top:1px solid white;border-bottom:1px solid white'><b>CURICULUM VITAE KARYAWAN</b> </td>
                                </tr>
                                <tr>
                                  <td><table class='table table-striped table-condensed'>
                                    <tr>
                            <td width='154' class='isi_bukti'>NIK</td>
                            <td width='374' class='isi_bukti'>: $row->nik </td>
                            <td width='162' rowspan='13' align='left' valign='top'><img src='$pathfoto' width='160' height='180' /></td>
                        </tr>
                        <tr>
                            <td class='isi_bukti'>Nama</td>
                            <td class='isi_bukti'>: $row->gelar_depan $row->nama $row->gelar_belakang</td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Jenis Kelamin </td>
                            <td class='isi_bukti'>: $row->jk </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Agama</td>
                            <td class='isi_bukti'>: $row->nama_agama </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Tempat , Tanggal Lahir</td>
                            <td class='isi_bukti'>: $row->tempat , $row->tgl_lahir</td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Status Pajak </td>
                            <td class='isi_bukti'>: $row->kode_pajak </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>No NPWP </td>
                            <td class='isi_bukti'>: $row->npwp </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Alamat</td>
                            <td class='isi_bukti'>: $row->alamat </td>
                            </tr>
                        <tr>
                            <td>Kota</td>
                            <td>: $row->kota </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Kode Pos </td>
                            <td class='isi_bukti'>: $row->kode_pos </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>No Telp </td>
                            <td class='isi_bukti'>: $row->no_telp </td>
                        
                        </tr>
                        <tr>
                            <td class='isi_bukti'>No HP </td>
                            <td class='isi_bukti'>: $row->no_hp </td>
                            
                        </tr>
                        <tr>
                            <td class='isi_bukti'>Email</td>
                            <td class='isi_bukti'>: $row->email </td>
                        
                        </tr>
                        <tr>
                            <td class='isi_bukti'>NPWP</td>
                            <td class='isi_bukti'>: $row->npwp </td>
                        
                        </tr>
                        <tr>
                            <td class='isi_bukti'>Bank</td>
                            <td class='isi_bukti'>: $row->bank </td>
                        
                        </tr>
                        <tr>
                            <td class='isi_bukti'>Cabang</td>
                            <td class='isi_bukti'>: $row->cabang </td>
                        
                        </tr>
                        <tr>
                            <td class='isi_bukti'>No Rekening</td>
                            <td class='isi_bukti'>: $row->no_rek </td>
                        
                        </tr>
                            <tr>
                            <td class='isi_bukti'>Nama Rekening</td>
                            <td class='isi_bukti'>: $row->nama_rek </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>No SK</td>
                            <td class='isi_bukti'>: $row->no_sk </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Tanggal SK</td>
                            <td class='isi_bukti'>: $row->tgl_sk </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Status Nikah</td>
                            <td class='isi_bukti'>: $row->status_nikah </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Tanggal Nikah</td>
                            <td class='isi_bukti'>: $row->tgl_nikah </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Golongan Darah</td>
                            <td class='isi_bukti'>: $row->gol_darah </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Ibu Kandung </td>
                            <td class='isi_bukti'>: $row->ibu_kandung </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Nomor KK </td>
                            <td class='isi_bukti'>: $row->no_kk </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Kelurahan </td>
                            <td class='isi_bukti'>: $row->kelurahan </td>
                            </tr>
                            <tr>
                            <td class='isi_bukti'>Kecamatan </td>
                            <td class='isi_bukti'>: $row->kecamatan </td>
                            </tr>
                            
                            
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th style='border-top:1px solid white;border-bottom:1px solid white' >POSISI SEKARANG </th>
                    </tr>
                    <tr>
                        <td><table class='table table-striped table-condensed'>
                        <tr>
                            <td width='154' class='isi_bukti'>Status Karyawan </td>
                            <td width='536' class='isi_bukti'>: $row->nama_sdm</td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Jabatan</td>
                            <td class='isi_bukti'>: $row->nama_jab</td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Golongan</td>
                            <td class='isi_bukti'>: $row->nama_gol</td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Lokasi Kerja </td>
                            <td class='isi_bukti'>: $row->nama_loker </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>PP</td>
                            <td class='isi_bukti'>: $row->nama_pp </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Unit</td>
                            <td class='isi_bukti'>: $row->nama_unit </td>
                            </tr>
                        <tr>
                            <td class='isi_bukti'>Profesi</td>
                            <td class='isi_bukti'>: $row->nama_profesi</td>
                            </tr>
                        
                        </table></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th style='border-top:1px solid white;border-bottom:1px solid white' >DATA KELUARGA </th>
                    </tr>
                    <tr>
                        <td><table class='table table-bordered table-striped table-condensed'>
                        <thead><tr>
                        <td width='200' class='isi_bukti'>Nama</td>
                            <td width='60' class='isi_bukti'>Status</td>
                            <td width='60' class='isi_bukti'>Jenis Kelamin</td>
                            <td width='60' class='isi_bukti'>Tanggungan</td>
                            <td width='150' class='isi_bukti'>Tempat Lahir </td>
                            <td width='60' class='isi_bukti'>Tgl Lahir</td>
                            
                        </tr>
                        </thead>
                        <tbody>";
                        $sql1="select  nik, kode_lokasi, nu, jenis, nama, jk, tempat, convert(varchar,tgl_lahir,103) as tgl_lahir	, status_kes, foto
                            from hr_keluarga 
                            where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi'";
                        $rs1 = execute($sql1);
                        $tot_pot=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                        echo "<tr>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->jenis</td>
                            <td class='isi_bukti' align='center' class='isi_bukti'>$row1->jk</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->status_kes</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tempat</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tgl_lahir</td>
                        </tr>";
                        }  
                        echo "</tbody></table></td>
                    </tr>
                    
                        <td>&nbsp;</td>
                    </tr>
                    
                    <tr>
                        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT KEDINASAN </th>
                    </tr>
                    <tr>
                        <td><table class='table table-bordered table-striped table-condensed'>
                        <thead><tr >
                            <td width='150' class='isi_bukti'>No SK</td>
                            <td width='60' class='isi_bukti'>Tanggal</td>
                            <td width='300' class='isi_bukti'>Keterangan</td>
                        </tr>
                        </thead>
                        <tbody>";
                        
                        $sql1="select  no_sk,nama, convert(varchar,tgl_sk,103) as tgl	
                            from hr_sk
                            where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tgl_sk desc";
                        $rs1 = execute($sql1);
                        $tot_pot=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                        
                        echo "<tr>
                            <td class='isi_bukti' class='isi_bukti'>$row1->no_sk</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
                        </tr>";
                        }  
                        echo "</tbody></table></td>
                    </tr>
                    
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th style='border-top:1px solid white;border-bottom:1px solid white' >RIWAYAT PENDIDIKAN </th>
                    </tr>
                    <tr>
                        <td><table class='table table-bordered table-striped table-condensed'>
                        <thead>
                        <tr>
                            <td width='200' class='isi_bukti'>Nama</td>
                            <td width='60' class='isi_bukti'>Tahun</td>
                            <td width='150' class='isi_bukti'>Strata</td>
                            <td width='150' class='isi_bukti'>Jurusan</td>
                            
                        </tr></thead>
                        <tbody>";
                        
                        $sql1="select a.nama, a.tahun, a.setifikat, a.kode_jurusan,a.kode_strata,b.nama as nama_jur,c.nama as nama_strata
                from hr_pendidikan a
                inner join hr_jur b on a.kode_jurusan=b.kode_jur and a.kode_lokasi=b.kode_lokasi
                inner join hr_strata c on a.kode_strata=c.kode_strata and a.kode_lokasi=c.kode_lokasi
                where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by tahun desc";
                        $rs1 = execute($sql1);
                        $tot_pot=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                        
                        echo "<tr>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tahun</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama_strata</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama_jur</td>
                        </tr>";
                        }  
                        echo "</tbody></table></td>
                    </tr>
                    
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT PELATIHAN </th>
                    </tr>
                    <tr>
                        <td><table class='table table-bordered table-striped table-condensed'>
                        <thead>
                        <tr>
                            <td width='200' class='isi_bukti'>Nama</td>
                            <td width='200' class='isi_bukti'>Penyelenggara</td>
                            <td width='60' class='isi_bukti'>Tgl Mulai</td>
                            <td width='60' class='isi_bukti'>Tgl Selesai</td>
                            
                        </tr>
                        </thead>
                        <tbody>";
                        
                        $sql1="select nama, panitia, convert(varchar,tgl_mulai,103) as tgl, convert(varchar,tgl_selesai,103) as tgl_selesai
                from hr_pelatihan
                where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tgl_mulai desc";
                        $rs1 = execute($sql1);
                        $tot_pot=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                        
                        echo "<tr>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->panitia</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tgl_selesai</td>
                        </tr>";
                        }  
                        echo "</tbody></table></td>
                    </tr>
                    
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT PENGHARGAAN </th>
                    </tr>
                    <tr>
                        <td><table class='table table-bordered table-striped table-condensed'>
                        <thead>
                          <tr>
                            <td width='200' class='isi_bukti'>Nama</td>
                            <td width='200' class='isi_bukti'>Penyelenggara</td>
                            <td width='60' class='isi_bukti'>Tgl Mulai</td>
                            <td width='60' class='isi_bukti'>Tgl Selesai</td>
                            
                        </tr>
                        </thead>
                        <tbody>";
                        
                        $sql1="select nama, convert(varchar,tanggal,103) as tgl
                from hr_penghargaan
                where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tanggal desc";
                        $rs1 = execute($sql1);
                        $tot_pot=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                        
                        echo "<tr>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
                        </tr>";
                        }  
                        echo "</tbody></table></td>
                    </tr>
                    
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT SANKSI </th>
                    </tr>
                    <tr>
                        <td><table class='table table-bordered table-striped table-condensed'>
                        <thead>
                          <tr>
                            <td width='150' class='isi_bukti'>Jenis</td>
                            <td width='60' class='isi_bukti'>Tanggal</td>
                            <td width='200' class='isi_bukti'>Keterangan</td>
                            
                        </tr>
                        </thead>
                        <tbody>";
                        
                        $sql1="select nama, jenis,convert(varchar,tanggal,103) as tgl
                        from hr_sanksi
                        where nik = '$row->nik' and kode_lokasi='$row->kode_lokasi' order by tanggal desc";
                        $rs1 = execute($sql1);
                        $tot_pot=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                        
                        echo "<tr>
                            <td class='isi_bukti' class='isi_bukti'>$row1->jenis</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->tgl</td>
                            <td class='isi_bukti' class='isi_bukti'>$row1->nama</td>
                        </tr>";
                        }  
                        echo "</tbody></table></td>
                    </tr>
                    
                        <td>&nbsp;</td>
                    </tr>
                    </table><br>";	 
                    
                        echo "</div>";
                        }
                       
                        
                        break;
                        case "box1" :
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-book'></i>
                            <h3 class='box-title'>Absensi</h3>
                        </div>
                        <div class='box-body'>";
                        echo"<div class='row invoice-info'>";

                            // if($tmp[10] == "semua"){
                           
                            // }else{
                                $sql="select * from hr_karyawan where nik='$nik' and kode_lokasi='$kode_lokasi' ";
                                
                                $per="201906";
                            // }

                                // echo $sql;

                                $rs=execute($sql);
                                $row = $rs->FetchNextObject($toupper=false);
                                echo"
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            NIK
                                            </strong>
                                            <br>
                                            Nama
                                        </address>
                                    </div>
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            <a style='cursor:pointer;' onclick=\"window.location.href='fMain.php?hal=app/dash/dashTarbakDet2.php&param=$periode|$kode_pp|$box|$row->nik';\" >$row->nik</a>
                                            </strong>
                                            <br>
                                            $row->nama
                                        </address>
                                    </div>
                                    <div class='col-sm-12 invoice-col' style='padding-top:10px'>
                                    <!--<a class='btn btn-primary btn-sm' id='btnTampil' onclick=\"window.location.href='fMain.php?hal=app/dash/dashTarbakDet.php&param=$periode|$kode_pp|$box|semua';\">Tampil Semua</a>-->
                                    </div>
                                </div>
                            </div> 
                            <div class='row'>";
                            
                            // if($tmp[10] == "semua"){
                                
                            // }else{
                            $sql="select count(case when status = '1' then nik end) n1,
                                        count(case when status = '2' then nik end) n2,
                                        count(case when status = '3' then nik end) n3,
                                        count(case when status = '4' then nik end) n4,
                                        count(case when status = '5' then nik end) n5
                                 from hr_absen
                                 where kode_lokasi='$kode_lokasi' and nik='$nik' and substring(convert(varchar,tanggal,112),1,6) = '201906' ";
                            
                            $rs1 = execute($sql);
                        
                            $row1= $rs1->FetchNextObject($toupper=false);

                            $sql = "select sum(datediff(hh, jam_datang, jam_pulang)) as nto from hr_absen where kode_lokasi='$kode_lokasi' and nik='$nik' and substring(convert(varchar,tanggal,112),1,6) = '201906' ";
                            $rs2 = execute($sql);

                            $row2= $rs2->FetchNextObject($toupper=false);

                            echo"
                            <div class='col-xs-12 table-responsive'>
                            <table class='table no-margin'>
                                <tr>
                                    <td>Jumlah Kehadiran</td>
                                    <td>$row1->n1</td>
                                    <td>hari</td>
                                    <td>Tidak Hadir</td>
                                    <td></td>
                                    <td>hari</td>
                                </tr>
                                <tr>
                                    <td>Sakit</td>
                                    <td>$row1->n2</td>
                                    <td>hari</td>
                                    <td>Izin</td>
                                    <td>$row1->n3</td>
                                    <td>hari</td>
                                </tr>
                                <tr>
                                    <td>Cuti</td>
                                    <td>$row1->n4</td>
                                    <td>hari</td>
                                    <td>Dinas</td>
                                    <td>$row1->n5</td>
                                    <td>hari</td>
                                </tr>
                                <tr>
                                    <td>Total Jam Kerja</td>
                                    <td></td>
                                    <td>$row2->nto</td>
                                    <td>Jam</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Total Kelebihan Jam</td>
                                    <td></td>
                                    <td></td>
                                    <td>Jam</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                            </div>";     
                            echo"</div>
                            </div>";    
                        break;
                        case "box2" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Data Pelatihan</h3>               
                        </div>
                        <div class='box-body'>
                        <div class='table-responsive '>
                            <table class='display' width='100%' id='table-klaim2'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;width:5%'>No</th>
                                    <th style='text-align:center;width:15%'>NIK</th>
                                    <th style='text-align:center;width:30%'>Nama Pelatihan</th>
                                    <th style='text-align:center;width:20%'>Penyelenggara</th>
                                    <th style='text-align:center;width:10%'>Tgl Mulai</th>
                                    <th style='text-align:center;width:10%'>Tgl Selesai</th>
                                    <th style='text-align:center;width:10%'>Dokumen</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select *,convert(varchar,tgl_mulai,23) as tglm,convert(varchar,tgl_selesai,23) as tgls from hr_pelatihan 
                                where kode_lokasi='$kode_lokasi' $filter
                                 ";
                                
                                // echo $sql;
								
                                $rs2 = execute($sql);                              
                                
                                $i=1;
                                while ($row = $rs2->FetchNextObject($toupper=false))
                                {
                            echo "<tr>
                                    <td  align='center'>$i</td>
                                    <td> $row->nik</td>
                                    <td >$row->nama</td>
                                    <td >$row->panitia</td>
                                    <td >$row->tglm</td>
                                    <td >$row->tgls</td>
                                    <td >$row->setifikat</td>
                                 </tr>";
                                    $i=$i+1;
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";

                        break;
                        case "box3" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Data Penghargaan</h3>               
                        </div>
                        <div class='box-body'>
                        <div class='table-responsive '>
                            <table class='display' width='100%' id='table-klaim2'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;width:5%'>No</th>
                                    <th style='text-align:center;width:25%'>NIK</th>
                                    <th style='text-align:center;width:30%'>Nama</th>
                                    <th style='text-align:center;width:20%'>Tanggal</th>
                                    <th style='text-align:center;width:20%'>Dokumen</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select *,convert(varchar,tanggal,23) as tgl from hr_penghargaan
                                where kode_lokasi='$kode_lokasi' $filter
                                 ";
                                
                                // echo $sql;
								
                                $rs2 = execute($sql);                              
                                
                                $i=1;
                                while ($row = $rs2->FetchNextObject($toupper=false))
                                {
                            echo "<tr>
                                    <td  align='center'>$i</td>
                                    <td> $row->nik</td>
                                    <td >$row->nama</td>
                                    <td >$row->tgl</td>
                                    <td >$row->sertifikat</td>
                                 </tr>";
                                    $i=$i+1;
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "box4" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Data Sanksi</h3>               
                        </div>
                        <div class='box-body'>
                        <div class='table-responsive '>
                            <table class='display' width='100%' id='table-klaim2'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;width:5%'>No</th>
                                    <th style='text-align:center;width:25%'>NIK</th>
                                    <th style='text-align:center;width:40%'>Nama</th>
                                    <th style='text-align:center;width:15%'>Tanggal</th>
                                    <th style='text-align:center;width:15%'>Jenis</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select *,convert(varchar,tanggal,23) as tgl from hr_sanksi
                                where kode_lokasi='$kode_lokasi' $filter
                                 ";
                                
                                // echo $sql;
								
                                $rs2 = execute($sql);                              
                                
                                $i=1;
                                while ($row = $rs2->FetchNextObject($toupper=false))
                                {
                            echo "<tr>
                                    <td  align='center'>$i</td>
                                    <td> $row->nik</td>
                                    <td >$row->nama</td>
                                    <td >$row->tgl</td>
                                    <td >$row->jenis</td>
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
