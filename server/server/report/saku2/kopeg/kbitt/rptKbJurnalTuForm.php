<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptKbJurnalTuForm extends server_report_basic
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
		$sql="select a.no_kas,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi,d.nama as nama_lokasi,
       a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app,c.nama as nama_setuju,c.jabatan as jabatan_setuju,d.kota,a.nilai,d.logo,d.alamat
from kas_m a
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi $this->filter";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/tu.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			if (substr($row->no_kas,4,1)=="K")
			{
				$judul="BUKTI PENGELUARAN KAS / BANK";
				$format="KK / BK";
			}
			if (substr($row->no_kas,4,1)=="M")
			{
				$judul="BUKTI PENERIMAAN KAS / BANK";
				$format="KM / BM";
			}
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
   <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>$alamat</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>$judul</td>
  </tr>

  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
	   <tr>
        <td width='178' class='istyle15' height='20'>$format</td>
        <td width='612' class='istyle15'>: $row->no_kas</td>
      </tr>
      <tr>
        <td width='178' class='istyle15' height='20'>Sudah Terima dari </td>
        <td width='612' class='istyle15'>: $row->nama_lokasi </td>
      </tr>
      <tr>
        <td class='istyle15' height='20'>Jumlah Tunai / Cek </td>
        <td class='istyle15'>: ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td class='istyle15' height='20'>Terbilang</td>
        <td class='istyle15'>: ".$AddOnLib->terbilang($row->nilai)." </td>
      </tr>
      <tr>
        <td class='istyle15' height='20' valign='top'>Untuk Pembayaran </td>
        <td class='istyle15'>: $row->keterangan </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='900' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='471'>&nbsp;</td>
        <td width='319'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Yang Menerima </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='60'>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr><td height='70'>&nbsp;</td></tr>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='istyle15' height='20'>No Bukti </td>
        <td width='496' class='istyle15'>:&nbsp;$row->no_kas</td>
      </tr>
      <tr>
        <td width='100' class='istyle15' height='20'>No Dokumen </td>
        <td width='496' class='istyle15'>:&nbsp;$row->no_dokumen</td>
      </tr>
      <tr>
        <td class='istyle15' height='20'>Periode</td>
        <td class='istyle15'>:&nbsp;$row->periode</td>
      </tr>
      <tr>
        <td class='istyle15' height='20'>Tanggal</td>
        <td class='istyle15'>:&nbsp;$row->tanggal1</td>
      </tr>
      <tr>
        <td class='istyle15' height='20' valign='top'>Keterangan </td>
        <td class='istyle15'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='30' class='header_laporan' height='25' align='center'>No</td>
				
				<td width='60' class='header_laporan' align='center'>Akun</td>
				<td width='200' class='header_laporan' align='center'>Nama Akun </td>
				<td width='80' class='header_laporan' height='25' align='center'>No Dokumen</td>
				<td width='250' class='header_laporan' align='center'>Keterangan </td>
				<td width='40' class='header_laporan' align='center'>PP </td>
				<td width='60' class='header_laporan' align='center'>DRK </td>
				<td width='150' class='header_laporan' align='center'>Nama DRK </td>
				<td width='90' class='header_laporan' align='center'>Debet</td>
				<td width='90' class='header_laporan' align='center'>Kredit</td>
			  </tr>";
	  $sql1="select a.kode_akun,a.no_dokumen,b.nama,a.keterangan,a.kode_pp,a.kode_drk,a.kode_cf,
	  isnull(c.nama,'-') as nama_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
			from kas_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun=substring('$row->periode',1,4)
			where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
			order by a.no_dokumen,a.no_urut ";
		//error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->no_dokumen</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->kode_drk</td>
				<td class='isi_laporan'>$row1->nama_drk</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='8' class='istyle15' align='right'>Total &nbsp;</td>
    <td class='istyle15' align='right'>$tot_debet1</td>
    <td class='istyle15' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='150' class='istyle15'>&nbsp;DIKERJAKAN</td>
        <td width='159' class='istyle15'>&nbsp;</td>
        <td width='133' class='istyle15'>&nbsp;DIREKAM</td>
        <td width='140' class='istyle15'>&nbsp;DIPERIKSA</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td class='istyle15'>&nbsp;TGL</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td class='istyle15'>&nbsp;PARAF</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
