window.app_rra_master_fPnj = function(owner)
{
	if (owner)
	{
		window.app_rra_master_fPnj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_master_fPnj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Unit Bisnis", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:100});		
		this.cb_gubis = new saiCBBL(this,{bound:[20,11,200,20],caption:"Group Bisnis", multiSelection:false, maxLength:10, tag:2});
		this.cb_app1 = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Png Jawab", multiSelection:false, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});
		this.cb_app3 = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Menetapkan", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new button(this,{bound:[639,16,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[20,23,700,383],caption:"Daftar Unit Bisnis"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,695,330],tag:9,readOnly:true,colTitle: ["Kode Ubis","Nama","Group Bisnis"], dblClick:[this,"doDblClick"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,358,700,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
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
						
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"'",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Group Bisnis",true);
			this.cb_app1.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.onClose.set(this,"doClose");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_master_fPnj.extend(window.childForm);
window.app_rra_master_fPnj.implement({
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
					sql.add("insert into rra_ubis(kode_ubis,nama,kode_gubis,nik_app1, nik_app2, nik_app3,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_gubis.getText()+"', "+
								" '"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_app3.getText()+"','"+this.app._lokasi+"')");
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
					sql.add("update rra_ubis set nama='"+this.e_nama.getText()+"',kode_gubis='"+this.cb_gubis.getText()+"' "+
						"	, nik_app1='"+this.cb_app1.getText()+"', nik_app2='"+this.cb_app2.getText()+"',nik_app3='"+this.cb_app3.getText()+"' "+
						" where kode_ubis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from rra_ubis where kode_ubis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,a.kode_gubis,b.nama as nama_gubis, a.nik_app1, a.nik_app2, a.nik_app3 "+
				           " from rra_ubis a inner join rra_gubis b on a.kode_gubis=b.kode_gubis and a.kode_lokasi=b.kode_lokasi "+
						   " where a.kode_ubis ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_gubis.setText(line.kode_gubis,line.nama_gubis);
						this.cb_app1.setText(line.nik_app1);
						this.cb_app2.setText(line.nik_app2);
						this.cb_app3.setText(line.nik_app3);
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
			var temp = this.dbLib.runSQL("select a.kode_ubis,a.nama,concat(b.kode_gubis,' - ',b.nama) as gubis "+
						" ,concat(a.nik_app1,'-',c.nama) as app1 "+
						" ,concat(a.nik_app2,'-',d.nama) as app2 "+
						" ,concat(a.nik_app3,'-',e.nama) as app3 "+
						" from rra_ubis a "+
						" inner join rra_gubis b on a.kode_gubis=b.kode_gubis and a.kode_lokasi=b.kode_lokasi "+
						"	left outer join rra_karyawan c on c.nik = a.nik_app1 and c.kode_lokasi = a.kode_lokasi "+
						"	left outer join rra_karyawan d on d.nik = a.nik_app2 and d.kode_lokasi = a.kode_lokasi "+
						"	left outer join rra_karyawan e on e.nik = a.nik_app3 and e.kode_lokasi = a.kode_lokasi "+
			                             "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_ubis");
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
			    this.standarLib.showListData(this, "Daftar Unit Bisnis",sender,undefined, 
											  "select kode_ubis, nama  from rra_ubis where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_ubis) from rra_ubis where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_ubis","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result, callObj){
		if (sender == this.dbLib && this == callObj){
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
			var temp = this.dbLib.runSQL("select kode_ubis,nama from rra_ubis  "+
				" where ( upper(nama) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(kode_ubis) like '%"+this.e_cari.getText().toUpperCase()+"%' "+
				" ) order by kode_ubis ");
			
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
