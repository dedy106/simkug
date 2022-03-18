<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_simlog_rptPesan extends server_report_basic
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
        $nik=$tmp[1];
        $no_app=$tmp[2];
        $status=$tmp[3];
				$jenis=$tmp[4];
				$kode_pp=$tmp[5];
		$sql="select a.periode,convert(varchar,a.tanggal,103) as tgl,a.no_pesan,a.kode_lokasi,a.keterangan,a.nik_buat,b.nama as nama_buat,
		a.nik_app,c.nama as nama_app,substring(a.periode,1,4) as tahun,d.kota,a.tanggal,b.email,isnull(d.kota,'Bandung') as kota
from log_pesan_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_pesan";

// echo $sql;
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<body >"; 
		echo $AddOnLib->judul_laporan("laporan purchase request",$this->lokasi,$periode);
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $email=$row->email;
			// $header="Pengajuan RRA - ".$row->no_pdrk;
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='10' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tgl</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_pesan</td>
        </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
     

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Item</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='60' align='center' class='header_laporan'>Tipe</td>
    <td width='200' align='center' class='header_laporan'>Catatan</td>
<td width='90' align='center' class='header_laporan'>Jumlah</td>
<td width='90' align='center' class='header_laporan'>Nilai</td>
  </tr>";
	  $sql1="
      select a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai
      from log_pesan_d a
      where a.no_pesan='$row->no_pesan' and a.kode_lokasi='$row->kode_lokasi'
      order by a.no_urut  ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$jum=0;
		$nil=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$jum=$jum+$row1->jumlah;
			$nil=$nil+$row1->nilai;
			echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row1->item</td>
    <td class='isi_laporan'>$row1->merk</td>
    <td class='isi_laporan'>$row1->tipe</td>
    <td class='isi_laporan'>$row1->catatan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
  </tr>";
		$i=$i+1;
		}
		
	  echo " <tr>
    <td colspan='5' align='right' class='header_laporan'>Total</td>
    <td align='right' class='header_laporan'>".number_format($jum,0,",",".")."</td>
	<td align='right' class='header_laporan'>".number_format($nil,0,",",".")."</td>
  </tr>
  <tr>
    <td align='right' colspan='10'><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='header_laporan'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td width='200' class='header_laporan'>Pemeriksa  </td>
        <td width='200' class='header_laporan'>Dibuat oleh </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nama_app</td>
        <td class='header_laporan'>$row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nik_app</td>
        <td class='header_laporan'>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
  </table><br>";
			
			$i=$i+1;
		}
		
		
		echo"</div></body>";
		
		return "";
	}
	
}
?>
