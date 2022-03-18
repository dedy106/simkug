<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_optik_rptNotaUm extends server_report_basic
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
		$sql="select a.no_bukti,a.jenis,a.kode_lokasi,a.no_dokumen,a.pasien,a.umur,a.loker,a.band, a.no_hp,a.lensa,a.frame,
    a.nilai_lensa,a.nilai_frame,a.nilai_lensa+a.nilai_frame as jml,a.umuka,c.nama as pp, a.bantu_len,a.bantu_fr,a.by_sendiri,d.alamat as alamat2,a.alamat
     from optik_pesan_m a
    left join pp c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
     left join lokasi d on a.kode_lokasi=d.kode_lokasi
$this->filter and a.jenis='UMUM' ";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
      $sisa=$row->jml-$row->umuka;
      $logo="image/optik.png";
			$alamat2=$row->alamat2;

		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    <tr>
    <td align='center'><img src='$logo' width='150' height='100'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>$alamat2</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
      <tr>
      <td width='609' align='center' class='istyle17' valign='bottom' ><u>NOTA PESANAN</u></td>
      </tr>
      <tr>
        <td align='center' class='istyle16' valign='top'>NO. NOTA : $row->no_dokumen</td>
      </tr>
    </table></td>
  </tr>
  <tr><td height='30'>&nbsp;</td></tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
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
    <td>Alamat</td>
    <td>: $row->alamat</td>
    </tr>
  <tr>
    <td>HP : </td>
    <td>: $row->no_hp</td>
  </tr>
    </table></td>
  </tr>
  <tr>
    <td><b>Ukuran Lensa : Dokter Mata / RO</b></td>
  </tr>
    
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
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
    <td align='left'><table width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
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
  <br>
  <tr>
 <tr><td align='center'><table>
 <tr>
<td align='center'>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
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
