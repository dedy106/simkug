<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlBukuBesarSpmProyek extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$mutasi=$tmp[3];
		$var_periode=$tmp[4];
		$jenis=$tmp[5];
		$nama_file="buku_besar.xls";
		
		$tahun=substr($periode,0,4);
		$periode_awal=$tahun."01";
		//$sql="exec sp_glma_dw_tmp '$kode_lokasi','$periode_awal','$nik_user' ";
		$sql="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
	
		$rs = $dbLib->execute($sql);		
		$tmp="";
		
		if ($mutasi=="Tidak")
		{
			$tmp=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,b.nama as nama_lokasi,
					case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,
					case when a.so_awal<0 then a.so_awal else 0 end as so_kredit
				from glma_tmp a
				inner join lokasi b on a.kode_lokasi=b.kode_lokasi 
				$this->filter and a.nik_user='$nik_user' 
				order by a.kode_akun";
		
		if ($jenis=="Excel")
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
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("buku besar proyek",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='13' style='padding:5px'>
	<table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Kode Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                   <tr>
                    <td class='header_laporan'>Lokasi </td>
                    <td class='header_laporan'>:&nbsp;$row->nama_lokasi</td>
                  </tr>
                </table></td>
     </tr>
 
  <tr>
    <td height='23' colspan='12' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='80' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
	<td width='60' class='header_laporan' align='center'>Kode PP</td>
	<td width='60' class='header_laporan' align='center'>Kode Cust / Vendor</td>
	<td width='150' class='header_laporan' align='center'>Nama Customer / Vendor</td>
	<td width='150' class='header_laporan' align='center'>Alamat</td>
	<td width='80' class='header_laporan' align='center'>No Proyek</td>
	<td width='150' class='header_laporan' align='center'>Nama Proyek</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>";
			$sql="select a.no_bukti,a.no_dokumen,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,
			b.kode_proyek,c.nama as nama_proyek,
			case when b.kode_cust='-' then e.kode_vendor else b.kode_cust end as kode_cust,
			case when b.kode_cust='-' then e.nama else d.nama end as nama_cust,
			case when b.kode_cust='-' then e.alamat else d.alamat end as alamat,
	   case when a.dc='D' then a.nilai else 0 end as debet,
	   case when a.dc='C' then a.nilai else 0 end as kredit 
from (select a.kode_lokasi,a.no_bukti,a.no_dokumen,a.periode,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from gldt_h a 
	  where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun'  $var_periode	  
	  union all 
	  select a.kode_lokasi,a.no_bukti,a.no_dokumen,a.periode,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai,a.keterangan 
	  from gldt a  
	  where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun' $var_periode
	 )a 
	 left join (select no_piutang as no_bukti,kode_proyek,kode_lokasi,kode_cust,'-' as kode_vendor
				from spm_piutang_m
				where kode_lokasi='$kode_lokasi'
				union
				select a.no_reklas as no_bukti,a.ref1 as kode_proyek,a.kode_lokasi,'-' as kode_cust,'-' as kode_vendor
				from spm_proyek_reklas_m a
				inner join spm_proyek b on a.ref1=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and a.ref1 is not null
				union
				select no_hutang as no_bukti,kode_proyek,kode_lokasi,'-' as kode_cust,'-' as kode_vendor
				from hutang_m
				where kode_lokasi='$kode_lokasi' 
				union
				select a.no_pb as no_bukti,a.kode_proyek,a.kode_lokasi,'-' as kode_cust,b.kode_vendor
				from yk_pb_m a 
				inner join yk_pb_d b on a.no_pb=b.no_pb and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' 
				) b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
	 left join spm_proyek c on b.kode_proyek=c.kode_proyek and b.kode_lokasi=c.kode_lokasi
	 left join cust d on b.kode_cust=d.kode_cust and b.kode_lokasi=d.kode_lokasi
	 left join vendor e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi
	 order by a.tanggal  ";
			
	 		$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode');\">$row1->no_bukti</a>";
				echo "</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='23' valign='top' class='isi_laporan'>$row1->tgl</td>
 
    <td valign='top' class='isi_laporan' >$row1->kode_pp</td>
	<td valign='top' class='isi_laporan' >$row1->kode_cust</td>
	<td valign='top' class='isi_laporan' >$row1->nama_cust</td>
	<td valign='top' class='isi_laporan' >$row1->alamat</td>
	<td valign='top' class='isi_laporan' >$row1->kode_proyek</td>
	<td valign='top' class='isi_laporan' >$row1->nama_proyek</td>
	   <td valign='top' class='isi_laporan'>$row1->keterangan</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='11' valign='top' class='header_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
 </tr>
 <tr>
   <td height='23' colspan='11' valign='top' class='header_laporan' align='right'>Mutasi&nbsp;</td>
   
   <td valign='top' class='header_laporan' align='right'>".number_format($debet-$kredit,0,',','.')."</td>
 </tr>
 <tr>
   <td height='23' colspan='11' valign='top' class='header_laporan' align='right'>Saldo Akhir&nbsp;</td>
  
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>
 </table><br>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
