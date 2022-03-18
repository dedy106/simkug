<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptProyekSaldoSpm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_cab=$tmp[0];
		$kode_lokasi=$tmp[1];
		$status=explode(".",$tmp[2]);
		
		$jenis=$tmp[3];
		$nama_file="proyeksaldo.xls";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		if($tmp[2] != ""){
			$filterstatus=" and a.flag_aktif = '".$status[0]."' ";
		}else{
			$filterstatus="";
		}

		$sql="select a.kode_proyek,a.kode_lokasi,a.kode_cust,b.nama as nama_cust,a.nama,a.kode_jenis,d.nama as nama_jenis,a.no_pks,
		a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.nilai,a.nilai_or,
		isnull(e.bdd,0) as bdd,isnull(f.beban,0) as beban,isnull(g.bymhd,0) as bymhd,isnull(h.kas_bymhd,0) as kas_bymhd,
		isnull(i.piutang,0) as piutang,isnull(j.kas_piutang,0) as kas_piutang,case a.flag_aktif when '0' then 'CLOSE' when '1' then 'OGP' when '2' then 'BATAL' when '3' then 'MASALALU' else '-' end as status_proyek 
	from spm_proyek a
	inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
	inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
	inner join spm_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
	left join (select a.kode_proyek,a.kode_lokasi,sum(a.bdd) as bdd from (select kode_proyek,kode_lokasi,case dc when 'D' then nilai else -nilai end as bdd 
			from spm_proyek_bdd 
			where kode_lokasi='$kode_lokasi' and modul not in ('REVAKRU','AKRU')
			union all
			select kode_proyek,kode_lokasi,case when dc='D' and no_reklas like '%RBD%' or no_reklas like '%JU%' or no_reklas like '%BM%' then -nilai when dc='C' and no_reklas like '%RBD%' or no_reklas like '%JU%' or no_reklas like '%BM%' then nilai else 0 end as bdd
			from spm_proyek_reklas_d 
			where kode_lokasi='$kode_lokasi' and no_reklas like '%RBD%' or no_reklas like '%JU%' or no_reklas like '%BM%' ) a
			group by a.kode_proyek,a.kode_lokasi
			) e on a.kode_proyek=e.kode_proyek and a.kode_lokasi=e.kode_lokasi
	left join (select a.kode_proyek,a.kode_lokasi,sum(a.beban) as beban from (
			select kode_proyek,kode_lokasi,case dc when 'D' then nilai else -nilai end as beban 
			from spm_proyek_reklas_d 
			where kode_lokasi='$kode_lokasi' 
			union all
			select kode_proyek,kode_lokasi,case dc when 'D' then nilai else -nilai end as beban 
			from spm_proyek_bdd 
			where kode_lokasi='$kode_lokasi' and modul in ('REVAKRU','AKRU')
			) a
			group by kode_proyek,kode_lokasi
			)f on a.kode_proyek=f.kode_proyek and a.kode_lokasi=f.kode_lokasi

	left join (select a.kode_proyek,a.kode_lokasi,sum(case b.modul when 'REVPB' then -b.nilai else b.nilai end) as bymhd
	from spm_proyek_bdd a
				inner join yk_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi
				inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi 
				where a.kode_lokasi='$kode_lokasi' and a.nu='0'
				group by a.kode_proyek,a.kode_lokasi
			)g on a.kode_proyek=g.kode_proyek and a.kode_lokasi=g.kode_lokasi
	left join (select a.kode_proyek,a.kode_lokasi,sum(a.nilai) as kas_bymhd 
				from (
					select a.kode_proyek,a.kode_lokasi,a.nilai
					from yk_pb_m a
					inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
					where a.kode_lokasi='$kode_lokasi' 
					union all
					select a.kode_proyek,a.kode_lokasi,a.nilai
					from yk_pb_m a
					inner join ju_m b on a.no_kas=b.no_ju and a.kode_lokasi=b.kode_lokasi
					where a.kode_lokasi='$kode_lokasi' 
				) a 
				group by a.kode_proyek,a.kode_lokasi
			)h on a.kode_proyek=h.kode_proyek and a.kode_lokasi=h.kode_lokasi
	left join (select a.kode_proyek,a.kode_lokasi,sum(b.nilai) as piutang
				from spm_piutang_d a
				inner join spm_piutang_j b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi and b.dc='D'
				where a.kode_lokasi='$kode_lokasi'
				group by a.kode_proyek,a.kode_lokasi
			)i on a.kode_proyek=i.kode_proyek and a.kode_lokasi=i.kode_lokasi
	left join (select a.kode_proyek,a.kode_lokasi,sum(isnull(c.nilai,0)) as kas_piutang
				from spm_piutang_d a
				inner join spm_piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
				inner join (select a.no_piutang,a.kode_lokasi,a.no_bukti,b.tanggal,a.nilai_kas+a.nilai_lain as nilai,b.keterangan
							from spm_billbayar_d a
							inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
							union all 
							select a.no_piutang,a.kode_lokasi,a.no_bukti,b.tanggal,a.nilai_kas+a.nilai_lain as nilai,b.keterangan
							from spm_billbayar_d a
							inner join ju_m b on a.no_bukti=b.no_ju and a.kode_lokasi=b.kode_lokasi
							)c on a.no_piutang=c.no_piutang and a.kode_lokasi=c.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' 
				group by a.kode_proyek,a.kode_lokasi
				)j on a.kode_proyek=j.kode_proyek and a.kode_lokasi=j.kode_lokasi
	$this->filter $filterstatus
	order by a.kode_proyek";
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,$nama_cab);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='150'  align='center' class='header_laporan'>Nama PP</td>
     <td width='80'  align='center' class='header_laporan'>Kode Proyek</td>
	  <td width='150'  align='center' class='header_laporan'>Nama Proyek</td>
	  <td width='150'  align='center' class='header_laporan'>No Kontrak</td>
	 <td width='100'  align='center' class='header_laporan'>Jenis</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='150'  align='center' class='header_laporan'>Customer</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Kontrak</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai RAB</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai BDD</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Beban</td>
	 <td width='90'  align='center' class='header_laporan'>BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>Piutang</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar Piutang</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Piutang</td>
	 <td width='90'  align='center' class='header_laporan'>Status Proyek</td>
	 
      </tr>  ";
		$nilai=0;  $nilai_or=0; $bdd=0; $beban=0; $bymhd=0;$kas_bymhd=0;$piutang=0;$kas_piutang=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_or+=$row->nilai_or;
			$bdd+=$row->bdd;
			$beban+=$row->beban;
			$bymhd+=$row->bymhd;
			$kas_bymhd+=$row->kas_bymhd;
			$piutang+=$row->piutang;
			$kas_piutang+=$row->kas_piutang;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_pp</td>
	  <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_proyek','$row->kode_lokasi');\">$row->kode_proyek</a></td>
	  <td class='isi_laporan'>$row->nama</td>
	  <td class='isi_laporan'>$row->no_pks</td>
	  <td class='isi_laporan'>$row->nama_jenis</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	 <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBdd('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->bdd,0,",",".")."</a></td>
	 <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBeban('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->beban,0,",",".")."</a></td>
	 <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBymhd('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->bymhd,0,",",".")."</a></td>
     <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBymhdKas('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->kas_bymhd,0,",",".")."</a></td>
	<td class='isi_laporan' align='right'>".number_format($row->bymhd-$row->kas_bymhd,0,",",".")."</td>
	<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->piutang,0,",",".")."</a></td>
	<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutangKas('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->kas_piutang,0,",",".")."</a></td>
	<td class='isi_laporan' align='right'>".number_format($row->piutang-$row->kas_piutang,0,",",".")."</td>
	<td class='isi_laporan'>".strtoupper($row->status_proyek)."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($bdd,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($beban,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($bymhd,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($kas_bymhd,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($bymhd-$kas_bymhd,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($piutang,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($kas_piutang,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($piutang-$kas_piutang,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
