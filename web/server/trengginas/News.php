<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate2($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    function generateWebPaging2($sub_url, $data_array_count, $item_per_page=5, $active_page_number=1, $protection=TRUE){
        // protect
        if($protection){
            if($active_page_number > ceil($data_array_count/$item_per_page)){
                redirect($sub_url);
            }
        }

        // $list = '';
        $list = ($active_page_number > 1 ? "<li><a href='$sub_url/".($active_page_number - 1)."'><i class='fa fa-long-arrow-left'></i>Previous Page</a></li>" : '');

        for($i=1; $i<=ceil($data_array_count/$item_per_page); $i++){
            $list .= ($i == $active_page_number ? "<li class='active'><a href='#'>$i</a></li>" : "<li><a href='$sub_url/".$i."'>$i</a></li>");
        }

        $list .= ($active_page_number < ceil($data_array_count/$item_per_page) ? "<li><a href='$sub_url/".($active_page_number + 1)."'>Next Page<i class='fa fa-long-arrow-right'></i></a></li>" : '');

        $html = "<ul class='pagination pagination-lg'>$list</ul>";
        return $html;
    }

    function getIsi(){

        $result = array("message" => "", "rows" => 0, "status" => "" );
        $path = "http://".$_SERVER["SERVER_NAME"]."/";
        $kode_lokasi=$_POST['kode_lokasi'];
        $page = $_POST['page'];
        $strperiode = $_POST['str_periode'];

        $sql="select count(a.id) as jml from lab_konten a where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' $strperiode ";
        $rs = execute($sql);
        
        $jumlah_artikel=$rs->fields[0];
        $items_per_page=5;
        $active_page=$page;

        $offset = ($page - 1) * $items_per_page;

        if($jumlah_artikel > 0){

            $sql2="select a.id, tanggal, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar as header_url, c.file_type 
            from lab_konten a 
            left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
            left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi 
            where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' $strperiode 
            order by tanggal desc 
            OFFSET $offset ROWS FETCH NEXT $items_per_page ROWS ONLY";
            $rs2 = execute($sql2);

            while ($row = $rs2->FetchNextObject($toupper=false))
            {
                $daftar_artikel[] = (array)$row;
            }
            
        }else{
            $daftar_artikel[]=array();
        }

        $html="";
        foreach($daftar_artikel as $row){

            $url = "fMainTrengginas.php?hal=app/trengginas/fNewsDetail.php&id=".$row["id"];
            $arr = explode('/', $row['file_type']);
            $cut_on = strpos(strip_tags($row["keterangan"]), ".", strpos(strip_tags($row["keterangan"]), ".")  + strlen("."));
            
            $path_file=$path."web".$row["header_url"];
            $html .= "
                <div class='blog-item'>
                    <div class='row' style='margin-bottom:15px;'>
                        <div class='col-xs-12 col-sm-2 text-center'>
                            <div class='entry-meta'>
                                <span id='publish_date'>".convertDate($row["tgl_input"])."</span>
                            </div>
                        </div>
                        <div class='col-xs-12 col-sm-10'>
                            <h2 style='margin-top:5px;'><a href='$url' style='color:#0066ff;'>".$row["judul"]."</a></h2>
                        </div>
                    </div>
                            
                    <div class='row'>
                        <div class='col-xs-12 col-sm-12 blog-content'>
                            <div style='overflow:hidden; max-height:400px;'>".
                                    ($arr[0] == 'video' ? "<video controls  style='min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'><source src='".$row["header_url"]."' type='".$row['file_type']."'></video>"  : "
                                    <a href='$url'><img class='img-responsive img-blog' src='$path_file' style='width:100%; display:block;' alt='' />
                                    </a>")                                    
                                ."
                            </div>

                            <h3>".substr(strip_tags($row["keterangan"]), 0, $cut_on+1)."</h3>
                            <a class='btn btn-sm btn-primary readmore' style='padding: 8px 8px;' href='$url'>Read More <i class='fa fa-angle-right'></i></a>
                        </div>
                    </div>    
                </div>
            ";
        }
    
        $html.= "<center>".generateWebPaging2('fMainTrengginas.php?hal=app/trengginas/fNews.php&page=', $jumlah_artikel, $items_per_page, $active_page)."</center>";

        $result['status'] = true;
        $result['detail'] = $html;

        echo json_encode($result);
    
    }

    function getCtg(){
        
        $kode_lokasi=$_POST['kode_lokasi'];
        $rsc =  execute("select count(id) as jml, b.kode_kategori, b.nama 
        from lab_konten a 
        inner join lab_konten_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi 
        where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' group by b.nama, b.kode_kategori");
        
        $html="";
        if($rsc->RecordCount()){
            
            while ($row = $rsc->FetchNextObject($toupper=false)){
                $categories[] = (array)$row;
            }
            
            foreach($categories as $cat){
                $html .= "<li><a href='fMainTrengginas.php?hal=app/trengginas/fSearch.php&param=news/categories/1/".$cat['kode_kategori']."'>".$cat['nama']." <span class='badge'>".$cat['jml']."</span></a></li>";
            }
        }
        
        $result['status'] = true;
        $result['detail'] = $html;

        echo json_encode($result);
                                
    }

    function getArchive(){
        $kode_lokasi = $_POST['kode_lokasi'];

        $rsa = execute("select count(a.id) as jml, month(tanggal) as bulan, year(tanggal) as tahun 
        from lab_konten a 
        where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' group by month(tanggal), year(tanggal)");
        
        $html = "";
        if($rsa->RecordCount()){
            
            while ($row = $rsa->FetchNextObject($toupper=false)){
                $archive[] = (array)$row;
            }
            
            foreach($archive as $arc){
                $html.= "<li><a href='fMainTrengginas.php?hal=app/trengginas/fNews.php&page=/1/".$arc['bulan']."/".$arc['tahun']."'><i class='fa fa-angle-double-right'></i> ".getNamaBulan($arc['bulan'])." ".$arc['tahun']." <span class='pull-right'>(".$arc['jml'].")</span></a></li>";
            }
        }
        
        $result['status'] = true;
        $result['detail'] = $html;

        echo json_encode($result);
    }

    function getIsiDetail(){

        $result = array("message" => "", "rows" => 0, "status" => "" );
        $path = "http://".$_SERVER["SERVER_NAME"]."/";
        $kode_lokasi=$_POST['kode_lokasi'];
        $page = $_POST['page'];
        $id=$_POST['id'];
        $strperiode = $_POST['str_periode'];

        $sql="select count(a.id) as jml from lab_konten a where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' $strperiode ";
        $rs = execute($sql);

        $jumlah_artikel=$rs->fields[0];
        $items_per_page=5;
        $active_page=$page;

        $offset = ($page - 1) * $items_per_page;

        if($jumlah_artikel > 0){

            $sql2="select a.id, tanggal, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar as header_url, c.file_type 
            from lab_konten a 
            left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
            left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi 
            where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' and a.id=$id";
            $rs2 = execute($sql2);
            while ($row = $rs2->FetchNextObject($toupper=false))
            {
                $daftar_artikel[] = (array)$row;
            }
            
        }else{
            $daftar_artikel[]=array();
        }

        $html="";
        foreach($daftar_artikel as $row){

            $url = "fMainTrengginas.php?hal=".generateSEO($row["id"], $row["judul"]);
            $arr = explode('/', $row['file_type']);
            $path_file=$path."web".$row["header_url"];
            $html .= "
            <div class='blog-item'>
                <div class='row' style='margin-bottom:15px;'>
                    <div class='col-xs-12 col-sm-2 text-center'>
                        <div class='entry-meta'>
                            <span id='publish_date'>".convertDate($row["tgl_input"])."</span>
                        </div>
                    </div>
                    <div class='col-xs-12 col-sm-10'>
                        <h2 style='margin-top:5px;'><a href='$url' style='color:#0066ff;'>".$row["judul"]."</a></h2>
                    </div>
                </div>
                        
                <div class='row'>
                    <div class='col-xs-12 col-sm-12 blog-content'>
                        <div style='overflow:hidden; max-height:400px;'>".
                                ($arr[0] == 'video' ? "<video controls  style='min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'><source src='".$row["header_url"]."' type='".$row['file_type']."'></video>"  : "
                                <a href='$url'><img class='img-responsive img-blog' src='$path_file' style='width:100%; display:block;' alt='' />
                                </a>")

                                
                            ."
                        </div>

                        <h3>".$row["keterangan"]."</h3>
                        
                    </div>
                </div>    
            </div>
            ";
        }
        $result['status'] = true;
        $result['detail'] = $html;

        echo json_encode($result);
    
    }

    function getSearch(){

        $konten=$_POST['konten'];
        $jenis=$_POST['jenis'];
        $str=$_POST['str'];
        $page=intval($_POST['page']);
     
        $search_string = $str;
        
        $html="";
        if(($konten != null OR in_array($konten, array('all', 'news', 'article'))) AND $jenis != null AND ISSET($search_string)){

            $acceptable = array('tag','categories','string');

            if(in_array($jenis, $acceptable)){
                if($konten == 'news'){
                    $kode_klp = "and a.kode_klp = 'KLP01' ";
                }else if($konten =='article'){
                    $kode_klp = "and a.kode_klp = 'KLP03' ";
                }else{
                    $kode_klp = "and (a.kode_klp = 'KLP01' OR a.kode_klp = 'KLP03') ";
                }

                switch($jenis){
                    case 'tag': 
                        $where = "a.tag like '%".$search_string."%' ";
                    break;
                    case 'categories': 
                        $where = "a.kode_kategori = '".$search_string."' ";
                    break;
                    case 'string': 
                        $where = "a.keterangan like '%".$search_string."%' ";
                    break;
                }
            
                $active_page = $page;
                $items_per_page = 5;

                $sqlc="select count(a.id) as jml from lab_konten a where a.kode_lokasi='$kode_lokasi' $kode_klp and $where ";
                $count = execute($sqlc);

                $offset = ($page - 1) * $items_per_page;

                $item_per_page = $items_per_page;
                $jumlah_artikel = $count->fields[0];

                if($jumlah_artikel > 0){

                    $sql="select a.id, tanggal, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar as header_url, c.file_type from lab_konten a left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi where a.kode_lokasi='$kode_lokasi' $kode_klp and $where order by tanggal desc OFFSET $offset ROWS FETCH NEXT $items_per_page ROWS ONLY";
                    $rs = execute($sql);

                    while ($row = $rs->FetchNextObject($toupper=false))
                    {
                        $daftar_artikel[] = (array)$row;
                    }

                }else{
                    $daftar_artikel = array();
                }
            }else{
                $daftar_artikel = array();
                $html .= "Not Found";
            }
        }else{
            $daftar_artikel = array();
            $html.="Not Found";
        }

        if(count($daftar_artikel > 0)){
            foreach($daftar_artikel as $row){
                
                if($konten == 'news'){
                    $url = "fMainGladiola.php?hal=app/gladiola/fNewsDetail.php&id=".$row["id"];
                }else if($konten =='article'){
                    $url = "fMainGladiola.php?hal=app/gladiola/fArticleDetail.php&id=".$row["id"];
                }else{
                    $url = "fMainGladiola.php?hal=app/gladiola/";
                }

                $arr = explode('/', $row['file_type']);
                $cut_on = strpos(strip_tags($row["keterangan"]), ".", strpos(strip_tags($row["keterangan"]), ".")  + strlen("."));
                $path_file=$path."web".$row["header_url"];

                $html.= "
                    <div class='blog-item col-md-6'>
                        <div class='row' style='margin-bottom:15px;'>
                            <div class='col-xs-12 col-sm-3 text-center'>
                                <div class='entry-meta'>
                                    <span id='publish_date'>".convertDate($row["tgl_input"])."</span>
                                </div>
                            </div>
                            <div class='col-xs-12 col-sm-9'>
                                <h2 style='margin-top:5px;'><a href='$url' style='color:#0066ff;'>".$row["judul"]."</a></h2>
                            </div>
                        </div>
                                
                        <div class='row'>
                            <div class='col-xs-12 col-sm-12 blog-content'>
                                <div style='overflow:hidden; max-height:400px;'>
                                    <a href='$url'>
                                        <img class='img-responsive img-blog' src='".$path_file."' style='width:100%; display:block;' alt='' />
                                    </a>
                                </div>

                                <h3>".substr(strip_tags($row["keterangan"]), 0, $cut_on+1)."</h3>
                                <a class='btn btn-sm btn-primary readmore' style='padding: 8px 8px;' href='$url'>Read More <i class='fa fa-angle-right'></i></a>
                            </div>
                        </div>    
                    </div>
                ";
            }
        }else{
            $html.="No result found";
        }

        $url_paging="fMainGladiola.php?hal=app/gladiola/fSearch.php&param=$konten/$jenis";
        $list = ($active_page > 1 ? "<li><a href='$url_paging/".($active_page - 1)."/$search_string'><i class='fa fa-long-arrow-left'></i>Previous Page</a></li>" : '');
         
        for($i=1; $i<=ceil($jumlah_artikel/$item_per_page); $i++){
            $list .= ($i == $active_page ? "<li class='active'><a href='#'>$i</a></li>" : "<li><a href='$url_paging/".$i."/$search_string'>$i</a></li>");
        }
        
        $list .= ($active_page < ceil($jumlah_artikel/$item_per_page) ? "<li><a href='$url_paging/".($active_page + 1)."/$search_string'>Next Page<i class='fa fa-long-arrow-right'></i></a></li>" : '');
        
        $paging= "<ul class='pagination pagination-lg'>$list</ul>";
        
        $result['status'] = true;
        $result['detail'] = $html;
        $result['paging'] = $paging;
        $result['sql']=$sql;

        echo json_encode($result);
    }

?>
