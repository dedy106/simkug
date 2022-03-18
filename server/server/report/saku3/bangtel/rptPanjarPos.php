<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_rptPanjarPos extends server_report_basic
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
		$nama_file="if_".$periode.".xls";
		
		$sql="select a.no_panjar,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_pp,b.nama as nama_pp,
       a.no_app2,convert(varchar,c.tanggal,103) as tgl_app2,
       a.no_ver,convert(varchar,d.tanggal,103) as tgl_ver,
       a.no_app3,convert(varchar,e.tanggal,103) as tgl_app3,
       a.no_app4,convert(varchar,f.tanggal,103) as tgl_app4,
       a.no_kas,convert(varchar,g.tanggal,103) as tgl_kas,
	   a.nik_buat,h.nama as nama_buat,i.no_ptg as pj,a.kode_proyek,
	   case a.progress 
		when '0' then 'Pengajuan'
		when '1' then 'App GM/SM'
		when 'S' then 'Return GM/SM'
		when '2' then 'App Ver/SPB'
		when 'V' then 'Return Ver/SPB'
		when '3' then 'App GM Fin'
		when 'K' then 'Return GM Fin'
		when '4' then 'App BOD'
		when 'D' then 'Return BOD'
		when '5' then 'App Fiat'
		when 'F' then 'Return Fiat'
		when '6' then 'Pencairan'
		when '7' then 'Sudah PTG'
		end as progress, 
		case a.modul
		when 'PJAJU' then 'Umum'
		when 'PJPR' then 'Proyek'
		end as modulpj
		from panjar2_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join spm_app_m c on a.no_app2=c.no_app and a.kode_lokasi=c.kode_lokasi
left join spm_app_m d on a.no_ver=d.no_app and a.kode_lokasi=d.kode_lokasi
left join spm_app_m e on a.no_app3=e.no_app and a.kode_lokasi=e.kode_lokasi
left join spm_app_m f on a.no_app4=f.no_app and a.kode_lokasi=f.kode_lokasi
left join trans_m g on a.no_kas=g.no_bukti and a.kode_lokasi=g.kode_lokasi
left join karyawan h on a.nik_buat=h.nik and a.kode_lokasi=h.kode_lokasi
left join panjarptg2_m i on a.no_panjar=i.no_panjar and a.kode_lokasi=i.kode_lokasi
$this->filter order by a.no_panjar ";
		
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
		echo $AddOnLib->judul_laporan("posisi pengajuan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1700'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='110'  align='center' class='header_laporan'>No Panjar</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='90'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Nik Pemegang</td>
	 <td width='120'  align='center' class='header_laporan'>Nama Pemegang</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='60'  align='center' class='header_laporan'>Modul</td>
	 <td width='60'  align='center' class='header_laporan'>No Proyek</td>
	 <td width='40'  align='center' class='header_laporan'>Nilai</td>
	 <td width='60'  align='center' class='header_laporan'>Status</td>
	 <td width='120'  align='center' class='header_laporan'>No GM/SM Cabang</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Cabang</td>
	 <td width='120'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='120'  align='center' class='header_laporan'>No GM Fin</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl GM Fin</td>
	 <td width='120'  align='center' class='header_laporan'>No BOD</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl BOD</td>
	 <td width='120'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	 <td width='120'  align='center' class='header_laporan'>No Ptg Panjar</td>
	  </tr>  ";
		$bruto=0;$npajak=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_panjar','$row->kode_lokasi');\">$row->no_panjar</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->nik_buat</td>
	 <td class='isi_laporan'>$row->nama_buat</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->modulpj</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->progress</td>
	 <td class='isi_laporan'>$row->no_app2</td>
	 <td class='isi_laporan'>$row->tgl_app2</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a>";
		echo "</td>
	
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>$row->no_app3</td>
	 <td class='isi_laporan'>$row->tgl_app3</td>
	 <td class='isi_laporan'>$row->no_app4</td>
	 <td class='isi_laporan'>$row->tgl_app4</td>
	  <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	  <td class='isi_laporan'>$row->pj</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='13'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
