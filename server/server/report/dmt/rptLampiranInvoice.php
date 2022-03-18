<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_dmt_rptLampiranInvoice extends server_report_basic
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
left join karyawan d on a.nik_app=d.nik ";
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
			echo "<table width='1000' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>Kepada Yth :</td>
  </tr>
  <tr>
    <td>$row->nama_cust</td>
  </tr>
  <tr>
    <td>$row->alamat</td>
  </tr>
  <tr>
    <td>$row->kota $row->kode_po</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>LAMPIRAN INVOICE</td>
  </tr>
  <tr>
    <td>Nomor : $row->no_ar</td>
  </tr>
  <tr>
    <td>Tanggal, $row->tgl $bulan $row->tahun</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='20' rowspan='2' align='center'>NO</td>
        <td width='200' rowspan='2' align='center'>LOKASI</td>
        <td width='100' rowspan='2' align='center'>SIDE ID </td>
        <td width='100' rowspan='2' align='center'>PERIODE</td>
        <td colspan='4' align='center'>TARIF PRESENTASE HARI</td>
        <td width='100' rowspan='2' align='center'>JUMLAH TOTAL</td>
      </tr>
      <tr>
        <td width='100' align='center'>TANGGAL LEASE AGREEMENT (MULAI SEWA)</td>
        <td width='100' align='center'>Harga Sewa / Bulan (Rp)</td>
        <td width='100' align='center'>TARIF O &amp; M</td>
        <td width='100' align='center'>Fee O &amp; M (5%) / Bulan 2011</td>
        </tr>";
		$sql1="select a.no_site,c.nama as nama_site,a.periode,date_format(b.tgl_mulai,'%d-%m-%Y') as tgl_mulai,a.rawat,a.fee,a.sewa,a.nilai_ar 
from dmt_bill_d a
inner join dmt_kontrak_d b on a.no_kontrak=b.no_kontrak
inner join dmt_site c on a.no_site=c.no_site";

		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td align='center'>$j</td>
        <td >$row1->nama_site</td>
        <td >$row1->no_site</td>
        <td align='center'>$row1->periode</td>
        <td align='center'>$row1->tgl_mulai</td>
        <td align='right'>".number_format($row1->sewa,0,",",".")."</td>
        <td align='right'>".number_format($row1->rawat,0,",",".")."</td>
        <td align='right'>".number_format($row1->fee,0,",",".")."</td>
        <td align='right'>".number_format($row1->nilai_ar,0,",",".")."</td>
      </tr>";
			$j=$j+1;
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><span class='istyle15'>Terbilang :</span></td>
  </tr>
  <tr>
    <td># $terbilang #</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='436'>&nbsp;</td>
        <td width='354'>PT Dayamitra Telekomunikasi</td>
      </tr>
      <tr>
        <td><span class='istyle15'>Pembayaran agar di transfer</span></td>
        <td>Hormat kami,</td>
      </tr>
      <tr>
        <td class='istyle15'>ke Rekening PT. Dayamitra Telekomunikasi</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='istyle15'>No. 070-0004492349</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='istyle15'>pada Bank Mandiri</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='istyle15'>Cabang Jakarta MT Haryono</td>
        <td><u>$row->nama_app</u></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>$row->jabatan</td>
      </tr>
    </table></td>
  </tr>
</table>";
		 
			$i=$i+1;
		}
		echo "</div>";
		
		return "";
	}
	
}
?>
  
