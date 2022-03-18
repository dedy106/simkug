<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptIfSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$nik=$tmp[2];
		$sql="select a.nik,b.nama,
	   a.nilai+isnull(c.nilai,0)-isnull(d.nilai,0) as so_awal,
	   isnull(d.nilai,0) as debet,isnull(f.nilai,0) as kredit,
	   a.nilai+isnull(c.nilai,0)-isnull(d.nilai,0)+isnull(d.nilai,0)-isnull(f.nilai,0) as so_akhir
from yk_if_m a
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
left join (select a.nik_buat,sum(a.nilai) as nilai
		   from yk_ifptg_m a
		   where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.no_app<>'-'
		   group by a.nik_buat
		   )c on a.nik=c.nik_buat
left join (select a.nik_buat,sum(a.nilai) as nilai
		   from yk_ifptg_m a
		   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_app<>'-'
		   group by a.nik_buat
		   )d on a.nik=d.nik_buat
left join (select a.nik_buat,sum(a.nilai) as nilai
		   from yk_ifptg_m a
		   where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.no_kas<>'-'
		   group by a.nik_buat
		   )e on a.nik=e.nik_buat
left join (select a.nik_buat,sum(a.nilai) as nilai
		   from yk_ifptg_m a
		   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_kas<>'-'
		   group by a.nik_buat
		   )f on a.nik=f.nik_buat		
order by a.nik";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pengajuan imprest fund",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Awal</td>
	 <td width='90'  align='center' class='header_laporan'>Pemakaian</td>
	 <td width='90'  align='center' class='header_laporan'>Penggantian</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo Akhir</td>
     </tr>  ";
		$so_awal=0;$debet=0;$kredit=0;$so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal=$so_awal+$row->so_awal;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir=$so_akhir+$row->so_akhir;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($debet,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
