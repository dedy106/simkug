<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_simlog_rptTerima extends server_report_basic
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_terima,a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.kode_vendor,a.no_po,a.nik_buat,a.kode_lokasi,
		b.keterangan as ket_po,c.nama as nama_vendor,a.pengirim,date_format(a.tanggal,'%d/%m/%Y') as tgl_terima,d.nama as nama_buat,a.pengirim
from log_terima_m a 
inner join log_spk_m b on a.no_po=b.no_spk and a.kode_lokasi=b.kode_lokasi 
inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_terima";
		
		$rs = $dbLib->execute($sql);		
		
		
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penerimaan barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table width='1000' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
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
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak' >
	<tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='200' align='center' class='header_laporan'>Item Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='100' align='center' class='header_laporan'>No Seri</td>
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
			$i=1;$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;
  echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td  class='isi_laporan'>$row1->nama</td>
    <td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
    <td  class='isi_laporan'>$row1->no_fa</td>
    <td  class='isi_laporan'>$row1->kode_akun</td>
	<td  class='isi_laporan'>$row1->kode_klpfa</td>
	<td  class='isi_laporan' align='center'>$row1->jenis</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,',','.')."</td>
  </tr>";
				$i=$i+1;
			}
  
  echo "<tr>
    <td colspan='8' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,',','.')."</td>
  </tr>
  </table>  </td>
  </tr>
  
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='400' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>Jakarta, $row->tgl_terima</td>
        </tr>
      <tr>
        <td>Dikirim oleh,</td>
        <td>Diterima oleh,</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->pengirim</td>
        <td><u>$row->nama_buat</u></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table
  <br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
