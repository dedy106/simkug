<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnNol($nilai)
{
	$tmp="-";
	if ($nilai>0)
	{
		$tmp=number_format($nilai,0,",",".");
	}
	return $tmp;
}
function fnPersen($nilai)
{
	$tmp="-";
	if ($nilai>0)
	{
		$tmp=number_format($nilai,3,",",".")."%";
	}
	return $tmp;
}
class server_report_saku3_inves2_rptDepJustifikasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		
		
		$sql="select a.no_plan,a.kode_lokasi,a.keterangan,a.nik_usul, a.jab_usul, a.nik_tahu1, a.jab_tahu1, a.nik_tahu2, a.jab_tahu2,
	   b.nama as nama_usul,c.nama as nama_tahu1,d.nama as nama_tahu2,a.tanggal
from inv_depoplan_m a
inner join karyawan b on a.nik_usul=b.nik
inner join karyawan c on a.nik_tahu1=c.nik
inner join karyawan d on a.nik_tahu2=d.nik
$this->filter order by a.no_plan";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
	
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			
		  echo "<table width='1500' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'>JUSTIFIKASI PENEMPATAN / PENCAIRAN DEPOSITO JATUH TEMPO </td>
  </tr>
  <tr>
    <td align='center'>$row->no_plan</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='1400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td rowspan='3' align='center' class='header_laporan'>No</td>
        <td rowspan='3' align='center' class='header_laporan'>Jenis Dana </td>
        <td rowspan='3' align='center' class='header_laporan'>Nama bank </td>
        <td colspan='2' rowspan='2' align='center' class='header_laporan'>Deposito Jatuh Tempo </td>
        <td rowspan='3' align='center' class='header_laporan'>Rate tawaran Bank </td>
        <td rowspan='3' align='center' class='header_laporan'>Maks tingkat rate LPS 1 bln </td>
        <td colspan='8' align='center' class='header_laporan'>Usulan</td>
        <td rowspan='3' align='center' class='header_laporan'>Keterangan</td>
      </tr>
      <tr>
        <td rowspan='2' align='center' class='header_laporan'>Dicairkan (Rp) </td>
        <td rowspan='2' align='center' class='header_laporan'>Tambahkan / Ditempatkan kembali </td>
        <td colspan='6' align='center' class='header_laporan'>Dana yang didepositosikan di bank ini </td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>Jumlah (Rp) </td>
        <td align='center' class='header_laporan'>Tanggal</td>
        <td align='center' class='header_laporan'>Jumlah (Rp) </td>
        <td align='center' class='header_laporan'>Mulai Tgl </td>
        <td align='center' class='header_laporan'>S.d Tgl </td>
        <td align='center' class='header_laporan'>Durasi (Bulan) </td>
        <td align='center' class='header_laporan'>Durasi (Hari) </td>
        <td align='center' class='header_laporan'>Rate</td>
      </tr>
      <tr>
        <td width='30' align='center' class='header_laporan'>1</td>
        <td width='80' align='center' class='header_laporan'>2</td>
        <td width='200' align='center' class='header_laporan'>3</td>
        <td width='90' align='center' class='header_laporan'>4</td>
        <td width='60' align='center' class='header_laporan'>5</td>
        <td width='60' align='center' class='header_laporan'>6</td>
        <td width='60' align='center' class='header_laporan'>7</td>
        <td width='90' align='center' class='header_laporan'>8</td>
        <td width='90' align='center' class='header_laporan'>9</td>
        <td width='90' align='center' class='header_laporan'>10</td>
        <td width='60' align='center' class='header_laporan'>11</td>
        <td width='60' align='center' class='header_laporan'>12</td>
        <td width='60' align='center' class='header_laporan'>13</td>
        <td width='60' align='center' class='header_laporan'>14</td>
        <td width='60' align='center' class='header_laporan'>15</td>
        <td width='100' align='center' class='header_laporan'>16</td>
      </tr>";
		$sql="select a.status_input, a.status_dana, a.kode_bank, a.kode_bankklp, a.nilai_jt, a.tanggal, 
	   a.p_doc, a.p_depo, a.p_lps, a.nilai_cair, a.nilai_panjang, a.nilai_usul, a.dur_bulan, a.dur_hari, a.rate, a.jenis, a.no_depo, a.modul, a.no_ref,
       b.nama as nama_bank,case when a.status_dana='DAKES' then 'Jamkespen' else a.status_dana end as nama_status,
	   date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai
from inv_depoplan_d a
inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp
where a.no_plan='$row->no_plan' 
order by a.kode_bankklp
";
		$rs1=$dbLib->execute($sql);
		$i=1;
		$nilai_jt=0; $nilai_cair=0; $nilai_usul=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai_jt+=$row1->nilai_jt;
			$nilai_cair+=$row1->nilai_cair;
			$nilai_usul+=$row1->nilai_usul;
		  echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan' >$row1->nama_status</td>
			<td class='isi_laporan'>$row1->nama_bank</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_jt)."</td>
			<td class='isi_laporan'>$row1->tgl</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->p_doc)."</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->p_lps)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_cair,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_panjang)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_usul)."</td>
			<td class='isi_laporan'>$row1->tgl_mulai</td>
			<td class='isi_laporan'>$row1->tgl_selesai</td>
			<td class='isi_laporan'  align='center'>$row1->dur_bulan</td>
			<td class='isi_laporan'  align='center'>$row1->dur_hari</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->rate)."</td>
			<td class='isi_laporan'>&nbsp;</td>
		  </tr>";
			$i+=1;
		}
      echo "<tr>
        <td colspan='3' align='center'>Jumlah</td>
        <td class='header_laporan' align='right'>".fnNol($nilai_jt)."</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td class='header_laporan' align='right'>".fnNol($nilai_cair)."</td>
        <td>&nbsp;</td>
         <td class='header_laporan' align='right'>".fnNol($nilai_usul)."</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td valign='top'><table width='900' border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td width='60' valign='top'>Catatan : </td>
    <td width='840'><table width='840' border='0' cellspacing='2' cellpadding='1'>";
	$sql="select keterangan from inv_depoplan_catat where no_plan='$row->no_plan' order by nu";
	$rs1=$dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td width='20' class='isi_laporan' align='center' valign='top'>$i.</td>
        <td width='820' class='isi_laporan' valign='top'>$row1->keterangan</td>
      </tr>";
		$i+=1;
    }
    echo "</table></td>
  </tr>
</table></td>
  </tr>
  <tr>
    <td align='center'><table width='1000' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
      </tr>
      <tr>
        <td width='262' align='center'>&nbsp;</td>
        <td width='342' align='center'>Menyetujui</td>
        <td width='382' align='center'>Mengetahui</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>$row->nama_tahu2</td>
        <td align='center'>$row->nama_tahu1</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>$row->jab_tahu2</td>
        <td align='center'>$row->jab_tahu1</td>
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
