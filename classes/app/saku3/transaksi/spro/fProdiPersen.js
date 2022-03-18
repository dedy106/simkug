window.app_saku3_transaksi_spro_fProdiPersen = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fProdiPersen.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spro_fProdiPersen";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Prosentase Prodi: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Prosentase Prodi","Data Prosentase Prodi","Filter Cari","Upload Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["Kode PP","Nama PP","Kode Akun","Nama Akun","Kode Prodi","Nama Prodi","Persen","Id"],
					colWidth:[[7,6,5,4,3,2,1,0],[0,50,250,60,250,60,150,60]],
					readOnly:true,
					colFormat:[[6],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		//this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});	
		this.cb_kode = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:1});		
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Akun", multiSelection:false, maxLength:10, tag:1});
		this.cb_prodi = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Prodi", multiSelection:false, maxLength:10, tag:1});
		this.e_persen = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,180,20],caption:"Persen", maxLength:20, tag:1,tipeText:ttNilai, text:"0"});	
		
		this.cb_pp2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:1});
		this.cb_akun2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:1});
		this.cb_prodi2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Kode Prodi", multiSelection:false, maxLength:10, tag:1});
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,15,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[30,16,200,20],caption:"Status Data",items:["1. TAMBAH","2. HAPUS"], readOnly:true,tag:9});
		this.bUpload = new button(this.pc1.childPage[3],{bound:[250,16,80,18],caption:"Simpan Upload",click:[this,"doUpload"]});
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:1,
		            colTitle:["Kode PP","Kode Prodi","Kode Akun","Persen"],
					colWidth:[[3,2,1,0],[80,80,300,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.pc1.childPage[3].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_kode.setSQL("select kode_pp,nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);
			this.cb_akun.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Data Akun",true);
			this.cb_prodi.setSQL("select kode_prodi,nama from prodi where kode_lokasi='"+this.app._lokasi+"'",["kode_prodi","nama"],false,["Kode","Nama"],"where","Data Prodi",true);
			this.cb_pp2.setSQL("select kode_pp,nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);
			this.cb_akun2.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Data Akun",true);
			this.cb_prodi2.setSQL("select kode_prodi,nama from prodi where kode_lokasi='"+this.app._lokasi+"'",["kode_prodi","nama"],false,["Kode","Nama"],"where","Data Prodi",true);
			this.cb_lokasi.setText(this.app._lokasi);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spro_fProdiPersen.extend(window.childForm);
window.app_saku3_transaksi_spro_fProdiPersen.implement({
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
					sql.add("insert into prodi_persen(kode_pp, kode_lokasi, kode_prodi, kode_akun, persen) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.cb_prodi.getText()+"','"+this.cb_akun.getText()+"', "+this.e_persen.getText()+")");
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
				
				if (this.c_status2.getText().substr(0,1)=="2")
				{
					sql.add("delete from prodi_persen where kode_lokasi='"+this.app._lokasi+"'");
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into prodi_persen(kode_pp, kode_lokasi, kode_prodi, kode_akun, persen) values "+
						    "	('"+this.sg.cells(0,i)+"','"+this.cb_lokasi.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"', "+nilaiToFloat(this.sg.cells(3,i))+")");

					}
				}
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
					var sql = new server_util_arrayList();
					sql.add("delete from prodi_persen where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' and kode_akun='"+this.cb_akun.getText()+"' and kode_prodi='"+this.cb_prodi.getText()+"'");			

					sql.add("insert into prodi_persen(kode_pp, kode_lokasi, kode_prodi, kode_akun, persen) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.cb_prodi.getText()+"','"+this.cb_akun.getText()+"', "+this.e_persen.getText()+")");
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
					sql.add("delete from prodi_persen where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' and kode_akun='"+this.cb_akun.getText()+"' and kode_prodi='"+this.cb_prodi.getText()+"'");			
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.doLoad();
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
			case "upload" :	
				this.simpan2();
				break;
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") this.doLoad();
	
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_pp,nama,flag_aktif,kode_bidang from pp "+
						     "where kode_pp ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						/*
						this.e_nama.setText(line.nama);
						this.cb_bidang.setText(line.kode_bidang);
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");
						*/
						setTipeButton(tbUbah);
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
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.cb_akun.setText(this.sg1.cells(2,row));
				this.cb_prodi.setText(this.sg1.cells(4,row));
				this.e_persen.setText(this.sg1.cells(6,row));
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){				
		var pp="";var akun="";var prodi="";
		if (this.cb_pp2.getText() != "") var pp = " and a.kode_pp='"+this.cb_pp2.getText()+"' ";
		if (this.cb_akun2.getText() != "") var akun = " and a.kode_akun='"+this.cb_akun2.getText()+"' ";
		if (this.cb_prodi2.getText() != "") var prodi = " and a.kode_prodi='"+this.cb_prodi2.getText()+"'  ";
		var strSQL = "select a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,a.kode_prodi,d.nama as nama_prodi,a.persen,a.no "+
					"from prodi_persen a "+
					"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					"inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join prodi d on a.kode_prodi=d.kode_prodi and a.kode_lokasi=d.kode_lokasi "+
					"where a.kode_lokasi='"+this.cb_lokasi.getText()+" '"+pp+akun+prodi+
					" order by a.kode_pp,a.kode_akun";	
					 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_pp,b.nama as nama_pp,a.kode_akun,c.nama as nama_akun,a.kode_prodi,d.nama as nama_prodi,a.persen,a.no "+
					"from prodi_persen a "+
					"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					"inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join prodi d on a.kode_prodi=d.kode_prodi and a.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.kode_pp,a.kode_akun ";		
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
			this.sg1.appendData([line.kode_pp,line.nama_pp,line.kode_akun,line.nama_akun,line.kode_prodi,line.nama_prodi,floatToNilai(line.persen),line.no]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});