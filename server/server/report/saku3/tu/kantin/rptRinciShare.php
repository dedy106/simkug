<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptRinciShare extends server_report_basic
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
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $filterx=$tmp[2];
		
		$sql="select d.nama as nama_kantin,a.kode_tenan,c.nama as nama_tenan,a.nota,a.sharing,isnull(b.ubersih,0) as ubersih, a.sharing-isnull(b.ubersih,0) as jum_share
        from 
        (
        select b.kode_tenan,sum(b.nilai) as nota,sum(a.persen/100 * b.nilai) as sharing
        from kantin_load a inner join kantin_nota b on a.no_load=b.no_load
        $this->filter
        group by b.kode_tenan
        ) a
        inner join ktu_tenan c on a.kode_tenan=c.kode_tenan 
        inner join ktu_kantin d on c.kode_kantin=d.kode_kantin 
        left join 
        (
        select kode_tenan,ubersih
        from kantin_ubersih
        $filterx
        ) b on a.kode_tenan=b.kode_tenan
        where a.sharing-isnull(b.ubersih,0) <> 0
        ";

        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pendapatan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='150'  align='center' class='header_laporan'>Kantin</td>
            <td width='100'  align='center' class='header_laporan'>Tenan</td>
            <td width='90'  align='center' class='header_laporan'>Total</td>
            <td width='90'  align='center' class='header_laporan'>Sharing</td>
            <td width='90'  align='center' class='header_laporan'>Uhar</td>
            <td width='90'  align='center' class='header_laporan'>Total Sharing</td>
	    </tr>  ";
	    $i=1; $total=0; $sharing=0; $ubersih=0; $jum_share=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->nota;
			$sharing+=$row->sharing;
			$ubersih+=$row->ubersih;
			$jum_share+=$row->jum_share;
			echo "<tr>
			<td class='isi_laporan'>$i</td>	 
			 <td class='isi_laporan'>$row->nama_kantin</td>
			 <td class='isi_laporan'>$row->nama_tenan</td>
			<td class='isi_laporan' align='right'>".number_format($row->nota,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->sharing,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->ubersih,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($row->jum_share,0,",",".")."</td>
		  </tr>";
			$i=$i+1;
	
		}
		echo "<tr>
			<td class='header_laporan' colspan='3' align='right'>TOTAL</td>
			<td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($sharing,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($ubersih,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($jum_share,0,",",".")."</td>
		  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
