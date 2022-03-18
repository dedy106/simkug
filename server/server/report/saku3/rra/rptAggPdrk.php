<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rra_rptAggPdrk extends server_report_basic
{	
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		
		
		$sql="select a.no_pdrk,a.tanggal,a.jenis_agg,b.nama as nama_ubis,c.nama as nama_gubis,
				   to_char(a.tanggal,'DD') as tgl, to_char(a.tanggal,'MM') as bulan,to_char(a.tanggal,'YYYY') as tahun,
				  nvl(f.nik_app1, nvl(e.nik_app1,a.nik_app1)) as nik_app1,y.nama as nama_app1, y.jabatan as jabatan1,
				   nvl(f.nik_app2, nvl(e.nik_app2,a.nik_app2)) as nik_app2,x.nama as nama_app2, x.jabatan as jabatan2,				   
				   nvl(f.nik_app3, nvl(e.nik_app3,a.nik_app3)) as nik_app3,z.nama as nama_app3, z.jabatan as jabatan3,				   
				   g.nama as kota
			from rra_pdrk_m a
			left outer join rra_rev_m e on e.no_pdrk = a.no_pdrk and e.kode_lokasi  = a.kode_lokasi 
			left outer join rra_grev_m f on f.no_pdrk = a.no_pdrk and f.kode_lokasi  = a.kode_lokasi 
			left outer join rra_kota g on g.kode_kota = a.kode_kota
			left outer join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			left outer join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
			left outer join rra_karyawan y on nvl(f.nik_app1, nvl(e.nik_app1,a.nik_app1))= y.nik and a.kode_lokasi=y.kode_lokasi
			left outer join rra_karyawan x on nvl(f.nik_app2, nvl(e.nik_app2,a.nik_app2))= x.nik and a.kode_lokasi=x.kode_lokasi
			left outer join rra_karyawan z on nvl(f.nik_app3, nvl(e.nik_app3,a.nik_app3))= z.nik and a.kode_lokasi=z.kode_lokasi
			$this->filter order by a.no_pdrk   ";	


echo $sql;			
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$sql2 ="select a.no_pdrk,a.tanggal,a.jenis_agg,b.nama as nama_ubis,c.nama as nama_gubis,
						g.kode_cc,g.nama_cc,g.kode_akun,g.nama_akun,g.kode_ba,g.target,g.nilai as nilai_penerima					   
						,g.kode_drk, g.nmdrk 
				from rra_pdrk_m a
				left outer join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
				left outer join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
				left outer join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
				left outer join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
				left outer join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi
				left join (select distinct x.no_bukti as no_pdrk,x.periode, x.kode_lokasi,x.kode_akun,x.kode_cc,x.kode_drk, w.nama as nmdrk,y.kode_ba,y.nama as nama_cc,z.nama as nama_akun,x.target,x.nilai
							, nilai_gar, saldo, nilai_pakai
						   from rra_anggaran x
						   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
						   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi						   
						   left outer join rra_drk w on w.kode_drk = x.kode_drk and w.kode_lokasi = x.kode_lokasi
							where dc='D' 
					   )g on a.no_pdrk=g.no_pdrk and a.kode_lokasi=g.kode_lokasi
				left join (select no_bukti as no_pdrk,kode_lokasi,sum(nilai) as nilai_usulan
						   from rra_anggaran
					   where dc='D'
						   group by no_bukti,kode_lokasi
					  )i on a.no_pdrk=i.no_pdrk and a.kode_lokasi=i.kode_lokasi
				where a.no_pdrk = '$row->no_pdrk'  ";		
			$sql3 ="select a.no_pdrk,a.tanggal,a.jenis_agg,b.nama as nama_ubis,c.nama as nama_gubis,
					h.kode_cc2,h.nama_cc2,h.kode_akun2,h.nama_akun2,h.kode_ba2,h.nilai as nilai_donor,
					h.kode_drk2, h.nmdrk2,
				   isnull(h.nilai_gar,0) as nilai_gar,isnull(h.saldo,0) as saldo,isnull(h.nilai_pakai,0) as nilai_pakai,isnull(h.nilai,0) as nilai_real
			from rra_pdrk_m a
			left outer join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			left outer join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
			left outer join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
			left outer join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
			left outer join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi
			left join (select distinct no_bukti as no_pdrk,periode, x.kode_lokasi,x.kode_akun as kode_akun2,x.kode_drk as kode_drk2, w.nama as nmdrk2,x.kode_cc as kode_cc2,y.kode_ba as kode_ba2,y.nama as nama_cc2,z.nama as nama_akun2, x.nilai
						, nilai_gar, saldo, nilai_pakai
					   from rra_anggaran x
					   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
					   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					   left outer join rra_drk w on w.kode_drk = x.kode_drk and w.kode_lokasi = x.kode_lokasi
					   where dc='C'
				   )h on a.no_pdrk=h.no_pdrk and a.kode_lokasi=h.kode_lokasi
			left join (select no_bukti as no_pdrk,kode_lokasi,
							  sum(nilai_gar) as nilai_gar,sum(saldo) as saldo,sum(nilai_pakai) as nilai_pakai,sum(nilai) as nilai
					   from rra_anggaran
				   where dc='C'
					   group by no_bukti,kode_lokasi
				  )j on a.no_pdrk=j.no_pdrk and a.kode_lokasi=j.kode_lokasi	 
			where a.no_pdrk = '$row->no_pdrk' ";					
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$nilai_usulan=number_format($row->nilai_usulan,0,',','.');
			//$nilai_real=number_format($row->nilai_real,0,',','.');
			//$sisa=number_format($row->sisa,0,',','.');
			//$sisa_agg=number_format($row->sisa_agg,0,',','.');
			echo "<table width='800'  border='0' cellpadding='0' cellspacing='0'>
		  <tr>
			<td><table width='100%'  border='0'>
			  <tr>
				<td align='center'>PERUBAHAN DAFTAR RENCANA KEGIATAN </td>
			  </tr>
			  <tr>
				<td align='center'>RESCHEDULING / REDISTRIBUSI / REALOKASI / ABT </td>
			  </tr>
			  <tr>
				<td align='center'>".strtoupper($row->jenis_agg)." </td>
			  </tr>
			  <tr>
				<td align='center'>&nbsp;</td>
			  </tr>
			</table></td>
		  </tr>
		  <tr>
			<td><table width='100%'  border='0'>
			  <tr>
				<td width='28%'>Penanggung Jawab Program </td>
				<td width='72%'>: $row->nama_ubis </td>
			  </tr>
			  <tr>
				<td>Direktorat</td>
				<td>: $row->nama_gubis </td>
			  </tr>
			  <tr>
				<td>Nomor PDRK</td>
				<td>: $row->no_pdrk </td>
			  </tr>
			  <tr>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			  </tr>
			</table></td>
		  </tr>
		  <tr>
			<td><table width='100%'  border='0'>
			  <tr>
				<td width='3%'>I</td>
				<td colspan='3'>IDENTITAS PROGRAM (YANG DIUSULKAN REVISI) REVISI / SUPLISI </td>
				</tr>
			  <tr>
				<td>&nbsp;</td>
				<td colspan='3'>
			<table width='100%' border='1' class='kotak'><tr>
				<td width='100' align='center'>Cost Center</td>				
				<td align='center'>WBS</td>
				<td align='center'>Nomor/Nama Akun</td>				
				<td width='150' align='center'>Target Selesai</td>
				<td width='100' align='center'>Nilai Yang Diusulkan</td>
			</tr>
			<tr>
				<td align='center'>1</td>
				<td align='center'>2</td>
				<td align='center'>3</td>
				<td align='center'>4</td>
				<td align='center'>5</td>				
			</tr>";
			$rs2 = $dbLib->execute($sql2);			
			$jum = $rs2->recordcount();
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{	
				echo "<tr>					
					<td>$row2->kode_cc</td>					
					<td>$row2->kode_drk - $row2->nmdrk</td>					
					<td>$row2->kode_akun - $row2->nama_akun</td>					
					<td>$row2->target</td>
					<td align='right'>".number_format( $row2->nilai_penerima,0,',','.')."</td>
				</tr>";		
			}			
			
		echo "</table></td>        
      </tr>
      
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>II</td>
        <td colspan='3'>USULAN PROGRAM / ANGGARAN YANG DIALIHKAN </td>
        </tr>
      <tr>
		<td>&nbsp;</td>
        <td colspan='3'>
			<table width='100%' border='1' class='kotak'><tr>
				<td align='center'>Cost Center</td>				
				<td align='center'>WBS</td>				
				<td align='center'>Nomor / Nama Akun</td>				
				<td align='center'>Jumlah Anggaran</td>
				<td align='center'>Realisasi</td>
				<td align='center'>Sisa Anggaran</td>
				<td align='center'>RRR / ABT</td>
				<td align='center'>Sisa Anggaran</td>				
			</tr>
			<tr>
				<td align='center'>1</td>
				<td align='center'>2</td>
				<td align='center'>3</td>
				<td align='center'>4</td>
				<td align='center'>5</td>
				<td align='center'>6 = 4 - 5</td>
				<td align='center'>7</td>
				<td align='center'>8 = 6 - 7</td>		
			</tr>";
			$rs2 = $dbLib->execute($sql3);			
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{	
				echo "<tr>
					<td width='100'>$row2->kode_cc2</td>
					<td>$row2->kode_drk2 - $row2->nmdrk2</td>															
					<td>$row2->kode_akun2 - $row2->nama_akun2</td>					
					<td width='100' align='right'>".number_format( $row2->nilai_gar,0,',','.')."</td>
					<td width='100' align='right'>".number_format( $row2->nilai_pakai,0,',','.')."</td>
					<td width='100' align='right'>".number_format($row2->saldo,0,',','.')."</td>
					<td width='100' align='right'>".number_format( $row2->nilai_donor,0,',','.')."</td>
					<td width='100' align='right'>".number_format( $row2->saldo - $row2->nilai_donor,0,',','.' )."</td>
				</tr>";		
			}			
			
		echo "</table></td>        
      </tr> 
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>III</td>
        <td colspan='3'>JUSTIFIKASI TERLAMPIR </td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>$row->kota, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr>
        <td width='28%'>&nbsp;</td>
        <td width='35%'>&nbsp;</td>
        <td width='37%'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>Mengetahui / Menyetujui</td>
        <td>&nbsp;</td>
        <td align='center'>Penanggung Jawab Program </td>
      </tr>
      <tr>
        <td align='center'>$row->jabatan2</td>
        <td>&nbsp;</td>
        <td align='center'>$row->jabatan1</td>
      </tr>
      <tr>
        <td height='70' align='center' valign='bottom'>$row->nama_app2</td>
        <td>&nbsp;</td>
        <td align='center' valign='bottom'>$row->nama_app1</td>
      </tr>
      <tr>
        <td align='center'>NIK : $row->nik_app2</td>
        <td>&nbsp;</td>
        <td align='center'>NIK : $row->nik_app1</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center'>Menyetujui dan Menetapkan </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center'>$row->jabatan3</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='70'>&nbsp;</td>
        <td align='center' valign='bottom'>$row->nama_app3</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center'>NIK : $row->nik_app3</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>
";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
