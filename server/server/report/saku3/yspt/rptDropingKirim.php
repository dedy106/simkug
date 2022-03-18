<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yspt_rptDropingKirim extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$sql="select a.no_minta,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,
		a.kode_pp,b.nama as nama_pp
from ys_minta_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter
";
		
		$rs = $dbLib->execute($sql);
		
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN pengajuan droping",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='111' class='header_laporan'>No Bukti</td>
        <td width='379' class='header_laporan'>: $row->no_minta </td>
      </tr>
	  <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tanggal </td>
      </tr>
	  <tr>
        <td class='header_laporan'>PP</td>
        <td class='header_laporan'>: $row->kode_pp - $row->nama_pp </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
      
     <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>";
		
      
    echo "</table></td>
	  </tr>
	  <tr>
            <td colspan='7' style='padding:10px' ><table border='1' cellspacing='2' cellpadding='1' class='kotak'>
              <tr bgcolor='#CCCCCC'>
                <td width='60' class='header_laporan' align='center'>Kode Akun</td>
                <td width='200' class='header_laporan' align='center'>Nama Akun </td>
                <td width='300' class='header_laporan' align='center'>Keterangan</td>
                <td width='90' class='header_laporan' align='center'>Nilai</td>
              </tr>";
			  $sql1="select a.kode_akun,b.nama as nama_akun,a.keterangan,a.nilai_usul,a.nilai_app
from ys_minta_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_minta='$row->no_minta'
order by a.kode_akun ";
			$nilai=0;
			  $rs1 = $dbLib->execute($sql1);
			  while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai_usul;
              echo "<tr>
                <td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
		<td class='isi_laporan'>$row1->keterangan</td>
        <td align='right' class='isi_laporan'>".number_format($row1->nilai_usul,0,",",".")."</td>
              </tr>";
            }
			 echo "<tr>
                <td class='header_laporan' colspan='3' align='center'>Total</td>
        <td align='right' class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
              </tr>";
			echo "</table></td>
          </tr>
		  <tr>
    <td align='right' style='padding:10px'><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>Dibuat Oleh : </td>
        <td width='200' align='center'>Diperiksa Oleh : </td>
      </tr>
      <tr>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        </tr>
      <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
    </table></td>
  </tr>
		</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
