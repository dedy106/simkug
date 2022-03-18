<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptGlJurnalBukti3 extends server_report_basic
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
		$jenis=$tmp[2];
		$periode2=$tmp[3];
		$dokumen=$tmp[5];
		$sql="select a.no_bukti,a.tanggal,convert(varchar(20),a.tanggal,103) as tgl,a.periode,a.kode_lokasi,a.nik1,a.nik2,a.nik3,a.param1,
        c.nama as nama1,d.nama as nama2,a.periode,substring(a.periode,1,4) as tahun,
        substring(a.periode,5,2) as bulan,upper(left(datename(month,a.tanggal),3)) as bln
        from trans_m a 
        left join sju_ttd b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
        left join karyawan c on b.nik_buat=c.nik
        left join karyawan d on b.nik_periksa=d.nik
        
		$this->filter 
		order by a.no_bukti ";
		
		$rs = $dbLib->execute($sql);		
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$judul="BUKTI PEMBUKUAN MEMORIAL";
			if (substr($row->no_bukti,0,2)=="BT") { $judul="BUKTI PEMBUKUAN BANK TERIMA";}
			if (substr($row->no_bukti,0,2)=="BK") { $judul="BUKTI PEMBUKUAN BANK KELUAR";}
			if (substr($row->no_bukti,0,2)=="KT") { $judul="BUKTI PEMBUKUAN KAS TERIMA";}
			if (substr($row->no_bukti,0,2)=="KK") { $judul="BUKTI PEMBUKUAN KAS KELUAR";}
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
            <td align='center' class='istyle15'>KUG-PS-0205.1</td>
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
        <td width='90' class='header_laporan'>NO AKUN </td>
        <td width='200' class='header_laporan'>NAMA AKUN </td>
		<td width='60' class='header_laporan'>KODE PP </td>
        <td width='150' class='header_laporan'>NAMA PP </td>
        <td width='270' class='header_laporan'>KETERANGAN</td>
		<td width='80' class='header_laporan'>NO REGISTER</td>
        <td width='90' class='header_laporan'>DEBET</td>
        <td width='90' class='header_laporan'>KREDIT</td>
       </tr>";
	 $sql1="select a.kode_lokasi,a.no_dokumen,a.kode_akun,a.dc,a.nilai,a.keterangan,b.nama as nama_akun,
					case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_curr,
					a.kode_pp,d.nama as nama_pp
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
			where a.periode='$row->periode' and a.kode_lokasi='$row->kode_lokasi' and no_bukti='$row->no_bukti' 
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
				<td class='isi_laporan'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->nama_pp</td>
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
   
    <td colspan='7' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='400' border='1' cellspacing='1' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>Dibuat Oleh : </td>
        <td width='200' align='center'>Diperiksa Oleh : </td>
      </tr>
      <tr>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        </tr>
      <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
	   <tr>
        <td align='center'>$row->nama1 </td>
        <td align='center'>$row->nama2 </td>
        </tr>
    </table></td>
  </tr>
 
  <tr>
    <td>&nbsp;</td>
  </tr>
  
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' rowspan='2' align='center' class='header_laporan'>NO</td>
        <td width='80' rowspan='2' align='center' class='header_laporan'>NO AKUN </td>
        <td width='200' rowspan='2' align='center' class='header_laporan'>NAMA AKUN </td>
		<td width='60' rowspan='2' align='center' class='header_laporan'>KODE PP </td>
        <td align='center' class='header_laporan'>GAR $row->tahun </td>
        <td align='center' class='header_laporan'>GAR SD $row->bln $row->tahun </td>
        <td align='center' class='header_laporan'>REAL SD $row->bln $row->tahun </td>
        <td align='center' class='header_laporan'>DIBUKUKAN SEKARANG </td>
        <td align='center' class='header_laporan'>TOTAL sd SEKARANG </td>
      </tr>";
      echo "<tr bgcolor='#CCCCCC'>
        <td width='90' align='center' class='header_laporan'>1</td>
        <td width='90' align='center' class='header_laporan'>2</td>
        <td width='90' align='center' class='header_laporan'>3</td>
        <td width='90' align='center' class='header_laporan'>4</td>
        <td width='90' align='center' class='header_laporan'>5</td>
      </tr>";
	  $sql="select a.kode_lokasi,a.kode_akun,a.kode_pp,b.nama as nama_akun,a.nilai,a.nilai+isnull(d.n3,0) as nilai_sd,
				   isnull(c.n1,0) as n1,isnull(c.n2,0) as n2,isnull(d.n3,0) as n3
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			left join (select a.kode_akun,a.kode_pp,a.kode_lokasi,
							   sum(a.nilai) as n1,
							   sum(case when substring(a.periode,5,2) between '01' and '$row->bulan' then a.nilai else 0 end) n2
						from anggaran_d a
						where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$row->tahun'
						group by a.kode_akun,a.kode_pp,a.kode_lokasi
					   )c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
			left join (select a.kode_akun,a.kode_pp,a.kode_lokasi,sum(case when a.dc='D' then a.nilai else -nilai end) as n3
						from trans_j a
						where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$row->periode' and a.periode<='$row->tahun' and a.no_bukti<>'MI/1612/020CPR'
						group by a.kode_akun,a.kode_pp,a.kode_lokasi
					   )d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp 
			where a.no_bukti='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi'
			order by a.kode_akun ";
		
		$rs1 = $dbLib->execute($sql);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td class='isi_laporan' align='center'>$j</td>
			<td class='isi_laporan'>".$AddOnLib->fnAkun($row1->kode_akun)."</td>
			<td class='isi_laporan'>$row1->nama_akun</td>
			<td class='isi_laporan'>$row1->kode_pp</td>
			<td class='isi_laporan' align='right'>".number_format($row1->n1,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row1->n2,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row1->n3,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row1->nilai,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row1->nilai_sd,2,',','.')."</td>
		  </tr>";
			$j+=1;
		}
    echo "</table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
