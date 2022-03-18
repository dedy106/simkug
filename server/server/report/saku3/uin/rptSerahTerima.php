<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptSerahTerima extends server_report_basic
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
		
		
		$sql="select a.keterangan,convert(varchar,a.tanggal,103) as tgl,a.kode_pp+' | '+b.nama as pp ,c.no_fisik,convert(varchar,c.tanggal,103) as tgl_serah,c.nik_terima, c.nama_serah,c.no_aju,a.kode_lokasi
        from uin_aju_m a 
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
        inner join uin_stdok_m c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi  
        $this->filter 
        order by a.no_fisik ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan serah terima dokumen",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='10' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_fisik</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>No Aju</td>
        <td width='360' class='header_laporan'>: $row->no_aju</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl_serah</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nama Penyerah </td>
        <td class='header_laporan'>: $row->nama_serah</td>
      </tr>
      <tr>
        <td class='header_laporan'>Unit </td>
        <td class='header_laporan'>: $row->pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
 
  <tr bgcolor='#CCCCCC'>
	<td width='90' height='23'class='header_laporan' align='center'>Nama Penerima</td>
    <td width='90'  class='header_laporan' align='center'>Deskripsi</td>
    <td width='90' class='header_laporan' align='center'>Norma</td>
    <td width='50' class='header_laporan' align='center'>Satuan</td>
    <td width='80' class='header_laporan' align='center'>Harga</td>
    <td width='80' class='header_laporan' align='center'>Volume</td>
    <td width='50' class='header_laporan' align='center'>Jumlah</td>
    <td width='80' class='header_laporan' align='center'>PPN</td>
    <td width='80' class='header_laporan' align='center'>PPh</td>
    <td width='80' class='header_laporan' align='center'>Total</td>
  </tr>
";
			
			$sql="
            select a.*,b.nama,c.nama as atensi, a.total+a.ppn-a.pph as neto 
            from uin_aju_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun 
            inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi 
            inner join uin_stdok_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi
            where d.no_fisik='$row->no_fisik' and a.kode_lokasi='$row->kode_lokasi'
            order by a.nu
";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0;
			$ppn=0;
			$pph=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->neto;
				$ppn+=$row1->ppn;
                $pph+=$row1->pph;
				echo "<tr>
					<td height='23' class='isi_laporan'>$row1->atensi</td>
					<td height='23' class='isi_laporan'>$row1->keterangan</td>
                    <td class='isi_laporan'>$row1->nama</td>
                    <td class='isi_laporan'>$row1->satuan</td>
                    <td  class='isi_laporan' align='right'>".number_format($row1->tarif,0,',','.')."</td>
                    <td  class='isi_laporan' align='right'>".number_format($row1->vol,0,',','.')."</td>
                    <td  class='isi_laporan' align='right'>".number_format($row1->total,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->ppn,0,',','.')."</td>
                    <td class='isi_laporan' align='right'>".number_format($row1->pph,0,',','.')."</td>
                    <td  class='isi_laporan' align='right'>".number_format($row1->neto,0,',','.')."</td>
				</tr>";
				
			}
			echo "<tr>
            <td height='23' colspan='7'class='header_laporan' align='center'>Total</td>
            <td valign='top' class='header_laporan' align='right'>".number_format($ppn,0,',','.')."</td>
            <td valign='top' class='header_laporan' align='right'>".number_format($pph,0,',','.')."</td>
            <td valign='top' class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
            </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
