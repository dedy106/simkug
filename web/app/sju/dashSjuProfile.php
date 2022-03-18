<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

	$server=$_SERVER['SERVER_NAME'];

    // echo $server;

    echo "
        <div id='dash_page_profile'>
            <div class='row'>
                <div class='col-md-12'>
                    <div class='box-header'>
                        <a href='#' class='btn btn-primary pull-right'>
                            <i class='fa fa-pencil'></i> Ubah Password
                        </a>
                    </div>
                    <div class='box box-warning'>
                        <div class='box-header'>
                            <i class='fa fa-user'></i> Profile
                        </div>
                        <div class='box-body pad sai-container-overflow'>
                            <div id='dbsju-profile-content'>
                            </table>";
                            $rs = execute("select a.kode_lokasi,a.kode_cust, a.nama, a.alamat, a.no_tel,a.no_fax,a.inisial, a.email, a.npwp, a.pic, a.alamat2,a.kode_segmen,a.kota,a.tgl_lahir,a.tempat_lahir,a.no_ktp,a.tgl_aktif
                            from sju_cust a
                            where a.kode_cust='$nik' and a.kode_lokasi='$kode_lokasi' ");

                            $row_name = array("Kode", "Nama", "Alamat", "Kota", "No Telepon", "No Faximile", "NPWP", "Email");
                            $row = $rs->FetchNextObject($toupper=false);
                                echo"
                            <table class='table table-bordered table-striped'>
                                <tr>
                                    <td>".$row_name[0]."</td>
                                    <td>".$row->kode_cust."</td>
                                </tr>
                                <tr>
                                    <td>".$row_name[1]."</td>
                                    <td>".$row->nama."</td>
                                </tr>
                                <tr>
                                    <td>".$row_name[2]."</td>
                                    <td>".$row->alamat."</td>
                                </tr>
                                <tr>
                                    <td>".$row_name[3]."</td>
                                    <td>".$row->kota."</td>
                                </tr>
                                <tr>
                                    <td>".$row_name[4]."</td>
                                    <td>".$row->no_tel."</td>
                                </tr>
                                <tr>
                                    <td>".$row_name[5]."</td>
                                    <td>".$row->no_fax."</td>
                                </tr>
                                <tr>
                                    <td>".$row_name[6]."</td>
                                    <td>".$row->npwp."</td>
                                </tr>
                                <tr>
                                    <td>".$row_name[7]."</td>
                                    <td>".$row->email."</td>
                                </tr>
                            </table>
                                ";
                            
                            echo
                            "</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>";
		
?>
