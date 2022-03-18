window.app_saku3_transaksi_siswa_fSiswaLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSiswaLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siswa_fSiswaLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Siswa", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,17,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["TAMBAH","HAPUS"],readOnly:true,tag:2}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Upload Data Siswa"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
				colTitle:["NIM","Nama","Jurusan","Kelas"],
				colWidth:[[3,2,1,0],[100,100,320,100]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);
		
		
		this.setTabChildIndex();				
		
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		this.cb_pp.setText(this.app._kodePP);	
		setTipeButton(tbSimpan);				
	}
};
window.app_saku3_transaksi_siswa_fSiswaLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_siswa_fSiswaLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					
					this.sg1.setTag("9");
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					
						
					
					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							if (this.c_modul.getText() == "HAPUS") {
								sql.add("delete from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");
							}
							var line;
							for (var i=0;i < this.sg1.getRowCount();i++){									
								sql.add("insert into sis_siswa(nis,kode_lokasi,nama,flag_aktif,kode_jur,kode_kelas,kode_pp) values "+
											"('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','1','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.cb_pp.getText()+"')");
							}
							
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
				
		}
	},	
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,a.kode_jur,a.kode_akt,a.flag_status,b.nama as nama_jur,c.nama as nama_akt,a.kode_jalur "+
				           " from aka_mahasiswa a inner join pp b on a.kode_jur=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						   "                      inner join aka_angkatan c on a.kode_akt=c.kode_akt and a.kode_lokasi=c.kode_lokasi "+
						   " where a.nim ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_jur.setText(line.kode_jur,line.nama_jur);
						this.cb_akt.setText(line.kode_akt,line.nama_akt);
						this.c_status.setText(line.flag_status);
						this.cb_kelas.setText(line.kode_jalur);
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Mahasiswa",sender,undefined, 
											  "select nim, nama  from aka_mahasiswa where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nim) from aka_mahasiswa where kode_lokasi='"+this.app._lokasi+"'",
											  ["nim","nama"],"and",["NIM","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses dieksekusi.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
