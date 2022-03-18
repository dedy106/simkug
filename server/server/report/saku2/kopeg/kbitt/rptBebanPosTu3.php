<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptBebanPosTu3 extends server_report_basic
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
		$nama_file="beban_".$periode.".xls";
		$nama_lap=(isset($tmp[2]) ? $tmp[2] : "posisi pertanggungan beban");
// 		$sql="select distinct a.kode_lokasi,k.no_aju,convert(varchar,k.tgl_aju,103) as tgl,
//         k.no_app,convert(varchar,k.tgl_input,103) as tgl_app1,convert(varchar,k.tgl_aju,103) as tgl_app,	   
//         a.no_ver,convert(varchar,f.tanggal,103) as tgl_ver,
//         a.no_fiat,convert(varchar,g.tanggal,103) as tgl_fiat,
//         case when d.status='1' then 'APPROVE' when d.status='R' then 'REVISI' else d.status end as sts_ver,d.catatan as cat_ver,
//         case when e.status='2' then 'APPROVE' when e.status='R' then 'REVISI' else e.status end as sts_fiat,e.catatan as cat_fiat
//  from it_aju_m a
//  left join it_ajuapp_m k on a.no_aju=k.no_aju and a.kode_lokasi=k.kode_lokasi 
//  left join ver_d d on a.no_aju=d.no_bukti and a.kode_lokasi=d.kode_lokasi
//  left join ver_m f on d.no_ver=f.no_ver and d.kode_lokasi=f.kode_lokasi and convert(varchar,k.tgl_aju,103)=convert(varchar,f.tanggal,103)
//  left join fiat_d e on a.no_aju=e.no_bukti and a.kode_lokasi=e.kode_lokasi 
//  left join fiat_m g on e.no_fiat=g.no_fiat and e.kode_lokasi=g.kode_lokasi  and convert(varchar,k.tgl_aju,103)=convert(varchar,g.tanggal,103)
//         $this->filter  and isnull(convert(varchar,f.tanggal,103),'-') <> '-' ";
		$sql = "select  a.kode_lokasi,k.no_aju,convert(varchar,k.tgl_aju,103) as tgl, k.no_app,convert(varchar,k.tgl_input,103) as tgl_app1,convert(varchar,k.tgl_aju,103) as tgl_app,d.no_ver,convert(varchar,f.tanggal,103) as tgl_ver,f.no_verseb,f.kode_jenis,h.nama,
		case when d.status='1' then 'APPROVE' 
			 when d.status='R' then 'REVISI' else d.status end as sts_ver,
		d.catatan as cat_ver,convert(varchar,g.tanggal,103) as tgl_fiat, 
			case when e.status='2' then 'APPROVE' 
				when e.status='R' then 'REVISI' else e.status end as sts_fiat,
		e.catatan as cat_fiat,isnull(e.no_fiat,'-') as no_fiat 
		from it_aju_m a
		left join it_ajuapp_m k on a.no_aju=k.no_aju and a.kode_lokasi=k.kode_lokasi 
		left join ver_d d on a.no_aju=d.no_bukti and a.kode_lokasi=d.kode_lokasi and k.no_app=d.no_app
		left join ver_m f on d.no_ver=f.no_ver and d.kode_lokasi=f.kode_lokasi 
		left join fiat_d e on a.no_aju=e.no_bukti and a.kode_lokasi=e.kode_lokasi and k.no_app=e.no_app
		left join fiat_m g on e.no_fiat=g.no_fiat and e.kode_lokasi=g.kode_lokasi 
		left join jenis_app h on f.kode_jenis=h.kode_jenis and f.kode_lokasi=h.kode_lokasi 
		$this->filter and isnull(convert(varchar,f.tanggal,103),'-') <> '-' 
		";
        // echo $sql;
		
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
		echo $AddOnLib->judul_laporan($nama_lap,$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Agenda</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	  <td width='90'  align='center' class='header_laporan'>No Dok</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Dok</td>
	 <td width='90'  align='center' class='header_laporan'>No Ver Dok</td>
	 <td width='90'  align='center' class='header_laporan'>Jenis Status</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Dok</td>
	  <td width='40'  align='center' class='header_laporan'>Status Ver Dok</td>
	 <td width='150'  align='center' class='header_laporan'>Catatan Ver Dok</td>
	 <td width='90'  align='center' class='header_laporan'>Flag No Bukti</td>
	  <td width='90'  align='center' class='header_laporan'>No Ver Akun</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver Akun</td>
	  <td width='40'  align='center' class='header_laporan'>Status Ver Akun</td>
	   <td width='150'  align='center' class='header_laporan'>Catatan Ver Akun</td>
	  </tr>  ";
		$bruto=0;$npajak=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$npajak+=$row->npajak;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>$row->no_aju</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app1</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	  <td class='isi_laporan' align='center'>".strtoupper($row->sts_ver)."</td>
	   <td class='isi_laporan'>$row->cat_ver</td>
	   <td class='isi_laporan'>$row->no_verseb</td>";
    //  if($row->sts_ver=="revisi"){
    //  echo"
    //  <td class='isi_laporan'>-</td>
    //  <td class='isi_laporan'>-</td>
    //  <td class='isi_laporan'>-</td>
     
	//   <td class='isi_laporan'>-</td>";
    //  }else{
         
     echo"
     <td class='isi_laporan'>$row->no_fiat</td>
     <td class='isi_laporan'>$row->tgl_fiat</td>
     <td class='isi_laporan' align='center'>".strtoupper($row->sts_fiat)."</td>\
	  <td class='isi_laporan'>$row->cat_fiat</td>";
    //  }
      echo"
	   </tr>";
			$i=$i+1;
		}
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
