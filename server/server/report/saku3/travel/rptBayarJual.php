<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptBayarJual extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select distinct(a.no_bukti)
from trans_m a
$this->filter ";
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
		$kode_lokasi=$tmp[1];
		
		$sql="select distinct a.no_bukti,a.tanggal,a.keterangan ,e.kode_cust,c.nama as nama_pp ,a.nik_user,f.nama as nama_user 
from trans_m a
inner join trans_j e on e.no_bukti=a.no_bukti and e.kode_lokasi=a.kode_lokasi 
 inner join brg_cust c on e.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
 inner join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi 
$this->filter
order by a.tanggal";




		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembayaran pembelian",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='18' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_bukti</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
     
	   <tr>
        <td class='header_laporan'>Vendor  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_cust -&nbsp; $row->nama_pp</td>
      </tr>

	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
 
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='70' align='center' class='header_laporan'>No Referensi</td>
    <td width='50' align='center' class='header_laporan'>Tanggal</td>
	 <td width='260' align='center' class='header_laporan'>Keterangan</td>
    <td width='90' align='center' class='header_laporan'>Tagihan</td>
  </tr>";
			$sql1="select a.no_selesai,a.tanggal,a.keterangan,b.nilai1
from trans_j a
left join trans_m b on a.no_selesai=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.no_bukti='$row->no_bukti'  and a.dc='c'
 ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai=0;  
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
			$nilai+=$row1->nilai1;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->no_selesai</td>
    <td class='isi_laporan'>$row1->tanggal</td>
	<td class='isi_laporan'>$row1->keterangan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai1,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='4' align='center'  class='header_laporan'>Total Tagihan</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
  </tr>";

			echo "<tr>
    <td colspan='11' class='header_laporan'> Terbilang : ".$AddOnLib->terbilang($nilai)."</td>
  </tr>";
		echo "</table>";
		echo "</td>
  </tr>
  <tr>
    <td align='right'><table width='541' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='300' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan'>Barang telah diterima dengan baik,</td>
          </tr>
          <tr>
            <td height='50' align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>NIK.</td>
          </tr>
        </table></td>

        <td width='200' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan' class='header_laporan'>Hormat Kami,</td>
          </tr>
          <tr>
            <td height='50' align='center'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'><u>$row->nama_user</u></td>
          </tr>
          <tr>
            <td align='center' class='header_laporan'>NIK.$row->nik_user</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
			echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
