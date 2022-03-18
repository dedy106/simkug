<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptRekapPDD extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$jenis=$tmp[1];
		$filter3 = $tmp[2];
		$return = $tmp[3];

		if($return == "Ya"){
			$filter_return = " and isnull(e.no_kastitip,'-') <> '-' ";
		}else if($return == "Tidak"){
			$filter_return = " and isnull(e.no_kastitip,'-') = '-' ";
		}else{
			$filter_return = "";
		}

		$tf = $tmp[4];

		if($tf == "Ya"){
			$filter_tf = " and isnull(f.no_ulang,'-') <> '-' ";
		}else if($tf == "Tidak"){
			$filter_tf = " and isnull(f.no_ulang,'-') = '-' ";
		}else{
			$filter_tf = "";
		}

		$nama_file="beban_".$periode.".xls";
		$sql="select a.no_aju,a.periode,a.tanggal,a.keterangan,b.nim,c.nama,
        b.nilai,b.bank,b.no_rek,b.nama_rek,a.no_ref1 as modul,b.tahunaka,a.no_kas,isnull(convert(varchar,d.tanggal,103),'-') as tgl_kas,isnull(e.no_kastitip,'-') as no_return,isnull(e.nilai,0) as nilai_return,isnull(f.no_ulang,'-') as no_ulang,isnull(e.ket_return,'-') as ket_return  
        from it_aju_m a 
        inner join aka_cd_d b on a.no_aju=b.no_bukti and a.kode_lokasi=b.kode_lokasi
        inner join ( select a.nim,a.nama,a.kode_lokasi
                     from aka_mahasiswa a
                     union all
                     select a.no_tes,a.nama,a.kode_lokasi
                     from aka_maba a
                    ) c on b.nim=c.nim and b.kode_lokasi=c.kode_lokasi
		left join kas_m d on a.no_kas=d.no_kas and a.kode_lokasi=d.kode_lokasi
		left join (select a.no_aju,a.no_rek,a.kode_lokasi,a.no_kastitip,b.keterangan as ket_return,sum(nilai_balik) as nilai
					from it_aju_rek a
					inner join kas_m b on a.no_kastitip=b.no_kas and a.kode_lokasi=b.kode_lokasi
					group by a.no_aju,a.no_rek,a.kode_lokasi,a.no_kastitip,b.keterangan) e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi and b.no_rek=e.no_rek
		left join (select a.no_kas as no_kastitip,a.kode_lokasi,b.no_kas as no_ulang
					from kas_titip_d a
					inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
					) f on e.no_kastitip = f.no_kastitip and e.kode_lokasi=f.kode_lokasi
        $this->filter  $filter_return  $filter_tf and a.form in ('PDDOUT','PDDOUTAJU') and a.kode_lokasi='11'
        ";

        // echo $sql;
		
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
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pertanggungan beban",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1660'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='80'  align='center' class='header_laporan'>No Bukti</td>
            <td width='60'  align='center' class='header_laporan'>Periode</td>
            <td width='60'  align='center' class='header_laporan'>Tanggal</td>
            <td width='200'  align='center' class='header_laporan'>Keterangan</td>
            <td width='60'  align='center' class='header_laporan'>NIM</td>
            <td width='100'  align='center' class='header_laporan'>Nama</td>
            <td width='90'  align='center' class='header_laporan'>Nilai</td> 
            <td width='60'  align='center' class='header_laporan'>Bank</td>
            <td width='90'  align='center' class='header_laporan'>No Rek</td>
            <td width='100'  align='center' class='header_laporan'>Nama Rek</td>
            <td width='60'  align='center' class='header_laporan'>Modul</td>
            <td width='60'  align='center' class='header_laporan'>Tahun Akademik</td>
            <td width='60'  align='center' class='header_laporan'>No Pembayaran</td>
            <td width='60'  align='center' class='header_laporan'>Tgl Pembayaran</td>
            <td width='60'  align='center' class='header_laporan'>No Return</td>
            <td width='90'  align='center' class='header_laporan'>Nilai Return</td>
            <td width='200'  align='center' class='header_laporan'>Keterangan Return</td>
            <td width='90'  align='center' class='header_laporan'>No Transfer Ulang</td>
	  </tr>  ";
		$nilai=0;$nilai_return=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_return+=$row->nilai_return;
		echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_aju</td>
            <td class='isi_laporan'>$row->periode</td>
            <td class='isi_laporan'>$row->tanggal</td>
            <td class='isi_laporan'>$row->keterangan</td>
            <td class='isi_laporan'>$row->nim</td>
            <td class='isi_laporan'>$row->nama</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
            <td class='isi_laporan'>$row->bank</td>
            <td class='isi_laporan'>$row->no_rek</td>
            <td class='isi_laporan'>$row->nama_rek</td>
            <td class='isi_laporan'>$row->modul</td>
            <td class='isi_laporan'>$row->tahunaka</td>
            <td class='isi_laporan'>$row->no_kas</td>
            <td class='isi_laporan'>$row->tgl_kas</td>
            <td class='isi_laporan'>$row->no_return</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai_return,0,",",".")."</td>
            <td class='isi_laporan'>$row->ket_return</td>
            <td class='isi_laporan'>$row->no_ulang</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='7'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='8'>&nbsp;</td>
	  <td class='header_laporan' align='right'>".number_format($nilai_return,0,",",".")."</td>
	  <td class='header_laporan' align='center'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
