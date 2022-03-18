<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptDocKkp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$jenis=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tmp=explode(";",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$tgl_awal=$tmp[2];
		$tgl_akhir=$tmp[3];
		if ($jenis=="Range")
		{
			$tgl=" and a.tgl_selesai between '$tgl_awal' and '$tgl_akhir' ";
		}
		if ($jenis=="=")
		{
			$tgl=" and a.tgl_selesai = '$tgl_awal' ";
		}
		if ($jenis=="<=")
		{
			$tgl=" and a.tgl_selesai <= '$tgl_awal' ";
		}
		$sql="select a.no_depo,a.no_bilyet as no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.jenis,
	   date_format(a.tgl_akru,'%d/%m/%Y') as tgl_akru,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
	   a.jml_hari,a.basis,a.p_bunga,a.nilai,date_format(c.tgl_akhir,'%d/%m/%Y') as tgl_akhir,date_format(c.tgl_awal,'%d/%m/%Y') as tgl_awal,
	   b.nama as nama_bank,b.kode_bank,
	   c.nilai-c.pajak_akru as nilai_akru,
	   c.nilai_cair,c.pajak_akru,c.nilai_hitung,c.pajak_hitung,c.nilai as gross_akru,
	   datediff(day,c.tgl_awal,c.tgl_akhir) as hari_akru
from inv_depo2_m a
inner join inv_bank b on a.bdepo=b.kode_bank
left join (select kode_lokasi,no_depo,sum(nilai_cair) as nilai_cair,sum(pajak_akru) as pajak_akru,
				   sum(nilai_hitung) as nilai_hitung,sum(pajak_hitung) as pajak_hitung,sum(nilai) as nilai,
				   max(tgl_akhir) as tgl_akhir,max(tgl_awal) as tgl_awal
			from inv_depoakru_d
			where periode='$periode' and no_flag='-'
			group by kode_lokasi,no_depo) c on a.no_depo=c.no_depo and a.kode_lokasi=c.kode_lokasi
			
left join inv_depotutup_m d on a.no_depo=d.no_depo and d.periode<='$periode'

$this->filter $tgl and d.no_tutup is null order by a.no_depo";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kkp deposito (mutasi)",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='80'  align='center' class='header_laporan'>No Bilyet</td>
	 <td width='60'  align='center' class='header_laporan'>Jenis</td>
	 <td width='60'  align='center' class='header_laporan'>Bank</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Bank</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai DOC</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Jatuh Tempo</td>
	 <td width='40'  align='center' class='header_laporan'>Bunga</td>
	 <td width='40'  align='center' class='header_laporan'>Jumlah Hari</td>
	  <td width='60'  align='center' class='header_laporan'>Hari Pembagi</td>
	 <td width='60'  align='center' class='header_laporan'>Mulai Tgl Akru</td>
	 <td width='60'  align='center' class='header_laporan'>S.d. Tgl Akru</td>
	 <td width='40'  align='center' class='header_laporan'>Jml Hari Akru</td>
	 <td width='90'  align='center' class='header_laporan'>Bunga/ Kupon (Gross)</td>
	  <td width='90'  align='center' class='header_laporan'>Pajak Bunga/ Kupon</td>
	   <td width='90'  align='center' class='header_laporan'>Tot Bunga/ Kupon (Net)</td>
	  </tr>  ";
		$nilai_akru=0;$gross_akru=0;$pajak_akru=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_akru=$nilai_akru+$row->nilai_akru;
			$gross_akru=$gross_akru+$row->gross_akru;
			$pajak_akru=$pajak_akru+$row->pajak_akru;
			$bunga_kupon=$bunga_kupon+$row->bunga_kupon;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_depo</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan'>$row->kode_bank</td>
	 <td class='isi_laporan'>$row->nama_bank</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p_bunga,2,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->jml_hari,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->basis,0,",",".")."</td>
	 <td class='isi_laporan'>$row->tgl_awal</td>
	 <td class='isi_laporan'>$row->tgl_akhir</td>
	  <td class='isi_laporan' align='right'>".number_format($row->hari_akru,0,",",".")."</td>
	 
	  <td class='isi_laporan' align='right'>".number_format($row->gross_akru,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->pajak_akru,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_akru,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='isi_laporan' align='center' colspan='7'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' colspan='8'>&nbsp;</td>
	  <td class='isi_laporan' align='right'>".number_format($gross_akru,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($pajak_akru,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_akru,0,",",".")."</td>
	    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
