<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptKerja
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(*) ".
			"from karyawan k ".$this->filter;
		//error_log("testing");
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		return $totPage;
	}
	function getKaryawan()
	{
		return "select k.nik,k.kode_lokasi,k.kode_pp,k.kode_loker,l.nama as nmlkr,k.nama,k.alamat,k.jabatan,k.no_telp,k.email,k.npwp,k.agama,k.tempat_lahir, ".
				"date_format(k.tgl_lahir,'%d/%m/%Y') as tgllhr,date_format(k.tgl_masuk,'%d/%m/%Y') as tglmsk,k.status,k.id_lainnya,k.grade, ".
				"k.golongan_darah,k.kota,k.propinsi,k.kode_pos,k.no_ponsel,k.suku,k.asal_lamaran,k.sex,p.jurusan, ".
				"date_format(d2.tgl_berlaku,'%d/%m/%Y') as tglawl,g.band,g.kelas,date_format(g.tgl_awal,'%d/%m/%Y') as tglawl2, ".
				"date_format(d.tgl_berlaku,'%d/%m/%Y') as tglawl3,g2.gaji_dasar,date_format(g2.tgl_awal,'%d/%m/%Y') as tglawl4, ".
				"l.alamat as almtlkr,l.kota as kotalkr,l.propinsi as provlkr,l.kode_pos as kplkr,l.telephone as tlp,k.foto ".
				"from karyawan k left outer join hr_loker l on k.kode_loker=l.kode_loker and k.kode_lokasi=l.kode_lokasi ".				
				"left outer join hr_pendidikan p on k.nik=p.nik and p.tgl_selesai=(select max(tgl_selesai) from hr_pendidikan) ".
				"left outer join hr_dinas d2 on k.nik=d2.nik and d2.tgl_berlaku=(select min(tgl_berlaku) from hr_dinas where status=(select distinct status from hr_dinas where tgl_berlaku=(select max(tgl_berlaku) from hr_dinas))) ".
                "left outer join hr_gajidasar g on k.nik=g.nik and g.tgl_awal=(select min(tgl_awal) from hr_gajidasar where band=(select max(band) from hr_gajidasar) and kelas=(select max(kelas) from hr_gajidasar)) ".
                "left outer join hr_gajidasar g2 on k.nik=g2.nik and g2.tgl_awal=(select min(tgl_awal) from hr_gajidasar where gaji_dasar=(select max(gaji_dasar) from hr_gajidasar)) ".
                "left outer join hr_dinas d on k.nik=d.nik and d.tgl_berlaku=(select max(tgl_berlaku) from hr_dinas) ".$this->filter;
	}
	function getGadas($nik)
	{
		return "select date_format(tgl_awal,'%d/%m/%Y') as tglawal,date_format(tgl_akhir,'%d/%m/%Y') as tglakhir,gaji_dasar,tunjangan,band,kelas ".
				"from hr_gajidasar where nik='".$nik.
				"' order by tgl_akhir desc";
	}
	function getKeluarga($nik,$status)
	{
		switch ($status)
		{
			case "ortu":
				return "select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Ayah','Ibu')";
			break;		
			case "mertua":
				return "select nama,status_family,status,alamat,kota,kodepos,provinsi,no_telp ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Ayah Mertua','Ibu Mertua')";
			break;
			case "pasangan":
				return "select nama,tempat_lahir,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,date_format(tgl_nikah,'%d/%m/%Y') as tglnkh, ".
					"status_kerja,institusi,nik2 ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Suami','Istri')";
			break;
			case "anak":
				return "select nama,status,sex,tempat_lahir,date_format(tgl_lahir,'%d/%m/%Y') as tgllhr,status_tanggungan,status_anak ".
					"from hr_keluarga where nik='".$nik.
					"' and status_family in ('Anak')";	
			break;
		}		
	}
	function getDinas($nik)
	{
		return "select date_format(h.tgl_berlaku,'%d/%m/%Y') as tgl,h.loker,h.status,h.grade,l.nama,h.jabatan, ".
				"date_format(h.tgl_sk,'%d/%m/%Y') as tglsk,h.no_sk,h.keterangan ".
				"from hr_dinas h inner join hr_loker l on h.loker=l.kode_loker where nik='".$nik.
				"' order by tgl_berlaku";
	}
	function getStatus($nik)
	{
		return "select date_format(h.tgl_awal,'%d/%m/%Y') as tglawal,date_format(h.tgl_akhir,'%d/%m/%Y') as tglakhir,h.status,h.no_sk,date_format(h.tgl_sk,'%d/%m/%Y') as tglsk ".
				"from hr_status h where nik='".$nik.
				"' order by h.tgl_awal";
	}
	function getPendidikan($nik)
	{
		return "select h.institusi,h.jurusan,h.gelar,date_format(h.tgl_selesai,'%d/%m/%Y') as tglend,h.biaya ".
				"from hr_pendidikan h where h.nik='".$nik.
				"' order by h.tgl_selesai";
	}
	function getPelatihan($nik)
	{
		return "select h.pelatihan,h.penyelenggara,date_format(h.tgl_mulai,'%d/%m/%Y') as tglstart,date_format(h.tgl_selesai,'%d/%m/%Y') as tglend,h.angkatan,h.peringkat ".
				"from hr_pelatihan h where h.nik='".$nik.
				"' order by h.tgl_mulai";
	}
	function getSKI($nik)
	{
		return "select h.tahun,h.avg,h.nilai_ski,h.kompentensi,h.keterangan ".
				"from hr_ski h where h.nik='".$nik.
				"' order by h.tahun";
	}
	function getPenghargaan($nik)
	{
		return "select h.penghargaan,date_format(h.tgl_berlaku,'%d/%m/%Y') as tgl,h.uang_penyerta,h.no_sk,date_format(h.tgl_sk,'%d/%m/%Y') as tglsk,h.nik_ttd ".
				"from hr_penghargaan h where h.nik='".$nik.
				"' order by h.tgl_berlaku";
	}
	function getFasilitas($nik)
	{
		return "select h.jenis,h.jumlah,date_format(h.tgl_mulai,'%d/%m/%Y') as tglawal,date_format(h.tgl_akhir,'%d/%m/%Y') as tglakhir ".
				"from hr_fasilitas h where h.nik='".$nik.
				"' order by h.tgl_mulai";
	}
	function getCuti($nik)
	{
		return "select h.jenis,date_format(h.tgl_mulai,'%d/%m/%Y') as tglawal,date_format(h.tgl_selesai,'%d/%m/%Y') as tglakhir,h.jumlah ".
				"from hr_cuti h where h.nik='".$nik.
				"' order by h.tgl_mulai";
	}
	function getHtml()
	{//error_log("gethtml");
		global $dbLib;
		$getkar=$dbLib->execute($this->getKaryawan());	
		$krywn = $getkar->FetchNextObject($toupper=false);
		$getpas=$dbLib->execute($this->getKeluarga($krywn->nik,"pasangan"));
		$cekmrd=$getpas->FetchNextObject($toupper=false);
		if ($cekmrd->nama!="")
			{$status="MENIKAH";}
		else
			{$status="BELUM MENIKAH";}

		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html= "<br>";
		$html.= "<div align='center'>
				  <table width='800' border='0' cellspacing='1' cellpadding='1'>
				    <tr>
				      <td colspan='4' class='nstyle15'>.:: Data Riwayat Pekerjaan ::. </td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr valign='top'>
				      <td width='21%' class='nstyle16'>".strtoupper($krywn->nama)."</td>
				      <td width='14%'>&nbsp;</td>
				      <td width='47%'>&nbsp;</td>
				      <td width='18%' class='nstyle16'>".strtoupper($krywn->sex).", ".strtoupper($status)." <br>
				      ".strtoupper($krywn->agama)." <br>
				      ".strtoupper($krywn->tempat_lahir).", ";
					if (substr($krywn->tgllhr,0,1)!='0'){$html.=substr($krywn->tgllhr,0,2);}else{$html.=substr($krywn->tgllhr,1,1);}$html.=" ".namaBulan(substr($krywn->tgllhr,3,2))." ".substr($krywn->tgllhr,6)." </td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td class='istyle16'>NIK : ".strtoupper($krywn->nik)." </td>
				      <td>&nbsp;</td>
				      <td>&nbsp;</td>
				      <td>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='3'><table width='100%' border='0' cellspacing='6' cellpadding='0'>
				        <tr class='istyle15'>
				          <td width='22%'>Lokasi Kerja </td>
				          <td width='4%'>&nbsp;</td>
				          <td width='74%'>".strtoupper($krywn->nmlkr)."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>Tanggal Masuk </td>
				          <td>&nbsp;</td>
				          <td>".$krywn->tglmsk."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>Pendidikan Tertinggi </td>
				          <td>&nbsp;</td>
				          <td>".$krywn->jurusan."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>Stream</td>
				          <td>&nbsp;</td>
				          <td>-</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>Lokasi Gaji </td>
				          <td>&nbsp;</td>
				          <td>-</td>
				        </tr>
				      </table></td>
				      <td><img src='server/media/".$krywn->foto."' width='120' height='160' /></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Posisi Sekarang </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='23%'>&nbsp;&nbsp;&nbsp;&nbsp;DATA</td>
				          <td width='44%'>Saat Ini </td>
				          <td width='33%'>Sejak Tanggal </td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;STATUS</td>
				          <td>".$krywn->status." </td>
				          <td>".$krywn->tglawl."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;BAND POSISI</td>
				          <td>".$krywn->grade."</td>
				          <td>".$krywn->tglawl2."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;LOKER</td>
				          <td>".strtoupper($krywn->nmlkr)."</td>
				          <td>".$krywn->tglawl3."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;JABATAN</td>
				          <td>".strtoupper($krywn->jabatan)."</td>
				          <td>".$krywn->tglawl3."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;GADAS</td>
				          <td>Rp ".number_format($krywn->gaji_dasar,0,",",".")."</td>
				          <td>".$krywn->tglawl4."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;NPWP</td>
				          <td>".$krywn->npwp."</td>
				          <td>&nbsp;</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat Basic Pay</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='15%'>&nbsp;&nbsp;&nbsp;&nbsp;Awal Berlaku </td>
				          <td width='15%'>Akhir Berlaku </td>
				          <td width='20%'>Gaji Dasar </td>
				          <td width='20%'>Tunjangan Dasar </td>
				          <td width='14%'>Band</td>
				          <td width='16%'>Kelas</td>
				        </tr>";
			$getgadas=$dbLib->execute($this->getGadas($krywn->nik));
			while ($gadas = $getgadas->FetchNextObject($toupper=false))
			{
				$html.= "<tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$gadas->tglawal."</td>
				          <td>".$gadas->tglakhir."</td>
				          <td>Rp ".number_format($gadas->gaji_dasar,0,",",".")."</td>
				          <td>Rp ".number_format($gadas->tunjangan,0,",",".")."</td>
				          <td>".$gadas->band."</td>
				          <td>".$gadas->kelas."</td>
				        </tr>";
			}	
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Orang Tua </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='7%'>&nbsp;&nbsp;&nbsp;&nbsp;Orang<br>
				            &nbsp;&nbsp;&nbsp;&nbsp;Tua </td>
				          <td width='15%'>Nama</td>
				          <td width='8%'>Status</td>
				          <td width='31%'>Alamat</td>
				          <td width='9%'>Kota</td>
				          <td width='7%'>Kode Pos</td>
				          <td width='12%'>Provinsi</td>
				          <td width='11%'>Telepon</td>
				        </tr>";
			$getortu=$dbLib->execute($this->getKeluarga($krywn->nik,"ortu"));
			while ($ortu = $getortu->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$ortu->status_family."</td>
				          <td>".$ortu->nama."</td>
				          <td>".$ortu->status."</td>
				          <td>".$ortu->alamat."</td>
				          <td>".$ortu->kota."</td>
				          <td>".$ortu->kodepos."</td>
				          <td>".$ortu->provinsi."</td>
				          <td>".$ortu->no_telp."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Pasangan</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='28%'>&nbsp;&nbsp;&nbsp;&nbsp;Nama</td>
				          <td width='11%'>Tempat Lahir </td>
				          <td width='10%'>Tgl Lahir </td>
				          <td width='10%'>Tgl Nikah </td>
				          <td width='9%'>Status Pekerjaan </td>
				          <td width='23%'>Institusi</td>
				          <td width='9%'>NIK</td>
				          </tr>";
			$getpas2=$dbLib->execute($this->getKeluarga($krywn->nik,"pasangan"));
			while ($pas = $getpas2->FetchNextObject($toupper=false))
			{			
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$pas->nama."</td>
				          <td>".$pas->tempat_lahir."</td>
				          <td>".$pas->tgllhr."</td>
				          <td>".$pas->tglnkh."</td>
				          <td>".$pas->status_kerja."</td>
				          <td>".$pas->institusi."</td>
				          <td>".$pas->nik2."</td>
				          </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Mertua</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='7%'>&nbsp;&nbsp;&nbsp;&nbsp;Mertua</td>
				          <td width='15%'>Nama</td>
				          <td width='8%'>Status</td>
				          <td width='31%'>Alamat</td>
				          <td width='9%'>Kota</td>
				          <td width='7%'>Kode Pos</td>
				          <td width='12%'>Provinsi</td>
				          <td width='11%'>Telepon</td>
				        </tr>";
			$getmertua=$dbLib->execute($this->getKeluarga($krywn->nik,"mertua"));
			while ($mertua = $getmertua->FetchNextObject($toupper=false))
			{
				list($tmp1,$tmp2)=split(" ",$mertua->status_family);
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$tmp1."<br>&nbsp;&nbsp;&nbsp;&nbsp;".$tmp2."</td>
				          <td>".$mertua->nama."</td>
				          <td>".$mertua->status."</td>
				          <td>".$mertua->alamat."</td>
				          <td>".$mertua->kota."</td>
				          <td>".$mertua->kodepos."</td>
				          <td>".$mertua->provinsi."</td>
				          <td>".$mertua->no_telp."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Anak</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='30%'>&nbsp;&nbsp;&nbsp;&nbsp;Nama</td>
				          <td width='12%'>Status Family </td>
				          <td width='15%'>Jenis Kelamin </td>
				          <td width='10%'>Tgl Lahir </td>
				          <td width='20%'>Status Tanggungan </td>
				          <td width='13%'>Status Anak </td>
				          </tr>";
			$getanak=$dbLib->execute($this->getKeluarga($krywn->nik,"anak"));
			while ($anak = $getanak->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$anak->nama."</td>
				          <td>".$anak->status."</td>
				          <td>".$anak->sex."</td>
				          <td>".$anak->tgllhr."</td>
				          <td>".$anak->status_tanggungan."</td>
				          <td>".$anak->status_anak."</td>
				          </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat Kedinasan </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='10%'>&nbsp;&nbsp;&nbsp;&nbsp;Awal<br>&nbsp;&nbsp;&nbsp;&nbsp;Berlaku</td>
				          <td width='5%'>Divisi</td>
				          <td width='5%'>Status</td>
				          <td width='7%'>Grade</td>
				          <td width='11%'>Lokasi Kerja </td>
				          <td width='14%'>Jabatan</td>
				          <td width='10%'>Tgl SK </td>
				          <td width='20%'>No. SK </td>
				          <td width='18%'>Keterangan</td>
				        </tr>";
			$getdinas=$dbLib->execute($this->getDinas($krywn->nik));
			while ($dinas = $getdinas->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$dinas->tgl."</td>
				          <td>".$dinas->loker."</td>
				          <td>".$dinas->status."</td>
				          <td>".$dinas->grade."</td>
				          <td>".$dinas->nama."</td>
				          <td>".$dinas->jabatan."</td>
				          <td>".$dinas->tglsk."</td>
				          <td>".$dinas->no_sk."</td>
				          <td>".$dinas->keterangan."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat Status </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='14%'>&nbsp;&nbsp;&nbsp;&nbsp;Awal Berlaku </td>
				          <td width='14%'>Akhir Berlaku </td>
				          <td width='20%'>Status</td>
				          <td width='38%'>No. SK </td>
				          <td width='14%'>Tgl SK </td>
				          </tr>";
			$getstatus=$dbLib->execute($this->getStatus($krywn->nik));
			while ($status = $getstatus->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$status->tglawal."</td>
				          <td>".$status->tglakhir."</td>
				          <td>".$status->status."</td>
				          <td>".$status->no_sk."</td>
				          <td>".$status->tglsk."</td>
				          </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat Pendidikan</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='30%'>&nbsp;&nbsp;&nbsp;&nbsp;Nama Institusi </td>
				          <td width='29%'>Jurusan/Falkutas</td>
				          <td width='13%'>Gelar</td>
				          <td width='13%'>Tgl Selesai </td>
				          <td width='15%'>Biaya</td>
				        </tr>";
			$getpddkn=$dbLib->execute($this->getPendidikan($krywn->nik));
			while ($pddkn = $getpddkn->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$pddkn->institusi."</td>
				          <td>".$pddkn->jurusan."</td>
				          <td>".$pddkn->gelar."</td>
				          <td>".$pddkn->tglend."</td>
				          <td>".$pddkn->biaya."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat Pelatihan</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='29%'>&nbsp;&nbsp;&nbsp;&nbsp;Nama Pelatihan </td>
				          <td width='29%'>Penyelenggara</td>
				          <td width='10%'>Tgl Mulai </td>
				          <td width='10%'>Tgl Selesai </td>
				          <td width='11%'>Angkatan</td>
				          <td width='11%'>Peringkat</td>
				        </tr>";
			$getplthn=$dbLib->execute($this->getPelatihan($krywn->nik));
			while ($plthn = $getplthn->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$plthn->pelatihan."</td>
				          <td>".$plthn->penyelenggara."</td>
				          <td>".$plthn->tglstart."</td>
				          <td>".$plthn->tglend."</td>
				          <td>".$plthn->angkatan."</td>
				          <td>".$plthn->peringkat."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat DP3 - SKI </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='9%'>&nbsp;&nbsp;&nbsp;&nbsp;Tahun</td>
				          <td width='17%'>Rata-rata DP3 </td>
				          <td width='17%'>Nilai SKI </td>
				          <td width='22%'>Kompetensi</td>
				          <td width='35%'>Keterangan</td>
				        </tr>";
			$getski=$dbLib->execute($this->getSKI($krywn->nik));
			while ($ski = $getski->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$ski->tahun."</td>
				          <td>".$ski->avg."</td>
				          <td>".$ski->nilai_ski."</td>
				          <td>".$ski->kompentensi."</td>
				          <td>".$ski->keterangan."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat Penghargaan</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='26%'>&nbsp;&nbsp;&nbsp;&nbsp;Nama Penghargaan</td>
				          <td width='10%'>Tgl Berlaku </td>
				          <td width='15%'>Uang Penyerta </td>
				          <td width='25%'>No. SK </td>
				          <td width='10%'>Tgl SK </td>
				          <td width='14%'>NIK TTD </td>
				        </tr>";
			$getphrgn=$dbLib->execute($this->getPenghargaan($krywn->nik));
			while ($phrgn = $getphrgn->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$phrgn->penghargaan."</td>
				          <td>".$phrgn->tgl."</td>
				          <td>".number_format($phrgn->uang_penyerta,0,",",".")."</td>
				          <td>".$phrgn->no_sk."</td>
				          <td>".$phrgn->tglsk."</td>
				          <td>".$phrgn->nik_ttd."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Fasilitas</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='26%'>&nbsp;&nbsp;&nbsp;&nbsp;Jenis</td>
				          <td width='10%'>Jumlah</td>
				          <td width='10%'>Tgl Mulai</td>
				          <td width='10%'>Tgl Akhir </td>
				          </tr>";
			$getfas=$dbLib->execute($this->getFasilitas($krywn->nik));
			while ($fas = $getfas->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$fas->jenis."</td>
				          <td>Rp ".number_format($fas->jumlah,0,",",".")."</td>
				          <td>".$fas->tglawal."</td>
				          <td>".$fas->tglakhir."</td>
				          </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Riwayat Cuti </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='47%'>&nbsp;&nbsp;&nbsp;&nbsp;Jenis Cuti </td>
				          <td width='16%'>Tgl Mulai</td>
				          <td width='16%'>Tgl Akhir</td>
				          <td width='21%'>Jumlah Hari </td>
				        </tr>";
			$getcuti=$dbLib->execute($this->getCuti($krywn->nik));
			while ($cuti = $getcuti->FetchNextObject($toupper=false))
			{
				$html.="<tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$cuti->jenis."</td>
				          <td>".$cuti->tglawal."</td>
				          <td>".$cuti->tglakhir."</td>
				          <td>".$cuti->jumlah."</td>
				        </tr>";
			}
				$html.="</table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Alamat Kantor </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='49%'>&nbsp;&nbsp;&nbsp;&nbsp;Jalan</td>
				          <td width='10%'>Kota</td>
				          <td width='17%'>Provinsi</td>
				          <td width='11%'>Kode Pos </td>
				          <td width='13%'>Telepon</td>
				        </tr>
				        <tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$krywn->almtlkr."</td>
				          <td>".$krywn->kotalkr."</td>
				          <td>".$krywn->provlkr."</td>
				          <td>".$krywn->kplkr."</td>
				          <td>".$krywn->tlp."</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Alamat Rumah </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='49%'>&nbsp;&nbsp;&nbsp;&nbsp;Jalan</td>
				          <td width='10%'>Kota</td>
				          <td width='17%'>Provinsi</td>
				          <td width='11%'>Kode Pos </td>
				          <td width='13%'>Telepon</td>
				        </tr>
				        <tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;".$krywn->alamat."</td>
				          <td>".$krywn->kota."</td>
				          <td>".$krywn->propinsi."</td>
				          <td>".$krywn->kode_pos."</td>
				          <td>".$krywn->no_telp."</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='2' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr class='istyle18'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Informasi Lainnya </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='4'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle18'>
				          <td width='30%'>&nbsp;&nbsp;&nbsp;&nbsp;Data</td>
				          <td width='70%'>Keterangan</td>
				          </tr>
				        <tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;No. Ponsel </td>
				          <td>".$krywn->no_ponsel."</td>
				          </tr>
				        <tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Email</td>
				          <td>".$krywn->email."</td>
				          </tr>
				        <tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Asal Lamaran </td>
				          <td>".$krywn->asal_lamaran."</td>
				          </tr>
				        <tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Suku</td>
				          <td>".$krywn->suku."</td>
				          </tr>
				        <tr class='istyle15' valign='top'>
				          <td>&nbsp;&nbsp;&nbsp;&nbsp;Golongan Darah </td>
				          <td>".$krywn->golongan_darah."</td>
				          </tr>
				      </table></td>
				    </tr>
				  </table>
				</div><br>";
		
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function preview()
	{
		return $this->getHtml();
	}
	function createPdf()
	{		
		$html = $this->getHtml();		
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
	}
	function createXls()
	{
		global $manager;
		$html = $this->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
		global $dbLib;
		$rs = $dbLib->execute($sql);
		print rs2csv($rs);
	}
	function createTxt()
	{
	}
//--------------------------
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	function setRows($data)
	{
		$this->rows = $data;
	}
	function setPage($page)
	{
		$this->page = $page;
	}	
	function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}
	
}
?>
