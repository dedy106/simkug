<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_NotaKonfirmasi
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
		$sql="select count(distinct nm.no_nota) ".
         "from kkp_nego_m kn inner join nota_m nm on kn.no_kkp=nm.no_kkp ".
                              "inner join emiten e on kn.kode_emiten=e.kode_emiten ".
                              "inner join nota_perihal np on nm.kode_perihal=np.kode_perihal ".
                              "inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk ".
        //                      "inner join bank b on kn.kode_bank=b.kode_bank ".
                              "inner join curr c on kn.kode_curr=c.kode_curr ".$this->filter;
		global $dbLib;
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
		$sql0="select distinct nm.no_nota ".
          "from kkp_nego_m kn inner join nota_m nm on kn.no_kkp=nm.no_kkp ".
                              "inner join emiten e on kn.kode_emiten=e.kode_emiten ".
                              "inner join nota_perihal np on nm.kode_perihal=np.kode_perihal ".
                              "inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk ".
                           //   "inner join bank b on kn.kode_bank=b.kode_bank ".
                              "inner join curr c on kn.kode_curr=c.kode_curr ".$this->filter;
    $start = (($this->page-1) * $this->rows);	
    global $dbLib;
    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);
    while (!$page->EOF)
    {
          $sql = "select nm.no_nota,nm.no_dokumen,day(nm.tanggal) as dd,month(nm.tanggal) as mm,year(nm.tanggal) as yy,e2.nama as nmbank,e2.no_fax,np.nama as nmperihal,kb.nama as nmbentuk,kn.nilai, ".
                 "c.skode,kn.jangka_waktu,day(kn.tgl_awal) as d_tglawal,month(kn.tgl_awal) as m_tglawal,year(kn.tgl_awal) as y_tglawal,day(kn.tgl_akhir) as d_tglakhir,month(kn.tgl_akhir)as m_tglakhir, ".
                 "year(kn.tgl_akhir) as y_tglakhir,kn.bunga,kn.basis,kn.hari, kn.bayar_bunga,e3.rekening,e2.cabang,e2.alamat,e2.kota,kn.no_kkp,e3.atas_nama, nm.jenis,e3.nama as nmbank2, e3.cabang as cbg,e3.alamat as almtc,e3.kota as kt,e.nama as nmbankt,e.rekening as rekt,e.alamat as almt,e.cabang as cbgt,e.kota as kotat,nm.nilai as cair,(kn.nilai-nm.nilai) as sisa ".
                 "from kkp_nego_m kn inner join nota_m nm on kn.no_kkp=nm.no_kkp ".
									"inner join emiten e on kn.kode_bank=e.kode_emiten ".
                                    "inner join emiten e3 on kn.bankCair=e3.kode_emiten ".
									"inner join emiten e2 on kn.kode_emiten=e2.kode_emiten ".
                                    "inner join nota_perihal np on nm.kode_perihal=np.kode_perihal ".
                                    "inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk ".
                                 //   "inner join bank b on kn.kode_bank=b.kode_bank ".
                                    "inner join curr c on kn.kode_curr=c.kode_curr ".$this->filter.
                                    " and nm.no_nota='".$page->fields[0]."' ";
      		//error_log($sql);
          //$start = (($this->page-1) * $this->rows);		

			/*$html = "<style type='text/css'>
                  <!--
                  .nstyle15 {font-size: 13px; font-family: Arial, Helvetica, sans-serif; }
                  .nstyle16 {font-size: 14px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
                  .nstyle17 {font-size: 20px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
                  .nstyle18 {font-size: 13px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
                  -->
                  </style>";*/
          
				 
      		$rs=$dbLib->LimitQuery($sql,1000,0);
			
			while ($data = $rs->FetchNextObject($toupper=false)){
		    
				$html = "<br><br><br>";		
	      		$html .= "
                  <div align='center' class='margin'>
                    <table width='750' border='0' cellspacing='0' cellpadding='2' style='border-collapse: collapse' >
                      <tr>
                        <td width='750' class='nstyle15'><div align='right' class='nstyle17'>Nota Konfirmasi&nbsp;</div><br>
                              <br>
                              Nomor : ".$data->no_dokumen."<br><br>";
							  if ($data->jenis == 'P') {
							  $html .="Bandung, ".$data->dd." ".namaBulan($data->mm)." ".$data->yy."<br>";
							  }else if ($data->jenis == 'C' or $data->jenis == 'S') {
							  $html .="Bandung, ".$data->d_tglakhir." ".namaBulan($data->m_tglakhir)." ".$data->y_tglakhir."<br>";
							  }							  
                              $html .="<br>
                              Kepada Yth, <br>
                              <div class='nstyle18'>Sdr Pimpinan ".$data->nmbank." Cabang ". $data->cabang ."<br>
                              Nomor Facs : ".$data->no_fax."</div><br>
                              <br>
                              Perihal : ".$data->nmperihal."<br>
                              <br>
                              Dengan hormat,<br>&nbsp;
                          <table width='750' border='0' cellpadding='1' cellspacing='2'>";
				if ($data->jenis == 'P'){				      
                      $html.="<tr>
                            <td width='20' valign='top' class='nstyle15'>1.</td>
                            <td colspan='4' class='nstyle15' align='justify'>Menindaklanjuti negosiasi tingkat suku bunga penempatan dana antara Pihak kami dan Pihak Saudara tanggal 
                              ".$data->dd." ".namaBulan($data->mm)." ".$data->yy.", dengan ini kami konfirmasikan penempatan dana Yayasan Kesehatan Pegawai Telkom (YAKES-TELKOM) di 
                              ".$data->nmbank." Cabang ".$data->cabang." dengan kondisi dan ketentuan sebagai berikut : </td>
                            </tr>
                          <tr><tr>
                            <td width='20' valign='top' class='nstyle15'>&nbsp;</td>
                            <td colspan='4' class='nstyle15' align='justify'>&nbsp;</td>
                            </tr>
                            <td>&nbsp;</td>
                            <td width='14' class='nstyle15'>a.</td>
                            <td width='159' class='nstyle15'>Bentuk</td>
                            <td width='9' class='nstyle15'>:</td>
                            <td width='532' class='nstyle15'>".$data->nmbentuk."</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>b.</td>
                            <td class='nstyle15'>Jumlah Dana </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle15'>".$data->skode.number_format($data->nilai,0,",",".").",- (diulang ".$data->skode.number_format($data->nilai,0,",",".").",-)</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15' valign='top'>c.</td>
                            <td class='nstyle15' valign='top'>Jangka Waktu </td>
                            <td class='nstyle15' valign='top'>:</td>
                            <td class='nstyle15' align='justify'>". numToString($data->jangka_waktu)." bulan, tanggal mulai : ".$data->d_tglawal." ".namaBulan($data->m_tglawal)." ".$data->y_tglawal.", tanggal jatuh tempo : ".$data->d_tglakhir." ".namaBulan($data->m_tglakhir)." ".$data->y_tglakhir.", (".$data->hari." hari)</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>d.</td>
                            <td class='nstyle15'>Tingkat Suku Bunga </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle15'>".number_format($data->bunga,3,",",".")."% p.a. (".$data->basis." hari)</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>e.</td>
                            <td class='nstyle15'>Pembayaran Bunga </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle15'>".$data->bayar_bunga."</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td valign='top' class='nstyle15 '>f.</td>
                            <td valign='top' class='nstyle15 '>Hasil Bunga </td>
                            <td valign='top' class='nstyle15 '>:</td>
                            <td class='nstyle15'><table width='530' border='0' cellspacing='0' cellpadding='0'>
                              <tr>
                                <td colspan='4' class='nstyle15'>Mohon ditransfer secara otomatis ke rekening giro : </td>
                                </tr>
                              <tr>
                                <td width='12' class='nstyle15' >-</td>
                                <td width='90' class='nstyle15'>Nomor</td>
                                <td width='10' class='nstyle15'>:</td>
                                <td width='404' class='nstyle15'>".$data->rekt." a.n. ".$data->atas_nama." </td>
                              </tr>
                              <tr>
                                <td class='nstyle15'>-</td>
                                <td class='nstyle15'>Bank</td>
                                <td class='nstyle15'>:</td>
                                <td class='nstyle15'>".$data->nmbankt.", Cabang ".$data->cbgt."</td>
                              </tr>
                              <tr>
                                <td class='nstyle15'>-</td>
                                <td class='nstyle15'>Alamat Bank </td>
                                <td class='nstyle15'>:</td>
                                <td class='nstyle15'>".$data->almt." ".$data->kotat." </td>
                              </tr>
                            </table>";
						if ($data->nmbentuk=="Deposito On Call")
						{
							$html .= "</td>
	                          </tr> ";
							$html .= "<tr>
                            <td>&nbsp;</td>
                            <td valign='top' class='nstyle15 '>g.</td>
                            <td valign='top' class='nstyle15 '>Pencairan Deposito </td>
                            <td valign='top' class='nstyle15 '>:</td>
                            <td class='nstyle15'><table width='530' border='0' cellspacing='0' cellpadding='0'>
                              <tr>
                                <td colspan='4' class='nstyle15' align='justify'>Pada tanggal Jatuh Tempo dana sebesar nominal pada huruf b di atas mohon ditransfer secara otomatis ke rekening giro :</td>
                                </tr>
                              <tr>
                                <td width='12' class='nstyle15' >-</td>
                                <td width='90' class='nstyle15'>Nomor</td>
                                <td width='10' class='nstyle15'>:</td>
                                <td width='404' class='nstyle15'>".$data->rekening." a.n. ".$data->atas_nama." </td>
                              </tr>
                              <tr>
                                <td class='nstyle15'>-</td>
                                <td class='nstyle15'>Bank</td>
                                <td class='nstyle15'>:</td>
                                <td class='nstyle15'>".$data->nmbank2.", Cabang ".$data->cbg."</td>
                              </tr>
                              <tr>
                                <td class='nstyle15'>-</td>
                                <td class='nstyle15'>Alamat Bank </td>
                                <td class='nstyle15'>:</td>
                                <td class='nstyle15'>".$data->almtc." ".$data->kt." </td>
                              </tr>
                            </table>";
						}
					}else if ($data->jenis == 'C'){
						$html.="<tr>
                            <td width='20' valign='top' class='nstyle15'>1.</td>
                            <td colspan='4' class='nstyle15' align='justify'>Sehubungan deposito atas nama Yayasan Kesehatan Pegawai TELKOM (YAKES-TELKOM) di ". $data->nmbank ." Cabang " . $data->cabang .
							  " sebesar ".$data->skode." ".number_format($data->nilai,0,',','.'). " diulang (".$data->skode." ".number_format($data->nilai,0,',','.') .",-) yang jatuh tempo pada tanggal ".
							  $data->d_tglakhir." ".namaBulan($data->m_tglakhir)." ".$data->y_tglakhir." (". $data->hari." hari), dengan ini kami konfirmasikan bahwa deposito tersebut :</td>
                            </tr><tr>
                            <td width='20' valign='top' class='nstyle15'>&nbsp;</td>
                            <td colspan='4' class='nstyle15' align='justify'>&nbsp;</td>
                          <tr>
                            <td>&nbsp;</td>
                            <td width='19' class='nstyle15'>a.</td>
                            <td width='247' class='nstyle15'>Dicairkan seluruhnya sebesar</td>
                            <td width='9' class='nstyle15'>:</td>
                            <td width='463' class='nstyle18'>".$data->skode.number_format($data->nilai,0,',','.').",- (diulang ".$data->skode.number_format($data->nilai,0,',','.') .",-)  </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>b.</td>
                            <td class='nstyle15'>Tanggal Pencairan</td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>".$data->d_tglakhir." ".namaBulan($data->m_tglakhir)." ".$data->y_tglakhir." </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>c.</td>
                            <td class='nstyle15'>Dana mohon ditransfer ke </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle15'></td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>- Nama Bank </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>".$data->nmbank2.", Cabang " . $data->cbg ."</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15' valign='top'>- Alamat Bank </td>
                            <td class='nstyle15' valign='top'>:</td>
                            <td class='nstyle18' valign='top'>".$data->almtc." ".$data->kt."</td>
                          </tr> 
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>- No Rekening </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>".$data->rekening." a.n. " . $data->atas_nama."</td>
                          </tr><tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>- Jenis Rekening</td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>Rekening Giro.</td>
                          </tr>";					
					}else if ($data->jenis == 'S')
					{
						$html.="<tr>
                            <td width='20' valign='top' class='nstyle15'>1.</td>
                            <td colspan='4' class='nstyle15' align='justify'>Sehubungan deposito atas nama Yayasan Kesehatan Pegawai TELKOM (YAKES-TELKOM) di ". $data->nmbank ." Cabang " . $data->cabang .
							  " sebesar ".$data->skode.number_format($data->nilai,0,',','.'). " diulang (".$data->skode.number_format($data->nilai,0,',','.') .",-) yang jatuh tempo pada tanggal ".
							  $data->d_tglakhir." ".namaBulan($data->m_tglakhir)." ".$data->y_tglakhir." (". $data->hari." hari), dengan ini kami konfirmasikan bahwa deposito tersebut :</td>
                            </tr><tr>
                            <td width='20' valign='top' class='nstyle15'>&nbsp;</td>
                            <td colspan='4' class='nstyle15' align='justify'>&nbsp;</td>
                          <tr>
                            <td>&nbsp;</td>
                            <td width='19' class='nstyle15'>a.</td>
                            <td width='247' class='nstyle15'>Dicairkan seluruhnya sebesar</td>
                            <td width='9' class='nstyle15'>:</td>
                            <td width='463' class='nstyle18'>".$data->skode.number_format($data->cair,0,',','.').",- (diulang ".$data->skode.number_format($data->cair,0,',','.') .",-)  </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>b.</td>
                            <td class='nstyle15'>Tanggal Pencairan</td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>".$data->d_tglakhir." ".namaBulan($data->m_tglakhir)." ".$data->y_tglakhir." </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>c.</td>
                            <td class='nstyle15'>Dana mohon ditransfer ke </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle15'></td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>- Nama Bank </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>".$data->nmbank2.", Cabang " . $data->cbg ."</td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15' valign='top'>- Alamat Bank </td>
                            <td class='nstyle15' valign='top'>:</td>
                            <td class='nstyle18' valign='top'>".$data->almtc." ".$data->kt."</td>
                          </tr> 
                          <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>- No Rekening </td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>".$data->rekening." a.n. " . $data->atas_nama."</td>
                          </tr><tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>- Jenis Rekening</td>
                            <td class='nstyle15'>:</td>
                            <td class='nstyle18'>Rekening Giro.</td>
                          </tr>";
						$html .= "  <tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15' valign='top'>d.</td>
                            <td colspan='3' class='nstyle15' align='justify' valign='top'>Sisanya sebesar ".$data->skode.number_format($data->sisa,0,',','.').",- (diulang ".$data->skode.number_format($data->sisa,0,',','.').",-) ditempatkan kembali dalam bentuk deposito di Santunan Kematian  dengan kondisi dan ketentuan akan dicantumkan dalam Nota Konfirmasi tersendiri.</td>
                          </tr>";
					}
					$html .= "</td>
                          </tr> ";
					if ($data->jenis == 'P'){			
						if ($data->nmbentuk=="Deposito On Call")
						{
							$urut="h.";
						}else
						{
							$urut="g.";
						}
						$html .= "<tr>
                            <td>&nbsp;</td>
                            <td valign='top' class='nstyle15 '>".$urut."</td>
                            <td valign='top' class='nstyle15 '>Lain-lain</td>
                            <td valign='top' class='nstyle15 '>:</td>
                            <td class='nstyle15'><table width='530' border='0' cellspacing='0' cellpadding='0'>";                  
					
						$sql2="select nl.no_urut,c.keterangan ".
							"from nota_m nm inner join nota_lain nl on nm.no_nota=nl.no_nota ".
                               "inner join catatan c on nl.kode_catatan=c.kode_catatan ".
								"where nm.no_nota='".$data->no_nota."' order by nl.no_urut";
						$rs2=$dbLib->LimitQuery($sql2,1000,0);   
          
						while (!$rs2->EOF)
						{      		  
                          $html.="<tr>".
                                "<td width='22' class='nstyle15' valign='top'>".$rs2->fields[0].") </td>".
                                "<td width='477' class='nstyle15' align='justify'>".$rs2->fields[1]."</td>".
                              "</tr>";
                              $rs2->MoveNext();
                  		 } 
						$html .= "</table></td></tr>";
					}
				 
				$sql3="select upper(k.nama),k.jabatan ".
                "from nota_m nm inner join karyawan k on k.nik=nm.nik1 ".
                "where nm.no_nota='".$data->no_nota."' ";
				$ttd1=$dbLib->LimitQuery($sql3,1,0);
          
				$sql4="select upper(k.nama),k.jabatan ".
                "from nota_m nm inner join karyawan k on k.nik=nm.nik2 ".
                "where nm.no_nota='".$data->no_nota."' ";
				$ttd2=$dbLib->LimitQuery($sql4,1,0);
                  		 
                $html .="<tr>
                            <td>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                            <td class='nstyle15'>&nbsp;</td>
                          </tr>";
                    if ($data->jenis == 'P'){     
						  $html .="<tr>
                            <td class='nstyle15' valign='top'>2.</td>
                            <td colspan='4' class='nstyle15' align='justify'>Demikian konfirmasi ini kami sampaikan, atas perhatian dan kerja sama Saudara diucapkan terima kasih. </td>
                            </tr>
                          <tr>";
					}else if ($data->jenis == 'C' or $data->jenis == 'S'){     
						  $html .="<tr>
                            <td class='nstyle15' valign='top'>2.</td>
                            <td colspan='4' class='nstyle15' align='justify'>Demikian konfirmasi ini kami sampaikan dan mohon pelaksanaannya. Atas perhatian dan kerja sama Saudara diucapkan terima kasih. </td>
                            </tr>
                          <tr>";
                    }					
                            $html .="<td>&nbsp;</td>
                            <td colspan='4' class='nstyle15'>&nbsp;</td>
                          </tr>
                          <tr>
                            <td colspan='5'><table width='745' border='0' align='left' cellspacing='0' cellpadding='0'>
                              <tr>
                                <td colspan='2' class='nstyle15'>Hormat kami, </td>
                              </tr>
                              <tr>
                                <td colspan='2' class='nstyle18'>YAKES-TELKOM</td>
                              </tr>
                  
                              <tr>
                                <td>&nbsp;</td>
                                <td height='60'>&nbsp;</td>
                              </tr>
                              <tr>
                                <td width='490' class='nstyle18'>
                                  <div align='left'><u>".$ttd1->fields[0]."</u></div></td>
                                <td width='290' class='nstyle18'>
                                  <div align='left'><u>".$ttd2->fields[0]."</u></div></td>
                              </tr>
                              <tr>
                                <td class='nstyle18'>
                                    <div align='left'>".$ttd1->fields[1]."</div></td>
                                <td class='nstyle18'>
                                    <div align='left'>".$ttd2->fields[1]."</div></td>
                              </tr>
                            </table></td>
                            </tr>
                        </table></td>
                      </tr>
                    </table>
                  </div>";
            
				$html .= "<br>";
      		}
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
