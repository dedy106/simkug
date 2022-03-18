<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashSiagaHris2Det extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $box=$tmp[4];
        $kunci=$tmp[5];
        
        // echo $box;
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2','','$kode_lokasi/$periode/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "k1" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Karyawan</h3>                      
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>NIK </th>
                                    <th style='text-align:center;'>Nama </th>
                                    <th style='text-align:center;'>Jabatan</th>
                                    <th style='text-align:center;'>No Telp</th>
                                    <th style='text-align:center;'>Email </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select * from gr_karyawan where kode_lokasi='$kode_lokasi' and flag_aktif='0' ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2CV','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->nik');\" >$row->nik</a></td>
                                        <td>$row->nama</td>
                                        <td>$row->kode_jab</td>
                                        <td>$row->no_telp</td>
                                        <td>$row->email</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "k2" :
                           if($kunci =="0"){
                                $judul ="Data Pengajuan";
                           }else if($kunci =="1"){
                                $judul ="Data Verifikasi";
                           }else if($kunci =="2"){
                            $judul ="Data Approval";
                           }else if($kunci =="3"){
                                $judul ="Data Pembayaran";
                           }
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>".$judul."</h3>           
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pengajuan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Modul </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>NIK</th>
                                    <th style='text-align:center;'>Nama </th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_spj as no_bukti,'SPPD' as modul,convert(varchar,a.tanggal,103) as tanggal,a.nik_buat as nik,c.nama,a.keterangan,a.transport+a.harian as nilai
                                from gr_spj_m a 
                                left join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi 
                                left join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
                                left join gr_status_spj d on a.sts_spj=d.sts_spj and a.kode_lokasi=d.kode_lokasi 
                                where a.progress = '$kunci' and a.kode_lokasi='$kode_lokasi'
                                union all
                                select a.no_kes as no_bukti,'Benefit' as modul,convert(varchar,a.tanggal,103) as tanggal,a.nik_buat as nik,c.nama,a.keterangan,isnull(x.nilai,0) as nilai  
                                from gr_kes_m a 
                                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
                                inner join gr_jab cc on c.kode_jab=cc.kode_jab and cc.kode_lokasi=c.kode_lokasi 
                                inner join gr_klpjab b on cc.kode_klpjab=b.kode_klpjab and cc.kode_lokasi=b.kode_lokasi 
                                inner join (select no_kes,kode_lokasi,sum(nilai) as nilai 
                                            from gr_kes_d group by no_kes,kode_lokasi 
                                            ) x on x.no_kes=a.no_kes and a.kode_lokasi=x.kode_lokasi 
                                where a.progress = '$kunci' and a.kode_lokasi='$kode_lokasi'
                                union all
                                select a.no_klaim as no_bukti,'Klaim' as modul,convert(varchar,a.tanggal,103) as tanggal,a.nik_buat as nik,c.nama,a.keterangan,isnull(x.nilai,0) as nilai  
                                from gr_klaim_m a 
                                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
                                inner join gr_jab cc on c.kode_jab=cc.kode_jab and cc.kode_lokasi=c.kode_lokasi 
                                inner join gr_klpjab b on cc.kode_klpjab=b.kode_klpjab and cc.kode_lokasi=b.kode_lokasi 
                                inner join gr_asur d on d.kode_asur=a.kode_asur and a.kode_lokasi=d.kode_lokasi 
                                inner join (select no_klaim,kode_lokasi,sum(nilai) as nilai 
                                            from gr_klaim_d group by no_klaim,kode_lokasi 
                                            ) x on x.no_klaim=a.no_klaim and a.kode_lokasi=x.kode_lokasi 
                                where a.progress = '$kunci' and a.kode_lokasi='$kode_lokasi'   ";                                            
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>";
                                    if($row->modul=="sppd"){
                                   echo"
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2DetSpj','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->no_bukti/');\" >$row->no_bukti</a></td>";
                                    }else if($row->modul=="benefit"){
                                    echo"
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2DetBenefit','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->no_bukti/');\" >$row->no_bukti</a></td>";
                                    }else{
                                        echo"
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2DetKlaim','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->no_bukti/');\" >$row->no_bukti</a></td>";
                                    }
                                    echo"
                                        <td>$row->modul</td>
                                        <td>$row->tanggal</td>
                                        <td>$row->nik</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>".number_format($row->nilai,0,",",".")."</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k3" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Verifikasi</h3>           
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-quo'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Tanggal </th>
                                    <th style='text-align:center;'>Loker</th>
                                    <th style='text-align:center;'>NIK Buat</th>
                                    <th style='text-align:center;'>Nama </th>
                                   <th style='text-align:center;'>Keterangan</th>
                                   <th style='text-align:center;'>Transport</th>
                                   <th style='text-align:center;'>Harian</th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_spj,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat,c.nama,a.keterangan,a.transport,a.harian,a.progress  
                                from gr_spj_m a 
                                left join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi 
                                left join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
                                left join gr_status_spj d on a.sts_spj=d.sts_spj and a.kode_lokasi=d.kode_lokasi 
                                where a.kode_lokasi='$kode_lokasi' and a.progress='$kunci'   ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2DetSpj','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->no_spj/');\" >$row->no_spj</a></td>
                                        <td>$row->tanggal</td>
                                        <td>$row->loker</td>
                                        <td>$row->nik_buat</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->transport</td>
                                        <td>$row->harian</td>
                                        <td>$row->progress</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k4" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Approval</h3>           
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-quo'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Tanggal </th>
                                    <th style='text-align:center;'>Loker</th>
                                    <th style='text-align:center;'>NIK Buat</th>
                                    <th style='text-align:center;'>Nama </th>
                                   <th style='text-align:center;'>Keterangan</th>
                                   <th style='text-align:center;'>Transport</th>
                                   <th style='text-align:center;'>Harian</th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_spj,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat,c.nama,a.keterangan,a.transport,a.harian,a.progress  
                                from gr_spj_m a 
                                left join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi 
                                left join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
                                left join gr_status_spj d on a.sts_spj=d.sts_spj and a.kode_lokasi=d.kode_lokasi 
                                where a.kode_lokasi='$kode_lokasi' and a.progress='$kunci'  ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2DetSpj','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->no_spj/');\" >$row->no_spj</a></td>
                                        <td>$row->tanggal</td>
                                        <td>$row->loker</td>
                                        <td>$row->nik_buat</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->transport</td>
                                        <td>$row->harian</td>
                                        <td>$row->progress</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k5" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Pembayaran</h3>           
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-quo'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Tanggal </th>
                                    <th style='text-align:center;'>Loker</th>
                                    <th style='text-align:center;'>NIK Buat</th>
                                    <th style='text-align:center;'>Nama </th>
                                   <th style='text-align:center;'>Keterangan</th>
                                   <th style='text-align:center;'>Transport</th>
                                   <th style='text-align:center;'>Harian</th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_spj,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat,c.nama,a.keterangan,a.transport,a.harian,a.progress  
                                from gr_spj_m a 
                                left join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi 
                                left join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
                                left join gr_status_spj d on a.sts_spj=d.sts_spj and a.kode_lokasi=d.kode_lokasi 
                                where a.kode_lokasi='$kode_lokasi' and a.progress='$kunci'  ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2DetSpj','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->no_spj/');\" >$row->no_spj</a></td>
                                        <td>$row->tanggal</td>
                                        <td>$row->loker</td>
                                        <td>$row->nik_buat</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->transport</td>
                                        <td>$row->harian</td>
                                        <td>$row->progress</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "jt" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data </h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-jt'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Kode PP </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Proyek</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_proyek,d.nama as nama_proyek
								from log_pesan_m a
								inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
								inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
								inner join log_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi
								where a.kode_lokasi='01'  ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->no_pesan/null/null/null');\" >$row->no_pesan</a></td>
                                        <td>$row->kode_pp</td>
                                        <td>$row->tgl</td>
                                        <td>$row->nama_proyek</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->nilai</td>

                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "pro" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Per Proyek</h3>                                  
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pro'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Asset </th>
                                    <th style='text-align:center;'>Tgl Perolehan</th>
                                    <th style='text-align:center;'>Nama</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Status </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1
                                from am_aset a 
                                        left join am_proyek b on a.kode_proyek=b.kode_proyek 
                                        left join am_pp c on a.kode_pp=c.kode_pp 
                                        left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                                        left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                                        left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                                        left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                                        left join am_kateg h on a.kode_kateg=h.kode_kateg 
                                        left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                                        left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                                        left join vendor k on a.kode_vendor=k.kode_vendor 
                                where a.kode_proyek='$kunci' ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->id_aset</td>
                                        <td>$row->tgl_oleh</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->status</td>";
                                        if($row->n1 <> "n/a"){
                                            echo"
                                            <td>".number_format($row->n1,2,",",".")."</td>";
                                        }else{
                                            echo"
                                            <td>$row->n1</td>";
                                        }                                       
                                        echo"
                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "pp" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Per PP</h3>                                  
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pro'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Asset </th>
                                    <th style='text-align:center;'>Tgl Perolehan</th>
                                    <th style='text-align:center;'>Nama</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Status </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1
                                from am_aset a 
                                        left join am_proyek b on a.kode_proyek=b.kode_proyek 
                                        left join am_pp c on a.kode_pp=c.kode_pp 
                                        left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                                        left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                                        left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                                        left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                                        left join am_kateg h on a.kode_kateg=h.kode_kateg 
                                        left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                                        left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                                        left join vendor k on a.kode_vendor=k.kode_vendor 
                                where a.kode_pp='$kunci' ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->id_aset</td>
                                        <td>$row->tgl_oleh</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->status</td>";
                                        if($row->n1 <> "n/a"){
                                            echo"
                                            <td>".number_format($row->n1,2,",",".")."</td>";
                                        }else{
                                            echo"
                                            <td>$row->n1</td>";
                                        }                                       
                                        echo"
                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "ktg" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Per Kategori</h3>                                  
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pro'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Asset </th>
                                    <th style='text-align:center;'>Tgl Perolehan</th>
                                    <th style='text-align:center;'>Nama</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Status </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1
                                from am_aset a 
                                        left join am_proyek b on a.kode_proyek=b.kode_proyek 
                                        left join am_pp c on a.kode_pp=c.kode_pp 
                                        left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                                        left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                                        left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                                        left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                                        left join am_kateg h on a.kode_kateg=h.kode_kateg 
                                        left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                                        left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                                        left join vendor k on a.kode_vendor=k.kode_vendor 
                                where a.kode_kateg='$kunci' ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->id_aset</td>
                                        <td>$row->tgl_oleh</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->status</td>";
                                        if($row->n1 <> "n/a"){
                                            echo"
                                            <td>".number_format($row->n1,2,",",".")."</td>";
                                        }else{
                                            echo"
                                            <td>$row->n1</td>";
                                        }                                       
                                        echo"
                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "klp" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Per Kelompok</h3>                                  
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pro'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Asset </th>
                                    <th style='text-align:center;'>Tgl Perolehan</th>
                                    <th style='text-align:center;'>Nama</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Status </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1
                                from am_aset a 
                                        left join am_proyek b on a.kode_proyek=b.kode_proyek 
                                        left join am_pp c on a.kode_pp=c.kode_pp 
                                        left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                                        left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                                        left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                                        left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                                        left join am_kateg h on a.kode_kateg=h.kode_kateg 
                                        left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                                        left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                                        left join vendor k on a.kode_vendor=k.kode_vendor 
                                where a.kode_klp='$kunci' ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->id_aset</td>
                                        <td>$row->tgl_oleh</td>
                                        <td>$row->nama</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->status</td>";
                                        if($row->n1 <> "n/a"){
                                            echo"
                                            <td>".number_format($row->n1,2,",",".")."</td>";
                                        }else{
                                            echo"
                                            <td>$row->n1</td>";
                                        }                                       
                                        echo"
                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "sdm" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Karyawan</h3>                      
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>NIK </th>
                                    <th style='text-align:center;'>Nama </th>
                                    <th style='text-align:center;'>Jabatan</th>
                                    <th style='text-align:center;'>No Telp</th>
                                    <th style='text-align:center;'>Email </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select * from gr_karyawan where kode_lokasi='$kode_lokasi' and flag_aktif='0' and sts_sdm='$kunci' ";

                                // echo $sql;

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2CV','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->nik');\" >$row->nik</a></td>
                                        <td>$row->nama</td>
                                        <td>$row->kode_jab</td>
                                        <td>$row->no_telp</td>
                                        <td>$row->email</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "lok" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Karyawan</h3>                      
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>NIK </th>
                                    <th style='text-align:center;'>Nama </th>
                                    <th style='text-align:center;'>Jabatan</th>
                                    <th style='text-align:center;'>No Telp</th>
                                    <th style='text-align:center;'>Email </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select * from gr_karyawan where kode_lokasi='$kode_lokasi' and flag_aktif='0' and lok_kantor='$kunci' ";

                                // echo $sql;

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2CV','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->nik');\" >$row->nik</a></td>
                                        <td>$row->nama</td>
                                        <td>$row->kode_jab</td>
                                        <td>$row->no_telp</td>
                                        <td>$row->email</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "jab" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Karyawan</h3>                      
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>NIK </th>
                                    <th style='text-align:center;'>Nama </th>
                                    <th style='text-align:center;'>Jabatan</th>
                                    <th style='text-align:center;'>No Telp</th>
                                    <th style='text-align:center;'>Email </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.nik,a.nama,a.kode_jab,a.no_telp,a.email from gr_karyawan a inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='0' and b.kode_klpjab='$kunci' ";

                                // echo $sql;

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2CV','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->nik');\" >$row->nik</a></td>
                                        <td>$row->nama</td>
                                        <td>$row->kode_jab</td>
                                        <td>$row->no_telp</td>
                                        <td>$row->email</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "grd" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Karyawan</h3>                      
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>NIK </th>
                                    <th style='text-align:center;'>Nama </th>
                                    <th style='text-align:center;'>Jabatan</th>
                                    <th style='text-align:center;'>No Telp</th>
                                    <th style='text-align:center;'>Email </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.nik,a.nama,a.kode_jab,a.no_telp,a.email from gr_karyawan a where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='0' and a.kode_grade='$kunci' ";

                                // echo $sql;

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2CV','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->nik');\" >$row->nik</a></td>
                                        <td>$row->nama</td>
                                        <td>$row->kode_jab</td>
                                        <td>$row->no_telp</td>
                                        <td>$row->email</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "dir" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Karyawan</h3>                      
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>NIK </th>
                                    <th style='text-align:center;'>Nama </th>
                                    <th style='text-align:center;'>Jabatan</th>
                                    <th style='text-align:center;'>No Telp</th>
                                    <th style='text-align:center;'>Email </th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.nik,a.nama,a.kode_jab,a.no_telp,a.email from gr_karyawan a where a.kode_lokasi='$kode_lokasi' and a.flag_aktif='0' and a.kode_dir='$kunci' ";

                                // echo $sql;

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2CV','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->nik');\" >$row->nik</a></td>
                                        <td>$row->nama</td>
                                        <td>$row->kode_jab</td>
                                        <td>$row->no_telp</td>
                                        <td>$row->email</td>
                                    </tr>";
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
			var table2 = $('#table-pemesanan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table2.columns.adjust().draw();
             
            var table = $('#table-quo').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-nota').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-placing').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-polis').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-jt').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();

            var table = $('#table-pro').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();

            var tablex = $('#table-pengajuan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            tablex.columns.adjust().draw();
			
                
			</script>
		";
        
		return "";
	}
	
}
?>
