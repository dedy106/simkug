window.app_saku3_transaksi_yspt_simak_fKalAkad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fKalAkad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fKalAkad";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kalender Akademik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Sekolah", readOnly:true, tag:2});
		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:9,change:[this,"doChange"]});		
		this.c_sem = new saiCB(this,{bound:[20,12,200,20],caption:"Semester",items:["GANJIL","GENAP"], readOnly:true,tag:9,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,13,1000,410], childPage:["Data Kegiatan"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:0,
		            colTitle:["Tanggal","Agenda"],
		            pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 							
					colWidth:[[1,0],[750,200]],				
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and  kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);			

			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode TA","nama"],"and","Data TA",true);			
			
			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_simak_fKalAkad.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fKalAkad.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager2: function(sender,page){
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,9])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("delete from sis_kalender_akad where kode_ta = '"+this.cb_ta.getText()+"' and kode_sem='"+this.c_sem.getText()+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");		
					

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																				
									sql.add("insert into sis_kalender_akad(kode_pp,kode_lokasi,kode_ta,kode_sem,tanggal,agenda) values "+
						    				"('"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_ta.getText()+"','"+this.c_sem.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"')");
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
					sql.add("delete from sis_kalender_akad where kode_ta = '"+this.cb_ta.getText()+"' and kode_sem='"+this.c_sem.getText()+"' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"));
				setTipeButton(tbSimpan);
				this.sg.clear(1); 
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :
			case "ubah" :	
				this.simpan();
				break;								
			case "hapus" :	
				this.hapus();
				break;				
		}
	},

	clearLayar : function(){
		try {			
			this.standarLib.clearByTag(this, new Array("0","1"));
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},

	doChange: function(sender){
		try{
			if ((sender == this.cb_ta || this.c_sem) && this.cb_ta.getText()!="" && this.c_sem.getText()!="") {
				
				var strSQL = "select tanggal,agenda from sis_kalender_akad "+
							 "where kode_ta='"+this.cb_ta.getText()+"' and kode_sem='"+this.c_sem.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ";		
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
					this.sgn.rearrange();
					this.doTampilData(1);
					setTipeButton(tbUbahHapus);	
				} else this.sg.clear(1);
			}
		} catch(e) {alert(e);}
	},

	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.tanggal,line.agenda]); 
		}
		this.sg.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
