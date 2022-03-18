<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptSppdAjuPos extends server_report_basic
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
		$sql="select a.no_aju,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.tujuan,a.dasar,a.jenis,a.kode_pp,b.nama as nama_pp,c.nik,
		d.nama,e.no_spj as spj,date_format(e.tanggal,'%d/%m/%Y') as tgl_spj,
		f.no_app as gs,date_format(f.tanggal,'%d/%m/%Y') as tgl_gs,
		g.no_app as verif,date_format(g.tanggal,'%d/%m/%Y') as tgl_verif,
		h.no_app as spb,date_format(h.tanggal,'%d/%m/%Y') as tgl_spb,
		i.no_app as fiat,date_format(i.tanggal,'%d/%m/%Y') as tgl_fiat,
		j.no_kas,date_format(j.tanggal,'%d/%m/%Y') as tgl_kas,
		k.no_app as kug,date_format(k.tanggal,'%d/%m/%Y') as tgl_kug
from pd_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join pd_aju_nik c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi
left join karyawan d on d.nik=c.nik and d.kode_lokasi=c.kode_lokasi
left join pd_spj_m e on e.no_aju=c.no_aju and e.kode_lokasi=c.kode_lokasi
left join spm_app_m f on f.no_app=c.no_app1 and a.kode_lokasi=c.kode_lokasi
left join spm_app_m g on e.no_app4=g.no_app and e.kode_lokasi=g.kode_lokasi
left join spm_app_m h on e.no_ver=h.no_app and e.kode_lokasi=h.kode_lokasi
left join spm_app_m i on e.no_fiat=i.no_app and e.kode_lokasi=i.kode_lokasi
left join kas_m j on e.no_kas=j.no_kas and e.kode_lokasi=j.kode_lokasi
left join spm_app_m k on e.no_app3=k.no_app and e.kode_lokasi=k.kode_lokasi
$this->filter order by a.no_aju ";
		
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
		echo $AddOnLib->judul_laporan("posisi pengajuan sppd",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No SPPD</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='90'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='90'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='250'  align='center' class='header_laporan'>Tujuan</td>
	 <td width='100'  align='center' class='header_laporan'>Dasar</td>
   <td width='60'  align='center' class='header_laporan'>Jenis</td>
	 <td width='90'  align='center' class='header_laporan'>Nik Pengaju</td>
	 <td width='90'  align='center' class='header_laporan'>Nama Pengaju</td>
	 <td width='100'  align='center' class='header_laporan'>No Hitung Biaya</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Hitung Biaya</td>
	 <td width='100'  align='center' class='header_laporan'>No App GS</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App GS</td>
	 <td width='60'  align='center' class='header_laporan'>Sts App GS</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver Data</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Data</td>
	 <td width='60'  align='center' class='header_laporan'>Sts Ver Data</td>
	 <td width='100'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='100'  align='center' class='header_laporan'>No App Kug</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Kug</td>
	 <td width='100'  align='center' class='header_laporan'>No Fiat</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Fiat</td>
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
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_aju','$row->kode_lokasi');\">$row->no_aju</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'>$row->tujuan</td>
	 <td class='isi_laporan'>$row->dasar</td>
	 <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->spj</td>
	 <td class='isi_laporan'>$row->tgl_spj</td>
	 <td class='isi_laporan'>$row->gs</td>
	 <td class='isi_laporan'>$row->tgl_gs</td>
	 <td class='isi_laporan'>$row->status_gs</td>
	 <td class='isi_laporan'>$row->verif</td>
	 <td class='isi_laporan'>$row->tgl_verif</td>
	 <td class='isi_laporan'>$row->status_ver</td>
	 <td class='isi_laporan'>$row->spb</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	 <td class='isi_laporan'>$row->kug</td>
	 <td class='isi_laporan'>$row->tgl_kug</td>
	 <td class='isi_laporan'>$row->fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	 <td class='isi_laporan'>$row->no_kas</td>
	  <td class='isi_laporan'>$row->tgl_kas</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	   </tr>";
			$i=$i+1;
		}
		echo "";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
