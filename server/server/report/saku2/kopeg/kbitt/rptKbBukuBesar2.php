<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptKbBukuBesar2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		$sql = "select count(a.kode_akun)
from glma_tmp a $filter_akun and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		
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
		$nama_form=$tmp[0];
		$filter_akun=$tmp[1];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[3];
		$nik_user=$tmp[4];
		$sort=$tmp[5];
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama,a.so_awal
from glma_tmp a $filter_akun and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0)
order by a.kode_akun";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
   <tr >
    <td height='23' colspan='11' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                    <td class='header_laporan' width='100'>Kode Akun  </td>
                    <td class='header_laporan' >:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  
                </table></td>
     </tr>
 
  <tr>
    <td height='23' colspan='9' class='header_laporan' align='right'>Saldo Awal </td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
   <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='74' height='23' class='header_laporan' align='center'>No Dokumen</td>
	<td width='74' height='23' class='header_laporan' align='center'>No Agenda</td>
	<td width='74' height='23' class='header_laporan' align='center'>No Dokumen App</td>
	<td width='74' height='23' class='header_laporan' align='center'>Nama PP</td>
    <td width='50' height='23' class='header_laporan' align='center'>Modul</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>";

			$sql ="
			select a.no_bukti,a.no_dokumen,a.no_aju,isnull(b.no_app,'-') as no_app,a.nama_pp,a.tgl,a.tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.periode,a.modul,a.jenis, sum(a.debet) as debet,sum(a.kredit) as kredit
			from (
			select a.no_kas as no_bukti,a.no_dokumen,case when isnull(c.jenis,'-') = 'ONLINE' then isnull(c.no_aju,'-') else '-' end as no_aju,case when isnull(c.jenis,'-') = 'OFFLINE' then '-' else e.nama end as nama_pp,convert(varchar,a.tanggal,103) as tgl,a.tanggal,
						a.kode_akun,case when isnull(c.jenis,'-') = 'OFFLINE' then '-' else a.kode_pp end as kode_pp,a.kode_drk,a.keterangan,a.periode, a.modul, 
						case when a.dc='D' then a.nilai else 0 end as debet, 
						case when a.dc='C' then (
							case when (isnull(c.no_aju,'-') <> '-' and isnull(j.jum,0) > 1) then c.nilai else a.nilai end
							) 
						else 0 end as kredit,c.jenis
						from kas_j a 
						inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
						left join ( select a.no_kas,a.kode_lokasi,a.no_aju,a.kode_pp,d.jenis,e.nilai
									from it_aju_m a
									inner join it_ajuapp_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and a.no_app=d.no_app 
									inner join ( select a.no_kas,a.no_dokumen,a.kode_lokasi, sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai
									from kas_j a 
									group by a.no_kas,a.no_dokumen,a.kode_lokasi
									) e on a.no_aju=e.no_dokumen and a.kode_lokasi=e.kode_lokasi and a.no_kas=e.no_kas
									where d.jenis in ('OFFLINE','ONLINE')
									)c on b.no_kas=c.no_kas and b.kode_lokasi=c.kode_lokasi 
						left join ( select a.no_kas,a.kode_lokasi,count(*) as jum
									from it_aju_m a
									inner join it_ajuapp_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and a.no_app=d.no_app and d.jenis in ('OFFLINE','ONLINE') 
									group by a.no_kas,a.kode_lokasi
									)j on b.no_kas=j.no_kas and b.kode_lokasi=j.kode_lokasi 
						left join pp e on c.kode_pp=e.kode_pp and c.kode_lokasi=e.kode_lokasi
						where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) and a.kode_akun='$row->kode_akun'  $this->filter 
			) a
			left join it_dok_app b on a.no_aju=b.no_aju 
			group by a.no_bukti,a.no_dokumen,a.no_aju,b.no_app,a.nama_pp,a.tanggal,a.tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.periode,a.modul,a.jenis
			$sort
			";
			// echo $sql;
			// $sql =" select a.no_kas as no_bukti,a.no_dokumen,case when isnull(c.jenis,'-') = 'ONLINE' then isnull(c.no_aju,'-') else '-' end as no_aju,isnull(e.nama,'-') as nama_pp,convert(varchar,a.tanggal,103) as tgl,
            // a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.periode, a.modul, 
			// case when a.dc='D' then a.nilai else 0 end as debet, 
			// case when a.dc='C' then (
			// 	case when (isnull(c.no_aju,'-') <> '-' and isnull(j.jum,0) > 0) then c.nilai else a.nilai end
			// 	) 
			// else 0 end as kredit 
            // from kas_j a 
            // inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
            // left join ( select a.no_kas,a.kode_lokasi,a.no_aju,a.kode_pp,a.nilai,d.jenis 
            //             from it_aju_m a
            //             inner join it_ajuapp_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and a.no_app=d.no_app and d.jenis in ('OFFLINE','ONLINE')
            //             )c on b.no_kas=c.no_kas and b.kode_lokasi=c.kode_lokasi 
			// left join ( select a.no_kas,a.kode_lokasi,count(*) as jum,d.jenis
            //             from it_aju_m a
            //             inner join it_ajuapp_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and a.no_app=d.no_app and d.jenis in ('OFFLINE','ONLINE')
			// 			group by a.no_kas,a.kode_lokasi,d.jenis
            //             )j on b.no_kas=j.no_kas and b.kode_lokasi=j.kode_lokasi and c.jenis=j.jenis
            // left join pp e on c.kode_pp=e.kode_pp and c.kode_lokasi=e.kode_lokasi
			// where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) and a.kode_akun='$row->kode_akun'  $this->filter $sort
			// ";
// 			$sql="select a.no_kas as no_bukti,a.no_dokumen,isnull(c.no_aju,'-') as no_aju,isnull(e.nama,'-') as nama_pp,date_format(a.tanggal,'%d/%m/%Y') as tgl,
//             a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.periode, a.modul, case when a.dc='D' then a.nilai else 0 end as debet, case when a.dc='C' then (case when (isnull(c.no_aju,'-') <> '-' and isnull(j.jum,0) > 1) then c.nilai else a.nilai end) else 0 end as kredit 
//             from kas_j a 
//             inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
//             left join ( select a.no_kas,a.kode_lokasi,a.no_aju,a.kode_pp,a.nilai 
//                         from it_aju_m a
//                         inner join it_ajuapp_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and d.jenis='ONLINE' and a.no_app=d.no_app
//                         )c on b.no_kas=c.no_kas and b.kode_lokasi=c.kode_lokasi 
// 			left join ( select a.no_kas,a.kode_lokasi,count(*) as jum
//                         from it_aju_m a
//                         inner join it_ajuapp_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and d.jenis='ONLINE' and a.no_app=d.no_app
// 						group by a.no_kas,a.kode_lokasi
//                         )j on b.no_kas=j.no_kas and b.kode_lokasi=j.kode_lokasi 
//             left join pp e on c.kode_pp=e.kode_pp and c.kode_lokasi=e.kode_lokasi
// where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)=substring('$periode',1,4) and a.kode_akun='$row->kode_akun'  $this->filter $sort  ";
			
// echo $sql;
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			$first = true;$tmp="";
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$beda = $tmp!=$row1->tgl; 
				if ($tmp!=$row1->tgl)
				{
					$tmp=$row1->tgl;
					$first = true;
					
					if ($i>1)
					{
						$debet=0;$kredit=0;$i=1;
						echo "<tr>
		<td height='25' colspan='8' align='right'  class='header_laporan'>Sub Total</td>
		<td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
		<td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
		<td class='header_laporan' class='header_laporan' align='right'>$nsaldo</td>
	  </tr>";
					}
					
				}
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$ndebet=number_format($debet,0,',','.');
				$nkredit=number_format($kredit,0,',','.');
				$nsaldo=number_format($saldo,0,',','.');
				echo "<tr> <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td><td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
	<td valign='top' class='isi_laporan'>".$row1->no_aju."</td>
	<td valign='top' class='isi_laporan'>".$row1->no_app."</td>
	<td valign='top' class='isi_laporan'>".$row1->nama_pp."</td>
   <td valign='top' class='isi_laporan'>".$row1->modul."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				$first = true;
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='8' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			$i=$i+1;
		}
		echo "</center>";
		return "";
	}
	
}
?>
