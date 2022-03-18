<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptSahamDeviden extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
			$sql="select a.no_shmdev,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.kode_saham,e.nama as nama_saham,
       d.kode_kelola,b.nama as nama_kelola,isnull(c.nilai_kb,0) as nilai_kb,isnull(c.nilai_pph,0) as nilai_pph,
	   isnull(c.nilai_dev,0) as nilai_dev
from inv_shmdev_m a
inner join (select a.no_shmdev,a.kode_kelola
			from inv_shmdev_d a
            group by a.no_shmdev,a.kode_kelola
		    )d on a.no_shmdev=d.no_shmdev
inner join inv_saham e on a.kode_saham=e.kode_saham
inner join inv_kelola b on d.kode_kelola=b.kode_kelola
left join (select a.no_shmdev,b.kode_saham,a.kode_kelola,sum(a.nilai_kb) as nilai_kb,sum(a.nilai_pph) as nilai_pph,sum(a.nilai_dev) as nilai_dev
		from inv_shmdev_d a 
		inner join inv_shmdev_m b on a.no_shmdev=b.no_shmdev
		group by a.no_shmdev,b.kode_saham,a.kode_kelola
		  )c on a.no_shmdev=c.no_shmdev and a.kode_saham=c.kode_saham and d.kode_kelola=c.kode_kelola
$this->filter order by a.no_shmdev";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("deviden saham",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='120'  align='center' class='header_laporan'>No Dokumen</td>
	  <td width='50'  align='center' class='header_laporan'>Kode Saham</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Saham</td>
	 <td width='50'  align='center' class='header_laporan'>Kode Kelola</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Kelola</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='80'  align='center' class='header_laporan'>Nilai KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai PPH</td>
	 <td width='90'  align='center' class='header_laporan'>Komisi Deviden</td>
	  </tr>  ";
		$nilai_kb=0; $nilai_pph=0; $nilai_dev=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_kb=$nilai_kb+$row->nilai_kb;
			$nilai_pph=$nilai_pph+$row->nilai_pph;
			$nilai_dev=$nilai_dev+$row->nilai_dev;
		
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_shmdev</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	  <td class='isi_laporan'>$row->kode_saham</td>
	 <td class='isi_laporan'>$row->nama_saham</td>
	 <td class='isi_laporan'>$row->kode_kelola</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_kb,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_dev,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    	  <td class='isi_laporan' align='center' colspan='9'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kb,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_dev,0,",",".")."</td>
    
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>