<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSaldoCdMaba extends server_report_basic
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
		$periode=$tmp[1];
		$jenis=$tmp[2];
        $jenis_kas=$tmp[3];
        $filter_bukti = $tmp[4];
		$nama_file="saldo.xls";
        
        if($jenis_kas == "Masuk"){
            $filter_kas = " and isnull(d.nilai,0) <> 0 ";
        }else if($jenis_kas == "Keluar"){
            $filter_kas = " and isnull(e.nilai,0) <> 0 ";
        }else{
            $filter_kas = "";
        }
		
		// $sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		// $rs = $dbLib->execute($sql);
		// $row = $rs->FetchNextObject($toupper=false);
		// $nama_pp=$row->nama;
		
		$sql="select a.no_tes as nim,a.kode_lokasi,a.nama,a.kode_jur,f.nama as nama_jur,
        isnull(c.nilai,0) as so_awal,isnull(d.nilai,0) as debet,isnull(e.nilai,0) as kredit,
        isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir,a.tahunaka
 from aka_maba a 
 left join aka_jurusan f on a.kode_jur=f.kode_jur and a.kode_lokasi=f.kode_lokasi
 inner join (select a.nim,a.kode_lokasi
             from aka_cd_d a
             inner join ( 
                 select a.no_bukti,a.kode_lokasi 
                 from trans_m a where a.form in ('CDIN','CDMUTMABA','CDINMABA','CDMUTMULTI')
                 union all
                 select a.no_aju as no_bukti,a.kode_lokasi 
                 from it_aju_m a where a.no_ref1 in ('MABA','MALA','CAMABA')
                 ) b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
             where a.kode_lokasi='$kode_lokasi' $filter_bukti
             group by a.nim,a.kode_lokasi
             )g on a.no_tes=g.nim and a.kode_lokasi=g.kode_lokasi 
 left join (select a.nim,a.kode_lokasi,sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
         from aka_cd_d a			
         inner join ( 
            select a.no_bukti,a.kode_lokasi 
            from trans_m a where a.form in ('CDIN','CDMUTMABA','CDINMABA','CDMUTMULTI')
            union all
            select a.no_aju as no_bukti,a.kode_lokasi 
            from it_aju_m a where a.no_ref1 in ('MABA','MALA','CAMABA')
            ) c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
         inner join aka_maba b on a.nim=b.no_tes and a.kode_lokasi=b.kode_lokasi 
         where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' $filter_bukti
         group by a.nim,a.kode_lokasi
         )c on a.no_tes=c.nim and a.kode_lokasi=c.kode_lokasi
 left join (select a.nim,a.kode_lokasi,sum(a.nilai) as nilai
         from aka_cd_d a			
         inner join aka_maba b on a.nim=b.no_tes and a.kode_lokasi=b.kode_lokasi 
         inner join ( 
            select a.no_bukti,a.kode_lokasi 
            from trans_m a where a.form in ('CDIN','CDMUTMABA','CDINMABA','CDMUTMULTI')
            union all
            select a.no_aju as no_bukti,a.kode_lokasi 
            from it_aju_m a where a.no_ref1 in ('MABA','MALA','CAMABA')
            ) c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
         where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' $filter_bukti
         group by a.nim,a.kode_lokasi
         )d on a.no_tes=d.nim and a.kode_lokasi=d.kode_lokasi 
 left join (select a.nim,a.kode_lokasi,sum(a.nilai) as nilai
         from aka_cd_d a			
         inner join aka_maba b on a.nim=b.no_tes and a.kode_lokasi=b.kode_lokasi 
         inner join ( 
            select a.no_bukti,a.kode_lokasi 
            from trans_m a where a.form in ('CDIN','CDMUTMABA','CDINMABA','CDMUTMULTI')
            union all
            select a.no_aju as no_bukti,a.kode_lokasi 
            from it_aju_m a where a.no_ref1 in ('MABA','MALA','CAMABA')
            ) c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
         where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' $filter_bukti
         group by a.nim,a.kode_lokasi
         )e on a.no_tes=e.nim and a.kode_lokasi=e.kode_lokasi 
 $this->filter $filter_kas and (isnull(c.nilai,0) <> 0 or isnull(d.nilai,0) <> 0 or isnull(e.nilai,0) <> 0 or
 isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) <> 0)
 order by a.kode_jur,a.no_tes
 ";
		
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
		echo $AddOnLib->judul_laporan("saldo pdd siswa",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'>No</td>
    <td width='50'  class='header_laporan'>NIM </td>
    <td width='200'  class='header_laporan'>Nama</td>
	<td width='60'  class='header_laporan'>Angkatan</td>
    <td width='90' class='header_laporan'>Saldo Awal </td>
    <td width='90' class='header_laporan'>Pemasukan</td>
    <td  width='90' class='header_laporan'>Pengeluaran</td>
    <td  width='90' class='header_laporan'>Saldo Akhir </td>
  </tr>
  ";
		$so_awal=0;$debet=0;$kredit=0;$so_akhir=0;
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nim','$row->kode_lokasi');\">$row->nim</a>";
			echo "</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->tahunaka</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='4'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
