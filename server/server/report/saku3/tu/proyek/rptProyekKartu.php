<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptProyekKartu extends server_report_basic
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
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.kode_proyek,a.kode_lokasi,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_or,a.nama,a.kode_jenis,d.nama as nama_jenis,a.no_pks,
		a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.nilai,a.nilai_or,
		isnull(e.nilai,0) as piutang,isnull(f.nilai,0) as pdpt,isnull(g.nilai,0) as kas,
	   isnull(h.nilai,0) as beban,isnull(i.nilai,0) as bdd,isnull(j.nilai,0) as bymhd,
	   datediff(month,a.tgl_mulai,a.tgl_selesai)+1 as bulan
from prb_proyek a
inner join prb_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join prb_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
left join (select no_dokumen,kode_lokasi,sum(nilai) as nilai
		   from trans_j
		   where kode_lokasi='$kode_lokasi' and jenis='PIU'
		   group by no_dokumen,kode_lokasi
		  )e on a.kode_proyek=e.no_dokumen and a.kode_lokasi=e.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from prb_prpyt_d
		   where kode_lokasi='$kode_lokasi'
		   group by kode_proyek,kode_lokasi
		  )f on a.kode_proyek=f.kode_proyek and a.kode_lokasi=f.kode_lokasi
left join (select b.kode_proyek,a.kode_lokasi,sum(case a.dc when 'C' then a.nilai else -a.nilai end) as nilai 
		   from trans_j a
		   inner join prb_prbill_m b on a.no_dokumen=b.no_bill and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.jenis='PIU'
		   group by b.kode_proyek,a.kode_lokasi
		   )g on a.kode_proyek=g.kode_proyek and a.kode_lokasi=g.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from prb_prbeban_d
		   where kode_lokasi='$kode_lokasi' and dc='D' and modul='AJUBEBAN'
		   group by kode_proyek,kode_lokasi
		  )h on a.kode_proyek=h.kode_proyek and a.kode_lokasi=h.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(case when dc='D' then nilai else -nilai end) as nilai
		   from prb_prbeban_d
		   where kode_lokasi='$kode_lokasi' and modul in ('REVBDD','REVBMHD')
		   group by kode_proyek,kode_lokasi
		  )i on a.kode_proyek=i.kode_proyek and a.kode_lokasi=i.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(nilai) as nilai
		   from prb_bmhd_d
		   where kode_lokasi='$kode_lokasi' and dc='D' and modul='SCHBEBAN'
		   group by kode_proyek,kode_lokasi
		  )j on a.kode_proyek=j.kode_proyek and a.kode_lokasi=j.kode_lokasi
$this->filter order by a.kode_proyek";

// echo $sql;
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("Kartu Proyek",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='500'>
   <tr >
    <td height='23' colspan='11' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Proyek  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_proyek </td>
                  </tr>
				  <tr>
                    <td class='header_laporan' width='100'>No SPK  </td>
                    <td class='header_laporan' >:&nbsp;$row->no_pks </td>
                  </tr>
				   <tr>
                    <td class='header_laporan'>Nama Proyek </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
				  <tr>
                    <td class='header_laporan'>Jenis</td>
                    <td class='header_laporan'>:&nbsp;$row->nama_jenis</td>
                  </tr>
				    <tr>
                    <td class='header_laporan' width='100'>Jangka Waktu  </td>
                    <td class='header_laporan' >:&nbsp;$row->tgl_mulai - $row->tgl_selesai ( $row->bulan )</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Mitra </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_cust - $row->nama_cust</td>
                  </tr>
                  
				  
				  <tr>
                    <td class='header_laporan'>Nilai Proyek</td>
                    <td class='header_laporan'>:&nbsp;".number_format($row->nilai,0,',','.')."</td>
                  </tr>
				  <tr>
                    <td class='header_laporan'>Nilai OR</td>
                    <td class='header_laporan'>:&nbsp;".number_format($row->nilai_or,0,',','.')."</td>
                  </tr>
                </table></td>
     </tr>
 

  <tr bgcolor='#CCCCCC'>
    <td width='200' height='23' class='header_laporan' align='center'>Keterangan</td>
	 <td width='100' class='header_laporan' align='center'>Total Saldo</td>
  </tr>
  <tr>
	<td  class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->kode_proyek','$row->kode_lokasi');\">Saldo Piutang</a></td>
    <td class='isi_laporan' align='right'>".number_format($row->piutang,0,',','.')."</td>
  </tr>
  <tr>
	
	<td  class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->kode_proyek','$row->kode_lokasi');\">Saldo Pelunasan</a></td>
    <td class='isi_laporan' align='right'>".number_format($row->kas,0,',','.')."</td>
  </tr>
  <tr>
	
	<td  class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBeban('$row->kode_proyek','$row->kode_lokasi');\">Saldo BDD</a></td>
    <td class='isi_laporan' align='right'>".number_format($row->bdd,0,',','.')."</td>
  </tr>
  <tr>

	<td  class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBymhd('$row->kode_proyek','$row->kode_lokasi');\">Saldo BYMHD</a></td>
    <td class='isi_laporan' align='right'>".number_format($row->bymhd,0,',','.')."</td>
  </tr>
  <tr>
	
	<td  class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPdpt('$row->kode_proyek','$row->kode_lokasi');\">Saldo Pengakuan Pendapatan</a></td>
    <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
  </tr>
  <tr>
	
	<td  class='isi_laporan' ><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBdd('$row->kode_proyek','$row->kode_lokasi');\">Saldo Beban</a></td>
    <td class='isi_laporan' align='right'>".number_format($row->beban,0,',','.')."</td>
  </tr>
	</table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
