window.app_saku3_transaksi_yakes21_budget_fAcuanRilis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_budget_fAcuanRilis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_budget_fAcuanRilis";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Acuan Release", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Tipe","Data Acuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,400,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					colFormat:[[2],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[2],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});	
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[10,10,500,370], childPage:["Data Acuan"]});		
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
					colTitle:["Kode Akun","Nama Akun","% Release"],
					colWidth:[[2,1,0],[100,250,80]],								
					columnReadOnly:[true,[1],[0,2]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2],[cfNilai]], 
					pasteEnable:true,
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});					

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();

			this.doLoad3();

			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			this.dbLib.getMultiDataProviderA(sql);		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_budget_fAcuanRilis.extend(window.childForm);
window.app_saku3_transaksi_yakes21_budget_fAcuanRilis.implement({		
	doAfterPaste: function(sender,totalRow){
		try {
			for (var i=0;i < this.sg4.rows.getLength();i++){						
				this.doChangeCell4(this.sg4,0,i);						
			}
			
		} catch(e) {alert(e);}
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_akun,a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') x",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}															
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell4: function(sender, col, row){
		try {
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
			sender.onChange.set(this,"doChangeCell4");		
		}
		catch(e){
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
					
					sql.add("insert into angg_rilisref_m (kode_ref,nama,tgl_input,nik_user) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"',getdate(),'"+this.app._userLog+"')");

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){										
								sql.add("insert into angg_rilisref_d (kode_ref,kode_akun,persen) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+")");	
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
					
					sql.add("delete from angg_rilisref_m where kode_ref='"+this.cb_kode.getText()+"' ");
					sql.add("delete from angg_rilisref_d where kode_ref='"+this.cb_kode.getText()+"' ");

					sql.add("insert into angg_rilisref_m (kode_ref,nama,tgl_input,nik_user) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"',getdate(),'"+this.app._userLog+"')");

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){										
								sql.add("insert into angg_rilisref_d (kode_ref,kode_akun,persen) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+")");	
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.sg4.clear(1);
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);														
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "ubah" :	
				this.ubah();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from angg_rilisref_m where kode_ref='"+this.cb_kode.getText()+"' ");
					sql.add("delete from angg_rilisref_d where kode_ref='"+this.cb_kode.getText()+"' ");
					this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_ref,nama from angg_rilisref_m order by kode_ref";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
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
			this.sg3.appendData([line.kode_ref,line.nama,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);	
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 2) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.cb_kode.setText(this.sg3.cells(0,baris));	
				this.e_nama.setText(this.sg3.cells(1,baris));									
			}
		} catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_ref,nama from angg_rilisref_m where kode_ref ='"+this.cb_kode.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);		

						var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama,a.persen from angg_rilisref_d a inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='99' where a.kode_ref='"+this.cb_kode.getText()+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg4.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg4.appendData([line.kode_akun,line.nama,floatToNilai(line.persen)]);
							}
						} else this.sg4.clear(1);			
						

						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
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
						if (result.toLowerCase().search("error") == -1)	{										
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
	}
});