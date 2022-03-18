window.app_saku3_transaksi_siaga_hris_karyawan_fPenilaian2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fPenilaian2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fPenilaian2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Penilaian Karyawan", 0);	
		this.maximize();

		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		uses("saiGrid",true);	

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		
		this.pc2 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Penilaian Karyawan","List Penilaian Karyawan"]});				
		this.sg1 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		              	colTitle:["No. Bukti","Tanggal","Keterangan","Periode","NIK Atasan"],
					  	colWidth:[[4,3,2,1,0],[100,120,450,120,100]],	
					  	readOnly:true,
						dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,202,20],caption:"No Penilaian",maxLength:30,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tglawal = new portalui_label(this.pc2.childPage[0],{bound:[10,13,100,18],caption:"Periode Awal", underline:true});
		this.dp_dawal = new portalui_datePicker(this.pc2.childPage[0],{bound:[110,13,100,18],date:new Date().getDateStr()}); 
		this.l_tglakhir = new portalui_label(this.pc2.childPage[0],{bound:[258,13,100,18],caption:"Periode Akhir", underline:true});
		this.dp_dakhir = new portalui_datePicker(this.pc2.childPage[0],{bound:[358,13,100,18],date:new Date().getDateStr()}); 
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,14,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[10,17,220,20],caption:"ID Atasan", multiSelection:false, maxLength:10, tag:1});

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,23,990,305],childPage:["Filter Data", "Data Penilaian"]});
		this.cb_dept = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Sub Direktorat", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.cb_dir = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Direktorat", readOnly:true, maxLength:10, tag:9});
		this.bTampil = new button(this.pc1.childPage[0],{bound:[120,19,90,18],caption:"Tampil Data",click:[this,"doLoadNIK"]});			

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:1,
					colTitle:["ID","Nama","NIK Gratika","Jabatan","Angka","Nilai PA","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,80,200,100,200,80]],
					columnReadOnly:[true,[1,2,3,5,6],[]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[4],[cfNilai]],					
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],					
					change:[this,"doChangeCell"],autoAppend:false});
		this.sgn =  new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2, grid:this.sg});		
	
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);

		this.maximize();		
		this.setTabChildIndex();
		setTipeButton(tbSimpan);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_app.setSQL("select nik, nama,nik2 from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","nik2"],false,["ID","Nama","NIK Gratika"],"and","Data Approval",true);			

			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Sub Direktorat",true);		
			this.cb_dir.setSQL("select kode_dir, nama from gr_dir where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_dir","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fPenilaian2.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fPenilaian2.implement({
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
							"select nik,nama,nik2 from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",
							["nik","nama","nik2"],"and",["ID","Nama","NIK Gratika"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (sender == this.sg) {
			if( col == 0 ) {
				var data = this.dbLib.getDataProvider("select a.nama,a.nik2,b.nama as jabatan from gr_karyawan a inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
													  "where a.nik ='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {						
						this.sg.cells(1,row,line.nama);
						this.sg.cells(2,row,line.nik2);
						this.sg.cells(3,row,line.jabatan);
					}
					else {
						this.sg.cells(1,row,"");
						this.sg.cells(2,row,"");
						this.sg.cells(3,row,"");
					}
				}
			}
			if( col == 4 ) {
				var data = this.dbLib.getDataProvider("select top 1 kode_pa,nama from gr_pa "+
													  "where ("+this.sg.cells(4,row)+" between bawah and atas) and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {						
						this.sg.cells(5,row,line.kode_pa);
						this.sg.cells(6,row,line.nama);						
					}
					else {						
						this.sg.cells(5,row,"-");
						this.sg.cells(6,row,"-");
					}
				}
			}
		}	
		sender.onChange.set(this,"doChangeCell");	
	},
	doLoadNIK:function(sender){
		this.pc2.setActivePage(this.pc2.childPage[0]);																		
		this.pc1.setActivePage(this.pc1.childPage[1]);																		

		var data = this.dbLib.getDataProvider("select a.nik,a.nama,a.nik2,b.nama as jabatan from gr_karyawan a "+
					"inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+					
					"where a.kode_dept='"+this.cb_dept.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg.appendData([line.nik,line.nama,line.nik2,line.jabatan,"0","-","-"]);
			}
		} else this.sg.clear(1);	
	},
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);	
		
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into gr_penilaian_m(no_penilaian, kode_lokasi, tanggal, keterangan, nik_buat, nik_app, periode_awal, periode_akhir, nik_user, tgl_input, periode, kode_dept ) values "+
						    "	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.cb_app.getText()+"','"+this.dp_dawal.getDateString()+"','"+this.dp_dakhir.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.cb_dept.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){							
							sql.add("insert into gr_penilaian_d2(no_penilaian,kode_lokasi,nik,nik2,jabatan,angka,kode_pa) values "+  
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"')");							
						}						
					}
					
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_penilaian_m where no_penilaian='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_penilaian_d2 where no_penilaian='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into gr_penilaian_m(no_penilaian, kode_lokasi, tanggal, keterangan, nik_buat, nik_app, periode_awal, periode_akhir, nik_user, tgl_input, periode ) values "+
							"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.cb_app.getText()+"','"+this.dp_dawal.getDateString()+"','"+this.dp_dakhir.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"')");
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){							
							sql.add("insert into gr_penilaian_d2(no_penilaian,kode_lokasi,nik,nik2,jabatan,angka,kode_pa) values "+  
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"')");							
						}						
					}										
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_penilaian_m where no_penilaian='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_penilaian_d2 where no_penilaian='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					this.sg.clear(1);
					this.sg1.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.doLihat();
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
					this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :
					this.ubah();
				break;				
			case "hapus" :	
					this.hapus();
				break;				
		}
		return false;
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_penilaian_m","no_penilaian",this.app._lokasi+"-PNK"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
		this.stsSimpan = 1;
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick();
		this.doLihat();
	},	
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="" && this.stsSimpan == 0) {			
			var data = this.dbLib.getDataProvider(
					   "select a.keterangan,a.tanggal,a.nik_buat,a.nik_app,a.periode_awal,a.periode_akhir,a.kode_dept "+
					   "from gr_penilaian_m a "+	   
					   "where a.no_penilaian='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);										
					this.dp_dawal.setText(line.periode_awal);										
					this.dp_dakhir.setText(line.periode_akhir);					
					this.cb_app.setText(line.nik_app);
					this.cb_dept.setText(line.kode_dept);
				} 
			}

			var data = this.dbLib.getDataProvider("select a.nik,a.nik2,b.nama,a.jabatan,a.angka,a.kode_pa,c.nama as nama_pa "+
												  "from gr_penilaian_d2 a "+
												  "inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
												  "inner join gr_pa c on a.kode_pa=c.kode_pa and c.kode_lokasi=b.kode_lokasi "+
											 	  "where a.no_penilaian = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.nik,line.nama,line.nik2,line.jabatan,line.angka,line.kode_pa,line.nama_pa]);
				}
			} else this.sg.clear(1);

			
		}

		if (sender == this.cb_dept && this.cb_dept.getText()!="") {
			var data = this.dbLib.getDataProvider(
						"select kode_dir "+
						"from gr_dept  "+	   
						"where kode_dept='"+this.cb_dept.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.cb_dir.setText(line.kode_dir);
				} 
			}
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},

	doLihat:function(sender){						
		var strSQL = "select a.no_penilaian,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,convert(varchar,a.periode_awal,103)+' - '+convert(varchar,a.periode_akhir,103) as periode,a.nik_app "+
					 "from gr_penilaian_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_penilaian desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_penilaian,line.tanggal,line.keterangan,line.periode,line.nik_app]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});