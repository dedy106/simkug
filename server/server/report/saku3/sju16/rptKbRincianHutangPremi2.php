<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptKbRincianHutangPremi2 extends server_report_basic
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
		$sql="select distinct a.no_bukti as no_bukti,a.keterangan,a.tanggal,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,c.nama as nama_lokasi
		from trans_m a 
		inner join lokasi c on a.kode_lokasi=c.kode_lokasi
		left join sju_polisbayar_d d on a.no_bukti=d.no_kashut and a.kode_lokasi=d.kode_lokasi
        $this->filter and a.form='BYR_PREMI'
		order by a.no_bukti ";
		
		$rs = $dbLib->execute($sql);
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			if (substr($row->no_bukti,0,2)=="BK") { $judul="BUKTI PEMBUKUAN BANK KELUAR";}
			if (substr($row->no_bukti,0,2)=="KK") { $judul="BUKTI PEMBUKUAN LAS KELUAR";}
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1' >
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td class='style16'>PT Sarana Janesia Utama </td>
          </tr>
          <tr>
            <td class='style16'>$row->nama_lokasi</td>
          </tr>
        </table></td>
        <td width='200' align='center'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td align='center' class='istyle15'>KUG 303B</td>
          </tr>
          <tr>
            <td align='center' class='istyle15'>$row->no_bukti</td>
          </tr>
          <tr>
            <td align='center' class='istyle15'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>$judul</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>NO</td>
        <td width='100' class='header_laporan'>NO AKUN </td>
        <td width='200' class='header_laporan'>NAMA AKUN </td>
        <td width='270' class='header_laporan'>KETERANGAN</td>
		<td width='80' class='header_laporan'>NO REGISTER</td>
        <td width='100' class='header_laporan'>DEBET</td>
        <td width='100' class='header_laporan'>KREDIT</td>
       </tr>";
	 $sql1="select a.kode_akun,b.nama as nama_akun,a.nilai,a.keterangan,case when a.dc='D' then isnull(a.nilai,0) else 0 end as debet,
				case when a.dc='C' then isnull(a.nilai,0) else 0 end as kredit,a.kode_curr,a.no_dokumen
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$row->kode_lokasi' and a.no_bukti='$row->no_bukti'
			order by a.dc desc";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,2,',','.');
			$kredit=number_format($row1->kredit,2,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>".$AddOnLib->fnAkun($row1->kode_akun)."</td>
				<td class='isi_laporan'>$row1->nama_akun</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan'>$row1->no_dokumen</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,2,',','.');
		$tot_kredit1=number_format($tot_kredit,2,',','.');
	  echo "<tr>
   
    <td colspan='5' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>Dibuat Oleh : </td>
        <td width='200' align='center'>Diperiksa Oleh : </td>
        <td width='200' align='center'>Diinput Oleh : </td>
        <td width='200' rowspan='3'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        </tr>
      <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='300'>Lembar ke 1 untuk Bag. Keuangan / Akuntansi</td>
        <td width='500'>Lembar ke 2 untuk Penerima </td>
      </tr>
    </table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			
			$n_premi=0; $n_biaya=0; $n_fee=0; $n_ppn=0; $n_pph=0; $n_hutang=0;
			$n_premi2=0; $n_biaya2=0; $n_fee2=0; $n_ppn2=0; $n_pph2=0; $n_hutang2=0;
			$kode_curr="";
			echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='50%' class='style16'> </td>
          <td width='50%' align='right' class='style16'>ISRCPR</td>
        </tr>
        <tr>
          <td class='style16'>$row->nama_lokasi</td>
          <td>&nbsp;</td>
        </tr>
      </table></td>
  </tr>
  
  <tr>
    <td align='center' class='istyle17'>RINCIAN KASBANK </td>
  </tr>
   <tr>
    <td><table width='800' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
			<tr bgcolor='#CCCCCC'>
			<td width='20' class='header_laporan' align='center' >No</td>
    <td width='90' class='header_laporan'  align='center'>No Polis </td>
    <td width='200' class='header_laporan'  align='center'>Penerimaan Premi</td>
	<td width='60' class='header_laporan'  align='center'>Tanggal</td>
	<td width='60' class='header_laporan'  align='center'>PPW Polis</td>
    <td width='60' class='header_laporan'  align='center'>Selisih Hari</td>
  </tr>
 ";
			
			$sql1="select a.no_bukti,e.keterangan as polis,d.no_bukti as premi,a.kode_lokasi,CONVERT(varchar, a.tanggal, 105) as tgl,
			CONVERT(varchar, e.due_date, 105) as due,DATEDIFF(DAY,e.due_date,a.tanggal) as selisih
			 from trans_m a 
			inner join sju_polisbayar_d d on a.no_bukti=d.no_kashut and a.kode_lokasi=d.kode_lokasi
			 inner join sju_polis_termin e on d.no_bill=e.no_bill and d.kode_lokasi=e.kode_lokasi and d.no_polis=e.no_polis
			where a.no_bukti='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi' ";
	
			$rs1 = $dbLib->execute($sql1);
			$debet=0; $kredit=0;$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				
				$debet+=$row1->debet;
				$kredit+=$row1->kredit;
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->polis</td>
				<td class='isi_laporan'>$row1->premi</td>
				<td class='isi_laporan'>$row1->tgl</td>
				<td class='isi_laporan'>$row1->due</td>
				<td class='isi_laporan'>$row1->selisih</td>
			  </tr>";
				$i=$i+1;
			}
		      echo "
    </table></td>
  </tr>
 
</table>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
