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


function toJuta($x) {
    $nil = $x / 1000000;
    return number_format($nil,2,",",".") . " JT";
}
class server_report_saku3_dash_rptDashGeneral extends server_report_basic
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
        $kode_fs=$tmp[4];

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs3=$dbLib->execute($sqlNot);

        $tahun = substr($periode,0,4);
        $tahunSebelum = intval($tahun) - 1;

        $kode_fs="FS1";

        //OPERATION RATIO
        $query_pendapatan   = "select case when jenis_akun = 'Pendapatan' then -n4 else n4 end as pendapatan 
                            from exs_neraca where kode_lokasi = '$kode_lokasi' and modul = 'L' and nama = 'Jumlah Pendapatan' 
                            and periode = '$periode'";
        $execute_pendapatan =$dbLib->execute($query_pendapatan);
        $query_beban        = "select case when jenis_akun = 'Beban' then n4 else n4 end as beban 
                            from exs_neraca where kode_lokasi = '$kode_lokasi' and modul = 'L' 
                            and nama = 'Jumlah Biaya' and periode = '$periode'";
        $execute_beban      =$dbLib->execute($query_beban);
        $operationratio     = ($execute_beban->fields[0] / $execute_pendapatan->fields[0])*100;

        //KAS BANK
        $sql1a = "select sum(so_akhir) as nilai
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB01') and c.so_akhir<>0
                ";
        $rs1a =$dbLib->execute($sql1a);
        $cash_balance=$rs1a->fields[0];

        //GRAFIK ARUS cash in cash out
        $pembagi = 100000;
        $sqlIn= "select	a.kode_lokasi,sum(case when substring(a.periode,5,2)='01' then a.debet else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then a.debet else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then a.debet else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then a.debet else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then a.debet else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then a.debet else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then a.debet else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then a.debet else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then a.debet else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then a.debet else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then a.debet else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.debet else 0 end) n12
        from (
            select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_lokasi
            from db_grafik_d a
            inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
            inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
            inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
            inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB05' and c.so_akhir<>0
        ) a
        where substring(a.periode,1,4) = '".substr($periode,0,4)."' and a.kode_lokasi='$kode_lokasi'
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
        $resIn =$dbLib->execute($sqlIn);
        if($resIn->RecordCount() > 0){
            while ($row = $resIn->FetchNextObject(false)){
                
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
                
                
            }
        }
            
        $Cash[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        $sqlOut = "select a.kode_lokasi,sum(case when substring(a.periode,5,2)='01' then a.kredit else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then a.kredit else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then a.kredit else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then a.kredit else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then a.kredit else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then a.kredit else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then a.kredit else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then a.kredit else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then a.kredit else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then a.kredit else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then a.kredit else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.kredit else 0 end) n12
        from (
            select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_lokasi
            from db_grafik_d a
            inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
            inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
            inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
            inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB05' and c.so_akhir<>0
            ) a
        where substring(a.periode,1,4) = '".substr($periode,0,4)."' 
        group by a.kode_lokasi";
            
        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
        $resOut =$dbLib->execute($sqlOut);
        if($resOut->RecordCount() > 0){
            while ($row = $resOut->FetchNextObject(false)){
                
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
            }
        }
            
        $Cash[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        //PENDAPATAN

        $sqlPen = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02')
        group by a.kode_lokasi";

        // echo $sqlPen;

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
        $pembagi=1000000;

        $resPen =$dbLib->execute($sqlPen);
        if($resPen->RecordCount() > 0){
            while ($row = $resPen->FetchNextObject(false)){
                
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
            }
        }
        $Pend[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        $sqlPend2 = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02')
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resPend2 =$dbLib->execute($sqlPend2);
        if($resPend2->RecordCount() > 0){
            while ($row = $resPend2->FetchNextObject(false)){
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
            }
        }

        $Pend[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        //BEBAN

        $sqlBeb = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')
        group by a.kode_lokasi";

        // echo $sqlPen;

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
        $pembagi=1000000;

        $resBeb =$dbLib->execute($sqlBeb);
        if($resBeb->RecordCount() > 0){
            while ($row = $resBeb->FetchNextObject(false)){
                
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
            }
        }
        $Beb[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        $sqlBeb2 = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resBeb2 =$dbLib->execute($sqlBeb2);
        if($resBeb2->RecordCount() > 0){
            while ($row = $resBeb2->FetchNextObject(false)){
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
            }
        }

        $Beb[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        //LABA
        $sqlLaba = "select a.kode_lokasi,
        sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
        sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
        sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
        sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
        sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
        sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
        sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
        sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
        sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
        sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
        sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
        sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB04')
        group by a.kode_lokasi";

        $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

        $resLab =$dbLib->execute($sqlLaba);
        if($resLab->RecordCount() > 0){
            while ($row = $resLab->FetchNextObject(false)){
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
            }
        }

        $Laba[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
        );

        //BUDGET & ACTUAL
        //SQL Pendapatan
        $sqlbox1 = "select 
        sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
        sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and a.periode='".$periode."' and b.kode_grafik in ('DB02')
        ";
        $rsAcvp =$dbLib->execute($sqlbox1);
        $rowAcvp = $rsAcvp->FetchNextObject($toupper);
        $budpend = $rowAcvp->n2;
        $actpend = $rowAcvp->n4;
        if($budpend == 0){
            $rasioPend = 100;
        }else{
            $rasioPend = ($actpend/$budpend)*100;
        }
        
        //BEBAN

        $sqlbox2 = "select
        sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
        sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and a.periode='".$periode."' and b.kode_grafik in ('DB03')
        ";
        $rsAcvb =$dbLib->execute($sqlbox2);
        $rowAcvb = $rsAcvb->FetchNextObject($toupper);
        $budbeb = $rowAcvb->n2;
        $actbeb = $rowAcvb->n4;
        if($budbeb == 0){
            $rasioBeb = 100;
        }else{
            $rasioBeb = ($actbeb/$budbeb)*100;
        }

        $sqlbox3 = "select 
        sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
        sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4
        from exs_neraca a
        inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi='$kode_lokasi' and a.periode='".$periode."' and b.kode_grafik in ('DB04')
        ";
        $rsAcvl =$dbLib->execute($sqlbox3);
        $rowAcvl = $rsAcvl->FetchNextObject($toupper);
        $actLaba = $rowAcvl->n4;
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        echo "
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

        
            body {
                font-family: 'Roboto', sans-serif !important;
            }
            h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                font-family: 'Roboto', sans-serif !important;
                font-weight: normal !important;
            }
            h3{
                margin-bottom: 5px;
                font-size:18px !important
            }
            h2{
                margin-bottom: 5px;
                margin-top:5px;
            }
            .judul-box{
                font-weight:bold;
                font-size:18px !important;
            }
            .inner{
                padding:5px !important;
            }

            .box-nil{
                margin-bottom: 20px !important;
            }

            .pad-more{
                padding-left:0px !important;
                padding-right:10px !important;
            }
            .mar-mor{
                margin-bottom:10px !important;
            }
        </style>
		<div class='panel' style='background:#eeeeee'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard Keuangan";
            echo" 
                <div class='navbar-custom-menu pull-right padding:0px'>
                <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                    <i class='fa fa-bell-o'></i>
                    <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rs2->fields[0]."</span>
                    </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rs2->fields[0]." notifications</li>";
                    while ($row = $rs3->FetchNextObject($toupper=false)) {
                echo"
                    <li>
                        <ul class='menu'>
                        <li>
                            <a href='#'>
                            <i class='fa fa-users text-aqua'></i> $row->pesan
                            </a>
                        </li>
                        </ul>
                    </li>
                    ";
                    }
                echo"
                    <li class='footer'><a href='#'>View all</a></li>
                    </ul>
                </li>
                <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:0px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                </li>
                <li>
                    <a href='#' data-toggle='control-sidebar' id='open-sidebar' style='padding:0px 15px 10px 10px'><i class='fa fa-gears'></i></a>
                </li>
                </ul>
                </div>";
            echo"
            </div>
            <div class='panel-body'>";
            echo"
            <div class='row' style='padding-left: 10px;'>
                <div class='col-md-6' style='padding-left: 0px;padding-right: 0px;'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashGeneralDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|kas');\">
                    <div class='col-md-6 pad-more'>
                        <div class='panel mar-mor'>
                            <div class='card'>
                                <div class='card-body'>
                                    <center><h3 class='font-weight-light' style='color: #000000;margin-bottom:0px'>Kas Bank</h3></center>
                                    <center><h2 class='font-weight-bold' >".toJuta($cash_balance)."</h2></center>
                                    <center><p style='color: #808080;'>Closing Balance</p></center>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                    <div class='col-md-6 pad-more'>
                        <div class='panel mar-mor'>
                            <div class='card'>
                                <div class='card-body'>
                                    <center><h3 class='font-weight-light' style='color: #000000;margin-bottom:0px'>Operating Ratio</h3></center>
                                    <center><h2 class='font-weight-bold' >".number_format($operationratio,0,',','.')."%</h2></center>
                                    <center><p style='color: #808080;'>&nbsp;</p></center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-12 pad-more'>
                        <div class='box mar-mor' style='box-shadow:none;border:0'>
                            <a href='#' class='small-box-footer'>
                                <div class='box-header'>
                                <h3 class='box-title'>Arus</h3>
                            </div>
                            </a>
                            <div class='box-body box-click'>
                                <div id='dash_chart_arus'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 pad-more'>
                        <div class='panel mar-mor'>
                            <div class='card' style='margin-bottom: 3.5rem;'>
                                <div class='card-body'>
                                    <h3 class='font-weight-bold text-left' style='font-weight: bold; padding-left: 1rem;'>Pendapatan Terbesar</h3>";
                                    $pdpt =$dbLib->execute("select top 5 a.kode_akun,c.nama as nama_akun,
                                    case when c.jenis='Pendapatan' then a.so_akhir*-1 else a.so_akhir end as so_akhir,
                                    isnull(b.nilai,0) as gar
                                    from exs_glma a
                                    left join (select kode_akun,kode_lokasi,sum(nilai) as nilai
                                                from anggaran_d 
                                                where kode_lokasi='$kode_lokasi' and substring(periode,1,4)='$tahun'
                                                group by kode_akun,kode_lokasi
                                                )b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and c.jenis='Pendapatan' 
                                    order by -a.so_akhir desc ");

                                    while($row2 = $pdpt->FetchNextObject(false)){
                                        if($row2->gar != 0){
                                            $persen = ($row2->so_akhir/$row2->gar)*100;
                                        }else{
                                            $persen = 100;
                                        }
                                    echo"
                                    <div class='col-md-12'>
                                        <h5 style='margin:0px;position:absolute;'><a href='#' class='test' data-toggle='tooltip' title='$row2->nama_akun'>$row2->kode_akun</a></h5><br>
                                        <h5 style='margin:0px;position:absolute;'>".number_format($row2->so_akhir,0,",",".")."</h5>
                                    </div>
                                    <div class='col-md-12'>
                                        <div class='progress-group' style='margin-left: 100px;position: relative;margin-top: 5px;margin-right:10%'>
                                            <div class='progress sm'>
                                                <div class='progress-bar progress-bar-aqua' style='background:#4285F4;width: $persen%'></div>
                                            </div>
                                        </div>
                                    </div>";
                                    }
                                    echo"
                                </div>
                            </div>
                            <a style='padding-left: 1rem; text-decoration: none; color: #808080;' href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashGenPend','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs');\" class='small-box-footer'>Detail Pendapatan Perusahaan <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
                    <div class='col-md-6 pad-more'>
                        <div class='panel mar-mor'>
                            <div class='card' style='margin-bottom: 3.5rem;'>
                                <div class='card-body'>
                                    <h3 class='font-weight-bold text-left' style='font-weight: bold; padding-left: 1rem;'>Beban Terbesar</h3>";
                                    $beban =$dbLib->execute("select top 5 a.kode_akun,c.nama as nama_akun,
                                    case when c.jenis='Pendapatan' then a.so_akhir*-1 else a.so_akhir end as so_akhir,
                                    isnull(b.nilai,0) as gar
                                    from exs_glma a
                                    left join (select kode_akun,kode_lokasi,sum(nilai) as nilai
                                                from anggaran_d 
                                                where kode_lokasi='$kode_lokasi' and substring(periode,1,4)='$tahun'
                                                group by kode_akun,kode_lokasi
                                                )b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                                    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and c.jenis='Beban'
                                    order by a.so_akhir desc ");
                                    while($row2 = $beban->FetchNextObject(false)){
                                        if($row2->gar != 0){
                                            $persen = ($row2->so_akhir/$row2->gar)*100;
                                        }else{
                                            $persen = 100;
                                        }
                                    echo"
                                    <div class='col-md-12'>
                                        <h5 style='margin:0px;position:absolute;'><a href='#' class='test' data-toggle='tooltip' title='$row2->nama_akun'>$row2->kode_akun</a></h5><br>
                                        <h5 style='margin:0px;position:absolute;'>".number_format($row2->so_akhir,0,",",".")."</h5>
                                    </div>
                                    <div class='col-md-12'>
                                        
                                        <div class='progress-group' style='margin-left: 100px;position: relative;margin-top: 5px;margin-right:10%'>
                                            <div class='progress sm'>
                                                <div class='progress-bar' style='background:#4285F4;width: $persen%'></div>
                                            </div>
                                        </div>
                                    </div>";
                                    }
        echo"
                                </div>
                            </div>
                            <a style='padding-left: 1rem; text-decoration: none; color: #808080;' href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashGenBeb','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs');\"  class='small-box-footer'>Detail Beban Perusahaan <i class='fa fa-arrow-circle-right'></i></a>
                        </div>
                    </div>
            
                </div>
                <style>
                .test + .tooltip > .tooltip-inner {
                    width:250px;
                }
                </style>
                <div class='col-md-6' style='padding-left: 0px;padding-right: 0px;'>
                    <div class='col-md-12 pad-more'>
                        <div class='box mar-mor' style='box-shadow:none;border:0'>
                            <div class='box-body'>
                                <div class='col-md-3' style='padding-right:0px'>
                                    <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;'>Pendapatan</h3>
                                    <h2 style='font-size:25px'>".toJuta($actpend)."</h2>
                                    <h5 style='color:#acacac'>".toJuta($budpend)."<span style='font-size:10px;'>&nbsp;&nbsp;<i>Budget</i></span></h5>
                                    <h5 style='color:#acacac'>".number_format($rasioPend,2,",",".")."%</h5>
                                </div>
                                <div class='col-md-9'>
                                    <div id='dash_chart_pend'></div>
                                </div>
                        </div>
                            <div class='box-body'>
                                <div class='col-md-3' style='padding-right:0px'>
                                    <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;'>Beban</h3>
                                    <h2 style='font-size:25px'>".toJuta($actbeb)."</h2>
                                    <h5 style='color:#acacac'>".toJuta($budbeb)."<span style='font-size:10px;'> &nbsp;&nbsp;<i>Budget</i></span></h5>
                                    <h5 style='color:#acacac'>".number_format($rasioBeb,2,",",".")."%</h5>
                                </div>
                                <div class='col-md-9'>
                                    <div id='dash_chart_beban'></div>
                                </div>
                            </div>
                            <div class='box-body'>
                                <div class='col-md-3' style='padding-right:0px'>
                                    <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;'>Laba</h3>
                                    <h2 style='font-size:25px'>".toJuta($actLaba)."</h2>
                                </div>
                                <div class='col-md-9'>
                                    <div id='dash_chart_laba'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-12 pad-more'>
                        <div class='panel mar-mor'>
                            <div class='card' style='margin-bottom: 3.5rem;'>
                                <div class='card-body'>
                                    <h4 class='font-weight-bold text-left' style='font-weight: bold; padding-left: 1rem;'>Recently Added</h4>
                                    <hr/>
                                    <h5 class='font-weight-bold text-left' style='font-weight: bold; padding-left: 1rem; margin-top: -10px;'>Transaction</h5>
                                    <table class='table table-borderless' style='border: none;'>";
                                        $thn    = date('Y'); 
                                        $recent = $dbLib->execute("select top 5 modul, convert(varchar,tgl_input,105) 'tgl_input', convert(varchar,tanggal,105) 'tgl_trans', nik_user 
                                        from trans_j where kode_lokasi = '$kode_lokasi' and periode like '".substr($periode,0,4)."%' order by tgl_input desc");
                                        while($get = $recent->FetchNextObject(false)){
                                            
                                        echo"
                                        <tr>
                                        <td style='border: none;'>
                                            <p style='font-weight: bold; margin-bottom: -2px;'>
                                            <i class='fa fa-id-card-o' aria-hidden='true' style='font-size: 2rem;'></i>
                                            <span style='padding-left: 1rem;'>Modul $get->modul</span>
                                            </p>
                                            <small style='color:  #808080; padding-left: 3.7rem;'>".date('d-m-Y', strtotime($get->tgl_trans))."</small>
                                        </td>
                                        <td style='border: none;text-align: right;'>
                                            <small style='color:  #808080; padding-right: 1rem; padding-bottom: -5px; '>".date('d-m-Y', strtotime($get->tgl_input))."</small><br/>
                                            <small style='color:  #808080; padding-right: 1rem; '>$get->nik_user</small>
                                        </td>
                                        </tr>";
                                        }
                                        echo"
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
            $('[data-toggle=\"tooltip\"]').tooltip(); 
            
            Highcharts.chart('dash_chart_arus', {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                },
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value} jt',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Nilai',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }],
                credits: {
                    enabled: false
                },
                labels: {
                    items: [{
                        html: '',
                        style: {
                            left: '50px',
                            top: '18px',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }]
                },
                tooltip: {
                    shared: true
                },
                series: [{
                    type: 'column',
                    name: 'Cash In',
                    data: ".json_encode($Cash[0]).",
                    color:'#0e9aa7',
                    tooltip: {
                        valueSuffix: '  jt'
                    }
                }, {
                    type: 'column',
                    name: 'Cash Out',
                    color:'#ff6f69',
                    data: ".json_encode($Cash[1]).",
                    tooltip: {
                        valueSuffix: ' jt'
                    }
                }]
            });
            
            //PENDAPATAN
            Highcharts.chart('dash_chart_pend', {
                chart: {
                    type: 'area',
                    height: (9 / 16 * 100) + '%' // 16:9 ratio
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Budget',
                    data: ".json_encode($Pend[1]).",
                    color: '#dd4b39'
                }, {
                    name: 'Actual',
                    data: ".json_encode($Pend[0]).",
                    color: '#4285F4'
                }]
            });
            
            
            //BEBAN
            Highcharts.chart('dash_chart_beban', {
                chart: {
                    type: 'area',
                    height: (9 / 16 * 100) + '%' // 16:9 ratio
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Budget',
                    data: ".json_encode($Beb[1]).",
                    color: '#dd4b39'
                }, {
                    name: 'Actual',
                    data: ".json_encode($Beb[0]).",
                    color: '#4285F4'
                }]
            });
            
            //BEBAN
            Highcharts.chart('dash_chart_laba', {
                chart: {
                    type: 'line',
                    height: (9 / 16 * 100) + '%' // 16:9 ratio
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Laba',
                    data: ".json_encode($Laba[1]).",
                    color: '#4285F4'
                }]
            });
            
            $('.panel').on('click', '#btn-refresh', function(){
                location.reload();
            });
            
            </script>";
            echo"
            </div>
        </div>";
       
        

		return "";
	}
	
}
?>
