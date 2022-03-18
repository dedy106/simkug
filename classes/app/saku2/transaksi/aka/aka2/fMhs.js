window.app_saku2_transaksi_aka_aka2_fMhs = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fMhs.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_aka2_fMhs";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Mahasiswa", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.c_modul = new saiCB(this,{bound:[20,13,180,20],caption:"Jenis Input",items:["LOAD","INPUT"],readOnly:true,tag:2}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Upload Data Mahasiswa","Input Data Mahasisa"]});				
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
				colTitle:["NIM","Nama","Prodi","Angkatan","Kelas"],
				colWidth:[[4,3,2,1,0],[100,100,100,320,100]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		this.cb_kode = new saiCBBL(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:100});		
		this.cb_jur = new saiCBBL(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Prodi", multiSelection:false, maxLength:10, tag:2});
		this.cb_akt = new saiCBBL(this.pc2.childPage[1],{bound:[20,15,200,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:2});
		this.cb_kelas = new saiCBBL(this.pc2.childPage[1],{bound:[20,17,200,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:2});
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,13,180,20],caption:"Status",items:["AKTIF","NONAKTIF"],readOnly:true,tag:2}); 
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		this.setTabChildIndex();				
		
		this.cb_jur.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi",true);		
		this.cb_akt.setSQL("select kode_akt, nama from aka_angkatan where kode_lokasi='"+this.app._lokasi+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);		
		this.cb_kelas.setSQL("select kode_jalur, nama from aka_jalur where kode_lokasi='"+this.app._lokasi+"'",["kode_jalur","nama"],false,["Kode","Nama"],"and","Data Kelas",true);		
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku2_transaksi_aka_aka2_fMhs.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_aka2_fMhs.implement({	
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
					this.cb_kode.setTag("0");
					this.e_nama.setTag("0");
					this.cb_jur.setTag("2");
					this.cb_akt.setTag("2");
					this.cb_kelas.setTag("2");
					this.c_status.setTag("2");
					this.sg1.setTag("9");
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					if (this.c_modul.getText() == "INPUT") {
						this.cb_kode.setTag("0");
						this.e_nama.setTag("0");
						this.cb_jur.setTag("2");
						this.cb_akt.setTag("2");
						this.cb_kelas.setTag("2");
						this.c_status.setTag("2");
						this.sg1.setTag("9");
					}
					else {
						this.cb_kode.setTag("9");
						this.e_nama.setTag("9");
						this.cb_jur.setTag("9");
						this.cb_akt.setTag("9");
						this.cb_kelas.setTag("9");
						this.c_status.setTag("9");
						this.sg1.setTag("0");
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							if (this.c_modul.getText() == "INPUT") {
								sql.add("insert into aka_mahasiswa(nim,nama,kode_lokasi,kode_jur,kode_akt,kode_jalur,flag_status,flag_bea,kode_fakultas) values "+
										"	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_jur.getText()+"','"+this.cb_akt.getText()+"','"+this.cb_kelas.getText()+"','"+this.c_status.getText()+"','-','-')");
							}
							else {							
								var line;
								for (var i=0;i < this.sg1.getRowCount();i++){									
									sql.add("insert into aka_mahasiswa(nim,nama,kode_lokasi,kode_jur,kode_akt,kode_jalur,flag_status,flag_bea,kode_fakultas) values "+
											"('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','AKTIF','-','-')");
								}
							}
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
			case "ubah" :		
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("update aka_mahasiswa "+
					        "set nama='"+this.e_nama.getText()+"',kode_jur='"+this.cb_jur.getText()+"',kode_akt='"+this.cb_akt.getText()+"',flag_status='"+this.c_status.getText()+"',kode_jalur='"+this.cb_kelas.getText()+"' "+
					        "where nim = '"+this.cb_kode.getText()+"'  and kode_lokasi = '"+this.app._lokasi+"' ");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				break;
			case "hapus" :	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("delete from aka_mahasiswa  where nim = '"+this.cb_kode.getText()+"'  and kode_lokasi = '"+this.app._lokasi+"' ");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
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
