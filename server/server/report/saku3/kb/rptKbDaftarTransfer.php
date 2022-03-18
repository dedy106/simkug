<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kb_rptKbDaftarTransfer extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
		$sql="select count(a.no_kas) as jum from kas_m a $this->filter ";
		
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		$sql="select a.no_kas,a.kode_lokasi,a.tanggal,a.nik_buat,a.nik_app,e.nama as nama_buat,f.nama as nama_app,g.kota
from kas_m a
inner join karyawan e on a.nik_buat=e.nik
inner join karyawan f on a.nik_app=f.nik
inner join lokasi g on a.kode_lokasi=g.kode_lokasi
		$this->filter
		order by a.no_kas ";
		//error_log($sql);	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();
		$i=1;
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='550'>&nbsp;</td>
        <td width='250'>Kepada</td>
      </tr>
      <tr>
        <td class='istyle17'>DAFTAR TRANSFER PEMBAYARAN </td>
        <td>Yth. $row->no_kas </td>
      </tr>
      <tr>
        <td>No. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/KU.420/YAKES-22/XI/2013 </td>
        <td>a</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Mohon transfer dari nomor rekening atas nama YAKES TELKOM No. a kepada nama -nama dan bank terlampir di bawah ini : </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='36' class='header_laporan'>No.</td>
        <td width='293' class='header_laporan'>Keterangan </td>
        <td width='322' class='header_laporan'>No REKENING &amp; BANK</td>
        <td width='131' class='header_laporan'>JUMLAH (Rp) </td>
      </tr>";
		$sql="select a.no_kas,a.tanggal,d.nama as nama_vendor,c.bank,c.cabang,c.no_rek,c.nilai
from kas_m a
inner join spb_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
inner join spb_d c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi
inner join vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokvendor=d.kode_lokasi
		where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
		union
		select a.no_kas,a.tanggal,d.nama as nama_vendor,c.bank,c.cabang,c.no_rek,c.nilai
from kas_m a
inner join spb_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
inner join spb_d c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi
inner join karyawan d on c.kode_vendor=d.nik 
		where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
		 ";
		
		$rs1 = $dbLib->execute($sql);
		$i=1; $nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
      echo "<tr>
        <td class='isi_laporan'  align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama_vendor</td>
        <td class='isi_laporan'>$row1->bank $row->cabang No. Rek. $row->no_rek</td>
        <td class='isi_laporan'  align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td>&nbsp;</td>
        <td colspan='2' class='header_laporan'>TOTAL</td>
        <td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='3' class='header_laporan'>Terbilang : ( ".$AddOnLib->terbilang($nilai)." ) </td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='241'>Mengetahui Menyetujui </td>
        <td width='264'>&nbsp;</td>
        <td width='281'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))." </td>
      </tr>
      <tr>
        <td>KABIDKUG</td>
        <td>&nbsp;</td>
        <td>MGR Per </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center'>Diterima petugas Bank </td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>";
			$first = true;
			$i=$i+1;
		}
		
		echo "</div>";
		return "";
		
	}
	
}
?>
