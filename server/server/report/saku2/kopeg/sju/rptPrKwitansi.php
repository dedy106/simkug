<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrKwitansi extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="";
		$AddOnLib=new server_util_AddOnLib();	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/sju.gif";
		$i=1;
		echo "<div align='center'>"; 
		$sql="select a.no_tagih,a.kode_lokasi,a.tanggal,c.no_polis,c.no_dok,c.n_premi,c.p_cost,c.materai,c.n_premi+c.p_cost+c.materai as nilai,
	   d.nama as nama_tipe,e.nama as nama_cust,f.nik,f.nama,f.jabatan
from sju_tagih_m a
inner join sju_tagih_d b on a.no_tagih=b.no_tagih and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on b.no_polis=c.no_polis and b.kode_lokasi=c.kode_lokasi
inner join sju_tipe d on c.kode_tipe=d.kode_tipe and c.kode_lokasi=d.kode_lokasi
inner join sju_cust e on c.kode_cust=e.kode_cust and c.kode_lokasi=e.kode_lokasi 
inner join karyawan f on a.nik_app=f.nik $this->filter
order by a.no_tagih";


		$rs=$dbLib->execute($sql);
		$tot_total=0; $tot_n_premi=0; $tot_n_fee=0; $tot_ppn=0; $tot_pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='565'><img src=$pathfoto width='130' height='73' /></td>
        <td width='225'>&nbsp; </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td width='205' height='30'>No. Kwitansi </td>
        <td width='13'>:</td>
        <td width='568' style='border-bottom:thin solid'>$row->no_tagih</td>
      </tr>
      <tr>
        <td height='30'>Telah terima dari </td>
        <td>:</td>
        <td style='border-bottom:thin solid'>$row->nama_cust</td>
      </tr>
	   <tr>
        <td height='5'></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td height='30'>Uang Sejumlah </td>
        <td>:</td>
        <td bgcolor='#CCCCCC'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot; ".$AddOnLib->terbilang($row->nilai)." &quot; </td>
      </tr>
      <tr>
        <td height='30'>Untuk Pembayaran </td>
        <td>:</td>
        <td style='border-bottom:thin solid'>PREMI ".strtoupper($row->nama_tipe)."</td>
      </tr>
      <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>POLIS NO $row->no_dok</td>
      </tr>
      <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>PREMI</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->n_premi,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>BEA POLIS</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->p_cost,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
	  <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>BEA MATERAI</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->materai,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
	  <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>DISKON</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->diskon,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='455' align='center' valign='bottom'><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td height='25' align='center' bgcolor='#CCCCCC' style='border-style:double none double none;'>Rp ".number_format($row->nilai,2,",",".")."</td>
          </tr>
        </table></td>
        <td width='335'><table width='400' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
            </tr>
          <tr>
            <td height='60'>&nbsp;</td>
            </tr>
          <tr>
            <td>$row->nama</td>
            </tr>
          <tr>
            <td>$row->jabatan</td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td style='border-top:thin solid'>Anggota APPARINDO No. 020-1985/APPARINDO </td>
  </tr>
  <tr>
    <td>Gedung Dana Pensiun Telkom Lt 3 Jalan Letjen S. Parman Kav 56 Jakarta 11410 Telp (021) 5347032</td>
  </tr>
  <tr>
    <td>Email : $row->email &nbsp;&nbsp;Website : www.sju.co.id </td>
  </tr>
</table>";
		echo "<br><br>";
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='565'><img src=$pathfoto width='130' height='73' /></td>
        <td width='225'>&nbsp; </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td width='205' height='30'>No. Kwitansi </td>
        <td width='13'>:</td>
        <td width='568' style='border-bottom:thin solid'>$row->no_tagih</td>
      </tr>
      <tr>
        <td height='30'>Telah terima dari </td>
        <td>:</td>
        <td style='border-bottom:thin solid'>$row->nama_cust</td>
      </tr>
	   <tr>
        <td height='5'></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td height='30'>Uang Sejumlah </td>
        <td>:</td>
        <td bgcolor='#CCCCCC'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot; ".$AddOnLib->terbilang($row->nilai)." &quot; </td>
      </tr>
      <tr>
        <td height='30'>Untuk Pembayaran </td>
        <td>:</td>
        <td style='border-bottom:thin solid'>PREMI ".strtoupper($row->nama_tipe)."</td>
      </tr>
      <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>POLIS NO $row->no_dok</td>
      </tr>
      <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>PREMI</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->n_premi,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>BEA POLIS</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->p_cost,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
	  <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>BEA MATERAI</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->materai,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
	  <tr>
        <td height='30' style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'>&nbsp;</td>
        <td style='border-bottom:thin solid'><table border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td width='140'>DISKON</td>
            <td width='25'>Rp</td>
            <td width='100' align='right'>".number_format($row->diskon,2,',','.')." </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='455' align='center' valign='bottom'><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td height='25' align='center' bgcolor='#CCCCCC' style='border-style:double none double none;'>Rp ".number_format($row->nilai,2,",",".")."</td>
          </tr>
        </table></td>
        <td width='335'><table width='400' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
            </tr>
          <tr>
            <td height='60'>&nbsp;</td>
            </tr>
          <tr>
            <td>$row->nama</td>
            </tr>
          <tr>
            <td>$row->jabatan</td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td style='border-top:thin solid'>Anggota APPARINDO No. 020-1985/APPARINDO </td>
  </tr>
  <tr>
    <td>Gedung Dana Pensiun Telkom Lt 3 Jalan Letjen S. Parman Kav 56 Jakarta 11410 Telp (021) 5347032</td>
  </tr>
  <tr>
    <td>Email : $row->email &nbsp;&nbsp;Website : www.sju.co.id </td>
  </tr>
</table>";
		echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
