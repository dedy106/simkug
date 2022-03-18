window.app_saku3_transaksi_rtrw_versi2_fWarga = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fWarga.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fWarga";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Warga", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Warga","Daftar Warga","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
			        colTitle:["N I K","Nama","Alamat","No HP"],
					colWidth:[[3,2,1,0],[100,300,200,120]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,250,20],caption:"NIK",maxLength:30,change:[this,"doChange"]});				
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,500,20],caption:"Nama Lengkap", maxLength:50, tag:1});	
		this.c_jk = new saiCB(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Jenis Kelamin",items:["L","P"], readOnly:true,tag:2});
		this.c_agama = new saiCB(this.pc1.childPage[0],{bound:[320,16,200,20],caption:"Agama",items:["Islam","Katolik","Protestan","Hindu","Budha","Lainnya"], readOnly:true,tag:2});
		
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,250,20],caption:"Tempat Lahir", maxLength:50, tag:1});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[320,13,100,18],caption:"Tgl Lahir", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[420,13,100,18]}); 						
		this.c_goldar = new saiCB(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Golongan Darah",items:["A","B","AB","O"], readOnly:true,tag:2});
		this.c_resus = new saiCB(this.pc1.childPage[0],{bound:[320,14,200,20],caption:"Resus",items:["Positif","Negatif","0"], readOnly:true,tag:2});
		
		this.e_didik = new saiCB(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Tk Pendidikan",items:["SD","SMP","SMA","D1","D2","D3","D4","S1","S2","S3","NON"],tag:2,maxLength:50});
		this.e_kerja = new saiCB(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Pekerjaan",items:["IRT","PNS","SWASTA","PENSIUN","PELAJAR","MAHASISWA","TNI","POLRI","TENAGA MEDIS","NON"],tag:2,maxLength:50});
		this.e_catat = new saiCB(this.pc1.childPage[0],{bound:[20,28,500,20],caption:"Catatan/Profesi",tag:2,maxLength:100,mustCheck:false});

		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Status Pernikahan",items:["KAWIN","BELUM","DUDA","JANDA"], readOnly:true,tag:2});
		this.c_stskel = new saiCB(this.pc1.childPage[0],{bound:[320,19,200,20],caption:"Status Keluarga",items:["SUAMI","ISTRI","ANAK","ART","TEMAN","SAUDARA","ORANGTUA"], readOnly:true,tag:2});
		this.c_stswarga = new saiCB(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Status WNI",items:["WNI","WNA"], readOnly:true,tag:2});
		this.c_stsdom = new saiCB(this.pc1.childPage[0],{bound:[320,21,200,20],caption:"Status Domisili",items:["DOMISILI","KTPLUAR","MHS"], readOnly:true,tag:2});

		this.e_ayah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,250,20],caption:"Nama Ayah", maxLength:50, tag:1});									
		this.e_ibu = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,250,20],caption:"Nama Ibu", maxLength:50, tag:1});									
		
		this.e_ktp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,34,250,20],caption:"No KTP", maxLength:30, tag:1});									
		this.e_passport = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,24,250,20],caption:"No Passport / KTM", maxLength:30, tag:1});									
		this.e_kitas = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,25,250,20],caption:"No Kitas/Kitap", maxLength:30, tag:1});									
		this.e_hp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,27,250,20],caption:"No HP", maxLength:30, tag:1});							
		
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,26,500,20],caption:"Alamat", maxLength:200, tag:1});		
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"N I K",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();


			this.e_catat.items.clear();

			var data = this.dbLib.getDataProvider("select distinct catatan from rt_warga",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.e_catat.addItem(i,line.catatan);
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fWarga.extend(window.childForm);
window.app_saku3_transaksi_rtrw_versi2_fWarga.implement({
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
					sql.add("insert into rt_warga (nik,nama,sex,agama,tempat_lahir,tgl_lahir,goldar,resus,didik,kerja,sts_nikah,sts_keluarga,sts_wni,sts_domisili,ayah,ibu,no_ktp,no_pass,no_kitas,no_hp,alamat,catatan,no_keluar, tgl_input,nik_user) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_jk.getText()+"','"+this.c_agama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d2.getDateString()+"','"+this.c_goldar.getText()+"','"+this.c_resus.getText()+"','"+this.e_didik.getText()+"','"+this.e_kerja.getText()+"','"+this.c_status.getText()+"','"+this.c_stskel.getText()+"','"+this.c_stswarga.getText()+"','"+this.c_stsdom.getText()+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.e_ktp.getText()+"','"+this.e_passport.getText()+"','"+this.e_kitas.getText()+"','"+this.e_hp.getText()+"','"+this.e_alamat.getText()+"','"+this.e_catat.getText()+"','-', getdate(),'"+this.app._userLog+"')");
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
					sql.add("delete from rt_warga where nik='"+this.cb_kode.getText()+"' ");					
					sql.add("insert into rt_warga (nik,nama,sex,agama,tempat_lahir,tgl_lahir,goldar,resus,didik,kerja,sts_nikah,sts_keluarga,sts_wni,sts_domisili,ayah,ibu,no_ktp,no_pass,no_kitas,no_hp,alamat,catatan,no_keluar, tgl_input,nik_user) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_jk.getText()+"','"+this.c_agama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d2.getDateString()+"','"+this.c_goldar.getText()+"','"+this.c_resus.getText()+"','"+this.e_didik.getText()+"','"+this.e_kerja.getText()+"','"+this.c_status.getText()+"','"+this.c_stskel.getText()+"','"+this.c_stswarga.getText()+"','"+this.c_stsdom.getText()+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.e_ktp.getText()+"','"+this.e_passport.getText()+"','"+this.e_kitas.getText()+"','"+this.e_hp.getText()+"','"+this.e_alamat.getText()+"','"+this.e_catat.getText()+"','-', getdate(),'"+this.app._userLog+"')");
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
					sql.add("delete from rt_warga where nik='"+this.cb_kode.getText()+"' ");									
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
					this.sg1.clear(1);
					setTipeButton(tbSimpan);
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
				var data = this.dbLib.getDataProvider("select * from rt_warga where nik='"+this.cb_kode.getText()+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_nama.setText(line.nama);
						this.c_jk.setText(line.sex);
						this.c_agama.setText(line.agama);
						this.e_tempat.setText(line.tempat_lahir);
						this.dp_d2.setText(line.tgl_lahir);
						this.c_goldar.setText(line.goldar);
						this.c_resus.setText(line.resus);
						this.e_didik.setText(line.didik);
						this.e_kerja.setText(line.kerja);
						this.e_catat.setText(line.catatan);
						this.c_status.setText(line.sts_nikah);
						this.c_stskel .setText(line.sts_keluarga);
						this.c_stswarga.setText(line.sts_wni);
						this.c_stsdom.setText(line.sts_domisili);
						this.e_ayah.setText(line.ayah);
						this.e_ibu.setText(line.ibu);
						this.e_ktp.setText(line.no_ktp);
						this.e_passport.setText(line.no_pass);
						this.e_kitas.setText(line.no_kitas);
						this.e_hp.setText(line.no_hp);
						this.e_alamat.setText(line.alamat);
						
						setTipeButton(tbUbahHapus);
					}
					else setTipeButton(tbSimpan);
				}
				else setTipeButton(tbSimpan);
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
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " nik like '%"+this.e_kode2.getText()+"%'  ";
			else var filter = " nama like '%"+this.e_nama2.getText()+"%'  ";
			
			var strSQL = "select nik,nama,alamat,no_hp,no_masuk,no_keluar "+
						 "from rt_warga "+					 
						 "where "+filter+" order by nik";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select nik,nama,alamat,no_hp "+
						 "from rt_warga "+					 
						 "order by nik";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var fino_aggh = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<fino_aggh;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.nik,line.nama,line.alamat,line.no_hp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});