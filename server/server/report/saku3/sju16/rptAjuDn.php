<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptAjuDn extends server_report_basic
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
    $sql="select a.no_dn,a.kode_lokasi,a.tanggal,a.tahun_pajak,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_pp,a.tempat,a.alamat as alamat_sju,
    a.jenis,a.jumlah,a.kategori,a.nama_pihak,date_format(a.tgl_beri,'%d/%m/%Y') as tgl_beri,
   a.posisi,a.nama_usaha,a.jenis_usaha,a.keterangan,h.logo,h.alamat,a.nik_aju,a.nik_jabat,a.kode_cust, c.nama as nama_aju,d.nama as nama_jabat, e.nama as nama_cust,c.jabatan as jab_aju, d.jabatan as jab_jabat,a.nik_tahu,a.nik_bdh,f.nama as nama_tahu, g.nama as nama_bdh, f.jabatan as jab_tahu,g.jabatan as jab_bdh
from sju_dne_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
left join karyawan c on a.nik_aju=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_jabat=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan f on a.nik_tahu=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_bdh=g.nik and a.kode_lokasi=g.kode_lokasi
left join sju_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_dn";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
    $i=1;
    $logo="image/sju.jpg";
		echo "<div align='center'>"; 
		
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$alamat=$row->alamat;
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td><table width='750' border='0' cellspacing='0' cellpadding='0' >
    <tr>
      <td width='200'><img src=$logo width='120' height='105' align='right' /></td>";
      echo $AddOnLib->judul_laporan("pengajuan biaya entertaint representatif",$this->lokasi," ");
    echo "</tr>
    </table></td>

  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>";
  // echo "<td height='30' align='center' valign='middle' class='judul_bukti'>PENGAJUAN BIAYA ENTERTAINT/ REPRESENTATIF</td>";
 
  echo"</tr>
  <tr>
  <td height='10'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0' style='border:1px solid black'>
	  <tr>
        <td width='200'>No DN</td>
        <td width='600' class='judul_bukti'>: $row->no_dn </td>
      </tr>
      <tr>
        <td>Tanggal DN</td>
        <td>: $row->tgl </td>
      </tr>";
// echo" 
//       <tr>
//         <td width='200'>Tahun Pajak</td>
//         <td width='600'>: $row->tahun_pajak </td>
//       </tr>";

echo"<tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
        <td><b>PEMBERIAN ENTERTAINMENT</b></td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
          <td colspan='2'>
            <table border='1' cellpadding='0' cellspacing='0' class='kotak'>
            <tr bgcolor='#CCCCCC'>
                <td width='100' align='center' class='header_laporan'>Tanggal</td>
                <td width='200' align='center' class='header_laporan'>Tempat</td>
                <td width='250' align='center' class='header_laporan'>Alamat</td>
                <td width='150' align='center' class='header_laporan'>Jenis</td>
                <td width='100' align='center' class='header_laporan'>Jumlah</td>
            </tr>";

            $sql2="select a.*,date_format(a.tgl_beri,'%d/%m/%Y') as tgl from sju_dne_d a
                  where a.no_dn='$row->no_dn'
                  order by a.no_urut ";
            $rs2 = $dbLib->execute($sql2);
            $jumlah=0;
            while ($row1 = $rs2->FetchNextObject($toupper=false))
                  {
                    $jumlah=$jumlah+$row1->jumlah;
      echo "<tr>
                    <td class='isi_laporan'>$row1->tgl</td>
                    <td class='isi_laporan'>$row1->tempat</td>
                    <td class='isi_laporan'>$row1->alamat</td>
                    <td class='isi_laporan'>$row1->jenis</td>
                    <td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
                  
            </tr>";		
                  }
      echo "<tr>
                  <td colspan='4' align='center' class='header_laporan'>Total</td>
                  <td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
            </tr>";
    
       echo  "
            </table>
          </td>
      </tr>

<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td><b>INFORMASI PIHAK KETIGA</b></td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td width='200'>Nama</td>
<td width='600'>: $row->nama_pihak </td>
</tr>
<tr>
<td width='200'>Posisi</td>
<td width='600'>: $row->posisi </td>
</tr>
<tr>
<td width='200'>Nama Perusahaan</td>
<td width='600'>: $row->nama_usaha </td>
</tr>
<tr>
<td width='200'>Keterangan</td>
<td width='600'>: $row->keterangan </td>
</tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
     
    </table></td>
  </tr>

  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
    <tr>
    <td>&nbsp;</td>
  </tr>
	   <tr align='center'>
        <td width='300'><b>Yang  Mengajukan </b> </td>
         <td width='200'><b>Mengetahui </b></td>
         <td width='300'><b>Otorisasi Oleh </b></td>
      </tr>
      <tr align='center'>
        <td width='300' height='80'>&nbsp;</td>
        <td width='200' height='80'>&nbsp;</td>
        <td width='300' height='80'>&nbsp;</td>
      </tr> 
	    <tr align='center'>
        <td width='300'><b>$row->nama_aju </b> </td>
        <td width='200'><b>$row->nama_tahu</b></td>
        <td width='300'><b>$row->nama_jabat</b></td>
      </tr>
      <tr align='center'>
        <td width='300' ><b>$row->jab_aju</b></td>
        <td width='200' ><b>$row->jab_tahu</b></td>
        <td width='300' ><b>$row->jab_jabat</b></td>
      </tr> 
     ";
  
    echo"
      <tr align='center' valign='bottom'>
        <td height='70' class='garis_bawah'>&nbsp;</td>
        <td>&nbsp;</td>
		<td>&nbsp;</td>
      </tr>

    </table></td>
  </tr>
 
  
</table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
