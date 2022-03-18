<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptGarKpaAkunYks extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$jenis=$tmp[0];
		$tahun=$tmp[1];
		$kode_pp=$tmp[2];
		$kode_drk=$tmp[3];
		$periode=$tmp[4];
		$sql = $sql = "select 1 ";
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		$tahun=$tmp[2];
		$jenis=$tmp[3];
		$sql="exec sp_angg_d '$kode_lokasi','$tahun','$nik_user'";
		
		$rs = $dbLib->execute($sql);
		if ($sts_trail=="1")
		{
			$kode_pp="";
			$kode_drk="";
			$periode="";
			$kode_bidang="";
		}
		if ($jenis=="Investasi")
		{	$jenis="Neraca"; }
				  			
		$sql = "select a.kode_akun,a.kode_lokasi,a.kode_drk,b.nama as nama_akun,e.nama as nama_drk,d.kode_pp,d.nama as nama_pp,f.nama as nama_bidang
				, sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '01' then case when dc='D' then nilai else -nilai end else 0 end end) as jan
                , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '02' then case when dc='D' then nilai else -nilai end else 0 end end) as feb
	            , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '03' then case when dc='D' then nilai else -nilai end else 0 end end) as mar
	            , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '04' then case when dc='D' then nilai else -nilai end else 0 end end) as apr				
				, sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '05' then case when dc='D' then nilai else -nilai end else 0 end end) as mei
                , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '06' then case when dc='D' then nilai else -nilai end else 0 end end) as jun
	            , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '07' then case when dc='D' then nilai else -nilai end else 0 end end) as jul
	            , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '08' then case when dc='D' then nilai else -nilai end else 0 end end) as agu				
				, sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '09' then case when dc='D' then nilai else -nilai end else 0 end end) as sep
                , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '10' then case when dc='D' then nilai else -nilai end else 0 end end) as okt
	            , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '11' then case when dc='D' then nilai else -nilai end else 0 end end) as nop
	            , sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) = '12' then case when dc='D' then nilai else -nilai end else 0 end end) as des				
				, sum(case when a.modul='ORGI' then case when substring(a.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end end) as so_awal 
				
				, sum(case when substring(a.periode,5,2) = '01' then case when dc='D' then nilai else -nilai end else 0 end) as rrjan 
				, sum(case when substring(a.periode,5,2) = '02' then case when dc='D' then nilai else -nilai end else 0 end) as rrfeb 
				, sum(case when substring(a.periode,5,2) = '03' then case when dc='D' then nilai else -nilai end else 0 end) as rrmar 
				, sum(case when substring(a.periode,5,2) = '04' then case when dc='D' then nilai else -nilai end else 0 end) as rrapr 
				, sum(case when substring(a.periode,5,2) = '05' then case when dc='D' then nilai else -nilai end else 0 end) as rrmei 
				, sum(case when substring(a.periode,5,2) = '06' then case when dc='D' then nilai else -nilai end else 0 end) as rrjun 
				, sum(case when substring(a.periode,5,2) = '07' then case when dc='D' then nilai else -nilai end else 0 end) as rrjul 
				, sum(case when substring(a.periode,5,2) = '08' then case when dc='D' then nilai else -nilai end else 0 end) as rragu 
				, sum(case when substring(a.periode,5,2) = '09' then case when dc='D' then nilai else -nilai end else 0 end) as rrsep 
				, sum(case when substring(a.periode,5,2) = '10' then case when dc='D' then nilai else -nilai end else 0 end) as rrokt 
				, sum(case when substring(a.periode,5,2) = '11' then case when dc='D' then nilai else -nilai end else 0 end) as rrnop 
				, sum(case when substring(a.periode,5,2) = '12' then case when dc='D' then nilai else -nilai end else 0 end) as rrdes 
				, sum(case when substring(a.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end) as rrso_awal 
				
				from anggaran_d a
				inner join masakun b on a.kode_akun=b.kode_akun and b.jenis='$jenis' and a.kode_lokasi=b.kode_lokasi 
				inner join lokasi c on a.kode_lokasi=c.kode_lokasi
				inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
				inner join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
				inner join bidang f on d.kode_bidang=f.kode_bidang $this->filter
				group by a.kode_akun,a.kode_lokasi,a.kode_drk,b.nama,e.nama,d.kode_pp,d.nama,f.nama
				order by a.kode_akun ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pengawasan anggaran (KPA) ",$this->lokasi,"TAHUN $tahun");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='1000'>
 
 <tr>
    <td height='23' colspan='11' class='header_laporan'><table width='1000' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td class='header_laporan'>Bidang </td>
        <td class='header_laporan'>: $row->nama_bidang </td>
      </tr>
	    <tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>: $row->kode_pp  </td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nama PP </td>
        <td class='header_laporan'>: $row->nama_pp </td>
      </tr>
        <tr>
        <td class='header_laporan'>No DRK </td>
        <td class='header_laporan'>: $row->kode_drk </td>
      </tr>
      <tr>
        <td class='header_laporan'>Kegiatan</td>
        <td class='header_laporan'>: $row->nama_drk </td>
      </tr>
      <tr>
        <td width='100' class='header_laporan'>Kode Akun</td>
        <td width='500' class='header_laporan'>: $row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama_akun</td>
      </tr>
    </table></td>
    <td align='right' valign='middle'><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='200'> 
      <tr align='center'>
        <td colspan='3' class='header_laporan'>RKA TAHUN $tahun </td>
      </tr>
	  <tr>
        <td width='100' class='header_laporan' align='center' >BULAN</td>
        <td width='100' class='header_laporan' align='center' >ORIGINAL</td>
		<td width='100' class='header_laporan' align='center' >CURRENT</td>
      </tr>
      
	  
	  <tr>
        <td width='100' class='header_laporan'>JANUARI</td>
        <td width='100' class='header_laporan' align='right'> ".number_format($row->jan,0,',','.')."</td>
		<td width='100' class='header_laporan' align='right'> ".number_format($row->rrjan,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>FEBRUARI</td>
        <td class='header_laporan' align='right'> ".number_format($row->feb,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrfeb,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>MARET</td>
        <td class='header_laporan' align='right'> ".number_format($row->mar,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrmar,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>APRIL</td>
        <td class='header_laporan' align='right'> ".number_format($row->apr,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrapr,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>MEI</td>
        <td class='header_laporan' align='right'> ".number_format($row->mei,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrmei,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>JUNI</td>
        <td class='header_laporan' align='right'> ".number_format($row->jun,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrjun,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>JULI</td>
        <td class='header_laporan' align='right'> ".number_format($row->jul,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrjul,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>AGUSTUS</td>
        <td class='header_laporan' align='right'> ".number_format($row->agu,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rragu,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>SEPTEMBER</td>
        <td class='header_laporan' align='right'> ".number_format($row->sep,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrsep,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>OKTOBER</td>
        <td class='header_laporan' align='right'> ".number_format($row->okt,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrokt,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>NOPEMBER</td>
        <td class='header_laporan' align='right'> ".number_format($row->nop,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrnop,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>DESEMBER</td>
        <td class='header_laporan' align='right'> ".number_format($row->des,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrdes,0,',','.')."</td>
      </tr>	  
      <tr>
        <td class='header_laporan'>JUMLAH</td>
        <td class='header_laporan' align='right'> ".number_format($row->so_awal,0,',','.')."</td>
		<td class='header_laporan' align='right'> ".number_format($row->rrso_awal,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr> 
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='74' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='50' class='header_laporan' align='center'>Kode PP</td>
    <td width='70' class='header_laporan' align='center'>Kode DRK</td>
	<td width='90' class='header_laporan' align='center'>RRA Tambah</td>
    <td width='90' class='header_laporan' align='center'>RRA Kurang</td>
    <td width='90' class='header_laporan' align='center'>Koreksi Realisasi</td>
    <td width='90' class='header_laporan' align='center'>Realisasi</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>";	
			//kpa jan
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' 
					  and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' and substring(a.periode,5,2) = '01' 
				order by tanggal,urutan";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN JANUARI&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->jan,0,',','.')."</td>
	 </tr>";
			$saldo=$row->jan;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL JANUARI&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
  
		//kpa feb
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) = '02' 
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN FEBRUARI&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->feb,0,',','.')."</td>
	 </tr>";
			$saldo=$row->feb;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL FEBRUARI&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
		//kpa mar
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) = '03'  
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN MARET&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->mar,0,',','.')."</td>
	 </tr>";
			$saldo=$row->mar;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;		
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL MARET&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
		//kpa apr
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='04'  
				order by tanggal,urutan";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN APRIL&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->apr,0,',','.')."</td>
	 </tr>";
			$saldo=$row->apr;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL APRIL&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 
 
 
 //kpa mei
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='05'  
				order by tanggal,urutan";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN MEI&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->mei,0,',','.')."</td>
	 </tr>";
			$saldo=$row->mei;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL MEI&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 //kpa jun
		
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='06'  
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN JUNI&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->jun,0,',','.')."</td>
	 </tr>";
			$saldo=$row->jun;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL JUNI&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 //kpa jul
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='07'  
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN JULI&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->jul,0,',','.')."</td>
	 </tr>";
			$saldo=$row->jul;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL JULI&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 
 //kpa agu
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='08'  
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN AGUSTUS&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->agu,0,',','.')."</td>
	 </tr>";
			$saldo=$row->agu;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL AGUSTUS&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 //kpa sep
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='09'  
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN SEPTEMBER&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->sep,0,',','.')."</td>
	 </tr>";
			$saldo=$row->sep;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL SEPTEMBER&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 //kpa okt
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='10'  
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN OKTOBER&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->okt,0,',','.')."</td>
	 </tr>";
			$saldo=$row->okt;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL OKTOBER&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 //kpa nop
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='11'  
				order by tanggal,urutan";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN NOPEMBER&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->nop,0,',','.')."</td>
	 </tr>";
			$saldo=$row->nop;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL NOPEMBER&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 //kpa des
			
				$sql="select a.no_bukti,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when (a.modul<>'RRA' and a.dc='D') then nilai else 0 end as debet,
				case when (a.modul<>'RRA' and a.dc='C') then nilai else 0 end as kredit,
				case when (a.modul='RRA' and a.dc='D') then nilai else 0 end as gar_debet,
				case when (a.modul='RRA' and a.dc='C') then nilai else 0 end as gar_kredit,a.modul,2 as urutan
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) ='12'  
				order by tanggal,urutan ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$gar_debet=0;
			$gar_kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='10'  class='header_laporan' align='right'>ANGGARAN DESEMBER&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->des,0,',','.')."</td>
	 </tr>";
			$saldo=$row->des;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit + $row1->gar_debet - $row1->gar_kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$gar_debet=$gar_debet+$row1->gar_debet;
				$gar_kredit=$gar_kredit+$row1->gar_kredit;
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td  class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan'>".$row1->kode_drk."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->gar_kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6'  class='header_laporan' align='right'>TOTAL DESEMBER&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($gar_debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($gar_kredit,0,',','.')."</td>
    <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
 
 
		echo "</table><br><DIV style='page-break-after:always'></DIV>";
			
			
		}
		return "";
	}
	
}
?>
