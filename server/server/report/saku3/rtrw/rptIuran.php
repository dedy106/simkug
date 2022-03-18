<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rtrw_rptIuran extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.nama)
from pp a
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
		
		
		$sql="select a.kode_rumah,b.nama,a.kode_pp
		from rt_bill_d a
		inner join rt_iuran_jenis b on a.kode_jenis=b.kode_jenis
		$this->filter
		order by a.kode_rumah ";

		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan iuran rutin",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>Jenis Iuran </td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
        </tr>
		  <tr>
        <td class='header_laporan'>RT   </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp</td>
      </tr>
     
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='70' align='center' class='header_laporan'>Kode Rumah</td>
    <td width='250' align='center' class='header_laporan'>Penghuni</td>
	 <td width='60' align='center' class='header_laporan'>Nilai RT</td>
    <td width='90' align='center' class='header_laporan'>Nilai RW</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
			$sql1="select a.kode_rumah,a.nilai_rt,a.nilai_rw,isnull(c.nama,'-') as penghuni,a.nilai_rt+a.nilai_rw as total
		from rt_bill_d a
		inner join rt_rumah b on a.kode_rumah=b.kode_rumah
		left join rt_warga c on b.kode_penghuni=c.nik
where a.kode_rumah='$row->kode_rumah' 
order by a.kode_rumah ";
		
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai_rt=0; $nilai_rw=0; $total=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai_rt=$nilai_rt+$row1->nilai_rt;
				$nilai_rw=$nilai_rw+$row1->nilai_rw;
				$total=$total+$row1->total;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_rumah</td>
    <td class='isi_laporan'>$row1->penghuni</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai_rt,2,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->nilai_rw,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
				
			echo "<tr>
    <td colspan='3' align='right'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai_rt,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($nilai_rw,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr>";
		echo "<tr>
    <td colspan='9' class='header_laporan'> Terbilang : ".$AddOnLib->terbilang($total)."</td>
  </tr>";
		echo "</table>";
		echo "</td>
  </tr>
  <tr>
    <td align='right'><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        
        <td width='200' valign='top'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
          <tr>
            <td align='center' class='header_laporan'>Mengetahui,</td>
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
            <td align='center' class='header_laporan' class='header_laporan'>Diinput Oleh,</td>
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
  
