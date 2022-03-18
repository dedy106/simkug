window.app_saku3_transaksi_bpr_fRefSimple = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fRefSimple.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fRefSimple";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Template Dual Akun", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_jenis = new saiCB(this,{bound:[20,11,200,20],caption:"Jenis",items:["PENGELUARAN","PENERIMAAN"], readOnly:true,tag:2,change:[this,"doChange"]});				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Template ","Data Template "]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode","Nama","Akun Debet","Akun Kredit","Jenis","PP"],
					colWidth:[[5,4,3,2,1,0],[200,100,100,100,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"],readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_debet = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun Debet", multiSelection:false, maxLength:10, tag:2});				
		this.cb_kredit = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Akun Kredit", multiSelection:false, maxLength:10, tag:2});				
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Unit / PP", multiSelection:false, maxLength:10, tag:2});				

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
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			
			this.c_jenis.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fRefSimple.extend(window.childForm);
window.app_saku3_transaksi_bpr_fRefSimple.implement({
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
			if (this.c_jenis.getText() == "PENGELUARAN") var vKode = "K";
			else  var vKode = "T";
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_ref","kode_ref",vKode,"000"));						
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
					sql.add("insert into trans_ref(kode_ref,kode_lokasi,nama,akun_debet,akun_kredit,kode_pp,jenis) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_debet.getText()+"','"+this.cb_kredit.getText()+"','"+this.cb_pp.getText()+"','"+this.c_jenis.getText()+"')");				
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
					sql.add("delete from trans_ref where kode_ref = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into trans_ref(kode_ref,kode_lokasi,nama,akun_debet,akun_kredit,kode_pp,jenis) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_debet.getText()+"','"+this.cb_kredit.getText()+"','"+this.cb_pp.getText()+"','"+this.c_jenis.getText()+"')");				
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
					sql.add("delete from trans_ref where kode_ref = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (sender == this.c_jenis && this.c_jenis.getText()!="") {
				this.doLoad();
			}
			if (this.cb_kode.getText() != ""){
				var strSQL = "select kode_ref,nama,akun_debet,akun_kredit,kode_pp from trans_ref where kode_ref ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.cb_debet.setText(line.akun_debet);	
						this.cb_kredit.setText(line.akun_kredit);
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
		var strSQL = "select a.kode_ref,a.nama,a.akun_debet,a.akun_kredit,a.jenis,a.kode_pp+' | '+b.nama as pp "+
					 "from trans_ref a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='"+this.c_jenis.getText()+"' order by a.kode_ref ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_ref,line.nama,line.akun_debet,line.akun_kredit,line.jenis,line.pp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});