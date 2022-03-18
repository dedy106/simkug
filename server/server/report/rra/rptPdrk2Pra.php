<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;

class server_report_rra_rptPdrk2pra extends server_report_basic
{	
	//protected $config = "orarra";	
	function setDBConnection($config){
		$this->config = $config;
	}
	function getTotalPage()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(*) as tot from rra_pra_m a  $this->filter";
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
		$dbLib = new server_DBConnection_dbLib($this->config);
		$dbLib->connect();		
		$dbdriver = $dbLib->connection->driver;		
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];
		//a.nik_app3,f.nama as nama_app3,
		if ($dbdriver == "oci8")
			$sql="select a.no_pdrk,a.tanggal,a.jenis_agg,b.nama as nama_ubis,c.nama as nama_gubis,
				   to_char(a.tanggal,'D') as tgl,to_char(a.tanggal,'MM') as bulan,to_char(a.tanggal,'YYYY') as tahun,
				   a.nik_app1 as nik_app1,x.nama as nama_app1, x.jabatan,
				   a.nik_app2 as nik_app2,z.nama as nama_app2, z.jabatan as jabatan2,				   
				   g.kode_cc,g.nama_cc,g.kode_akun,g.nama_akun,g.kode_ba,g.target, g.kode_drk, g.nmdrk,
				   h.kode_cc2,h.nama_cc2,h.kode_akun2,h.nama_akun2,h.kode_ba2, h.kode_drk2, h.nmdrk2, 
				   isnull(i.nilai_usulan,0) as nilai_usulan,isnull(j.nilai_gar,0) as nilai_gar,
				   isnull(j.saldo,0) as saldo,isnull(j.nilai_pakai,0) as nilai_pakai,isnull(j.nilai,0) as nilai_real,
				   isnull(k.justifikasi,a.justifikasi) as justifikasi, isnull(k.sts_pdrk, a.sts_pdrk) as sts_pdrk, l.nama as kota
			from rra_pra_m a			
			inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 			
			left outer join rra_karyawan x on a.nik_app1 = x.nik and a.kode_lokasi=x.kode_lokasi
			left outer join rra_karyawan z on a.nik_app2 = z.nik and a.kode_lokasi=z.kode_lokasi
			left outer join rra_Kota l on l.kode_kota = a.kode_kota 
			left outer join rra_rev_m k on k.no_pdrk = a.no_pdrk and k.kode_lokasi = a.kode_lokasi 
			left join (select distinct x.no_bukti as no_pdrk,x.kode_lokasi,x.kode_akun,x.kode_drk, w.nama as nmdrk, x.kode_cc,y.kode_ba,y.nama as nama_cc,z.nama as nama_akun,x.target
					   from rra_anggaran x
					   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
					   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					   left outer join rra_drk w on w.kode_drk = x.kode_drk and w.kode_lokasi = x.kode_lokasi
						where dc='D'
				   )g on a.no_pdrk=g.no_pdrk and a.kode_lokasi=g.kode_lokasi
			left join (select distinct x.no_bukti as no_pdrk,x.kode_lokasi,x.kode_akun as kode_akun2,x.kode_drk as kode_drk2, w.nama as nmdrk2,x.kode_cc as kode_cc2,y.kode_ba as kode_ba2,y.nama as nama_cc2,z.nama as nama_akun2
					   from rra_anggaran x
					   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
					   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					   left outer join rra_drk w on w.kode_drk = x.kode_drk and w.kode_lokasi = x.kode_lokasi
					   where dc='C'
				   )h on a.no_pdrk=h.no_pdrk and a.kode_lokasi=h.kode_lokasi
			left join (select no_bukti as no_pdrk,kode_lokasi,sum(nilai) as nilai_usulan
					   from rra_anggaran
				   where dc='D'
					   group by no_bukti,kode_lokasi
				  )i on a.no_pdrk=i.no_pdrk and a.kode_lokasi=i.kode_lokasi
			left join (select no_bukti as no_pdrk,kode_lokasi,
							  sum(nilai_gar) as nilai_gar,sum(saldo) as saldo,sum(nilai_pakai) as nilai_pakai,sum(nilai) as nilai
					   from rra_anggaran
				   where dc='C'
					   group by no_bukti,kode_lokasi
				  )j on a.no_pdrk=j.no_pdrk and a.kode_lokasi=j.kode_lokasi	 $this->filter order by a.no_pdrk  ";
		else 
			$sql="select a.no_pdrk,a.tanggal,a.jenis_agg,b.nama as nama_ubis,c.nama as nama_gubis,
				   datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,datepart(year,a.tanggal) as tahun,
				   a.nik_app1,d.nama as nama_app1,a.nik_app2,e.nama as nama_app2,a.nik_app3,f.nama as nama_app3,
				   g.kode_cc,g.nama_cc,g.kode_akun,g.nama_akun,g.kode_ba,g.target,
				   h.kode_cc2,h.nama_cc2,h.kode_akun2,h.nama_akun2,h.kode_ba2,
				   isnull(i.nilai_usulan,0) as nilai_usulan,isnull(j.nilai_gar,0) as nilai_gar,
				   isnull(j.saldo,0) as saldo,isnull(j.nilai_pakai,0) as nilai_pakai,isnull(j.nilai,0) as nilai_real,
				   isnull(k.justifikasi,a.justifikasi) as justifikasi, isnull(k.sts_pdrk, a.sts_pdrk) as sts_pdrk
			from rra_pra_m a
			inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
			inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
			inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
			inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi
			left outer join rra_rev_m k on k.no_pdrk = a.no_pdrk and k.kode_lokasi = a.kode_lokasi 
			left join (select distinct x.no_pdrk,x.kode_lokasi,x.kode_akun,x.kode_cc,y.kode_ba,y.nama as nama_cc,z.nama as nama_akun,x.target
					   from rra_pra_d x
					   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
					   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
						where dc='D'
				   )g on a.no_pdrk=g.no_pdrk and a.kode_lokasi=g.kode_lokasi
			left join (select distinct x.no_pdrk,x.kode_lokasi,x.kode_akun as kode_akun2,x.kode_cc as kode_cc2,y.kode_ba as kode_ba2,y.nama as nama_cc2,z.nama as nama_akun2
					   from rra_pra_d x
					   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
					   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					   where dc='C'
				   )h on a.no_pdrk=h.no_pdrk and a.kode_lokasi=h.kode_lokasi
			left join (select no_pdrk,kode_lokasi,sum(nilai) as nilai_usulan
					   from rra_pra_d
				   where dc='D'
					   group by no_pdrk,kode_lokasi
				  )i on a.no_pdrk=i.no_pdrk and a.kode_lokasi=i.kode_lokasi
			left join (select no_pdrk,kode_lokasi,
							  sum(nilai_gar) as nilai_gar,sum(saldo) as saldo,sum(nilai_pakai) as nilai_pakai,sum(nilai) as nilai
					   from rra_pra_d
				   where dc='C'
					   group by no_pdrk,kode_lokasi
				  )j on a.no_pdrk=j.no_pdrk and a.kode_lokasi=j.kode_lokasi	 $this->filter order by a.no_pdrk  ";
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$nilai_usulan=number_format($row->nilai_usulan,0,',','.');
			echo "<table width='700' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><bold>JUSTIFIKASI </bold></td>
  </tr>
  <tr>
    <td align='center'><bold>".strtoupper($row->sts_pdrk == "RRR" ? "RESCHEDULLING/REDISTRIBUSI/REALOKASI":$row->sts_pdrk)." </bold></td>
  </tr>
  <tr>
    <td align='center'><bold>".strtoupper($row->jenis_agg)."</bold></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><hr><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='5%' align='center'><bold>1.</bold></td>
        <td width='30%'><bold>Nama Kegiatan</bold> </td>
        <td width='65%'><bold>: $row->nmdrk</bold>  </td>
      </tr>
      <tr>
        <td align='center'><bold>2.</bold></td>
        <td><bold>Nomor DRK</bold> </td>
        <td><bold>:$row->kode_drk</bold></td>
      </tr>
      <tr>
        <td align='center'><bold>3.</bold></td>
        <td><bold>Unit Kerja</bold> </td>
        <td>: $row->nama_cc</td>
      </tr>
      <tr>
        <td align='center'><bold>4.</bold></td>
        <td><bold>Total Nilai</bold> </td>
        <td>: $nilai_usulan </td>
      </tr>
      <tr>
        <td align='center'><bold>5.</bold></td>
        <td><bold>Nomor Cost Center </bold></td>
        <td>: " . ($row->jenis_agg == "CAPEX" ? "":$row->kode_cc). " </td>
      </tr>
      <tr>
        <td align='center'><bold>6.</bold></td>
        <td><bold>Nama Cost Center</bold> </td>
        <td>: " . ($row->jenis_agg == "CAPEX" ? "":$row->nama_cc). " </td>
      </tr>
      <tr>
        <td align='center'><bold>7</bold></td>
        <td><bold>Actifity Type</bold> </td>
        <td>:  </td>
      </tr>
      <tr>
        <td align='center'><bold>8.</bold></td>
        <td><bold>Kode Fund Center</bold> </td>
        <td>: " . ($row->jenis_agg == "CAPEX" ? $row->kode_cc:""). " </td>
      </tr>
      <tr>
        <td align='center'><bold>9.</bold></td>
        <td><bold>Nomor Akun</bold></td>
        <td>: $row->kode_akun </td>
      </tr>
      <tr>
        <td align='center'><bold>10.</bold></td>
        <td><bold>Nama Akun </bold></td>
        <td>: $row->nama_akun </td>
      </tr>
      <tr>
        <td align='center'><bold>11.</bold></td>
        <td><bold>Saat Penggunaaan </bold></td>
        <td>: $row->target </td>
      </tr>
    </table><hr></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>".urldecode($row->justifikasi)."</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>&nbsp;</td>
        <td align='center'>$row->kota, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>Mengetahui / Menyetujui </td>
        <td>Penanggung Jawab Program </td>
      </tr>
      <tr align='center'>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>$row->nama_app2</td>
        <td>$row->nama_app1</td>
      </tr>
      <tr align='center'>
        <td>$row->nik_app2</td>
        <td>$row->nik_app1</td>
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
  
