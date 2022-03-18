<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptJuJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$AddOnLib=new server_util_AddOnLib();	
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR JURNAL",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center'  bgcolor='#dbeef3'>
    <td class='header_laporan'>Doc</td>
    <td class='header_laporan' width='100' rowspan='2'>Account No.</td>
    <td class='header_laporan' width='200' rowspan='2'>&nbsp;</td>
    <td class='header_laporan' width='40'>Cost</td>
    <td class='header_laporan' width='40'>Cash</td>
    <td class='header_laporan' width='40' rowspan='2'>Curr.</td>
    <td class='header_laporan' width='95' rowspan='2'>Original Amount</td>
    <td class='header_laporan' colspan='2'> Local Amount</td>
    <td class='header_laporan' width='250' rowspan='2'>Description</td>
    <td class='header_laporan' width='65' rowspan='2'>User ID</td>
  </tr>
  <tr align='center' bgcolor='#dbeef3'>
    <td class='header_laporan' width='30'>Seq.</td>
    <td class='header_laporan' width='40'>Center</td>
    <td class='header_laporan' width='40'>Flow</td>
    <td class='header_laporan' width='80'>Debit</td>
    <td class='header_laporan' width='80'>Credit</td>
  </tr>
 ";
		$sql="select a.no_dokumen,a.nama,a.kode_lokasi,isnull(b.debet,0) as debet,isnull(b.kredit,0) as kredit,b.periode
from sju_dokumen a
inner join (select distinct dbo.fnDokumen(a.no_ju) jenis,a.kode_lokasi,sum(case when a.dc='D' then a.nilai else 0 end) as debet,sum(case when a.dc='C' then a.nilai else 0 end) as kredit,a.periode
			from ju_j a
			$this->filter
		    group by dbo.fnDokumen(a.no_ju),a.kode_lokasi,a.periode
			)b on a.no_dokumen=b.jenis and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
 ";
		$rs = $dbLib->execute($sql);
		
		$i=1;
		$tot_debet=0;$tot_kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tot_debet=$tot_debet+$row->debet;
			$tot_kredit=$tot_kredit+$row->kredit;
			
			echo " <tr>
    <td colspan='7' class='header_laporan'>Document Type : $row->no_dokumen - $row->nama</td>
	<td class='isi_laporan' align='right'>".number_format($row->debet,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->kredit,2,',','.')."</td>
	<td colspan='2'>&nbsp;</td>
  </tr>";
			$sql="select distinct no_ju,tanggal,date_format(tanggal,'%d/%m/%Y') as tgl,no_dokumen,kode_lokasi
				from ju_j
				where periode='$row->periode' and kode_lokasi='$row->kode_lokasi' and dbo.fnDokumen(no_ju) ='$row->no_dokumen'
				order by tanggal ";
			$rs1 = $dbLib->execute($sql);
			$j=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr>
					<td  class='header_laporan' class='header_laporan' colspan='10'>Doc. No. : $j $row1->tgl $row1->no_ju</td>
					
					<td>&nbsp;</td>
				  </tr>";
				$sql="select a.kode_akun,b.nama as nama_akun,a.nilai,a.keterangan,isnull(a.debet,0) as debet,isnull(a.kredit,0) as kredit,a.kode_curr,a.nik_user
					  from (select kode_lokasi,kode_akun,dc,nilai,keterangan,case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit,kode_curr,nik_user
							from ju_j
							where periode='$row->periode' and kode_lokasi='$row->kode_lokasi' and dbo.fnDokumen(no_ju) ='$row->no_dokumen' and no_ju='$row1->no_ju'
							)a 
					  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					order by a.dc desc";
				$rs2 = $dbLib->execute($sql);
				$k=1; 
				$debet=0;$kredit=0;
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{ 
					$debet=$debet+$row2->debet;
					$kredit=$kredit+$row2->kredit;
					echo "<tr>
						<td class='isi_laporan' align='center'>$k</td>
						<td class='isi_laporan'>".$AddOnLib->fnAkun($row2->kode_akun)."</td>
						<td class='isi_laporan'>$row2->nama_akun</td>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan'>$row->kode_curr</td>
						<td class='isi_laporan' align='right'>".number_format($row2->nilai,2,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row2->debet,2,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row2->kredit,2,',','.')."</td>
						<td class='isi_laporan'>$row2->keterangan</td>
						<td class='isi_laporan'>$row2->nik_user</td>
					  </tr>";
					$k=$k+1;
				}
				echo "<tr>
					<td colspan='7' align='center' class='header_laporan' >Total / Document No.</td>
					<td class='header_laporan' align='right'>".number_format($debet,2,',','.')."</td>
					<td class='header_laporan' align='right'>".number_format($kredit,2,',','.')."</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				  </tr>";
				$j=$j+1;
			}
		
			$i=$i+1;
		}
		echo " <tr>
    <td colspan='7' align='center' class='header_laporan'>Grand Total</td>
    <td class='header_laporan' align='right'>".number_format($tot_debet,2,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($tot_kredit,2,',','.')."</td>
    <td colspan='2'>&nbsp;</td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
