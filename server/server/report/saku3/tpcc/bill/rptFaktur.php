<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_bill_rptFaktur extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_bill,a.no_dokumen,a.no_kontrak,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,
		a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as bill,b.nama as nama_cust,isnull(c.file_faktur,'-') as file_dok,a.no_faktur
from bill_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
left join bill_app c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_bill ";

// echo $sql;

        
        $path = "http://".$_SERVER["SERVER_NAME"]."/server/media/";	
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar faktur",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bill</td>
     <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='100'  align='center' class='header_laporan'>No Kontrak</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Bill</td>
     <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
     <td width='90'  align='center' class='header_laporan'>Total Bill</td>
     <td width='90'  align='center' class='header_laporan'>No Faktur</td>
     <td width='90'  align='center' class='header_laporan'>Lihat Faktur</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$bill=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$bill=$bill+$row->bill;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_bill</td>
     <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->no_kontrak</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bill,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan'>$row->no_faktur</td>";
     if($row->file_dok != "-"){
        echo"
     <td class='isi_laporan' ><a href='".$path.$row->file_dok."' target='_blank'>Lihat</a></td>";
     }else{
        echo"
        <td class='isi_laporan' >-</td>";
     }
     echo"
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($bill,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
