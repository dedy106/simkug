<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_rptVer extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_ver)
		from pbh_ver_m a
		$this->filter";
		
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
        $sql="select a.no_ver,a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.periode,a.catatan, case when a.status ='1' then 'APPROVE' else 'RETURN' end as status 
        from pbh_ver_m a 
		$this->filter  and a.no_flag='-'  order by a.no_ver";
		// echo $sql;
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan verifikasi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No Ver</td>
     <td width='100'  align='center' class='header_laporan'>No PB</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Periode</td>
	 <td width='200'  align='center' class='header_laporan'>Catatan</td>
	 <td width='200'  align='center' class='header_laporan'>Status</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $nilai=$nilai+$row->nilai;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->no_bukti</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->periode</td>
	 <td class='isi_laporan'>$row->catatan</td>
	 <td class='isi_laporan'>$row->status</td>
     </tr>";
			$i=$i+1;
		}
	// 	echo "<tr >
    
	//   <td class='isi_laporan' align='center' colspan='6'>Total</td>
	//   <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
   
    //  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
