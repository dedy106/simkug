<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptBa extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$periode=$tmp[0];
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
		$tmp=explode("/",$this->filter);
		$periode=$tmp[0];
		$sql="select a.no_ba, date_format(a.tanggal,'%d/%m/%Y') as tgl, a.keterangan, c.nama
				from ktu_ba a 
				inner join ktu_closing_m b on b.no_closing=a.no_closing and b.kode_lokasi=a.kode_lokasi					
				inner join ktu_kantin c on c.kode_kantin=b.kode_kantin and c.kode_lokasi=b.kode_lokasi
						
				$this->filter";
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("berita acara",$this->lokasi);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='9'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>No Bukti</td>
        <td width='380' class='header_laporan'>: $row->no_ba </td>
      </tr>
     
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tgl </td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
<tr>
        <td class='header_laporan'>Lokasi Kantin</td>
        <td class='header_laporan'>: $row->nama </td>
      </tr>	 
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>No</td>
        <td width='60' class='header_laporan'>Tenan</td>
		<td width='150' class='header_laporan'>Tanggal Nota</td>
        <td width='150' class='header_laporan'>No Nota</td>
		<td width='150' class='header_laporan'>Status</td>
		<td width='150' class='header_laporan'>Jumlah</td>
		
        </tr>";
	  $sql1="select b.nama, date_format(a.tanggal,'%d/%m/%Y') as tgl, a.no_bukti, a.status, a.nilai	  
				from ktu_nota a
				inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi 
				where a.no_ba='$row->no_ba'
				order by a.status asc ";
					  
	  $rs1 = $dbLib->execute($sql1);
	  $tot=0;
	  $i=1;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$tot+=$row1->nilai;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama</td>
		<td class='isi_laporan'>$row1->tgl</td>
        <td class='isi_laporan'>$row1->no_bukti</td>
        <td class='isi_laporan'>$row1->status</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>		
        
      </tr>";
	  }
	 
      echo "<tr>
        <td colspan='5' align='right' class='isi_laporan'>Total</td>
		<td align='right' class='isi_laporan'>".number_format($tot,0,",",".")."</td>	
		</tr>";

				$i+=1;

       
    echo "</table><br>";
	}

	echo "</div>";
	return "";
		
	}
	
}
?>