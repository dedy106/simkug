<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptBukuBesarPdpt extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql = "select 1 ";
		
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
		
		$nama_lokasi=$this->lokasi;
		$sql="select nama from lokasi where kode_lokasi='$kode_lokasi' ";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		
		$rs = $dbLib->execute($sql);		
		
		$tmp="";
		
		$sql = "select a.periode,a.kode_lokasi,a.kode_akun,b.nama from spm_piutang_j a 
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
				$this->filter 
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
		echo $AddOnLib->judul_laporan("detail akun pendapatan",$nama_lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='9' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Kode Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  
                </table></td>
     </tr>

  <tr bgcolor='#CCCCCC'>
    <td width='80' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='80' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='60' class='header_laporan' align='center'>Kode PP</td>
    <td width='80' class='header_laporan' align='center'>Kode Customer</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
  </tr>";
			$sql="select a.kode_cust,a.no_piutang,a.no_dokumen,a.periode,convert(varchar(20),a.tanggal,105) as tgl,a.kode_akun,a.kode_pp,a.keterangan,
			case when a.dc='D' then nilai else 0 end as debet,
			case when a.dc='C' then nilai else 0 end as kredit 
	 from (select b.kode_cust,a.no_piutang,a.kode_lokasi,a.no_dokumen,a.periode,a.tanggal,a.kode_akun,a.kode_pp,a.dc,a.nilai,a.keterangan 
		   from spm_piutang_j a 
		   inner join spm_piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$row->kode_lokasi' and a.kode_akun='$row->kode_akun'  and a.periode='$row->periode'   		 
		  )a order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
				<td valign='top' class='isi_laporan'>".$row1->no_piutang."</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' >".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_cust."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
 </tr></table><br>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
