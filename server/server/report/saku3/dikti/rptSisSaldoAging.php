<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dikti_rptSisSaldoAging extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
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
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="aging.xls";
		
		// $sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		// $rs = $dbLib->execute($sql);
		// $row = $rs->FetchNextObject($toupper=false);
		// $nama_pp=$row->nama;
		
		$sql="select a.nim,a.kode_lokasi,a.nama,a.kode_kelas,a.kode_jur,f.nama as nama_jur,a.kode_akt,
        b.n5,b.bpp1,b.bpp2,b.bpp3,b.bpp4,b.sdp1,b.sdp2,b.sdp3,b.sdp4,b.up31,b.up32,b.up33,b.up34, b.pul1,b.pul2,b.pul3,b.pul4,h.nama as nama_status
    from dikti_mhs a
    inner join dikti_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi 
    inner join dikti_jur g on a.kode_jur=g.kode_jur and a.kode_lokasi=g.kode_lokasi
    inner join dikti_mhs_status h on a.kode_status=h.kode_status and a.kode_lokasi=h.kode_lokasi
   left join (select a.nim,a.kode_lokasi,sum(a.n5) as n5,
   sum(case when a.umur<=6 then a.n1 else 0 end) as bpp1,
   sum(case when a.umur between 7 and 12 then a.n1 else 0 end) as bpp2,
   sum(case when a.umur between 13 and 24 then a.n1 else 0 end) as bpp3,
   sum(case when a.umur>24 then a.n1 else 0 end) as bpp4,
   sum(case when a.umur<=6 then a.n2 else 0 end) as sdp1,
   sum(case when a.umur between 7 and 12 then a.n2 else 0 end) as sdp2,
   sum(case when a.umur between 13 and 24 then a.n2 else 0 end) as sdp3,
   sum(case when a.umur>24 then a.n2 else 0 end) as sdp4,
   sum(case when a.umur<=6 then a.n3 else 0 end) as up31,
   sum(case when a.umur between 7 and 12 then a.n3 else 0 end) as up32,
   sum(case when a.umur between 13 and 24 then a.n3 else 0 end) as up33,
   sum(case when a.umur>24 then a.n3 else 0 end) as up34,
   sum(case when a.umur<=6 then a.n4 else 0 end) as pul1,
   sum(case when a.umur between 7 and 12 then a.n4 else 0 end) as pul2,
   sum(case when a.umur between 13 and 24 then a.n4 else 0 end) as pul3,
   sum(case when a.umur>24 then a.n4 else 0 end) as pul4

from (select a.no_bill,a.nim,a.kode_lokasi,a.periode,
   datediff(month,convert(datetime, a.periode+'01'),convert(datetime, '$periode'+'01')) as umur,
   isnull(a.n1,0)-isnull(b.n1,0) as n1,isnull(a.n2,0)-isnull(b.n2,0) as n2,
   isnull(a.n3,0)-isnull(b.n3,0) as n3,isnull(a.n4,0)-isnull(b.n4,0) as n4,isnull(a.n5,0)-isnull(b.n5,0) as n5
from (select x.no_bill,x.nim,x.kode_lokasi,x.periode,
                    sum(case when x.kode_param in ('BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                sum(case when x.kode_param in ('SDP2') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                sum(case when x.kode_param in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                sum(case when x.kode_param in ('PUL') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n4,
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as n5	
        from dikti_bill_d x 			
        inner join dikti_mhs y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode')		
        group by x.no_bill,x.nim,x.kode_lokasi,x.periode
    )a
left join (select x.no_bill,x.nim,x.kode_lokasi,
                    sum(case when x.kode_param in ('BPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                sum(case when x.kode_param in ('SDP2') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                sum(case when x.kode_param in ('UP3') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                sum(case when x.kode_param in ('PUL') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n4,
                sum(case when x.dc='D' then x.nilai else -x.nilai end) as n5	
            from dikti_bill_rekon x 			
            inner join dikti_mhs y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
            where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') 		
            group by x.no_bill,x.nim,x.kode_lokasi
        )b on a.no_bill=b.no_bill and a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi = '$kode_lokasi' 
)a
group by a.nim,a.kode_lokasi
)b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi 
$this->filter and b.n5 <> 0
order by a.kode_kelas,a.nim
 ";

//  echo $sql;
		
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
		echo $AddOnLib->judul_laporan("lpaoran aging piutang siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='50' rowspan='2' class='header_laporan'>NIM </td>
	<td width='200' rowspan='2' class='header_laporan'>Nama</td>
	<td width='60' rowspan='2' class='header_laporan'>Kelas</td>
	<td width='60' rowspan='2' class='header_laporan'>Angkatan</td>
	<td width='60' rowspan='2' class='header_laporan'>Jurusan</td>
	<td width='60' rowspan='2' class='header_laporan'>Status</td>
	<td width='100' rowspan='2' class='header_laporan'>Piutang</td>
    <td colspan='4' class='header_laporan'>BPP</td>
    <td colspan='4' class='header_laporan'>SDP2</td>
    <td colspan='4' class='header_laporan'>UP3</td>
    <td colspan='4' class='header_laporan'>PUL</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>0-6 Bln</td>
    <td width='80' align='center' class='header_laporan'>7-12 Bln</td>
    <td width='80' align='center' class='header_laporan'>13-24 Bln</td>
    <td width='80' align='center' class='header_laporan'>>24</td>
     <td width='80' align='center' class='header_laporan'>0-6 Bln</td>
    <td width='80' align='center' class='header_laporan'>7-12 Bln</td>
    <td width='80' align='center' class='header_laporan'>13-24 Bln</td>
    <td width='80' align='center' class='header_laporan'>>24</td>
	 <td width='80' align='center' class='header_laporan'>0-6 Bln</td>
    <td width='80' align='center' class='header_laporan'>7-12 Bln</td>
    <td width='80' align='center' class='header_laporan'>13-24 Bln</td>
    <td width='80' align='center' class='header_laporan'>>24</td>
    <td width='80' align='center' class='header_laporan'>0-6 Bln</td>
     <td width='80' align='center' class='header_laporan'>7-12 Bln</td>
     <td width='80' align='center' class='header_laporan'>13-24 Bln</td>
     <td width='80' align='center' class='header_laporan'>>24</td>
  </tr>";
		$bpp1=0;$bpp2=0;$bpp3=0;$bpp4=0;
		$sdp1=0;$sdp2=0;$sdp3=0;$sdp4=0;
		$up31=0;$up32=0;$up33=0;$up34=0;
		$pul1=0;$pul2=0;$pul3=0;$pul4=0;
		$n5=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bpp1+=$row->bpp1;$bpp2+=$row->bpp2; $bpp3+=$row->bpp3; $bpp4+=$row->bpp4;
			$sdp1+=$row->sdp1; $sdp2+=$row->sdp2; $sdp3+=$row->sdp3; $sdp4+=$row->sdp4;
			$up31+=$row->up31; $up32+=$row->up32; $up33+=$row->up33; $up34+=$row->up34;
			$pul1+=$row->pul1; $pul2+=$row->pul2; $pul3+=$row->pul3; $pul4+=$row->pul4;
			$n5+=$row->n5;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nim','$row->kode_lokasi');\">$row->nim</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_kelas</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->kode_jur</td>
			<td class='isi_laporan'>$row->nama_status</td>
	
	<td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->bpp4,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sdp4,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up31,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up32,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up33,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->up34,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pul1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pul2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pul3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pul4,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='header_laporan' align='center' colspan='7'>Total</td>
   <td class='header_laporan' align='right'>".number_format($n4,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($bpp1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($bpp2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($bpp3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($bpp4,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sdp1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sdp2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sdp3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sdp4,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($up31,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($up32,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($up33,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($up34,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($pul1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($pul2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($pul3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($pul4,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
