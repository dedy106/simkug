<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_hutang_rptHutangSaldo extends server_report_basic
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
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
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
		
		
		
		$sql="select a.kode_lokasi,a.no_hutang,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai,a.nilai_ppn,a.nilai-a.nilai_ppn as tagihan,b.nama as nama_cust,
	   isnull(d.nilai,0) as nilai_kas,
	   a.nilai-isnull(d.nilai,0) as saldo,e.no_kas as ket_kas
from hutang_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
left join (select b.no_bukti as no_hutang,a.no_spb,a.kode_lokasi
from spb_m a
inner join spb_d b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi
group by b.no_bukti,a.no_spb,a.kode_lokasi
		)c on a.no_hutang=c.no_hutang and a.kode_lokasi=b.kode_lokasi
left join spb_m d on c.no_spb=d.no_spb and c.kode_lokasi=d.kode_lokasi
left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_hutang";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Hutang</td>
	 <td width='120'  align='center' class='header_laporan'>No Invoice</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>Bayar Kas</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	 <td width='120'  align='center' class='header_laporan'>Keterangan</td>
     </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai=$nilai+$row->nilai;
			$nilai_curr=$nilai_curr+$row->nilai_curr;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$nilai_lain=$nilai_lain+$row->nilai_lain;
			$saldo=$saldo+$row->saldo;
			
			$tmp=explode(";",$row->ket_kas);
			$ket_kas="";
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_kas.="<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('".$tmp[$j]."','$row->kode_lokasi');\">".$tmp[$j]."</a><br>";
			}
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->no_hutang','$row->kode_lokasi');\">$row->no_hutang</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>$ket_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
      <td class='isi_laporan'>&nbsp;</td>
     </tr>
	 ";
		
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
