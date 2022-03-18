<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_logistik_rptBarangKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$jenis=$tmp[1];
		$sql = "select a.kode_gedung,a.kode_lokasi,a.nama,a.kode_klp,b.nama as nama_klp
from log_gedung a
inner join log_gedung_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_klp,a.kode_gedung ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KARTU monitoring aset",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row->nilai,0,",",".");
		echo "<table width='700'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td colspan='8' styile='padding:5px' ><table width='700' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='132' class='header_laporan'>Kelompok Gedung</td>
            <td width='558' class='header_laporan'>: $row->kode_klp - $row->nama_klp </td>
          </tr>
          <tr>
            <td class='header_laporan'>Gedung</td>
            <td class='header_laporan'>: $row->kode_gedung - $row->nama </td>
          </tr>
          <tr>
            <td class='header_laporan'>Ruangan</td>
            <td  class='header_laporan'>:  </td>
          </tr>
          
         
        </table></td>
      </tr>
	 
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>No</td>
        <td width='60' class='header_laporan'>Kode Barang</td>
		<td width='300' class='header_laporan'>Nama Barang</td>
		<td width='60' class='header_laporan'>Jumlah</td>
		<td width='50' class='header_laporan'>Satuan</td>
      </tr>
";
	  $sql1="select a.kode_lokasi,a.kode_klpfa,a.nama,isnull(b.jumlah,0) as jumlah
from fa_klp a
left join (select a.kode_klpfa,a.kode_lokasi,count(a.no_fa) as jumlah
		   from fa_asset a
		   where a.kode_lokasi='$kode_lokasi' and a.kode_gedung='$row->kode_gedung'
		   group by a.kode_klpfa,kode_lokasi
		   ) b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and isnull(b.jumlah,0)<>0
order by a.kode_klpfa
";
	
		$rs1 = $dbLib->execute($sql1);
		$jumlah=0;$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			
			
			$jumlah+=$row1->jumlah;
			echo "<tr>
				<td align='center' class='isi_laporan'>$j</td>
				<td class='isi_laporan'>$row1->kode_klpfa</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan' align='center'>".number_format($row1->jumlah,0,",",".")."</td>
				<td class='isi_laporan' align='center'>Unit</td>
			  </tr>";
			$j=$j+1;
			if ($jenis=="Detail")
			{
				$sql="select a.kode_lokasi,a.no_fa,a.nama 
					  from fa_asset a
					  where a.kode_lokasi='$kode_lokasi' and kode_klpfa='$row1->kode_klpfa' and kode_gedung='$row->kode_gedung'
					  order by a.no_fa ";
				$rs2 = $dbLib->execute($sql);
				$k=1;
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					 echo "<tr>
						<td align='center' class='isi_laporan'>&nbsp;</td>
						<td class='isi_laporan'>$row2->no_fa</td>
						<td class='isi_laporan'>$row2->nama</td>
						<td class='isi_laporan' align='center'>&nbsp;</td>
						<td class='isi_laporan' align='center'>&nbsp;</td>
					  </tr>";
					  $k=$k+1;
				}
				
			}
		}
			
       echo "<tr>
        <td colspan='3' class='isi_laporan' align='right'>Total</td>
        <td class='isi_laporan' align='center'>".number_format($jumlah,0,",",".")."</td>
        </tr>";
		
    echo "</table><br>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
