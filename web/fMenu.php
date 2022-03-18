<?php
include_once( "lib/koneksi.php");


?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>
<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">SAI Menu</a>
    </div>
	
    <ul class="nav navbar-nav">
	<?php
	$sql="select a.nama, a.link, a.nu, a.jenis,a.kode_menu,isnull(b.form,'-') as form 
from lab_konten_menu a
left join m_form b on a.link=b.kode_form
where a.level_menu = '0' and a.kode_lokasi='22' and a.kode_klp='JAVA' 
order by a.nu ";
	$rs = execute($sql,$error);
	while ($row = $rs->FetchNextObject($toupper=false))
	{
		if ($row->jenis=="Induk")
		{
			
			echo "<li class='dropdown'><a class='dropdown-toggle' data-toggle='dropdown' href='#'>$row->nama<span class='caret'></span></a>
			<ul class='dropdown-menu'>";
			$sql="select a.nama, a.link, a.nu, a.jenis from lab_konten_menu a  where a.kode_induk='$row->kode_menu' and a.kode_lokasi='22' order by a.nu ";
			$rs2 = execute($sql,$error);
			
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				
				$link_form = "fMenu.php?hal=app/java/fPage.php&param=".$row2->link;
				echo "<li><a href='$link_form'>$row2->nama</a></li>";
			}
			echo "</ul></li>";
		}
		else
		{
			$link = str_replace("_","/", $row->form);
            $link_form = "fMenu.php?hal=".$link.".php'";
			echo "<li><a href='$link_form'>$row->nama</a></li>";
		}
	
	}  
	?>
    </ul>
	
  </div>
</nav>
  
<div class="container">
  <?php
        include_once($_GET['hal']); 
    ?>
</div>

</body>
</html>
