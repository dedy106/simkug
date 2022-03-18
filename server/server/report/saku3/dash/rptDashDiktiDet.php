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
class server_report_saku3_dash_rptDashDiktiDet extends server_report_basic
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
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $jenis=$tmp[2];
        $kunci=$tmp[3];
        $kode_pp=$tmp[4];
        $nik=$tmp[5];
        $nama=$tmp[6];
        $kode_fs=$tmp[7];
        
        if($jenis =="all"){
            if(substr($nama,0,3) =="Kas"){
                $judul="Kas Bank";
                $sqlKas= "select c.kode_akun,d.nama,so_akhir,e.format
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='$kode_fs' and c.periode='$periode' and a.kode_grafik ='DB10' and c.so_akhir<>0
                order by c.kode_akun";

                // echo $sqlKas;

                $tbl3='';
                $res = $dbLib->execute($sqlKas);
                while ($row = $res->FetchNextObject(false)){
                    // $Kas["series"][] = array($row->nama,round(floatval($row->so_akhir))); 

                    $KasSr[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_akun);                   
                    $ctgkas[]=$row->nama;
                    $format=$row->format;

                    if($row->so_akhir <> "" OR $row->so_akhir <> NULL){
                            $tbl3 .= "
                            <tr>
                                <td>".$row->kode_akun."</td>
                                <td>".$row->nama."</td>
                                <td>".number_format($row->so_akhir,0,",",".")."</td>
                            </tr>
                            ";
                    }
                }	                    
                   

            }
            if(substr($nama,0,3)=="Pen"){
                $judul="Pendapatan";
                $sqlPdptU = "select b.kode_grafik,b.kode_lokasi,b.kode_neraca,e.nama,-e.n4 as so_akhir, c.format 
                from db_grafik_d b
                inner join exs_neraca e on b.kode_neraca=e.kode_neraca and b.kode_lokasi=e.kode_lokasi and b.kode_fs=e.kode_fs
                inner join db_grafik_m c on b.kode_grafik=c.kode_grafik and b.kode_lokasi=c.kode_lokasi 
                where b.kode_grafik in ('DB05','DB09') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.n4 <> 0 and e.kode_fs='$kode_fs' ";
                
                $res = $dbLib->execute($sqlPdptU);
                $so_akhir=0;
                while ($row = $res->FetchNextObject(false)){
                    $format=$row->format;
                    if ($format =="Jutaan"){
                        $pembagi=1000000;
                    }else if ($format == "Satuan"){
                        $pembagi=1000;
                    }else{
                        $pembagi=1;
                    }
                    // $PdptU["series"][] = array($row->nama,round(floatval($row->so_akhir)));
                    $PdptS[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_neraca);        
                    $ctgPdptU[]=$row->nama;
                   
                }
                

                $sqltotPU= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then -a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then -a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then -a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then -a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then -a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then -a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then -a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then -a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then -a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then -a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then -a.n4 else 0 end) n11,
                sum(case when substring(a.periode,5,2)='12' then -a.n4 else 0 end) n12	   
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB05') and a.kode_fs='$kode_fs'
                group by a.kode_lokasi";

                $sqltotPL= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then -a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then -a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then -a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then -a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then -a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then -a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then -a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then -a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then -a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then -a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then -a.n4 else 0 end) n11,
                sum(case when substring(a.periode,5,2)='12' then -a.n4 else 0 end) n12	   
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB09' and a.kode_fs='$kode_fs'
                group by a.kode_lokasi";

                $resPU = $dbLib->execute($sqltotPU);
                while ($row = $resPU->FetchNextObject(false)){

                    $n1=$row->n1;
                    $n2=$row->n2;
                    $n3=$row->n3;
                    $n4=$row->n4;
                    $n5=$row->n5;
                    $n6=$row->n6;
                    $n7=$row->n7;
                    $n8=$row->n8;
                    $n9=$row->n9;
                    $n10=$row->n10;
                    $n11=$row->n11;
                    $n12=$row->n12;

                    
                }

                $PdptUs = array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

            
                $resPL = $dbLib->execute($sqltotPL);
                while ($row = $resPL->FetchNextObject(false)){

                    $n1=$row->n1;
                    $n2=$row->n2;
                    $n3=$row->n3;
                    $n4=$row->n4;
                    $n5=$row->n5;
                    $n6=$row->n6;
                    $n7=$row->n7;
                    $n8=$row->n8;
                    $n9=$row->n9;
                    $n10=$row->n10;
                    $n11=$row->n11;
                    $n12=$row->n12;
                   
                }

                $PdptL = array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );
                
                $res = $dbLib->execute($sqltotPU." union ".$sqltotPL);
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;


                while ($row = $res->FetchNextObject(false)){

                    $n1=$n1+$row->n1;
                    $n2=$n2+$row->n2;
                    $n3=$n3+$row->n3;
                    $n4=$n4+$row->n4;
                    $n5=$n5+$row->n5;
                    $n6=$n6+$row->n6;
                    $n7=$n7+$row->n7;
                    $n8=$n8+$row->n8;
                    $n9=$n9+$row->n9;
                    $n10=$n10+$row->n10;
                    $n11=$n11+$row->n11;
                    $n12=$n12+$row->n12;
                }

                $PdptTot = array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

            }
            if(substr($nama,0,3)=="Beb"){
                $judul="Beban";
                $sqlBebanU = "select b.kode_grafik,b.kode_lokasi,b.kode_neraca,e.nama,e.n4 as so_akhir from db_grafik_d b
                inner join exs_neraca e on b.kode_neraca=e.kode_neraca and b.kode_lokasi=e.kode_lokasi and b.kode_fs=e.kode_fs 
                where b.kode_grafik in ('DB06','DB07') and b.kode_lokasi='$kode_lokasi' and e.periode='$periode' and e.n4 <> 0 and e.kode_fs='$kode_fs'";

                $res = $dbLib->execute($sqlBebanU);
                while ($row = $res->FetchNextObject(false)){
                    // $BebanU["series"][] = array($row->nama,round(floatval($row->so_akhir)));

                    $BebanS[]=array('y'=>floatval($row->so_akhir),'name'=>$row->nama,'key'=>$row->kode_neraca);        
                    $ctgBebanU[]=$row->nama;
                }
                

                $sqltotBU= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.n4 else 0 end) n11,
                sum(case when substring(a.periode,5,2)='12' then a.n4 else 0 end) n12	   
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB06' and a.kode_fs='$kode_fs'
                group by a.kode_lokasi";

                $sqltotBL= "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then a.n4 else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.n4 else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.n4 else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.n4 else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.n4 else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.n4 else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.n4 else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.n4 else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.n4 else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.n4 else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.n4 else 0 end) n11,
                sum(case when substring(a.periode,5,2)='12' then a.n4 else 0 end) n12	   
                from exs_neraca a
				inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB07' and a.kode_fs='$kode_fs'
                group by a.kode_lokasi";

                $resBU = $dbLib->execute($sqltotBU);
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                while ($row = $resBU->FetchNextObject(false)){
                    $n1=$n1+$row->n1;
                    $n2=$n2+$row->n2;
                    $n3=$n3+$row->n3;
                    $n4=$n4+$row->n4;
                    $n5=$n5+$row->n5;
                    $n6=$n6+$row->n6;
                    $n7=$n7+$row->n7;
                    $n8=$n8+$row->n8;
                    $n9=$n9+$row->n9;
                    $n10=$n10+$row->n10;
                    $n11=$n11+$row->n11;
                    $n12=$n12+$row->n12;
                }

                $BebanBU=array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

                $resBL = $dbLib->execute($sqltotBL);
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                while ($row = $resBL->FetchNextObject(false)){
                    $n1=$n1+$row->n1;
                    $n2=$n2+$row->n2;
                    $n3=$n3+$row->n3;
                    $n4=$n4+$row->n4;
                    $n5=$n5+$row->n5;
                    $n6=$n6+$row->n6;
                    $n7=$n7+$row->n7;
                    $n8=$n8+$row->n8;
                    $n9=$n9+$row->n9;
                    $n10=$n10+$row->n10;
                    $n11=$n11+$row->n11;
                    $n12=$n12+$row->n12;
                }

                $BebanBL=array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );
                
                $res = $dbLib->execute($sqltotBU." union all ".$sqltotBL);
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                while ($row = $res->FetchNextObject(false)){
                    $n1=$n1+$row->n1;
                    $n2=$n2+$row->n2;
                    $n3=$n3+$row->n3;
                    $n4=$n4+$row->n4;
                    $n5=$n5+$row->n5;
                    $n6=$n6+$row->n6;
                    $n7=$n7+$row->n7;
                    $n8=$n8+$row->n8;
                    $n9=$n9+$row->n9;
                    $n10=$n10+$row->n10;
                    $n11=$n11+$row->n11;
                    $n12=$n12+$row->n12;
                }

                $BebanTot=array(
                    round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

            }
            if(substr($nama,0,3)=="Lab"){
                $judul="Laba Rugi";

                $sqlLB = "select a.kode_lokasi,
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
                sum(case when substring(a.periode,5,2)='12' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12	   
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik='DB04'  and a.kode_fs='$kode_fs' --a.kode_neraca='10' 
                group by a.kode_lokasi";
        
                $res = $dbLib->execute($sqlLB);
                while ($row = $res->FetchNextObject(false)){
                    $LB["series"][] = array("name" =>"Laba Rugi", "data" => array(
                                                    round(floatval($row->n1)), round(floatval($row->n2)), round(floatval($row->n3)), 
                                                    round(floatval($row->n4)), round(floatval($row->n5)), round(floatval($row->n6)),
                                                    round(floatval($row->n7)), round(floatval($row->n8)), round(floatval($row->n9)), 
                                                    round(floatval($row->n10)), round(floatval($row->n11)), round(floatval($row->n12))
                                                ));
                }	
        
               

            }
            if(substr($nama,0,2)=="OR"){
                $judul="Rasio Profitabilitas";
                
                $sqlRasio = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or (b.jenis_akun='Neraca' and b.modul='P') then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
                from db_rasio_d a
                inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
                inner join exs_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and b.kode_fs=c.kode_fs
                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_fs='$kode_fs' order by a.kode_rasio";

                $ini = $dbLib->execute($sqlRasio);
                
                while ($row = $ini->FetchNextObject(false)){
                    $nilai2[] =(array)$row;
                }
                

                $daftar = array();

                for($i=0; $i<count($nilai2); $i++){
                    if(!ISSET($daftar[$nilai2[$i]['kode_rasio']])){
                        $daftar[$nilai2[$i]['kode_rasio']] = array('nama_rasio' => $nilai2[$i]['nama_rasio'], 'rumus' => $nilai2[$i]['rumus'], 'par'=>array());
                    }

                    $daftar[$nilai2[$i]['kode_rasio']]['par'][] = array(
                        'kode_neraca'=>$nilai2[$i]['kode_neraca'],
                        'nilai2'=>$nilai2[$i]['nilai2']
                    );
                }

                $tbl = '';

                foreach($daftar as $data){
                        $par = '';
                        for($x=0; $x<count($data['par']); $x++){

                            $kode_neraca= str_replace("-","",$data['par'][$x]['kode_neraca']);
                   
                            $par .= $kode_neraca." = ".$data['par'][$x]['nilai2']."<br>";

                            ${"a" . $kode_neraca} = $data['par'][$x]['nilai2'];
                        }

                        $rasioGr["series"][] = array($data['nama_rasio'],round(eval('return'.$data['rumus'].';'),2));
                        $ctgRasio[]=$data['nama_rasio'];

                        // eval('return'.$data['rumus'].';');
                }

               
            }
        }


		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDikti','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		
        echo"
                <div id='sai_home_grafik'>";
        if(substr($nama,0,3) == "Kas"){
            echo"
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='nav-tabs-custom'>
                            <ul class='nav nav-tabs pull-right'>
                                <li class='active'><a href='#tab_1' data-toggle='tab'>Chart</a></li>
                                <li><a href='#tab_2' data-toggle='tab'>Data</a></li>
                                <li class='pull-left header'><i class='fa fa-bar-chart'></i> Kas Bank </li>
                            </ul>
                            <div class='tab-content sai-container-overflow'>
                                <div class='tab-pane active' id='tab_1'>
                                    <div id='dash_kas_bank_chart'></div>
                                </div>
                                <div class='tab-pane' id='tab_2'>
                                    <div id='dash_kas_bank_data'>
                                        <table class='table table-bordered' id='table-kas-bank'>
                                        <thead>
                                        <tr>
                                            <th width='100px'>Kode Akun</th>
                                            <th width='400px'>Nama Akun</th>
                                            <th width='100px'>Nilai</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        $tbl3
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";
        }
        if(substr($nama,0,3) == "Pen") {
              echo" <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-primary'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Pendapatan</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_pdpt_usaha'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-md-12'>
                            <div class='box box-success'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Pendapatan</h3>
                                </div>
                                <div class='box-body'>
                                    <div id='dash_main_chart_pdpt_tot'></div>
                                </div>
                            </div>
                        </div>
                    </div>";

        } 
        if(substr($nama,0,3) == "Beb") {
            echo" <div class='row'>
                      <div class='col-md-12'>
                          <div class='box box-primary'>
                              <div class='box-header'>
                                  <i class='fa fa-bar-chart'></i>
                                  <h3 class='box-title'>Beban</h3>
                              </div>
                              <div class='box-body'>
                                  <div id='dash_main_chart_beban'></div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class='row'>
                      <div class='col-md-12'>
                          <div class='box box-success'>
                              <div class='box-header'>
                                  <i class='fa fa-bar-chart'></i>
                                  <h3 class='box-title'>Beban</h3>
                              </div>
                              <div class='box-body'>
                                  <div id='dash_main_chart_beban_tot'></div>
                              </div>
                          </div>
                      </div>
                  </div>";
        }
      if(substr($nama,0,3) == "Lab"){
    echo"<div class='row'>
          <div class='col-md-12'>
              <div class='box box-warning'>
                  <div class='box-header'>
                      <i class='fa fa-bar-chart'></i>
                      <h3 class='box-title'>Laba Rugi</h3>
                  </div>
                  <div class='box-body'>
                      <div id='dash_main_chart_labarugi'></div>
                  </div>
              </div>
          </div>
      </div>
      ";
      } 
      if(substr($nama,0,2) == "OR") {
        echo"<div class='row'>
                <div class='col-md-12'>
                    <div class='box box-warning'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Rasio </h3>
                        </div>
                        <div class='box-body'>
                            <div id='dash_main_chart_rasio'></div>
                        </div>
                    </div>
                </div>

            </div>";
      }                   
            echo"    </div>
                </div>
                </div>
            </div>";
    
        echo "<script type='text/javascript'>";
        if(substr($nama,0,3) == "Kas"){
            
            echo "
        
            var options6 = {
                chart: {
                    renderTo: 'dash_kas_bank_chart',
                    type: 'column'
                },
                title:{
                    text:''
                },
                exporting: { 
                    enabled: false
                },
                series: [{
                    name : 'Saldo Akhir',
                    data : ".json_encode($KasSr).",
                    colorByPoint : true
                }],
                xAxis: {
                    title: {
                        text: null
                    },
                    categories: ".json_encode($ctgkas).",
                },
                yAxis:{
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                credits: {
                    enabled: false
                },
            };

            options6.plotOptions = {
                series: {
                    dataLabels: {
                        enabled: true
                    },
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                //var id = this.name;    
                                var kd= this.options.key;                     
                                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|NrcKas|'+kd+'|$kode_fs');
                            }
                        }
                    }
                }
            };

            new Highcharts.Chart(options6);

            var table2 = $('#table-kas-bank').DataTable({
                // 'fixedHeader': true,
                'scrollY': '300px',
                // 'scrollX': '0px',
                'scrollCollapse': true,
                'order': [[ 1, 'asc' ]]
            });
            table2.columns.adjust().draw();
                    
                ";
        }
        if(substr($nama,0,3) == "Pen"){ 
        echo"
                var options3 = {
                    chart: {
                        renderTo: 'dash_main_chart_pdpt_usaha',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{ 
                         name : 'Saldo Akhir',
                         data :".json_encode($PdptS).",
                         colorByPoint: true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgPdptU).",
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                };

                options3.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    // var id = this.name;    
                                    var kd= this.options.key;
                                    // alert(kd);                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|NrcL|'+kd+'|$kode_fs');
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options3);

               
                var options5 = {
                    chart: {
                        renderTo: 'dash_main_chart_pdpt_tot',
                        type: 'line'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{
                        name: 'Pendapatan Usaha',
                        data: ".json_encode($PdptUs).",
                        color:'#0d204c'
                    }, {
                        name: 'Pendapatan lain-lain',
                        data: ".json_encode($PdptL).",
                        color:'#529ecc'
                    }, {
                        name: 'Pendapatan Total',
                        data: ".json_encode($PdptTot).",
                        color: '#aa1d05'
                    }],                    
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                };

                options5.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.name;    
                                    var kd= this.options.key;
                                    // alert(kd);                        
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options5);
        ";
        }
        if(substr($nama,0,3) == "Beb"){
                echo"
                var options9 = {
                    chart: {
                        renderTo: 'dash_main_chart_beban',
                        type: 'column'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{ 
                        name : 'Saldo Akhir',
                        data :".json_encode($BebanS).",
                        colorByPoint: true
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ".json_encode($ctgBebanU).",
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                };

                options9.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    //var id = this.name;    
                                    var kd= this.options.key;
                                    // alert(kd);                        
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashDiktiDet2','','$kode_lokasi|$periode|$nik|$kode_pp|$jenis|$kunci|$nama|NrcL|'+kd+'|$kode_fs');
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options9);

                
                var options11 = {
                    chart: {
                        renderTo: 'dash_main_chart_beban_tot',
                        type: 'line'
                    },
                    title:{
                        text:''
                    },
                    exporting: { 
                        enabled: false
                    },
                    series: [{
                        name: 'Beban Usaha',
                        data: ".json_encode($BebanBU)."
                    }, {
                        name: 'Beban lain-lain',
                        data: ".json_encode($BebanBL)."
                    }, {
                        name: 'Beban Total',
                        data: ".json_encode($BebanTot)."
                    }],
                    xAxis: {
                        title: {
                            text: null
                        },
                        categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
                    },
                    yAxis:{
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                };

                options11.plotOptions = {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var id = this.name;    
                                    var kd= this.options.key;
                                    // alert(kd);                        
                                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                                }
                            }
                        }
                    }
                };

                new Highcharts.Chart(options11);
        ";
        }
        if(substr($nama,0,3) == "Lab"){
            echo "var options = {
                chart: {
                    renderTo: 'dash_main_chart_labarugi',
                    type: 'line'
                },
                title:{
                    text:''
                },
                exporting: { 
                    enabled: false
                },
                series: ".json_encode($LB["series"]).",
                xAxis: {
                    title: {
                        text: null
                    },
                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
                },
                yAxis:{
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                credits: {
                    enabled: false
                },
            };
    
            options.plotOptions = {
                series: {
                    dataLabels: {
                        enabled: true
                    },
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                var id = this.name;    
                                var kd= this.options.key;
                                // alert(kd);                        
                                // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                            }
                        }
                    }
                }
            };
    
            new Highcharts.Chart(options);
    
    
            ";
        }

        if(substr($nama,0,2) == "OR"){
            echo"
            var options2 = {
                chart: {
                    renderTo: 'dash_main_chart_rasio',
                    type: 'column'
                },
                title:{
                    text:''
                },
                exporting: { 
                    enabled: false
                },
                series: [{
                    name : 'Rasio',
                    data : ".json_encode($rasioGr["series"]).",
                    colorByPoint : true
                }],
                xAxis: {
                    title: {
                        text: null
                    },
                    categories: ".json_encode($ctgRasio).",
                },
                yAxis:{
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                credits: {
                    enabled: false
                },
            };
    
            options2.plotOptions = {
                series: {
                    dataLabels: {
                        enabled: true
                    },
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                var id = this.name;    
                                var kd= this.options.key;                     
                                // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTghDetail','','$kode_lokasi/$periode/nis/'+kd);
                            }
                        }
                    }
                }
            };
    
            new Highcharts.Chart(options2);    



    ";
    }
        echo"
			</script>
 	";

        
		return "";
	}
	
}
?>
