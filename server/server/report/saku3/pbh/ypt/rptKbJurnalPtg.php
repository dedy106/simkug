<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_ypt_rptKbJurnalPtg extends server_report_basic
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
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$lokasi=$tmp[3];
        
        $sql="select distinct a.no_kas,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,convert(varchar,a.tanggal,103) as tanggal1,a.keterangan,a.kode_lokasi,
        a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app,c.nama as nama_setuju,c.jabatan as jabatan_setuju, d.kota
             from kas_m a
             inner join lokasi d on d.kode_lokasi = a.kode_lokasi 
             left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
             left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
			 $this->filter
             order by a.no_kas";
             
            //  echo $sql;
		
	
		//$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$rs = $dbLib->execute($sql);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$judul="BUKTI JURNAL";
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1' >
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td class='style16'>$row->nama </td>
          </tr>
          <tr>
            <td class='style16'></td>
          </tr>
        </table></td>
        <td width='200' align='center'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
        
          <tr>
            <td align='center' class='istyle15'>$row->no_kas</td>
          </tr>
          <tr>
            <td align='center' class='istyle15'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>$judul</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>NO</td>
        <td width='100' class='header_laporan'>KODE AKUN </td>
        <td width='200' class='header_laporan'>NAMA AKUN </td>
        <td width='270' class='header_laporan'>KETERANGAN</td>
		<td width='60' class='header_laporan'>PP</td>
		<td width='60' class='header_laporan'>DRK</td>
        <td width='100' class='header_laporan'>DEBET</td>
        <td width='100' class='header_laporan'>KREDIT</td>
       </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
      from kas_j a
      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
      where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
      order by a.no_urut  ";
		
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan' align='center'>$row1->kode_drk</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='6' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>Dibuat Oleh : </td>
        <td width='200' align='center'>Diperiksa Oleh : </td>
      </tr>
      <tr>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        </tr>
      <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
    </table></td>
  </tr>

</table><br>
			<DIV style='page-break-after:always'></DIV>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
