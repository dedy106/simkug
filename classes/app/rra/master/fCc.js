window.app_rra_master_fCc = function(owner)
{
	if (owner)
	{
		window.app_rra_master_fCc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_master_fCc";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Cost Center", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:100});		
		this.cb_ba = new saiCBBL(this,{bound:[20,13,200,20],caption:"Bisnis Area", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_ubis = new saiCBBL(this,{bound:[20,11,200,20],caption:"Unit Bisnis", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new button(this,{bound:[839,11,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[20,23,900,433],caption:"Daftar Cost Center"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,380],tag:9,readOnly:true,colTitle: ["Kode","Nama","Bisnis Area","Unis"], dblClick:[this,"doDblClick"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,408,899,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		this.e_cari = new saiLabelEdit(this.sgn,{bound:[308,2,220,20],caption:"Cari", labelWidth:50,tag:100, keyDown:[this,"doCariKeyDown"] } );
		this.ib_cari = new button(this.sgn,{bound:[560,2,25,20],icon:"image/cursor.gif",caption:" ", click:[this,"doFind"]});
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
			
			this.cb_ba.setSQL("select kode_ba, nama, kode_ubis from rra_ba where kode_lokasi='"+this.app._lokasi+"'",["kode_ba","nama"],false,["Kode","Nama"],"and","Data Bisnis Area",true);			
			this.onClose.set(this,"doClose");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_master_fCc.extend(window.childForm);
window.app_rra_master_fCc.implement({
	doClose: function(){
		this.dbLib.delListener(this);
	},
	doDblClick:function(sender, col, row)
	{
		this.cb_kode.setText(sender.cells(0,row));
		this.e_nama.setText(sender.cells(1,row));
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into rra_cc(kode_cc,nama,kode_lokasi,kode_ba,kode_ubis) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_ba.getText()+"','"+this.cb_ubis.getText()+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update rra_cc set nama = '"+this.e_nama.getText()+"',kode_ubis='"+this.cb_ubis.getText()+"',kode_ba='"+this.cb_ba.getText()+"' where kode_cc = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					sql.add("delete from rra_cc where kode_cc = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
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
		if (sender == this.cb_ba){			
			this.cb_ubis.setSQL("select a.kode_ubis, a.nama from rra_ubis a inner join rra_ba b on b.kode_ubis = a.kode_ubis and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_ba = '"+sender.getText()+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Unit Bisnis",true);						
			return;
		}
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,b.kode_ubis,b.nama as nama_ubis,c.kode_ba,c.nama as nama_ba "+
				           "from rra_cc a left outer join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
						   "              left outer join rra_ba c on a.kode_ba=c.kode_ba and a.kode_lokasi=c.kode_lokasi "+
						   "where a.kode_cc ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_ubis.setText(line.kode_ubis,line.nama_ubis);
						this.cb_ba.setText(line.kode_ba,line.nama_ba);
						setTipeButton(tbUbahHapus);
					}
					else{
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
			var temp = this.dbLib.runSQL("select a.kode_cc,a.nama,concat(c.kode_ba,concat(' - ',c.nama)) as nama_ba,concat(b.kode_ubis,concat(' - ',b.nama)) as nama_ubis "+
				           "from rra_cc a left outer join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
						   "              left outer join rra_ba c on a.kode_ba=c.kode_ba and a.kode_lokasi=c.kode_lokasi "+
						   "where a.kode_lokasi = '"+this.app._lokasi+"' order by a.kode_cc");
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
			    this.standarLib.showListData(this, "Daftar Cost Center",sender,undefined, 
											  "select kode_cc, nama  from rra_cc where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_cc) from rra_cc where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_cc","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result, callbackObj){
		if (sender == this.dbLib && this == callbackObj){
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
	},	
	doFind: function(){
		try{			
			var temp = this.dbLib.runSQL("select a.kode_cc,a.nama,concat(c.kode_ba,concat(' - ',c.nama)) as nama_ba,concat(b.kode_ubis,concat(' - ',b.nama)) as nama_ubis "+
				   "from rra_cc a left outer join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi and upper(b.nama) like '%"+this.e_cari.getText().toUpperCase()+"%' "+
				   "              left outer join rra_ba c on a.kode_ba=c.kode_ba and a.kode_lokasi=c.kode_lokasi  and upper(c.nama) like '%"+this.e_cari.getText().toUpperCase()+"%'  "+
				" where ( upper(a.nama) like '%"+this.e_cari.getText().toUpperCase()+"%' "+
				"   or upper(a.kode_cc) like '%"+this.e_cari.getText().toUpperCase()+"%' "+
				"   or upper(a.kode_ba) like '%"+this.e_cari.getText().toUpperCase()+"%' "+
				"   or upper(a.kode_ubis) like '%"+this.e_cari.getText().toUpperCase()+"%' "+								
				" ) order by a.kode_cc ");
			
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
	doCariKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13){
			this.doFind();
			return false;
		}
	}
});
