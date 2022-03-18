window.app_hris_transaksi_rekrut_fRekLowong = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_rekrut_fRekLowong.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_rekrut_fRekLowong";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lowongan Pekerjaan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGenerate"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Posisi", tag:1, maxLength:200});	
		this.cb_jab = new saiCBBL(this,{bound:[20,12,200,20],caption:"Jabatan",maxLength:10,multiSelection:false,tag:1});
		this.cb_loker = new saiCBBL(this,{bound:[20,13,200,20],caption:"Lokasi Kerja",maxLength:10,multiSelection:false,tag:1});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,500,20],caption:"Keterangan", maxLength:200});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,15,100,18],date:new Date().getDateStr()});
		this.l_tgl2 = new portalui_label(this,{bound:[20,16,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,16,100,18],date:new Date().getDateStr()});
				
		this.bTampil = new button(this,{bound:[829,16,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,900,333],caption:"Daftar Lowongan Pekerjaan"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,280],readOnly:true,tag:8,colTitle: ["Kode","Posisi","Kode Jabatan","Kode Loker","Keterangan","Tgl Mulai","Tgl Selesai"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,308,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Loker",true);
			this.cb_jab.setSQL("select kode_jab, nama from gr_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_rekrut_fRekLowong.extend(window.childForm);
window.app_hris_transaksi_rekrut_fRekLowong.implement({
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
					sql.add("insert into gr_rekrut_job(kode_job,nama,keterangan,tgl_mulai,tgl_selesai,kode_jab,kode_loker,tgl_input,nik_user,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_jab.getText()+"','"+this.cb_loker.getText()+"',getDate(),'"+this.app._userLog+"','"+this.app._lokasi+"')");
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
					sql.add("update gr_rekrut_job set nama='"+this.e_nama.getText()+"',kode_jab='"+this.cb_jab.getText()+"',kode_loker='"+this.cb_loker.getText()+"',keterangan='"+this.e_ket.getText()+"',tgl_mulai='"+this.dp_d1.getDateString()+"',tgl_selesai='"+this.dp_d2.getDateString()+"',tgl_input=getDate(),nik_user='"+this.app._userLog+"' "+
						    "where kode_job='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from gr_rekrut_job where kode_job = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select nama,keterangan,kode_jab,kode_loker,convert(varchar,tgl_mulai,103) as tgl_mulai,convert(varchar,tgl_selesai,103) as tgl_selesai "+
				           " from gr_rekrut_job where kode_job ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_ket.setText(line.keterangan);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.cb_jab.setText(line.kode_jab);
						this.cb_loker.setText(line.kode_loker);
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
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select kode_job,nama,kode_jab,kode_loker,keterangan,convert(varchar,tgl_mulai,103) as tgl_mulai,convert(varchar,tgl_selesai,103) as tgl_selesai from gr_rekrut_job where kode_lokasi ='"+this.app._lokasi+"'order by tgl_mulai desc");
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Lowongan Pekerjaan",sender,undefined, 
											  "select kode_job, nama  from gr_rekrut_job where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_job) from gr_rekrut_job where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_job","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rekrut_job","kode_job","L"+(new Date().getThnBln().substr(2,4)),"000"));
		this.e_nama.setFocus();
	}
});
