<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggProduk extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
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
		$kode_fs=$tmp[2];
		$kode_pp=$tmp[3];
		$bentuk=$tmp[4];
		$nama_pp=$tmp[5];
		
		$sql="select a.kode_neraca,a.tipe,a.nama,isnull(b.so_akhir,0) as nilai,isnull(c.agg_thn,0) as agg_thn,
	    isnull(c.agg_sisa,0) as agg_sisa,isnull(b.so_akhir,0)+isnull(c.agg_sisa,0) as nilai_sisa
from neracaproduk a
left join (select b.kode_neraca,a.kode_lokasi,
				sum(isnull(c.so_awal_mutasi,0)+isnull(d.debet,0)-isnull(d.kredit,0)) as so_akhir
		 from masakun a
		 left join (select a.kode_akun,sum(case when a.dc='D' then a.nilai else -a.nilai end) so_awal_mutasi
					from gldt_h a
				    inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					where b.kode_fs='$kode_fs' and a.periode<'$periode' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) 
						  and (a.kode_pp between '$kode_pp' and '$kode_pp')
					group by a.kode_akun) c on a.kode_akun=c.kode_akun
		 left join (select x.kode_akun,x.kode_lokasi,sum(case when x.dc='D' then x.nilai else 0 end) as debet,
						   sum(case when x.dc='C' then x.nilai else 0 end) as kredit
					from (select a.kode_akun,a.dc,a.nilai,a.kode_lokasi 
						  from gldt a
						  inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						  where b.kode_fs='$kode_fs' and a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) 
								and (a.kode_pp between '$kode_pp' and '$kode_pp')
						  union all
						  select a.kode_akun,a.dc,a.nilai,a.kode_lokasi 
						  from gldt_h a
						  inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						  where b.kode_fs='$kode_fs' and a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) 
								and (a.kode_pp between '$kode_pp' and '$kode_pp')
						  )x
					 group by x.kode_akun,x.kode_lokasi
					 ) d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
		 inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
		 where a.kode_lokasi='$kode_lokasi' and b.kode_fs='$kode_fs'
		 group by b.kode_neraca,a.kode_lokasi
			)b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
left join (select c.kode_neraca,a.kode_lokasi
	  	          , sum(case when substring(a.periode,5,2) between '01' and '12' then (case when b.jenis='Pendapatan' then a.nilai*-1 else a.nilai end) else 0 end ) as agg_thn
                  , sum(case when substring(a.periode,5,2) between '11' and '12' then (case when b.jenis='Pendapatan' then a.nilai*-1 else a.nilai end) else 0 end ) as agg_sisa
	       from anggaran_d a
		   inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	       inner join relakunproduk c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
           where a.kode_lokasi='$kode_lokasi' and c.kode_fs='$kode_fs' and substring(a.periode,1,4)=substring('$periode',1,4) 
				 and (a.kode_pp between '$kode_pp' and '$kode_pp') 
		   group by c.kode_neraca,a.kode_lokasi
		   )c on a.kode_neraca=c.kode_neraca and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_neraca ";
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REDISTRIBUDI DAN REALOKASI ANGGARAN EKSPLOITASI 2011",$this->lokasi."<br>$nama_pp","");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC' align='center'>
    <td width='30' class='header_laporan' >NO</td>
    <td width='250' class='header_laporan' >URAIAN KEGIATAN / AKTIFITAS</td>
    <td width='100' class='header_laporan' >ANGGARAN 2011</td>
    <td width='100' height='25' class='header_laporan' >REALISASI S.D. OKT 2011</td>
    <td width='100' class='header_laporan' >ANGGARAN NOP & DES 2011</td>
    <td width='100' class='header_laporan' >ANGGARAN BARU</td>
 
  </tr>";
		$nilai=0;$nilai_sisa=0;$agg_thn=0;$agg_sisa=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_sisa=$nilai_sisa+$row->nilai_sisa;
			$agg_thn=$agg_thn+$row->agg_thn;
			$agg_sisa=$agg_sisa+$row->agg_sisa;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenProduk('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
	echo "</td>
    <td class='isi_laporan' align='right'>".number_format($row->agg_thn,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
      <td class='isi_laporan' align='right'>".number_format($row->agg_sisa,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_sisa,0,',','.')."</td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting" )
			{
				$kode_neraca=$row->kode_neraca;
				$sql="select a.kode_akun,d.nama,isnull(b.so_akhir,0) as nilai,isnull(c.agg_thn,0) as agg_thn,
	    isnull(c.agg_sisa,0) as agg_sisa,isnull(b.so_akhir,0)+isnull(c.agg_sisa,0) as nilai_sisa
from relakunproduk a
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
left join (select b.kode_akun,a.kode_lokasi,
				sum(isnull(c.so_awal_mutasi,0)+isnull(d.debet,0)-isnull(d.kredit,0)) as so_akhir
		 from masakun a
		 left join (select a.kode_akun,sum(case when a.dc='D' then a.nilai else -a.nilai end) so_awal_mutasi
					from gldt_h a
				    inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					where b.kode_neraca='$kode_neraca' and b.kode_fs='$kode_fs' and a.periode<'$periode' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) 
						  and (a.kode_pp between '$kode_pp' and '$kode_pp')
					group by a.kode_akun) c on a.kode_akun=c.kode_akun
		 left join (select x.kode_akun,x.kode_lokasi,sum(case when x.dc='D' then x.nilai else 0 end) as debet,
						   sum(case when x.dc='C' then x.nilai else 0 end) as kredit
					from (select a.kode_akun,a.dc,a.nilai,a.kode_lokasi 
						  from gldt a
						  inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						  where b.kode_neraca='$kode_neraca' and b.kode_fs='$kode_fs' and a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) 
								and (a.kode_pp between '$kode_pp' and '$kode_pp')
						  union all
						  select a.kode_akun,a.dc,a.nilai,a.kode_lokasi 
						  from gldt_h a
						  inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						  where b.kode_neraca='$kode_neraca' and b.kode_fs='$kode_fs' and a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) 
								and (a.kode_pp between '$kode_pp' and '$kode_pp')
						  )x
					 group by x.kode_akun,x.kode_lokasi
					 ) d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
		 inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
		 where b.kode_neraca='$kode_neraca' and a.kode_lokasi='$kode_lokasi' and b.kode_fs='$kode_fs'
		 group by b.kode_akun,a.kode_lokasi
			)b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join (select c.kode_akun,a.kode_lokasi
	  	          , sum(case when substring(a.periode,5,2) between '01' and '12' then (case when b.jenis='Pendapatan' then a.nilai*-1 else a.nilai end) else 0 end ) as agg_thn
                  , sum(case when substring(a.periode,5,2) between '11' and '12' then (case when b.jenis='Pendapatan' then a.nilai*-1 else a.nilai end) else 0 end ) as agg_sisa
	       from anggaran_d a
		   inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	       inner join relakunproduk c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
           where c.kode_neraca='$kode_neraca' and a.kode_lokasi='$kode_lokasi' and c.kode_fs='$kode_fs' and substring(a.periode,1,4)=substring('$periode',1,4) 
				 and (a.kode_pp between '$kode_pp' and '$kode_pp')
		   group by c.kode_akun,a.kode_lokasi
		   )c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.kode_neraca='$kode_neraca' and (isnull(b.so_akhir,0)<>0 or isnull(c.agg_thn,0)<>0)
order by a.kode_akun";
				
				$j=1;
				$rs1 = $dbLib->execute($sql);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					echo "<tr>
						<td class='isi_laporan' align='center'>&nbsp;</td>
						<td height='20' class='isi_laporan'>$row1->kode_akun - $row1->nama</a></td>
						<td class='isi_laporan' align='right'>".number_format($row1->agg_thn,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
						  <td class='isi_laporan' align='right'>".number_format($row1->agg_sisa,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row1->nilai_sisa,0,',','.')."</td>
					  </tr>";
					$j=$j+1;
				}
			}
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='2'>JUMLAH</td>
    <td class='isi_laporan' align='right'>".number_format($agg_thn,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($agg_sisa,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nilai_sisa,0,',','.')."</td>
  </tr>";
		
		echo "</table></div>";
		return "";
	}
	
}
?>
