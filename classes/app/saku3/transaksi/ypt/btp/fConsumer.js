window.app_saku3_transaksi_ypt_btp_fConsumer = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_btp_fConsumer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_btp_fConsumer";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Consumer", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Consumer","Entry Data","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Nama", maxLength:50, tag:1});
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false});

		// this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Alamat", maxLength:150, tag:1});	
		// this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Kota", maxLength:50, tag:1});	
		// this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telepon", maxLength:50, tag:1});	
		
		this.e_kodec = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,19,200,20],caption:"Kode", maxLength:50, tag:9});	
		this.e_namac = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,20,300,20],caption:"Nama", maxLength:50, tag:9});	
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,14,80,18],caption:"Cari Data",click:[this,"doCari"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_cust.setSQL("select kode_cust,nama,departemen from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","departemen","nama"],false,["Kode","Divisi","Nama"],"and","Data Customer",true);
			this.doLoad();		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_btp_fConsumer.extend(window.childForm);
window.app_saku3_transaksi_ypt_btp_fConsumer.implement({
	doCari: function() {
		if (this.e_kodec.getText() == "") var filter = " ";
		else var filter = " and a.kode_cons like '"+this.e_kodec.getText()+"%' ";
		
		if (this.e_namac.getText() == "") var filter = filter + " ";
		else var filter = filter + " and a.nama like '"+this.e_namac.getText()+"%' ";

		var strSQL = "select * from consumer a "+					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.kode_cons";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);	
		this.pc1.setActivePage(this.pc1.childPage[0]);	
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
					sql.add("insert into consumer(kode_cons,kode_lokasi,nama,kode_cust) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_cust.getText()+"')");		
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
					
					sql.add("delete from consumer where kode_cons = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into consumer(kode_cons,kode_lokasi,nama,kode_cust) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_cust.getText()+"')");		
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
					sql.add("delete from consumer where kode_cons = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
				this.doLoad();
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from consumer where kode_cons ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_nama.setText(line.nama);	
						this.cb_cust.setText(line.kode_cust);								
						// this.e_alamat.setText(line.alamat);
						// this.e_kota.setText(line.kota);
						// this.e_tel.setText(line.no_tel);						
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
		var strSQL = "select * from consumer a "+					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_cons";		
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
			this.sg1.appendData([line.kode_cons,line.nama]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
