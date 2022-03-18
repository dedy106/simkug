<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kb_rptKbDaftarTransferSpm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
		$sql="select 1 ";
		
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		$sql="select a.no_kas,a.kode_lokasi,a.tanggal,a.nik_buat,a.akun_kb,b.nama as nama_akun
from kas_m a
left join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		$this->filter
		order by a.no_kas ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();
		$i=1;
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>PT. SANDHY PUTRA MAKMUR</td>
  </tr>
  <tr>
    <td align='center'>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>DAFTAR PEMBAYARAN/ TRANFER</td>
  </tr>
  <tr>
    <td align='center'>$row->no_kas</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='152'>SUMBER DANA</td>
        <td width='638'>: $row->akun_kb </td>
      </tr>
      <tr>
        <td>MTP</td>
        <td>: $row->nama_akun </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center' class='header_laporan'>NO.</td>
        <td width='270' align='center' class='header_laporan'>PENERIMA</td>
        <td width='150' align='center' class='header_laporan'>NO. REKENING</td>
        <td width='100' align='center' class='header_laporan'>NAMA BANK</td>
        <td width='150' align='center' class='header_laporan'>CABANG</td>
        <td width='100' align='center' class='header_laporan'>JUMLAH</td>
      </tr>";
		$sql="select b.no_bukti,b.no_rek,b.nama_rek,b.bank,b.cabang,b.nilai 
from spm_if_m a
inner join spm_rek b on a.no_if=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
union all
select  b.no_bukti,b.no_rek,b.nama_rek,b.bank,b.cabang,b.nilai 
from spm_ifreim_m a
inner join spm_rek b on a.no_reim=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
union all
select  b.no_bukti,b.no_rek,b.nama_rek,b.bank,b.cabang,b.nilai 
from yk_pb_m a
inner join spm_rek b on a.no_pb=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
order by nama_rek ";
		
		$rs1 = $dbLib->execute($sql);
		$nilai=0; $i=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
      echo "<tr>
		<td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama_rek</td>
        <td class='isi_laporan'>$row1->no_rek</td>
        <td class='isi_laporan'>$row1->bank</td>
        <td class='isi_laporan'>$row1->cabang</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
			$i+=1;
		}
		 echo "<tr>
		<td class='isi_laporan' align='center' colspan='5'>TOTAL</td>
        <td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' align='right' class='header_laporan'>Terbilang : </td>
        <td width='700' class='header_laporan'>( ".$AddOnLib->terbilang($nilai)." )</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'>Jakarta, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='300'>DIREKTUR</td>
        <td width='300'>SM. KEUANGAN</td>
        <td width='200'>Bendahara</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>LEMENTINA</td>
        <td>SUDARNO</td>
        <td>AYUHAN</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Catatan :</td>
  </tr>
  <tr>
    <td>Pada saat akun Kas/ Bank diisi... Akan merekap SPB yang akan dibayar pada satu daftar (dalam setiap akun Kas/ Bank ..terbentuk satu daftra rekap)</td>
  </tr>
</table><br><DIV style='page-break-after:always'></DIV>";
			
			$i=$i+1;
		}
		
		echo "</div>";
		return "";
		
	}
	
}
?>
