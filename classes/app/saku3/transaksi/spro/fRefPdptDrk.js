window.app_saku3_transaksi_spro_fRefPdptDrk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fRefPdptDrk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spro_fRefPdptDrk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Template  : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Template ","Data Template "]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Akun Debet","Akun Kredit","Jenis"],
					colWidth:[[3,2,1,0],[100,100,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Jenis",items:["PDPT"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"],readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});			
		this.cb_debet = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Akun Debet", multiSelection:false, maxLength:10, tag:2});				
		this.cb_kredit = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Akun Kredit", multiSelection:false, maxLength:10, tag:2});						
		this.e_tahun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Tahun",maxLength:10,change:[this,"doChange"]});		
		this.cb_drk = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:1});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_debet.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_kredit.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);

			this.doLoad();

			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_tahun.setText(line.tahun);
				} 
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spro_fRefPdptDrk.extend(window.childForm);
window.app_saku3_transaksi_spro_fRefPdptDrk.implement({
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
	doClick:function(sender){
		if (this.c_jenis.getText()!= "") {
			this.stsSimpan = 1;
		
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"refju_m","kode_ref",this.c_jenis.getText().substr(0,1),"000"));						
			this.e_nama.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into refju_m(kode_ref,kode_lokasi,nama,debet,kredit,jenis,tahun,kode_drk) values ('"+
							this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_debet.getText()+"','"+this.cb_kredit.getText()+"','"+this.c_jenis.getText()+"','"+this.e_tahun.getText()+"','"+this.cb_drk.getText()+"')");
					sql.add("insert into refju_dual(kode_jurnal, kode_lokasi, nama, keterangan, akun_debet, akun_kredit, nilai, kode_pp, kode_drk, modul, jenis) "+
							"select a.kode_ref+'-'+b.kode_ba,a.kode_lokasi,a.nama,a.nama,a.debet,a.kredit,0,b.kode_pp,'-','KB','"+this.c_jenis.getText()+"' "+
							"from refju_m a "+
							"cross join pp b "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ref='"+this.cb_kode.getText()+"' and b.kode_ba like '%YB%' and b.kode_lokasi='"+this.app._lokasi+"' ");
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
					sql.add("delete from refju_m where kode_ref = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from refju_dual where kode_jurnal like '"+this.cb_kode.getText()+"%' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into refju_m(kode_ref,kode_lokasi,nama,debet,kredit,jenis,tahun,kode_drk) values ('"+
							this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_debet.getText()+"','"+this.cb_kredit.getText()+"','"+this.c_jenis.getText()+"','"+this.e_tahun.getText()+"','"+this.cb_drk.getText()+"')");

					sql.add("insert into refju_dual(kode_jurnal, kode_lokasi, nama, keterangan, akun_debet, akun_kredit, nilai, kode_pp, kode_drk, modul, jenis) "+
							"select a.kode_ref+'-'+b.kode_ba,a.kode_lokasi,a.nama,a.nama,a.debet,a.kredit,0,b.kode_pp,'-','KB','"+this.c_jenis.getText()+"' "+
							"from refju_m a "+
							"cross join pp b "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ref='"+this.cb_kode.getText()+"' and b.kode_ba like '%YB%' ");
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
					sql.add("delete from refju_m where kode_ref = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from refju_dual where kode_jurnal like '"+this.cb_kode.getText()+"%' and kode_lokasi='"+this.app._lokasi+"'");

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
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from refju_m where kode_ref ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='PDPT' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.cb_debet.setText(line.debet);	
						this.cb_kredit.setText(line.kredit);
						this.e_tahun.setText(line.tahun);	
						this.cb_drk.setText(line.kode_drk);	
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}

			if (sender == this.e_tahun && this.e_tahun.getText() != ""){
				this.cb_drk.setSQL("select kode_drk, nama from drk where tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select kode_jurnal, nama  from aka_fakultas where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_jurnal) from aka_fakultas where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_jurnal","nama"],"where",["Kode","Nama"],false);				
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
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select kode_ref,nama,debet,kredit,jenis "+
		             "from refju_m where kode_lokasi='"+this.app._lokasi+"' and jenis='PDPT' order by kode_ref ";		
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
			this.sg1.appendData([line.kode_ref,line.nama,line.debet,line.kredit,line.jenis]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});