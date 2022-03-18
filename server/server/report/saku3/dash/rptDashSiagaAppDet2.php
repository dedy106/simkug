<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashSiagaAppDet2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $jenis=$tmp[4];
        $box=$tmp[5];
        $key=$tmp[6];
        
        $AddOnLib=new server_util_AddOnLib();
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaAppDet','','$kode_lokasi|$periode|$kode_pp|$nik|$jenis|$box|$key');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                    <div class='col-md-12'>";
                    if(substr($box,0,1) == "a"){
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail RRA</h3>
                        </div>
                        <div class='box-body'>";
                    }else{
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-list-alt'></i>
                            <h3 class='box-title'>Detail PB</h3>
                        </div>
                        <div class='box-body'>";
                    }
                    switch($box){
                        case "k1" :
                        case "k2" :
                        case "k3" :
                        $title="Detail PB";
                        $sql = "select a.no_pb ,a.keterangan,a.nik_buat,b.nama as nama_buat,a.atensi as ref1,'Jakarta' as kota,tanggal,convert(varchar(20),a.tanggal,103) as tgl,
                        a.nilai,a.kurs,a.nilai,a.nilai_curr,d.nama as nama_curr,a.kode_curr,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,a.latar, a.strategis, a.bisnis, a.teknis, a.lain,a.nik_tahu,e.nama as nama_tahu, a.nik_sah,a.nik_ver,f.nama as nama_sah,g.nama as nama_ver,a.jenis,a.jab1,a.jab2,a.jab3,a.jab4
                        from gr_pb_m a
                        inner join karyawan b on a.nik_buat=b.nik
                        inner join pp c on a.kode_pp=c.kode_pp
                        inner join curr d on a.kode_curr=d.kode_curr
                        inner join karyawan e on a.nik_tahu=e.nik
                        left join karyawan f on a.nik_sah=f.nik
                        left join karyawan g on a.nik_ver=g.nik
                        where a.kode_lokasi='$kode_lokasi' and a.no_pb='$key' order by a.no_pb ";
		
                        $rs = $dbLib->execute($sql);	
                        $jum=$rs->recordcount();
                        $AddOnLib=new server_util_AddOnLib();
                        $path = $_SERVER["SCRIPT_NAME"];				
                        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
                        $pathfoto = $path . "image/gratika.jpg";
                        echo "<div align='center'>"; 
                        while ($row = $rs->FetchNextObject($toupper=false))
                        {
	
				        echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                        <tr>
                            <td align='center' class='judul_bukti'>JUSTIFIKASI</td>
                        </tr>
                        <tr>
                            <td align='center' class='judul_bukti'>KEBUTUHAN BARANG ATAU JASA</td>
                        </tr>
                        <tr>
                            <td align='center'  class='judul_bukti'>$row->no_pb</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                                <tr>
                                    <td width='29' align='center'>1</td>
                                    <td width='151'>Unit Kerja</td>
                                    <td width='606'>: $row->nama_pp </td>
                                </tr>
                                <tr>
                                    <td align='center'>2</td>
                                    <td>Jenis Anggaran</td>
                                    <td>: $row->jenis </td>
                                </tr>
                                <tr>
                                    <td align='center'>3</td>
                                    <td>Total Nilai</td>
                                    <td>: ".number_format($row->nilai,0,",",".")." </td>
                                </tr>
                                <tr>
                                    <td align='center'>&nbsp;</td>
                                    <td>Terbilang</td>
                                    <td>&nbsp;".$AddOnLib->terbilang($row->nilai)."</td>
                                </tr>
                                <tr>
                                    <td align='center'>4</td>
                                    <td>Kebutuhan</td>
                                    <td>: $row->keterangan</td>
                                </tr>
                                <tr>
                                    <td align='center'>5</td>
                                    <td>Saat Penggunaan</td>
                                    <td>: </td>
                                </tr>
                                </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                                <tr>
                                    <td width='30' align='center' class='header_laporan'>No</td>
                                    <td width='120' align='center' class='header_laporan'>No Akun </td>
                                    <td width='310' align='center' class='header_laporan'>Nama Akun </td>
                                    <td width='80' align='center' class='header_laporan'>Anggaran</td>
                                    <td width='80' align='center' class='header_laporan'>Nilai</td>
                                    <td width='80' align='center' class='header_laporan'>Saldo Anggaran</td>
                                </tr>";

                                $sql="select f.ref1,c.no_bukti,c.kode_akun,b.nama as nama_akun,a.nilai,isnull(d.kode_flag,'-') as kode_flag, 
                                case when b.jenis='Neraca' and isnull(d.kode_flag,'-')='-' then a.nilai else c.saldo end as saldo,
                                case when b.jenis='Neraca' and isnull(d.kode_flag,'-')='-' then 0 else c.saldo-a.nilai end as sisa 
                                from gr_pb_j a 
                                inner join gr_pb_m f on a.no_pb=f.no_pb and a.kode_lokasi=f.kode_lokasi
                                inner join angg_r c on f.no_pb=c.no_bukti and  a.kode_akun=c.kode_akun
                                inner join masakun b on c.kode_akun=b.kode_akun and c.kode_lokasi=b.kode_lokasi
                                left join flag_relasi d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi and d.kode_flag='006'
                                where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' and c.modul in ('AJU','BMHD','BYRBMHD')
                                order by a.no_urut ";
                    
                                $rs1 = $dbLib->execute($sql);
                                $i=1; $nilai=0;  $saldo=0; $sisa=0;
                                while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {
                                    $nilai+=$row1->nilai;
                                    $saldo+=$row1->saldo;
                                    $sisa+=$row1->sisa;
                                echo "<tr>
                                    <td class='isi_laporan' align='center'>$i</td>
                                    <td class='isi_laporan'>$row1->kode_akun</td>
                                    <td class='isi_laporan'>$row1->nama_akun</td>
                                    <td class='isi_laporan' align='right'>".number_format($row1->saldo,0,",",".")."</td>
                                    <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                                    <td class='isi_laporan' align='right'>".number_format($row1->sisa,0,",",".")."</td>
                                </tr>";
                                }
                     echo "</table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td width='29' align='center'>I</td>
                                <td width='761'>LATAR BELAKANG</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>$row->latar</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td align='center'>II</td>
                                <td>ASPEK STRATEGIS</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>$row->strategis</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td align='center'>III</td>
                                <td>ASPEK BISNIS</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>$row->bisnis</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td align='center'>IV</td>
                                <td>SPESIFIKASI TEKNIS</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>$row->teknis</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td align='center'>V</td>
                                <td>ASPEK LAIN</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>$row->lain</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td align='center'>VI</td>
                                <td>LAMPIRAN</td>
                            </tr>
                            <tr>
                                <td align='center'>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr>
                                <td>&nbsp;</td>
                                <td width='150' align='center' class='header_laporan'>NAMA / NIK</td>
                                <td width='150' align='center' class='header_laporan'>JABATAN</td>
                                <td width='150' align='center' class='header_laporan'>TANGGAL</td>
                                <td width='150' align='center' class='header_laporan'>TANDA TANGAN</td>
                            </tr>
                            <tr>
                                <td height='40' class='header_laporan'>DIBUAT OLEH</td>
                                <td align='center'>$row->nama_buat / $row->nik_buat</td>
                                <td align='center'>$row->jab1</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td height='40' class='header_laporan'>DIPERIKSA OLEH</td>
                                <td align='center'>$row->nama_tahu / $row->nik_tahu</td>
                                <td align='center'>$row->jab2</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td height='40' class='header_laporan'>VERIFIKASI ANGGARAN</td>
                                <td align='center'>$row->nama_ver / $row->nik_ver</td>
                                <td align='center'>$row->jab4</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td height='40' class='header_laporan'>DISAHKAN OLEH</td>
                                <td align='center'>$row->nama_sah / $row->nik_sah</td>
                                <td align='center'>$row->jab3</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                    
                            </table></td>
                        </tr>
                        </table>
                        <br>
                            <DIV style='page-break-after:always'></DIV>";
                        $sql = "select a.no_pb ,a.keterangan,a.nik_buat,b.nama as nama_buat,a.atensi as ref1,'Jakarta' as kota,tanggal,convert(varchar(20),a.tanggal,103) as tgl,
                        a.nilai,a.kurs,a.nilai,a.nilai_curr,d.nama as nama_curr,a.kode_curr,a.kode_pp,c.nama as nama_pp,a.kode_lokasi,
                        a.latar, a.strategis, a.bisnis, a.teknis, a.lain,a.nik_tahu,e.nama as nama_tahu,
                        isnull(f.saldo,0) as saldo,isnull(f.nilai,0) as nilai_gar
                        from gr_pb_m a
                        inner join karyawan b on a.nik_buat=b.nik
                        inner join pp c on a.kode_pp=c.kode_pp
                        inner join curr d on a.kode_curr=d.kode_curr
                        inner join karyawan e on a.nik_tahu=e.nik
                        left join (select no_bukti,kode_lokasi,sum(saldo) as saldo,sum(nilai) as nilai
                                from angg_r
                                group by no_bukti,kode_lokasi
                                )f on a.no_pb=f.no_bukti and a.kode_lokasi=f.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_pb='$key' order by a.no_pb ";
                        
                        $rs = $dbLib->execute($sql);
                        while ($row = $rs->FetchNextObject($toupper=false))
                        {
                            echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                        <tr>
                            <td align='center' class='judul_bukti'>FORM KEBUTUHAN BARANG / JASA</td>
                        </tr>
                        <tr>
                            <td align='center' class='judul_bukti'>(Pembelian dengan Cash &amp; Carry)</td>
                        </tr>
                        
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                                <tr>
                                    <td width='162'>Nomor Dokumen</td>
                                    <td width='628'>: $row->no_pb </td>
                                </tr>
                                <tr>
                                    <td>Unit Kerja</td>
                                    <td>: $row->nama_pp </td>
                                </tr>
                                <tr>
                                    <td>Nomor Akun</td>
                                    <td>: - </td>
                                </tr>
                                <tr>
                                    <td>Total Nilai Anggaran</td>
                                    <td>: ".number_format($saldo,0,",",".")." </td>
                                </tr>
                                <tr>
                                    <td>Saat Penggunaan</td>
                                    <td>: ".number_format($nilai,0,",",".")." </td>
                                </tr>
                                <tr>
                                    <td>Saldo Anggaran</td>
                                    <td>: ".number_format($sisa,0,",",".")." </td>
                                </tr>
                                </table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                            <tr>
                                <td width='29' align='center' class='header_laporan'>No</td>
                                <td width='340' align='center' class='header_laporan'>Nama Barang / Jasa</td>
                                <td width='115' align='center' class='header_laporan'>Satuan</td>
                                <td width='76' align='center' class='header_laporan'>Quantity</td>
                                <td width='101' align='center' class='header_laporan'>Harga Satuan</td>
                                <td width='125' align='center' class='header_laporan'>Jumlah Harga</td>
                            </tr>";
                            $sql="select a.no_pb,a.kode_lokasi,a.nama_brg,a.satuan,a.jumlah,a.harga from gr_pb_boq a
                            where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' 
                            order by a.nu ";
                    
                            $rs1 = $dbLib->execute($sql);
                            $i=1; $nilai=0; 
                            while ($row1 = $rs1->FetchNextObject($toupper=false))
                            {
                            echo "<tr>
                                <td class='isi_laporan' align='center'>$i</td>
                                <td class='isi_laporan'>$row1->nama_brg</td>
                                <td class='isi_laporan'>$row1->satuan</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->harga,0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($row1->jumlah*$row1->harga,0,",",".")."</td>
                            </tr>";
                                $i=$i+1;
                            }  
                            echo "</table></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Terbilang : ".$AddOnLib->terbilang($row->nilai)."</td>
                        </tr>
                        <tr>
                            <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                        </tr>
                        <tr>
                            <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                            <tr>
                                <td>Dibuat oleh,</td>
                                <td>Disetujui oleh,</td>
                            </tr>
                            <tr>
                                <td height='60'>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>$row->nama_buat</td>
                                <td>$row->nama_tahu</td>
                            </tr>
                            <tr>
                                <td>$row->nik_buat</td>
                                <td>$row->nik_tahu</td>
                            </tr>
                            </table></td>
                        </tr>
                        </table>
                        <br>
                            <DIV style='page-break-after:always'></DIV>";
                            }
                        
                        }
                        echo "</div>";   
                        break;                            
                        case "k4" :
                        case "k5" :
                        $sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,a.nama,a.alamat,
                        a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_ver,d.nama as nama_ver,cat_pajak,cat_bdh,
                        convert(varchar(20),a.tanggal,103) as tgl,f.kota, a.rek, a.jtran, a.bank, a.norek, a.alrek,a.no_po,a.no_dok,
                        convert(varchar(20),a.tgl_po,103) as tgl_po,convert(varchar(20),a.tgl_dok,103) as tgl_dok,isnull(e.pph,0) as pph,
                        a.nilai+isnull(e.pph,0)-isnull(g.ppn,0) as tagihan,isnull(g.ppn,0) as ppn,a.kode_curr,h.nama as nama_curr
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
                        where a.no_spb='$key' and a.kode_lokasi='$kode_lokasi'
                        order by a.no_spb";
                    
                        $rs = $dbLib->execute($sql);
                        $AddOnLib=new server_util_AddOnLib();
                        $path = $_SERVER["SCRIPT_NAME"];				
                        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
                        $pathfoto = $path . "image/gratika.jpg";
                        echo "<div align='center'>"; 
                        $row = $rs->FetchNextObject($toupper=false);
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
                                
                        echo "</div>";

                        break;
                        case "app0" :
                        case "app1" :
                        case "app2" :
                        case "app3" :
                        case "app4" :
                            
                        $sql = "select a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_pdrk,a.kode_lokasi,a.keterangan,a.nik_buat,b.nama as nama_buat,
                        a.nik_app1,c.nama as nama_setuju,substring(a.periode,1,4) as tahun,d.kota,a.tanggal,b.email
                        from rra_pdrk_m a
                        inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
                        inner join karyawan c on a.nik_app1=c.nik and a.kode_lokasi=c.kode_lokasi
                        inner join lokasi d on a.kode_lokasi=d.kode_lokasi
                        where a.kode_lokasi='$kode_lokasi' and a.no_pdrk='$key' order by a.no_pdrk  ";

                        $rs2 = $dbLib->execute($sql);
                        $row = $rs2->FetchNextObject(false);

                        echo"
                            <div class='row invoice-info'>
                                <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Periode
                                    </strong><br>
                                    <strong>
                                    Tanggal
                                    </strong><br>
                                    <strong>
                                    No Bukti
                                    </strong>
                                    <br>
                                    Keterangan
                                </address>
                                </div>
                                <div class='col-sm-4 invoice-col'>
                                    <address>
                                        <strong>
                                        $row->periode
                                        </strong><br>
                                        <strong>
                                        ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."
                                        </strong><br>
                                        <strong>
                                        $row->no_pdrk
                                        </strong>
                                        <br>
                                        $row->keterangan
                                    </address>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <!-- Table row -->
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                <table class='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th width='30' >NO</th>
                                        <th width='100' >KODE AKUN </th>
                                        <th width='200' >NAMA AKUN </th>
                                        <th width='60' >PERIODE</th>
                                        <th width='100' >DEBET</th>
                                        <th width='100' >KREDIT</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    $sql1="select a.kode_akun,a.periode,a.dc,a.nilai,
                                    b.nama as nama_akun,
                                    case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
                             from rra_pdrk_d a
                             inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                             where a.no_pdrk='$row->no_pdrk' and a.kode_lokasi='$row->kode_lokasi'
                             order by a.dc desc ";
                                     
                                    $rs1 = $dbLib->execute($sql1);
                                    $i=1;
                                    $tot_debet=0;
                                    $tot_kredit=0;
                                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                                    {
                                        $debet=number_format($row1->debet,0,',','.');
                                        $kredit=number_format($row1->kredit,0,',','.');
                                        $tot_debet=$tot_debet+$row1->debet;
                                        $tot_kredit=$tot_kredit+$row1->kredit;
                                    echo "<tr>
                                            <td>$i</td>
                                            <td >$row1->kode_akun</td>
                                            <td >$row1->nama_akun</td>
                                            <td >$row1->periode</td>
                                            <td align='right'>$debet</td>
                                            <td align='right'>$kredit</td>
                                        </tr>";
                                            $i=$i+1;
                                    }
                                    $tot_debet1=number_format($tot_debet,0,',','.');
                                    $tot_kredit1=number_format($tot_debet,0,',','.');
                                    echo "<tr>
                                            <td colspan='4'  align='right'><b>Total</b></td>
                                            <td  align='right'><b>$tot_debet1</b></td>
                                            <td  align='right'><b>$tot_kredit1</b></td>
                                        </tr>";

                                    echo"
                                    </tbody>
                                </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                            <div class='row'>
                               
                            </div>
                            <!-- /.row -->";
                        break;
                       
                    }
                  
                    // echo"
                    //     <div class='box-header with-border'>
                    //         <h3 class='box-title' style='margin-left: 10px;'>$title</h3>    
                    //     </div>
                    //     <div class='box-body'>
                    //         <div>
                    //         <table class='table no-margin' id='table-pengajuan'>
                    //             <thead>
                    //             <tr>
                    //             $thead
                    //             </tr>
                    //             </thead>
                    //             <tbody>
                    //             $tbody
                    //             </tbody>
                    //         </table>
                    //         </div>
                    //     </div>";

                    echo"
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"
            ";
        echo"</div>
            </div>
        </div>";

       

		echo "<script type='text/javascript'>
			var table2 = $('#table-pengajuan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '270px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 0, 'asc' ]]
				});
            table2.columns.adjust().draw();
             
			
			</script>
		";
        
		return "";
	}
	
}
?>
