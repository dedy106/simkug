window.app_saku2_transaksi_aka_aka2_fProdukFilter = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fProdukFilter.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fProdukFilter";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Produk Piutang by Filter", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		
		this.c_jenis = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Edit",items:["EDIT","REPLACE"],readOnly:true,tag:2}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Filter Data","Data Parameter","Editing","Replace Param"]});		
		this.cb_produk = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Produk", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun Pdpt", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_akt = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Prodi", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_kelas = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2 });		
		this.bTampil = new button(this.pc2.childPage[0],{bound:[120,10,100,18],caption:"Load Data",click:[this,"doTampilClick"]});					

		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:12,tag:0,
		            colTitle:["Kode Produk","Nama","Akun Piutang","Akun Pdpt","Akun PDD","Akun BP","Akun AP","Kode DRK","Kode Akt","Prodi","Kelas","Tarif"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,120,80,80,80,80,80,150,70]],
					colFormat:[[11],[cfNilai]],					
					defaultRow:1,autoAppend:false});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});
			
		this.cb_piutang = new saiCBBL(this.pc2.childPage[2],{bound:[20,11,220,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:1 });		
		this.cb_pdpt = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Akun Pdpt", multiSelection:false, maxLength:10, tag:1 });		
		this.cb_pdd = new saiCBBL(this.pc2.childPage[2],{bound:[20,13,220,20],caption:"Akun PDD", multiSelection:false, maxLength:10, tag:1 });		
		this.cb_bp = new saiCBBL(this.pc2.childPage[2],{bound:[20,14,220,20],caption:"Akun BP", multiSelection:false, maxLength:10, tag:1 });		
		this.cb_ap = new saiCBBL(this.pc2.childPage[2],{bound:[20,15,220,20],caption:"Akun AP", multiSelection:false, maxLength:10, tag:1 });				
		this.e_tahun = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,18,200,20],caption:"Tahun DRK", tag:2, tipeText:ttAngka, text:"",change:[this,"doChange"]});										
		this.cb_drk2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,16,220,20],caption:"Akun DRK", multiSelection:false, maxLength:10, tag:1 });		
		this.bEdit = new button(this.pc2.childPage[2],{bound:[120,10,100,18],caption:"Edit Grid",click:[this,"doEditClick"]});					

		this.sg1 = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:12,tag:0,
			colTitle:["Kode Produk","Nama","Akun Piutang","Akun Pdpt","Akun PDD","Akun BP","Akun AP","Kode DRK","Kode Akt","Prodi","Kelas","Tarif"],
			colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,120,80,80,80,80,80,150,70]],
			colFormat:[[11],[cfNilai]],					
			pasteEnable:true,
			defaultRow:1,autoAppend:false});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);

		setTipeButton(tbUbah);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_produk.setSQL("select distinct kode_produk, nama from aka_produk where kode_lokasi = '"+this.app._lokasi+"'",["kode_produk","nama"],false,["Kode","Nama"],"and","Data Produk",true);		
			this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a "+
								"inner join aka_produk b on a.kode_akun=b.akun_pdpt and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Pendapatan",true);		
			this.cb_akt.setSQL("select distinct a.kode_akt, a.nama from aka_angkatan a "+
								"inner join aka_produk b on a.kode_akt=b.kode_akt and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);		
			this.cb_pp.setSQL("select distinct a.kode_pp, a.nama from pp a "+
								"inner join aka_produk b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi",true);							
			this.cb_kelas.setSQL("select distinct a.kode_jalur, a.nama from aka_jalur a "+
								"inner join aka_jalur b on a.kode_jalur=b.kode_jalur and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_jalur","nama"],false,["Kode","Nama"],"and","Data Kelas",true);		
			this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a "+
								"inner join aka_produk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);							

			this.cb_piutang.setSQL("select a.kode_akun, a.nama from masakun a "+								
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Piutang",true);							
			this.cb_pdpt.setSQL("select a.kode_akun, a.nama from masakun a "+								
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Pendapatan",true);							
			this.cb_pdd.setSQL("select a.kode_akun, a.nama from masakun a "+								
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Pendapatan",true);							
			this.cb_bp.setSQL("select a.kode_akun, a.nama from masakun a "+								
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Pendapatan",true);							
			this.cb_ap.setSQL("select a.kode_akun, a.nama from masakun a "+								
								"where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Akun Pendapatan",true);												


			var strSQL = "select year(getdate()) as tahun";						
			var data = this.dbLib.getDataProvider(strSQL,true);
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
window.app_saku2_transaksi_aka_aka2_fProdukFilter.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fProdukFilter.implement({		
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from aka_produk where kode_lokasi='"+this.app._lokasi+"' "+this.filter+" ");								

					if (this.c_jenis.getText() == "EDIT") {
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){															    
									sql.add("insert into aka_produk(kode_produk,nama,kode_lokasi,akun_piutang,akun_pdpt,akun_pdd,akun_bp,akun_ap,no_urut,kode_pp,kode_drk,kode_akt,kode_jalur,tarif) values "+
											"	('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"',"+i+",'"+this.sg.cells(9,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(10,i)+"',"+nilaiToFloat(this.sg.cells(11,i))+")");
								}
							}
						}
					}			
					if (this.c_jenis.getText() == "REPLACE") {
						if (this.sg1.getRowValidCount() > 0){
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){															    
									sql.add("insert into aka_produk(kode_produk,nama,kode_lokasi,akun_piutang,akun_pdpt,akun_pdd,akun_bp,akun_ap,no_urut,kode_pp,kode_drk,kode_akt,kode_jalur,tarif) values "+
											"	('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"',"+i+",'"+this.sg1.cells(9,i)+"','"+this.sg1.cells(7,i)+"','"+this.sg1.cells(8,i)+"','"+this.sg1.cells(10,i)+"',"+nilaiToFloat(this.sg1.cells(11,i))+")");
								}
							}
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
				this.standarLib.clearByTag(this, new Array("0","1"),undefined);
				this.sg.clear(1); this.sg1.clear(1);
				break;
			case "ubah" :	
				if (this.c_jenis.getText()=="EDIT") {
					this.sg.setTag("0");
					this.sg1.setTag("9");
				}
				else {
					this.sg.setTag("9");
					this.sg1.setTag("0");
				}
				this.ubah();
				break;								
		}
	},
	doEditClick: function(sender){
		for (var i=0;i < this.sg.getRowCount();i++){
			//["Kode Produk","Nama","Akun Piutang","Akun Pdpt","Akun PDD","Akun BP","Akun AP","Kode DRK","Kode Akt","Prodi","Kelas","Tarif"],
			if (this.cb_piutang.getText() != "") this.sg.cells(2,i,this.cb_piutang.getText());
			if (this.cb_pdpt.getText() != "") this.sg.cells(3,i,this.cb_pdpt.getText());
			if (this.cb_pdd.getText() != "") this.sg.cells(4,i,this.cb_pdd.getText());
			if (this.cb_bp.getText() != "") this.sg.cells(5,i,this.cb_bp.getText());
			if (this.cb_ap.getText() != "") this.sg.cells(6,i,this.cb_ap.getText());
			if (this.cb_drk2.getText() != "") this.sg.cells(7,i,this.cb_drk2.getText());
		}
		this.pc2.setActivePage(this.pc2.childPage[1]);	
	},
	doTampilClick: function(sender){	
		this.filter = "";
		if (this.cb_produk.getText() != "") this.filter  = " and kode_produk='"+this.cb_produk.getText()+"' ";
		if (this.cb_akun.getText()   != "") this.filter += " and akun_pdpt='"+this.cb_akun.getText()+"' ";
		if (this.cb_akt.getText()    != "") this.filter += " and kode_akt='"+this.cb_akt.getText()+"' ";
		if (this.cb_pp.getText()     != "") this.filter += " and kode_pp='"+this.cb_pp.getText()+"' ";
		if (this.cb_kelas.getText()  != "") this.filter += " and kode_jalur='"+this.cb_kelas.getText()+"' ";
		if (this.cb_drk.getText()    != "") this.filter += " and kode_drk='"+this.cb_drk.getText()+"' ";

		var data = this.dbLib.getDataProvider(
					"select kode_produk,nama,akun_piutang,akun_pdpt,akun_pdd,akun_bp,akun_ap,kode_drk,kode_akt,kode_pp,kode_jalur,tarif "+
					"from aka_produk "+
					"where kode_lokasi='"+this.app._lokasi+"' "+this.filter+" order by no_urut",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_produk,line.nama,line.akun_piutang,line.akun_pdpt,line.akun_pdd,line.akun_bp,line.akun_ap,line.kode_drk,line.kode_akt,line.kode_pp,line.kode_jalur,floatToNilai(line.tarif)]);
			}
		} else this.sg.clear(1);
		
		this.pc2.setActivePage(this.pc2.childPage[1]);	
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");																					
							setTipeButton(tbUbahHapus);
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
	doChange: function(sender){
		if (sender == this.e_tahun && this.e_tahun.getText()!="") {
			this.cb_drk2.setSQL("select distinct a.kode_drk, a.nama from drk a "+
								"where a.tahun='"+this.e_tahun.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);							
		}

	}
});