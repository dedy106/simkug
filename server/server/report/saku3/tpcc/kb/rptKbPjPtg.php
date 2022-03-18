<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tpcc_kb_rptKbPjPtg extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
        $filter2=$tmp[0];
        $periode=$tmp[1];
        $tampil=$tmp[2];

        if ($tampil == "Transaksi"){
		
            $sql = "SELECT a.no_ptg, a.no_pj, a.no_kas, a.no_dokumen, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.catatan, a.akun_pj,b.nama as nama_pj, a.akun_kas,f.nama as nama_kas, a.nik_buat, c.nama as nama_buat, a.nik_setuju,d.nama as nama_setuju, a.kode_pp,e.nama as nama_pp,a.kode_drk,
            g.nilai as nilai_pj,a.nilai, a.nilai_kas 
            FROM ptg_m a 
            inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
            inner join karyawan c on a.nik_buat=c.nik 
            inner join karyawan d on a.nik_setuju=d.nik 
            inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi 
            left join masakun f on a.akun_kas=f.kode_akun and a.kode_lokasi=f.kode_lokasi 
            inner join panjar_m g on a.no_pj=g.no_pj and a.kode_lokasi=g.kode_lokasi 
            $this->filter order by a.no_ptg";

            // echo $sql;

            $header = array("No PTG","No Panjar","No Kas","No Dokumen","Tanggal","Keterangan","Catatan","Akun Panjar","Nama Akun Panjar","Akun Kas","Nama Akun Kas","Nik Pembuat","Nama Pembuat","Nik Setuju","Nama Setuju","Kode PP","Nama PP","Kode DRK","Nilai Panjar","Nilai Ptg","Nilai Kas");

            $width = array(80,80,80,80,60,200,150,80,150,80,150,60,150,60,150,60,150,60,80,80,80);

        }else{
            $sql = "select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
            from trans_j a  
            inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
            inner join trans_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi $filter2 and c.form='PTGDIR' 
            order by a.periode,a.no_bukti,a.dc desc  "; 

            $width=array(80,120,50,80,200,60,60,60,250,90,90);

            $header = array("No Bukti","No Dokumen","Tanggal","Kode Akun","Nama Akun","Kode PP","Kode DRK","Modul","Keterangan","Debet","Kredit");
			
        }
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
        echo $AddOnLib->judul_laporan("pertanggungan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));

		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
        <td width='30'  align='center' class='header_laporan'>No</td>";

        for ($h=0;$h<count($header);$h++){
            echo "<td width='".$width[$h]."'  align='center' class='header_laporan'>".$header[$h]."</td>";
        }
        echo"
        </tr>  ";
      
        if($tampil == "Transaksi"){

            $nilaipj=0;$nilai=0;$nilaikas=0;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $nilai=$nilai+$row->nilai;
                $nilaipj=$nilaipj+$row->nilai_pj;
                $nilaikas=$nilaikas+$row->nilai_kas;

                echo "<tr >
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>".$row->no_ptg."</td>
                <td class='isi_laporan'>".$row->no_pj."</td>
                <td class='isi_laporan'>".$row->no_kas."</td>
                <td class='isi_laporan'>".$row->no_dokumen."</td>
                <td class='isi_laporan'>".$row->tanggal."</td>
                <td class='isi_laporan'>".$row->keterangan."</td>
                <td class='isi_laporan'>".$row->catatan."</td>
                <td class='isi_laporan'>".$row->akun_pj."</td>
                <td class='isi_laporan'>".$row->nama_pj."</td>
                <td class='isi_laporan'>".$row->akun_kas."</td>
                <td class='isi_laporan'>".$row->nama_kas."</td>
                <td class='isi_laporan'>".$row->nik_buat."</td>
                <td class='isi_laporan'>".$row->nama_buat."</td>
                <td class='isi_laporan'>".$row->nik_setuju."</td>
                <td class='isi_laporan'>".$row->nama_setuju."</td>
                <td class='isi_laporan'>".$row->kode_pp."</td>
                <td class='isi_laporan'>".$row->nama_pp."</td> 
                <td class='isi_laporan'>".$row->kode_drk."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai_pj,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
                </tr>";
                $i=$i+1;
            }

            echo "<tr >
            <td class='isi_laporan' align='center' colspan='19'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($nilaipj,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($nilaikas,0,",",".")."</td>
            </tr>";
        }
        
        else{

            $debet=0;$kredit=0;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $debet=$debet+$row->debet;
                $kredit=$kredit+$row->kredit;
                echo "<tr >
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>".$row->no_bukti."</td>
                <td class='isi_laporan'>".$row->no_dokumen."</td>
                <td class='isi_laporan'>".$row->tanggal."</td>
                <td class='isi_laporan'>".$row->kode_akun."</td>
                <td class='isi_laporan'>".$row->nama."</td>
                <td class='isi_laporan'>".$row->kode_pp."</td>
                <td class='isi_laporan'>".$row->kode_drk."</td>
                <td class='isi_laporan'>".$row->modul."</td>
                <td class='isi_laporan'>".$row->keterangan."</td>
                <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
                </tr>";
                $i=$i+1;
            }

            echo "<tr >
            <td class='isi_laporan' align='center' colspan='10'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($debet,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
            </tr>";
        }
       
		
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
  
