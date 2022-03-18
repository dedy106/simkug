<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPbPos extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="pbpos_".$periode.".xls";
		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,
        case a.progress 
        when '0' then 'Pengajuan'
        when '1' then 'App Atasan'
        when '2' then 'Verifikasi'
        when '3' then 'App Final'
        when '4' then 'App Kug'
        when '5' then 'App Dir'
        when 'A' then 'Return Atasan'
        when 'P' then 'Return Final'
        when 'K' then 'Return Kug'
        when 'U' then 'Return Dir'
        when '6' then 'Bayar'
        end as progress,a.kode_pp,b.nama as nama_pp,
               a.no_atasan,convert(varchar,k.tanggal,103) as tgl_atas,
               a.no_ver,convert(varchar,d.tanggal,103) as tgl_ver,
               a.no_app1,convert(varchar,c.tanggal,103) as tgl_fin,
               a.no_app2,convert(varchar,e.tanggal,103) as tgl_kug,
               a.no_app3,convert(varchar,j.tanggal,103) as tgl_dir,
               a.no_kas,convert(varchar,g.tanggal,103) as tgl_kas
        from sju_pb_m a
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        left join sju_ver_m k on a.no_atasan=k.no_ver and a.kode_lokasi=k.kode_lokasi
        left join sju_ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
        left join sju_ver_m c on a.no_app1=c.no_ver and a.kode_lokasi=c.kode_lokasi
        left join sju_ver_m e on a.no_app2=e.no_ver and a.kode_lokasi=e.kode_lokasi
        left join sju_ver_m j on a.no_app3=j.no_ver and a.kode_lokasi=j.kode_lokasi
        left join trans_m g on a.no_kas=g.no_bukti and a.kode_lokasi=g.kode_lokasi
        $this->filter
        order by a.no_pb  ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
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
			
		}
		$rs = $dbLib->execute($sql);
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi Permintaan Bayar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1700'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='100'  align='center' class='header_laporan'>Nama PP</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>Status</td>
	 <td width='100'  align='center' class='header_laporan'>No Atasan</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Atasan</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver</td>
	 <td width='100'  align='center' class='header_laporan'>No App Fin</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Fin</td>
	 <td width='100'  align='center' class='header_laporan'>No App Kug</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Kug</td>
	 <td width='100'  align='center' class='header_laporan'>No App Dir</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Dir</td>
	 <td width='100'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	  </tr> ";
		$bruto=0;$npajak=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->progress</td>
	 <td class='isi_laporan'>$row->no_atasan</td>
	 <td class='isi_laporan'>$row->tgl_atas</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>$row->no_app1</td>
	 <td class='isi_laporan'>$row->tgl_fin</td>
	 <td class='isi_laporan'>$row->no_app2</td>
	 <td class='isi_laporan'>$row->tgl_kug</td>
	  <td class='isi_laporan'>$row->no_app3</td>
	 <td class='isi_laporan'>$row->tgl_dir</td>
     <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->tgl_kas</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='13'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
