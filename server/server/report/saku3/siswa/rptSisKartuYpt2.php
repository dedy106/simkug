<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisKartuYpt2 extends server_report_basic
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
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$periode_filter=$tmp[4];
		$periode2=$tmp[5];

		$nama_file="kartu.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/yspt.png";
		
		$sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,f.nama as nama_jur,a.id_bank,a.kode_akt
from sis_siswa a
inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp
$this->filter
order by a.nis ";
		
		if ($jenis=="Excel")
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
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("kartu siswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		if($periode2 <> ""){
			$judul_periode=$AddOnLib->ubah_periode($periode)." - ".$AddOnLib->ubah_periode($periode2);
		}else{
			$judul_periode=$AddOnLib->ubah_periode($periode);
		}
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' rowspan='4'><img src='$pathfoto' width='80' height='80' /></td>
        <td width='700' align='center' class='header_laporan'>YAYASAN PENDIDIKAN TELKOM</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>$nama_pp</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>KARTU SISWA</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>Periode ".$AddOnLib->ubah_periode($periode)."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>";
			echo "
			<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr>
    <td colspan='13' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>NIS</td>
        <td width='400' class='header_laporan'>: $row->nis</td>
      </tr>
	  <tr>
        <td width='60' class='header_laporan'>ID Bank</td>
        <td width='400' class='header_laporan'>: $row->id_bank</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kelas</td>
        <td class='header_laporan'>: $row->kode_kelas</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Angkatan</td>
        <td class='header_laporan'>: $row->kode_akt</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jurusan</td>
        <td class='header_laporan'>: $row->kode_jur - $row->nama_jur</td>
      </tr>
	 
    </table></td>
  </tr>
    <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='60' rowspan='2' class='header_laporan'>Tanggal </td>
	<td width='100' rowspan='2' class='header_laporan'>No Bukti</td>
	<td width='60' colspan='2' class='header_laporan'>Jenis Tagihan</td>
	<td width='50' rowspan='2' class='header_laporan'>Modul</td>
	<td width='200' rowspan='2' class='header_laporan'>Keterangan</td>
	<td width='50' colspan='3' class='header_laporan'>Piutang</td>
	<td width='50' colspan='3' class='header_laporan'>PDD</td>
   
	</tr>
	<tr bgcolor='#CCCCCC'>
	<td width='60'  align='center' class='header_laporan'>Periode</td>
	<td width='70'  align='center' class='header_laporan'>Parameter</td>
	<td width='80'  align='center' class='header_laporan'>Tagihan</td>
	<td width='80'  align='center' class='header_laporan'>Pembayaran</td>
	<td width='80'  align='center' class='header_laporan'>Saldo</td>
	<td width='80'  align='center' class='header_laporan'>Pemasukan</td>
	<td width='80'  align='center' class='header_laporan'>Pengeluaran</td>
	<td width='80'  align='center' class='header_laporan'>Saldo</td>
	</tr> 
 ";
			$sql1="select a.no_bill as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,a.periode,
						b.keterangan,'BILL' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param,
						0 as masuk,0 as keluar
			 from (select x.kode_lokasi,x.no_bill,x.kode_param,sum(x.nilai) as tagihan,0 as bayar,x.periode 
					from sis_bill_d x 
					inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
					where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 
					group by x.kode_lokasi,x.no_bill,x.nis,x.kode_param,x.periode
					 )a 
			inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
			$periode_filter
			union all 
			select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
				convert(varchar(10),b.tanggal,103) as tgl,a.periode,b.keterangan,'PDD' as modul, isnull(a.tagihan,0) as tagihan,
				isnull(a.bayar,0) as bayar,a.kode_param,0 as masuk,0 as keluar
			from (select x.kode_lokasi,x.no_rekon,x.kode_param,x.periode,
						sum(case when x.modul in ('BTLREKON') then x.nilai else 0 end) as tagihan,
						sum(case when x.modul <>'BTLREKON' then x.nilai else 0 end) as bayar
					from sis_rekon_d x 
					inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
					where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0
					group by x.modul,x.nilai,x.kode_lokasi,x.no_rekon,x.nis,x.kode_param,x.periode
				 )a 
			inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi 
			$periode_filter
			union all 
			select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
				convert(varchar(10),b.tanggal,103) as tgl,a.periode,b.keterangan,'KB' as modul, 
				isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param,0 as masuk,0 as keluar
			from (select x.kode_lokasi,x.no_rekon,x.kode_param,x.periode,
						sum(case when x.modul in ('BTLREKON') then x.nilai else 0 end) as tagihan,
						sum(case when x.modul <>'BTLREKON' then x.nilai else 0 end) as bayar
				    from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
					where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 
					group by x.modul,x.nilai,x.kode_lokasi,x.no_rekon,x.nis,x.kode_param ,x.periode
					)a
					inner join (select tanggal,keterangan,no_kas,kode_lokasi from kas_m where kode_lokasi='$kode_lokasi' union select tanggal,keterangan,no_ju as no_kas,kode_lokasi from ju_m where kode_lokasi='$kode_lokasi') b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi 
			$periode_filter
			union all 
			select a.no_bukti as no_bukti,a.kode_lokasi,b.tanggal,
				convert(varchar(10),b.tanggal,103) as tgl,a.periode,b.keterangan,'KB' as modul, 
				0 as tagihan,0 as bayar,'PDD' as kode_param,isnull(a.masuk,0) as masuk,isnull(a.keluar,0)  as keluar
			from (select x.kode_lokasi,x.no_bukti,x.kode_param,x.periode,x.modul,
						sum(case when x.dc='D' then x.nilai else 0 end) as masuk,
						sum(case when x.dc='C' then x.nilai else 0 end) as keluar
				    from sis_cd_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
					where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 
					group by x.modul,x.nilai,x.kode_lokasi,x.no_bukti,x.nis,x.kode_param ,x.periode
				  )a
			inner join (select tanggal,keterangan,no_kas,kode_lokasi from kas_m where kode_lokasi='$kode_lokasi' union select tanggal,keterangan,no_ju as no_kas,kode_lokasi from ju_m where kode_lokasi='$kode_lokasi') b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi 
			$periode_filter
			union all 
			select a.no_bukti as no_bukti,a.kode_lokasi,b.tanggal,
				convert(varchar(10),b.tanggal,103) as tgl,a.periode,b.keterangan,a.modul, 
				0 as tagihan,0 as bayar,'PDD' as kode_param ,isnull(a.masuk,0) as masuk,isnull(a.keluar,0)  as keluar
			from (select x.kode_lokasi,x.no_bukti,x.kode_param,x.periode,x.modul,
						sum(case when x.dc='D' then x.nilai else 0 end) as masuk,
						sum(case when x.dc='C' then x.nilai else 0 end) as keluar
				    from sis_cd_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
					where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 
					group by x.modul,x.nilai,x.kode_lokasi,x.no_bukti,x.nis,x.kode_param ,x.periode
					)a
			inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
			$periode_filter
			order by tanggal,modul ";
			
			$rs1 = $dbLib->execute($sql1);
			$tagihan=0;$bayar=0;$saldo=0;$saldo_pdd=0;$masuk=0;$keluar=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				
				
				$tagihan+=$row1->tagihan;
				$bayar+=$row1->bayar;
				$masuk+=$row1->masuk;
				$keluar+=$row1->keluar;
				$modul=strtoupper($row1->modul); 
				$kode_param=strtoupper($row1->kode_param); 
				$saldo=$saldo+$row1->tagihan-$row1->bayar;
				$saldo_pdd=$saldo_pdd+$row1->masuk-$row1->keluar;
			
				
				
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->tgl</td>
				<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetRekonBill('$row1->no_bukti','$row1->kode_lokasi','$modul','$row->nis','$kode_pp');\">$row1->no_bukti</a>";
			echo "</td>
			<td class='isi_laporan'>$row1->periode</td>
			<td class='isi_laporan'>$kode_param</td>
				<td class='isi_laporan'>$modul</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td align='right' class='isi_laporan'>".number_format($row1->tagihan,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->bayar,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->masuk,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->keluar,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($saldo_pdd,0,",",".")."</td>
			  </tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td align='right' class='header_laporan' colspan='7'>Total</td>
				<td align='right' class='header_laporan'>".number_format($tagihan,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($bayar,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($saldo,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($masuk,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($keluar,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($saldo_pdd,0,",",".")."</td>
			  </tr>";
			
		
			echo "</table>
		</td>
  </tr>
</table>"; 
			echo "<br>"; 
			
			$i=$i+1;
		}
		
		echo "</div>";
		return "";
	}
	
}
?>
  
