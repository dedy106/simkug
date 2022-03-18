<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_dmt_rptKuitansi extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_ar)
from dmt_ar_m a
inner join dmt_kontrak_m b on a.no_kontrak=b.no_kontrak
inner join cust c on b.kode_cust=c.kode_cust
";
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
		$nama_ver=$tmp[0];
		$sql="select a.no_ar,a.tanggal,a.keterangan,a.no_kontrak,a.nilai,substring(b.periode,1,4) as thn_kontrak,a.due_date,d.nama as nama_app,d.jabatan
	   ,c.nama as nama_cust,c.alamat,c.kota,c.kode_pos,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,datepart(year,a.tanggal) as tahun
	   ,datepart(day,a.due_date) as tgl2,datepart(month,a.due_date) as bulan2,datepart(year,a.due_date) as tahun2
from dmt_ar_m a
inner join dmt_kontrak_m b on a.no_kontrak=b.no_kontrak
inner join cust c on b.kode_cust=c.kode_cust
left join karyawan d on a.nik_app=d.nik  ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang=$AddOnLib->terbilang2($row->nilai);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$bulan2=$AddOnLib->ubah_bulan($row->bulan2);
			echo "<table width='700' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td class='nstyle16'>PT DAYAMITRA TELEKOMUNIKASI</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='451'>&nbsp;</td>
                <td width='333' class='nstyle16'><u>KUITANSI</u></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>No. $row->no_ar</td>
              </tr>
            </table></td>
          </tr>
          <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='187'>Sudah Terima Dari</td>
                <td width='603'>: $row->nama_cust </td>
              </tr>
              <tr>
                <td>Banyaknya Uang</td>
                <td>: # $terbilang # </td>
              </tr>
              <tr>
                <td valign='top'>Untuk Pembayaran</td>
                <td height='100' valign='top'>: $row->keterangan </td>
              </tr>
			  
            </table></td>
          </tr>
          <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td width='451'>&nbsp;</td>
                <td width='333'>Jakarta, $row->tgl2 $bulan2 $row->tahun2 </td>
              </tr>
              <tr>
                <td align='center' valign='middle'><table width='150' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                  <tr>
                    <td align='center' height='23'>Rp. ".number_format($row->nilai,0,",",".")."</td>
                  </tr>
                </table></td>
                <td height='60'>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td><u>$row->nama_app</u></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>$row->jabatan</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>PT DAYAMITRA TELEKOMUNIKASI : Ged. Graha Pratama Lt.5 Hl. MT Haryono Kav 15 Jakarta Telp.021-83709592 Fax :021 83709591</td>
  </tr>
</table>";
		 
			$i=$i+1;
		}
		echo "</div>";
		
		return "";
	}
	
}
?>
  
