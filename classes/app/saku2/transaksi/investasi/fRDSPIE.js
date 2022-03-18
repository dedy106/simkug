window.app_saku2_transaksi_investasi_fRDSPIE = function(owner)
{
	if (owner)
	{		
		window.app_saku2_transaksi_investasi_fRDSPIE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fRDSPIE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan SPI Reksadana: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK SPI", multiSelection:false, maxLength:10, tag:2 });
		this.cb_pp = new saiCBBL(this,{bound:[20,15,200,20],caption:"PP/Unit", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,22,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this,{bound:[20,17,200,20],caption:"Jenis",items:["REGULAR","NBUKU"], readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.p1 = new panel(this,{bound:[20,23,900,323],caption:"Data Reksadana"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:11,tag:9,
		            colTitle:["Kode RD","Nama","MI","Akun SPI","Jumlah","Nilai Oleh","Nilai Buku","Nilai Wajar","Selisih","Total","Rev SPI"],										
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,60,60,180,100]],
					colFormat:[[4,5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	

		this.p2 = new panel(this,{bound:[20,24,900,323],caption:"Data Jurnal Rekap",visible:true});
		this.sg2 = new saiGrid(this.p2,{bound:[1,20,this.p2.width-5,this.p2.height-50],colCount:3,tag:0,
		            colTitle:["Akun","Nilai SPI","Rev SPI"],
					colWidth:[[2,1,0],[100,100,80]],
					colFormat:[[1,2],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
				
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Unit",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='FAAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");			
			this.cb_pp.setText(this.app._kodePP);
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'RDNT' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																						
				this.akunNT = line.flag;								
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fRDSPIE.extend(window.childForm);
window.app_saku2_transaksi_investasi_fRDSPIE.implement({		
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{									
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					/*
					sql.add("delete from inv_rdspi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_rdspi_j where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.h_buku=b.h_buku "+
					        "from inv_rd_d a inner join inv_rdspi_d b on a.kode_rd=b.kode_rd where b.no_spi='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_rdspi_d where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_rdspi_d set flag_rev = '-' where flag_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into inv_rdspi_m(no_spi,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,jenis) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','F','RDSPI','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'"+this.c_jenis.getText()+"')");										
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(1,i)) > 0 ) {
									var akunDr = this.sg2.cells(0,i);
									var akunCr = this.akunNT;
									var jenis1 = "SPI";
									var jenis2 = "NT";
								} else {
									var akunDr = this.akunNT;
									var akunCr = this.sg2.cells(0,i);
									var jenis1 = "NT";
									var jenis2 = "SPI";
								}					
								var nilai = Math.abs(nilaiToFloat(this.sg2.cells(1,i)));					
								var n = i*4;
								var j = 1+n;
								var k = 2+n;
								if (nilai != 0) {
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+k+",'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
								}							
								if (nilaiToFloat(this.sg2.cells(2,i)) < 0 ) {
									var akunDr = this.sg2.cells(0,i);
									var akunCr = this.akunNT;
									var jenis1 = "SPIREV";
									var jenis2 = "NTREV";
								} else {
									var akunDr = this.akunNT;
									var akunCr = this.sg2.cells(0,i);
									var jenis1 = "NTREV";
									var jenis2 = "SPIREV";
								}					
								var nilai = Math.abs(nilaiToFloat(this.sg2.cells(2,i)));					
								var j = 3+n;
								var k = 4+n;
								if (nilai != 0) {
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+k+",'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								}
							}
						}
					}
					
					sql.add("insert into inv_rdspi_d(no_spi,kode_lokasi,kode_rdkelola,kode_rd,jumlah,h_oleh,h_buku,h_wajar,flag_rev,dc) "+					
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_rdkelola,kode_rd,jumlah,h_oleh,h_buku,h_wajar,no_spi,'C' from inv_rdspi_d where flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_rdspi_d set flag_rev='"+this.e_nb.getText()+"' where flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");					
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into inv_rdspi_d(no_spi,kode_lokasi,kode_rdkelola,kode_rd,jumlah,h_oleh,h_buku,h_wajar,flag_rev,dc) values "+
					            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rdkelola+"','"+line.kode_rd+"',"+line.jumlah+","+line.h_oleh+","+line.h_buku+","+line.h_wajar+",'-','D')");
						
						if (this.c_jenis.getText() == "NBUKU") sql.add("update inv_rd_d set h_buku = "+line.h_wajar+" where kode_rd='"+line.kode_rd+"'");
					}
					*/
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_rdspi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_rdspi_j where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.h_buku=b.h_buku "+
					        "from inv_rd_d a inner join inv_rdspi_d b on a.kode_rd=b.kode_rd where b.no_spi='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_rdspi_d where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_rdspi_d set flag_rev = '-' where flag_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;						
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			//spi yg bisa dikoreksi adalah spi yg terakhir			
			this.e_nb.setSQL("select no_spi, keterangan from inv_rdspi_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_spi in (select max(no_spi) from inv_rdspi_m  where periode ='"+this.e_periode.getText()+"') ",["no_spi","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
			this.e_nilai.setText("0");
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select keterangan,periode,tanggal,nik_buat,nik_setuju,kode_drk,kode_pp,jenis from inv_rdspi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);						
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_setuju);
					this.cb_drk.setText(line.kode_drk);
					this.cb_pp.setText(line.kode_pp);
					this.c_jenis.setText(line.jenis);					
					this.doLoadData();
				} 
			}						
		}		
	},	
	doLoadData: function(sender){
		this.e_nilai.setText("0");		
		var strSQL = "select y.akun_spi,z.kode_rdkelola,a.kode_rd,z.nama,x.jumlah,x.h_oleh,x.h_buku,x.h_wajar,x.h_wajar-x.h_buku as h_sls,round((x.h_wajar-x.h_buku) * x.jumlah,0) as total,isnull(b.nilai_spi,0) as total_spi "+
		             "from inv_rd_d a inner join inv_rdspi_d x on x.kode_rd=a.kode_rd "+					 
					 "                inner join inv_rd z on a.kode_rd=z.kode_rd "+
					 "                inner join inv_rdkelola y on z.kode_rdkelola=y.kode_rdkelola "+
					 "left join ( "+
					 "       select x.kode_rdkelola,x.kode_rd,round(sum( (case x.dc when 'D' then (x.h_wajar-x.h_buku) else -(x.h_wajar-x.h_buku) end) *x.jumlah),0) as nilai_spi "+
					 "       from inv_rdspi_d x inner join inv_rdspi_m y on x.no_spi=y.no_spi and x.kode_lokasi=y.kode_lokasi "+
					 "       where y.no_spi<>'"+this.e_nb.getText()+"' and y.periode<='"+this.e_periode.getText()+"' and x.flag_rev='"+this.e_nb.getText()+"' group by x.kode_rdkelola,x.kode_rd "+
					 ") b on a.kode_rd=b.kode_rd where x.no_spi='"+this.e_nb.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];								
				tot += parseFloat(line.total);
			}					
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();			
			this.doTampilData(1);

			this.sg2.clear();
			var nilaispi1 = nilaispi2 = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				nilaispi1 = parseFloat(line.total);
				nilaispi2 = parseFloat(line.total_spi);
				var isAda = false;
				var idx = totalspi1 = totalspi2 = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (line.akun_spi == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				
				if (!isAda) {
					this.sg2.appendData([line.akun_spi,floatToNilai(nilaispi1),floatToNilai(nilaispi2)]);
				} 
				else { 
					totalspi1 = nilaiToFloat(this.sg2.cells(1,idx));
					totalspi1 = totalspi1 + nilaispi1;
					this.sg2.setCell(1,idx,totalspi1);
					
					totalspi2 = nilaiToFloat(this.sg2.cells(2,idx));
					totalspi2 = totalspi2 + nilaispi2;
					this.sg2.setCell(2,idx,totalspi2);
				}			
			}
			
		} else this.sg.clear(1);	
	},	
	doTampilData: function(page) {		
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.kode_rd,line.nama,line.kode_rdkelola,line.akun_spi,floatToNilai(line.jumlah),floatToNilai(line.h_oleh),floatToNilai(line.h_buku),floatToNilai(line.h_wajar),floatToNilai(line.h_sls),floatToNilai(line.total),floatToNilai(line.total_spi)]);			
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {		
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});