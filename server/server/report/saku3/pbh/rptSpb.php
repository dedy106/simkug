<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_rptSpb extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		error_log($sql);
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
        $nik=$tmp[1];
        $no_app=$tmp[2];
        $status=$tmp[3];
				$jenis=$tmp[4];
				$kode_pp=$tmp[5];
		$sql="select a.periode,a.kode_lokasi,a.no_spb,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as due_date,a.keterangan,a.nilai,a.no_dokumen 
		from spb_m a
        $this->filter
        order by a.no_spb";
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<body >"; 
		echo $AddOnLib->judul_laporan("laporan dpc",$this->lokasi,$tahun);
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $email=$row->email;
			// $header="Pengajuan RRA - ".$row->no_pdrk;
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='10' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal - Due Date</td>
        <td class='header_laporan'>:&nbsp;$row->tgl - $row->due_date</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_spb</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen DPC </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
     

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No PB</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='300' align='center' class='header_laporan'>Deskripsi</td>
<td width='90' align='center' class='header_laporan'>Nilai</td>
  </tr>";
	  $sql1="
      select a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,nilai,a.keterangan from spb_j a 
        where a.no_spb='$row->no_spb' and a.kode_lokasi='$row->kode_lokasi'
        order by a.dc desc ";

        // echo $sql1;
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$nilai=0;
		$kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row1->nilai;
			echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row1->no_dokumen</td>
    <td class='isi_laporan'>$row1->tgl</td>
    <td class='isi_laporan'>$row1->keterangan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
  </tr>";
		$i=$i+1;
		}
		
	  echo " <tr>
    <td colspan='4' align='right' class='header_laporan'>Total</td>
    <td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
  </tr>
  </table><br>";
			
			$i=$i+1;
		}
		
		
		echo"</div></body>";
		
		return "";
	}
	
}
?>
