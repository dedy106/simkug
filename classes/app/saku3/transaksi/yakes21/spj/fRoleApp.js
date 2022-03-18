window.app_saku3_transaksi_yakes21_spj_fRoleApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_spj_fRoleApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_spj_fRoleApp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Role Approval", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_model = new saiCB(this,{bound:[20,10,200,20],caption:"Model Data",items:["INPUT","LOAD"], readOnly:true,tag:2,change:[this,"doChange"]});				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar NIK","Data NIK","UpLoad"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["NIK","Nama"],
					colWidth:[[1,0],[300,80]],
					readOnly:true,
					autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_nik = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"NIK PD", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"NIK App1", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"NIK App2", multiSelection:false, maxLength:10, tag:2});				
		
		this.sg = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
				colTitle:["NIK","NIK App1","NIK App2"],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPage"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.doLoad();	
			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan  where flag_aktif='1' "+
			                   "union "+
			                   "select '-','-' "+
			                   "union "+
			                   "select 'BID','BIDANG' "+
			                   "union "+
			                   "select 'LOS','OPEN' "
			                   ,["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true);			
			this.cb_app2.setSQL("select nik, nama from karyawan  where flag_aktif='1' "+
								 "union "+
			                   	 "select 'LOS','OPEN' ",["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true);	
			
			this.stsSimpan = 1;
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_spj_fRoleApp.extend(window.childForm);
window.app_saku3_transaksi_yakes21_spj_fRoleApp.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();							
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
					if (this.c_model.getText() == "INPUT") {
						sql.add("insert into pdss_role_nik(nik,nik_app,nik_app2) values "+
								"('"+this.cb_nik.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app2.getText()+"')");					
					}
					else {
						sql.add("delete from pdss_role_nik");
						for (var i=0;i < this.sg.getRowCount();i++){
							sql.add("insert into pdss_role_nik(nik,nik_app,nik_app2) values "+
								"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"')");						
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
					sql.add("delete from pdss_role_nik where nik='"+this.cb_nik.getText()+"' ");					
					sql.add("insert into pdss_role_nik(nik,nik_app,nik_app2) values "+
						    "('"+this.cb_nik.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app2.getText()+"')");					
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
					sql.add("delete from pdss_role_nik where nik='"+this.cb_nik.getText()+"' ");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.doLoad();
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
				}
				break;
			case "simpan" :	
				if (this.c_model.getText() == "INPUT") {
					this.cb_nik.setTag("0");
					this.cb_nik.setTag("2");
					this.cb_nik.setTag("2");
				}
				else {
					this.cb_nik.setTag("9");
					this.cb_nik.setTag("9");
					this.cb_nik.setTag("9");
				}
				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.c_model.getText() == "INPUT") {
					this.cb_nik.setTag("0");
					this.cb_nik.setTag("2");
					this.cb_nik.setTag("2");
				}
				else {
					this.cb_nik.setTag("9");
					this.cb_nik.setTag("9");
					this.cb_nik.setTag("9");
				}
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_nik && this.cb_nik.getText() != ""){				
				var strSQL = "select b.nik_app,b.nik_app2 "+
				             "from pdss_role_nik b   "+
						     "where b.nik ='"+this.cb_nik.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.cb_app.setText(line.nik_app);
						this.cb_app2.setText(line.nik_app2);
						this.stsSimpan = 0;
						setTipeButton(tbUbahHapus);						
					}
					else {
						setTipeButton(tbSimpan);
						this.stsSimpan = 1;
					}
				}								
			}			
			if (sender == this.cb_app && this.cb_app.getText() != "" && this.stsSimpan == 1){		
				this.cb_app2.setText(this.cb_app.getText());
			}
			if (sender == this.c_model && this.c_model.getText() != ""){
				if (this.c_model.getText() == "LOAD") setTipeButton(tbSimpan);
				//else setTipeButton(tbAllFalse);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.nik,b.nama "+
						 "from pdss_role_nik a inner join karyawan b on a.nik=b.nik and b.flag_aktif='1' "+					 
						 "order by a.nik";							
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData1(1);
			} else this.sg1.clear(1);	
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.nik,line.nama]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);																		
	},
	doPager: function(sender, page) {
		this.doTampilData1(page);
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_nik.setText(this.sg1.cells(0,row));					
			}
		} catch(e) {alert(e);}
	}	
});