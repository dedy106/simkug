<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptGaji extends server_report_basic
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
		echo $AddOnLib->judul_laporan("GAJI KARYAWAN TETAP ",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table cellspacing='0' cellpadding='0'>
  <col width='34' />
  <col width='208' />
  <col width='60' />
  <col width='288' />
  <col width='276' />
  <col width='229' />
  <col width='81' />
  <col width='87' />
  <col width='111' />
  <col width='110' />
  <col width='85' />
  <col width='92' />
  <col width='98' />
  <col width='102' />
  <col width='86' />
  <col width='87' />
  <col width='75' />
  <col width='85' />
  <col width='98' />
  <tr height='56'>
    <td height='56' width='34'>NO</td>
    <td width='208'>NAMA</td>
    <td width='60'>NIK</td>
    <td width='288'>JABATAN/    POSISI</td>
    <td width='276'>UNIT KERJA</td>
    <td width='229'>SUB DIREKTORAT</td>
    <td width='81'>GAPOK</td>
    <td width='87'>KONJUNGTUR</td>
    <td width='111'>TUNJANGAN<br />
      JABATAN / POSISI</td>
    <td width='110'>REMUNERASI</td>
    <td width='85'>TUNJANGAN KHUSUS</td>
    <td width='92'>LEMBUR&nbsp;</td>
    <td width='98'>RAPEL</td>
    <td width='102'>TOTAL    PENDAPATAN</td>
    <td width='86'>IURAN&nbsp; KOPERASI</td>
    <td width='87'>POTONGAN    KOPERASI</td>
    <td width='75'>POTONGAN    ASURANSI</td>
    <td width='85'>TOTAL POTONGAN</td>
    <td width='98'>TOTAL TRANSFER</td>
  </tr>
  <tr height='29'>
    <td height='29'>&nbsp;</td>
    <td width='208'>&nbsp;</td>
    <td>&nbsp;</td>
    <td width='288'>&nbsp;</td>
    <td width='276'>&nbsp;</td>
    <td width='229'>&nbsp;</td>
    <td width='81'>&nbsp;</td>
    <td width='87'>&nbsp;</td>
    <td width='111'>&nbsp;</td>
    <td width='110'>&nbsp;</td>
    <td width='85'>&nbsp;</td>
    <td width='92'>&nbsp;</td>
    <td width='98'>&nbsp;</td>
    <td width='102'>&nbsp;</td>
    <td width='86'>&nbsp;</td>
    <td width='87'>&nbsp;</td>
    <td width='75'>&nbsp;</td>
    <td width='85'>&nbsp;</td>
    <td width='98'>&nbsp;</td>
  </tr>
  <tr height='20'>
    <td height='20' width='34'>&nbsp;</td>
    <td width='208'>GRAND&nbsp;&nbsp; TOTAL</td>
    <td>&nbsp;</td>
    <td width='288'>&nbsp;</td>
    <td width='276'>&nbsp;</td>
    <td width='229'>&nbsp;</td>
    <td width='81'>&nbsp;</td>
    <td width='87'>&nbsp;</td>
    <td width='111'>&nbsp;</td>
    <td width='110'>&nbsp;</td>
    <td width='85'>&nbsp;</td>
    <td width='92'>&nbsp;</td>
    <td width='98'>&nbsp;</td>
    <td width='102'>&nbsp;</td>
    <td width='86'>&nbsp;</td>
    <td width='87'>&nbsp;</td>
    <td width='75'>&nbsp;</td>
    <td width='85'>&nbsp;</td>
    <td width='98'>&nbsp;</td>
  </tr>
  <tr height='16'>
    <td height='16' width='34'></td>
    <td width='208'></td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'></td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'></td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td width='86'></td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='17'>
    <td height='17' colspan='2'>Jakarta,&nbsp;&nbsp;&nbsp;&nbsp; Maret&nbsp;    2017</td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'></td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'></td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td></td>
    <td width='87'></td>
    <td></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='14'>
    <td height='14' width='34'></td>
    <td width='208'></td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'></td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'></td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td width='86'></td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='20'>
    <td height='20' colspan='2'>Dibuat    Oleh</td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'>Diperiksa Oleh</td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'>Diperiksa Oleh</td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td>Disetujui</td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='20'>
    <td height='20' width='34'></td>
    <td width='208'></td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'></td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'></td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td></td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='20'>
    <td height='20' width='34'></td>
    <td width='208'></td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'></td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'></td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td></td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='20'>
    <td height='20' width='34'></td>
    <td width='208'></td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'></td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'></td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td></td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='20'>
    <td height='20' width='34'></td>
    <td width='208'></td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td width='229'></td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td width='110'></td>
    <td width='85'></td>
    <td width='92'></td>
    <td width='98'></td>
    <td width='102'></td>
    <td></td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='20'>
    <td height='20' colspan='2'>Irwan    Senjaya</td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td>Maryanto</td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td>Maryanto</td>
    <td></td>
    <td width='92'></td>
    <td></td>
    <td width='102'></td>
    <td>Tin Rostini</td>
    <td width='87'></td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>
  <tr height='20'>
    <td height='20' colspan='2'>HC Senior Officer</td>
    <td width='60'></td>
    <td width='288'></td>
    <td width='276'></td>
    <td>PJ. Human Capital Manager</td>
    <td width='81'></td>
    <td width='87'></td>
    <td width='111'></td>
    <td colspan='2'>Human Capital Manager</td>
    <td width='92'></td>
    <td></td>
    <td width='102'></td>
    <td colspan='2'>HCGS Vice President</td>
    <td width='75'></td>
    <td width='85'></td>
    <td width='98'></td>
  </tr>";


			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
