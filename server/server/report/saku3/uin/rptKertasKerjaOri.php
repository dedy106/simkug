<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptKertasKerja extends server_report_basic
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
		$tahun=$tmp[0];
		$satker=$tmp[1];
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rincian Kertas Kerja Satker",$this->lokasi,$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='900'>
   <tr bgcolor='#CCCCCC'>
     <td width='40'  align='center' class='header_laporan'>#</td>
	 <td width='80'  align='center' class='header_laporan'>Kode</td>
     <td width='300'  align='center' class='header_laporan'>Uraian</td>
	 <td width='50'  align='center' class='header_laporan'>Volume</td>
	 <td width='60'  align='center' class='header_laporan'>Satuan</td>
	 <td width='80'  align='center' class='header_laporan'>Harga</td>
	 <td width='100'  align='center' class='header_laporan'>Jumlah</td>
     </tr> 
";
		$sql="select kddept,kdunit,kddept+'.'+kdunit+'.'+kdprogram as kode_program, nmprogram from t_program where KDDEPT='025' and kdunit='04' and kdprogram='07'  ";
		$rs = $dbLib->execute($sql);
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo " <tr>
     <td  class='header_laporan'>Prog</td>
	 <td  class='header_laporan'>$row->kode_program</td>
     <td class='header_laporan'>$row->nmprogram</td>
	 <td  align='right' class='header_laporan'>&nbsp;</td>
	 <td  align='right' class='header_laporan'>&nbsp;</td>
	 <td  align='right' class='header_laporan'>&nbsp;</td>
	 <td   align='right' class='header_laporan'>&nbsp;</td>
     </tr> ";
			$sql="select kdgiat,nmgiat from t_giat where kddept='$row->kddept' and kdunit='$row->kdunit'  and kdgiat='2132' ";
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo " <tr>
     <td  class='header_laporan'>Giat</td>
	 <td  class='header_laporan'>$row1->kdgiat</td>
     <td class='header_laporan'>$row1->nmgiat</td>
	 <td  align='right' class='header_laporan'>&nbsp;</td>
	 <td  align='right' class='header_laporan'>&nbsp;</td>
	 <td  align='right' class='header_laporan'>&nbsp;</td>
	 <td   align='right' class='header_laporan'>&nbsp;</td>
     </tr> ";
				$sql="select a.kdoutput,a.kdgiat,a.kdgiat+'.'+a.kdoutput as kode_output,b.nmoutput,b.sat,a.vol
					from d_output a
					inner join t_output b on a.kdgiat=b.kdgiat and a.kdoutput=b.kdoutput
					where  a.kdgiat='2132' and a.kddept='025' and kdunit='04' and kdprogram='07'   ";
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					echo " <tr>
		 <td  class='header_laporan'>Out</td>
		 <td  class='header_laporan'>$row2->kode_output</td>
		 <td class='header_laporan'>$row2->nmoutput</td>
		 <td  align='right' class='header_laporan'>".number_format($row2->vol,2,",",".")."</td>
		 <td  align='right' class='header_laporan'>$row2->sat</td>
		 <td  align='right' class='header_laporan'>".number_format(0,0,",",".")."</td>
		 <td   align='right' class='header_laporan'>".number_format(0,0,",",".")."</td>
		 </tr> ";
					$sql="select a.kdsoutput,a.ursoutput,a.kdoutput,a.kdgiat+'.'+a.kdoutput+'.'+a.kdsoutput as kode_soutput
						from d_soutput a
						where a.kdgiat='2132' and a.kddept='025' and kdunit='04' and kdprogram='07' and a.kdoutput='$row2->kdoutput'";
					
					$rs3 = $dbLib->execute($sql);
					while ($row3 = $rs3->FetchNextObject($toupper=false))
					{
						echo " <tr>
			 <td  class='header_laporan'>sOut</td>
			 <td  class='header_laporan'>$row3->kode_soutput</td>
			 <td class='header_laporan'>$row3->ursoutput</td>
			 <td  align='right' class='header_laporan'></td>
			 <td  align='right' class='header_laporan'></td>
			 <td  align='right' class='header_laporan'></td>
			 <td   align='right' class='header_laporan'></td>
			 </tr> ";
						$sql="select a.kdkmpnen,a.urkmpnen
							from d_kmpnen a
							where a.kdgiat='2132' and a.kddept='025' and kdunit='04' and kdprogram='07' and a.kdoutput='$row3->kdoutput' and a.kdsoutput='$row3->kdsoutput'";
					
						$rs4 = $dbLib->execute($sql);
						while ($row4 = $rs4->FetchNextObject($toupper=false))
						{
							echo " <tr>
				 <td  class='header_laporan'>sOut</td>
				 <td  class='header_laporan'>$row4->kdkmpnen</td>
				 <td class='header_laporan'>$row4->urkmpnen</td>
				 <td  align='right' class='header_laporan'></td>
				 <td  align='right' class='header_laporan'></td>
				 <td  align='right' class='header_laporan'></td>
				 <td   align='right' class='header_laporan'></td>
				 </tr> ";
							$sql="select a.kdskmpnen,a.urskmpnen
							from d_skmpnen a
							where a.kdgiat='2132' and a.kddept='025' and kdunit='04' and kdprogram='07' and a.kdoutput='$row3->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' ";
					
							$rs5 = $dbLib->execute($sql);
							while ($row5 = $rs5->FetchNextObject($toupper=false))
							{
								echo " <tr>
					 <td  class='header_laporan'>sKmp</td>
					 <td  class='header_laporan'>$row5->kdskmpnen</td>
					 <td class='header_laporan'>$row5->urskmpnen</td>
					 <td  align='right' class='header_laporan'></td>
					 <td  align='right' class='header_laporan'></td>
					 <td  align='right' class='header_laporan'></td>
					 <td   align='right' class='header_laporan'></td>
					 </tr> ";
								$sql="select a.kdakun,b.nmakun 
									from d_akun a
									inner join t_akun b on a.kdakun=b.kdakun
									where a.kdgiat='2132' and a.kddept='025' and kdunit='04' and kdprogram='07' and a.kdoutput='$row3->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' and a.kdskmpnen='$row5->kdskmpnen'";
					
								$rs6 = $dbLib->execute($sql);
								while ($row6 = $rs6->FetchNextObject($toupper=false))
								{
									echo " <tr>
						 <td  class='header_laporan'>Akun</td>
						 <td  class='header_laporan'>$row6->kdakun</td>
						 <td class='header_laporan'>$row6->nmakun</td>
						 <td  align='right' class='header_laporan'></td>
						 <td  align='right' class='header_laporan'></td>
						 <td  align='right' class='header_laporan'></td>
						 <td   align='right' class='header_laporan'></td>
						 </tr> ";
									$sql="select a.nmitem,a.volkeg,a.satkeg,a.hargasat,a.jumlah
									from d_item a
									where a.kdgiat='2132' and a.kddept='025' and kdunit='04' and kdprogram='07' and a.kdoutput='$row3->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' and a.kdskmpnen='$row5->kdskmpnen' and a.kdakun='$row6->kdakun'";
					
									$rs7 = $dbLib->execute($sql);
									while ($row7 = $rs7->FetchNextObject($toupper=false))
									{
										echo " <tr>
							 <td  class='header_laporan'>&nbsp;</td>
							 <td  class='header_laporan'>&nbsp;</td>
							 <td class='header_laporan'> - $row7->nmitem</td>
							 <td  align='right' class='header_laporan'>".number_format($row7->volkeg,2,",",".")."</td>
							 <td  align='right' class='header_laporan'>$row7->satkeg</td>
							 <td  align='right' class='header_laporan'>".number_format($row7->hargasat,2,",",".")."</td>
							 <td   align='right' class='header_laporan'>".number_format($row7->jumlah,2,",",".")."</td>
							 </tr> ";
										
									}
								}
								
							}
						}
					}
				
				}
			}
			$i=$i+1;
		}
		return "";
	}
	
}

?>
