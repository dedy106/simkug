window.app_saku3_transaksi_yspt_dikti_fMhsInput = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fMhsInput.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fMhsInput";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Mahasiswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_ta = new saiCBBL(this,{bound:[20,13,220,20],caption:"Periode Akademik", readOnly:true, tag:2});						
		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Filter Data","Daftar Mhs","Data Mhs"]});
		this.cb_jur2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Jurusan", multiSelection:false, tag:2});
		this.cb_akt2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Angkatan", multiSelection:false, tag:2});
		this.cb_kelas2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Kelas/Jalur", multiSelection:false, tag:2});		
		this.bLoad = new button(this.pc1.childPage[0],{bound:[120,11,98,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["NIM","Nama","Angkatan","Jurusan","Kelas"],
					colWidth:[[4,3,2,1,0],[150,150,150,250,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"NIM",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		
		this.cb_akt = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoadParam"]});						
		this.cb_jur = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"Jurusan", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoadParam"]});
		this.cb_kelas = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoadParam"]});		
		this.c_flag = new saiCBBL(this.pc1.childPage[2],{bound:[20,22,220,20],caption:"Status", multiSelection:false, maxLength:10, tag:2});

		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-10,260],colCount:3,tag:0,				
			colTitle:["Kode","Nama","Tarif"],
			colWidth:[[2,1,0],[100,300,120]],
			columnReadOnly:[true,[1],[0,2]],			
			buttonStyle:[[0],[bsEllips]], 	
			colFormat:[[2],[cfNilai]],				
			ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
			defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;

			this.cb_ta.setSQL("select distinct kode_ta, nama from dikti_ta where kode_lokasi='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Deskripsi"],"and","Periode Akademik",true);			

			var data = this.dbLib.getDataProvider("select top 1 kode_ta from dikti_ta where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object"){			
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_ta.setText(line.kode_ta);
				}
			}
			
			this.cb_jur2.setSQL("select kode_jur, nama from dikti_jur where kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			this.cb_akt2.setSQL("select kode_akt, nama from dikti_angkat where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);
			this.cb_kelas2.setSQL("select kode_kelas, nama from dikti_kelas where kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Jalur/Kelas",true);
			
			
			this.cb_jur.setSQL("select kode_jur, nama from dikti_jur where kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			this.cb_kelas.setSQL("select kode_kelas, nama from dikti_kelas where kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
			this.cb_akt.setSQL("select kode_akt, nama from dikti_angkat where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);
			this.c_flag.setSQL("select kode_status, nama from dikti_mhs_status where kode_lokasi='"+this.app._lokasi+"' ",["kode_status","nama"],false,["Kode","Nama"],"and","Data Status",true);

			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from dikti_param where kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_dikti_fMhsInput.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fMhsInput.implement({
	doLoad:function(sender){								
		try {
			var filter = " ";
			if (this.cb_jur2.getText() != "") filter = " and a.kode_jur like '"+this.cb_jur2.getText()+"%' ";
			if (this.cb_akt2.getText() != "") filter += " and a.kode_akt like '"+this.cb_akt2.getText()+"%' ";
			if (this.cb_kelas2.getText() != "") filter += " and a.kode_kelas like '"+this.cb_kelas2.getText()+"%' ";

			var strSQL = "select a.nim,a.nama,a.kode_kelas,a.kode_akt,a.kode_jur "+
						 "from dikti_mhs a "+						 
						 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.kode_jur,a.nim";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finimh = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finimh;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.nim,line.nama,line.kode_akt,line.kode_jur,line.kode_kelas]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
					sql.add("insert into dikti_mhs(nim,kode_lokasi,nama,kode_status,kode_akt,kode_jur,kode_kelas) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_flag.getText()+"','"+this.cb_akt.getText()+"','"+this.cb_jur.getText()+"','"+this.cb_kelas.getText()+"')");
									
					for (var i=0;i < this.sg.getRowCount();i++){		
						if (nilaiToFloat(this.sg.cells(2,i)) > 0) {	
							sql.add("insert into dikti_mhs_tarif(nim,kode_lokasi,kode_ta,kode_param,tarif) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_ta.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+")");		
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

					sql.add("delete from dikti_mhs where nim='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					sql.add("delete from dikti_mhs_tarif where nim='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into dikti_mhs(nim,kode_lokasi,nama,kode_status,kode_akt,kode_jur,kode_kelas) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_flag.getText()+"','"+this.cb_akt.getText()+"','"+this.cb_jur.getText()+"','"+this.cb_kelas.getText()+"')");
							
					for (var i=0;i < this.sg.getRowCount();i++){		
						if (nilaiToFloat(this.sg.cells(2,i)) > 0) {	
							sql.add("insert into dikti_mhs_tarif(nim,kode_lokasi,kode_ta,kode_param,tarif) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_ta.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+")");		
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
					sql.add("delete from dikti_mhs where nim='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					sql.add("delete from dikti_mhs_tarif where nim='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					this.sg.clear(1);
					this.sg1.clear(1);
					this.doLoad();
					setTipeButton(tbAllFalse);
				}
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
	doLoadParam : function(sender){		
		if (this.cb_akt.getText() != "" && this.cb_jur.getText() != "" && this.cb_ta.getText() != "" && this.cb_kelas.getText() != "") {
			if (this.stsSimpan == 1) {
				var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif "+
							"from dikti_param a "+	
							"		left join dikti_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"		and b.kode_akt='"+this.cb_akt.getText()+"' and b.kode_jur='"+this.cb_jur.getText()+
							"' 		and b.kode_kelas='"+this.cb_kelas.getText()+"' and b.kode_ta='"+this.cb_ta.getText()+"' "+	
							"where a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx "; 					
			}
			else {
				if (this.cb_kode.getText() != "") {
					var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif "+
								"from dikti_param a "+	
								"		left join dikti_mhs_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.nim='"+this.cb_kode.getText()+"' and b.kode_ta='"+this.cb_ta.getText()+"' "+
								"where a.kode_lokasi = '"+this.app._lokasi+"' "+
								"order by a.idx "; 					
				}
			}

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif)]);
				}
			}
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var data = this.dbLib.getDataProvider("select * from dikti_mhs where nim='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.stsSimpan = 0;			

						this.e_nama.setText(line.nama);						
						this.cb_jur.setText(line.kode_jur);	
						this.cb_kelas.setText(line.kode_kelas);
						this.cb_akt.setText(line.kode_akt);
						this.c_flag.setText(line.kode_status);						
						
						this.doLoadParam();	
						setTipeButton(tbUbah);
					}
					else {
						this.stsSimpan = 1;		
						this.e_nama.setText("");
						this.cb_akt.setText("");							
						this.sg.clear(1);
						setTipeButton(tbSimpan);
					}
				}				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var param = this.dataParam.get(sender.cells(0,row));				
				if (param) sender.cells(1,row,param);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Param "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkParam");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}					
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
							"select kode_param,nama from dikti_param where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from dikti_param where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_param","nama"],"and",["Kode","Nama"],false);				
				}				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");														
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataParam = new portalui_arrayMap();																					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataParam.set(line.kode_param, line.nama);										
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[2]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
			}
		} catch(e) {alert(e);}
	}
});