window.app_hris_transaksi_rekrut_fRekPelamar = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_rekrut_fRekPelamar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_rekrut_fRekPelamar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pelamar dan Keluarga", 0);	
		this.maximize();
		uses("saiCBBL;saiCB;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		try {
			
		    this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIP",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		    this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGenerate"]});
			this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:145, tag:1});		
			
			this.pc1 = new pageControl(this,{bound:[20,12,this.width - 295, this.height - 100], childPage:["Data Pelamar","Data Keluarga"]}); 									    
			this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,400,20],caption:"Tempat Lahir", maxLength:50, tag:1});		
			this.l_tgl = new label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tanggal Lahir", underline:true});
			this.dp_d1 = new datePicker(this.pc1.childPage[0],{bound:[120,13,100,18],date:new Date().getDateStr()});
			this.e_ktp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,400,20],caption:"No KTP", maxLength:50, tag:1});		
			this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,400,20],caption:"Alamat", maxLength:200, tag:1});		
			this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Kota", multiSelection:false, maxLength:3, tag:1});
			this.cb_prop = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Propinsi", multiSelection:false, maxLength:2, tag:1});
			this.e_kodepos = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,180,20],caption:"Kodepos", tipeText: ttAngka, maxLength:5, tag:1});		
			this.e_telp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,400,20],caption:"No Telpon", maxLength:50, tag:1});		
			this.e_hp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,9,400,20],caption:"No HP", maxLength:20, tag:1});		
			this.c_sex = new saiCB(this.pc1.childPage[0],{bound:[20,20,180,20],caption:"Gender",items:["L","P"], readOnly:true});
			this.e_mail = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,400,20],caption:"Email", maxLength:100, tag:1});		
			this.c_gd = new saiCB(this.pc1.childPage[0],{bound:[20,22,180,20],caption:"Gol Darah",items:["A","B","AB","O"], readOnly:true});
			this.e_hobi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,400,20],caption:"Hobi", maxLength:100, tag:1});		
			this.cb_didik = new saiCBBL(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Pendidikan", multiSelection:false, maxLength:3, tag:1});
			this.e_jurusan = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,25,400,20],caption:"Jurusan", maxLength:50, tag:1});		
			this.e_univ = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,26,400,20],caption:"Perguruan Tinggi", maxLength:50, tag:1});		
			this.e_ipk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,27,180,20],caption:"IPK", tipeText:ttNilai, text:"0" , maxLength:50, tag:1});		
			
			this.sg = new saiGrid(this.pc1.childPage[1],{bound:[10,20,710,330],colCount:7,tag:2,
		            colTitle:["Nama","Tmp Lahir","Tgl Lahir","Kd Status","Keterangan","Gender","Institusi"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,100,70,80,100,150]],
					columnReadOnly:[true,[3,4,5],[]],
					buttonStyle:[[2,3,5],[bsDate,bsEllips,bsAuto]], 
					colFormat:[[2],[cfDate]],
					picklist:[[5],[new portalui_arrayMap({items:["L","P"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
			this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[10,290,715,25],buttonStyle:2,grid:this.sg});

			this.rearrangeChild(10, 23);
			this.pc1.childPage[0].rearrangeChild(10, 22);
			this.pc1.childPage[1].rearrangeChild(10, 22);
						
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_prop.setSQL("select kode_prov, nama from gr_prov",["kode_prov","nama"],false,["Kode","Nama"],"where","Data Propinsi",true);	
			this.cb_kota.setSQL("select kode_kota, nama from gr_kota",["kode_kota","nama"],false,["Kode","Nama"],"where","Data Kota",true);	
			this.cb_didik.setSQL("select sts_didik, nama from gr_status_didik where kode_lokasi='"+this.app._lokasi+"'",["sts_didik","nama"],false,["Kode","Nama"],"and","Data Tk Pendidikan",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_rekrut_fRekPelamar.extend(window.childForm);
window.app_hris_transaksi_rekrut_fRekPelamar.implement({
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
					sql.add("insert into gr_rekrut_pelamar(nip,kode_prov,no_ktp,nama,tempat,tgl_lahir,alamat,kode_kota,kodepos,no_telp,no_hp,sex,email,gol_darah,hobi,sts_didik,jurusan,univ,ipk,flag_terima,flag_progress,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_prop.getText()+"','"+this.e_ktp.getText()+"','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_alamat.getText()+"','"+this.cb_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_hp.getText()+"','"+this.c_sex.getText()+"','"+this.e_mail.getText()+"','"+this.c_gd.getText()+"','"+this.e_hobi.getText()+"','"+this.cb_didik.getText()+"','"+this.e_jurusan.getText()+"','"+this.e_univ.getText()+"',"+parseNilai(this.e_ipk.getText())+",'0','0','"+this.app._lokasi+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_rekrut_keluarga(nip,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi) values "+  
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update gr_rekrut_pelamar set kode_prov='"+this.cb_prop.getText()+"',no_ktp='"+this.e_ktp.getText()+"',nama='"+this.e_nama.getText()+"',tempat='"+this.e_tempat.getText()+"',tgl_lahir='"+this.dp_d1.getDateString()+"',alamat='"+this.e_alamat.getText()+"',kode_kota='"+this.cb_kota.getText()+"',kodepos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',no_hp='"+this.e_hp.getText()+"',sex='"+this.c_sex.getText()+"',email='"+this.e_mail.getText()+"',gol_darah='"+this.c_gd.getText()+"',hobi='"+this.e_hobi.getText()+"',sts_didik='"+this.cb_didik.getText()+"',jurusan='"+this.e_jurusan.getText()+"',univ='"+this.e_univ.getText()+"',ipk ="+parseNilai(this.e_ipk.getText())+" "+
						    "where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_rekrut_keluarga where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_rekrut_keluarga(nip,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi) values "+  
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rekrut_pelamar where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from gr_rekrut_keluarga where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.sg.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
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
		}
		return false;
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				this.standarLib.clearByTag(this, new Array("1"),undefined);
				var data = this.dbLib.getDataProvider(
				           "select a.kode_prov,b.nama as nama_prov,a.no_ktp,a.nama,a.tempat,a.tgl_lahir,a.alamat,a.kode_kota,a.kodepos,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah,a.hobi,a.sts_didik,a.jurusan,a.univ,a.ipk "+
				           " from gr_rekrut_pelamar a "+
						   "inner join gr_prov b on a.kode_prov=b.kode_prov "+
						   "inner join gr_kota c on a.kode_kota=c.kode_kota and a.kode_lokasi=c.kode_lokasi "+
						   "where a.nip='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_prop.setText(line.kode_prov,line.nama_prov);
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_ktp.setText(line.no_ktp);
						this.e_alamat.setText(line.alamat);
						this.cb_kota.setText(line.kode_kota);
						this.e_kodepos.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_hp.setText(line.no_hp);
						this.c_sex.setText(line.sex);
						this.e_mail.setText(line.email);
						this.c_gd.setText(line.gol_darah);
						this.e_hobi.setText(line.hobi);
						this.cb_didik.setText(line.sts_didik);
						this.e_jurusan.setText(line.jurusan);
						this.e_univ.setText(line.univ);
						this.e_ipk.setText(floatToNilai(line.ipk));
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}			
				var data = this.dbLib.getDataProvider("select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi "+
				                                      "from gr_rekrut_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
													  "where a.nip = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.nama,line.tempat,line.tgl_lahir,line.sts_kel,line.nama_sts,line.sex,line.institusi]);
					}
				} else this.sg.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Pelamar",sender,undefined, 
											  "select nip, nama  from gr_rekrut_pelamar where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nip) from gr_rekrut_pelamar where kode_lokasi='"+this.app._lokasi+"'",
											  ["nip","nama"],"and",["NIP","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 3 :
						this.standarLib.showListDataForSG(this, "Daftar Status Keluarga",this.sg, this.sg.row, this.sg.col, 
														"select sts_kel,nama   from gr_status_kel where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_kel) from gr_status_kel where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("sts_kel","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
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
	doGenerate:function(sender){
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rekrut_pelamar","nip","P"+(new Date().getThnBln().substr(2,4)),"000"));
		this.e_nama.setFocus();
	}
});
