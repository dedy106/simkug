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
class server_report_saku3_inves2_rptDepRate extends server_report_basic
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
			
		  echo "<table width='1200' border='0' cellspacing='2' cellpadding='1'>
 <tr>
    <td align='center' class='header_laporan'>PENAWARAN RATE DEPOSITO DAN DOC</td>
  </tr>
  <tr>
    <td align='center' class='header_laporan'>$row->no_plan</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td rowspan='2' align='center' class='header_laporan'>No</td>
    <td rowspan='2' align='center' class='header_laporan'>Nama Bank </td>
    <td rowspan='2' align='center' class='header_laporan'>Rate DOC </td>
    <td rowspan='2' align='center' class='header_laporan''>Rate Berjangka </td>
 
    <td rowspan='2' class='header_laporan' align='center'>Maks Penempatan Deposito </td>
    <td colspan='3' align='center' class='header_laporan'>Deposito Eksisting </td>
    <td rowspan='2' align='center' class='header_laporan'>Sisa Plafon </td>
    <td rowspan='2' align='center' class='header_laporan''>Ket</td>
  </tr>
  <tr>
    
   
    <td align='center' class='header_laporan'>DOC</td>
    <td align='center' class='header_laporan'>Berjangka</td>
    <td align='center' class='header_laporan'>Jumlah</td>
  </tr>
  <tr>
    <td width='30' align='center' class='header_laporan'>1</td>
    <td width='150' align='center' class='header_laporan'>2</td>
    <td width='60' align='center' class='header_laporan'>3</td>
    <td width='60' align='center' class='header_laporan'>4</td>
   
 
    <td width='100' align='center' class='header_laporan'>5</td>
    <td width='100' align='center' class='header_laporan'>6</td>
    <td width='100' align='center' class='header_laporan'>7</td>
    <td width='100' align='center' class='header_laporan''>8</td>
    <td width='100' align='center' class='header_laporan'>9</td>
    <td width='100' align='center' class='header_laporan'>&nbsp;</td>
  </tr>";
		$sql="select a.no_plan, a.kode_lokasi, a.kode_bankklp, a.p_doc, a.p_depo, a.maks, a.nilai_doc, a.nilai_depo,a.nilai_doc+a.nilai_depo as total,
	   b.nama as nama_bank,case when a.maks<>999999999999 then a.maks-(a.nilai_doc+a.nilai_depo) else a.maks end as sisa
from inv_depoplan_rekap a
inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp 
inner join inv_jenis d on b.jenis=d.jenis
where a.no_plan='$row->no_plan' 
order by d.nu
";
		
		$rs1=$dbLib->execute($sql);
		$i=1;
		$nilai_doc=0; $nilai_depo=0; $total=0; $sisa=0; $jum_maks=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai_doc+=$row1->nilai_doc;
			$nilai_depo+=$row1->nilai_depo;
			$total+=$row1->total;
			
			$maks=number_format($row1->maks,0,",",".");
			if ($row1->maks==999999999999)
			{
				$maks='Tidak Terbatas';
			}
			else
			{
				$jum_maks+=$row1->maks;
			}
			$sisa2=number_format($row1->sisa,0,",",".");
			if ($row1->maks==999999999999)
			{
				$sisa2='Tidak Terbatas';
			}
			else
			{
				$sisa+=$row1->sisa;
			}
		  echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row1->nama_bank</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->p_doc)."</td>
			<td class='isi_laporan' align='center'>".fnPersen($row1->p_depo)."</td>
			
			<td class='isi_laporan' align='right'>$maks</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_doc)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->nilai_depo)."</td>
			<td class='isi_laporan' align='right'>".fnNol($row1->total)."</td>
			<td class='isi_laporan' align='right'>$sisa2</td>
			<td class='isi_laporan'>&nbsp;</td>
		  </tr>";
			$i+=1;
		}
      echo "<tr>
			<td class='isi_laporan' align='center' colspan='2'>Total</td>
			<td class='isi_laporan' align='right'>&nbsp;</td>
			
			<td class='isi_laporan' align='right'>&nbsp;</td>
			<td class='isi_laporan' align='right'>".fnNol($jum_maks)."</td>
			<td class='isi_laporan' align='right'>".fnNol($nilai_doc)."</td>
			<td class='isi_laporan' align='right'>".fnNol($nilai_depo)."</td>
			<td class='isi_laporan' align='right'>".fnNol($total)."</td>
			<td class='isi_laporan' align='right'>".fnNol($sisa)."</td>
			<td class='isi_laporan'>&nbsp;</td>
		  </tr>
    </table></td>
  </tr>
  <tr>
    <td height='70' valign='top'>Cataan : </td>
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
        <td width='342' align='center'>Mengetahui</td>
        <td width='382' align='center'>Mengusulkan</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>$row->nama_tahu1</td>
        <td align='center'>$row->nama_usul</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>$row->jab_tahu1</td>
        <td align='center'>$row->jab_usul</td>
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
