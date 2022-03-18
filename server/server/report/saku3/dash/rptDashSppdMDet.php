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
class server_report_saku3_dash_rptDashSppdMDet extends server_report_basic
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

    // function limit_words($string, $word_limit){
    //     $words = explode(" ",$string);
    //     return implode(" ",array_splice($words,0,$word_limit));
    // }
    
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $jenis=$tmp[2];
        $kunci=$tmp[3];
        $kode_pp=$tmp[4];
        $nik=$tmp[5];

		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        $path = $_SERVER["SCRIPT_NAME"];				
        $path2 = substr($path,0,strpos($path,"server/serverApp.php"));		
        $path = $path2 . "image/keubg.png";
        $foto = $path2 . "image/wallpaper/Forest.jpg";
        $user = $path2 . "image/user2.png";
        
		echo "<div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdM','','$kode_lokasi/$periode/$kode_pp/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                    </div>";
                    switch($kunci){                       
                        case "app" :

                        $sql="select a.progress,a.no_spj as no_bukti,'INPROG' as status, a.kode_lokasi, convert(varchar,d.tgl_mulai,103) as tglawal, 
                        convert(varchar,d.tgl_selesai,103) as tglakhir,  c.kode_pp+' - '+c.nama as pp,b.keterangan,a.tempat, a.nama_spj as nik,a.no_app1,a.no_app2,
                        convert(varchar,a.tgl_input,120) as tglinput, a.kode_pp,a.nik_app1,a.nik_app2,'app1' as app, a.no_perintah, a.nilai_trans, a.nilai_uhar, 
                        b.keterangan from sp_spj_m a inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi inner join pp c 
                        on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi inner join (select no_spj,min(tgl_mulai) as tgl_mulai, max(tgl_selesai) as tgl_selesai
                        from sp_spj_dh where kode_lokasi='11' group by no_spj )d on a.no_spj=d.no_spj where a.nik_app1='$nik' and a.progress = '0' 
                        union all 
                        select a.progress,a.no_spj as no_bukti,'INPROG' as status, a.kode_lokasi, convert(varchar,d.tgl_mulai,103) as tglawal, 
                        convert(varchar,d.tgl_selesai,103) as tglakhir,  c.kode_pp+' - '+c.nama as pp,b.keterangan,a.tempat, a.nama_spj as nik,a.no_app1,a.no_app2,
                        convert(varchar,a.tgl_input,120) as tglinput, a.kode_pp,a.nik_app1,a.nik_app2,'app1' as app, a.no_perintah, a.nilai_trans, a.nilai_uhar, 
                        b.keterangan from sp_spj_m a inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi inner join pp c 
                        on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi inner join (select no_spj,min(tgl_mulai) as tgl_mulai, max(tgl_selesai) as tgl_selesai
                        from sp_spj_dh where kode_lokasi='11' group by no_spj )d on a.no_spj=d.no_spj where a.nik_app2='$nik' and a.progress = '1' ";

                        // echo $sql;
                        $rs2 = $dbLib->execute($sql); 
                       
                       
                            while ($row2 = $rs2->FetchNextObject(false)){
                                $nilai=$row2->nilai_uhar+$row2->nilai_trans;
                                echo"<a style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdMDet2','','$kode_lokasi/$periode/$kode_pp/$nik/$jenis/$kunci/app_det/$row2->no_bukti');\">
                                    <div class='box-footer box-comments' style='background:white;box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height:80px'>
                                        <div class='box-comment'>
                                        <img class='img-circle img-sm' style='width: 50px !important;height: 50px !important;' src='$user' alt='User Image'>
                                        <div class='comment-text' style='margin-left: 60px;'>
                                                <span class='username'>
                                                $row2->no_bukti - $row2->keterangan
                                                <span class='text-muted pull-right'>$row2->tglawal<i class='fa  fa-angle-right' style='font-size:30px;padding-left: 20px;'></i></span>
                                                </span><!-- /.username -->
                                                $row2->nik <br>
                                                <span style='color: #aaa6a6;'>
                                                Rp. ".number_format($nilai,0,",",".")."
                                                </span>
                                                
                                        </div>
                                        </div>
                                    </div>
                                    </a>
                                    ";
                            }                  

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
