<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptPdFormTu extends server_report_basic
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
		$lokasi=$tmp[0];
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
	$sql="select a.no_spj,a.kode_lokasi,a.nik_spj,a.kode_pp,a.nik_buat,b.nama as nama_pp,a.keterangan,
convert(varchar,a.tanggal,103) as tgl,c.jabatan,c.nama as nama_spj,d.nama as nama_buat,a.tanggal,
ISNULL(e.total,0) as total
from tu_pdaju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
left join (select a.no_spj,a.kode_lokasi,sum(a.total) as total 
		   from tu_pdaju_d a
		   where a.kode_lokasi='$lokasi'
		   group by a.no_spj,a.kode_lokasi
		   )e on a.no_spj=e.no_spj and a.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_spj
";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='judul_bukti'>DAFTAR ONGKOS PERJALANAN DINAS (DOP)</td>
  </tr>
  <tr>
    <td align='center'>Nomor DOP : </td>
  </tr>
  <tr>
    <td align='center'>Nomor Sistem : $row->no_spj </td>
  </tr>
  <tr>
    <td align='center'>Tanggal : $row->tgl </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Harap dibayarkan uang sebesar : Rp. ".number_format($row->total,0,",",".")."</td>
  </tr>
  <tr>
    <td>".$AddOnLib->terbilang($row->total)."</td>
  </tr>
  <tr>
    <td>Kepada : </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='25'>&nbsp;</td>
        <td width='23'>1</td>
        <td width='167'>Nama / NIP </td>
        <td width='567'>: $row->nama_spj / $row->nik_spj </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>2</td>
        <td>Jabatan / Tingkat </td>
        <td>: $row->jabatan </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>3</td>
        <td colspan='2'>Untuk biaya Perjalanan Dinas dengan Rincian sebagai berikut </td>
        </tr>

    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='27'>&nbsp;</td>
        <td width='23'>A</td>
        <td width='201'>Uang Harian </td>
        <td width='29'>&nbsp;</td>
        <td width='26'>&nbsp;</td>
        <td width='101'>&nbsp;</td>
        <td width='363'>&nbsp;</td>
      </tr>";
	   $sql="select a.kode_param,a.kode_lokasi,b.nama,a.jumlah,a.nilai,a.total
from tu_pdaju_d a
inner join tu_pd_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where  a.no_spj='$row->no_spj' and a.kode_lokasi='$row->kode_lokasi' and b.jenis='1'
order by a.kode_param ";
      $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>$j. $row1->nama </td>
        <td align='center'>: $row1->jumlah </td>
        <td>X </td>
        <td>".number_format($row1->nilai,0,",",".")."</td>
        <td>".number_format($row1->total,0,",",".")."</td>
      </tr>";
			$j=$j+1;
		}
      echo "<tr>
        <td>&nbsp;</td>
        <td width='23'>B</td>
        <td width='201'>Transportasi</td>
        <td width='29'>&nbsp;</td>
        <td width='26'>&nbsp;</td>
        <td width='101'>&nbsp;</td>
        <td width='363'>&nbsp;</td>
      </tr>";
	    $sql="select a.kode_param,a.kode_lokasi,b.nama,a.jumlah,a.nilai,a.total
from tu_pdaju_d a
inner join tu_pd_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where a.no_spj='$row->no_spj' and a.kode_lokasi='$row->kode_lokasi' and b.jenis='2'
order by a.kode_param ";
      $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>$j. $row1->nama </td>
        <td align='center'>: $row1->jumlah </td>
        <td>X </td>
        <td>".number_format($row1->nilai,0,",",".")."</td>
        <td>".number_format($row1->total,0,",",".")."</td>
      </tr>";
			$j=$j+1;
		}
    
      echo "<tr>
        <td>&nbsp;</td>
        <td width='23'>A</td>
        <td width='201'>Lain-Lain</td>
        <td width='29'>&nbsp;</td>
        <td width='26'>&nbsp;</td>
        <td width='101'>&nbsp;</td>
        <td width='363'>&nbsp;</td>
      </tr>";
     $sql="select a.kode_param,a.kode_lokasi,b.nama,a.jumlah,a.nilai,a.total
from tu_pdaju_d a
inner join tu_pd_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where  a.no_spj='$row->no_spj' and a.kode_lokasi='$row->kode_lokasi' and b.jenis='3'
order by a.kode_param ";
      $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>$j. $row1->nama </td>
        <td align='center'>: $row1->jumlah </td>
        <td>X </td>
        <td>".number_format($row1->nilai,0,",",".")."</td>
        <td>".number_format($row1->total,0,",",".")."</td>
      </tr>";
			$j=$j+1;
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>".$AddOnLib->terbilang($row->total)."</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Bandung , ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='217' align='center'>Pembuat Rincian </td>
        <td width='248' align='center'>Fiatur</td>
        <td width='321'>Telah terima uang sebesar : </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Rp. ".number_format($row->total,0,",",".")."</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>$row->nama_buat</td>
        <td align='center'>&nbsp;</td>
        <td>$row->nama_spj</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>
<DIV style='page-break-after:always'></DIV>";
		
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
