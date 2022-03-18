window.app_saku3_transaksi_siaga_hris_adm_fLoadLibur = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fLoadLibur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fLoadLibur";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hari Libur Tahunan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);

		this.e_tahun = new saiLabelEdit(this,{bound:[20,10,180,20],caption:"Tahun", maxLength:4, change:[this,"doChange"]});
		//this.bValid = new button(this,{bound:[220,10,80,20],caption:"Validasi",click:[this,"doValid"]});	

		this.pc1 = new pageControl(this,{bound:[20,13,1000,430], childPage:["Data Hari Libur","Error Msg"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
		            colTitle:["Kode","Nama","Tgl Mulai","Tgl Akhir","Validasi"],
					colWidth:[[4,3,2,1,0],[100,120,120,400,100]],		
					buttonStyle:[[2,3],[bsDate,bsDate]],	
					readOnly:true,	
		            pasteEnable:true,
		            autoPaging:true,
		            rowPerPage:20,
		            afterPaste:[this,"doAfterPaste"], 							
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager2"]});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		

		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			var strSQL = "select convert(varchar(4), GETDATE(),112) as thn";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.e_tahun.setText(line3.thn);	
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fLoadLibur.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fLoadLibur.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();

			this.doValid();
							
		} catch(e) {alert(e);}
	},
	doValid: function() {
		try {
			this.inValid = false;
			
			//cek data Kode
			var strSQL = "select kode_libur from gr_libur where tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataKode = dataS;
			}	
			for (var i=0; i < this.sg.getRowCount();i++){
				this.sg.cells(4,i,"VALID");
				
				for (var j=0;j < this.dataKode.rs.rows.length;j++){				
					if (this.sg.cells(0,i) == this.dataKode.rs.rows[j].kode_libur) {
						this.sg.cells(4,i,"INVALID");
					} 
				}	
				if (this.sg.cells(4,i) == "INVALID") this.inValid = true;									
			}	

			if (this.inValid == true) {
				setTipeButton(tbAllFalse);
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg.getRowCount();i++) {
					if (this.sg.cells(4,i) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j]);						
					}
				}
			}		
		}
		catch(e) {
			alert(e);
		}
	},
	//doPager2: function(sender,page){
	//	this.sg.doSelectPage(page);
	//},
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					//sql.add("delete from gr_libur where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_libur(kode_libur,kode_lokasi,nama,tahun,tgl_mulai,tgl_akhir) values "+
										"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.e_tahun.getText()+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.getCellDateValue(3,i)+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {		
					/*
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from gr_libur where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_libur(kode_libur,kode_lokasi,nama,tahun,tgl_mulai,tgl_akhir) values "+
										"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.e_tahun.getText()+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.getCellDateValue(3,i)+"')");
							}
						}
					}
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					*/
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_libur where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_tahun);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
	/*doChange: function(sender){
		try{
			if (this.e_tahun.getText() != "") {
				var strSQL = "select kode_libur,nama,convert(varchar,tgl_mulai,103) as tgl_awal,convert(varchar,tgl_akhir,103) as tgl_akhir "+
							"from gr_libur "+							
							"where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"' order by tgl_mulai asc";
				var data = this.dbLib.getDataProvider(strSQL,true);		
				alert(strSQL);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
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
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.kode_libur,line.nama,line.tgl_awal,line.tgl_akhir]);
		}
		this.sg.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	*/
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Tahun : "+ this.e_tahun.getText()+")");							
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