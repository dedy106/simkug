<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptRdDeviden extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_rddev)
from inv_rddev_m a
inner join (select a.no_rddev,a.kode_rdkelola
			from inv_rddev_d a
            group by a.no_rddev,a.kode_rdkelola
		    )d on a.no_rddev=d.no_rddev
inner join inv_rd e on a.kode_rd=e.kode_rd
inner join inv_rdkelola b on d.kode_rdkelola=b.kode_rdkelola
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
			$sql="select a.no_rddev,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,d.kode_rd,e.nama as nama_saham,
       a.kode_rdkelola,b.nama as nama_kelola,isnull(c.nilai_kb,0) as nilai_kb,isnull(c.nilai_pph,0) as nilai_pph,
	   isnull(c.nilai_dev,0) as nilai_dev
from inv_rddev_m a
inner join (select a.no_rddev,a.kode_rd
			from inv_rddev_d a
            group by a.no_rddev,a.kode_rd
		    )d on a.no_rddev=d.no_rddev
inner join inv_rd e on d.kode_rd=e.kode_rd
inner join inv_rdkelola b on b.kode_rdkelola=a.kode_rdkelola
left join (select a.no_rddev,a.kode_rd,b.kode_rdkelola,sum(a.nilai_kb) as nilai_kb,sum(a.nilai_pph) as nilai_pph,sum(a.nilai_dev) as nilai_dev
		from inv_rddev_d a 
		inner join inv_rddev_m b on a.no_rddev=b.no_rddev
		group by a.no_rddev,a.kode_rd,b.kode_rdkelola
		  )c on a.no_rddev=c.no_rddev and d.kode_rd=c.kode_rd and a.kode_rdkelola=c.kode_rdkelola
$this->filter order by a.no_rddev";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("deviden reksadana",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
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
     <td class='isi_laporan'>$row->no_rddev</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	  <td class='isi_laporan'>$row->kode_rd</td>
	 <td class='isi_laporan'>$row->nama_saham</td>
	 <td class='isi_laporan'>$row->kode_rdkelola</td>
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