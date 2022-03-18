<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_if_rptReimbPosisi extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$nama_file="pbh_pb".$periode.".xls";
		$sql="select a.no_reim,a.kode_lokasi,a.keterangan,convert(varchar,a.tanggal,103) as tgl_pb,a.keterangan,a.kode_pp,d.nama as nama_pp,a.nilai,
		e.no_ver as no_fisik,convert(varchar,e.tanggal,103) as tgl_fisik,
		f.no_ver as no_ver,convert(varchar,f.tanggal,103) as tgl_ver,
		g.no_spb,convert(varchar,g.tanggal,103) as tgl_spb,
		h.no_ver as no_sah,convert(varchar,h.tanggal,103) as tgl_sah,
		i.no_ver as no_fiat,convert(varchar,i.tanggal,103) as tgl_fiat,
		j.no_kas ,convert(varchar,j.tanggal,103) as tgl_kas,isnull(k.jumlah,0) as jumlah
  from if_reim_m a
  inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
  left join pbh_ver_m e on a.no_reim=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.form='VERFISIK'
  left join pbh_ver_m f on a.no_reim=f.no_bukti and a.kode_lokasi=f.kode_lokasi and f.form='VERPB'
  left join spb_m g on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
  left join pbh_ver_m h on g.no_spb=h.no_bukti and g.kode_lokasi=h.kode_lokasi and h.form='SAHSPB'
  left join pbh_ver_m i on g.no_spb=i.no_bukti and g.kode_lokasi=i.kode_lokasi and i.form='FIATSPB'
  left join kas_m j on g.no_kas=j.no_kas and g.kode_lokasi=j.kode_lokasi
  left join (select a.no_ref,a.kode_lokasi,count(a.no_ref) as jumlah 
		  from pbh_dok a
		  where a.kode_lokasi='99'
		  group by a.no_ref,a.kode_lokasi
		  )k on a.no_reim=k.no_ref and a.kode_lokasi=k.kode_lokasi
	$this->filter
	order by a.no_reim  ";

		
		if ($jenis=="Excell")
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
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$lokasi=$this->lokasi;
		$nama_periode=$AddOnLib->ubah_periode($periode);
		//echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("posisi BYMHD",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
	
		echo "<h4 class='text-primary bold text-center'>$lokasi</h4>
		<h5 class='text-center'>LAPORAN POSISI REIMBURSE</h5>
		<h6 class='text-center'>$nama_periode</h6>";
		echo "<table class='table table-striped table-bordered' width='130%' >
		<thead>
   	<tr>
     <th width='30'  scope='col'  >No</th>
     <th width='100'  scope='co class='bg-primary text-center' >No Bukti</th>
	 <th width='60'  scope='col' >Tanggal</th>
	 <th width='150'  scope='col' >Nama PP</th>
   	<th width='250'  scope='col' >Keterangan</th>
	 <th width='60'  scope='col' >Jumlah Dok</th>
	 <th width='100'  scope='col' >Nilai</th>
	 <th width='60'  scope='col' >Status</th>
	 <th width='100'  scope='col' >No Terima Dok</th>
	 <th width='60'  scope='col' >Tgl Terima Dok</th>
	 <th width='100'  scope='col' >No Ver</th>
	 <th width='60'  scope='col' >Tgl Ver</th>
	 <th width='100'  scope='col' >No SPB</th>
	 <th width='60'  scope='col' >Tgl SPB</th>
	 <th width='100'  scope='col' >No Sah</th>
	 <th width='60'  scope='col' >Tgl Sah</th>
	 <th width='100'  scope='col' >No Fiat</th>
	 <th width='60'  scope='col' >Tgl Fiat</th>
	 <th width='100'  scope='col' >No KasBank</th>
	 <th width='60'  scope='col' >Tgl KasBank</th>
	  </tr> 
	  </thead>
	  <tbody>
	  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
		echo "<tr >
     <td scope='row'>$i</td>
      <td >";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPb('$row->no_reim','$row->kode_lokasi');\">$row->no_reim</a>";
		echo "</td>
	<td >$row->tgl_pb</td>
	 <td >$row->kode_pp - $row->nama_pp</td>
	 <td >$row->keterangan</td>
	 <td  ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->no_reim','$row->kode_lokasi');\">$row->jumlah</a></td>
	 <td class='text-right'>".number_format($row->nilai,0,",",".")."</td>
	 <td >$row->progress</td>
	 <td ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_fisik','$row->kode_lokasi');\">$row->no_fisik</a></td>
	 <td >$row->tgl_fisik</td>
	 <td ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a></td>
	 <td >$row->tgl_ver</td>
	<td ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a></td>
	 <td >$row->tgl_spb</td>	
	<td ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_sah','$row->kode_lokasi');\">$row->no_sah</a></td>
	<td >$row->tgl_sah</td>
	<td ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_fiat','$row->kode_lokasi');\">$row->no_fiat</a></td>
	<td >$row->tgl_fiat</td>
	 <td ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a></td>
	 <td >$row->tgl_kas</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr>
		<td colspan='8' >Total</td>
		<td class='text-right'>".number_format($nilai,0,",",".")."</td>
		<td colspan='13'>&nbsp</td>
		</tr>";
		echo "</tbody></table>";
		//echo "</div>";
		return "";
		
	}
	
}
?>
