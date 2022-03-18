<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptKbSilabi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		
		
		$sql="select a.*, convert(varchar,a.tanggal,103) as tgl from trans_m a 
        $this->filter 
        order by a.no_bukti ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pencairan silabi",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='6' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_bukti</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Rekening</td>
        <td class='header_laporan'>: $row->param1</td>
      </tr>
      <tr>
        <td class='header_laporan'>Bukti Silabi </td>
        <td class='header_laporan'>: $row->no_ref1</td>
      </tr>
    </table></td>
  </tr>
 
  <tr bgcolor='#CCCCCC'>
	<td width='100' height='23'class='header_laporan' align='center'>Fakultas</td>
    <td width='100'  class='header_laporan' align='center'>No Agenda</td>
    <td width='90' class='header_laporan' align='center'>Tanggal</td>
    <td width='200' class='header_laporan' align='center'>Deskripsi</td>
    <td width='100' class='header_laporan' align='center'>Nilai</td>
    <td width='100' class='header_laporan' align='center'>Nilai Masuk</td>
  </tr>
";
			
            $sql=" select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.nilai+a.ppn-a.pph as nilai, a.kode_pp+' | '+b.nama as pp,isnull(c.nilai,0) as nilai_kas 
            from uin_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
            left join (select no_aju,kode_lokasi,nilai from uin_silabi_kas where no_bukti='$row->no_bukti' and kode_lokasi='$row->kode_lokasi' ) c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi 
            where a.no_sppd='$row->no_ref1' and a.kode_lokasi='$row->kode_lokasi' order by a.kode_pp,a.no_aju";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
                $nilai+=$row1->nilai;
                $nilai_kas+=$row1->nilai_kas;
				echo "<tr>
					<td height='23' class='isi_laporan'>$row1->pp</td>
					<td height='23' class='isi_laporan'>$row1->no_aju</td>
                    <td class='isi_laporan'>$row1->tgl</td>
                    <td class='isi_laporan'>$row1->keterangan</td>
                    <td  class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
                    <td  class='isi_laporan' align='right'>".number_format($row1->nilai_kas,0,',','.')."</td>
				</tr>";
				
			}
			echo "<tr>
            <td height='23' colspan='4'class='header_laporan' align='center'>Total</td>
            <td valign='top' class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
            <td valign='top' class='header_laporan' align='right'>".number_format($nilai_kas,0,',','.')."</td>
            </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
