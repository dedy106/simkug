<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sla_rptKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$sql="select a.no_sla	,a.kode_mitra	,a.no_dok1	,a.no_dok2	,date_format(a.tanggal,'%d/%m/%Y') as tgl	,a.keterangan	
		,date_format(a.tgl_tarik,'%d/%m/%Y') as tgl_tarik	
	   ,a.bunga	,a.jibor	,a.jibor_p	,a.basis	,a.nilai,b.nama as nama_mitra	
	   ,a.lama	gp	,a.lama_pokok	,a.lama_bunga	,a.periode	,a.tgl_input	,a.kode_lokasi	,a.kode_curr
from sla_m a
inner join sla_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.no_sla";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN KARTU SLA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
	  <tr>
        <td colspan='8'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='150' class='isi_laporan'>PEMBERI KREDIT</td>
        <td width='650' class='isi_laporan'>: PT. TELKOM INDONESIA </td>
      </tr>
      <tr>
        <td class='isi_laporan'>PEMINJAM</td>
        <td class='isi_laporan'>: $row->nama_mitra </td>
      </tr>
      <tr>
        <td class='isi_laporan'>NO/ TANGGAL AKTA KREDIT </td>
        <td class='isi_laporan'>: $row->no_dok1 </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>&nbsp; </td>
        <td class='isi_laporan'>: $row->no_dok2 </td>
      </tr>
      <tr >
        <td class='isi_laporan'>TUJUAN KREDIT</td>
        <td class='isi_laporan'>: $row->keterangan </td>
      </tr>
     
      <tr>
        <td class='isi_laporan'>JUMLAH PINJAMAN</td>
        <td class='isi_laporan'>: ".number_format($row->nilai,0,",",".")." </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>JANGKA WAKTU</td>
        <td class='isi_laporan'>: 7 (tujuh) tahun Incl GP 2 tahun </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>SUKU BUNGA </td>
        <td class='isi_laporan'>: 1,2 x (JIBOR 3 bln + 2,25%)  (JIBOR dua hari kerja seblm tgl penarikan/ seblm periode bunga berikutnya) </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>PEMBAYARAN ANGSURAN POKOK</td>
        <td class='isi_laporan'>: 6 (enam) bln secara prorata dimulai 6 bln setelah berakhirnya GP (mulai 17 Maret 2017) </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>PEMBAYARAN BUNGA </td>
        <td class='isi_laporan'>: setiap 3 (tiga) bulan sejak penarikan pertama (mulai 17 September 2014) </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>LAIN_LAIN</td>
        <td class='isi_laporan'>: Faktor pembagi 360 per tahun, Bila tgl pembayaran JT pada bukan hari kerja, dilakukan pada hari kerja sebelumnya  </td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='80' class='header_laporan'>Tgl Tagih</td>
        <td width='80' class='header_laporan'>Status </td>
		<td width='60' class='header_laporan'>Jumlah Hari</td>
        <td width='60' class='header_laporan'>JIBOR</td>
		<td width='60' class='header_laporan'>% Bunga</td>
		<td width='100' class='header_laporan'>Angsuran Pokok</td>
        <td width='100' class='header_laporan'>Saldo Pokok</td>
		<td width='100' class='header_laporan'>Pendapatan Bunga</td>
        </tr>";
	  $sql1="select date_format(a.tgl_tempo,'%d/%m/%Y') as tgl_tempo	,a.jenis	,a.jml_hari	,a.jibor	,a.p_bunga	,
	  a.sa_pokok	,a.npokok	,a.npdpt	,a.periode	,a.no_akru	,a.kurs	,a.kode_curr 
from sla_sch a
where a.no_sla='$row->no_sla' 
order by a.nu ";
	
	  $rs1 = $dbLib->execute($sql1);
	  $debet=0;$kredit=0;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$debet=$debet+$row1->debet;
		$kredit=$kredit+$row1->kredit;
      echo "<tr>
        <td class='isi_laporan'>$row1->tgl_tempo</td>
        <td class='isi_laporan'>$row1->jenis</td>
		<td align='right' class='isi_laporan'>$row1->jml_hari</td>
        <td align='right' class='isi_laporan'>".number_format($row1->jibor,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->p_bunga,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->sa_pokok,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->npokok,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->npdpt,0,",",".")."</td>
      </tr>";
	  }
	  $ntot=number_format($tot,0,",",".");
      echo "<tr>
        <td colspan='5' align='right' class='isi_laporan'>Total</td>
        <td align='right' class='isi_laporan'>".number_format($debet,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($kredit,0,",",".")."</td>
        </tr>";
       
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
