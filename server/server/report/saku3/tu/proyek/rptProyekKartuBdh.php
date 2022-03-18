<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptProyekKartuBdh extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$sql="select a.kode_proyek,a.kode_lokasi,a.nama,a.no_pks,a.kode_pp,a.kode_cust,a.nilai,a.p_or,a.nilai_or,a.nilai_ppn,a.jumlah,
	   convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,
	   b.nama as nama_cust,c.nama as nama_pp,d.nama as nama_jenis,
	   isnull(e.nilai,0) as piutang,isnull(f.nilai,0) as pdpt,isnull(g.nilai,0) as kas,
	   isnull(h.nilai,0) as beban,isnull(i.nilai,0) as bdd,isnull(j.nilai,0) as bymhd
from prb_proyek a
inner join prb_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join prb_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
left join (select no_dokumen,kode_lokasi,sum(nilai) as nilai
		   from prb_prpiutang_m
		   where kode_lokasi='$kode_lokasi'
		   group by no_dokumen,kode_lokasi
		  )e on a.kode_proyek=e.no_dokumen and a.kode_lokasi=e.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from prb_prpyt_d
		   where kode_lokasi='$kode_lokasi'
		   group by kode_proyek,kode_lokasi
		  )f on a.kode_proyek=f.kode_proyek and a.kode_lokasi=f.kode_lokasi
left join (select b.kode_proyek,a.kode_lokasi,sum(case a.dc when 'C' then a.nilai else -a.nilai end) as nilai 
		   from trans_j a
		   inner join tu_prbill_m b on a.no_dokumen=b.no_bill and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.jenis='PIU'
		   group by b.kode_proyek,a.kode_lokasi
		   )g on a.kode_proyek=g.kode_proyek and a.kode_lokasi=g.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from prb_prbeban_d
		   where kode_lokasi='$kode_lokasi' and dc='D' and modul='AJUBEBAN'
		   group by kode_proyek,kode_lokasi
		  )h on a.kode_proyek=h.kode_proyek and a.kode_lokasi=h.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(case when dc='D' then nilai else -nilai end) as nilai
		   from prb_prbeban_d
		   where kode_lokasi='$kode_lokasi' and modul in ('REVBDD','REVBMHD')
		   group by kode_proyek,kode_lokasi
		  )i on a.kode_proyek=i.kode_proyek and a.kode_lokasi=i.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from prb_prbeban_d
		   where kode_lokasi='$kode_lokasi' and dc='C' and modul='REVBMHD'
		   group by kode_proyek,kode_lokasi
		  )j on a.kode_proyek=j.kode_proyek and a.kode_lokasi=j.kode_lokasi
$this->filter order by a.kode_proyek";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rekapitulasi proyek treasury",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Proyek</td>
	 <td width='120'  align='center' class='header_laporan'>No SPK</td>
	   <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='200'  align='center' class='header_laporan'>Mitra</td>
   
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai OR</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Piutang</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Beban</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>Sisa Beban</td>
      </tr>  ";
		$nilai=0; $nilai_ppn=0; $total=0; $nilai_or=0; $piutang=0; $beban=0; $bdd=0; $pdpt=0; $nilai_kas=0; $bymhd=0;
		$total_beban=0; $saldo_proyek=0; $saldo_piutang=0; $labarugi=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_ppn+=$row->nilai_ppn;
			$total+=$row->total;
			$nilai_or+=$row->nilai_or;
			$piutang+=$row->piutang;
			$beban+=$row->beban;
			$bdd+=$row->bdd;
			$pdpt+=$row->pdpt;
			$kas+=$row->kas;
			$bymhd+=$row->bymhd;
			$saldo_proyek+=$row->nilai_or-$row->beban+$row->bmhd;
			$saldo_piutang+=$row->piutang-$row->kas;
			$labarugi+=$row->nilai_or-$row->beban;
			$persen=0;
			if ($row->nilai_or <>0)
			{
				$persen=($total_beban/$row->nilai_or)*100;
			}
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
	 echo "<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_proyek','$row->kode_lokasi');\">$row->kode_proyek</a>";
				echo "</td>
	 <td class='isi_laporan'>$row->no_pks</td>
	  <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai-$row->kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bdd+$row->beban,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->bymhd,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_or-$row->bdd+$row->bymhd+$row->beban,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($kas,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai-$kas,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($bdd+$beban,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($bymhd,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_or-$bdd+$bymhd+$beban,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
