<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_hutang_rptHutangPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_hutang)
from hutang_m a
$this->filter";
		
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
		$lokasi=$tmp[1];
		$sql="select a.kode_spro,b.nik,b.nama,c.kota
from spro a
inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
where kode_spro in ('NIKBUAT','NIKAPP') and a.kode_lokasi='$lokasi'";
		$rs = $dbLib->execute($sql);	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->kode_spro=='NIKBUAT')
			{
				$nik_buat=$row->nik;
				$nama_buat=$row->nama;
			}
			if ($row->kode_spro=='NIKAPP')
			{
				$nik_app=$row->nik;
				$nama_app=$row->nama;
			}
			$kota=$row->kota;
		}
		$sql="select a.no_hutang,date_format(a.tanggal,'%d/%m/%Y') as tgl_hutang,a.keterangan,a.nilai,
		b.nama as nama_vendor,c.no_pb,date_format(c.tanggal,'%d/%m/%Y') as tgl_pb,
	    c.no_spb,date_format(d.tanggal,'%d/%m/%Y') as tgl_spb,
		d.no_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas,c.nilai as nilai_pb
from hutang_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
left join pb_m c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi
left join spb_m d on c.no_spb=d.no_spb and c.kode_lokasi=d.kode_lokasi
left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_hutang";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tagihan hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Tagihan</td>
	  <td width='100'  align='center' class='header_laporan'>No PB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl PB</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PB</td>
	 <td width='100'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='100'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_hutang</td>
	 <td class='isi_laporan'>$row->tgl_hutang</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan'>$row->no_pb</td>
	  <td class='isi_laporan'>$row->tgl_pb</td>
	   <td class='isi_laporan' align='right'>".number_format($row->nilai_pb,0,",",".")."</td>
	  <td class='isi_laporan'>$row->no_spb</td>
	  <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>$row->no_kas</td>
	  <td class='isi_laporan'>$row->tgl_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
   
     </tr>";
		echo "</table>";
		echo "</td>
  </tr>
  <tr>
    <td align='right' style='padding:10px 10px;'><table width='300' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td height='20' class='header_laporan' style='padding-left:20px;'>".ucwords(strtolower($kota))." ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$AddOnLib->ubah_periode($periode)."</td>
  </tr>
  <tr>
    <td ><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='header_laporan'></td>
      </tr>
      <tr align='center'>
        <td width='150' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='150' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'><u>$nama_app</u></td>
        <td class='header_laporan'><u>$nama_buat</u></td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>NIK.$nik_app</td>
        <td class='header_laporan'>NIK.$nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
