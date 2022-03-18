window.app_saku2_transaksi_aka_fMhsLoadTU = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fMhsLoadTU.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_fMhsLoadTU";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Mahasiswa", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});		
		this.cb_jur = new saiCBBL(this,{bound:[20,14,200,20],caption:"Prodi", multiSelection:false, maxLength:10, tag:2});
		this.cb_akt = new saiCBBL(this,{bound:[20,15,200,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:2});
		this.cb_jalur = new saiCBBL(this,{bound:[20,16,200,20],caption:"Jalur Masuk", multiSelection:false, maxLength:10, tag:2});
		this.cb_fak = new saiCBBL(this,{bound:[20,15,200,20],caption:"Fakultas", multiSelection:false, maxLength:10, tag:2});		
		this.c_status = new saiCB(this,{bound:[20,13,180,20],caption:"Status",items:["AKTIF","NONAKTIF"],readOnly:true,tag:2}); 
		this.c_bea = new saiCB(this,{bound:[20,12,180,20],caption:"Beasiswa",items:["Y","T"],readOnly:true,tag:2}); 
		this.c_modul = new saiCB(this,{bound:[20,14,180,20],caption:"Modul",items:["INPUT","LOAD"],readOnly:true,tag:2}); 		
		this.bUpload = new portalui_uploader(this,{bound:[720,14,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,800,304],caption:"Data Mahasiswa"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:8,tag:9,
				colTitle:["NIM","Nama","Jalur","Beasiswa","Status","Prodi","Angkatan","Fakultas"],
				colWidth:[[7,6,5,4,3,2,1,0],[70,70,70,70,70,70,220,70]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();				
		
		this.cb_jur.setSQL("select kode_jur, nama from aka_jurusan where kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Prodi",true);		
		this.cb_akt.setSQL("select kode_akt, nama from aka_angkatan where kode_lokasi='"+this.app._lokasi+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);		
		this.cb_jalur.setSQL("select kode_jalur, nama from aka_jalur where kode_lokasi='"+this.app._lokasi+"'",["kode_jalur","nama"],false,["Kode","Nama"],"and","Data Jalur Masuk",true);		
		this.cb_fak.setSQL("select kode_fakultas, nama from aka_fakultas where kode_lokasi='"+this.app._lokasi+"'",["kode_fakultas","nama"],false,["Kode","Nama"],"and","Daftar Fakultas",true);
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku2_transaksi_aka_fMhsLoadTU.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_fMhsLoadTU.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
			
			var line;
			this.bpp=this.up3=this.sdp2 = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				this.bpp = this.bpp + parseFloat(line.bpp);
				this.up3 = this.up3 + parseFloat(line.up3);
				this.sdp2 = this.sdp2 + parseFloat(line.sdp2);
			}
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([
			line.nim,line.nama,line.jalur,line.beasiswa,line.status,line.prodi,line.angkatan,line.fakultas]);
		}
		this.sg1.setNoUrut(start);
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
					this.cb_fak.setTag("2");
					this.cb_jur.setTag("2");
					this.cb_akt.setTag("2");
					this.cb_jalur.setTag("2");
					this.c_status.setTag("2");
					this.c_bea.setTag("2");
					this.sg1.setTag("9");
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (this.c_modul.getText() == "INPUT") {
						this.cb_kode.setTag("0");
						this.e_nama.setTag("0");
						this.cb_fak.setTag("2");
						this.cb_jur.setTag("2");
						this.cb_akt.setTag("2");
						this.cb_jalur.setTag("2");
						this.c_status.setTag("2");
						this.c_bea.setTag("2");
						this.sg1.setTag("9");
					}
					else {
						this.cb_kode.setTag("9");
						this.e_nama.setTag("9");
						this.cb_fak.setTag("9");
						this.cb_jur.setTag("9");
						this.cb_akt.setTag("9");
						this.cb_jalur.setTag("9");
						this.c_status.setTag("9");
						this.c_bea.setTag("9");
						this.sg1.setTag("0");
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							if (this.c_modul.getText() == "INPUT") {
								sql.add("insert into aka_mahasiswa(nim,nama,kode_lokasi,kode_jur,kode_akt,kode_jalur,flag_status,flag_bea,kode_fakultas) values "+
										"	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_jur.getText()+"','"+this.cb_akt.getText()+"','"+this.cb_jalur.getText()+"','"+this.c_status.getText()+"','"+this.c_bea.getText()+"','"+this.cb_fak.getText()+"')");
							}
							else {							
								var line;
								for (var i=0; i < this.dataUpload.rows.length;i++){
									line = this.dataUpload.rows[i];
									sql.add("insert into aka_mahasiswa(nim,nama,kode_lokasi,kode_jur,kode_akt,kode_jalur,flag_status,flag_bea,kode_fakultas) values "+
											"('"+line.nim+"','"+line.nama+"','"+this.app._lokasi+"','"+line.prodi+"','"+line.angkatan+"','"+line.jalur+"','"+line.status+"','"+line.beasiswa+"','"+line.fakultas+"')");
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
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("update aka_mahasiswa set nama='"+this.e_nama.getText()+"',kode_jur='"+this.cb_jur.getText()+"',kode_akt='"+this.cb_akt.getText()+"',kode_jalur='"+this.cb_jalur.getText()+"',flag_status='"+this.c_status.getText()+"',flag_bea='"+this.c_bea.getText()+"',kode_fakultas='"+this.cb_fak.getText()+"' where nim = '"+this.cb_kode.getText()+"'  and kode_lokasi = '"+this.app._lokasi+"' ");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				break;
			case "hapus" :	
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
				var data = this.dbLib.getDataProvider("select a.nama,a.kode_jur,a.kode_akt,a.kode_jalur,a.flag_status,a.flag_bea,b.nama as nama_jur,c.nama as nama_akt,d.nama as nama_jalur,a.kode_fakultas "+
				           " from aka_mahasiswa a inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi "+
						   "                      inner join aka_angkatan c on a.kode_akt=c.kode_akt and a.kode_lokasi=c.kode_lokasi "+
						   "                      inner join aka_jalur d on a.kode_jalur=d.kode_jalur and a.kode_lokasi=d.kode_lokasi "+
						   " where a.nim ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_fak.setText(line.kode_fakultas);
						this.cb_jur.setText(line.kode_jur,line.nama_jur);
						this.cb_akt.setText(line.kode_akt,line.nama_akt);
						this.cb_jalur.setText(line.kode_jalur,line.nama_jalur);
						this.c_status.setText(line.flag_status);
						this.c_bea.setText(line.flag_bea);
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.cb_kode.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
