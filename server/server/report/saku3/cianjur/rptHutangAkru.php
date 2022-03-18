<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_cianjur_rptHutangAkru extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_hutang)
		from hutang_m a $this->filter ";
		error_log($sql);
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
		
		
		$sql="select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.nilai_ppn,a.nilai-a.nilai_ppn as tagihan,
		b.nama as nama_vendor,a.nik_user,a.nik_app,c.nama as nama_user,d.nama as nama_app,a.kode_lokasi,a.no_dokumen,e.kota,a.tanggal,
		a.kode_pp,f.nama as nama_pp,a.akun_hutang,g.nama as nama_akun,a.kode_vendor
		from hutang_m a
		inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
		left join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi 
		left join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
		inner join lokasi e on a.kode_lokasi=e.kode_lokasi
		inner join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi
		inner join masakun g on a.akun_hutang=g.kode_akun and a.kode_lokasi=g.kode_lokasi
		$this->filter
		order by a.no_hutang";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='1' cellpadding='2' >
  <tr>
    <td  align='center' class='istyle17'>AKRU HUTANG</td>
  </tr>
  
  <tr>
    <td style='padding:5px;'><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='100' class='header_laporan'>No Bukti </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_hutang</td>
      </tr>
      <tr>
        <td width='100' class='header_laporan'>No Dokumen </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tgl</td>
      </tr>
      <tr>
        <td class='header_laporan'>PP</td>
        <td class='header_laporan'>: $row->kode_pp - $row->nama_pp </td>
      </tr>
      <tr>
        <td class='header_laporan'>Akun Hutang </td>
        <td class='header_laporan'>: $row->akun_hutang - $row->nama_akun </td>
      </tr>
      <tr>
        <td class='header_laporan'>Vendor</td>
        <td class='header_laporan'>: $row->kode_vendor - $row->nama_vendor </td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  
  <tr>
    <td style='padding:10px 10px;'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='header_laporan' height='20'><div align='center'>No</div></td>
				<td width='80' class='header_laporan'><div align='center'>Akun</div></td>
				<td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
				<td width='200' class='header_laporan'><div align='center'>Keterangan </div></td>
				<td width='40' class='header_laporan'><div align='center'>PP </div></td>
				<td width='60' class='header_laporan'><div align='center'>DRK </div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
			  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
			from hutang_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_hutang='$row->no_hutang' and a.kode_lokasi='$row->kode_lokasi' and a.dc='D'
			order by a.no_urut ";
		//error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->kode_drk</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='6' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
 
 <tr>
    <td align='right' style='padding:10px 10px;'><table width='300' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td height='20' class='header_laporan' style='padding-left:20px;'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='header_laporan'></td>
      </tr>
      <tr align='center'>
        <td width='150' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='150' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'><u>$row->nama_app</u></td>
        <td class='header_laporan'><u>$row->nama_user</u></td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>NIK.$row->nik_app</td>
        <td class='header_laporan'>NIK.$row->nik_user</td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
</table><br>";
		echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
