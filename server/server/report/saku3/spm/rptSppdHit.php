<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptSppdHit extends server_report_basic
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
        $sql="select j.nik as nik_aju,k.nama as nama_aju,i.grade,i.jabatan,a.kota,e.no_spj,g.nama_rek,g.no_rek,g.bank,e.nik_buat,e.nik_app1,e.nik_app2,e.jab_buat,e.jab1,e.jab2,a.no_aju,f.nama as nama_app2,c.nama as nama_app,
        b.nama as nama_buat,a.kode_lokasi,a.kode_pp,a.tanggal,a.periode,a.tujuan,a.dasar,a.kota,
        a.tgl_awal,a.tgl_akhir,a.lama,a.jenis,a.kode_param,a.kode_akun,a.transport,d.nama as akun,g.bruto,h.nama as pp
        from pd_aju_m a 
        inner join pd_spj_m e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi 
        inner join spm_rek g on e.no_spj=g.no_bukti and a.kode_lokasi=g.kode_lokasi 
        inner join karyawan b on e.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
        inner join karyawan c on e.nik_app1=c.nik and a.kode_lokasi=c.kode_lokasi 
        inner join karyawan f on e.nik_app2=f.nik and a.kode_lokasi=f.kode_lokasi 
        inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
        inner join lokasi h on  a.kode_lokasi=h.kode_lokasi 
		inner join karyawan i on a.nik_user=i.nik and a.kode_lokasi=i.kode_lokasi 
        inner join pd_aju_nik j on j.no_aju=a.no_aju and a.kode_lokasi=j.kode_lokasi 
		inner join karyawan k on j.nik=k.nik and j.kode_lokasi=k.kode_lokasi 

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
                    <td align='center' class='judul_bukti'>SURAT PERINTAH PERJALANAN DINAS DAN RINCIAN BIAYA PERJALANAN DINAS</td>
                </tr>
                <tr>
                    <td align='center' class='judul_bukti'>Nomor : $row->no_spj</td>
                </tr>

                <tr>
                    <td align='center'>&nbsp;</td>
                </tr>
                <tr>
                    <td>Berdasarkan Surat Permohonan Melaksanakan Perjalanan Dinas Nomor : $row->no_aju </td>
                </tr>
                <tr>
                    <td>dengan ini kami perintahkan Saudara :</td>
                </tr>
                <tr>
                            <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>

                <td   height='20' class='isi_bukti'>Nama</td>
                <td class='isi_bukti'>: $row->nama_aju /  $row->nik_aju </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Band / Jabatan</td>
                <td class='isi_bukti'>: $row->grade / $row->jabatan </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Untuk melakukan perjalanan dinas dengan</td>
                <td class='isi_bukti'>: </td>
              </tr>
              <tr>
                <td   height='20' class='isi_bukti'>Tujuan Perjalanan Dinas</td>
                <td class='isi_bukti'>: $row->tujuan </td>
              </tr>
              <tr>
              <td   height='20' class='isi_bukti'>Kota Tujuan</td>
              <td class='isi_bukti'>: $row->kota </td>
            </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Lama Perjalanan Dinas</td>
                <td class='isi_bukti'>: $row->lama </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Berangkat / Kembali Tanggal</td>
                <td class='isi_bukti'>: $row->tgl_awal /  $row->tgl_akhir </td>
              </tr> 
            <tr>
            <td  height='20' class='isi_bukti'>Sarana Transportasi</td>
            <td class='isi_bukti'>: $row->transport  </td>
          </tr>   
                  <tr>
          <td  height='20' class='isi_bukti'>Beban Anggaran</td>
          <td class='isi_bukti'>: RP. ".number_format($row->bruto,0,",",".")."   </td>
        </tr>
        </tr>
        </table>
                    <tr>
                    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                    <tr>
                        <td width='24' align='center' class='header_laporan'>NO</td>
                        <td width='200' align='center' class='header_laporan'>URAIAN</td>
                        <td width='121' align='center' class='header_laporan'>%</td>
                        <td width='180' align='center' class='header_laporan'>HARI</td>
                        <td width='300' align='center' class='header_laporan'>TARIF</td>
                        <td width='300' align='center' class='header_laporan'>JUMLAH</td>
                        <td width='300' align='center' class='header_laporan'>KETERANGAN</td>
                    </tr>";
        $sql="select  a.no_spj,a.kode_lokasi,a.no_aju,a.nik,a.nu,a.uraian,a.persen,a.jumlah,a.satuan,a.tarif,a.total,a.keterangan
        from pd_spj_d a 
        where a.kode_lokasi='$row->kode_lokasi' and a.no_spj='$row->no_spj' 
        order by a.no_spj ";					 
		
        $rs1 = $dbLib->execute($sql);
        $j=1; $nilai=0;
        while ($row1 = $rs1->FetchNextObject($toupper=false))
            {
                $nilai+=$row1->total;
        echo "<tr>
                    <td class='isi_laporan' align='center'>$j</td>
                    <td class='isi_laporan'>$row1->uraian</td>
                    <td class='isi_laporan'>$row1->persen</td>
                    <td class='isi_laporan'>$row1->jumlah</td>
                    <td class='isi_laporan'>".number_format($row1->tarif,0,",",".")." </td>
                    <td class='isi_laporan'>".number_format($row1->total,0,",",".")." </td>
                    <td class='isi_laporan'>$row1->keterangan</td>
                </tr>";
                $j=$j+1;
            }   
        echo "<tr>
        <td colspan='5' align='center' class='isi_bukti'>Total</td>
        <td class='isi_bukti' align='right'>".number_format($nilai,0,",",".")."</td>
      </tr>
				</table></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>

            <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
            <tr>
                <td width='172' align='center'>&nbsp;</td>
                <td width='293' align='center'>&nbsp;</td>
                <td width='321'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
            </tr>
            <tr>
            <td align='center'>Pembuat Rincian</td>
            <td>&nbsp;</td>
            <td align='center'>Menyetujui/ Mengetahui</td>
            </tr>
            <tr>
                <td height='60'>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
            <td align='center'>$row->nama_buat</td>
            <td align='center'>$row->nama_app2</td>
                <td align='center'>$row->nama_app</td>
            </tr>
            <tr>
                <td align='center'>$row->jab_buat</td>
                <td align='center'>$row->jab2</td>
                <td align='center'>$row->jab1</td>
            </tr>
            </table></td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
    </table>   

    <tr>
    <table>
    <td align='center' class='judul_bukti'>TANDA TERIMA</td>
</tr>
</table>
<br>
<br>
            <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1' class='kotak'>
           
              <tr>
                <td   height='20' class='isi_bukti'>Sudah terima dari</td>
                <td class='isi_bukti'>: $row->pp </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Uang Sejumlah</td>
                <td class='isi_bukti'>: RP. ".number_format($row->bruto,0,",",".")." </td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Terbilang</td>
                <td class='isi_bukti'>: ".$AddOnLib->terbilang($row->bruto)."</td>
              </tr>
              <tr>
                <td  height='20' class='isi_bukti'>Untuk Biaya Perjalanan Dinas</td>
                <td class='isi_bukti'></td>
              </tr> 
                 <tr>
              <td  height='20' class='isi_bukti'><b>Catatan :</b></td>
              <td class='isi_bukti'></td>
            </tr>
            <tr>
            <td  height='20' class='isi_bukti'>Dana ditransfer ke rekening atas nama</td>
            <td class='isi_bukti'>: $row->nama_rek  </td>
          </tr>   
                  <tr>
          <td  height='20' class='isi_bukti'>Nomor Rekening</td>
          <td class='isi_bukti'>: $row->no_rek</td>
        </tr>
            </table></td>
          </tr>
<br>

            <tr>
                <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                    <td width='172' align='center'>&nbsp;</td>
                    <td width='293' align='center'>&nbsp;</td>
                    <td width='321'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td align='center'>Yang Menerima</td>
                    <td align='center'>Yang Membayarkan</td>
                </tr>
                <tr>
                    <td height='60'>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>&nbsp;</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>&nbsp;</td>
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
