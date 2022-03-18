<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dash_rptDashSiagaHris2CV extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $box=$tmp[4];
        $kunci=$tmp[5];
        $key=$tmp[6];
		
		$sql="select a.nik,a.kode_lokasi,a.kode_prov,b.nama as nama_prov,a.no_ktp,a.nama,a.tempat, 
    a.tgl_lahir,a.alamat,a.kota,a.kodepos,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah, 
    a.nik2,a.npwp,a.suku,a.sts_agama,c.nama as nama_agama,a.sts_didik,d.nama as nama_didik,
    a.foto,a.sts_pajak, a.tgl_nikah, a.tgl_masuk,a.kode_jab,
    a.kode_grade,a.kode_loker,a.kode_dir,a.kode_dept,a.sts_sdm,a.kode_vendor,a.sts_bank, 
    e.nama as nama_jab,f.nama as nama_grade,g.nama as nama_loker,h.nama as nama_dir,
    a.lembaga,a.asal_lamaran,a.cabang,a.no_rek,a.nama_rek,a.nip,a.flag_gaji,i.nama as nama_sdm,j.nama as nama_dept
    from gr_karyawan a 
    left join gr_prov b on a.kode_prov=b.kode_prov 
    left join gr_status_agama c on a.sts_agama=c.sts_agama and a.kode_lokasi = c.kode_lokasi 
    left join gr_strata d on a.kode_strata=d.kode_strata and a.kode_lokasi=d.kode_lokasi 
    left join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi = e.kode_lokasi 
    left join gr_grade f on a.kode_grade=f.kode_grade and a.kode_lokasi = f.kode_lokasi 
    left join gr_loker g on a.kode_loker=g.kode_loker and a.kode_lokasi = g.kode_lokasi 
    left join gr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi = h.kode_lokasi 
left join gr_status_sdm i on a.sts_sdm=i.sts_sdm and a.kode_lokasi=i.kode_lokasi
left join gr_dept j on a.kode_dept=j.kode_dept and a.kode_lokasi=j.kode_lokasi
        where a.kode_lokasi='$kode_lokasi'  and a.nik='$key' ";

        // echo $sql;

        $rsx=$dbLib->execute($sql);
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
    echo "<Body>";
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaHris2Det','','$kode_lokasi/$periode/$kode_pp/$nik/$box/$kunci');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";

        // echo "<div align='center'>"; 
        
		$row = $rsx->FetchNextObject(false);
		
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"serverApp.php"));		
        $pathfoto = $path . "media/".$row->foto;
echo "<table class='table table-bordered' >
  <tr>
    <td><table class='table'>
      <tr>
        <td align='center' style='font-size:14px;border-top:1px solid white;border-bottom:1px solid white'><b>CURICULUM VITAE KARYAWAN</b> </td>
      </tr>
      <tr>
        <td><table class='table table-striped table-condensed'>
          <tr>
            <th width='154' >Nama</th>
            <td width='374' >: $row->nama </td>
            <td style='background:white' width='162' rowspan='10' align='left' valign='top'><img src='$pathfoto' width='160' height='180' /></td>
          </tr>
          <tr>
            <th >NIK</th>
            <td >: $row->nik </td>
            </tr>
          <tr>
            <th >Gender</th>
            <td >: $row->sex </td>
            </tr>
          <tr>
            <th >Agama</th>
            <td >: $row->nama_agama </td>
            </tr>
          <tr>
            <th >Tempat , Tanggal Lahir</th>
            <td >: $row->tempat , $row->tgl_lahir</td>
            </tr>
          <tr>
            <th >Pendidikan</th>
            <td >: $row->nama_didik - $row->nama_jur</td>
            </tr>
          <tr>
            <th >No KTP </th>
            <td >: $row->no_ktp </td>
            </tr>
          <tr>
            <th >Status Pajak </th>
            <td >: $row->sts_pajak </td>
            </tr>
          <tr>
            <th >No NPWP </th>
            <td >: $row->npwp </td>
            </tr>
          <tr>
            <th >Tanggal Nikah</th>
            <td >: $row->tgl_nikah </td>
            </tr>
          <tr>
            <th >Alamat</th>
            <td >: $row->alamat </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th>Kota</th>
            <td>: $row->nama_kota </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th >Propinsi</th>
            <td >: $row->nama_prov </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th >No Telp </th>
            <td >: $row->no_telp </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th >No HP </th>
            <td >: $row->no_hp </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th >Email</th>
            <td >: $row->email </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th >Golongan Darah </th>
            <td >: $row->gol_darah </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th >Suku</th>
            <td >: $row->suku </td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <th style='border-top:1px solid white;border-bottom:1px solid white' >POSISI SEKARANG </th>
      </tr>
      <tr>
        <td><table class='table table-striped table-condensed'>
          <tr>
            <th width='154' >Tanggal Masuk </th>
            <td width='536' >: $row->tgl_masuk</td>
            </tr>
          <tr>
            <th >Jabatan</th>
            <td >: $row->nama_jab</td>
            </tr>
          <tr>
            <th >Grade</th>
            <td >: $row->kode_grade </td>
            </tr>
          <tr>
            <th >Lokasi Kerja </th>
            <td >: $row->nama_loker </td>
            </tr>
          <tr>
            <th >Direktorat</th>
            <td >: $row->nama_dir </td>
            </tr>
          <tr>
            <th >Departemen</th>
            <td >: $row->nama_dept </td>
            </tr>
          <tr>
            <th >Status SDM </th>
            <td >: $row->nama_sdm</td>
            </tr>
          
        </table></td>
      </tr>
      <tr>";
      //testing
    
      echo"
      <tr>
        <th style='border-top:1px solid white;border-bottom:1px solid white' >DATA KELUARGA </th>
      </tr>
      <tr>
        <td><table class='table table-bordered table-striped table-condensed'>
          <thead><tr >
            <th width='60' >Status</th>
            <th width='165' >Nama</th>
            <th width='49' >Gender</th>
            <th width='121' >Tempat</th>
            <th width='85' >Tgl Lahir </th>
            <th width='142' >Institusi</th>
            <th width='68' >Status</th>
          </tr>
          </thead>
          <tbody>";
          $sql1="select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi,
          a.no_telp,a.nik2,a.alamat,a.kota,a.kodepos,a.kode_prov,a.flag_hidup,a.flag_kerja,a.flag_tanggung,a.flag_anak 
          from gr_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi 
          where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi'";
          $rs1 = $dbLib->execute($sql1);
          $tot_pot=0;
          while ($row1 = $rs1->FetchNextObject($toupper=false))
          {
          echo "<tr>
              <td  >$row1->nama_sts</td>
              <td  >$row1->nama</td>
              <td  align='center' >$row1->sex</td>
              <td  >$row1->tempat</td>
              <td  >$row1->tgl_lahir</td>
              <td  >$row1->institusi</td>
              <td  >$row1->flag_tanggung</td>
            </tr>";
		      }  
        echo "</tbody></table></td>";
    
    echo"    
	  <tr>
        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT KEDINASAN </th>
      </tr>
	   <tr>
        <td><table class='table table-bordered table-striped table-condensed'>
          <thead><tr >
            <th width='60' >Tgl SK </th>
            <th width='120' >No SK </th>
          	<th width='400' >Keterangan</th>
          </tr>
          </thead>
          <tbody>";

          $sql1="select a.nik,a.no_sk,h.nama as ket_sk,a.tgl_awal
							from gr_dinas a 
							inner join gr_reason h on a.kode_reason=h.kode_reason and a.kode_lokasi=h.kode_lokasi 
						where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' and a.flag_form='RDINAS' order by a.tgl_awal desc";
			
          $rs2 = $dbLib->execute($sql1);
          $tot_pot=0;
          while ($row2 = $rs2->FetchNextObject($toupper=false))
          {
              echo "<tr >
                  <td align='center' >$row2->tgl_awal</td>
                  <td >$row2->no_sk</td>
                  <td >$row2->ket_sk</td>
                </tr>";
          } 
		  echo "</tbody></table></td>
      </tr>
      <tr>
        <th style='border-top:1px solid white;border-bottom:1px solid white' >RIWAYAT PELATIHAN </th>
      </tr>
      <tr>
        <td><table class='table table-bordered table-striped table-condensed'>
          <thead><tr >
            <th width='200' >Nama Pelatihan</th>
			      <th width='60' >Status</th>
            <th width='150' >Penyelenggara</th>
            <th width='100' >Kota</td>
            <th width='100' >Sertifikat</th>
            <th width='50' >Lama</td>
            <th width='60' >Tgl Mulai</th>
			      <th width='60' >Tgl Selesai</th>
          </tr>
          </thead>
          <tbody>";
          $sql1="select a.nik,b.nama,d.nama as sts_latih,a.nama as lth,a.lama,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.panitia,f.nama as kota,g.nama as dana, 
                    e.nama as sertifikat,a.masa_berlaku,a.jumlah 
                from gr_rwylatih a 
                inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
                inner join gr_status_latih d on a.sts_latih=d.sts_latih and a.kode_lokasi=d.kode_lokasi 
                inner join gr_status_sertifikat e on a.sts_sertifikat=e.sts_sertifikat and a.kode_lokasi=e.kode_lokasi 
                inner join gr_kota f on a.kode_kota=f.kode_kota and a.kode_lokasi=f.kode_lokasi 
                inner join gr_status_dana g on a.sts_dana=g.sts_dana and a.kode_lokasi=g.kode_lokasi	
          where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by a.tgl_mulai desc";
        $rs3 = $dbLib->execute($sql1);
        $tot_pot=0;
        while ($row3 = $rs3->FetchNextObject($toupper=false))
        {
            echo "<tr>
                <td >$row3->nama</td>
                <td >$row3->sts_latih</td>
                <td >$row3->panitia</td>
                <td >$row3->kota</td>
                <td >$row3->sertifikat</td>
                <td >$row3->lama</td>
                <td >$row3->tgl_mulai</td>
                <td >$row3->tgl_selesai</td>
              </tr>";
        }  
        echo "</tbody></table></td>
      </tr>
	  <tr>
        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT PENDIDIKAN </th>
      </tr>
      <tr>
        <td><table class='table table-bordered table-striped table-condensed'>
          <thead>
          <tr>
            <th width='150' >Strata</th>
			      <th width='150' >Jurusan</th>
            <th width='200' >Institusi</th>
            <th width='50' >Tahun</th>
          </tr>
          </thead>
          <tbody>";
            $sql1="select a.nik,b.nama,c.nama as strata,d.nama as jur,a.institusi,a.tahun,a.keterangan,a.dana 
                  from gr_rwypddk a 
                  inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
                  inner join gr_strata c on a.kode_strata=c.kode_strata and a.kode_lokasi=c.kode_lokasi 
                  inner join gr_jur d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi 
      where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by a.tahun desc";
          $rs4 = $dbLib->execute($sql1);
          $tot_pot=0;
          while ($row4 = $rs4->FetchNextObject($toupper=false))
          {
              echo "<tr>
                  <td >$row4->strata</td>
                  <td >$row4->jur</td>
                  <td >$row4->institusi</td>
                  <td >$row4->tahun</td>
                
                </tr>";
          }  
        echo "</tbody></table></td>
      </tr>
	   <tr>
        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT PENGHARGAAN </th>
      </tr>
      <tr>
        <td><table class='table table-bordered table-striped table-condensed'>
          <thead>
            <tr>
            <th width='150' >No SK</th>
		      	<th width='60' >Tanggal</th>
            <th width='300' >Keterangan</th>
            </tr>
          </thead>
          <tbody>";
          $sql1="select a.nik,b.nama,a.no_sk,date_format(a.tanggal,'%d/%m/%Y') as tgl_awal_sk,a.keterangan,a.nilai 
                from gr_rwyharga a 
                inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi  
          where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by a.tanggal desc";
          $rs5 = $dbLib->execute($sql1);
          $tot_pot=0;
          while ($row5 = $rs5->FetchNextObject($toupper=false))
          {
              echo "<tr>
                  <td >$row5->no_sk</td>
                  <td >$row5->tgl_awal_sk</td>
                  <td >$row5->keterangan</td>
                </tr>";
          }  
        echo "</tbody></table></td>
      </tr>
	 
	   <tr>
        <th style='border-top:1px solid white;border-bottom:1px solid white'>RIWAYAT SANKSI </th>
      </tr>
      <tr>
        <td><table class='table table-bordered table-striped table-condensed'>
          <thead>
            <tr>
              <th width='150' >No SK</th>
              <th width='200' >Sanksi</th>
              <th width='40' >Lama</th>
              <th width='60' >Tgl Berlaku</th>
              <th width='60' >Tgl Berakhir</th>
              <th width='200' >Keterangan</th>
            </tr>
          </thead>
          <tbody>";
          $sql1="select a.nik,b.nama,a.no_sk,d.nama as snk,a.lama,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.keterangan
              from gr_rwysanksi a 
              inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
              inner join gr_status_sanksi d on a.sts_sanksi=d.sts_sanksi and a.kode_lokasi=d.kode_lokasi
          where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi' order by a.tgl_mulai desc";
          $rs6 = $dbLib->execute($sql1);
          $tot_pot=0;
          while ($row6 = $rs6->FetchNextObject($toupper=false))
          {
              echo "<tr>
                  <td >$row6->no_sk</td>
                  <td >$row6->snk</td>
                  <td  align='center'>$row6->lama</td>
                  <td >$row6->tgl_mulai</td>
                  <td >$row6->tgl_selesai</td>
                  <td >$row6->keterangan</td>
                </tr>";
          }  
        echo "</tbody></table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='left' style='font-size:9;'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table>";	 
			
        echo "</div>";
        echo "</div>
        </div";
        echo"</body>";
			
		return "";
	}
	
}
?>
  
