<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptBmhdKartu extends server_report_basic
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
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[3];
		$nama_file="kartu_bmhd.xls";
		
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/yspt.png";
		
		$sql="select a.no_bmhd,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan 
        from bmhd_m a
        $this->filter
        order by a.no_bmhd ";
        // echo $sql;
		
		if ($jenis=="Excel")
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
		echo $AddOnLib->judul_laporan("kartu bmhd",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='12' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>No BMHD</td>
        <td width='400' class='header_laporan'>: $row->no_bmhd</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tanggal</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen</td>
        <td class='header_laporan'>: $row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
    <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan'>No</td>
    <td width='60' class='header_laporan'>Periode</td>
    <td width='80' class='header_laporan'>No Kas</td>
    <td width='80' class='header_laporan'>No Bukti</td>
	<td width='60' class='header_laporan'>Modul</td>
	<td width='200' class='header_laporan'>Keterangan</td>
    <td width='90' class='header_laporan'>Debet</td>
    <td width='90' class='header_laporan'>Kredit</td>
  </tr>
 ";
			
			$sql1="select periode,'-' as no_kas,no_bmhd,modul,keterangan,nilai as debet,0 as kredit
            from bmhd_m where kode_lokasi='$kode_lokasi' and no_bmhd='$row->no_bmhd'
            union all
            select a.periode,isnull(b.no_kas,'-') as no_kas,a.no_aju,a.modul,a.keterangan,0 as debet,a.nilai as kredit
            from bmhd_bayar a
            left join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bmhd='$row->no_bmhd' ";
	
			$rs1 = $dbLib->execute($sql1);
			$debet=0; $kredit=0;$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				
				$debet+=$row1->debet;
				$kredit+=$row1->kredit;
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->periode</td>
				<td class='isi_laporan'>$row1->no_kas</td>
				<td class='isi_laporan'>$row1->no_bmhd</td>
				<td class='isi_laporan'>$row1->modul</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
			  </tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td align='right' class='header_laporan' colspan='6'>Total </td>
				<td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($kredit,0,",",".")."</td>
			  </tr>";
			$n1=0; $n2=0;
			if ($debet-$kredit>0)
			{
				$n1=$debet-$kredit;
			}
			else
			{
				$n2=$debet-$kredit;
			}
			echo "<tr>
				<td align='right' class='header_laporan' colspan='6'>Saldo Akhir</td>
				<td align='right' class='header_laporan'>".number_format($n1,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($n2,0,",",".")."</td>
			  </tr>";
		
			echo "<br>"; 
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
