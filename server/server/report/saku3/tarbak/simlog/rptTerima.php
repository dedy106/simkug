<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_simlog_rptTerima extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		error_log($sql);
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
		
		
		$sql="select a.kode_lokasi,a.no_terima,a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.kode_vendor,a.no_po,a.nik_buat,a.kode_lokasi,
		b.keterangan as ket_po,c.nama as nama_vendor,a.pengirim,convert(varchar,a.tanggal,103) as tgl_terima,a.nik_buat,d.nama as buat,a.pengirim
from log_terima_m a 
inner join log_spk_m b on a.no_po=b.no_spk and a.kode_lokasi=b.kode_lokasi 
inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi

$this->filter
order by a.no_terima";
		
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penerimaan barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_terima</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_terima</td>
        </tr>
		
		<tr>
        <td class='header_laporan'>Mitra </td>
        <td class='header_laporan'>:&nbsp;$row->nama_vendor</td>
      </tr>
      <tr>
        <td class='header_laporan'>No SPK</td>
        <td class='header_laporan'>:&nbsp;$row->no_po</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Penerima </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp; $row->buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Pengirim  </td>
        <td class='header_laporan'>:&nbsp;$row->pengirim</td>
      </tr>
	 
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='200' align='center' class='header_laporan'>Item Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='100' align='center' class='header_laporan'>No FA</td>
	<td width='60' align='center' class='header_laporan'>Kode Akun</td>
    <td width='60' align='center' class='header_laporan'>Klp Asset</td>
	<td width='40' align='center' class='header_laporan'>Jenis</td>
	<td width='90' align='center' class='header_laporan'>Harga</td>
    
  </tr>";
			$sql1="select id_pesan,no_fa,nama,merk,tipe,no_seri,nilai,kode_akun,kode_klpfa,kode_unit,jenis
from fa_asset
where no_baps='$row->no_terima' and kode_lokasi='$row->kode_lokasi'
order by no_fa ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->nama</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->no_fa</td>
    <td  class='isi_laporan'>$row1->kode_akun</td>
	<td  class='isi_laporan'>$row1->kode_klpfa</td>
	<td  class='isi_laporan' align='center'>$row1->jenis</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>

  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='8' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
	</tr><br>
	</td>
</tr>

<tr>
<td>
<tr ><table align='center' width='500' border='0' cellspacing='0' cellpadding='0' class='kotak'>
<br>
<br>
<td>&nbsp;</td>
<td align='left'>Jakarta, ".$row->tgl_terima."</td>
</tr>
  <tr>
  <td>&nbsp;</td>
    <td width='200'  class='isi_bukti'>Dikirim oleh,</td>
    <td width='200'  class='isi_bukti'>Diterima oleh,  </td>
  </tr>

  <tr>
    <td height='60'>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>

  </tr>
  <tr>
  <td>&nbsp;</td>
    <td class='isi_bukti' ><u>$row->nik_buat</u></td>
    <td class='isi_bukti' ><u>$row->buat</u></td>
  </tr>
  <tr>
  <td>&nbsp;</td>
    <td class='isi_bukti' >&nbsp;</td>
    <td class='isi_bukti' >NIP : $row->pengirim</td>

  </tr>";

		}
		echo "</div>";
		return "";
	}
	
}
?>
  
