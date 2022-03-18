<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_optik_rptInvo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$sql="select a.no_tagih,a.no_dokumen,a.keterangan,a.kode_mitra,convert(varchar(20),a.tanggal,103) as tgl,
		b.nama as mitra
		from optik_tagih_m a
		inner join optik_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi		
$this->filter
order by a.no_tagih ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan invoice",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='8' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Bill</td>
        <td width='360' class='header_laporan'>: $row->no_tagih</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>No Dokumen</td>
        <td width='360' class='header_laporan'>: $row->no_dokumen</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Mitra </td>
        <td class='header_laporan'>: $row->kode_mitra - $row->mitra</td>
      </tr>
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='50' class='header_laporan' align='center'>Status</td>
    <td  width='100' class='header_laporan' align='center'>No Resep</td>
    <td  width='100' class='header_laporan' align='center'>No Nota</td>
		<td  width='50' class='header_laporan' align='center'>Tanggal</td>
		<td  width='50' class='header_laporan' align='center'>NIK</td>
    <td  width='100' class='header_laporan' align='center'>Pasien</td>
    <td  width='100' class='header_laporan' align='center'>Cabang</td>
    <td  width='90' class='header_laporan' align='center'>Nilai</td>
  </tr>";
			
			$sql="select case when a.progress='2' then 'APPROVE' else 'INPROG' end as sts,a.no_tagih,a.no_bukti,a.kode_pp,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.nik,a.pasien,a.app_blen+a.app_bfr as nilai 
			from optik_pesan_m a
			inner join optik_tagih_m b on a.no_tagih=b.no_tagih and a.kode_lokasi=b.kode_lokasi
			where a.no_tagih='$row->no_tagih'
			order by a.no_tagih ";

			$rs1 = $dbLib->execute($sql);
			$saldo_paket=$row->paket;
			$saldo_tambahan=$row->tambahan;
			$nilai_p=0;
			$nilai_t=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$nilai_p+=$row1->nilai;
				echo "<tr>
				<td class='isi_laporan'>$row1->sts</td>
				<td class='isi_laporan'>$row1->no_bukti</td>
				<td class='isi_laporan'>$row1->no_dokumen</td>
				<td class='isi_laporan'>$row1->tgl</td>
				<td class='isi_laporan'>$row1->nik</td>
				<td class='isi_laporan'>$row1->pasien</td>
				<td class='isi_laporan'>$row1->kode_pp</td>
						 <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td  colspan='7' valign='top' class='header_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($nilai_p,0,',','.')."</td>
 </tr>
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
