<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_piutang_rptTagihan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$sql = "select 1 " . $this->filter;
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$bank=$tmp[3];
		$vendor = $tmp[4];
		$no_bill=$tmp[5];
		$jenis=$tmp[6];
		
		$nama_file="tagihan_".$no_bill.".xls";
		$sql = "select a.no_hutang,a.keterangan,d.kota,a.tanggal,d.nama as lokasi,a.kode_lokasi,
				   b.nama as nama_buat,c.nama as nama_app, g.nama as nama_tahu, b.jabatan as jab_buat,c.jabatan as jab_app,
				   c.nama as nama_area,c.jabatan as jab_area, g.jabatan as jab_tahu
			from yk_hutang_m a 
			inner join karyawan b on a.nik_buat=b.nik 
			inner join karyawan c on a.nik_app=c.nik 
			left join karyawan g on a.nik_tahu=g.nik 
			inner join lokasi d on a.kode_lokasi=d.kode_lokasi
			". $this->filter;

		$rs = $dbLib->execute($sql);
	
		$AddOnLib=new server_util_AddOnLib();	
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("TAGIHAN MITRA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td align='center' class='header_laporan'>$row->lokasi</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>DAFTAR PERMINTAAN TRANSFER KEPADA MITRA KERJA</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>PERIODE PEMBAYARAN : $row->keterangan </td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>NO : $row->no_hutang</td>
      </tr>
    </table></td>
  </tr>
 
   <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='240' rowspan='2' align='center' class='header_laporan'>Nama Penerima </td>
	<td width='140' rowspan='2' align='center' class='header_laporan'>No Rekening</td>
    <td width='130' rowspan='2' align='center' class='header_laporan'>Nama Bank</td>
     <td colspan='4' align='center' class='header_laporan'>Tagihan</td>
	<td width='240' rowspan='2' align='center' class='header_laporan'>Nama Mitra</td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='80' align='center' class='header_laporan'>Pegawai</td>
    <td width='80' align='center' class='header_laporan'>Pensiun</td>
    <td width='80' align='center' class='header_laporan'>Nilai PPH</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td class='isi_laporan'>1</td>
    <td class='isi_laporan'>2</td>
    <td class='isi_laporan'>3</td>
    <td class='isi_laporan'>4</td>
    <td class='isi_laporan'>5</td>
    <td class='isi_laporan'>6</td>
    <td class='isi_laporan'>7</td>
    <td class='isi_laporan'>8=5+6-7</td>
    <td class='isi_laporan'>9</td>
  </tr>";
		

		
		$sql1="select a.nama_rek,a.no_rek,a.bank, a.nilai_bp+a.pajak_bp as nilai_bp,nilai_cc+a.pajak as nilai_cc,a.pajak+a.pajak_bp as pajak,a.nilai_bp+a.nilai_cc as total,b.nama as nama_vendor
		from yk_hutang_d a 
		inner join vendor b on a.kode_vendor=b.kode_vendor 
		where a.no_hutang='$row->no_hutang' 
		order by a.bank";
		$rs1 = $dbLib->execute($sql1);
		$nilai_bp=0;$nilai_cc=0;$total=0; $i=1;
		$pajak = 0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$nilai_bp+=$row1->nilai_bp;
			$nilai_cc+=$row1->nilai_cc;
			$pajak+=$row1->pajak;
			$total+=$row1->total;
  echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->nama_rek</td>
    <td class='isi_laporan'>$row1->no_rek</td>
    <td class='isi_laporan'>$row1->bank &nbsp; $row1->cabang</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->nilai_bp,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->nilai_cc,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->pajak,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->total,0,',','.')."</td>
	<td class='isi_laporan'>$row1->nama_vendor</td>
    </tr>";
			$i=$i+1;
		}
	echo "<tr>
    <td colspan='4' align='right' class='header_laporan'>Total</td>
   <td width='80' align='right' class='header_laporan'>".number_format($nilai_bp,0,',','.')."</td>
    <td width='80' align='right' class='header_laporan'>".number_format($nilai_cc,0,',','.')."</td>
    <td width='80' align='right' class='header_laporan'>".number_format($pajak,0,',','.')."</td>
    <td width='80' align='right' class='header_laporan'>".number_format($total,0,',','.')."</td>
	<td width='150' align='center' class='header_laporan'>&nbsp;</td>
     </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan'>REKAP :</td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	
<tr bgcolor='#CCCCCC'> 
	<td width='30' align='center' class='header_laporan'>No</td>
	<td width='150' align='center' class='header_laporan'>Bank Transfer </td>
  <td width='100' align='center' class='header_laporan'>Pegawai</td>
  <td width='100' align='center' class='header_laporan'>Pensiun</td>
  <td width='100' align='center' class='header_laporan'>Nilai PPH</td>
  <td width='100' align='center' class='header_laporan'>Total</td>
</tr>
";
	  

	  
	  $sql1="select a.bank_trans, sum(a.nilai_bp+a.pajak_bp) as nilai_bp,
			sum(nilai_cc+a.pajak) as nilai_cc,sum(a.pajak+a.pajak_bp) as pajak,
			sum(a.nilai_bp+a.nilai_cc) as total
		from yk_hutang_d a 
		inner join vendor b on a.kode_vendor=b.kode_vendor 
		where a.no_hutang='$row->no_hutang' 
		group by a.bank_trans";
	  $rs1 = $dbLib->execute($sql1);
	  $nilai_bp=0;$nilai_cc=0;$total=0; $i=1;
	  $pajak = 0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {	
		  $nilai_bp+=$row1->nilai_bp;
		  $nilai_cc+=$row1->nilai_cc;
		  $pajak+=$row1->pajak;
		  $total+=$row1->total;
echo "<tr>
  <td class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row1->bank_trans</td>
  <td align='right' class='isi_laporan'>".number_format($row1->nilai_bp,0,',','.')."</td>
  <td align='right' class='isi_laporan'>".number_format($row1->nilai_cc,0,',','.')."</td>
  <td align='right' class='isi_laporan'>".number_format($row1->pajak,0,',','.')."</td>
  <td align='right' class='isi_laporan'>".number_format($row1->total,0,',','.')."</td>
  </tr>";
		  $i=$i+1;
	  }
  echo "<tr>
  <td colspan='2' align='right' class='header_laporan'>Total</td>
 <td align='right' class='header_laporan'>".number_format($nilai_bp,0,',','.')."</td>
  <td align='right' class='header_laporan'>".number_format($nilai_cc,0,',','.')."</td>
  <td align='right' class='header_laporan'>".number_format($pajak,0,',','.')."</td>
  <td align='right' class='header_laporan'>".number_format($total,0,',','.')."</td>
   </tr>
  </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table border='0' cellpadding='1' cellspacing='2'>
      <tr align='right'>
        <td colspan='3'>&nbsp;</td>
      </tr>
      <tr align='right'>
        <td colspan='3'>$row->kota ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr align='center'>
        <td width='200'>Menyetujui</td>
        <td width='200'>Mengetahui</td>
        <td width='200'>Yang Membuat </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>$row->nama_app</td>
        <td>$row->nama_tahu</td>
        <td>$row->nama_buat</td>
      </tr>
      <tr align='center'>
        <td>$row->jab_app</td>
        <td>$row->jab_tahu</td>
        <td>$row->jab_buat</td>
      </tr>
    </table></td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
