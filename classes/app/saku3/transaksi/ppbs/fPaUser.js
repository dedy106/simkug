window.app_saku3_transaksi_ppbs_fPaUser = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaUser.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaUser";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data User : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar User","Data User","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["NIK","Nama","Kode PP","Nama PP","Status","Menu"],
					colWidth:[[3,2,1,0],[150,80,250,100,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:150, tag:1});	
		this.e_pass = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Password", password:true,maxLength:10});		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Status User",items:["Administrator","User","PP"],readOnly:true,tag:2});
		//this.c_menu = new saiCB(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"Menu",items:["PPBS","SDM","PRODI","UMUM","U-PPBS"],readOnly:true,tag:2});
		this.c_menu = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Menu",readOnly:true});
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"NIK",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ");
			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.tahun+"' ",["kode_pp","nama"],false,["NIK","Nama"],"and","Data PP",true);
			this.c_menu.items.clear();
			var data = this.dbLib.getDataProvider(
						"select distinct kode_klp from menu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_menu.addItem(i,line.kode_klp);
				}
			}		
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaUser.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaUser.implement({
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
					var sts_admin="";
					if (this.c_status.getText()=="Administrator") {sts_admin="A"};
					if (this.c_status.getText()=="User") {sts_admin="U"};
					if (this.c_status.getText()=="PP") {sts_admin="P"};
					var sql = new server_util_arrayList();
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");

					sql.add("insert into agg_user(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"')");
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
	simpan2: function(){			
		try{						
			if (this.sg.getRowValidCount() > 0){
				uses("server_util_arrayList");
				
				var sql = new server_util_arrayList();
				sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from karyawan_pp where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");

				sql.add("insert into agg_user(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"')");

				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
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
					var sts_admin="";
					if (this.c_status.getText()=="Administrator") {sts_admin="A"};
					if (this.c_status.getText()=="User") {sts_admin="U"};
					if (this.c_status.getText()=="PP") {sts_admin="P"};
					var sql = new server_util_arrayList();
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_user where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");

					sql.add("insert into agg_user(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"')");

					this.dbLib.execArraySQL(sql);
					setTipeButton(tbAllFalse);
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
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_user where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
	doUpload: function(){
		system.confirm(this, "upload", "Apa data sudah benar?","data diform ini apa sudah benar.");
		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
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
			case "upload" :	
				this.simpan2();
				break;
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select a.nik,a.nama,a.status_admin,a.kode_klp_menu,a.pass,b.kode_pp "+
							"from hakakses a "+
							"inner join agg_user b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);		
						var sts_admin="";
						if (line.status_admin=="A") {sts_admin="Administrator"};
						if (line.status_admin=="U") {sts_admin="User"};
						if (line.status_admin=="P") {sts_admin="PP"};
						this.e_pass.setText(line.pass);
						this.c_status.setText(sts_admin);
						this.c_menu.setText(line.kode_klp_menu);
						this.cb_pp.setText(line.kode_pp);
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
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.e_kode2.getText() != "") var filter = filter+" and a.nik = '"+this.e_kode2.getText()+"' ";
			if (this.e_nama2.getText() != "") var filter = filter+" and a.nama like '%"+this.e_nama2.getText()+"%' ";
			
			var strSQL = "select a.nik,a.nama,b.kode_pp,c.nama as nama_pp,a.kode_klp_menu,a.status_admin "+
		             "from hakakses a "+
					"inner join agg_user b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and c.tahun='"+this.tahun+"' order by a.nik ";		
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
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
														"select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
														"select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("nik","nama"),"and",new Array("Kode","Nama"),false);			
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.nik,a.nama,b.kode_pp,c.nama as nama_pp,a.kode_klp_menu,a.status_admin "+
		             "from hakakses a "+
					"inner join agg_user b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"' and c.tahun='"+this.tahun+"' order by a.nik ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.nik,line.nama,line.kode_pp,line.nama_pp,line.status_admin,line.kode_klp_menu]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});