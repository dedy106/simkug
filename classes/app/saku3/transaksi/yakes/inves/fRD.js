window.app_saku3_transaksi_yakes_inves_fRD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fRD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fRD";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Reksadana", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Reksadana","Data Reksadana"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Flag Aktif","Pilih"],
					colWidth:[[3,2,1,0],[70,80,400,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					colFormat:[[3],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[3],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});			
		this.e_alias = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,400,20],caption:"Nama Grafik", maxLength:100, tag:1});			
		this.e_kodebb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,200,20],caption:"Id Bloomberg", maxLength:50, tag:1});			
		this.cb_kelola = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Manajer Investasi", multiSelection:false, maxLength:10, tag:1});				
		this.cb_klp = new saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Kelompok", multiSelection:false, maxLength:10, tag:2});				
		this.c_aktif = new saiCB(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"Status Aktif",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});		
		this.e_idx = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Indeks Urutan", maxLength:10, tag:1,tipeText:ttNilai,text:"0"});					
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,14,20,20],hint:"No Urut Terakhir +1",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doNU"]});

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
			this.cb_klp.setSQL("select kode_rdklp, nama from inv_rdklp",["kode_rdklp","nama"],false,["Kode","Nama"],"where","Daftar Kelompok",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fRD.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fRD.implement({
	doNU:function(sender){		
		try {												
			var strSQL = "select max(nu) + 1 as nu from inv_rd ";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.e_idx.setText(line.nu);	
				}			
			}
		}
		catch(e) {
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
					sql.add("insert into inv_rd(kode_rd,nama,alias,kode_rdklp,kode_rdkelola,flag_aktif,nu,kode_bb) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alias.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_kelola.getText()+"','"+this.c_aktif.getText().substr(0,1)+"',"+this.e_idx.getText()+",'"+this.e_kodebb.getText()+"')");					
							
					var strSQL = "select kode_plan from inv_plan";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;						
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							sql.add("insert into inv_rd_d(kode_rd,kode_plan,tgl_jual,jenis) values "+
									"('"+this.cb_kode.getText()+"','"+line.kode_plan+"',getdate(),'TRADING')");				
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
					sql.add("update inv_rd "+
							"set kode_bb='"+this.e_kodebb.getText()+"', nu="+this.e_idx.getText()+",nama='"+this.e_nama.getText()+"',alias='"+this.e_alias.getText()+"',kode_rdklp='"+this.cb_klp.getText()+"',kode_rdkelola='"+this.cb_kelola.getText()+"',flag_aktif='"+this.c_aktif.getText().substr(0,1)+"'  "+
							"where kode_rd='"+this.cb_kode.getText()+"'");			
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
					var sql = new server_util_arrayList();
					sql.add("delete from inv_rd where kode_rd='"+this.cb_kode.getText()+"'");			
					sql.add("delete from inv_rd_d where kode_rd='"+this.cb_kode.getText()+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_rd,nama,case flag_aktif when '0' then 'T' else 'Y' end as aktif,flag_aktif from inv_rd order by flag_aktif desc,kode_rd";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.page = 1;
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.kode_rd,line.nama,line.aktif.toUpperCase(),"Pilih"]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 3) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
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
				var strSQL = "select * from inv_rd "+
						     "where kode_rd ='"+this.cb_kode.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.e_alias.setText(line.alias);												
						this.e_kodebb.setText(line.kode_bb);												
						this.cb_klp.setText(line.kode_rdklp);												

						this.cb_kelola.setSQL("select kode_rdkelola, nama from inv_rdkelola where kode_rdkelola='"+line.kode_rdkelola+"' ",["kode_rdkelola","nama"],false,["Kode","Nama"],"and","Daftar Kelola",true);			

						this.cb_kelola.setText(line.kode_rdkelola);												
						if (line.flag_aktif == "0") this.c_aktif.setText("0. TIDAK");
						else this.c_aktif.setText("1. YA");

						this.e_idx.setText(line.nu);			
						
						setTipeButton(tbUbahHapus);
					}
					else {
						this.cb_kelola.setSQL("select kode_rdkelola, nama from inv_rdkelola where flag_aktif='1'",["kode_rdkelola","nama"],false,["Kode","Nama"],"and","Daftar Kelola",true);			
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
	}
});