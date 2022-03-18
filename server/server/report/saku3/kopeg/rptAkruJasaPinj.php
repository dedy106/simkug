<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kopeg_rptAkruJasaPinj extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_pinj,b.periode,b.cicilan_ke,f.no_agg,f.nama,a.kode_param,a.akun_pjasa,c.akun_jasa,a.nilai,b.npokok,b.nbunga,b.npokok+b.nbunga as ntagih,isnull(g.bayar,0) as bayar 
        from kop_pinj_m a 
        inner join kop_pinj_sch b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi 
        inner join kop_pinj_param c on a.kode_param=c.kode_param and a.kode_lokasi=c.kode_lokasi 
        inner join masakun d on a.akun_pjasa=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
        inner join masakun e on c.akun_jasa=e.kode_akun and c.kode_lokasi=e.kode_lokasi 
        inner join kop_agg f on a.no_agg = f.no_agg and a.kode_lokasi=f.kode_lokasi 
		left join (select a.no_pinj,a.kode_lokasi,a.periode,sum(a.npokok+a.nbunga) as bayar
				from kop_pinjangs_d a
				group by a.no_pinj,a.kode_lokasi,a.periode
		) g on a.no_pinj=g.no_pinj and a.kode_lokasi=g.kode_lokasi and a.periode=g.periode
        $this->filter and b.no_bill='-' and a.no_kas <>'-' and a.status_aktif='1' and f.flag_aktif='1'";
		// echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pinjaman",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
        $kolom = ["No","No Kartu","Periode","Bill Ke-","No Agg","Anggota","Jenis","Akun Piu Jasa","Akun Jasa","N Pinjaman","N Pokok","N Jasa","N Tagihan","Pembayaran"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>";
        for($k=0; $k < count($kolom); $k++){
            echo "<td align='center' class='header_laporan'>".$kolom[$k]."</td>";
        }
  echo"
  </tr>
 
    ";
        $nilai=0;$npokok=0;$nbunga=0;$ntagih=0;$bayar=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$npokok+=$row->npokok;
			$nbunga+=$row->nbunga;
			$ntagih+=$row->ntagih;
			$bayar+=$row->bayar;
			echo "</td>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_pinj</td>
	 <td class='isi_laporan'>$row->periode</td>
	 <td class='isi_laporan'>$row->cicilan_ke</td>
	 <td class='isi_laporan'>$row->no_agg</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_param</td>
	 <td class='isi_laporan'>$row->akun_pjasa</td>
	 <td class='isi_laporan'>$row->akun_jasa</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->npokok,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nbunga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ntagih,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan'  colspan='9' align='right'>Total</td>
    <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($npokok,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($nbunga,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($ntagih,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
