<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_fa_rptFaKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$periode=$tmp[1];
		$periode_susut=$tmp[2];
		$sql = "select a.kode_lokasi,a.no_fa,a.nama,a.nilai,a.kode_klpakun,b.nama as nama_klp,a.periode,a.kode_pp,c.nama as nama_pp,
       date_format(a.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan,b.kode_akun,b.akun_bp,b.akun_deprs,d.nama as nama_akun,e.nama as nama_bp,f.nama as nama_deprs 
from fa_asset a 
inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi 
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join masakun d on b.kode_akun=d.kode_akun and b.kode_lokasi=d.kode_lokasi
inner join masakun e on b.akun_bp=e.kode_akun and b.kode_lokasi=e.kode_lokasi
inner join masakun f on b.akun_deprs=f.kode_akun and b.kode_lokasi=f.kode_lokasi $this->filter ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KARTU ASSET",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row->nilai,0,",",".");
		echo "<table width='700'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td colspan='8' styile='padding:5px' ><table width='700' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='132' class='header_laporan'>No Asset</td>
            <td width='558' class='header_laporan'>: $row->no_fa </td>
          </tr>
          <tr>
            <td class='header_laporan'>Uraian Barang</td>
            <td class='header_laporan'>: $row->nama </td>
          </tr>
          <tr>
            <td class='header_laporan'>Tanggal Perolehan</td>
            <td  class='header_laporan'>: $row->tgl_perolehan </td>
          </tr>
          <tr>
            <td class='header_laporan'>PP</td>
            <td  class='header_laporan'>: $row->kode_pp - $row->nama_pp</td>
          </tr>
          <tr>
            <td class='header_laporan'>Kelompok</td>
            <td class='header_laporan'>: $row->nama_klp</td>
          </tr>
         
          <tr>
            <td width='132' class='header_laporan'>Akun Asset</td>
            <td width='558' class='header_laporan'>: $row->kode_akun - $row->nama_akun </td>
          </tr>
          <tr>
            <td  class='header_laporan'>Akun BP</td>
            <td  class='header_laporan'>: $row->akun_bp - $row->nama_bp </td>
          </tr>
          <tr>
            <td class='header_laporan'>Akun AP</td>
            <td class='header_laporan'>: $row->akun_deprs - $row->nama_deprs </td>
          </tr>
        </table></td>
      </tr>
	  <tr>
        <td colspan='5' align='right' class='header_laporan'>Nilai Perolehan</td>
        <td width='14%' align='right' class='header_laporan'>$nilai</td>
      </tr>
      <tr align='center'>
        <td width='30' class='header_laporan'>No</td>
        <td width='100' class='header_laporan'>No Susut</td>
		<td width='60' class='header_laporan'>Periode</td>
		<td width='90' class='header_laporan'>Debet</td>
        <td width='90' class='header_laporan'>Kredit</td>
        <td width='100' class='header_laporan'>Saldo</td>
      </tr>
";
	  $sql1="select no_fasusut,periode,akun_bp,akun_ap,
       case dc when 'D' then nilai else 0 end as debet,
       case dc when 'C' then nilai else 0 end as kredit,nilai
from fasusut_d
where kode_lokasi='$row->kode_lokasi' and no_fa='$row->no_fa' and periode<='$periode_susut' order by no_fasusut";
	
		$rs1 = $dbLib->execute($sql1);
		$saldo=$row->nilai; $j=0; $debet=0; $kredit=0;$akum=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$j=$j+1;
			$debet=$debet + $row1->debet;
			$kredit=$kredit+ $row1->kredit;
			$saldo=$saldo - $row1->debet + $row1->kredit;
      $nsaldo=number_format($saldo,0,",",".");
      $akum=$debet-$kredit;
     echo "<tr>
        <td align='center' class='isi_laporan'>$j</td>
        <td class='isi_laporan'>$row1->no_fasusut</td>
		<td class='isi_laporan'>$row1->periode</td>
		<td class='isi_laporan' align='right'>".number_format($row1->debet,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->kredit,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
      </tr>";
	  }
       echo "<tr>
        <td colspan='5' class='isi_laporan' align='right'>Akumulasi Penyusutan </td>
        <td class='isi_laporan' align='right'>".number_format($akum,0,",",".")."</td>
        </tr>";
		 echo "<tr>
        <td colspan='5' class='isi_laporan' align='right'>Nilai Buku</td>
        <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
        </tr>";
    echo "</table><br>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
