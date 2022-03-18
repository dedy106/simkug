window.app_saku3_transaksi_sla_fSubClassAkun = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sla_fSubClassAkun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fSubClassAkun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mapping Akun - Sub Class", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_cocd = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Data CoCd",tag:2, multiSelection:false,change:[this,"doChange"]});
		this.c_periode = new saiCB(this,{bound:[20,11,200,20],caption:"Periode",tag:2});				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar SubClass","Data SubClass"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[300,80]],
					readOnly:true,
					autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,readOnly:true});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,readOnly:true});	
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,996,320], childPage:["Daftar Mapping Akun"]});
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,				
				colTitle:["Kode Akun","Nama","Jenis"],
				colWidth:[[2,1,0],[100,300,100]],
				columnReadOnly:[true,[1,2],[0]],				
				buttonStyle:[[0,2],[bsEllips,bsAuto]], 
				picklist:[[2],[new portalui_arrayMap({items:["YAJT","KJPA"]})]],checkItem: true,
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});				

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_cocd.setSQL("select cocd,company_name from mysym_company_code ",["cocd","company_name"],false,["Kode","Nama"],"and","Data Company",true);									
			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fSubClassAkun.extend(window.childForm);
window.app_saku3_transaksi_sla_fSubClassAkun.implement({
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){					
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select gl_acct,short_text    from mysym_f19_gl_account where cocd = '"+this.cb_cocd.getText()+"'",
												  "select count(*)   from mysym_f19_gl_account where cocd = '"+this.cb_cocd.getText()+"'",
												  ["gl_acct","short_text"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
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

					sql.add("delete from sla_subclass_akun where kode_subclass='"+this.cb_kode.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"' and periode='"+this.c_periode.getText()+"'");

					for (var i=0;i < this.sg.getRowCount();i++) {
						if (this.sg.rowValid(i)) {			
							sql.add("insert into sla_subclass_akun (kode_cocd,periode,kode_subclass,kode_akun,kode_lokasi,jenis) values "+
									"('"+this.cb_cocd.getText()+"','"+this.c_periode.getText()+"','"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"')");								
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
					this.sg.clear(1);
					this.doLoad();
					setTipeButton(tbSimpan);								
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_cocd || this.cb_cocd.getText() != "") {
				this.sg.clear(1);
				this.c_periode.items.clear();				
				var data = this.dbLib.getDataProvider(
					"select (year+ case when len(period) = 2 then period else '0'+period end)  as periode "+
					"from mysym_f19_lock_period where cocd='"+this.cb_cocd.getText()+"' order by (year+ case when len(period) = 2 then period else '0'+period end) desc",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.c_periode.addItem(i,line.periode);
					}
				}
				this.c_periode.setText("");				
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){								
		try {
			this.sg1.clear();
			var strSQL = "select a.kode_subclass,a.nama from sla_subclass a "+					 
						 "order by a.kode_subclass";							
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/100));
				this.sgn1.rearrange();

				for (var i=0;i<data.rs.rows.length;i++){
					var line = this.dataJU.rs.rows[i];							
					this.sg1.appendData([line.kode_subclass,line.nama]); 
				}			
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},				
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);	

				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					


				var data2 = this.dbLib.getDataProvider("select a.*,b.nama from sla_subclass_akun a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_cocd = '"+this.cb_cocd.getText()+"' and a.kode_subclass='"+this.cb_kode.getText()+"' and a.periode='"+this.c_periode.getText()+"' order by a.jenis, a.kode_akun",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data2.rs.rows){
						line = data2.rs.rows[i];												
						this.sg.appendData([line.kode_akun,line.nama,line.jenis]);
					}
				} 
				else this.sg.clear(1);	

			}
		} catch(e) {alert(e);}
	}	
});