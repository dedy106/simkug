window.app_saku3_transaksi_spm_fProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Project", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Proyek","List Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false}); 					
		this.cb_kode = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kode",maxLength:20,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"],readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[245,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[280,10,170,20],labelWidth:50,caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:50, tag:1});	
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,430,20],caption:"No Kontrak", maxLength:50, tag:1});	
		this.cb_cust = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false}); 						
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[250,13,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[350,13,98,18]}); 
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,200,20],caption:"Nilai Kontrak", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_jenis = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:2,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_nilaior = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Nilai RAB", tag:1, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,255], childPage:["Rincian Pendapatan","Rincian Beban"]});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,212],colCount:3,tag:0,
		            colTitle:["Kode PP","Nama PP","Nilai"],
					colWidth:[[2,1,0],[100,300,100]],					
					columnReadOnly:[true,[1],[]],colFormat:[[2],[cfNilai]],
					buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],					
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1,pager:[this,"doPager1"]});					
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,212],colCount:4,tag:0,
		            colTitle:["Kode MTA","Nama MTA","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,500,150,80]],					
					columnReadOnly:[true,[1],[]],colFormat:[[3],[cfNilai]],
					buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],afterPaste:[this,"doAfterPaste"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1,pager:[this,"doPager1"]});					
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from spm_proyek_jenis where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			
			this.dataPP = this.app._pp;	
			this.cb_pp.setText(this.app._kodePP);					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fProyek.extend(window.childForm);
window.app_saku3_transaksi_spm_fProyek.implement({
	doAfterPaste: function(sender,totalRow){
		try {			
			var tot = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.rowValid(i)){
					var data = this.dbLib.getDataProvider("select nama from masakun where kode_akun='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {
							this.doChangeCell1(this.sg1,0,i);							
							if (this.sg1.cells(3,i) != "") tot += nilaiToFloat(this.sg1.cells(3,i));							
						}
						else {							
							var j = i+1;
							system.alert(this,"Data MTA tidak valid.","Kode MTA "+this.sg1.cells(0,i)+" tidak terdaftar. (Baris : "+j+")");
							this.sg1.clear(1);
							return false;
						}
					}
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
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
					sql.add("insert into spm_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,kode_jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+",'"+this.cb_jenis.getText()+"')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into spm_proyek_beban(kode_proyek,kode_lokasi,nu,kode_akun,keterangan,nilai) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',"+nilaiToFloat(this.sg1.cells(3,i))+")");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into spm_proyek_pdpt(kode_proyek,kode_lokasi,kode_pp,nilai) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+")");
							}
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
					sql.add("delete from spm_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from spm_proyek_beban where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from spm_proyek_pdpt where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					
					sql.add("insert into spm_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,kode_jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+",'"+this.cb_jenis.getText()+"')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into spm_proyek_beban(kode_proyek,kode_lokasi,nu,kode_akun,keterangan,nilai) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',"+nilaiToFloat(this.sg1.cells(3,i))+")");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into spm_proyek_pdpt(kode_proyek,kode_lokasi,kode_pp,nilai) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+")");
							}
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
					sql.add("delete from spm_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from spm_proyek_beban where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("delete from spm_proyek_pdpt where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.sg1.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
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
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_proyek","kode_proyek",this.app._kodePP+"-"+this.periode.substr(2,4)+".","0000"));						
			this.e_nama.setFocus();			
		}
		catch(e) {
			alert(e);
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from spm_proyek "+
						     "where kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_cust.setText(line.kode_cust);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.e_nilai.setText(line.no_pks);
						this.e_nilaior.setText(line.no_pks);
						this.cb_jenis.setText(line.kode_jenis);
						
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");
						
						var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.nilai,a.nu "+
									"from spm_proyek_beban a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"where a.kode_proyek = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg1.appendData([line.kode_akun,line.nama_akun,line.keterangan,floatToNilai(line.nilai)]);
							}
						} else this.sg1.clear(1);							
						var data = this.dbLib.getDataProvider("select a.kode_pp,b.nama,a.nilai "+
									"from spm_proyek_pdpt a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									"where a.kode_proyek = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg2.appendData([line.kode_pp,line.nama,floatToNilai(line.nilai)]);
							}
						} else this.sg2.clear(1);							
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
			
			if (sender == this.cb_jenis && this.cb_jenis.getText() != "") {				
				var sql = new server_util_arrayList();			
				sql.add("select a.kode_akun, a.nama from masakun a inner join spm_proyek_jenis_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_jenis='"+this.cb_jenis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");				
				this.dbLib.getMultiDataProviderA(sql);						
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();																					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChangeCell1: function(sender, col, row){
		try {
			if (col == 3 && this.sg1.cells(3,row) != "") this.sg1.validasi();		
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (sender.cells(0,row) != "") {				
					var akun = this.dataAkun.get(sender.cells(0,row));				
					if (akun) sender.cells(1,row,akun);
					else {
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}				
				}
			}						
			sender.onChange.set(this,"doChangeCell1");		
		}catch(e)
		{
			alert(e);
		}
	},
	doNilaiChange1: function(){		
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != ""){										
					tot += nilaiToFloat(this.sg1.cells(3,i));					
				}
			}			
			this.e_nilaior.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick1: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select a.kode_akun, a.nama from masakun a inner join spm_proyek_jenis_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_jenis='"+this.cb_jenis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",
						"select count(*)  from masakun a inner join spm_proyek_jenis_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_jenis='"+this.cb_jenis.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",
						["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
		try {
			if (col == 2 && this.sg1.cells(2,row) != "") this.sg2.validasi();		
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (sender.cells(0,row) != "") {				
					var pp = this.dataPP.get(sender.cells(0,row));				
					if (pp) sender.cells(1,row,pp);
					else {
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}				
				}
			}						
			sender.onChange.set(this,"doChangeCell2");		
		}catch(e)
		{
			alert(e);
		}
	},
	doEllipsClick2: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
						"select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
						"select count(*) from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
						["kode_pp","nama"],"and",["Kode","Nama"],false);				
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange2: function(){		
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(2,i) != ""){										
					tot += nilaiToFloat(this.sg2.cells(2,i));					
				}
			}			
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from spm_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});