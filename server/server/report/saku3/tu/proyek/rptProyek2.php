<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptProyek2 extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		
		$tmp="";
		if ($jenis=='Revisi')
		{
			$tmp=" and a.progress='R' ";
		}
		if ($jenis=='Approve')
		{
			$tmp=" and a.progress<>'R' ";
		}
		$sql="select a.kode_lokasi,a.kode_proyek,a.nama, a.nilai,isnull(d.pdpt,0) as pdpt,a.nilai-isnull(d.pdpt,0) as piu,a.nilai_or, a.p_or, b.beban, (b.beban/d.pdpt)*100 as real,a.nilai-b.beban as laba,a.kode_cust,c.nama as nama_cust,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.no_pks,(a.nilai-b.beban)/a.nilai as real2 
		from prb_proyek a
		left join (select a.no_dokumen,a.kode_lokasi,sum(a.nilai) as pdpt
								from trans_j a
								where a.kode_lokasi='$kode_lokasi' and a.jenis='PDPT' and a.modul='GENPYT'
								group by a.no_dokumen,a.kode_lokasi) d on a.kode_proyek=d.no_dokumen and a.kode_lokasi=d.kode_lokasi
		left join (select a.kode_proyek,a.kode_lokasi,a.periode_sch,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as beban 
				   from prb_prbeban_d a 							 
				   left join (select a.no_aju,a.no_kas,a.kode_lokasi 
							  from it_aju_m a inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
							  where b.kode_lokasi='$kode_lokasi' 
							  ) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi 
				   where a.modul = 'AJUBEBAN' and a.kode_lokasi='$kode_lokasi'  
				   and (  isnull(b.no_kas,'-') <> '-' or (a.no_ref1<>'-') )
				   group by a.kode_proyek,a.kode_lokasi,a.periode_sch
							)b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi and dbo.fnPeriode(a.tgl_app) = b.periode_sch
		inner join prb_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
		$this->filter
		order by a.kode_proyek
";

        // echo $sql;

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
		 <td width='80'  align='center' class='header_laporan'>No Proyek</td>
		 <td width='80'  align='center' class='header_laporan'>Kode Kontrak</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Mitra</td>
	 <td width='80'  align='center' class='header_laporan'>Tgl Mulai</td>
	 <td width='80'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Yang Telah Diakui s.d Bulan Berjalan</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Piutang</td>
     <td width='90'  align='center' class='header_laporan'>Beban Max (OR)</td>
	 <td width='60'  align='center' class='header_laporan'>% OR Max</td>
	  <td width='90'  align='center' class='header_laporan'>Realisasi Beban (Termasuk BMHD)</td>
	 <td width='90'  align='center' class='header_laporan'>% Realisai Beban Thd Realisasi Pendapatan (Bulan Berjalan)</td>
	 <td width='90'  align='center' class='header_laporan'>Laba Rugi</td>
	 <td width='90'  align='center' class='header_laporan'>% Total Beban Thd Total Pendapatan </td>
	  </tr>  ";
		$nilai=0;  $nilai_or=0; $shu=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_or+=$row->nilai_or;
            $pdpt+=$row->pdpt;
            $beban+=$row->beban;
            $laba+=$row->laba;
            $piu+=$row->piu;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
		 <td class='isi_laporan'>$row->kode_proyek</td>
		 <td class='isi_laporan'>$row->no_pks</td>
		<td class='isi_laporan'>$row->nama</td>
		<td class='isi_laporan'>$row->nama_cust</td>
		<td class='isi_laporan'>$row->tgl_mulai</td>
		<td class='isi_laporan'>$row->tgl_selesai</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->piu,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	  <td class='isi_laporan'>".number_format($row->p_or,2,",",".")." %</td>
      <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->beban,0,",",".")."</a></td>
	 <td class='isi_laporan'>".number_format($row->real,2,",",".")." %</td>
	 <td class='isi_laporan' align='right'>".number_format($row->laba,0,",",".")."</td>
	 <td class='isi_laporan'>".number_format($row->real2,2,",",".")." %</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($piu,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
       <td class='isi_laporan' align='right'>&nbsp;</td>
       <td class='isi_laporan' align='right'>".number_format($beban,0,",",".")."</td>
       <td class='isi_laporan' align='center' >&nbsp;</td>
       <td class='isi_laporan' align='right'>".number_format($laba,0,",",".")."</td>
       <td class='isi_laporan' align='center' >&nbsp;</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
