<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptRekon extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$periode=$tmp[0];
		$sql="select 1 ";
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
		$tmp=explode("/",$this->filter);
		$periode=$tmp[0];
		$sql="select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan
from it_aju_m a
$this->filter
order by a.no_aju				
";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar transfer pembayaran share profit kantin",$this->lokasi);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>No Agenda</td>
        <td width='600' class='header_laporan'>: $row->no_aju </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tgl </td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
     
    </table></td>
  </tr>
  ";
	 $sql="select a.kode_kantin,b.nama as nama_kantin
	 from kantin_load a
	 inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi
	 where a.no_bast='$row->no_aju'
	 group by a.kode_kantin,b.nama";
	 
	  $rs1 = $dbLib->execute($sql);
	  $i=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td class='header_laporan'>$row1->nama_kantin </td>
		  </tr>";
		
  echo "<tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='150' align='center' class='header_laporan'>Nama Tenant </td>
        <td width='150'  align='center' class='header_laporan'>Pemilik Rekening</td>	 
		<td width='100'  align='center' class='header_laporan'>No Rekening</td>
		<td width='150'  align='center' class='header_laporan'>Nama Bank</td>
		<td width='90'  align='center' class='header_laporan'>Pendapatan</td>
		<td width='90'  align='center' class='header_laporan'>Sharing</td>
		<td width='90'  align='center' class='header_laporan'>Uang Kebersihan</td>
		<td width='90'  align='center' class='header_laporan'>Transfer</td>
		<td width='100'  align='center' class='header_laporan'>Berita</td>
      </tr>";
// 	  $sql="select b.nama as nama_tenan,b.pemilik,b.bank,b.norek,b.namarek,a.nilai,(b.persentase/100)*a.nilai as nilai_bayar
// from kantin_nota a
// inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi
// where a.no_load='$row1->no_load'";
	  $sql="
	  select a.kode_tenan,c.nama as nama_tenan,c.pemilik,c.bank,c.norek,c.namarek,a.nota,a.sharing,isnull(b.ubersih,0) as ubersih, a.sharing-isnull(b.ubersih,0) as jum_share
			  from 
			  (
			  select b.kode_tenan,sum(b.nilai) as nota,sum(a.persen/100 * b.nilai) as sharing
			  from kantin_load a 
			  inner join kantin_nota b on a.no_load=b.no_load
			  where a.no_bast='$row->no_aju' and a.kode_kantin='$row1->kode_kantin'
			  group by b.kode_tenan
			  ) a
			  inner join ktu_tenan c on a.kode_tenan=c.kode_tenan 
			  left join 
			  (
			  select kode_tenan,ubersih
			  from kantin_ubersih
			  where no_aju='$row->no_aju'
			  ) b on a.kode_tenan=b.kode_tenan
			  where a.sharing-isnull(b.ubersih,0) <> 0";

	  $rs2 = $dbLib->execute($sql);
	  $i=1;
	  $nilai=0; $nilai_bayar=0;$sharing=0;$ubersih=0;
	  while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$nilai+=$row2->nota;
			$nilai_bayar+=$row2->jum_share;
			$sharing+=$row2->sharing;
			$ubersih+=$row2->ubersih;
		  echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row2->nama_tenan</td>
			<td class='isi_laporan'>$row2->pemilik</td>	 
			 <td class='isi_laporan'>$row2->norek</td>
			 <td class='isi_laporan'>$row2->bank</td>
			<td class='isi_laporan' align='right'>".number_format($row2->nota,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->sharing,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->ubersih,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row2->jum_share,0,",",".")."</td>
			<td class='isi_laporan'>$row->keterangan</td>
		  </tr>";
			$i=$i+1;
		}
		 echo "<tr>
			<td class='header_laporan' colspan='5'>Sub Total</td>
			<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($sharing,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($ubersih,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($nilai_bayar,0,",",".")."</td>
			<td class='header_laporan'></td>
		  </tr>";
    echo "</table></td>
  </tr>";
		}
  
    echo "</table></td>
  </tr>
</table>";

	}

	echo "</div>";
	return "";
		
	}
	
}
?>