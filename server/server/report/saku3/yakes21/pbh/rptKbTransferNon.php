<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_pbh_rptKbTransferNon extends server_report_basic
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
		$jenis=$tmp[1];
		$nama_file="tranfer_".$periode.".xls";
		
		$sql="select a.no_spb,a.kode_lokasi,a.tanggal,a.keterangan,a.nilai,a.no_kas,convert(varchar,a.tanggal,103) as tgl
		from spb_m a
$this->filter
order by a.no_spb ";
		
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo $AddOnLib->judul_laporan("YAKES TELKOM","PEMBAYARAN TRANSFER",$row->no_spb);
			
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
	   <tr bgcolor='#CCCCCC'>
		 <td width='100'  align='center' class='header_laporan'>REKENING</td>
		 <td width='30'  align='center' class='header_laporan'>PLUS</td>
		 <td width='90'  align='center' class='header_laporan'>NOMINAL</td>
		 <td width='30'  align='center' class='header_laporan'>CD</td>
		 <td width='30'  align='center' class='header_laporan'>NO</td>
		 <td width='200'  align='center' class='header_laporan'>NAMA</td>
		 <td width='200'  align='center' class='header_laporan'>BANK</td>
		 <td width='150'  align='center' class='header_laporan'>KET</td>
		 <td width='100'  align='center' class='header_laporan'>NO AGENDA</td>
		 </tr>  ";
			$nilai=0;$nilai_ppn=0;$tagihan=0;$i=1;
			$sql="select a.no_pb,b.bank,b.no_rek,b.nama,b.bruto,b.pajak,b.nilai
			from pbh_pb_m a
			inner join pbh_rek b on a.no_pb=b.no_bukti
			where a.no_spb='$row->no_spb'
			order by b.bank,b.no_rek";
			$rs1 = $dbLib->execute($sql);	
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row1->nilai;
			echo "<tr>
				<td class='isi_laporan' >$row1->no_rek</td>
				<td class='isi_laporan' align='center' >+</td>
				<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
				<td class='isi_laporan' align='center' align='center'>C</td>
				<td class='isi_laporan' align='center' >$i</td>
				<td class='isi_laporan' >$row1->no_rek</td>
				<td class='isi_laporan' >$row1->bank</td>
				<td class='isi_laporan' >$row1->nama</td>
				<td class='isi_laporan' >$row1->no_pb</td>
				</tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' align='center' >&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				<td class='isi_laporan' align='center' align='center'>&nbsp;</td>
				<td class='isi_laporan' align='center' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				</tr>";
			echo "</table><br>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
