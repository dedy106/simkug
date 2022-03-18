<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tpcc_kb_rptKbPjCair extends server_report_basic
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
		
            $sql = "select a.no_pj, a.no_kas, a.no_dokumen, date_format(a.tanggal,'%d/%m/%Y') as tanggal, date_format(a.due_date,'%d/%m/%Y') as due_date, a.keterangan, a.catatan, a.akun_pj,b.nama as nama_akun, a.nik_pengaju,c.nama as nama_pengaju ,a.nik_setuju,d.nama as nama_setuju,  a.kode_pp,e.nama as nama_pp,a.kode_drk,a.nilai, a.nilai_pot 
            from panjar_m a 
            inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
            inner join karyawan c on a.nik_pengaju=c.nik 
            inner join karyawan d on a.nik_setuju=d.nik 
            inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi 
            $this->filter order by a.no_pj ";

            $header = array("No Panjar","No Kas","No Dokumen","Tanggal","Due Date","Keterangan","Catatan","Akun Panjar","Nama Akun","Nik Pengaju","Nama Pengaju","Nik Setuju","Nama Setuju","Kode PP","Nama PP","Kode DRK","Nilai","Potongan");

            $width = array(80,80,80,60,60,200,150,80,150,60,150,60,150,60,150,60,80,80);

            // $column = array("no_pj", "no_kas","dokumen", "tanggal", "due_date","keterangan", "catatan", "akun_pj","nama_akun", "nik_pengaju","nama_pengaju" ,"nik_setuju","nama_setuju","kode_pp", "nama_pp","kode_drk","nilai", "nilai_pot" );

        }else{
            $sql = "select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.modul,a.keterangan, 
            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit from trans_j a  
            inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
            inner join trans_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi $filter2 and c.form='PJCAIR' 
            order by a.periode,a.no_bukti,a.dc desc  ";

            $width=array(80,120,50,80,200,60,60,60,250,90,90);

            $header = array("No Bukti","No Dokumen","Tanggal","Kode Akun","Nama Akun","Kode PP","Kode DRK","Modul","Keterangan","Debet","Kredit");

            // $column = array("no_bukti","no_dokumen","tanggal","kode_akun","nama","kode_pp","kode_drk","modul","keterangan", "debet","kredit");
			
        }
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
        echo $AddOnLib->judul_laporan("pencairan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));

		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
        <td width='30'  align='center' class='header_laporan'>No</td>";

        for ($h=0;$h<count($header);$h++){
            echo "<td width='".$width[$h]."'  align='center' class='header_laporan'>".$header[$h]."</td>";
        }
        echo"
        </tr>  ";
      
        if($tampil == "Transaksi"){

            $nilai=0;$nilai_pot=0;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $nilai=$nilai+$row->nilai;
                $nilai_pot=$nilai_pot+$row->nilai_pot;
                echo "<tr >
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>".$row->no_pj."</td>
                <td class='isi_laporan'>".$row->no_kas."</td>
                <td class='isi_laporan'>".$row->no_dokumen."</td>
                <td class='isi_laporan'>".$row->tanggal."</td>
                <td class='isi_laporan'>".$row->due_date."</td>
                <td class='isi_laporan'>".$row->catatan."</td>
                <td class='isi_laporan'>".$row->keterangan."</td>
                <td class='isi_laporan'>".$row->akun_pj."</td>
                <td class='isi_laporan'>".$row->nama_akun."</td>
                <td class='isi_laporan'>".$row->nik_pengaju."</td>
                <td class='isi_laporan'>".$row->nama_pengaju."</td>
                <td class='isi_laporan'>".$row->nik_setuju."</td>
                <td class='isi_laporan'>".$row->nama_setuju."</td>
                <td class='isi_laporan'>".$row->kode_pp."</td>
                <td class='isi_laporan'>".$row->nama_pp."</td> 
                <td class='isi_laporan'>".$row->kode_drk."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai_pot,0,",",".")."</td>
                </tr>";
                $i=$i+1;
            }

            echo "<tr >
            <td class='isi_laporan' align='center' colspan='17'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($nilai_pot,0,",",".")."</td>
            </tr>";
        }
        
        else{

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
  
