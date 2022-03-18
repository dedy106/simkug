<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_fa_rptFaAsset2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$kode_klpakun=$tmp[3];
		
		$sql = "select count(a.no_fa) 
from fa_asset a
inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.progress not in ('K','P') and a.jenis<>'I'
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
$this->filter ";

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
		$periode_susut=$tmp[2];
		$jenis=$tmp[3];
		// $kode_pp=$tmp[4];
		// echo $kode_pp;

		$nama_file="asset.xls";
		$sql = "select a.kode_klpakun,a.kode_lokasi,date_format(a.tgl_perolehan,'%d/%m/%Y') as tgl,b.nama as nama_klpakun,a.kode_pp,c.nama as nama_pp,a.no_fa,a.nama,a.umur,a.persen,aa.nilai, 
        isnull(d.akumulasi_sd,0)-isnull(f.wo_ap_sd,0) as akumulasi_sd,
        isnull(e.akumulasi_bln1,0)-isnull(g.wo_ap1,0) as akumulasi_bln1,
        isnull(e.akumulasi_bln2,0)-isnull(g.wo_ap2,0) as akumulasi_bln2,
        isnull(e.akumulasi_bln3,0)-isnull(g.wo_ap3,0) as akumulasi_bln3,
        isnull(e.akumulasi_bln4,0)-isnull(g.wo_ap4,0) as akumulasi_bln4,
        isnull(e.akumulasi_bln5,0)-isnull(g.wo_ap5,0) as akumulasi_bln5,
        isnull(e.akumulasi_bln6,0)-isnull(g.wo_ap6,0) as akumulasi_bln6,
        isnull(e.akumulasi_bln7,0)-isnull(g.wo_ap7,0) as akumulasi_bln7,
        isnull(e.akumulasi_bln8,0)-isnull(g.wo_ap8,0) as akumulasi_bln8,
        isnull(e.akumulasi_bln9,0)-isnull(g.wo_ap9,0) as akumulasi_bln9,
        isnull(e.akumulasi_bln10,0)-isnull(g.wo_ap10,0) as akumulasi_bln10,
        isnull(e.akumulasi_bln11,0)-isnull(g.wo_ap11,0) as akumulasi_bln11,
        isnull(e.akumulasi_bln12,0)-isnull(g.wo_ap12,0) as akumulasi_bln12, 
        isnull(d.akumulasi_sd,0)+isnull(e.akumulasi_bln1,0)+isnull(e.akumulasi_bln2,0)+isnull(e.akumulasi_bln3,0)+isnull(e.akumulasi_bln4,0)+isnull(e.akumulasi_bln5,0)+isnull(e.akumulasi_bln6,0)+isnull(e.akumulasi_bln7,0)+isnull(e.akumulasi_bln8,0)+isnull(e.akumulasi_bln9,0)+isnull(e.akumulasi_bln10,0)+isnull(e.akumulasi_bln11,0)+isnull(e.akumulasi_bln12,0)-isnull(g.wo_ap1,0)-isnull(g.wo_ap2,0)-isnull(g.wo_ap3,0)-isnull(g.wo_ap4,0)-isnull(g.wo_ap5,0)-isnull(g.wo_ap6,0)-isnull(g.wo_ap7,0)-isnull(g.wo_ap8,0)-isnull(g.wo_ap9,0)-isnull(g.wo_ap10,0)-isnull(g.wo_ap11,0)-isnull(g.wo_ap12,0)-isnull(f.wo_ap_sd,0) as akumulasi_total,
        isnull(f.wo_sd,0)+isnull(g.wo,0) as wo, 
        case when isnull(g.wo,0)+isnull(f.wo_sd,0)=0 then a.nilai-isnull(d.akumulasi_sd,0)-(isnull(e.akumulasi_bln1,0)+isnull(e.akumulasi_bln2,0)+isnull(e.akumulasi_bln3,0)+isnull(e.akumulasi_bln4,0)+isnull(e.akumulasi_bln5,0)+isnull(e.akumulasi_bln6,0)+isnull(e.akumulasi_bln7,0)+isnull(e.akumulasi_bln8,0)+isnull(e.akumulasi_bln9,0)+isnull(e.akumulasi_bln10,0)+isnull(e.akumulasi_bln11,0)+isnull(e.akumulasi_bln12,0)) else 0 end as nilai_buku 
        from fa_asset a 
        inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi 
        inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
        inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai 
                    from fa_nilai 
                    where kode_lokasi='$kode_lokasi' and substring(periode,1,4)<='".substr($periode,0,4)."' 
                    group by no_fa,kode_lokasi) aa on a.no_fa=aa.no_fa and a.kode_lokasi=aa.kode_lokasi 
        left join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as akumulasi_sd 
                    from fasusut_d 
                    where kode_lokasi='$kode_lokasi' and substring(periode,1,4) < '".substr($periode,0,4)."' 
                    group by no_fa,kode_lokasi )d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi 
        left join (select no_fa,kode_lokasi,
                    sum(case when substring(periode,5,2) = '01' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln1, 
                    sum(case when substring(periode,5,2) = '02' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln2,
                    sum(case when substring(periode,5,2) = '03' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln3,
                    sum(case when substring(periode,5,2) = '04' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln4,
                    sum(case when substring(periode,5,2) = '05' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln5,
                    sum(case when substring(periode,5,2) = '06' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln6,
                    sum(case when substring(periode,5,2) = '07' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln7,
                    sum(case when substring(periode,5,2) = '08' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln8,
                    sum(case when substring(periode,5,2) = '09' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln9,
                    sum(case when substring(periode,5,2) = '10' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln10,
                    sum(case when substring(periode,5,2) = '11' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln11,
                    sum(case when substring(periode,5,2) = '12' then (case dc when 'D' then nilai else -nilai end) else 0 end ) as akumulasi_bln12
                    from fasusut_d 
                    where kode_lokasi='$kode_lokasi' and substring(periode,1,4) ='".substr($periode,0,4)."' 
                    group by no_fa,kode_lokasi )e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi 
        left join (select no_fa,kode_lokasi,sum(nilai) as wo_sd,sum(nilai_ap) as wo_ap_sd 
                    from fawoapp_d 
                    where kode_lokasi='$kode_lokasi' and substring(periode,1,4) <'".substr($periode,0,4)."' 
                    group by no_fa,kode_lokasi )f on a.no_fa=f.no_fa and a.kode_lokasi=f.kode_lokasi 
        left join (select no_fa,kode_lokasi,sum(nilai) as wo,
                    sum(case when substring(periode,5,2) = '01' then nilai_ap else 0 end ) as wo_ap1, 
                    sum(case when substring(periode,5,2) = '02' then nilai_ap else 0 end ) as wo_ap2,
                    sum(case when substring(periode,5,2) = '03' then nilai_ap else 0 end ) as wo_ap3,
                    sum(case when substring(periode,5,2) = '04' then nilai_ap else 0 end ) as wo_ap4,
                    sum(case when substring(periode,5,2) = '05' then nilai_ap else 0 end ) as wo_ap5,
                    sum(case when substring(periode,5,2) = '06' then nilai_ap else 0 end ) as wo_ap6,
                    sum(case when substring(periode,5,2) = '07' then nilai_ap else 0 end ) as wo_ap7,
                    sum(case when substring(periode,5,2) = '08' then nilai_ap else 0 end ) as wo_ap8,
                    sum(case when substring(periode,5,2) = '09' then nilai_ap else 0 end ) as wo_ap9,
                    sum(case when substring(periode,5,2) = '10' then nilai_ap else 0 end ) as wo_ap10,
                    sum(case when substring(periode,5,2) = '11' then nilai_ap else 0 end ) as wo_ap11,
                    sum(case when substring(periode,5,2) = '12' then nilai_ap else 0 end ) as wo_ap12
                    from fawoapp_d 
                    where kode_lokasi='$kode_lokasi' and substring(periode,1,4) ='".substr($periode,0,4)."' 
                    group by no_fa,kode_lokasi )g on a.no_fa=g.no_fa and a.kode_lokasi=g.kode_lokasi 
        $this->filter and a.progress in ('2','W') and a.jenis<>'I'
        order by a.kode_akun,a.tgl_perolehan ";

		
        //error_log($sql);
        // echo $sql;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
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
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		}
		//error_log($sql);
		$i = $start;
		if ($i<0)
		{
			$i=1;
		}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar aktiva operasional dan beban penyusutan asset",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='30' rowspan='3' align='center' class='header_laporan'>No</td>
				<td width='100' rowspan='3' align='center' class='header_laporan'>No Asset </td>
				<td width='60' rowspan='3' align='center' class='header_laporan'>Klp Asset </td>
				<td width='150' rowspan='3' align='center' class='header_laporan'>Nama Klp Asset </td>
				<td width='60' rowspan='3' align='center' class='header_laporan'>Kode PP </td>
				<td width='150' rowspan='3' align='center' class='header_laporan'>Nama PP </td>
				<td width='60' rowspan='3' align='center' class='header_laporan'>Tanggal</td>
				<td width='200' rowspan='3' align='center' class='header_laporan'>Uraian Barang</td>
				
				<td colspan='2' align='center' class='header_laporan'>Umur</td>
				<td width='100' rowspan='3' align='center' class='header_laporan'>Nilai Perolehan </td>
				<td colspan='14' align='center' class='header_laporan'>Nilai Depresiasi </td>
				<td width='100' rowspan='3' align='center' class='header_laporan'>Write Off</td>	
				<td width='100' rowspan='3' align='center' class='header_laporan'>Nilai Buku </td>				
				</tr>
				<tr bgcolor='#CCCCCC'>
				  <td width='40' align='center' rowspan='2' class='header_laporan'>Bulan</td>
				  <td width='40' align='center' rowspan='2' class='header_laporan'>%</td>
				  <td width='100' align='center' rowspan='2' class='header_laporan'>AP Tahun Lalu </td>
				  <td width='100' align='center' colspan='12' class='header_laporan'>AP Bulan </td>
				  <td width='100' align='center' rowspan='2' class='header_laporan'>AP Akhir </td>
				
                </tr>
                <tr bgcolor='#CCCCCC'>
				  <td width='40' align='center' class='header_laporan'>Jan</td>
				  <td width='40' align='center' class='header_laporan'>Feb</td>
				  <td width='100' align='center' class='header_laporan'>Mar </td>
				  <td width='100' align='center' class='header_laporan'>Apr </td>
                  <td width='100' align='center' class='header_laporan'>Mei </td>
                  <td width='40' align='center' class='header_laporan'>Jun</td>
				  <td width='40' align='center' class='header_laporan'>Jul</td>
				  <td width='100' align='center' class='header_laporan'>Ags</td>
				  <td width='100' align='center' class='header_laporan'>Sep</td>
                  <td width='100' align='center' class='header_laporan'>Okt </td>
                  <td width='40' align='center' class='header_laporan'>Nov</td>
				  <td width='40' align='center' class='header_laporan'>Des</td>
                </tr>";
		$nilai = 0; $nilai_buku = 0; $nilai_akm_sd = 0; $nilai_akm_bln1 = 0;$nilai_akm_bln2 = 0;$nilai_akm_bln3 = 0;$nilai_akm_bln4 = 0;$nilai_akm_bln5 = 0;$nilai_akm_bln6 = 0;$nilai_akm_bln7 = 0; $nilai_akm_bln8 = 0;$nilai_akm_bln9 = 0;$nilai_akm_bln10 = 0;$nilai_akm_bln11 = 0;$nilai_akm_bln12 = 0;$nilai_akm_total = 0;
		$nilai2= 0 ; $nilai_buku2 = 0 ; $nilai_akm_sd2 = 0; $nilai_akm_bln21 = 0;$nilai_akm_total2 = 0;$wo=0;$wo2=0;
		$first = true;
		$ix=1;
		$tmp = "";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->kode_klpakun; 
			if ($tmp!=$row->kode_klpakun)
			{				
				$first = true;
				
				if ($tmp != "")
				{
					echo "<tr bgcolor='#eeeeee'>
								  <td colspan='10' align='right' class='header_laporan'>Sub Total</td>
								  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln1,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln2,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln3,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln4,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln5,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln6,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln7,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln8,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln9,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln10,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln11,0,",",".")."</td>
                                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln12,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($nilai_akm_total,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($wo,0,",",".")."</td>
								  <td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>								  
				  </tr>";										
				}
				$tmp=$row->kode_klpakun;
				$i=1;
				$nilai=0;$nilai_buku=0;$nilai_akm_sd=0;$nilai_akm_bln1 = 0;$nilai_akm_bln2 = 0;$nilai_akm_bln3 = 0;$nilai_akm_bln4 = 0;$nilai_akm_bln5 = 0;$nilai_akm_bln6 = 0;$nilai_akm_bln7 = 0; $nilai_akm_bln8 = 0;$nilai_akm_bln9 = 0;$nilai_akm_bln10 = 0;$nilai_akm_bln11 = 0;$nilai_akm_bln12 = 0;$nilai_akm_total=0;$wo=0;
			}
		    $nilai += $row->nilai;
			$nilai_akm_sd += $row->akumulasi_sd;
			$nilai_akm_bln1 += $row->akumulasi_bln1;
			$nilai_akm_bln2 += $row->akumulasi_bln2;
			$nilai_akm_bln3 += $row->akumulasi_bln3;
			$nilai_akm_bln4 += $row->akumulasi_bln4;
			$nilai_akm_bln5 += $row->akumulasi_bln5;
			$nilai_akm_bln6 += $row->akumulasi_bln6;
			$nilai_akm_bln7 += $row->akumulasi_bln7;
			$nilai_akm_bln8 += $row->akumulasi_bln8;
			$nilai_akm_bln9 += $row->akumulasi_bln9;
			$nilai_akm_bln10 += $row->akumulasi_bln10;
			$nilai_akm_bln11 += $row->akumulasi_bln11;
			$nilai_akm_bln12 += $row->akumulasi_bln12;
			$nilai_akm_total += $row->akumulasi_total;
			$nilai_buku += $row->nilai-$row->akumulasi_total-$row->wo;
			$wo=$wo+$row->wo;
			$nilai2 += $row->nilai;
			$nilai_akm_sd2 += $row->akumulasi_sd;
			$nilai_akm_bln21 += $row->akumulasi_bln1;
			$nilai_akm_bln22 += $row->akumulasi_bln2;
			$nilai_akm_bln23 += $row->akumulasi_bln3;
			$nilai_akm_bln24 += $row->akumulasi_bln4;
			$nilai_akm_bln25 += $row->akumulasi_bln5;
			$nilai_akm_bln26 += $row->akumulasi_bln6;
			$nilai_akm_bln27 += $row->akumulasi_bln7;
			$nilai_akm_bln28 += $row->akumulasi_bln8;
			$nilai_akm_bln29 += $row->akumulasi_bln9;
			$nilai_akm_bln210 += $row->akumulasi_bln10;
			$nilai_akm_bln211 += $row->akumulasi_bln11;
			$nilai_akm_bln212 += $row->akumulasi_bln12;
			$nilai_akm_total2 += $row->akumulasi_total;
			$nilai_buku2 += $row->nilai-$row->akumulasi_total-$row->wo;
			$wo2=$wo2+$row->wo;
			echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				  <td  class='isi_laporan'>";
				  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBbAsset('$row->no_fa','$row->kode_lokasi');\">$row->no_fa</a>";				  
			echo "</td>
				  <td  class='isi_laporan' align='center'>$row->kode_klpakun</td>
				  <td  class='isi_laporan'>$row->nama_klpakun</td>
				  <td  class='isi_laporan'>$row->kode_pp</td>
				  <td  class='isi_laporan'>$row->nama_pp</td>
				  <td  class='isi_laporan'>$row->tgl</td>
				  <td  class='isi_laporan'>$row->nama</td>
				
				   <td  class='isi_laporan' align='center'>$row->umur</td>
				  <td  class='isi_laporan' align='center'>$row->persen</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_sd,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln1,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln2,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln3,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln4,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln5,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln6,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln7,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln8,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln9,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln10,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln11,0,",",".")."</td>
                  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_bln12,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->akumulasi_total,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->wo,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai_buku,0,",",".")."</td>
  </tr>";
			
			$i++;
			$ix++;
		}
	
		echo "<tr bgcolor='#CCCCCC'>
				  <td colspan='10' align='right' class='header_laporan'>Sub Total</td>
				  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln1,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln2,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln3,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln4,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln5,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln6,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln7,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln8,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln9,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln10,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln11,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln12,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_total,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($wo,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>
		</tr>";
		echo "<tr bgcolor='#CCCCCC'>
				  <td colspan='10' align='right' class='header_laporan'>Total</td>
				  <td class='header_laporan' align='right'>".number_format($nilai2,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_sd2,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln21,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln22,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln23,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln24,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln25,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln26,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln27,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln28,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln29,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln210,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln211,0,",",".")."</td>
                  <td class='header_laporan' align='right'>".number_format($nilai_akm_bln212,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_akm_total2,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($wo2,0,",",".")."</td>
				  <td class='header_laporan' align='right'>".number_format($nilai_buku2,0,",",".")."</td>
		</tr>";
		
			
		echo "</div>";
		return "";
	}
	
}
?>
