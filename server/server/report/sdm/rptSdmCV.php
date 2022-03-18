<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptSdmCV
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
			"from karyawan a ".
			//"left join hr_dinas2 b on a.nik=b.nik ".
			"inner join hr_rwypddk c on a.nik=c.nik and c.tahun=(select max(tahun) from hr_rwypddk where nik=a.nik) ".
			"inner join hr_tingkat d on c.nik=d.nik and d.tingkat2=(select max(tingkat2) as tgkt from hr_tingkat where nik=a.nik) ".$this->filter;
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
		return "select a.nik,a.nama,a.sex,a.status,a.agama,a.tempat_lahir,a.alamat,a.kota, ".
		"a.propinsi,a.kode_pos,a.no_telp,a.no_ponsel,a.golongan_darah,a.email,c.jenjang,c.jurusan, ".
		"date_format(a.tgl_lahir,'%e %M %Y') as tgllhr,date_format(a.tgl_masuk,'%e %M %Y') as tglmsk, ".
		"d.tingkat2,date_format(d.tgl_skmulai,'%e %M %Y') as tglawl,b.mk_tahun,b.mk_bulan,a.foto ".
		"from karyawan a ".
		"left join hr_dinas2 b on a.nik=b.nik ".
		"left join hr_rwypddk c on a.nik=c.nik and c.tahun=(select max(tahun) from hr_rwypddk where nik=a.nik) ".
		"left join hr_tingkat d on c.nik=d.nik and d.tingkat2=(select max(tingkat2) as tgkt from hr_tingkat where nik=a.nik) ".$this->filter;
	}
	function getPendidikan($nik)
	{
		return "select institusi,jurusan,jenjang,tahun,setara,keterangan ".
				"from hr_rwypddk ".
				"where nik='".$nik."' ".
				"order by tahun desc";
	}
	function getPelatihan($nik)
	{
		return "select latih,lama,date_format(tgl_mulai,'%d-%m-%Y') as tglawl, ".
				"date_format(tgl_selesai,'%d-%m-%Y') as tglend,panitia,kota ".
				"from hr_rwylatih ".
				"where nik='".$nik."' ".
				"order by tgl_mulai desc";
	}
	function getPenghargaan($nik)
	{
		return "select keterangan,date_format(tgl_skmulai,'%d-%m-%Y') as tglawl,no_sk, ".
				"date_format(tgl_sk,'%d-%m-%Y') as tglsk,nilai ".
				"from hr_rwyharga ".
				"where nik='".$nik."' ".
				"order by tgl_skmulai desc";
	}
	function getHtml()
	{
		global $dbLib;
		$getkar=$dbLib->execute($this->getKaryawan());	
		$krywn = $getkar->FetchNextObject($toupper=false);
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html= "<br>";
		$html.=
		"<div align='center'>
		  <table width='800' border='0' cellspacing='1' cellpadding='1'>
		    <tr>
		      <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
		        <tr class='istyle15'>
		          <td width='20%'>Nama</td>
		          <td width='4%'><div align='center'>:</div></td>
		          <td width='54%' class='istyle18'>".$krywn->nama."</td>
		          <td width='22%' rowspan='15' valign='top' align='center'><img src='server/media/".$krywn->foto."' width='113' height='170' /></td>
		        </tr>
		        <tr class='istyle15'>
		          <td>NIP</td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->nik."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Jenis Kelamin </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->sex."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Status Pernikahan </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->status."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Agama</td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->agama."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Tempat, Tanggal Lahir </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->tempat_lahir.", ".$krywn->tgllhr."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Tanggal Mulai kerja </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->tglmsk."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Penddikan Tertinggi Diakui </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->jenjang."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Jurusan</td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->jurusan."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Status</td>
		          <td><div align='center'>:</div></td>
		          <td>-</td>
		          </tr>
		        <tr class='istyle15'>
		          <td valign='top'>Alamat Sekarang </td>
		          <td valign='top'><div align='center'>:</div></td>
		          <td>".$krywn->alamat.", ".$krywn->kota.", ".$krywn->propinsi." ".$krywn->kode_pos."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Telepon Rumah </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->no_telp."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Telepon Selular </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->no_ponsel."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Golongan Darah</td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->golongan_darah."</td>
		          </tr>
		        <tr class='istyle15'>
		          <td>Alamat e-Mail </td>
		          <td><div align='center'>:</div></td>
		          <td>".$krywn->email."</td>
		          </tr>
		      </table></td>
		    </tr>
		    <tr>
		      <td>&nbsp;</td>
		    </tr>
		    <tr>
		      <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
		        <tr>
		          <td colspan='6' class='nstyle16'>Riwayat Pendidikan</td>
		        </tr>
		        <tr>
		          <td colspan='6'><img src='image/LINE2.jpg' width='100%' height='22' /></td>
		        </tr>
		        <tr class='istyle18'>
		          <td width='16%' height='18'>Nama Institusi </td>
		          <td width='18%'>Jur./Falkutas</td>
		          <td width='6%'>Gelar</td>
		          <td width='11%'>Tahun Selesai </td>
		          <td width='15%'>Setara</td>
		          <td width='34%'>Keterangan</td>
		          </tr>";
		$getpddk=$dbLib->execute($this->getPendidikan($krywn->nik));
		while ($pddk = $getpddk->FetchNextObject($toupper=false))
		{
			$html.="<tr class='istyle15'>
			          <td>".$pddk->institusi."</td>
			          <td>".$pddk->jurusan."</td>
			          <td>".$pddk->jenjang."</td>
			          <td>".$pddk->tahun."</td>
			          <td>".$pddk->setara."</td>
			          <td>".$pddk->keterangan."</td>
			          </tr>";
		}
		$html.="</table></td>
		    </tr>
		    <tr>
		      <td>&nbsp;</td>
		    </tr>
		    <tr>
		      <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
		        <tr>
		          <td colspan='6' class='nstyle16'>Riwayat Pelatihan</td>
		        </tr>
		        <tr>
		          <td colspan='6'><img src='image/LINE2.jpg' width='100%' height='22' /></td>
		        </tr>
		        <tr class='istyle18'>
		          <td width='26%' height='18'>Nama Pelatihan </td>
		          <td width='11%'>Lama Kegiatan </td>
		          <td width='11%'>Tgl Mulai </td>
		          <td width='11%'>Tgl Selesai</td>
		          <td width='22%'>Penyelenggara</td>
		          <td width='19%'>Kota</td>
		        </tr>";
		$getlatih=$dbLib->execute($this->getPelatihan($krywn->nik));
		while ($latih = $getlatih->FetchNextObject($toupper=false))
		{
			$html.="<tr class='istyle15'>
			          <td>".$latih->latih."</td>
			          <td>".$latih->lama."</td>
			          <td>".$latih->tglawl."</td>
			          <td>".$latih->tglend."</td>
			          <td>".$latih->panitia."</td>
			          <td>".$latih->kota."</td>
			        </tr>";
		}
		$html.="</table></td>
		    </tr>
		    <tr>
		      <td>&nbsp;</td>
		    </tr>
		    <tr>
		      <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
		        <tr>
		          <td colspan='5' class='nstyle16'>Riwayat Penghargaan </td>
		        </tr>
		        <tr>
		          <td colspan='5'><img src='image/LINE2.jpg' width='100%' height='22' /></td>
		        </tr>
		        <tr class='istyle18'>
		          <td width='36%' height='18'>Nama Penghargaan </td>
		          <td width='10%'>Tgl. SK </td>
		          <td width='24%'>No. SK </td>
		          <td width='10%'>Tgl. Berlaku </td>
		          <td width='20%'>Uang Penyerta </td>
		          </tr>";
		$gethrg=$dbLib->execute($this->getPenghargaan($krywn->nik));
		while ($hrg = $gethrg->FetchNextObject($toupper=false))
		{
			$html.="<tr class='istyle15'>
			          <td>".$hrg->keterangan."</td>
			          <td>".$hrg->tglsk."</td>
			          <td>".$hrg->no_sk."</td>
			          <td>".$hrg->tglawl."</td>
			          <td>Rp ".number_format($hrg->nilai,0,",",".")."</td>
			          </tr>";
		}
		$html.="</table></td>
		    </tr>
		    <tr>
		      <td><img src='image/LINE2.jpg' width='100%' height='22' /></td>
		    </tr>
		    
		    <tr>
		      <td class='istyle15'>Dicetak pada tanggal : ".date("j-n-Y H:i:s")."</td>
		    </tr>
		  </table>
		</div>";
		
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
