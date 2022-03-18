<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");

class server_report_budget_rptBa extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$sql="select a.no_ba,a.tahun,a.tempat,a.kota,a.n1,a.n2,a.n3,a.n4,a.n5,h.nama as lokasi,
        datename(weekday,a.tgl_ba) as hari_ba,datepart(day,a.tgl_ba) as tgl_ba,datepart(month,a.tgl_ba) as bln_ba,datepart(year,a.tgl_ba) as tahun_ba,
		datepart(day,a.tgl_mulai) as tgl_mulai,datepart(month,a.tgl_mulai) as bln_mulai,datepart(year,a.tgl_mulai) as tahun_mulai,
		datepart(day,a.tgl_selesai) as tgl_selesai,datepart(month,a.tgl_selesai) as bln_selesai,datepart(year,a.tgl_selesai) as tahun_selesai,
       a.nik1,a.nik2,a.nik3,a.nik4,a.nik5,a.nik6,
       b.nama as nama1,c.nama as nama2,d.nama as nama3,e.nama as nama4,f.nama as nama5,g.nama as nama6
from agg_ba a
inner join lokasi h on a.kode_lokasi=h.kode_lokasi
left join karyawan b on a.nik1=b.nik 
left join karyawan c on a.nik2=c.nik 
left join karyawan d on a.nik3=d.nik 
left join karyawan e on a.nik4=e.nik 
left join karyawan f on a.nik5=f.nik 
left join karyawan g on a.nik6=g.nik  $this->filter";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tahun=$row->tahun;  
			$n1=number_format($row->n1,0,",",".");
			$n2=number_format($row->n2,0,",",".");
			$n3=number_format($row->n3,0,",",".");
			$n4=number_format($row->n4,0,",",".");
			$n5=number_format($row->n5,0,",",".");
			$hari_ba=$AddOnLib->ubahNamaHari($row->hari_ba);
			$bln_ba=$AddOnLib->ubah_bulan($row->bln_ba);
			$bln_mulai=$AddOnLib->ubah_bulan($row->bln_mulai);
			$bln_selesai=$AddOnLib->ubah_bulan($row->bln_selesai);
			$tn1=$AddOnLib->terbilang2($row->n1);
			$tn2=$AddOnLib->terbilang2($row->n2);
			$tn3=$AddOnLib->terbilang2($row->n3);
			$tn4=$AddOnLib->terbilang2($row->n4);
			$tn5=$AddOnLib->terbilang2($row->n5);
			$nama1=ucwords(strtolower($row->nama1));
			$nama2=ucwords(strtolower($row->nama2));
			$nama3=ucwords(strtolower($row->nama3));
			$nama4=ucwords(strtolower($row->nama4));
			$nama5=ucwords(strtolower($row->nama5));
			echo "<div align='center'><br><br><table width='700' border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center' ><b>BERITA ACARA</b></td>
  </tr>
  <tr>
    <td align='center' ><b> KESEPAKATAN HASIL KLARIFIKASI DAN NEGOSIASI USULAN RKA $tahun </b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='justify'>Pada hari ini $hari_ba tanggal $row->tgl_ba bulan $bln_ba tahun $row->tahun_ba , telah disepakati antara Yakes Pusat dengan Yakes $row->lokasi , atas usulan RKA 2011.<br>
    Setelah dilakukan klarifikasi dan negosiasi pada tanggal $row->tgl_mulai $bln_mulai $row->tahun_mulai s/d $row->tgl_selesai $bln_selesai $row->tahun_selesai di $row->kota dengan nilai sebagai berikut :</p></td>
  </tr>
 
  <tr>
    <td style='padding:5px;'><table width='680' border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
      <tr align='center'>
        <td><strong>No</strong></td>
        <td><strong>Keterangan</strong></td>
        <td><strong>Nilai</strong></td>
        <td><strong>Terbilang</strong></td>
        </tr>
      <tr>
        <td width='36' align='center'>1</td>
        <td width='155'>Aktiva Tetap</td>
        <td width='128' align='right'>$n1</td>
        <td width='351' align='left'>$tn1</td>
        </tr>
      <tr>
        <td align='center'>2</td>
        <td>Pendapatan</td>
        <td align='right'>$n2</td>
        <td align='left'>$tn2</td>
        </tr>
      <tr>
        <td align='center'>3</td>
        <td>Beban</td>
        <td align='right'>$n3</td>
        <td align='left'>$tn3</td>
        </tr>
      <tr>
        <td align='center'>4</td>
        <td>Biaya Pengobatan</td>
        <td align='right'>$n4</td>
        <td align='left'>$tn4</td>
        </tr>
      <tr>
        <td align='center'>5</td>
        <td>Claim Cost</td>
        <td align='right'>$n5</td>
        <td align='left'>$tn5</td>
        </tr>
    </table></td>
  </tr>
 
  <tr>
    <td>Demikian Berita Acara ini disepakati untuk dapat dipergunakan sebagaimana mestinya.</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='700' border='0'>
      <tr>
        <td width='350' align='right'></td>
        <td width='350' align='right'>$row->kota, $row->tgl_ba $bln_ba $row->tahun_ba</td>
      </tr>
    </table></td>
  </tr>
   <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='716' border='0' cellpadding='1' cellspacing='1'>
      <tr align='center'>
        
        
        <td width='115'> KABID KUG </td>
        <td width='115'> Manager SDM </td>
        <td width='115'> KABID YANKESTA </td>
        <td width='130'> MANAR </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
       
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
       
      </tr>
	  <tr align='center'>
        <td>$nama3</td>
        <td>$nama4</td>
        <td>$nama5</td>
        <td>$nama1</td>
      </tr>
      <tr align='center'>
       
        <td>$row->nik3</td>
        <td>$row->nik4</td>
        <td>$row->nik5</td>
        <td>$row->nik1</td>
        
      </tr>
      
    </table></td>
  </tr>
</table>
";
  			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
