<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptSisKartuYpt extends server_report_basic
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
		$nama_file="kartu.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/tarbak.jpg";
		
		$sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,f.nama as nama_jur,a.id_bank,a.kode_akt,
		isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
from sis_siswa a
inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp
left join (select a.nis,a.kode_pp,a.kode_lokasi
			from sis_cd_d a
			where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
			group by a.nis,a.kode_pp,a.kode_lokasi
			)g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
		from sis_cd_d a			
		inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
		where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.kode_pp='$kode_pp'
		group by a.nis,a.kode_lokasi,a.kode_pp
		)c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
		from sis_cd_d a			
		inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
		where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' and a.kode_pp='$kode_pp'
		group by a.nis,a.kode_lokasi,a.kode_pp
		)d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
		from sis_cd_d a			
		inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
		where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' and a.kode_pp='$kode_pp'
		group by a.nis,a.kode_lokasi,a.kode_pp
		)e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
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
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' rowspan='4'><img src='$pathfoto' width='80' height='80' /></td>
        <td width='700' align='center' class='header_laporan'>YAYASAN TARUNA BAKTI</td>
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
    <td colspan='12' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
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
	   <tr>
				<td class='header_laporan'>Saldo PDD</td>
				
        <td class='header_laporan'>: <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nis','$row->kode_lokasi','$kode_pp');\">".number_format($row->so_akhir,0,",",".")."</a></td>
      </tr>
    </table></td>
  </tr>
    <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='60' rowspan='2' class='header_laporan'>Tanggal </td>
		<td width='100' rowspan='2' class='header_laporan'>No Bukti</td>
		<td width='60' colspan='2' class='header_laporan'>Jenis Tagihan</td>
	<td width='60' rowspan='2' class='header_laporan'>Modul</td>
	<td width='150' rowspan='2' class='header_laporan'>Keterangan</td>
    <td width='90' rowspan='2'class='header_laporan'>Tagihan</td>
    <td width='90' colspan='2' class='header_laporan'>Pembayaran</td>
	<td width='90' rowspan='2' class='header_laporan'>Saldo Piutang</td>
	<td width='90' rowspan='2' class='header_laporan'>Saldo PDD</td>
	</tr>
	<tr bgcolor='#CCCCCC'>
	<td width='60'  align='center' class='header_laporan'>Periode</td>
<td width='70'  align='center' class='header_laporan'>Parameter</td>
	</tr> 
 ";
			$sql1="select 0 as sisa,a.periode,a.no_bill as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'BILL' as modul,
			isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
from (select x.periode,x.kode_lokasi,x.no_bill,x.kode_param,sum(x.nilai) as tagihan,0 as bayar	
	from sis_bill_d x 			
	inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
	where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 
	group by x.periode,x.kode_lokasi,x.no_bill,x.nis,x.kode_param
	)a
inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi	
union all
select 0 as sisa,a.periode,a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'PDD' as modul,
	isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
from (select z.modul,z.nilai as sisa,x.periode,x.kode_lokasi,x.no_rekon,x.kode_param,0 as tagihan,sum(x.nilai) as bayar
	from sis_rekon_d x 			
	inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
	inner join sis_cd_d z on x.no_rekon=z.no_bukti and x.kode_lokasi=z.kode_lokasi and x.kode_pp=z.kode_pp and x.nis=z.nis
	where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 and x.dc='D'
	group by z.modul,z.nilai,x.periode,x.kode_lokasi,x.no_rekon,x.nis,x.kode_param
	)a
inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi	
union all
select isnull(a.sisa,0) as sisa,a.periode,a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'KB' as modul,
	isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
from (select z.modul,z.nilai as sisa,x.periode,x.kode_lokasi,x.no_rekon,x.kode_param,0 as tagihan,sum(x.nilai) as bayar
	from sis_rekon_d x 			
	inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
	left join sis_cd_d z on x.no_rekon=z.no_bukti and x.kode_lokasi=z.kode_lokasi and x.kode_pp=z.kode_pp and x.nis=z.nis
	where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 
	group by z.modul,z.nilai,x.periode,x.kode_lokasi,x.no_rekon,x.nis,x.kode_param
	)a
inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi	
union all

select 0 as sisa,a.periode,a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'BTLREKON' as modul,
	isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
from (select z.modul,z.nilai as sisa,x.periode,x.kode_lokasi,x.no_rekon,x.kode_param,sum(x.nilai) as tagihan,0 as bayar
	from sis_rekon_d x 			
	inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
	inner join sis_cd_d z on x.no_rekon=z.no_bukti and x.kode_lokasi=z.kode_lokasi and x.kode_pp=z.kode_pp and x.nis=z.nis
	where x.kode_lokasi = '$kode_lokasi' and x.nis='$row->nis' and x.kode_pp='$kode_pp' and x.nilai<>0 and x.dc='C'
	group by z.modul,z.nilai,x.periode,x.kode_lokasi,x.no_rekon,x.nis,x.kode_param
	)a
inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi	
order by tanggal,modul
 ";
			
			$rs1 = $dbLib->execute($sql1);
			$tagihan=0;$bayar=0;$saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				
				
				$tagihan+=$row1->tagihan;
				$bayar+=$row1->bayar;
				$sisa+=$row1->sisa;
				$saldo=$saldo+$row1->tagihan-$row1->bayar;
				$modul=strtoupper($row1->modul); 
				
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->tgl</td>
				<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBill('$row1->no_bukti','$row1->kode_lokasi','$kode_pp','$row1->modul');\">$row1->no_bukti</a>";
			echo "</td>
			<td class='isi_laporan'>$row1->periode</td>
			<td class='isi_laporan'>$row1->kode_param</td>

				<td class='isi_laporan'>$modul</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td align='right' class='isi_laporan'>".number_format($row1->tagihan,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->bayar,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($saldo_pdd,0,",",".")."</td>
			  </tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td align='right' class='header_laporan' colspan='7'>Total</td>
				<td align='right' class='header_laporan'>".number_format($tagihan,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($bayar,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($saldo,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($saldo_pdd,0,",",".")."</td>
				<td align='right' class='header_laporan'>&nbsp;</td>
			  </tr>";
			
			echo "<tr>
				<td align='right' class='header_laporan' colspan='10'>Saldo</td>
				<td align='right' class='header_laporan'>".number_format($saldo,0,",",".")."</td>
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
  
