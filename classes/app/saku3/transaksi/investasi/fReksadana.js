window.app_saku3_transaksi_investasi_fReksadana = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fReksadana.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fReksadana";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Reksadana", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});					
		this.cb_kelola = new saiCBBL(this,{bound:[20,13,200,20],caption:"Manajer Investasi", multiSelection:false, maxLength:10, tag:2});
		this.cb_klp = new saiCBBL(this,{bound:[20,12,200,20],caption:"Klp Reksadana", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new button(this,{bound:[729,12,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,800,343],caption:"Daftar Reksadana"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,795,315],tag:9,readOnly:true,colTitle: ["Kode","Nama","Kelompok","Manajer Investasi"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,378,600,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kelola.setSQL("select kode_rdkelola, nama from inv_rdkelola",["kode_rdkelola","nama"],false,["Kode","Nama"],"where","Daftar Kelola",true);			
			this.cb_klp.setSQL("select kode_rdklp, nama from inv_rdklp",["kode_rdklp","nama"],false,["Kode","Nama"],"where","Daftar Kelompok",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fReksadana.extend(window.childForm);
window.app_saku3_transaksi_investasi_fReksadana.implement({
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
					sql.add("insert into inv_rd(kode_rd,nama,kode_rdklp,kode_rdkelola) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_kelola.getText()+"')");					
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
					sql.add("update inv_rd set nama='"+this.e_nama.getText()+"',kode_rdklp='"+this.cb_klp.getText()+"',kode_rdkelola='"+this.cb_kelola.getText()+"' "+
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_rd where kode_rd='"+this.cb_kode.getText()+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
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
				var data = this.dbLib.getDataProvider("select a.nama,a.kode_rdklp,a.kode_rdkelola "+
				           "from inv_rd a "+						   
						   "where a.kode_rd ='"+this.cb_kode.getText()+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.cb_kelola.setText(line.kode_rdkelola);
						this.cb_klp.setText(line.kode_rdklp);
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
	doTampilClick: function(sender){
		try{					
			var temp = this.dbLib.runSQL("select a.kode_rd,a.nama,b.kode_rdklp+ ' - '+b.nama as klp,c.kode_rdkelola+ ' - '+c.nama as kelola "+
			                             "from inv_rd a inner join inv_rdklp b on a.kode_rdklp=b.kode_rdklp "+
										 "              inner join inv_rdkelola c on a.kode_rdkelola=c.kode_rdkelola "+
										 "order by a.kode_rd");
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Reksadana",sender,undefined, 
											  "select kode_rd, nama  from inv_rd",
											  "select count(kode_rd) from inv_rd",
											  ["kode_rd","nama"],"where",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});