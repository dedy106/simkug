<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptRdJualDetail extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$sql="select a.kode_lokasi,a.no_rdjual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_rdkelola,b.nama as nama_kelola
from inv_rdjual_m a
inner join inv_rdkelola b on a.kode_rdkelola=b.kode_rdkelola
$this->filter order by a.no_rdjual";
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan penjualan reksadana",$this->lokasi,$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='14' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	
        <td width='110' class='header_laporan'>No Bukti</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_rdjual_m</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Nama Kelola </td>
        <td class='header_laporan'>:&nbsp;$row->kode_rdkelola - $row->nama_kelola</td>
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
	   a.kode_rd,a.kode_rdkelola,b.nama as nama_rd,d.nama as nama_kelola,a.gainlos
from inv_rdjual_d a
inner join inv_rd b on a.kode_rd=b.kode_rd and a.kode_plan=b.kode_plan
inner join inv_rd_d c on a.kode_rd=c.kode_rd 
inner join inv_rdkelola d on a.kode_rdkelola=d.kode_rdkelola
where a.no_rdjual='$row->no_rdjual' 
order by a.kode_rd ";
		
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
    <td class='isi_laporan'>$row1->kode_rd</td>
    <td class='isi_laporan'>$row1->nama_rd</td>
    <td class='isi_laporan'>$row1->kode_rdkelola</td>
    <td class='isi_laporan'>$row1->nama_kelola</td>
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
