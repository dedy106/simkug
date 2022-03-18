<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptPDDTrackCamaba extends server_report_basic
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
		$nik_user=$tmp[2];

		$sql="select a.kode_lokasi,b.kode_akun,c.nama as nama_akun,a.no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_pp,'-' as kode_drk,a.modul,isnull(b.debet,0) as debet,isnull(b.kredit,0) as kredit,a.periode
        from trans_m a
		left join (select a.no_bukti,a.kode_lokasi 
					from gldt a
					group by a.no_bukti,a.kode_lokasi
					union all
					select a.no_bukti,a.kode_lokasi 
					from gldt_h a
					group by a.no_bukti,a.kode_lokasi
					) d on a.no_dokumen=d.no_bukti and a.kode_lokasi=d.kode_lokasi
        inner join (select a.no_bukti,a.kode_akun,a.kode_lokasi,sum(case when a.dc = 'C' then a.nilai else 0 end) as debet, 
                    sum(case when a.dc = 'D' then a.nilai else 0 end) as kredit
                    from aka_cd_d a
					where a.kode_akun='2141104'
                    group by a.no_bukti,a.kode_akun,a.kode_lokasi
                )b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
        inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
        $this->filter
		order by a.no_bukti
        ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Dokumen Vouching PDD Camaba",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1370'>
        <tr align='center' bgcolor='#CCCCCC'>
            <td width='20' class='header_laporan'>No</td>
            <td width='100' class='header_laporan'>No COA</td>
            <td width='200' class='header_laporan'>Nama Akun</td>
            <td width='120' class='header_laporan'>No Bukti</td>
            <td width='120' class='header_laporan'>No Dokumen</td>
            <td width='100' class='header_laporan'>Tanggal</td>
            <td width='250' class='header_laporan'>Keterangan</td>
            <td width='80' class='header_laporan'>Kode PP</td>
            <td width='80' class='header_laporan'>Kode DRK</td>
            <td width='100' class='header_laporan'>Modul</td>
            <td width='100' class='header_laporan'>Debet</td>
            <td width='100' class='header_laporan'>Kredit</td>
        </tr>";
		$debet=0;$kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{ 
			$debet+=$row->debet; 
			$kredit+=$row->kredit; 
			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->kode_akun</td>
            <td class='isi_laporan'>$row->nama_akun</td>
            <td class='isi_laporan'>$row->no_bukti</td>
			<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row->no_dokumen','$row->kode_lokasi','$row->periode');\">$row->no_dokumen</a></td>
            <td class='isi_laporan'>$row->tanggal</td>
            <td class='isi_laporan'>$row->keterangan</td>
            <td class='isi_laporan'>$row->kode_pp</td>
            <td class='isi_laporan'>$row->kode_drk</td>
            <td class='isi_laporan'>$row->modul</td>
			<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->no_bukti','$row->kode_lokasi','C');\">".number_format($row->debet,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->no_bukti','$row->kode_lokasi','D');\">".number_format($row->kredit,0,",",".")."</a></td>
            </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
        <th class='isi_laporan' align='center' colspan='10'>Total</th>
        <th class='isi_laporan' align='right'>".number_format($debet,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($kredit,0,",",".")."</th>
        </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>