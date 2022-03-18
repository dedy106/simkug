<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptSahamJualDetail extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_shmjual)
from inv_shmjual_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola ".$this->filter;
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$sql="select a.kode_lokasi,a.no_shmjual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola
from inv_shmjual_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
$this->filter order by a.no_shmjual";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan penjualan saham",$this->lokasi,$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='14' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	
        <td width='110' class='header_laporan'>No Bukti</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_shmjual</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Nama Kelola </td>
        <td class='header_laporan'>:&nbsp;$row->kode_kelola - $row->nama_kelola</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal Settlement </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_set </td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode Saham</td>
    <td width='200' align='center' class='header_laporan'>Nama Saham</td>
	 <td width='60' align='center' class='header_laporan'>Kode Broker</td>
    <td width='200' align='center' class='header_laporan'>Nama Broker</td>
    <td width='80' align='center' class='header_laporan'>Jumlah Unit</td>
    <td width='80' align='center' class='header_laporan'>Harga Perolehan</td>
    <td width='90' align='center' class='header_laporan'>Harga Buku</td>
    <td width='60' align='center' class='header_laporan'>Jumlah Jual</td>
    <td width='90' align='center' class='header_laporan'>Nilai Jual</td>
	<td width='90' align='center' class='header_laporan'>Gain Loss</td>
<td width='90' align='center' class='header_laporan'>Komisi Broker</td>
<td width='90' align='center' class='header_laporan'>VAT</td>
<td width='90' align='center' class='header_laporan'>levi</td>
  </tr>";
	  $sql1="select a.komisi,a.vat,a.levi,a.pph,a.h_oleh,a.h_jual,a.jumlah,a.n_jual,c.jumlah as jml_saham,
	   a.kode_saham,a.kode_broker,b.nama as nama_saham,d.nama as nama_broker,d.nama as nama_saham,a.gainlos
from inv_shmjual_d a
inner join inv_saham b on a.kode_saham=b.kode_saham
inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola
inner join inv_broker d on a.kode_broker=d.kode_broker
where a.no_shmjual='$row->no_shmjual' 
order by a.kode_saham ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$jml_saham=0;$n_jual=0;$komisi=0;$pph=0;$levi=0;$jumlah=0;$gainlos=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$jumlah=$jumlah+$row1->jumlah;
			$n_jual=$n_jual+$row1->n_jual;
			$gainlos=$gainlos+$row1->gainlos;
			$komisi=$komisi+$row1->komisi;
			$pph=$pph+$row1->pph;
			$levi=$levi+$row1->levi;
			echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row1->kode_saham</td>
    <td class='isi_laporan'>$row1->nama_saham</td>
    <td class='isi_laporan'>$row1->kode_broker</td>
    <td class='isi_laporan'>$row1->nama_broker</td>
    <td class='isi_laporan' align='right'>".number_format($row1->jml_saham,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->h_oleh,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->h_jual,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->n_jual,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->gainlos,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->komisi,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row1->levi,0,",",".")."</td>
  </tr>";
		$i=$i+1;
		}
		$tot=number_format($tot,0,",",".");
		
	  echo " <tr>
    <td colspan='8' align='right' class='header_laporan'>Total</td>
 	<td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($n_jual,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($gainlos,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($komisi,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($levi,0,",",".")."</td>
  </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
