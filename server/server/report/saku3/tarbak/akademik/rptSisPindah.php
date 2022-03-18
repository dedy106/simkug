<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_akademik_rptSisPindah extends server_report_basic
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
		$sql="select a.no_rekon,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
			from sis_rekon_m a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi
			$this->filter
			order by a.tanggal ";
			
			
		
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
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
            <td class='style16'>$row->kota</td>
          </tr>
        </table></td>
        <td width='200' align='center'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
        
          <tr>
            <td align='center' class='istyle15'>$row->no_rekon</td>
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
        <td width='100' class='header_laporan'>NIS</td>
        <td width='200' class='header_laporan'>NAMA SISWA </td>				
        <td width='100' class='header_laporan'>KODE AKUN </td>
        <td width='200' class='header_laporan'>NAMA AKUN </td>
        <td width='100' class='header_laporan'>DEBET</td>
        <td width='100' class='header_laporan'>KREDIT</td>
       </tr>";
	 $sql1="select a.nis,a.nilai,case when a.dc='D' then a.nilai else 0 end as debet,
	 case when a.dc='C' then a.nilai else 0 end as kredit,b.nama as sis,a.akun_cd,c.nama as akun
		from sis_cd_d a
	 inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi 
	 inner join masakun c on a.akun_cd=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
	 where a.periode='$row->periode' and a.kode_lokasi='$row->kode_lokasi' and a.no_bukti='$row->no_rekon'
			order by a.dc desc ";
		
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
				<td class='isi_laporan'>$row1->nis</td>
				<td class='isi_laporan'>$row1->sis</td>
				<td class='isi_laporan'>$row1->akun_cd</td>
				<td class='isi_laporan'>$row1->akun</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_kredit,0,',','.');
	  echo "<tr>
   
    <td colspan='5' class='header_laporan' align='right'>Total</td>
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
