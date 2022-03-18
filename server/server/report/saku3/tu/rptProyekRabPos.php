<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProyekRabPos extends server_report_basic
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
		$tahun=substr($periode,0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="rab_".$periode.".xls";
		$sql="select a.no_rab,a.kode_lokasi,a.keterangan,a.kode_pp,b.nama as nama_pp,a.kode_cust,c.nama as nama_cust,a.no_dok,
	    convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,convert(varchar(20),a.tanggal,103) as tgl_rab,
		a.nilai,a.nilai_or,a.p_or,a.kode_jenis,d.nama as nama_jenis,
		a.no_app as no_ver,convert(varchar(20),e.tanggal,103) as tgl_ver,e.status as status_ver,
		g.kode_proyek,isnull(g.nilai,0) as nilai_proyek,isnull(g.nilai_or,0) as or_proyek,
		h.no_app,convert(varchar(20),h.tanggal,103) as tgl_app,h.status as status_app,e.tgl_input
from tu_rab_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join tu_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
left join tu_proyek_app e on a.no_app=e.no_app and a.kode_lokasi=e.kode_lokasi
left join tu_rabapp_m f on e.no_app=f.no_app and e.kode_lokasi=f.kode_lokasi
left join tu_proyek g on f.kode_proyek=g.kode_proyek and f.kode_lokasi=g.kode_lokasi
left join tu_proyek_app h on g.no_app=h.no_app and g.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_rab ";
		
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
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pertanggungan rab",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No RAB</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Jenis</td>
	 <td width='150'  align='center' class='header_laporan'>Customer</td>
     <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek RAB</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai OR RAB</td>
	 <td width='90'  align='center' class='header_laporan'>SHU Proyek RAB</td>
	 <td width='60'  align='center' class='header_laporan'>No Ver RAB</td>
	 <td width='100'  align='center' class='header_laporan'>Tgl Ver RAB</td>
	 <td width='100'  align='center' class='header_laporan'>Jam Ver RAB</td>
	 <td width='80'  align='center' class='header_laporan'>Status Ver RAB</td>
	 <td width='100'  align='center' class='header_laporan'>Nomor Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai OR Proyek</td>
	 <td width='90'  align='center' class='header_laporan'>SHU Proyek</td>
	 <td width='100'  align='center' class='header_laporan'>No Approval</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal Approval</td>
	 <td width='80'  align='center' class='header_laporan'>Satus Approval</td>
	 
	  </tr>  ";
		$nilai=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai-$row->nilai_or;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenRab('$row->no_rab','$row->kode_lokasi');\">$row->no_rab</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_rab</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->nama_jenis</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai-$row->nilai_or,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>$row->tgl_input</td>
	  <td class='isi_laporan' align='center'>$row->status_ver</td>
	   <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_proyek,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->or_proyek,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_proyek-$row->or_proyek,0,",",".")."</td>
	  <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	  <td class='isi_laporan'>$row->status_app</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='12'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
