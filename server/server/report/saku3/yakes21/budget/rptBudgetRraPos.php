<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetRraPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[0];
		// $nama_cab=$tmp[1];
		$jenis_file=$tmp[1];
		$nama_file="AggPosTu.xls";
		
		$sql="select a.no_pdrk,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_lokasi, 
		case when a.sts_pdrk <> 'RRLC' then d.no_app else upper('RRA RELEASE') end as no_app,convert(varchar,d.tgl_input,120) as tgl_app,isnull(g.nilai,0) as nilai,
			upper (
			case when a.sts_pdrk <> 'RRLC' then	
				case when a.progress='0' then 'Pengajuan' 
				 	 when a.progress='1' then 'Verifikasi' 
				 	 when a.progress='K' then 'Return Ver' 
				 	 when a.progress='X' then 'Not App Ver' 
				     when a.progress='2' then 'Approve' 
				     when a.progress='A' then 'Return Apprval' 
				     when a.progress='Z' then 'Not Apprval' 
				else '-' end
			else 'RRA RELEASE' end
			) as status,
		a.nik_buat,b.nama as nama_buat,case when a.sts_pdrk <> 'RRLC' then d.nik_buat else a.nik_app1 end as nik_app,h.nama as nama_app
		from rra_pdrk_m a  
		left join karyawan b on a.nik_buat=b.nik 
		left join rra_app_m d on a.no_app2=d.no_app 
		left join karyawan h on case when a.sts_pdrk <> 'RRLC' then d.nik_buat else a.nik_app1 end=h.nik 
		left join (select no_pdrk,sum(nilai) as nilai	
				from rra_pdrk_d 
				where dc='D'
				group by no_pdrk
				)g on a.no_pdrk=g.no_pdrk 
		$this->filter
		order by a.no_pdrk";

		if ($jenis_file=="Excel")
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

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pengajuan rra",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No RRA</td>
	 <td width='50'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>NIK Pembuat</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	  <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>No App</td>
	 <td width='50'  align='center' class='header_laporan'>Tgl App</td>
	 <td width='60'  align='center' class='header_laporan'>NIK Approval</td>
	 <td width='100'  align='center' class='header_laporan'>Nama Approval</td>
	<td width='50'  align='center' class='header_laporan'>Status</td>
     </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_pdrk','$row->kode_lokasi');\">$row->no_pdrk</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	  <td class='isi_laporan'>$row->nik_buat</td>
	 <td class='isi_laporan'>$row->nama_buat</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	   <td class='isi_laporan'>$row->nik_app</td>
	 <td class='isi_laporan'>$row->nama_app</td>
	 <td class='isi_laporan'>$row->status</td>
   </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='6'>Total</td>
	<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='header_laporan' colspan='5'>&nbsp;</td>
   </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
