<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tm_rptBillKuitansi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.no_bill,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,
		a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai-a.nilai_ppn as tagihan,b.nama as nama_cust,c.kota,
		a.nik_buat,a.nik_app,d.nama as nama_buat,e.nama as nama_app,d.jabatan as jab_buat,e.jabatan as jab_app,a.no_kuitansi
from bill_m a
inner join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_buat=d.nik
left join karyawan e on a.nik_app=e.nik
$this->filter order by a.no_bill";
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tpcc.png";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400'><img src='$logo' ></td>
        <td width='400' align='left' valign='middle'><span class='istyle17'>KWITANSI</span></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200'>&nbsp;</td>
        <td width='150' height='40'>Nomor</td>
        <td width='350' height='40'>: $row->no_kuitansi </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='40'>Telah terima dari</td>
        <td>: $row->nama_cust </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='40'>Uang sejumlah</td>
        <td>: ".$AddOnLib->terbilang($row->nilai)."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='40'>Untuk pembayaran</td>
        <td>: $row->keterangan </td>
      </tr>
    </table></td>
  </tr>
  
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='250' rowspan='4' valign='bottom'>Jl. Gegerkalong Hilir No.47<br />
Bandung 40152, Indonesia<br />
telp. (022) 2007891<br />
faks. (022) 2007852<br />
www.telkompcc.co.id</td>
        <td>&nbsp;</td>
        <td colspan='2' align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td width='80'>&nbsp;</td>
        <td width='120'>&nbsp;</td>
        <td width='350' height='70'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center'>$row->nama_app</td>
      </tr>
      <tr>
        <td>Jumlah Rp. </td>
        <td bgcolor='#CCCCCC' align='center'>".number_format($row->nilai,0,",",".")."</td>
        <td align='center'>$row->jab_app</td>
      </tr>
    </table></td>
  </tr>
</table>";
			$i=$i+1;
		}
		
		echo "<br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
