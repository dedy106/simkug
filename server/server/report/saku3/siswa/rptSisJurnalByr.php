<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptSisJurnalByr extends server_report_basic
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
		$sql="select a.no_kas,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
			from kas_m a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi
			$this->filter
			order by a.tanggal ";
		
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
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
            <td class='style16'>$row->kota</td>
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
        <td width='100' class='header_laporan'>DEBET</td>
        <td width='100' class='header_laporan'>KREDIT</td>
       </tr>";
	 $sql1="select a.kode_akun,b.nama,a.kode_pp,a.nilai,a.keterangan,isnull(a.debet,0) as debet,isnull(a.kredit,0) as kredit,a.kode_curr
					  from (select kode_lokasi,kode_akun,kode_pp,dc,nilai,keterangan,case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit,kode_curr
							from kas_j
							where periode='$row->periode' and kode_lokasi='$row->kode_lokasi' and no_kas='$row->no_kas'
							)a 
					  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					order by a.dc desc";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet+=$row1->debet;
			$kredit+=$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."/td>
				<td class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
			  </tr>";
				$i=$i+1;
		}
		
	  echo "<tr>
   
    <td colspan='5' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
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
