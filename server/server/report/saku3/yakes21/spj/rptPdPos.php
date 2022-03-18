<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_spj_rptPdPos extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="pbh_pb".$periode.".xls";
		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_pp,b.nama as nama_pp,o.nik as nik_spj,o.nama as nama_spj,
		c.no_ver as no_terima,convert(varchar,c.tanggal,103) as tgl_terima,
		d.no_ver,convert(varchar,d.tanggal,103) as tgl_ver,
		e.no_spb,convert(varchar,e.tanggal,103) as tgl_spb,
		e.no_sah,convert(varchar,f.tanggal,103) as tgl_sah,
		e.no_fiat,convert(varchar,f.tanggal,103) as tgl_fiat,
		a.no_nota,convert(varchar,j.tanggal,103) as tgl_nota,
		a.no_kas,convert(varchar,h.tanggal,103) as tgl_kas,
		isnull(i.jum_dok,0) as jum_dok
  from pbh_pb_m a
  inner join pdss_aju_m o on a.no_pb=o.no_aju
  inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
  left join pbh_ver_m c on a.no_fisik=c.no_ver 
  left join pbh_ver_m d on a.no_ver=d.no_ver 
  left join spb_m e on a.no_spb=e.no_spb 
  left join pbh_ver_m f on e.no_sah=f.no_ver 
  left join pbh_ver_m g on e.no_fiat=g.no_ver 
  left join kas_m h on a.no_kas=h.no_kas 
  left join pbh_nota j on a.no_nota=j.no_nota
  left join (select b.no_bukti, b.kode_lokasi,count(b.no_gambar) as jum_dok 
		  from pbh_pb_m a
		  inner join pbh_dok b on a.no_pb=b.no_bukti
		  $this->filter
		  group by b.no_bukti, b.kode_lokasi
		  )i on a.no_pb=i.no_bukti 
		  $this->filter and a.modul='PBSPJ' order by a.no_pb";
		


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
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi Permintaan Bayar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1600'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>

	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='120'  align='center' class='header_laporan'>Nama</td>

	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='120'  align='center' class='header_laporan'>Nama PP</td>
     <td width='250'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah Dok</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='60'  align='center' class='header_laporan'>Status</td>
	 <td width='100'  align='center' class='header_laporan'>No Terima</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Terima</td>
	 <td width='100'  align='center' class='header_laporan'>No Verikasi</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Verikasi</td>
	 <td width='100'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='100'  align='center' class='header_laporan'>No Sah</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Sah</td>
	 <td width='100'  align='center' class='header_laporan'>No Fiat</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Fiat</td>
	 <td width='100'  align='center' class='header_laporan'>No Nota</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Nota</td>
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
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPb('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl</td>

	<td class='isi_laporan'>$row->nik_spj</td>
	<td class='isi_laporan'>$row->nama_spj</td>

	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->no_pb','$row->kode_lokasi');\">$row->jum_dok</a></td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->progress</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_terima','$row->kode_lokasi');\">$row->no_terima</a></td>
	 <td class='isi_laporan'>$row->tgl_terima</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a></td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a></td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_sah','$row->kode_lokasi');\">$row->no_sah</a></td>
	 <td class='isi_laporan'>$row->tgl_sah</td>	
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_fiat','$row->kode_lokasi');\">$row->no_fiat</a></td>
	<td class='isi_laporan'>$row->tgl_fiat</td>
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_nota','$row->kode_lokasi');\">$row->no_nota</a></td>
	<td class='isi_laporan'>$row->tgl_nota</td>
		<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a></td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='9'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='10'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
