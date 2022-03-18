<?php
uses("services_Services");

class services_financial_Bspl extends services_Services{
	
    function __construct()
	{
		parent::__construct();
		
		$this->db = $this->getDb();
    }
	function getDefaultModelPL(){
		$this->getDB();
		$rs = $this->db->execute("select value1 from bpc_rules where kode_rules='MODELREP' and modul = 'BPC' ");
		if ($row = $rs->FetchNextObject(false)){
			return $row->value1;
		}
		return "";
	}
	function setUserId($userid){
		$this->userid = $userid;
	}

	//------ jejer actual AP
    function getDataJejerBSAP($induk, $model, $periode, $tipe, $pembagi){
        global $satuan;
        $modelPL = $this->getDefaultModelPL();

		$this->getDB();
		$this->dbLib = $this->db;
		if (!isset($pembagi)) $pembagi = 1000000000;
        if ($induk == "") $induk = "9000";
		$satuan = $pembagi;
        $lokasi = "9000";
		$thn1 = substr($periode,0,4);
        $bln = substr($periode,4,2);
		///$thn2 = floatval(substr($periode,0,4)) - 1;
        if (strtoupper($tipe) == "GROSS" || $tipe == ""){
            $addFilter = " and not z.kode_cfu in ('CFUE','CFU40C','CFU205','CFUF','CFUG','CFUD')  ";
            $jenis = " and t.jenis in ('TB') ";
			$tipe = "GROSS";
        }else if (strtoupper($tipe) == "NETT"){
            $jenis = " and t.jenis in ('TB','RL','IJ') ";//,'AD'
        }else {
            $jenis = "  ";
			//$jenis = " and t.jenis in ('TB') and t.kode_cfu = case when t.kode_cfu2='-' then t.kode_cfu else t.kode_cfu2 end ";
            $filterBudget = "  ";
        }

			
        	
            $ubis = "";
			$rsUbis = $this->dbLib->execute("select  nama, kode_lokasi, cocd, ba_consol, case when cocd = '9000' then 99 else no_urut end as no_urut from bpc_lokasi where kode_induk in (select kode_lokasi from bpc_lokasi where cocd = '$induk' ) or cocd = '$induk' order by no_urut ");
			$sql = "";
			$field = "";
			$dataUbis = new server_util_Map();
			$rs = $this->dbLib->execute("select ba_consol from bpc_lokasi start with cocd = '$induk' connect by kode_induk = prior kode_lokasi ");
			$ba_console = "";
			if ($induk != "9000"){
				while ($row =$rs->FetchNextObject(false)){
					if ($ba_console != "") $ba_console .= " or ";
					$ba_console .= " t.kode_ubis like '__" . trim($row->ba_consol) ."%' ";
				}
			}
			if ($ba_console != "")
			{
				$ba_console = " and ($ba_console)";
			}
			
			$filterBA = "";
			while ($row = $rsUbis->FetchNextObject(false)){
				$field .= ", 0  as actsd_". $row->cocd. "";
				
				if ($row->cocd != "9000"){
					$ba_console2 = "";
					if ($row->cocd != "9000"){
						$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						$rs = $this->dbLib->execute("select ba_consol from bpc_lokasi start with kode_lokasi = '$row->kode_lokasi' connect by kode_induk = prior kode_lokasi ");
						while ($row2 =$rs->FetchNextObject(false)){
							if ($ba_console2 != "") $ba_console2 .= " or ";
							$ba_console2 .= " t.kode_ubis like '__" . trim($row2->ba_consol) ."%' ";
							$filterBA .= " or ( t.kode_ubis like '__$row2->ba_consol%' ) ";
						}
					}
					if ($ba_console2 != "")
					{
						$ba_console2 = " and ($ba_console2)";
					}
					if ( in_array($row->cocd, array("98","97","96") ) &&  strtoupper($tipe) == "GROSS" ){
						if ($row->cocd == "98" )
							$filterElim = " and t.jenis = 'AD'";
						else if ($row->cocd == "97")
							$filterElim = " and t.jenis = 'RL'";
						else if ($row->cocd == "96")
							$filterElim = " and t.jenis = 'IJ'";

						$sql2 = "select sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                        , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                from bpc_relakun x
                                inner join bpc_sap_tb t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' 
                                where x.kode_fs = '$modelPL' and x.kode_lokasi = '$lokasi' $filterElim $ba_console ";


						$sql = " select x.kode_neraca, nvl(v.actsd, 0) as actsd, nvl(v.actcm, 0) as actcm
							from bpc_neraca x
                            left outer join (select x.kode_neraca
                                        , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                        , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                from bpc_relakun x
                                inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' 
                                where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $filterElim $ba_console group by x.kode_neraca
                               ) v on v.kode_neraca = x.kode_neraca
							where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' 
							union
							select '999999',  sum(nvl(v.actsd, 0)) as actsd,  sum(nvl(v.actcm, 0)) as actcm
							from bpc_masakun a
                            left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                            left outer join (select x.kode_akun
                                                , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                        from bpc_masakun x
                                        inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' 
                                        left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs in ('$model','$modelPL')
                                        where b.kode_akun is null and x.kode_lokasi = '$lokasi' $filterElim $ba_console
                                        group by x.kode_akun
                                        having sum(nvl(t.nilai,0)) <> 0
                            ) v on v.kode_akun = a.kode_akun
							where  a.kode_lokasi = '$lokasi' and x.kode_akun is null
                            having sum(nvl(v.actsd, 0)) <> 0
                            ";
						
						//if ($row->cocd == "1004")
						//	error_log($sql);
					}else {
						/*
						if ($row->ba_consol == "2") {
							$addMetra = " and ( t.kode_ubis like '__$row->ba_consol%' ) ";
							$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						} else {
							$addMetra = " and ( t.kode_ubis like '__$row->ba_consol%')" ;
							$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						}
						*/
						
						$currentPeriode = date("Ym");
						$tgl = floatval( date("d") );
						if ( ( $periode == $currentPeriode or $tgl <= 5) && $row->cocd == "1000" ){
							$sql2 = "select  sum(nvl(case '$bln' when '01' then cf + jan
												when '02' then (cf + jan + feb  )
												when '03' then (cf + jan + feb + mar  )
												when '04' then (cf + jan + feb + mar + apr  )
												when '05' then (cf + jan + feb + mar + apr + mei )
												when '06' then (cf + jan + feb + mar + apr + mei + jun  )
												when '07' then (cf + jan + feb + mar + apr + mei + jun + jul )
												when '08' then (cf + jan + feb + mar + apr + mei + jun + jul + aug )
												when '09' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep )
												when '10' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt )
												when '11' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop )
												when '12' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des)
											end,0)) as actsd,
										sum(nvl(case '$bln' when '01' then jan
													when '02' then feb
													when '03' then mar
													when '04' then apr
													when '05' then mei 
													when '06' then jun 
													when '07' then jul
													when '08' then aug
													when '09' then sep
													when '10' then okt
													when '11' then nop
													when '12' then des
											end,0)) as actcm
									from bpc_relakun x
									inner join cash_mactual t on t.kode_akun = x.kode_akun and t.tahun like '".$thn1."%' 
									where x.kode_fs = '$modelPL' and x.kode_lokasi = '$lokasi' and t.kode_lokasi = '$row->cocd' ";

							$sql = " select x.kode_neraca, nvl(v.actsd, 0) as actsd, nvl(v.actcm, 0) as actcm
								from bpc_neraca x
								left outer join (select x.kode_neraca
											, sum(nvl(case '$bln' when '01' then cf + jan
												when '02' then (cf + jan + feb  )
												when '03' then (cf + jan + feb + mar  )
												when '04' then (cf + jan + feb + mar + apr  )
												when '05' then (cf + jan + feb + mar + apr + mei )
												when '06' then (cf + jan + feb + mar + apr + mei + jun  )
												when '07' then (cf + jan + feb + mar + apr + mei + jun + jul )
												when '08' then (cf + jan + feb + mar + apr + mei + jun + jul + aug )
												when '09' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep )
												when '10' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt )
												when '11' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop )
												when '12' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des)
											end,0)) as actsd,
											sum(nvl(case '$bln' when '01' then jan
														when '02' then feb
														when '03' then mar
														when '04' then apr
														when '05' then mei 
														when '06' then jun 
														when '07' then jul
														when '08' then aug
														when '09' then sep
														when '10' then okt
														when '11' then nop
														when '12' then des
												end,0)) as actcm
									from bpc_relakun x
									inner join cash_mactual t on t.kode_akun = x.kode_akun and t.tahun like '".$thn1."%' and t.kode_lokasi = '$row->cocd' 
									where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'  group by x.kode_neraca
								) v on v.kode_neraca = x.kode_neraca
								where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' 
								union
								select '999999',  sum(nvl(v.actsd, 0)) as actsd,  sum(nvl(v.actcm, 0)) as actcm
								from bpc_masakun a
								left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
								left outer join (select x.kode_akun
											, sum(nvl(case '$bln' when '01' then cf + jan
												when '02' then (cf + jan + feb  )
												when '03' then (cf + jan + feb + mar  )
												when '04' then (cf + jan + feb + mar + apr  )
												when '05' then (cf + jan + feb + mar + apr + mei )
												when '06' then (cf + jan + feb + mar + apr + mei + jun  )
												when '07' then (cf + jan + feb + mar + apr + mei + jun + jul )
												when '08' then (cf + jan + feb + mar + apr + mei + jun + jul + aug )
												when '09' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep )
												when '10' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt )
												when '11' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop )
												when '12' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des)
											end,0)) as actsd,
											sum(nvl(case '$bln' when '01' then jan
														when '02' then feb
														when '03' then mar
														when '04' then apr
														when '05' then mei 
														when '06' then jun 
														when '07' then jul
														when '08' then aug
														when '09' then sep
														when '10' then okt
														when '11' then nop
														when '12' then des
												end,0)) as actcm
											from bpc_masakun x
											inner join cash_mactual t on t.kode_akun = x.kode_akun and t.tahun like '".$thn1."%' and t.kode_lokasi = '$row->cocd' 
											left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs in ('$model','$modelPL')
											where b.kode_akun is null and x.kode_lokasi = '$lokasi' 
											group by x.kode_akun
											having sum(nvl(cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des,0)) <> 0
								) v on v.kode_akun = a.kode_akun
								where  a.kode_lokasi = '$lokasi' and x.kode_akun is null
								having sum(nvl(v.actsd, 0)) <> 0
								";

						}else {
							$sql2 = "select  sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
											, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
									from bpc_relakun x
									inner join BPC_SAP_tb t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
									where x.kode_fs = '$modelPL' and x.kode_lokasi = '$lokasi' $ba_console2 ";

							$sql = " select x.kode_neraca, nvl(v.actsd, 0) as actsd, nvl(v.actcm, 0) as actcm
								from bpc_neraca x
								left outer join (select x.kode_neraca
											, sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
											, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
									from bpc_relakun x
									inner join BPC_SAP_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
									where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $ba_console2 group by x.kode_neraca
								) v on v.kode_neraca = x.kode_neraca
								where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' 
								union
								select '999999',  sum(nvl(v.actsd, 0)) as actsd,  sum(nvl(v.actcm, 0)) as actcm
								from bpc_masakun a
								left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
								left outer join (select x.kode_akun
													, sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
													, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
											from bpc_masakun x
											inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
											left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs in ('$model','$modelPL')
											where b.kode_akun is null and x.kode_lokasi = '$lokasi' $ba_console2
											group by x.kode_akun
											having sum(nvl(t.nilai,0)) <> 0
								) v on v.kode_akun = a.kode_akun
								where  a.kode_lokasi = '$lokasi' and x.kode_akun is null
								having sum(nvl(v.actsd, 0)) <> 0
								";
						}
						
						
					}
				}else {
					$jenis3 = "";//nampilin consol
					if (strtoupper($tipe) == "NETT")
						$jenis3 = " and t.jenis in  ('IJ','RL' )";//'AD',

					if ($filterBA != ""){
						$filtering = substr($filterBA, 4, strlen($filterBA));
						$filtering = " and ( $filtering )";
					}
					if ($induk == "9000"){
						$filtering = "  " ;
						
					}
						//error_log($filtering);
					$sql2 = "select sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                        , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                from bpc_relakun x
                                inner join BPC_SAP_tb t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%'
								where x.kode_fs = '$modelPL' and x.kode_lokasi = '$lokasi'  $filtering 
									 ";
					$sql = " select x.kode_neraca, nvl(v.actsd, 0) as actsd, nvl(v.actcm, 0) as actcm
							from bpc_neraca x
                            left outer join (select x.kode_neraca
                                        , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                        , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                from bpc_relakun x
                                inner join BPC_SAP_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%'
								where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'  $filtering 
									 group by x.kode_neraca
                               ) v on v.kode_neraca = x.kode_neraca
							where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' 
							union
							select '999999',  sum(nvl(v.actsd, 0)) as actsd,  sum(nvl(v.actcm, 0)) as actcm
							from bpc_masakun a
                            left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                            left outer join (select x.kode_akun
                                                , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                        from bpc_masakun x
                                        inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%'  and not t.kode_ubis in ('TE2A','TM2A')
										inner join bpc_lokasi z on z.kode_lokasi = t.kode_lokasi
                                        left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs in ('$model','$modelPL')
                                        where b.kode_akun is null and x.kode_lokasi = '$lokasi'  $filtering and not t.kode_ubis in ('TE2A','TM2A')
                                        group by x.kode_akun
                                        having sum(nvl(t.nilai,0)) <> 0
                            ) v on v.kode_akun = a.kode_akun
							where  a.kode_lokasi = '$lokasi' and x.kode_akun is null
                            having sum(nvl(v.actsd, 0)) <> 0
                            ";
					//error_log($sql);
					
				}
				
                
				
                $rs = $this->dbLib->execute($sql);
				$itemUbis = new server_util_Map();

				while ($line = $rs->FetchNextObject(false)){
					if ($line->kode_neraca == 'PRFT_CALC'){
						$rs2 = $this->dbLib->execute($sql2);
						if ($row2 = $rs2->FetchNextObject(false)){
							$line->actsd = $row2->actsd;
							$line->actcm = $row2->actcm;
						}

					}
					$itemUbis->set($line->kode_neraca, $line);
				}
				$dataUbis->set($row->cocd, $itemUbis);
			}
           
        
            $filterLokasi = ""; 
            if ($induk != "9000")
            	$filterLokasi = " and z.kode_induk in ( select kode_lokasi from bpc_lokasi where cocd = '$induk' ) ";
            //combine TB
			if ($filterBA != ""){
				$filterBA = substr($filterBA, 4, strlen($filterBA));
				$filterBA = " and ( $filterBA )";
			}

            $sql = "select distinct a.kode_neraca, left_pad(a.nama,a.level_spasi) as nama, a.tipe,a.jenis_akun, a.sum_header, a.level_spasi, a.kode_induk, a.rowindex
													, nvl(t.actsd,0) as actsd
													, nvl(t.actsd,0) as actcm
                                                     $field
											from bpc_neraca a
											left outer join (select x.kode_neraca
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
																	where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $filterBA 
                                                                     group by x.kode_neraca
                                                                ) t on t.kode_neraca = a.kode_neraca
                                         where a.kode_fs = '$model' and a.kode_lokasi = '$lokasi' 
										union 
										select '999999','UNMAPPED','-','BEBAN','-',0,'00',1000
                                            , sum(nvl(v.actsd, 0)) as actsd
											, sum(nvl(v.actcm, 0)) as actcm
                                             $field
                                        from bpc_masakun a
                                        left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                                        left outer join (select x.kode_akun
                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                    from bpc_masakun x
                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun  and t.periode like '".$thn1."%' $jenis 
                                                    inner join bpc_lokasi z on z.kode_lokasi = t.kode_lokasi
                                                    left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs in ('$model','$modelPL')
                                                    where  b.kode_akun is null and x.kode_lokasi = '$lokasi' $filterBA
                                                    group by x.kode_akun
                                                    having sum(nvl(t.nilai,0)) <> 0
                                        ) v on v.kode_akun = a.kode_akun
                                        where x.kode_akun is null and a.kode_lokasi ='$lokasi'
                                         order by  rowindex";
            //error_log("console $sql ");
            $rs = $this->dbLib->execute($sql);
            $node = "";
		$rootNode = new server_util_NodeNRC("00");
		$this->sumHeader = new server_util_Map();
		while ($row = $rs->FetchNextObject(false)){
			if ($row->kode_neraca == "PRFT_CALC"){
				$rs2 = $this->dbLib->execute("select sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
												, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
										from bpc_relakun x
										inner join bpc_sap_tb t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
										where x.kode_fs = '$modelPL' and x.kode_lokasi = '$lokasi' $filterBA ");
				if ($row2 = $rs2->FetchNextObject(false)){
					$row->actsd = $row2->actsd;
					$row->actcm = $row2->actcm;
				}
			}


			if ($row->jenis_akun == "PENDAPATAN" || $row->jenis_akun == "LIA" || $row->jenis_akun == "LEQ" || $row->jenis_akun == "EQU"){
				foreach ($dataUbis->getArray() as $key => $itemUbis){
                    $tmp = $itemUbis->get($row->kode_neraca);
                    eval ("\$row->actsd_$key = \$tmp->actsd * -1;");
					eval ("\$row->actcm_$key = \$tmp->actcm * -1;");
				}
				$row->actsd = $row->actsd * -1;
				$row->actcm = $row->actcm * -1;
				$row->jenis = $row->jenis_akun;
			}else {
				foreach ($dataUbis->getArray() as $key => $itemUbis){
                    $tmp = $itemUbis->get($row->kode_neraca);
                    eval ("\$row->actsd_$key = \$tmp->actsd;");
					eval ("\$row->actcm_$key = \$tmp->actcm;");
				}
                $row->jenis = $row->jenis_akun;
			}
			if ($node == ""){
				$node = new server_util_NodeNRC($rootNode);
			}else if ($node->level == floatval($row->level_spasi) - 1 ){
				$node = new server_util_NodeNRC($node);
			}else if ($node->level == floatval($row->level_spasi) ){
				$node = new server_util_NodeNRC($node->owner);
			}else if ($node->level > floatval($row->level_spasi) ){
				while ($node->owner != $rootNode && $node->level > floatval($row->level_spasi) ) {
					$node = $node->owner;
				}
				$node = new server_util_NodeNRC($node->owner);
			}
			$node->setData($row);
			if ($row->tipe == "SUMMARY")
				$this->sumHeader->set($row->kode_neraca, $node);

		}
		//error_log($this->sumHeader->getLength());
		foreach ($rootNode->childs as $key => $val){
			//if ($lokasi == "10")
            {
				$this->summariesJejer($val);
				
				if ($val->data->sum_header != "-"){
					$summaryHeader = explode(",",$val->data->sum_header);

					foreach ($summaryHeader as $header){
						$nodeHeader = $this->sumHeader->get($header);
						if ($nodeHeader){
							foreach ($val->dataArray as $key => $value) {
								if ($key != "jenis_akun" && $key != "jenis" && $key != "kode_neraca" && $key != "nama" && $key != "tipe" && $key != "sum_header" && $key != "level_spasi" && $key != "rowindex"){
									$nodeHeader->dataArray[$key] += $value;
								}
							}
							$nodeHeader->data =(object) $nodeHeader->dataArray;
						}
					}
				}
			}
		}
		//perlu hitung ke summary
		$result = array('rs' => array('rows' => array() ) );
		$this->generateResultJejer($rootNode, $result);
        ///error_log("pembagi $pembagi ");
        //error_log(json_encode($result));
		return ($result);   
    }
    function getDataJejerBSAPDetail($induk, $model, $periode, $neraca, $tipe,  $pembagi){
        global $satuan;
		$this->getDB();
		$this->dbLib = $this->db;
		if (!isset($pembagi)) $pembagi = 1000000000;
		$satuan = $pembagi;
        $lokasi = "9000";
		$modelPL = $this->getDefaultModelPL();
		$thn1 = substr($periode,0,4);
        $bln = substr($periode,4,2);
		///$thn2 = floatval(substr($periode,0,4)) - 1;
        if (strtoupper($tipe) == "GROSS" || $tipe == ""){
            $addFilter = " and not z.kode_cfu in ('CFUE','CFU40C','CFU205','CFUF','CFUG','CFUD')  ";
            $jenis = " and t.jenis in ('TB')";
            
        }else {
            $jenis = "  ";
            
        }
        
        
            $ubis = "";
			$rsUbis = $this->dbLib->execute("select  nama, kode_lokasi, cocd, ba_consol, case when cocd = '9000' then 99 else no_urut end as no_urut from bpc_lokasi where kode_induk in (select kode_lokasi from bpc_lokasi where cocd = '$induk' ) or cocd = '$induk' order by no_urut");
			$sql = "";
			$field = "";
			$dataUbis = new server_util_Map();
			$filterBA = "";
			$rs = $this->dbLib->execute("select ba_consol from bpc_lokasi start with cocd = '$induk' connect by kode_induk = prior kode_lokasi ");
			$ba_console = "";
			if ($induk != "9000"){
				while ($row =$rs->FetchNextObject(false)){
					if ($ba_console != "") $ba_console .= " or ";
					$ba_console .= " t.kode_ubis like '__" . trim($row->ba_consol) ."%' ";
				}
			}
			if ($ba_console != "")
			{
				$ba_console = " and ($ba_console)";
			}
			
			$filterBA = "";
			while ($row = $rsUbis->FetchNextObject(false)){
				$field .= ", 0  as actsd_". $row->cocd. "";
				
				if ($row->cocd != "9000"){
					$ba_console2 = "";
					if ($row->cocd != "9000"){
						$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						$rs = $this->dbLib->execute("select ba_consol from bpc_lokasi start with cocd = '$row->cocd' connect by kode_induk = prior kode_lokasi ");
						while ($row2 =$rs->FetchNextObject(false)){
							if ($ba_console2 != "") $ba_console2 .= " or ";
							$ba_console2 .= " t.kode_ubis like '__" . trim($row2->ba_consol) ."%' ";
							$filterBA .= " or ( t.kode_ubis like '__$row2->ba_consol%' ) ";
						}
					}
					if ($ba_console2 != "")
					{
						$ba_console2 = " and ($ba_console2)";
					}
					if ( in_array($row->cocd, array("98","97","96") ) &&  strtoupper($tipe) == "GROSS" ){
						if ($row->cocd == "98")
							$filterElim = " and t.jenis = 'AD'";
						else if ($row->cocd == "97")
							$filterElim = " and t.jenis = 'RL'";
						else if ($row->cocd == "96")
							$filterElim = " and t.jenis = 'IJ'";
						$sql = " select x.kode_akun,  nvl(v.actsd, 0) as actsd,  nvl(v.actcm, 0) as actcm
							from bpc_relakun x
                            left outer join (select x.kode_akun
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' 
                                                                    where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $filterElim $ba_console
																	group by x.kode_akun
                                                                ) v on v.kode_akun = x.kode_akun
                                                 
							where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' and x.kode_neraca = '$neraca'
                            union
							select a.kode_akun, sum(nvl(v.actsd, 0)) as actsd, sum(nvl(v.actcm, 0)) as actcm
							from bpc_masakun a
                            left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                            left outer join (select x.kode_akun
                                                , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                        from bpc_masakun x
                                        inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun  and t.periode like '".$thn1."%'
                                        left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
                                        where b.kode_akun is null and x.kode_lokasi = '$lokasi' $filterElim $ba_console
                                        group by x.kode_akun
                                        having sum(nvl(t.nilai,0)) <> 0
                            ) v on v.kode_akun = a.kode_akun
							where  a.kode_lokasi = '$lokasi' and x.kode_akun is null and '999999' = '$induk'
                            group by a.kode_akun
                            having sum(nvl(v.actsd, 0)) <> 0";
							
					}else {
						//$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						/*
						if ($row->ba_consol == "2") {
							$addMetra = " and ( t.kode_ubis like '__$row->ba_consol%' or t.kode_ubis like  'TE%' or t.kode_ubis like 'TM%' or t.kode_ubis like 'TD%' ) ";
							$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' or t.kode_ubis like  'TE%' or t.kode_ubis like 'TM%' or t.kode_ubis like 'TD%' ) ";
						} else {
							$addMetra = " and ( t.kode_ubis like '__$row->ba_consol%')" ;
							$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						}
						*/
						$currentPeriode = date("Ym");
						$tgl = floatval( date("d") );
						
						if (( $periode == $currentPeriode or $tgl <= 5)  && $row->cocd == "1000"){
							$sql = " select x.kode_akun, nvl(v.actsd, 0) as actsd, nvl(v.actcm, 0) as actcm
								from bpc_relakun x
								left outer join (select x.kode_akun
											, sum(nvl(case '$bln' when '01' then cf + jan
												when '02' then (cf + jan + feb  )
												when '03' then (cf + jan + feb + mar  )
												when '04' then (cf + jan + feb + mar + apr  )
												when '05' then (cf + jan + feb + mar + apr + mei )
												when '06' then (cf + jan + feb + mar + apr + mei + jun  )
												when '07' then (cf + jan + feb + mar + apr + mei + jun + jul )
												when '08' then (cf + jan + feb + mar + apr + mei + jun + jul + aug )
												when '09' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep )
												when '10' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt )
												when '11' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop )
												when '12' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des)
											end,0)) as actsd,
											sum(nvl(case '$bln' when '01' then jan
														when '02' then feb
														when '03' then mar
														when '04' then apr
														when '05' then mei 
														when '06' then jun 
														when '07' then jul
														when '08' then aug
														when '09' then sep
														when '10' then okt
														when '11' then nop
														when '12' then des
												end,0)) as actcm
									from bpc_relakun x
									inner join cash_mactual t on t.kode_akun = x.kode_akun and t.tahun like '".$thn1."%' and t.kode_lokasi = '$row->cocd' 
									where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'  group by x.kode_akun
								) v on v.kode_akun = x.kode_akun
								where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' and x.kode_neraca = '$neraca'
								union
								select a.kode_akun,  sum(nvl(v.actsd, 0)) as actsd,  sum(nvl(v.actcm, 0)) as actcm
								from bpc_masakun a
								left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
								left outer join (select x.kode_akun
											, sum(nvl(case '$bln' when '01' then cf + jan
												when '02' then (cf + jan + feb  )
												when '03' then (cf + jan + feb + mar  )
												when '04' then (cf + jan + feb + mar + apr  )
												when '05' then (cf + jan + feb + mar + apr + mei )
												when '06' then (cf + jan + feb + mar + apr + mei + jun  )
												when '07' then (cf + jan + feb + mar + apr + mei + jun + jul )
												when '08' then (cf + jan + feb + mar + apr + mei + jun + jul + aug )
												when '09' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep )
												when '10' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt )
												when '11' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop )
												when '12' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des)
											end,0)) as actsd,
											sum(nvl(case '$bln' when '01' then jan
														when '02' then feb
														when '03' then mar
														when '04' then apr
														when '05' then mei 
														when '06' then jun 
														when '07' then jul
														when '08' then aug
														when '09' then sep
														when '10' then okt
														when '11' then nop
														when '12' then des
												end,0)) as actcm
											from bpc_masakun x
											inner join cash_mactual t on t.kode_akun = x.kode_akun and t.tahun like '".$thn1."%' and t.kode_lokasi = '$row->cocd' 
											left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs in ('$model','$modelPL')
											where b.kode_akun is null and x.kode_lokasi = '$lokasi' 
											group by x.kode_akun
											having sum(nvl(cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des,0)) <> 0
								) v on v.kode_akun = a.kode_akun
								where  a.kode_lokasi = '$lokasi' and '999999' = '$neraca'
								group by a.kode_akun
								having sum(nvl(v.actsd, 0)) <> 0
								";

						}else {
							$sql = " select x.kode_akun,  nvl(v.actsd, 0) as actsd,  nvl(v.actcm, 0) as actcm
								from bpc_relakun x
								left outer join (select x.kode_akun
																				, sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
																				, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
																		from bpc_relakun x
																		inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
																		where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $ba_console2
																		group by x.kode_akun
																	) v on v.kode_akun = x.kode_akun
													
								where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' and x.kode_neraca = '$neraca'
								union
								select a.kode_akun, sum(nvl(v.actsd, 0)) as actsd, sum(nvl(v.actcm, 0)) as actcm
								from bpc_masakun a
								left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
								left outer join (select x.kode_akun
													, sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
													, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
											from bpc_masakun x
											inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun  and t.periode like '".$thn1."%' $jenis
											left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
											where b.kode_akun is null and x.kode_lokasi = '$lokasi' $ba_console2 
											group by x.kode_akun
											having sum(nvl(t.nilai,0)) <> 0
								) v on v.kode_akun = a.kode_akun
								where  a.kode_lokasi = '$lokasi' and x.kode_akun is null and '999999' = '$neraca'
								group by a.kode_akun
								having sum(nvl(v.actsd, 0)) <> 0";
						}
					}
				}else {
					if ($filterBA != ""){
						$filtering = substr($filterBA, 4, strlen($filterBA));
						$filtering = " and ( $filterBA )";
					}

					if ($induk == "9000"){
						$filtering = " ";/* and not t.kode_ubis in (select concat('TG',a.ba_consol) as ba_consol from bpc_lokasi a 
											inner join bpc_lokasi b on b.kode_lokasi = a.KODE_INDUK
											where b.cocd ='1004') ";
						*/
					}
					$sql = " select x.kode_akun,  nvl(v.actsd, 0) as actsd,  nvl(v.actcm, 0) as actcm
							from bpc_relakun x
                            left outer join (select x.kode_akun
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join BPC_SAP_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' 
																	inner join bpc_lokasi z on z.kode_lokasi = t.kode_lokasi
                                									where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'  $filtering  
																	group by x.kode_akun
                                                                ) v on v.kode_akun = x.kode_akun
                                                 
							where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' and x.kode_neraca = '$neraca'
                            union
							select a.kode_akun, sum(nvl(v.actsd, 0)) as actsd, sum(nvl(v.actcm, 0)) as actcm
							from bpc_masakun a
                            left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                            left outer join (select x.kode_akun
                                                , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                        from bpc_masakun x
                                        inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun  and t.periode like '".$thn1."%' 
										inner join bpc_lokasi z on z.kode_lokasi = t.kode_lokasi
                                        left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
                                        where b.kode_akun is null and x.kode_lokasi = '$lokasi'  $filtering 
                                        group by x.kode_akun
                                        having sum(nvl(t.nilai,0)) <> 0
                            ) v on v.kode_akun = a.kode_akun
							where  a.kode_lokasi = '$lokasi' and x.kode_akun is null and '999999' = '$neraca'
                            group by a.kode_akun
                            having sum(nvl(v.actsd, 0)) <> 0";
				}
					
				
                
                $rs = $this->dbLib->execute($sql);
				$itemUbis = new server_util_Map();

				while ($line = $rs->FetchNextObject(false)){
					$itemUbis->set($line->kode_akun, $line);
				}
				$dataUbis->set($row->cocd, $itemUbis);
			}
            
			/*
			if ($induk != "CFU0"){
				$rsUbis = $this->dbLib->execute("select kode_cfu, nama, kode_lokasi, kode_ubis, rowindex, level_spasi from bpc_cfu where kode_cfu in ('CFUF','CFUG','CFUD') order by rowindex");
				while ($row = $rsUbis->FetchNextObject(false)){
					if ($row->kode_cfu == 'CFUF' && strtoupper($tipe) == "CONSOL"){
						$query = 1;
						$jenis2 = " and t.jenis = 'IJ' ";
					}else if ($row->kode_cfu == 'CFUG' && strtoupper($tipe) <> "GROSS" && $tipe != "" ){
						$query = 1;
						$jenis2 = " and t.jenis = 'RL' ";
						if (strtoupper($tipe) == "NETT")
							$jenis2 .= " and t.kode_cfu = t.kode_cfu2";
					}else if ($row->kode_cfu == 'CFUD' && strtoupper($tipe) == "CONSOL"){
						$query = 1;
						$jenis2 = " and t.jenis = 'AD' ";
					}else {
						$query = 0;
						$jenis2 = " and t.jenis ='-' ";
					} 
					$field .= ",  0  as actsd_". $row->kode_cfu. "";
					
					{
						$sql = " select x.kode_akun,  nvl(v.actsd, 0) as actsd
							from bpc_relakun x
                            left outer join (select x.kode_akun
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis2
																	where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' and t.kode_cfu = '$induk'  
                                                                    group by x.kode_akun
                                                                ) v on v.kode_akun = x.kode_akun
                                                 
							where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' and x.kode_neraca = '$induk'
                            union
							select a.kode_akun, sum(nvl(v.actsd, 0)) as actsd
							from bpc_masakun a
                            left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                            left outer join (select x.kode_akun
                                                , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                        from bpc_masakun x
                                        inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis2
										left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
										where b.kode_akun is null and x.kode_lokasi = '$lokasi' and t.kode_cfu = '$induk'
                                        group by x.kode_akun
                                        having sum(nvl(t.nilai,0)) <> 0
                            ) v on v.kode_akun = a.kode_akun
							where  a.kode_lokasi = '$lokasi' and x.kode_akun is null and '999999' = '$induk'
                            group by a.kode_akun
                            having sum(nvl(v.actsd, 0)) <> 0";
							
						
					}
					//error_log($sql);
					
					$rs = $this->dbLib->execute($sql);
					$itemUbis = new server_util_Map();

					while ($line = $rs->FetchNextObject(false)){
						$itemUbis->set($line->kode_neraca, $line);
					}
					$dataUbis->set($row->kode_cfu, $itemUbis);
				}
			}
			*/
            $filterLokasi = ""; 
            if ($induk != "9000")
            	$filterLokasi = " and z.kode_induk in ( select kode_lokasi from bpc_lokasi where cocd = '$induk' ) ";
			if ($filterBA != ""){
				$filterBA = substr($filterBA, 4, strlen($filterBA));
				$filterBA = " and ( $filterBA )";
			}

            $sql = "select distinct d.kode_akun as kode_neraca, left_pad(concat(d.kode_akun,concat('-',e.nama)),a.level_spasi + 1) as nama, a.tipe,e.jenis as jenis_akun, a.sum_header, a.level_spasi + 1 as level_spasi, a.kode_induk, a.rowindex
													, nvl(t.actsd,0) as actsd
													, nvl(t.actcm,0) as actcm
                                                    $field
											from bpc_neraca a
                                            inner join bpc_relakun d on d.kode_neraca = a.kode_neraca and a.kode_lokasi = d.kode_lokasi and d.kode_fs = a.kode_fs
                                            inner join bpc_masakun e on e.kode_akun = d.kode_akun and e.kode_lokasi = a.kode_lokasi 
											left outer join (select x.kode_akun
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun  and t.periode like '".$thn1."%' $jenis
                                                                    where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $filterBA group by x.kode_akun
                                                                ) t on t.kode_akun = d.kode_akun
                                            where a.kode_fs = '$model' and a.kode_lokasi = '$lokasi' and a.kode_neraca = '$neraca' 
                                            
                                        union
                                        select a.kode_akun, concat(a.kode_akun, concat('-',a.nama)) as nama,'-',a.jenis,'-',0,'00',1000
                                            , sum(nvl(v.actsd, 0)) as actsd
											, sum(nvl(v.actcm, 0)) as actcm
                                              $field
                                        from bpc_masakun a
                                        left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                                        left outer join (select x.kode_akun
                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                    from bpc_masakun x
                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
                                                    inner join bpc_lokasi z on t.kode_lokasi = z.kode_lokasi
                                                    left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
                                                    where  b.kode_akun is null and x.kode_lokasi = '$lokasi' $filterBA
                                                    group by x.kode_akun
                                                    having sum(nvl(t.nilai,0)) <> 0
                                        ) v on v.kode_akun = a.kode_akun
                                        where x.kode_akun is null and a.kode_lokasi ='$lokasi' and '999999' = '$neraca'
                                        group by a.kode_akun, a.nama, a.jenis
                                        having  sum(nvl(v.actsd, 0)) <> 0
                                        order by kode_neraca";
            $rs = $this->dbLib->execute($sql);
            $node = "";
		$rootNode = new server_util_NodeNRC("00");
		$this->sumHeader = new server_util_Map();
        $result = array('rs' => array('rows' => array() ) );
		while ($row = $rs->FetchNextObject(false)){
            if ($row->jenis_akun == "PENDAPATAN" || $row->jenis_akun == "LIA" || $row->jenis_akun == "LEQ" || $row->jenis_akun == "EQU"){
				foreach ($dataUbis->getArray() as $key => $itemUbis){
                    //$key = strtoupper($key);
                    $tmp = $itemUbis->get($row->kode_neraca);
                    if ($tmp == null){
                        eval ("\$row->$key = 0;");
                        eval ("\$row->actsd_$key = 0;");
						eval ("\$row->actcm_$key = 0;");
                    }else {
                        eval ("\$row->actsd_$key = round(\$tmp->actsd / $pembagi) * -1;");
                        eval ("\$row->actcm_$key = round(\$tmp->actcm / $pembagi) * -1;");
                    }
					
				}
				//$row->actsd = round($row->actsd / $pembagi) * -1;
				//$row->actcm = round($row->actcm / $pembagi) * -1;
				$row->jenis = $row->jenis_akun;
                //$row->actsd = round($row->actsd / $pembagi) * -1;
                //error_log("PDRPT " . json_encode($row));
			}else {
				foreach ($dataUbis->getArray() as $key => $itemUbis){
                    //$key = strtoupper($key);
					$tmp = $itemUbis->get($row->kode_neraca);
                    if ($tmp == null){
                        eval ("\$row->$key = 0;");
                        eval ("\$row->actsd_$key = 0;");
						eval ("\$row->actcm_$key = 0;");
                    }else {
                        eval ("\$row->actsd_$key = round(\$tmp->actsd / $pembagi);");
						eval ("\$row->actcm_$key = round(\$tmp->actcm / $pembagi);");
                    }
				}
                //$row->actcm = round($row->actcm  / $pembagi);
                //$row->actsd = round($row->actsd / $pembagi);
                $row->jenis = $row->jenis_akun;
			}
            //if ($row->aggsd != 0 || $row->actsd != 0)
			//     $result["rs"]["rows"][] = (array)$row;
			$allZero = true;
			$item = (array)$row;
			//error_log("$row->kode_neraca => " . json_encode($item));
			foreach ($item as $key => $value) {
				if ($key != "kode_neraca" && $key != "kode_akun" && $key != "nama" && $key != "tipe" && $key != "jenis_akun" && $key != "sum_header" && $key != "level_spasi" && $key != "kode_induk" && $key != "rowindex"){
					//error_log("getDataEXSUMCFUDetail $key = $value;");
					if (abs($value) != 0){
						$allZero = false;
					}
				}
					
			}
			if (!$allZero)
				$result["rs"]["rows"][] = (array)$row;
			
		}
        //error_log($sql);
		return ($result);   
    }
    function getDataJejerBSAPDetailReport($cfu,$model,$periode, $tipe, $pembagi){
        
        global $satuan;
		$this->getDB();
		$this->dbLib = $this->db;
		if (!isset($pembagi)) $pembagi = 1000000000;
		$satuan = $pembagi;
        $lokasi = "9000";
		$thn1 = $tahun;//substr($periode,0,4);
		///$thn2 = floatval(substr($periode,0,4)) - 1;
        
            $ubis = "";
			$rsUbis = $this->dbLib->execute("select kode_cfu, nama, kode_lokasi, kode_ubis, rowindex, level_spasi from bpc_cfu where kode_induk = '$cfu' order by rowindex");
			$sql = "";
			$field = "";
			$dataUbis = new server_util_Map();
			while ($row = $rsUbis->FetchNextObject(false)){
				$field .= ", 0  as ". $row->kode_cfu. "";
                $sql = " select x.kode_akun,  sum(jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des) as aggthn
							from bpc_relakun x
                            inner join bpc_mapakun z on z.akun_konsol = x.kode_akun 
							inner join bpc_cfu t on t.kode_lokasi = z.kode_lokasi and ( t.kode_induk = '$row->kode_cfu' or t.kode_cfu = '$row->kode_cfu' ) 
                            where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'  group by x.kode_akun";
                $rs = $this->dbLib->execute($sql);
				$itemUbis = new server_util_Map();

				while ($line = $rs->FetchNextObject(false)){
					$itemUbis->set($line->kode_akun, $line->aggthn);
				}
				$dataUbis->set($row->kode_cfu, $itemUbis);
			}
            if ($cfu != "CFU0"){
                $join1 = "inner join bpc_cfu t on t.kode_lokasi = z.kode_lokasi and ( t.kode_induk = '$cfu' ) ";
                $join2 = "inner join exs_ubis u on u.kode_ubis = y.kode_ubis and u.kode_lokasi = t.kode_lokasi
	                                                           and (u.kode_induk = t.kode_ubis  or u.kode_ubis in (select a.kode_ubis from exs_ubis a inner join exs_ubis b on b.kode_ubis = a.kode_induk and b.kode_lokasi = a.kode_lokasi where b.kode_induk = t.kode_ubis and b.kode_lokasi = t.kode_lokasi))";
            }else {
                $join1 = "";
                $join2 = "inner join exs_ubis u on u.kode_ubis = y.kode_ubis and u.kode_lokasi = y.kode_lokasi";
            }
        
            $sql = "select distinct a.kode_neraca, c.kode_akun,left_pad(c.nama,a.level_spasi + 1) as nama, a.tipe,a.jenis_akun, a.sum_header, a.level_spasi, a.kode_induk, a.rowindex
													, nvl(c.nilai, 0) as penetapan, (nvl(b.aggthn,0)) as aggthn,nvl(c.nilai, 0) - (nvl(b.aggthn,0))   as selisih $field
											from bpc_neraca a
                                            inner join bpc_relakun d on d.kode_neraca = a.kode_neraca and d.kode_fs = a.kode_fs and d.kode_lokasi = a.kode_lokasi
                                            inner join bpc_masakun c on c.kode_akun = d.kode_akun and c.kode_lokasi = a.kode_lokasi 
											left outer join (select x.kode_neraca, x.kode_akun, sum(jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des) as aggthn
															from bpc_relakun x
															inner join bpc_mapakun z on z.akun_konsol = x.kode_akun 
                                                            $join1
							                                inner join bpc_mbudget_rkm y on y.kode_akun = z.kode_akun and y.tahun = '$thn1' and jenis = 'S' and z.kode_lokasi = y.kode_lokasi
															$join2
															where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' 
                                                            group by x.kode_neraca, x.kode_akun) b on b.kode_neraca = a.kode_neraca and b.kode_akun = c.kode_akun 
											left outer join bpc_penetapan c on c.kode_lokasi = '$lokasi' and c.kode_neraca = a.kode_neraca and c.tahun = '$thn1' and c.kode_ubis = 'NAS' and a.kode_fs = c.model
										where a.kode_fs = '$model' and a.kode_lokasi = '$lokasi' 
										order by c.kode_akun";
            //error_log($sql);
            $rs = $this->dbLib->execute($sql);
            $node = "";
		$result = new server_util_Map();
		while ($row = $rs->FetchNextObject(false)){
            if ($row->jenis_akun == "PENDAPATAN"){
				foreach ($dataUbis->getArray() as $key => $itemUbis){
                    $key = strtoupper($key);
					eval ("\$tmp = \$itemUbis->get(\$row->kode_akun) * -1 ;");
                    if ($tmp == null)
                        eval ("\$row->$key = 0;" );
                    else eval ("\$row->$key = $tmp;" );
				}
				$row->penetapan = $row->penetapan * -1  ;
				$row->aggthn = $row->aggthn * -1 ;
			}else {
				foreach ($dataUbis->getArray() as $key => $itemUbis){
                    $key = strtoupper($key);
					eval ("\$tmp = \$itemUbis->get(\$row->kode_akun);");
                    if ($tmp == null)
                        eval ("\$row->$key = 0;" );
                    else eval ("\$row->$key = $tmp;" );
				}
			}
            if ($row->aggthn != 0){
                $tmp = $result->get($row->kode_neraca);
                if ($tmp == null){
                    $tmp = new server_util_arrayList();
                }
                //error_log(json_encode($row));
                $tmp->add($row);
                $result->set($row->kode_neraca, $tmp);    
            }
			
		}
		
		return ($result);   
    }
	function getDataAkunJejerBSAP($induk,$model, $periode, $tipe, $pembagi){
        global $satuan;
		$this->getDB();
		$this->dbLib = $this->db;
		if (!isset($pembagi)) $pembagi = 1000000000;
		$satuan = $pembagi;
        $lokasi = "9000";
		$thn1 = substr($periode,0,4);
        $bln = substr($periode,4,2);
		
		///$thn2 = floatval(substr($periode,0,4)) - 1;
			if (strtoupper($tipe) == "GROSS" || $tipe == ""){
				$addFilter = " and not z.kode_cfu in ('CFUE','CFU40C','CFU205','CFUF','CFUG','CFUD')  ";
				$jenis = " and t.jenis in ('TB') ";
				$filterBudget = " and not kode_cfu in ('CFUE','CFU40C','CFU205') ";
			}else {
				$jenis = "  ";
				$filterBudget = "  ";
			}
			$ubis = "";
			$rsUbis = $this->dbLib->execute("select  nama, kode_lokasi, cocd, ba_consol, case when cocd = '9000' then 99 else no_urut end as no_urut from bpc_lokasi where kode_induk in (select kode_lokasi from bpc_lokasi where cocd = '$induk' ) or cocd = '$induk' order by no_urut ");
			$sql = "";
			$field = "";
			$dataUbis = new server_util_Map();
			
			//error_log("select  nama, kode_lokasi, cocd from bpc_lokasi where kode_lokkonsol = '$induk'  order by cocd");
			$rs = $this->dbLib->execute("select ba_consol from bpc_lokasi start with cocd = '$induk' connect by kode_induk = prior kode_lokasi ");
			$ba_console = "";
			if ($induk != "9000"){
				while ($row =$rs->FetchNextObject(false)){
					if ($ba_console != "") $ba_console .= " or ";
					$ba_console .= " t.kode_ubis like '__" . trim($row->ba_consol) ."%' ";
				}
			}
			if ($ba_console != "")
			{
				$ba_console = " and ($ba_console)";
			}
			//error_log($ba_console);
			$filterBA = "";
			while ($row = $rsUbis->FetchNextObject(false)){
				$field .= ", 0  as actsd_". $row->cocd. "";
				//error_log("Process $row->cocd");
				if ($row->cocd != "9000"){
					$ba_console2 = "";
					if ($row->cocd != "9000"){
						$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						$rs = $this->dbLib->execute("select ba_consol from bpc_lokasi start with cocd = '$row->cocd' connect by kode_induk = prior kode_lokasi ");
						while ($row2 =$rs->FetchNextObject(false)){
							if ($ba_console2 != "") $ba_console2 .= " or ";
							$ba_console2 .= " t.kode_ubis like '__" . trim($row2->ba_consol) ."%' ";
							$filterBA .= " or ( t.kode_ubis like '__$row2->ba_consol%' ) ";
						}
					}
					if ($ba_console2 != "")
					{
						$ba_console2 = " and ($ba_console2)";
					}
					//error_log("cocd " . $row->cocd);
					if ( in_array($row->cocd, array("98","97","96") ) &&  strtoupper($tipe) == "GROSS" ){
						if ($row->cocd == "98")
							$filterElim = " and t.jenis = 'AD'";
						else if ($row->cocd == "97")
							$filterElim = " and t.jenis = 'RL'";
						else if ($row->cocd == "96")
							$filterElim = " and t.jenis = 'IJ'";

						$sql = " select x.kode_akun,  nvl(v.actsd, 0) as actsd,  nvl(v.actcm, 0) as actcm
							from bpc_relakun x
                            left outer join (select x.kode_akun
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and  t.periode like '".$thn1."%' 
                                                                    where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'   $filterElim  $ba_console group by x.kode_akun
                                                                ) v on v.kode_akun = x.kode_akun
                                                 
							where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'
                            union
							select a.kode_akun, sum(nvl(v.actsd, 0)) as actsd, sum(nvl(v.actcm, 0)) as actcm
							from bpc_masakun a
                            left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                            left outer join (select x.kode_akun
                                                , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                        from bpc_masakun x
                                        inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%'
                                        left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
                                        where b.kode_akun is null and x.kode_lokasi = '$lokasi' $filterElim $ba_console
                                        group by x.kode_akun
                                        
                            ) v on v.kode_akun = a.kode_akun
							where  a.kode_lokasi = '$lokasi' and x.kode_akun is null
                            group by a.kode_akun
                            having sum(nvl(v.actsd, 0)) <> 0 or sum(nvl(v.actcm, 0)) <> 0"; 
						//error_log("$row->cocd => $sql ");
					}else {
						/*
						if ($row->ba_consol == "2") {
							$addMetra = " and ( t.kode_ubis like '__$row->ba_consol%' ) ";
							$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						} else {
							$addMetra = " and ( t.kode_ubis like '__$row->ba_consol%')" ;
							$filterBA .= " or ( t.kode_ubis like '__$row->ba_consol%' ) ";
						}
						*/
						$currentPeriode = date("Ym");
						$tgl = floatval( date("d") );
						if (( $periode == $currentPeriode or $tgl <= 5) && $row->cocd == "1000"){
							$sql = " select x.kode_akun, nvl(v.actsd, 0) as actsd, nvl(v.actcm, 0) as actcm
								from bpc_relakun x
								left outer join (select x.kode_akun
											, sum(nvl(case '$bln' when '01' then cf + jan
												when '02' then (cf + jan + feb  )
												when '03' then (cf + jan + feb + mar  )
												when '04' then (cf + jan + feb + mar + apr  )
												when '05' then (cf + jan + feb + mar + apr + mei )
												when '06' then (cf + jan + feb + mar + apr + mei + jun  )
												when '07' then (cf + jan + feb + mar + apr + mei + jun + jul )
												when '08' then (cf + jan + feb + mar + apr + mei + jun + jul + aug )
												when '09' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep )
												when '10' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt )
												when '11' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop )
												when '12' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des)
											end,0)) as actsd,
											sum(nvl(case '$bln' when '01' then jan
														when '02' then feb
														when '03' then mar
														when '04' then apr
														when '05' then mei 
														when '06' then jun 
														when '07' then jul
														when '08' then aug
														when '09' then sep
														when '10' then okt
														when '11' then nop
														when '12' then des
												end,0)) as actcm
									from bpc_relakun x
									inner join cash_mactual t on t.kode_akun = x.kode_akun and t.tahun like '".$thn1."%' and t.kode_lokasi = '$row->cocd' 
									where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'  group by x.kode_akun
								) v on v.kode_akun = x.kode_akun
								where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'
								union
								select a.kode_akun,  sum(nvl(v.actsd, 0)) as actsd,  sum(nvl(v.actcm, 0)) as actcm
								from bpc_masakun a
								left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
								left outer join (select x.kode_akun
											, sum(nvl(case '$bln' when '01' then cf + jan
												when '02' then (cf + jan + feb  )
												when '03' then (cf + jan + feb + mar  )
												when '04' then (cf + jan + feb + mar + apr  )
												when '05' then (cf + jan + feb + mar + apr + mei )
												when '06' then (cf + jan + feb + mar + apr + mei + jun  )
												when '07' then (cf + jan + feb + mar + apr + mei + jun + jul )
												when '08' then (cf + jan + feb + mar + apr + mei + jun + jul + aug )
												when '09' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep )
												when '10' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt )
												when '11' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop )
												when '12' then (cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des)
											end,0)) as actsd,
											sum(nvl(case '$bln' when '01' then jan
														when '02' then feb
														when '03' then mar
														when '04' then apr
														when '05' then mei 
														when '06' then jun 
														when '07' then jul
														when '08' then aug
														when '09' then sep
														when '10' then okt
														when '11' then nop
														when '12' then des
												end,0)) as actcm
											from bpc_masakun x
											inner join cash_mactual t on t.kode_akun = x.kode_akun and t.tahun like '".$thn1."%' and t.kode_lokasi = '$row->cocd' 
											left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs in ('$model','$modelPL')
											where b.kode_akun is null and x.kode_lokasi = '$lokasi'
											group by x.kode_akun
											having sum(nvl(cf + jan + feb + mar + apr + mei + jun + jul + aug + sep + okt + nop + des,0)) <> 0
								) v on v.kode_akun = a.kode_akun
								where  a.kode_lokasi = '$lokasi' 
								group by a.kode_akun
								having sum(nvl(v.actsd, 0)) <> 0
								";

						}else {
							$sql = " select x.kode_akun,  nvl(v.actsd, 0) as actsd,  nvl(v.actcm, 0) as actcm
								from bpc_relakun x
								left outer join (select x.kode_akun
																				, sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
																				, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
																		from bpc_relakun x
																		inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and  t.periode like '".$thn1."%' $jenis
																		where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $ba_console2 group by x.kode_akun
																	) v on v.kode_akun = x.kode_akun
													
								where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'
								union
								select a.kode_akun, sum(nvl(v.actsd, 0)) as actsd, sum(nvl(v.actcm, 0)) as actcm
								from bpc_masakun a
								left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
								left outer join (select x.kode_akun
													, sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
													, sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
											from bpc_masakun x
											inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
											left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
											where b.kode_akun is null and x.kode_lokasi = '$lokasi' $ba_console2
											group by x.kode_akun
								) v on v.kode_akun = a.kode_akun
								where  a.kode_lokasi = '$lokasi' and x.kode_akun is null
								group by a.kode_akun
								having sum(nvl(v.actsd, 0)) <> 0 or sum(nvl(v.actcm, 0)) <> 0";
							//error_log("$row->cocd => $sql ");
						}
					}
				}else { 
					if ($filterBA != ""){
						$filtering = substr($filterBA, 4, strlen($filterBA));
						$filtering = " and ( $filtering )";
					}
					if ($induk == "9000"){
						$filtering = " ";/* and not t.kode_ubis in (select concat('TG',a.ba_consol) as ba_consol from bpc_lokasi a 
											inner join bpc_lokasi b on b.kode_lokasi = a.KODE_INDUK
											where b.cocd ='1004') ";
											*/
						
					}
                	$sql = " select x.kode_akun,  nvl(v.actsd, 0) as actsd,  nvl(v.actcm, 0) as actcm
							from bpc_relakun x
                            left outer join (select x.kode_akun
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join BPC_SAP_transcfu t on t.kode_akun = x.kode_akun and  t.periode like '".$thn1."%'
																	where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $filtering 
																		
																	group by x.kode_akun
                                                                ) v on v.kode_akun = x.kode_akun
                                                 
							where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi'
                            union
							select a.kode_akun, sum(nvl(v.actsd, 0)) as actsd, sum(nvl(v.actcm, 0)) as actcm
							from bpc_masakun a
                            left outer join exs_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                            left outer join (select x.kode_akun
                                                , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                        from bpc_masakun x
                                        inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' 
										inner join bpc_lokasi z on z.kode_lokasi = t.kode_lokasi
                                        left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
                                        where b.kode_akun is null and x.kode_lokasi = '$lokasi'  $filtering  
                                        group by x.kode_akun
                            ) v on v.kode_akun = a.kode_akun
							where  a.kode_lokasi = '$lokasi' and x.kode_akun is null
                            group by a.kode_akun
                            having sum(nvl(v.actsd, 0)) <> 0 or sum(nvl(v.actcm, 0)) <> 0";
					//error_log("ConsoleAKun $sql");
				}
                
                $rs = $this->dbLib->execute($sql);
				$itemUbis = new server_util_Map();

				while ($line = $rs->FetchNextObject(false)){
					$itemUbis->set($line->kode_akun, $line);
				}
				$dataUbis->set($row->cocd, $itemUbis);
			} 
            
            $filterLokasi = ""; 
            
			if ($induk != "9000")
            	$filterLokasi = "  and z.kode_induk in ( select kode_lokasi from bpc_lokasi where cocd = '$induk' ) ";
            if ($filterBA != ""){
				$filterBA = substr($filterBA, 4, strlen($filterBA));
				$filterBA = " and ( $filterBA )";
			}

            $sql = "select distinct a.kode_neraca, d.kode_akun, e.nama as nama, a.tipe, upper(e.jenis) as jenis_akun, a.sum_header, a.level_spasi + 1 as level_spasi, a.kode_induk, a.rowindex 
                                        	, nvl(t.actsd,0) as actsd
											, nvl(t.actcm,0) as actcm
                                                    $field
											from bpc_neraca a
                                            inner join bpc_relakun d on d.kode_neraca = a.kode_neraca and a.kode_lokasi = d.kode_lokasi and d.kode_fs = a.kode_fs
                                            inner join bpc_masakun e on e.kode_akun = d.kode_akun and e.kode_lokasi = a.kode_lokasi 
											left outer join (select x.kode_akun
                                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                                    from bpc_relakun x
                                                                    inner join BPC_SAP_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
                                                                    where x.kode_fs = '$model' and x.kode_lokasi = '$lokasi' $filterBA group by x.kode_akun
                                                                ) t on t.kode_akun = d.kode_akun
                                            where a.kode_fs = '$model' and a.kode_lokasi = '$lokasi'
                                            
                                        union
                                        select '999999', a.kode_akun, concat(a.kode_akun, concat('-',a.nama)) as nama,'-',a.jenis,'-',0,'00',1000
                                            , sum(nvl(v.actsd, 0)) as actsd
											, sum(nvl(v.actcm, 0)) as actcm
                                              $field
                                        from bpc_masakun a
                                        left outer join bpc_relakun x on x.kode_akun = a.kode_akun and x.kode_fs ='$model' and x.kode_lokasi = a.kode_lokasi
                                        left outer join (select x.kode_akun
                                                            , sum(nvl(case when t.periode <= '$periode' then t.nilai else 0 end,0)) as actsd
                                                            , sum(nvl(case when t.periode = '$periode' then t.nilai else 0 end,0)) as actcm
                                                    from bpc_masakun x
                                                    inner join bpc_sap_transcfu t on t.kode_akun = x.kode_akun and t.periode like '".$thn1."%' $jenis
                                                    inner join bpc_lokasi z on z.kode_lokasi = t.kode_lokasi
                                                    left outer join bpc_relakun b on b.kode_akun = x.kode_akun and b.kode_lokasi = x.kode_lokasi and b.kode_fs = '$model'
                                                    where  b.kode_akun is null and x.kode_lokasi = '$lokasi' $filterBA
                                                    group by x.kode_akun
                                                    having sum(nvl(t.nilai,0)) <> 0
                                        ) v on v.kode_akun = a.kode_akun
                                        where x.kode_akun is null and a.kode_lokasi ='$lokasi'
                                        group by a.kode_akun, a.nama, a.jenis
                                        order by kode_neraca";
			//error_log("Console LineUp AP Actual -> " . $sql);
            $rs = $this->dbLib->execute($sql);
            $node = "";
		    $result = new server_util_Map();        
            $neraca = "";
            while ($row = $rs->FetchNextObject(false)){
                if ($row->jenis_akun == "PENDAPATAN" || $row->jenis_akun == "LIA" || $row->jenis_akun == "LEQ"|| $row->jenis_akun == "EQU"){
                    foreach ($dataUbis->getArray() as $key => $itemUbis){
                        $tmp = $itemUbis->get($row->kode_akun);
						if ($tmp == null){
							eval ("\$row->actsd_$key = 0;");
							eval ("\$row->actcm_$key = 0;");
						}else {
                        	eval ("\$row->actsd_$key = round($tmp->actsd / $pembagi) * -1;");
							eval ("\$row->actcm_$key = round($tmp->actcm / $pembagi) * -1;");
						}
                    }
                    $row->actsd = round($row->actsd / $pembagi) * -1;    
					$row->actcm = round($row->actcm / $pembagi) * -1;    
                    $row->jenis = $row->jenis_akun;
                }else {
                    foreach ($dataUbis->getArray() as $key => $itemUbis){
                        $tmp = $itemUbis->get($row->kode_akun);
						if ($tmp == null){
							eval ("\$row->actsd_$key = 0;");
							eval ("\$row->actcm_$key = 0;");
						}else{
                        	eval ("\$row->actsd_$key = round($tmp->actsd / $pembagi);");
							eval ("\$row->actcm_$key = round($tmp->actcm / $pembagi);");
						}
                    }
					$row->actsd = round($row->actsd / $pembagi );
                    $row->jenis = $row->jenis_akun;
                }
                

                if ($neraca != $row->kode_neraca){
                    $neraca = $row->kode_neraca;
                    $item = array();
                }
                //$item[] = (array) $row;
                //$result->set($neraca, $item);
                $allZero = true;
                $rowItem = (array)$row;
				//a.kode_neraca, d.kode_akun, e.nama as nama, a.tipe, '-' as jenis, upper(e.jenis) as jenis_akun, a.sum_header, a.level_spasi + 1 as level_spasi, a.kode_induk, a.rowindex
				foreach ($rowItem as $key => $value) {
					if ($key != "kode_neraca" && $key != "kode_akun" && $key != "nama" && $key != "tipe" && $key != "jenis_akun" && $key != "sum_header" && $key != "level_spasi" && $key != "kode_induk" && $key != "rowindex"){
						if ($value != 0)
							$allZero = false;
					}
						
				}
				if (!$allZero) {
					$item[] = (array) $row;
                	$result->set($neraca, $item);
				}
            }
            return $result;
    }
    function downloadJejerDataBSAP($induk, $model, $periode, $tipe, $pembagi){
		$this->getDb();
		
		if (!isset($induk) || $induk == "") $induk = $this->lokasi;//
		$this->cleanUp();
		uses("server_modules_codeplex_PHPExcel",false);
		$objPHPExcel = new PHPExcel();
 
 
		// Set document properties
		$objPHPExcel->getProperties()->setCreator("PT TELKOM ")
						 ->setLastModifiedBy("MA")
						 ->setTitle("CFU")
						 ->setSubject("CFU")
						 ->setDescription("Jejer CFU ")
						  ->setKeywords("Jejer CFU")
							 ->setCategory("CFU");
 
        $data = $this->getDataJejerBSAP($induk, $model, $periode, $tipe, $pembagi);					
		$akun = $this->getDataAkunJejerBSAP($induk, $model,$periode, $tipe, $pembagi);
			
		$objPHPExcel->setActiveSheetIndex(0);
		$sheet = $objPHPExcel->getActiveSheet();
		$sharedStyle1 = new PHPExcel_Style();
		$sharedStyle1->applyFromArray(
			array('fill' 	=> array(
										'type'		=> PHPExcel_Style_Fill::FILL_SOLID,
										'color'		=> array('argb' => 'FFCCFFCC')
									),
				  'borders' => array(
										'bottom'	=> array('style' => PHPExcel_Style_Border::BORDER_THIN),
										'right'		=> array('style' => PHPExcel_Style_Border::BORDER_THIN)
									)
				 ));
        
        $column = array("Account","Uraian","Tipe","Level");
        $rsUbis = $this->dbLib->execute("select kode_lokasi, nama, cocd,case when cocd = '9000' then 99 else no_urut end as no_urut from bpc_lokasi where kode_induk in ( select kode_lokasi from bpc_lokasi where cocd = '$induk' ) or cocd = '$induk'  order by no_urut");
        $field = array("kode_neraca","nama","jenis","level_spasi");
		$field2 = array("kode_neraca","nama","jenis","level_spasi");
        while ($row = $rsUbis->FetchNextObject(false)){
            if ($row->cocd == "96"){
				$column[] = "Telkom Consolidated (PSAK)";
				$field[] = "actsd";
				$field2[] = "actcm";
			}
			$column[] = $row->nama;
            $field[] = "actsd_".$row->cocd;
			$field2[] = "actcm_".$row->cocd;
        }
		
		$col = 0;
		$row = 1;
		foreach ($column as $value){	
			$sheet->setCellValueByColumnAndRow($col, $row, $value);
			$col++;
		}
		$end = PHPExcel_Cell::stringFromColumnIndex($col-1);
		$sheet->setSharedStyle($sharedStyle1,"A1:".$end."1");
		
        try{
            foreach ($data["rs"]["rows"] as $val){
                $row++;
                $col = 0;
                foreach ($field as $f){
                    if ($f == "nama")
                        $sheet->setCellValueByColumnAndRow($col, $row, str_replace("&nbsp;"," ",$val[$f]) );    
                    else 
                        $sheet->setCellValueByColumnAndRow($col, $row, $val[$f]);    
                    $col++;
                }

                $listAkun = $akun->get($val["kode_neraca"]);
                foreach ($listAkun as $item){
                    $row++;
                    $col = 0;
                    foreach ($field as $i => $f){
                        if ($i == 0)
                            $sheet->setCellValueByColumnAndRow($col, $row, $item["kode_akun"]);    
                        else
                            $sheet->setCellValueByColumnAndRow($col, $row, $item[$f]);    
                        $col++;
                    }
                    
                }

            }
        }catch(Exception $e){
            error_log($e->getMessage);
        }
        
		$sheet->setTitle("$induk YTD");

		$sheet = $objPHPExcel->createSheet();
		$col = 0;
		$row = 1;
		foreach ($column as $value){	
			$sheet->setCellValueByColumnAndRow($col, $row, $value);
			$col++;
		}
		$end = PHPExcel_Cell::stringFromColumnIndex($col-1);
		$sheet->setSharedStyle($sharedStyle1,"A1:".$end."1");
		
        try{
            foreach ($data["rs"]["rows"] as $val){
                $row++;
                $col = 0;
                foreach ($field2 as $f){
                    if ($f == "nama")
                        $sheet->setCellValueByColumnAndRow($col, $row, str_replace("&nbsp;"," ",$val[$f]) );    
                    else 
                        $sheet->setCellValueByColumnAndRow($col, $row, $val[$f]);    
                    $col++;
                }

                $listAkun = $akun->get($val["kode_neraca"]);
                foreach ($listAkun as $item){
                    $row++;
                    $col = 0;
                    foreach ($field2 as $i => $f){
                        if ($i == 0)
                            $sheet->setCellValueByColumnAndRow($col, $row, $item["kode_akun"]);    
                        else
                            $sheet->setCellValueByColumnAndRow($col, $row, $item[$f]);    
                        $col++;
                    }
                    
                }

            }
        }catch(Exception $e){
            error_log($e->getMessage);
        }
		$sheet->setTitle("$induk CM");
		// Set active sheet index to the first sheet, so Excel opens this as the first sheet
		$objPHPExcel->setActiveSheetIndex(0);
 
 
		// Save Excel 2007 file
		$namafile = MD5(date("r"));
 		global $serverDir;
 		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save($serverDir . "/tmp/CFU_list_$namafile.xlsx");
	
 
		return "/tmp/CFU_list_$namafile.xlsx";
	}
	function saveToSummary($induk, $model, $periode, $tipe, $pembagi){
		$this->getDb();
		
		if (!isset($induk) || $induk == "") $induk = $this->lokasi;//
		$this->cleanUp();
		$data = $this->getDataJejerBSAP($induk, $model, $periode, $tipe, $pembagi);					
		$dataAkun = $this->getDataAkunJejerBSAP($induk, $model,$periode, $tipe, $pembagi);

		$rsUbis = $this->dbLib->execute("select kode_lokasi, nama, cocd, ba_consol, case when cocd = '9000' then 99 else no_urut end as no_urut from bpc_lokasi where kode_induk in ( select kode_lokasi from bpc_lokasi where cocd = '$induk' ) or cocd = '$induk'  order by no_urut");
		$listCocd = array();
		while ($row = $rsUbis->FetchNextObject(false)){
			$listCocd[] = $row;
		}
		$sql = new server_util_arrayList();
		$sql->add("delete from bpc_summary_exsum where periode = '$periode' and kode_fs = '$model' and kode_lokasi in (select kode_lokasi from bpc_lokasi where kode_induk = '$induk' or kode_lokasi = '$induk' ) ");
		$sql->add("delete from bpc_summary_exsum_d where periode = '$periode' and kode_fs = '$model' and kode_lokasi in (select kode_lokasi from bpc_lokasi where kode_induk = '$induk' or kode_lokasi = '$induk') ");
		foreach ($data["rs"]["rows"] as $val){
			$row = json_decode(json_encode($val));
			foreach ($listCocd as $rowCocd){
				$sql->add(new server_util_Map(array(
						"tipe" => "param",
						"sql" => "insert into bpc_summary_exsum(
									kode_lokasi, kode_ubis_cons, kode_cfu, kode_neraca, nama,  tipe, jenis_akun, sum_header, level_spasi, kode_induk, rowindex, actbln, actsd, periode, no_urut, kode_fs, tgl_process, status_nilai)
									values(:0, :1, :2, :3, :4, :5, :6,:7,:8,:9,:10,:11,:12,:13,:14, :15, sysdate,:17)",
						"value" => array($rowCocd->cocd, $rowCocd->ba_consol, '-', $row->kode_neraca,  str_replace("&nbsp;"," ",$row->nama), $row->tipe, $row->jenis_akun, $row->sum_header,
										 $row->level_spasi, $row->kode_induk, $row->rowindex, $val["actcm_".$rowCocd->cocd], $val["actsd_".$rowCocd->cocd], $periode, $row->rowindex, $model,0, $tipe )
					)));

			}
			$akun = $dataAkun->get($row->kode_neraca);
			if (isset($akun)) {
				foreach ($akun as $val){
					$row = json_decode(json_encode($val));
					foreach ($listCocd as $rowCocd){
						$sql->add(new server_util_Map(array(
								"tipe" => "param",
								"sql" => "insert into bpc_summary_exsum_d(
											kode_lokasi, kode_ubis_cons, kode_cfu, kode_akun, nama,  tipe, jenis_akun, sum_header, level_spasi, kode_neraca, rowindex, actbln, actsd, periode, no_urut, kode_fs, tgl_process, status_nilai)
											values(:0, :1, :2, :3, :4, :5, :6,:7,:8,:9,:10,:11,:12,:13,:14, :15, sysdate,:17)",
								"value" => array($rowCocd->cocd, $rowCocd->ba_consol, '-', $row->kode_akun,  str_replace("&nbsp;"," ",$row->nama), $row->tipe, $row->jenis_akun, $row->sum_header,
												$row->level_spasi, $row->kode_neraca, $row->rowindex, $val["actcm_".$rowCocd->cocd], $val["actsd_".$rowCocd->cocd], $periode, $row->rowindex, $model,0, $tipe )
							)));
		
					}
				}
			}
		}
		

		$ret = $this->dbLib->execArraySQL($sql);
		return $ret;

	}

}
?>