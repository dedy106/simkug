<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptDocSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_depo)
from inv_depo_m a
inner join inv_bank b on a.kode_bank=b.kode_bank
$this->filter ";
		
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
		$sql="select a.no_depo,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.modul,
	   date_format(a.tgl_akru,'%d/%m/%Y') as tgl_akru,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
	   a.jml_hari,a.basis,a.p_bunga,a.nilai,
	   b.nama as nama_bank,a.kode_lokasi,
	   isnull(c.nilai,0) as akru_awal,isnull(d.nilai,0) as akru_mutasi,isnull(c.nilai,0)+isnull(d.nilai,0) as akru_sd,
	   isnull(e.nilai,0) as rev_awal,isnull(f.nilai,0) as rev_mutasi,isnull(e.nilai,0)+isnull(f.nilai,0) as rev_sd,
	   isnull(g.nilai,0) as cair_awal,isnull(h.nilai,0) as cair_mutasi,isnull(g.nilai,0)+isnull(h.nilai,0) as cair_sd,
	   isnull(i.nilai,0) as nilai_tutup
from inv_depo_m a
inner join inv_bank b on a.kode_bank=b.kode_bank
left join ( select a.no_depo,sum(a.nilai-a.pajak_akru) as nilai
			from inv_depoakru_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode'
			group by a.no_depo
		   )c on a.no_depo=c.no_depo
left join ( select a.no_depo,sum(a.nilai-a.pajak_akru) as nilai
			from inv_depoakru_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.no_depo
		   )d on a.no_depo=d.no_depo
left join ( select a.no_depo,sum(a.nilai_rev) as nilai
			from inv_depocair_m a
			where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode'
			group by a.no_depo
		   )e on a.no_depo=e.no_depo
left join ( select a.no_depo,sum(a.nilai_rev) as nilai
			from inv_depocair_m a
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.no_depo
		   )f on a.no_depo=f.no_depo
left join ( select a.no_depo,sum(a.nilai) as nilai
			from inv_depocair_m a
			inner join inv_depoakru_d b on a.no_cair=b.no_cair
			where a.kode_lokasi='$kode_lokasi' and b.no_kas<>'-' and a.periode<'$periode'
			group by a.no_depo
		   )g on a.no_depo=g.no_depo
left join ( select a.no_depo,sum(a.nilai) as nilai
			from inv_depocair_m a
			inner join inv_depoakru_d b on a.no_cair=b.no_cair
			where a.kode_lokasi='$kode_lokasi' and b.no_kas<>'-' and a.periode='$periode'
			group by a.no_depo
		   )h on a.no_depo=h.no_depo
left join ( select a.no_depo,sum(a.nilai) as nilai
			from inv_depotutup_m a
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.no_depo
		   )i on a.no_depo=g.no_depo
$this->filter order by a.no_depo";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo doc",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='80' rowspan='2'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100' rowspan='2'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Nama Bank</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90' rowspan='2'  align='center' class='header_laporan'>Nilai Penempatan </td>
    <td colspan='3'  align='center' class='header_laporan'>Akru Bunga </td>
	<td colspan='3'  align='center' class='header_laporan'>Reverse Akru Bunga</td>
	<td colspan='3'  align='center' class='header_laporan'>Nilai Cair Bunga </td>
	<td width='90' rowspan='2'  align='center' class='header_laporan'>Nilai Penutupan</td>
	</tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'> Sd Bulan Lalu</td>
     <td width='90'  align='center' class='header_laporan'> Bulan Ini</td>
     <td width='90'  align='center' class='header_laporan'> Sd Bulan Ini</td>
     <td width='90'  align='center' class='header_laporan'> Sd Bulan Lalu</td>
     <td width='90'  align='center' class='header_laporan'> Bulan Ini</td>
     <td width='90'  align='center' class='header_laporan'> Sd Bulan Ini</td>
     <td width='90'  align='center' class='header_laporan'> Sd Bulan Lalu</td>
     <td width='90'  align='center' class='header_laporan'> Bulan Ini</td>
     <td width='90'  align='center' class='header_laporan'> Sd Bulan Ini</td>
   </tr> ";
		$nilai=0; $akru_awal=0; $akru_mutasi=0; $akru_sd=0; $rev_awal=0; $rev_mutasi=0; $rev_sd=0; 
		$cair_awal=0; $cair_mutasi=0; $cair_sd=0; $nilai_tutup=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$akru_awal=$akru_awal+$row->akru_awal;
			$akru_mutasi=$akru_mutasi+$row->akru_mutasi;
			$akru_sd=$akru_sd+$row->akru_sd;
			$rev_awal=$rev_awal+$row->rev_awal;
			$rev_mutasi=$rev_mutasi+$row->rev_mutasi;
			$rev_sd=$rev_sd+$row->rev_sd;
			$cair_awal=$cair_awal+$row->cair_awal;
			$cair_mutasi=$cair_mutasi+$row->cair_mutasi;
			$cair_sd=$cair_sd+$row->cair_sd;
			$nilai_tutup=$nilai_tutup+$row->nilai_tutup;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_depo','$row->kode_lokasi');\">$row->no_depo</a>";
			echo "</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->nama_bank</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->akru_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->akru_mutasi,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->akru_sd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rev_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rev_mutasi,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rev_sd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->cair_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->cair_mutasi,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->cair_sd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_tutup,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($akru_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($akru_mutasi,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($akru_sd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($rev_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($rev_mutasi,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($rev_sd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($cair_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($cair_mutasi,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($cair_sd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_tutup,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
