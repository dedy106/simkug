<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProyekTagihan extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$sql="select a.no_bill,a.kode_lokasi,a.kode_proyek,a.keterangan,a.tanggal,a.nilai,c.nama as nama_app,d.nama as nama_cust,a.no_dokumen
from tu_prbill_m a
inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
inner join cust d on b.kode_cust=d.kode_cust and b.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_bill";

echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td align='center' height='60'>&nbsp;</td>
  </tr>
 
  
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>INVOICE</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
	  <tr>
        <td width='150'>No Invoice</td>
        <td width='650' >:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/KUG.02/KUG 10/$tahun </td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
      </tr>
	 
      <tr>
        <td>Keterangan</td>
        <td>: $row->keterangan </td>
      </tr>
     
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
     
    </table></td>
  </tr>
   <tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>NO</td>
        <td width='500' align='center' class='header_laporan'>URAIAN</td>
        <td width='100' align='center' class='header_laporan'>HARGA</td>
        <td width='70' align='center' class='header_laporan'>QUANTITY</td>
		<td width='100' align='center' class='header_laporan'>JUMLAH</td>
      </tr>";
	  $sql="select keterangan,nilai,1 as jumlah,nilai_ppn
from tu_prbill_m
where no_bill='$row->no_bill' and kode_lokasi='$row->kode_lokasi' 
order by no_bill";
      $rs1 = $dbLib->execute($sql);
	  $nilai=0; $nilai_ppn=0; $netto=0; $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
			$nilai_ppn+=$row1->nilai_ppn;
			$netto+=$row1->netto;
      echo "<tr>
        <td class='isi_laporan' align='center'>$j</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
			$j+=1;
		}
		echo "<tr>
        <td class='header_laporan' colspan='4' align='right'>JUMLAH</td>
        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
      </tr>";
		echo "<tr>
        <td class='header_laporan' colspan='4' align='right'>PPN 10%</td>
        <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
      </tr>";
		echo "<tr>
        <td class='header_laporan' colspan='4' align='right'>TOTAL</td>
        <td class='header_laporan' align='right'>".number_format($nilai+$nilai_ppn,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Terbilang : ".$AddOnLib->terbilang($row->nilai)."</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      
	   <tr align='center'>
        <td width='200'>an. UNIVERSITAS TELKOM</td>
        <td width='400'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>KEPADA BIDANG KEUANGAN</td>
        <td >&nbsp;</td>
        <td ></td>
      </tr>
    
      <tr align='center' valign='bottom'>
        <td height='80' class='garis_bawah'>$row->nama_app</td>
        <td>&nbsp;</td>
        <td class='garis_bawah'></td>
      </tr>
      <tr align='center' valign='bottom'>
        <td></td>
        <td>&nbsp;</td>
        <td></td>
      </tr>
    </table></td>
  </tr>
 
  
</table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td align='center' class='judul_bukti' height='30'>KUITANSI</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='0'>
 
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Nomor</td>
        <td>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/KUG.02/KUG 10/$tahun </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td width='138'>Sudah Terima Dari</td>
        <td width='652'>: $row->nama_cust </td>
      </tr>
      <tr>
        <td>Banyaknya Uang</td>
        <td>: ".number_format($nilai+$ppn,0,",",".")." </td>
      </tr>
      <tr>
        <td>Untuk Pembayaran</td>
        <td>: $row->keterangan </td>
      </tr>
	  
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='500'>&nbsp;</td>
        <td width='300'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>an. Universitas Telkom</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>KEPALA BIDANG KEUANGAN </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='70'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>$row->nama_app</td>
      </tr>
    </table></td>
	 <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><b>Terbilang : ".$AddOnLib->terbilang($row->nilai)."</b></td>
  </tr>
  </tr>
  
</table></td>
  </tr>
  
</table>

			";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
