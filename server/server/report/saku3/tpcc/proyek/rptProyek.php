<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptProyek extends server_report_basic
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
		$sql="select a.kode_lokasi,a.kode_proyek,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_or,a.nama,a.kode_jenis,d.nama as nama_jenis,a.no_pks,
a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,
isnull(e.bdd,0) as bdd,a.nilai_or-isnull(e.bdd,0) as saldo,a.nilai_ppn,a.p_or,ROUND(e.bdd/a.nilai*100,0)  as r_or,a.nilai_pph,isnull(g.nilai,0) as pdpt, isnull(g.nilai,0) - isnull(e.bdd,0) as profit,isnull(h.bayar,0) as bayar, b.divisi,
isnull(i.nilai_pph,0) as nilai_pph,a.nilai+a.nilai_ppn as total_proyek,cs.nama as nama_consumer,a.tgl_input,isnull(j.byr_ppn,0) as byr_ppn
from pr_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join consumer cs on a.kode_cons=cs.kode_cons and a.kode_lokasi=cs.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join pr_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
--left join trans_m f on a.kode_proyek=f.no_dokumen and a.kode_lokasi=f.kode_lokasi
left join ( select a.no_bukti,b.no_dokumen,a.kode_lokasi,sum(a.nilai) as nilai
			from trans_j a
			inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			where a.modul='PR' and a.jenis='PDPT'
			group by a.no_bukti,b.no_dokumen,a.kode_lokasi
			) g on a.kode_proyek=g.no_dokumen and a.kode_lokasi=g.kode_lokasi
left join ( select b.kode_project,a.kode_lokasi,sum(c.nilai) as bayar 
			from piutang_bayar a 
			inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi 
			inner join trans_j c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
			where c.kode_akun like '111%' and c.dc='d'
			group by b.kode_project,a.kode_lokasi ) h on a.kode_proyek=h.kode_project and a.kode_lokasi=h.kode_lokasi 
left join ( select b.kode_project,a.kode_lokasi,sum(c.nilai) as byr_ppn 
			from piutang_bayar a 
			inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi 
			left join trans_j c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
			where c.kode_akun like '212%' and c.dc='d'
			group by b.kode_project,a.kode_lokasi ) j on a.kode_proyek=j.kode_project and a.kode_lokasi=j.kode_lokasi 
left join (select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end)  as bdd 
          from pr_or_d 
		  where kode_lokasi='$kode_lokasi' and jenis in ('BEBAN','PJBEBAN')
		  group by kode_proyek,kode_lokasi
		  ) e on a.kode_proyek=e.kode_proyek and a.kode_lokasi=e.kode_lokasi
left join ( select c.kode_project,a.kode_lokasi,sum(a.nilai) as nilai_pph 
			from trans_j a 
			inner join piutang_bayar b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
			inner join piutang_d c on c.no_piutang=b.no_piutang and c.kode_lokasi=b.kode_lokasi 
			where a.kode_akun='1165102' 
			group by c.kode_project,a.kode_lokasi) i on a.kode_proyek=i.kode_project and a.kode_lokasi=i.kode_lokasi 
$this->filter 
order by a.kode_proyek";
// echo $sql;

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,$nama_cab);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='80' rowspan='2'  align='center' class='header_laporan'>Kode Proyek</td>
	  <td width='250' rowspan='2'  align='center' class='header_laporan'>Nama Proyek</td>
	  <td width='150' rowspan='2'  align='center' class='header_laporan'>No Kontrak</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Customer</td>
     <td width='80' rowspan='2'  align='center' class='header_laporan'>Divisi</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Consumer</td>
	 <td width='100' rowspan='2'  align='center' class='header_laporan'>Jenis</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60' rowspan='2'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Nilai Proyek (Kontrak)</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Total Proyek</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Nilai PPH</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Pembayaran</td>	
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Pot PPN</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Pendapatan</td>	 
	 <td colspan='3' align='center' class='header_laporan'>RAB</td>
	 <td colspan='3' align='center' class='header_laporan'>OR</td>	 
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Profit</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Tgl Input</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
		<td width='90'  align='center' class='header_laporan'>Target</td>
		<td width='90'  align='center' class='header_laporan'>Realisasi</td>
		<td width='90'  align='center' class='header_laporan'>Sisa</td>
		<td width='90'  align='center' class='header_laporan'>Target</td>
		<td width='90'  align='center' class='header_laporan'>Realisasi</td>
		<td width='90'  align='center' class='header_laporan'>Sisa</td>
     </tr>  ";
		$total_proyek=0;$nilai=0;  $nilai_ppn=0; $nilai_or=0; $bdd=0; $profit=0; $nilai_pph=0;$sisa_rab=0;$sisa_or=0;$pdpt=0;$bayar=0;$byr_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_or+=$row->nilai_or;
			$bdd+=$row->bdd;
			$profit+=$row->profit;
			$nilai_ppn+=$row->nilai_ppn;
			$nilai_pph+=$row->nilai_pph;
			$p_or+=$row->p_or;
			$r_or+=$row->r_or;
			$s_rab = $row->nilai_or - $row->bdd;
			$s_or = $row->p_or - $row->r_or;
			$sisa_rab+=$s_rab;
			$sisa_or+=$s_or;
			$pdpt+=$row->pdpt;
			$bayar+=$row->bayar;
			$total_proyek+=$row->total_proyek;
			$byr_ppn+=$row->byr_ppn;
			

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_proyek</td>
	  <td class='isi_laporan'>$row->nama</td>
	  <td class='isi_laporan'>$row->no_pks</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->divisi</td>
	 <td class='isi_laporan'>$row->nama_consumer</td>
	  <td class='isi_laporan'>$row->nama_jenis</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total_proyek,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_pph,0,",",".")."</td>
	<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetailBayar('$row->kode_proyek','$row->kode_lokasi','BYR');\">".number_format($row->bayar,0,",",".")."</a></td>
	<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetailBayar('$row->kode_proyek','$row->kode_lokasi','PPN');\">".number_format($row->byr_ppn,0,",",".")."</a></td>
	<td class='isi_laporan' align='right'>".number_format($row->pdpt,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bdd,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($s_rab,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->p_or,0,",",".")."%</td>
	<td class='isi_laporan' align='right'>".number_format($row->r_or,0,",",".")."%</td>	
	<td class='isi_laporan' align='right'>".number_format($s_or,0,",",".")."%</td>
	<td class='isi_laporan' align='right'>".number_format($row->profit,0,",",".")."</td>
	<td class='isi_laporan'>$row->tgl_input</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
		  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
		  <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
		  <td class='header_laporan' align='right'>".number_format($total_proyek,0,",",".")."</td>
		  <td class='header_laporan' align='right'>".number_format($nilai_pph,0,",",".")."</td>
		  <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
		  <td class='header_laporan' align='right'>".number_format($byr_ppn,0,",",".")."</td>
		  <td class='header_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
	   <td class='header_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
	   <td class='header_laporan' align='right'>".number_format($bdd,0,",",".")."</td>
	   <td class='header_laporan' align='right'>".number_format($sisa_rab,0,",",".")."</td>
	   <td class='header_laporan' align='right'>".number_format($p_or,0,",",".")."%</td>
	   <td class='header_laporan' align='right'>".number_format($r_or,0,",",".")."%</td>	
	   <td class='header_laporan' align='right'>".number_format($sisa_or,0,",",".")."%</td>	   
	   <td class='header_laporan' align='right'>".number_format($profit,0,",",".")."</td>	   
	   <td class='header_laporan' align='right'></td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
