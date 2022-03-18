<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProyekRekap extends server_report_basic
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
		$sql="select a.kode_lokasi,year(a.tgl_mulai) as tahun,sum(a.nilai) as kontrak,
	   sum(isnull(e.nilai,0)) as piutang,sum(isnull(f.nilai,0)) as pdpt,sum(isnull(g.nilai,0)) as kas,
	   sum(isnull(h.nilai,0)) as bdd,sum(isnull(i.nilai,0)) as beban,sum(isnull(j.nilai,0)) as bymhd
from tu_proyek a
left join (select no_dokumen,kode_lokasi,sum(nilai) as nilai
		   from tu_prpiutang_m
		   where kode_lokasi='$kode_lokasi'
		   group by no_dokumen,kode_lokasi
		  )e on a.kode_proyek=e.no_dokumen and a.kode_lokasi=e.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from tu_prpyt_d
		   where kode_lokasi='$kode_lokasi'
		   group by kode_proyek,kode_lokasi
		  )f on a.kode_proyek=f.kode_proyek and a.kode_lokasi=f.kode_lokasi
left join (select b.kode_proyek,a.kode_lokasi,sum(case a.dc when 'C' then a.nilai else -a.nilai end) as nilai 
		   from ju_j a
		   inner join tu_prbill_m b on a.no_dokumen=b.no_bill and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.jenis='PIU'
		   group by b.kode_proyek,a.kode_lokasi
		   )g on a.kode_proyek=g.kode_proyek and a.kode_lokasi=g.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from tu_prbdd_d
		   where kode_lokasi='$kode_lokasi' and dc='D' and modul='AJUBDD'
		   group by kode_proyek,kode_lokasi
		  )h on a.kode_proyek=h.kode_proyek and a.kode_lokasi=h.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(case when dc='D' then nilai else -nilai end) as nilai
		   from tu_prbdd_d
		   where kode_lokasi='$kode_lokasi' and modul in ('REVBDD','REVBMHD')
		   group by kode_proyek,kode_lokasi
		  )i on a.kode_proyek=i.kode_proyek and a.kode_lokasi=i.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from tu_prbdd_d
		   where kode_lokasi='$kode_lokasi' and dc='C' and modul='REVBMHD'
		   group by kode_proyek,kode_lokasi
		  )j on a.kode_proyek=j.kode_proyek and a.kode_lokasi=j.kode_lokasi
$this->filter
group by year(a.tgl_mulai),a.kode_lokasi ";
	
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rekapitulasi proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>Tahun</td>
	 <td width='100'  align='center' class='header_laporan'>Nilai Kontrak</td>
	   <td width='100'  align='center' class='header_laporan'>Nilai Pembayaran</td>
	    <td width='100'  align='center' class='header_laporan'>Nilai Piutang</td>
	 <td width='100'  align='center' class='header_laporan'>Nilai Beban</td>
      </tr>  ";
		$kontrak=0; $bayar=0; $piutang=0; $beban=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$kontrak+=$row->kontrak;
			$bayar+=$row->bayar;
			$piutang+=$row->piutang;
			$beban+=$row->beban;
		
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
	 echo "<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->tahun','$row->kode_lokasi');\">$row->tahun</a>";
				echo "</td>
	<td class='isi_laporan' align='right'>".number_format($row->kontrak,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kontrak-$row->kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->beban,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='2'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($kontrak,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($kontrak-$bayar,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($beban,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
