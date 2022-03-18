<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_obligasi_Justifikasi
{
	protected $caption;
	protected $filter;
	protected $filter2;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function getTotalPage()
	{
		//$sql = "select count(*) from glma a ".
		//		" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter;
		$sql="select count(distinct j.no_justifikasi) ".
             "from justifikasi j inner join justifikasi_d jd on j.no_justifikasi=jd.no_justifikasi ".
					"inner join obligasi o on jd.no_seri=o.no_seri ".
					"inner join bank b on o.kode_emiten=b.kode_bank ".
					"inner join rating r on o.kode_rating=r.kode_rating ".
					"inner join catatan c1 on j.kode_rgb=c1.kode_catatan ".
					"inner join catatan c2 on j.kode_rsb=c2.kode_catatan ".
					"inner join catatan c3 on j.kode_rl=c3.kode_catatan ".
					"inner join catatan c4 on j.kode_rhp=c4.kode_catatan ".
					"inner join catatan c5 on j.kode_kap=c5.kode_catatan ".
					"inner join catatan c6 on j.kode_kr=c6.kode_catatan ".
					"inner join catatan c7 on j.kode_kso=c7.kode_catatan ".
					"inner join karyawan k1 on j.nik_ver=k1.nik ".
					"inner join karyawan k2 on j.nik_app1=k2.nik ".
					"inner join karyawan k3 on j.nik_ver=k3.nik ".$this->filter;
								//" and a.progress not in ".$this->filter2;
		//error_log($sql);
		global $dbLib;
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
		$sql0="select distinct j.no_justifikasi ".
              "from justifikasi j inner join justifikasi_d jd on j.no_justifikasi=jd.no_justifikasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql= "select j.no_justifikasi,convert(varchar,j.tanggal,103) as tgl,b.nama as nmbank,o.no_seri,o.nama as nmobli, ".
				"o.sektor_usaha,o.nominal,o.jaminan,r.kode_rating as nmrating,convert(varchar,o.due_date,103) as tgljthtempo,o.kupon, ".
				"o.pembayaran as byrkupon,jd.referensi,jd.rcn_harga,convert(varchar,jd.rcn_tgl,103) as tgltransaksi, ".
				"convert(varchar,jd.rcn_tgl_settlement,103) as tglsettlement,jd.rcn_kepemilikan,jd.analisa,j.tingkat_bunga,j.keterangan,j.ket_lain,j.sumber_dana, ".
				"c1.keterangan as rgb,c2.keterangan as rsb,c3.keterangan as rl,c4.keterangan as rhp,c5.keterangan as kai,c6.keterangan as kr, ".
				"c7.keterangan as kso,k1.nama as nmver,k1.jabatan as jabver,k2.nama as nmapp1,k2.jabatan as jabapp1,k3.nama as nmapp2,k3.jabatan as jabapp2 ".
				"from justifikasi j inner join justifikasi_d jd on j.no_justifikasi=jd.no_justifikasi ".
						"inner join obligasi o on jd.no_seri=o.no_seri ".
						"inner join bank b on o.kode_emiten=b.kode_bank ".
						"inner join rating r on o.kode_rating=r.kode_rating ".
						"inner join catatan c1 on j.kode_rgb=c1.kode_catatan ".
						"inner join catatan c2 on j.kode_rsb=c2.kode_catatan ".
						"inner join catatan c3 on j.kode_rl=c3.kode_catatan ".
						"inner join catatan c4 on j.kode_rhp=c4.kode_catatan ".
						"inner join catatan c5 on j.kode_kap=c5.kode_catatan ".
						"inner join catatan c6 on j.kode_kr=c6.kode_catatan ".
						"inner join catatan c7 on j.kode_kso=c7.kode_catatan ".
						"inner join karyawan k1 on j.nik_ver=k1.nik ".
						"inner join karyawan k2 on j.nik_app1=k2.nik ".
						"inner join karyawan k3 on j.nik_app2=k3.nik ".$this->filter.
						" and j.no_justifikasi='".$page->fields[0]."' ";
	        error_log($sql);
			//$start = (($this->page-1) * $this->rows);
			//global $dbLib;
			$temp=$dbLib->execute($sql);
			
			$nmobli = array();$nmbank = array();$sektor_usaha = array();$nominal = array();$jaminan = array();$rating = array();$tgljthtmp = array();
			$kupon = array();$byrkpn = array();$ref = array();$rho = array();$rtt = array();$rts = array();$rk = array();$analisa = array();
			$bunga = array();$ket = array();$ket_lain = array();$sumberdana = array();$rgb = array();$rsb = array();$rl = array();$rhp = array();
			$kai = array();$kr = array();$kso = array();$nmver = array();$jabver = array();$nmapp1 = array();$jabapp1 = array();
			$nmapp2 = array();$jabapp2 = array();$tgl = array();
			$i=0;
			while ($rs = $temp->FetchNextObject($toupper=false))
			{
				$tgl[$i] = $rs->tgl;
				$nmobli[$i] = $rs->nmobli;
				$nmbank[$i] = $rs->nmbank;
				$sektor_usaha[$i] = $rs->sektor_usaha;
				$nominal[$i] = $rs->nominal;
				$jaminan[$i] = $rs->jaminan;
				$rating[$i] = $rs->nmrating;
				$tgljthtmp[$i] = $rs->tgljthtempo;
				$kupon[$i] = $rs->kupon;
				$byrkpn[$i] = "Tiap ".$rs->byrkupon;
				$ref[$i] = $rs->referensi;
				$rho[$i] = $rs->rcn_harga;
				$rtt[$i] = $rs->tgltransaksi;
				$rts[$i] = $rs->tglsettlement;
				$rk[$i] = $rs->rcn_kepemilikan;
				$analisa[$i] = $rs->analisa;
				$bunga[$i] = $rs->tingkat_bunga;
				$ket[$i] = $rs->keterangan;
				$ket_lain[$i] = $rs->ket_lain;
				$sumberdana[$i] = $rs->sumber_dana;
				$rgb[$i] = $rs->rgb;
				$rsb[$i] = $rs->rsb;
				$rl[$i] = $rs->rl;
				$rhp[$i] = $rs->rhp;
				$kai[$i] = $rs->kai;
				$kr[$i] = $rs->kr;
				$kso[$i] = $rs->kso;
				$nmver[$i] = $rs->nmver;
				$jabver[$i] = $rs->jabver;
				$nmapp1[$i] = $rs->nmapp1;
				$jabapp1[$i] = $rs->jabapp1;
				$nmapp2[$i] = $rs->nmapp2;
				$jabapp2[$i] = $rs->jabapp2;
				$i++;
				error_log($i);
			}
			$jum=$i;			
			if ($jum==1)
			{
				$width=800;
				$i=$i-1;
				$width2=752;
			}else
			{
				$width=1572;
				$i=$i-1;
				$width2=1450;
			}
			
			
			$html = "<br><br><br>";
		
			$html .=
			"<div align='center'>
			  <table width='".$width."' border='0' cellspacing='0' cellpadding='0'>
			    <tr>
			      <td class='istyle16'>JUSTIFIKASI PEMBELIAN OBLIGASI DI PASAR SEKUNDER </td>
			    </tr>
			  </table><br>
			  <table width='".$width."' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000' class='kotak'>
			  <tr>
			    <td><table width='".$width."' border='0' cellspacing='2' cellpadding='0'>
			      <tr class='istyle18'>
			        <td width='20' valign='top'>1.</td>
			        <td colspan='4' valign='top'>Obligasi yang akan dibeli </td>
			      </tr>";
				  
			if ($jum!=1)
			{
				$html.="<tr>
			        <td width='20' valign='top'>&nbsp;</td>
			        <td colspan='4' valign='top'><table width='1572' border='1' cellspacing='0' cellpadding='0' class='kotak'>
	                  <tr class='istyle18'>
	                    <td width='127'><div align='center'>Nama Obligasi </div></td>
	                    <td width='175'><div align='center'>Nama Emiten </div></td>
	                    <td width='83'><div align='center'>Sektor Usaha </div></td>
	                    <td width='148'><div align='center'>Nominal Obligasi </div></td>
	                    <td width='158'><div align='center'>Jaminan</div></td>
	                    <td width='44'><div align='center'>Rating</div></td>
	                    <td width='71'><div align='center'>Tgl Jth Tempo </div></td>
	                    <td width='71'><div align='center'>Kupon</div></td>
	                    <td width='117'><div align='center'>Pembayaran Kupon </div></td>
	                    <td width='114'><div align='center'>Referensi</div></td>
	                    <td width='71'><div align='center'>Rcn Hrg Obligasi (Maks.) </div></td>
	                    <td width='71'><div align='center'>Rcn Tgl Transaksi </div></td>
	                    <td width='71'><div align='center'>Rcn Tgl Settlement </div></td>
	                    <td width='148'><div align='center'>Rnc Kepemilikan </div></td><td width='71'><div align='center'>YTM</div></td>
	                  </tr>";
				$j=0;
				while ($j<$jum)
				{
				  $html.=			  
	                  "<tr class='istyle15' valign='top'>
	                    <td>".$nmobli[$j]."</td>
	                    <td>".$nmbank[$j]."</td>
	                    <td>".$sektor_usaha[$j]."</td>
	                    <td align='right'>Rp".number_format($nominal[$j],2,",",".")."</td>
	                    <td>".$jaminan[$j]."</td>
	                    <td><div align='center'>".$rating[$j]."</div></td>
	                    <td><div align='center'>".$tgljthtmp[$j]."</div></td>
	                    <td><div align='center'>".number_format($kupon[$j],5,",",".")."%</div></td>
	                    <td>".$byrkpn[$j]."</td>
	                    <td>".$ref[$j]."</td>
	                    <td><div align='center'>".number_format($rho[$j],5,",",".")."%</div></td>
	                    <td><div align='center'>".$rtt[$j]."</div></td>
	                    <td><div align='center'>".$rts[$j]."</div></td>
	                    <td>".$rk[$j]."</td><td><div align='center'>".number_format($analisa[$j],2,",",".")."%</div></td>
	                  </tr>";			
				  $j++;
				}
				$html.="</table></td></tr>";
			}else
			{
			    $html.=  
				  "<tr class='istyle15'>
			        <td width='20' valign='top'>&nbsp;</td>
			        <td width='19' valign='top'>a.</td>
			        <td width='192' valign='top'>Nama Obligasi </td>
			        <td width='27' valign='top' align='center'>:</td>
					<td valign='top' class='istyle18' align='justify'>".$nmobli[$i]."</td>
				  </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>b.</td>
			        <td width='192' valign='top' class='istyle15'>Nama Emiten </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$nmbank[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>c.</td>
			        <td width='192' valign='top' class='istyle15'>Sektor Usaha </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$sektor_usaha[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>d.</td>
			        <td width='192' valign='top' class='istyle15'>Nominal Obligasi </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$nominal[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>e.</td>
			        <td width='192' valign='top' class='istyle15'>Jaminan</td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$jaminan[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>f.</td>
			        <td width='192' valign='top' class='istyle15'>Rating</td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$rating[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>g.</td>
			        <td width='192' valign='top' class='istyle15'>Tanggal Jatuh Tempo </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$tgljthtmp[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>h.</td>
			        <td width='192' valign='top' class='istyle15'>Kupon</td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".number_format($kupon[$i],5,",",".")."%</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>i.</td>
			        <td width='192' valign='top' class='istyle15'>Pembayaran Kupon </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$byrkpn[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>j.</td>
			        <td width='192' valign='top' class='istyle15'>Referensi</td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$ref[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>k.</td>
			        <td width='192' valign='top' class='istyle15'>Rencana Harga Obligasi </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$rho[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>l.</td>
			        <td width='192' valign='top' class='istyle15'>Rencana Tanggal Transaksi </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$rtt[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>m.</td>
			        <td width='192' valign='top' class='istyle15'>Rencana Tanggal Settlement </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$rts[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>n.</td>
			        <td width='192' valign='top' class='istyle15'>Rencana Kepemilikan </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$rk[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' align='center'>&nbsp;</td>
			        <td colspan='4' align='center' valign='top'>&nbsp;</td>
			      </tr>";
			}
			    $html.=  
				  "<tr class='istyle18'>
			        <td width='20' valign='top'>2.</td>
			        <td colspan='4' valign='top'>Analisa</td>
			        </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>a.</td>
			        <td colspan='3' valign='top' class='istyle15'>Imbal Hasil </td>
			        </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19'valign='top' class='istyle15'>&nbsp;</td>
			        <td colspan='3' valign='top' class='istyle15'>";
				if ($jum==1)
				{
					$html.="<table width='752' border='0' cellspacing='2' cellpadding='1'>
			          <tr class='istyle15'>
			            <td width='20' valign='top'>1)</td>
			            <td width='165' valign='top'>Obligasi ini </td>
			            <td width='27' valign='top' align='center'>:</td>
			            <td valign='top' align='justify'>".number_format($analisa[$i],2,",",".")."%</td>
			          </tr>
			          <tr class='istyle15'>
			            <td width='20' valign='top'>2)</td>
			            <td width='165' valign='top'>Tingkat Suku Bunga Deposito </td>
			            <td width='27' valign='top' align='center'>:</td>
			            <td valign='top' align='justify'>".number_format($bunga[$i],5,",",".")."% ".$ket[$i]."</td>
			          </tr>";
			        if ($ket_lain[$i]!='-')
					{
					  $html.=
					  "<tr class='istyle15'>
			            <td width='20' valign='top'>&nbsp;</td>
			            <td width='165' valign='top'>&nbsp;</td>
			            <td width='27' valign='top' align='center'>&nbsp;</td>
			            <td valign='top' align='justify'>".$ket_lain[$i]."</td>
			          </tr>";
					}
					$html.="</table>";
				}else
				{
					$html.="<table width='1450' border='0' cellspacing='2' cellpadding='1'>		          
			          <tr class='istyle15'>
			            <td width='20' valign='top'>1)</td>
			            <td width='165' valign='top'>Tingkat Suku Bunga Deposito </td>
			            <td width='27' valign='top' align='center'>:</td>
			            <td valign='top' align='justify'>".number_format($bunga[$i],5,",",".")."% ".$ket[$i]."</td>
			          </tr>";
			        if ($ket_lain[$i]!='-')
					{
					  $html.=
					  "<tr class='istyle15'>
			            <td width='20' valign='top'>&nbsp;</td>
			            <td width='165' valign='top'>&nbsp;</td>
			            <td width='27' valign='top' align='center'>&nbsp;</td>
			            <td valign='top' align='justify'>".$ket_lain[$i]."</td>
			          </tr>";
					}
					$html.="</table>";
				}
					$html.="</td>
			        </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>b.</td>
			        <td colspan='3' valign='top' class='istyle15'>Resiko yang mungkin timbul </td>
			        </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>&nbsp;</td>
			        <td colspan='3' valign='top' class='istyle15'><table width='".$width2."' border='0' cellspacing='2' cellpadding='1'>
			          <tr class='istyle15'>
			            <td width='20' valign='top'>1)</td>
			            <td width='165' valign='top'>Resiko Gagal Bayar </td>
			            <td width='27' valign='top' align='center'>:</td>
			            <td valign='top' align='justify'>".$rgb[$i]."</td>
			          </tr>
			          <tr class='istyle15'>
			            <td width='20' valign='top'>2)</td>
			            <td width='165' valign='top'>Resiko Suku Bunga </td>
			            <td width='27' valign='top' align='center'>:</td>
			            <td valign='top' align='justify'>".$rsb[$i]."</td>
			          </tr>
			          <tr class='istyle15'>
			            <td width='20' valign='top'>3)</td>
			            <td width='165' valign='top'>Resiko Likuiditas </td>
			            <td width='27' valign='top' align='center'>:</td>
			            <td valign='top' align='justify'>".$rl[$i]."</td>
			          </tr>
			          <tr class='istyle15'>
			            <td width='20' valign='top'>4)</td>
			            <td width='165' valign='top'>Resiko Harga Pasar </td>
			            <td width='27' valign='top' align='center'>:</td>
			            <td valign='top' align='justify'>".$rhp[$i]."</td>
			          </tr>
			        </table></td>
			        </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td colspan='4' valign='top' class='istyle15'>&nbsp;</td>
			        </tr>
			      <tr class='istyle18'>
			        <td width='20' valign='top'>3</td>
			        <td colspan='4' valign='top'>Posisi Portofolio</td>
			        </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>a.</td>
			        <td width='192' valign='top' class='istyle15'>Komposisi Arahan Investasi </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$kai[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>b.</td>
			        <td width='192' valign='top' class='istyle15'>Komposisi Realisasi </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$kr[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td width='19' valign='top' class='istyle15'>c.</td>
			        <td width='192' valign='top' class='istyle15'>Komposisi setelah Obligasi ini </td>
			        <td width='27' valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$kso[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td colspan='4' valign='top' class='istyle15'>&nbsp;</td>
			        </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle18'>4.</td>
			        <td width='211' colspan='2' valign='top' class='istyle18'>Sumber Pendanaan</td>
			        <td width='27'valign='top' class='istyle15' align='center'>:</td>
			        <td valign='top' class='istyle15' align='justify'>".$sumberdana[$i]."</td>
			      </tr>
			      <tr>
			        <td width='20' valign='top' class='istyle15'>&nbsp;</td>
			        <td colspan='4' valign='top' class='istyle15'>&nbsp;</td>
			        </tr>
			    </table></td>
			  </tr>
			  <tr>
			    <td><table width='".$width."' border='0' cellspacing='2' cellpadding='0'>
			      <tr>
			        <td width='20' rowspan='4'>&nbsp;</td>
			        <td width='".($width-20)."' class='istyle18'>Bandung, ";
					if (substr($tgl[$i],0,1)!='0'){$html.=substr($tgl[$i],0,2);}else{$html.=substr($tgl[$i],1,1);}$html.=" ".namaBulan(substr($tgl[$i],3,2))." ".substr($tgl[$i],6)."</td>
			      </tr>
			      <tr>
			        <td height='80'>&nbsp;</td>
			      </tr>
			      <tr>
			        <td class='istyle16'><u>".strtoupper($nmver[$i])."</u></td>
			      </tr>
			      <tr>
			        <td class='istyle15'>".$jabver[$i]."</td>
			      </tr>
			      
			    </table></td>
			  </tr>
			  <tr>
			    <td><table width='".$width."' border='0' cellspacing='2' cellpadding='0'>
			      <tr>
			        <td width='20'>&nbsp;</td>
			        <td width='".($width-20)."' height='80' valign='top' class='istyle15'>Catatan : </td>
			      </tr>
			    </table></td>
			  </tr>
			  <tr>
			    <td><table width='".$width."' border='0' cellspacing='2' cellpadding='0'>
			      <tr>
			        <td width='20' rowspan='4'>&nbsp;</td>
			        <td width='260' class='istyle15'>Disetujui/ditetapkan</td>
			        <td width='250'>&nbsp;</td>
			        <td width='260' class='istyle15'>Mengetahui</td>
			      </tr>
			      <tr>
			        <td height='80'>&nbsp;</td>
			        <td width='250'>&nbsp;</td>
			        <td width='260'>&nbsp;</td>
			      </tr>
			      <tr>
			        <td><u class='istyle16'>".strtoupper($nmapp1[$i])."</u></td>
			        <td width='250'>&nbsp;</td>
			        <td width='260'><u class='istyle16'>".strtoupper($nmapp2[$i])."</u></td>
			      </tr>
			      <tr>
			        <td class='istyle15'>".$jabapp1[$i]."</td>
			        <td width='250'>&nbsp;</td>
			        <td width='260' class='istyle15'>".$jabapp2[$i]."</td>
			      </tr>
			      
			    </table></td>
			  </tr>
			</table>
			</div><br>";
			$page->MoveNext();
		}
		
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
//		ob_end_clean();
//		error_log("server/tmp/$name");
//		return "server/tmp/$name";
		
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=produk.xls");
		header ("Content-Description: PHP/INTERBASE Generated Data" );
		readfile($save);
		unlink($save);
	}
	function createCSV()
	{
		$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";
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
