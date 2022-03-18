<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggBulanNeraca2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select 1";
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
		$periode=$tmp[1];
		$bulan=substr($periode,4,2);
		$kode_neraca=$tmp[2];
		$kode_lokasi=$tmp[3];
		$kode_fs=$tmp[4];
		$tahun=substr($periode,0,4);
		
		$sql="select tipe from neraca where kode_lokasi='$kode_lokasi' and kode_fs='$kode_fs' and kode_neraca='$kode_neraca'";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tipe=$row->tipe;
		if ($tipe=="SumPosted")
		{
			$sql="select kode_neraca from neraca where kode_lokasi='$kode_lokasi' and kode_fs='$kode_fs' and kode_induk like '$kode_neraca%'";
			$rs = $dbLib->execute($sql);
			$tmp="";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$tmp=$tmp."'".$row->kode_neraca."',";
			}
			$tmp_neraca=substr($tmp,0,strlen($tmp)-1);
		}
		else
		{
			$tmp_neraca="'$kode_neraca'";
		}
		
		//$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun,kode_pp,kode_drk ";
		$sql=" select a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,
         isnull(e.n1,0) as n1
  from (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
        from anggaran_d x
        inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
		inner join relakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi 
		where z.kode_neraca in ($tmp_neraca) and x.kode_lokasi='$kode_lokasi' and z.kode_fs='$kode_fs' and substring(x.periode,1,4)='$tahun'
        group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk) a
  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
  inner join drk d on a.kode_drk=d.kode_drk and d.tahun='$tahun'and a.kode_lokasi=d.kode_lokasi
  left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk
	  	              , sum(case when substring(x.periode,5,2) between '01' and '$bulan' then case when dc='D' then nilai else -nilai end else 0 end ) as n1
             from anggaran_d x
	         inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			 inner join relakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi 
			 where z.kode_neraca in ($tmp_neraca) and x.kode_lokasi='$kode_lokasi' and z.kode_fs='$kode_fs' and substring(x.periode,1,4)='$tahun'
             group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk) e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi
			 where isnull(e.n1,0)<>0
			 order by a.kode_akun,a.kode_pp,a.kode_drk ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data anggaran",$this->lokasi,"TAHUN ".$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
<td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
<td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
<td width='135' class='header_laporan'><div align='center'>Nama PP</div></td>
    <td width='70'  class='header_laporan'><div align='center'>Kode DRK</div></td>
    <td width='190' class='header_laporan'><div align='center'>Nama DRK </div></td>
    <td width='90' class='header_laporan'><div align='center'>Anggaran S/D Bulan Ini</div></td>
    </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;$n11=0;$n12=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
 
</tr>";
			
			$i=$i+1;
		}
				
		echo "<tr>
    <td height='23' colspan='7' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
   
  </tr>";
		
		echo "</table></div>";
		return "";
		
	}
	
	
}

