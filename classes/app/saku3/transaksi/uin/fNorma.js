window.app_saku3_transaksi_uin_fNorma = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fNorma.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fNorma";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Norma Biaya", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.c_tahun = new saiCB(this,{bound:[20,11,200,20],caption:"Tahun", readOnly:true,tag:2,change:[this,"doChange"]});
		this.c_modul = new saiCB(this,{bound:[20,13,200,20],caption:"Model Input",items:["INPUT","LOAD","COPY"], readOnly:true,tag:2,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,420], childPage:["Daftar Norma","Data Norma","Filter Cari","Upload Data","Copy Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Satuan","Harga","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,100,300,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],
					click:[this,"doSgBtnClick1"], colAlign:[[4],[alCenter]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		

		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:200, tag:1});	
		this.e_sat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Satuan", maxLength:20, tag:1});	
		this.e_tarif = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,200,20],caption:"Harga",tipeText:ttNilai,tag:1});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Jenis",items:["BELANJA","PDPT"], readOnly:true,tag:2});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});

		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					colTitle:["Kode","Nama","Satuan","Harga","Jenis"],
					colWidth:[[4,3,2,1,0],[100,100,100,300,100]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});	
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPager1"]});		

		this.c_tahun1 = new saiCB(this.pc1.childPage[4],{bound:[20,11,200,20],caption:"Tahun Ref", readOnly:true,tag:9});
		this.c_tahun2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,12,200,20],caption:"Tahun Copy", maxLength:4, tag:9});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_tahun.clear();	
			this.c_tahun1.clear();		
			var data = this.dbLib.getDataProvider("select tahun from uin_tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
					this.c_tahun1.addItem(i,line.tahun);
				}
			}
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fNorma.extend(window.childForm);
window.app_saku3_transaksi_uin_fNorma.implement({
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
					if (this.c_modul.getText() == "INPUT") {
						sql.add("insert into uin_norma(kode_norma,nama,kode_lokasi,flag_aktif,tahun,kode_akun,satuan,nilai,jenis) values "+
								 "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','1','"+this.c_tahun.getText()+"','-','"+this.e_sat.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+this.c_jenis.getText()+"')");
					}
					if (this.c_modul.getText() == "LOAD") {
						for (var i=0; i < this.sg2.getRowCount();i++){							
								sql.add("insert into uin_norma (kode_norma,nama,kode_lokasi,flag_aktif,tahun,kode_akun,satuan,nilai,jenis) values "+
										"('"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','1','"+this.c_tahun.getText()+"','-','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+",'"+this.sg2.cells(4,i)+"')");														
						}
					}
					if (this.c_modul.getText() == "COPY") {		
						if (this.c_tahun1.getText()!="" && this.c_tahun2.getText()!="") {
							sql.add("insert into uin_norma(kode_norma,nama,kode_lokasi,flag_aktif,tahun,kode_akun,satuan,nilai,jenis)  "+
									"select kode_norma,nama,kode_lokasi,flag_aktif,'"+this.c_tahun2.getText()+"',kode_akun,satuan,nilai,jenis "+
									"from uin_norma where tahun='"+this.c_tahun1.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
						else {
							system.alert(this,"Tahun Referensi dan Tahun Copy harus terisi.","");
							return false;
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
					sql.add("delete from uin_norma where kode_norma = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("insert into uin_norma(kode_norma,nama,kode_lokasi,flag_aktif,tahun,kode_akun,satuan,nilai,jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','1','"+this.c_tahun.getText()+"','-','"+this.e_sat.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+this.c_jenis.getText()+"')");
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
					sql.add("delete from uin_norma where kode_norma = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
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
					this.c_modul.setText("INPUT");
					this.doLoad();
				}
				break;
			case "simpan" :	
				if (this.c_modul.getText() == "INPUT") {
					this.cb_kode.setTag("0");
					this.e_nama.setTag("1");
					this.e_sat.setTag("1");
					this.e_tarif.setTag("1");
					this.c_jenis.setTag("2");
				}					
				else {
					this.cb_kode.setTag("9");
					this.e_nama.setTag("9");
					this.e_sat.setTag("9");
					this.e_tarif.setTag("9");
					this.c_jenis.setTag("9");
				}
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
				if (this.c_tahun.getText()!="") {
					var strSQL = "select kode_norma,nama,satuan,nilai,jenis from uin_norma where tahun='"+this.c_tahun.getText()+"' and kode_norma ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_nama.setText(line.nama);	
							this.e_sat.setText(line.satuan);
							this.e_sat.setText(line.satuan);
							this.e_tarif.setText(floatToNilai(line.nilai));
							this.c_jenis.setText(line.jenis);								
							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}
				else system.alert(this,"Tahun harus dipilih.","");
			}		
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {
				this.doLoad();
			}	
			if (sender == this.c_modul) {
				if (this.c_modul.getText() == "LOAD" || this.c_modul.getText() == "COPY") setTipeButton(tbSimpan);
				else setTipeButton(tbAllFalse);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Norma",sender,undefined, 
											  "select kode_norma, nama  from uin_norma where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_norma) from uin_norma where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_norma","nama"],"where",["Kode","Nama"],false);				
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
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
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
		var strSQL = "select a.kode_norma,a.nama,a.satuan,a.nilai "+
		             "from uin_norma a "+					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' order by a.kode_norma ";		
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
			this.sg1.appendData([line.kode_norma,line.nama,line.satuan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});