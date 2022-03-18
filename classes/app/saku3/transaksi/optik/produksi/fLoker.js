window.app_saku3_transaksi_optik_produksi_fLoker = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_optik_produksi_fLoker.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_optik_produksi_fLoker";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi Kerja", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Loker","Data Loker","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Mitra"],
					colWidth:[[2,1,0],[300,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:1});			
		this.cb_mitra = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,30,220,20],caption:"Mitra",maxLength:20,multiSelection:false});		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,24,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);

		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	

		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		

			this.cb_mitra.setSQL("select kode_mitra, nama from optik_mitra where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_optik_produksi_fLoker.extend(window.childForm);
window.app_saku3_transaksi_optik_produksi_fLoker.implement({
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
					sql.add("insert into optik_loker(kode_loker,nama,kode_lokasi,kode_mitra,flag_aktif) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_mitra.getText()+"','"+this.c_status.getText().substr(0,1)+"')");
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
					sql.add("delete from optik_loker where kode_loker = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into optik_loker(kode_loker,nama,kode_lokasi,kode_mitra,flag_aktif) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_mitra.getText()+"','"+this.c_status.getText().substr(0,1)+"')");
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
					sql.add("delete from optik_loker where kode_loker = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				this.pc1.setActivePage(this.pc1.childPage[1]);	
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
				var strSQL = "select * from optik_loker where kode_loker ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);								
						this.cb_mitra.setText(line.kode_mitra);															
						if (line.flag_aktif == "1") this.c_status.setText("1.AKTIF");														
						else this.c_status.setText("0.NON");														
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
		var strSQL = "select a.kode_loker,a.nama,a.kode_mitra+'- '+b.nama as mitra "+
		             "from optik_loker a inner join optik_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' ";		
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
			this.sg1.appendData([line.kode_loker,line.nama,line.mitra]); 
		}
		this.sg1.setNoUrut(start);
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " and kode_loker like '%"+this.e_kode2.getText()+"%' ";
			else var filter = " and nama like '%"+this.e_nama2.getText()+"%' ";
			
			var strSQL = "select a.kode_loker,a.nama,a.kode_mitra+'- '+b.nama as mitra "+
						 "from optik_loker a inner join optik_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter;		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	}
});