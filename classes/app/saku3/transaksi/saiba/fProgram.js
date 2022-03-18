window.app_saku3_transaksi_saiba_fProgram = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_saiba_fProgram.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_saiba_fProgram";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Program", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.cb_dept = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Departemen",maxLength:20,multiSelection:false,change:[this,"doChange"]});		
		this.cb_unit = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"Unit",maxLength:20,multiSelection:false,change:[this,"doChange"]});		

		this.pc1 = new pageControl(this,{bound:[20,10,1000,405], childPage:["List Program","Data Program"]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[500,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode Kanwil",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Nama Kanwil", maxLength:50, tag:1});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		
			
			this.cb_dept.setSQL("select kddept, nmdept from t_dept",["kddept","nmdept"],false,["Kode","Nama"],"and","Data Departemen",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_saiba_fProgram.extend(window.childForm);
window.app_saku3_transaksi_saiba_fProgram.implement({
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
					sql.add("insert into t_program(KDDEPT,KDUNIT,KDPROGRAM,NMPROGRAM,UROUTCOME,KDSASARAN,KDJNSPROG) values "+
							"('"+this.cb_dept.getText()+"','"+this.cb_unit.getText()+"','"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','','','')");					
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
					sql.add("delete from t_program where kdprogram = '"+this.cb_kode.getText()+"' and kdunit='"+this.cb_unit.getText()+"' and kddept='"+this.cb_dept.getText()+"' ");
					sql.add("insert into t_program(KDDEPT,KDUNIT,KDPROGRAM,NMPROGRAM,UROUTCOME,KDSASARAN,KDJNSPROG) values "+
							"('"+this.cb_dept.getText()+"','"+this.cb_unit.getText()+"','"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','','','')");					
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
					sql.add("delete from t_program where kdprogram = '"+this.cb_kode.getText()+"' and kdunit='"+this.cb_unit.getText()+"' and kddept='"+this.cb_dept.getText()+"' ");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);				
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
	doChange: function(sender){
		try{
			if (sender == this.cb_dept && this.cb_dept.getText()!="") {
				this.cb_unit.setSQL("select kdunit, nmunit from t_unit where kddept='"+this.cb_dept.getText()+"'",["kdunit","nmunit"],false,["Kode","Nama"],"and","Data Unit",true);						
			}
			if (sender == this.cb_unit && this.cb_unit.getText()!="") {
				this.doLoad();
			}
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != "" && this.cb_dept.getText() != ""){
					var strSQL = "select * from t_program where kdprogram ='"+this.cb_kode.getText()+"' and kdunit='"+this.cb_unit.getText()+"' and kddept='"+this.cb_dept.getText()+"' ";						   					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_nama.setText(line.nmprogram);						
							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
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
		var strSQL = "select a.kdprogram,a.NMPROGRAM from t_program a where a.kdunit='"+this.cb_unit.getText()+"' and a.kddept='"+this.cb_dept.getText()+"' order by a.kdprogram";		
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
			this.sg1.appendData([line.kdprogram,line.nmprogram]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
