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
class server_report_saku3_dash_rptDashSppdDet extends server_report_basic
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
        $progress = $tmp[4];
        $no_bukti=$tmp[5];
        $report=$tmp[6];
		switch($progress){
            case '01': 
            // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('0','S') and a.no_spj='$no_bukti'";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses
                            from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('0','S') and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '02': 
            // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('1') and a.no_spj='$no_bukti'";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses
                            from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('1') and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '03': 
            // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('2') and a.no_spj='$no_bukti'";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses
                            from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('2') and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '04': 
            // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('3')and a.no_spj='$no_bukti' ";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses
                            from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('3') and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='11' and a.no_spj IS NOT NULL";
            break;
            case '05': 
            // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('4')and a.no_spj='$no_bukti'";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses
                            from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('4') and a.no_spj='$no_bukti' 
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";

            break;
            case '11': 
            // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('Z')and a.no_spj='$no_bukti' ";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses
                            from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi
                            where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('Z') and a.no_spj='$no_bukti' 
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '06': 
            // $sql = "select a.*, d.foto 
            //         from sp_spj_m a
            //         inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
            //         inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
            //         left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
            //         where a.nik_spj='$nik' and c.progress='0' and a.no_spj='$no_bukti'";
            $sql= "select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (
                            select a.*, d.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses 
                            from sp_spj_m a
                            inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
                            inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
                            left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
                            where a.nik_spj='$nik' and c.progress='0' and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '07': 
            // $sql = "select a.*, d.foto 
            //                             from sp_spj_m a
            //                             inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
            //                             inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
            //                             left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
            //                             where a.nik_spj='$nik' and c.progress='1' ";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (
                            select a.*, d.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses 
                            from sp_spj_m a
                            inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
                            inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
                            left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
                            where a.nik_spj='$nik' and c.progress='1'  and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '08': 
            // $sql = "select a.*, d.foto
            //                             from sp_spj_m a
            //                             inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
            //                             inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
            //                             left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
            //                             where a.nik_spj='$nik' and c.progress='2' and a.no_spj='$no_bukti' ";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (
                            select a.*, d.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses 
                            from sp_spj_m a
                            inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
                            inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
                            left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
                            where a.nik_spj='$nik' and c.progress='2' and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '09': 
            // $sql = "select a.*, d.foto 
            //                             from sp_spj_m a
            //                             inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
            //                             inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
            //                             left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
            //                             where a.nik_spj='$nik' and c.progress='S' and a.no_spj='$no_bukti' ";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (
                            select a.*, d.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses 
                            from sp_spj_m a
                            inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
                            inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
                            left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
                            where a.nik_spj='$nik' and c.progress='S' and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
            case '10': 
            // $sql = "select a.*, d.foto 
            //                             from sp_spj_m a
            //                             inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
            //                             inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
            //                             left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
            //                             where a.nik_spj='$nik' and c.progress in ('3','4') and a.no_spj='$no_bukti'";
            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (
                            select a.*, d.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses 
                            from sp_spj_m a
                            inner join sp_stugas_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi
                            inner join it_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
                            left join lab_hakakses d on a.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
                            where a.nik_spj='$nik' and c.progress in ('3','4') and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
                    /*case 'daftar_approved':$sql = "
                    select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app1=$nik and a.progress = '1'
                                        union all
                    select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app2=$nik and a.progress = '2'";
                    break;*/
            case 'daftar_approved':
            // $sql = "
            //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '1' and a.no_spj='$no_bukti'
            //         union all
            //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '1' and a.no_spj='$no_bukti'
            //         union all
            //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '2' and a.no_spj='$no_bukti'
            //         union all
            //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '2' and a.no_spj='$no_bukti'";

            $sql="select b.kode_proses,b.nama, a.* 
            from lab_proses b
            left join (
            select a.* from (
                            select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses  
                            from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '1' and a.no_spj='$no_bukti'
                            union all
                            select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses  
                            from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '1' and a.no_spj='$no_bukti'
                            union all
                            select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses  
                            from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '2' and a.no_spj='$no_bukti'
                            union all
                            select a.*, b.foto,case 
                                            when a.progress in ('0','S') then '01'
                                            when a.progress in ('1') then '02'
                                            when a.progress in ('2') then '03'
                                            when a.progress in ('3') then '04'
                                            when a.progress in ('4') then '05'
                                            when a.progress in ('Z') then '11'
                                            when a.progress in ('Z') then '11'
                                            end as kode_proses  
                            from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '2' and a.no_spj='$no_bukti'
                            ) a
            ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
            where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
            break;
                }
        $rs = $dbLib->execute($sql);  
      
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        echo "<div class='panel'>
        <div class='panel-body'>
        <div class='panel-heading'>
            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdDet2','','$kode_lokasi/$periode/$kode_pp/$nik/$progress/$report');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
        </div>";
        echo "
        
		<div id='dash_page_monitoring'>
            <div class='row'>
                <div class='col-xs-12'>
                    <ul class='timeline' id='dash_monitoring_list'>";
                    $body="";
                if($rs->fields[0] <> ""){
                    while ($row = $rs->FetchNextObject($toupper=false)) {
                        
                        $body= "<li><i class='fa fa-map-marker bg-blue'></i>
                                <div class='timeline-item'>
                                    <span class='time'><i class='fa fa-clock-o'></i> ".$row->tgl_input."</span>
                                    <h3 class='timeline-header'>
                                    <p class='label label-warning'>Pengajuan</p>
                                    </h3>
                                    <div class='timeline-body'>
                                        <p class='crm-trace-no' hidden>".$row->no_spj."</p>
                                        <div class='row'>
                                            <div class='col-md-2'><b>No SPPD</b></div>
                                            <div class='col-md-10'>".$row->no_spj."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>Tgl SPPD</b></div>
                                            <div class='col-md-10'>".$row->tanggal."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>No Perintah</b></div>
                                            <div class='col-md-10'>".$row->no_perintah."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>NIK SPJ</b></div>
                                            <div class='col-md-10'>".$row->nik_spj." - ".$row->nama_spj."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>Uang Harian</b></div>
                                            <div class='col-md-10'>".number_format($row->nilai_uhar,0,",",".")."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>Uang Transport</b></div>
                                            <div class='col-md-10'>".number_format($row->nilai_trans,0,",",".")."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>Nik Approve 1</b></div>
                                            <div class='col-md-10'>".$row->nik_app1."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>No Approve 1</b></div>
                                            <div class='col-md-10'>".$row->no_app1."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>Nik Approve 2</b></div>
                                            <div class='col-md-10'>".$row->nik_app2."</div>
                                        </div>
                                        <div class='row'>
                                            <div class='col-md-2'><b>No Approve 2</b></div>
                                            <div class='col-md-10'>".$row->no_app2."</div>
                                        </div>
                                    </div>
                                    <div class='timeline-footer'>
                                    <p class='label label-primary sppd-no-pd'>".$row->no_spj."</p> 
                                    <p class='label label-warning'>".$row->tanggal."</p>
                                    <p class='label label-success'>".$row->no_perintah."</p>
                                    </div>
                                </div>
                            </li>";
                        
                        $body2="<li><i class='fa fa-map-marker bg-blue'></i>
                        <div class='timeline-item'>
                            <span class='time'><i class='fa fa-clock-o'></i> ".$row->tgl_input."</span>
                            <h3 class='timeline-header'>
                            <p class='label label-warning'>Approval</p>
                            </h3>
                            <div class='timeline-body'>
                                <div class='row'>
                                    <div class='col-md-2'><b>No Approve SDM</b></div>
                                    <div class='col-md-10'>".$row->no_appsdm."</div>
                                </div>
                            </div>
                            <div class='timeline-footer'>
                            <p class='label label-primary sppd-no-pd'>".$row->no_spj."</p> 
                            <p class='label label-warning'>".$row->tanggal."</p>
                            <p class='label label-success'>".$row->no_perintah."</p>
                            </div>
                        </div>
                        </li>";

                        $body3="<li><i class='fa fa-map-marker bg-blue'></i>
                        <div class='timeline-item'>
                            <span class='time'><i class='fa fa-clock-o'></i> ".$row->tgl_input."</span>
                            <h3 class='timeline-header'>
                            <p class='label label-warning'>Proses SPPD</p>
                            </h3>
                            <div class='timeline-body'>
                                <div class='row'>
                                    <div class='col-md-2'><b>No Surat Tugas</b></div>
                                    <div class='col-md-10'>".$row->no_stugas."</div>
                                </div>
                            </div>
                            <div class='timeline-footer'>
                            <p class='label label-primary sppd-no-pd'>".$row->no_spj."</p> 
                            <p class='label label-warning'>".$row->tanggal."</p>
                            <p class='label label-success'>".$row->no_perintah."</p>
                            </div>
                        </div>
                        </li>";

                        $body4="<li><i class='fa fa-map-marker bg-blue'></i>
                        <div class='timeline-item'>
                            <span class='time'><i class='fa fa-clock-o'></i> ".$row->tgl_input."</span>
                            <h3 class='timeline-header'>
                            <p class='label label-warning'>Finish</p>
                            </h3>
                            <div class='timeline-body'>
                                <div class='row'>
                                    <div class='col-md-2'><b>No Aju</b></div>
                                    <div class='col-md-10'>".$row->no_aju."</div>
                                </div>
                            </div>
                            <div class='timeline-footer'>
                            <p class='label label-primary sppd-no-pd'>".$row->no_spj."</p> 
                            <p class='label label-warning'>".$row->tanggal."</p>
                            <p class='label label-success'>".$row->no_perintah."</p>
                            </div>
                        </div>
                        </li>";

                        switch($row->kode_proses){
                            case "03" : 
                            echo $body;
                            break;
                            case "04" :
                            echo $body.$body2;
                            break;
                            case "05" :
                            echo $body.$body2.$body3;
                            break;
                            case "06" :
                            echo $body.$body2.$body3.$body4;
                            break;
                        }
                        
                    }
                    echo"
                    <li><i class='fa fa-clock-o'></i></li>";
                }else{
                    echo "<center>Tidak ada SPPD yang diajukan</center>";
                }
                
                echo"
                    </ul>
                </div>
            </div>
        </div>
        ";
        echo"
        </div>
        </div>";

        echo "<div id='dash_page_approval'>
        <div class='row'>
            <div class='col-xs-12'>
                <ul class='timeline' id='dash_approval_list'>
                    <!---->
                </ul>
            </div>
        </div>
        
        <div class='modal fade' id='modalSPPD' tabindex='-1' role='dialog' aria-hidden='true'>
            <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                    <form id='form-dbsppd-approve'>
                        <div class='modal-header'>
                            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>×</span></button>
                            <h4 class='modal-title'>Approve SPPD</h4>
                        </div>
                    
                        <div class='modal-body'>
                            <div class='row'>
                                <div class='form-group'>
                                    <div class='col-sm-12' style='margin-bottom:5px;'>
                                        <input type='submit' name='status_app' class='btn btn-primary btn-sm pull-right tbl-approval' value='Approve' style='margin-left:5px;'>
                                        <input type='submit' name='status_app' class='btn btn-warning btn-sm pull-right tbl-approval' value='Return' style='margin-left:5px;'>
                                        <input type='submit' name='status_app' class='btn btn-danger btn-sm pull-right tbl-approval' value='Reject' style='margin-left:5px;'>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-sm-12' style='margin-bottom:5px;'>
                                    <div id='validation-box'></div>
                                </div>
                            </div>
                            <div style='overflow-y: auto; max-height: 450px; overflow-x:hidden; padding-right:10px;'>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Catatan</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <textarea name='catatan_app' id='form-dbsppd-catatan' cols='30' rows='5' class='form-control' maxlength='200'></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>No. PD</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input type='text' name='no_bukti' class='form-control' id='form-dbsppd-no-pd' readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>PP Perintah</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-pp-per'>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Tgl Mulai</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-tgl-mul'>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Tgl Selesai</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-tgl-sel'>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Maksud/Tujuan</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-maksud'>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Kota</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-kota'>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>NIK PD</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-nik'>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Total Transport</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-trans'>
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='form-group'>
                                        <label class='control-label col-sm-3'>Total Uang Harian</label>
                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <input class='form-control' readonly id='form-dbsppd-uh'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>";
                		
		echo "
        <script type='text/javascript'>
        // $('.timeline-item').on('click', '.mon-sppd-det', function(){
        //     var no_bukti = $(this).closest('li').find('.sppd-no-pd').text();
        //     $.ajax({
        //         type: 'POST',
        //         url: 'getDetailDashSppd.php?fx=getDetail',
        //         dataType: 'json',
        //         data: {'kode_lokasi':".$kode_lokasi.", 'periode':".$periode.", 'kode_pp':".$kode_pp.",'nik':".$nik.",'progress':".$progress.",'no_bukti':no_bukti},
        //         success: function (data) {
                    // alert(data.detail);
                    // while (row = data.detail->FetchNextObject(false)) { 
                    //     $('#form-dbsppd-catatan').val(row->keterangan);
                        // $('#form-dbsppd-no-pd').val(no_bukti);
                    //     $('#form-dbsppd-pp-per').val(row->pp);
                    //     $('#form-dbsppd-tgl-mul').val(row->tglawal);
                    //     $('#form-dbsppd-tgl-sel').val(row->tglakhir);
                    //     $('#form-dbsppd-maksud').val(row->keterangan);
                    //     $('#form-dbsppd-kota').val(row->tempat);
                    //     $('#form-dbsppd-nik').val(row->nik);
                    //     $('#form-dbsppd-trans').val(row->nilai_trans);
                    //     $('#form-dbsppd-uh').val(row->nilai_uhar);
                        // $('#modalSPPD').modal('show');
                    // }
                }
        //     });
        // });
        </script>";

		return "";
	}
	
}
?>
