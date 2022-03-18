<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_medrec_rptRjtl extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.nik) from dbexs.dbo.exs_harian a $this->filter";
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
		$sql="SELECT     a.periode, a.no_daftar, a.no_resep, a.no_rujukan, a.tanggal, a.nama_mitra, a.nama_dokter1, a.nama_dokter2, a.kode_tpk, a.nik, a.band_posisi, a.hr_area, a.loker, a.nik_kes, a.nama_pasien, 
                      a.jenis_kelamin, a.jenis_peserta, a.kode_tpk_asal, date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir, a.umur_pasien, date_format(a.tgl_berobat1,'%d/%m/%Y') as tgl_berobat1,date_format(a.tgl_berobat2,'%d/%m/%Y') as tgl_berobat2, a.diagnosa_kerja, a.diagnosa_utama, a.diagnosa_tambahan, a.kode_keg, 
                      a.kode_tak, a.item_obat, a.dot, a.non_dot, a.n1, a.n2, a.n3, a.n4, a.n5, a.n6, a.n7, a.n8, a.n9, a.n10, a.n11, a.n12, a.n13, a.n14, a.n15, a.n16, a.n17, a.n18, a.n19, a.n20, a.n21, a.n22, a.n23, a.n24, a.kode_produk, 
                      a.kode_lokasi, a.kode_vendor, a.icdx, a.no_batch,b.kode_klp,isnull(c.nilai,0) as nilai,
					  case when isnull(c.nilai,0)>a.n22 then 'LEBIH' else 'KURANG' end as selisih,e.nama as nama_icdx
FROM dbexs.dbo.exs_harian a
left join dbexs.dbo.exs_klp_biaya b on a.n22 between b.awal and b.akhir
left join dbexs.dbo.exs_ina_drg c on substring(a.kode_produk,1,1)=c.kode_biaya and a.icdx=c.icdx
left join yk_icdx_relasi d on a.icdx=d.kode_icdx 
left join yk_icdx e on a.icdx=e.kode_icdx
$this->filter order by a.nik ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("biaya pengobatan rjtl",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#B9FFCF'>
    <td class='header_laporan' rowspan='2'>No</td>
    <td class='header_laporan' width='60' rowspan='2'>NIK</td>
    <td class='header_laporan' width='150' rowspan='2'>NAMA PEGAWAI</td>
    <td class='header_laporan' width='50' rowspan='2'>BAND POSISI</td>
    <td class='header_laporan' width='50' rowspan='2'>LOKER HR</td>
    <td class='header_laporan' width='60' rowspan='2'>NIKKES</td>
    <td class='header_laporan' width='150' rowspan='2'>NAMA PASIEN</td>
    <td class='header_laporan' width='60' rowspan='2'>TGL LAHIR</td>
    <td class='header_laporan' width='50' rowspan='2'>UMUR</td>
    <td class='header_laporan' colspan='2'>TANGGAL BEROBAT</td>
    <td class='header_laporan' rowspan='2' align='center'> KODE PENYAKIT (ICD-X)</td>
    <td class='header_laporan' rowspan='2' align='center'>NAMA PENYAKIT </td>
    <td class='header_laporan' rowspan='2' align='center'>KODE BIAYA</td>
    <td class='header_laporan' colspan='20'>BIAYA PENGOBATAN</td>
    <td class='header_laporan' width='90' rowspan='2' align='center'>TOTAL</td>
    <td class='header_laporan' width='90' rowspan='2' align='center'>NILAI KUNJUNGAN</td>
    <td class='header_laporan' width='60' rowspan='2' align='center'>KELOMPOK BIAYA</td>
    <td class='header_laporan' width='90' rowspan='2' align='center'>BESAR UANG INA DRG</td>
    <td class='header_laporan' width='90' rowspan='2' align='center'>LEBIH/KURANG UANG</td>
    <td class='header_laporan' width='40' rowspan='2' align='center'>%</td>
  </tr>
  <tr bgcolor='#B9FFCF'>
    <td class='header_laporan' width='60' align='center'>MASUK</td>
    <td class='header_laporan' width='60' align='center'>KELUAR</td>
    <td class='header_laporan' width='80' align='center'>JASA DOKTER UMUM</td>
    <td class='header_laporan' width='80' align='center'>JASA DOKTER GIGI</td>
    <td class='header_laporan' width='80' align='center'>JASA DOKTER SPESIALIS</td>
    <td class='header_laporan' width='80' align='center'>KB-KIA</td>
    <td class='header_laporan' width='80' align='center'>UGD</td>
    <td class='header_laporan' width='80' align='center'>TINDAKAN MEDIS (FISIOTERAPI)</td>
	 <td class='header_laporan' width='80' align='center'>HEMODIALISA</td>
	  <td class='header_laporan' width='80' align='center'>KEMOTERAPI</td>
    <td class='header_laporan' width='80' align='center'>OBAT / BAHAN OBAT</td>
    <td class='header_laporan' width='80' align='center'>ALAT KESEHATAN/ MATERIAL KESEHATAN</td>
    <td class='header_laporan' width='80' align='center'>PEMERIKSAAN PENUNJANG </td>
    <td class='header_laporan' width='80' align='center'>KAMAR PERAWATAN</td>
    <td class='header_laporan' width='80' align='center'>KAMAR BEDAH</td>
    <td class='header_laporan' width='80' align='center'>RUANG PERAWATAN KHUSUS </td>
    <td class='header_laporan' width='80' align='center'>KACA MATA</td>
    <td class='header_laporan' width='80' align='center'>HEARING AID</td>
    <td class='header_laporan' width='80' align='center'>PROTESA</td>
    <td class='header_laporan' width='80' align='center'>LAIN2</td>
    <td class='header_laporan' width='80' align='center'>KACA MATA DAN ALAT REHABILITASI LAINNYA</td>
    <td class='header_laporan' width='80' align='center'>ADM &amp; BEBAN LAINNYA</td>
  </tr> ";
		$i=1; $nilai=0;
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; 
		$n12=0; $n13=0; $n14=0; $n15=0; $n16=0; $n17=0; $n18=0; $n19=0; $n20=0; $n21=0;$n22=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$n1+=$row->n1; $n2+=$row->n2; $n3+=$row->n3; $n4+=$row->n4; $n5+=$row->n5; $n6+=$row->n6;
			$n7+=$row->n7; $n8+=$row->n8; $n9+=$row->n9; $n10+=$row->n10; $n11+=$row->n11; $n12+=$row->n12;
			$n13+=$row->n13; $n14+=$row->n14; $n15+=$row->n15; $n16+=$row->n16; $n17+=$row->n17; $n18+=$row->n18;
			$n19+=$row->n19; $n20+=$row->n20; $n21+=$row->n21; $n22+=$row->n22;
			$persen=0;
			if ($row->nilai!=0)
			{	
				$persen=($row->nilai/$row->n22)*100;
			}
			
		echo "<tr>
    <td class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->band_posisi</td>
    <td class='isi_laporan'>$row->hr_area</td>
    <td class='isi_laporan'>$row->nik_kes</td>
    <td class='isi_laporan'>$row->nama_pasien</td>
    <td class='isi_laporan'>$row->tgl_lahir</td>
    <td class='isi_laporan' align='center'>".number_format($row->umur_pasien,0,',','.')."</td>
    <td class='isi_laporan'>$row->tgl_berobat1</td>
    <td class='isi_laporan'>$row->tgl_berobat2</td>
    <td class='isi_laporan' align='center'>".strtoupper($row->icdx)."</td>
    <td class='isi_laporan'>$row->nama_icdx</td>
    <td class='isi_laporan'>$row->kode_produk</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->n13,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n14,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n15,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n16,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n17,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n18,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n19,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n20,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n21,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n22,0,',','.')."</td>
    <td class='isi_laporan' align='center'>$row->kode_klp</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
    <td class='isi_laporan' align='center'>$row->selisih</td>
    <td class='isi_laporan' align='right'>".number_format($persen,2,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='14'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n8,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n9,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n12,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($n13,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n14,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n15,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n16,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n17,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n18,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n19,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n20,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n21,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n22,0,',','.')."</td>
    <td class='isi_laporan'>&nbsp;</td>
    <td class='isi_laporan'>&nbsp;</td>
    <td class='isi_laporan'>&nbsp;</td>
    <td class='isi_laporan'>&nbsp;</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
