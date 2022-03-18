<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptSisMutasiPdd extends server_report_basic
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
		$sql="select distinct a.no_bukti,a.kode_lokasi, convert(varchar,b.tanggal,103) as tgl from sis_cd_d a inner join sis_rekon_m b on a.no_bukti=b.no_rekon and  a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
			$this->filter
            order by a.no_bukti ";
            
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$judul="LAPORAN MUTASI PDD";
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1' >
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td class='style16'></td>
          </tr>
          <tr>
            <td class='style16'></td>
          </tr>
        </table></td>
        <td width='200' align='center'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
        
          <tr>
            <td align='center' class='istyle15'>$row->no_bukti</td>
          </tr>
          <tr>
            <td align='center' class='istyle15'>$row->tgl</td>
          </tr>
          <tr>
          </tr>

        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>$judul</td>
  </tr>
  <tr>
    <td align='center' height='10'>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='10' class='header_laporan'>No</td>
        <td width='60' class='header_laporan'>Kode PP</td>
        <td width='80' class='header_laporan'>Id Registrasi</td>
        <td width='80' class='header_laporan'>NIS Penerima</td>
        <td width='200' class='header_laporan'>Nama</td>
        <td width='100' class='header_laporan'>Saldo PDD</td>
        <td width='100' class='header_laporan'>Nilai Mutasi</td>
       </tr>";

	 $sql1="select ''''+a.nis as nis,a.nilai, b.nama,''''+a.no_ref1 as no_ref1,a.kode_pp from sis_cd_d a 
     inner join sis_siswareg b on a.nis=b.no_reg and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
     where modul='CDMUTMULTI' and dc='C' and a.no_bukti = '$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi'";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row1->nilai,0,',','.');
			$tot=$tot+$row1->nilai;
			echo "<tr>
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>$row1->kode_pp</td>
                <td class='isi_laporan'>$row1->nis</td>
                <td class='isi_laporan'>$row1->no_ref1</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan' align='right'>$nilai</td>
                <td class='isi_laporan' align='right'>$nilai</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_nil=number_format($tot,0,',','.');
	  echo "<tr>
   
    <td colspan='5' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_nil</td>
    <td class='isi_laporan' align='right'>$tot_nil</td>
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
