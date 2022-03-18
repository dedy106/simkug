<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptSahamBeli extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_shmbeli)
from inv_shmbeli_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
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
		$sql="select a.no_shmbeli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
       a.kode_kelola,b.nama as nama_kelola,isnull(c.jumlah,0) as jumlah,isnull(c.n_beli,0) as n_beli,
	   isnull(c.komisi,0) as komisi,isnull(c.vat,0) as vat,isnull(c.levi,0) as levi
from inv_shmbeli_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
left join (select a.no_shmbeli,sum(a.jumlah) as jumlah,sum(a.n_beli) as n_beli,sum(a.komisi) as komisi,
			   sum(a.vat) as vat,sum(a.levi) as levi
		from inv_shmbeli_d a 
		inner join inv_saham b on a.kode_saham=b.kode_saham
		inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola
		group by a.no_shmbeli
		  )c on a.no_shmbeli=c.no_shmbeli
$this->filter order by a.no_shmbeli";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembelian saham",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
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
     <td width='80'  align='center' class='header_laporan'>Jml Beli</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Beli</td>
	 <td width='90'  align='center' class='header_laporan'>Komisi Broker</td>
	 <td width='90'  align='center' class='header_laporan'>VAT</td>
	 <td width='90'  align='center' class='header_laporan'>Levy</td>
	  </tr>  ";
		$jumlah=0; $n_beli=0; $komisi=0; $vat=0; $levi=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah=$jumlah+$row->jumlah;
			$n_beli=$n_beli+$row->n_beli;
			$komisi=$komisi+$row->komisi;
			$vat=$vat+$row->vat;
			$levi=$levi+$row->levi;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_shmbeli</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->kode_kelola</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->tgl_set</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_beli,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->komisi,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->vat,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->levi,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n_beli,0,",",".")."</td>
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
