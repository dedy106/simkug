<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptHutangKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(a.kode_vendor)
from vendor a $this->filter ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$tahun_rev=$tahun-1;
		
		$sql = "select a.kode_lokasi,a.alamat,a.kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.no_fax,a.no_telp,a.bank_trans,
		isnull(b.nilai_bp,0) as nilai_bp,isnull(b.nilai_cc,0) as nilai_cc,isnull(b.nilai_total,0) as nilai_total
from vendor a
left join  (select kode_vendor,kode_lokasi,sum(nilai_bp) as nilai_bp,sum(nilai_cc) as nilai_cc,sum(nilai_bp+nilai_cc) as nilai_total
			from yk_hutang_sawal
			where kode_lokasi='$kode_lokasi' and substring(periode,1,4)='$tahun_rev'
			group by kode_vendor,kode_lokasi
	   )b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi $this->filter
order by a.kode_vendor ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KARTU PENGAWASAN HUTANG MITRA",$this->lokasi,"TAHUN $tahun");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
      <tr>
        <td colspan='16' class='header_laporan'><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='100' class='header_laporan'>Nama Mitra</td>
            <td width='500' class='header_laporan'>: $row->kode_vendor - $row->nama</td>
            <td width='120' class='header_laporan'>Nama Penerima</td>
            <td width='400' class='header_laporan'>: $row->nama_rek</td>
          </tr>
          <tr>
            <td class='header_laporan'>Alamat</td>
            <td class='header_laporan'>: $row->alamat</td>
            <td class='header_laporan'>No Rekening </td>
            <td class='header_laporan'>: $row->no_rek</td>
          </tr>
          <tr>
            <td class='header_laporan'>No Telp </td>
            <td class='header_laporan'>: $row->no_telp</td>
            <td class='header_laporan'>Nama Bank </td>
            <td class='header_laporan'>: $row->bank $row->cabang </td>
          </tr>
          <tr>
            <td class='header_laporan'>No Fax </td>
            <td class='header_laporan'>: $row->no_fax</td>
            <td class='header_laporan'>Bank Transfer </td>
            <td class='header_laporan'>: $row->bank_trans</td>
            </tr>
        </table></td>
      </tr>
	  
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' rowspan='2' class='header_laporan'>No</td>
        <td width='80' rowspan='2' class='header_laporan'>No Bukti </td>
        <td width='80' rowspan='2' class='header_laporan'>No Dokumen </td>
        <td width='40' rowspan='2' class='header_laporan'>Tanggal</td>
        <td width='200' rowspan='2' class='header_laporan'>Keterangan</td>
        <td colspan='3' class='header_laporan'>Pengakuan Hutang</td>
        <td colspan='3' class='header_laporan'>Pembayaran</td>
        <td colspan='3' class='header_laporan'>Saldo Akhir</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
		<td width='80' class='header_laporan'>Pegawai</td>
        <td width='80' class='header_laporan'>Pensiun</td>
        <td width='80' class='header_laporan'>Total</td>
        <td width='80' class='header_laporan'>Pegawai</td>
        <td width='80' class='header_laporan'>Pensiun</td>
        <td width='80' class='header_laporan'>Total</td>
		<td width='80' class='header_laporan'>Pegawai</td>
        <td width='80' class='header_laporan'>Pensiun</td>
        <td width='80' class='header_laporan'>Total</td>
      </tr>
	  <tr align='center' >
        <td colspan='11' align='right' class='header_laporan'>Saldo Awal&nbsp; </td>
        <td class='header_laporan' align='right'>".number_format($row->nilai_bp,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($row->nilai_cc,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($row->nilai_total,0,",",".")."</td>
      
      </tr>
	  ";
	  $sql1="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d-%m-%Y') as tgl_bukti,a.keterangan,a.modul,
      case a.dc when 'D' then a.nilai_bp else 0 end as debet_bp,
      case a.dc when 'D' then a.nilai_cc else 0 end as debet_cc,
      case a.dc when 'D' then a.total else 0 end as debet_total,
      case a.dc when 'C' then a.nilai_bp else 0 end as kredit_bp,
      case a.dc when 'C' then a.nilai_cc else 0 end as kredit_cc,
      case a.dc when 'C' then a.total else 0 end as kredit_total
from (select a.no_hutang as no_bukti,a.no_dokumen,a.tanggal,a.keterangan,a.modul,a.kode_lokasi,'C' as dc,
       b.nilai_bp,b.nilai_cc,b.nilai_bp+b.nilai_cc as total
from yk_hutang_m a
inner join yk_hutang_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi
where b.kode_lokasi='$row->kode_lokasi' and b.kode_vendor='$row->kode_vendor' and substring(a.periode,1,4)='$tahun'
union all
select a.no_hutang as no_bukti,'-' as no_dokumen,a.tanggal,a.keterangan,'SA' as modul,a.kode_lokasi,'C' as dc,
       a.nilai_bp,a.nilai_cc,a.nilai_bp+a.nilai_cc as total
from yk_hutang_sawal a
where a.kode_lokasi='$row->kode_lokasi' and a.kode_vendor='$row->kode_vendor' and substring(a.periode,1,4)='$tahun'
union all
select a.no_rekon as no_bukti,a.no_dokumen,a.tanggal,a.keterangan,a.modul,a.kode_lokasi,'D' as dc,
       b.nilai_bp,b.nilai_cc,b.nilai_bp+b.nilai_cc as total
from yk_rekon_m a
inner join yk_hutang_d b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi 
where b.kode_lokasi='$row->kode_lokasi' and b.kode_vendor='$row->kode_vendor' and substring(a.periode,1,4)='$tahun'
union all
select a.no_rekon as no_bukti,a.no_hutang as no_dokumen,a.tanggal,a.keterangan,'REKONSAWAL' as modul,a.kode_lokasi,'D' as dc,
       a.nilai_bp,a.nilai_cc,a.nilai_bp+a.nilai_cc as total
from yk_rekon_sawal a
where a.kode_lokasi='$kode_lokasi' and a.kode_vendor='$row->kode_vendor' and substring(a.periode,1,4)='$tahun'
 )a 
where  (a.nilai_bp<>0 or a.nilai_cc<>0)
order by a.tanggal,a.no_bukti ";

		$rs1 = $dbLib->execute($sql1);
		$saldo=$row->nilai_total; 
		$j=0;$kredit_bp=0;$kredit_cc=0;$kredit_total=0;
		$debet_bp=0;$debet_cc=0;$debet_total=0;
		$sa_bp=$row->nilai_bp;$sa_cc=$row->nilai_cc;$sa_total=$row->nilai_total;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$j=$j+1;
			$debet_bp=$debet_bp + $row1->debet_bp;
			$debet_cc=$debet_cc + $row1->debet_cc;
			$debet_total=$debet_total + $row1->debet_total;
			$kredit_bp=$kredit_bp + $row1->kredit_bp;
			$kredit_cc=$kredit_cc + $row1->kredit_cc;
			$kredit_total=$kredit_total + $row1->kredit_total;
			$sa_bp=$sa_bp+$row1->kredit_bp-$row1->debet_bp;
			$sa_cc=$sa_cc+$row1->kredit_cc-$row1->debet_cc;
			$sa_total=$sa_total+$row1->kredit_total-$row1->debet_total;
		echo "<tr>
        <td align='center' class='isi_laporan'>$j</td>
        <td class='isi_laporan'>$row1->no_bukti</td>
		<td class='isi_laporan'>$row1->no_dokumen</td>
		<td class='isi_laporan'>$row1->tgl_bukti</td>
        <td class='isi_laporan'>$row1->keterangan</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kredit_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->kredit_cc,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kredit_total,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->debet_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->debet_cc,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->debet_total,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sa_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($sa_cc,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sa_total,0,",",".")."</td>
      </tr>";
			
	  }
      echo " <tr align='center'>
        <td colspan='5' align='right' class='header_laporan'>Mutasi</td>
        <td class='isi_laporan' align='right'>".number_format($kredit_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($kredit_cc,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($debet_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($debet_cc,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
        <td class='header_laporan'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td colspan='11' align='right' class='header_laporan'>Saldo Akhir</td>
       <td class='isi_laporan' align='right'>".number_format($sa_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($sa_cc,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sa_total,0,",",".")."</td>
      </tr>
	 </table><br>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
