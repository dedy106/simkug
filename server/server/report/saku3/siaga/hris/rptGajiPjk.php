<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptGajiPjk extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$nama_cab=$tmp[1];
		$sql="";
							  
							  
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("PERHITUNGAN PPH 21 GAJI",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table cellspacing='0' cellpadding='0'>
  <col width='29' />
  <col width='404' />
  <col width='149' />
  <col width='132' />
  <col width='122' />
  <col width='100' />
  <col width='76' />
  <col width='107' />
  <col width='105' />
  <col width='83' />
  <col width='101' />
  <col width='129' />
  <col width='92' />
  <col width='84' />
  <tr height='60'>
    <td height='60' width='24'><div align='center'>NO</div></td>
    <td width='156'><div align='center'>N A M A</div></td>
    <td width='45'><div align='center'>NO. NPWP</div></td>
    <td width='58'><div align='center'>STATUS</div></td>
    <td width='104'><div align='center'>PENDAPATAN</div></td>
    <td width='73'>&nbsp;
    <div align='center'>GAJI SETAHUN</div></td>
    <td width='64'><div align='center'>LEMBUR</div></td>
    <td width='108'><div align='center'>PENDAPATAN LAIN    (THR, UBAS, UANG CUTI)</div></td>
    <td width='108'><div align='center'>TOTAL    PENDAPATAN BRUTO</div></td>
    <td width='63'><div align='center'>5% BY JBTN</div></td>
    <td width='108'><div align='center'>TOTAL    PENDAPATAN NETTO</div></td>
    <td width='85'><div align='center'>P.T.K.P</div></td>
    <td width='57'><div align='center'>P.K.P</div></td>
    <td width='54'><div align='center'>PPH 21&nbsp;</div></td>
  </tr>
  <tr height='15'>
    <td height='15' width='24'>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td width='58'>&nbsp;</td>
    <td width='104'>&nbsp;</td>
    <td width='73'>&nbsp;</td>
    <td width='64'>&nbsp;</td>
    <td width='108'>&nbsp;</td>
    <td width='108'>&nbsp;</td>
    <td>&nbsp;</td>
    <td width='108'>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr height='19'>
    <td height='19' colspan='14'>&nbsp;</td>
  </tr>
  <tr height='32'>
    <td height='32' colspan='2'>TOTAL PPh 21 KARYAWAN TETAP DAN KONTRAK GRATIKA</td>
    <td width='45'>&nbsp;</td>
    <td width='58'>&nbsp;</td>
    <td width='104'>&nbsp;</td>
    <td width='73'>&nbsp;</td>
    <td width='64'>&nbsp;</td>
    <td width='108'>&nbsp;</td>
    <td width='108'>&nbsp;</td>
    <td width='63'>&nbsp;</td>
    <td width='108'>&nbsp;</td>
    <td width='85'>&nbsp;</td>
    <td width='57'>&nbsp;</td>
    <td width='54'>&nbsp;</td>
  </tr>";


			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
