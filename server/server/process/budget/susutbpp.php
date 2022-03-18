<?php
uses("server_util_Pdf");
uses("server_BasicObject");
uses("server_util_Map");
uses("server_DBConnection_dbLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_process_budget_susutbpp extends server_BasicObject
{				
	function __construct()
	{
		parent::__construct();		
	}
	protected function doSerialize()
	{
		parent::doSerialize();		
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}
	function saveData($no_bukti,$lokasi, $tgl, $tahun,$periode,$user){				
		global $dbLib;
		$sql1 =  "select a.no_fa,a.nama,a.nilai,a.tgl_perolehan,a.kode_pp2 as kode_pp,".
				 "	b.kode_akun,b.akun_bp,b.akun_deprs,".
				 "	a.persen,a.umur,round(a.nilai * a.persen/100/12,0) as nilai_susut ".
				 "  ,  case when (datediff(month,a.tgl_susut,'".$tgl."')+1) * (round(a.nilai * a.persen/100/12,0)) < 0 then 0 else (datediff(month,a.tgl_susut,'".$tgl."')+1) * (round(a.nilai * a.persen/100/12,0)) end as akum_susut ".
				 "	,  case when datediff(month,a.tgl_susut,'".$tgl."')+1 > 0 then (case when (a.umur - (case when (datediff(month,a.tgl_susut,'".$tgl."')+1) < a.umur then (datediff(month,a.tgl_susut,'".$tgl."')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'".$tgl."')+1) < a.umur then (datediff(month,a.tgl_susut,'".$tgl."')+1) else a.umur end)) end) else (12 + datediff(month,a.tgl_susut,'".$tgl."')+1) end as sisa_umur  ".
				 "	, (case when datediff(month,a.tgl_susut,'".$tgl."')+1 > 0 then (case when (a.umur - (case when (datediff(month,a.tgl_susut,'".$tgl."')+1) < a.umur then (datediff(month,a.tgl_susut,'".$tgl."')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'".$tgl."')+1) < a.umur then (datediff(month,a.tgl_susut,'".$tgl."')+1) else a.umur end)) end) else (12 + datediff(month,a.tgl_susut,'".$tgl."')+1) end) * (round(a.nilai * a.persen/100/12,0)) as susutnext  ".										 
				 "	,  case a.jenis_agg when 'P' then 'ESTIMASI' when 'T' then 'TAMBAH' when 'E' then 'EXIST' end as jenis_agg,a.periode_susut,a.kode_rka2 ".
				 "from agg_fa_asset a ".	
				 "	inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun ".										 
				 "where a.kode_lokasi='".$lokasi."' and a.tahun='".$tahun."' and ".
				 "	case when (a.umur - (case when (datediff(month,a.tgl_susut,'".$tgl."')+1) < a.umur then (datediff(month,a.tgl_susut,'".$tgl."')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'".$tgl."')+1) < a.umur then (datediff(month,a.tgl_susut,'".$tgl."')+1) else a.umur end)) end > 0 ".
				 "order by a.no_fa";
				 
		$sql2 =  "select ".
				 "a.no_fa,a.nama,a.nilai,a.tgl_perolehan,a.kode_pp3 as kode_pp, ".
				 "z.kode_akun, ".
				 "cc.kode_param,b.kode_akun as akun_bpp,". 	
				 "case when (datediff(month,a.tgl_perolehan,'".$tgl."')+1) <0 then 0 else (datediff(month,a.tgl_perolehan,'".$tgl."')+1) end as umur, ". 	
				 "b.satuan,round(b.tarif*b.jumlah*b.volume,0) * a.jumlah as nilai_sat,case when b.jns_periode <> 'X' then b.jns_periode else substring(periode,5,2) end as jns_periode,".
				 "case when substring(b.jns_periode,1,1) = 'A' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * (4 - case when datediff(month,a.tgl_perolehan,'".$tgl."')+1 >= 0 then 0 else   ceiling(cast(abs(datediff(month,a.tgl_perolehan,'".$tgl."')+1) as float)/3) end )".
				 "     when substring(b.jns_periode,1,1) = 'B' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * (2 - case when datediff(month,a.tgl_perolehan,'".$tgl."')+1 >= 0 then 0 else   ceiling(cast(abs(datediff(month,a.tgl_perolehan,'".$tgl."')+1) as float)/6) end) ".
				 "     when substring(b.jns_periode,1,1) = 'C' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * case when datediff(month,a.tgl_perolehan,'".$tgl."')+1 >= 0 then 12 else 12 + datediff(month,a.tgl_perolehan,'".$tgl."')+1 end ".
				 "     else round(a.jumlah*b.tarif*b.jumlah*b.volume,0) end as total, ".
				 "case a.jenis_agg when 'P' then 'ESTIMASI' when 'T' then 'TAMBAH' when 'E' then 'EXIST' end as jenis_agg,cc.kode_rka as kode_rka3,a.periode as prd ".
				 "from agg_fa_asset a ".						 
				 "	inner join agg_fa_klpakun z on a.kode_klpakun=z.kode_klpakun ".						 
				 "	inner join agg_fa_klp bb on a.kode_klpfa=bb.kode_klpfa ".		
				 "	inner join agg_fa_param_d b on bb.kode_klpfa=b.kode_klpfa and b.kode_lokasi ='".$lokasi."' and b.tahun = '".$tahun."' ".		
				 "	inner join agg_fa_param_m cc on b.kode_param = cc.kode_param and b.kode_lokasi='".$lokasi."' ".				 
				 "where a.status_aktif='1' and a.tahun='".$tahun."' and a.kode_lokasi = '".$lokasi."' ".
				 "order by a.no_fa";
		$rs1 = $dbLib->execute($sql1);		
		
		$sql = new server_util_arrayList();
		$sql->add("delete from agg_d where modul in ('ASSET','BP','BPP') and tahun = '".$tahun."' and kode_lokasi='".$lokasi."'");
		$sql->add("delete from agg_fasusut_d where tahun = '".$tahun."' and kode_lokasi='".$lokasi."'");
		$sql->add("delete from agg_fasusut_m where tahun ='".$tahun."' and kode_lokasi='".$lokasi."'");
		
		$total = 0; 		
		$total2 = 0;
		$sql->add("insert into agg_fasusut_m (no_susut,kode_lokasi,tahun) values ".
				"('".$no_bukti."','".$lokasi."','".$tahun."')");				
		
		while ($line = $rs1->FetchNextObject(false)){
			$sql->add("insert into agg_fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,progress,tahun) values ".
					"('".$no_bukti."','".$line->no_fa."','".$periode."',". $line->akum_susut.",'".$lokasi."','".$line->akun_bp. "','". $line->akun_deprs ."','". $line->kode_pp ."','".$line->kode_rka2."','".$line->kode_akun."','D','-','BP','".$line->jenis_agg."','F','0','".$tahun."')");
			
			if (substr($line->periode_susut,0,4) == $tahun) {
				$k = floatval(substr($line->periode_susut,4,2));
				$xx = 12;
			}
			else {
				$k = 1;
				$xx = $line->sisa_umur;				
			}
			//prd sst = 2 = k=02; 12
			for ($j=$k; $j <= $xx; $j++){
				$sql->add("insert into agg_fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,progress,tahun) values ".
						"('".$no_bukti."','".$line->no_fa."','".$tahun.($j<10?"0":"").$j."',".$line->nilai_susut.",'".$lokasi."','".$line->akun_bp."','".$line->akun_deprs."','".$line->kode_pp."','".$line->kode_rka2."','".$line->kode_akun."','D','-','BP','".$line->jenis_agg."','F','0','".$tahun."')");
			}
			$total += $line->susutnext;
		}
		$rs2 = $dbLib->execute($sql2);
		while ($line = $rs2->FetchNextObject(false)){
				/*
				//tgl_perolehan terformat d-mm-yyyy
				$total2 += $line->total;
				$prd = $line->tgl_perolehan;
				$prd = explode("-",$prd);
				if ($prd[2] == $tahun)
					$prd = floatval($prd[1]);
				else $prd = 1;
				*/
				if (substr($line->prd,0,4) == $tahun) {
					$prd = floatval(substr($line->prd,4,2));
				}
				else {
					$prd = 1;
				}
				//------------- 				
				if (substr($line->jns_periode,0,1) == "C") {
					$vJml = 12;
					for ($j=$prd; $j <= $vJml; $j++){
						$nBPP = round($line->nilai_sat);
						$sql->add("insert into agg_fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,progress,tahun,kode_param) values ".
								"('". $no_bukti ."','".$line->no_fa."','".$tahun.($j<10?"0":"").$j."',".$nBPP.",'".$lokasi."','".$line->akun_bpp."','-','".$line->kode_pp."','".$line->kode_rka3."','".$line->kode_akun."','D','-','BPP','".$line->jenis_agg."','F','0','".$tahun."','".$line->kode_param."')");
					}
				}
				else {
					if (substr($line->jns_periode,0,1) == "B") {						
						$vJml = 2;
						$prd = (floor(($prd - 1 ) / 6) + 1);
						$nBPP = round($line->nilai_sat);
						$bln;
						for ($j=$prd;$j <= $vJml;$j++){
							$bln = $j * 6 - 5;
							$sql->add("insert into agg_fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,progress,tahun,kode_param) values ".
								"('". $no_bukti ."','".$line->no_fa."','".$tahun.($bln<10?"0":"").$bln."',".$nBPP.",'".$lokasi."','".$line->akun_bpp."','-','".$line->kode_pp."','".$line->kode_rka3."','".$line->kode_akun."','D','-','BPP','".$line->jenis_agg."','F','0','".$tahun."','".$line->kode_param."')");
						}							
					}
					else {
						if (substr($line->jns_periode,0,1) == "A") {
							$vJml = 4;
							$prd = (floor(($prd - 1 ) / 3) + 1);
							$nBPP = round($line->nilai_sat);								
							for ($j=$prd;$j <= $vJml;$j++){
								$bln = $j * 3 - 2;
								$sql->add("insert into agg_fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,progress,tahun,kode_param) values ".
									"('". $no_bukti ."','".$line->no_fa."','".$tahun.($bln<10?"0":"").$bln."',".$nBPP.",'".$lokasi."','".$line->akun_bpp."','-','".$line->kode_pp."','".$line->kode_rka3."','".$line->kode_akun."','D','-','BPP','".$line->jenis_agg."','F','0','".$tahun."','".$line->kode_param."')");
							}
							
						} else {
							$nBPP = round($line->nilai_sat);
							$sql->add("insert into agg_fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,progress,tahun,kode_param) values ".
									"('". $no_bukti ."','".$line->no_fa."','".$tahun.$line->jns_periode."',".$nBPP.",'".$lokasi."','".$line->akun_bpp."','-','".$line->kode_pp."','".$line->kode_rka3."','".$line->kode_akun."','D','-','BPP','".$line->jenis_agg."','F','0','".$tahun."','".$line->kode_param."')");
						}
					}
				}
		}
		$sql->add("update agg_fasusut_m set nilai_bp= ".$total.", nilai_bpp=". $total2." where no_susut = '". $no_bukti."' ");
		$sql->add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,jenis_agg,progress,keterangan) ".
					"       select a.kode_lokasi,'-',a.kode_drk,a.no_fa,b.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai,'".$tahun."','".$no_bukti."','ASSET',a.jenis_agg,'0' as progress,a.nama as nama_aktap ".
					"		from agg_fa_asset a inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun ".										
					"		where a.jenis_agg='T' and a.tahun='".$tahun."' and a.kode_lokasi='".$lokasi."' and a.nilai <>0 ".
					"		union ".
					"		select a.kode_lokasi,'-',a.kode_drk,a.no_fa,a.akun_bp,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai,'".$tahun."','".$no_bukti."',a.status,".
					"              case when a.jenis_agg = 'EXIST' then 'E' when a.jenis_agg = 'ESTIMASI' then 'P' else 'T' end as jenis,'0' as progress,b.nama as nama_rka  ".
					"		from agg_fasusut_d a inner join agg_drk b on a.kode_drk=b.kode_drk and b.tahun ='".$tahun."'".					
					"		where a.periode like '".$tahun."%' and a.progress = '0' and a.tahun='".$tahun."' and a.kode_lokasi='".$lokasi."' and a.status = 'BP' and a.nilai<>0 ".
					"		union ".
					"		select a.kode_lokasi,'-',a.kode_drk,a.no_fa,a.akun_bp,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai,'".$tahun."','".$no_bukti."',a.status,".
					"              case when a.jenis_agg = 'EXIST' then 'E' when a.jenis_agg = 'ESTIMASI' then 'P' else 'T' end as jenis,'0' as progress,b.nama as nama_param ".
					"		from agg_fasusut_d a inner join agg_fa_param_m b on a.kode_param=b.kode_param ".					
					"		where a.progress = '0' and a.tahun='".$tahun."' and a.kode_lokasi='".$lokasi."' and a.status = 'BPP' and a.nilai<>0 ");				
		return $dbLib->execArraySQL($sql);			
	}
	function getData($no_bukti,$lokasi, $lokfa, $tgl, $periode){
		
		return $dbLib->execArraySQL($sql);			
	}
}
?>
