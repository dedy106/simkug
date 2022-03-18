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
class server_report_saku3_dash_rptDashSppdDet2 extends server_report_basic
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
        $report=$tmp[5];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('$report','','$kode_lokasi/$periode/$kode_pp/$nik/$progress/$report');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                </div>
                <div class='panel-body'>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Detail SPPD</h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table no-margin' id='table-progress-panjar'>
                                    <thead>
                                        <tr>
                                            <th width='30'  align='center' >No</th>
                                            <th width='80'  align='center' >Progress</th>
                                            <th width='80'  align='center' >No Sppd</th>
                                            <th width='60'  align='center' >Tgl Sppd</th>
                                            <th width='60'  align='center' >Nik</th>
                                            <th width='150'  align='center' >Nama</th>
                                            <th width='60'  align='center' >Kode PP</th>
                                            <th width='60'  align='center' >Kode Unit</th>
                                            <th width='90'  align='center' >Uang Transport</th>
                                            <th width='90'  align='center' >Uang Harian</th>
                                            <th width='90'  align='center' >Total</th>
                                            <th width='50'  align='center' >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                        
                                    
                                    // $sql="select a.no_perintah,a.kode_lokasi,a.keterangan,convert(varchar(10),a.tanggal,103) as tgl_perintah,
                                    // b.no_spj,b.nik_spj,c.nama as nama_spj,convert(varchar(10),b.tanggal,103) as tgl_spj,b.nilai_trans,b.nilai_uhar,b.kode_pp,b.kode_unit  
                                    // from sp_perintah_m a
                                    // left join sp_spj_m b on a.no_perintah=b.no_perintah and a.kode_lokasi=b.kode_lokasi
                                    // left join karyawan c on b.nik_spj=c.nik and b.kode_lokasi=c.kode_lokasi
                                    // where a.kode_lokasi='$kode_lokasi' and b.no_spj='$no_bukti' order by a.no_perintah";

                                    switch($progress){
                                        case '01': 
                                        // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('0','S')";
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
                                                        where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('0','S') 
                                                        ) a
                                        ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
                                        where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
                                        break;
                                        case '02': 
                                        // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('1')";
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
                                                        where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('1') 
                                                        ) a
                                        ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
                                        where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
                                        break;
                                        case '03': 
                                        // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('2')";
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
                                                        where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('2') 
                                                        ) a
                                        ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
                                        where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
                                        break;
                                        case '04': 
                                        // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('3')";
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
                                                        where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('3') 
                                                        ) a
                                        ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
                                        where b.kode_lokasi='11' and a.no_spj IS NOT NULL";
                                        break;
                                        case '05': 
                                        // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('4')";
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
                                                        where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('4') 
                                                        ) a
                                        ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
                                        where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";

                                        break;
                                        case '11': 
                                        // $sql = "select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_spj=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='11' and a.nik_spj='$nik' and a.progress in ('Z')";
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
                                                        where a.kode_lokasi='$kode_lokasi' and a.nik_spj='$nik' and a.progress in ('Z') 
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
                                        //         where a.nik_spj='$nik' and c.progress='0' ";
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
														where a.nik_spj='$nik' and c.progress='0' 
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
														where a.nik_spj='$nik' and c.progress='1' 
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
                                        //                             where a.nik_spj='$nik' and c.progress='2' ";
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
														where a.nik_spj='$nik' and c.progress='2' 
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
                                        //                             where a.nik_spj='$nik' and c.progress='S' ";
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
														where a.nik_spj='$nik' and c.progress='S' 
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
                                        //                             where a.nik_spj='$nik' and c.progress in ('3','4') ";
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
														where a.nik_spj='$nik' and c.progress in ('3','4') 
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
                                        //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '1'
                                        //         union all
                                        //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '1'
                                        //         union all
                                        //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '2'
                                        //         union all
                                        //         select a.*, b.foto from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '2'";

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
														from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '1'
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
														from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '1'
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
														from sp_spj_m a left join lab_hakakses b on a.nik_app1=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app1='$nik' and a.progress = '2'
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
														from sp_spj_m a left join lab_hakakses b on a.nik_app2=b.nik and																			a.kode_lokasi=b.kode_lokasi where a.nik_app2='$nik' and a.progress = '2' 
                                                        ) a
                                        ) a on b.kode_proses=a.kode_proses and b.kode_lokasi=a.kode_lokasi
                                        where b.kode_lokasi='$kode_lokasi' and a.no_spj IS NOT NULL";
                                        break;
                                            }
                                    
                                    $rs = $dbLib->execute($sql); 
                                    $i=1;
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td  align='center'>$i</td>
                                            <td ><p class='label label-warning'>$row->nama</p></td>
                                            <td >$row->no_spj</td>
                                            <td >$row->tanggal</td>
                                            <td >$row->nik_spj</td>
                                            <td >$row->nama_spj</td>
                                            <td >$row->kode_pp</td>
                                            <td >$row->kode_unit</td>
                                            <td  align='right'>".number_format($row->nilai_trans,0,",",".")."</td>
                                            <td  align='right'>".number_format($row->nilai_uhar,0,",",".")."</td>
                                            <td  align='right'>".number_format($row->nilai_trans+$row->nilai_uhar,0,",",".")."</td>
                                            <td><a class='btn btn-success btn-sm crm-trace-btn' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSppdDet','','$kode_lokasi/$periode/$kode_pp/$nik/$progress/$row->no_spj/$report');\" >Detail</a></td>";
                                    echo"                                            
                                        </tr>";
                                        $i++;
                                    }
                            echo    "</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"</div>
            </div>
        </div>";

        echo "<script type='text/javascript'>
				var table2 = $('#table-progress-panjar').DataTable({
				// 'fixedHeader': true,
				'scrollY': '200px',
				// 'scrollX': '0px',
				'scrollCollapse': true
				});
                table2.columns.adjust().draw();
                
			</script>
		";

        
		return "";
	}
	
}
?>
