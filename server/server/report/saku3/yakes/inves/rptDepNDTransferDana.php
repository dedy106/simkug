<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptDepNDTransferDana extends server_report_basic
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
		$tahun=substr($periode,0,4);
		
		$sql="select distinct a.no_shop,
    a.jab3 as dari, a.hal1, a.nikttd3, e.nama as nama_ttd,convert(varchar,a.tanggal,103) as tgl
    from inv_shop_m a
    inner join inv_depo2_m b on a.no_shop=b.no_shop
    inner join inv_plan c on a.kode_plan=c.kode_plan
    inner join inv_bank d on b.bdepo=d.kode_bank
    inner join karyawan e on a.nikttd3=e.nik
    $this->filter ";

		
    $rs=$dbLib->execute($sql);
    // echo $rs->recordCount();
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
    echo "<div align='center'>
    <style>
    @media print {
 
      
      #contentPrint {
        width: 100%; 
        margin: 0; 
        float: none;
      }
          
      /** Seitenränder einstellen */       
      @page { margin: 3.5cm, 2cm, 1.5cm, 2cm }

    }
    .printND{
       margin-top:3.5cm;
    }
    </style>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1' style='text-align: justify' class='printND'>
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
        <td width='680'>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;/KU000/YAKES-30/$tahun </td>
      </tr>
      <tr>
        <td>Kepada</td>
        <td>: Sdr. KABID KEUANGAN</td>
      </tr>
      <tr>
        <td>Dari</td>
        <td>: $row->dari </td>
      </tr>
      <tr>
        <td>Lampiran</td>
        <td>: 1 (satu) berkas </td>
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
            <td class='header_laporan' width='120' align='center'>3</td>
            <td class='header_laporan' width='150' align='center'>4</td>
            <td class='header_laporan' width='150' align='center'>5</td>
            <td class='header_laporan' width='80' align='center'>6</td>
            <td class='header_laporan' width='120' align='center'>7</td>
          </tr>";
          $sql="select 
          a.jab3 as dari, a.hal1,
          c.nama as jenis_dana, b.jenis as jenis_penempatan,
          b.nilai as nominal, d.nama as nama_bank,d.no_rek+' atas nama '+d.nama_rek as no_rek,
          convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nikttd3, e.nama as nama_ttd
          from inv_shop_m a
          inner join inv_depo2_m b on a.no_shop=b.no_shop
          inner join inv_plan c on a.kode_plan=c.kode_plan
          inner join inv_bank d on b.bdepo=d.kode_bank
          inner join karyawan e on a.nikttd3=e.nik
          where a.no_shop='$row->no_shop' ";
	    	$rs1=$dbLib->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
          echo "<tr>
            <td class='isi_laporan'>$row1->jenis_dana</td>
            <td class='isi_laporan'>$row1->jenis_penempatan</td>
            <td class='isi_laporan' align='right'>Rp. ".number_format($row1->nominal,0,",",".").",-</td>
            <td class='isi_laporan'>$row1->nama_bank</td>
            <td class='isi_laporan'>$row1->no_rek </td>
            <td class='isi_laporan' align='center'>$row1->tgl</td>
            <td class='isi_laporan'>Penempatan Deposito a.n. Yakes Telkom</td>
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
        <td>Demikian kami sampaikan dan mohon pelaksanaannya. Atas perhatian dan kerja samanya kami ucapkan terima kasih. </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Bandung, &nbsp;".substr($row->tgl,0,2)." ".$AddOnLib->ubah_bulan(substr($row->tgl,3,2))." ".substr($row->tgl,6,4)." </td>
  </tr>
  <tr>
    <td height='60'>&nbsp;</td>
  </tr>
  <tr>
    <td style='font-weight:bold'><u>$row->nama_ttd</u></td>
  </tr>
  <tr>
    <td style='font-weight:bold'>NIK $row->nikttd3</td>
  </tr>
</table>
      <br>
      <DIV style='page-break-after:always'></DIV>";
			
			
		}
	echo "</td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
