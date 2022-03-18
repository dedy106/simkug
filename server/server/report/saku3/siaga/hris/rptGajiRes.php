<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptGajiRes extends server_report_basic
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
		echo $AddOnLib->judul_laporan("RESUME PEMBAYARAN GAJI KARYAWAN",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='541' height='372' border='1'>
  <tr>
    <th width='51' scope='row'><span class='style4'>No</span></th>
    <td width='151'><div align='center' class='style4'>URAIAN</div></td>
    <td width='101'><div align='center' class='style4'>AKUN</div></td>
    <td width='101'><div align='center' class='style4'>COA</div></td>
    <td width='103'><div align='center' class='style4'>GAJI</div></td>
  </tr>
  <tr>
    <th colspan='5' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th scope='row'>I</th>
    <td colspan='4'>Karyawan Tetap : </td>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='5' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th scope='row'>II</th>
    <td colspan='4'>Karyawan Kontrak : </td>
  </tr>
  <tr>
    <th scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='5' scope='row'>&nbsp;</th>
  </tr>
  <tr>
    <th colspan='4' scope='row'><p align='left' class='style2'>SUBTOTAL</p>    </th>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='4' scope='row'><div align='left'><span class='style2'>TOTAL GAJI </span></div></th>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='4' scope='row'>&nbsp;</th>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='4' scope='row'><div align='left' class='style2'>GAJI KARYAWAN TETAP : </div></th>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='4' scope='row'><div align='left'><span class='style2'>GAJI KARYAWAN KONTRAK : </span></div></th>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='4' scope='row'><div align='left' class='style2'>TOTAL : </div></th>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th colspan='5' scope='row'>&nbsp;</th>
  </tr>
</table>
<table cellspacing='0' cellpadding='0'>
  <col width='26' />
  <col width='22' />
  <col width='18' />
  <col width='278' />
  <col width='211' />
  <col width='116' />
  <col width='126' />
  <tr height='17'>
    <td height='17' width='26'></td>
    <td colspan='3' width='318'>Jakarta,&nbsp;&nbsp;&nbsp;&nbsp; Maret&nbsp;    2017</td>
    <td width='211'></td>
    <td width='116'></td>
    <td width='126'></td>
  </tr>
  <tr height='17'>
    <td height='17'></td>
    <td colspan='3'>Dibuat oleh</td>
    <td>Diperiksa&nbsp;</td>
    <td></td>
    <td>Disetujui</td>
  </tr>
  <tr height='17'>
    <td height='17'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='17'>
    <td height='17'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='17'>
    <td height='17'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='17'>
    <td height='17'></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr height='17'>
    <td height='17'></td>
    <td colspan='3'>Irwan Senjaya</td>
    <td>Maryanto</td>
    <td></td>
    <td>Tin Rostini</td>
  </tr>
  <tr height='20'>
    <td height='20'></td>
    <td colspan='3'>HC Senior Officer</td>
    <td>Human Capital Manager</td>
    <td></td>
    <td>HCGS Vice President</td>
  </tr>
";


			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
