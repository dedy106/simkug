<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_piutang_rptTagihan extends server_report_basic
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
				   f.nama as nama_area,f.jabatan as jab_area, g.jabatan as jab_tahu
			from yk_hutang_m a 
			inner join karyawan b on a.nik_buat=b.nik 
			inner join karyawan c on a.nik_app=c.nik 
			inner join karyawan g on a.nik_tahu=g.nik 
			inner join lokasi d on a.kode_lokasi=d.kode_lokasi
			inner join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='TTD1'
			inner join karyawan f on e.flag=f.nik and e.kode_lokasi=f.kode_lokasi
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
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Penerima </td>
	<td width='100' rowspan='2' align='center' class='header_laporan'>No Rekening</td>
    <td width='250' rowspan='2' align='center' class='header_laporan'>Nama Bank</td>
     <td colspan='4' align='center' class='header_laporan'>Tagihan</td>
	<td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra</td>
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
		$sql1 = "select a.kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,
				   isnull(c.nilai_bp,0) as debet_bp,isnull(c.nilai_cc,0) as debet_cc,isnull(c.pph,0) as pph, isnull(c.nilai_total,0) as debet_total
			from vendor a
			inner join (select a.kode_vendor,a.kode_lokasi
						from yk_hutang_d a
						inner join vendor e on a.kode_vendor = e.kode_vendor and a.kode_lokasi = e.kode_lokasi
					where a.kode_lokasi='$row->kode_lokasi' and a.no_hutang='$row->no_hutang' $bank $vendor	
					group by a.kode_vendor,a.kode_lokasi	
						)e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
			left join (select a.kode_vendor,a.kode_lokasi,sum(case when c.jenis <> 'PENSIUN' then a.nilai else 0 end) as nilai_bp,
					sum(case  when c.jenis = 'PENSIUN' then a.nilai else 0 end) as nilai_cc, sum(a.pph) as pph,sum(a.nilai -a.pph) as nilai_total 
				   from  yk_bill_d a 
				   inner join yk_loker b on a.loker=b.loker
				   inner join cust c on b.kode_cust=c.kode_cust 
				   inner join vendor e on a.kode_vendor = e.kode_vendor and a.kode_lokasi = e.kode_lokasi
				   where  a.kode_lokasi='$row->kode_lokasi' and a.no_hutang='$row->no_hutang' $bank $vendor	
				   group by a.kode_vendor,a.kode_lokasi
					   )c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
			where a.kode_lokasi='$row->kode_lokasi'
			order by a.kode_vendor ";
		
			echo $sql1;
			
		$rs1 = $dbLib->execute($sql1);
		$debet_bp=0;$debet_cc=0;$debet_total=0; $i=1;
		$pph = 0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$debet_bp=$debet_bp+$row1->debet_bp;
			$debet_cc=$debet_cc+$row1->debet_cc;
			$pph=$pph+$row1->pph;
			$debet_total=$debet_total+$row1->debet_total;
  echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->nama_rek</td>
    <td class='isi_laporan'>$row1->no_rek</td>
    <td class='isi_laporan'>$row1->bank &nbsp; $row1->cabang</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->debet_bp,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->debet_cc,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->pph,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->debet_total,0,',','.')."</td>
	<td class='isi_laporan'>$row1->nama</td>
    </tr>";
			$i=$i+1;
		}
	echo "<tr>
    <td colspan='4' align='right' class='isi_laporan'>Total</td>
   <td width='80' align='right' class='isi_laporan'>".number_format($debet_bp,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_cc,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($pph,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_total,0,',','.')."</td>
	<td width='150' align='center' class='isi_laporan'>&nbsp;</td>
     </tr>
    </table></td>
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
