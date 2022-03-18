/*
 * hanya berlaku untuk ju02.
 * */
window.app_saku_gl_transaksi_fUpdatePP = function(owner)
{
  if (owner)
	{
		window.app_saku_gl_transaksi_fUpdatePP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fUpdatePP";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Update data PP atau RKM Jurnal : Input", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_sgNavigator;util_dbLarge");
			uses("app_saku_gl_transaksi_fUpdatePop",true);
			this.e0 = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"No Bukti", readOnly:true});						
			this.bGenerate = new portalui_button(this,{bound:[230,10,80,20], caption:"Generate",icon:"url(icon/"+system.getThemes()+"/process.png", click:"doGenerate"});						
			this.l1 = new portalui_label(this,{bound:[20,11,100,20], caption:"Tanggal", underline:true});									
			this.dpTgl = new portalui_datePicker(this,{bound:[120,11,100,18], selectDate:[this,"doSelectDate"]});						
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,12,150,20],caption:"Periode", text:this.app._periode, readOnly:true});									
			this.cb_buat = new portalui_saiCBBL(this,{bound:[20,14,200,20], caption:"Dibuat Oleh", multiSelection:false,
				sql:["select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'", ["nik","nama"],false, ["NIK","Nama"],"and","Daftar Karyawan",true]
			});
			this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,15,200,20], caption:"Disetujui Oleh", multiSelection:false,
				sql:["select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'", ["nik","nama"],false, ["NIK","Nama"],"and","Daftar Karyawan",true]
			});
			this.eKeterangan = new portalui_saiLabelEdit(this,{bound:[20,13,600,20],caption:"Keterangan"});									
			this.cb_periode = new portalui_saiCB(this,{bound:[640,13,200,20], caption:"Periode"});						
			this.bLoad = new portalui_button(this,{bound:[840,13,80,20],caption:"Load Data",icon:"url(icon/"+system.getThemes()+"/process.png)", click:"doGenerate"});						
			this.sg1 = new portalui_saiGrid(this,{bound:[20,110,900,300],colCount:9,colTitle:'Edit,No Bukti, No Dokumen, Tanggal, Keterangan, Nilai, Kode PP, Nama PP, Posted ',
                        colFormat:[[5],[cfNilai]], colWidth:[[8,7,6,5,4,3,2,1,0],[50,150,80,100,150,80,150,100,30]],colFormat:[[0],[cfButton]],
                        colAlign:[[0,5,8],[alCenter,alRight,alCenter]],
                        readOnly:true, click:[this,"doSgClick"]});			
					
			this.sgn = new portalui_sgNavigator(this,{bound:[20,14,900,25], pager:[this,"doSelectedPage"], buttonStyle:bsView});						
			//this.eTotal = new portalui_saiLabelEdit(this.sgn,{bound:[1,670,200,20],caption:"Total", tipeText:ttNilai, alignment:alRight, readOnly:true,tag:9});									
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.dbLib2 = new util_dbLarge();
			this.dbLib2.addListener(this);
			this.standarLib = new util_standar();
			this.dtJurnal = new portalui_arrayMap();
			this.rearrangeChild(10,23);
			this.dpTgl.setDateString(new Date().getDateStr());
			this.rowPerPage = 15;			
			this.dbLib.getDataProviderA("select distinct periode from periode where kode_lokasi = '"+this.app._lokasi+"' and substring(periode,1,4) = '"+this.app._periode.substr(0,4)+"' union select distinct periode from ju_m where kode_lokasi = '"+this.app._lokasi+"' and substring(periode,1,4) = '"+this.app._periode.substr(0,4)+"' ");
			this.cb_buat.setText(this.app._userLog, this.app._namaUser);
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fUpdatePP]->constructor : "+e);
		}
	}
};
window.app_saku_gl_transaksi_fUpdatePP.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fUpdatePP.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");			
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	},
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this,["0"],this.e0);				
					this.sg1.clear(1);
					this.dpTgl.setDateString(new Date().getDateStr());
				}
			break;
			case "simpan" :
				if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
				{
					try
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						this.insertData(sql);
					}catch(e)
					{
						system.alert(this, e,"");
					}
				}
			break;
			case "ubah" :
				if (modalResult == mrOk)
				{				
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();					
						this.insertData(sql);
				}
			break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {			  
					  uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from load_mhs where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);					
			   }
			break;
		}
		this.e0.setFocus();
	},
	insertData: function(sql){			
		this.buktiEdited = [];
		for (var i in this.dataEdited.objList){
			this.buktiEdited[this.buktiEdited.length] = i;
		}
		this.processid = 0;				
		this.doProcessEditing(this.processid);
		
	},	
	doProcessEditing: function(idx){
		try{
			var sql = new server_util_arrayList();
			if (idx == this.buktiEdited.length){
				showProgress("Finishing....");
				sql.add("insert into ju_kor_m (no_bukti, kode_lokasi, tanggal, keterangan, periode, nik_buat, nik_app,nik_user, tgl_input) "+
					" values('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.dpTgl.getDateString()+"', '"+this.eKeterangan.getText()+"','"+this.ePeriode.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._userLog+"',now()) ");						
				this.dbLib.execArraySQL(sql);	
				return;
			}
			var header, line;			
			showProgress("Update "+this.buktiEdited[idx]+" ("+Math.round(idx / this.buktiEdited.length * 100)+"%)");		
			var dt = this.dataEdited.get(this.buktiEdited[idx]);		
			header = this.dataJU.get(this.buktiEdited[idx]);		
			sql.add("delete from ju_j where no_ju = '"+this.buktiEdited[idx]+"' and kode_lokasi = '"+this.app._lokasi+"' ");			
			if (header.posted == 'T'){
				if (this.cb_periode.getText() == this.app._periode)
					sql.add("delete from gldt where no_bukti = '"+this.buktiEdited[idx]+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				else if (this.cb_periode.getText() < this.app._periode)
					sql.add("delete from gldt_h where no_bukti = '"+this.buktiEdited[idx]+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			}		
			
			for (var i in dt.objList){			
				line= dt.get(i);			
				if (header){
					sql.add("insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.buktiEdited[idx]+"','"+header.no_dokumen+"','"+header.tanggal+"',"+i+",'"+line.kode_akun+"','"+line.keterangan+"','"+line.dc.toUpperCase()+"',"+line.nilai+","+
							" '"+line.kode_pp+"','"+line.kode_drk+"','-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+header.jenis+"','"+this.cb_periode.getText()+"','"+header.kode_curr+"','"+header.kurs+"','"+this.app._userLog+"',now())");
					if (header.posted == 'T'){
						if (this.cb_periode.getText() == this.app._periode){						
							sql.add("insert into gldt (no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
									"('"+this.buktiEdited[idx]+"','"+header.no_dokumen+"','"+header.tanggal+"',"+i+",'"+line.kode_akun+"','"+line.keterangan+"','"+line.dc.toUpperCase()+"',"+line.nilai+","+
									" '"+line.kode_pp+"','"+line.kode_drk+"','-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+header.jenis+"','"+this.cb_periode.getText()+"','"+header.kode_curr+"','"+header.kurs+"','"+this.app._userLog+"',now())");
						}else if (this.cb_periode.getText() < this.app._periode){											
							sql.add("insert into gldt_h (no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
									"('"+this.buktiEdited[idx]+"','"+header.no_dokumen+"','"+header.tanggal+"',"+i+",'"+line.kode_akun+"','"+line.keterangan+"','"+line.dc.toUpperCase()+"',"+line.nilai+","+
									" '"+line.kode_pp+"','"+line.kode_drk+"','-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+header.jenis+"','"+this.cb_periode.getText()+"','"+header.kode_curr+"','"+header.kurs+"','"+this.app._userLog+"',now())");
						}
					}
				}
				sql.add("insert into ju_kor_d (no_bukti, no_ju, kode_lokasi) values ('"+this.e0.getText()+"','"+this.buktiEdited[idx]+"','"+this.app._lokasi+"' )");
			}
			if (sql.getLength() > 0) this.dbLib.execArraySQL(sql);	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
				{
					case "execArraySQL" :    				
						if (this.processid < this.buktiEdited.length){
							this.processid++;
							this.doProcessEditing(this.processid);
							return;
						}
						if (result.toLowerCase().search("error") == -1)					
						{
						  this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
						  this.app._mainForm.bClear.click();              
						}else system.info(this,result,"");
					break;    			
					case "getDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							var line;
							for (var i in result.rs.rows){
								line = result.rs.rows[i];
								this.cb_periode.addItem(i,line.periode);
							}
						}
					break;
				}
			}catch(e){
				this.sg1.hideLoading();
				alert(e);
			}
		}
		if (sender == this.dbLib2){
		//case "getDataProvider":
			if (methodName){				
				try{   
					this.sg1.showLoading();									
					eval("var rs = "+result+";");				
					if (typeof rs != "string"){    			        
						rs = rs.rs;  
						this.sg1.clear();	
						this.sg1.data = rs;
						this.dataJU = new portalui_arrayMap();
						var row;
						for (var i in rs.rows){
							row = rs.rows[i];
							this.dataJU.set(row.no_bukti, row); 
						}
						this.dataEdited = new portalui_arrayMap();
						this.sgn.setTotalPage(Math.ceil(rs.rows.length / this.rowPerPage));
						this.sgn.rearrange();
						this.sgn.setButtonStyle(3);								
						for (var i in rs.rows){
							if (i == this.rowPerPage) break;
							row = rs.rows[i];
							this.sg1.appendData(['<img src="icon/dynpro/edit.png" width=18 height=18 />.',row.no_bukti, row.no_dokumen, row.tanggal, row.keterangan, floatToNilai(row.nilai), row.kode_pp, row.nama, row.posted.toUpperCase()]);
							
						}						
					}else throw(result); 
					this.sg1.hideLoading();
				}catch(e){
					this.sg1.hideLoading();
					systemAPI.alert(e);
				}
			}
		//break;
		}
	},
	doGenerate: function(sender){
		if(sender == this.bGenerate)
			this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "ju_kor_m", "no_bukti", "KOR"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
		if (sender == this.bLoad){
			try{    		    	
				this.dbLib2.getDataProviderA("select a.no_ju as no_bukti, a.no_dokumen, a.tanggal, a.keterangan, a.nilai, a.kode_pp,b.nama, a.posted, a.jenis, a.kode_curr, a.kurs "+
						"from ju_m a left outer join pp b on a.kode_pp = b.kode_pp and a.kode_lokasi = b.kode_lokasi "+						
						"where a.periode = '"+this.cb_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
		   }catch(e){				
				alert(e);
		   }
		}
		if (sender == this.bJurnal){
			try{			
				this.sgj.setData(this.dtJurnal);
			}catch(e){
				alert(e);
			}
		}	
	},
	doSelectDate: function(sender, y,m,d){
		this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
		this.bGenerate.click();
	},
	doSelectedPage: function(sender, page){
		try{
			this.sg1.clear();
			var dari = (page - 1) * this.rowPerPage;
			var sampai = dari + this.rowPerPage;
			if (sampai > this.sg1.data.rows.length) sampai = this.sg1.data.rows.length;        
			for (var i=dari; i < sampai ;i++){
				row = this.sg1.data.rows[i];
				this.sg1.appendData(['<img src="icon/dynpro/edit.png" width=18 height=18 />.',row.no_bukti, row.no_dokumen, row.tanggal, row.keterangan, floatToNilai(row.nilai), row.kode_pp, row.nama, row.posted.toUpperCase()]);
			}    	
			this.sg1.setNoUrut(dari);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgClick: function(sender, col, row){
		try{
			if (col == 0 ){
				if (this.fJurnal === undefined){
					this.fJurnal = new app_saku_gl_transaksi_fUpdatePop(this.app,{bound:[this.width / 2 - 450, 50, 900,500]});
				}
				this.fJurnal.setData(sender.cells(1,row), this, sender.cells(8,row));
				this.fJurnal.show();
			}
		}catch(e){
			alert(e);
		}
	},
	doAfterEdit: function(modalResult){
		if (modalResult == mrOk){
			
		}
	}
});
