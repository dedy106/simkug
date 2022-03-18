<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptPesan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		
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
		$sql="select a.kode_proyek,i.nama as proyek,a.no_pesan,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp,
		a.kode_akun,c.nama as nama_akun,e.nama as nama_lokasi,a.lok_proses,a.maksud,a.aspek,a.nik_ttd1,a.nik_ttd2,
		a.nik_ttd3,a.jab_ttd1,a.jab_ttd2,a.jab_ttd3,f.nama as nama1,g.nama as nama2,h.nama as nama3
		from log_pesan_m a 
	 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
		inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
		inner join lokasi e on a.lok_proses=e.kode_lokasi 
		inner join karyawan f on a.nik_ttd1=f.nik and f.flag_aktif='1' and f.kode_lokasi=a.kode_lokasi
		inner join karyawan g on a.nik_ttd2=g.nik and g.flag_aktif='1' and g.kode_lokasi=a.kode_lokasi
		inner join karyawan h on a.nik_ttd3=h.nik and h.flag_aktif='1' and h.kode_lokasi=a.kode_lokasi
		left join log_proyek i on a.kode_proyek=i.kode_proyek and i.kode_lokasi=a.kode_lokasi
$this->filter
order by a.no_pesan";
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("purchase request",$this->lokasi," ");

		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
			echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td>
			<table border='0' cellspacing='2' cellpadding='1'>
			  
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				<tr>
				<td width='100' class='header_laporan'>Tanggal </td>
				<td class='header_laporan'>:</td>
				<td width='496' class='header_laporan'>&nbsp;$row->tanggal</td>
				</tr>
				  <tr>
					<td width='100' class='header_laporan'>No Bukti </td>
					<td class='header_laporan'>:</td>
					<td width='496' class='header_laporan'>&nbsp;$row->no_pesan</td>
					</tr>
					<tr>
					<td class='header_laporan'>No Dokumen</td>
					<td class='header_laporan'>:</td>
					<td class='header_laporan'>&nbsp;$row->no_dokumen</td>
					</tr>
					<tr>
					<td class='header_laporan'>Proyek</td>
					<td class='header_laporan'>:</td>
					<td class='header_laporan'>&nbsp;$row->proyek</td>
					</tr>

				  <tr>
					<td width='100' class='header_laporan'>PP </td>
					<td class='header_laporan'>:</td>
					<td width='496' class='header_laporan'>&nbsp;$row->nama_pp</td>
					</tr>
				  <tr>
					<td width='100' class='header_laporan'>Akun Anggaran </td>
					<td class='header_laporan'>:</td>
					<td width='496' class='header_laporan'>&nbsp;$row->kode_akun -&nbsp; $row->nama_akun</td>
					</tr>
					
					<tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:</td>
					<td class='header_laporan'>&nbsp;$row->keterangan</td>
					</tr>
					<tr>
					<td class='header_laporan'>Maksud Tujuan </td>
					<td class='header_laporan'>:</td>
					<td class='header_laporan'>$maksud</td>
					</tr>
					
					<tr>
					<td class='header_laporan'>Aspek Strategis </td>
					<td class='header_laporan'>:</td>
					<td class='header_laporan'>$aspek</td>
				  </tr>
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='15' align='center' class='header_laporan'>No</td>
				<td width='200' align='center' class='header_laporan'>Item Barang</td>
					<td width='100' align='center' class='header_laporan'>Merk</td>
					<td width='100' align='center' class='header_laporan'>Tipe</td>
					<td width='200' align='center' class='header_laporan'>Catatan</td>
				 <td width='60' align='center' class='header_laporan'>Jumlah</td>
					<td width='90' align='center' class='header_laporan'>Nilai</td>
					<td width='90' align='center' class='header_laporan'>Total</td>
							</tr>";
				$sql1="select a.item,a.merk,a.tipe,a.catatan,a.nilai,a.jumlah,a.harga,a.nilai*a.jumlah as total 
				from log_pesan_d a
				where a.no_pesan='$row->no_pesan' ";

				$rs1 = $dbLib->execute($sql1);
				$j=1;$jumlah=0; $nilai=0; $total=0; 
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$jumlah+=$row1->jumlah;
					$nilai+=$row1->nilai;
					$total+=$row1->total;
					echo "<tr>
			<td align='center' class='isi_laporan'>$j</td>
			<td  class='isi_laporan'>$row1->item</td>
			<td class='isi_laporan'>$row1->merk</td>
		<td class='isi_laporan'>$row1->tipe</td>
			<td  class='isi_laporan'>$row1->catatan</td>
		 <td align='center' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
			<td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
		</tr>";		
					$j=$j+1;
				}
				echo "<tr>
			<td colspan='5' align='center'  class='header_laporan'>Total</td>
		<td align='center' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
			<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
		<td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>			</tr>
	</table></td>
  </tr>
  
</table></td>
	</tr>";

	echo"<tr>
	<td height='40'>&nbsp;</td>
</tr>
  <tr>
    <td align='center'><table border='0' cellspacing='2' cellpadding='1' width='800' class='kotak'>
			<tr>
			
			
        <td width='350' class='header_laporan'>Direncanakan Oleh :</td>
				<td  width='350' class='header_laporan'>Diperiksa Oleh:</td>
				<td  width='350'  class='header_laporan'>Disetujui Oleh:</td>

      </tr>
      <tr>
        <td  height='60'>&nbsp;</td>
        <td  >&nbsp;</td>
      </tr>
      <tr>
        <td width='350'  class='header_laporan'>$row->nama1</td>
        <td width='350'   class='header_laporan'>$row->nama2</td>
        <td width='350'  class='header_laporan'>$row->nama3</td>
      </tr>
      <tr>
        <td width='350'  class='header_laporan'>$row->jab_ttd1</td>
				<td width='350'   class='header_laporan'>$row->jab_ttd2</td>
				<td width='350'  class='header_laporan'>$row->jab_ttd3</td>

      </tr>
    </table></td>
  </tr>
</table><br><br><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
