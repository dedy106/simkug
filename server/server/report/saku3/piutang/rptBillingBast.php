<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_piutang_rptBillingBast extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$loker=$tmp[4];
		
		$sql = "select 1 " ;
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$no_bill=$tmp[3];
		$bpcc=$tmp[4];
		$jenis=$tmp[5];
		$nama_file="billing_".$no_bill.".xls";
		$loker = "";
		if ($bpcc == "BP") {
			$loker = " and d.jenis = 'PEGAWAI' ";
		}
		if ($bpcc == "CC") {
			$loker = " and d.jenis = 'PENSIUN' ";
		}
		if ($bpcc == "GR") {
			$loker = " and d.jenis = 'GROUP' ";
		}
		
		$sql2="exec sp_yk_bill_lap_bast '$no_bill','$kode_lokasi','$nik_user' ";
		$sql = "select a.no_selesai as no_valid,date_format(a.tanggal,'%d-%m-%Y') as tanggal,a.periode,a.keterangan
from yk_bast_m a
where  a.kode_lokasi='$kode_lokasi' and a.no_selesai='$no_bill'";
		
		$rs2 = $dbLib->execute($sql2);
		$rs = $dbLib->execute($sql);
	
		$AddOnLib=new server_util_AddOnLib();	
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("BILLING PER BAST",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table  border='0' cellspacing='2' cellpadding='1' class='kotak' width='2000'>
      <tr>
        <td class='header_laporan'>
		
		<table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='100' class='header_laporan'>No Bukti </td>
            <td width='900' class='header_laporan'>: $row->no_valid</td>
          </tr>
          <tr>
            <td class='header_laporan'>Periode</td>
            <td class='header_laporan'>: $row->periode</td>
          </tr>
          <tr>
            <td class='header_laporan'>Tanggal</td>
            <td class='header_laporan'>: $row->tanggal</td>
          </tr>
        
          <tr>
            <td class='header_laporan'>Keterangan</td>
            <td class='header_laporan'>: $row->keterangan</td>
          </tr>
          
        </table></td>
      </tr>
      <tr>
        <td class='header_laporan'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center' bgcolor='#CCCCCC'>
            <td class='header_laporan'>No</td>
            <td class='header_laporan'>Kode Mitra </td>
			<td class='header_laporan'>Nama Mitra </td>
            <td class='header_laporan'>No Ref </td>
            <td class='header_laporan'>NIK</td>
            <td class='header_laporan'>Nama</td>
            <td class='header_laporan'>Loker</td>
            <td class='header_laporan'>Band</td>
            <td class='header_laporan'>Nikkes</td>
            <td class='header_laporan'>Nama Pasien </td>
            <td class='header_laporan'>Dokter</td>
            <td class='header_laporan'>Tgl Masuk </td>
            <td class='header_laporan'>Tgl Keluar </td>
            <td class='header_laporan'>ICDX</td>
            <td class='header_laporan'>Kode Biaya </td>
			<td class='header_laporan'>Jasa Dokter </td>
            <td class='header_laporan'>KB-KIA</td>
            <td class='header_laporan'>Jasa Dokter Gigi </td>
            <td class='header_laporan'>Jasa Dokter Spe.</td>
            <td class='header_laporan'>UGD</td>
            <td class='header_laporan'>Tindakan Medis</td>
            <td class='header_laporan'>Obat/Bhn Obat</td>
            <td class='header_laporan'>Alkes</td>
            <td class='header_laporan'>Pem. Penunjang</td>
            <td class='header_laporan'>Kamar</td>
            <td class='header_laporan'>Kamar Operasi</td>
            <td class='header_laporan'>Ruang Perwtn Khusus</td>
            <td class='header_laporan'>Kacamata dan Alat Rehab</td>
            <td class='header_laporan'>Biaya Adm Lainnya</td>
            <td class='header_laporan'>PPH</td>
            <td class='header_laporan'>Kunj UMUM</td>
            <td class='header_laporan'>Kunj GIGI</td>
            <td class='header_laporan'>Kunj KBKIA</td>
            <td class='header_laporan'>MATKES</td>
            <td class='header_laporan'>CS</td>
			<td class='header_laporan'>Kode Kegiatan </td>
			<td class='header_laporan'>No Rujukan</td>
			<td class='header_laporan'>No Hutang</td>
			<td class='header_laporan'>No Piutang</td>
			<td class='header_laporan'>No Selesai</td>
			<td class='header_laporan'>No TAK</td>
          </tr>
          
        ";
		
			$sql1 = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,date_format(a.tgl_masuk,'%d-%m-%Y') as tgl_masuk,date_format(a.tgl_keluar,'%d-%m-%Y') as tgl_keluar,a.icdx,a.band,
			a.nikkes,a.pasien,a.dokter,a.kode_produk,b.nama as nama_vendor,
       a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n9,a.n10,a.n11,a.n12,a.n13,a.n14,a.n15,a.n16,a.n17,a.n18,a.n19,a.n20,a.n21,a.no_bill,a.kode_keg,a.no_rujuk,a.no_selesai,a.no_piutang,a.no_tak,a.no_selesai
from yk_bill_lap a
left join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasal=b.kode_lokasi
inner join yk_loker c on a.loker=c.loker 
inner join cust d on c.kode_cust=d.kode_cust
where a.kode_lokasi='$kode_lokasi' and a.nik_user='$nik_user' $loker
order by a.loker,a.no_urut";
			
			$rs1 = $dbLib->execute($sql1);
			$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;
			$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;$n16=0;$n17=0;$n18=0;$n19=0;$n20=0;
			$n21=0;
			$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				$n1=$n1+$row1->n1;$n2=$n2+$row1->n2;$n3=$n3+$row1->n3;$n4=$n4+$row1->n4;$n5=$n5+$row1->n5;$n6=$n6+$row1->n6;$n7=$n7+$row1->n7;$n8=$n8+$row1->n8;$n9=$n9+$row1->n9;$n10=$n10+$row1->n10;
				$n11=$n11+$row1->n11;$n12=$n12+$row1->n12;$n13=$n13+$row1->n13;$n14=$n14+$row1->n14;$n15=$n15+$row1->n15;$n16=$n16+$row1->n16;$n17=$n17+$row1->n17;$n18=$n18+$row1->n18;$n19=$n19+$row1->n19;$n20=$n20+$row1->n20;
				$n21=$n21+$row1->n21;
				echo "<tr>
				<td class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->kode_vendor</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->no_ref</td>
				<td class='isi_laporan'>$row1->nik</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->loker</td>
				<td class='isi_laporan'>$row1->band</td>
				<td class='isi_laporan'>$row1->nikkes</td>
				<td class='isi_laporan'>$row1->pasien</td>
				<td class='isi_laporan'>$row1->dokter</td>
				<td class='isi_laporan'>$row1->tgl_masuk</td>
				<td class='isi_laporan'>$row1->tgl_keluar</td>
				<td class='isi_laporan'>$row1->icdx</td>
				<td class='isi_laporan'>$row1->kode_produk</td>
				
				<td class='isi_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n3,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n4,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n5,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n6,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n7,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n8,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n9,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n11,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n12,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n13,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n14,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n15,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n21,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n16,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n17,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n18,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n19,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n20,0,",",".")."</td>
				<td class='isi_laporan'>$row1->kode_keg</td>
				<td class='isi_laporan'>$row1->no_rujuk</td>
				<td class='isi_laporan'>$row1->no_selesai</td>
				<td class='isi_laporan'>$row1->no_piutang</td>
				<td class='isi_laporan'>$row1->no_selesai</td>
				<td class='isi_laporan'>$row1->no_tak</td>
			  </tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td class='isi_laporan' colspan='15' align='right'>Total</td>
				<td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n4,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n5,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n6,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n7,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n8,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n9,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n11,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n12,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n13,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n14,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n15,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n21,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n16,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n17,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n18,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n19,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($n20,0,",",".")."</td>
				<td class='isi_laporan'>&nbsp;</td>
			  </tr>";
		}
		echo "</table></td>
      </tr>
   </div>";
		return "";
	}
	
}
?>
