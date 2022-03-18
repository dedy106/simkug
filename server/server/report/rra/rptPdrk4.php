<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;

class server_report_rra_rptPdrk4 extends server_report_basic
{	
	//protected $config = "orarra";	
	function setDBConnection($config){
		$this->config = $config;
	}
	function getTotalPage()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_pdrk)
			from rra_pdrk_m a
			inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
			inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
			inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
		inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi $this->filter order by a.no_pdrk ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];
		$dbLib->connect();
		$dbdriver = $dbLib->connection->driver;
		$hdrRRR1 = "";
		$hdrRRR2 = "";
		$hdrRRR3 = "";
		$hdrOpn1 = "PLAN BUDGET";
		$hdrOpn2 = "RELEASE BUDGET";
		$hdrOpn3 = "PERMINTAAN";

		$sql="select a.no_pdrk,a.kode_ubis,b.nama as nama_ubis,c.nama as nama_gubis,
			   to_char(a.tanggal,'D') as tgl,to_char(a.tanggal,'MM') as bulan,to_char(a.tanggal,'YYYY') as tahun,
			   nvl(f.nik_apppdrk3, nvl(e.nik_apppdrk3,a.nik_apppdrk3)) as nik_app1,d.nama as nama_app1,
			   g.nama as kota, a.jenis_agg, a.sts_pdrk
		from rra_pdrk_m a
		left outer join rra_rev_m e on e.no_pdrk = a.no_pdrk and e.kode_lokasi  = a.kode_lokasi 
		left outer join rra_grev_m f on f.no_pdrk = a.no_pdrk and f.kode_lokasi  = a.kode_lokasi 
		left outer join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
		left outer join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
		left outer join rra_kota g on g.kode_kota = a.kode_kota
		left outer join rra_karyawan d on nvl(f.nik_apppdrk3, nvl(e.nik_apppdrk3,a.nik_apppdrk3))=d.nik and a.kode_lokasi=d.kode_lokasi
		$this->filter order by a.no_pdrk ";		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
				
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$nilai_usulan=number_format($row->nilai_usulan,0,',','.');
			//$nilai_real=number_format($row->nilai_real,0,',','.');
			//$sisa=number_format($row->sisa,0,',','.');
			//$sisa_agg=number_format($row->sisa_agg,0,',','.');
			echo "<table border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td align='center'>REALOKASI / ABT CAPEX </td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
				  </tr>
				  <tr>
					<td><table  border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td width='10%' class='header_laporan'>Unit Kerja </td>
						<td width='90%' class='header_laporan'>: $row->kode_ubis - $row->nama_ubis </td>
					  </tr>
					  <tr>
						<td class='header_laporan'>Nomor PDRK </td>
						<td class='header_laporan'>: $row->no_pdrk </td>
					  </tr>
					</table></td>
				  </tr>
				 <tr>
					<td>Commitment Budget:Pengurangan</td>
				 </tr>
				  <tr>
					<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr>
						<td width='40' align='center' class='header_laporan'>No</td>
						<td width='70' align='center' class='header_laporan'>NO. WBS</td>
						<td width='70' align='center' class='header_laporan'>URAIAN </td>
						<td width='70' align='center' class='header_laporan'>EQUIPT</td>
						<td width='70' align='center' class='header_laporan'>AKUN</td>
						<td width='100' align='center' class='header_laporan'>BULAN</td>
						<td width='100' align='center' class='header_laporan'>GAR 1THN</td>
						<td width='100' align='center' class='header_laporan'>REAL</td>
						<td width='100' align='center' class='header_laporan'>PENGURANGAN</td>
						<td width='100' align='center' class='header_laporan'>SO.STL PDRK</td>
					  </tr>
					  <tr>
						<td width='90' align='center' class='header_laporan'>1</td>
						<td width='90' align='center' class='header_laporan'>2</td>
						<td width='90' align='center' class='header_laporan'>3</td>
						<td width='90' align='center' class='header_laporan'>4</td>
						<td width='90' align='center' class='header_laporan'>5</td>
						<td width='90' align='center' class='header_laporan'>6</td>
						<td width='90' align='center' class='header_laporan'>7</td>
						<td width='90' align='center' class='header_laporan'>8</td>
						<td width='90' align='center' class='header_laporan'>9</td>
						<td width='90' align='center' class='header_laporan'>10</td>						
						</tr>";
				if ($row->sts_pdrk == "OPN" || $row->Sts_pdrk == "STB"){
					$sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc , case a.jenis when  'C' then 'COMMITMENT' when 'P' then 'PAYMENT' else a.jenis end as version
					   ,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, 
					   isnull(d.t05,0) as t05,isnull(d.t06,0) as t06,isnull(d.t07,0) as t07,isnull(d.t08,0) as t08, 
					   isnull(d.t09,0) as t09,isnull(d.t10,0) as t10,isnull(d.t11,0) as t11,isnull(d.t12,0) as t12,isnull(d.total,0) as total        
				from (select distinct kode_cc,kode_akun,kode_lokasi, kode_drk, jenis 
					  from rra_anggaran
					  where no_bukti='$row->no_pdrk'
					  ) a  
				inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
				inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
				left join (select a.kode_cc,a.kode_akun,a.kode_lokasi, 
								  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end )as t01, 
								  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end )as t02, 
						  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end )as t03, 
								  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end )as t04, 
						  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end )as t05, 
								  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end )as t06, 
						  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end )as t07, 
								  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end )as t08, 
						  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end )as t09, 
								  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end )as t10, 
						  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end )as t11, 
								  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end )as t12, 
								  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total 
						   from (
							select a.* from rra_rev_orgi a left outer join rra_grev_m b on b.no_rev = a.no_rev and b.no_pdrk = a.no_pdrk  where b.no_grev is null and a.no_pdrk = '$row->no_pdrk' and a.versi = 'P'
							union 
							select a.* from rra_grev_orgi a left outer join rra_mrev_m b on b.no_grev = a.no_grev and b.no_pdrk = a.no_pdrk  where b.no_grev is null and a.no_pdrk = '$row->no_pdrk' and a.versi = 'P'							
						   ) a
						   group by a.kode_cc,a.kode_akun,a.kode_lokasi 
						   )d on a.kode_akun=d.kode_akun and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi 
					order by a.kode_cc,a.kode_akun";
				}else $sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc, a.kode_drk, 
						case a.jenis when  'C' then 'COMMITMENT' when 'P' then 'PAYMENT' when null then 'K' else a.jenis end as version
						,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, 
					   isnull(d.t05,0) as t05,isnull(d.t06,0) as t06,isnull(d.t07,0) as t07,isnull(d.t08,0) as t08, 
					   isnull(d.t09,0) as t09,isnull(d.t10,0) as t10,isnull(d.t11,0) as t11,isnull(d.t12,0) as t12,isnull(d.total,0) as total        
				from (select distinct kode_cc,kode_akun,kode_drk, jenis, kode_lokasi 
					  from rra_anggaran
					  where no_bukti='$row->no_pdrk' and dc = 'C' and jenis = 'C'
					  ) a  
				inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
				inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
				left join (select a.kode_cc,a.kode_akun,isnull(a.kode_drk,'-') as kode_drk, a.kode_lokasi, case  when a.versi = '000' or a.versi = '0'  then 'P' when a.versi = '7' or a.versi = '007' then 'C' else case when '".$row->jenis_agg."' = 'OPEX' then 'K' else a.versi end end as jenis, 
								  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end )as t01, 
								  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end )as t02, 
						  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end )as t03, 
								  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end )as t04, 
						  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end )as t05, 
								  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end )as t06, 
						  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end )as t07, 
								  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end )as t08, 
						  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end )as t09, 
								  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end )as t10, 
						  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end )as t11, 
								  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end )as t12, 
								  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total 
						   from (select a.* from rra_pdrk_orgi a left outer join rra_rev_m b on b.no_pdrk = a.no_pdrk  and b.kode_lokasi = a.kode_lokasi where b.no_rev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'C' or a.versi = '7' )
										union
							select a.* from rra_rev_orgi a left outer join rra_grev_m b on b.no_rev = a.no_rev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi   where b.no_grev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'C' or a.versi = '7' )
							union 
							select a.* from rra_grev_orgi a left outer join rra_mrev_m b on b.no_grev = a.no_grev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi  where b.no_mrev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'C' or a.versi = '7' )
							union 
							select * from rra_mrev_orgi where no_pdrk = '$row->no_pdrk' and (versi = 'C' or versi = '7' )
						   ) a
						   group by a.versi, a.kode_cc,a.kode_akun,a.kode_drk, a.kode_lokasi 
						   )d on a.kode_akun=d.kode_akun and a.kode_drk = d.kode_drk and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi and a.jenis = d.jenis
				order by a.kode_cc,a.kode_akun";//case when  a.jenis  = 'C' then 'COMMITMENT' when a.jenis  = 'P' then 'PAYMENT' when a.jenis  is null then 'K' else a.jenis end
			$rs1 = $dbLib->execute($sql1);				
			
			$j=0;
			$jt01=0;$jt02=0;$jt03=0;$jt04=0;$jt05=0;$jt06=0;
			$jt07=0;$jt08=0;$jt09=0;$jt10=0;$jt11=0;$jt12=0;$jt=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				$j=$j+1;
				$jt01=$jt01+$row1->t01;$jt02=$jt02+$row1->t02;$jt03=$jt03+$row1->t03;$jt04=$jt04+$row1->t04;$jt05=$jt05+$row1->t05;$jt06=$jt06+$row1->t06;
				$jt07=$jt07+$row1->t07;$jt08=$jt08+$row1->t08;$jt09=$jt09+$row1->t09;$jt10=$jt10+$row1->t10;$jt11=$jt11+$row1->t11;$jt12=$jt12+$row1->t12;$jt=$jt+$row1->total;
				$t01=number_format($row1->t01,0,',','.');
				$t02=number_format($row1->t02,0,',','.');
				$t03=number_format($row1->t03,0,',','.');
				$t04=number_format($row1->t04,0,',','.');
				$t05=number_format($row1->t05,0,',','.');
				$t06=number_format($row1->t06,0,',','.');
				$t07=number_format($row1->t07,0,',','.');
				$t08=number_format($row1->t08,0,',','.');
				$t09=number_format($row1->t09,0,',','.');
				$t10=number_format($row1->t10,0,',','.');
				$t11=number_format($row1->t11,0,',','.');
				$t12=number_format($row1->t12,0,',','.');
				$total=number_format($row1->total,0,',','.');
			  echo "<tr>
				<td class='isi_laporan' align='center'>$j</td>
				<td class='isi_laporan'>$row1->kode_cc</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama_akun ". ( $row1->version == "" || $row->jenis_agg == 'OPEX' ? "" : "($row1->version)" )."</td>
				<td class='isi_laporan' align='right'>$t01</td>
				<td class='isi_laporan' align='right'>$t02</td>
				<td class='isi_laporan' align='right'>$t03</td>
				<td class='isi_laporan' align='right'>$t04</td>
				<td class='isi_laporan' align='right'>$t05</td>
				<td class='isi_laporan' align='right'>$t06</td>
				<td class='isi_laporan' align='right'>$t07</td>
				<td class='isi_laporan' align='right'>$t08</td>
				<td class='isi_laporan' align='right'>$t09</td>
				<td class='isi_laporan' align='right'>$t10</td>
				<td class='isi_laporan' align='right'>$t11</td>
				<td class='isi_laporan' align='right'>$t12</td>
				<td class='isi_laporan' align='right'>$total</td>
			  </tr>";
			}
				$jt01=number_format($jt01,0,',','.');
				$jt02=number_format($jt02,0,',','.');
				$jt03=number_format($jt03,0,',','.');
				$jt04=number_format($jt04,0,',','.');
				$jt05=number_format($jt05,0,',','.');
				$jt06=number_format($jt06,0,',','.');
				$jt07=number_format($jt07,0,',','.');
				$jt08=number_format($jt08,0,',','.');
				$jt09=number_format($jt09,0,',','.');
				$jt10=number_format($jt10,0,',','.');
				$jt11=number_format($jt11,0,',','.');
				$jt12=number_format($jt12,0,',','.');
				$jt=number_format($jt,0,',','.');
			echo "<tr>
				<td colspan='4' align='right'>Total&nbsp;</td>
				<td class='isi_laporan' align='right'>$jt01</td>
				<td class='isi_laporan' align='right'>$jt02</td>
				<td class='isi_laporan' align='right'>$jt03</td>
				<td class='isi_laporan' align='right'>$jt04</td>
				<td class='isi_laporan' align='right'>$jt05</td>
				<td class='isi_laporan' align='right'>$jt06</td>
				<td class='isi_laporan' align='right'>$jt07</td>
				<td class='isi_laporan' align='right'>$jt08</td>
				<td class='isi_laporan' align='right'>$jt09</td>
				<td class='isi_laporan' align='right'>$jt10</td>
				<td class='isi_laporan' align='right'>$jt11</td>
				<td class='isi_laporan' align='right'>$jt12</td>
				<td class='isi_laporan' align='right'>$jt</td>
			  </tr>";
		echo "</table></td>
			  </tr>
			  <tr>
					<td>Commitment Budget:Penambahan</td>
				 </tr>
				  <tr>
					<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr>
						<td width='40' align='center' class='header_laporan'>No</td>
						<td width='70' align='center' class='header_laporan'>NO. WBS</td>
						<td width='70' align='center' class='header_laporan'>URAIAN </td>
						<td width='70' align='center' class='header_laporan'>EQUIPT</td>
						<td width='70' align='center' class='header_laporan'>AKUN</td>
						<td width='100' align='center' class='header_laporan'>BULAN</td>
						<td width='100' align='center' class='header_laporan'>GAR 1THN</td>
						<td width='100' align='center' class='header_laporan'>REAL</td>
						<td width='100' align='center' class='header_laporan'>PENGURANGAN</td>
						<td width='100' align='center' class='header_laporan'>SO.STL PDRK</td>
					  </tr>
					  <tr>
						<td width='90' align='center' class='header_laporan'>1</td>
						<td width='90' align='center' class='header_laporan'>2</td>
						<td width='90' align='center' class='header_laporan'>3</td>
						<td width='90' align='center' class='header_laporan'>4</td>
						<td width='90' align='center' class='header_laporan'>5</td>
						<td width='90' align='center' class='header_laporan'>6</td>
						<td width='90' align='center' class='header_laporan'>7</td>
						<td width='90' align='center' class='header_laporan'>8</td>
						<td width='90' align='center' class='header_laporan'>9</td>
						<td width='90' align='center' class='header_laporan'>10</td>						
						</tr>";
			if ($row->sts_pdrk == "OPN" || $row->sts_pdrk == "STB"){
				$sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc , case a.jenis when  'C' then 'COMMITMENT' when 'P' then 'PAYMENT' else a.jenis end as version
					   ,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, 
					   isnull(d.t05,0) as t05,isnull(d.t06,0) as t06,isnull(d.t07,0) as t07,isnull(d.t08,0) as t08, 
					   isnull(d.t09,0) as t09,isnull(d.t10,0) as t10,isnull(d.t11,0) as t11,isnull(d.t12,0) as t12,isnull(d.total,0) as total        
				from (select distinct kode_cc,kode_akun,kode_lokasi, kode_drk, jenis 
					  from rra_anggaran
					  where no_bukti='$row->no_pdrk' and dc = 'D' and jenis = 'C'
					  ) a  
				inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
				inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
				left join (select a.kode_cc,a.kode_akun,a.kode_lokasi, 
								  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end )as t01, 
								  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end )as t02, 
						  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end )as t03, 
								  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end )as t04, 
						  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end )as t05, 
								  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end )as t06, 
						  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end )as t07, 
								  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end )as t08, 
						  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end )as t09, 
								  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end )as t10, 
						  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end )as t11, 
								  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end )as t12, 
								  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total 
						   from (
							select a.* from rra_rev_orgi a left outer join rra_grev_m b on b.no_rev = a.no_rev and b.no_pdrk = a.no_pdrk  where b.no_grev is null and a.no_pdrk = '$row->no_pdrk' and a.versi = 'R'
							union 
							select a.* from rra_grev_orgi a left outer join rra_mrev_m b on b.no_grev = a.no_grev and b.no_pdrk = a.no_pdrk  where b.no_mrev is null and a.no_pdrk = '$row->no_pdrk' and a.versi = 'R'							
						   ) a
						   group by a.kode_cc,a.kode_akun,a.kode_lokasi 
						   )d on a.kode_akun=d.kode_akun and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi 
					order by a.kode_cc,a.kode_akun";
			}else $sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc, a.kode_drk, 
						case a.jenis when  'C' then 'COMMITMENT' when 'P' then 'PAYMENT' when null then 'K' else a.jenis end as version
						,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, 
					   isnull(d.t05,0) as t05,isnull(d.t06,0) as t06,isnull(d.t07,0) as t07,isnull(d.t08,0) as t08, 
					   isnull(d.t09,0) as t09,isnull(d.t10,0) as t10,isnull(d.t11,0) as t11,isnull(d.t12,0) as t12,isnull(d.total,0) as total        
				from (select distinct kode_cc,kode_akun,kode_drk, jenis, kode_lokasi 
					  from rra_anggaran
					  where no_bukti='$row->no_pdrk' and dc = 'D' and jenis = 'C'
					  ) a  
				inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
				inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
				left join (select a.kode_cc,a.kode_akun,isnull(a.kode_drk,'-') as kode_drk, a.kode_lokasi, case  when a.versi = '000' or a.versi = '0'  then 'P' when a.versi = '7' or a.versi = '007' then 'C' else case when '".$row->jenis_agg."' = 'OPEX' then 'K' else a.versi end end as jenis, 
								  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end )as t01, 
								  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end )as t02, 
						  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end )as t03, 
								  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end )as t04, 
						  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end )as t05, 
								  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end )as t06, 
						  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end )as t07, 
								  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end )as t08, 
						  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end )as t09, 
								  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end )as t10, 
						  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end )as t11, 
								  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end )as t12, 
								  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total 
						   from (select a.* from rra_pdrk_orgi a left outer join rra_rev_m b on b.no_pdrk = a.no_pdrk  and b.kode_lokasi = a.kode_lokasi where b.no_rev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'C' or a.versi = '7' )
										union
							select a.* from rra_rev_orgi a left outer join rra_grev_m b on b.no_rev = a.no_rev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi   where b.no_grev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'C' or a.versi = '7' )
							union 
							select a.* from rra_grev_orgi a left outer join rra_mrev_m b on b.no_grev = a.no_grev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi  where b.no_mrev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'C' or a.versi = '7' )
							union 
							select * from rra_mrev_orgi where no_pdrk = '$row->no_pdrk' and (versi = 'C' or versi = '7' )
						   ) a
						   group by a.versi, a.kode_cc,a.kode_akun,a.kode_drk, a.kode_lokasi 
						   )d on a.kode_akun=d.kode_akun and a.kode_drk = d.kode_drk and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi and a.jenis = d.jenis
				order by a.kode_cc,a.kode_akun";
			
			$rs1 = $dbLib->execute($sql1);			
			$j=0;
			$jt01=0;$jt02=0;$jt03=0;$jt04=0;$jt05=0;$jt06=0;
			$jt07=0;$jt08=0;$jt09=0;$jt10=0;$jt11=0;$jt12=0;$jt=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				$j=$j+1;
				$jt01=$jt01+$row1->t01;$jt02=$jt02+$row1->t02;$jt03=$jt03+$row1->t03;$jt04=$jt04+$row1->t04;$jt05=$jt05+$row1->t05;$jt06=$jt06+$row1->t06;
				$jt07=$jt07+$row1->t07;$jt08=$jt08+$row1->t08;$jt09=$jt09+$row1->t09;$jt10=$jt10+$row1->t10;$jt11=$jt11+$row1->t11;$jt12=$jt12+$row1->t12;$jt=$jt+$row1->total;
				$t01=number_format($row1->t01,0,',','.');
				$t02=number_format($row1->t02,0,',','.');
				$t03=number_format($row1->t03,0,',','.');
				$t04=number_format($row1->t04,0,',','.');
				$t05=number_format($row1->t05,0,',','.');
				$t06=number_format($row1->t06,0,',','.');
				$t07=number_format($row1->t07,0,',','.');
				$t08=number_format($row1->t08,0,',','.');
				$t09=number_format($row1->t09,0,',','.');
				$t10=number_format($row1->t10,0,',','.');
				$t11=number_format($row1->t11,0,',','.');
				$t12=number_format($row1->t12,0,',','.');
				$total=number_format($row1->total,0,',','.');
			  echo "<tr>
				<td class='isi_laporan' align='center'>$j</td>
				<td class='isi_laporan'>$row1->kode_cc</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama_akun ". ( $row1->version == "" || $row->jenis_agg == 'OPEX' ? "" : "($row1->version)" )."</td>
				<td class='isi_laporan' align='right'>$t01</td>
				<td class='isi_laporan' align='right'>$t02</td>
				<td class='isi_laporan' align='right'>$t03</td>
				<td class='isi_laporan' align='right'>$t04</td>
				<td class='isi_laporan' align='right'>$t05</td>
				<td class='isi_laporan' align='right'>$t06</td>
				<td class='isi_laporan' align='right'>$t07</td>
				<td class='isi_laporan' align='right'>$t08</td>
				<td class='isi_laporan' align='right'>$t09</td>
				<td class='isi_laporan' align='right'>$t10</td>
				<td class='isi_laporan' align='right'>$t11</td>
				<td class='isi_laporan' align='right'>$t12</td>
				<td class='isi_laporan' align='right'>$total</td>
			  </tr>";
			}
			$jt01=number_format($jt01,0,',','.');
				$jt02=number_format($jt02,0,',','.');
				$jt03=number_format($jt03,0,',','.');
				$jt04=number_format($jt04,0,',','.');
				$jt05=number_format($jt05,0,',','.');
				$jt06=number_format($jt06,0,',','.');
				$jt07=number_format($jt07,0,',','.');
				$jt08=number_format($jt08,0,',','.');
				$jt09=number_format($jt09,0,',','.');
				$jt10=number_format($jt10,0,',','.');
				$jt11=number_format($jt11,0,',','.');
				$jt12=number_format($jt12,0,',','.');
				$jt=number_format($jt,0,',','.');
			echo "<tr>
				<td colspan='4' align='right'>Total&nbsp;</td>
				<td class='isi_laporan' align='right'>$jt01</td>
				<td class='isi_laporan' align='right'>$jt02</td>
				<td class='isi_laporan' align='right'>$jt03</td>
				<td class='isi_laporan' align='right'>$jt04</td>
				<td class='isi_laporan' align='right'>$jt05</td>
				<td class='isi_laporan' align='right'>$jt06</td>
				<td class='isi_laporan' align='right'>$jt07</td>
				<td class='isi_laporan' align='right'>$jt08</td>
				<td class='isi_laporan' align='right'>$jt09</td>
				<td class='isi_laporan' align='right'>$jt10</td>
				<td class='isi_laporan' align='right'>$jt11</td>
				<td class='isi_laporan' align='right'>$jt12</td>
				<td class='isi_laporan' align='right'>$jt</td>
			  </tr>";
    echo "</table></td>
			  </tr>
			  <tr>
				&nbsp;
			  </tr>
			  <tr>
					<td>Payment Budget:Pengurangan</td>
				 </tr>
				  <tr>
					<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr>
						<td width='40' align='center' class='header_laporan'>No</td>
						<td width='70' align='center' class='header_laporan'>NO. WBS</td>
						<td width='70' align='center' class='header_laporan'>URAIAN </td>
						<td width='70' align='center' class='header_laporan'>EQUIPT</td>
						<td width='70' align='center' class='header_laporan'>AKUN</td>
						<td width='100' align='center' class='header_laporan'>BULAN</td>
						<td width='100' align='center' class='header_laporan'>GAR 1THN</td>
						<td width='100' align='center' class='header_laporan'>REAL</td>
						<td width='100' align='center' class='header_laporan'>PENGURANGAN</td>
						<td width='100' align='center' class='header_laporan'>SO.STL PDRK</td>
					  </tr>
					  <tr>
						<td width='90' align='center' class='header_laporan'>1</td>
						<td width='90' align='center' class='header_laporan'>2</td>
						<td width='90' align='center' class='header_laporan'>3</td>
						<td width='90' align='center' class='header_laporan'>4</td>
						<td width='90' align='center' class='header_laporan'>5</td>
						<td width='90' align='center' class='header_laporan'>6</td>
						<td width='90' align='center' class='header_laporan'>7</td>
						<td width='90' align='center' class='header_laporan'>8</td>
						<td width='90' align='center' class='header_laporan'>9</td>
						<td width='90' align='center' class='header_laporan'>10</td>						
						</tr>";
				if ($row->sts_pdrk == "OPN" || $row->sts_pdrk == "STB"){
					$sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc 
							,isnull(a.t01,0) as t01,isnull(a.t02,0) as t02,isnull(a.t03,0) as t03,isnull(a.t04,0) as t04, 
							isnull(a.t05,0) as t05,isnull(a.t06,0) as t06,isnull(a.t07,0) as t07,isnull(a.t08,0) as t08, 
							isnull(a.t09,0) as t09,isnull(a.t10,0) as t10,isnull(a.t11,0) as t11,isnull(a.t12,0) as t12,
							isnull(a.total,0) as total        
					 from (select a.kode_cc,a.kode_akun,a.kode_lokasi, 
							   sum(case when substring(a.periode,5,2)='01' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t01, 
							  sum(case when substring(a.periode,5,2)='02' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t02, 
							  sum(case when substring(a.periode,5,2)='03' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t03, 
							  sum(case when substring(a.periode,5,2)='04' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t04, 
							  sum(case when substring(a.periode,5,2)='05' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t05, 
							  sum(case when substring(a.periode,5,2)='06' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t06, 
							  sum(case when substring(a.periode,5,2)='07' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t07, 
							  sum(case when substring(a.periode,5,2)='08' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t08, 
							  sum(case when substring(a.periode,5,2)='09' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t09, 
							  sum(case when substring(a.periode,5,2)='10' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t10, 
							  sum(case when substring(a.periode,5,2)='11' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t11, 
							  sum(case when substring(a.periode,5,2)='12' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t12, 
							  sum(case when substring(a.periode,5,2) between '01' and '12' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as total 
					   from rra_anggaran a 
					   where a.no_bukti='$row->no_pdrk'
					   group by a.kode_cc,a.kode_akun,a.kode_lokasi 
					   ) a 
					 inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
					 inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 					 
					 order by a.kode_cc,a.kode_akun";
				}else $sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc, a.kode_drk, 
						case a.jenis when  'C' then 'COMMITMENT' when 'P' then 'PAYMENT' when null then 'K' else a.jenis end as version
						,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, 
					   isnull(d.t05,0) as t05,isnull(d.t06,0) as t06,isnull(d.t07,0) as t07,isnull(d.t08,0) as t08, 
					   isnull(d.t09,0) as t09,isnull(d.t10,0) as t10,isnull(d.t11,0) as t11,isnull(d.t12,0) as t12,isnull(d.total,0) as total        
				from (select distinct kode_cc,kode_akun,kode_drk, jenis, kode_lokasi 
					  from rra_anggaran
					  where no_bukti='$row->no_pdrk' and dc = 'C' and jenis = 'P'
					  ) a  
				inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
				inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
				left join (select a.kode_cc,a.kode_akun,isnull(a.kode_drk,'-') as kode_drk, a.kode_lokasi, case  when a.versi = '000' or a.versi = '0'  then 'P' when a.versi = '7' or a.versi = '007' then 'C' else case when '".$row->jenis_agg."' = 'OPEX' then 'K' else a.versi end end as jenis, 
								  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end )as t01, 
								  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end )as t02, 
						  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end )as t03, 
								  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end )as t04, 
						  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end )as t05, 
								  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end )as t06, 
						  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end )as t07, 
								  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end )as t08, 
						  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end )as t09, 
								  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end )as t10, 
						  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end )as t11, 
								  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end )as t12, 
								  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total 
						   from (select a.* from rra_pdrk_orgi a left outer join rra_rev_m b on b.no_pdrk = a.no_pdrk  and b.kode_lokasi = a.kode_lokasi where b.no_rev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'P' or a.versi = '0' )
										union
							select a.* from rra_rev_orgi a left outer join rra_grev_m b on b.no_rev = a.no_rev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi   where b.no_grev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'P' or a.versi = '0' )
							union 
							select a.* from rra_grev_orgi a left outer join rra_mrev_m b on b.no_grev = a.no_grev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi  where b.no_mrev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'P' or a.versi = '0' )
							union 
							select * from rra_mrev_orgi where no_pdrk = '$row->no_pdrk' and (versi = 'P' or versi = '0' )
						   ) a
						   group by a.versi, a.kode_cc,a.kode_akun,a.kode_drk, a.kode_lokasi 
						   )d on a.kode_akun=d.kode_akun and a.kode_drk = d.kode_drk and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi and a.jenis = d.jenis
				order by a.kode_cc,a.kode_akun";
				
				$rs1 = $dbLib->execute($sql1);
				$j=0;
				$jt01=0;$jt02=0;$jt03=0;$jt04=0;$jt05=0;$jt06=0;
				$jt07=0;$jt08=0;$jt09=0;$jt10=0;$jt11=0;$jt12=0;$jt=0;
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$j=$j+1;
					$jt01=$jt01+$row1->t01;$jt02=$jt02+$row1->t02;$jt03=$jt03+$row1->t03;$jt04=$jt04+$row1->t04;$jt05=$jt05+$row1->t05;$jt06=$jt06+$row1->t06;
					$jt07=$jt07+$row1->t07;$jt08=$jt08+$row1->t08;$jt09=$jt09+$row1->t09;$jt10=$jt10+$row1->t10;$jt11=$jt11+$row1->t11;$jt12=$jt12+$row1->t12;$jt=$jt+$row1->total;
					$t01=number_format($row1->t01,0,',','.');
					$t02=number_format($row1->t02,0,',','.');
					$t03=number_format($row1->t03,0,',','.');
					$t04=number_format($row1->t04,0,',','.');
					$t05=number_format($row1->t05,0,',','.');
					$t06=number_format($row1->t06,0,',','.');
					$t07=number_format($row1->t07,0,',','.');
					$t08=number_format($row1->t08,0,',','.');
					$t09=number_format($row1->t09,0,',','.');
					$t10=number_format($row1->t10,0,',','.');
					$t11=number_format($row1->t11,0,',','.');
					$t12=number_format($row1->t12,0,',','.');
					$total=number_format($row1->total,0,',','.');
				  echo "<tr>
					<td class='isi_laporan' align='center'>$j</td>
					<td class='isi_laporan'>$row1->kode_cc</td>
					<td class='isi_laporan'>$row1->kode_akun</td>
					<td class='isi_laporan'>$row1->nama_akun". ( $row1->version == "" || $row->jenis_agg == 'OPEX' ? "" : "($row1->version)" )."</td>
					<td class='isi_laporan' align='right'>$t01</td>
					<td class='isi_laporan' align='right'>$t02</td>
					<td class='isi_laporan' align='right'>$t03</td>
					<td class='isi_laporan' align='right'>$t04</td>
					<td class='isi_laporan' align='right'>$t05</td>
					<td class='isi_laporan' align='right'>$t06</td>
					<td class='isi_laporan' align='right'>$t07</td>
					<td class='isi_laporan' align='right'>$t08</td>
					<td class='isi_laporan' align='right'>$t09</td>
					<td class='isi_laporan' align='right'>$t10</td>
					<td class='isi_laporan' align='right'>$t11</td>
					<td class='isi_laporan' align='right'>$t12</td>
					<td class='isi_laporan' align='right'>$total</td>
				  </tr>";
				}
				$jt01=number_format($jt01,0,',','.');
					$jt02=number_format($jt02,0,',','.');
					$jt03=number_format($jt03,0,',','.');
					$jt04=number_format($jt04,0,',','.');
					$jt05=number_format($jt05,0,',','.');
					$jt06=number_format($jt06,0,',','.');
					$jt07=number_format($jt07,0,',','.');
					$jt08=number_format($jt08,0,',','.');
					$jt09=number_format($jt09,0,',','.');
					$jt10=number_format($jt10,0,',','.');
					$jt11=number_format($jt11,0,',','.');
					$jt12=number_format($jt12,0,',','.');
					$jt=number_format($jt,0,',','.');
				echo "<tr>
					<td colspan='4' align='right'>Total&nbsp;</td>
					<td class='isi_laporan' align='right'>$jt01</td>
					<td class='isi_laporan' align='right'>$jt02</td>
					<td class='isi_laporan' align='right'>$jt03</td>
					<td class='isi_laporan' align='right'>$jt04</td>
					<td class='isi_laporan' align='right'>$jt05</td>
					<td class='isi_laporan' align='right'>$jt06</td>
					<td class='isi_laporan' align='right'>$jt07</td>
					<td class='isi_laporan' align='right'>$jt08</td>
					<td class='isi_laporan' align='right'>$jt09</td>
					<td class='isi_laporan' align='right'>$jt10</td>
					<td class='isi_laporan' align='right'>$jt11</td>
					<td class='isi_laporan' align='right'>$jt12</td>
					<td class='isi_laporan' align='right'>$jt</td>
				  </tr>";
			echo "</table></td>
			  </tr>
			  <tr>
				&nbsp;
			  </tr>
			  <tr>
					<td>Payment Budget:Pengurangan</td>
				 </tr>
				  <tr>
					<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr>
						<td width='40' align='center' class='header_laporan'>No</td>
						<td width='70' align='center' class='header_laporan'>NO. WBS</td>
						<td width='70' align='center' class='header_laporan'>URAIAN </td>
						<td width='70' align='center' class='header_laporan'>EQUIPT</td>
						<td width='70' align='center' class='header_laporan'>AKUN</td>
						<td width='100' align='center' class='header_laporan'>BULAN</td>
						<td width='100' align='center' class='header_laporan'>GAR 1THN</td>
						<td width='100' align='center' class='header_laporan'>REAL</td>
						<td width='100' align='center' class='header_laporan'>PENGURANGAN</td>
						<td width='100' align='center' class='header_laporan'>SO.STL PDRK</td>
					  </tr>
					  <tr>
						<td width='90' align='center' class='header_laporan'>1</td>
						<td width='90' align='center' class='header_laporan'>2</td>
						<td width='90' align='center' class='header_laporan'>3</td>
						<td width='90' align='center' class='header_laporan'>4</td>
						<td width='90' align='center' class='header_laporan'>5</td>
						<td width='90' align='center' class='header_laporan'>6</td>
						<td width='90' align='center' class='header_laporan'>7</td>
						<td width='90' align='center' class='header_laporan'>8</td>
						<td width='90' align='center' class='header_laporan'>9</td>
						<td width='90' align='center' class='header_laporan'>10</td>						
						</tr>";
				if ($row->sts_pdrk == "OPN" || $row->sts_pdrk == "STB"){
					$sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc 
							,isnull(a.t01,0) as t01,isnull(a.t02,0) as t02,isnull(a.t03,0) as t03,isnull(a.t04,0) as t04, 
							isnull(a.t05,0) as t05,isnull(a.t06,0) as t06,isnull(a.t07,0) as t07,isnull(a.t08,0) as t08, 
							isnull(a.t09,0) as t09,isnull(a.t10,0) as t10,isnull(a.t11,0) as t11,isnull(a.t12,0) as t12,
							isnull(a.total,0) as total        
					 from (select a.kode_cc,a.kode_akun,a.kode_lokasi, 
							   sum(case when substring(a.periode,5,2)='01' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t01, 
							  sum(case when substring(a.periode,5,2)='02' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t02, 
							  sum(case when substring(a.periode,5,2)='03' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t03, 
							  sum(case when substring(a.periode,5,2)='04' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t04, 
							  sum(case when substring(a.periode,5,2)='05' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t05, 
							  sum(case when substring(a.periode,5,2)='06' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t06, 
							  sum(case when substring(a.periode,5,2)='07' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t07, 
							  sum(case when substring(a.periode,5,2)='08' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t08, 
							  sum(case when substring(a.periode,5,2)='09' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t09, 
							  sum(case when substring(a.periode,5,2)='10' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t10, 
							  sum(case when substring(a.periode,5,2)='11' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t11, 
							  sum(case when substring(a.periode,5,2)='12' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as t12, 
							  sum(case when substring(a.periode,5,2) between '01' and '12' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end )as total 
					   from rra_anggaran a 
					   where a.no_bukti='$row->no_pdrk'
					   group by a.kode_cc,a.kode_akun,a.kode_lokasi 
					   ) a 
					 inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
					 inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 					 
					 order by a.kode_cc,a.kode_akun";
				}else $sql1="select a.kode_akun,c.nama as nama_akun,a.kode_cc,b.nama as nama_cc, a.kode_drk, 
						case a.jenis when  'C' then 'COMMITMENT' when 'P' then 'PAYMENT' when null then 'K' else a.jenis end as version
						,isnull(d.t01,0) as t01,isnull(d.t02,0) as t02,isnull(d.t03,0) as t03,isnull(d.t04,0) as t04, 
					   isnull(d.t05,0) as t05,isnull(d.t06,0) as t06,isnull(d.t07,0) as t07,isnull(d.t08,0) as t08, 
					   isnull(d.t09,0) as t09,isnull(d.t10,0) as t10,isnull(d.t11,0) as t11,isnull(d.t12,0) as t12,isnull(d.total,0) as total        
				from (select distinct kode_cc,kode_akun,kode_drk, jenis, kode_lokasi 
					  from rra_anggaran
					  where no_bukti='$row->no_pdrk' and dc = 'C' and jenis = 'P'
					  ) a  
				inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi 
				inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
				left join (select a.kode_cc,a.kode_akun,isnull(a.kode_drk,'-') as kode_drk, a.kode_lokasi, case  when a.versi = '000' or a.versi = '0'  then 'P' when a.versi = '7' or a.versi = '007' then 'C' else case when '".$row->jenis_agg."' = 'OPEX' then 'K' else a.versi end end as jenis, 
								  sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end )as t01, 
								  sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end )as t02, 
						  sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end )as t03, 
								  sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end )as t04, 
						  sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end )as t05, 
								  sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end )as t06, 
						  sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end )as t07, 
								  sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end )as t08, 
						  sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end )as t09, 
								  sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end )as t10, 
						  sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end )as t11, 
								  sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end )as t12, 
								  sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end )as total 
						   from (select a.* from rra_pdrk_orgi a left outer join rra_rev_m b on b.no_pdrk = a.no_pdrk  and b.kode_lokasi = a.kode_lokasi where b.no_rev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'P' or a.versi = '0' )
										union
							select a.* from rra_rev_orgi a left outer join rra_grev_m b on b.no_rev = a.no_rev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi   where b.no_grev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'P' or a.versi = '0' )
							union 
							select a.* from rra_grev_orgi a left outer join rra_mrev_m b on b.no_grev = a.no_grev and b.no_pdrk = a.no_pdrk and b.kode_lokasi = a.kode_lokasi  where b.no_mrev is null and a.no_pdrk = '$row->no_pdrk' and (a.versi = 'P' or a.versi = '0' )
							union 
							select * from rra_mrev_orgi where no_pdrk = '$row->no_pdrk' and (versi = 'P' or versi = '0' )
						   ) a
						   group by a.versi, a.kode_cc,a.kode_akun,a.kode_drk, a.kode_lokasi 
						   )d on a.kode_akun=d.kode_akun and a.kode_drk = d.kode_drk and a.kode_cc=d.kode_cc and a.kode_lokasi=d.kode_lokasi and a.jenis = d.jenis
				order by a.kode_cc,a.kode_akun";
				
				$rs1 = $dbLib->execute($sql1);
				$j=0;
				$jt01=0;$jt02=0;$jt03=0;$jt04=0;$jt05=0;$jt06=0;
				$jt07=0;$jt08=0;$jt09=0;$jt10=0;$jt11=0;$jt12=0;$jt=0;
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$j=$j+1;
					$jt01=$jt01+$row1->t01;$jt02=$jt02+$row1->t02;$jt03=$jt03+$row1->t03;$jt04=$jt04+$row1->t04;$jt05=$jt05+$row1->t05;$jt06=$jt06+$row1->t06;
					$jt07=$jt07+$row1->t07;$jt08=$jt08+$row1->t08;$jt09=$jt09+$row1->t09;$jt10=$jt10+$row1->t10;$jt11=$jt11+$row1->t11;$jt12=$jt12+$row1->t12;$jt=$jt+$row1->total;
					$t01=number_format($row1->t01,0,',','.');
					$t02=number_format($row1->t02,0,',','.');
					$t03=number_format($row1->t03,0,',','.');
					$t04=number_format($row1->t04,0,',','.');
					$t05=number_format($row1->t05,0,',','.');
					$t06=number_format($row1->t06,0,',','.');
					$t07=number_format($row1->t07,0,',','.');
					$t08=number_format($row1->t08,0,',','.');
					$t09=number_format($row1->t09,0,',','.');
					$t10=number_format($row1->t10,0,',','.');
					$t11=number_format($row1->t11,0,',','.');
					$t12=number_format($row1->t12,0,',','.');
					$total=number_format($row1->total,0,',','.');
				  echo "<tr>
					<td class='isi_laporan' align='center'>$j</td>
					<td class='isi_laporan'>$row1->kode_cc</td>
					<td class='isi_laporan'>$row1->kode_akun</td>
					<td class='isi_laporan'>$row1->nama_akun". ( $row1->version == "" || $row->jenis_agg == 'OPEX' ? "" : "($row1->version)" )."</td>
					<td class='isi_laporan' align='right'>$t01</td>
					<td class='isi_laporan' align='right'>$t02</td>
					<td class='isi_laporan' align='right'>$t03</td>
					<td class='isi_laporan' align='right'>$t04</td>
					<td class='isi_laporan' align='right'>$t05</td>
					<td class='isi_laporan' align='right'>$t06</td>
					<td class='isi_laporan' align='right'>$t07</td>
					<td class='isi_laporan' align='right'>$t08</td>
					<td class='isi_laporan' align='right'>$t09</td>
					<td class='isi_laporan' align='right'>$t10</td>
					<td class='isi_laporan' align='right'>$t11</td>
					<td class='isi_laporan' align='right'>$t12</td>
					<td class='isi_laporan' align='right'>$total</td>
				  </tr>";
				}
				$jt01=number_format($jt01,0,',','.');
					$jt02=number_format($jt02,0,',','.');
					$jt03=number_format($jt03,0,',','.');
					$jt04=number_format($jt04,0,',','.');
					$jt05=number_format($jt05,0,',','.');
					$jt06=number_format($jt06,0,',','.');
					$jt07=number_format($jt07,0,',','.');
					$jt08=number_format($jt08,0,',','.');
					$jt09=number_format($jt09,0,',','.');
					$jt10=number_format($jt10,0,',','.');
					$jt11=number_format($jt11,0,',','.');
					$jt12=number_format($jt12,0,',','.');
					$jt=number_format($jt,0,',','.');
				echo "<tr>
					<td colspan='4' align='right'>Total&nbsp;</td>
					<td class='isi_laporan' align='right'>$jt01</td>
					<td class='isi_laporan' align='right'>$jt02</td>
					<td class='isi_laporan' align='right'>$jt03</td>
					<td class='isi_laporan' align='right'>$jt04</td>
					<td class='isi_laporan' align='right'>$jt05</td>
					<td class='isi_laporan' align='right'>$jt06</td>
					<td class='isi_laporan' align='right'>$jt07</td>
					<td class='isi_laporan' align='right'>$jt08</td>
					<td class='isi_laporan' align='right'>$jt09</td>
					<td class='isi_laporan' align='right'>$jt10</td>
					<td class='isi_laporan' align='right'>$jt11</td>
					<td class='isi_laporan' align='right'>$jt12</td>
					<td class='isi_laporan' align='right'>$jt</td>
				  </tr>";             	  
				  
			echo "</table></td>
				  </tr>
				  <tr>
					<td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td width='80%'>&nbsp;</td>
						<td width='20%'>$row->kota, $row->tgl $bulan $row->tahun </td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td>Pelaksana Program </td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td height='50'>&nbsp;</td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td>$row->nama_app1</td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td>NIK $row->nik_app1</td>
					  </tr>
					</table></td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
				  </tr>
				</table>
				";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
