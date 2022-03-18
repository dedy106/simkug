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
class server_report_saku3_dash_rptDashSiagaHrisDet extends server_report_basic
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
        $box=$tmp[2];
		$kunci=$tmp[3];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
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

                                $sql = "select * from gr_karyawan where kode_lokasi='$kode_lokasi' ";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2CV','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci/$row->no_nik');\" >$row->nik</a></td>
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
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data </h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-quo'>
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
						case "k3" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-nota'>
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
						case "k4" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data </h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-placing'>
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
						case "k5" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-polis'>
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
                
			</script>
		";
        
		return "";
	}
	
}
?>
