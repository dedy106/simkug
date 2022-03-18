<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptKbBuku extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$kode_lokasi=$tmp[3];
		$sql = "select 1 ";
		
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
		$nik_user=$tmp[2];
		$pp=$tmp[3];
		$mutasi=$tmp[4];
		$tmp="";
		if ($mutasi=="Tidak")
		{
			$tmp=" and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$sql="exec sp_kas_pp_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
		if ($pp=="All")
		{
			$sql="exec sp_kas_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
		}
	
		$rs = $dbLib->execute($sql);		
		$sql = "select a.kode_lokasi,a.kode_akun,a.kode_pp,a.nama,a.so_awal,a.periode,c.nama as nama_pp
				from glma_pp_tmp a
				inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='048'
				left join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $tmp
				order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";

			echo $AddOnLib->judul_laporan("buku kasbank",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			$sql2=" and a.periode='$periode' ";
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='8' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Kode Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Kode PP </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
                  </tr>
                </table></td>
     </tr>
 
  <tr>
    <td  colspan='6' class='header_laporan' align='right'>SALDO AWAL</td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='30' class='header_laporan' align='center'>NO</td>
    <td width='60' class='header_laporan' align='center'>TGL TRANSAKSI</td>
	<td width='80' class='header_laporan' align='center'>NO BUKTI</td>
    <td width='300' class='header_laporan' align='center'>URAIAN</td>
    <td width='90' class='header_laporan' align='center'>PENERIMAAN</td>
    <td width='90' class='header_laporan' align='center'>PENGELUARAN</td>
    <td width='90' class='header_laporan' align='center'>SALDO</td>
  </tr>";
			$sql="select a.no_bukti,a.no_dokumen,convert(varchar(20),a.tanggal,103) as tgl,a.kode_pp,a.keterangan,
	   case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit
from trans_j a 
where a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.kode_akun='$row->kode_akun' 
order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet+=$row1->debet;
				$kredit+=$row1->kredit;	
				echo "<tr>
					<td  class='isi_laporan' align='center'>$i</td>
					<td  class='isi_laporan'>$row1->tgl</td>
					<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td  colspan='4'  class='header_laporan' align='right'>JUMLAH&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>&nbsp;</td>
 </tr>
 <tr>
   <td  colspan='4'  class='header_laporan' align='right'>SALDO AKHIR&nbsp;</td>
   <td  colspan='2' class='header_laporan' align='right'>&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
		}
		echo "</center>";
		return "";
	}
	
}
?>
