<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_rptSpbFormEmail extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}

    function getToken($url,$uname, $pwd){
        try{
          
          // if( ini_get('allow_url_fopen') ) {
          //   die('allow_url_fopen is enabled. file_get_contents should work well');
          // } else {
          //   die('allow_url_fopen is disabled. file_get_contents would not work');
          // }
            $datasso = [];
            $optsDataLogin = array(
              'http' => array( 
                'method' => 'POST', 
                'header' => 'Content-type: application/x-www-form-urlencoded', 
                'content' => 'nik=' . $uname.'&password='. $pwd 
                )
            ); 
            
            $contextDataLogin = stream_context_create($optsDataLogin); 
            $usersso = file_get_contents($url, false, $contextDataLogin); 
            $datasso = json_decode($usersso,true);
            $success = array(
              'message' => 'Sukses',
              'context' => $contextDataLogin,
              'data' => $datasso,
              'status' => true
            );
        } catch (Exception $e) {
          $success = array(
            'message' => $e->getMessage(),
            'data' => $datasso,
            'status' => false
          );
        }
        return $success;
          
    }
    
    function sendEmail($url,$token,$content){
        try{
            $optsEmail = array(
              'http' => array( 
                'method' => 'POST', 
                'header' => array(
                  'Authorization: Bearer '.$token,
                  'Content-type: application/x-www-form-urlencoded'
                ), 
                'content' => $content
              )
            ); 
            
            $contextEmail = stream_context_create($optsEmail); 
            $res = file_get_contents($url, false, $contextEmail); 
            $datares = json_decode($res,true);
            $success = array(
              'message' => 'Sukses',
              'context' => $contextEmail,
              'data' => $datares,
              'status' => true
            );
        } catch (Exception $e) {
          $success = array(
            'message' => $e->getMessage(),
            'data' => $datares,
            'status' => false
          );
        }
        return $success;
          
    }

    function sendPesan($url,$token,$no_pesan){
      try{
          $optsPesan = array(
            'http' => array( 
              'method' => 'POST', 
              'header' => array(
                'Authorization: Bearer '.$token,
                'Content-type: application/x-www-form-urlencoded'
              ), 
              'content' => 'no_pesan='.$no_pesan
            )
          ); 
          
          $contextPesan = stream_context_create($optsPesan); 
          $res = file_get_contents($url, false, $contextPesan); 
          $datares = json_decode($res,true);
          $success = array(
            'message' => 'Sukses',
            'context' => $contextPesan,
            'data' => $datares,
            'status' => true
          );
      } catch (Exception $e) {
        $success = array(
          'message' => $e->getMessage(),
          'data' => $datares,
          'status' => false
        );
      }
      return $success;
        
    }
	
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter=$tmp[0];
        $nik = $tmp[1];
        $pass = $tmp[2];
        $email = $tmp[3];
        $no_pesan = $tmp[4];
        if($_SERVER['SERVER_NAME'] == "devsiaga.simkug.com"){
          $url = "https://devapi.simkug.com/api/siaga-auth/login";
          $url2 = "https://devapi.simkug.com/api/siaga-trans/send-email-saku3";
          $url3 = "https://devapi.simkug.com/api/siaga-auth/notif-approval";
          
        }else{
          $url = "https://api.simkug.com/api/siaga-auth/login";
          $url2 = "https://api.simkug.com/api/siaga-trans/send-email-saku3";
          $url3 = "https://api.simkug.com/api/siaga-auth/notif-approval";
        }
        // echo "NIk:".$nik;
        // echo "Pass:".$pass;
        // echo "Email".$email;
        $res = $this->getToken($url,$nik,$pass);
        $token = isset($res['data']['token']) ? $res['data']['token'] : '-';
        // var_dump('Token:'.$token);

		$sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,a.nama,a.alamat,
       a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_ver,d.nama as nama_ver,cat_pajak,cat_bdh,
	   convert(varchar(20),a.tanggal,103) as tgl,f.kota, a.rek, a.jtran, a.bank, a.norek, a.alrek,a.no_po,a.no_dok,
     convert(varchar(20),a.tgl_po,103) as tgl_po,convert(varchar(20),a.tgl_dok,103) as tgl_dok,isnull(e.pph,0) as pph,
     a.nilai+isnull(e.pph,0)-isnull(g.ppn,0) as tagihan,isnull(g.ppn,0) as ppn,a.kode_curr,h.nama as nama_curr,isnull(i.nik,'-') as nik_kirim,isnull(j.email,'-') as email_kirim
from gr_spb2_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_ver=d.nik and a.kode_lokasi=d.kode_lokasi 
inner join curr h on a.kode_curr=h.kode_curr
left join (select b.no_spb,a.kode_lokasi,sum(a.nilai) as pph
          from gr_beban_j a
		      inner join gr_beban_m b on a.no_beban=b.no_beban and a.kode_lokasi=b.kode_lokasi
          where a.kode_akun='2103.03'
          group by b.no_spb,a.kode_lokasi
          )	e	on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi
left join (select b.no_spb,a.kode_lokasi,sum(a.nilai) as ppn
          from gr_beban_j a
		      inner join gr_beban_m b on a.no_beban=b.no_beban and a.kode_lokasi=b.kode_lokasi
          where a.kode_akun='1107.07'
          group by b.no_spb,a.kode_lokasi
          )	g	on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
left join apv_flow i on a.no_spb=i.no_bukti and a.kode_lokasi=i.kode_lokasi and i.status=1
left join karyawan j on i.nik=j.nik and i.kode_lokasi=j.kode_lokasi 
          $this->filter
          order by a.no_spb";
   
	  $rs = $dbLib->execute($sql);
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
    if($no_pesan != ""){
        $resPesan = $this->sendPesan($url3,$token,$no_pesan);
    }
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $email_kirim = ($email == "" ? $row->email_kirim : $email);
            // var_dump('Email:'.$email_kirim);
            if($email_kirim != ""){
                $content = 'no_aju='.$row->no_spb.'&email_kirim='.$email_kirim.'&nik_kirim='.$row->nik_kirim.'&jenis=SPB&judul=Pengajuan SPB Nomor: '.$row->no_spb.' menunggu approval anda';
                $resEmail = $this->sendEmail($url2,$token,$content);
                // var_dump($resEmail);
            }

			if ($row->kode_curr=="IDR")
			{
				$nilai=$AddOnLib->terbilang($row->nilai);
				$kode_curr="Rp ";
			}
			else
			{
				$nilai=$AddOnLib->terbilang_curr($row->nilai,$row->nama_curr);
				$kode_curr=$row->kode_curr;
			} 
			echo	"<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='146'><img src=$pathfoto width='80' height='99' /></td>
        <td width='640' align='center' class='istyle17'>SURAT PERINTAH BAYAR</td>
      </tr>
      <tr>
        <td colspan='2' align='center'>DIREKTORAT KEUANGAN</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='158'>No. PO </td>
        <td width='182'>: $row->no_po</td>
      </tr>
      <tr>
        <td>Tgl. PO </td>
        <td>: $row->tgl_po</td>
      </tr>
      <tr>
        <td>No./Tgl BA/Log TR </td>
        <td>: $row->no_ba / $row->tgl_ba</td>
      </tr>
      <tr>
        <td>No Dokumen </td>
        <td>: $row->no_dok</td>
      </tr>
      <tr>
        <td>No. Ref. Dokumen </td>
        <td>: $row->no_ref</td>
      </tr>
      <tr>
        <td>Tgl. Dok </td>
        <td>: $row->tgl_dok</td>
      </tr>
      <tr>
        <td>Kode Perkiraan </td>
        <td>: -</td>
      </tr>
      <tr>
        <td>Kode Lokasi </td>
        <td>: -</td>
      </tr>
      <tr>
        <td>Cost Centre </td>
        <td>: -</td>
      </tr>
    </table></td>
    <td align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>No. SPB </td>
        <td width='182'>: $row->no_spb</td>
      </tr>
      <tr>
        <td>Tgl. SPB </td>
        <td>: $row->tgl</td>
      </tr>
      <tr>
        <td>No./Tgl. PRPK </td>
        <td>: -</td>
      </tr>
      <tr>
        <td>No. DRK/TRIW </td>
        <td>: -</td>
      </tr>
      <tr>
        <td>Keg. Menurut DRK </td>
        <td>: -</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>:</td>
      </tr>
      <tr>
        <td>Beban Angg Thn </td>
        <td>: $row->tahun</td>
      </tr>
      <tr>
        <td>Rekening </td>
        <td>:</td>
      </tr>
      <tr>
        <td>Jenis Transaksi </td>
        <td>:</td>
      </tr>
    </table></td>
  </tr>
  <tr align='left'>
    <td colspan='2'><table width='400' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='23'>&nbsp;</td>
        <td width='367'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Dokumen Penagihan disahkan oleh</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Mgr. Finanace/GM Fin. &amp; Acc.</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='60' valign='bottom'>$row->nama_bdh</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2'><table width='750' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='25'>&nbsp;</td>
        <td width='178'>Harap dibayarkan :<br></td>
        <td width='220'>&nbsp;</td>
        <td width='309'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Sebesar </td>
        <td colspan='2'>: ".number_format($row->nilai,0,",",".")."</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Terbilang </td>
        <td colspan='2'>: $nilai</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Kepada </td>
        <td colspan='2'>: $row->nama</td>
       </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Alamat </td>
        <td colspan='2'>: $row->alamat</td>
       </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Bank </td>
        <td colspan='2'>: $row->bank</td>
     </tr>
      <tr>
        <td>&nbsp;</td>
        <td>No. Rekening </td>
        <td colspan='2'>: $row->norek</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Alamat Bank </td>
        <td colspan='2'>: $row->alamat</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Untuk Pembayaran </td>
        <td colspan='2'>: $row->keterangan</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>GM Fin. &amp; Acc. / Dir. Adm. &amp; Keu.</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td height='60' valign='bottom'>$row->nama_ver</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='158'>Catatan Pembayaran: </td>
        <td width='182'>:</td>
      </tr>
      <tr>
        <td>JUMLAH TAGIHAN </td>
        <td>: $kode_curr ".number_format($row->tagihan,0,",",".")." </td>
      </tr>
      <tr>
        <td>PPN</td>
        <td>: $kode_curr ".number_format($row->ppn,0,",",".")." </td>
      </tr>
      <tr>
        <td>          PPh </td>
        <td>: $kode_curr ".number_format($row->pph,0,",",".")."</td>
      </tr>
      <tr>
        <td>SubTotal (a) </td>
         <td>: $kode_curr ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td>Potongan lain: </td>
        <td>:</td>
      </tr>
      <tr>
        <td>Jumlah Potongan lain (b) </td>
        <td>: $kode_curr 0</td>
      </tr>
      <tr>
        <td>Jumlah dibayarkan (a-b) </td>
        <td>: $kode_curr ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td></td>
      </tr>
    </table></td>
    <td align='center' valign='top'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>Catatan Pembayaran </td>
        </tr>
      <tr>
        <td colspan='2'>Telah dibayar uang sejumlah : $row->kode_curr . ".number_format($row->nilai,0,",",".")." </td>
        </tr>
      <tr>
        <td width='68' valign='top'>Terbilang :</td>
        <td width='272' valign='top'>$nilai</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
      	<td colspan='2'>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='60' valign='top'>&nbsp;&nbsp; &nbsp;Catatan Perpajakan :  &nbsp;$row->cat_pajak</td>
    <td valign='top'>&nbsp;&nbsp;&nbsp;&nbsp;Catatan Perbendaharaan :  &nbsp;$row->cat_bdh</td>
  </tr>
</table>
<br><DIV style='page-break-after:always'></DIV>
";
		
		}
		echo "</div>";
		return "";
	}
}
?>