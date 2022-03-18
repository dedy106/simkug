<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_rptHonorTransfer2Detail extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$jenis=$tmp[2];
		
		$nama_file="tranfer_".$periode.".xls";
		
		$sql="select a.no_spb,convert(varchar,x.tanggal,103) as tgl_spb,a.no_aju,a.kode_lokasi,case when substring(b.no_rek,1,1)='0' then ''''+b.no_rek else ''''+b.no_rek end as no_rek,b.nilai,b.nama_rek,b.berita,b.bank
		from it_aju_m a
		inner join it_aju_rek b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
		inner join it_spb_m x on a.no_spb=x.no_spb and a.kode_lokasi=x.kode_lokasi
		$this->filter and isnull(a.form,'-')<>'HONOR'
		union all
		select a.no_spb,convert(varchar,x.tanggal,103) as tgl_spb,a.no_aju,a.kode_lokasi,case when substring(b.no_rek,1,1)='0' then ''''+b.no_rek else ''''+b.no_rek end as no_rek,b.nilai,b.nama_rek,b.berita,c.bank
		from it_aju_m a
		inner join it_aju_rek b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
		left join it_dosen c on b.keterangan=c.kode_dosen and b.kode_lokasi=c.kode_lokasi
		inner join it_spb_m x on a.no_spb=x.no_spb and a.kode_lokasi=x.kode_lokasi
		$this->filter and isnull(a.form,'-')='HONOR'
		order by a.no_spb";
		
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
		$i=1;
		echo "<div align='center'>"; 
			echo $AddOnLib->judul_laporan("YAYASAN PENDIDIKAN TELKOM","PEMBAYARAN TRANSFER","");
			
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
	   <tr bgcolor='#CCCCCC'>
			<td width='100'  align='center' class='header_laporan'>NO SPB</td>
			<td width='90'  align='center' class='header_laporan'>TGL SPB</td>
			<td width='100'  align='center' class='header_laporan'>REKENING</td>
			<td width='30'  align='center' class='header_laporan'>PLUS</td>
			<td width='90'  align='center' class='header_laporan'>NOMINAL</td>
			<td width='30'  align='center' class='header_laporan'>CD</td>
			<td width='30'  align='center' class='header_laporan'>NO</td>
			<td width='150'  align='center' class='header_laporan'>NAMA</td>
			<td width='100'  align='center' class='header_laporan'>BANK</td>
			<td width='150'  align='center' class='header_laporan'>KET</td>
			<td width='80'  align='center' class='header_laporan'>NO AGENDA</td>
		 </tr>  ";
			$nilai=0;$nilai_ppn=0;$tagihan=0;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row->nilai;
			echo "<tr>
				<td class='isi_laporan' >$row->no_spb</td>
				<td class='isi_laporan' >$row->tgl_spb</td>
				<td class='isi_laporan' >$row->no_rek</td>
				<td class='isi_laporan' align='center' >+</td>
				<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
				<td class='isi_laporan' align='center' align='center'>C</td>
				<td class='isi_laporan' align='center' >$i</td>
				<td class='isi_laporan' >$row->nama_rek</td>
				<td class='isi_laporan' >$row->bank</td>
				<td class='isi_laporan' >$row->berita</td>
				<td class='isi_laporan' >$row->no_aju</td>
				</tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' align='center' >&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				<td class='isi_laporan' align='center' align='center'>&nbsp;</td>
				<td class='isi_laporan' align='center' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				<td class='isi_laporan' >&nbsp;</td>
				</tr> </table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
