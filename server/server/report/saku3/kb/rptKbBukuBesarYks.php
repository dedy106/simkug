<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kb_rptKbBukuBesarYks extends server_report_basic
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
		$sql="exec sp_kas_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$tmp="";
		
		if ($mutasi=="Tidak")
		{
			$tmp=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,b.kode_rek,b.nama as nama_rek,b.kode_bank,c.nama as nama_bank,b.jenis,
						case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,
						case when a.so_awal<0 then a.so_awal else 0 end as so_kredit
				from glma_tmp a 
				inner join bank_rek b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.kode_bank=b.kode_rek
				inner join bank c on b.kode_bank=c.kode_bank
				$this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("buku kasbank",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='9' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Kode Rekening  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_rek</td>
                  </tr>
                   <tr>
                    <td class='header_laporan' width='100'>Nama Rekening  </td>
                    <td class='header_laporan' >:&nbsp;$row->nama_rek</td>
                  </tr>
                  <tr>
                    <td class='header_laporan' width='100'>Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun - $row->nama</td>
                  </tr>
                  
				  <tr>
                    <td class='header_laporan'>Bank </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_bank - $row->nama_bank</td>
                  </tr>
				  <tr>
                    <td class='header_laporan'>Jenis </td>
                    <td class='header_laporan'>:&nbsp;$row->jenis</td>
                  </tr>
                </table></td>
     </tr>
 
  <tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='80' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='60' class='header_laporan' align='center'>Kode PP</td>
    <td width='80' class='header_laporan' align='center'>Kode DRK</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>";
			$sql="select a.no_kas as no_bukti,a.no_dokumen,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,
	   case when a.dc='D' then nilai else 0 end as debet,
	   case when a.dc='C' then nilai else 0 end as kredit 
  from kas_j a 
	  where a.kode_lokasi='$row->kode_lokasi' and a.kode_bank='$row->kode_rek' $var_periode 	  
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
    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' >".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
