<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptSppdAju extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		
				
				
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($periode,0,4);
        $sql="select  a.no_aju,c.nama as nama_app,b.nama as nama_buat,a.kode_lokasi,a.kode_pp,a.tanggal,a.periode,a.tujuan,a.dasar,a.kota,
        a.tgl_awal,a.tgl_akhir,a.lama,a.jenis,a.kode_param,a.kode_akun,a.nik_buat,a.nik_app,a.jab1,a.jab2,a.transport,d.nama as akun
                from pd_aju_m a 
                inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
                inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi 
                inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
                $this->filter order by a.no_aju ";
	 
      $rs = $dbLib->execute($sql);
      $AddOnLib=new server_util_AddOnLib();	
	  $i=1;
		echo "<div align='center'>"; 
		$logo="image/spm_new.png";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
	  while ($row = $rs->FetchNextObject($toupper=false))
		{
            $nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                    <td align='center'><img src='$logo' width='200' height='72'></td>
                </tr>
                <tr>
                    <td align='center' class='judul_bukti'>SURAT PERMOHONAN MELAKSANAKAN PERJALANAN DINAS (SPMPD)</td>
                </tr>
                <tr>
                    <td align='center' class='judul_bukti'>Nomor : $row->no_aju</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                </tr>
                <tr>
                    <td>Dengan ini kami mohon persetujuannya bagi pegawai yang namanya tersebut di bawah ini untuk diberikan</td>
                </tr>
                <tr>
                    <td>Surat Perintah Perjalanan Dinas (SPPD) sebagai berikut :</td>
                </tr>
                <tr>
                    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                    <tr>
                        <td width='24' align='center' class='header_laporan'>NO</td>
                        <td width='200' align='center' class='header_laporan'>NAMA</td>
                        <td width='121' align='center' class='header_laporan'>NIK</td>
                        <td width='180' align='center' class='header_laporan'>BAND</td>
                        <td width='300' align='center' class='header_laporan'>LOKASI KERJA</td>
                        <td width='300' align='center' class='header_laporan'>JABATAN</td>
                    </tr>";
        $sql="select  a.no_aju,a.kode_lokasi, a.nik,a.kode_band,a.kode_pp,a.jabatan,b.nama as krywn,c.nama as pp
        from pd_aju_nik a 
        inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
        inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
                where a.kode_lokasi='$row->kode_lokasi' and a.no_aju='$row->no_aju' 
                order by a.no_aju ";					 
		
        $rs1 = $dbLib->execute($sql);
        $j=1; $nilai=0;
        while ($row1 = $rs1->FetchNextObject($toupper=false))
            {
                $nilai+=$row1->nilai;
        echo "<tr>
                    <td class='isi_laporan' align='center'>$j</td>
                    <td class='isi_laporan'>$row1->krywn</td>
                    <td class='isi_laporan'>$row1->nik</td>
                    <td class='isi_laporan'>$row1->kode_band</td>
                    <td class='isi_laporan'>$row1->pp</td>
                    <td class='isi_laporan'>$row1->jabatan</td>
                </tr>";
                $j=$j+1;
            }   
        echo "
				</table></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
     
              <tr>
                <td   height='20' class='isi_bukti'>Tujuan Perjalanan Dinas</td>
                <td class='isi_bukti'>: $row->tujuan </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Dasar / Alasan PD</td>
                <td class='isi_bukti'>: $row->dasar </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Kota Tujuan</td>
                <td class='isi_bukti'>: $row->kota </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Lama Perjalanan Dinas</td>
                <td class='isi_bukti'>: $row->lama Hari</td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Berangkat / Kembali Tanggal</td>
                <td class='isi_bukti'>: $row->tgl_awal /  $row->tgl_akhir </td>
              </tr> 
                 <tr>
              <td  height='20' class='isi_bukti'> Jenis Perjalanan Dinas</td>
              <td class='isi_bukti'>: $row->jenis  </td>
            </tr>
            <tr>
            <td  height='20' class='isi_bukti'>Sarana Transportasi</td>
            <td class='isi_bukti'>: $row->transport  </td>
          </tr>   
                  <tr>
          <td  height='20' class='isi_bukti'>Beban / Akun</td>
          <td class='isi_bukti'>: $row->kode_akun / $row->akun  </td>
        </tr>
            </table></td>
          </tr>
<br>
            <tr>
                <td>Demikian permohonan kami dan atas persetujuannya diucapkan terimakasih.</td>
            </tr>
            <tr>
                <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                    <td width='172' align='center'>&nbsp;</td>
                    <td width='293' align='center'>&nbsp;</td>
                    <td width='321'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td align='center'>Yang Mengajukan</td>
                    <td align='center'>Menyetujui/ Mengetahui</td>
                </tr>
                <tr>
                    <td height='60'>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>$row->nama_buat</td>
                    <td align='center'>$row->nama_app</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>$row->jab1</td>
                    <td align='center'>$row->jab2</td>
                </tr>
                </table></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table>          
            
          </table></td>
            </tr>
          </table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
        echo "</div>";
		
	}
	
}
?>
