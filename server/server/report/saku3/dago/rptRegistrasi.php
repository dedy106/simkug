<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dago_rptRegistrasi extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select 1";
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
		$sql="select a.no_reg, a.info, a.tgl_input,b.alamat, a.no_quota, a.uk_pakaian, b.hp, a.no_peserta, b.nopass, b.norek, b.nama as peserta, b.status, a.no_paket, c.nama as namapaket, a.no_jadwal, d.tgl_berangkat, 
			a.no_agen, e.nama_agen, a.no_type, f.nama as type, a.harga, h.nama_marketing, a.kode_lokasi
			from dgw_reg a		
			inner join dgw_peserta b on b.no_peserta=a.no_peserta and b.kode_lokasi=a.kode_lokasi
			inner join dgw_paket c on c.no_paket=a.no_paket and c.kode_lokasi=a.kode_lokasi
			inner join dgw_jadwal d on d.no_jadwal=a.no_jadwal and d.kode_lokasi=a.kode_lokasi
			inner join dgw_agent e on e.no_agen=a.no_agen and a.kode_lokasi=e.kode_lokasi
			inner join dgw_typeroom f on f.no_type=a.no_type and a.kode_lokasi=f.kode_lokasi
			inner join dgw_marketing h on h.no_marketing=e.kode_marketing and h.kode_lokasi=e.kode_lokasi 
			$this->filter";
		
		$rs = $dbLib->execute($sql);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/dago.png";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->kode_curr=="Rp")
			{
				$nilai=$AddOnLib->terbilang($row->nilai);
			}
			else
			{
				$nilai=$AddOnLib->terbilang_curr($row->nilai,$row->nama_curr);
			} 
			echo	"<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='303'><img src=$pathfoto width='200' height='90' /></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <th align='left'><h2>Bukti Registrasi </h2></th>
  </tr>
  <tr>
    <td align='left'><h4>Data Jamaah </h4></td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='222'>Tanggal Pendaftaran</td>
    <td width='165'>: $row->tgl_input</td>
    <td width='196'>No Registrasi </td>
    <td width='199'>: $row->no_reg</td>
  </tr>
  <tr>
    <td>Nama Jamaah</td>
    <td>: $row->peserta</td>
    <td>Nomor Telepon </td>
    <td>: $row->hp</td>
  </tr>
  <tr>
    <td>No Rekening</td>
    <td>: $row->norek</td>
    <td>Status Pernikahan </td>
    <td>: $row->status</td>
  </tr>
  <tr>
    <td>Alamat</td>
    <td>: $row->alamat</td>
    <td>No Passport </td>
    <td>: $row->nopass</td>
  </tr>
  <tr>
    <td>Agen</td>
    <td>: $row->nama_agen</td>
    <td>Marketing</td>
    <td>: $row->nama_marketing</td>
  </tr>
   
</table>
<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='223'>&nbsp;</td>
    <td width='567'>&nbsp;</td>
  </tr>
  <tr>
    <td><h4>Data Kelengkapan Dokumen </h4></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
";
	$sql="select a.no_dokumen,a.deskripsi,b.no_reg,b.ket,b.no_dok
from dgw_dok a
inner join dgw_reg_dok b on a.no_dokumen=b.no_dok and a.kode_lokasi=b.kode_lokasi
where b.no_reg='$row->no_reg' and a.kode_lokasi='$row->kode_lokasi'";
	$rs1 = $dbLib->execute($sql);	  
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td>$row1->deskripsi
        : $row1->ket</td>	  
      </tr>	  
        
	  ";
    }
	echo "	
  <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><h4>Data Kelengkapan Perjalanan </h4></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Keberangkatan</td>
    <td>: $row->tgl_berangkat</td>
  </tr>
  <tr>
    <td>Paket</td>
    <td>: $row->namapaket</td>
  </tr>
  <tr>
    <td>Harga Paket </td>
    <td>: ".number_format($row->harga,0,',','.')."</td>
  </tr>
  <tr>
    <td>Quota Ke-</td>
    <td>: $row->no_quota</td>
  </tr>
  <tr>
    <td>Ukuran Pakaian </td>
    <td>: $row->uk_pakaian</td>
  </tr>
  <tr>
    <td>Sumber Informasi </td>
    <td>: $row->info</td>
  </tr>
  <tr>
    <td>Biaya Tambahan </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
  ";
	$sql="select a.kode_biaya,c.nama,a.nilai
from dgw_reg_biaya a
inner join dgw_reg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi
inner join dgw_biaya c on c.kode_biaya=a.kode_biaya and c.kode_lokasi=a.kode_lokasi
where a.no_reg='$row->no_reg' and a.kode_lokasi='$row->kode_lokasi'";
	$rs2 = $dbLib->execute($sql);	  
	  while ($row2 = $rs2->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td>- $row2->nama </td>
		</tr>
      ";
    }
	echo " 
  </tr>
</table>
<br><DIV style='page-break-after:always'></DIV>
";
		
		}
		echo "</div>";
		return "";
	}
}
?>