<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptLhi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_lhi,b.nik,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tgl
from kre_lhi_m a
inner join karyawan b on a.nik_kolek=b.nik and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.no_lhi";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("laporan harian inkaso",$this->lokasi,"");
		$logo="image/jawa_makmur.jpg";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<table width='1200' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='1200' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='300'><img src='$logo' width='200' height='64'></td>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td colspan='2' align='center' class='istyle16' height='25'>LAPORAN HARIAN INKASO </td>
            </tr>
          <tr>
            <td width='120' class='header_laporan2'>No LHI </td>
            <td width='642' class='header_laporan2'>: $row->no_lhi </td>
          </tr>
          <tr>
            <td class='header_laporan2'>Nama Kolektor </td>
            <td class='header_laporan2'>: $row->nama </td>
          </tr>
          <tr>
            <td class='header_laporan2'>Tanggal</td>
            <td class='header_laporan2'>: $row->tgl </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' rowspan='2' align='center' class='header_laporan2'>No</td>
        <td width='50' rowspan='2' align='center' class='header_laporan2'>No TTB </td>
        <td width='60' rowspan='2' align='center' class='header_laporan2'>Tanggal Kirim </td>
        <td width='150' rowspan='2' align='center' class='header_laporan2'>Nama Konsumen </td>
        <td width='200' rowspan='2' align='center' class='header_laporan2'>Alamat</td>
        <td width='50' rowspan='2' align='center' class='header_laporan2'>Angs.Ke</td>
        <td colspan='10' align='center' class='header_laporan2'>Barang</td>
        <td width='80' rowspan='2' align='center' class='header_laporan2'>Angsuran</td>
		 <td width='80' rowspan='2' align='center' class='header_laporan2'>Bayar</td>
        <td width='80' rowspan='2' align='center' class='header_laporan2'>Sisa</td>
        <td width='100' rowspan='2' align='center' class='header_laporan2'>Ket</td>
      </tr>
      <tr>
        <td width='30' align='center' class='header_laporan2'>KG</td>
        <td width='30' align='center' class='header_laporan2'>RC</td>
        <td width='30' align='center' class='header_laporan2'>PP</td>
        <td width='30' align='center' class='header_laporan2'>SPA</td>
        <td width='30' align='center' class='header_laporan2'>MW</td>
        <td width='30' align='center' class='header_laporan2'>FAN</td>
		<td width='30' align='center' class='header_laporan2'>BLR</td>
		<td width='30' align='center' class='header_laporan2'>PM</td>
		<td width='30' align='center' class='header_laporan2'>KA</td>
		<td width='30' align='center' class='header_laporan2'>OL</td>
        </tr>";
		$sql="select a.no_ttb,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,b.nama,b.alamat,c.cicilan_ke,e.nilai,
	   isnull(d.kg,0) as kg,isnull(d.rc,0) as rc,isnull(d.pp,0) as pp,
	   isnull(d.spa,0) as spa,isnull(d.mw,0) as mw,isnull(d.fan,0) as fan,
	   isnull(d.blr,0) as blr,isnull(d.pm,0) as pm,isnull(d.ka,0) as ka,isnull(d.ol,0) as ol,
	   date_format(e.jadwal,'%d/%m/%Y') as jadwal,c.saldo
from kre_ttb2_m a
inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join kre_ttb2_sch c on a.no_ttb=c.no_ttb and a.kode_lokasi=c.kode_lokasi
inner join kre_lhi_d e on c.no_ttb=e.no_ttb and c.kode_lokasi=e.kode_lokasi and c.cicilan_ke=e.cicilan_ke
left join (select no_ttb,kode_lokasi,
	   sum(case when kode_brg ='KG' then jumlah else 0 end) as kg,
	   sum(case when kode_brg ='RC' then jumlah else 0 end) as rc,
	   sum(case when kode_brg ='PP' then jumlah else 0 end) as pp,
	   sum(case when kode_brg ='SPA' then jumlah else 0 end) as spa,
	   sum(case when kode_brg ='MW' then jumlah else 0 end) as mw,
	   sum(case when kode_brg ='FAN' then jumlah else 0 end) as fan,
	   sum(case when kode_brg ='BLR' then jumlah else 0 end) as blr,
	   sum(case when kode_brg ='PM' then jumlah else 0 end) as pm,
	   sum(case when kode_brg ='KA' then jumlah else 0 end) as ka,
	   sum(case when kode_brg ='OL' then jumlah else 0 end) as ol
from kre_ttb2_d
group by no_ttb,kode_lokasi
		)d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
		where e.no_lhi='$row->no_lhi'
		order by a.no_ttb";
		
		$rs1 = $dbLib->execute($sql);
		$i=1;
		$kg=0; $rc=0; $pp=0; $spa=0; $mw=0; $fan=0; $blr=0; $pm=0; $ka=0; $ol=0; $nilai=0; $saldo=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$kg+=$row1->kg;
			$rc+=$row1->rc;
			$pp+=$row1->pp;
			$spa+=$row1->spa;
			$mw+=$row1->mw;
			$fan+=$row1->fan;
			$blr+=$row1->blr;
			$pm+=$row1->pm;
			$pm+=$row1->ka;
			$pm+=$row1->ol;
			$nilai+=$row1->nilai;
			$saldo+=$row1->saldo;
      echo "<tr>
        <td class='isi_laporan2' align='center'>$i</td>
        <td class='isi_laporan2'>$row1->no_ttb</td>
        <td class='isi_laporan2'>$row1->tgl</td>
        <td class='isi_laporan2'>$row1->nama</td>
        <td class='isi_laporan2'>$row1->alamat</td>
        <td class='isi_laporan2' align='center'>$row1->cicilan_ke</td>
        <td class='isi_laporan2' align='center'>$row1->kg</td>
        <td class='isi_laporan2' align='center'>$row1->rc</td>
        <td class='isi_laporan2' align='center'>$row1->pp</td>
        <td class='isi_laporan2' align='center'>$row1->spa</td>
        <td class='isi_laporan2' align='center'>$row1->mw</td>
        <td class='isi_laporan2' align='center'>$row1->fan</td>
		<td class='isi_laporan2' align='center'>$row1->blr</td>
		<td class='isi_laporan2' align='center'>$row1->pm</td>
		<td class='isi_laporan2' align='center'>$row1->ka</td>
		<td class='isi_laporan2' align='center'>$row1->ol</td>
        <td class='isi_laporan2' align='right'>".number_format($row1->nilai,0,',','.')."</td>
		<td class='isi_laporan2'>&nbsp;</td>
        <td class='isi_laporan2'>&nbsp;</td>
        <td class='isi_laporan2'>&nbsp;</td>
      </tr>";
			$i+=1;
		}
		 echo "<tr>
        <td class='isi_laporan2' align='center' colspan='6'>Total</td>
        <td class='isi_laporan2' align='center'>$kg</td>
        <td class='isi_laporan2' align='center'>$rc</td>
        <td class='isi_laporan2' align='center'>$pp</td>
        <td class='isi_laporan2' align='center'>$spa</td>
        <td class='isi_laporan2' align='center'>$mw</td>
        <td class='isi_laporan2' align='center'>$fan</td>
		<td class='isi_laporan2' align='center'>$blr</td>
		<td class='isi_laporan2' align='center'>$pm</td>
		<td class='isi_laporan2' align='center'>$ka</td>
		<td class='isi_laporan2' align='center'>$ol</td>
        <td class='isi_laporan2' align='right'>".number_format($nilai,0,',','.')."</td>
		<td class='isi_laporan2'>&nbsp;</td>
        <td class='isi_laporan2'>&nbsp;</td>
        <td class='isi_laporan2'>&nbsp;</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
