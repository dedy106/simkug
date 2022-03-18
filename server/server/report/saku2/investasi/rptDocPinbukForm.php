<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptDocPinbukForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_kas)
from kas_m a
inner join inv_kas_add b on a.no_kas=b.no_kas and a.no_kas=b.no_kas
inner join inv_bank c on b.kode_bank=c.kode_bank
inner join karyawan d on b.nik_app1=d.nik
inner join karyawan e on b.nik_app1=e.nik
$this->filter ";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.no_kas, a.kode_lokasi,a.tanggal,a.no_dokumen, a.keterangan,a.nilai,  
	   c.nama as nama_bsumber,c.no_rek as rek_bsumber,c.nama_rek as nama_rek_bsumber,
	   b.p_yakes,b.p_mitra,b.no_fax,b.tgl_sepakat,b.tgl_pelaksana,b.nik_app1,b.nik_app2,
	   d.nama as nama_app1,e.nama as nama_app2,d.jabatan as jab_app1,e.jabatan as jab_app2
from kas_m a
inner join inv_kas_add b on a.no_kas=b.no_kas and a.no_kas=b.no_kas
inner join inv_bank c on b.kode_bank=c.kode_bank
inner join karyawan d on b.nik_app1=d.nik
inner join karyawan e on b.nik_app2=e.nik
$this->filter order by a.no_kas ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tanggal=substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6));
			$tgl_sepakat=substr($row->tgl_sepakat,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_sepakat),0,6));
			$tgl_pelaksana=substr($row->tgl_pelaksana,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_pelaksana),0,6));
			$nilai=number_format($row->nilai,0,",",".");
			
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='right' ><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='508'>&nbsp;</td>
            <td width='282' class='istyle17'>NOTA KONFIRMASI</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='15'>&nbsp;</td>
            <td width='140'>Nomor</td>
            <td width='645'>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/KU120/YAKES-20/2012 </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Kepada Yth </td>
            <td>: Pimpinan $row->nama_bank </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Fax No </td>
            <td>: $row->no_fax </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Dari</td>
            <td>: KABIDKUG YAKES-TELKOM </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Perihal</td>
            <td>: Pemindahbukuan </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>1.</td>
            <td colspan='2'>Sesuai kesepakatan / persetujuan per telepon : </td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td colspan='2'>Tanggal $tanggal antara $row->p_yakes dari Kantor Pusat YAKES TELKOM , dengan $row->p_mitra dari $row->nama_bsumber , mohon pemindahbukuan dana sebagai beikut : </td>
            </tr>
          <tr>
            <td width='23'>&nbsp;</td>
            <td width='140'>Dari</td>
            <td width='623'>: $row->nama_bsumber </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Nomor Rekening </td>
            <td>: $row->rek_bsumber </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Atas Nama</td>
            <td>: $row->nama_rek_bsumber </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Jumlah Dana </td>
            <td>: Rp.$nilai ,- ( diulang Rp.$nilai ,-) </td>
          </tr>
        </table></td>
      </tr>
     
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>&nbsp;</td>
            <td colspan='2'>Kepada</td>
          </tr>
		  <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>";
		  $sql="select a.nilai,a.keterangan,b.nama as nama_bank,b.no_rek,b.nama_rek
from kas_pb_d a
inner join inv_bank b on a.kode_bank=b.kode_bank 
where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'";
		$rs1 = $dbLib->execute($sql);
		  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai2=number_format($row1->nilai,0,",",".");
          echo "
          <tr>
            <td width='23'>&nbsp;</td>
            <td width='140'>Bank</td>
            <td width='623'>: $row1->nama_bank </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Nomor Rekening </td>
            <td>: $row1->no_rek </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Atas Nama</td>
            <td width='623'>: $row1->nama_rek </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Jumlah Dana </td>
            <td>: Rp.$nilai2 ,- ( diulang Rp.$nilai2 ,-)</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Untuk</td>
            <td>: $row->keterangan </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>";
		}
          echo "<tr>
            <td>&nbsp;</td>
            <td>Pelaksanaan</td>
            <td>: $tgl_pelaksana </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
     
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='23' align='center' valign='top'>4.</td>
            <td width='763'>Demikian harap maklum , dan terima kasih atas perhatian dan kerja sama yang diberikan. </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='10'>&nbsp;</td>
            <td height='70' colspan='4' valign='top'>Bandung, $tanggal </td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td width='186' align='center'>$row->nama_app1</td>
            <td width='297'>&nbsp;</td>
            <td width='202' align='center'>$row->nama_app2</td>
            <td width='83'>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td align='center'>$row->jab_app1</td>
            <td>&nbsp;</td>
            <td align='center'>$row->jab_app2</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
			echo "<br>";
			$i=$i+1;
		}
		
	
		echo "</div>";
		return "";
		
	}
	
}
?>
