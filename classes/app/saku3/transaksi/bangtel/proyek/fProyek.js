window.app_saku3_transaksi_bangtel_proyek_fProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_proyek_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_proyek_fProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Proyek","List Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 					
		this.cb_kode = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kode",maxLength:20,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"],readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[245,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Status",readOnly:true,tag:2});
		this.c_status2 = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jenis",items:["BARU","RECURRING"], readOnly:true,tag:2});

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,325], childPage:["Data Proyek","File Dok"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});	
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,430,20],caption:"No Kontrak", maxLength:50, tag:1});	
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false}); 								
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,98,18]}); 
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis Proyek",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Kontrak", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai RAB", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_por = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[1],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			
			this.cb_jenis.setSQL("select kode_jenis,nama from spm_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);

			this.cb_pp.setText(this.app._kodePP);		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_proyek_fProyek.extend(window.childForm);
window.app_saku3_transaksi_bangtel_proyek_fProyek.implement({	
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dok",sender,undefined, 
							"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
							"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
							["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into spm_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,kode_jenis,pr_status) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+",'"+this.cb_jenis.getText()+"','"+this.c_status2.getText()+"')");
							
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-"){
							ix++;
							sql.add("insert into spm_proyek_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,no_ref) values "+
									"('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.cb_kode.getText()+"')");								
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
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("delete from spm_proyek_dok where no_bukti ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
					sql.add("delete from spm_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					
					sql.add("insert into spm_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,kode_jenis,pr_status) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+",'"+this.cb_jenis.getText()+"','"+this.c_status2.getText()+"')");
							
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into spm_proyek_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,no_ref) values ('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.cb_kode.getText()+"')");															
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
					sql.add("delete from spm_proyek_dok where no_bukti ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
					sql.add("delete from spm_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.cekAkun = true;
					this.sg3.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
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
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;		
	},
	doClick:function(sender){		
		try {
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_proyek","kode_proyek",this.cb_pp.getText()+"-"+this.periode.substr(2,4)+".","0000"));						
			this.e_nama.setFocus();			
		}
		catch(e) {
			alert(e);
		}
	},
	doChange: function(sender){
		try{	
			if (sender == this.cb_pp && this.cb_pp.getText()!="") {				
				this.doLoad3();
				//this.cb_jenis.setSQL("select kode_jenis,nama from spm_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from spm_proyek "+
						     "where kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.c_status.items.clear();												
						this.c_status.addItem(0,"1.ONGOING");
						this.c_status.addItem(1,"2.STAGNAN");
						this.c_status.addItem(2,"3.REKON");
						this.c_status.addItem(3,"4.BAUT");
						this.c_status.addItem(4,"5.BAST");
						this.c_status.addItem(4,"6.CLOSE");
						
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_cust.setText(line.kode_cust);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);

						if (this.app._userStatus == "A") {
							this.e_nilai.setReadOnly(false);
							this.e_nilaior.setReadOnly(false);
						}
						else {
							this.e_nilai.setReadOnly(true);
							this.e_nilaior.setReadOnly(true);
						}
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.c_status2.setText(line.pr_status);
						
						if (line.flag_aktif == "1") this.c_status.setText("1.ONGING");
						if (line.flag_aktif == "2") this.c_status.setText("2.STAGNAN");
						if (line.flag_aktif == "3") this.c_status.setText("3.REKON");
						if (line.flag_aktif == "4") this.c_status.setText("4.BAUT");
						if (line.flag_aktif == "5") this.c_status.setText("5.BAST");
						if (line.flag_aktif == "6") this.c_status.setText("6.CLOSE");
												
						setTipeButton(tbUbahHapus);
					}
					else{						
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						this.c_status.items.clear();												
						this.c_status.addItem(0,"1.ONGOING");
						setTipeButton(tbSimpan);
					}
				}

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from spm_proyek_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
			}			
			
			if ((sender == this.e_nilai || sender == this.e_nilaior) && this.e_nilaior.getText()!="" && this.e_nilai.getText()!="") {
				if (this.e_nilai.getText() == "0") this.e_por.setText("0");
				else {
					var persen = Math.round((nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_nilai.getText())) * 10000)/100;
					this.e_por.setText(floatToNilai(persen));
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Proyek",sender,undefined, 
											  "select kode_proyek, nama  from spm_proyek where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_proyek) from spm_proyek where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_proyek","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)	{						
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();

						}
						else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},		
	doLoad3:function(sender){																				
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from spm_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_proyek";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.kode_proyek,line.nama,line.no_pks,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});