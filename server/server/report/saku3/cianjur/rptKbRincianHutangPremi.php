<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_cianjur_rptKbRincianHutangPremi extends server_report_basic
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
		$sql="select distinct a.no_bukti as no_bukti,a.keterangan,a.tanggal,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,c.nama as nama_lokasi
		from trans_m a 
		inner join lokasi c on a.kode_lokasi=c.kode_lokasi
		left join piutang_d d on a.no_bukti=d.no_piutang and a.kode_lokasi=d.kode_lokasi 
		$this->filter and a.form='KBMULTI'
		order by a.no_bukti ";
		
		$rs = $dbLib->execute($sql);
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			if (substr($row->no_bukti,0,2)=="BK") { $judul="BUKTI PEMBUKUAN BANK KELUAR";}
			if (substr($row->no_bukti,0,2)=="KK") { $judul="BUKTI PEMBUKUAN KAS KELUAR";}
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1' >
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td class='style16'>KOPEGTEL CIANJUR </td>
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
	 $sql1="select a.kode_akun,b.nama as nama_akun,a.nilai,a.keterangan,case when a.dc='D' then isnull(a.nilai,0) else 0 end as debet,case when a.dc='C' then isnull(a.nilai,0) else 0 end as kredit,a.kode_curr,a.no_dokumen
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
			
			$n_tagihan=0; $n_nilai=0; $n_ppn=0;
	
			echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='50%' class='style16'>KOPEGTEL CIANJUR </td>
          <td width='50%' align='right' class='style16'>ISRCPR</td>
        </tr>
        <tr>
          <td class='style16'>$row->nama_lokasi</td>
          <td>&nbsp;</td>
        </tr>
      </table></td>
  </tr>
  
  <tr>
    <td align='center' class='istyle17'>RINCIAN HUTANG PROYEK </td>
  </tr>
  <tr>
    <td class='istyle15' >No Bukti : $row->no_bukti</td>
  </tr>
  <tr>
    <td class='istyle15'>Tanggal  : $row->tgl</td>
  </tr>
  <tr>
    <td><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr>
			<td width='30'  align='center' class='header_laporan'>No</td>
			<td width='150'  align='center' class='header_laporan'>No Bukti</td>
			<td width='150'  align='center' class='header_laporan'>No Faktur Pajak</td>
			<td width='200'  align='center' class='header_laporan'>Keterangan</td>
			<td width='90'  align='center' class='header_laporan'>Kode Customer</td>
			<td width='90'  align='center' class='header_laporan'>Nama Customer</td>
			<td width='90'  align='center' class='header_laporan'>Kode Proyek</td>
			<td width='90'  align='center' class='header_laporan'>Nama Proyek</td>
			<td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
			<td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
		  <td width='90'  align='center' class='header_laporan'>Total</td>
      </tr>";
		$sql="select no_ref1 from trans_j 
		where dc='C'
		and no_bukti='$row->no_bukti' and kode_lokasi='$row->kode_lokasi' ";
		
		// $premi3=0; $biaya3=0; $fee3=0; $ppn3=0; $pph3=0; $hutang3=0;
		$rs1 = $dbLib->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td colspan='13' class='header_laporan'>$row1->no_ref1</td>
        </tr>
      <tr>";
			$sql="select a.no_bukti, a.keterangan, a.no_ref1, a.param1, b.kode_project, c.nama as proyek,d.nama as cust, c.nilai as nilai_proyek, b.nilai as tagihan,
			b.nilai_ppn,b.nilai+b.nilai_ppn as total
			from trans_m a
			inner join piutang_d b on a.no_bukti=b.no_piutang and a.kode_lokasi=b.kode_lokasi
			inner join pr_proyek c on b.kode_project=c.kode_proyek and c.kode_lokasi=b.kode_lokasi
			inner join cust d on b.kode_cust=d.kode_cust and d.kode_lokasi=b.kode_lokasi
			where a.no_bukti='$row1->no_ref1' and a.kode_lokasi='$row->kode_lokasi' 
			order by a.no_bukti ";
			
			$rs2 = $dbLib->execute($sql);
			$j=1;
			$tagihan=0;$nilai_ppn=0;$total=0;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				$tagihan=$tagihan+$row2->tagihan;
				$nilai_ppn=$nilai_ppn+$row2->nilai_ppn;
				$total=$total+$row2->total;
				
				echo "<td class='isi_laporan' align='center'>$j</td>
				<td class='isi_laporan'>$row2->no_bukti</td>
				<td class='isi_laporan'>$row2->no_ref1</td>
				<td class='isi_laporan'>$row2->keterangan</td>
				<td class='isi_laporan'>$row2->param1</td>
				<td class='isi_laporan'>$row2->cust</td>
				<td class='isi_laporan'>$row2->kode_project</td>
				<td class='isi_laporan'>$row2->proyek</td>
				<td class='isi_laporan' align='right'>".number_format($row2->tagihan,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nilai_ppn,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->total,0,',','.')."</td>
		  </tr>";
				$j=$j+1;
			}
				$n_tagihan+=$tagihan;
				$n_ppn+=$nilai_ppn;
				$n_nilai+=$total;
				
			  echo "<tr >
				<td class='header_laporan' align='center' colspan='8'>Total</td>
				<td class='header_laporan' align='right'>".number_format($tagihan,0,',','.')."</td>
				<td class='header_laporan' align='right'>".number_format($nilai_ppn,0,',','.')."</td>
				<td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
				</tr>";
		}
				echo "<tr >
				<td class='header_laporan' align='center' colspan='8'>Total</td>
				<td class='header_laporan' align='right'>".number_format($tagihan,0,',','.')."</td>
				<td class='header_laporan' align='right'>".number_format($nilai_ppn,0,',','.')."</td>
				<td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
				</tr>";
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
