<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptPdRekapTu2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
	
		$sql="select substring(a.periode,1,4) as tahun,a.nik_spj,c.nama,a.kode_pp,d.nama as pp,case a.jenis_pd when 'DN' then 'DALAM NEGERI' else 'LUAR NEGERI' end as jenis_pd
		,e.kota
		,round(sum(b.uhar),0) as uhar,round(sum(b.utrans),0) as utrans,round(sum(b.ulain),0) as ulain
		,f.kode_drk,f.kode_akun,g.nama as nama_akun,isnull(h.nama,'-') as nama_drk
		,f.kode_pp as kodepp_gar, i.nama as namapp_gar
		from tu_pdaju_m a 
		inner join karyawan c on a.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi
		inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
		inner join tu_pdapp_m e on a.no_app=e.no_app
		inner join angg_r f on e.no_aju=f.no_bukti and f.modul='ITKBAJU'
		inner join masakun g on f.kode_akun=g.kode_akun and f.kode_lokasi=g.kode_lokasi
		inner join pp i on f.kode_pp=i.kode_pp and f.kode_lokasi=i.kode_lokasi
		left join drk h on f.kode_drk=h.kode_drk and f.kode_lokasi=h.kode_lokasi and substring(f.periode1,1,4)=h.tahun
		
		inner join 
		(
		select 
		a.no_spj, 
		case b.jenis when '1' then sum(a.total) else 0 end as uhar,
		case b.jenis when '2' then sum(a.total) else 0 end as utrans,
		case b.jenis when '3' then sum(a.total) else 0 end as ulain
		from tu_pdaju_d a 
		inner join tu_pd_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='$lokasi' 
		group by b.jenis,a.no_spj
		)  b on a.no_spj=b.no_spj 
		$this->filter
		group by a.nik_spj,a.jenis_pd,a.kode_pp,c.nama,d.nama,f.kode_drk,f.kode_akun,f.kode_pp,i.nama,g.nama,h.nama,e.kota,a.periode
		order by a.nik_spj
		 ";

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap perjalanan dinas per karyawan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>NIK</td>
	 <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Tahun</td>
	 <td width='100'  align='center' class='header_laporan'>PP</td>
	 <td width='150'  align='center' class='header_laporan'>Jenis PD</td>
     <td width='60'  align='center' class='header_laporan'>Kota Tujuan</td>
	 <td width='150'  align='center' class='header_laporan'>Uang Harian Dalam Negri</td>
	 <td width='150'  align='center' class='header_laporan'>Uang Harian Luar Negri</td>
	 <td width='150'  align='center' class='header_laporan'>Uang Lain-lain</td>
	 <td width='80'  align='center' class='header_laporan'>Tarif Transportasi</td>
	 <td width='100'  align='center' class='header_laporan'>Total</td>
	 <td width='100'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='100'  align='center' class='header_laporan'>Kode DRK</td>
     </tr>  ";
		$total=0; $total1=0; $total2=0; $total3=0; $totdn=0;$totln=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->uhar+$row->ulain+$row->utrans;
			$total1+=$row->uhar;
			$total2+=$row->ulain;
			$total3+=$row->utrans;
			$total4+=$total;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->nik_spj</td>
	 <td class='isi_laporan' >$row->nama</td>
	  <td class='isi_laporan' align='center'>$row->tahun</td>
	  <td class='isi_laporan' align='center'>$row->kodepp_gar</td>
	  <td class='isi_laporan' >$row->jenis_pd</td>
	  <td class='isi_laporan' >$row->kota</td>";
	  if($row->jenis_pd == "dalam negeri"){
		  $totdn+=$row->uhar;
		echo"
		<td class='isi_laporan' align='right'>".number_format($row->uhar,0,",",".")."</td>";
		echo"
		<td class='isi_laporan' align='right'>0</td>";
	  }else{
		$totln+=$row->uhar;
		echo"
		<td class='isi_laporan' align='right'>0</td>";
		echo"
		<td class='isi_laporan' align='right'>".number_format($row->uhar,0,",",".")."</td>";
	  }
	  echo"
	 <td class='isi_laporan' align='right'>".number_format($row->ulain,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->utrans,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>$row->kode_akun</td>
	 <td class='isi_laporan' align='center'>$row->kode_drk</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($totdn,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($totln,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($total3,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($total4,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
