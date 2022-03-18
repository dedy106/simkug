<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptSahamJual extends server_report_basic
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
			$sql="select a.no_shmjual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
       a.kode_kelola,b.nama as nama_kelola,isnull(c.jumlah,0) as jumlah,isnull(c.n_jual,0) as n_jual,
	   isnull(c.komisi,0) as komisi,isnull(c.vat,0) as vat,isnull(c.levi,0) as levi,isnull(c.gainlos,0) as gainlos
from inv_shmjual_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
left join (select a.no_shmjual,sum(a.jumlah) as jumlah,sum(a.n_jual) as n_jual,sum(a.komisi) as komisi,
			   sum(a.vat) as vat,sum(a.levi) as levi,sum(a.gainlos) as gainlos
		from inv_shmjual_d a 
		inner join inv_saham b on a.kode_saham=b.kode_saham
		inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola and a.kode_plan=c.kode_plan
		group by a.no_shmjual
		  )c on a.no_shmjual=c.no_shmjual
$this->filter order by a.no_shmjual";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penjualan saham",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='120'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='50'  align='center' class='header_laporan'>Kode Kelola</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Kelola</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Set</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='80'  align='center' class='header_laporan'>Jml Jual</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Jual</td>
	 <td width='90'  align='center' class='header_laporan'>Gain Loss</td>
	 <td width='90'  align='center' class='header_laporan'>Komisi Broker</td>
	 <td width='90'  align='center' class='header_laporan'>VAT</td>
	 <td width='90'  align='center' class='header_laporan'>Levy</td>
	  </tr>  ";
		$jumlah=0; $n_jual=0; $komisi=0; $vat=0; $levi=0;$gainlos=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah=$jumlah+$row->jumlah;
			$n_jual=$n_jual+$row->n_jual;
			$gainlos=$gainlos+$row->gainlos;
			$komisi=$komisi+$row->komisi;
			$vat=$vat+$row->vat;
			$levi=$levi+$row->levi;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_shmjual</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->kode_kelola</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->tgl_set</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_jual,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->gainlos,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->komisi,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->vat,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->levi,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n_jual,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($gainlos,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($komisi,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($vat,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($levi,0,",",".")."</td>
    
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>