<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptRekapBayar extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$kode_pp=$tmp[1];
		$jeno_reg=$tmp[2];
		$nama_file="siswa.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.no_reg,c.nama,a.no_kas,convert(varchar,b.tanggal,103) as tgl,a.nilai 
        from sis_reg_bayar a
        inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        inner join sis_siswareg c on a.no_reg=c.no_reg and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
        $this->filter
        ";
		if ($jeno_reg=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data calon siswa",$this->lokasi."<br>".$nama_pp,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
            <tr bgcolor='#CCCCCC'>
            <td width='20' align='center' class='header_laporan'>No</td>
            <td width='60' align='center' class='header_laporan'>No Reg</td>
            <td width='300' align='center' class='header_laporan'>Nama</td>
            <td width='90' align='center' class='header_laporan'>No Bukti</td>
            <td width='60' align='center' class='header_laporan'>Tanggal</td>
            <td width='90' align='center' class='header_laporan'>Nilai</td>

            </tr>";
            $nilai=0;
			while ($row = $rs->FetchNextObject($toupper=false))
		{   
            $nilai+= $row->nilai;
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td> 
   <td class='isi_laporan'>";
            echo $row->no_reg;
			// echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_reg','$row->kode_lokasi','$row->kode_pp');\">$row->no_reg</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->no_kas</td>
			<td class='isi_laporan'>$row->tgl</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>

    </tr>";	 
			$i=$i+1;
		}
        echo "<tr>
   <td class='isi_laporan' align='center' colspan='5'>Total</td>
			<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>

    </tr>";	 
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
