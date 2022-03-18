<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlBukuBesarProduksi extends server_report_basic
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
		$sql="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$tmp="";
		
		if ($mutasi=="Tidak")
		{
			$tmp=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal,a.periode,case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit
				from glma_tmp a $this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("buku besar",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='2' height='30' class='header_laporan'>Account No. :</td>
    <td colspan='9' class='header_laporan'>".$AddOnLib->fnAkun($row->kode_akun)." - ".$row->nama."</td>
  </tr>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='30' class='header_laporan'>No.</td>
    <td width='60' class='header_laporan'>Date</td>
	<td width='30' class='header_laporan'>Lokasi</td>
    <td width='100' class='header_laporan'>Document No.</td>
	
    <td width='300' class='header_laporan'>Description</td>
	<td width='40' class='header_laporan'>COB</td>
	<td width='150' class='header_laporan'>Insurer</td>
	<td width='150' class='header_laporan'>Insured</td>
	<td width='90' class='header_laporan'>Debit</td>
    <td width='90' class='header_laporan'>Credit</td>
    <td width='90' class='header_laporan'>Net Change</td>
  </tr>";
			echo " <tr>
    
    <td colspan='8' class='header_laporan' align='right'>Opening Balance</td>
    <td class='header_laporan' align='right'>".number_format($row->so_debet,2,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($row->so_kredit,2,',','.')."</td>
    <td>&nbsp;</td>
  </tr>";
	 $sql1="select a.kode_akun,a.kode_lokasi,b.nama as nama_akun,a.nilai,a.keterangan,isnull(a.debet,0) as debet,isnull(a.kredit,0) as kredit,a.kode_curr,a.tgl,a.no_bukti,a.periode,
				a.kode_proyek,a.kode_cust,a.kode_vendor,a.nama_cust,a.nama_vendor
					  from (select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.dc,a.nilai,a.keterangan,a.periode,a.kode_curr,date_format(a.tanggal,'%d/%m/%Y') as tgl,
								   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,
								   a.kode_cust,a.kode_vendor,a.kode_proyek,b.nama as nama_cust,c.nama as nama_vendor
							from gldt_h a
							left join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
							left join sju_vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
							where a.periode='$row->periode' and a.kode_akun='$row->kode_akun'
							union
							select a.kode_lokasi,a.no_bukti,a.tanggal,a.kode_akun,a.dc,a.nilai,a.keterangan,a.periode,a.kode_curr,date_format(a.tanggal,'%d/%m/%Y') as tgl,
								   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,
								   a.kode_cust,a.kode_vendor,a.kode_proyek,b.nama as nama_cust,c.nama as nama_vendor
							from gldt a
							left join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
							left join sju_vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
							where a.periode='$row->periode' and a.kode_akun='$row->kode_akun'
							)a 
					  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					order by a.tanggal ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		
		$saldo=$row->so_awal; $tot_debet=0;$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			$saldo=$saldo + $row1->debet - $row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->tgl</td>
				<td class='isi_laporan' align='center'>$row1->kode_lokasi</td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi');\">$row1->no_bukti</a></td>";
				echo "<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan'>$row1->kode_proyek</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->kredit,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($saldo,2,',','.')."</td>
			  </tr>";
				$i=$i+1;
		}
		$saldo_debet=""; $saldo_kredit="";
		if ($saldo>=0)
		{
			$saldo_debet=$saldo;
		}
		else
		{
			$saldo_kredit=$saldo;
		}
	  echo " <tr>
    <td colspan='8' align='right' class='header_laporan'>Total Month</td>
  <td class='header_laporan' align='right'>".number_format($tot_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>&nbsp;</td>
  </tr>";
	  echo " <tr>
    <td colspan='8' align='right' class='header_laporan'>Transaction</td>
  <td class='header_laporan' align='right'>".number_format($tot_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_debet-$tot_kredit,2,',','.')."</td>
  </tr>";
	  echo " <tr>
    <td colspan='8' align='right' class='header_laporan'>Ending Balance</td>
  <td class='header_laporan' align='right'>".number_format($saldo_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($saldo_kredit,2,',','.')."</td>
	<td class='header_laporan' align='right'>&nbsp;</td>
  </tr>";
			echo "<br>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
