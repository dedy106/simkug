<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptSimpSaldoKartu extends server_report_basic
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
		$sql="select *
        from kop_agg a
        $this->filter
        order by a.no_agg";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu simpanan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='9' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td width='99' class='header_laporan'>No Anggota</td>
        <td width='360' class='header_laporan'>: $row->no_agg </td>
      </tr>
	   <tr>
        <td class='header_laporan'>Nama Anggota </td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tgl Aktif</td>
        <td class='header_laporan'>: $row->tgl_lahir</td>
      </tr>
      <tr>
        <td class='header_laporan'>Lokasi Kerja</td>
        <td class='header_laporan'>: $row->alamat</td>
      </tr>
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>No Simpanan</td>
    <td width='80' class='header_laporan' align='center'>Nama Simpanan</td>
	<td width='80' class='header_laporan' align='center'>No Angs</td>
	 <td width='80' class='header_laporan' align='center'>Tanggal</td>
	<td width='80' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Periode Simpanan</td>
    <td width='80' class='header_laporan' align='center'>Periode Bayar</td>
	<td width='80' class='header_laporan' align='center'>Nilai Simpanan</td>
	<td width='80' class='header_laporan' align='center'>Nilai Penarikan</td>
  </tr>
";
			
			$sql="select a.no_simp,d.nama,a.no_angs,b.tanggal,b.keterangan,a.periode as periode_simp,b.periode as periode_bayar,a.dc,a.nilai
            from kop_simpangs_d a 
            inner join trans_m b on a.no_angs=b.no_bukti and a.kode_lokasi=b.kode_lokasi
            inner join kop_simp_m c on a.no_simp=c.no_simp and a.kode_lokasi=c.kode_lokasi
            inner join kop_simp_param d on c.kode_param=d.kode_param and a.kode_lokasi=d.kode_lokasi
            where c.no_agg='$row->no_agg' and a.kode_lokasi='$row->kode_lokasi' order by a.no_simp,b.tanggal";
			
			$rs1 = $dbLib->execute($sql);
			$tosimp=0; $totarik=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
                if($row1->dc == "D"){
                    $simp = $row1->nilai;
                    $tosimp += $row1->nilai;
                }else{
                    $tarik = $row1->nilai;
                    $totarik += $row1->nilai;
                }
				echo "<tr>
                <td class='isi_laporan'>".$row1->no_simp."</td>
                <td class='isi_laporan'>".$row1->nama."</td>
                <td class='isi_laporan'>".$row1->no_angs."</td>
                <td class='isi_laporan'>".$row1->tanggal."</td>
                <td class='isi_laporan'>".$row1->keterangan."</td>
                <td class='isi_laporan'>".$row1->periode_simp."</td>
                <td class='isi_laporan'>".$row1->periode_bayar."</td> 
                <td  class='isi_laporan' align='right'>".number_format($simp,0,',','.')."</td>
                <td  class='isi_laporan' align='right'>".number_format($tarik,0,',','.')."</td>";
		echo "</tr>";
				
			}
			echo "<tr>
            <td height='23' colspan='7'  class='isi_laporan' align='right'>Total&nbsp;</td>
            <td  class='isi_laporan' align='right'>".number_format($tosimp,0,',','.')."</td>
            <td  class='isi_laporan' align='right'>".number_format($totarik,0,',','.')."</td>
        </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
