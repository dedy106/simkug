<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kantintu_rptTcash extends server_report_basic
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
		$sql="select  a.no_bukti_t, a.ket, date_format(a.tanggal,'%d/%m/%Y') as tgl
				
				from ktu_tcash_m a 
				
				$this->filter ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("berita acara tcash",$this->lokasi);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='9'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>No Bukti</td>
        <td width='380' class='header_laporan'>: $row->no_bukti_t </td>
      </tr>
     
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tgl </td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->ket </td>
      </tr>
	 
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>No</td>
        <td width='60' class='header_laporan'>Status</td>
		<td width='150' class='header_laporan'>No BA</td>
        <td width='150' class='header_laporan'>ID Tcash</td>
		<td width='150' class='header_laporan'>Nota</td>
		<td width='150' class='header_laporan'>Tanggal</td>
		<td width='150' class='header_laporan'>Kantin</td>
		<td width='150' class='header_laporan'>Tenan</td>
		<td width='150' class='header_laporan'>Nilai</td>
		
        </tr>";
	  $sql1="select a.status as status, a.no_nota, a.id_tcash, b.nilai, b.no_ba, b.tanggal, c.nama as tenan, d.nama as kantin, e.total, e.nilai_adm
	  
				from ktu_tcash_d a
				inner join ktu_nota b on a.no_bukti_t=b.no_bukti_t and a.kode_lokasi=b.kode_lokasi 
				inner join ktu_tenan c on c.kode_tenan=b.kode_tenan and c.kode_lokasi=b.kode_lokasi 
				inner join ktu_kantin d on d.kode_kantin=c.kode_kantin and d.kode_lokasi=c.kode_lokasi
				inner join ktu_tcash_m e on e.no_bukti_t=a.no_bukti_t and a.kode_lokasi=e.kode_lokasi 
 
				where a.no_bukti_t='$row->no_bukti_t' ";
					  
	  $rs1 = $dbLib->execute($sql1);
	  $harga=0;
	  $tot=0;
	  $i=1;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$harga=$row1->total;
		$tot=$row1->nilai_adm;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->status</td>
		<td class='isi_laporan'>$row1->no_ba</td>
        <td class='isi_laporan'>$row1->id_tcash</td>
        <td class='isi_laporan'>$row1->no_nota</td>
        <td class='isi_laporan'>$row1->tanggal</td>
        <td class='isi_laporan'>$row1->kantin</td>
        <td class='isi_laporan'>$row1->tenan</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>		
        
      </tr>";
			$i+=1;
	  }
	 
      echo "<tr>
        <td colspan='8' align='right' class='isi_laporan'>Total</td>
		<td align='right' class='isi_laporan'>".number_format($harga,0,",",".")."</td>	
		</tr>";

      echo "<tr>		
        <td colspan='8' align='right' class='isi_laporan'>Biaya Adminitrasi</td>		
		<td align='right' class='isi_laporan'>".number_format($tot,0,",",".")."</td>
        
		</tr>";
       
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
