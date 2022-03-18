<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dash_rptDashUinBuktiPdpt extends server_report_basic
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
		$nik=$tmp[0];
        $kode_lokasi=$tmp[1];
        $kunci=$tmp[2];
        $periode=$tmp[3];
        $jenis=$tmp[4];
		$sql="select a.kdsatker,a.kdprogram,a.kdgiat,b.kddept,b.kdunit 
			from uin_user a inner join uin_satker b on a.kdsatker=b.kdsatker 
			where a.nik ='$nik' and a.kode_lokasi='$kode_lokasi'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kddept=$row->kddept;
		$kdunit=$row->kdunit;
        $kdprogram=$row->kdprogram;
        
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$sql="select a.no_usul,a.kode_lokasi,a.tahun,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,a.kdgiat,a.kddept,a.kdunit,a.kdprogram,
	   b.nmprogram,c.nmgiat,h.kdakun,i.nmakun,j.nama as nama_pp
        from uin_usul_m a
        inner join uin_program b on a.kdprogram=b.kdprogram and a.kddept=b.kddept and a.kdunit=b.kdunit
        inner join uin_giat c on a.kdgiat=c.kdgiat and a.kddept=c.kddept and a.kdunit=c.kdunit and a.kdprogram=c.kdprogram
        inner join uin_pdpt h on a.kdgiat=h.kdgiat and a.kddept=h.kddept and a.kdunit=h.kdunit and a.kdsatker=h.kdsatker and a.kdprogram=h.kdprogram and a.kode_akun=h.kdakun
        inner join uin_akun i on h.kdakun=i.kdakun
        inner join pp j on a.kode_pp=j.kode_pp and a.kode_lokasi=j.kode_lokasi
        where no_usul='$this->filter' and a.kddept='$kddept' and a.kdunit='$kdunit' 
        order by a.no_usul ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
        echo "<div class='panel'>
        <div class='panel-body'>
        <div class='panel-heading'>
            <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashUinDetail','','$kode_lokasi/$periode/$jenis/$kunci');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
        </div>";
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan pendapatan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='34' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
		<tr>
        <td class='header_laporan' width='114'>No Bukti</td>
        <td class='header_laporan'>:&nbsp;$row->no_usul</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
      <tr>
        <td class='header_laporan' width='114'>PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Program</td>
        <td class='header_laporan'>:&nbsp;$row->kdprogram -&nbsp; $row->nmprogram</td>
      </tr>
      
     
		<tr>
          <td class='header_laporan'>Akun</td>
          <td class='header_laporan'>:&nbsp;$row->kdakun -&nbsp; $row->nmakun</td>
        </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='200' align='center' class='header_laporan'>Deskripsi</td>
	<td width='150' align='center' class='header_laporan'>Norma</td>
	<td width='80' align='center' class='header_laporan'>Satuan</td>
    <td width='90' align='center' class='header_laporan'>Tarif</td>
    <td width='60' align='center' class='header_laporan'>Volume</td>
   	<td width='100' align='center' class='header_laporan'>Jumlah</td>
  </tr>
  
  ";
			$sql1="select a.keterangan,a.kode_norma,a.satuan,a.tarif,a.vol,a.total,b.nama
				from uin_usul_d a
				inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi
				where a.no_usul='$row->no_usul' 
				order by a.nu
				 ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$total=0;$vol=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->total;
				$vol+=$row1->vol;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
	<td  class='isi_laporan'>$row1->nama</td>
	<td  class='isi_laporan'>$row1->satuan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tarif,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->vol,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
   
    
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='5' align='center'  class='header_laporan'>Total</td>
	<td align='center' class='isi_laporan'>".number_format($vol,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($total,0,",",".")."</td>
  
  </tr></table><br>";
		}
        echo "</div>
        </div>
        </div>";
		return "";
	}
	
}
?>
  
