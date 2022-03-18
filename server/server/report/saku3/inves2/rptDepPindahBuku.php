<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptDepPindahBuku extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		
		
		$sql="select a.no_shop,a.kode_lokasi,a.nodin,a.kepada1,a.dari1,a.lamp1,a.hal1,a.nikttd1,a.jab1,b.nama,a.tanggal,
		substring(a.periode,1,4) as tahun,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan
from inv_shop_m a
left join karyawan b on a.nikttd1=b.nik
$this->filter order by a.no_shop";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
			 <tr>
    <td align='right' class='judul_bukti'>Nota Dinas </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120'>Nomor</td>
        <td width='680'>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$row->nodin </td>
      </tr>
      <tr>
        <td>Kepada</td>
        <td>: $row->kepada1 </td>
      </tr>
      <tr>
        <td>Dari</td>
        <td>: $row->dari1 </td>
      </tr>
      <tr>
        <td>Lampiran</td>
        <td>: $row->lamp1 </td>
      </tr>
      <tr>
        <td>Perihal</td>
        <td>: $row->hal1 </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='34' valign='top'>1.</td>
        <td width='756' valign='top'>Sehubungan penempatan dana YAKES-TELKOM pada deposito, dengan ini dimohon bantuan Saudara untuk mentransfer dana dengan kondisi sebagai berikut : </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak' >
          <tr>
            <td class='header_laporan' rowspan='2' align='center'>Jenis Dana </td>
            <td class='header_laporan' rowspan='2' align='center'>Jenis Penempatan </td>
            <td class='header_laporan' rowspan='2' align='center'>Nominal Dana yang Ditransfer </td>
            <td class='header_laporan' colspan='2' align='center'>Alamat Transfer / Pemindahbukuan Dana </td>
            <td class='header_laporan' rowspan='2' align='center'>Tanggal Pelaksanaan (dd/mm/yyyy) </td>
            <td class='header_laporan' rowspan='2' align='center'>Keterangan Transfer </td>
          </tr>
          <tr>
            <td class='header_laporan' align='center' align='center'>Nama Bank </td>
            <td class='header_laporan' align='center' align='center'>Nomor Rekening </td>
            </tr>
          <tr>
            <td class='header_laporan' width='100' align='center'>1</td>
            <td class='header_laporan' width='100' align='center'>2</td>
            <td class='header_laporan' width='100' align='center'>3</td>
            <td class='header_laporan' width='150' align='center'>4</td>
            <td class='header_laporan' width='150' align='center'>5</td>
            <td class='header_laporan' width='80' align='center'>6</td>
            <td class='header_laporan' width='120' align='center'>7</td>
          </tr>";
		  $sql="select a.kode_bank,b.nama as nama_bank,a.jenis,c.status_dana,a.nilai,b.no_rek,b.nama_rek,date_format(a.tanggal,'%d/%m/%Y') as tgl
from inv_shop_rate a
inner join inv_bank b on a.kode_bank=b.kode_bank 
inner join inv_depo2_m c on a.no_shop=c.no_shop and a.kode_lokasi=c.kode_lokasi
where a.no_shop='$row->no_shop' and a.nilai<>0
order by c.status_dana
";	
		$rs1=$dbLib->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
          echo "<tr>
            <td class='isi_laporan'>$row1->status_dana</td>
            <td class='isi_laporan'>$row1->jenis</td>
            <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
            <td class='isi_laporan'>$row1->nama_bank</td>
            <td class='isi_laporan'>$row1->no_rek a.n. $row1->nama_rek</td>
            <td class='isi_laporan' align='center'>$row1->tgl</td>
            <td class='isi_laporan'>&nbsp;</td>
          </tr>";
		}
          echo "<tr>
            <td colspan='2' align='center'>Jumlah</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td valign='top'>2.</td>
        <td>Melengkapi permohonan transfer dana ini, terlampir kami sampaikan berkas rencana penempatan dana di Bank dimaksud. </td>
      </tr>
      <tr>
        <td valign='top'>3.</td>
        <td>Demikian kami sampaikan dan mohon pelaksanaannya. Atas perhatian dan kerja samanya kami ucapkan terima kasih </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Bandung, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$bulan $row->tahun </td>
  </tr>
  <tr>
    <td height='60'>&nbsp;</td>
  </tr>
  <tr>
    <td><u>$row->nama</u></td>
  </tr>
  <tr>
    <td>$row->jab1</td>
  </tr>
</table>
			<br>";
			
			
		}
	echo "</td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
