<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ypt_rptSerahDokFisikDet extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$periode=$tmp[0];
		$jenis=$tmp[1];

        switch($jenis){
            case 'aju': 
                $sql="select a.no_aju,a.keterangan,a.modul,e.no_bukti,isnull(e.no_bukti,'-') as no_serah,isnull(g.no_app,'-') as no_terima,a.no_kas,convert(varchar,k.tanggal,103) as tgl_kas
                    from it_aju_m a 
                    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                    inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app and a.no_aju=f.no_aju
                    left join it_aju_fisik e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi 
                    left join it_dok_app g on a.no_aju=g.no_aju and a.kode_lokasi=g.kode_lokasi 
					left join kas_m k on a.no_kas=k.no_kas and a.kode_lokasi=k.kode_lokasi
                    $this->filter and a.periode <='$periode' and a.progress in ('3','4') 
                    ";
                break;
            case 'sisa': 
                $sql = "select a.no_aju,a.keterangan,a.modul,e.no_bukti,isnull(e.no_bukti,'-') as no_serah,isnull(g.no_app,'-') as no_terima,a.no_kas,convert(varchar,k.tanggal,103) as tgl_kas
                from it_aju_m a 
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app and a.no_aju=f.no_aju
                left join it_aju_fisik e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi 
                left join it_dok_app g on a.no_aju=g.no_aju and a.kode_lokasi=g.kode_lokasi 
				left join kas_m k on a.no_kas=k.no_kas and a.kode_lokasi=k.kode_lokasi
                $this->filter and a.periode <='$periode' and a.progress in ('3','4') and e.no_aju is null 
                   ";
                break;
            case 'serah': 
                $sql = "select a.no_aju,a.keterangan,a.modul,e.no_bukti as no_serah,isnull(g.no_app,'-') as no_terima,a.no_kas,convert(varchar,k.tanggal,103) as tgl_kas
                    from it_aju_m a 
                    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                    inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app and a.no_aju=f.no_aju
                    inner join it_aju_fisik e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi 
                    left join it_dok_app g on a.no_aju=g.no_aju and a.kode_lokasi=g.kode_lokasi 
					left join kas_m k on a.no_kas=k.no_kas and a.kode_lokasi=k.kode_lokasi
                    $this->filter and a.periode <='$periode' and a.progress in ('3','4') 
               ";
                break;
            case 'belum': 
                $sql ="
                     select a.no_aju,a.keterangan,a.modul,isnull(g.no_bukti,'-') as no_serah, isnull(e.no_app,'-') as no_terima,a.no_kas,convert(varchar,k.tanggal,103) as tgl_kas
                     from it_aju_m a 
                     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                     inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app and a.no_aju=f.no_aju
                     inner join it_dok_app e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi
					 inner join it_aju_fisik g on a.no_aju=g.no_aju and a.kode_lokasi=g.kode_lokasi 
					 left join kas_m k on a.no_kas=k.no_kas and a.kode_lokasi=k.kode_lokasi
                     $this->filter and a.periode <='$periode' and a.progress in ('3','4') 
                     ";
                break;
        }
        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Data Pengajuan",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='710' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='80' align='center' class='header_laporan'>No Agenda</td>
		<td width='200' align='center' class='header_laporan'>Keterangan</td>
		<td width='80' align='center' class='header_laporan'>Modal</td>
		<td width='80' align='center' class='header_laporan'>No Penyerahan</td>
		<td width='80' align='center' class='header_laporan'>Bukti Terima</td>
		<td width='80' align='center' class='header_laporan'>No Kas</td>
		<td width='80' align='center' class='header_laporan'>Tgl Kas</td>
   </tr>";
		$aju=0; $serah=0; $belum=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$aju+=$row->aju;
			$serah+=$row->serah;
			$belum+=$row->belum;

			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_aju</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->modul</td>
			<td class='isi_laporan'>$row->no_serah</td>
			<td class='isi_laporan'>$row->no_terima</td>
			<td class='isi_laporan'>$row->no_kas</td>
			<td class='isi_laporan'>$row->tgl_kas</td>
            </tr>";	 
			$i=$i+1;
		}
        echo"
			</table>
		</div>";
		echo"</table>";

		return "";
	}
	
}
?>
  
  
