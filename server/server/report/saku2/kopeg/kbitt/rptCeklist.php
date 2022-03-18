<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptCeklist extends server_report_basic
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
    		
		$sql="select a.no_aju as no_agenda, a.keterangan, a.tanggal as tgl_agenda,  case a.progress when '0' then 'Unit' 
						when 'A' then 'Unit' 
						when '0' then 'Penyerahan Dokumen' 
                        when '1' then 'Verifikasi Dokumen' 
                        when '2' then 'Verifikasi Akun/Fiat' 
                        when '3' then 'KasBank' 
                        when 'S' then 'SPB' 
                        when 'R' then 'Revisi' 
                else 'Revisi' end as posisi , b.no_app, b.tgl_input as tgl_app,a.no_kas,isnull(convert(varchar,c.tgl_input,121),'-') as tgl_kas,isnull(d.no_app,'-') as no_ceklis,a.kode_pp,e.nama 
        from it_aju_m a
        left join it_ajuapp_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi and a.no_app=b.no_app
        left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
        left join it_dok_app d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi
        left join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
        $this->filter
        order by a.no_aju ";
		
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
        echo $AddOnLib->judul_laporan("UNIVERSITAS TELKOM","LAPORAN CEKLIST",null);
        echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='10'  align='center' class='header_laporan'>NO</td>
            <td width='50'  align='center' class='header_laporan'>No Agenda</td>
            <td width='50'  align='center' class='header_laporan'>Kode PP</td>
            <td width='200'  align='center' class='header_laporan'>Nama PP</td>
            <td width='250'  align='center' class='header_laporan'>Keterangan</td>
            <td width='100'  align='center' class='header_laporan'>Tanggal Agenda</td>
            <td width='150'  align='center' class='header_laporan'>Posisi</td>
            <td width='90'  align='center' class='header_laporan'>No Bukti Dokumen Fisik</td>
            <td width='100'  align='center' class='header_laporan'>Tgl Dok</td>
            <td width='90'  align='center' class='header_laporan'>No BK</td>
            <td width='100'  align='center' class='header_laporan'>Tgl BK</td>
            <td width='90'  align='center' class='header_laporan'>No Bukti Ceklist</td>
        </tr>  ";
        $jum=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
				<td class='isi_laporan' >$i</td>
				<td class='isi_laporan' >$row->no_agenda</td>
				<td class='isi_laporan' >$row->kode_pp</td>
				<td class='isi_laporan' >$row->nama</td>
				<td class='isi_laporan' >$row->keterangan</td>
				<td class='isi_laporan' >$row->tgl_agenda</td>
				<td class='isi_laporan' >$row->posisi</td>
				<td class='isi_laporan' >$row->no_app</td>
				<td class='isi_laporan' >$row->tgl_app</td>
				<td class='isi_laporan' >$row->no_kas</td>
				<td class='isi_laporan' >$row->tgl_kas</td>
				<td class='isi_laporan' >$row->no_ceklis</td>
				</tr>";
                $i=$i+1;
        }
        echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
