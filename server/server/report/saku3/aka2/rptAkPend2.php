<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptAkPend2 extends server_report_basic
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
		$periode=$tmp[0];
		$jenis=$tmp[1];
        $sts_batal=$tmp[2];
        $filter4=$tmp[3];
		$nama_file="pend_mhs_".$periode.".xls";
		$sql_batal="";
		if ($sts_batal=="Batal")
		{
			$sql_batal=" and isnull(g.no_bill,'-')<>'-' ";
		}
		if ($sts_batal=="Aktif")
		{
			$sql_batal=" and isnull(g.no_bill,'-')='-' ";
		}
        $sql=" select * from(
            select distinct a.periode,a.no_amor as no_bill,
            a.keterangan,b.nim,c.nama,d.kode_jur,d.nama as nama_jur,d.kode_fakultas,e.nama as nama_fakultas
            , b.nilai,case when b.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR') then 'PDDK LAINNYA' else b.kode_produk end as kode_produk,b.no_inv
            ,isnull(g.no_amor,'-') as no_batal ,
            c.kode_akt
            ,f.tahunaka,case when substring(f.tahunaka,1,2) = substring(c.kode_akt,3,2) then 'MABA' else 'MALA' end as sts_mhs,b.akun_pdpt as kode_akun  
            from aka_amor_m a 
            inner join aka_amor_d b on a.no_amor=b.no_amor and a.kode_lokasi=b.kode_lokasi 
    inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
    inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
    inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
    inner join aka_tahunaka f on a.kode_lokasi=f.kode_lokasi and a.periode=f.periode 
    left join aka_amor_d g on b.no_inv=g.no_inv and b.nim =g.nim and a.kode_lokasi=g.kode_lokasi and g.no_del='BATAL'
$filter4 and (isnull(b.nilai,0) <> 0 ) 
union all
select distinct a.periode,a.no_bill,
a.keterangan,b.nim,c.nama,d.kode_jur,d.nama as nama_jur,d.kode_fakultas,e.nama as nama_fakultas,isnull(b.nilai,0) as nilai,case when b.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR') then 'PDDK LAINNYA' else b.kode_produk end as kode_produk,a.no_bill+'|'+b.nim as no_inv ,
isnull(g.no_bill,'-') as no_batal ,
c.kode_akt,f.tahunaka,case when substring(x.tahunaka,1,2) = substring(c.kode_akt,3,2) then 'MABA' else 'MALA' end as sts_mhs,b.akun_piutang as kode_akun 
from aka_bill_m a 
inner join aka_bill_d b on a.no_bill=substring(b.no_inv,1,15) and a.kode_lokasi=b.kode_lokasi and b.kode_produk not in ('BPPP','BPPNP')
	inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
	inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
	inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
	inner join aka_bill_d f on b.no_bill=f.no_bill and b.no_inv=f.no_inv and b.nim=f.nim and a.kode_lokasi=f.kode_lokasi and a.periode=f.periode
	left join aka_bill_d g on a.no_bill=substring(g.no_inv,1,15) and 
	b.nim =g.nim and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL' and g.kode_produk not in ('BPPP','BPPNP')
	inner join aka_tahunaka x on a.kode_lokasi=x.kode_lokasi and a.periode=x.periode
	$this->filter $sql_batal and (isnull(b.nilai,0) <> 0 )
union all
select distinct a.periode,a.no_batal as no_bill,
		a.keterangan,b.nim,c.nama,d.kode_jur,d.nama as nama_jur,d.kode_fakultas,e.nama as nama_fakultas, isnull(b.nilai,0)*-1 as nilai,case when b.kode_produk not in ('BPPP','BPPNP','SDP2','UP3','SKS','PERPUS','DENDA','USTATUS','ASUR') then 'PDDK LAINNYA' else b.kode_produk end as kode_produk,b.no_inv as no_inv ,
		isnull(a.no_batal,'-') as no_batal ,
		c.kode_akt
		,f.tahunaka,case when substring(f.tahunaka,1,2) = substring(c.kode_akt,3,2) then 'MABA' else 'MALA' end as sts_mhs,b.akun_piutang as kode_akun  
		from aka_batal_m a 
		inner join (
			select a.kode_produk,a.nilai,a.kode_lokasi,a.periode,a.nim,a.no_inv,a.no_bill,a.akun_piutang 
			from aka_bill_d a
			where a.kode_produk not in ('BPPP','BPPNP') and a.modul='BATAL'
			union all
			select a.kode_produk,a.nilai,a.kode_lokasi,a.periode,a.nim,a.no_inv,a.no_amor,a.akun_pdpt 
			from aka_amor_d a
			where a.kode_produk in ('BPPP','BPPNP') 
		) b on a.no_batal=b.no_bill and a.kode_lokasi=b.kode_lokasi 
inner join aka_mahasiswa c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi 
inner join aka_jurusan d on c.kode_jur=d.kode_jur and c.kode_lokasi=d.kode_lokasi 
inner join aka_fakultas e on d.kode_fakultas=e.kode_fakultas and d.kode_lokasi=e.kode_lokasi 
inner join aka_bill_d f on b.no_bill=f.no_bill and b.no_inv=f.no_inv and b.nim=f.nim and a.kode_lokasi=f.kode_lokasi and a.periode=f.periode
left join aka_bill_d g on a.no_batal=substring(g.no_inv,1,15) and b.nim =g.nim and a.kode_lokasi=g.kode_lokasi and g.modul='BATAL'  
inner join aka_tahunaka x on a.kode_lokasi=x.kode_lokasi and a.periode=x.periode
$this->filter and (isnull(b.nilai,0) <> 0) 
) a 
order by a.periode,a.nim
 ";

//  echo $sql;
		
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
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pendapatan pendidikan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='100' align='center' class='header_laporan'>No Tagihan</td>
     <td width='100' align='center' class='header_laporan'>No Invoice</td>
     <td width='100' align='center' class='header_laporan'>No Batal</td>
	 <td width='60' align='center' class='header_laporan'>NIM</td>
	 <td width='150' align='center' class='header_laporan'>Nama</td>
	 <td width='60' align='center' class='header_laporan'>Angkatan</td>
	 <td width='140' align='center' class='header_laporan'>Fakultas</td>
    <td width='140' align='center' class='header_laporan'>Jurusan</td>
	<td width='60' align='center' class='header_laporan'>Semester</td>
	<td width='60' align='center' class='header_laporan'>Status Mahasiswa</td>
    <td width='60' align='center' class='header_laporan'>Kode Produk</td>
    <td width='60' align='center' class='header_laporan'>Kode Akun</td>
	 <td width='100' align='center' class='header_laporan'>Total</td>
   
  </tr>";
        $total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
            $total+=$row->nilai;
		
			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_bill</td>
            <td class='isi_laporan'>$row->no_inv</td>
            <td class='isi_laporan'>$row->no_batal</td>
			<td class='isi_laporan'>$row->nim</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->kode_fakultas - $row->nama_fakultas</td>
            <td class='isi_laporan'>$row->kode_jur - $row->nama_jur</td>";
            $temP=explode("/",$row->tahunaka);
            $sem=$temP[1];
            $tahunAka = $temP[0];
            if($sem == "1"){
                $semester = "Ganjil";
            }else if($sem == "2"){
                $semester = "Genap";
            }else{
                $semester = "";
            }
            echo"
			<td class='isi_laporan'>$semester $tahunAka</td>
			<td class='isi_laporan'>".strtoupper($row->sts_mhs)."</td>";
            echo"
            <td class='isi_laporan'>".strtoupper($row->kode_produk)."</td>
            <td class='isi_laporan' >".$row->kode_akun."</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
            </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
        <td class='isi_laporan' align='center' colspan='13'>Total</td>
	    <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
        </tr>";	 	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
