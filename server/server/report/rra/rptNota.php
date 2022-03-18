<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;

class server_report_rra_rptNota extends server_report_basic
{	
	//protected $config = "orarra";	
	function setDBConnection($config){
		$this->config = $config;
	}
	function getTotalPage()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(*) as tot from rra_sukka_m a  $this->filter";
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
		$dbLib = new server_DBConnection_dbLib($this->config);
		$dbLib->connect();		
		$dbdriver = $dbLib->connection->driver;		
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];		
		$sql="select distinct case when g.no_app is null then '-' else f.no_surat end as no_surat, a.no_sukka, a.nik_app as nik_buat, date_format(a.tanggal,'%d-%m-%Y') as tanggal, x.nama, nvl(l.nama,a.kode_kota) as kota, x.jabatan, a.deskripsi
			from rra_sukka a
			left outer join rra_karyawan x on a.nik_app = x.nik and a.kode_lokasi=x.kode_lokasi
			left outer join rra_kota l on l.kode_kota = a.kode_kota 
			left outer join rra_nosukka f on f.no_sukka = a.no_sukka and f.kode_lokasi = a.kode_lokasi
			left outer join rra_app_d g on g.catatan = a.no_pdrk and g.kode_lokasi = a.kode_lokasi
			$this->filter order by a.no_pdrk ";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center' ><font size=12'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			//karena clob tidak bisa distinct
			$sql2 = "select a.justifikasi, a.kepada from rra_sukka a where no_sukka = '$row->no_sukka'";
			$rs2 = $dbLib->execute($sql2);
			$row2 = $rs2->FetchNextObject($toupper=false);
			
			$no_surat = substr($row->no_surat,0,4) . substr($row->no_surat,5);
			$tmp = $row2->kepada;			
			$tmp = explode("\n",$tmp);
			if (count($tmp) == 1){
				$valKpd = explode("/",$tmp[0]);
				$kpd = "Sdr ". $valKpd[2];
			}else {
				$kpd = "<table border=0 cellspasing=0 cellpadding=0>";
				$nox = 0;				
				foreach ($tmp as $valKpd){										
					if (trim($valKpd) != ""){
						$nox++;
						$valKpd = explode("/",$valKpd);//nik/nama/jabatan
						$kpd .= "<tr><td>". $nox."</td><td>.</td><td>Sdr. $valKpd[2]</td></tr>";
					}
				}
				$kpd .= "</table>";
			}
			echo "<table width='700' border='0' cellspacing='2' cellpadding='1'>
		
  <tr>
    <td align='right'><img src='../image/telkom2.bmp'/></td>
  </tr>
  <tr>
    <td  align='left'><font size=13 face='arial' weight='bold'>Nota SUKKA</font></td>
  </tr>  
  <tr>
	<td><font size=9 face='arial' >
		<table >
			<tr><td valign='top'>Kepada</td><td valign='top'>:</td><td valign='top'>$kpd</td></tr>
			<tr><td>Dari</td><td>:</td><td>$row->jabatan</td></tr>
			<tr><td>Nomor</td><td>:</td><td>$no_surat</td></tr>
			<tr><td>Lampiran</td><td>:</td><td>&nbsp</td></tr>
			<tr><td>Perihal</td><td>:</td><td>$row->deskripsi</td></tr>
		</table></font>
	</td>
  </tr>
  <tr>
    <td>".urldecode($row2->justifikasi)."</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>        
        <td align='center'>$row->kota, $row->tanggal </td>
      </tr>
      <tr align='center'>        
        <td>&nbsp;</td>
      </tr>      
      <tr align='center'>        
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>$row->nama</td>        
      </tr>
      <tr align='center'>
        <td>$row->nik_buat</td>        
      </tr>
    </table></td>
  </tr>
</table>
";
		 
			$i=$i+1;
		}
		echo "</font></div>";
			
		return "";
	}
	
}
?>
  
