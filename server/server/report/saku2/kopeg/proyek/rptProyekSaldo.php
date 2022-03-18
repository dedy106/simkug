<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_proyek_rptProyekSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_proyek)
from pr_proyek_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter";
		
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$sql="select a.no_proyek,a.no_dokumen,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_ppn,a.persen_or,a.nilai_or,a.keterangan,a.jenis,a.kode_lokasi,
a.kode_pp,c.nama as nama_pp ,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.nilai+a.nilai_ppn as total,
isnull(d.beban,0)+isnull(h.joincost,0) as beban,isnull(e.bmhd,0) as bmhd,isnull(f.piutang,0) as piutang,isnull(f.pdd,0) as pdd,isnull(g.nilai_kas,0) as nilai_kas,
isnull(d.beban,0)+isnull(h.joincost,0) +isnull(e.bmhd,0) as total_beban , (a.nilai+a.nilai_ppn)-isnull(g.nilai_kas,0) as saldo_proyek,
(a.nilai+a.nilai_ppn)-isnull(f.piutang,0) as saldo_piutang,isnull(g.nilai_kas,0)-isnull(d.beban,0) -isnull(e.bmhd,0) as labarugi
from pr_proyek_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select no_proyek,kode_lokasi,sum(nilai) as beban
from pr_beban_d
where modul='BEBAN'
group by no_proyek,kode_lokasi
		  )d on a.no_proyek=d.no_proyek and a.kode_lokasi=d.kode_lokasi
left join (select no_proyek,kode_lokasi,sum(nilai) as bmhd
from pr_beban_d
where modul in ('BMHD','PJPTG')
group by no_proyek,kode_lokasi
		  )e on a.no_proyek=e.no_proyek and a.kode_lokasi=e.kode_lokasi
left join (select no_proyek,kode_lokasi,sum(nilai+nilai_ppn) as piutang,sum(nilai_pdd) as pdd
from pr_piutang_m
group by no_proyek,kode_lokasi
		  )f on a.no_proyek=f.no_proyek and a.kode_lokasi=f.kode_lokasi
left join (select no_proyek,kode_lokasi,sum(nilai) as nilai_kas
from pr_piubayar_d
group by no_proyek,kode_lokasi
		  )g on a.no_proyek=g.no_proyek and a.kode_lokasi=g.kode_lokasi
left join (select no_proyek,kode_lokasi,sum(nilai) as joincost
from pr_joincost_d
group by no_proyek,kode_lokasi
		  )h on a.no_proyek=h.no_proyek and a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_proyek";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Proyek</td>
	 <td width='120'  align='center' class='header_laporan'>No SPK</td>
	   <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	    <td width='60'  align='center' class='header_laporan'>Jenis</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='200'  align='center' class='header_laporan'>Mitra</td>
   
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek</td>
	 <td width='40'  align='center' class='header_laporan'>% OR</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Maksimal beban / OR</td>
	 <td width='90'  align='center' class='header_laporan'>Pengakuan Piutang</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai PDD / Titipan Pendapatan</td>
	 <td width='90'  align='center' class='header_laporan'>Penerimaan Pendapatan</td>
	 <td width='90'  align='center' class='header_laporan'>Realisasi Beban</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai BMHD</td>
	 <td width='90'  align='center' class='header_laporan'>Total Beban</td>
	 <td width='40'  align='center' class='header_laporan'>%</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Piutang</td>
	 <td width='90'  align='center' class='header_laporan'>LabaRugi</td>
      </tr>  ";
		$nilai=0; $nilai_ppn=0; $total=0; $nilai_or=0; $piutang=0; $beban=0; $bmhd=0; $pdd=0; $nilai_kas=0;
		$total_beban=0; $saldo_proyek=0; $saldo_piutang=0; $labarugi=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=+$row->nilai;
			$nilai_ppn+=+$row->nilai_ppn;
			$total+=+$row->total;
			$nilai_or+=+$row->nilai_or;
			$piutang+=+$row->piutang;
			$beban+=+$row->beban;
			$bmhd+=+$row->bmhd;
			$pdd+=+$row->pdd;
			$nilai_kas+=+$row->nilai_kas;
			$total_beban+=+$row->total_beban;
			$saldo_proyek+=+$row->saldo_proyek;
			$saldo_piutang+=+$row->saldo_piutang;
			$labarugi+=+$row->labarugi;
			$persen=0;
			if ($row->nilai_or <>0)
			{
				$persen=($row->total_beban/$row->nilai_or)*100;
			}
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
	 echo "<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_proyek','$row->kode_lokasi');\">$row->no_proyek</a>";
				echo "</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	  <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	
	<td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	<td class='isi_laporan' align='center'>".number_format($row->persen_or,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->piutang,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pdd,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->beban,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bmhd,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total_beban,0,",",".")."</td>
	<td class='isi_laporan' align='center'>".number_format($persen,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo_proyek,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo_piutang,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->labarugi,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	
	  <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>&nbsp;</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($piutang,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($pdd,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($beban,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($bmhd,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total_beban,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>&nbsp;</td>
	   <td class='isi_laporan' align='right'>".number_format($saldo_proyek,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($saldo_piutang,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($labarugi,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
