<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptSpbFormDaftar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
// 		$sql="select a.no_app,a.kode_lokasi,a.periode,a.tanggal,a.kode_lokasi,f.kota,a.no_bukti as noapp,
//        a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_fiat,e.nama as nama_fiat,
// 	   date_format(a.tanggal,'%d/%m/%Y') as tgl,
// 	   h.no_rek,h.nama_rek,h.bank,h.cabang,
	   
// 	   --case when g.keterangan is null then i.keterangan else g.keterangan end as keterangan,
// 	   --case when g.nilai is null then i.nilai else g.nilai end as nilai
	   
// 	   case when a.modul = 'IFREIM' then g.keterangan
// 	        when a.modul = 'IFAJU' then i.keterangan
// 			when substring(a.modul,1,2) = 'PB' then j.keterangan 
// 			when a.modul = 'PJAJU' then k.keterangan 
// 			when a.modul = 'SPPD' then p.tujuan 
// 			end as keterangan,
			
// 		case when a.modul = 'IFREIM' then g.nilai
// 	        when a.modul = 'IFAJU' then i.nilai
// 			when substring(a.modul,1,2) = 'PB' then j.nilai 
// 			when a.modul= 'PJAJU' then k.nilai 
// 			when a.modul= 'SPPD' then n.nilai 
// 			end as nilai
	   
	   
// from spm_app_m a
// inner join lokasi f on a.kode_lokasi=f.kode_lokasi
// left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
// left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
// left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi
// left join spm_ifreim_m g on a.no_bukti=g.no_reim and a.kode_lokasi=g.kode_lokasi
// left join spm_if_m i on a.no_bukti=i.no_if and a.kode_lokasi=i.kode_lokasi
// left join yk_pb_m j on a.no_bukti=j.no_pb and a.kode_lokasi=j.kode_lokasi
// left join panjar2_m k on a.no_bukti=k.no_panjar and a.kode_lokasi=k.kode_lokasi
// left join pd_spj_m l on a.no_app=l.no_ver and a.kode_lokasi=l.kode_lokasi
// left join spm_rek n on l.no_spj=n.no_bukti and l.kode_lokasi=n.kode_lokasi
// left join pd_aju_nik o on o.no_spj=l.no_spj and l.kode_lokasi=o.kode_lokasi
// left join pd_aju_m p on o.no_aju=p.no_aju and p.kode_lokasi=o.kode_lokasi

// inner join spm_rek h on a.no_bukti=h.no_bukti and a.kode_lokasi=h.kode_lokasi $this->filter ";
		// $start = (($this->page-1) * $this->rows);

		$sql="select a.no_ver,a.tanggal as due_date,a.no_if as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'IFAJU' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app3,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,isnull(h.no_rek,'-') as no_rek,isnull(h.nama_rek,'-') as nama_rek,isnull(h.bank,'-') as bank,isnull(h.cabang,'-') as cabang
		from spm_if_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
										inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
										left join spm_rek h on a.no_if=h.no_bukti and a.kode_lokasi=h.kode_lokasi
		$this->filter and  a.progress='3'  					 
		union all 

		select a.no_ver,a.tanggal as due_date,a.no_reim as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app3,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,isnull(h.no_rek,'-') as no_rek,isnull(h.nama_rek,'-') as nama_rek,isnull(h.bank,'-') as nama_rek,isnull(h.cabang,'-') as cabang
		from spm_ifreim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
												inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
												left join spm_rek h on a.no_reim=h.no_bukti and a.kode_lokasi=h.kode_lokasi
		$this->filter and  a.progress='3'  							 					 
		union all 

		select a.no_ver,a.due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app3,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,isnull(h.no_rek,'-') as no_rek,isnull(h.nama_rek,'-') as nama_rek,isnull(h.bank,'-') as nama_rek,isnull(h.cabang,'-') as cabang
		from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
									 inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi 
									 left join spm_rek h on a.no_pb=h.no_bukti and a.kode_lokasi=h.kode_lokasi
		$this->filter and  a.progress='3'  					 
		union all 

		select a.no_ver,a.due_date,a.no_panjar as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app3,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp,isnull(h.no_rek,'-') as no_rek,isnull(h.nama_rek,'-') as nama_rek,isnull(h.bank,'-') as nama_rek,isnull(h.cabang,'-') as cabang
		from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
										 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
										 left join spm_rek h on a.no_panjar=h.no_bukti and a.kode_lokasi=h.kode_lokasi
		$this->filter and  a.progress='3'   					 
		union all 

		select a.no_ver,a.tanggal as due_date,a.no_ptg as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app3,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp ,isnull(h.no_rek,'-') as no_rek,isnull(h.nama_rek,'-') as nama_rek,isnull(h.bank,'-') as nama_rek,isnull(h.cabang,'-') as cabang
		from panjarptg2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
										 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
										 left join spm_rek h on a.no_ptg=h.no_bukti and a.kode_lokasi=h.kode_lokasi
		$this->filter and  a.progress='3'  
		union all 

		select a.no_ver,aa.tanggal as due_date,a.no_spj as no_bukti,'INPROG' as status,convert(varchar,aa.tanggal,103) as tgl,convert(varchar,aa.tanggal,103) as tgl2,'SPPD' as modul,aa.kode_pp+' - '+b.nama as pp,a.no_dokumen,aa.tujuan as keterangan,dd.nilai,c.nik+' - '+c.nama as pembuat,a.no_app3,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,aa.kode_pp,isnull(h.no_rek,'-') as no_rek,isnull(h.nama_rek,'-') as nama_rek,isnull(h.bank,'-') as nama_rek,isnull(h.cabang,'-') as cabang
		from pd_spj_m a inner join pd_aju_m aa on a.no_aju=aa.no_aju and a.kode_lokasi=aa.kode_lokasi 
						  inner join pp b on aa.kode_pp=b.kode_pp and aa.kode_lokasi=b.kode_lokasi 
						  inner join ( 
								select no_spj,sum(total) as nilai 
								from pd_spj_d 
								where kode_lokasi='this.app._lokasi+' group by no_spj 
		 				 ) dd on a.no_spj=dd.no_spj 
										inner join karyawan c on aa.nik_buat=c.nik and aa.kode_lokasi=c.kode_lokasi 
										left join spm_rek h on a.no_spj=h.no_bukti and a.kode_lokasi=h.kode_lokasi
		$this->filter and  a.progress='3'  
		order by a.no_ver desc ";

		

		
		$rs=$dbLib->execute($sql);
    $AddOnLib=new server_util_AddOnLib();	
    
		$i=1;
		$logo="image/spm_new.png";
		$logo2="image/ypt.jpeg";
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar Surat Perintah Bayar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
	
			
		echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
              <tr bgcolor='#CCCCCC'>
								<th width='120' class='header_laporan'>No SPB</th>
								<th width='120' class='header_laporan'>No Bukti</th>
                <th width='120' class='header_laporan'>PP</th>
                <th width='90' class='header_laporan'>Nilai</th>
                <th width='120' class='header_laporan'>Untuk Pembayaran</th>
                <th width='130' class='header_laporan'>Nama Rekening</th>
                <th width='100' class='header_laporan'>Nomor Rekening</th>
                <th width='90' class='header_laporan'>Bank</th>
                <th width='90' class='header_laporan'>Cabang</th>
							</tr>";
							$total=0;
          while ($row = $rs->FetchNextObject($toupper=false))
              {
								$total=$total+$row->nilai;
          echo"
              <tr>
                <td class='isi_laporan'>$row->no_ver</td>
								<td class='isi_laporan'>$row->no_bukti</td>
								<td class='isi_laporan'>$row->pp</td>
                <td class='isi_laporan'>".number_format($row->nilai,0,",",".")."</td>
                <td class='isi_laporan'>$row->keterangan</td>
                <td class='isi_laporan'>$row->nama_rek</td>
                <td class='isi_laporan'>$row->no_rek</td>
                <td class='isi_laporan'>$row->bank</td>
                <td class='isi_laporan'>$row->cabang</td>
              </tr>
					";
								
							}
					echo"
              <tr>
                <td class='isi_laporan' colspan='3'>Total</td>
								<td class='isi_laporan'>".number_format($total,0,",",".")."</td>
							</tr>";

					echo"
					<tr>
					<td height='30' colspan='9' style='border-right:1px solid white;border-left:1px solid white'>&nbsp;</td>
					</tr>
					<tr>
					<td colspan='9' style='border:1px solid white'>
					<table width='100%' border='0' cellspacing='0' cellpadding='0' class='kotak'>
							<tr>
								<td width='100' class='header_laporan'>Jakarta, ...................</td>
								<td width='150' align='center'>&nbsp; </td>
								<td width='100'>&nbsp;</td>
								<td width='150' align='center'>&nbsp; </td>
								<td width='100' align='center'>&nbsp; </td>
								<td class='header_laporan' >Mengetahui</td>
						</tr>
						<tr>
								<td width='100' class='header_laporan'>VP FINANCE & ACCOUNTING</td>
								<td width='150' align='center'>&nbsp; </td>
								<td width='100'>&nbsp;</td>
								<td width='150' align='center'>&nbsp; </td>
								<td width='100' align='center'>&nbsp; </td>
								<td class='header_laporan' >Direktur Utama</td>
						</tr>
							<tr>
							<td height='80'>&nbsp;</td>
							<td>&nbsp;</td>
							<td width='10'>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							</tr>
							<tr>
							<td width='200' class='header_laporan'>&nbsp;<u>Sudarmo</u></td>
								<td>&nbsp;</td>
								<td width='10'>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td width='200' class='header_laporan' ><u>Lementina Manurung</u></td>
							</tr>
						</table>
					</td>
					</tr>
		</table><br>
		";
			$i=$i+1;
		
		echo "</div>";
		return "";
		
	}
	
}
?>
