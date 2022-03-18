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
class server_report_saku3_dash_rptDashSppdMDet2 extends server_report_basic
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
        $jenis=$tmp[4];
        $kunci=$tmp[5];
        $param=$tmp[6];
        $key=$tmp[7];

        // var_dump($tmp);

		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $path = $_SERVER["SCRIPT_NAME"];				
        $path2 = substr($path,0,strpos($path,"server/serverApp.php"));		
        $path = $path2 . "image/yspt2.png";

    
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdMDet','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
                    switch($param){
                        case "app_det" :
                        echo"<div class='box-body box-profile'>";
                        $sql="select a.no_perintah, a.progress,a.no_spj as no_bukti,'INPROG' as status,a.progress,convert(varchar,d.tgl_mulai,103) as tglawal, convert(varchar,d.tgl_selesai,103) as tglakhir, c.kode_pp+' - '+c.nama as pp,b.keterangan,a.tempat,a.nik_spj+' - '+a.nama_spj as nik,a.no_app2,convert(varchar,a.tgl_input,120) as tglinput, a.kode_pp,a.nik_app2,a.nilai_trans,a.nilai_uhar,d.tgl_mulai,d.tgl_selesai
                        from sp_spj_m a
                        inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi 
                        inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi
                        inner join ( select no_spj,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai
                        from sp_spj_dh 
                        where kode_lokasi='$kode_lokasi' group by no_spj ) d on a.no_spj=d.no_spj 
                        where no_app2 = '-' and a.no_spj='$key' order by a.no_perintah ";
                        $rsp=$dbLib->execute($sql);
                        $rowp=$rsp->FetchNextObject(false);
                        echo"
                            <ul class='list-group list-group-unbordered'>
                            <style>
                            .list-form {
                                padding-right: 0px;
                                padding-left: 2px;
                                border-right: 1px solid white;
                                border-left: 1px solid white;
                            }
                            </style>
                            <form method='POST'>
                                <li class='list-group-item list-form' >
                                <b>No Bukti</b> <br>
                                <a>$rowp->no_bukti</a>
                                <input type='hidden' name='no_bukti' value='$rowp->no_bukti'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>PP</b><br> <a>$rowp->pp</a>
                                <input type='hidden' name='kode_pp' value='$rowp->kode_pp'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Tgl Mulai</b><br> <a>$rowp->tglawal</a>
                                <input type='hidden' name='tgl_mulai' value='$rowp->tgl_mulai'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Tgl Selesai</b><br> <a>$rowp->tglakhir</a>
                                <input type='hidden' name='tgl_selesai' value='$rowp->tgl_selesai'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Maksud dan Tujuan</b><br> <a>$rowp->keterangan</a>
                                <input type='hidden' name='keterangan' value='$rowp->keterangan'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Nik Pegawai</b><br> <a>$rowp->nik</a>
                                <input type='hidden' name='nik_peg' value='$rowp->nik'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Kota</b><br> <a>$rowp->tempat</a>
                                <input type='hidden' name='tempat' value='$rowp->tempat'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Nilai Transport</b><br> <a>$rowp->nilai_trans</a>
                                <input type='hidden' name='nilai_trans' value='$rowp->nilai_trans'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Nilai Uang Harian</b><br> <a>$rowp->nilai_uhar</a>
                                <input type='hidden' name='nilai_uhar' value='$rowp->nilai_uhar'>
                                </li>
                                <li class='list-group-item list-form'>
                                <b>Catatan</b><br> <textarea class='form-control' name='catatan_app' rows='3' placeholder='Masukkan catatan'></textarea>
                                </li>
                            </form>
                            </ul>
                            <a href='#' class='btn btn-danger '><b>Reject</b></a>
                            <a href='#' class='btn btn-info  '><b>Return</b></a>
                            <a href='#' class='btn btn-success '><b>Approve</b></a>
                        </div>";
                        break;

                    }
               
            
            echo"   
                </div>
            </div>";
    
        echo "<script type='text/javascript'>

			 </script>";

        
		return "";
	}
	
}
?>
