<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_optik_rptNota extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select a.no_bukti,a.kode_lokasi,a.no_dokumen,a.pasien,a.umur,a.nik,b.nama as peserta,b.status,a.loker,a.band,
    a.no_hp,a.lensa,a.frame,a.nilai_lensa,a.nilai_frame,a.nilai_lensa+a.nilai_frame as jml,a.umuka,c.nama as pp, 
    a.bantu_len,a.bantu_fr,a.by_sendiri
from optik_pesan_m a
inner join optik_nik b on a.kode_lokasi=b.kode_lokasi and a.nik=b.nik
inner join pp c on a.kode_lokasi=b.kode_lokasi and a.kode_pp=c.kode_pp
$this->filter and a.jenis='MITRA' ";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/optik.png";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
      $sisa=$row->jml-$row->umuka;
		
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='181' rowspan='2' class='istyle16'><img src='$logo' width='150' height='100'></td>
        <td width='609' align='center' class='istyle17' valign='bottom' ><u>NOTA PESANAN</u></td>
      </tr>
      <tr>
        <td align='center' class='istyle16' valign='top'>NO. NOTA : $row->no_dokumen</td>
      </tr>
    </table></td>
  </tr>
  <tr><td height='30'>&nbsp;</td></tr>
  <tr>
    <td><table width='900' border='0' cellspacing='2' cellpadding='1'>
    <tr>
    <td width='158' class='istyle16'>NO. RESEP</td>
    <td width='244' class='istyle16'>: $row->no_bukti</td>
  </tr>
    <tr>
    <td width='158'>Nama Pasien</td>
    <td width='244'>: $row->pasien</td>
    <td width='155'>Usia</td>
    <td width='225'>: $row->umur Tahun</td>
  </tr>
  <tr>
    <td>Nama Peserta</td>
    <td>: $row->peserta</td>
    <td>NIK</td>
    <td>: $row->nik</td>
  </tr>
  <tr>
    <td>Unit Kerja </td>
    <td>: $row->status</td>
    <td>Loker</td>
    <td>: $row->loker</td>
    <td>Gol : $row->band</td>
  </tr>
  <tr>
    <td>Alamat</td>
    <td>: $row->alamat</td>
    </tr>
  <tr>
    <td>Telpon Kantor</td>
    <td>: &nbsp;</td>
    <td>Rumah</td>
    <td>: &nbsp;</td>
    <td>HP : $row->no_hp</td>
  </tr>
    </table></td>
  </tr>
  <tr>
    <td><b>Ukuran Lensa : Dokter Mata / RO</b></td>
  </tr>
    
  <tr>
    <td><table width='900' border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='istyle15' height='25'><div align='center'>&nbsp;</div></td>
				<td width='90' class='istyle15'><div align='center'>SPH(+/-)</div></td>
				<td width='90' class='istyle15'><div align='center'>CYL(+/-) </div></td>
				<td width='90' class='istyle15'><div align='center'>AXIS (0)</div></td>
				<td width='90' class='istyle15'><div align='center'>ADD (+)</div></td>
				<td width='90' class='istyle15'><div align='center'>PD</div></td>
			  </tr>";
	  $sql1="select a.jenis,a.sph,a.cyl,a.axis,a.rabun,a.pd
    from optik_pesan_d a
			where a.no_bukti='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi'
			order by a.jenis ";
		//error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
				<td class='isi_laporan'>$row1->jenis</td>
				<td class='isi_laporan'>$row1->sph</td>
				<td class='isi_laporan'>$row1->cyl</td>
				<td class='isi_laporan' >$row1->axis</td>
				<td class='isi_laporan'>$row1->rabun</td>
				<td class='isi_laporan'>$row1->pd</td>
			  </tr>";
				$i=$i+1;
		}
	  echo "
	</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='left'><table width='900' border='0' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='50' ><b>&nbsp;LENSA</b></td>
        <td width='160' class='istyle15'>:&nbsp; $row->lensa </td>
        <td width='160' class='istyle15'>&nbsp;</td>
        <td width='160' class='istyle15'>&nbsp;</td>
        <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($row->nilai_lensa,2,",",".")." </td>
      </tr>
      <tr>
      <td width='50' ><b>&nbsp;FRAME</b></td>
      <td width='160' class='istyle15' >:&nbsp; $row->frame</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($row->nilai_frame,2,",",".")." </td>
      </tr>
      <tr>
      <td width='160' class='istyle15'  >&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15' ><b>&nbsp; Jumlah</b></td>
      <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($row->jml,2,",",".")." </td>
      </tr>
      <tr>
      <td width='160' class='istyle15'  >&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15' ><b>&nbsp; Uang Muka</b></td>
      <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($row->umuka,2,",",".")." </td>
      </tr>
      <tr>
      <td width='160' class='istyle15'  >&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15' ><b>&nbsp; Sisa</b></td>
      <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($sisa,2,",",".")." </td>
      </tr>
    </table></td>
  </tr>
  <tr>
 <tr><td align='left'><table>
 <tr>
 <td width='172'><b>TPKK/KLINIK</b></td>
 <td width='200'>: $row->pp</td>
</tr>
<tr>
 <td width='172'><b>BANTUAN PERS</b></td>
 <td width='200'>: - Kacamata Lengkap : Rp. ".number_format($row->bantu_fr,2,",",".")."</td>
</tr>
<tr>
 <td width='172'>&nbsp;</td>
 <td width='200'>&nbsp; - Lensa Saja : Rp. ".number_format($row->bantu_len,2,",",".")."</td>
</tr>
<tr>
 <td width='172'><b>BIAYA SENDIRI</b></td>
 <td width='200'>: Rp. ".number_format($row->by_sendiri,2,",",".")."</td>
</tr>
<tr>
<td align='center'>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td align='center'>............ , ..................</td>
</tr>
   <tr>
     <td align='center'>Pelanggan, </td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td align='center'>Petugas Optic,</td>
   </tr>
   <tr>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
   </tr>
   <tr>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
   </tr>
   
   <tr>
     <td align='center' valign='top'>....................</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td>&nbsp;</td>
     <td align='center'>.....................</td>
   </tr>
   </td>
</table>
</tr>
</table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
