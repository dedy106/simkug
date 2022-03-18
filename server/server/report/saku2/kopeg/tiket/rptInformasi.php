<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_tiket_rptInformasi extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$tmp=explode("/",$this->filter2);
		$no_konten=$tmp[0];
		$sql="select a.no_konten,a.tanggal,a.kode_klp,a.judul,a.keterangan,a.file_gambar,a.nik_buat,dbo.fnHariTanggal(a.tanggal) as tgl,CONVERT(VARCHAR(8),a.tanggal,108) as jam,b.nama as nama_klp
		from sai_konten a 
		inner join sai_klpkonten b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
		$this->filter ";
	
		$rs = $dbLib->execute($sql);	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"serverApp.php"));	
			$kode_klp=$row->kode_klp;
			$nama_klp=$row->nama_klp;
			$pathfoto = $path . "media/".$row->file_gambar;
			
			echo "<table width='1100' border='0' cellspacing='2' cellpadding='1'>
  <tr valign='top'><td width='800'>
  <table width='800' border='0' cellspacing='1' cellpadding='2'>
  <tr>
    <td width='290' style='font-size: 20px;font-weight:bold;color: #0099FF;' >$row->judul</td>
  </tr>
  <tr>
    <td style='font-size: 10px;color: #999;' >Penulis : $row->nik_buat | $row->tgl | $row->jam</td>
  </tr>
  <tr>
    <td style='padding:5px;'>";
	
	if ($row->file_gambar!="-")
	{
		echo "<img src='$pathfoto' align='left' width='800' height='380'>";
	}
	echo "</td>
  </tr>
  <tr><td style='font-size: 12px;text-align:justify;'>";
		echo urldecode($row->keterangan);      
		echo "</td>
  </tr>
</table>";
		 
			$i=$i+1;
		}
		echo "</td>
    <td width='300'><table width='300' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'  style='font-size: 14px;font-weight:bold;color: #0099FF;'>$nama_klp </td>
      </tr>
      <tr>
        <td colspan='2' style='color:#0099FF;border-width:3px;border-top-style:solid;border-right-style:none;border-bottom-style:none;border-left-style:none;'></td>
        </tr>";
		$sql="select a.no_konten,a.judul from sai_konten a where a.no_konten<>'$no_konten' and a.kode_klp='$kode_klp' order by tanggal desc";
		
		$rs = $dbLib->execute($sql);
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td width='30' align='center' style='color: #fec287;font-size: 26px;font-style:italic;'>$i</td>
        <td width='270'>";
		echo "<a style='cursor:pointer;color:blue;' onclick=\"window.parent.system.getResource(".$resource.").doDetail('$row->no_konten');\">$row->judul</a>";
		echo "</td>
      </tr>
      <tr>
        <td colspan='2'  style='border-width:1px;border-top-style:none;border-right-style:none;border-bottom-style:dotted;border-left-style:none;'></td>
        </tr>";
			$i=$i+1;
		}
    echo "</table></td>
  </tr>
</table>";
			
		return "";
	}
	
}
?>
  
